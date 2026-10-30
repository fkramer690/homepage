---
title: "Legacy ERP without an API: can AI agents still help?"
description: "Old ERP or MES without an API: three ways an Agentforce agent can still read and write data, what each costs, where it breaks and when an API is the better bet."
pubDate: 2026-10-27
lang: en
slug: legacy-erp-without-api-ai-agents
translationKey: legacy-erp-without-api-agents
topic: data
categories: [ai, architecture]
tags: [agentforce, erp, legacy systems, rpa, mulesoft, manufacturing]
takeaways:
  - "An agent can work with an ERP that has no API through three detours: a read-only database replica behind a small API, document extraction with RPA, or the Systems Integration Agent."
  - "For order status, delivery dates and stock, a replica behind a MuleSoft API is the most stable route, and the agent action stays unchanged when the ERP is replaced later."
  - "MuleSoft IDP sends documents below a confidence threshold to a human reviewer; the Salesforce Admins example uses 80 percent, and every reprocessing of a document is charged in full."
  - "RPA and the Systems Integration Agent work through the screens; Salesforce says the agent relearns a changed screen in about 20 minutes, which still needs monitoring and an owner."
  - "Prices, credit limits and availability checks stay in the ERP; an agent connected to an old ERP may enter data under human review, but it should not decide."
faq:
  - q: "Can Agentforce connect to an ERP without an API?"
    a: "Yes, through a detour. Data can be read from a database replica behind a MuleSoft API, documents can be entered with MuleSoft IDP and RPA, and the Systems Integration Agent operates browser-based applications through their screens."
  - q: "Does proALPHA offer an API for Salesforce?"
    a: "That depends on the release, modules and setup of your installation. Ask your ERP vendor or partner which interfaces your version offers and whether they are licensed before you plan a workaround."
  - q: "What is the Systems Integration Agent?"
    a: "It is part of Agentforce Operations. According to Salesforce it learns browser-based applications, including legacy systems without APIs, and runs a process the same way every time with an audit trail. Agentforce Operations is priced by blueprint packages, not by consumption."
  - q: "Is RPA reliable enough for ERP order entry?"
    a: "For stable screens, enough volume and human review of uncertain documents, yes. It stops when screens change, so you need monitoring, a fallback to manual entry and a person who owns the bot."
  - q: "Should we build a workaround or wait for the ERP upgrade?"
    a: "If the new ERP goes live within about a year, I would usually wait and use the time to clean up data. If it is further away, build the read route behind an API contract that survives the migration."
draft: false
---

AI agents can still help with a legacy ERP without an API, but only through a detour, and every detour has a price. For reading order status, stock or delivery dates, I would put a read-only database replica behind a small API and give the agent that. For entering orders, document extraction with RPA or Salesforce's Systems Integration Agent can operate the ERP screens. Both break more easily than an API and need monitoring and an owner. Decisions such as credit limits and prices stay in the ERP in every variant.

## Why do so many manufacturers run an ERP without a usable API?

Many machine builders in the German Mittelstand run an ERP that has been on premises for years and was customised heavily along the way. An older proALPHA installation or an old SAP release are typical examples. Whether such a system offers a usable interface depends on the version, the licensed modules and how far the customising went, so I make no general statement about any vendor. The first step is a question to your ERP vendor or partner.

"No API" often means an interface exists but is not licensed, or covers customers and items but not orders. Checking costs a day or two. A workaround costs maintenance for as long as it runs.

The same applies to MES and other shop floor systems, which often have only a desktop client and a database. For a service agent they still matter, because serial numbers, build configurations and test certificates live there.

So there are three cases. If an API exists, the standard path applies, which I describe in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/). If the data can be reached but there is no API, you build a read layer. If only the screen is left, you automate the screen.

## Which routes reach an ERP without an API?

### Route 1: read from a replica behind your own API

Most older ERP systems keep their data in a relational database. MuleSoft's [Database Connector](https://docs.mulesoft.com/db-connector/latest/) "can connect to almost any Java Database Connectivity (JDBC) relational database", with ready-made providers for Oracle, Microsoft SQL Server, MySQL and Derby and a generic JDBC configuration for the rest. On top of it you build a small read API: order status, delivery date, stock per plant, machine by serial number. Synced into the API Catalog, it becomes an agent action like any other API.

Two rules apply. Read from a replica or a regular export, never from the production database, so a busy agent cannot slow down order processing. And never write into ERP tables directly. That bypasses posting logic, number ranges and every check the ERP runs, and I would not sign it off.

The real benefit is architectural. The API contract, for example "order status by order number", survives the replacement of the old ERP. Only the backend changes; the agent, its tests and its permissions stay.

### Route 2: document extraction plus RPA for writing

Salesforce describes a pattern for exactly this case in the [Salesforce Admins blog](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce) from August 2025, using a fictional supplier with scanned PDF orders and an ERP without an API. MuleSoft Intelligent Document Processing (IDP) extracts order number, items, net value and tax, and sends documents with a confidence below 80 percent to manual review. A MuleSoft RPA bot watches a shared folder and simulates mouse clicks and keystrokes in the ERP. Two autolaunched Flows start it and poll its status by execution ID, and an Agentforce topic called "Order Upload" lets users start the upload and ask for its status in chat.

