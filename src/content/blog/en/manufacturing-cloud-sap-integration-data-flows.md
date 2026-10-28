---
title: "Manufacturing Cloud and SAP: which data flows where"
description: "Which data flows between SAP and Manufacturing Cloud, in which direction and how often: actuals, orders, rebate credit memos and ERP login deadlines."
pubDate: 2026-10-28
lang: en
slug: manufacturing-cloud-sap-integration-data-flows
translationKey: manufacturing-cloud-erp-integration
topic: data
categories: [manufacturing-cloud, architecture]
contactBrief: integration
tags: [Manufacturing Cloud, SAP, ERP integration, MuleSoft, sales agreements, rebates]
takeaways:
  - "Into Manufacturing Cloud flow accounts, products, orders or order totals as actuals, and stock; out of it flow approved rebate payouts and warranty credits, which SAP books as credit memos."
  - "The MuleSoft Accelerator for Manufacturing covers account, product and order sync from SAP S/4HANA and rebate credit memos back to SAP; it creates no sales agreements and names no warranty flow."
  - "The Refresh Actuals Calculation action recalculates actuals per sales agreement for the current, past or future periods and has been available since API version 47.0."
  - "Actuals for sales agreements need a daily feed, order status for dealers needs a live call; one frequency for everything wastes either API calls or trust."
  - "From 1 December 2026, ERP interfaces that log in with SOAP login() need the Use Any API Auth permission, and SOAP login() in API versions 31.0 to 64.0 is retired in Summer '27."
faq:
  - q: "Which data has to flow from SAP to Manufacturing Cloud?"
    a: "Accounts with their hierarchy, products, and either orders or order totals per customer, product and period as actuals for sales agreements. Stock is useful as an extra metric next to the shortfall."
  - q: "Which data flows from Manufacturing Cloud back to SAP?"
    a: "Approved rebate payouts, which SAP turns into credit memos, and approved warranty amounts that finance books as credit notes to the dealer. Orders stay owned by SAP."
  - q: "Do I need MuleSoft to connect SAP to Manufacturing Cloud?"
    a: "No. The MuleSoft Accelerator for Manufacturing gives templates for account, product and order sync and for rebate credit memos, and Salesforce lists MuleSoft as an add-on on request. Any middleware that writes to the Salesforce APIs can do the same work."
  - q: "How often should actuals be loaded from SAP?"
    a: "Daily is enough for sales agreements that run over months. Order status that a dealer or an agent asks about should be called live from SAP instead of being copied."
  - q: "Which deadlines affect ERP interfaces to Salesforce?"
    a: "From 1 December 2026, every user who logs in with SOAP login() needs the Use Any API Auth permission. SOAP login() in API versions 31.0 to 64.0 is retired in Summer '27, and SOAP, REST and Bulk API versions 31.0 to 40.0 fail from Summer '28."
draft: false
---

Between SAP and Manufacturing Cloud, master data and actuals flow into Salesforce and money flows back. Accounts, products and orders or order totals come from SAP, daily for actuals and live for order status. Approved rebate payouts and warranty credits go to SAP, where finance books them as credit memos. The MuleSoft Accelerator for Manufacturing covers account, product and order sync with SAP S/4HANA and rebate credit memos, but no sales agreements and no warranty flow. Before anyone builds, write down one leading system per object and check that no interface still logs in with username and password, because SOAP login() gets stricter from 1 December 2026.

## Which data flows between SAP and Manufacturing Cloud?

Manufacturing Cloud only works with data it does not create itself. A sales agreement compares planned volume with actual volume, and at manufacturers the actual volume is created in SAP, where orders are entered, confirmed and shipped. Rebates and warranty work the other way round: Salesforce calculates or approves, and SAP pays.

This is how I would split the flows for a typical manufacturer with SAP as ERP:

| Data | Leading system | Direction | Frequency |
|---|---|---|---|
| Accounts and account hierarchy | SAP | SAP to Salesforce | daily, changes only |
| Products and product hierarchy | SAP | SAP to Salesforce | daily, changes only |
| Orders or order totals as actuals | SAP | SAP to Salesforce | daily |
| Stock as a metric next to the shortfall | SAP | SAP to Salesforce | daily |
| Order status for dealers | SAP | live call, no copy | on request |
| Approved rebate payouts | Salesforce | Salesforce to SAP | on approval |
| Approved warranty amounts | Salesforce | Salesforce to SAP | on approval |
| Payment status of credit memos | SAP | SAP to Salesforce | scheduled |

Prices are a separate question with Winter '27, because Salesforce now offers its own pricing engine for orders. I cover that in [Penny Perfect Pricing: ERP prices in Salesforce?](../penny-perfect-pricing-erp-prices/). The whole chapter, from data flows to rollout, is in the masterclass chapter [ERP, AI and rollout](../../masterclass/manufacturing-cloud/erp-ai-and-rollout/).

## What does the MuleSoft Accelerator for Manufacturing cover?

