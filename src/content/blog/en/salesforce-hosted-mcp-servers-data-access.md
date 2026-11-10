---
title: "Salesforce hosted MCP servers: who can read which data?"
description: "Who can read which Salesforce data through hosted MCP servers: named users, OAuth with PKCE, sobject-reads first, and where the Einstein Trust Layer stops."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: salesforce-hosted-mcp-servers-data-access
translationKey: hosted-mcp-servers-data-access
topic: security
categories: [ai]
tags: [mcp, hosted mcp, security, einstein trust layer, claude, manufacturing]
takeaways:
  - "Today every call runs as the user who authorized the connection, with that user's object rights, field-level security and sharing; no service accounts."
  - "Whatever a user may access via the API can reach an external model. To show Claude less, you need custom servers instead of the sObject servers."
  - "Start with the sobject-reads server in a sandbox; it removes the risk of changes to records, but not the risk that data leaves through the AI client."
  - "In my assessment, the Einstein Trust Layer does not protect records that an external model reads through hosted MCP sObject servers."
  - "Limit who may connect through a permission set on the External Client App, keep admins out and finalize the AI contract before the first connection."
faq:
  - q: "Can Claude read all our Salesforce data through hosted MCP?"
    a: "No. Claude can read what the user who authorized the connection may access, because each call runs with that user's object permissions, field-level security and sharing rules. That can be more than the user's page layouts show, and if that user is an administrator, it can be almost the whole org."
  - q: "Does the Einstein Trust Layer mask data that Claude reads through MCP?"
    a: "Salesforce does not say so. The Trust Layer is documented for LLM calls Salesforce makes itself, such as the Models API, prompt templates or Agentforce. When an external client reads records through the sObject servers, its own model processes the results, so I assume masking and Salesforce's zero data retention agreements do not apply and your AI contract governs the data. A custom MCP tool that calls a prompt template inside Salesforce is a different case."
  - q: "Can we run a nightly AI agent through hosted MCP?"
    a: "Not as a proper integration. Hosted MCP supports only the OAuth authorization code flow with a logged-in user and has no service accounts or machine-to-machine flows; a refresh token keeps a client running, but under a person's name. Background agents need the Agent API or a classic integration with its own integration user. Salesforce has announced agent registration with separate agent identities, which may change this."
  - q: "Which hosted MCP server should we enable first?"
    a: "Salesforce recommends sobject-reads in a sandbox. I agree, and before production I would give each user group a custom server with Named Queries or flows, so the external model only receives the fields that group needs. That only narrows access if the group cannot also use sobject-reads."
  - q: "How do we see what an AI client did in Salesforce?"
    a: "Hosted MCP calls appear in the API Total Usage event logs with user, operation, object and timestamp; filter on API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP. Without paid Event Monitoring they are kept for one day. The logs show which objects were accessed, not every record returned or what the model did with the data afterwards."
draft: false
---

Through Salesforce hosted MCP servers, an AI client such as Claude or ChatGPT reads what the user who authorized the connection can access through the API. On the Salesforce side, that is well designed: OAuth with PKCE and every call logged under a person's name. Announced agent identities will change parts of this. The weak point lies after the call: once the records reach the external model, in my assessment the [Einstein Trust Layer](../einstein-trust-layer-what-it-protects/) no longer protects them, and your contract with the AI provider determines what happens. I would start with sobject-reads in a sandbox, a permission set that limits who may connect, and a reviewed AI contract.

## How do hosted MCP servers decide who sees what?

Salesforce made hosted MCP servers [generally available on 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition orgs and above. MCP (Model Context Protocol) is the open standard through which an AI client calls tools in another system; the basics are in [MCP for IT leads](../mcp-salesforce-explained-for-it-leads/). The servers stay off until an administrator enables them. The [server reference](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html) lists, among others, four sObject servers (All, Reads, Mutations, Deletes), Data 360, Tableau Next, content servers and several beta servers; check the reference for the current list. Salesforce positions hosted MCP for customers with Flex Credits, and usage can be billed.

The access model is set out in the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html):

- **Named user.** As of November 2026, each tool call runs with the object permissions, field-level security and sharing of the user who authorized the connection, and appears under that name in the audit trail.
- **No technical users.** "There are no service accounts, no machine-to-machine flows." A person always has to log in.
- **OAuth with PKCE.** The login runs through the authorization code flow in the browser. PKCE (Proof Key for Code Exchange) is mandatory and stops an intercepted authorization code from being redeemed by someone else.
- **No self-registration.** An admin creates an External Client App for each AI client and can restrict it to profiles and permission sets.

