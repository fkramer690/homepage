---
title: "Running Enhanced Chat: limits, metrics and costs"
description: "Which rate limits apply to Salesforce Enhanced Chat, which metrics to track after go-live and what the costs for the chat channel and the agent are made of."
pubDate: 2026-10-31
lang: en
slug: enhanced-chat-limits-metrics-costs
translationKey: enhanced-chat-operations-costs
topic: ai
categories: [ai, architecture]
tags: [Enhanced Chat, Rate limits, Metrics, Flex Credits, Service Cloud, Manufacturing]
series: { id: enhanced-chat, part: 9 }
takeaways:
  - "Enhanced Chat has fixed rate limits: 200 token requests per minute per org, three conversation starts per page in 30 seconds, 22 messages and 12 files per conversation per minute."
  - "Response times and message counts come from Messaging Session Metrics, speed to answer and handle time from AgentWork; handle time says little when chat runs asynchronously."
  - "The chat content itself is stored off platform and is not available in standard reports; analysing topics needs Data Cloud or the agent's own analytics."
  - "Costs have three parts: licences for service reps, Flex Credits for the Agentforce agent and the effort for maintenance and analysis."
  - "Build reports, the load test and credit thresholds before go-live: a threshold set after the first monthly bill comes too late."
faq:
  - q: "Which rate limits apply to Salesforce Enhanced Chat?"
    a: "According to Salesforce Help, 200 access token and 200 renew requests per minute per org, three conversation starts per page in 30 seconds, 22 messages and 12 files per conversation per minute, and three transcript downloads per conversation per hour."
  - q: "Where do I find response times for Enhanced Chat?"
    a: "In the report type Messaging Session with Messaging Session Metrics. Every completed session creates six records, one per measure, such as the service rep's first response time or average response time."
  - q: "Can I analyse Enhanced Chat conversations in Salesforce reports?"
    a: "No. The individual messages are stored in a separate database off platform, and Conversations are not available in standard reports. For topic analysis you need Data Cloud or the agent's analytics."
  - q: "How much does Salesforce Enhanced Chat cost?"
    a: "For service reps Salesforce lists Contact Center Digital at $75 per user per month, billed annually; existing Chat customers often have Enhanced Chat already. If an Agentforce agent answers, Flex Credits come on top, 20 credits or $0.10 per action."
draft: false
---

Running Salesforce Enhanced Chat after go-live comes down to three questions: which limits apply, which metrics do you track and what does the channel cost? The rate limits are fixed, for example 200 token requests per minute per org and three conversation starts per page in 30 seconds. Metrics come from Messaging Session Metrics and AgentWork, while the chat content itself is not in standard reports. Costs are licences for service reps, Flex Credits for the Agentforce agent and the effort for maintenance and analysis. I build reports and credit thresholds before go-live.

This is the last part of the series. The earlier parts cover the switch, the data model, identity, routing, context, the chat interface and the portal; this one is about the time after go-live, when service and IT run the channel.

## Which rate limits apply to Enhanced Chat?

Salesforce lists six limits for Enhanced Web Chat and Enhanced In-App Chat in the [Help article on rate limits](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.miaw_rate_limits.htm). WhatsApp, SMS, Facebook Messenger, Apple Messages, LINE and Bring Your Own Channel are not covered by them.

```kennzahlen
200 | Access token requests per minute per org, and the same for renew requests
3 | Conversation starts per page or app in 30 seconds
22 | Customer messages per conversation per minute
12 | Customer files per conversation per minute
source: Salesforce Help, Enhanced Chat rate limits, as of 31 October 2026
```

On top of that, a transcript can be downloaded three times per conversation per hour. The Help page does not say what happens when a limit is exceeded. I test that in a sandbox before relying on it.

The first number matters most. An access token is requested as soon as an anonymous visitor clicks the chat button or a verified user is signed in through `setIdentityToken()`. The limit applies per org, so every website, portal and language connected to the same org shares it. A manufacturer with a dealer portal and country sites in twelve languages shares these 200 per minute. In B2B service that is usually enough; it gets tight when a campaign sends thousands of visitors to a page with chat at the same moment, or when the same org also serves consumers.

The other limits tend to hit your tests rather than your customers. A load test that starts conversations in a row from one page stops after three starts in 30 seconds. A script that sends messages faster than a person types runs into the 22 per minute. So plan load tests with many simulated pages and realistic pauses.

## Which metrics should you track after an Enhanced Chat go-live?

The metrics are split across two objects. According to the [Help article on messaging reports](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_reporting.htm&type=5), Messaging Session Metrics holds response times and message counts, AgentWork the service rep's times.

