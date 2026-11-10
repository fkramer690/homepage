---
title: "Salesforce Service Documents: is Document Builder enough?"
metaTitle: "Salesforce Document Builder for Field Service reports"
description: "What Salesforce Service Documents and Document Builder do in Field Service, what they cost, where the limits are and when manufacturers need another tool."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: salesforce-service-documents-document-builder
translationKey: service-documents-document-builder
topic: field-service
categories: [field-service]
tags: [field service, service documents, document builder, document generation, manufacturing]
takeaways:
  - "Service Documents are PDFs that Field Service creates from work orders, line items and appointments, using templates built in Document Builder."
  - "Document Builder comes with the Dispatcher and Mobile licenses. The org gets 250 documents a month for each such user, plus a one-time 10,000 for peaks."
  - "Its strength is the on-site service report: customer signatures, photos and creation in the mobile app, including offline."
  - "Field Service templates cover three objects, PDF only, with show and hide rules per component. Complex logic, machine files and batch runs need another tool."
  - "Check your existing reports, your iOS and Android devices and your document volume against the limits before you buy an extra tool."
faq:
  - q: "What are Salesforce Service Documents?"
    a: "Service Documents are PDFs that Salesforce Field Service creates for a work order, work order line item or service appointment. The templates are designed in Document Builder, and the result is stored as a service report record on the job."
  - q: "Does Document Builder cost extra in Field Service?"
    a: "No. Document Builder comes with the Field Service Dispatcher and Field Service Mobile permission set licenses. The org gets an allowance of 250 documents per month for each such user. The Salesforce Help page on permissions excludes Contractor and Contractor+ licenses."
  - q: "Do Service Documents work offline in the Field Service mobile app?"
    a: "Yes. Technicians can create service documents in the mobile app without a connection, including signatures. Salesforce Help is inconsistent on Android: the limits page allows only service appointment templates, while the template page allows all three objects. Test it on your devices."
  - q: "When do I need Salesforce Document Generation instead of Document Builder?"
    a: "When you need Word templates with complex logic, DOCX or PowerPoint output, documents on assets or custom objects, batch generation or a DocuSign integration. Document Builder covers none of these; it can only show or hide components by criteria."
  - q: "Can a flow create a Document Builder document?"
    a: "Yes. The action createServiceDocument, available from API version 60.0, creates a service document from a flow or through the REST API. That helps when the report should be created automatically, for example when the work order is closed, rather than only when the technician taps the button."
---

Salesforce Service Documents are the PDFs that Field Service creates from a work order or a service appointment: the service report with working time, spare parts, photos and the customer's signature. The templates are built in Document Builder, which comes with the Field Service licenses at no extra cost. For the classic service report on site, even offline, that is the right choice. Simple conditions work too, because every component can be shown or hidden by criteria. For asset-related documents, Word output, batch runs or inspection reports whose logic goes beyond showing or hiding components, you need Salesforce Document Generation or an AppExchange tool.

## What are Salesforce Service Documents?

A Service Document is a PDF that Salesforce Field Service generates for one of three records: a work order, a work order line item or a service appointment. Salesforce stores the result as a service report record on the job, so the document sits where the dispatcher and the back office look for it.

Document Builder is the editor for the templates. It runs inside the Lightning App Builder and works with drag and drop: standard components for fields, tables of related records, image galleries and signature blocks. When a standard component is not enough, developers can build their own Lightning Web Components. Salesforce points out that these need their own print styling, so components from the mobile app cannot simply be reused.

Salesforce introduced Service Documents in the Spring '24 release. Help now calls the product Agentforce Field Service and Operations; the feature names have stayed the same. The matching action `createServiceDocument` is available from API version 60.0, which means you can also trigger documents from a flow or through the REST API. The [developer documentation for the action](https://developer.salesforce.com/docs/atlas.en-us.api_action.meta/api_action/actions_obj_create_service_document.htm) also lists quote document types, including one for Field Service quotes. Salesforce uses Document Builder for quote PDFs in Revenue Cloud as well. How quotes work there is covered in [chapter 3 of the Revenue Cloud masterclass](../../masterclass/revenue-cloud/quote-contract-order/).

