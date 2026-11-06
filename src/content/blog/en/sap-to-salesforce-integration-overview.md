---
title: "SAP to Salesforce Integration: A Guide for Manufacturers"
description: "SAP to Salesforce for manufacturers: who owns which data, which patterns fit, MuleSoft or SAP Integration Suite, and what S/4HANA means for interfaces."
pubDate: 2026-10-29
lang: en
slug: sap-to-salesforce-integration-overview
translationKey: sap-salesforce-integration-overview
topic: data
categories: [architecture]
contactBrief: integration
tags: [SAP, Salesforce SAP integration, MuleSoft, SAP Integration Suite, S/4HANA, interfaces]
takeaways:
  - "An SAP to Salesforce integration starts with a map: every business object, and where needed every critical field, has exactly one owner."
  - "Most SAP landscapes combine a few recurring patterns: batch, live lookup, order handover with status back and reading at runtime."
  - "MuleSoft and SAP Integration Suite both connect Salesforce. Your integration standard and who runs the interfaces decide, not the connector list."
  - "BAPI, RFC and IDoc do not simply disappear with S/4HANA. Check each interface and hide SAP behind a stable business contract."
  - "An interface is finished when errors are visible, duplicates are impossible and both sides can reconcile their data."
faq:
  - q: "How do I connect SAP to Salesforce?"
    a: "First decide which system owns customers, products, prices and orders, and which pattern each connection needs: batch, live lookup, order handover with confirmation or reading at runtime. Then choose the platform: MuleSoft, SAP Integration Suite, another integration platform or, for a few simple interfaces, a direct API connection."
  - q: "Do I need MuleSoft for SAP and Salesforce?"
    a: "No. MuleSoft has an OData connector for S/4HANA APIs and a SAP connector for RFC, BAPI and IDoc, which needs a separate licence. SAP Integration Suite has its own Salesforce adapters. If your company already runs one of the two as its integration standard, that is usually the better starting point."
  - q: "Can Salesforce show SAP data without copying it?"
    a: "Yes, with Salesforce Connect, which needs its own licence; check your edition and contract. External objects read data at runtime through OData 2.0 or 4.0 or a custom adapter. That fits invoices or deliveries that users look up one customer at a time, as long as SAP answers fast and reliably and the limits for search and reports are acceptable."
  - q: "What does the move from SAP ECC to S/4HANA change for Salesforce?"
    a: "It depends on the interface. S/4HANA still supports many BAPIs, RFCs and IDocs, but business objects change, for example customers are maintained centrally as business partners. Check every interface, for instance with the SAP Readiness Check, and give Salesforce a stable business contract in the middleware."
draft: false
---

Connecting SAP to Salesforce means deciding who owns which data and then choosing the right pattern for each connection: master data in batches, prices and availability live, orders handed over with a confirmation, large histories read at runtime. Only then does technology come in, meaning MuleSoft, SAP Integration Suite or a direct connection. For manufacturers this order matters, because spare parts, availability, installed base and order status often originate in SAP and are needed in sales and service.

## Which system leads for which data?

Most integration problems start with an unclear answer to this question. If Salesforce and SAP can both change the same customer address or the same price, the two systems will disagree sooner or later. The answer is rarely one system per object. In a typical case, a new prospect is created in Salesforce, SAP later assigns the customer number and payment terms, and contacts may stay mastered in Salesforce. Some companies also have a third system that owns the data: SAP Master Data Governance for customers, a PIM or PLM for products, a pricing engine for prices.

```tabelle
title: System map, simplified example from manufacturing
columns: Data | Owner * | Salesforce | SAP
Prospects and contacts | Salesforce | creates and maintains | receives contacts relevant for orders
Customer with orders | SAP or SAP MDG | adds the sales view | customer number, payment terms, credit limit
Products | SAP, often fed by PLM or PIM | reads what sales and service need | material master
Prices and conditions | usually SAP | queries or calculates by rules | conditions
Orders, deliveries, invoices | SAP | hands over orders, shows status | processes and bills
Cases, jobs, service history | Salesforce | leads, with reference to SAP orders | receives billable work
note: An example, not a blueprint. Write down the owner per object and lifecycle stage, and per field where the owner changes.
```

