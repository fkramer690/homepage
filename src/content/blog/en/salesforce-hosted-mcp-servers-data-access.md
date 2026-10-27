---
title: "Salesforce hosted MCP servers: who reads which data?"
description: "Who may read which Salesforce data through hosted MCP servers: named users, OAuth with PKCE, sobject-reads first, and where the Einstein Trust Layer stops."
pubDate: 2026-10-27
lang: en
slug: salesforce-hosted-mcp-servers-data-access
translationKey: hosted-mcp-servers-data-access
topic: security
tags: [mcp, hosted mcp, security, einstein trust layer, claude, manufacturing]
takeaways:
  - "Every hosted MCP call runs as the named user who authorised the connection, with that user's object rights, field-level security and sharing; there are no service accounts and no machine-to-machine flows."
  - "Salesforce permissions apply per person, not per channel: whatever a user sees in Lightning can reach an external model, so showing Claude less than the person sees needs Named Queries or custom servers."
  - "Start with the sobject-reads server in a sandbox; it removes the risk of changes to records, but not the risk that data leaves through the AI client."
  - "In my assessment the Einstein Trust Layer does not protect data an external model reads through hosted MCP; Salesforce documents it for its own LLM calls and never mentions it for hosted MCP."
  - "Restrict each External Client App to one permission set, keep administrators out and settle the AI provider contract before the first department connects."
faq:
  - q: "Can Claude read all our Salesforce data through hosted MCP?"
    a: "No. Claude sees exactly what the user who authorised the connection sees, because each call runs with that user's object permissions, field-level security and sharing rules. If that user is an administrator, that can be almost the whole org."
  - q: "Does the Einstein Trust Layer mask data that Claude reads through MCP?"
    a: "Salesforce does not say so. The Trust Layer is documented for LLM calls Salesforce makes itself, such as the Models API or Agentforce. With hosted MCP the external client's model processes the results, so I assume masking and Salesforce's zero data retention agreements do not apply and your AI contract governs the data."
  - q: "Can we run a nightly AI agent through hosted MCP?"
    a: "No. Hosted MCP supports only the OAuth authorisation code flow with a logged-in user and has no service accounts or machine-to-machine flows. Background agents need the Agent API or a classic integration with its own integration user."
  - q: "Which hosted MCP server should we enable first?"
    a: "Salesforce recommends sobject-reads in a sandbox. I agree, and before production I would add Named Queries or a custom server per user group, so the external model only receives the fields that group needs."
  - q: "How do we see what an AI client did in Salesforce?"
    a: "Hosted MCP calls appear in the standard API logs with user, operation, object and timestamp; filter on API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP. The logs show what was read, not what the model did with it afterwards."
draft: false
---

Through Salesforce hosted MCP servers, an AI client such as Claude or ChatGPT reads exactly what the user who authorised the connection may read. On the Salesforce side that is well designed: OAuth with PKCE, no service accounts, every call in the API log under a person's name. The weak point sits after the call. Once the records reach the external model, in my assessment the Einstein Trust Layer no longer protects them, and your contract with the AI provider decides what happens. I would start with sobject-reads, one permission set per user group and a reviewed AI contract.

## How do hosted MCP servers decide who sees what?

Salesforce made hosted MCP servers [generally available on 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for every Enterprise Edition org and above. MCP (Model Context Protocol) is the open standard through which an AI client calls tools in another system; the basics are in [MCP for IT leads](../mcp-salesforce-explained-for-it-leads/). The servers stay off until an administrator enables them. The [server reference](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html) lists four sObject servers (All, Reads, Mutations, Deletes) plus Data 360, Tableau Next and Headless 360 (beta).

The access model is set out in the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html):

- **Named user.** Each tool call runs with the object permissions, field-level security and sharing of the user who authorised the connection, and appears under that name in the audit trail.
- **No technical users.** "There are no service accounts, no machine-to-machine flows." A person always has to log in.
- **OAuth with PKCE.** Login runs through the authorisation code flow in the browser. PKCE (Proof Key for Code Exchange) is mandatory and stops an intercepted authorisation code from being redeemed by someone else.
- **No self-registration.** An admin creates an External Client App for each AI client and can restrict it to profiles and permission sets.

