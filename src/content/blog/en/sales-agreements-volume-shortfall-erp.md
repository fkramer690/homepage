---
title: "Sales Agreements: Spot Customers Behind on Volume"
description: "How manufacturers use Salesforce sales agreements and ERP data to see which customers are behind on committed volume, and why inventory belongs next to it."
pubDate: 2026-10-26
updatedDate: 2026-11-09
lang: en
slug: sales-agreements-volume-shortfall-erp
translationKey: manufacturing-cloud-sales-agreements-actuals
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Sales Agreements, ERP, Integration, Manufacturing]
series: { id: manufacturing-cloud, part: 3 }
takeaways:
  - "Every sales agreement inherits the default Actuals Calculation Mode when it is created. Switching an existing agreement later deletes its calculated actuals."
  - "For international customers with many entities, the account level of the sales agreement is a separate decision every time."
  - "Inventory belongs next to the shortfall as a metric. Only the two together show which open volumes can realistically still be delivered."
  - "Salesforce shows the gap. How it is closed is negotiated between people, depending on the season and the size of the shortfall."
faq:
  - q: "Where do actual quantities in a sales agreement come from?"
    a: "From orders in Salesforce that are linked to the sales agreement directly or through contracts, from an API upload, or from your own Data Processing Engine definition. If orders are held in the ERP, the orders or their totals have to reach Salesforce through an integration."
  - q: "How often are actuals updated?"
    a: "According to Salesforce Help, a daily automated run calculates the actuals. For an activated sales agreement, a user can also trigger the calculation by hand."
  - q: "Can I show inventory in a sales agreement?"
    a: "Yes, as a custom metric. According to Trailhead, you create number fields on Sales Agreement Product and Sales Agreement Product Schedule and map them in Field Mappings for Custom Metrics. The values themselves have to be supplied by an integration, for example from the ERP."
  - q: "Do I have to move every ERP order to Salesforce?"
    a: "No. For plan versus actuals, totals per customer, product and period loaded through the API are enough. Loading full orders is worthwhile when sales or service should see them in Salesforce anyway."
draft: false
---

With sales agreements, sales can see which customers are behind on their committed volume, but only if actual quantities are transferred reliably from the ERP to Salesforce by customer, product and period. That was the central question in a global Manufacturing Cloud rollout I worked on: which customers have not yet ordered their agreed volume, and how can the remaining volume still be delivered, given current warehouse capacity? Three decisions determine whether this works: how actuals are calculated, which level of the account hierarchy the sales agreement is placed on, and whether inventory is shown next to it.

## What question does a sales agreement answer day to day?

I cover what a sales agreement is and when Manufacturing Cloud pays off for it in [Salesforce Manufacturing Cloud: is it worth it?](/en/blog/salesforce-manufacturing-cloud-is-it-worth-it/). This article is about operating it afterwards.

Day to day, sales asks a simple question: who is behind on their commitment? A customer has committed to a volume for the year, split into months or quarters. For each period and product, the sales agreement shows planned quantity, actual quantity and forecast side by side. The gap is the number account managers work with.

That number depends on the actuals behind it. Sales maintains planned quantities when the deal is signed. At manufacturers, actuals are almost always created elsewhere, in the ERP, where orders are entered and confirmed and shipments are recorded. So answering the committed volume question starts with integration.

## Where do actuals come from when orders live in the ERP?

According to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=sa_admin_actualscalc_task.htm&language=en_us), there are four options, chosen with the Actuals Calculation Mode setting:

| Mode | Where actuals come from | Fits when |
|---|---|---|
| Automatically from direct orders | Active orders in Salesforce linked to the sales agreement | orders without contracts live in Salesforce |
| Automatically from orders through contracts | Active orders linked to the sales agreement through contracts | orders run through contracts |
| Manually using API upload | Quantities an integration uploads at regular intervals | orders and contracts live in an external system |
| Data Processing Engine | A customized calculation, for example from orders or custom objects | the standard logic is not enough |

According to [Salesforce Help on actuals](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_actuals_parent.htm&language=en_US&type=5), a daily run calculates the values, and for an activated sales agreement the calculation can also be triggered by hand. If you expect a list of customers behind on volume every morning, you see the state of the last run. For commitments measured over months, that is usually enough.

One detail from the help has consequences for planning:

```hinweis achtung
Every sales agreement inherits the default mode when it is created. If the admin changes the default later, it only applies to new agreements. A user with edit access to the field can switch a single agreement. For an activated agreement, the user also needs permission to override status validations. Switching removes the actuals calculated so far, and they have to be recalculated. Expired agreements cannot be switched.
```

Start with one mode and change the default after a year, and you either have two kinds of agreements in the org or must switch the existing ones one by one and recalculate their actuals. So I fix the default before the first production sales agreement is created and write the decision into the decision log.

When orders are held in the ERP, there are two architectures:

- **Replicate orders to Salesforce.** Orders arrive in Salesforce as order records and are linked to the sales agreement. Upside: sales and service see the orders themselves, not just totals. Downside: higher data volume, and the integration or an automation has to link each order to the right agreement.
- **Load totals through the API.** The ERP or the middleware calculates quantities per customer, product and period and loads only those values. Upside: lean, and the ERP stays the only place where orders are counted. Downside: anyone who wants to know which orders make up a number has to look in the ERP.

