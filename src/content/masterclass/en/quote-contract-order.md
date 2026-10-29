---
title: "Quote, contract, order in Revenue Cloud"
description: "How quotes, discount approvals, the quoting agent, Salesforce Contracts, order orchestration and assets work together in Revenue Cloud and where SAP takes over."
lang: en
slug: quote-contract-order
course: revenue-cloud
translationKey: revenue-03
chapter: 3
pubDate: 2026-10-28
short: "Quote, contract, order"
summary: "Approvals, the quoting agent, Salesforce Contracts, order orchestration and assets: the path from quote to the hand-over to SAP."
takeaways:
  - "In Revenue Cloud every sale runs through a quote and an order on standard objects, including amendments, renewals and cancellations. Changing quantities directly on the asset breaks the history."
  - "Discount and margin approvals run on Advanced Approvals with preview, parallel approvers and an audit trail; the threshold and the approver come from rules, never from an agent."
  - "The quoting agent creates and changes quotes from plain language, but it is only as good as the catalog, the synced prices and the configuration rules in Salesforce behind it."
  - "The hand-over to SAP belongs in a callout step of Dynamic Revenue Orchestrator; if an order goes to SAP in one piece, a plain integration without this add-on is enough."
  - "Revenue Cloud and Field Service work on the same Asset object; decide before the first sprint whether sold subscriptions and physical machines share records."
articles: [revenue-cloud-discount-approvals, revenue-cloud-quoting-agent, partner-sales-assistant-dealer-quotes, salesforce-contracts-revenue-cloud, revenue-cloud-order-orchestration-erp, revenue-cloud-installed-base-assets]
faq:
  - q: "How does a quote become an order in Revenue Cloud?"
    a: "The rep sets the quote to Accepted and creates an order with Create Order. On activation the order changes from Draft to Activated and can no longer be edited directly; a flow creates the assets on the customer account or hands the order to Dynamic Revenue Orchestrator."
  - q: "How many lines can a quote have in Revenue Cloud?"
    a: "For Winter '27, Salesforce names up to 15,000 transaction lines per deal in its release highlights. For long quotes the Transaction Line Editor offers quote line groups, filters, search and frozen columns."
  - q: "Do I need Dynamic Revenue Orchestrator to send orders to SAP?"
    a: "No. A record-triggered flow or a middleware call on activation is enough when the order goes to SAP in one piece. DRO pays off when one order triggers work in several systems that depends on each other and has deadlines."
  - q: "Is Salesforce Contracts enough for customer contracts?"
    a: "For contracts from the sales process on your own paper, usually yes: templates, a clause library, Word through Microsoft 365, DocuSign and obligation tracking. If legal manages purchasing, NDAs and group contracts centrally, its own CLM tool stays."
  - q: "Can dealers and customers use the quoting agent?"
    a: "With Winter '27, generally available since 12 October 2026, Salesforce announced self-service quoting for customer buyers and integrated quoting for partners. Clarify the licences for external users separately before a dealer sees an agent quote."
draft: false
---

In Revenue Cloud every sale runs through a quote and an order on standard objects: the first sale as well as amendments, renewals and cancellations. Advanced Approvals approves discounts and margins by fixed rules, a quoting agent can prepare quotes from plain language, and Salesforce Contracts generates the contract from the quote. The activated order goes to Dynamic Revenue Orchestrator, which breaks it down and hands it to SAP through a callout, or in simple cases straight through an integration. What was sold stays with the customer as an asset. My recommendation: decide before the build where SAP takes over and who owns the asset.

## How does a sale run from quote to order?

Help and the developer guide currently call Revenue Cloud Revenue Management, Trailhead calls it Agentforce Revenue Management. Salesforce calls the part between quote and order Transaction Management. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/efficient-sales-with-revenue-cloud/get-started-with-transaction-management), it supports quotes and order capture, "whether it's an initial sale, amendment, or renewal". The path looks like this:

