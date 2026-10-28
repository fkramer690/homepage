---
title: "Maintenance contracts: recurring billing in Revenue Cloud"
description: "How a machine builder sells maintenance contracts as subscriptions in Revenue Cloud, bills them quarterly and hands the service side to Field Service."
pubDate: 2026-10-28
lang: en
slug: maintenance-contracts-recurring-billing
translationKey: service-contracts-recurring-billing
topic: revenue
categories: [revenue-cloud, field-service]
tags: [Revenue Cloud, maintenance contracts, recurring billing, Field Service, subscriptions, manufacturing]
takeaways:
  - "In Revenue Cloud a maintenance contract is a subscription on a quote; order activation creates an asset with state periods and billing schedules, from which invoice schedulers create invoices."
  - "Every change to the contract, whether an upsell, a renewal or a cancellation, runs through a quote and an order, so billing and the asset history stay in step."
  - "Field Service knows nothing about Revenue Cloud subscriptions; service contract, maintenance plan and entitlement deliver the visits and must be created from the sold contract."
  - "The Revenue Cloud asset should answer what was sold and for how much; the service contract answers which machines get which service level."
  - "If machines and spare parts are invoiced in SAP and maintenance is a small share, quoting in Revenue Cloud with invoicing in SAP can be the better split."
faq:
  - q: "How does Revenue Cloud bill a maintenance contract every quarter?"
    a: "The contract is sold as a subscription product. When the order is activated, billing schedules are created per order item according to the product's billing policy and treatment, for example in advance. An invoice scheduler then picks up schedules that are ready for invoicing and creates the invoices."
  - q: "What happens in Revenue Cloud when a customer adds machines to a running contract?"
    a: "You amend the asset. Revenue Cloud creates an amendment quote with the start quantity, the change and the end quantity, then an order. Activating it creates a new asset state period and new billing schedules linked to the original ones."
  - q: "Does Revenue Cloud create the Field Service service contract?"
    a: "I found no documented standard link between a Revenue Cloud subscription and the Field Service service contract. Plan it as your own automation, usually a flow on order activation that creates or updates the service contract, its line items and the entitlement."
  - q: "Should maintenance invoices come from Revenue Cloud Billing or SAP?"
    a: "Revenue Cloud Billing fits when maintenance contracts are sold and changed often in Salesforce and form a large share of revenue. If SAP invoices machines and parts and maintenance is a small add-on, keeping the invoice in SAP avoids a second billing system."
draft: false
---

In Revenue Cloud a maintenance contract is sold as a subscription on a quote. When the order is activated, Revenue Cloud creates an asset with asset state periods and billing schedules, and an invoice scheduler turns those into invoices, for example quarterly in advance. Every upsell, renewal or cancellation runs through a new quote and order. Field Service does not read any of this. Service contract, maintenance plan and entitlement deliver the visits, and you have to create them from the sold contract yourself. My rule: the Revenue Cloud asset answers what was sold and for how much, the service contract answers which machine gets which service level.

## How does a maintenance contract become recurring revenue in Revenue Cloud?

The maintenance contract is a product with a subscription selling model. According to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_productsellingmodel.htm), a product selling model defines how a product is sold: one-time, evergreen subscription or term-defined subscription, including the term. A maintenance contract over three years with annual renewal is a term-defined subscription.

