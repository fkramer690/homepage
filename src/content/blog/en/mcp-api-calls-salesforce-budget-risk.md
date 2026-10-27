---
title: "MCP calls to Salesforce: a budget risk without a price"
description: "Why MCP and API calls by Claude, ChatGPT and other agents become a Salesforce budget line, what Headless Platform Interactions are and how to plan for them."
pubDate: 2026-10-27
lang: en
slug: mcp-api-calls-salesforce-budget-risk
translationKey: headless-platform-interactions-budget
topic: ai
tags: [mcp, flex credits, headless platform interactions, claude, budget, manufacturing]
takeaways:
  - "Salesforce will bill every successful MCP or agentic API call by a registered external agent as a Headless Platform Interaction in Flex Credits; the rate card of 31 August 2026 lists the rate as TBA."
  - "Metering has not started, Salesforce promises 30 days' notice, and sandboxes, scratch orgs and Developer Edition orgs are excluded, according to Salesforce Ben."
  - "The external agent decides how many calls a question costs, so tool design matters as much as the rate; in the scenario, eight calls instead of two multiply the bill by four."
  - "Companies using Claude or ChatGPT on Salesforce data pay twice: the AI provider for tokens and Salesforce for the interactions."
  - "Budget a range with three assumed rates, measure calls per task in a sandbox and ask your account executive for a cap before metering starts."
faq:
  - q: "What is a Headless Platform Interaction in Salesforce?"
    a: "It is the Flex Credit meter for successful calls that a registered AI agent makes to Salesforce through MCP or an API classed as agentic. The Flex Credits rate card of 31 August 2026 lists it with the rate TBA."
  - q: "Do MCP calls to Salesforce cost money today?"
    a: "Not yet. According to Salesforce Ben, agentic usage is not metered yet and customers get 30 days' notice before metering begins. The Hosted MCP Servers documentation already says you may be billed for server usage."
  - q: "Are our existing ERP and middleware integrations affected?"
    a: "According to Salesforce Ben, existing API integrations keep their current pricing. The new meter applies to traffic Salesforce classes as agentic, which it identifies separately once an agent is registered."
  - q: "Do sandbox tests with Claude or other MCP clients cost Flex Credits?"
    a: "According to Salesforce Ben, metering only applies to active production orgs, so sandboxes, scratch orgs and Developer Edition orgs are excluded. That makes the sandbox the right place to count calls per task before go-live."
  - q: "Do the Flex Credits in the Max edition cover MCP usage?"
    a: "Salesforce says future Max editions will include an allocation for Headless 360 capacity, without a size. Until that number is published, I would not plan any MCP volume against it."
draft: false
---

MCP calls to Salesforce become a budget risk because every successful call by an external AI agent such as Claude or ChatGPT will cost Flex Credits, metered as Headless Platform Interactions. The Flex Credits rate card of 31 August 2026 lists the rate as "TBA", and metering starts only after 30 days' notice. So you have a cost line whose quantity your users and their AI tools drive and whose price Salesforce has not set. I would budget a range, count calls per task in a sandbox and get a cap into the contract now.

## What are Headless Platform Interactions?

Headless Platform Interactions are a new usage type on the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), updated as of 31 August 2026. The row sits under Customer 360 Platform, the multiplier reads "TBA", and a footnote says these usage types apply to Headless 360 usage only and come in addition to the other usage types on the card. Headless 360 is Salesforce's name for exposing the platform to outside agents: [4,000+ APIs, 60+ MCP tools and 220+ CLI commands](https://developer.salesforce.com/blogs/2026/05/headless-360-what-it-means-for-developers), according to the developer blog.

