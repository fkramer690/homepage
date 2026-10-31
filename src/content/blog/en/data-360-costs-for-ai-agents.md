---
title: "Data 360 costs for AI agents: catalogues and manuals"
description: "What Data 360 charges when an Agentforce agent reads spare part catalogues and manuals: processing per MB, parser choice, queries, re-indexing and sandbox."
pubDate: 2026-10-27
lang: en
slug: data-360-costs-for-ai-agents
translationKey: data-360-costs-for-agents
topic: data
categories: [ai]
contactBrief: licences
tags: [data 360, agentforce, flex credits, grounding, spare parts, manufacturing]
takeaways:
  - "Data 360 bills processing per MB when a document is indexed, queries per million rows on every search, and storage for files, chunks and index objects."
  - "LLM parsing for catalogues with exploded drawings is billed as Intelligent Processing at 600 credits per MB, four times the default parser."
  - "In the worked example, the agent's searches cost about 14,400 credits a month, while 400 MB of changed documents cost 195,000."
  - "A change to one field on a source record reindexes all its attachments, so catalogues should not hang on records an ERP interface updates nightly."
  - "Data 360 has no volume tiers in a sandbox: 6,000 MB of catalogues with LLM parsing cost 2.88 million credits there, more than 2.22 million in production."
faq:
  - q: "What does Data 360 cost per MB of documents?"
    a: "The Flex Credits rate card charges 150 credits per MB for unstructured processing and 600 per MB for intelligent processing such as LLM-based parsing, in the base tier. At $500 per 100,000 credits that is $0.75 and $3 per MB. Higher monthly volumes get lower rates per usage type."
  - q: "Do agent searches in Data 360 cost credits?"
    a: "Yes. Queries cost 3 credits per million rows in the base tier. For vector search Salesforce counts the vectors in the search index, for hybrid search the vectors and the keyword records, so hybrid search roughly doubles the rows counted."
  - q: "Is a document billed again when it changes?"
    a: "Yes, a changed document is processed again. If the search index is built on records with file attachments, a change to a field or to one attachment reindexes all attachments of that record."
  - q: "Are Data 360 credits included in Salesforce's Agentforce cost examples?"
    a: "No. The Agentforce pricing page notes for its examples that they do not include Data 360 credits or other consumption services, so budget them separately."
  - q: "How can I test document grounding without a large bill?"
    a: "Use a representative sample. Data 360 in a sandbox has no volume tiers, so a full catalogue costs more there than in production. Intelligent Context lets you test a configuration with up to five files."
draft: false
---

Data 360 costs for AI agents come mostly from documents that change, not from the agent asking. When an Agentforce agent reads spare part catalogues, manuals and service bulletins, Data 360 charges 150 Flex Credits per MB to index a document with the default parser and 600 per MB with LLM-based parsing. Searches cost 3 credits per million rows. In the worked example below, the agent's searches cost about $72 a month, while re-indexing changed documents costs almost $1,000. The levers are the parser, the document scope and where the files are stored.

## What does Data 360 charge when an agent reads documents?

An agent does not read a PDF directly. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud), Data 360 splits the document into chunks, turns each chunk into a vector embedding and stores it in a search index. At runtime a retriever fetches the matching chunks for the prompt. Salesforce's [billing notes for Agentforce Coworker](https://developer.salesforce.com/docs/data/agentforce-coworker/guide/agentforce-coworker-billing-considerations.html) put it in one line: Data 360 consumes credits "to process, semantically index, and query content". How Data 360 assembles context beyond documents is covered in [the Agent Context Engine explained](../salesforce-agent-context-engine-explained/).

Three meters follow from this:

