---
title: "Sales Agreements: Spot Customers Behind on Volume"
description: "How manufacturers use Salesforce sales agreements and ERP data to see which customers are behind on committed volume, and why inventory belongs next to it."
pubDate: 2026-10-26
lang: en
slug: sales-agreements-volume-shortfall-erp
translationKey: manufacturing-cloud-sales-agreements-actuals
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Sales Agreements, ERP, Integration, Manufacturing]
series: { id: manufacturing-cloud, part: 3 }
takeaways:
  - "Every sales agreement takes over the Actuals Calculation Mode when it is created. A later change only applies to new agreements."
  - "For international customers with many entities, the account level of the sales agreement is a separate decision every time."
  - "Inventory belongs next to the shortfall as a metric. Only both together show which open volumes can realistically still be delivered."
  - "Salesforce shows the gap. How it is closed is negotiated between people, depending on the season and the size of the shortfall."
faq:
  - q: "Where do actual quantities in a sales agreement come from?"
    a: "From orders in Salesforce that are linked to the sales agreement directly or through contracts, from an API upload, or from your own Data Processing Engine definition. If orders live in the ERP, the orders or their totals have to reach Salesforce through an integration."
  - q: "How often are actuals updated?"
    a: "According to Salesforce Help, a daily automated run calculates the actuals. For an activated sales agreement, a user can also trigger the calculation by hand."
  - q: "Can I show inventory in a sales agreement?"
    a: "Yes, as a custom metric. According to Trailhead you create number fields on Sales Agreement Product and Sales Agreement Product Schedule and map them in Field Mappings for Custom Metrics. The values themselves have to come from an integration, for example from the ERP."
  - q: "Do I have to move every ERP order to Salesforce?"
    a: "No. For plan versus actuals, totals per customer, product and period loaded through the API are enough. Full orders are worth it when sales or service should see them in Salesforce anyway."
draft: false
---

With sales agreements, sales can see which customers are behind on their committed volume, but only when actual quantities arrive reliably from the ERP in Salesforce per customer, product and period. That was the central question in a global Manufacturing Cloud rollout I worked on: which customers have not yet taken their agreed volume, and how can the open volume still be realised, given current warehouse capacity? Three decisions determine whether this works: how actuals are calculated, which level of the account hierarchy the sales agreement sits on, and whether inventory sits next to it.

## What question does a sales agreement answer day to day?

What a sales agreement is and when Manufacturing Cloud pays off for it, I cover in [Salesforce Manufacturing Cloud: is it worth it?](../salesforce-manufacturing-cloud-is-it-worth-it/). This article is about running it afterwards.

Day to day, sales asks a simple question: who is behind on their commitment? A customer has committed to a volume for the year, split into months or quarters. For each period and product, the sales agreement shows planned quantity, actual quantity and forecast side by side. The gap is the number account managers work with.

That number depends on the actuals behind it. Sales maintains planned quantities when the deal is signed. At manufacturers, actuals are almost always created elsewhere, in the ERP, where orders are entered, confirmed and shipped. So the question about committed volume is first a question about the integration.

## Where do actuals come from when orders live in the ERP?

According to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=sa_admin_actualscalc_task.htm&language=en_us), there are four options, chosen with the Actuals Calculation Mode setting:

| Mode | Where actuals come from | Fits when |
|---|---|---|
| Automatically from direct orders | Active orders in Salesforce linked to the sales agreement | orders without contracts live in Salesforce |
| Automatically from orders through contracts | Active orders linked to the sales agreement through contracts | orders run through contracts |
| Manually using API upload | Quantities an integration uploads at regular intervals | orders and contracts live in an external system |
| Data Processing Engine | A customised calculation, for example from orders or custom objects | the standard logic is not enough |

According to [Salesforce Help on actuals](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_actuals_parent.htm&language=en_US&type=5), a daily run calculates the values, and for an activated sales agreement the calculation can also be triggered by hand. If you expect a list of customers behind on volume every morning, you get the state of the last run. For volumes committed over months, that is usually enough.

One detail from the help has consequences for planning:

```hinweis achtung
Every sales agreement takes over the mode when it is created. If the admin changes the default later, it only applies to new agreements.
```

Start with one mode and switch after a year, and you have two kinds of agreements in the org. So I fix the mode before the first production sales agreement is created and write the decision into the decision log.

When orders live in the ERP, there are two architectures:

- **Replicate orders to Salesforce.** Orders arrive in Salesforce as order records and are linked to the sales agreement. Upside: sales and service see the orders themselves, not just totals. Downside: more data volume, and the integration or an automation has to link each order to the right agreement.
- **Load totals through the API.** The ERP or the middleware calculates quantities per customer, product and period and loads only those values. Upside: lean, and the ERP stays the only place where orders are counted. Downside: anyone who wants to know which orders sit behind a number has to look in the ERP.