```tabelle
title: Enhanced Chat metrics and where they come from
columns: Metric | Source | What I watch for
First response time | Messaging Session Metrics * | The number customers notice
Average and maximum response time | Messaging Session Metrics | The maximum shows outliers at shift changes
Messages per session | Messaging Session Metrics | Many messages point to missing context
Speed to answer | AgentWork | How long customers wait in the queue
Handle time | AgentWork | Only meaningful for synchronous chat
Sessions without people | Messaging Session, Agent Type Bot | Share the agent closes on its own
note: Messaging Session Metrics exists only for enhanced Messaging and for sessions from 30 September 2024.
```

Three things stand out when you build the reports. First, every completed session creates six records in Messaging Session Metrics, one per measure. A report on first response time therefore filters on the type `ServiceRepFirstResponseTime`, otherwise you average response times and message counts together. Second, every transfer to another service rep creates another AgentWork record, so one session can have several handle times. Third, Salesforce itself writes that handle time only helps when Messaging runs synchronously. Enhanced Chat is asynchronous: a dealer can ask a question, walk into the workshop and reply an hour later. Handle time then measures the dealer's break. In that case I use first response time and the number of sessions per resolved case.

What is missing is the content. According to the [Messaging Object Model](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model.html), the individual messages live in a separate database off platform, and Conversations are not available in standard reports. A Salesforce report will not answer "what do dealers ask about most often?". For that you need Data Cloud, your own analysis through the API or the agent's analytics. If an Agentforce agent answers the chats, escalation and task resolution rates from Agent Analytics come on top; which ones I look at after 90 days is in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/).

## What does Enhanced Chat cost?

The visible number is the licence for service reps. The bigger items often sit below it, with the agent and with maintaining the channel.

```eisberg
title: What Enhanced Chat costs in operation
visible: Licence | Contact Center Digital per service rep and month, partly included already
- Agentforce | Flex Credits per agent action | per answer
- Build | Channel, flow, pre-chat, context and Lightning Types | one-off
- Operation | Reports, maintaining flow, agent and translations, analysing content | ongoing
note: Amounts are in the text with source and date. The licence is predictable; credits and maintenance depend on how many chats the agent takes and how often the portal changes.
```

**Licence.** According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat), customers who had the old Chat often already have access to Enhanced Chat. The test is simple: if Enhanced Chat shows up as a channel type under Messaging Settings when you click New Channel, it is licensed; otherwise you need Digital Engagement. On the [pricing page](https://www.salesforce.com/service/digital-customer-engagement-platform/pricing/?bc=SOC) the product is called Contact Center Digital and costs $75 (75 € in Europe) per user per month, billed annually, including chat for web and app and messaging over SMS, WhatsApp and other channels. Salesforce bills SMS and WhatsApp on top by usage, through a separate rate card. The licence is per service rep, not per dealer who chats.

**Agent.** If an Agentforce agent answers the chats, every standard or custom action costs 20 Flex Credits, which is $0.10, plus prompts by model tier. The detailed calculation is in [Flex Credits: estimating Agentforce cost per action](../flex-credits-agentforce-cost-per-action/). As an assumption: 3,000 chats per month that the agent answers with three actions on average make 9,000 actions, so 180,000 credits or $900 per month before prompts. Ten service reps on Contact Center Digital cost $750 per month at list price. At that volume the agent and the licences are in the same range, and the agent grows with every additional chat.

**Maintenance and analysis.** No pricing page names this item. Pre-chat fields, translated custom labels, your own Lightning Types and republishing the deployment after changes take time in every release. If you want to analyse chat content, add Data Cloud.

**[PLACEHOLDER practice, Fabian: How did you set up operations and costs in your Enhanced Chat project? Which metrics did service actually look at, and were there surprises with licences, credits or rate limits? Text follows after your answers; do not publish until then.]**

## Where should you start before go-live?

The data for the metrics is created automatically. But if you only build the reports once sales complains about slow answers, you argue without baseline values, and a credit threshold set after the first monthly bill comes too late. Before go-live I go through these steps:

```schritte
Check the licence | before the build · IT
  Look for the Enhanced Chat channel type under Messaging Settings and settle the number of service reps.
Test the limits | before go-live · IT
  Load test with many pages and realistic pauses, document what happens when a limit is hit.
Build the reports | before go-live · service
  First response time, speed to answer and share without people as a dashboard for the head of service.
Cap the credits | before go-live · IT and procurement
  Set thresholds in Digital Wallet and agree a switch-off rule with the head of service.
```

For the credit thresholds I use Digital Wallet, which shows consumption down to agent, action and channel; how I split the cost across plants with it is in [Digital Wallet: Agentforce cost control across plants](../digital-wallet-agentforce-cost-control/). Which licences you can save along the way is part of my [make-or-buy and licence advice](../../services/make-or-buy-licences/).

Enhanced Chat is easy to measure in operation, as long as reports, the load test and credit thresholds are in place before the first customer and not after.
