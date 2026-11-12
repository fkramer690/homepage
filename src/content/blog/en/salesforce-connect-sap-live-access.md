---
title: "Salesforce Connect with SAP: when live access is enough"
metaTitle: "Salesforce Connect and SAP: live access or replication?"
description: "When Salesforce Connect can show SAP invoices and deliveries live in Salesforce, when to replicate the data, what the limits are and what the add-on costs."
pubDate: 2026-11-12
lang: en
slug: salesforce-connect-sap-live-access
translationKey: salesforce-connect-sap
topic: data
categories: [architecture]
contactBrief: integration
tags: [Salesforce Connect, SAP, External Objects, OData, Integration, Manufacturing]
takeaways:
  - "Salesforce Connect shows SAP data as external objects: the records stay in SAP and are read over OData each time someone opens them."
  - "Live access works for data people look up on demand, such as invoices, deliveries and open items, if the screen can live with SAP response times and outages."
  - "Replicate the data when Salesforce must react to changes in SAP, keep history, aggregate large volumes or keep working while SAP is down."
  - "Salesforce sets no callout limit for the OData adapters. The real capacity limit is what SAP Gateway or your middleware can serve."
  - "Salesforce Connect costs USD 4,000 per connection and month at list price, billed annually. Add the SAP side before you compare it with a sync."
faq:
  - q: "What is Salesforce Connect?"
    a: "Salesforce Connect is a paid Salesforce add-on that shows data from an external system, for example SAP, as external objects in Salesforce without importing the records. Users see them in list views, related lists and reports, while the data stays in the source system and is read when it is needed."
  - q: "Can Salesforce Connect read SAP S/4HANA data?"
    a: "Yes, if SAP or an integration layer exposes the data as an OData service. Salesforce Connect has adapters for OData 2.0, 4.0 and 4.01, and SAP S/4HANA offers standard OData APIs, for billing documents among others. Whether a service is fit for production use with Salesforce Connect depends on its filters, keys, paging, performance and authorizations."
  - q: "When should I replicate SAP data into Salesforce instead?"
    a: "Replicate the data when Salesforce has to react to a change in SAP, store history, aggregate large volumes, keep working during an SAP outage or process the data natively, as Manufacturing Cloud does with sales agreement actuals. Apex triggers are not available for external objects, and reports read at most 20,000 records of the primary object."
  - q: "What does Salesforce Connect cost?"
    a: "The Salesforce price list shows USD 4,000 per connection and month, billed annually, for Enterprise and Unlimited Edition. Ask your account executive how connections are counted for your setup, for example with a second SAP system or several OData endpoints."
draft: false
---

Salesforce Connect shows SAP data such as invoices, deliveries and open items live in Salesforce as external objects, without importing the records. That is enough when sales and service look the data up next to the account or the case and the screen can live with SAP response times and outages. Replicate the data when Salesforce has to react to a change in SAP, keep history, aggregate large volumes or keep working while SAP is down. Before you decide, compare the add-on at USD 4,000 per connection and month (list price) plus the SAP side with a sync over your middleware.

## How Salesforce Connect reads SAP data

