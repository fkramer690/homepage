---
title: "MCP and Salesforce interfaces for AI agents"
description: "Which MCP servers and interfaces Salesforce offers for AI agents, what the DX MCP Server end of life means, and who may read which data."
lang: en
slug: mcp-and-interfaces
translationKey: masterclass-03
chapter: 3
short: "MCP and interfaces"
summary: "Which MCP servers and APIs connect AI agents to Salesforce, who reads which data through them and what the calls will cost."
takeaways:
  - "The local Salesforce DX MCP Server (@salesforce/mcp) reaches end of life on 2 November 2026 according to the maintainers' notice; teams should inventory their configurations now."
  - "Hosted MCP Servers have been GA for Enterprise Edition and above since 29 April 2026, are off by default and run every call with the permissions of the signed-in user."
  - "Hosted MCP has no service accounts and no machine-to-machine flows; unattended night-time agents need the Agent API or a classic integration instead."
  - "When an external model such as Claude reads data through Hosted MCP, I find no statement in the Salesforce docs that the Einstein Trust Layer applies; the AI vendor contract is what counts."
  - "Agentic MCP and API calls will consume Flex Credits as Headless Platform Interactions; the rate card dated 31 Aug 2026 still lists the rate as TBA."
articles: [salesforce-dx-mcp-server-end-of-life, mcp-explained-salesforce-it-leads, hosted-mcp-servers-data-access, headless-platform-interactions-budget]
faq:
  - q: "What happens to the Salesforce DX MCP Server on 2 November 2026?"
    a: "According to the maintainers' notice (issue 46 in the forcedotcom/mcp repository), the local server then gets no more maintenance, support or releases. The npm package is marked deprecated but stays installable. Pin version 0.30.15 and plan the move to skills, the plugin and Hosted MCP."
  - q: "Can an AI agent read all Salesforce data through Hosted MCP?"
    a: "No. Every call runs with the object permissions, field-level security and sharing of the user who authorised the connection. The agent sees exactly what that person sees, and every action is attributed to them in the audit trail."
  - q: "Do MCP calls to Salesforce cost extra?"
    a: "Salesforce says Hosted MCP Servers are intended only for customers with Flex Credits and that usage may be billed. The Headless Platform Interaction rate is not published yet; according to SalesforceBen, customers get 30 days' notice before metering starts."
draft: false
---

MCP (Model Context Protocol) is the standard way AI tools such as Claude, ChatGPT or Cursor work with Salesforce in 2026. Three points matter for manufacturers. The local Salesforce DX MCP Server reaches end of life on 2 November 2026. Salesforce's hosted MCP servers have been GA since April 2026 and always act on behalf of a signed-in user. And agentic calls will soon cost Flex Credits, at a rate Salesforce has not published. My advice: start read-only, grant access per person, and settle the budget line before the rollout.

## What is MCP, and where does it sit in a Salesforce architecture?

MCP is an open protocol that lets an AI tool call other systems as tools: read records, run a query, start an action. The server describes which tools it offers; the client (Claude, ChatGPT, Cursor or Agentforce) decides when to use which. Since 2025 Salesforce has added MCP almost everywhere. For architecture work it helps to separate three directions:

1. **Coding agent to project and org.** A developer at your partner works with Claude Code, Codex, Cursor or Agentforce Vibes, and the agent reads metadata, deploys and runs tests. This is where the local DX MCP Server and the MCP servers in Salesforce's Claude Code plugin sit.
2. **External AI to your data.** Someone in your service back office asks Claude about the open cases for a machine. This is where the Hosted MCP Servers and "Salesforce in Claude" sit.
3. **Agentforce to other systems.** An Agentforce agent calls a tool outside Salesforce, such as an order lookup in the ERP. This is where Agentforce's MCP client and the route through MuleSoft and the API Catalog sit.

Interfaces without MCP still matter: the Agent API, which lets other systems call an Agentforce agent, the Models API for LLM calls from Apex, and the sf CLI, which runs deployments in the pipeline. MCP replaces none of them. [Chapter 1](../terms-and-map/) sorts out the terms, and [MCP and Salesforce explained for IT leads](../../../blog/mcp-salesforce-explained-for-it-leads/) covers the decisions that sit with IT.

## The interfaces at a glance

