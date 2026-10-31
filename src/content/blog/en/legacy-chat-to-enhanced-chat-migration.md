---
title: "Legacy Chat to Enhanced Chat: what you have to rebuild"
description: "Migrating Salesforce legacy Chat to Enhanced Chat: what the migration tool carries over and what you rebuild in pre-chat, routing, reports and licences."
pubDate: 2026-10-31
lang: en
slug: legacy-chat-to-enhanced-chat-migration
translationKey: enhanced-chat-legacy-migration
topic: service
categories: [architecture, ai]
tags: [Enhanced Chat, Legacy Chat, Messaging for In-App and Web, Service Cloud, Omni-Channel, Manufacturing]
series: { id: enhanced-chat, part: 2 }
takeaways:
  - "Moving from legacy Chat to Enhanced Chat means rebuilding pre-chat, routing, reports and the website snippet; Salesforce's migration tool only carries over branding and custom labels."
  - "Routing moves from code on the website into an Omni-Channel flow that sends conversations to a queue, a person or an Agentforce agent."
  - "Enhanced Chat has a different data model: reports are rebuilt on Messaging Sessions, Messaging Session Metrics and AgentWork, and the old chat reports are deleted."
  - "You can see in five minutes under Messaging Settings in Setup whether your licence covers it; if the Enhanced Chat channel type is missing, you need Digital Engagement."
  - "Legacy Chat and Enhanced Chat can run in the same org at the same time, so you can switch brand by brand or country by country and switch the old chat off afterwards."
faq:
  - q: "When did Salesforce retire legacy Chat?"
    a: "Salesforce scheduled legacy Chat, formerly Live Agent, for retirement on February 14, 2026. Until then it only received security updates; its successor is Enhanced Chat, formerly Messaging for In-App and Web."
  - q: "Is there a tool that migrates legacy Chat automatically?"
    a: "Yes. In Setup under Migrate Chat Deployments, clicking Migrate creates an Enhanced Chat deployment. It keeps branding and custom labels; you rebuild pre-chat, routing, sensitive data rules and reports yourself."
  - q: "Do I need a new licence for Enhanced Chat?"
    a: "Not necessarily. If the Enhanced Chat channel type shows up under Messaging Settings when you click New Channel, your licence includes it; otherwise Salesforce says you need Digital Engagement."
  - q: "Can legacy Chat and Enhanced Chat run at the same time?"
    a: "Yes, both can be active in the same org. That lets you switch one website or region at a time while the rest still runs on the old chat."
  - q: "Should I go straight to Enhanced Chat v2 when I migrate?"
    a: "For late movers usually yes, because they create a new deployment anyway. Check first whether you need one of the features v2 still lacks, such as pre-chat on every session or opt-out keywords."
draft: true
---

Migrating from legacy Chat to Salesforce Enhanced Chat means rebuilding four things: the pre-chat form, the routing as an Omni-Channel flow, the reports on a new data model and the code snippet on your website. Salesforce's migration tool only carries over branding and custom labels. Whether your licence covers it you can check in Setup in five minutes. Enhanced Chat used to be called Messaging for In-App and Web, and the old chat was scheduled to end on February 14, 2026. If legacy Chat still runs on your website today, plan a small project with a sandbox, tests and waves.

## Where does legacy Chat stand today?

Salesforce has renamed this channel several times, so the names first. Legacy Chat is the old, synchronous web chat of Service Cloud, formerly Live Agent, embedded on websites as "Embedded Chat". According to the [Trailhead module on the migration](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat) it had been in maintenance mode for a while, received only security updates and was scheduled for retirement on February 14, 2026. Its successor was first called Messaging for In-App and Web and is now called Enhanced Chat. It is asynchronous: a customer starts a conversation, closes the tab and carries on later, also on another device.

Enhanced Chat v2 is the next step inside Enhanced Chat, a new client for the same channel. What v2 can do and what it still lacks is covered in part 1 of this series. This part covers the bigger jump: from the old chat technology to the messaging channel.

