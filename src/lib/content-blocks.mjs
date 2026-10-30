// Content blocks for blog articles and masterclass chapters (rules: "Content blocks"
// in docs/blog-guidelines.md, preview in docs/content-blocks.md).
// A block is a fenced code block whose language is the block name, e.g.
//   ```hinweis achtung
//   Text …
//   ```
// Articles stay free of HTML: src/lib/content-blocks-plugin.mjs turns the block into
// markup at build time, scripts/check-blog.mjs validates it with `validateBlock`.
// The diagram block (`ablauf`) is rendered to SVG once with
// `node scripts/render-diagrams.mjs` and stored in src/assets/diagrams/.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { iconHtml } from './icons.mjs';

export const blockNames = ['hinweis', 'praxis', 'kennzahlen', 'zeitleiste', 'ablauf', 'pro-contra', 'vertiefung', 'schritte', 'stufen', 'vergleich', 'hebel', 'eintrag', 'saeulen', 'partnerfluss'];

const labels = {
  de: {
    tipp: 'Tipp', achtung: 'Achtung', offen: 'Schriftlich bestätigen lassen', praxis: 'Aus meiner Praxis', entry: 'Eintrag',
    quelle: 'Quelle', next: 'nächster Termin', risiko: 'Größtes Risiko', legend: { sf: 'Salesforce', erp: 'ERP', ext: 'angrenzender Prozess' },
    diagram: 'Ablaufdiagramm',
  },
  en: {
    tipp: 'Tip', achtung: 'Warning', offen: 'Get it confirmed in writing', praxis: 'From my practice', entry: 'Entry',
    quelle: 'Source', next: 'next date', risiko: 'Biggest risk', legend: { sf: 'Salesforce', erp: 'ERP', ext: 'adjacent process' },
    diagram: 'Flow diagram',
  },
};
const variants = ['tipp', 'achtung', 'offen'];
const monthsDe = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ---------- parsing ----------

// Finds all content blocks in a Markdown body: [{ name, arg, content, start, end }].
export function findBlocks(body) {
  const out = [];
  const re = /^```([a-z-]+)[ \t]*([^\n]*)\n([\s\S]*?)\n```[ \t]*$/gm;
  for (const m of body.matchAll(re)) {
    if (!blockNames.includes(m[1])) continue;
    out.push({ name: m[1], arg: m[2].trim(), content: m[3], start: m.index, end: m.index + m[0].length });
  }
  return out;
}

const lines = (s) => s.split('\n').map((l) => l.replace(/\s+$/, ''));
const paragraphs = (s) => s.trim().split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
const keyLine = (l, keys) => {
  const m = l.match(/^([a-zäöü]+):\s*(.*)$/i);
  return m && keys.includes(m[1].toLowerCase()) ? { key: m[1].toLowerCase(), value: m[2].trim() } : null;
};

export function parseStats(content) {
  const items = [];
  let source = '';
  let inSource = false;
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    const k = keyLine(l.trim(), ['quelle', 'source']);
    if (k) { source = k.value; inSource = true; continue; }
    if (inSource && /^\s/.test(l)) { source += ` ${l.trim()}`; continue; }
    inSource = false;
    const [value, ...rest] = l.split('|');
    items.push({ value: value.trim(), text: rest.join('|').trim() });
  }
  return { items, source };
}

export function parseTimeline(content) {
  return lines(content).filter((l) => l.trim()).map((l) => {
    const [date, ...rest] = l.split('|');
    return { date: date.trim(), text: rest.join('|').trim() };
  });
}

export function parseProContra(content) {
  const cols = [];
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    const k = keyLine(l.trim(), ['pro', 'contra']);
    if (k) { cols.push({ kind: k.key, title: k.value, items: [] }); continue; }
    const item = l.trim().match(/^[-*]\s+(.*)$/);
    if (item && cols.length) cols[cols.length - 1].items.push(item[1]);
    else if (cols.length && cols[cols.length - 1].items.length) cols[cols.length - 1].items[cols[cols.length - 1].items.length - 1] += ` ${l.trim()}`;
  }
  return cols;
}

export function parseDeep(content) {
  const ls = lines(content);
  let title = '';
  let i = 0;
  while (i < ls.length && !ls[i].trim()) i++;
  const k = ls[i] ? keyLine(ls[i].trim(), ['titel', 'title']) : null;
  if (k) {
    title = k.value;
    i++;
    while (i < ls.length && /^\s+\S/.test(ls[i])) title += ` ${ls[i++].trim()}`;
  }
  return { title, body: ls.slice(i).join('\n').trim() };
}