| Interface | Who calls whom | Identity | Status October 2026 |
|---|---|---|---|
| Salesforce DX MCP Server, local (`@salesforce/mcp`) | coding agent to org and project | existing sf CLI login, orgs on an allowlist | end of life on 2 November 2026 |
| Claude Code plugin `salesforce-development` | Claude Code to metadata knowledge, Apex and SOQL language servers | local sf CLI login | released 19 August 2026 |
| Hosted MCP, sObject servers | external AI to records | signed-in user, OAuth with PKCE | GA since 29 April 2026 |
| Hosted MCP, custom servers | external AI to flows, Apex, API Catalog APIs, Agentforce agents | signed-in user | documented |
| Headless 360 MCP | external AI to Setup tasks | signed-in user, API 67.0 or later | beta since July 2026 |
| Salesforce in Claude | Claude to sales data, 37 skills | not described in the announcement | beta for all customers |
| Agentforce as MCP client | Agentforce to external tools | external and named credentials | announced as pilot in 2025, current status not documented |
| MuleSoft API via the API Catalog | Agentforce to ERP | named credentials, created automatically | documented route |
| Agent API | any system to an Agentforce agent | client credentials with a run-as user | documented |
| Models API | Apex to LLM | Salesforce login | goes through the Einstein Trust Layer |

Sources: [DX MCP Server end-of-life notice](https://github.com/forcedotcom/mcp/issues/46), [plugin announcement](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin), [Hosted MCP GA](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), [custom servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html), [agents as MCP tools](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/agentforce.html), [Headless 360 MCP](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/headless-360-mcp.html), [AIforce announcement](https://www.salesforce.com/news/stories/aiforce-announcement/), [MCP pilot 2025](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce), [MCP registration in packages](https://developer.salesforce.com/docs/platform/pkg2-dev/guide/dev2gp-package-mcp-agentforce.html), [MuleSoft and API Catalog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog), [Agent API](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html), [Models API](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html).

For a manufacturer three rows are urgent today: the DX MCP Server, because your partner probably uses it; the Hosted MCP Servers, because business teams will ask for Claude or ChatGPT on top of CRM data; and the route to the ERP, because order status, stock and prices live in SAP or proALPHA. Agentforce agents can only be exposed as MCP tools if they were built in the new Agent Script Builder; older agents have to be upgraded first.

## 2 November 2026: what the DX MCP Server end of life means

The maintainers' [end-of-life notice](https://github.com/forcedotcom/mcp/issues/46) says the local server `@salesforce/mcp` reaches end of life on 2 November 2026 and will then receive no more maintenance, support or new releases. The npm package will be marked deprecated but stays installable, so pinned setups such as version 0.30.15 keep working.

The notice names the open skills library `forcedotcom/sf-skills` as the replacement. Salesforce also published the [Claude Code plugin](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) with about 40 of those skills and three MCP servers (salesforce-api-context, salesforce-metadata-experts, salesforce-lsp), and Hosted MCP for data access. The plugin announcement does not mention the DX MCP end of life. Treating all three as the successors is my reading, not a Salesforce statement.

As the client, the question that matters most is which permissions the old server has at your partner. For agents I would only allow fixed sandbox aliases, because two settings otherwise widen access without anyone noticing.

```vertiefung For developers
title: How the local DX MCP Server reaches orgs
According to the [Salesforce documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_mcp.htm), it reads existing encrypted auth files and only reaches orgs allowlisted at start-up.

- In the [README](https://github.com/salesforcecli/mcp), `ALLOW_ALL_ORGS` grants access to all authorised orgs, production included, and Salesforce advises using it with caution.
- `DEFAULT_TARGET_ORG` is resolved again on every tool call: if the developer switches their default org, the agent silently works in the other one.
```

My plan up to the deadline:

```schritte
Inventory
  Ask your partner to list which MCP configurations, machines and repositories contain the server.
Pin
  Set version 0.30.15 explicitly instead of `latest`, so the transition stays predictable.
Map
  Deploy and tests through the sf CLI and skills, metadata knowledge through the plugin, data access through Hosted MCP.
Run both in a sandbox
  Then remove the old entry and update the AI rules file in the repository.
```

The details are in [Salesforce DX MCP Server end of life](../../../blog/salesforce-dx-mcp-server-end-of-life/). The other tools Salesforce offers for AI-assisted development are in [chapter 2](../salesforce-ai-development-tools/).

## Hosted MCP: who may read which data?

Salesforce released the Hosted MCP Servers on [29 April 2026 for every Enterprise Edition org and above](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available). They run on Salesforce infrastructure; an admin enables them in Setup under API Catalog and creates an External Client App with the `mcp_api` and `refresh_token` scopes. The [server reference](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html) lists four sObject servers (All, Reads, Mutations, Deletes) plus servers for Data 360, Tableau Next and Headless 360.

The security model is strict, which is good news for manufacturers. From the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html):

- Servers are off by default and have to be enabled deliberately.
- Every tool call runs with the object permissions, field-level security and sharing rules of the user who authorised the connection, and is attributed to that user in the audit trail.
- There are no service accounts, no machine-to-machine flows and no operation outside a user context.
- External Client Apps can be restricted to profiles and permission sets.
- MCP traffic can be isolated in the API logs with `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP`.
- Named Queries expose only predefined SOQL queries instead of free querying.