Salesforce Connect maps the entity sets of an OData service to external objects. In the [Salesforce Help on the OData adapters](https://help.salesforce.com/s/articleView?language=en_US&id=platform.salesforce_connect_odata.htm&type=5), Salesforce describes three adapters for SAP and similar systems: OData 2.0, OData 4.0 and OData 4.01. Behind the endpoint can sit SAP S/4HANA with SAP Gateway, SAP BTP or a middleware that builds the OData service itself. SAP S/4HANA, for example, offers standard OData APIs that read billing documents, according to [SAP Learning on the billing APIs](https://learning.sap.com/learning-journeys/exploring-functions-and-innovations-in-sap-s-4hana-sales/identifying-odata-apis-for-billing-documents_b8ff7d91-8045-4881-a057-728ba4b23978).

The link to the account is the SAP customer number. An indirect lookup relationship connects the external object to a unique field on the account that holds the customer number, and the account page then shows a related list with that customer's SAP invoices. Salesforce shows this setup with SAP sales orders in its [quick start project on Trailhead](https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-connect/quickstart-lightning-connect3). If you run more than one SAP system or client, the same number can exist twice, so the key field needs the system and client as well. If a dealer has several SAP customer numbers, model one account per number below a parent account, or let the OData service combine them. The business records are not stored in Salesforce. Each time someone opens the list, Salesforce calls the configured OData endpoint, which then queries SAP.

```ablauf
sf: Account, Invoice list
erp: OData service, Billing documents
Account --customer number--> Invoice list
Invoice list --query on open--> OData service
OData service --> Billing documents
Billing documents ..current rows..> Invoice list
```

That is the strength and the limit at the same time. The data is as current as the OData endpoint delivers it at the moment of the request, and nobody maintains a second set of invoices. But Salesforce only knows what the endpoint answers in that moment.

A standard SAP API is a start, not proof that it fits. Before anyone builds the related list, SAP Basis or the integration team checks which filters and sort orders the service supports, whether the keys are stable and unique, how it pages large results and how quickly it answers a query for one customer.

## When is live access enough instead of a copy?

I decide per data type and per process, never once for the whole SAP interface. The question is what Salesforce does with the data after it is displayed, and what happens when SAP does not answer.

```tabelle
title: Live access or replication, decided per process
columns: Process | Salesforce Connect (live) | Replication over middleware
Sales rep looks at invoices and open items before a visit | Enough * | Not needed
Service checks the delivery and tracking number for an order | Enough * | Not needed
Track how a customer's credit limit changed month by month | Not possible: only the current state | Needed *
Automation reacts to a payment block or a new delivery in SAP | No record-triggered start; only change events, SAP events or polling | Usually the simpler way *
Manufacturing Cloud calculates actuals against sales agreements | Not possible | Needed *
Service case must be handled while SAP is in maintenance | Not possible | Needed *
mark: fits
note: Live access fits lookups on demand. Replication fits history, events, volume and independence from SAP availability.
```

The automation limit comes from the [Apex Developer Guide on external objects](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_external_objects_considerations.htm): Apex triggers are not available for external objects, with one exception for change data capture events from OData 4.0 connections. Flows can read external objects, but no flow starts by itself because a row in SAP has changed. The reporting limits are listed in the [Salesforce Help on reports with Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5): converted currency fields, cross filters, buckets, historical trend reporting and row-level formulas are not supported. The primary object returns up to 20,000 records, and with large data sources summaries and formulas may reflect only a subset of the data. A list of the last 24 months of invoices for one customer usually works live if the service filters by customer; a management report over several hundred thousand invoice lines belongs in a replicated data set or a data warehouse.

Sales agreement actuals are a clear case for replication. Manufacturing Cloud compares them with the planned quantities, so they have to be in the Salesforce objects meant for them.

```praxis
When I introduced sales agreements with actuals from the ERP in Manufacturing Cloud, the ERP interface was the stumbling block.
```

For installed base and spare part stock it depends on the process. A technician's work order needs the asset in Salesforce. Stock at a warehouse changes by the hour, so a copy may be outdated shortly after the sync, and a live lookup can be the better answer. Which data flows where between SAP and Manufacturing Cloud, and why order status is better queried live, I describe in [Manufacturing Cloud and SAP: which data flows where](../manufacturing-cloud-sap-integration-data-flows/).

## Limits to check before go-live

Salesforce no longer sets a callout limit for the OData 2.0, 4.0 and 4.01 adapters, according to the [general limits for Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=platform.platform_connect_general_limits.htm&type=5). The same page warns that the external system may have its own limits on the traffic it accepts. Other limits remain, partly from the [reports page](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5) and the [limits of the OData adapters](https://help.salesforce.com/s/articleView?id=platform.odata_general_limits.htm&language=en_US&type=5):

```kennzahlen
100 | external objects per org by default, up to 200 on request
4 | joins per query across external and other objects
20,000 | records of the primary object in a report
16 MB | result set of one OData query
source: Salesforce Help, General Limits for Salesforce Connect, Salesforce Connect Support for Reports and General Limits for the OData Adapters, as of November 2026
```

The capacity question therefore moves to SAP. Worked example: 300 service and sales users each open 25 account pages a day, and each page shows two related lists from SAP. If every list display triggers one request, that is 15,000 requests a day. If 30 percent of them fall into the busiest hour, SAP Gateway or the middleware has to answer 4,500 requests in that hour, each one fast enough that the account page does not feel slow. A dealer portal with several thousand users or a batch job that reads external objects multiplies that. Treat these numbers as a first estimate of demand. For the load test, SAP Basis also needs the typical and maximum result size per query, the expected response time and the number of parallel requests, including reports and batch jobs.

Agree on the failure case as well. If SAP is slow or in maintenance, the related list can stay empty, and users must not mistake that for a customer without open items. Make it a go-live criterion that a technical error looks different from an empty result, and test it by switching off the endpoint in the sandbox. Decide which screens may depend on SAP, which response time is acceptable for an account or case page and who answers when users report empty lists.

## Portal and access: who sees which SAP rows?

This is the point that is missed most often. The external data source authenticates either with one shared login for everyone (named principal) or with one login per user, according to the [ExternalDataSource object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_externaldatasource.htm). Per-user logins mean one SAP account per Salesforce user, which is rarely practical for a dealer portal with hundreds of companies. With a shared login, the endpoint returns what this one SAP user may read. The OData service then cannot tell which dealer is asking, unless the user context reaches it in a way the user cannot change, for example through per-user OAuth.

Apex managed sharing is not available for external objects. Restriction rules are: according to the [Salesforce documentation on restriction rules](https://developer.salesforce.com/docs/atlas.en-us.restriction_rules.meta/restriction_rules/restriction_rules_about.htm), they work for external objects from the OData 2.0, OData 4.0 and cross-org adapters, not for OData 4.01 or the custom adapter, with up to two active rules per object in Enterprise Edition. For a dealer portal I use both lines: SAP limits the technical user to the data the portal may show at all, and a restriction rule in Salesforce limits each dealer to the own customer numbers. If the user context reaches SAP securely, filter there as well, because then a wrong rule in Salesforce does not expose another dealer's invoices.

Test both lines as a portal user, never as an admin, and not only on the account page: tabs, search, reports and the API can reach the external object too. Test a dealer with several SAP customer numbers too, because that is where lists are most often incomplete or show too much. Who restricts which data belongs in the [object ownership matrix](../salesforce-object-ownership-matrix/) before anyone builds the related list.

## What Salesforce Connect costs compared with a sync

The [Salesforce price list for platform add-ons](https://www.salesforce.com/platform/pricing-add-ons/) shows Salesforce Connect at USD 4,000 per connection and month, billed annually, for Enterprise and Unlimited Edition. That is USD 48,000 a year at list price. In return you save data storage for copied invoices and the work of building and monitoring a sync job.

The add-on is not the whole bill. On the SAP side you need an OData service that is activated or built, SAP Gateway, SAP BTP or API management in front of it, authentication and certificates, a load test, monitoring of the endpoint and an agreed incident process across both systems. A sync needs much of the same, but it runs in the background, and a slow SAP does not slow down the account page.

Mixed models are common: master data and status replicated, the documents themselves live; or the last known values stored in Salesforce with a live refresh on demand. If you already run middleware for orders and master data, an additional read-only sync of open items can cost less than a new connection. If you have no middleware and only want to show invoices, the add-on is often the faster way. I compare both variants with the same three numbers: one-time build effort on both sides, running cost per year and who responds to an incident. How I usually split the interfaces between Salesforce and the ERP is described on the [Salesforce integration service page](../../services/salesforce-integration/).

```vertiefung For developers
title: Set up Salesforce Connect with SAP
- Create the external data source in Setup with the URL of the OData service, then Validate and Sync; Salesforce generates external objects from the service metadata, recognizable by the suffix __x.
- Create the indirect lookup relationship on a unique external ID field of the account that holds the SAP customer number.
- Batch Apex with Database.QueryLocator needs Request Row Counts on the external data source. If that option causes errors or long load times with the SAP service, avoid such batch jobs on this source. Reading live data that changes during a batch job is a consistency problem of its own: test it with a stable sort order.
- The High Data Volume option changes which Salesforce features are available, reports among them. Check UI, search, reporting and automation needs before you switch it on.
- Limits of the OData adapters: 8 MB per request and response, 16 MB per result set, 1,000 rows per subquery.
```

## First step: list the SAP data per screen and mark what Salesforce does with it

Take the screens your users work with every day: account, case, opportunity and, if there is one, the portal. For every piece of SAP data on them, note which system holds it, whether Salesforce only shows it or also reacts to it, keeps its history or aggregates it, and whether the screen must work while SAP is down. Two lines from such a list: open items, account page, SAP leads, show only, candidate for Salesforce Connect. Actuals, sales agreement, SAP delivers, Manufacturing Cloud calculates, replication. Add the expected number of users per screen, because it decides the load on the OData service.

```schritte
List | 1 week · Architect and business
  SAP data per screen: invoices, deliveries, open items, actuals, stock.
Mark | 1 day · Architect
  Show only, or also react, keep history, aggregate, work without SAP.
Check | 1 to 2 weeks · SAP Basis
  Is there a fitting OData service, who filters by customer, what load is expected.
Calculate | 1 day · IT management
  Connect connection plus SAP side against a sync over the existing middleware, per year.
```

The first workshop already shows candidates for Salesforce Connect; the complete list takes about a week. The SAP check and the cost comparison then decide whether the add-on pays off.