export function parseSteps(content) {
  const steps = [];
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    if (/^\S/.test(l)) {
      const [title, ...meta] = l.split('|');
      steps.push({ title: title.trim(), meta: meta.join('|').trim(), text: '' });
    } else if (steps.length) {
      steps[steps.length - 1].text = `${steps[steps.length - 1].text} ${l.trim()}`.trim();
    }
  }
  return steps;
}

// Stages: "Letter | Name | Subtitle | Question", a trailing * marks a stage the cases
// below refer to; optional cases "fall: Title | situation | consequence".
// Variant `treppe` (staircase): a fifth field holds the risk, shown in its own row,
// and optional bands "band: 1-2 | Text" (a trailing * makes the band cyan).
export function parseStages(content) {
  const stages = [];
  const cases = [];
  const bands = [];
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['fall', 'case']);
    if (k) {
      const [title, situation, consequence] = k.value.split('|').map((x) => x.trim());
      cases.push({ title, situation, consequence });
      continue;
    }
    const b = keyLine(l, ['band']);
    if (b) {
      const mark = /\*$/.test(b.value);
      const [range, text] = b.value.replace(/\s*\*$/, '').split('|').map((x) => x.trim());
      const m = /^(\d+)\s*-\s*(\d+)$/.exec(range ?? '');
      bands.push({ from: m ? +m[1] : 0, to: m ? +m[2] : 0, text, mark });
      continue;
    }
    const mark = /\*$/.test(l);
    const [letter, name, sub, text, risk] = l.replace(/\s*\*$/, '').split('|').map((x) => x.trim());
    stages.push({ letter, name, sub, text, risk, mark });
  }
  return { stages, cases, bands };
}

// Log entry: "Field | value" rows (trailing * marks one), optional "fazit:" / "note:" line.
export function parseEntry(content) {
  const rows = [];
  let note = '';
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['fazit', 'note']);
    if (k) { note = k.value; continue; }
    const mark = /\*$/.test(l);
    const [field, value] = l.replace(/\s*\*$/, '').split('|').map((x) => x.trim());
    rows.push({ field, value, mark });
  }
  return { rows, note };
}

// Pillars: optional "dach: Title" (EN "roof:"), then "icon | Name | Subtitle | Text" per
// pillar (icon = file name in src/icons/), optional "basis: Title" (EN "base:").
export function parsePillars(content) {
  const out = { roof: '', base: '', pillars: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['dach', 'roof', 'basis', 'base']);
    if (k) { out[['dach', 'roof'].includes(k.key) ? 'roof' : 'base'] = k.value; continue; }
    const [icon, name, sub, text] = l.split('|').map((x) => x.trim());
    out.pillars.push({ icon, name, sub, text });
  }
  return out;
}

// Comparison: "ohne: Title" / "without: Title" and "mit: Title" / "with: Title", each with "- points".
export function parseCompare(content) {
  const cols = [];
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    const k = keyLine(l.trim(), ['ohne', 'without', 'mit', 'with']);
    if (k) { cols.push({ kind: ['ohne', 'without'].includes(k.key) ? 'without' : 'with', title: k.value, items: [] }); continue; }
    const item = l.trim().match(/^[-*]\s+(.*)$/);
    if (item && cols.length) cols[cols.length - 1].items.push(item[1]);
  }
  return cols;
}

// Partner flow: "ohne: Title | caption" and "mit: Title | caption" (EN "without:", "with:").
export function parsePartnerFlow(content) {
  const out = {};
  for (const l of lines(content)) {
    const k = keyLine(l.trim(), ['ohne', 'without', 'mit', 'with']);
    if (!k) continue;
    const [title, caption = ''] = k.value.split('|').map((x) => x.trim());
    out[['ohne', 'without'].includes(k.key) ? 'without' : 'with'] = { title, caption };
  }
  return out;
}

