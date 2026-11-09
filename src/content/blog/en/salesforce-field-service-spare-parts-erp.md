---
title: "Salesforce Field Service Spare Parts: ERP or Salesforce?"
description: "Who should own spare parts stock in the service van, the ERP or Salesforce Field Service? Split of tasks, data flows and where the problems really come from."
pubDate: 2026-10-27
lang: en
slug: salesforce-field-service-spare-parts-erp
translationKey: field-service-spare-parts
topic: field-service
categories: [field-service]
series: { id: field-service, part: 4 }
tags: [Field Service, Spare parts, ERP, Integration, Manufacturing]
takeaways:
  - "Field Service needs a copy of the stock so dispatchers and technicians see which part is where. The app's Inventory tab does not work offline."
  - "The technician books consumed parts on the work order. Field Service lowers the van stock, and the interface reports consumption to the ERP."
  - "In my projects, problems came from data maintenance, not from the ERP leading. That is where the focus belongs before go-live."
  - "Required parts on the work order document the need. Checking them against van stock is a process of its own, not a default of the engine."
faq:
  - q: "Should Salesforce Field Service or the ERP own spare parts stock?"
    a: "In my projects, always the ERP. It values the stock, runs purchasing and transfers and is connected to accounting. In some companies a warehouse or service logistics system plays that role. Field Service holds a copy for dispatchers and technicians and reports consumption back."
  - q: "How does Field Service represent the stock in a service van?"
    a: "The van is a mobile location. The stock per part is a product item with the quantity at that location. When the technician records consumption on the work order, the quantity goes down automatically."
  - q: "What is the difference between products required and products consumed?"
    a: "Products required document the parts a work order needs and help with preparation. They do not reserve stock. Products consumed are the parts actually used, and they reduce the stock."
  - q: "Which data flows between the ERP and Field Service?"
    a: "From the ERP to Salesforce: material master and stock per location. From Salesforce to the ERP: consumption from work orders and part requests from technicians, which become transfers or purchase orders there."
draft: false
---

In my projects, the ERP always owned spare parts stock in field service, including the stock in the service van, and there were relatively few problems with that. That is also my recommendation, with one caveat: in some companies a warehouse or service logistics system leads instead of the ERP. What matters is that one system leads. Salesforce Field Service still needs a copy of the stock, so dispatchers and technicians can see which part is where, and it reports back which parts were used. Where problems came up, the split of tasks was not the cause. Data maintenance quality was.

This article is part 4 of the series. In [part 2](../salesforce-field-service-master-data/), missing spare parts were one of the reasons for failed visits. In [part 3](../salesforce-field-service-scheduling-automation/), "part not in the van" was a typical reason for a dispatcher to change the scheduling proposal. This part is about how spare parts come together in Field Service and the ERP.

## Why the ERP should own the stock

In the ERP, a spare part is more than a quantity at a place. It has a value on the balance sheet, a purchasing process, minimum stock levels, suppliers and transfers between warehouses. Every withdrawal is a posting that reaches accounting. The ERP is built for this, and the processes there have usually run for years.

Field Service can hold quantities per location and log movements. It does not do valuation, purchasing or accounting, and it should not. Whoever wants to run stock in Salesforce rebuilds part of the ERP and has to reconcile both worlds forever. I have not seen a client do that, and I would not advise anyone to.

## What does Field Service need to know about spare parts?

Field Service needs parts for two reasons: to prepare a visit and to document it afterwards. [Salesforce Help](https://help.salesforce.com/s/articleView?id=fs_manage_inventory.htm&language=en_US&type=5) describes a whole set of inventory objects. For the start, three are enough:

- **Stock per van.** The van is a mobile location, the stock of one part there is a product item, such as "twelve seals in technician A's van".
- **Required parts on the work order.** They tell the back office before the visit what has to go into the van. They document the need; they do not reserve stock, and the scheduling engine does not check them against the van by default.
- **Consumed parts.** The technician records what they used, and according to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.fs_parts_guidelines.htm&language=en_US&type=5) the stock goes down automatically.

Part requests, transfers and returns exist as objects too. I only bring them into Salesforce when the ERP does not already handle them well, because every additional object is another interface to maintain.

## How does data flow between the ERP and Field Service?