For manufacturers this is rarely just a chat window. The chat sits in the dealer portal, on the spare parts page or on the website per brand and country, often with Apex triggers that read serial numbers or create cases. All of that depends on the old data model.

## What does the migration tool carry over, and what not?

Salesforce offers a tool in Setup under **Migrate Chat Deployments** that creates an Enhanced Chat deployment when you click Migrate. According to the [Trailhead unit "Walk Through a Migration"](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/walk-through-a-migration) branding and custom labels are preserved. The rest is manual work. Salesforce recommends doing all of it in a sandbox first.

```saeulenwechsel
before: Before: legacy Chat
old: Interface | branding, custom labels
old: Conversation start | pre-chat form, website snippet
old: Control | direct-to-button routing, apex triggers, sensitive data rules
old: Reporting | chat reports
title: Enhanced Chat: carried over and rebuilt
Deployment * | Colours, logos < Branding | Texts < Custom labels
Pre-chat | Visible and hidden fields < Pre-chat form | Mapping in the flow < Pre-chat form
Website | New snippet < Website snippet | Experience Cloud: Embedded Messaging < Website snippet
Omni-Channel flow | Queue, person, agent < Direct-to-button routing | Review Apex and flows < Apex triggers | Recreate rules < Sensitive data rules
Reports | Messaging Sessions, Metrics < Chat reports | AgentWork < Chat reports
note: **Carried over:** only the deployment with branding and custom labels, and only through the migration tool.
note: **Rebuilt:** everything else.
```

Before the rebuild comes an inventory. Salesforce points to the **Chat Transition Readiness Report**, which lists active deployments, configurations and customisations. That covers everything attached to the old chat: Apex triggers and classes, Omni-Channel flows, sensitive data rules, reports, direct-to-button routing and automation on chat events. For each entry you decide: retire, replace or adapt. One prerequisite up front: Enhanced Chat can only be set up in Lightning Experience, not in Salesforce Classic.

## What do you rebuild in pre-chat?

The pre-chat form is not migrated. Salesforce says Enhanced Chat has "a different underlying structure", so you build it again: visible fields such as name, email and a short description, hidden fields the website fills in, optionally acceptance of terms and conditions, and your own Lightning web component. The values reach the Messaging Session and the Omni-Channel flow through parameter mappings, and the flow can use them to find a contact or an order and link it to the session.

For manufacturers this deserves a second look. In the dealer portal the page already knows the dealer number, the country and often the serial number of the machine the dealer is looking at. Those values belong in hidden fields, not in a form the dealer has to fill in. How that works technically, and what the new context events in v2 add, is part 6 of the series.

Plan for v2 while you are at it: there, pre-chat runs once per conversation, not before every session. A form that asks for the serial number at the start of every new chat behaves differently there than today.

## How does routing change?

In legacy Chat part of the routing lived in the website. Direct-to-button routing meant the code on the page decided which chat button, and so which group, a conversation went to. Enhanced Chat routes inside Salesforce: an Omni-Channel flow "gives you the flexibility to route to AI agents, queues, or directly to a service rep", Salesforce writes.

Preparing the org is manageable: turn on Omni-Channel, create a service channel and a queue, build the flow and add the messaging tools to the Service Console. The real effort is in the business rules. The rule "spare parts requests from Austria go to the team in Vienna" may have lived in JavaScript on the country page until now. Now it lives in the flow, and somebody has to find it there and maintain it.

This is also where an Agentforce agent comes in. It hangs in the same flow as a target, with a fallback queue in case it is not available. If you had an Einstein Bot in the old chat, this is where you decide which paths stay fixed and which go to the agent; my criteria are in [Einstein Bot to Agentforce](../einstein-bots-to-agentforce-upgrade/). The handover from the agent to people is the topic of part 5.

## Which reports do you rebuild?

