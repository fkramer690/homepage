---
title: "Legacy ERP without an API: can AI agents still help?"
description: "Old ERP or MES without an API: three ways an Agentforce agent can still read and write data, cost drivers, limits and when an API is the better bet."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: legacy-erp-without-api-ai-agents
translationKey: legacy-erp-without-api-agents
topic: data
categories: [ai, architecture]
tags: [agentforce, erp, legacy systems, rpa, mulesoft, manufacturing]
takeaways:
  - "An agent can access an ERP without an API through a database replica behind a small API, document extraction with RPA, or the Systems Integration Agent."
  - "For order status, delivery dates and stock, a replica behind a MuleSoft API is the most stable route, and it can be carried over when the ERP is replaced."
  - "MuleSoft IDP sends a document for review when a field falls below the threshold or a required field is missing, and every reprocessing is charged in full."
  - "RPA and the Systems Integration Agent work through the screens, so they need monitoring and an owner."
  - "Prices, credit limits and availability checks stay in the system that owns them, here the ERP. An agent may enter data under review, but must not decide."
faq:
  - q: "Can Agentforce connect to an ERP without an API?"
    a: "Yes, through a detour. Data can be read from a database replica behind a MuleSoft API, orders from documents can be entered with MuleSoft IDP and RPA, and the Systems Integration Agent operates browser-based applications through their screens."
  - q: "Does proALPHA offer an API for Salesforce?"
    a: "That depends on the release, modules and setup of your installation. Ask your ERP vendor or partner which interfaces your version offers and whether they are licensed before you plan a workaround."
  - q: "What is the Systems Integration Agent?"
    a: "It is part of Agentforce Operations. According to Salesforce, it learns browser-based applications, including legacy systems without APIs, and runs a process the same way every time with an audit trail. Agentforce Operations is priced by blueprint packages, not by consumption."
  - q: "Is RPA reliable enough for ERP order entry?"
    a: "For stable screens, enough volume and human review of uncertain documents, yes. It stops when screens change, so you need monitoring, a fallback to manual entry and a person who owns the bot."
  - q: "Should we build a workaround or wait for the ERP upgrade?"
    a: "It depends on volume, error costs and how reliable the go-live date is. If the new ERP is close and the date holds, cleaning up data is often the better use of time. If it is further away, build the read route behind an API contract designed to survive the migration."
draft: false
---

AI agents can still help with a legacy ERP without an API, but only through a detour, and every detour has a price. For reading order status, stock or delivery dates, I would put a read-only database replica behind a small API and give the agent access to it. For entering orders, document extraction with RPA or Salesforce's Systems Integration Agent can operate the ERP screens. Both break more easily than an API and need monitoring and an owner. In the first two routes the agent is only the front end. Credit limits and prices stay in the system that owns them.

## Why do so many manufacturers run an ERP without a usable API?

Many machine builders in the German Mittelstand run an ERP system that has been operated on premises for years and heavily customized along the way. An older proALPHA installation or an old SAP release are typical examples. Whether such a system offers a usable interface depends on the version, the licensed modules and how extensively it was customized, so I make no general claim about any vendor. The first step is to ask your ERP vendor or partner.

"No API" often means an interface exists but is not licensed, or covers customers and items but not orders. Checking usually costs far less than a workaround, which requires maintenance for as long as it runs.

The same applies to MES and other shop floor systems, which often have only a desktop client and a database. For a service agent they still matter, because serial numbers, build configurations and test certificates live there.

So there are three cases. If an API exists, the standard path applies, which I describe in [Agentforce and SAP order status](/en/blog/agentforce-sap-order-status-mulesoft/). If the data can be reached but there is no API, you build a read layer. If the screen is the only option left, you automate the screen.

## The routes to an ERP without an API

### Route 1: read from a replica behind your own API

Most older ERP systems keep their data in a relational database. Before reading from it, ask the vendor whether access is supported, whether the tables are documented, and whether values such as order status are stored or only calculated by the application. MuleSoft's [Database Connector](https://docs.mulesoft.com/db-connector/latest/) "can connect to almost any Java Database Connectivity (JDBC) relational database", with ready-made providers for Oracle, Microsoft SQL Server, MySQL and Derby and a generic JDBC configuration for the rest. On top of that you build a small read API for order status, delivery date, stock per plant and machine by serial number. With an OpenAPI contract, authentication and the required annotations, its operations can be registered and activated as agent actions through the API Catalog or External Services.