The details come from a Salesforce Help article (005360285) that I could only read through [Salesforce Ben's report of 24 September 2026](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/):

- Every successful call by a registered agent to Salesforce, through MCP or a direct API classed as agentic, counts as one Headless Platform Interaction.
- Usage is tracked in Digital Wallet.
- Agentic usage is not metered yet, and customers get 30 days' notice before metering begins.
- Only active production orgs are metered. Sandboxes, scratch orgs and Developer Edition orgs are excluded.
- Existing API integrations keep their current pricing.

The [Hosted MCP Servers documentation](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) already says the servers are "intended only for customers with Flex Credits and you may be billed for server usage". When Salesforce made them [generally available on 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition and above, the announcement did not mention pricing. If you connected Claude in the spring and filed it under free, that assumption now has an end date, and nobody knows it yet.

## Why do MCP calls to Salesforce become a budget item?

With an Agentforce agent you design the actions, so you know that an order status request costs, say, two actions at 20 credits each. With an external agent you do not decide the call count. Salesforce Ben puts it plainly: the cost per interaction does not vary, but the number of interactions depends on the third-party agent's behaviour and implementation. Claude may answer "which orders of this dealer are late?" with one query, or with a search, five record reads and two follow-up queries because the first answer was incomplete.

Three effects make this a budget question for a manufacturer:

- **You pay twice.** The AI provider bills tokens or seats, Salesforce bills the interactions. Salesforce Ben draws the same conclusion.
- **The pool is shared.** Flex Credits for interactions come from the same pool as Agentforce actions, prompts and Data 360. Unused credits [do not roll over](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) past the order end date, so overbuying costs money as well.
- **Volume grows without a project.** Once a few key account managers use Salesforce in Claude, colleagues follow. Nobody files a change request for that, and the first sign is the Digital Wallet.

There is a second ceiling that has nothing to do with Flex Credits. Agents that call the REST API directly draw on the org's [daily API request allocation](https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-api.html): in Enterprise Edition 100,000 plus 1,000 per Salesforce licence per 24 hours, shared by all callers. Your SAP integration and your middleware use the same allocation. The limit is soft, but past the system protection limit calls fail with [REQUEST_LIMIT_EXCEEDED](https://developer.salesforce.com/blogs/2024/11/api-limits-and-monitoring-your-api-usage). Whether hosted MCP calls count against it, the documentation I read does not say. I would ask before a busy month end shows you.

## A typical scenario: key account managers with Claude

Assume a machine builder with 60 key account and dealer managers who use Claude with Salesforce. Each asks 15 questions a day on 220 working days: open orders of a dealer, last service visits on an installed machine, warranty cases of the quarter. That is 198,000 questions a year. All numbers are assumptions, and the three rates below are hypothetical, because Salesforce has published none.

The decisive variable is calls per question. With the generic sObject tools, Claude often needs several reads to assemble one answer; assume eight. With a focused custom tool, for example an autolaunched Flow "dealer order overview" that returns everything in one response, assume two. One Flex Credit costs [$0.005 at list price](https://www.salesforce.com/agentforce/pricing/).

| Assumed rate per interaction | 2 calls per question | 8 calls per question |
|---|---|---|
| 1 credit | 396,000 credits, $1,980 | 1,584,000 credits, $7,920 |
| 4 credits | 1,584,000 credits, $7,920 | 6,336,000 credits, $31,680 |
| 20 credits (like one action) | 7,920,000 credits, $39,600 | 31,680,000 credits, $158,400 |

Two points stand out. First, tool design moves the bill by a factor of four, as much as the jump from the lowest to the middle rate. Second, the [Max edition](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) includes 2.75 million Flex Credits. In the middle row with generic tools, this team alone would use that pool 2.3 times over, before a single Agentforce action or Data 360 query. Salesforce says future Max editions will include "an allocation for Headless 360 capacity", without a size. Until that number exists I would not plan anything against it.

Claude seats for the 60 users come on top. How the in-house alternative compares is covered in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/) and, for a dealer agent, in [what a dealer service agent costs](../dealer-service-agent-cost-calculation/).

## How do you budget a meter without a price?

1. **Find the agents that already run.** Ask which teams connect Claude, ChatGPT, Copilot or their own scripts to Salesforce. Hosted MCP traffic appears in the API logs with user attribution and can be filtered by `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP`, according to the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html).
2. **Count calls per task in a sandbox.** Sandboxes are not metered, so this costs nothing. Take the ten most common questions per user group and log how many calls each needs.
3. **Build focused servers per persona.** Salesforce's own [guidance on custom servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html) says that beyond a few dozen tools an AI client struggles to pick the right one, and recommends one server per role. A Flow or an invocable Apex action that returns a complete dealer overview saves calls on every question. Who may read what through these servers is the topic of [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/).
4. **Prepare for registered agents.** Salesforce Ben reports a new Agentic Identity framework: agents get their own credentials, and connections will have to be reconfigured to OAuth credentials tied to that identity. Today hosted MCP runs as the named user. Plan this change with your integration partner.
5. **Budget a range.** Use the three assumed rates from the scenario, take the middle one as plan and the upper one as risk reserve.
6. **Negotiate before the notice.** Ask your account executive for the rate, a cap or a fixed allocation, and whether the Max allocation applies to you. Thirty days is too short for a budget cycle. Salesforce writes about AIforce that ["pricing and packaging are subject to change"](https://www.salesforce.com/news/stories/aiforce-announcement/), which works in both directions.
7. **Set alerts.** Digital Wallet offers threshold alerts and breakdowns, but it [requires Data 360 to be turned on](https://www.salesforce.com/agentforce/digital-wallet/). If your org runs without Data 360, clarify now how you will see the consumption at all.

## Where should external agents not go through Salesforce?

Not every question belongs on this path. If order status, stock and credit limits live only in SAP or proALPHA, an agent that reaches the ERP through Salesforce adds a metered hop without adding information. If Salesforce only mirrors the ERP data, decide where the agent should read before the meter starts. That is an architecture question for [Salesforce integration](../../services/salesforce-integration/), and the commercial side, Claude seats versus Agentforce versus nothing at all, belongs in [make-or-buy and licence planning](../../services/make-or-buy-licences/).

I would also keep bulk work away from external agents. A Claude session that checks 5,000 installed base records for missing warranty dates produces thousands of interactions; a report or a batch job does the same for free. MCP fits dialogue, not data cleansing. The basics of MCP and the decisions an IT lead has to make are in [MCP for IT leads](../mcp-salesforce-explained-for-it-leads/), and what AIforce brings on top is in [AIforce: Salesforce in Claude and Slack](../aiforce-salesforce-in-claude-and-slack/).

External agents on Salesforce data will cost money per call, so measure the calls and negotiate the price while metering is still off. If you want a second opinion on your estimate, [send me a message](#contact).
