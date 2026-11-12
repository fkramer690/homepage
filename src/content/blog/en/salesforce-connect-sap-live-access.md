---
title: "Salesforce Connect with SAP: when live access is enough"
metaTitle: "Salesforce Connect and SAP: live data or a copy?"
description: "When Salesforce Connect can show SAP invoices and deliveries live in Salesforce, where a copy is still needed, and what the limits and the add-on cost."
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
  - "Live access works for data people only look at, such as invoices, deliveries and open items on the account page."
  - "When Salesforce calculates, automates or reports over time with the data, you need a copy: external objects have no Apex triggers or trend reports."
  - "The OData 2.0 and 4.0 adapters allow 20,000 callouts per hour by default; OData 4.01 has no callout limit."
  - "Salesforce Connect costs USD 4,000 per connection and month at list price, billed annually. Compare that with a sync over the middleware you already run."
faq:
  - q: "What is Salesforce Connect?"
    a: "Salesforce Connect is a paid Salesforce add-on that shows data from an external system, for example SAP, as external objects in Salesforce without importing it. Users see the records in list views, related lists and reports, while the data stays in the source system and is read at the moment it is needed."
  - q: "Can Salesforce Connect read SAP S/4HANA data?"
    a: "Yes, if SAP exposes the data as an OData service. Salesforce Connect has adapters for OData 2.0, 4.0 and 4.01, and SAP S/4HANA offers standard OData APIs, for billing documents among others. Which services are active and who may call them is decided on the SAP side."
  - q: "When should I copy SAP data into Salesforce instead?"
    a: "Copy the data when Salesforce has to react to a change, calculate with it or report on it over time. Apex triggers, historical trend reporting and row-level formulas in reports are not available for external objects, and reports read at most 20,000 records of the primary object."
  - q: "What does Salesforce Connect cost?"
    a: "The Salesforce price list shows USD 4,000 per connection and month, billed annually, available for Enterprise and Unlimited Edition. What counts as one connection is set in your order form, and a second SAP system can mean a second connection; confirm the count with your account executive."
draft: false
---

Salesforce Connect shows SAP data such as invoices, deliveries and open items live in Salesforce as external objects, without copying a single record. That is enough when sales and service only need to see the data next to the account or the case. As soon as Salesforce has to calculate with the data, react to a change or report on it over months, you still need a copy: Apex triggers and historical trend reports are not available for external objects. Before you decide, compare the add-on at USD 4,000 per connection and month (list price) with a sync over the middleware you already run.

## How Salesforce Connect reads SAP data