Salesforce itself suggests starting with `sobject-reads` in a sandbox and calls it ["read-only, risk-free, and immediately useful"](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available). I agree: start read-only, add Mutations only after a test with sign-off, Deletes only with a good reason. For the [Headless 360 MCP server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/headless-360-mcp.html), Salesforce recommends that the client asks for approval before any tool that changes org configuration or edits or deletes data.

This sets an architectural limit. A night-time agent that pre-sorts warranty claims without a human does not fit Hosted MCP. For that you have the Agent API, which uses client credentials and a run-as user, or a classic integration. I would treat that user like any integration user: its own permissions, no admin profile, regular reviews.

### The Einstein Trust Layer gap

For the Models API, Salesforce states that all calls go through the [Einstein Trust Layer](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html). In the Hosted MCP documentation I read, I find no matching statement for the case where an external model processes the responses. My reading: when Claude or ChatGPT reads cases and asset data through Hosted MCP, the AI vendor's contract and data processing govern that data. Salesforce checks permissions, not what happens to the data afterwards. That belongs in the data protection review before the first business team starts.

Then there is prompt injection. In [ForcedLeak](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html) (CVSS 9.4, published September 2025), attackers hid instructions in the description field of a Web-to-Lead form, and Agentforce sent CRM data to an outside domain. Simon Willison calls the mix of private data, untrusted content and a way out the ["lethal trifecta"](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) and points out that MCP encourages exactly this mixing of tools. At manufacturers, outside text reaches the CRM through dealer portals, warranty claims and Email-to-Case. More in [Hosted MCP servers: who may read which data](../../../blog/salesforce-hosted-mcp-servers-data-access/) and [prompt injection in dealer portals](../../../blog/prompt-injection-dealer-portals-agentforce/).

## What do MCP calls to Salesforce cost?

The [Hosted MCP Servers overview](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) says: "intended only for customers with Flex Credits and you may be billed for server usage". The [Flex Credits rate card dated 31 Aug 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) lists the meter "Headless Platform Interaction" with the rate TBA. According to [SalesforceBen](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/), successful calls by registered agents via MCP or API count, metering applies only to active production orgs, customers get 30 days' notice, and existing API integrations keep their current pricing.

For planning, this means you do not know the price, but you can estimate the volume. Count users, questions per day and tool calls per question, because an agent often calls several tools for one answer. The worked numbers are in [MCP and API calls to Salesforce as a budget risk](../../../blog/mcp-api-calls-salesforce-budget-risk/), and the cost models as a whole in [chapter 7](../costs-and-tokens/).

## A typical scenario: service data in Claude at a machine builder

Assume a machine builder with Service Cloud, SAP S/4 and an implementation partner whose six developers work with Claude Code. All numbers are assumptions. The head of service wants 25 people in the service back office to ask Claude about open cases, the installed base and warranty status.

This is how I would approach it:

- **Partner first.** Before 2 November, inventory the DX MCP entries, pin 0.30.15 and switch the sandboxes to the plugin and skills. No agent gets a production org.
- **Start read-only.** Enable only `sobject-reads`, restrict the External Client App to a dedicated permission set, test in a sandbox first. For serial number lookups, use a Named Query instead of free SOQL.
- **ERP stays deterministic.** Order status and delivery dates from SAP come through a MuleSoft API in the API Catalog, not from a model interpreting tables. The route is described in [Agentforce and SAP order status](../../../blog/agentforce-sap-order-status-mulesoft/).
- **Estimate volume.** Assume 25 people, 20 questions a day, four tool calls per question and 21 working days: that is 42,000 calls a month. If every successful call counts, which is my assumption today, this is the number you multiply by the rate once Salesforce publishes it.
- **Settle data protection.** The contract with Anthropic and sign-off from data protection and the works council come before the start, because in my reading the Trust Layer does not apply here.

## Which decisions sit with the IT lead?

Salesforce puts the setup at under 30 minutes. The real work is in five decisions:

1. **Which servers** get enabled, and who may enable new ones?
2. **Which users** get access, through which permission set?
3. **Which data** is readable, which is writable, and where does a Named Query do the job?
4. **Which models and contracts** are approved: Claude, ChatGPT, a model through a cloud provider in the EU?
5. **Who pays** for Headless Platform Interactions, the business unit or IT?

These questions are part of my work on [Salesforce integration](../../../services/salesforce-integration/). [Chapter 4](../external-coding-agents/) covers the external coding agents your partner can use, and the [masterclass overview](../) lists all chapters.

MCP makes Salesforce reachable for every AI tool; whether that helps your service depends on permissions, data routes and budget. If you want your interfaces reviewed before 2 November or before the first rollout, [send me a message](#contact).
