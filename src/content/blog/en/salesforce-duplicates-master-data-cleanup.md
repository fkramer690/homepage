---
title: "Salesforce duplicates: clean master data before AI"
description: "How manufacturers find, clean up and prevent duplicate accounts, contacts and assets in Salesforce before an AI agent starts working with the data."
pubDate: 2026-10-29
lang: en
slug: salesforce-duplicates-master-data-cleanup
translationKey: duplicates-master-data-cleanup
topic: data
categories: [architecture, ai]
contactBrief: architecture
tags: [data quality, duplicates, master data, Agentforce]
takeaways:
  - "At manufacturers, duplicates mostly come from interfaces and country borders: repeated ERP imports, customers created again per country, assets without a unique serial number."
  - "Before cleaning up, decide which system leads the record and which key makes it unique, such as the ERP customer number or the serial number."
  - "Salesforce comes with matching rules and duplicate rules. They prevent new duplicates, but they do not clean up old ones."
  - "With two identical accounts, an AI agent picks the wrong one just as confidently as the right one. That is why the cleanup comes before the agent."
faq:
  - q: "How do I find duplicates in Salesforce?"
    a: "With matching rules that define when two records count as the same, and a report on the pairs found. Duplicate jobs scan the existing data in one run, but they are only included in Performance and Unlimited Edition."
  - q: "What is the difference between a matching rule and a duplicate rule?"
    a: "The matching rule defines which fields are compared. The duplicate rule defines what happens when a possible duplicate is saved: alert, block or only report."
  - q: "How do I prevent duplicates from the ERP interface?"
    a: "With an external ID, such as the ERP customer number, and an upsert instead of an insert. The interface then updates the existing record instead of creating a new one."
  - q: "Why are duplicates a problem for AI agents?"
    a: "An agent looks up a customer or an asset and works with the first match. If there are two, it may name the wrong contract, the wrong dealer or the wrong service history."
draft: false
---

Manufacturers clean up duplicates in Salesforce best in a fixed order: measure first, then define the leading system and a unique key per object, then merge, and only then prevent new duplicates. For accounts the key is usually the ERP customer number, for assets the serial number. With matching rules and duplicate rules, Salesforce provides tools that catch new duplicates on save. They do not clean up old ones. This work belongs before any AI agent, because with two identical accounts an agent picks the wrong one just as confidently as the right one.

## Where do duplicates come from at manufacturers?

Duplicates rarely appear because someone works sloppily. At manufacturers I mainly see these causes:

- **Interfaces that create instead of update.** An ERP import creates a customer again when it cannot find the existing one, for example because the spelling changed.
- **Countries and legal entities.** A group customer buys in three countries, and each sales subsidiary creates it on its own, once with "GmbH", once with "AG", once under the name of the subsidiary.
- **Dealers and end customers.** An end customer comes through two dealers and shows up twice, once under each dealer.
- **Assets without a unique identifier.** Serial numbers are captured with and without a prefix, or replacement machines get the number of the old one.
- **Portals.** Contacts register themselves and create a new contact instead of linking to the existing one.

```praxis
In my Field Service projects the installed base came from the ERP, and the data quality of the assets was one of the stumbling blocks. A machine that exists twice has two halves of a service history, and the technician on site only sees one of them.
```

How the installed base should be structured is described in [asset hierarchy in Field Service](../field-service-asset-hierarchy-machines/) and in [Field Service master data](../salesforce-field-service-master-data/).

## Why does the cleanup come before the AI agent?

A person who sees two similar accounts gets suspicious and asks. An agent looks up the customer, takes the matching result and works with it. If there are two results, it may name the wrong contract, send the quote to the wrong contact or check a warranty against the wrong machine. It does so in a convincing tone, and that is exactly what makes the mistake expensive. That is why business value and data quality come before any agent for me, see [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

## How do you clean up duplicates step by step?

```schritte
Measure | 1 to 2 weeks · client
  Create matching rules for accounts, contacts and assets and build a report on possible pairs. That number is the baseline.
Leading system and key | before the cleanup · architect and business
  Decide per object which system leads and which field makes the record unique, such as the ERP customer number or the serial number.
Merge | depends on volume · business per country
  Review and merge pairs, most important customers first. What is duplicated in the ERP gets cleaned up there, not only in Salesforce.
Prevent | in parallel · partner
  Activate duplicate rules, switch interfaces to upsert with an external ID, match portal registrations against existing contacts.
Maintain | ongoing · data owners
  Monthly report on new possible duplicates, with one owner per country.
```

The second step is the most important one and the one most often skipped. If you merge without knowing which system leads, you merge in Salesforce what the ERP separates again with the next import.

When merging, you choose a master record, and Salesforce moves related records such as contacts, opportunities and cases over to it. The user interface merges at most three records at a time. With hundreds of pairs you need a tool or a script, and a backup before that.

## What can matching rules and duplicate rules do?

Salesforce separates two things ([Salesforce Help: Duplicate Management](https://resources.docs.salesforce.com/224/latest/en-us/sfdc/pdf/salesforce_data_quality_duplicate_prevention.pdf)):

| Rule | Purpose | Important limits |
|---|---|---|
| Matching rule | defines which fields are compared and how, exact or fuzzy | standard rules for accounts, contacts and leads; at most 5 active per object |
| Duplicate rule | defines what happens when a possible duplicate is saved: alert, block, report | at most 5 active per object |
| Duplicate job | scans the existing data in one run | Performance and Unlimited Edition only |

There is no standard rule for assets, but custom matching rules are possible, for example on serial number and product. Duplicate rules also apply to interfaces. If a rule blocks, the import fails instead of creating a duplicate. That is correct, but it needs error handling that someone actually reads.

```hinweis tipp
Start duplicate rules with the action "alert" and a report. After two to three weeks you can see whether the matching rule produces too many false matches. Only then switch to "block".
```

## How do you prevent duplicates from the ERP?

The most effective measure sits in the interface. Every record from the ERP carries the ERP's key in an external ID field, and the interface writes with an upsert: if the key exists, the record is updated, otherwise it is created. That way an import can no longer create a duplicate, however the name is spelled. Which system leads which data belongs in the integration architecture I describe under [integration with ERP, middleware and telephony](../../services/salesforce-integration/).

## Who is responsible for data quality?

Data quality is a task for the business, not for IT and not for the partner. The partner can build rules and change interfaces, but cannot decide whether "Sample Engineering GmbH" and "Sample Engineering AG" are the same customer. Sales in that country knows.

So I recommend one responsible person on the client side per country and per object. They get the monthly report on new possible duplicates, decide on merges and report when an interface keeps producing the same errors. For the installed base this is often the service back office, because it knows the machines best. Without this role, the cleanup starts from scratch after a year.

## Where do you start?

Create a matching rule for accounts and run the report. The number of possible pairs among your hundred most important customers says more about the state of your data than any audit. Then define the leading system and key per object and switch the interface to upsert before you start merging.

Clean master data is the precondition for every agent, every report and every technician on site. If you want your data checked before the next AI project, [send me a message](#contact).
