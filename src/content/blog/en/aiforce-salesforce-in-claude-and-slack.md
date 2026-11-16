---
title: "AIforce: Salesforce in Claude and Slack explained"
description: "What AIforce is (Salesforce in Claude, Slackforce, Agentforce Coworker), what the SIForce rename means and what a manufacturing IT lead should do now."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: aiforce-salesforce-in-claude-and-slack
translationKey: aiforce-salesforce-in-claude-slack
topic: ai
categories: [ai]
tags: [aiforce, claude, slack, agentforce coworker, mcp, manufacturing]
takeaways:
  - "AIforce started with Claudeforce (Salesforce in Claude), Slackforce and Agentforce Coworker, all powered by the Headless Toolkit."
  - "SIForce is based only on an X post by Marc Benioff on October 9, 2026, with no press release, so documents should keep the name AIforce."
  - "Salesforce in Claude is in beta with 37 sales skills and no service skills yet. Service teams can test Coworker against CRM data instead."
  - "Salesforce in Claude and user-authenticated MCP calls run with the user's own permissions, so sharing rules that are too broad show up in a chat window."
  - "Coworker has a $50 seat license, but the Flex Credit rate for MCP calls is still TBA and pricing may change. Budget for a pilot, not a rollout."
faq:
  - q: "What is AIforce in Salesforce?"
    a: "AIforce is an interface layer Salesforce announced at Dreamforce on September 15, 2026. It makes Salesforce data, workflows and permissions usable from Claude, Slack and the Lightning interface. It started with Claudeforce (Salesforce in Claude), Slackforce and Agentforce Coworker, powered by the Headless Toolkit."
  - q: "Is AIforce now called SIForce?"
    a: "Marc Benioff wrote on X on October 9, 2026 that AIforce is officially SIForce. Salesforce Ben and other outlets reported it, but Salesforce had not issued a press release. On November 9, 2026, Salesforce's product, help and pricing pages still use AIforce."
  - q: "What do I need for Salesforce in Claude?"
    a: "Salesforce Help lists Enterprise, Performance, Unlimited and Developer Edition as requirements, along with a direct Anthropic subscription (Claude Enterprise, Team or Console), though one table says Claude Enterprise only. You also need approval through the beta sign-up. A Salesforce admin enables the MCP server and provides an External Client App, and a Claude owner configures the connector."
  - q: "Do we need Slack to use AIforce?"
    a: "No. Salesforce in Claude and Agentforce Coworker work without Slack, and Salesforce lists Coworker in Microsoft Teams as generally available in November 2026. Slackforce only matters if your company already works in Slack; for a company that uses Teams, I would not buy Slack for this purpose."
  - q: "Does Agentforce Coworker need Data 360?"
    a: "Yes. The setup documentation lists Data Cloud or Data 360 as a requirement for both usage-based and seat-based access, plus Enterprise, Unlimited or Agentforce 1 Edition. CRM data is added as a source automatically; extra Data 360 sources and indexing consume credits."
draft: false
---

AIforce is the layer Salesforce announced at Dreamforce on September 15, 2026 to make its data, workflows and permissions usable from Claude, Slack and the Lightning interface. For a manufacturing IT lead, the honest status is this: Salesforce in Claude is in beta for sales teams, Agentforce Coworker needs Data 360 and comes with a $50 seat license, and the rename to SIForce is so far a CEO post on X. I would not plan a rollout now. I would clean up permissions, decide which interface each user group works in and run one small pilot in sales.

## What is AIforce?

