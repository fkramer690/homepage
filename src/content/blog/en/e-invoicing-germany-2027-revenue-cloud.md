---
title: "E-invoicing in Germany 2027: impact on Revenue Cloud"
description: "What Germany's 2027 e-invoicing deadline means for manufacturers invoicing from Revenue Cloud Billing or SAP: rules, gaps in Salesforce and three routes."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: e-invoicing-germany-2027-revenue-cloud
translationKey: e-invoicing-germany-revenue-cloud
topic: revenue
categories: [revenue-cloud, architecture]
tags: [e-invoicing, xrechnung, zugferd, revenue cloud billing, sap, germany]
takeaways:
  - "The €800,000 threshold applies per invoicing business. In a German VAT group the turnover of the whole group counts."
  - "The norm is an EN 16931 format such as XRechnung or ZUGFeRD 2.0.1 or later, not MINIMUM or BASIC-WL. The delivery channel is not prescribed."
  - "For Revenue Cloud Billing, Salesforce documentation describes invoice PDFs. I found no native EN 16931 output as of November 2026."
  - "The options are invoicing from SAP, a connected e-invoicing service or a partner app in the org."
faq:
  - q: "When does e-invoicing become mandatory in Germany?"
    a: "Receiving e-invoices has been mandatory for all domestic businesses since 1 January 2025. Issuing them is mandatory from 1 January 2027 for companies with more than €800,000 turnover in the previous year, and from 1 January 2028 for domestic B2B invoices in general, with permanent exceptions such as small invoices up to €250."
  - q: "Is a PDF invoice an e-invoice?"
    a: "No. Under the German rules an e-invoice is issued, transmitted and received in a structured electronic format, normally one that follows EN 16931. A PDF sent by email counts as an “other electronic invoice”, which is only allowed during the transition period."
  - q: "Can Revenue Cloud Billing create XRechnung or ZUGFeRD invoices?"
    a: "I found no Salesforce documentation for native EN 16931, XRechnung or ZUGFeRD output from Revenue Cloud Billing as of 9 November 2026. Salesforce documentation describes invoice PDFs. Ask Salesforce for a written statement and plan for an e-invoicing service or SAP."
  - q: "Does the German e-invoicing duty apply to export invoices?"
    a: "The German duty covers domestic B2B transactions between businesses established in Germany (seat, management or a permanent establishment involved in the supply). Invoices to customers abroad fall outside it, but other countries have their own rules, which your tax advisor should check."
draft: false
---

From 1 January 2027, German companies with more than €800,000 turnover in 2026 must send domestic business customers e-invoices, and from 1 January 2028 it applies to domestic B2B invoices in general. An e-invoice is a structured file, normally compliant with EN 16931, such as XRechnung or ZUGFeRD; a PDF by email no longer counts. If your invoices come from SAP, SAP handles the format work. If they come from Revenue Cloud Billing, you need a plan: Salesforce documentation describes invoice PDFs, and I found no native EN 16931 output in its public documentation as of 9 November 2026. Choose a route before the first invoice leaves Salesforce.

## What does the German e-invoicing duty require?

The rules come from the German VAT Act and guidance letters from the Federal Ministry of Finance. The [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094) and the [IHK Stuttgart](https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496) summarise them. The timeline for domestic B2B invoices:

```zeitleiste
2025-01-01 | Every domestic business must be able to receive e-invoices. Paper and, with consent, PDF are still allowed for sending.
2027-01-01 | Companies with more than €800,000 turnover in 2026 must issue e-invoices. Smaller companies may still send other invoices. EDI invoices remain allowed with the recipient's consent in 2027.
2028-01-01 | E-invoices for domestic B2B invoices in general. Small invoices up to €250 and some other cases stay exempt.
```

