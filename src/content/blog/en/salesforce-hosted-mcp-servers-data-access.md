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

Salesforce made hosted MCP servers [generally available on 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for every Enterprise Edition org and above. MCP (Model Context Protocol) is the open standard through which an AI client calls tools in another system; the basics are in [MCP for IT leads](../mcp-salesforce-explained-for-it-leads/). The servers run on Salesforce infrastructure and are switched off until an administrator enables them. The [server reference](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html) lists four sObject servers (All, Reads, Mutations, Deletes) plus servers for Data 360, Tableau Next and Headless 360, the last one in beta.

The access model is described in the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html):

- **Named user.** Each tool call runs with the object permissions, field-level security and sharing of the user who authorised the connection, and appears under that user's name in the audit trail.
- **No technical users.** "There are no service accounts, no machine-to-machine flows." A person always has to log in.
- **OAuth with PKCE.** Login runs through the authorisation code flow in the browser. PKCE (Proof Key for Code Exchange) is mandatory and stops an intercepted authorisation code from being redeemed by someone else.
- **No self-registration.** Dynamic client registration is not supported. An admin creates an External Client App for each AI client and can restrict it to profiles and permission sets.

Two details matter for your review. The [official Claude setup](https://developer.salesforce.com/blogs/2026/05/connect-claude-with-salesforce-hosted-mcp-servers) asks for the scopes `refresh_token, offline_access`, which Salesforce labels "Perform requests at any time". After one login, the client keeps working without a new login until the token is revoked or expires, so the refresh token policy of the External Client App belongs on your checklist. On the positive side, the GA announcement says the `mcp_api` scope gives access to MCP "but not our existing REST APIs". A token stolen from an MCP client opens less than a classic API token.

## Why do permissions per person not protect per channel?

The security guide states the rule: if a user cannot do something in the Lightning UI or the REST API, they cannot do it through MCP. The reverse also holds. Everything a key account manager can open in Lightning, the AI client can query, and a query returns hundreds of records in one call where a person would click through them one by one.

Salesforce has no field-level security per channel. If your sales users can read dealer purchase prices, margin fields or the personal data of service technicians, Claude can read them too, and they leave Salesforce. Orgs at machine builders have often grown over years, and sharing for cases, warranty claims and price agreements was set for a human who would never open 400 records in a row. The permission clean-up for AIforce is covered in [AIforce: Salesforce in Claude and Slack](../aiforce-salesforce-in-claude-and-slack/); here the point is architectural.

If an external model should see less than the person, the standard sObject servers cannot help, because their tool sets cannot be changed. Three things can:

- **Named Queries.** An admin exposes a fixed SOQL query as an API, created in Setup or VS Code according to the [REST API guide](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_named_query_intro.htm). The security guide names them as the way to limit agents to a defined slice of data. A query "open cases for serial number X" with five fields replaces free SOQL.
- **Custom servers.** Flows, invocable Apex, Apex REST and endpoints from the API Catalog can be bundled into a [custom server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html). Salesforce recommends one server per persona, because "beyond a few dozen tools, an AI client struggles to select the right one". A Flow that returns a dealer overview with order count, open cases and warranty status answers the question without the price fields.
- **Dedicated users.** Salesforce's own example ties a data hygiene server to "a dedicated user profile that only data stewards can authenticate as".

Custom servers cost build and test effort, and every tool is code someone has to maintain. They also cut the number of calls per question, which matters once Salesforce bills them, see [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

## Which server should you enable first?

The GA post recommends `sobject-reads` in a sandbox and calls it "read-only, risk-free, and immediately useful". I agree with the starting point and not with "risk-free". The security guide is more precise: the read-only server removes modification risk. It does nothing about data leaving through the client.

Simon Willison calls the dangerous combination the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): access to private data, exposure to untrusted content and a way to communicate externally. MCP, he writes, encourages users to mix and match tools from different sources. A Claude session with `sobject-reads`, web access and a second MCP server for email has all three. At a manufacturer, untrusted text reaches the CRM through dealer portals, web-to-lead, email-to-case and warranty forms. How such text turns into instructions is the topic of [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

The order I would follow:

1. `sobject-reads` in a sandbox for a small group.
2. Named Queries or a custom server per persona before production.
3. `sobject-mutations` only for a defined process, with approval in the client. Salesforce in Claude asks before each change by default, according to [Anthropic's setup guide](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization); keep that setting.
4. `sobject-deletes` and `sobject-all` not for business users. I see no task in sales or service that justifies deleting records from a chat window.

## Does the Einstein Trust Layer protect data that Claude reads?

Salesforce has not documented this case. What follows is my reading of the documentation, not a Salesforce statement.

The [Trust Layer documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html) lists protections "when interfacing with LLMs": grounding in CRM data, masking of sensitive data, toxicity detection, audit trail and zero data retention agreements with third-party LLM partners. Trailhead describes [the path](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-response-journey): personal data is masked before the prompt leaves Salesforce, the prompt passes the Secure LLM Gateway, and under zero data retention "no customer data including the prompt text and generated responses are stored outside of Salesforce". The [Models API](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html) states that all its calls go through the Trust Layer. And when Agentforce is the MCP client, [Trailhead promises](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce) the Trust Layer and zero data retention.

Hosted MCP reverses the direction. Claude, ChatGPT or Cursor is the client and brings its own model. Salesforce checks token and permissions, runs the query and returns the records. The client then puts them into a prompt for its model. On this path Salesforce makes no LLM call, so there is no gateway step in which masking or a zero data retention agreement could act. Those agreements bind Salesforce's LLM partners for Salesforce's calls, not a model your employees use under your own contract. That fits the documents: the hosted MCP overview, the security guide, the GA post and the Claude setup post describe authentication, permissions and logging, and none mentions the Trust Layer.

Two statements need care. The [Claudeforce release](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) says that through Amazon Bedrock, Claude is available within the Salesforce Trust Boundary. That covers Claude inside Salesforce, as a model for Agentforce, not the Claude app on a sales rep's laptop. The [AIforce announcement](https://www.salesforce.com/news/stories/aiforce-announcement/) says business data "is not retained by the model provider", while Anthropic's setup guide for Salesforce in Claude says nothing about retention. I would ask both vendors in writing which contract backs that sentence for your org.

So your AI contract governs the data. For Claude Code, Anthropic's [data usage page](https://code.claude.com/docs/en/data-usage) says prompts under commercial terms are not used for training, standard retention is 30 days, and zero data retention is enabled per organisation by the account team for eligible Enterprise accounts. These terms go to your data protection officer, and to the works council where employee data is involved, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## A typical scenario: three requests at a machine builder

Assume a machine builder with Sales Cloud, Service Cloud, SAP as ERP, a dealer network and Claude Enterprise. All numbers are assumptions. Within one month IT receives three requests.

**Dealer managers in sales.** Twelve users want Claude to prepare dealer visits with accounts, opportunities and open cases. A check shows their profile can read purchase prices and discount fields on the dealer price agreements. Decision: a custom server "dealer visit" with a Flow that returns the overview without price fields, an External Client App restricted to a permission set for these twelve, first in a sandbox.

**Service back office.** Thirty users want to ask about cases, installed base and warranty status by serial number. Decision: `sobject-reads` plus a Named Query by serial number. Part of the case descriptions comes from the dealer portal, so web access in the Claude workspace for this group stays off.

**The implementation partner.** A developer asks for `sobject-all` in production to merge duplicate assets with Claude. Decision: no. The calls would run under his user with production rights, and a bulk change belongs in a reviewed data load or batch job. He gets `sobject-reads` in a sandbox to analyse the duplicates.

Two of three requests go ahead, both narrower than asked. In my judgement that is the normal outcome of an access review.

## What should an IT lead set up before the first connection?

1. **Decide who may connect.** Restrict each External Client App to a permission set and set the OAuth policy to "Admin approved users are pre-authorized". Keep administrators out: an admin who authorises Claude hands it almost the whole org.
2. **Review sharing and field-level security** for the objects the group will read: cases, assets, warranty claims, price agreements, contacts.
3. **Enable only `sobject-reads`**, first in a sandbox. Mutations later, deletes not at all for business users.
4. **Narrow with Named Queries or custom servers** wherever the person sees more than the model should.
5. **Check the refresh token policy** and define how tokens are revoked when someone leaves or loses a laptop. Why stolen OAuth tokens are a real attack path is covered in [connected apps and OAuth lessons](../connected-apps-oauth-ai-integrations/).
6. **Settle the AI contract** before the first department starts: training, retention, zero data retention, hosting region.
7. **Watch the logs.** Hosted MCP calls show up in the API logs with user, object and timestamp. Look at who reads which objects in which volume.

These steps are part of my work on [Salesforce integration](../../services/salesforce-integration/), because an MCP server is an interface like any other and needs an owner.

Hosted MCP enforces Salesforce permissions reliably, so the real decision is which people, which fields and which AI contract you trust with your data. If you want a second opinion before the first department connects, [send me a message](#contact).
