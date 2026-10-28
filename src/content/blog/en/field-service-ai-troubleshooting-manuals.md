---
title: "Field Service AI troubleshooting: fix the manuals first"
description: "What a machine builder must do with manuals, bulletins and knowledge articles so the Field Service troubleshooting agent answers per variant and serial number."
pubDate: 2026-10-27
lang: en
slug: field-service-ai-troubleshooting-manuals
translationKey: field-service-ai-troubleshooting-manuals
topic: field-service
categories: [field-service, ai]
tags: [field service, agentforce, knowledge, data 360, grounding, manufacturing]
takeaways:
  - "A Field Service troubleshooting agent finds text that matches the question; it only knows which manual belongs to which machine if every document carries the same product key as the asset."
  - "Service bulletins and retrofits need a serial number range or build state as a field, otherwise the agent applies them to every unit of a machine type."
  - "Keep one valid version per variant and build state in the index; Knowledge replaces the published version on republishing, a file library keeps every file until someone deletes it."
  - "A Data Library holds one source and filters Knowledge only by data category; once several variants share an index, the variant key belongs in a filter field of an advanced Data 360 setup."
  - "Maintenance procedures with fixed steps belong on the work type, where they appear on every matching work order, and stock, prices and raw email threads stay out of the index."
faq:
  - q: "Which sources does the Field Service troubleshooting agent use?"
    a: "According to Salesforce's announcement of April 2025, it queries product manuals, similar repairs and sensor data plus previous chats and emails, and guides the technician step by step, also using photos. On-site troubleshooting was scheduled as generally available in June 2025."
  - q: "Can an Agentforce Data Library filter manuals by serial number?"
    a: "Not per question on the pages I checked. A Knowledge library can limit search to selected data categories for the whole library. Filters on individual fields such as a variant key or serial range need retriever filters on a Data 360 search index with defined filter fields."
  - q: "Should old manual versions stay in the index?"
    a: "Only if machines in the field still run that build state, and then with a serial number range so the agent can tell them apart. Superseded versions and replaced service bulletins go out, because the agent cannot judge which version is current."
  - q: "Can the agent read wiring diagrams and exploded drawings?"
    a: "Not with a standard Data Library: Salesforce's help article says Data Cloud chunks text only, not images. LLM-based parsing in Data 360 sends whole documents to an LLM and is billed at 600 instead of 150 Flex Credits per MB."
draft: false
---

A Field Service troubleshooting agent gives a technician the right answer only if it can tell which manual applies to the machine on site. Salesforce supplies the agent, the document model is the machine builder's job. Every manual, service bulletin and knowledge article needs the product key the asset already carries, plus a serial number range where a bulletin covers some units only. The index holds one valid version per variant. A Data Library is enough for one product line; once variants share an index, I would use the advanced Data 360 setup with filter fields.

## What does the Field Service troubleshooting agent read?

Salesforce announced on-site troubleshooting in April 2025 as part of [Agentforce for Field Service](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) and scheduled it as generally available in June 2025. According to the announcement, the agent queries "product manuals, similar repairs, and sensor data" as well as "previous chats and emails", and guides the technician through each step in a dialogue, photos included. The [Field Service product page](https://www.salesforce.com/service/field-service-management/) says Agentforce can "surface answers from your internal and external knowledge base". Which functions are live and what they cost is covered in [AI agents in Field Service: what works today](../field-service-ai-agents-what-works-today/).

None of the pages I opened explains how the agent picks the manual for a given asset. The mechanics are documented: according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud), Data 360 chunks documents, embeds the chunks in a search index, and a retriever, "the link between the prompt and the search index", fetches the chunks closest to the question. Whether a chunk describes variant A or variant B plays no role unless the document carries that information as data.

## Why do machine builders' manuals confuse an agent?

A machine builder rarely has one manual per product. Take a machining centre in three variants, with a new control from a certain build year, a retrofit on some units and a service bulletin for serial numbers 4100 to 4380 only. A technician asks about spindle alarm 2041. If three manual versions describe that alarm differently, the retriever returns the chunk that fits the wording best, and the agent presents the wrong procedure as confidently as the right one.

Two more traps are specific to industrial documents:

- **Drawings.** The [help article on Data Libraries](https://help.salesforce.com/s/articleView?id=004333412&language=en_US&type=1) states that Data Cloud "only chunks on text and not images of your files", so wiring diagrams and exploded views stay invisible. LLM-based parsing sends the entire document to an LLM; the [billing notes](https://help.salesforce.com/s/articleView?id=data.c360_a_unstructured_data_billing_considerations.htm&language=en_US&type=5) count it as Intelligent Processing, 600 credits per MB on the [rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) instead of 150. The cost side is in [Data 360 costs for AI agents](../data-360-costs-for-ai-agents/).
- **Supplier components.** A gearbox inside the machine comes with the supplier's manual. It belongs to that component, which may sit in two of your product lines.

## How do you link manuals to the asset and serial number?

The asset is the anchor. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets), an asset "represents a specific purchased or installed product", can be linked to a product record, and an asset hierarchy built with the Parent Asset field groups a machine's components. The document model should reuse exactly these keys. I would give every document these attributes:

| Attribute | Example | Purpose |
|---|---|---|
| Product or variant key | the code on the asset's product | narrows the search to the machine type |
| Serial range or build state | 4100 to 4380 | bulletins and retrofits apply to some units only |
| Document type | manual, bulletin, procedure | a bulletin overrides the manual |
| Component | gearbox, control | supplier manuals follow the child asset |
| Language | EN, DE | one answer language per technician |
| Status and valid from | released, March 2026 | superseded states stay out |

The key has to be the one the asset already carries. If the asset says "MC-800" and the PDF is called "Machining centre 800 Rev C", nothing links the two. That is the master data question from [master data for scheduling](../salesforce-field-service-master-data/): if many assets have no product link, no document model fixes the answers.

Maintenance procedures with fixed steps need no search at all. Knowledge articles can be attached to work types, and according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_center/field_service_center_worktypes) "a work type's attached articles show up on work orders and work order line items that use the work type." For a planned 2,000-hour service I would attach the procedure there and leave the unplanned fault to the agent.

## Which manual versions should the agent see?

Salesforce Knowledge handles versions better than files. According to the [Knowledge developer guide](https://developer.salesforce.com/docs/service/salesforce-knowledge-dev-guide/guide/knowledge-development-object-managing-articles.html), updating a published article creates a draft that replaces the former version once published. The help article on Data Libraries adds that with "Use Public Knowledge Articles" enabled, the library returns only chunks from published articles. For a file library I found no such mechanism: an uploaded PDF stays until someone removes it.

The rules I would set:

- **One valid version per variant and build state.** An older version stays only while machines in the field run that state, and then with its own serial range.
- **Superseded bulletins go out** or are merged into the current manual.
- **One owner per product line** in service releases document changes like master data.

## Data Library or advanced Data 360 setup?

Trailhead describes two paths. The Agentforce Data Library takes Knowledge articles, files or web search, supports only unstructured data, and "each library can only contain one data source". The advanced Data 360 setup combines structured and unstructured sources and "takes more time, but gives you more control". For manuals these facts decide:

```pro-contra
pro: Data Library
- Quicker to set up than the advanced setup
- Fits a pilot on one product line with one current state of its manuals
contra: What you give up
- The source of a library cannot be changed later, according to the [Trailhead unit on file-based libraries](https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/build-a-file-based-data-library-for-an-agent)
- At most 100 MB per PDF and 4 MB per text or HTML file, and PDFs with embedded content are not supported according to the help article
- A Knowledge library filters by data category only for the whole library, not per question
- Only a Data 360 retriever can "set filters to target specific subsets of your data", and [only if the search index has defined filter fields](https://trailhead.salesforce.com/content/learn/modules/agentforce-specialist-certification-maintenance-summer-25/learn-whats-new-with-agentforce-and-data-cloud), with up to 10 conditions on text or number fields
```

My reading: once several variants share an index, variant key and serial range become filter fields in the advanced setup. Whether the filter value can come from the asset on the work order at runtime is not described on the pages I opened, so I would test it in a sandbox before committing. How Data 360 assembles context beyond documents is covered in [the Agent Context Engine explained](../salesforce-agent-context-engine-explained/).

## What should stay out of the index?

- **Stock, prices and delivery dates.** They change daily and belong to the ERP. Why the ERP owns parts stock is covered in [spare parts between ERP and Field Service](../salesforce-field-service-spare-parts-erp/).
- **Superseded versions and drafts**, for the reasons above.
- **Raw email threads and chats.** The announcement lists them as a source. I would index resolved cases with clean fault and fix fields instead, which also keeps customer contacts and technician names out of the index.
- **Documents on records an interface updates.** According to the billing notes, a data model object and all its file attachments are treated as a single unit for processing, so a change to a field or attachment can trigger reindexing of every attachment of that object.
- **Machines you no longer service.** Every megabyte costs credits and adds a candidate for a wrong match.

## A typical scenario: four product lines, 1,500 machines

Assume a machine builder with four product lines, 1,500 machines under contract, Field Service live and 3,000 MB of manuals as PDFs. All numbers are assumptions.

The inventory finds two to four versions per manual; 1,100 MB are current states for machines still in the field. Of 180 service bulletins, 60 are superseded, and 15 percent of the assets have no product link.

The order of work: link those assets to products, tag the 1,100 MB with variant key, serial range, type and language, move the 120 valid bulletins into Knowledge with serial range fields and attach the 25 standard maintenance procedures to their work types.

Indexing 1,100 MB instead of 3,000 MB with the default parser costs 165,000 credits instead of 450,000 per full run at the base rate of 150 credits per MB, $825 instead of $2,250 before volume tiers at [$500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/). The larger effect shows in testing with 50 real fault cases per product line and known correct answers, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). The pilot runs on a Data Library for the product line with the best documents; the second product line triggers the move to the advanced setup.

## Where should you start?

```schritte
Count documents
  Per product line: versions, languages, megabytes.
Check product links
  For every asset in the installed base.
Define document attributes
  With the keys the asset already carries.
Remove superseded versions
  And name an owner per product line.
Choose the path
  Data Library for one product line, filter fields for several.
Test with real faults
  Before any technician sees the agent.
```

The document model outlives any agent version, so I treat it as part of [Salesforce architecture](../../services/salesforce-architecture/). The wider picture is in the masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).

The troubleshooting agent is only as precise as the link between manual and serial number, so build that link before you switch the agent on. If you want a second opinion on your document model, [send me a message](#contact).
