---
title: "Dealer and partner channel in Manufacturing Cloud"
description: "Dealer rebates, ship and debit, partner portal and dealer visits in Manufacturing Cloud: what exists, what it costs and which data must come from the ERP."
lang: en
slug: dealer-and-partner-channel
course: manufacturing-cloud
translationKey: mfg-03
chapter: 3
pubDate: 2026-10-28
short: "Dealer and partner channel"
summary: "Dealer rebates, ship and debit, partner portal and dealer visits: what Manufacturing Cloud offers for selling through dealers."
takeaways:
  - "For the dealer channel, Salesforce offers rebate management, a partner portal and partner visit management around Manufacturing Cloud; ship and debit and price protection come with the Channel Revenue Management add-on."
  - "Channel Revenue Management for Manufacturing is listed at $30,000 per org and year on the add-ons page; according to Salesforce, partner access is bought on top."
  - "Dealers who see rebates, submit claims or work with sales agreements need Partner Community for Manufacturing: $20 per login or $50 per member and month."
  - "Partner visit management, partner lead management and partner performance management each have their own switch since API version 56.0, and all are off by default."
  - "Salesforce calculates and approves, the ERP pays. Ordering from a catalogue with cart and checkout belongs to B2B Commerce, not to the partner portal."
articles: [manufacturing-cloud-rebate-management, channel-revenue-ship-and-debit, manufacturing-cloud-customer-portal, manufacturing-cloud-partner-visit-management, partner-sales-assistant-dealer-quotes, distributor-replenishment-agent]
faq:
  - q: "Which licence do dealers need in the Manufacturing Cloud partner portal?"
    a: "Partner Community for Manufacturing, listed at $20 per login or $50 per member and month. Customer Community Plus for Manufacturing costs $15 or $35 but is meant for customers; Salesforce Help names rebate claims and leads only for the partner licence. Get the scope confirmed in the quote."
  - q: "What is the difference between rebate management and ship and debit?"
    a: "Rebate management rewards volume: a dealer reaches a tier over a period and gets a rebate afterwards. Ship and debit compensates a special price for a specific end customer, claim by claim."
  - q: "What does Channel Revenue Management for Manufacturing cost?"
    a: "The Manufacturing Cloud add-ons page lists $30,000 per org and year. The general pricing page shows no price, requires a Sales Cloud or CRM licence and lists partner access, additional users and payouts as available for purchase. Another page lists rebate management from $75 without a unit."
  - q: "Can dealers order spare parts in the partner portal?"
    a: "Simple orders, yes. If dealers should search a catalogue with their own prices, use a cart, check out and reorder, you need B2B Commerce. Decide that boundary before the portal project starts."
draft: false
---

For selling through dealers, Salesforce offers four building blocks around Manufacturing Cloud: rebate management for dealer rebates, Channel Revenue Management for ship and debit and price protection, a partner portal on Experience Cloud for Manufacturing, and partner visit management for dealer visits. Which ones you need depends on your channel model. Dealers who resell need rebates, a portal and visits; distributors with their own stock and project business also need ship and debit. Salesforce calculates and approves, the ERP pays. Costs pile up in two places: Channel Revenue Management is listed at $30,000 per org and year, and every dealer user in the portal needs a partner licence.

## Which channel models do manufacturers use?

Before talking about features, look at how your goods reach the end customer. Manufacturers typically use three models, often side by side:

| Channel model | Typical for | What fits in Manufacturing Cloud |
|---|---|---|
| Direct sales to key accounts | Components, series parts for OEMs | Sales agreements and forecasts from [chapter 2](../agreements-and-forecasting/), customer portal |
| Dealers who resell and provide service | Agricultural machinery, construction equipment, commercial vehicles | Rebate management, partner portal, partner visit management, warranty through dealers |
| Distributors that hold stock | Electronics, drive technology, industrial supplies | On top: ship and debit, price protection, distributor stock data |

The table is my own classification, not a Salesforce category. It helps when reading a quote: a partner who sells ship and debit to a network of 80 agricultural machinery dealers is probably solving a problem you do not have. The reverse holds too: a distribution business with many special prices will not get by with a rebate programme.

Whether Manufacturing Cloud pays off as a whole is covered in [chapter 1](../scope-and-business-case/). This chapter assumes that decision has been made and sorts out which channel features to switch on, buy or leave out.

## Dealer rebates with rebate management

Rebate management handles rebate programmes: programme, members, rebate types with tiers, payout periods and the approval of amounts. The Data Processing Engine calculates them from transactions in the Transaction Journal object. The details, including the three routes by which revenue reaches that object, are in [rebate management: dealer rebates without Excel](../../../blog/rebate-management-dealer-rebates/).

Three points matter for the decision:

- **Revenue almost always comes from the ERP.** Invoices are created there, so an interface delivers them as transactions. Without that interface, rebate management calculates with whatever happens to be in Salesforce.
- **No system decides what counts as rebate-relevant revenue.** Order, delivery or invoice, with or without returns, which product groups: put it in writing before the first programme is created.
- **Salesforce does not pay out.** Approved amounts and accruals go to the ERP, and finance books the credit note there.

It pays off from dozens of dealers on tiered programmes that someone calculates in a spreadsheet today. A simple annual bonus for five customers can often run through ERP pricing conditions, without a second logic in Salesforce.

## Ship and debit and price protection with Channel Revenue Management

Ship and debit is a special price for one deal. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) describes it as a contract that defines the discounted price for a specific customer, the duration of the offer and the products included. The distributor sells below its purchase cost and claims the difference from the manufacturer. Price protection compensates stock on hand when the manufacturer lowers a list price. Channel Revenue Management checks both against programme rules and transaction data. How a claim moves through the system and which checks Salesforce describes is in [ship and debit: distributor claims in Salesforce](../../../blog/ship-and-debit-price-protection-distributors/).

On price, the Salesforce pages contradict each other:

| Source | What it says |
|---|---|
| [Manufacturing Cloud add-ons](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) | Channel Revenue Management for Manufacturing, $30,000 per org and year, with the Sales editions Core and Advanced and with Max |
| [Channel Revenue Management pricing](https://www.salesforce.com/sales/channel-revenue-management/pricing/) | No price, request a quote; requires a Sales Cloud or CRM licence; includes 10 channel manager admin users; partner access, additional users and payouts available for purchase |
| [Manufacturing Cloud Experience Cloud page](https://salesforce.com/manufacturing/cloud/experience-cloud) | Rebate management "from $75", without a unit |

```hinweis offen
The $75 does not fit the $30,000. I would get it in writing whether rebate management is already part of your edition, what the add-on costs on top and how many payouts the price covers.
```

The functional boundary is simple: rebates reward volume over a period, ship and debit and price protection compensate price, deal by deal. Ship and debit needs sell-through and stock data from the distributors. Without them, validation can only check whether the documents match the programme, and not whether the sale happened.

## Which licence do dealers need in the partner portal?

Partner Community for Manufacturing. The [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) lists two portal licences for Experience Cloud for Manufacturing, each per month:

| Licence | Per login | Per member | Meant for |
|---|---|---|---|
| Partner Community for Manufacturing | $20 | $50 | Dealers, distributors, suppliers |
| Customer Community Plus for Manufacturing | $15 | $35 | Customers |

Salesforce Help describes what each licence covers; I summarised that overview in [the Manufacturing Cloud customer portal](../../../blog/manufacturing-cloud-customer-portal/). For the partner licence, Help names sales agreements, account forecasts, leads, quotes, warranty and rebate claims and visits, among others. For Customer Community Plus, it names cases, knowledge articles, orders, assets and warranties. So a dealer who should see their rebate status, submit ship and debit claims or work on leads needs the partner licence. The cheaper customer licence only saves money where dealers are treated like customers.

Three decisions come before the build:

1. **Login or member.** Which one is cheaper depends on how often a dealer user logs in. Ask for the counting rule to be explained in the quote, and calculate with real login numbers if a portal exists today.
2. **What dealers see.** The sales agreement carries fields such as margin and cost. Dealers get a reduced view with quantities, prices, term and actual quantities, and only for their own customers.
3. **Who owns master data.** When a dealer changes their address in the portal, Salesforce becomes the entry system for that field. That needs a list of editable fields, one direction per field and visible errors when the transfer to the ERP fails.

How I compare licences against a custom build over five years is described under [make-or-buy and licence forecasts](../../../services/make-or-buy-licences/).

## Dealer visits with partner visit management

Partner visit management plans visits to dealers and distributors and makes them comparable. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/get-started-with-partner-visit-management), a visit has a location, special instructions and an assigned field rep. Tasks give the visit a purpose, such as discussing quarterly targets or auditing inventory, and carry KPIs such as spare parts count, scrap percentage or safety training dates. Reps capture actual values on their phone, and the back office compares them with expected values.

The feature has its own switch. In the [IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) metadata it is `enablePartnerVisitManagement`, available since API version 56.0, next to `enablePartnerLeadManagement` and `enablePartnerPerformanceManagement`. All three default to off. So "we have Manufacturing Cloud" does not yet mean that visits, partner leads or partner performance are running. The quote should say which of these features the partner sets up.

```hinweis offen
Two points are open in the sources: which licence reps need for the visits app, and whether it works offline. Get both clarified in writing before you plan.
```

The flow from visit plan to KPI, and when a simple visit report object is enough, is covered in [partner visit management: dealer visits with KPIs](../../../blog/partner-visit-management-dealer-visits/). My short rule: without five agreed KPIs with an expected value per dealer group, the feature collects data nobody compares.

## Measuring dealer performance: dashboards and their data

The [CRM Analytics template for Manufacturing Cloud](https://trailhead.salesforce.com/content/learn/modules/crm-analytics-dashboards-for-account-manager-targets/explore-sales-targets) comes with pre-configured dashboards that the admin embeds on home and record pages. These matter for the channel:

- **Rebate Program Embedded** on the rebate programme: programme performance, a leaderboard of members and products, upselling candidates.
- **Order Rebates Embedded** on the order: associated rebate programmes and the purchases a member still needs for the next tier.
- **Account Insights Embedded** on the account: the impact of rebate programmes on the customer's revenue.

For ship and debit, the [Trailhead unit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) also mentions CRM Analytics dashboards. Which CRM Analytics licence they require, the units do not say.

Each of these dashboards shows only the data that arrives. Invoices as transactions come from the ERP; sell-through and distributor stock come from the distributors themselves, by upload, EDI or an interface. If a dealer reports weekly, every figure is up to seven days old, and the dashboard should show the date of the last report. Which data flows between ERP and Salesforce is something I decide as part of [integration architecture](../../../services/salesforce-integration/).

## Agents in the channel: read first, write later

For the channel, Salesforce names two agent features. According to the [product page](https://www.salesforce.com/manufacturing/cloud/), the AI Partner Sales Assistant from Summer '26 finds products and builds quotes; for the same release the page lists automated distributor procurement. What the assistant needs in catalogue, prices per dealer tier and discount limits is in [AI Partner Sales Assistant: dealer quotes with AI](../../../blog/ai-partner-sales-assistant-dealer-quotes/). The inventory template of Agentforce for Manufacturing searches and summarises inventory and creates replenishment requests; the details are in [Agentforce for distributor stock and replenishment](../../../blog/distributor-inventory-replenishment-agentforce/).

The Agentforce for Manufacturing Cloud Add-on is listed at $150 per user and month on the [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/), available with Core and Advanced. Which licence dealers in the portal need to use the agents, I could not find in the sources.

My order in the channel:

```schritte
Start read-only
  Stock summaries, rebate status, status of a request.
Proposals, not orders
  The agent prepares a replenishment or a quote, and a person or the ERP confirms it.
Writes behind gates
  Write actions only behind gates in code: credit status from the ERP, a quantity cap, confirmation by the dealer, a duplicate check.
```

Every field a dealer writes in the portal is outside input that an agent reads. How to protect against that is in [prompt injection through dealer portals](../../../blog/prompt-injection-dealer-portals-agentforce/). Where these agents sit among the other manufacturing agents is shown in the AI masterclass chapter [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/).

## Where does the partner portal end and B2B Commerce begin?

At the cart. The Manufacturing Cloud partner portal shows dealers their sales agreements, rebates, leads and warranty claims and takes requests and simple orders. Once dealers should search spare parts in a catalogue with their own prices, put them in a cart, buy on account and reorder regularly, you need a store. That is B2B Commerce, with its own licence and its own project.

Both run on Experience Cloud and can live in one org. The question is who builds what and who pays for what. I would decide before the portal project which dealer actions belong in the portal and which in the store, or the portal partner ends up rebuilding half a cart. When a store pays off is covered in the first chapter of the [B2B Commerce masterclass](../../b2b-commerce/b2b-commerce-worth-it-overview/).

## A typical scenario, as an assumption

A maker of compact machinery sells through 80 dealers in Germany, Austria and Switzerland, each with three portal users. Spare parts also go through six distributors. All numbers are assumptions.

- **Rebate management:** yes. Three tiers, quarterly, calculated in a spreadsheet by inside sales today. Invoices arrive from SAP in the Transaction Journal every night.
- **Partner portal:** 240 dealer users on Partner Community for Manufacturing. As member licences at list price that is 240 × 50 × 12 = $144,000 a year, before anyone has talked about login licences or discounts.
- **Partner visit management:** yes, after a pilot in one region with five KPIs.
- **Ship and debit:** no. Six distributors with few special prices do not justify $30,000 a year; tighter approval rules are enough.
- **Agents:** later, read-only, once rebate data and stock have been right for a quarter.

The largest line here is the portal and not the rebate logic. Dealer users are easy to leave out of a first quote, so I would count them before every licence negotiation, together with the roles of the partners who build the portal; that is part of [partner governance](../../../services/partner-governance/).

Warranty claims submitted by dealers and recalls across the dealer network are covered in [chapter 4](../warranty-and-after-sales/). All chapters are on the [overview page](../).

The dealer channel in Manufacturing Cloud pays off when you pick the features by channel model and plan portal licences and ERP data before the first programme. If you want to work through your dealer channel this way, [send me a message](#contact).