An e-invoice is an invoice "issued, transmitted and received in a structured electronic format" that follows EU directive 2014/55/EU and therefore, as a rule, the European standard EN 16931. According to the IHK Stuttgart, the ministry accepts XRechnung and ZUGFeRD from version 2.0.1, among others; the [ministry's FAQ](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html) excludes the ZUGFeRD profiles MINIMUM and BASIC-WL. Supplier and customer may also agree on another structured format, such as EDI, if the required data can be extracted completely and correctly into an EN 16931 format. A PDF invoice sent by email has counted as an "other invoice" since 2025.

Exceptions include invoices to consumers, small invoices up to €250, tickets and certain tax-exempt transactions. The law does not prescribe the channel: email, an interface or a portal download are all allowed. This is a summary for planning, not tax advice. Your tax advisor should confirm the details, including the [ministry's letter of 15 October 2026](https://www.ihk.de/osnabrueck/recht-und-fair-play/steuerrecht/aktuell/e-rechnung-bmf-veroeffentlicht-weitere-klarstellungen-7217772) with further clarifications.

## Almost every domestic invoice of a manufacturer is affected

Most invoices to business customers established in Germany are affected, apart from the exceptions above: machines, spare parts, service visits, maintenance contracts and subscriptions. For a machine builder with German dealers and end customers, that is most of the domestic volume. Invoices to customers abroad fall outside the German duty, but other countries have their own rules.

The €800,000 threshold applies to the business that issues the invoice. A group with several German companies checks each one, unless they form a VAT group (Organschaft): then the turnover of the whole VAT group counts. A legal entity in Salesforce Billing need not match that tax unit, so map the Salesforce legal entities to the tax units before you decide which invoices are affected in 2027 and which only in 2028. For a typical machine builder the answer is simple: above the threshold, so the duty starts on 1 January 2027.

## What does Revenue Cloud Billing deliver today?

Revenue Cloud Billing creates invoices from billing schedules. Salesforce Help and the Winter '27 developer documentation list it under Revenue Management, formerly Revenue Cloud; the license is still called Revenue Cloud Billing. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/generate-invoices-revenue), you generate a batch of invoice PDFs from an invoice run with "Generate Invoice Documents", or a single PDF with Flow, Apex or OmniScript, and send posted invoices by email to the bill-to contact. The [InvoiceDocument object](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_invoicedocument.htm) "represents the PDF document generated for an invoice". The [product page](https://www.salesforce.com/sales/revenue-cloud-billing/) names "Invoicing Engine & Document Production".

None of these sources mentions EN 16931, XRechnung, ZUGFeRD or Peppol, and I found no other public Salesforce documentation for native e-invoice output as of 9 November 2026. That does not rule out a roadmap or contract option, which is why you need a written statement. A community post on [UnofficialSF](https://unofficialsf.com/e-invoicing-with-revenue-cloud/) from October 2025 describes e-invoicing with Revenue Cloud as an extension: a posted invoice publishes a platform event, middleware such as MuleSoft maps the data to a format like UBL or Factur-X/ZUGFeRD, and an external provider delivers it, for example through Peppol. That is one author's approach, not product documentation.

```hinweis offen
So treat e-invoicing as a gap you have to close, and ask Salesforce for a written statement on what Billing supports for Germany and when.
```

## SAP, an e-invoicing service or a partner app

I see three routes, and the right one depends on where your invoices come from today.

| Route | How it works | When it fits |
|---|---|---|
| Invoice from SAP | Revenue Cloud sends billing data to SAP, and SAP issues the e-invoice | SAP already produces e-invoices and the recurring volume is small |
| E-invoicing service | Billing posts the invoice, middleware maps it to XRechnung or ZUGFeRD, a service validates and delivers it | Billing invoices recurring revenue, and you want one channel for all invoices |
| Partner app | An app in the org creates the structured file from the invoice | An app covers your formats and you accept another vendor in the org |

**Invoice from SAP** keeps one invoicing system for compliance. SAP offers e-invoicing for Germany in [SAP Document and Reporting Compliance](https://blogs.sap.com/2022/08/05/meet-your-german-customers-request-electronic-invoices-attached-to-e-mails/), including XRechnung by email and via Peppol. What is supported depends on the SAP release, deployment and setup, so ask your SAP team which scenario is licensed and running. Customer data, routing and monitoring still span both systems. The price is that every amendment in Revenue Cloud has to reach SAP before the next invoice run. The trade-offs are in [Revenue Cloud Billing or SAP](/en/blog/revenue-cloud-billing-or-sap-invoicing/).

**An e-invoicing service** keeps Billing as the invoicing system. I would choose a service that also handles SAP's invoices, so every invoice goes through the same validation, routing and monitoring, whichever channel a customer uses. The integration is a standard integration project with an owner, monitoring and error handling, the kind of work I describe in [Salesforce integration](/en/services/salesforce-integration/).

**A partner app** keeps the logic inside the org, but adds another vendor to every Salesforce release. Check which formats and versions it supports, how it validates, how it handles credit memos and who fixes issues when a release breaks something.

## Worked example: remote monitoring subscriptions from mid-2027

A machine builder with €60 million turnover invoices machines and spare parts from SAP, which already issues e-invoices. From mid-2027 it plans to invoice remote monitoring subscriptions from Revenue Cloud Billing.

The duty already applies when the first Billing invoice goes out, so there is no transition period for the new process. I would not start issuing Billing invoices as PDFs and fix the format later. Either the subscription invoices run through SAP in the first year, or Billing is connected to the e-invoicing service that SAP's invoices already use. Which of the two depends on how often subscriptions change, as described in [who owns what in quote to cash](/en/blog/revenue-cloud-sap-quote-to-cash-ownership/).

## Threshold and invoice source per company

1. **Threshold per invoicing business.** Which German companies issue invoices, do any of them form a VAT group, and is each one subject to the duty from 2027 or 2028?
2. **Invoice source per revenue type.** Which invoices leave Salesforce, and which leave SAP?
3. **Format and channel per customer.** XRechnung or ZUGFeRD, email, Peppol or portal, agreed with the main customers.
4. **Field mapping.** Map every required invoice element to its source in Salesforce, SAP, the tax engine or the e-invoicing service, with your provider or tax advisor.
5. **Validation and errors.** Validate before sending, and specify who fixes a rejected invoice.
6. **Credit memos.** Clarify with your tax advisor how credit memos and corrections are issued.
7. **Archiving.** Clarify where the structured file is archived.
8. **Statement from Salesforce.** Written, with the date you received it.

Points 1 and 2 determine whether Billing has to issue e-invoices at all and when it must start. You need the other points before go-live, and you can start point 8 today. The cost side of invoicing from Salesforce is covered in [Revenue Cloud Billing costs](/en/blog/revenue-cloud-billing-costs/), and the masterclass chapter [billing and usage-based pricing](/en/masterclass/revenue-cloud/billing-and-usage-based-pricing/) places e-invoicing in the context of the whole quote-to-cash process.