Two rules apply. Read from a replica or a regular export, never from the production database, so a busy agent cannot slow down order processing. And never write into ERP tables directly. That bypasses posting logic, number ranges and every check the ERP runs, and I would not sign off on it.

The real benefit is architectural. The API contract, for example "order status by order number", is designed to survive the replacement of the old ERP. If the business meaning of status codes and keys stays stable, only the backend usually changes; contract and regression tests show where the agent still needs work. One rule for a dealer portal is that the API checks server-side whether the logged-in dealer may see that order, so nobody can guess other dealers' order numbers.

### Route 2: document extraction plus RPA for writing

Salesforce describes a pattern for exactly this case in the [Salesforce Admins blog](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce) from August 2025, using a fictional supplier with scanned PDF orders and an ERP without an API. MuleSoft Intelligent Document Processing (IDP) extracts order number, items, net value and tax, and, according to the [IDP documentation](https://docs.mulesoft.com/idp/reviewing-processed-documents), sends a document to manual review when a visible field falls below the configured threshold, 80 percent in the example, or a required field is missing. A MuleSoft RPA bot watches a shared folder, calls IDP and simulates mouse clicks and keystrokes in the ERP. Two autolaunched Flows start it and poll its status by execution ID, and an Agentforce topic called "Order Upload" (Salesforce now calls topics subagents) lets users start the upload and ask for its status in chat. Flow, IDP and RPA would also do the work without the agent.

```ablauf
sf: Order Upload subagent, Autolaunched Flow
ext: RPA bot, MuleSoft IDP, Manual review
erp: ERP screen
Order Upload subagent --> Autolaunched Flow
Autolaunched Flow --starts--> RPA bot
RPA bot --PDF--> MuleSoft IDP
MuleSoft IDP --fields--> RPA bot
MuleSoft IDP ..review..> Manual review
Manual review ..approved..> RPA bot
RPA bot --enters order--> ERP screen
RPA bot ..status..> Autolaunched Flow
```

For a manufacturer the obvious candidates are dealer spare part orders and supplier order confirmations that arrive as PDF. Two cost items should be included in the plan. According to the [IDP documentation](https://docs.mulesoft.com/idp/), IDP charges Automation Credits per execution based on the number of pages, and resubmitting or reprocessing a document consumes credits in full, without deduplication. And [RPA bots](https://docs.mulesoft.com/rpa-bot/1.6/) need a computer where the target applications are installed, ideally a dedicated Windows machine, so infrastructure, session licenses, patching, regression tests and support belong in the cost plan.

I like one detail of this pattern: the agent decides nothing. It is a chat front end for a deterministic process.

### Route 3: the Systems Integration Agent

At Dreamforce 2026 Salesforce presented the Systems Integration Agent as part of Agentforce Operations, in the same section as the back-office agent Marshall, with the whole section marked [GA](https://www.salesforce.com/blog/dreamforce-2026-announcements/). According to the [product blog](https://www.salesforce.com/blog/regrello/), it learns a browser-based application "the way a new employee would, in about 90 minutes", without code, APIs or RPA, including "customized SAP, Oracle, and homegrown systems". When a screen changes, it relearns that part "typically in about 20 minutes, with the repair logged for an administrator to review". The [Agentforce Operations page](https://www.salesforce.com/agentforce/operations/) adds an audit trail and preserved permissions and approval controls, and says the product is priced by blueprint packages, from a starter pack with 5 blueprints to Large with more than 50, "not priced based on consumption". I found no list prices.

For manufacturers, the word that matters is "browser-based". If your ERP or MES runs as a desktop client, check whether a web client exists before anyone plans around this agent. These are launch-month vendor claims, and I would test them on your own screens, including one ERP update in a test system, before relying on them.

```hinweis offen
GA does not tell you whether your contract, region and blueprint package include the Systems Integration Agent. Confirm that and the commercial terms with your account team.
```

## Worked example: spare part orders at a machine builder with an old ERP

Assume a machine builder with an on-premises ERP that offers no usable interface, Service Cloud and a dealer portal on Salesforce, and 40 dealers. All numbers are assumed for illustration.

**Status enquiries.** Assume there are 2,000 dealer enquiries a month about spare part orders. A replica of the relevant ERP tables is refreshed every 15 minutes, and a small MuleSoft API offers two operations: order status and delivery date. With two actions per enquiry, that is 4,000 actions at 20 Flex Credits, so 80,000 credits or about $400 of consumption a month at the [list price of $500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) ([rate card of November 3, 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf)). Credits are bought in packs of 100,000, so without an existing pool the purchase is $500. Prompts, tests and MuleSoft are additional. The agent always answers with the time of the data, "status as of 10:15". The rest of the estimate is covered in [Flex Credits and Agentforce cost per action](/en/blog/flex-credits-agentforce-cost-per-action/).

**Order entry.** Assume 600 spare part orders a month arrive by email as PDFs, two pages on average, and that an inside sales colleague currently types them in at about six minutes each, roughly 60 hours a month. With IDP and RPA that is 1,200 pages a month; under [Automation Credits 2.0 or 3.0](https://docs.mulesoft.com/general/automation-credits-usage-and-rates) at 30 credits per page that is 36,000 credits before retries, plus bot runtime, priced in your MuleSoft contract. If 15 percent go to review, 90 orders a month still require a person. Because IDP does not deduplicate, the bot needs a stable key such as dealer, company and order number, a processing status kept outside the bot, and reconciliation against the ERP order number after the order is saved, so a timeout does not create a second order. Price and credit checks run in the ERP when the bot saves the order, as with manual entry.

**Warranty checks with build data.** Assume the build configuration per serial number lives in an old MES with a desktop client only. The Systems Integration Agent does not cover it, and a bot for a rarely used screen does not pay off. A nightly export of serial numbers and configuration into Salesforce assets is cheaper and also helps the service team.

None of the three needed an ERP project, only one read route, one write route under review and one export.

## What are the risks, and how do you contain them?

- **Screen changes.** An ERP patch moves a field and the bot stops. Make every ERP update trigger a bot test in the test system, report bot status to your monitoring system and keep manual entry as a fallback with known capacity.
- **Stale data.** A replica is always a few minutes behind. The agent states the timestamp and never promises a delivery date the ERP has not confirmed.
- **Bypassing ERP logic.** Here screen automation has an advantage over database writes: the bot goes through the same entry screen as a person, so the checks configured for that screen and bot user run. Warnings a person would read, later batch checks and other entry paths are not covered, so test them and keep reconciling.
- **Bot identity.** The bot gets its own ERP user with minimal rights, never a borrowed employee login, so the ERP's history shows which entries came from the bot.
- **Decisions in the model.** Credit limits, prices and eligibility stay in the system that owns them, the ERP or another deterministic service, as described in [Agent Script: rules instead of the LLM](/en/blog/agent-script-deterministic-rules/).

## When is the workaround the wrong answer?

If the new ERP goes live soon and the date is reliable, I would usually not build bots for the old one. Spend the time cleaning master data, which the new system needs anyway. If the migration is further away or uncertain, the read route behind a stable API contract is worth it, because it moves over to the new ERP. Volume, handling time, error costs and the remaining life of the old system decide, not a fixed date.

The second limiting factor is the number of write processes. Every bot is software that somebody maintains. My rule of thumb, not a benchmark: once you have about five screen-based write processes, an interface module from the ERP vendor or a proper middleware layer often costs less over three years than the bots. One complex bot can cost more than several simple ones, so count effort, not bots. Assessing whether that point has been reached is part of my work on [Salesforce integration architecture](/en/services/salesforce-integration/).

At low volume, for example thirty simple orders a month, a bot rarely pays for itself unless errors or handling time are unusually expensive.

My advice for an old ERP: start with the read route behind a stable API contract. Automate writing only where documents and screens are stable and a person reviews the uncertain cases.
