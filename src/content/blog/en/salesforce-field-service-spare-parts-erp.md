---
title: "Field Service Spare Parts: ERP or Salesforce?"
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
  - "The ERP owns spare parts stock, including the stock in the service van. In my projects it always did, and there were relatively few problems with that."
  - "Salesforce Field Service still needs a copy of the stock, so dispatchers and technicians can see which part is where, offline in the app too."
  - "The technician records consumed parts on the work order in Salesforce. Field Service then reduces the van stock, and the interface reports the consumption to the ERP."
  - "Where problems came up, they were down to data maintenance quality. That is where the focus should be before the interface goes live."
  - "Required parts can be stored on the work order. That way scheduling knows before the visit which part the technician must bring."
faq:
  - q: "Should Salesforce Field Service or the ERP own spare parts stock?"
    a: "The ERP. It values the stock, runs purchasing and transfers and is connected to accounting. Field Service holds a copy for scheduling and technicians and reports consumption back."
  - q: "How does Field Service represent the stock in a service van?"
    a: "The van is a mobile location. The stock per part is a product item with the quantity at that location. When the technician records consumption on the work order, the quantity goes down automatically."
  - q: "What is the difference between products required and products consumed?"
    a: "Products required are the parts a work order needs and help with preparation. Products consumed are the parts actually used, and they reduce the stock."
  - q: "Which data flows between the ERP and Field Service?"
    a: "From the ERP to Salesforce: material master and stock per location. From Salesforce to the ERP: consumption from work orders and part requests from technicians, which become transfers or purchase orders there."
draft: false
---

The ERP owns spare parts stock in field service, including the stock in the service van. In my projects it always did, and there were relatively few problems with that. Salesforce Field Service still needs a copy of the stock, so dispatchers and technicians can see which part is where, and it reports back which parts were used. Where problems came up, the split of tasks was not the cause. Data maintenance quality was.

This article is part 4 of the series. In [part 2](../salesforce-field-service-master-data/), missing spare parts were one of the reasons for failed visits. In [part 3](../salesforce-field-service-scheduling-automation/), "part not in the van" was a typical reason for a dispatcher to change the scheduling proposal. This part is about how spare parts come together in Field Service and the ERP.

## Why does the ERP own the stock?

In the ERP, a spare part is more than a quantity at a place. It has a value on the balance sheet, a purchasing process, minimum stock levels, suppliers and transfers between warehouses. Every withdrawal is a posting that reaches accounting. The ERP is built for this, and the processes there have usually run for years.

Field Service can hold quantities per location and log movements. It does not do valuation, purchasing or accounting, and it should not. Whoever wants to run stock in Salesforce rebuilds part of the ERP and has to reconcile both worlds forever. I have not seen a client do that, and I would not advise anyone to.

## What does Field Service need to know about spare parts?

Field Service needs parts for two reasons: to prepare a visit and to document it afterwards. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=fs_manage_inventory.htm&language=en_US&type=5) there is a set of objects for that:

- **Locations** are warehouses and vehicles. A service van is a mobile location with stock, as described in part 2.
- **Product items** are the stock of one part at one location, such as "twelve seals in technician A's van".
- **Products required** are the parts a work order needs. When they are recorded, the back office knows before the visit what has to go into the van.
- **Products consumed** are the parts the technician actually used. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.fs_parts_guidelines.htm&language=en_US&type=5), the product item quantity goes down automatically.
- **Product requests** are part requests, for example when van stock runs low or a job needs a specific part. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=fs_create_part_requests.htm&language=en_US&type=5) they can be linked to work orders and have a van as their destination.
- **Product transfers** and **return orders** cover transfers and returns.

Not every company needs all of them. If the ERP already handles part requests and transfers well, Salesforce often only needs the stock for display, the required parts on the work order and the consumption. Every additional object is another interface to maintain.

## How does data flow between the ERP and Field Service?

The split follows a simple rule: the ERP delivers master data and stock, Salesforce delivers what happened on site.

| Information | Direction | Timing |
|---|---|---|
| Material master (parts, numbers, descriptions) | ERP to Salesforce | on change |
| Stock per warehouse and van | ERP to Salesforce | regularly, at least daily |
| Consumed parts on the work order | Salesforce to ERP | after the visit is completed |
| Part requests from technicians | Salesforce to ERP | immediately, becomes a transfer or purchase order there |
| Returns | depends on the process | with goods receipt in the ERP |

Two decisions should come early. First: how current does stock in Salesforce need to be? For planning the next day, a nightly sync is often enough. Anyone who reschedules on the day of service needs shorter intervals. A B2B store faces the same question with a different consumer, see [stock in the B2B store](../b2b-store-stock-availability-erp/). Second: what happens offline? The mobile app works without a network. For the technician to see their van stock there, it has to sit in Salesforce as a copy. A pure live lookup from the ERP does not work in the basement of a factory hall. Which data the app keeps offline is covered in [Field Service mobile offline](../field-service-mobile-app-offline-data/).

A third question is volume. Every part at every location is its own record. 40 vans with 300 parts each are already 12,000 product items, plus the warehouses. That is no problem for Salesforce, but every record has to be synced and ends up offline on the technician's device. So I would only bring the locations into Salesforce that matter for field service: the vans and the warehouses that restock them. The rest of the company's stock stays in the ERP, and the back office looks it up there when needed.

How to settle such interfaces and the question of which system leads is described on the page [Salesforce integration](../../services/salesforce-integration/).

## Where do the problems come from?

```praxis
In my Field Service projects, spare parts and the installed base came from the ERP. The split itself rarely caused trouble. When there were problems, they came from data maintenance quality.
```

This is what I would work on before go-live:

- **Material numbers:** a part that exists twice in the ERP, or with an outdated number, also lands twice in Salesforce. The technician then books against the wrong one.
- **Unbooked withdrawals:** if a technician takes a part from the warehouse without a posting, the van stock no longer matches. Field Service then shows a part that is not there.
- **Parts without a link to the equipment:** without a record of which part fits which machine, nobody can say in advance what a visit needs. The asset hierarchy from part 2 helps here.
- **Consumption only on paper:** if the technician records consumption in the evening, or not at all in the app, it reaches the ERP late or wrong. The new forms and voice input described in [Field Service Mobile: guided flows and voice](../salesforce-field-service-mobile-guided-voice/) can make this easier.

None of these problems is solved by software. Each needs an owner who maintains the data, and a process that makes wrong postings visible. A regular stock count of individual vans is a simple first step.

## Where should you start?

Check how accurate van stock in the ERP is today.

```hinweis tipp
A simple test: have three technicians count their van and compare the result with the ERP. If it differs a lot, that is the first thing to fix, before any interface.
```

If it matches, decide which of the objects above you really need, and start with stock, required parts and consumption.

The next part of the series covers maintenance contracts and committed response times. If you want an independent look at your spare parts processes before then, [get in touch](#contact).