- **Processing per MB** whenever a document is indexed or indexed again, split into Unstructured Processing and Intelligent Processing. According to the [help article on unstructured data billing](https://help.salesforce.com/s/articleView?id=data.c360_a_unstructured_data_billing_considerations.htm&language=en_US&type=5), chunking and vectorising count only once, so a 100 MB PDF is billed as 100 MB.
- **Queries per million rows** each time the agent searches.
- **Storage.** Every ingested file counts toward Data 360 storage, and so do the chunk and index objects created for the search index.

```kennzahlen
150 | credits per MB of Unstructured Processing, base tier
600 | credits per MB of Intelligent Processing, base tier
3 | credits per million rows queried, base tier
source: [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), as of 31 August 2026
```

Rates fall with volume: above 300,000 credits a month they drop in three steps to a fifth, for unstructured processing 30 credits per MB above 12.5 million credits. Tiers apply per usage type and reset on the first day of each calendar month. Flex Credits cost [$500 per 100,000](https://www.salesforce.com/agentforce/pricing/), and the same page notes for its Agentforce examples that Data 360 credits are not included. That is why these numbers rarely make it into the first estimate.

## Default parser or LLM parsing: why do catalogues cost four times as much?

A spare part catalogue is mostly exploded drawings with position numbers and tables of part numbers. The default parser extracts text. For multimodal documents [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-process-content/use-rag-to-bring-unstructured-data-to-agentforce) describes an LLM-based parser, a Docling parser for nested tables and image processing for diagrams. The help article sets out the billing:

- **LLM-based parsing:** the entire document goes to the LLM, and its full size is billed as Intelligent Processing.
- **LLM-based visual preprocessing:** only documents that contain visual elements or tables are billed as Intelligent Processing, the rest as Unstructured Processing.
- **Image processing:** the entire document is billed as Intelligent Processing.

The [list of Data 360 usage types](https://help.salesforce.com/s/articleView?id=data.c360_a_data_usage_types.htm&language=en_US&type=5) also names Intelligent Context, the workspace for trying parsing and chunking settings, among the features billed as Intelligent Processing. For catalogues, "only documents with visual elements" means almost every document, so visual preprocessing saves little there. For operating manuals that are mostly text, the default parser is often enough. I would decide per document type and test retrieval quality on a sample, because 600 against 150 credits per MB is the biggest single lever in the estimate.

## Worked example: after-sales documents at a machine builder

Assume a machine builder whose agent answers dealers and service reps on spare parts and maintenance. All volumes below are assumptions to show the method; the rates come from the rate card at list price.

- 6,000 MB of spare part catalogues as PDF, parsed with LLM-based parsing
- 3,000 MB of operating and maintenance manuals plus 200 MB of service bulletins, default parser
- about 300,000 chunks in a hybrid search index
- 4,000 conversations a month with two searches each
- 300 MB of changed catalogues and 100 MB of other changed documents per month

| Item | Calculation | Credits |
|---|---|---|
| Initial load, catalogues | 500 MB × 600, 2,500 × 480, 3,000 × 240 | 2,220,000 |
| Initial load, manuals and bulletins | 2,000 MB × 150, 1,200 × 120 | 444,000 |
| **Initial load in one month** | | **2,664,000 ($13,320)** |
| Monthly updates | 300 MB × 600 + 100 MB × 150 | 195,000 |
| Monthly searches | 8,000 × 600,000 rows × 3 per million | 14,400 |
| **Running cost per month** | | **209,400 ($1,047)** |

For the searches I assume each query counts the whole index. The help article says that for hybrid search "the number of vectors and keyword records in the search index are counted", and that a typical index has as many keyword records as vectors. Salesforce's own [pricing example](https://www.salesforce.com/data/pricing/agentforce-use-case/) assumes a query scans 20 percent of the unstructured data, so my figure errs on the safe side.

Three results stand out. Searches are 7 percent of the running cost. With the default parser for the catalogues too, the initial load would cost 1,164,000 credits instead of 2,664,000. And the first year comes to about 5 million credits, more than the 2.75 million Flex Credits per org per year that Salesforce lists for Max Edition, before a single agent action. The agent side of the bill is in [what a dealer service agent costs](../dealer-service-agent-cost-calculation/).

## The hidden Data 360 costs

### Re-indexing whole records

```hinweis achtung
The help article treats a source record and all its file attachments as one unit. If a field on that record or one attachment changes, all attachments are reindexed.
```

Picture catalogues attached to product records that the SAP interface updates with prices or stock every night. If that reprocessed all catalogues just once a week, the month would carry 24,000 MB of Intelligent Processing: about 6.5 million credits or $32,700 instead of the planned 195,000. I would keep documents on objects or in a Data Library that no interface touches, and test this in the sandbox before go-live.

### Tiers reset every month

Because tiers restart each month, timing matters. The initial load above costs 2,664,000 credits in one month. Spread over three months, the same documents cost about 3.54 million, $4,380 more. I plan the initial load as one batch in one calendar month.

### Sandbox without tiers

In a sandbox, Data 360 has no volume tiers: 120 credits per MB unstructured, 480 intelligent. Indexing all 6,000 MB of catalogues there costs 2.88 million credits, more than the 2.22 million in production. [Intelligent Context](https://developer.salesforce.com/docs/ai/power-agentforce-visual-data/guide/aes-configure-data-360.html) lets you test a configuration with up to five files, and a 150 MB sample in the sandbox costs 72,000 credits. That is enough to compare parsers.

### Enriched indexing

Enriched indexes use an LLM to generate additional chunks, and [Trailhead](https://trailhead.salesforce.com/content/learn/modules/search-index-types-data-cloud-quick-look/get-to-know-search-index-types-in-data-cloud) says an enriched index creates three new chunks. The help article bills these LLM calls as Standard Prompts at 4 credits per 2,000 tokens. If each of the 300,000 chunks needs one such call, enrichment adds 1.2 million credits, and the larger index raises the rows each search counts. Trailhead ties it to measurable value from better retrieval.

### Hybrid search

Trailhead recommends hybrid search for long queries with specific search terms, and part numbers and error codes are exactly that. Building the index costs the same for vector and hybrid search, but each hybrid query counts vectors and keyword records, so roughly twice the rows. At 14,400 credits a month I would pay that for correct part numbers.

## Which content does not belong in the index?

The cheapest megabyte is the one you never process.

- **Stock, prices and delivery dates.** These live in the ERP and change daily. The agent should read them through an API action, as described in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/), not from an indexed price list. Why the ERP owns spare parts stock is explained in [spare parts between ERP and Field Service](../salesforce-field-service-spare-parts-erp/).
- **Superseded catalogue versions.** With both versions in the index you pay twice, and the agent may quote an old part number.
- **Files above the Data Library limits.** Trailhead lists [100 MB per PDF and 4 MB per text or HTML file](https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/build-a-file-based-data-library-for-an-agent), and the data source of a library cannot be changed later. Large catalogues need splitting, ideally by product line.
- **Documents nobody asks about.** Start with the catalogues behind the most frequent dealer enquiries.

## Measure the documents in MB per type

1. **Measure the documents in MB per type**, after removing old versions and duplicates.
2. **Choose the parser per type** using a sample in Intelligent Context or the sandbox.
3. **Check where the files hang** and whether an interface updates those records.
4. **Plan the initial load** as one batch in one calendar month.
5. **Estimate monthly changes**, not only the initial volume.
6. **Calculate queries** as searches × rows in the index, doubled for hybrid search.
7. **Set alerts in [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/)**, which tracks consumption down to agent, action and channel, and compare with the estimate after four weeks.

How to plan credits across all meters is covered in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/). Whether this budget belongs in Salesforce at all is part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/).