```ablauf
sf: Order Upload topic, Autolaunched Flow
ext: MuleSoft IDP, Manual review, RPA bot
erp: ERP screen
Order Upload topic --> Autolaunched Flow
Autolaunched Flow --starts--> RPA bot
MuleSoft IDP --from 80 percent--> RPA bot
MuleSoft IDP ..below 80 percent..> Manual review
RPA bot --enters order--> ERP screen
RPA bot ..status..> Autolaunched Flow
```

For a manufacturer the obvious candidates are dealer spare part orders and supplier order confirmations that arrive as PDF. Two cost points belong in the plan. According to the [IDP documentation](https://docs.mulesoft.com/idp/), IDP charges Automation Credits per execution based on the number of pages, and resubmitting or reprocessing a document consumes credits in full, without deduplication. And [RPA bots](https://docs.mulesoft.com/rpa-bot/1.6/) need a computer where the target applications are installed, so somebody runs these machines and keeps them patched.

I like one detail of this pattern: the agent decides nothing. It is a chat front end for a deterministic process.

### Route 3: the Systems Integration Agent

At Dreamforce 2026 Salesforce presented the Systems Integration Agent as part of Agentforce Operations, in the same section as the back-office agent Marshall, marked [GA](https://www.salesforce.com/blog/dreamforce-2026-announcements/). According to the [product blog](https://www.salesforce.com/blog/regrello/) it learns a browser-based application "the way a new employee would, in about 90 minutes", without code, APIs or RPA, including "customized SAP, Oracle, and homegrown systems". When a screen changes, it relearns that part "typically in about 20 minutes, with the repair logged for an administrator to review". The [Agentforce Operations page](https://www.salesforce.com/agentforce/operations/) adds an audit trail and preserved permissions and approval controls, and says the product is priced by blueprint packages, from a starter pack with 5 blueprints to Large with more than 50, "not priced based on consumption". I found no list prices.

The catch for manufacturers is the word "browser-based". If your ERP or MES runs as a desktop client, check whether a web client exists before anyone plans with this agent. These are launch-month vendor claims, and I would test them on your own screens, including one ERP update in a test system, before relying on them.

```hinweis offen
The product blog states GA explicitly only for Marshall. Confirm availability of the Systems Integration Agent for your org with your account team.
```

## A typical scenario: spare part orders at a machine builder with an old ERP

Assume a machine builder with an on-premises ERP that offers no usable interface, Service Cloud and a dealer portal on Salesforce, and 40 dealers. All numbers are assumptions to show the method.

**Status enquiries.** Assume 2,000 dealer enquiries a month about spare part orders. A replica of the relevant ERP tables is refreshed every 15 minutes, and a small MuleSoft API offers two operations: order status and delivery date. With two actions per enquiry that is 4,000 actions at 20 Flex Credits, so 80,000 credits or about $400 a month at the [list price of $500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/), before prompts, tests and MuleSoft. The agent always answers with the time of the data, "status as of 10:15". How to estimate the rest is in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

**Order entry.** Assume 600 spare part orders a month as PDF by email, two pages on average, which an inside sales colleague types in today at about six minutes each, roughly 60 hours a month. With IDP and RPA that is 1,200 pages a month in Automation Credits, priced in your MuleSoft contract. If 15 percent fall below the threshold, 90 orders a month still go to a person. Before the bot starts, a check on the dealer's order number stops duplicates, because IDP does not deduplicate. Price and credit checks run in the ERP when the bot saves the order, exactly as with manual entry.

**Warranty checks with build data.** Assume the build configuration per serial number lives in an old MES with a desktop client only. The Systems Integration Agent does not cover it, and a bot for a rarely used screen does not pay back. A nightly export of serial numbers and configuration into Salesforce assets is cheaper and also helps the service team.

None of the three needed an ERP project. One read route, one write route under review and one export.

## What are the risks, and how do you contain them?

- **Screen changes.** An ERP patch moves a field and the bot stops. Make every ERP update trigger a bot test in the test system, report bot status to your monitoring and keep manual entry as a fallback with known capacity.
- **Stale data.** A replica is always a few minutes behind. The agent states the timestamp and never promises a delivery date the ERP has not confirmed.
- **Bypassing ERP logic.** Here screen automation has an advantage over database writes: the bot goes through the same entry screen as a person, so every ERP check still applies.
- **Bot identity.** The bot gets its own ERP user with minimal rights, never a borrowed employee login, so the ERP's history shows which entries came from the bot.
- **Decisions in the model.** Credit limits, prices and eligibility stay in the ERP or in deterministic logic, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

## When is the workaround the wrong answer?

If the new ERP goes live within about a year, I would usually not build bots for the old one. Spend the time on clean master data, which the new system needs anyway. If the migration is further away, the read route behind a stable API contract is worth it, because it moves over.

The second limit is the number of write processes. Every bot is software that somebody maintains. My rule of thumb: from about five screen-based write processes on, an interface module from the ERP vendor or a proper middleware layer usually costs less over three years than the bots. Whether that point is reached is part of my work on [Salesforce integration architecture](../../services/salesforce-integration/).

And thirty orders a month do not justify an RPA bot, no matter how old the ERP is.

With an old ERP, start with the read route behind a stable API contract and automate writing only where documents and screens are stable and a person reviews the uncertain cases.