// Diagram: "sf: A, B" / "erp: C" / "ext: D" assign nodes to systems; edges are
// "A --> B", "A --Label--> B" (solid) and "A ..> B", "A ..Label..> B" (dashed).
export function parseFlow(content) {
  const groups = { sf: [], erp: [], ext: [] };
  const edges = [];
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const g = keyLine(l, ['sf', 'erp', 'ext']);
    if (g) { groups[g.key].push(...g.value.split(',').map((s) => s.trim()).filter(Boolean)); continue; }
    const m = l.match(/^(.+?)\s+(--|\.\.)(?:(.+?)(?:--|\.\.))?>\s+(.+)$/);
    if (m) edges.push({ from: m[1].trim(), dashed: m[2] === '..', label: (m[3] ?? '').trim(), to: m[4].trim() });
    else edges.push({ error: l });
  }
  const nodes = [...new Set([...groups.sf, ...groups.erp, ...groups.ext, ...edges.flatMap((e) => (e.error ? [] : [e.from, e.to]))])];
  return { groups, edges, nodes };
}

// ---------- validation (used by scripts/check-blog.mjs) ----------

export function validateBlock(block) {
  const errs = [];
  const { name, arg, content } = block;
  const between = (n, min, max, what) => { if (n < min || n > max) errs.push(`${name}: ${n} ${what}, needs ${min} to ${max}`); };
  if (name === 'hinweis') {
    if (!variants.includes(arg)) errs.push(`hinweis: variant must be one of ${variants.join(', ')} (\`\`\`hinweis tipp)`);
    between(paragraphs(content).length, 1, 2, 'paragraphs');
  } else if (name === 'praxis') {
    between(paragraphs(content).length, 1, 2, 'paragraphs');
  } else if (name === 'kennzahlen') {
    const { items, source } = parseStats(content);
    between(items.length, 2, 4, 'figures');
    if (items.some((i) => !i.value || !i.text)) errs.push('kennzahlen: every line needs "value | description"');
    if (!source) errs.push('kennzahlen: add a "quelle:" (DE) or "source:" (EN) line');
  } else if (name === 'zeitleiste') {
    const items = parseTimeline(content);
    between(items.length, 3, 7, 'entries');
    for (const i of items) {
      if (!i.text) errs.push(`zeitleiste: "${i.date}" needs "date | text"`);
      if (!/^\d{4}-\d{2}(-\d{2})?$/.test(i.date) && !/^(Spring|Summer|Winter) '\d\d$/.test(i.date)) errs.push(`zeitleiste: date "${i.date}" must be YYYY-MM-DD, YYYY-MM or a release name like Summer '27`);
    }
  } else if (name === 'ablauf') {
    const { groups, edges, nodes } = parseFlow(content);
    for (const e of edges) if (e.error) errs.push(`ablauf: cannot read "${e.error}", use "A --> B", "A --Label--> B" or "A ..> B"`);
    between(nodes.length, 3, 8, 'nodes');
    const grouped = new Set([...groups.sf, ...groups.erp, ...groups.ext]);
    for (const n of nodes) if (!grouped.has(n)) errs.push(`ablauf: node "${n}" is in no group (sf:, erp: or ext:)`);
  } else if (name === 'pro-contra') {
    const cols = parseProContra(content);
    if (cols.length !== 2 || cols[0].kind !== 'pro' || cols[1].kind !== 'contra') errs.push('pro-contra: needs a "pro: Title" column followed by a "contra: Title" column');
    for (const c of cols) between(c.items.length, 2, 5, `points in "${c.title}"`);
  } else if (name === 'hebel') {
    const levers = parseSteps(content);
    between(levers.length, 2, 3, 'levers');
    if (levers.some((l) => !l.title || !l.meta || !l.text)) errs.push('hebel: every lever needs "Title | effect" and an indented description line');
  } else if (name === 'vertiefung') {
    const { title, body } = parseDeep(content);
    if (!arg) errs.push('vertiefung: add a label after the name (```vertiefung Für Entwickler)');
    if (!title) errs.push('vertiefung: first line must be "titel:" (DE) or "title:" (EN)');
    if (!body) errs.push('vertiefung: text missing');
  } else if (name === 'schritte') {
    const steps = parseSteps(content);
    between(steps.length, 3, 6, 'steps');
    if (steps.some((s) => !s.text)) errs.push('schritte: every step needs an indented description line');
  } else if (name === 'stufen') {
    const { stages, cases, bands } = parseStages(content);
    if (arg && arg !== 'treppe') errs.push('stufen: the only variant is treppe (```stufen treppe)');
    between(stages.length, 3, 7, 'stages');
    if (arg === 'treppe') {
      if (stages.some((x) => !x.letter || !x.name || !x.sub || !x.text || !x.risk)) errs.push('stufen treppe: every stage needs "Number | Name | Subtitle | Description | Risk"');
      between(bands.length, 0, 3, 'bands');
      if (bands.some((x) => !x.text || x.from < 1 || x.to < x.from || x.to > stages.length)) errs.push('stufen treppe: every band needs "band: 1-2 | Text" within the stages');
    } else {
      if (stages.some((x) => !x.letter || !x.name || !x.sub || !x.text)) errs.push('stufen: every stage needs "Letter | Name | Subtitle | Question"');
      if (bands.length) errs.push('stufen: bands only work in the variant treppe');
    }
    between(cases.length, 0, 3, 'cases');
    if (cases.some((c) => !c.title || !c.situation || !c.consequence)) errs.push('stufen: every case needs "fall: Title | situation | consequence"');
  } else if (name === 'saeulen') {
    const { pillars } = parsePillars(content);
    between(pillars.length, 3, 5, 'pillars');
    if (pillars.some((x) => !x.icon || !x.name || !x.sub || !x.text)) errs.push('saeulen: every pillar needs "icon | Name | Subtitle | Text"');
    for (const x of pillars) if (x.icon && !existsSync(new URL(`../icons/${x.icon}.svg`, import.meta.url))) errs.push(`saeulen: icon "${x.icon}" is not in src/icons/`);
  } else if (name === 'eintrag') {
    const { rows } = parseEntry(content);
    if (!arg) errs.push('eintrag: add a title after the name (```eintrag Entscheidungslog)');
    between(rows.length, 2, 6, 'rows');
    if (rows.some((r) => !r.field || !r.value)) errs.push('eintrag: every row needs "Field | value"');
    if (rows.filter((r) => r.mark).length > 1) errs.push('eintrag: mark at most one row with *');
  } else if (name === 'partnerfluss') {
    const { without, with: withArch } = parsePartnerFlow(content);
    if (!['architekt', 'architect', 'review'].includes(arg)) errs.push('partnerfluss: variant must be architekt (EN architect) or review (```partnerfluss review)');
    if (!without?.title || !without?.caption) errs.push('partnerfluss: needs "ohne: Title | caption" (EN "without:")');
    if (!withArch?.title || !withArch?.caption) errs.push('partnerfluss: needs "mit: Title | caption" (EN "with:")');
  } else if (name === 'vergleich') {
    const cols = parseCompare(content);
    if (cols.length !== 2 || cols[0].kind !== 'without' || cols[1].kind !== 'with') errs.push('vergleich: needs an "ohne: Title" column followed by a "mit: Title" column');
    for (const c of cols) between(c.items.length, 2, 5, `points in "${c.title}"`);
  } else if (name === 'hebel') {
    const levers = parseSteps(content);
    between(levers.length, 2, 3, 'levers');
    if (levers.some((l) => !l.title || !l.meta || !l.text)) errs.push('hebel: every lever needs "Title | effect" and an indented description line');
  }
  return errs;
}

// Prose of a block, for word counts and the wording checks in check-blog.
export function blockProse(block) {
  return block.content
    .replace(/^\s*(quelle|source|titel|title|pro|contra|sf|erp|ext|fall|case|band|ohne|without|mit|with|fazit|note|dach|roof|basis|base):\s*/gim, '')
    .replace(/\s\*$/gm, '')
    .replace(/(--|\.\.)>?/g, ' ')
    .replace(/\|/g, ' ');
}

// Hash of a diagram block; the SVG lives in src/assets/diagrams/<hash>.svg.
export const flowHash = (content) => createHash('sha1').update(content.trim()).digest('hex').slice(0, 12);

// Mermaid source of a diagram block (rendered by scripts/render-diagrams.mjs).
// `direction` is LR (left to right) or TB (top to bottom); scripts/render-diagrams.mjs
// switches to TB when a left-to-right layout would be too wide to read.
export function flowToMermaid(content, direction = 'LR') {
  const { groups, edges, nodes } = parseFlow(content);
  const id = new Map(nodes.map((n, i) => [n, `n${i}`]));
  const esc = (s) => s.replace(/"/g, "'");
  const out = [
    '%%{init: {"theme": "base", "themeVariables": {"fontFamily": "Sora, system-ui, sans-serif", "fontSize": "15px", "lineColor": "#5a5a5e", "primaryTextColor": "#232325", "edgeLabelBackground": "#ffffff"}, "htmlLabels": false, "flowchart": {"curve": "basis", "nodeSpacing": 40, "rankSpacing": 56, "padding": 22, "htmlLabels": false}}}%%',
    `flowchart ${direction}`,
  ];
  for (const n of nodes) {
    const shape = [`["`, `"]`];
    out.push(`  ${id.get(n)}${shape[0]}${esc(n)}${shape[1]}`);
  }
  for (const e of edges) {
    if (e.error) continue;
    const arrow = e.dashed ? (e.label ? `-. "${esc(e.label)}" .->` : '-.->') : (e.label ? `-- "${esc(e.label)}" -->` : '-->');
    out.push(`  ${id.get(e.from)} ${arrow} ${id.get(e.to)}`);
  }
  out.push('  classDef sf fill:#eaf6fc,stroke:#1ba1e2,stroke-width:2px,color:#232325');
  out.push('  classDef erp fill:#232325,stroke:#232325,color:#ffffff');
  out.push('  classDef ext fill:#ffffff,stroke:#5a5a5e,stroke-dasharray:4 3,color:#232325');
  for (const g of ['sf', 'erp', 'ext']) if (groups[g].length) out.push(`  class ${groups[g].map((n) => id.get(n)).join(',')} ${g}`);
  return out.join('\n');
}

// ---------- rendering (used by src/lib/content-blocks-plugin.mjs) ----------

const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline Markdown inside blocks: **bold**, `code` and [links](url).
export function inline(s, { lang, isExternal }) {
  const ext = lang === 'de' ? '(öffnet in einem neuen Tab)' : '(opens in a new tab)';
  return escHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
      const url = href.replace(/&amp;/g, '&');
      if (isExternal(url)) {
        return `<a href="${escHtml(url)}" target="_blank" rel="noopener">${text}${iconHtml('external', 'ext-mark')}<span class="visually-hidden"> ${ext}</span></a>`;
      }
      return `<a href="${escHtml(url)}">${text}</a>`;
    });
}