Prices differ most between companies. Whether customer prices come from SAP conditions or are created in Salesforce is compared in [customer prices: SAP conditions or Salesforce pricing?](../customer-prices-sap-conditions-or-salesforce-pricing/). The map belongs to the architecture, not to the specification of a single interface. For the split between teams, the [object ownership matrix](../salesforce-object-ownership-matrix/) works the same way.

## Which integration patterns fit SAP?

In its [architecture guide](https://architect.salesforce.com/docs/architect/fundamentals/guide/integration-patterns.html), Salesforce describes six integration patterns, classified by type of integration and timing. Each interface uses one of them, and most SAP landscapes combine four, plus the way back for status:

- **Batch Data Synchronization** for data that may be a few hours old, such as price lists or product master data. Not every piece of master data fits: a newly created or blocked customer can be needed in Salesforce within minutes. What decides is how fresh the data must be and what happens if it is not, not whether it counts as master data.
- **Request and Reply** for live lookups, such as availability, a customer-specific price or order status. According to the guide, the pattern fits small payloads in real time, not mass data.
- **Fire and Forget** for handing orders over to SAP. Salesforce does not wait, SAP confirms later. The way back is a pattern of its own, Remote Call-In: SAP or the middleware writes order number, rejection and status changes into Salesforce through its API or as events. For orders this only works with a confirmation: SAP sends back the order number or a rejection, every order carries a unique key that SAP checks, so that a retry does not create a second order, and someone sees the orders that did not arrive. If the order must be checked before the customer leaves, for credit limit, price or availability, a live check comes first and the handover follows asynchronously.
- **Data Virtualization** with Salesforce Connect. [External objects](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_external_objects.htm) read data at runtime through OData 2.0 or 4.0 without storing it in Salesforce. That fits invoices or deliveries, of which a service agent only needs those of one customer at a time. Salesforce Connect needs its own licence (check edition and contract), SAP must answer fast at the moment the user opens the page, and search, reports and automation work only to a limited extent on external objects.

For complex cases, the guide recommends middleware: when data has to be transformed, combined from several systems or kept consistent across several systems.

## MuleSoft, SAP Integration Suite or direct?

The connector lists of both platforms look similar. More decisive are four questions: Which integration platform is already your company standard? Who runs the interfaces day to day, the SAP team or the CRM team? How many systems apart from SAP and Salesforce are involved? And how many interfaces will several channels reuse, such as one order status for portal, web store and agent?

- **MuleSoft** belongs to Salesforce and comes with connectors for both SAP worlds. The [SAP S/4HANA OData Connector](https://docs.mulesoft.com/sap-s4hana-cloud-connector/latest/) supports the OData APIs of S/4HANA Cloud and on-premise. The [SAP Connector](https://docs.mulesoft.com/sap-connector/latest/) works with BAPI, RFC and IDoc, for ECC as well as S/4HANA on-premise, and needs a separate licence and SAP's own libraries. A common setup: Salesforce and other non-SAP systems dominate, and an integration team outside SAP runs the interfaces.
- **SAP Integration Suite** is SAP's platform. SAP provides its own [Salesforce adapters](https://help.sap.com/docs/integration-suite/sap-integration-suite/salesforce-adapter) for the sender and receiver side and for Salesforce events (Pub/Sub), and the platform reaches on-premise SAP systems through the SAP Cloud Connector. A common setup: the platform is already in place and the SAP organisation runs the interfaces. Both platforms also connect systems from other vendors.
- **A direct connection** fits one or two HTTP-based APIs with little mapping, for example an order status lookup from Salesforce to an S/4HANA OData service. Retry, monitoring and certificates then have to be solved in Salesforce or SAP itself. For RFC and IDoc, Salesforce always needs a component in between.

```pro-contra
pro: Middleware
- Interfaces become reusable, such as one order status for portal, store and agent
- Errors are visible in one place
- A stable business contract can hide the move from ECC to S/4HANA
contra: What it costs
- Licence and operation of another platform
- A team that knows the platform
- With two or three interfaces, often more effort than benefit
```

My own MuleSoft experience comes from a global CTI rollout, not from an SAP interface. For implementation I work with partners who have integration experience from large international programmes. Architecture and platform choice stay on the client side, and I decide with the client which partner implements them. How I plan interfaces is described under [Salesforce integration](../../services/salesforce-integration/).

## What does the move to S/4HANA change?

Many manufacturers still run SAP ECC and plan the move to S/4HANA. SAP set the deadlines in [February 2020](https://news.sap.com/2020/02/sap-s4hana-maintenance-2040-clarity-choice-sap-business-suite-7/):

```zeitleiste
2027-12-31 | Mainstream maintenance ends for SAP Business Suite 7 core applications such as ERP 6.0
2030-12-31 | Optional extended maintenance for ECC ends
2040-12-31 | SAP commitment to S/4HANA: at least one release in maintenance
```

BAPI, RFC and IDoc do not disappear with S/4HANA. Many of them remain supported, alongside released OData and SOAP APIs for many scenarios, which differ by edition and release. What changes are business objects and processes: customers are maintained centrally as business partners, status values and mandatory fields change, some objects are simplified. Some interfaces therefore keep running, others need adjustments or a rebuild. The SAP Readiness Check lists the existing interfaces of a system and shows which ones are affected.

For Salesforce, this means: encapsulate the SAP side behind a stable business contract in the middleware. Salesforce calls "get order status" with its own fields and does not need to know whether ECC or S/4HANA answers behind it. Middleware that simply passes on SAP structures does not protect you, it only moves the dependency. If the Salesforce implementation and the S/4HANA move run in parallel, this dependency belongs in the shared programme plan.

## An interface is finished when it can be operated

Many SAP interfaces work in the test and fail in daily operations. Before go-live, I check for each interface whether these points are settled:

- **No duplicates:** every order and every update carries a unique key that the receiver checks, so repeating a request cannot create a second order.
- **Errors with an owner:** technical errors are retried automatically, business errors such as a blocked customer land with a named person in the business.
- **Reconciliation:** a regular comparison shows whether both systems have the same orders and statuses.
- **Monitoring:** someone sees a stuck interface before sales or service call.
- **Technical user and login:** every interface logs in with an identifiable technical user that has only the rights it needs.

```hinweis achtung
The OAuth username-password flow for connected apps stops working on 20 February 2027. Check which of your SAP interfaces still log in to Salesforce this way, as described in [Salesforce password integrations end in 2027](../salesforce-password-integrations-end-2027/).
```

## Each Salesforce product brings its own integration question

The products need different SAP data, and each raises a different architecture question:

- **Manufacturing Cloud:** actuals for sales agreements may arrive in large batches and be corrected later, the question is the timing and how credit notes are handled. Described in [Manufacturing Cloud and SAP: which data goes where](../manufacturing-cloud-sap-integration-data-flows/).
- **B2B Commerce:** the customer waits in cart and checkout, so live lookups need short response times and a fallback if SAP does not answer. In [B2B Commerce and SAP](../b2b-commerce-sap-data-flows/).
- **Revenue Cloud:** quote, contract and invoice cross the system boundary, the question is who owns which step in quote to cash. In [Revenue Cloud and SAP](../revenue-cloud-sap-quote-to-cash-ownership/).
- **Field Service:** when technicians work offline, the spare parts, stock and assets they need must be on the device before the job starts. In [spare parts in field service](../salesforce-field-service-spare-parts-erp/).
- **Agentforce:** an agent invokes approved actions with its own technical identity, the question is which actions it may trigger and how its access is logged. In [Agentforce and SAP](../agentforce-sap-order-status-mulesoft/).

```praxis
I introduced sales agreements with actuals from the ERP in Manufacturing Cloud, and the ERP interface was the stumbling block. In field service projects, spare parts and installed base came from the ERP, and there too the ERP interfaces were one of the stumbling blocks.
```

## Start with the map of your data

Draw the map before you talk about tools: one row per business object, one column for the owner, one for the direction and one for the timing, meaning batch, live, handover or read at runtime. Mark the fields where the owner changes. Then list which interfaces exist today, and if the move to S/4HANA is planned, have the SAP team check which of them it affects. Only with this list can you decide whether middleware pays off, and which one. The result is three documents: a signed-off ownership map, an interface list with pattern, required freshness and an owner on the client side who answers for errors after go-live, and the platform decision based on both.