```ablauf
sf: Order records, Sales agreement
erp: ERP orders
ext: Middleware
ERP orders --replication--> Order records
Order records --linked--> Sales agreement
ERP orders --> Middleware
Middleware --totals via API--> Sales agreement
```

Which one fits depends on what else Salesforce needs to know about orders. The basic rule is the same as for any integration: one leading system per type of data. How I split that for customers, products, prices and orders is described under [integration with ERP, middleware and telephony](../../services/salesforce-integration/). Which data flows between SAP and Manufacturing Cloud overall is in [Manufacturing Cloud and SAP: which data flows where](../manufacturing-cloud-sap-integration-data-flows/).

## What I saw in a project

```praxis
At a global manufacturer I worked on a worldwide Manufacturing Cloud rollout. The main reason for the licence was sales agreements. Sales needed to see which customers had not yet taken their agreed volume, and to plan how the open volume could still be realised. Both orders and inventory levels came from the ERP.
```

Altitude, inventory and the negotiation turned out to be harder than the feature suggests.

Altitude first. A sales agreement belongs to one account. For an international customer with a large account hierarchy, meaning group, national subsidiaries and plants, the question is which level the commitment applies to. That is not always easy and depends on the customer. More on this in the next section.

Then inventory. A gap on its own does not say what to do. Whether a shortfall is a problem depends on whether the goods are sitting in the warehouse and need the space, or whether they are scarce anyway.

And finally the negotiation. How open volume gets realised is negotiated between people, individually for each customer. It depends on the season and on how large the gap is. Salesforce provides the basis for that conversation and does not replace it.

## Which level of the account hierarchy should a sales agreement sit on?

The answer depends on who made the commitment and where the orders come in. Three typical situations:

- **Commitment and orders on the same level.** A national subsidiary negotiates its own volume and orders itself. Then the sales agreement belongs to that account, and matching actuals is simple.
- **Commitment at group level, orders from the plants.** Group procurement negotiates a total volume, and several entities place orders. Then the integration has to combine orders from several sold-to parties in the ERP into one agreement, or there is one agreement per entity with a total above them.
- **Mixed.** Some products are negotiated centrally, others locally. With large customers this happens more often than you hope during design.

The second situation is often decided by the customer number in the ERP. If it holds the ordering entity but not the group, the integration needs a mapping table that someone maintains. Without it, actuals land on the wrong agreement, and the report shows a shortfall that does not exist. Maintaining that mapping is a process with an owner, not a one-off data migration.

So I settle the level per customer, not once for everyone. For the large customers with framework agreements that is a list of manageable length, and every line on it saves an argument about wrong numbers later.

## Inventory belongs next to the shortfall

A list of customers behind on volume is a good start. Sales can only act once it knows whether the open volume can be delivered and whether it is filling up the warehouse.

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better), inventory can be carried in the sales agreement as a custom metric. You create number fields on Sales Agreement Product and Sales Agreement Product Schedule and map them in Field Mappings for Custom Metrics. The values come from an external system, and how they get in is again a job for the integration.

Two examples of how the same gap reads differently:

- **Shortfall with a full warehouse.** The goods are produced, the customer is not calling them off, and the space is needed for other products. This is the conversation to have first.
- **Shortfall with tight stock.** The goods are scarce anyway. A customer who calls off less is actually helping, and pulling an order forward would hit other customers.

Then there is the season. A shortfall in the first quarter can be normal in a seasonal business and even out by summer. A good view therefore shows gap, inventory and period together, so nobody calls a customer in February who would order in June anyway.

## The negotiation stays with people

Salesforce can sort customers by shortfall, put inventory and season next to it and create a task for the account manager. Whether a customer gets a price concession, pulls an order forward or has the commitment adjusted next year is decided by people who know the customer.

I would not want to automate that step either. The reasons for a shortfall range from a weak season at the customer to a competitor who is cheaper right now, and no metric in the system knows them. If you want to put agents on this kind of data, check data quality first, as I describe in [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

## First step: decide the mode for actuals

Before the first sales agreement goes live, settle these points:

1. **Mode for actuals.** Orders in Salesforce or totals through the API, decided before the first agreement.
2. **Level per customer.** For every large customer with a framework agreement: which account holds the commitment, and which sold-to parties in the ERP belong to it?
3. **Inventory as a metric.** Which system provides it, how often and at what level?
4. **The view for sales.** Which list does an account manager see on Monday morning, and what do they do with it?

I decide the mode with the ERP team before the first agreement is created, because a later change only applies to new agreements. Then I build the Monday morning list with two account managers.
