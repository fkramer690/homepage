---
title: "Salesforce AELA vs Flex Credits for manufacturers"
description: "When a Salesforce AELA beats Flex Credits for a manufacturer, what Salesforce has made public about it and which renewal terms to negotiate at signature."
pubDate: 2026-10-27
lang: en
slug: aela-agentforce-flat-fee-vs-credits
translationKey: aela-flat-fee-vs-credits
topic: governance
categories: [architecture, ai]
contactBrief: licences
tags: [aela, flex credits, licences, agentforce, contract negotiation, manufacturing]
takeaways:
  - "Forrester describes the Salesforce AELA as unlimited use of Agentforce, Data 360 and MuleSoft for a fixed fee over two or three years. Salesforce has published no list price and no standard terms."
  - "Salesforce sold more than 120 AELAs in the fourth quarter of fiscal 2026, and its CFO described the aim as converting AELA customers to consumption later."
  - "At the list price of $500 per 100,000 Flex Credits, an assumed fixed fee of $150,000 a year breaks even at 30 million credits, which is 1.5 million standard agent actions."
  - "An AELA can suit a manufacturer that plans several agents across sales, service, field service and dealers and would buy the bundled licences anyway."
  - "Negotiate the renewal at signature: what follows the term, a cap on the price step, annual exit points, the exact scope and access to your own usage data."
faq:
  - q: "What is a Salesforce Agentic Enterprise License Agreement?"
    a: "Forrester describes it as a contract with unlimited use of consumption-based products such as Agentforce, Data 360 and MuleSoft for a fixed fee over two or three years. Salesforce publishes no standard terms, and the deals made public so far differ in scope and term."
  - q: "Is an AELA really unlimited?"
    a: "The Adecco press release speaks of unlimited access but adds that usage, terms and conditions are subject to the agreement. Get the fair-use clauses and the list of covered meters in writing before you sign."
  - q: "What happens when an AELA ends?"
    a: "Salesforce has not published renewal terms. Its CFO spoke of converting AELA customers to consumption, so plan for defined quantities after the term and fix the conversion rate and a price cap in the first contract."
  - q: "Can a mid-sized manufacturer get an AELA?"
    a: "Salesforce publishes no threshold. The deals made public are large, such as the US Department of Veterans Affairs with a ceiling of $1.6 billion. Ask whether it is offered at your volume and compare it with a three-year Flex Credit plan."
  - q: "How do I track agent usage under a flat fee?"
    a: "Digital Wallet shows consumption down to agent, action and channel and supports custom tags for internal chargeback. Its FAQ describes access after turning on Data 360. Keep these numbers under a flat fee too, because they are your basis for the renewal."
draft: false
---

A Salesforce AELA pays off for a manufacturer only when agent use across sales, service, field service and dealers will grow beyond what Flex Credits cover at a known price, and when the renewal terms are fixed at signature. For one or two agents, Flex Credits are cheaper and easier to leave. Salesforce has published no AELA price and no standard terms. What it has said in public is that it wants AELA customers to move to consumption later. That makes the renewal clause the part of the deal I would negotiate hardest.

## What is a Salesforce AELA, and what is public?