```vertiefung For admins
title: Which scopes does the AI client request?
The [official Claude setup](https://developer.salesforce.com/blogs/2026/05/connect-claude-with-salesforce-hosted-mcp-servers) requests the scopes `refresh_token, offline_access`, labeled "Perform requests at any time". After one login the client keeps working until the token is revoked or expires. According to the [security guide](https://developer.salesforce.com/blogs/2026/06/how-to-secure-salesforce-hosted-mcp-servers), the default token lasts a year, so shorten the refresh token policy in production.

On the positive side, the `mcp_api` scope gives access to MCP "but not our existing REST APIs", according to the GA post. A token stolen from an MCP client gives an attacker less access than a classic API token.
```

## Permissions apply per person, not per channel

The security guide states the rule: what a user cannot do in the Lightning UI or the REST API, they cannot do through MCP. The reverse holds too. Everything a key account manager may access through object rights, field-level security and sharing, the AI client can query, including fields their page layout hides, and one query returns hundreds of records that a person would click through one at a time.

Field-level security belongs to the user, not to the channel. If your sales users can read dealer purchase prices, margin fields or the personal data of service technicians, Claude can read that data too, and it leaves Salesforce.

If an external model should see less than the user, the standard sObject servers cannot help, because their tool sets cannot be changed. And according to the [security guide](https://developer.salesforce.com/blogs/2026/06/how-to-secure-salesforce-hosted-mcp-servers), you cannot restrict an External Client App to one specific MCP server: a user who may connect can reach every server you enabled. To narrow access, enable only narrowly scoped servers for that group. Three things help:

- **Named Queries.** An admin exposes a predefined, parameterized SOQL query as an API, created in Setup or VS Code according to the [REST API guide](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_named_query_intro.htm). For example, a query such as "open cases for serial number X" with five fields replaces free SOQL, as long as `sobject-reads` is not enabled alongside it.
- **Custom servers.** Flows, invocable Apex, Apex REST and API Catalog endpoints can be bundled into a [custom server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html). Salesforce recommends focused, persona-specific servers, because "beyond a few dozen tools, an AI client struggles to select the right one". A Flow that returns a dealer overview without price fields answers the question and hides the rest.
- **Dedicated profiles.** Salesforce's own example ties a data hygiene server to "a dedicated user profile that only data stewards can authenticate as". Those data stewards are still named users, not a shared technical user, which Salesforce calls an anti-pattern.

Custom servers require development effort, but they also reduce the number of calls per question. That matters: Salesforce plans to meter every successful call of a registered agent as a Headless Platform Interaction in Flex Credits, at a rate still listed as TBA and with 30 days' notice before metering starts, see [MCP calls as a budget risk](../flex-credits-agentforce-cost-per-action/).

## Start with sobject-reads in a sandbox

The GA post recommends `sobject-reads` in a sandbox and calls it "read-only, risk-free, and immediately useful". I agree with the starting point, not with "risk-free". The security guide is more precise: the read-only server removes modification risk. It does nothing about data leaving through the client.

Simon Willison calls the dangerous combination the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): access to private data, exposure to untrusted content and a way to communicate externally, and he notes that MCP encourages mixing tools from different sources. A Claude session with `sobject-reads`, web access and an email server has all three. At a manufacturer, untrusted text reaches the CRM through dealer portals, web-to-lead, email-to-case and warranty forms, see [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

My preferred order is: `sobject-reads` in a sandbox for a small group; Named Queries or a custom server per persona before production; `sobject-mutations` only for a defined process with approval in the client. The Salesforce in Claude product asks for that approval by default, according to [Anthropic's setup guide](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization). Other MCP clients may not; a confirmation in the client is a convenience, not a control. I would not give business users `sobject-deletes` or `sobject-all` at all.

## Does the Einstein Trust Layer protect data that Claude reads?

Salesforce has not documented this case; what follows is my reading, not a Salesforce statement.

The [Trust Layer documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html) lists protections "when interfacing with LLMs": grounding, masking of sensitive data, toxicity detection, audit trail and zero data retention agreements with third-party LLM partners. Trailhead describes [the path](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-response-journey): personal data is masked before the prompt leaves Salesforce, passes the Secure LLM Gateway, and "no customer data including the prompt text and generated responses are stored outside of Salesforce". All [Models API](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html) calls go through the Trust Layer, and when Agentforce is the MCP client, [Trailhead promises](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce) the Trust Layer and zero data retention as well.

Hosted MCP reverses the direction. Claude, ChatGPT or Cursor is the client and brings its own model. Salesforce checks the token and permissions, runs the query and returns records, which the client then puts into a prompt for its model. Salesforce makes no LLM call on this path, so there is no gateway step where masking could be applied, and its zero data retention agreements apply to Salesforce's LLM partners when Salesforce makes the calls, not to a model you license yourself. The documents fit this reading: the hosted MCP overview, the security guide, the GA post and the Claude setup post cover authentication, permissions and logging, and none mentions the Trust Layer.

```ablauf
ext: AI client, External model
sf: Token and permissions, sObject query
AI client --Tool call--> Token and permissions
Token and permissions --> sObject query
sObject query ..Records..> AI client
AI client --Prompt--> External model
```

Two statements require care. The [Claudeforce release](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) says that through Amazon Bedrock, Claude is available within the Salesforce Trust Boundary. That is Claude as a model inside Salesforce, not the Claude app on a sales rep's laptop. The [AIforce announcement](https://www.salesforce.com/news/stories/aiforce-announcement/) says business data "is not retained by the model provider", while Anthropic's setup guide says nothing about retention.

```hinweis offen
Ask Salesforce and Anthropic which contract supports the sentence "not retained by the model provider" from the AIforce announcement for your org.
```

Until then your AI contract governs the data, and it differs per product. For Claude Code, Anthropic's [data usage page](https://code.claude.com/docs/en/data-usage) says commercial prompts are not used for training, standard retention is 30 days, and zero data retention is enabled per organization for eligible Enterprise accounts. Chats in Claude Enterprise can be kept until the customer deletes them, so check the terms for the surface your people actually use. These terms go to your data protection officer, and to the works council where employee data is involved, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## Example: three requests at a machine builder

Assume a machine builder with Sales Cloud, Service Cloud, SAP, a dealer network and Claude Enterprise. All numbers are assumptions. In one month IT receives three requests.

**Dealer managers.** Twelve users want Claude to prepare dealer visits. Their profile can read purchase prices in the dealer price agreements. Decision: use a custom server "dealer visit" whose Flow returns the overview without price fields, restricted to a permission set for these twelve.

**Service back office.** Thirty users want to look up cases, installed base and warranty status by serial number. Decision: use a custom server with a Named Query by serial number, and do not enable `sobject-reads` for them in production. Some case descriptions come from the dealer portal, so web access in their Claude workspace stays off.

**The implementation partner.** A developer asks for `sobject-all` in production to merge duplicate assets with Claude. Decision: no. The calls would run as his production user, and a bulk change belongs in a reviewed data load. He gets `sobject-reads` in a sandbox to analyse the duplicates.

Two of the three requests go ahead, both in a narrower form than requested. In my judgment that is the normal outcome of an access review.

## Decide who may connect before the first connection

1. **Decide who may connect.** Restrict each External Client App to a permission set with the OAuth policy "Admin approved users are pre-authorized". That limits who connects, not what they can read. Keep administrators out: an admin who authorizes Claude hands it almost the whole org.
2. **Review sharing and field-level security** for cases, assets, warranty claims, price agreements and contacts.
3. **Enable only `sobject-reads`**, first in a sandbox.
4. **Narrow with Named Queries or custom servers** wherever the person sees more than the model should.
5. **Shorten the refresh token policy** from the one-year default and set a revocation process for leavers and lost laptops. For more on why stolen OAuth tokens are a real attack path, see [connected apps and OAuth lessons](../connected-apps-oauth-ai-integrations/).
6. **Finalize the AI contract**: training, retention, zero data retention, hosting region.
7. **Watch the API logs** for who reads which objects and at what volume, and export them, because without Event Monitoring they are kept for one day.

This is part of my work on [Salesforce integration](../../services/salesforce-integration/): an MCP server is an interface and needs an owner. Hosted MCP enforces the permissions reliably; you decide which people, fields and AI contract you trust with the data.
