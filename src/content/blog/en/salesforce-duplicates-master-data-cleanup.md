---
title: "Salesforce duplicates: clean master data before AI"
description: "How manufacturers find, clean up and prevent duplicate accounts, contacts and assets in Salesforce before an AI agent starts working with the data."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-duplicates-master-data-cleanup
translationKey: duplicates-master-data-cleanup
topic: data
categories: [architecture, ai]
contactBrief: architecture
tags: [data quality, duplicates, master data, Agentforce]
takeaways:
  - "At manufacturers, duplicates mostly originate at interfaces and country borders, such as repeated ERP imports or customers created again in each country."
  - "Before cleaning up, decide which system owns the record and which key makes it unique, such as source system plus customer number or serial number."
  - "Salesforce comes with matching rules and duplicate rules. They prevent new duplicates, but they do not clean up old ones."
  - "If an agent receives two plausible accounts without a deterministic selection rule, it may use the wrong one. That is why cleanup comes first."
faq:
  - q: "How do I find duplicates in Salesforce?"
    a: "In Performance and Unlimited Edition, use duplicate jobs, which scan existing accounts, contacts and leads against a matching rule. Otherwise, duplicate reports only show what duplicate rules logged when records were saved. In other editions, or for objects such as assets, export the data and analyze it outside or use a dedicated tool."
  - q: "What is the difference between a matching rule and a duplicate rule?"
    a: "The matching rule defines which fields are compared. The duplicate rule defines what happens when a possible duplicate is saved: alert, block or only report."
  - q: "How do I prevent duplicates from the ERP interface?"
    a: "Use a stable external ID, such as source system plus ERP customer number, mark it as unique, and use an upsert instead of an insert. The interface then updates the existing record. Records without a key should be rejected, and newly created records should be monitored."
  - q: "Why are duplicates a problem for AI agents?"
    a: "If an agent action returns several plausible customers or assets and there is no deterministic rule to choose, the agent can work with the wrong record. It may name the wrong contract, the wrong dealer or the wrong service history."
draft: false
---

Manufacturers should clean up duplicates in Salesforce in a fixed order: measure first, then define the leading system and a unique key per object, then merge, and only then prevent new duplicates. For accounts the key is usually the ERP customer number plus source system where needed, for assets the serial number. With matching rules and duplicate rules, Salesforce provides tools that catch new duplicates on save. They do not clean up old ones. This work belongs before any AI agent, because an agent that receives two plausible accounts without a clear selection rule can pick the wrong one just as confidently as the right one.

## Where do duplicates come from in manufacturing companies?

Duplicates rarely appear because someone works sloppily. In manufacturing companies, I mainly see these causes:

- **Interfaces that create instead of update.** An ERP import creates a customer again when it cannot find the existing one, for example because the spelling changed.
- **Countries and legal entities.** A group customer buys in three countries, and each sales subsidiary creates its own account, once with "GmbH", once with "AG", once under the name of the subsidiary.
- **Dealers and end customers.** An end customer is handled through two dealers and appears twice, once under each dealer.
- **Assets without a unique identifier.** Serial numbers are captured with and without a prefix, or replacement machines are given the number of the old machine.
- **Portals.** Contacts register themselves and create a new contact instead of linking to the existing one. Salesforce's duplicate rules do not run on Experience Cloud self-registration, so the registration process needs its own contact matching.

```praxis
In my Field Service projects the installed base came from the ERP, and the data quality of the assets was one of the stumbling blocks. A machine that exists twice has a split service history, and the technician on site only sees one part of it.
```

How the installed base should be structured is described in [asset hierarchy in Field Service](/en/blog/field-service-asset-hierarchy-machines/) and in [Field Service master data](/en/blog/salesforce-field-service-master-data/).

## Why does the cleanup come before the AI agent?

A person who sees two similar accounts becomes suspicious and asks. An agent does what its actions and instructions allow: if a lookup returns two plausible results and nothing decides between them, it may name the wrong contract, send the quote to the wrong contact or check a warranty against the wrong machine. It does so in a convincing tone, and that is exactly what makes the mistake expensive. Besides the cleanup, agent actions should filter precisely, pass stable record IDs and ask for clarification when several records match. That is why, in my view, business value and data quality come before any agent; see [Agentforce: business value and data quality first](/en/blog/agentforce-business-value-data-quality-first/).