| No. | Step | What happens |
|---|---|---|
| 1 | Quote | Sales creates a quote, picks products from the catalog, configures them and has them priced. Catalog, configurator and pricing procedures are covered in [chapter 2](../product-catalog-configurator-pricing/). |
| 2 | Approval | If the price deviates from the approval matrix, an approval starts. |
| 3 | Quote to the customer | The customer receives the quote, if needed together with a contract from Salesforce Contracts. |
| 4 | Order | Once the quote is accepted, sales creates an order from it. In the [Trailhead unit on orders](https://trailhead.salesforce.com/content/learn/modules/efficient-sales-with-revenue-cloud/create-and-fulfill-orders), the rep sets the quote to Accepted and clicks Create Order. |
| 5 | Activation | On activation the order changes from Draft to Activated and can no longer be edited directly. A flow creates an asset on the customer account for each order line, or first hands the order to orchestration. |
| 6 | Handover to SAP | SAP receives the order and owns delivery, confirmed dates and usually the invoice. |

For architects one point matters most: there is no side entrance. A change in quantity, a renewal or a cancellation is again a quote and again an order. That is more process than editing a field, and it keeps prices, approvals and history consistent.

## What does the quote do in Transaction Management?

Reps work on the quote in the Transaction Line Editor, a table that behaves much like a spreadsheet. According to [Trailhead on working with quotes](https://trailhead.salesforce.com/content/learn/modules/efficient-sales-with-revenue-cloud/work-with-quotes), it offers inline editing, also for several lines at once, filters, search and frozen columns. Bundles are configured from the line's action menu. Hovering over the net unit price shows the price waterfall, every step from list price to final price.

Two points matter for manufacturers with long parts lists. Quote lines can be organised in groups, by hand or automatically by a column such as product category or site. And for Winter '27 Salesforce names up to 15,000 transaction lines per deal in its [release highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management). A spare parts quote for a whole plant fits into one quote.

I would build groups along a structure the customer recognises: one group per line or per plant. Later amendments can then be assigned to the right place, and the customer finds their own equipment in the quote.

## Who approves discounts and margins?

Approvals in Revenue Cloud run on Advanced Approvals. The [developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) describes actions for parallel or sequential approval chains with an audit trail, and Business APIs that show the approval levels before submission. I would use that preview from day one, so nobody submits a quote and then wonders who has it.

I keep the approval matrix short: discount on list price, margin per quote, deal size, non-standard payment terms. Each trigger has exactly one owner for its threshold. A margin approval needs a cost per line from the ERP. Without it, approve on discount and deal size only, rather than on a margin field nobody trusts. Matrix, cost sources and the rebuild from CPQ are covered in [discount approvals in Revenue Cloud](../../../blog/revenue-cloud-discount-approvals/).

```hinweis achtung
One rule holds with agents too: the threshold and the approver come from the workflow. An agent may submit, search and summarise approvals, it does not decide them. Why business rules do not belong in the language model is explained in [Agent Script: deterministic rules](../../../blog/agent-script-deterministic-rules/). If you come from CPQ, plan approvals as a rebuild, because CPQ's Advanced Approvals package does not carry over; more in [chapter 5](../from-cpq-to-revenue-cloud/).
```

## What can the quoting agent do today?

The quoting agent creates, modifies and summarises quotes. According to the [Trailhead quick start](https://trailhead.salesforce.com/content/learn/projects/quick-start-build-an-agent-to-create-quotes-fast/build-your-first-agentforce-quoting-agent), it follows catalog and fulfilment rules, so it quotes only valid products, keeps pricing and discounting within system guardrails and can also quote amendments to assets. The work is done by the Quote Management subagent with actions based on flows. Before the first quote, the setup runs Sync Pricing Data in Salesforce Pricing.

With Winter '27, [generally available since 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), three groups are added: self-service quoting for customer buyers, integrated quoting for partners in their own workspace and drafted renewal quotes for account executives. For manufacturers I see renewals as the most useful part, because maintenance and remote monitoring subscriptions create routine work every year.

What the agent cannot do is see rules that live in SAP variant configuration, in a PLM or in an application engineer's head. For configured machines with such rules I would not use it yet. What must be in place first and where it is the wrong tool is in [Revenue Cloud quoting agent](../../../blog/revenue-cloud-quoting-agent-agentforce/). Cost runs through Flex Credits: the [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) lists $500 per 100,000 credits, and its examples use 20 credits per standard action. How to budget that is in the AI masterclass chapter [costs and tokens](../../ai-salesforce/costs-and-tokens/).

```pro-contra
pro: What the quote agent can do
- Create, change and summarise quotes
- Offer only valid products, keep prices and discounts within the system's guardrails
- Amendments to assets and prepared renewal quotes
contra: What it cannot do
- See rules from SAP variant configuration
- Know rules from a PLM or from an application engineer's head
- Quote configured machines with such rules safely
```

If your dealers work in Manufacturing Cloud, there is a separate agent there, the [AI Partner Sales Assistant](../../../blog/ai-partner-sales-assistant-dealer-quotes/). Two quoting agents on two quote models is a setup I would avoid. Where agents help elsewhere in manufacturing is shown in the chapter [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/). If customers order on their own anyway, the cart belongs in the store; the B2B Commerce masterclass covers that in [prices, cart, checkout](../../b2b-commerce/prices-cart-checkout/).

## Salesforce Contracts or legal's own CLM?

Salesforce Contracts is the contract management of Revenue Cloud. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-contracts-foundations/dive-into-salesforce-contracts-capabilities), contracts are created through APIs directly from opportunities, quotes or orders. On top come a clause library with pre-approved language, editing in Word online through Microsoft 365, DocuSign for the signature, AI for clause generation and entity extraction, and obligations after signature, such as delivery deadlines or notice periods.

The [pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/contracts-pricing/) lists Salesforce Contracts from €50 or $50 per user and month, billed annually, with a note that it requires prerequisite products. According to the [Revenue Cloud pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/), Revenue Cloud Advanced at €200 includes Contracts & Orders, while for Growth Contract Lifecycle Management is available for purchase.

My line: for customer contracts from the sales process on your own paper, Salesforce Contracts is usually enough. If legal manages purchasing, NDAs and group contracts in its own tool, or most contracts arrive as the customer's purchasing terms, that tool stays and Salesforce hands over the signed contract. Also watch for three things called "contract": the contract in Salesforce Contracts, the sales agreement in Manufacturing Cloud and the service contract in Field Service. The boundaries are in [Salesforce Contracts: is the built-in CLM enough?](../../../blog/salesforce-contracts-clm-revenue-cloud/).

## How does the order get to SAP?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders), the activated order reaches Dynamic Revenue Orchestrator (DRO) through a record-triggered flow. DRO does two things. Decomposition breaks the commercial products the customer buys into technical products for downstream systems. Orchestration runs a plan with [five step types](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/explore-order-orchestration): auto task, callout, manual task, milestone and pause, grouped in swimlanes per system and with deadlines per step.

The hand-over to SAP belongs in a callout early in the plan, because production, delivery and invoice depend on it. I would fix three rules: the Salesforce order ID goes along as a reference, so a retry does not create a second SAP order. The SAP order number comes back. And after the hand-over SAP owns delivery, dates and invoice, while Salesforce only shows them. If SAP rejects the order, for example because the ship-to party is missing or the customer has a credit block, the step becomes fallout: it is retried as often as configured and then lands in a queue that someone in order management works through.

```ablauf
sf: Activated order, DRO, Fallout queue
erp: SAP order, Delivery and invoice
Activated order --Flow--> DRO
DRO --Callout--> SAP order
SAP order ..SAP number back..> DRO
DRO ..Rejected..> Fallout queue
SAP order --> Delivery and invoice
```

If the order goes to SAP in one piece and nothing else happens in Salesforce, a plain integration on activation is enough. Details and criteria are in [handing orders to SAP](../../../blog/revenue-cloud-order-orchestration-sap/). Which system owns which step is covered in [Revenue Cloud and SAP: who owns what?](../../../blog/revenue-cloud-sap-quote-to-cash-ownership/), and I support the interface design as part of [Salesforce integration](../../../services/salesforce-integration/).

```hinweis offen
According to the pricing page, DRO is an add-on to Revenue Cloud Advanced with "Freemium access available". What that covers is not stated. Get the scope confirmed in writing before you plan on orchestration.
```

## What happens to the assets after the order?

When the order is activated, the sold products appear as assets on the customer account. According to [Trailhead on amendments](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments), every later change runs through an amendment quote with start quantity, delta and end quantity, then through an order. Each change creates an asset action, and asset state periods record quantity, amount and monthly recurring revenue per time span. [Renewals](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations) run automatically with the asset's renewal term or with an overridden term, and a cancellation sets the end quantity to zero. An SAP interface should therefore never overwrite these quantities.

Field Service uses the same Asset object, there as the machine at the customer site with serial number and assembly hierarchy. Revenue Cloud counts quantities, Field Service needs one record per serial number. For most machine builders I recommend two kinds of assets, the sold one and the physical machine, with a defined link between them. I compare both models and their risks in [assets in Revenue Cloud: amendments and renewals](../../../blog/revenue-cloud-assets-amendments-renewals/). How Field Service models machines, maintenance and parts is in the chapter [assets, maintenance and parts](../../field-service/field-service-assets-maintenance-parts/). Who owns which object belongs in an [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/), before two teams build triggers on Asset against each other.

## A typical scenario, as an assumption: spare parts package and remote monitoring

A maker of packaging lines sells an existing customer two things on one quote: a wear parts package for three lines and a remote monitoring subscription for the same three machines, with a twelve-month term. All details are assumptions.

| Building block | In the scenario |
|---|---|
| Quote | One group per line, each with parts package and subscription. The wear parts come with list prices from SAP, the subscription with a price from Salesforce Pricing. The 18 percent discount is above the 15 percent threshold and goes to the head of sales; the preview shows that before submission. |
| Contract | Salesforce Contracts generates a contract from the quote with standard clauses on data use, signed through DocuSign. |
| Order | DRO breaks the order into an SAP sales order for the parts through a callout and the activation of remote monitoring as an auto task. From there the parts run entirely in SAP. |
| Assets | The subscription is sold per machine as its own line with quantity one and linked to the Field Service machine asset. If a machine is taken out later, an amendment cancels exactly that line. |
| Renewal | Before the term ends, the agent drafts the renewal quote, and sales reviews and sends it. |

The invoice for the subscription can come from SAP or from Revenue Cloud Billing. That decision and recurring billing are covered in [chapter 4](../billing-and-usage-based-pricing/), for example in [maintenance contracts: recurring billing](../../../blog/maintenance-contracts-recurring-billing/).

## What should you decide before the build?

Before a partner builds the first quote layout, I would settle these points in writing:

| Topic | What you clarify |
|---|---|
| Approval matrix | Triggers, thresholds, owners and the source of cost data. |
| Agent | Which quote types it takes on and which stay with the sales desk, and whether dealers quote through Revenue Cloud or Manufacturing Cloud. |
| Contract | Which contracts are created in Salesforce Contracts and which stay with legal. |
| Order | DRO or a plain integration, who works the fallout queue, which checks run before activation. |
| Assets | Counted or tied to a serial number, and who owns the Asset object. |

All chapters are on the [overview page](../). Revenue Cloud carries the path from quote to order well when every change runs through a quote and an order and the hand-over to SAP is fixed up front. If you want to work through these decisions for your company, [send me a message](#contact).