Salesforce calls AIforce "a live interface layer that brings the full power of Salesforce to wherever people and agents work" ([announcement, September 15, 2026](https://www.salesforce.com/news/stories/aiforce-announcement/)). In plain terms: users ask questions, update records and start workflows from another tool without opening Salesforce. In Salesforce's architecture diagram, AIforce sits above Data 360, Customer 360 and Agentforce. It started with three product families, powered by a fourth layer, the Headless Toolkit:

- **Claudeforce, or Salesforce in Claude.** A prebuilt MCP server inside Claude with 37 sales skills, plus a Salesforce Development plug-in for Claude Code with more than 40 skills. MCP (Model Context Protocol) is the open standard through which an AI tool calls functions in another system; I explain it in [MCP for IT leads](/en/blog/mcp-salesforce-explained-for-it-leads/).
- **Slackforce.** Slackforce Surfaces for live interfaces in Slack, Slackbot as a personal assistant over Slack and Salesforce data, Slack CRM and Slack Code.
- **Agentforce Coworker.** An AI teammate in Lightning that reasons over accounts, activity and history and calls the Agentforce agents you have already deployed.
- **Headless Toolkit.** MCPs, APIs, plug-ins and skills that expose the platform to your own AI tools.

Two directions are easy to mix up. In the [Claudeforce release of August 27, 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/), Salesforce names Claude as a reasoning model for the Atlas Reasoning Engine and the default model for Agentforce Coworker and Slackbot, and says that through Amazon Bedrock Claude is available within the Salesforce Trust Boundary. That is Claude inside Salesforce. Salesforce in Claude is the reverse: your CRM data goes to the Claude app your employees use. From a data protection perspective, these are two different cases.

## Is AIforce now called SIForce?

Salesforce has not confirmed it in writing. On October 9, 2026 Marc Benioff posted on X: "The era of Super Intelligence is here. AIForce is officially SIForce." I can only confirm this through secondary sources. [Salesforce Ben reported on October 12](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/) that there did not appear to be any official announcement from Salesforce and that it had asked Salesforce for comment. As of November 9, 2026, I found no press release, help article or pricing page from Salesforce that uses SIForce.

The background is a US executive order of September 29, 2026, ["Inaugurating The Era of Super Intelligence"](https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/). It tells executive departments and agencies to say "Super Intelligence" instead of "Artificial Intelligence" in their own documents. Private companies are not mentioned, so nothing obliged Salesforce to rename anything. Salesforce Ben counts SIForce as the third name for this layer in just over six months, after Headless 360 at TDX in April and AIforce at Dreamforce.

For your own documents I would write "AIforce" and add "(announced by the CEO as SIForce)" once. Order forms and contracts use whatever name Salesforce prints there, and that is the name that counts.

```zeitleiste
2026-04-29 | Hosted MCP servers generally available
2026-08-27 | Claudeforce: Claude becomes default model for Coworker and Slackbot
2026-09-15 | AIforce announced at Dreamforce
2026-09-29 | US executive order on "Super Intelligence" for agencies
2026-10-09 | Marc Benioff on X: AIforce is now SIForce
2026-10-12 | Salesforce Ben finds no official announcement
```

## Status November 2026: much of it is still announced

The announcements are broader than what you can actually switch on. Status on November 9, 2026:

- **Salesforce in Claude** is a beta. According to [Anthropic's setup guide](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization), it runs for organizations that Salesforce approves through its beta sign-up and works in chat and Claude Cowork on web and desktop. [Salesforce Help](https://help.salesforce.com/s/articleView?id=platform.set_up_salesforce_in_claude.htm&language=en_US&type=5) lists Enterprise, Performance, Unlimited and Developer Edition and requires a direct Anthropic subscription (Claude Enterprise, Team or Console), while its edition table says Claude Enterprise only; confirm eligibility with the beta approval. Claude acts through the user's own Salesforce account and by default asks for approval before each change is written.
- **Agentforce Coworker** is "instantly available" according to the announcement. Salesforce's own [Coworker blog](https://www.salesforce.com/blog/agentforce-coworker-salesforce-ai-teammate/) says both "Generally Available" and "in beta", and listed Microsoft Teams, ChatGPT, Claude and a desktop app as "coming later this year". The [update of November 4, 2026](https://www.salesforce.com/news/stories/agentforce-coworker-surpasses-185k-users/) lists Teams as generally available in November and the Field Service mobile app as expected in December 2026, and prices the standalone [Coworker user license](https://www.salesforce.com/agentforce/coworker/) at $50 per user per month with 30 MB of indexing per user. Check each surface in your org. The [setup documentation](https://developer.salesforce.com/docs/data/agentforce-coworker/guide/agentforce-coworker-turn-on-infrastructure.html) requires Enterprise, Unlimited or Agentforce 1 Edition plus Data Cloud or Data 360.
- **Slackforce** is listed as GA in October in the [Dreamforce 2026 roundup](https://www.salesforce.com/blog/dreamforce-2026-announcements/); Slackforce is an umbrella term, so check status and plan for the components you want (Surfaces, Slackbot, Slack CRM, Slack Code). Salesforce publishes Flex Credit multipliers for Slackbot actions per Slack workspace, according to the [rate card of November 3, 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf).
- **Hosted MCP servers**, through which external AI tools such as Claude reach an org, have been [generally available since April 29, 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition and above. The current documentation adds that they are intended for customers with Flex Credits and that usage may be billed. Who may read what through them is the topic of [hosted MCP servers and data access](/en/blog/salesforce-hosted-mcp-servers-data-access/).

```kennzahlen
37 | sales skills in Salesforce in Claude (beta)
40 Flex Credits | per standard action in Slackbot
200 Flex Credits | per advanced action in Slackbot
source: Anthropic on Salesforce in Claude; Salesforce Flex Credits rate card of November 3, 2026
```

On costs, the announcement says: "Pricing and packaging are subject to change." The rate card lists Headless Platform Interactions, the meter for agentic API and MCP calls, as "TBA", which means no number is published yet, not that the calls will be free. Why that becomes a budget line is explained in [MCP calls as a budget risk](/en/blog/flex-credits-agentforce-cost-per-action/).

## For manufacturers, AIforce helps sales more than service today

Right now AIforce helps sales more than service. According to [Anthropic](https://claude.com/blog/salesforce-in-claude), the 37 skills cover account research, call preparation, pipeline review and CRM updates. That fits key account managers and dealer managers who prepare visits and maintain opportunities. Salesforce's announcement lists skills for service, marketing, commerce and industries only for "the near future". Salesforce in Claude has no service skills yet, but service teams can test Coworker against cases and other CRM data, and Coworker in the Field Service mobile app is expected in December 2026.

The second point is the ERP. Salesforce in Claude reads Salesforce. If order status, delivery dates and stock live only in SAP or proALPHA, a sales rep asking "which of this dealer's orders are late?" gets an answer built on incomplete data, delivered with full confidence. Which ERP data belongs in Salesforce, or should be accessible through an API the agent can call, has to be settled before anyone opens a chat window.

The third point is the collaboration tool. Many machine builders work in Microsoft Teams. Slackforce brings nothing there, but Coworker in Teams is listed as generally available in November 2026. I would not buy Slack to get an AI interface.

The fourth point is permissions. "Every transaction runs as the authenticated user", Salesforce writes about hosted MCP. That holds for Salesforce in Claude and user-authenticated connections; registered agents can instead run under their own identity with narrower permission sets. The user-identity case is also where the risk lies. If your sales reps can see all cases, warranty claims and dealer price agreements because sharing was set too broadly years ago, a chat shows it in seconds instead of after ten clicks.

## Worked example: a machine builder with Teams and SAP

Assume a machine builder with 80 Sales Cloud users in sales and dealer management, Service Cloud for after-sales, SAP as ERP and Microsoft Teams for collaboration. All numbers and details are assumptions. A few sales reps already paste account data into private AI tools.

The IT lead sorts the four AIforce parts:

- **Salesforce in Claude:** the pilot candidate for ten key account managers, provided the edition qualifies for the beta and the company buys Claude Enterprise or Team seats. Before the pilot, the sharing model for cases and price agreements is reviewed, and approval before each write stays on.
- **Agentforce Coworker:** second step. It needs Data 360 provisioned plus Flex Credits with Foundations or a seat license at $50 per user per month. Once Teams support is live in the org, a test with the service desk on cases makes sense.
- **Slackforce:** not relevant, because the company works in Teams.
- **Headless Toolkit:** relevant for IT and the implementation partner, because hosted MCP servers and the Claude Code plug-in are the developer path. What partners may do with it should be covered in the contract.

The outcome is one small pilot in sales and a week of permission clean-up. In my judgment that is the right size for a beta whose MCP rate Salesforce has not published.

## Find the shadow use, then check permissions and contracts

1. **Find the shadow use.** Ask which teams already copy Salesforce data into Claude, ChatGPT or Copilot. A governed connector is usually better than copy and paste, provided permissions, tool restrictions and retention settings are configured first.
2. **Assign one interface per user group.** For example Lightning for service agents, Claude for key account managers, Teams for everyone else. Five parallel AI surfaces mean five support issues.
3. **Review sharing and field-level security** for cases, warranty claims, price agreements and dealer accounts before any chat tool reads them.
4. **Read your Claude contract.** Salesforce advertises that business data "is not retained by the model provider", but its own [data handling page](https://help.salesforce.com/s/articleView?id=platform.security_permissions_and_data_handling.htm&language=en_US&type=5) says that once data reaches Anthropic through MCP, your contract with Anthropic governs it. Data not being used for training is not the same as data not being stored: check chat history retention, deletion periods, audit logs and hosting region in that agreement.
5. **Budget a pilot.** Coworker has a list price, but the MCP rate has not been published and pricing is subject to change. Whether it is worth buying Data 360 for Coworker, or Claude seats for the sales team, is a question for [make-or-buy and license planning](/en/services/make-or-buy-licences/).
6. **Keep the name AIforce in your documentation** until Salesforce confirms SIForce in writing.

Whether to build your own Agentforce agents is a separate decision, covered in [Agentforce for manufacturers: start now or wait?](/en/blog/agentforce-yes-or-no-manufacturers/). For AIforce itself, follow the order above: permissions, data and contracts first, then the interface.