const paras = (s, o) => paragraphs(s).map((p) => (/^[-*]\s/.test(p) ? `<ul>${p.split(/\s(?=[-*]\s)/).map((li) => `<li>${inline(li.replace(/^[-*]\s+/, ''), o)}</li>`).join('')}</ul>` : `<p>${inline(p, o)}</p>`)).join('');
const label = (text) => `<p class="cb-label">${escHtml(text)}</p>`;

function formatDate(d, lang) {
  let m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return lang === 'de' ? `${m[3]}.${m[2]}.${m[1]}` : `${+m[3]} ${monthsEn[+m[2] - 1]} ${m[1]}`;
  m = d.match(/^(\d{4})-(\d{2})$/);
  if (m) return lang === 'de' ? `${monthsDe[+m[2] - 1]} ${m[1]}` : `${monthsEn[+m[2] - 1]} ${m[1]}`;
  return d;
}
function sortKey(d) {
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(d)) return d.length === 7 ? `${d}-01` : d;
  const m = d.match(/^(Spring|Summer|Winter) '(\d\d)$/);
  if (!m) return d;
  const year = 2000 + +m[2];
  return m[1] === 'Spring' ? `${year}-02-15` : m[1] === 'Summer' ? `${year}-06-15` : `${year - 1}-10-15`;
}