The Agentic Enterprise License Agreement (AELA) is a fixed-fee contract for agent use. Forrester analyst Lisa Singer [wrote in December 2025](https://www.forrester.com/blogs/ai-agents-become-economic-actors-salesforce-rewrites-the-rules-of-pricing) that it "gives customers unlimited use of consumption‑based products such as Agentforce, Data 360/Data Cloud, and MuleSoft for a fixed fee over two or three years". Forrester also reports that Chief Revenue Officer Miguel Milano said at a conference "that Salesforce is OK with losing money on some AI deals".

Salesforce's own statements come from its earnings calls. In the [transcript of the Q4 FY26 call](https://s205.q4cdn.com/626266368/files/doc_financials/2026/q4/Transcript-Salesforce-Inc-Q4-FY26-Earnings-Conference-Call-2-25-26.pdf) of 25 February 2026, Milano gave these sales figures:

```kennzahlen
over 120 | AELAs sold in the fourth quarter of FY26
50 to 100 | AELAs Salesforce had expected for the quarter
8 of 10 | largest deals of the quarter were AELAs
source: Salesforce, transcript of the Q4 FY26 earnings call of 25 February 2026
```

CFO Robin Washington named the forward deployed engineers as the key to "converting it from AELAS to ultimately consuming" (spelling as in the transcript). In the [Q1 FY27 call](https://s205.q4cdn.com/626266368/files/doc_financials/2027/q1/Salesforce-Q1-FY27-Earnings-Transcript.pdf) of 27 May 2026, Milano described six of the ten largest deals as ELAs "where we threw in a bunch of flex credits". The Q4 transcript never defines AELA; the Q1 transcript glosses ELA as "a limited enterprise license agreement".

Two deals have been made public:

- **The Adecco Group** [announced on 12 March 2026](https://www.adeccogroup.com/our-group/media/press-releases/the-adecco-group-to-scale-agentic-ai-at-speed-with-unlimited-agentforce-license-agreement) a multi-year agreement through 2027 with "unlimited global access to Agentforce 360". A footnote adds that usage, terms and conditions are "subject to the Agentic Enterprise License Agreement".
- **The US Department of Veterans Affairs** signed what Salesforce [calls a three-year AELA](https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/) with a ceiling of $1.6 billion. The footnote: "a one-year contract with the option for two additional one-year renewals". The release lists Agentforce, Slack, MuleSoft, Data 360 and Tableau, with no wording about unlimited use.

What is not public: the price, who qualifies, the fair-use rules, which meters are covered and what follows the term. The [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) does not mention the AELA. Gartner covers Salesforce licensing in paid research, which I could not read. The renewal points below are therefore my own reasoning, not Gartner's.

## How does an AELA compare with Flex Credits?

| Model | You pay | Who carries the volume risk | Public terms |
|---|---|---|---|
| Flex Credits, PayGo | $500 per 100,000 credits used | you, per credit | price list and rate card |
| Flex Credits, Pre-Commit | credits committed in advance (the pricing page gives no details) | you, if you commit too high | price list and rate card |
| Edition pool | seats, with a credit pool per org and year | you, above the pool | pricing pages |
| Per-user add-on | $125 per user and month | Salesforce, for employee use | pricing page |
| AELA | a fixed fee over two or three years | Salesforce in the term, you at renewal | none |

For a manufacturer two lines matter most. The [pricing page](https://www.salesforce.com/agentforce/pricing/) sells the per-user add-ons as "Unmetered Agentforce usage for employees", and it states that "Unused Flex Credits do not roll over into subsequent subscription terms". So employee use inside Salesforce can already be bought at a fixed price per seat. The hard-to-forecast part is everything facing dealers and customers, plus document processing and integrations.

That part is metered on the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf): 20 credits per standard action in production, 16 in a sandbox, 150 credits per MB for unstructured Data 360 processing at the base tier. The rate for Headless Platform Interactions, the meter for agents calling Salesforce through API or MCP, is still "TBA". This is where an AELA removes the meter. How to estimate each of these meters is in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/), and how the edition pools fit in is in [Salesforce editions Core, Advanced, Max](../salesforce-editions-core-advanced-max/).

## A typical scenario: three agents over three years

Assume a machine builder with SAP, 300 Salesforce users in sales and service, 120 field technicians and a dealer portal. Salesforce offers a three-year AELA, and the part of the offer above today's licences is assumed at $150,000 a year. All numbers are assumptions to show the method; Salesforce publishes no AELA prices.

Assumed consumption:

- **Year 1:** a dealer service agent for order status and spare part availability, 1,500 enquiries a month at three actions each. With prompts, sandbox tests and Data 360: about 1.5 million credits.
- **Year 2:** add a troubleshooting agent for field technicians and warranty claim intake for dealers: about 4 million credits.
- **Year 3:** more dealers, more languages: about 8 million credits.

That is 13.5 million credits over three years, $67,500 at list price. The AELA costs $450,000 for the same period. At $0.005 per credit, $150,000 a year buys 30 million credits, or 1.5 million standard actions, about 125,000 a month. Year three reaches roughly a quarter of that.

So at list price the AELA loses in this scenario. It can still win in three cases:

- **The offer bundles licences you would buy anyway,** such as an edition upgrade or Field Service seats. Then compare the whole contract, not the consumption part.
- **The consumption plan is too low by a factor of four or more,** for example because external agents call Salesforce through API or MCP once the Headless rate is set.
- **Budget certainty is worth the premium to you,** for example when a group controller will not approve variable AI costs per plant.

I would compare three numbers side by side: the AELA fee, the licences you plan anyway plus Flex Credits for the planned consumption, and the same with consumption tripled as a stress test.

## When does an AELA make sense for a manufacturer?

I would consider an AELA when most of these points are true:

```pro-contra
pro: Consider an AELA when
- **Several agents are live or approved** for the next twelve months in at least two areas, for example dealer service and field service.
- **The bundled products are on your roadmap,** including Data 360 and MuleSoft for the SAP integration, which Forrester names as covered.
- **Consumption is hard to forecast,** because large document sets for spare parts and manuals have to be indexed or the API rate is still open.
- **You have the capacity to roll out.** Under a flat fee, capacity you do not use is pure cost, and Salesforce's CFO ties the later conversion to consumption to its engineers on site.
contra: Do not sign
- In a pilot.
- For a single plant.
- While spare part and asset data are still unreliable.
```

In these cases agents do not reach volume, as described in [Agentforce pilots: business value and data quality first](../agentforce-business-value-data-quality-first/). Forrester expects CFOs to ask about ROI, IRR and "the useful life of the agent". For a machine builder that means one business case per agent with a metric you measure yourself, such as first-time fix rate or warranty claim throughput.

## What must you negotiate for the renewal?

Salesforce's CFO speaks openly about converting AELA customers to consumption. The second contract therefore decides what the AELA really costs. I would put these points into the first one:

1. **What follows the term.** The model after year three, the credit rate and how measured consumption turns into defined quantities, with a cap on the price step.
2. **Exit points.** The VA contract runs one year plus two optional one-year renewals, so annual exit or step-down rights are possible.
3. **Scope in writing.** Products, meters, sandboxes, Data 360 tiers, MuleSoft, the Headless meter once priced, and which subsidiaries, plants and orgs are covered.
4. **Fair-use clauses.** "Unlimited" comes with terms, as the Adecco footnote shows. Ask for them before the commercial talks end.
5. **Seat coupling.** What happens to the fee when you reduce users or sell a division.
6. **Your own usage data.** [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) shows consumption down to agent, action and channel and supports custom tags for internal chargeback; according to its FAQ you reach it after turning on Data 360. Export it monthly, so you know as much as Salesforce at the renewal.

This list is a commercial checklist, not legal advice. Have the contract itself reviewed by your lawyer.

## Where should you start?

1. **Build a three-year consumption plan per agent,** with prompts, tests and Data 360. The method is in the [masterclass chapter on costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).
2. **Price the Flex Credit path** with your edition pool and the per-user add-ons for employees.
3. **Ask for the AELA offer in writing,** including the renewal terms and the list of covered meters.
4. **Compare whole contracts** and run the stress test with tripled consumption.
5. **Check your partner's incentives.** Salesforce now rewards partners for consumption, as covered in [fixed price vs time and materials](../fixed-price-vs-time-and-materials-ai/).

Comparing licence models over several years is part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/), on the client side and without a stake in the deal.

An AELA buys a known price for two or three years, and the renewal clause decides what the year after costs. If you have an AELA offer on the table and want an independent view, [send me a message](#contact).