The [MuleSoft Accelerator for Manufacturing](https://docs.mulesoft.com/manufacturing/latest/) provides prebuilt APIs, implementation templates and a reference architecture. It names three manufacturing use cases: account and product and order sync, sales rebate management and total productive maintenance. Two of them matter for Manufacturing Cloud.

**Account and product and order sync.** According to the [use case page on Exchange](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-manufacturing/minor/1.4/pages/qrc-zzh/Use%20case%201%20-%20Account%20and%20product%20and%20order%20sync/), it extracts account, product and order data from SAP S/4HANA into Manufacturing Cloud, including account and product hierarchies. The sync is one way, SAP is the system of record, and it runs in real time or in batch. Three details are worth reading before you plan with it:

- An order is linked to a sales agreement only if the agreement is active, the customer matches the agreement's account and the product or its primary category matches.
- Only one product catalogue is supported.
- The SAP side needs a communication arrangement for product hierarchies and a custom flag field on the product master.

**Sales rebate management.** According to the [rebate use case](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-manufacturing/minor/1.4/pages/Use%20case%202%20-%20Sales%20rebate%20management/), Manufacturing Cloud is the system of record for rebate payouts. When a payout is approved, an event creates a draft credit memo in SAP. A scheduled job later marks payouts as paid once SAP has paid the credit memo. Sales orders flow from SAP into Manufacturing Cloud. How rebate programmes work on the Salesforce side is in [Rebate Management: dealer rebates without Excel](../rebate-management-dealer-rebates/).

What the accelerator does not cover: it creates no sales agreements, and it names no warranty flow. The approved amount from a warranty claim, which I would book in the ERP as a credit note to the dealer as described in [warranty claims from dealers](../warranty-claims-dealers-salesforce/), needs its own interface.

One contradiction to settle early: in the order sync, customers flow one way with SAP as master. In the rebate use case, customers sync in both directions and either system can be the system of record. Both come from the same accelerator. Pick one rule for customers before you deploy both templates.

Salesforce lists MuleSoft Anypoint Platform on the [Manufacturing Cloud add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) with "Request a quote" and no price. If MuleSoft already runs in your company, the templates save design time. Buying it only for these flows rarely pays off, and any middleware that writes to the Salesforce APIs can do the same work.

## How do actuals get into sales agreements?

Sales agreements take their actuals from orders in Salesforce, from an API upload or from a Data Processing Engine definition. The setting Actuals Calculation Mode decides which one, and every agreement keeps the mode it was created with. I describe the four modes and when each fits in [Sales agreements: spot customers behind on volume](../sales-agreements-volume-shortfall-erp/).

For the interface, one action matters: [Refresh Actuals Calculation](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_refresh_actuals_calculation.htm). It has been available since API version 47.0 for users with the Manufacturing Sales Agreements permission set and recalculates the actuals of one sales agreement. Two flags choose the periods: the current period only, the current and past periods, or the current and future periods. How many future periods count comes from a field on the sales agreement. Setting both flags to true makes the call fail, and the documentation notes that undoing the action needs a database rollback.

That gives the integration a clean pattern. After SAP has delivered late orders or corrections for a closed month, the middleware calls the action for the affected agreements with "current and past periods". Without that step, the agreement shows last month's shortfall until the next regular run, and account managers call customers about volume they have already taken.

## How often does which data need to flow?

Frequency follows the question the data answers. Sales agreements run over months or a year, so a daily feed of actuals is enough. A dealer asking where an order is wants today's answer, so order status should be called live from SAP, as in [Agentforce and SAP: order status through MuleSoft](../agentforce-sap-order-status-mulesoft/). One frequency for everything either wastes API calls or shows stale data where it hurts.

Volume decides between full orders and totals. A typical scenario, as an assumption: 800 accounts with sales agreements, on average 40 products per agreement and monthly periods. Totals per customer, product and month mean at most 800 × 40 = 32,000 values per month, and a daily delta run only sends the values that changed. Replicating every order line as well adds data storage and a linking step per order, which pays off only when sales or service should see the orders themselves in Salesforce.

Stock belongs in the same daily run. A shortfall reads differently when the goods are filling the warehouse than when they are scarce anyway.

## Which login deadlines affect ERP interfaces?

Many ERP interfaces to Salesforce were set up years ago with a technical user and a password. According to the [developer guide to Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release), three steps apply:

1. From 1 December 2026, every user who authenticates with SOAP API login() needs the Use Any API Auth permission. Users without it get an error.
2. In Summer '27, SOAP login() in API versions 31.0 to 64.0 is retired.
3. SOAP, REST and Bulk API versions 31.0 to 40.0 stop getting fixes in Summer '27, and calls to them fail from Summer '28.

Salesforce's advice in the same guide is to "move those integrations to OAuth with external client apps". An actuals feed that fails quietly is worse than one that fails loudly, because sales sees an old shortfall and believes it. How to find every affected interface is described in [Salesforce password integrations end in 2027](../salesforce-password-integrations-end-2027/).

## Who owns which object?

Every row in the table above needs one leading system and one named person, written down before the build. The [object ownership matrix](../salesforce-object-ownership-matrix/) does this for objects inside the org; for an ERP interface I add two columns: direction and frequency.

The questions that come up in almost every design:

- **Account hierarchy.** Does the SAP sold-to party sit on the same level as the account holding the sales agreement? If not, a mapping table is needed, with an owner.
- **Product identity.** Is one sellable variant one product in SAP and in Salesforce? The accelerator links orders to agreements by product or primary category.
- **Corrections.** Who triggers the recalculation of actuals when SAP posts a credit or a return for a past period?
- **Errors.** Who gets the alert when the nightly run fails, and by when must it be fixed?

How I set up interfaces between ERP, middleware and Salesforce is described under [Salesforce integration](../../services/salesforce-integration/).

## Where should you start?

1. **Fill in the table** with your objects, leading system, direction and frequency.
2. **Decide actuals as orders or totals** before the first sales agreement goes live.
3. **Check the accelerator** against your SAP release and your product catalogue structure, and settle the customer master rule.
4. **Plan the money flows back**: rebate payouts and warranty credits, each with a status that returns to Salesforce.
5. **List every interface user** and its login method before 1 December 2026.

Manufacturing Cloud is only as current as the SAP data it receives, so the integration design comes before the feature design. If you are planning this interface and want an independent review, [send me a message](#contact).
