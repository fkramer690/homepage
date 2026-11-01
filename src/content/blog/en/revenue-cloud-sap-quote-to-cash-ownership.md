---
title: "Revenue Cloud and SAP: who owns what in quote to cash?"
description: "Which quote-to-cash steps belong in Revenue Cloud and which in SAP S/4HANA: three cuts, an owner per object and what Revenue Cloud Billing means for finance."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-sap-quote-to-cash-ownership
translationKey: revenue-cloud-sap-system-boundaries
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [revenue cloud, sap s/4hana, quote to cash, integration, billing, manufacturing]
takeaways:
  - "MuleSoft's SAP accelerator creates the SAP order from Salesforce, but documents this only for Sales Cloud and CPQ, not for Revenue Cloud."
  - "There are three sensible cuts: quote only, quote and order, or full quote to cash with Revenue Cloud Billing as a subledger."
  - "Billing brings its own legal entities, accounting periods and general ledger accounts. Finance has to agree before the first invoice."
  - "Write the split down in one table, with an owner per object, the direction of every interface and a person for errors."
faq:
  - q: "Should SAP or Revenue Cloud be the price master?"
    a: "Exactly one of them. If SAP pricing conditions already hold customer prices and discounts, I keep SAP as the master and fetch the net price for the quote through an API. Revenue Cloud pricing pays off when the logic lives in sales anyway, for example for subscriptions and bundles."
  - q: "Does Revenue Cloud replace the SAP sales order?"
    a: "Usually not. Revenue Cloud creates and orchestrates the order in Salesforce, and an integration creates the sales order in SAP for delivery, with the SAP order number written back. The order in SAP stays the basis for delivery and the machine invoice."
  - q: "Can invoices come from Revenue Cloud Billing while SAP stays the general ledger?"
    a: "Yes. Salesforce describes Revenue Cloud Billing as a subledger that powers journal entries and closing periods and syncs billing data to the ERP. Finance then has to agree on legal entities, accounting periods and who closes the period."
  - q: "Is there a Salesforce reference architecture for Revenue Cloud with SAP S/4HANA?"
    a: "I have not found one. The MuleSoft Accelerator for SAP describes quote to cash with SAP S/4HANA for Sales Cloud and Salesforce CPQ. The pattern carries over, but the design for Revenue Cloud is your partner's work and needs a review on your side."
draft: false
---

In quote to cash with Revenue Cloud and SAP S/4HANA, Salesforce should own what sales changes every day: the catalog for selling, the configuration, the quote and its approval. SAP should keep the material master, the sales order for delivery and, for machine sales, the invoice. Revenue Cloud Billing only belongs in the picture when recurring or usage-based revenue is sold and changed in Salesforce, and then Salesforce becomes a subledger that sends journal entries to SAP. Pick one of three cuts, name an owner per object, and get the split signed by sales, finance and IT before a partner starts building.

## Which pattern does Salesforce document for SAP?

The closest official pattern is [use case 3a of the MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/), quote to cash between Salesforce and SAP S/4HANA. It has two variants. In the CPQ variant, the page says "SAP S/4HANA is the system of record pricing conditions." When a sales rep clicks Calculate on the quote, the integration fetches the net price per line from SAP and validates any additional discount against discount thresholds configured in SAP. Creating the order in Salesforce then triggers the order in SAP S/4HANA, and the SAP order number is synced back.

Three details from that page matter for a manufacturer:

- **Products come from a PIM** in the accelerator, with global IDs kept in an MDM system. If your material master lives in SAP, SAP plays that role.
- **Complex pricing is out of scope**, explicitly including SAP Variant Configuration. If your machines are configured in SAP today, the accelerator does not answer that question.
- **Revenue Cloud is not mentioned.** The accelerator covers Sales Cloud and Salesforce CPQ and was published in December 2021.

The pattern still carries over to Revenue Cloud, which Salesforce's Winter '27 documentation also calls Revenue Management and which started as Revenue Lifecycle Management. Revenue Cloud works on standard objects: the [quote data model](https://developer.salesforce.com/docs/platform/data-models/guide/transaction-management-quote.html) and the [order data model](https://developer.salesforce.com/docs/platform/data-models/guide/transaction-mgmt-order.html) list Quote, Quote Line Item, Order, Order Item, Asset, Product2 and Pricebook Entry. So the integration points are the same, but the design is your partner's, and someone on your side should review it.

## Quote only, quote and order, or all the way to the invoice

I see three cuts that work. Each one moves the line between Salesforce and SAP one step further to the right.

| Step | Cut 1: quote only | Cut 2: quote and order | Cut 3: full quote to cash |
|---|---|---|---|
| Catalog for selling, configuration | Revenue Cloud | Revenue Cloud | Revenue Cloud |
| Price | SAP or Revenue Cloud, one master | same | same |
| Quote and approval | Revenue Cloud | Revenue Cloud | Revenue Cloud |
| Order | SAP, created from the accepted quote | Revenue Cloud, handed to SAP | Revenue Cloud, handed to SAP |
| Amendments and renewals | SAP or manual | Revenue Cloud on assets | Revenue Cloud on assets |
| Invoice | SAP | SAP | Revenue Cloud Billing, journals to SAP |

**Cut 1** fits when the order is a one-off machine sale and everything after the signature is logistics. Salesforce hands over an accepted quote, SAP creates the order.

**Cut 2** fits when the same customer keeps buying and changing things: options added later, service packages, subscriptions for remote monitoring. Revenue Cloud then holds the order and the assets, so an amendment starts from what the customer already has. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders), an activated order goes to Dynamic Revenue Orchestrator, which can make a callout to a third-party system. That callout is where SAP gets its order. Details are in [handing orders to SAP with Dynamic Revenue Orchestrator](../revenue-cloud-order-orchestration-sap/).