Two details belong in your review. The [official Claude setup](https://developer.salesforce.com/blogs/2026/05/connect-claude-with-salesforce-hosted-mcp-servers) requests the scopes `refresh_token, offline_access`, labelled "Perform requests at any time". After one login the client keeps working until the token is revoked or expires, so the refresh token policy matters. On the positive side, the `mcp_api` scope gives access to MCP "but not our existing REST APIs", according to the GA post. A token stolen from an MCP client opens less than a classic API token.

## Why do permissions per person not protect per channel?

The security guide states the rule: what a user cannot do in the Lightning UI or the REST API, they cannot do through MCP. The reverse holds too. Everything a key account manager can open in Lightning, the AI client can query, and one query returns hundreds of records that a person would click through one at a time.

Field-level security belongs to the user, not to the channel. If your sales users can read dealer purchase prices, margin fields or the personal data of service technicians, Claude can read them too, and they leave Salesforce. Sharing for cases, warranty claims and price agreements was designed for a human who opens one record at a time, not for a client that reads 400 in a row.

If an external model should see less than the person, the standard sObject servers cannot help, because their tool sets cannot be changed. Three things can:

- **Named Queries.** An admin exposes a fixed SOQL query as an API, created in Setup or VS Code according to the [REST API guide](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_named_query_intro.htm). A query "open cases for serial number X" with five fields replaces free SOQL.
- **Custom servers.** Flows, invocable Apex, Apex REST and API Catalog endpoints can be bundled into a [custom server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html). Salesforce recommends one server per persona, because "beyond a few dozen tools, an AI client struggles to select the right one". A Flow that returns a dealer overview without price fields answers the question and hides the rest.
- **Dedicated users.** Salesforce's own example ties a data hygiene server to "a dedicated user profile that only data stewards can authenticate as".

Custom servers cost build effort, but they also cut calls per question, which counts once Salesforce bills them, see [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

## Which server should you enable first?

The GA post recommends `sobject-reads` in a sandbox and calls it "read-only, risk-free, and immediately useful". I agree with the starting point, not with "risk-free". The security guide is more precise: the read-only server removes modification risk. It does nothing about data leaving through the client.

Simon Willison calls the dangerous combination the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): access to private data, exposure to untrusted content and a way to communicate externally, and he notes that MCP encourages mixing tools from different sources. A Claude session with `sobject-reads`, web access and an email server has all three. At a manufacturer, untrusted text reaches the CRM through dealer portals, web-to-lead, email-to-case and warranty forms, see [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

My order: `sobject-reads` in a sandbox for a small group; Named Queries or a custom server per persona before production; `sobject-mutations` only for a defined process with approval in the client, which Salesforce in Claude asks for by default according to [Anthropic's setup guide](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization). `sobject-deletes` and `sobject-all` I would not give to business users at all.

## Does the Einstein Trust Layer protect data that Claude reads?

Salesforce has not documented this case. What follows is my reading of the documentation, not a Salesforce statement.

The [Trust Layer documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html) lists protections "when interfacing with LLMs": grounding, masking of sensitive data, toxicity detection, audit trail and zero data retention agreements with third-party LLM partners. Trailhead describes [the path](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-response-journey): personal data is masked before the prompt leaves Salesforce, passes the Secure LLM Gateway, and "no customer data including the prompt text and generated responses are stored outside of Salesforce". All [Models API](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html) calls go through the Trust Layer, and when Agentforce is the MCP client, [Trailhead promises](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce) the Trust Layer and zero data retention as well.

Hosted MCP reverses the direction. Claude, ChatGPT or Cursor is the client and brings its own model. Salesforce checks token and permissions, runs the query and returns records, which the client then puts into a prompt for its model. Salesforce makes no LLM call on this path, so no gateway step exists where masking could act, and its zero data retention agreements bind Salesforce's LLM partners for Salesforce's calls, not a model you license yourself. The documents fit this reading: the hosted MCP overview, the security guide, the GA post and the Claude setup post cover authentication, permissions and logging, and none mentions the Trust Layer.

Two statements need care. The [Claudeforce release](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) says that through Amazon Bedrock, Claude is available within the Salesforce Trust Boundary. That is Claude as a model inside Salesforce, not the Claude app on a sales rep's laptop. The [AIforce announcement](https://www.salesforce.com/news/stories/aiforce-announcement/) says business data "is not retained by the model provider", while Anthropic's setup guide says nothing about retention. I would ask both vendors in writing which contract backs that sentence for your org.

Until then your AI contract governs the data. For Claude Code, Anthropic's [data usage page](https://code.claude.com/docs/en/data-usage) says commercial prompts are not used for training, standard retention is 30 days, and zero data retention is enabled per organisation for eligible Enterprise accounts. These terms go to your data protection officer, and to the works council where employee data is involved, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## A typical scenario: three requests at a machine builder

Assume a machine builder with Sales Cloud, Service Cloud, SAP, a dealer network and Claude Enterprise. All numbers are assumptions. In one month IT receives three requests.

**Dealer managers.** Twelve users want Claude to prepare dealer visits. Their profile can read purchase prices on the dealer price agreements. Decision: a custom server "dealer visit" whose Flow returns the overview without price fields, restricted to a permission set for these twelve.

**Service back office.** Thirty users want to look up cases, installed base and warranty status by serial number. Decision: `sobject-reads` plus a Named Query by serial number. Some case descriptions come from the dealer portal, so web access in their Claude workspace stays off.

**The implementation partner.** A developer asks for `sobject-all` in production to merge duplicate assets with Claude. Decision: no. The calls would run under his production user, and a bulk change belongs in a reviewed data load. He gets `sobject-reads` in a sandbox to analyse the duplicates.

Two of three go ahead, both narrower than asked. In my judgement that is the normal outcome of an access review.

## What should an IT lead set up before the first connection?

1. **Decide who may connect.** Restrict each External Client App to a permission set with the OAuth policy "Admin approved users are pre-authorized". Keep administrators out: an admin who authorises Claude hands it almost the whole org.
2. **Review sharing and field-level security** for cases, assets, warranty claims, price agreements and contacts.
3. **Enable only `sobject-reads`**, first in a sandbox.
4. **Narrow with Named Queries or custom servers** wherever the person sees more than the model should.
5. **Set the refresh token policy** and a revocation process for leavers and lost laptops. Why stolen OAuth tokens are a real attack path is covered in [connected apps and OAuth lessons](../connected-apps-oauth-ai-integrations/).
6. **Settle the AI contract**: training, retention, zero data retention, hosting region.
7. **Watch the API logs**, filtered on `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP`, for who reads which objects in which volume.

This is part of my work on [Salesforce integration](../../services/salesforce-integration/): an MCP server is an interface and needs an owner.

Hosted MCP enforces Salesforce permissions reliably, so the real decision is which people, which fields and which AI contract you trust with your data. If you want a second opinion before the first department connects, [send me a message](#contact).