The split follows a simple rule: the ERP delivers master data and stock, Salesforce delivers what happened on site.

| Information | Direction | Timing |
|---|---|---|
| Material master (parts, numbers, descriptions) | ERP to Salesforce | on change |
| Stock per warehouse and van | ERP to Salesforce | depends on the scheduling horizon, see below |
| Consumed parts on the work order | Salesforce to ERP | after the visit is completed |
| Part requests from technicians | Salesforce to ERP | immediately, becomes a transfer or purchase order there |
| Returns | depends on the process | with goods receipt in the ERP |

Decide early how current stock in Salesforce needs to be. For planning the next day, a nightly sync is often enough. Anyone who reschedules on the day of service needs shorter intervals, because a stock figure from last night creates false certainty. Also settle reservations and the order of postings: what happens when the ERP and the app book the same part at the same time. A B2B store faces the same question with a different consumer, see [stock in the B2B store](../b2b-store-stock-availability-erp/). Then decide what happens offline. The mobile app works without a network, but not everything in it does. According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.mfs_products_location.htm&type=5), the Inventory tab, where technicians see and update their van stock, is not available offline. What works offline depends on what the app primes with the work order or via Briefcase, such as the required parts. So plan which part information the technician needs on site and test it in the basement of a factory hall before go-live. A pure live lookup from the ERP does not work there either. Which data the app keeps offline is covered in [Field Service mobile offline](../field-service-mobile-app-offline-data/).

A third question is volume. Every part at every location is its own record. 40 vans with 300 parts each are already 12,000 product items, plus the warehouses. That is no problem for Salesforce, but every record has to be synced, and the app shows at most 1,000 products in its inventory lists. So I would only bring the locations into Salesforce that matter for field service: the vans and the warehouses that restock them. The rest of the company's stock stays in the ERP, and the back office looks it up there when needed.

How to settle such interfaces and the question of which system leads is described on the page [Salesforce integration](../../services/salesforce-integration/).

## The problems come from data maintenance

```praxis
In my Field Service projects, spare parts and the installed base came from the ERP. The split itself rarely caused trouble. When there were problems, they came from data maintenance quality.
```

This is what I would work on before go-live:

- **Material numbers:** a part that exists twice in the ERP, or with an outdated number, also lands twice in Salesforce. The technician then books against the wrong one.
- **Unbooked withdrawals:** if a technician takes a part from the warehouse without a posting, the van stock no longer matches. Field Service then shows a part that is not there.
- **Parts without a link to the equipment:** without a record of which part fits which machine, nobody can say in advance what a visit needs. The asset hierarchy from part 2 helps here.
- **Consumption only on paper:** if the technician records consumption in the evening, or not at all in the app, it reaches the ERP late or wrong. The new forms and voice input described in [Field Service Mobile: guided flows and voice](../salesforce-field-service-mobile-guided-voice/) can make this easier.

None of these problems is solved by software. Each needs an owner who maintains the data, and a process that makes wrong postings visible. A regular stock count of individual vans is a simple first step.

## What do you need to decide?

The split between ERP and Salesforce is the easy part. Three decisions cost money either way and belong to service management, logistics and IT together:

- **How current stock has to be.** A nightly sync is cheap, a near real-time interface is not. The question is what a wrong stock figure costs you: a second visit, an express delivery, an annoyed customer. If you plan on the day of service, a figure from last night creates false certainty.
- **Who owns stock differences.** When the van and the ERP disagree, someone has to clarify it and correct the posting. Without a named owner, the difference stays, and technicians stop trusting the app.
- **Whether parts should steer scheduling.** Showing required parts is standard. Letting scheduling consider whether a technician has the part in the van is your own process or your own automation. Decide whether the failed visits caused by missing parts justify that effort.

Three warning signs that the parts architecture does not hold: technicians call the warehouse before every visit, consumption is posted in the ERP days later, and stock is maintained in two systems by hand.

## Have three technicians count their van

Check how accurate van stock in the ERP is today.

```hinweis tipp
A simple test: have three technicians count their van and compare the result with the ERP. If it differs a lot, that is the first thing to fix, before any interface.
```

If it matches, start with stock, required parts and consumption. How maintenance contracts and committed response times reach scheduling is covered in the [next part of the series](../salesforce-field-service-maintenance-contracts/).

