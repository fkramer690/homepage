---
title: "AIforce: Salesforce in Claude and Slack explained"
description: "What AIforce is (Salesforce in Claude, Slackforce, Agentforce Coworker), what the SIForce rename means and what a manufacturing IT lead should do now."
pubDate: 2026-10-27
lang: en
slug: aiforce-salesforce-in-claude-and-slack
translationKey: aiforce-salesforce-in-claude-slack
topic: ai
categories: [ai]
tags: [aiforce, claude, slack, agentforce coworker, mcp, manufacturing]
takeaways:
  - "AIforce, launched on 15 September 2026, makes Salesforce data and workflows usable from Claude, Slack and Lightning through Salesforce in Claude, Slackforce, Agentforce Coworker and the Headless Toolkit."
  - "The rename to SIForce rests on a post by Marc Benioff on X on 9 October 2026, known only from secondary sources; Salesforce has published no press release, so documents should keep the name AIforce."
  - "Salesforce in Claude is a beta with 37 sales skills; service, marketing and industry skills are only announced, so after-sales and field service teams at manufacturers have nothing to test yet."
  - "Every AIforce request runs with the user's own Salesforce permissions, so sharing rules that are too broad today become visible in a chat window tomorrow."
  - "Salesforce says pricing and packaging are subject to change, and the Flex Credit rate for agentic API and MCP calls is still listed as TBA; budget for a pilot, not a rollout."
faq:
  - q: "What is AIforce in Salesforce?"
    a: "AIforce is an interface layer Salesforce announced at Dreamforce on 15 September 2026. It makes Salesforce data, workflows and permissions usable from Claude, Slack and the Lightning interface. Its parts are Salesforce in Claude, Slackforce, Agentforce Coworker and the Headless Toolkit."
  - q: "Is AIforce now called SIForce?"
    a: "Marc Benioff wrote on X on 9 October 2026 that AIforce is officially SIForce. Salesforce Ben and other outlets reported it, but Salesforce had issued no press release, and I found no Salesforce document using SIForce up to 27 October 2026."
  - q: "What do I need for Salesforce in Claude?"
    a: "According to Anthropic's setup guide: a paid Claude plan, approval through Salesforce's beta sign-up and access to the latest Sales Cloud enterprise edition. A Salesforce admin enables the MCP server and provides an External Client App, a Claude owner configures the connector."
  - q: "Do we need Slack to use AIforce?"
    a: "No. Salesforce in Claude and Agentforce Coworker work without Slack. Slackforce only matters if your company already works in Slack; for a Microsoft Teams company I would not buy Slack for it."
  - q: "Does Agentforce Coworker need Data 360?"
    a: "Yes. The setup documentation lists Data Cloud or Data 360 as a requirement for both usage-based and seat-based access, plus Enterprise, Unlimited or Agentforce 1 Edition."
draft: false
---

AIforce is the layer Salesforce launched at Dreamforce on 15 September 2026 to make its data, workflows and permissions usable from Claude, Slack and the Lightning interface. For a manufacturing IT lead the honest status is this: Salesforce in Claude is a beta for sales teams, Agentforce Coworker needs Data 360, and the rename to SIForce is so far a CEO post on X. I would not plan a rollout now. I would clean up permissions, decide which interface each user group works in and run one small pilot in sales.

## What is AIforce?