const icon = { check: iconHtml('tick'), cross: iconHtml('cross') };

// ---------- partner flow drawing (```partnerfluss) ----------
// Two animated panels: without a central owner every partner delivers on its own,
// crossing path into the org; with one, everything runs through the architect (or the
// review) and arrives as one checked stream. Labels in IBM Plex Mono, checked by
// scripts/check-graphics.mjs (class pf-drawing). Animation under "Partner flow" in
// global.css; prefers-reduced-motion shows the still picture.
const pfText = {
  de: {
    partners: ['Partner A', 'Partner B', 'Partner C', 'Interne IT'], org: ['Salesforce', 'Org'],
    hub: { architekt: ['Architekt', 'Review · Standards'], review: ['Review', 'Tests · Standards'] },
    without: 'Drei Partner und die interne IT liefern auf eigenen, sich kreuzenden Wegen in die Salesforce-Org. An den Kreuzungen entstehen Konflikte.',
    with: { architekt: 'Alle Partner und die interne IT liefern über den Architekten. Von dort geht ein geprüfter Strom in die Salesforce-Org.', review: 'Alle Partner und die interne IT liefern über ein Review. Von dort geht ein geprüfter Strom in die Salesforce-Org.' },
  },
  en: {
    partners: ['Partner A', 'Partner B', 'Partner C', 'Internal IT'], org: ['Salesforce', 'org'],
    hub: { architekt: ['Architect', 'Review · standards'], review: ['Review', 'Tests · standards'] },
    without: 'Three partners and the internal IT deliver into the Salesforce org on their own, crossing paths. Conflicts arise where they cross.',
    with: { architekt: 'All partners and the internal IT deliver through the architect. From there one checked stream reaches the Salesforce org.', review: 'All partners and the internal IT deliver through a review. From there one checked stream reaches the Salesforce org.' },
  },
};