```ablauf
sf: Order records, Sales agreement
erp: ERP orders
ext: Middleware
ERP orders --replication--> Order records
Order records --linked--> Sales agreement
ERP orders --> Middleware
Middleware --totals via API--> Sales agreement
```

Which one fits depends on what else Salesforce needs to know about orders. The basic rule is the same as for any integration: one leading system per type of data. How I split that for customers, products, prices and orders is described under [integration with ERP, middleware and telephony](/en/services/salesforce-integration/). The data flows between SAP and Manufacturing Cloud overall are covered in [Manufacturing Cloud and SAP: which data flows where](/en/blog/manufacturing-cloud-sap-integration-data-flows/).

## What I saw in a project

```praxis
At a global manufacturer I worked on a worldwide Manufacturing Cloud rollout. The main reason for using the license was sales agreements. Sales needed to see which customers had not yet ordered their agreed volume, and to plan how the remaining volume could still be delivered. Both orders and inventory levels originated in the ERP.
```

Account level, inventory and the negotiation process turned out to be harder than the feature suggests.

Start with the account level. A sales agreement belongs to one account. For an international customer with a large account hierarchy, meaning a group level, national subsidiaries and plants, the question is which level the commitment applies to. That is not always easy and depends on the customer. More on this in the next section.

Then there is inventory. A gap on its own does not tell sales what to do. Whether a shortfall is a problem depends on whether the goods are sitting in the warehouse and taking up space that is needed for other products, or whether they are scarce anyway.

Finally, there is the negotiation. How the remaining volume is handled is negotiated between people, individually for each customer. It depends on the season and on how large the gap is. Salesforce provides the basis for that conversation and does not replace it.

## Which level of the account hierarchy should a sales agreement sit on?

The answer depends on who made the commitment and where the orders are placed. Three typical situations:

- **Commitment and orders on the same level.** A national subsidiary negotiates its own volume and places its own orders. Then the sales agreement belongs to that account, and matching actuals is simple.
- **Commitment at group level, orders from the plants.** Group procurement negotiates a total volume, and several entities place orders. Then the integration has to combine orders from several sold-to parties in the ERP into one agreement, or there is one agreement per entity with an overall total above them.
- **Mixed.** Some products are negotiated centrally, others locally. With large customers, this happens more often than expected during design.

The second situation is often decided by the customer number in the ERP. If it identifies the ordering entity but not the group, the integration needs a mapping table that someone maintains. Without it, actuals are assigned to the wrong agreement, and the report shows a shortfall that does not exist. Maintaining that mapping is a process with an owner, not a one-off data migration.

So I decide the level separately for each customer, rather than once for all customers. To keep that maintainable, I first define a few standard patterns, such as global agreement with global actuals, global agreement with local orders, national agreement and plant-level agreement, and assign each large customer to one of them. For the large customers with framework agreements, that list is manageable, and every line on it prevents a later argument about incorrect numbers.

## Inventory belongs next to the shortfall

A list of customers behind on volume is a good start. Sales can only act once it knows whether the remaining volume can be delivered and whether the related inventory is filling up the warehouse.

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better), inventory can be included in the sales agreement as a custom metric. You create number fields on Sales Agreement Product and Sales Agreement Product Schedule and map them in Field Mappings for Custom Metrics. The values are supplied by an external system, and how they are loaded is again a job for the integration. Before that, decide which figure you mean: total stock, stock available to promise, stock already allocated to other customers or free warehouse capacity. If you put total stock next to every customer's agreement, the same pallets appear to be available to all of them.

Two examples of how the same gap can be interpreted differently:

- **Shortfall with a full warehouse.** The goods are produced, the customer is not calling them off, and the space is needed for other products. This is the conversation to have first.
- **Shortfall with tight stock.** The goods are scarce anyway. In the short term, a lower call-off can ease delivery pressure, but the revenue and the customer's commitment are still open, and bringing an order forward would affect other customers.

Seasonality is another factor. A shortfall in the first quarter can be normal in a seasonal business and even out by summer. A good view therefore shows gap, inventory and period together, so sales does not call a customer in February if that customer would order in June anyway.

## The negotiation stays with people

Salesforce can sort customers by shortfall, show inventory and seasonality alongside it and create a task for the account manager. Whether a customer receives a price concession, brings an order forward or has its commitment adjusted next year is decided by people who know the customer.

I would not want to automate that step either. The reasons for a shortfall range from a weak season for the customer to a competitor currently offering lower prices, and no metric in the system captures those reasons. If you want agents to work with this kind of data, check data quality first, as I describe in [Agentforce: business value and data quality first](/en/blog/agentforce-business-value-data-quality-first/).

## Decide the actuals mode before the first agreement

Before the first sales agreement goes live, settle these points:

1. **Default mode for actuals.** Orders in Salesforce or totals through the API, decided before the first agreement.
2. **Level per customer.** For every large customer with a framework agreement: which account holds the commitment, and which sold-to parties in the ERP belong to it?
3. **Inventory as a metric.** Which system provides it, how often and at what level?
4. **The view for sales.** Which list does an account manager see on Monday morning, and what do they do with it?

I decide the default mode with the ERP team before the first agreement is created, because a later change only applies to new agreements, and switching existing ones costs their calculated actuals. Then I design the Monday morning list together with two account managers.