Sales puts it on a quote like any other product. Once the quote becomes an order and the order is activated, two standard flows run, according to the [Trailhead unit on billing schedules](https://trailhead.salesforce.com/de/content/learn/modules/billing-management-with-revenue-cloud/generate-billing-schedules): Order to Asset and Order to Billing Schedule. The customer then has an asset for the contract, and Billing has a billing schedule group with one billing schedule per order item.

The name question comes up in every project, so once: Salesforce sells the product as Revenue Cloud, Trailhead calls it Agentforce Revenue Management and the developer guide Revenue Management. It is the same product.

## How do billing schedules turn into invoices?

Three records decide how an order item is billed. The [Trailhead unit on billing policies](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/create-billing-policies-and-treatments) describes them:

| Record | What it decides |
|---|---|
| Billing policy | Which billing treatment applies to an order product, by legal entity, default or manually |
| Billing treatment | The rules for billing, including exclusion from billing |
| Billing treatment item | How the amount is spread: in advance, in arrears or by milestone |

For maintenance contracts, billing in advance is the usual choice. Exclusion from billing is useful for goodwill contracts or warranty extensions that are sold at zero.

Invoices come from invoice schedulers. According to the [Trailhead unit on invoices](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/generate-invoices), a scheduler has a start and end date, a run frequency, a posting option and a billing batch, and it picks up schedules marked "Ready for Invoicing". Large runs use the Data Processing Engine. Tax comes from an external tax engine through tax policies and treatments. Legal entities separate tax and accounting periods per company, which matters for a manufacturer with sales companies in several countries.

One point for German customers: from 1 January 2027, companies with more than €800,000 prior-year turnover must issue e-invoices for domestic B2B, from 2028 all companies, according to the [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094). A quarterly maintenance invoice is such an invoice. What that means for Revenue Cloud is in the article on [e-invoicing from 2027](../e-invoicing-germany-2027-revenue-cloud/).

## What happens on upsells, renewals and cancellations?

Every change to the contract is a quote, then an order. The [Trailhead unit on amendments](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) shows the fields: the start quantity, the change as a positive or negative number, and the end quantity. After activation a new asset state period holds the new quantity, and an asset action records the change, for example with the business category "Upsells". Billing creates new billing schedules linked to the original ones, which leaves an audit trail.

For renewals there are two options according to the [unit on renewals and cancellations](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations): automatic renewal with the asset's renewal term, or an overridden term with your own start and end dates. A renewal creates a new state period. A cancellation sets the quantity to the negative of the total, so the end quantity is zero, and creates no new state period. Negative invoice lines can become credit memo lines if that setting is active.

The practical consequence: a service manager who adds a machine to the contract on a call has not changed anything Billing sees. The change only counts once it runs through an amendment quote.

## What does Field Service need from the contract?

Field Service works with its own objects. As I describe in [modelling maintenance contracts in Field Service](../salesforce-field-service-maintenance-contracts/), the service contract records what was sold, contract line items name the covered assets, the maintenance plan generates the planned visits and the entitlement holds the committed response time.

Both clouds use the Asset object, but for different things. The Revenue Cloud asset is the sold subscription with quantity, price and term. The Field Service asset is the physical machine with serial number, location and history. I would keep them as separate records and not try to make the machine asset carry the subscription. How the two asset views meet is covered in [assets, amendments and renewals](../revenue-cloud-assets-amendments-renewals/).

I found no documented standard link between a Revenue Cloud subscription and the Field Service service contract. So plan it as your own automation: on order activation, a flow creates or updates the service contract, adds the covered machines as contract line items and assigns the entitlement for the sold service level. Amendments and cancellations go the same way. The Field Service side of this, including maintenance plans by calendar or operating hours, is in the [chapter on assets and maintenance](../../masterclass/field-service/field-service-assets-maintenance-parts/).

## Which record answers "what was sold"?

One record has to be the master for the commercial contract, otherwise sales, service and finance argue over three versions. My split:

- **Revenue Cloud asset:** what was sold, quantity, price, term, renewal. Changed only through quotes.
- **Service contract in Field Service:** which machines are covered and which service level applies. Created and updated from the Revenue Cloud asset, never edited by hand for commercial changes.
- **Machine asset:** serial number, location, installed base. Owned by service and usually fed from the ERP.

Write this down per object, as in an [object ownership matrix](../salesforce-object-ownership-matrix/). The point that fails most often is the third case: a machine is replaced under contract, service swaps the asset on the contract line item, and nobody checks whether the price changes.

## A typical scenario, as an assumption

A machine builder has 800 machines under maintenance contracts at 150 customers, in three levels: an annual inspection, the same plus a 24-hour response, and a premium level with an 8-hour response. Contracts run for three years and are billed quarterly in advance.

In Revenue Cloud each level is a subscription product with its own price, the number of machines is the quantity. Order activation creates the asset and billing schedules; an invoice scheduler runs at the start of each quarter and posts 150 invoices. A flow creates the Field Service service contract with the machines as line items and the entitlement for the level. If a customer adds five machines in the middle of a quarter, an amendment quote with that amendment date adds them, the order creates new billing schedules and the flow adds five line items.

For the Billing Events: if the contracts add up to $2.4 million a year, the invoices consume 48,000 events at one event per $50 of subtotal, according to the [rate sheet of February 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf). The price per event is not public.

## When should the invoice stay in SAP?

Revenue Cloud Billing pays off when maintenance and service contracts are sold and changed often in Salesforce and make up a real share of revenue. If SAP invoices machines and spare parts and maintenance is a small add-on, I would keep the invoice in SAP and use Revenue Cloud for quote, order and asset. The trade-offs are in [Revenue Cloud Billing or SAP](../revenue-cloud-billing-or-sap-invoicing/). Usage-based contracts follow the same logic and are covered in [pay-per-use for machines](../pay-per-use-machines-revenue-cloud/). The chapter on [billing and usage-based pricing](../../masterclass/revenue-cloud/billing-and-usage-based-pricing/) brings these articles together.

Recurring billing of maintenance contracts works in Revenue Cloud when every commercial change runs through a quote and Field Service receives its contract from there. If you are setting up this split between sales, service and finance, [send me a message](#contact).
