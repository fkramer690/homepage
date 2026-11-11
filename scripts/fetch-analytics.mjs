// Pulls the last 30 days of Cloudflare Web Analytics data via the GraphQL API
// and prints it as JSON. Used by .github/workflows/analytics.yml.
// A second query splits pages and sources per day (pagesDaily, referersDaily)
// for the drill-down in the project dashboard; if it fails, the main snapshot
// is still written.
const token = process.env.CF_API_TOKEN;
const accountTag = process.env.CF_ACCOUNT_ID;
if (!token || !accountTag) {
  console.error('CF_API_TOKEN and CF_ACCOUNT_ID must be set');
  process.exit(1);
}

const day = (offset) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);
const start = day(30);
const end = day(0);

const group = (name, dims, order, limit) => `
  ${name}: rumPageloadEventsAdaptiveGroups(
    limit: ${limit}
    filter: { date_geq: $start, date_leq: $end }
    orderBy: [${order}]
  ) {
    count
    sum { visits }
    dimensions { ${dims} }
  }`;

const query = `
query ($accountTag: string!, $start: Date!, $end: Date!) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      ${group('daily', 'date', 'date_ASC', 100)}
      ${group('pages', 'requestPath', 'count_DESC', 20)}
      ${group('referers', 'refererHost', 'count_DESC', 20)}
      ${group('countries', 'countryName', 'count_DESC', 20)}
      ${group('devices', 'deviceType', 'count_DESC', 10)}
      ${group('browsers', 'userAgentBrowser', 'count_DESC', 10)}
    }
  }
}`;

const ask = async (q) => {
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: q, variables: { accountTag, start, end } }),
  });
  const body = await res.json();
  if (!res.ok || body.errors?.length) throw new Error(JSON.stringify(body.errors ?? body, null, 2));
  return body.data.viewer.accounts[0] ?? {};
};

let account;
try {
  account = await ask(query);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const dailyQuery = `
query ($accountTag: string!, $start: Date!, $end: Date!) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      ${group('pagesDaily', 'date requestPath', 'date_ASC, count_DESC', 2000)}
      ${group('referersDaily', 'date refererHost', 'date_ASC, count_DESC', 1000)}
    }
  }
}`;
try {
  Object.assign(account, await ask(dailyQuery));
} catch (err) {
  console.error(`per-day query failed, snapshot written without it: ${err.message}`);
}

console.log(JSON.stringify({ generatedAt: new Date().toISOString(), range: { start, end }, ...account }, null, 2));