function partnerFlowSvg(kind, arg, lang) {
  const t = pfText[lang];
  const variant = arg === 'review' ? 'review' : 'architekt';
  const txt = (x, y, s, size = 13, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle"${extra}>${escHtml(s)}</text>`;
  const nodes = t.partners.map((p, i) => `<rect class="pf-node" x="6" y="${20 + 68 * i}" width="96" height="36" rx="6" />${txt(54, 42 + 68 * i, p)}`).join('');
  const org = (cls) => `<rect class="${cls}" x="286" y="116" width="88" height="60" rx="8" />${txt(330, 142, t.org[0], 13, ' font-weight="600"')}${txt(330, 160, t.org[1], 13, ' font-weight="600"')}`;
  if (kind === 'without') {
    const paths = ['M102 38 L215 210 L286 162', 'M102 106 L185 50 L286 130', 'M102 174 L240 92 L286 150', 'M102 242 L200 150 L286 140']
      .map((d, i) => `<path class="pf-path pf-march pf-m${i + 1}" d="${d}" />`).join('');
    const warns = [[166, 136], [185, 164], [238, 93]]
      .map(([x, y], i) => `<g class="pf-warn pf-w${i + 1}"><circle cx="${x}" cy="${y}" r="8" /><path d="M${x} ${y - 4} v4.5 M${x} ${y + 3.2} v0.3" /></g>`).join('');
    const dots = ['pf-cA', 'pf-cC', 'pf-cD'].map((c) => `<circle class="pf-dot pf-dot-grey ${c}" cx="0" cy="0" r="4" />`).join('');
    return `<svg class="pf-drawing" viewBox="0 0 380 290" role="img" aria-label="${escHtml(t.without)}">${paths}${nodes}${org('pf-org pf-org-warn')}${warns}${dots}</svg>`;
  }
  const [hub, sub] = t.hub[variant];
  const lines = [[38, 134], [106, 140], [174, 152], [242, 158]].map(([y1, y2]) => `<path class="pf-path-on" d="M102 ${y1} L150 ${y2}" />`).join('');
  const dots = ['pf-pA', 'pf-pB', 'pf-pC', 'pf-pD', 'pf-out'].map((c) => `<circle class="pf-dot ${c}" cx="0" cy="0" r="${c === 'pf-out' ? 5 : 4}" />`).join('');
  return `<svg class="pf-drawing" viewBox="0 0 380 290" role="img" aria-label="${escHtml(t.with[variant])}">${lines}<path class="pf-main" d="M234 146 H286" />${nodes}<rect class="pf-hub-ping" x="150" y="122" width="84" height="48" rx="24" /><rect class="pf-hub" x="150" y="122" width="84" height="48" rx="24" />${txt(192, 150, hub, 13, ' font-weight="600" class="pf-hub-label"')}${txt(192, 210, sub, 11, ' class="pf-sub"')}${org('pf-org pf-org-ok')}<g class="pf-ok"><circle cx="366" cy="116" r="10" /><path d="M361 116 l3.5 3.5 l7 -7" /></g>${dots}</svg>`;
}

// HTML of one block. `readDiagram(hash)` returns the stored SVG or undefined.
export function renderBlock(block, { lang, isExternal, readDiagram, today = new Date().toISOString().slice(0, 10) }) {
  const t = labels[lang];
  const o = { lang, isExternal };
  const { name, arg, content } = block;
  if (name === 'hinweis') {
    return `<aside class="cb cb-card cb-note cb-note-${arg}">${label(t[arg] ?? arg)}${paras(content, o)}</aside>`;
  }
  if (name === 'praxis') {
    return `<aside class="cb cb-practice">${label(t.praxis)}${paras(content, o)}</aside>`;
  }
  if (name === 'kennzahlen') {
    const { items, source } = parseStats(content);
    return `<figure class="cb cb-stats"><div class="cb-stats-grid">${items.map((i) => `<div class="cb-card cb-stat"><p class="cb-stat-value">${inline(i.value, o)}</p><p class="cb-stat-text">${inline(i.text, o)}</p></div>`).join('')}</div><figcaption>${escHtml(t.quelle)}: ${inline(source, o)}</figcaption></figure>`;
  }
  if (name === 'zeitleiste') {
    const items = parseTimeline(content).map((i) => ({ ...i, key: sortKey(i.date) })).sort((a, b) => a.key.localeCompare(b.key));
    const next = items.find((i) => i.key >= today);
    return `<ol class="cb cb-timeline">${items.map((i) => `<li${i === next ? ' class="cb-now"' : ''}><time datetime="${escHtml(/^\d{4}-/.test(i.date) ? i.date : i.key)}">${escHtml(formatDate(i.date, lang))}${i === next ? ` · ${t.next}` : ''}</time><span>${inline(i.text, o)}</span></li>`).join('')}</ol>`;
  }
  if (name === 'ablauf') {
    const svg = readDiagram(flowHash(content));
    if (!svg) throw new Error(`Diagram ${flowHash(content)} is not rendered yet, run: node scripts/render-diagrams.mjs`);
    const { groups } = parseFlow(content);
    const legend = ['sf', 'erp', 'ext'].filter((g) => groups[g].length).map((g) => `<span><i class="cb-lg-${g}"></i>${escHtml(t.legend[g])}</span>`).join('');
    const summary = parseFlow(content).edges.filter((e) => !e.error).map((e) => `${e.from} → ${e.to}${e.label ? ` (${e.label})` : ''}`).join('; ');
    return `<figure class="cb cb-flow"><div class="cb-flow-svg" role="img" aria-label="${escHtml(`${t.diagram}: ${summary}`)}">${svg}</div><figcaption class="cb-legend">${legend}</figcaption></figure>`;
  }
  if (name === 'pro-contra') {
    return `<div class="cb cb-procon">${parseProContra(content).map((c) => `<div class="cb-card cb-${c.kind}"><p class="cb-procon-title">${inline(c.title, o)}</p><ul>${c.items.map((i) => `<li>${c.kind === 'pro' ? icon.check : icon.cross}<span>${inline(i, o)}</span></li>`).join('')}</ul></div>`).join('')}</div>`;
  }
  if (name === 'vertiefung') {
    const { title, body } = parseDeep(content);
    return `<details class="cb cb-deep"><summary>${label(arg)}<span class="cb-deep-title">${inline(title, o)}</span></summary><div class="cb-deep-body">${paras(body, o)}</div></details>`;
  }
  if (name === 'schritte') {
    return `<ol class="cb cb-steps">${parseSteps(content).map((s, i) => `<li><span class="cb-step-no">${String(i + 1).padStart(2, '0')}</span><div><p class="cb-step-title">${inline(s.title, o)}</p>${s.meta ? `<p class="cb-step-meta">${inline(s.meta, o)}</p>` : ''}<p class="cb-step-text">${inline(s.text, o)}</p></div></li>`).join('')}</ol>`;
  }
  if (name === 'stufen' && arg === 'treppe') {
    const { stages, cases, bands } = parseStages(content);
    const n = stages.length;
    const tiles = stages.map((x, i) => `<li class="cb-stair${x.mark ? ' cb-stage-mark' : ''}" style="--i:${i}"><span class="cb-stage-letter">${escHtml(x.letter)}</span><span class="cb-stage-name">${inline(x.name, o)}</span><span class="cb-stage-text">${inline(x.text, o)}</span><span class="cb-stage-sub">${inline(x.sub, o)}</span></li><li class="cb-stair-risk" style="--i:${i}"><span class="cb-stair-risk-label">${escHtml(t.risiko)}</span>${inline(x.risk, o)}</li>`).join('');
    const bandRow = bands.length ? `<div class="cb-bands">${bands.map((b) => `<p class="cb-band${b.mark ? ' cb-band-mark' : ''}" style="grid-column:${b.from} / ${b.to + 1}">${inline(b.text, o)}</p>`).join('')}</div>` : '';
    const list = cases.length ? `<div class="cb-cases">${cases.map((c) => `<div class="cb-case"><p class="cb-case-title">${inline(c.title, o)}</p><p>${inline(c.situation, o)}</p><p class="cb-case-then">${inline(c.consequence, o)}</p></div>`).join('')}</div>` : '';
    return `<div class="cb cb-stage-block cb-stairs-block" style="--n:${n}"><ol class="cb-stairs">${tiles}</ol>${bandRow}${list}</div>`;
  }
  if (name === 'stufen') {
    const { stages, cases } = parseStages(content);
    const tiles = `<ol class="cb-stages" style="--n:${stages.length}">${stages.map((x) => `<li${x.mark ? ' class="cb-stage-mark"' : ''}><span class="cb-stage-head"><span class="cb-stage-letter">${escHtml(x.letter)}</span><span class="cb-stage-name">${inline(x.name, o)}</span></span><span class="cb-stage-body"><span class="cb-stage-sub">${inline(x.sub, o)}</span><span class="cb-stage-text">${inline(x.text, o)}</span></span></li>`).join('')}</ol>`;
    const list = cases.length ? `<div class="cb-cases">${cases.map((c) => `<div class="cb-case"><p class="cb-case-title">${inline(c.title, o)}</p><p>${inline(c.situation, o)}</p><p class="cb-case-then">${inline(c.consequence, o)}</p></div>`).join('')}</div>` : '';
    return `<div class="cb cb-stage-block">${tiles}${list}</div>`;
  }
  if (name === 'saeulen') {
    const { roof, base, pillars } = parsePillars(content);
    const cols = pillars.map((x, i) => `<li><span class="cb-pillar-head">${iconHtml(x.icon, 'cb-pillar-icon')}<span class="cb-pillar-no">${String(i + 1).padStart(2, '0')}</span></span><span class="cb-pillar-name">${inline(x.name, o)}</span><span class="cb-pillar-sub">${inline(x.sub, o)}</span><span class="cb-pillar-text">${inline(x.text, o)}</span></li>`).join('');
    return `<div class="cb cb-pillars${roof ? ' cb-pillars-roofed' : ''}" style="--n:${pillars.length}">${roof ? `<p class="cb-pillar-roof">${inline(roof, o)}</p>` : ''}<ol>${cols}</ol>${base ? `<p class="cb-pillar-base">${inline(base, o)}</p>` : ''}</div>`;
  }
  if (name === 'hebel') {
    return `<div class="cb cb-levers">${parseSteps(content).map((s, i) => `<div class="cb-lever"><p class="cb-lever-no">${lang === 'de' ? 'Hebel' : 'Lever'} ${String(i + 1).padStart(2, '0')}</p><p class="cb-lever-title">${inline(s.title, o)}</p><p class="cb-lever-text">${inline(s.text, o)}</p>${s.meta ? `<p class="cb-lever-effect">${inline(s.meta, o)}</p>` : ''}</div>`).join('')}</div>`;
  }
  if (name === 'eintrag') {
    const { rows, note } = parseEntry(content);
    return `<div class="cb cb-entry"><p class="cb-entry-head"><span>${inline(arg, o)}</span><span>${t.entry}</span></p><dl>${rows.map((r) => `<div${r.mark ? ' class="cb-entry-mark"' : ''}><dt>${inline(r.field, o)}</dt><dd>${inline(r.value, o)}</dd></div>`).join('')}</dl>${note ? `<p class="cb-entry-note">${inline(note, o)}</p>` : ''}</div>`;
  }
  if (name === 'partnerfluss') {
    const { without, with: withArch } = parsePartnerFlow(content);
    return `<figure class="cb cb-partnerflow"><div class="cb-pf-col cb-pf-without"><p class="cb-pf-title">${inline(without.title, o)}</p>${partnerFlowSvg('without', arg, lang)}<p class="cb-pf-caption">${inline(without.caption, o)}</p></div><div class="cb-pf-col cb-pf-with"><p class="cb-pf-title">${inline(withArch.title, o)}</p>${partnerFlowSvg('with', arg, lang)}<p class="cb-pf-caption">${inline(withArch.caption, o)}</p></div></figure>`;
  }
  if (name === 'vergleich') {
    return `<div class="cb cb-compare">${parseCompare(content).map((c) => `<div class="cb-compare-col cb-compare-${c.kind}"><p class="cb-compare-title">${inline(c.title, o)}</p><ul>${c.items.map((i) => `<li>${c.kind === 'with' ? icon.check : icon.cross}<span>${inline(i, o)}</span></li>`).join('')}</ul></div>`).join('')}</div>`;
  }
  return '';
}