**Cut 3** adds [Revenue Cloud Billing](https://www.salesforce.com/sales/revenue-cloud-billing/). Salesforce writes that it can "function as a sub-ledger", powering journal entries, closing periods and currency conversions, and that billing data and journal entries can be synchronised to the ERP. That makes sense for recurring revenue sold in Salesforce. For a machine invoice with delivery, customs and down payments, I would leave the invoice in SAP. The trade-offs are in [Revenue Cloud Billing or SAP invoicing](../revenue-cloud-billing-or-sap-invoicing/).

## Who owns which object?

Cutting by process step is not enough. Partners build on objects, so the split has to be written per object as well. This is the same idea as the [object ownership matrix](../salesforce-object-ownership-matrix/), applied to the systems instead of the teams.

| Object | Owner | What crosses the line |
|---|---|---|
| Product2 | SAP or PIM for material number and status; Revenue Cloud for selling attributes and catalog placement | Material number, status, units into Salesforce |
| Pricebook Entry | SAP for list prices | List price per currency, scheduled |
| Customer prices and discounts | One master, SAP conditions or Revenue Cloud pricing | Net price live from SAP, or nothing |
| Quote | Revenue Cloud | Accepted quote to SAP in cut 1 |
| Order | Revenue Cloud in cuts 2 and 3; SAP sales order for delivery | Order to SAP, SAP order number and status back |
| Asset | Revenue Cloud for what was sold and its term | Serial number from SAP or Field Service |
| Invoice | SAP in cuts 1 and 2; Revenue Cloud Billing in cut 3 | Invoice status back, or journal entries to SAP |

The price row causes the most trouble. Two systems that both calculate customer prices will disagree, and the customer will see it when the order confirmation from SAP differs from the quote PDF. Which route fits your conditions is covered in [customer prices: SAP conditions or Salesforce Pricing](../customer-prices-sap-conditions-or-salesforce-pricing/).

## What does Revenue Cloud Billing mean for finance?

It means a second accounting structure. The Revenue Management Developer Guide lists the [billing objects to deploy](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_billing_objects.htm), among them LegalEntity, AccountingPeriod, LegalEntityAccountingPeriod, GeneralLedgerAccount, TaxPolicy and PaymentTerm. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/set-up-billing-basics) explains that legal entities make sure all billing transactions are related to accounting periods and general ledger accounts.

Every one of these records already exists in SAP. So before cut 3, finance has to decide:

1. **Which legal entities invoice from Salesforce**, and which stay in SAP.
2. **How Salesforce accounting periods follow the SAP periods**, and who closes them.
3. **How general ledger accounts map**, and who changes the mapping when the chart of accounts changes.
4. **Which invoice format the customer receives.** From 2027, according to the [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094), only companies with prior-year turnover up to €800,000 may still send domestic business customers a PDF with their consent, and from 2028 the e-invoice requirements apply to everyone. What that means for Revenue Cloud is in [e-invoicing in Germany from 2027](../e-invoicing-germany-2027-revenue-cloud/).

If finance has not been in the room for these four points, cut 3 is not ready.

## Worked example: machines, spare parts and remote monitoring

A machine builder with SAP S/4HANA sells 40 base machines with options, spare parts and a remote monitoring subscription per machine. Customer prices for spare parts are SAP conditions maintained for years. Machine prices follow list prices plus option surcharges.

I would choose cut 2. Revenue Cloud holds catalog, configuration and quote for machines and subscriptions. Machine prices are calculated in Revenue Cloud on list prices synced from SAP. Spare parts on the same quote get their net price from SAP through an API, because nobody should rebuild those conditions. The activated order goes to SAP with a callout, and the SAP order number comes back. The subscription stays an asset in Salesforce, so renewals and amendments start there. The invoice for machine and subscription comes from SAP in year one. Billing in Salesforce becomes a question only if subscriptions grow into a business of their own.

```ablauf
sf: Quote, Order, Subscription asset
erp: SAP list prices, SAP conditions, SAP order, SAP invoice
SAP list prices --sync--> Quote
SAP conditions --net price via API--> Quote
Quote --> Order
Order --callout--> SAP order
SAP order ..order number..> Order
Order --> Subscription asset
SAP order --> SAP invoice
```

What the sales desk then needs on top, live order status from SAP for example, follows the pattern in [Agentforce and SAP: order status through MuleSoft](../agentforce-sap-order-status-mulesoft/).

## One table with an owner per object

On one page, in a form that a new partner understands in ten minutes:

- **Per process step:** which system leads, from catalog to cash receipt.
- **Per object:** owner, as in the table above, plus a named person.
- **Per interface:** direction, trigger, live or scheduled, and what happens when SAP does not answer.
- **Per error:** who fixes an order that SAP rejects. Order fallout without an owner ends up with the sales rep, who cannot fix it.
- **Sign-off:** heads of sales and finance and the IT lead, recorded in the decision log.

Designing these interfaces is a large part of my work on [Salesforce integration](../../services/salesforce-integration/). The wider decision of whether Revenue Cloud fits at all is in the masterclass chapter [Revenue Cloud overview and decision](../../masterclass/revenue-cloud/revenue-cloud-overview/).

## Settle the unclear rows with finance

List your quote-to-cash steps in one column and write SAP or Salesforce next to each, as things work today. Then mark the three rows where the answer is unclear: in most companies that is the price, the order and the invoice. Settle those three with finance before you ask partners for estimates, because each answer changes the scope by weeks.