## How do you clean up duplicates step by step?

```schritte
Measure | 1 to 2 weeks · client
  In Performance and Unlimited Edition run duplicate jobs for accounts and contacts; otherwise, and for assets, export and analyze outside Salesforce. Count affected records and duplicate sets per object, country and source. That is the baseline.
Leading system and key | before the cleanup · architect and business
  Decide per object which system leads and which field makes the record unique, such as the ERP customer number or the serial number.
Merge | depends on volume · business per country
  Review and merge pairs, most important customers first. What is duplicated in the ERP is cleaned up there, not only in Salesforce.
Prevent | in parallel · partner
  Activate duplicate rules, switch interfaces to upsert with a unique external ID, build contact matching into the portal registration.
Maintain | ongoing · data owners
  Monthly report on new possible duplicates, with one owner per country.
```

The second step is the most important one and the one most often skipped. If you merge without knowing which system is authoritative, you merge records in Salesforce that the ERP will separate again with the next import.

When merging, you choose a master record, and Salesforce moves most related records such as contacts, opportunities and cases over to it. There are exceptions and preconditions, for example for partner accounts, Experience Cloud users, account teams and territories. The user interface merges at most three records at a time. With hundreds of pairs you need a tool or a script, test merges, and a backup before you start.

## Matching rules and duplicate rules prevent new duplicates but do not clean up old ones

Salesforce separates two things ([Salesforce Help: Duplicate Management](https://help.salesforce.com/s/articleView?id=sf.managing_duplicates_overview.htm&language=en_US&type=5)):

| Rule | Purpose | Important limits |
|---|---|---|
| Matching rule | defines which fields are compared and how, exact or fuzzy | standard rules for accounts, contacts and leads; at most 5 active per object |
| Duplicate rule | defines what happens when a possible duplicate is saved: alert, block, report | at most 5 active per object |
| Duplicate job | scans existing accounts, contacts and leads in one run | Performance and Unlimited Edition only |

For assets I would not rely on matching rules: a unique external ID based on serial number and product, checked in the interface, is the dependable control. Fuzzy matching only supports Latin characters, so for international data use exact matching on normalized fields such as VAT ID or country codes. Duplicate rules also apply to interfaces. If a rule blocks, the import fails instead of creating a duplicate. That is correct, but it needs error handling that someone actually reads.

```hinweis tipp
Start with duplicate rules set to the action "alert" and use a report. After two to three weeks you can see whether the matching rule produces too many false matches. Only then switch to "block". Test each channel separately: in the user interface an alert is a message, while imports and API calls can fail with DUPLICATES_DETECTED.
```

## An upsert on a unique external ID keeps ERP duplicates out

The most effective measure lies in the interface. Every record from the ERP carries the ERP's key in an external ID field, and the interface writes with an upsert: if the key exists, the record is updated, otherwise it is created. Mark the field as unique, reject records without a key and watch newly created records. Then an import no longer creates a duplicate because a name is spelled differently. What an upsert cannot decide is whether two different ERP keys stand for the same customer; that remains a business decision. Which system owns which data should be defined in the integration architecture I describe under [integration with ERP, middleware and telephony](/en/services/salesforce-integration/).

## Who is responsible for data quality?

The business owns data quality: it decides what counts as the same customer and which record is the golden record. IT and architecture own the key model, integration logic, validation and monitoring, and internal teams or partners implement it. The partner can build rules and change interfaces, but cannot decide whether "Sample Engineering GmbH" and "Sample Engineering AG" are the same customer. The sales team in that country knows.

So I recommend one responsible person on the client side per country and per object. They receive the monthly report on new possible duplicates, decide on merges and report when an interface keeps producing the same errors. For the installed base this is often the service back office, because it knows the machines best. Without this role, the cleanup starts from scratch after a year.

## Check your 100 most important customers

Export your 100 most important customers with name, website, address and ERP key, and look for the same company in multiple records. In Performance or Unlimited Edition a duplicate job on accounts does the same at scale. Either way, you can see within a day where your data stands. The standard account matching rule may need city or postal code added to flag two accounts with the same name; add your own criteria such as the ERP customer number once the key is defined. Then define the leading system and key per object and switch the interface to upsert before you start merging.