All of those built on the old chat objects. Salesforce is explicit: "be prepared to replace your current reports with new reports." Enhanced Chat has a different data model, and the metrics live on other objects:

```tabelle
title: Where chat metrics live in Enhanced Chat
columns: Metric | Object | Where you see it
Response time | Messaging Session Metrics * | Report type Messaging KPIs
Number of messages | Messaging Session Metrics * | Report type Messaging KPIs
Handle time | AgentWork | Report on AgentWork
Speed to answer | AgentWork | Report on AgentWork
Ongoing conversations | Messaging Session | Omni Supervisor, Supervisor Wallboard
note: Messaging KPIs is a custom report type with Messaging Sessions as the primary and Messaging Session Metrics as the secondary object. Delete reports on the old chat objects.
```

Two consequences for planning. First, the figures before and after the switch are not directly comparable, because an asynchronous conversation can stay open for hours. Agree with the head of service which values count as the baseline after go-live before the first reports reach the steering committee. Second, individual messages are not stored as normal records in the org. If you want to analyse chat content, for example by fault pattern or machine type, you need a separate route for it. I explain the data model in part 3.

## Do you need a new licence?

Maybe. According to Salesforce, legacy Chat customers have access to Enhanced Chat, but some need Digital Engagement. The check in Setup takes five minutes: open Messaging Settings, click New Channel and Next, and see whether "Enhanced Chat" (or "Messaging for In-App and Web") appears as a channel type. If it does not, "you must upgrade to Digital Engagement".

On the [pricing page for digital channels](https://www.salesforce.com/service/digital-customer-engagement-platform/pricing/) the product is now called Contact Center Digital, at $75 per user per month billed annually, with web and in-app chat, WhatsApp, SMS and other channels; as of October 31, 2026. An Agentforce agent in the chat costs extra through Flex Credits; the calculation is in [Flex Credits: cost per action](../flex-credits-agentforce-cost-per-action/).

```hinweis offen
Run the Setup check in production, not only in a sandbox, and have your account executive confirm in writing which users have Enhanced Chat included in your contract.
```

## In what order do you switch?

According to Salesforce, legacy Chat and Enhanced Chat can be active in the same org at the same time. For manufacturers with several brands, countries or portals this is the most important sentence of the whole migration, because it allows a switch in waves. Salesforce names one brand at a time, one region or language at a time, and a test group through an A/B tool on the website as patterns. My order:

```schritte
Inventory | Readiness Report
  List deployments, Apex, flows, rules and reports on the old chat and decide on each entry.
Prepare the org | sandbox
  Set up Lightning, Omni-Channel, service channel, queue, flow and Service Console.
Build the channel | sandbox
  Create the deployment with the migration tool, rebuild pre-chat, flow and rules.
First wave | one brand or country
  Insert the new snippet, remove the old one, set up reports, collect feedback after two weeks.
Switch off | after the last wave
  Delete the old flow and deactivate legacy Chat only once every site has moved.
```

For the website this means: on an external site you replace the old snippet (`embedded_svc`) with the new one (`embeddedservice_bootstrap`). In an Experience Cloud site you drag the Embedded Messaging component into the template footer. Schedule bigger switches for times with little chat traffic, train service staff on asynchronous work and the new Console tools, and use Test Messaging on the deployment to test for customers, service staff and supervisors. How I accompany the weeks after go-live is in [Salesforce hypercare after go-live](../salesforce-hypercare-after-go-live/).

```praxis
PLACEHOLDER, do not publish: Fabian's project. Did the client come from legacy Chat, or was Enhanced Chat new? What took the most effort in pre-chat, routing or reports, and what would he do differently today?
```

## Where should you start?

Start with the licence check and the readiness report; both fit into one morning, and afterwards you know whether you need to talk about the contract or about technology. If legacy Chat is still in your code today, you are rebuilding the chat anyway and should build it on Enhanced Chat v2 straight away. I help assess the architecture as an [independent Salesforce architect](../../services/salesforce-architecture/) on the client side.
