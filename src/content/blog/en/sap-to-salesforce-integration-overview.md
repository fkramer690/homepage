---
title: "SAP to Salesforce Integration: An Overview for IT Leaders"
description: "SAP to Salesforce: which system leads, which patterns fit, MuleSoft or SAP Integration Suite, and what the move to S/4HANA means for your interfaces."
pubDate: 2026-10-29
lang: en
slug: sap-to-salesforce-integration-overview
translationKey: sap-salesforce-integration-overview
topic: data
categories: [architecture]
contactBrief: integration
tags: [SAP, Salesforce SAP integration, MuleSoft, S/4HANA, interfaces, ERP]
takeaways:
  - "An SAP to Salesforce integration starts with a map: for each kind of data exactly one system leads, and the other reads."
  - "Of six integration patterns, three usually suffice for SAP: master data in batches, live prices and availability, orders with status back."
  - "MuleSoft, SAP Integration Suite or another platform can serve as middleware. With a few stable interfaces, a direct connection can be enough."
  - "SAP ECC loses mainstream maintenance at the end of 2027. Cut interfaces so that the move to S/4HANA does not mean rebuilding everything."
  - "Each product has its own data flows: Manufacturing Cloud, B2B Commerce, Revenue Cloud, Field Service and Agentforce. This overview links the detailed articles."
faq:
  - q: "How do I connect SAP to Salesforce?"
    a: "Through middleware such as MuleSoft or SAP Integration Suite, or directly through the APIs of both systems. First comes the question of which system leads for customers, products, prices and orders, and which pattern each connection needs: batch, live lookup or handover with status update."
  - q: "Do I need MuleSoft for SAP and Salesforce?"
    a: "No. MuleSoft comes with ready-made connectors for SAP S/4HANA and for older SAP systems. SAP Integration Suite or other platforms can do the same. With a few stable interfaces, a direct connection can be enough."
  - q: "Can Salesforce show SAP data without copying it?"
    a: "Yes, with Salesforce Connect. External objects read data at runtime through OData 2.0 or 4.0 or a custom adapter. That fits large data volumes of which users only need a little at a time, such as invoices or deliveries."
  - q: "What does the move from SAP ECC to S/4HANA change for Salesforce?"
    a: "Interfaces based on BAPI, RFC and IDoc are often replaced by S/4HANA OData APIs. If you build today, encapsulate the SAP side behind a stable interface in the middleware, so Salesforce barely notices the switch."
draft: false
---

Connecting SAP to Salesforce means deciding on a leading system for each kind of data and then choosing the right pattern for each connection: master data in batches, prices and availability live, orders handed over with status coming back. Only then does technology come in, meaning MuleSoft, SAP Integration Suite or a direct connection. Searching for "SAP to Salesforce" or "Salesforce SAP integration" mostly turns up lists of tools. For IT leaders, the order of decisions before that matters more. This overview brings together what I have described in the detailed articles on individual Salesforce products.

## Which system leads for which data?

Most integration problems start with an unclear answer to this question. If Salesforce and SAP can both change the same customer address or the same price, the two systems will disagree sooner or later. A typical split at manufacturers looks like this:

| Data | Leading system | Salesforce |
|---|---|---|
| Leads and contacts | Salesforce | creates and maintains |
| Customers with orders and invoices | SAP | reads, adds the sales view |
| Products and bills of materials | SAP | reads what sales and service need |
| Prices and conditions | usually SAP | queries or calculates by rules |
| Orders, deliveries, invoices | SAP | hands over orders, shows status |
| Cases, jobs, service history | Salesforce | leads, with reference to SAP orders |

The details differ in every company, especially for prices. Whether customer prices come from SAP conditions or are created in Salesforce is compared in [customer prices: SAP conditions or Salesforce pricing?](../customer-prices-sap-conditions-or-salesforce-pricing/). This map belongs to the architecture, not to the specification of a single interface.

## Three integration patterns usually suffice for SAP