Salesforce calls AIforce "a live interface layer that brings the full power of Salesforce to wherever people and agents work" ([announcement, 15 September 2026](https://www.salesforce.com/news/stories/aiforce-announcement/)). In plain terms: users ask questions, update records and start workflows from another tool without opening Salesforce. In Salesforce's architecture picture, AIforce sits above Data 360, Customer 360 and Agentforce. It has four parts:

- **Claudeforce, or Salesforce in Claude.** A prebuilt MCP server inside Claude with 37 sales skills, plus a Salesforce Development plug-in for Claude Code with more than 40 skills. MCP (Model Context Protocol) is the open standard through which an AI tool calls functions in another system; I explain it in [MCP for IT leads](../mcp-salesforce-explained-for-it-leads/).
- **Slackforce.** Slackforce Surfaces for live interfaces in Slack, Slackbot as a personal assistant over Slack and Salesforce data, Slack CRM and Slack Code.
- **Agentforce Coworker.** An AI teammate in Lightning that reasons over accounts, activity and history and calls the Agentforce agents you have already deployed.
- **Headless Toolkit.** MCPs, APIs, plug-ins and skills that expose the platform to your own AI tools.

Two directions are easy to mix up. In the [Claudeforce release of 27 August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/), Salesforce names Claude as a reasoning model for the Atlas Reasoning Engine and the default model for Agentforce Coworker and Slackbot, and says that through Amazon Bedrock Claude is available within the Salesforce Trust Boundary. That is Claude inside Salesforce. Salesforce in Claude is the reverse: your CRM data goes to the Claude app your employees use. For data protection these are two different cases.

## Is AIforce now called SIForce?

Officially, not yet. On 9 October 2026 Marc Benioff posted on X: "The era of Super Intelligence is here. AIForce is officially SIForce." I can only confirm this through secondary sources. [Salesforce Ben reported on 12 October](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/) that there did not appear to be any official announcement from Salesforce and that it had asked Salesforce for comment. Up to today I found no press release or help article from Salesforce that uses SIForce.

The background is a US executive order of 29 September 2026, ["Inaugurating The Era of Super Intelligence"](https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/). It tells executive departments and agencies to say "Super Intelligence" instead of "Artificial Intelligence" in their own documents. Private companies are not mentioned, so nothing obliged Salesforce to rename anything. Salesforce Ben counts SIForce as the third name for this layer in just over six months, after Headless 360 at TDX in April and AIforce at Dreamforce.

For your own documents I would write "AIforce" and add "(announced by the CEO as SIForce)" once. Order forms and contracts use whatever name Salesforce prints there, and that is the name that counts.

```zeitleiste
2026-04-29 | Hosted MCP servers generally available
2026-08-27 | Claudeforce: Claude becomes default model for Coworker and Slackbot
2026-09-15 | AIforce launched at Dreamforce
2026-09-29 | US executive order on "Super Intelligence" for agencies
2026-10-09 | Marc Benioff on X: AIforce is now SIForce
2026-10-12 | Salesforce Ben finds no official announcement
```

## What is actually available today?

The announcements are bigger than what you can switch on. Status on 27 October 2026:

- **Salesforce in Claude** is a beta. According to [Anthropic's setup guide](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization), it runs on paid Claude plans for organisations that Salesforce approves through its beta sign-up, needs the latest Sales Cloud enterprise edition and works in chat and Claude Cowork on web and desktop. Claude acts as the user's own Salesforce account and by default asks for approval before each change is written.
- **Agentforce Coworker** is "instantly available" according to the announcement. Salesforce's own [Coworker blog](https://www.salesforce.com/blog/agentforce-coworker-salesforce-ai-teammate/) says both "Generally Available" and "in beta", and lists Microsoft Teams, ChatGPT, Claude and a desktop app as "coming later this year". The [setup documentation](https://developer.salesforce.com/docs/data/agentforce-coworker/guide/agentforce-coworker-turn-on-infrastructure.html) requires Enterprise, Unlimited or Agentforce 1 Edition plus Data Cloud or Data 360.
- **Slackforce** is listed as GA in October in the [Dreamforce 2026 roundup](https://www.salesforce.com/blog/dreamforce-2026-announcements/); I found no separate release note confirming it. Slackbot actions already have fixed prices in Flex Credits, per Slack workspace, according to the [rate card of 31 August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf).
- **Hosted MCP servers**, through which external AI tools such as Claude reach an org, have been [generally available since 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition and above. The current documentation adds that they are intended for customers with Flex Credits and that usage may be billed. Who may read what through them is the topic of [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/).

```kennzahlen
37 | sales skills in Salesforce in Claude (beta)
40 Flex Credits | per standard action in Slackbot
200 Flex Credits | per advanced action in Slackbot
source: Anthropic on Salesforce in Claude; Salesforce Flex Credits rate card of 31 August 2026
```

On cost, the announcement says: "Pricing and packaging are subject to change." The rate card lists Headless Platform Interactions, the meter for agentic API and MCP calls, as "TBA". Why that becomes a budget line is explained in [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

## What does AIforce mean for a manufacturer?

Right now AIforce helps sales more than service. According to [Anthropic](https://claude.com/blog/salesforce-in-claude), the 37 skills cover account research, call preparation, pipeline review and CRM updates. That fits key account managers and dealer managers who prepare visits and maintain opportunities. Salesforce's announcement lists skills for service, marketing, commerce and industries only for "the near future". Heads of after-sales and field service have nothing to test yet.

The second point is the ERP. Salesforce in Claude reads Salesforce. If order status, delivery dates and stock live only in SAP or proALPHA, a sales rep asking "which orders of this dealer are late?" gets an answer built on incomplete data, delivered with full confidence. Which ERP data belongs in Salesforce, or behind an API the agent can call, has to be settled before anyone opens a chat window.

The third point is the collaboration tool. Many machine builders work in Microsoft Teams. Slackforce brings nothing there, and for Coworker in Teams Salesforce only says "later this year". I would not buy Slack to get an AI interface.

The fourth point is permissions. "Every transaction runs as the authenticated user", Salesforce writes about hosted MCP. That is correct, and it is also the risk. If your sales reps can see all cases, warranty claims and dealer price agreements because sharing was set too broadly years ago, a chat shows it in seconds instead of after ten clicks.

## A typical scenario: a machine builder with Teams and SAP

Assume a machine builder with 80 Sales Cloud users in sales and dealer management, Service Cloud for after-sales, SAP as ERP and Microsoft Teams for collaboration. All numbers and circumstances are assumptions. A few sales reps already paste account data into private AI tools.

The IT lead sorts the four AIforce parts:

- **Salesforce in Claude:** the pilot candidate for ten key account managers, provided the edition qualifies for the beta and the company buys a paid Claude plan. Before the pilot, the sharing model for cases and price agreements is reviewed, and approval before each write stays on.
- **Agentforce Coworker:** waits. The company has no Data 360 licence, and Teams support is announced for later.
- **Slackforce:** not relevant, the company works in Teams.
- **Headless Toolkit:** relevant for IT and the implementation partner, because hosted MCP servers and the Claude Code plug-in are the developer path. What partners may do with it belongs in the contract.

The outcome is one small pilot in sales and a week of permission clean-up. In my judgement that is the right size for a beta whose prices Salesforce has not fixed.

## What should an IT lead do now?

1. **Find the shadow use.** Ask which teams already copy Salesforce data into Claude, ChatGPT or Copilot. A governed connector with the user's own permissions beats copy and paste.
2. **Assign one interface per user group.** For example Lightning for service agents, Claude for key account managers, Teams for everyone else. Five parallel AI surfaces mean five support topics.
3. **Review sharing and field-level security** for cases, warranty claims, price agreements and dealer accounts before any chat tool reads them.
4. **Read your Claude contract.** Salesforce promises that business data "is not retained by the model provider". Check data processing, training settings and hosting region in your own agreement with Anthropic, because that is where the data goes.
5. **Budget a pilot.** Prices are subject to change and the MCP rate is open. Whether Data 360 is worth buying for Coworker, or Claude seats for the sales team, is a question for [make-or-buy and licence planning](../../services/make-or-buy-licences/).
6. **Keep the name AIforce in your documentation** until Salesforce confirms SIForce in writing.

Whether to build your own Agentforce agents is a separate decision, covered in [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/).

AIforce moves Salesforce into the tools your people already use, and the work for IT stays the same: permissions, data and contracts first.