Do not confuse the name with S-Docs. S-Docs is a separate product on the AppExchange and has nothing to do with this feature.

## Document Builder comes with the Field Service licenses

Nothing extra: Salesforce lists Document Builder as included in the Field Service SKUs. According to the [Salesforce Help on permissions](https://help.salesforce.com/s/articleView?id=fs_document_builder_perm_sets.htm&language=en_US&type=5), users need either the Field Service Dispatcher or the Field Service Mobile permission set license.

```hinweis achtung
The permissions page excludes Contractor and Contractor+ licenses, which matters if you plan to give documents to subcontractors. Test it in your org before you base your rollout on partner technicians.
```

The volume is limited:

```kennzahlen
250 | documents per month for each Dispatcher, Dispatcher Plus or Mobile user, pooled for the org
10,000 | documents as a one-time allotment once the org exceeds its monthly allowance
source: Salesforce Help on Document Builder and on Field Service limits
```

The allowance is calculated at org level: 40 technicians and 4 dispatchers provide 11,000 documents a month. A technician with five jobs a day and 21 working days creates about 105 reports a month, well below the per-user allowance. It gets tight when every job produces several documents, for example a service report plus a checklist plus a corrected version after a customer complaint.

Setup itself is quick. You enable Document Builder in the Field Service Settings and wait for the email that confirms the org registration. Then you give dispatchers and technicians the permissions, either through the standard permission sets or a permission set with the system permissions "Document Builder" and "Lightning SDK for Field Service Mobile". The template field also has to be on the page layouts of work order and service appointment, otherwise nobody can pick a template. One rule determines how migration works: each user gets either classic service reports or Document Builder, not both; with Document Builder, the Service Report button disappears for that user.

## What can Service Documents do in the field?

Document Builder is strongest at the customer site, next to the machine:

- **Offline creation.** Technicians create the document in the Field Service mobile app, including without a connection. Connectivity gaps like that happen every day in factory halls or basement plant rooms.
- **Signatures.** Each template supports signature types such as customer and technician. If two people of the same role have to sign, you number the types (Customer1, Customer2).
- **Photos.** Image galleries show what the technician photographed, for example the state before and after the repair.
- **Related records.** Tables show up to 1,000 related records, for example the spare parts used or the work steps.
- **Translations.** Templates can be translated into many languages, German included. For manufacturers with service teams in several countries, that avoids separate templates for each language.

```staerken-grenzen
title: Document Builder: strong for the service report on site
+ Signature | customer and technician, also offline in the mobile app
+ Photos | image galleries, e.g. before and after the repair
+ German translation | one template for several countries
+ Included | in the Field Service license, an org allowance of 250 documents per user per month *
- Format | PDF only and synchronous only
- Objects | only work order, work order line item and service appointment
- Android | Help is inconsistent, test it
- Size | maximum 50 pages and 100 MB
- Logic | show and hide per component, nothing beyond that
better: For complex inspection reports, machine files and batch runs: Salesforce Document Generation or an AppExchange tool.
```
## The limits: PDF only, three objects, simple conditions

The [Field Service limits page](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) lists them. The ones that matter in manufacturing projects:

- **Only three objects.** Templates exist for work order, work order line item and service appointment. A maintenance record on the asset or a document on a custom object is not possible.
- **Android needs a test.** The limits page allows work order and service appointment templates on iOS, but only service appointment templates on Android. The [page on creating templates](https://help.salesforce.com/s/articleView?id=service.fs_create_service_document_templates.htm&language=en_US&type=5) lists all three objects on both platforms. If your technicians use Android devices, test your templates on them before you settle on a template strategy.
- **The wrong template on mobile.** When a technician creates a document from the work order on a mobile device, the app offers the service appointment template. Cover this in training, or build only service appointment templates.
- **PDF only, synchronous only.** No Word output, no batch runs, for example to send all maintenance reports of a contract at the end of a quarter.
- **Size.** At most 50 pages and 100 MB per document. That is enough for a service report, but too little for the documentation of a whole production line.
- **Display gaps.** Lookup fields in related lists show record IDs instead of names, image URLs are not rendered, rich text prints only in black, long text fields cannot be used in related lists. Formula fields often help, but you have to know this before the template workshop.
- **Translation.** In rich text only custom labels are translated. Right-to-left layouts are not supported.

Conditional logic is more limited than in a document generation tool. According to the [Help page on standard components](https://help.salesforce.com/s/articleView?id=service.fs_document_builder_standard_components.htm&language=en_US&type=5), every component can be shown only under specific criteria, so "show the pressure test only for this machine type" works. Calculations, repeated blocks per checkpoint or a document structure that changes per variant are a different matter. If your inspection reports work like that today, check them against that show or hide model first. Five smaller gaps, from template choice to email, can be closed with flows and components; I describe them in [Document Builder: five limits and workarounds](../salesforce-document-builder-limits-workarounds/).

## What I see in tool selections

I regularly support clients in make-or-buy decisions, and document generation with e-signature is one of the recurring topics. My approach is the same every time: first, an inventory of all documents with volume, data source and signatories; then, an analysis of the long-term cost. That means licenses for every user group, implementation, maintenance for every Salesforce release and the follow-up costs if you have to switch later.

Applied to Field Service, the inventory splits into two groups. The service report from the field is the large group by volume, and Document Builder covers it. The smaller group contains the documents with complex logic: certain inspection reports, certificates, contract documents. Simple quotes can stay in Document Builder. For this group, a second tool is often justified. The mistake I want to avoid is buying the full tool for everything because of the small group, and paying for licenses for every technician who only ever needs the service report.

Organizations with many short jobs also produce the most service reports, so the standard functionality covers the bulk of the volume where it matters most.

## Document Builder or Document Generation?

- **Classic service reports.** The older template editor in Field Service. Proven and simple, up to 20 signature blocks, but little design freedom. Section titles cannot be translated and the action is not available in the Salesforce mobile app.
- **Salesforce Document Generation.** Word templates with tokens and conditional sections, for all standard and custom objects, output as PDF, DOCX or PPTX, synchronous and batch, DocuSign integration. Not available offline or on mobile. Some SKUs include it, such as industry clouds and Revenue Cloud Advanced, otherwise it needs its own license; Salesforce compares the two in the [help article on Document Builder and Document Generation](https://help.salesforce.com/s/articleView?id=ind.sf_docgen_understand_doc_builder_and_doc_generation.htm&language=en_US&type=5).
- **OmniStudio Document Generation.** Like Document Generation, plus external data through DataRaptors and Integration Procedures. Requires OmniStudio, which comes with the industry clouds and some Revenue Cloud editions.
- **AppExchange tools** such as S-Docs, Conga Composer or Nintex DocGen. Mature template logic, many formats, e-signature connectors. They cost extra per user and add a tool to your operations. Check offline support and prices with the vendor before you decide.

The combination that often makes sense: Document Builder for everything the technician creates on site, and one document generation tool for the office, licensed only for the users who need it.

## Collect today's reports with their volume

1. **Collect your current reports.** Every paper form and every PDF your technicians and the service office create today, with the volume per month.
2. **Check them against the limits above.** Object, conditional logic, page count, output format, who signs.
3. **Check your devices.** iOS or Android decides which templates you can use on mobile.
4. **Build one template in Document Builder**, usually the standard service report, and test it with two technicians in a real job, including offline.
5. **Only then plan a second tool**, for the documents that failed in step 2, and calculate it over several years instead of the first-year price.

In most Field Service projects, the standard functionality covers the service report, and the extra tool is justified for a short list of documents with complex logic. For more on what the new mobile features mean for technicians, see [my article on guided work and voice in Field Service](../salesforce-field-service-mobile-guided-voice/).