In its [architecture guide](https://architect.salesforce.com/docs/architect/fundamentals/guide/integration-patterns.html), Salesforce describes six integration patterns, sorted by direction and timing. For SAP, three of them usually suffice:

- **Batch Data Synchronization** for master data such as customers, products and price lists. They change rarely and arrive nightly or hourly.
- **Request and Reply** for live lookups, such as availability, a customer-specific price or order status. According to the guide, the pattern fits small real-time payloads, not mass data.
- **Fire and Forget** for handing orders over to SAP. Salesforce does not wait, SAP confirms later, and the status comes back.

A fourth pattern is often overlooked: **Data Virtualization**. With Salesforce Connect, [external objects](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_external_objects.htm) read data at runtime through OData 2.0 or 4.0 without storing it in Salesforce. That fits invoices or deliveries, of which a service agent only needs those of one customer at a time.

For complex cases, the guide recommends middleware: when data has to be transformed, combined from several systems or kept consistent across several systems.

## MuleSoft, SAP Integration Suite or direct?

Which path fits depends on the number of systems, the number of teams and how often interfaces change.

- **MuleSoft** comes with connectors for both SAP worlds. The [SAP S/4HANA OData Connector](https://docs.mulesoft.com/sap-s4hana-cloud-connector/latest/) supports the OData APIs of S/4HANA Cloud and S/4HANA on-premise. The [SAP Connector](https://docs.mulesoft.com/sap-connector/latest/) works with BAPI, RFC and IDoc, the techniques of older systems such as ECC.
- **SAP Integration Suite** is SAP's own platform. Partners offer adapters for Salesforce there. It fits when the SAP organisation is to run the interfaces and the platform is already in place.
- **A direct connection** through the APIs of both systems can be the simplest solution with a few stable interfaces.

```pro-contra
pro: Middleware
- Interfaces become reusable, such as one order status for portal, store and agent
- Errors are visible in one place
- The move from ECC to S/4HANA stays behind the middleware
contra: What it costs
- Licence and operation of another platform
- A team that knows the platform
- With two or three interfaces, often more effort than benefit
```

I was involved in a global CTI rollout with MuleSoft, and for implementation I work with partners who have integration experience from large international programmes. Architecture and platform choice stay on the client side, and I decide with the client which partner implements them. How I plan interfaces is described under [Salesforce integration](../../services/salesforce-integration/).

## What does the move to S/4HANA change?

Many manufacturers still run SAP ECC and plan the move to S/4HANA. SAP set the deadlines in [February 2020](https://news.sap.com/2020/02/sap-s4hana-maintenance-2040-clarity-choice-sap-business-suite-7/):

```zeitleiste
2027-12-31 | Mainstream maintenance for SAP Business Suite 7 (ECC) ends
2030-12-31 | Optional extended maintenance for ECC ends
2040-12-31 | Maintenance commitment for SAP S/4HANA
```

For Salesforce this means: an interface that connects to ECC through BAPI or IDoc today is often rebuilt on OData APIs with S/4HANA. If you build now, encapsulate the SAP side behind a stable interface in the middleware. Salesforce then calls "get order status" and does not need to know whether ECC or S/4HANA answers behind it. If the Salesforce implementation and the S/4HANA move run in parallel, this dependency belongs in the shared programme plan.

## Each Salesforce product has its own data flows

Each Salesforce product needs different data from SAP. The details are in separate articles:

- **Manufacturing Cloud:** actuals for sales agreements, orders and credit notes, described in [Manufacturing Cloud and SAP: which data goes where](../manufacturing-cloud-sap-integration-data-flows/).
- **B2B Commerce:** master data in batches, live lookups in cart and checkout, order out and status back, in [B2B Commerce and SAP](../b2b-commerce-sap-data-flows/).
- **Revenue Cloud:** who leads what in quote-to-cash, in [Revenue Cloud and SAP](../revenue-cloud-sap-quote-to-cash-ownership/).
- **Field Service:** spare parts, stock and installed base, in [spare parts in field service](../salesforce-field-service-spare-parts-erp/).
- **Agentforce:** order status and availability for an agent through MuleSoft, in [Agentforce and SAP](../agentforce-sap-order-status-mulesoft/).

```praxis
I introduced sales agreements with actuals from the ERP in Manufacturing Cloud, and the ERP interface was the stumbling block. In field service projects, spare parts and installed base came from the ERP, and there too the ERP interfaces were one of the stumbling blocks.
```

## Start with the map of your data

Draw the map before you talk about tools: one row per kind of data, one column for the leading system, one for the direction and one for the timing, meaning batch, live or handover. Then check which interfaces exist today and which of them depend on ECC techniques that go away with S/4HANA. Only with this list can you decide whether middleware pays off, and which one.

Also name an owner on the client side for each interface and check which technical user it logs in with. Integration users often have more rights than they need, and logins with username and password are being phased out, as described in [Salesforce password integrations end in 2027](../salesforce-password-integrations-end-2027/).
