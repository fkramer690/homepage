---
title: "Revenue Cloud overview: scope, names, cost, SAP"
description: "What Salesforce Revenue Cloud covers, what it is called and costs in October 2026, which tasks stay in SAP and when a manufacturer is better off without it."
lang: en
slug: revenue-cloud-overview
course: revenue-cloud
translationKey: revenue-01
chapter: 1
pubDate: 2026-10-28
short: "Overview and decision"
summary: "What Revenue Cloud covers, what it costs, what it is called and when a manufacturer is better off with SAP or Sales Cloud."
takeaways:
  - "Revenue Cloud is Salesforce's quote-to-cash product on core platform objects, from product catalog and configurator through quote and order to contracts and invoices."
  - "It pays off for manufacturers with many variants, subscriptions or service contracts and frequent amendments, and rarely when a quote is only a price lookup in SAP."
  - "At list price Revenue Cloud Growth costs €150 and Revenue Cloud Advanced €200 per user and month, billed annually and bought on top of Sales Cloud."
  - "Salesforce documentation still mixes names, so order forms should name the edition, add-ons and SKUs instead of just Revenue Cloud."
  - "Before a partner builds, the company decides who owns the price, the configuration rules and the invoice, and how long CPQ keeps running."
articles: [revenue-cloud-worth-it-manufacturers, revenue-cloud-product-names, revenue-cloud-editions-pricing, revenue-cloud-sap-system-boundaries, revenue-cloud-vs-manufacturing-cloud-commerce]
faq:
  - q: "What is Salesforce Revenue Cloud?"
    a: "Revenue Cloud is Salesforce's quote-to-cash product on the core platform. Trailhead lists product catalog, pricing, rate management, configurator, transaction management, asset lifecycle, contracts, order orchestration and invoice management as its parts."
  - q: "Is Revenue Cloud the same as Revenue Lifecycle Management?"
    a: "Yes. Salesforce's CPQ page says Revenue Lifecycle Management was an earlier product name. The Winter '27 Developer Guide calls the product Revenue Management, and salesforce.com sells it as Revenue Cloud."
  - q: "What does Revenue Cloud cost?"
    a: "According to the Salesforce pricing page (October 2026), Revenue Cloud Growth costs €150 and Revenue Cloud Advanced €200 per user and month, billed annually, on top of a Sales Cloud subscription. Several functions are add-ons, and Revenue Cloud Billing has no published list price."
  - q: "Does SAP stay in place with Revenue Cloud?"
    a: "Yes, in every manufacturing setup I would plan. SAP usually keeps the material master, the sales order for delivery and the machine invoice. Which system calculates customer prices has to be decided once, for every price type."
  - q: "Should a new customer still buy Salesforce CPQ?"
    a: "That is no longer possible. Salesforce does not sell new CPQ licences to new customers. Existing customers can keep using CPQ, add users and renew, and there is no forced migration."
draft: false
---

Revenue Cloud is Salesforce's quote-to-cash product on core platform objects: product catalog, configurator, pricing, quotes, orders, contracts and, as an add-on, billing. For a manufacturer it pays off when quotes combine many variants, service contracts or subscriptions and change often after the first order. If a quote is a price lookup in SAP for standard items, Sales Cloud quotes and an ERP interface are usually enough. At list price Revenue Cloud Growth costs €150 and Revenue Cloud Advanced €200 per user and month, on top of Sales Cloud. Before a partner builds anything, settle four points: price master, configurator owner, invoice owner and how long CPQ keeps running.

## What does Revenue Cloud cover?

Revenue Cloud is the route from product catalog to invoice, built on standard objects of the Salesforce platform instead of a managed package. The Trailhead module [Agentforce Revenue Management Foundations](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management) lists its components:

| Component | What it does for a manufacturer |
|---|---|
| Product Catalog Management | One product model with classifications and attributes, which Trailhead calls "the single source of truth for product data" |
| Salesforce Pricing | Pricing policies and discounts, defined by pricing designers |
| Rate Management | Rates by consumption, for example for usage-based services |
| Product Configurator | Valid combinations of options and attributes |
| Transaction Management | Quotes and order capture across channels |
| Configure, Price & Quote | A spreadsheet-like quote editor that groups products |
| Asset Lifecycle Management | The installed base of what was sold, with recurring revenue |
| Salesforce Contracts | Contracts, obligations and digitised legacy contracts |
| Dynamic Revenue Orchestrator | Everything after the order, up to fulfilment |
| Invoice Management | Invoices for delivered products and services |

The [product page](https://www.salesforce.com/uk/products/revenue-cycle-management) sums it up as one product that "unifies pricing, quoting, contracting, and billing on a single data model", with "a single, attribute-based catalogue" across all channels. Trailhead adds that composable APIs let other clouds use the catalog and pricing, with Agentforce Manufacturing as the example. For Winter '27, the [release highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) name up to 15,000 transaction lines per deal and agents for buyer self-service, partner quoting and renewal preparation.

For the first decision, two points matter. Revenue Cloud is a different product from Salesforce CPQ, which the [CPQ end-of-sale page](https://www.salesforce.com/sales/cpq/end-of-life/) describes as a managed package around seller-led quoting, with Revenue Cloud Advanced as its successor "built natively on the Salesforce platform". And Salesforce no longer sells CPQ licences to new customers, so a new project chooses between Revenue Cloud, a partner product and a custom approach.

## When does Revenue Cloud pay off for a manufacturer?

I look for these signals in the current quoting process:

- **Variants with rules.** Machines with dozens of options that require or exclude each other. A configurator that checks combinations saves rework in order processing.
- **Service on the same quote.** A spare parts package, a maintenance contract and a remote monitoring subscription sold together with the machine.
- **Changes after the sale.** Upgrades, renewals and cancellations that run through quote and order again, based on what the customer already has.
- **Large quotes.** Plant projects with hundreds of lines, grouped by section of the plant.
- **Several channels on one catalog.** Sales desk, dealers and a store selling the same products.

Two or three of these together justify a closer look. One alone rarely does. The full list of signals for and against, with a cost frame, is in [Revenue Cloud for manufacturers: when is it worth it?](../../../blog/revenue-cloud-worth-it-manufacturers/).

## Which name applies: Revenue Cloud, RLM or Revenue Management?

All of them mean the same product, and the sources were updated at different times. As of late October 2026:

- **salesforce.com** shows "Revenue Cloud" as the heading of the product page, last modified on 22 October 2026, and of the pricing page, with the editions Revenue Cloud Growth and Revenue Cloud Advanced (RCA).
- **The Developer Guide** for Winter '27 is titled [Revenue Management Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) and says: "Revenue Cloud is now Revenue Management. You may see references to Revenue Cloud in our application and documentation."
- **Trailhead** titles its basic module Agentforce Revenue Management Foundations.
- **The CPQ end-of-sale page** calls Revenue Lifecycle Management (RLM) "an earlier product name" and places RCA in "the Agentforce Revenue Management suite".

Partner blogs report that the Agentforce name came with Dreamforce 2025 and that Salesforce quietly went back to Revenue Cloud around September 2026. I have found no formal announcement for either step, so I treat it as reported. The Agentforce label runs through the whole portfolio; the [chapter on terms and the map](../../ai-salesforce/terms-and-map/) of my AI masterclass sorts those names.

One older meaning causes real misunderstandings. In November 2020 Salesforce [introduced Revenue Cloud](https://www.salesforce.com/news/stories/introducing-revenue-cloud/) as a suite that "brings together CPQ and Billing, Partner Relationship Management and B2B Commerce capabilities". Quoting and billing in that suite were the CPQ and Billing packages. A partner with "30 Revenue Cloud projects" may mean projects on the CPQ package. Ask which data model the references used.

For contracts my rule is simple: the order form names the edition, every add-on and the SKUs from the Salesforce quote, never just "Revenue Cloud". The timeline and the search tips are in [Revenue Cloud, RLM, RCA: which product name applies?](../../../blog/revenue-cloud-product-names-rlm-rca/).

## What does Revenue Cloud cost?

The [pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) lists two editions per user and month, billed annually:

| Edition | List price | Contains |
|---|---|---|
| Revenue Cloud Growth | €150 / $150 | Quoting and configurator, order capture, subscriptions |
| Revenue Cloud Advanced | €200 / $200 | Growth plus contracts and orders, consumption and invoicing, AI and analytics |

The FAQ on that page says Revenue Cloud is a paid add-on to a Sales Cloud subscription. The comparison table marks four add-ons as "Available for purchase": Contract Lifecycle Management for Growth, and Dynamic Revenue Orchestration, Invoice Management and External User Support for Advanced. The two in the middle carry the note "Freemium access available", without saying what is included. Revenue Cloud Billing has no published list price. According to the [Billing rate sheet from February 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf), it consumes one Billing Event per $50 of invoice amount, with no rollover past the order end date.

A calculation at list price, as an assumption: 50 users who create quotes get Revenue Cloud Advanced, which is 50 × €200 × 12 = €120,000 a year. If they do not have Sales Cloud yet, Sales Cloud Core at €195 per user and month according to the [Sales Cloud pricing page](https://www.salesforce.com/eu/sales/pricing/) adds €117,000. Implementation, the SAP integration and operations come on top.

The number of users moves the budget more than the edition does. I group users by what they do with quotes: create, approve, only read, maintain the catalog, or quote as a dealer.

```hinweis offen
For every group except the users who create quotes, get the licence requirement from Salesforce in writing.
```

Add-ons, Billing Events and the licence forecast are in [Revenue Cloud pricing: Growth, Advanced and add-ons](../../../blog/revenue-cloud-editions-pricing/), and an independent check of a quote is part of [make-or-buy and licence forecasts](../../../services/make-or-buy-licences/).

## Which tasks should stay in SAP?

In a manufacturing company SAP stays, and three tasks usually stay there:

- **Pricing conditions.** Customer and dealer prices maintained as conditions for years should not be rebuilt in a second system. Salesforce fetches the net price through an API instead.
- **Variant configuration.** If machines are configured in SAP variant configuration today and the order needs that result, the Revenue Cloud configurator only covers the selling view or stays empty.
- **The machine invoice.** Delivery, down payments and customs live in SAP. The invoice for a one-off machine sale belongs there too.

The closest documented pattern is [use case 3a of the MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/). It states that "SAP S/4HANA is the system of record pricing conditions", fetches the net price per quote line from SAP and creates the order in SAP from Salesforce. Two limits: it covers Sales Cloud and Salesforce CPQ, not Revenue Cloud, and it explicitly leaves out SAP Variant Configuration. The pattern carries over; the design for Revenue Cloud is your partner's work and needs a review on your side.

My default split per process step:

| Step | Default owner | When it moves |
|---|---|---|
| Material master, units, status | SAP | never |
| Catalog for selling, attributes | Revenue Cloud | |
| Configuration | Revenue Cloud | stays in SAP if the rules live in variant configuration |
| Customer prices | one master, usually SAP | Revenue Cloud for subscriptions and bundles sold only in Salesforce |
| Quote and approval | Revenue Cloud | |
| Sales order for delivery | SAP, created from Salesforce | |
| Invoice | SAP | Revenue Cloud Billing for recurring revenue sold and changed in Salesforce |

If invoices do move, [Revenue Cloud Billing](https://www.salesforce.com/sales/revenue-cloud-billing/) can "function as a sub-ledger while synchronizing journal entries" to the ERP. Finance then has to agree on legal entities, accounting periods and account mapping. Three cuts and an owner per object are in [Revenue Cloud and SAP: who owns what in quote to cash?](../../../blog/revenue-cloud-sap-quote-to-cash-ownership/), and the interfaces themselves are my work in [Salesforce integration](../../../services/salesforce-integration/).

## Where does Revenue Cloud end?

Three other Salesforce products touch the same deals:

- **Manufacturing Cloud** measures run-rate business: sales agreements with plan against actuals, account forecasts and rebates. A configured quote from Revenue Cloud can become a sales agreement. That side is covered in the chapter [agreements and forecasting](../../manufacturing-cloud/agreements-and-forecasting/) of the Manufacturing Cloud masterclass.
- **B2B Commerce** lets dealers and customers reorder known items in a store. For rule-based prices, configurable bundles and Request for Quote, [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) names a Commerce Growth or Advanced licence together with Revenue Cloud Advanced. When a store pays off is in the chapter [is B2B Commerce worth it?](../../b2b-commerce/b2b-commerce-worth-it-overview/).
- **Field Service** maintains the installed machines. Revenue Cloud keeps what was sold as assets, Field Service works on the machine with its serial number. How the two meet is part of chapter 3.

The overlaps are catalog, price and quote. One catalog, one price master and one quote model, with exactly one product leading each process step. The decision table is in [Revenue Cloud, Manufacturing Cloud or B2B Commerce?](../../../blog/revenue-cloud-vs-manufacturing-cloud-b2b-commerce/).

## When is Salesforce the wrong answer?

For some manufacturers Revenue Cloud is too much:

- **The quote is an SAP price lookup.** Sales picks material numbers, SAP calculates. Salesforce then only needs an interface to SAP.
- **Few products, few variants.** A range of 200 items without options does not need a constraint-based configurator.
- **Rules live elsewhere and stay there.** If variant rules sit in SAP or in the heads of application engineers and nobody will maintain them twice, the configurator stays empty.
- **No recurring revenue.** If every sale is a one-off machine and the invoice stays in SAP, the strongest parts go unused.

The alternatives are Sales Cloud quotes with an ERP interface, a CPQ product from a partner, or a custom approach on the platform. I describe the last route in [from quote to sales agreement](../../../blog/quote-to-sales-agreement-product-configurator/).

## A typical scenario, as an assumption

A maker of packaging machines with SAP S/4HANA sells 25 base models with options, plus spare parts packages and a remote monitoring subscription per machine. 60 people work in sales; 20 of them create project quotes. Spare parts prices are SAP conditions per customer. All details are assumptions.

I would license Revenue Cloud Advanced for the 20 quote creators: €48,000 a year at list price. Catalog, configurator and quote for machines and subscriptions move to Revenue Cloud. Spare parts on the same quote get their net price from SAP, and the subscription stays an asset in Salesforce for renewals:

```ablauf
sf: Quote, Order, Subscription asset
erp: SAP conditions, SAP sales order, SAP invoice
SAP conditions --Net price via API--> Quote
Quote --> Order
Order --Handover--> SAP sales order
SAP sales order ..Order number..> Order
Order --> Subscription asset
SAP sales order --> SAP invoice
```

Invoices stay in SAP in year one; Billing becomes a question once subscriptions are a business of their own.

## What should you decide before a partner builds?

Partners ask about features. The decisions that drive cost and timeline belong to the company:

1. **Price master.** SAP conditions or Salesforce Pricing, per price type, never both for the same price.
2. **Configurator owner.** Who maintains variant rules after go-live, and in which system.
3. **Invoice owner.** SAP or Revenue Cloud Billing. Finance decides, not the CRM team.
4. **CPQ coexistence.** Existing CPQ customers are under no time pressure: the CPQ page says "There is no forced migration", but also that CPQ "will not receive new features". A typical migration runs three to six months according to the same page. The details are in chapter 5, [from CPQ to Revenue Cloud](../from-cpq-to-revenue-cloud/).

Write these four answers into the decision log before you ask for estimates. They are part of my work on [Salesforce architecture](../../../services/salesforce-architecture/). With them settled, [chapter 2 on catalog, configurator and pricing](../product-catalog-configurator-pricing/) covers how the products and prices are modelled; all chapters are on the [overview page](../).

Revenue Cloud is worth it when your quotes are complex and your revenue recurs, and the decisions about price, rules and invoice come before the partner.