Salesforce Connect maps a table of the external system to an external object. In the [Salesforce Help on the OData adapters](https://help.salesforce.com/s/articleView?language=en_US&id=platform.salesforce_connect_odata.htm&type=5), Salesforce describes three adapters for SAP and similar systems: OData 2.0, OData 4.0 and OData 4.01. SAP has to expose the data as an OData service for that. SAP S/4HANA offers standard OData APIs for billing documents, for example, which can read a billing document and return it as a PDF, according to [SAP Learning on the billing APIs](https://learning.sap.com/learning-journeys/exploring-functions-and-innovations-in-sap-s-4hana-sales/identifying-odata-apis-for-billing-documents_b8ff7d91-8045-4881-a057-728ba4b23978).

The link to the account is the SAP customer number. An indirect lookup relationship connects the external object to a field on the account that holds the customer number, and the account page then shows a related list with that customer's SAP invoices. Salesforce shows this setup with SAP sales orders in its [quick start project on Trailhead](https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-connect/quickstart-lightning-connect3). No record is stored in Salesforce. Each time someone opens the list, Salesforce asks SAP.

```ablauf
sf: Account, Invoice list
erp: OData service, Billing documents
Account --customer number--> Invoice list
Invoice list --query on open--> OData service
OData service --> Billing documents
Billing documents ..current rows..> Invoice list
```

That is the strength and the limit at the same time. The data is always current and nobody maintains a second set of invoices, but Salesforce only knows what SAP answers in that moment.

## When is live access enough instead of a copy?

I decide per data type, never once for the whole SAP interface. The question is what Salesforce does with the data after it is displayed.

```tabelle
title: Live access or copy, decided per data type
columns: Use of the data | Salesforce Connect (live) | Copy over middleware
Sales rep looks at invoices and open items before a visit | Enough * | Not needed
Service checks the delivery and tracking number for an order | Enough * | Not needed
Report on revenue per customer over 24 months | Weak: no historical trends, subset of data | Needed *
Automation reacts to a payment block or a new delivery | Not possible: no Apex triggers | Needed *
Manufacturing Cloud calculates actuals against sales agreements | Not possible | Needed *
Agent or flow writes back to SAP | Possible with writable external objects, with limits | Often the cleaner way
mark: fits
note: The more Salesforce does with the data beyond showing it, the stronger the case for a copy.
```

The automation limit comes from the [Apex Developer Guide on external objects](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_external_objects_considerations.htm): Apex triggers are not available for external objects, with one exception for change events from OData 4.0 connections. The reporting limits are listed in the [Salesforce Help on reports with Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5): converted currency fields, cross filters, buckets, historical trend reporting and row-level formulas are not supported. The primary object returns up to 20,000 records, and with large data sources summaries and formulas may only reflect a subset of the data.

For manufacturers the dividing line is usually clear. Invoices, delivery notes, open items and credit limits are information a sales rep reads before the customer meeting. Actuals for sales agreements, installed base and spare part stock are data Salesforce processes further, so they belong in Salesforce as a copy.

```praxis
When I introduced sales agreements with actuals from the ERP in Manufacturing Cloud, the ERP interface was the stumbling block.
```

The actuals had to be in Salesforce, because Manufacturing Cloud compares them with the planned quantities. Which data flows where between SAP and Manufacturing Cloud, and why order status is better queried live, I describe in [Manufacturing Cloud and SAP: which data flows where](../manufacturing-cloud-sap-integration-data-flows/).

## Limits to check before go-live

Salesforce Connect has its own limits, and they differ by adapter. These figures come from the [general limits for Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=platform.platform_connect_general_limits.htm&type=5) and the [reports page](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5):

```kennzahlen
20,000 | callouts per hour for OData 2.0 and 4.0 in Enterprise, Performance and Unlimited Edition; more via a support case
100 | external objects per org by default, up to 200 on request
4 | joins per query across external and other objects
20,000 | records of the primary object in a report
source: Salesforce Help, General Limits for Salesforce Connect and Salesforce Connect Support for Reports, as of November 2026
```

OData 4.01 has no callout limit, according to the same pages. The limit of 100,000 new rows per hour does not apply to orgs on Hyperforce, which Salesforce has exempted on a rolling basis since Spring '25. For OData 4.01 Salesforce has also removed the hourly limits for new record ID mappings, also on a rolling basis for Hyperforce orgs, according to the [limits of the OData adapters](https://help.salesforce.com/s/articleView?id=platform.odata_general_limits.htm&language=en_US&type=5).

Worked example: 300 service and sales users each open 25 account pages a day, and each page shows two related lists from SAP. If every list display triggers one callout, that is 15,000 callouts a day. If 30 percent of them fall into the busiest hour, you reach 4,500 callouts in that hour, well below 20,000. A dealer portal with several thousand users looks different, and so does a batch job that reads external objects. In that case choose OData 4.01 or test the load with a realistic number of users.

The second limit sits in SAP. Every page view becomes a request to the OData service. If SAP is slow or in maintenance, the related list shows no data. Agree with SAP Basis on the maintenance windows and on who answers when users report empty lists.

## Portal and access: who sees which SAP rows?

This is the point that is missed most often. The external data source authenticates either with one shared login for everyone (named principal) or with one login per user, according to the [ExternalDataSource object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_externaldatasource.htm). Per-user logins mean one SAP account per Salesforce user, which is rarely practical for a dealer portal with hundreds of companies. With a shared login, everyone with access to the external object reads what this one SAP user may read.

Apex managed sharing is not available for external objects. Before a dealer portal shows SAP invoices, decide where the restriction to the dealer's own customer number is enforced, and test it as a portal user, never as an admin. Test a dealer with several SAP customer numbers too, because that is where lists are most often incomplete or show too much.

In my view the safest option is an OData service that already filters on the SAP side or in the middleware by the requesting customer. That is a design decision for SAP and Salesforce together, and it belongs in the [object ownership matrix](../salesforce-object-ownership-matrix/) before anyone builds the related list.

## What Salesforce Connect costs compared with a sync

The [Salesforce price list for platform add-ons](https://www.salesforce.com/platform/pricing-add-ons/) shows Salesforce Connect at USD 4,000 per connection and month, billed annually, for Enterprise and Unlimited Edition. That is USD 48,000 a year at list price. In return you save data storage for copied invoices and the work of building and monitoring a sync job. You give up Apex triggers, historical trend reports and Apex managed sharing on these objects.

If you already run middleware for orders and master data, an additional read-only sync of open items can cost less than a new connection. If you have no middleware and only want to show invoices, the add-on is often the faster way. I compare both variants with the same three numbers: one-time build effort, running cost per year and who responds to an incident. How I usually split the interfaces between Salesforce and the ERP is described on the [Salesforce integration service page](../../services/salesforce-integration/).

```vertiefung For developers
title: Set up Salesforce Connect with SAP
- Create the external data source in Setup with the OData URL of the SAP service, then Validate and Sync; Salesforce generates one external object per table, recognizable by the suffix __x.
- Create the indirect lookup relationship on an external ID field of the account that holds the SAP customer number.
- Enable server-driven paging and Request Row Counts if batch jobs read the external objects, so records are not skipped or processed twice.
- Use the High Data Volume option only when you hit rate limits: it bypasses most of them but restricts other features, reports among them.
- Limits of the OData adapters: 8 MB per request and response, 16 MB per result set, 1,000 rows per subquery.
```

## First step: list the SAP data per screen and mark what Salesforce does with it

Take the screens your users work with every day: account, case, opportunity and, if there is one, the portal. For every piece of SAP data on them, note which system holds it and whether Salesforce only shows it or also calculates, automates or reports with it. Two lines from such a list: open items, account page, SAP leads, show only, candidate for Salesforce Connect. Actuals, sales agreement, SAP delivers, Manufacturing Cloud calculates, copy. Add the expected number of users per screen, because it decides the load on the OData service.

```schritte
List | 1 week · Architect and business
  SAP data per screen: invoices, deliveries, open items, actuals, stock.
Mark | 1 day · Architect
  Show only, or also calculate, automate, report over time.
Check | 1 to 2 weeks · SAP Basis
  Does an OData service exist, who filters by customer, what load is expected.
Calculate | 1 day · IT management
  Connect connection against a sync over the existing middleware, per year.
```

Everything marked "show only" is a candidate for Salesforce Connect. Everything else stays in the sync, and the list tells you on the same day whether the add-on is worth the cost.
