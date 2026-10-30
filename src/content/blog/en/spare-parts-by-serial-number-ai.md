---
title: "Spare parts by serial number: can an AI agent do it?"
description: "Can an Agentforce agent find the right spare part for a serial number? The data it needs from PLM, ERP and Salesforce assets, and what must stay rule-based."
pubDate: 2026-10-27
lang: en
slug: spare-parts-by-serial-number-ai
translationKey: spare-parts-serial-number-ai
topic: field-service
categories: [field-service, manufacturing-cloud]
tags: [agentforce, spare parts, field service, PLM, installed base, dealer portal]
takeaways:
  - "An agent can find the right spare part for a serial number only if one of your systems already answers that question by rule: which parts are built into this machine today."
  - "The data comes from three places: the as-built parts list from PLM, material, availability and price from the ERP, and the installed base with service history from Salesforce assets."
  - "Siemens announced in September 2026 that Teamcenter “will work with” Agentforce for parts by serial number; the live, quantified part of that release concerns inbound leads."
  - "Keep the full parts list in PLM and call it live through an API; Salesforce holds the machine and its main assemblies, and the agent writes its proposal to the work order."
  - "Dealers may only query serial numbers registered to their own account, taken from the asset record and never typed into the chat."
faq:
  - q: "Can Agentforce identify spare parts by serial number?"
    a: "Yes, through an action that calls an API returning the parts built into that serial number, usually from PLM and enriched with ERP data. In the sources I opened I found no ready-made Salesforce agent for it; Siemens announced it with Teamcenter as a plan."
  - q: "What is an as-built BOM?"
    a: "The parts list of one specific delivered machine, with the variants and revisions actually installed. The engineering BOM describes the machine type; for spare parts the as-built list per serial number is what counts."
  - q: "Should the full parts list be copied into Salesforce assets?"
    a: "Usually not. Hundreds of positions per machine across thousands of machines become millions of records to load and keep in step. I would keep the machine and its service-relevant main assemblies in Salesforce and query the rest live."
  - q: "What does a parts lookup cost in Flex Credits?"
    a: "At list price an Agentforce action costs 20 Flex Credits, which is $0.10. A lookup with three actions comes to about $0.30, before the one-off integration and PLM work."
  - q: "Can dealers use the same agent in the portal?"
    a: "Yes, with stricter rules: only serial numbers registered to the dealer's account, dealer prices from the ERP, availability instead of stock levels, and only spare-relevant positions instead of the full design structure."
draft: false
---

An AI agent can identify the right spare part for a serial number, but only when one of your systems can already answer that question by rule: which parts are built into this machine today. For spare parts by serial number the agent needs the as-built parts list from PLM, material, availability and price from the ERP, and the installed base from Salesforce. It understands the question, narrows it down to an assembly and presents the result, but never picks a part number on its own. Siemens announced this pattern with Teamcenter in September 2026, as a plan.

## What did Siemens announce, and what is live?

The most visible public example is the [Siemens and Salesforce release of 15 September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx). By combining Agentforce with Teamcenter Service Lifecycle Management, it says, "a service technician can identify the right spare parts for a specific serial number before the first site visit", and "a customer can find and order the right part without waiting for an engineer or calling a hotline". Roland Busch, President and CEO of Siemens AG, describes it as "putting a virtual engineer in the hands of service technicians and salespersons".

Read the tenses. The same release says Teamcenter "will work with Agentforce". What Siemens reports as running today, with numbers, is inbound lead handling: 100 percent of inbound leads engaged across 132 countries. So the spare parts case is an announced pattern from a company that sells its own PLM software, and the release gives no results for it. It still names the right building blocks: engineering data per serial number, a CRM with the installed base, and an agent in between.

## Which data does the agent need for spare parts by serial number?

The question "which seal fits this machine?" touches three systems:

| Question | Leading system | Data |
|---|---|---|
| Which machine is it? | Salesforce | Asset with serial number, customer, site, machine type, parent and child assets |
| What was built in? | PLM | As-built parts list per serial number, spare part flag, revisions |
| What changed since delivery? | Salesforce Field Service | Work orders with consumed parts, retrofits, replaced assemblies |
| Can the customer get it, at what price? | ERP (SAP, proALPHA) | Material number, successor material, sales status, availability, customer or dealer price |

An **as-built parts list** (as-built BOM) is the bill of materials of one delivered machine, with the variants and revisions actually installed. The engineering BOM describes the machine type. For a special machine with options, they can differ in exactly the position the technician asks about.

On the Salesforce side, [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets) defines an asset as "a specific purchased or installed product" and describes asset hierarchies as a way to track related assets, such as the components of a machine, as a single unit, built with the Parent Asset field. Work orders can be linked to assets. That is the anchor: the serial number on the asset is the key the agent hands to PLM and ERP. How assets get into Salesforce is covered in [master data for Field Service](../salesforce-field-service-master-data/).

The row I would check first is the third. The as-built list shows the machine on the day it left the plant. Five years later two pumps have been replaced and a dealer has fitted a retrofit kit. If those changes live only in paper reports, PLM and Salesforce both describe a machine that no longer exists. The as-maintained state comes from consumed parts on completed work orders, which is one more reason to record them in the app, as described in [spare parts between ERP and Field Service](../salesforce-field-service-spare-parts-erp/).

## Copy the parts list into Salesforce or call PLM live?

**Full copy.** Every as-built position becomes a child asset. Everything is available offline. The price is volume: every position of every machine is a record to load, keep in step with PLM and partly carry onto the mobile device.

**Live lookup.** PLM or a middleware layer offers an API such as "spare-relevant positions for serial number X and assembly Y". The [Salesforce Developers blog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) describes the route through MuleSoft: define topics and actions in Topic Center, publish the API to Exchange and sync it to API Catalog, after which "named credentials and external services will be automatically created". The agent calls the API as an action, and Flow and Apex can call the same API. The blog names no PLM or SAP; [Agentforce and SAP](../agentforce-sap-order-status-mulesoft/) applies the same pattern to order status.

**My recommendation: split by use.** Salesforce holds the machine and its service-relevant main assemblies as an asset hierarchy, which warranty, service contracts and the dealer portal need anyway. The full parts list stays in PLM and comes live. For the factory basement without network, the agent runs before the visit and writes its proposal to the work order as products required. The technician then has the list offline.

```ablauf
sf: Asset, Agent, Work order
erp: Availability
ext: As-built list
Asset --Serial number--> Agent
Agent --Serial number--> As-built list
As-built list ..Part numbers..> Agent
Agent --Part numbers--> Availability
Availability ..Price..> Agent
Agent --Proposal--> Work order
```

If your PLM has no API or no as-built data per serial number, the agent has nothing to call; for older systems see [legacy ERP without an API](../legacy-erp-without-api-ai-agents/).

## What should the agent decide, and what not?

The mapping from serial number to part number has exactly one right answer, so it belongs in the API. The agent adds value around that answer:

- **Understanding the question.** "The feed pump on the left of line 2 is leaking" has to become one assembly in the hierarchy. If two assemblies fit, the agent asks back instead of choosing.
- **Reading context.** Fault code, recent work orders and a photo narrow it down. Salesforce's [Field Service troubleshooting announcement](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) already describes an agent that analyses photos provided by the technician.
- **Preparing the result.** Part numbers, quantities and availability as a short list, plus a proposal for products required on the work order, which a person confirms.

What stays rule-based: the parts list itself, successor materials (resolved in ERP or PLM, never guessed from similar descriptions), prices and any order. If the API returns nothing, the agent says so and hands over to the parts desk. How to enforce such gates is described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

### Technician or dealer?

The technician is the easier start: internal user, known machine, work order as context. A dealer in the portal needs stricter rules:

- **Serial numbers from the dealer's own assets.** The agent takes the serial number from asset records shared with the dealer's account, never from free text. Otherwise one dealer reads the configuration of a machine sold by another. A spare parts store can use the same rule, see [show only parts for each machine](../spare-parts-shop-parts-per-machine/).
- **Dealer prices and availability from the ERP.** Show whether and when a part is available, as in the SAP article, and keep stock levels internal.
- **Only spare-relevant positions.** The full as-built structure is design knowledge and has no place in a dealer chat.
- **Free text is untrusted.** Portal fields are entry points for manipulated instructions, see [prompt injection through dealer portals](../prompt-injection-dealer-portals-agentforce/).

Which portal licence lets dealers see assets at all is covered in [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).

## A typical scenario: 6,000 machines and one seal

Assume a machine builder with 6,000 installed machines, 40 technicians, 150 dealers, SAP and a PLM with as-built lists per serial number for machines delivered since 2016. All numbers here are assumptions.

Assume 400 spare-relevant positions per machine. A full copy would mean 2.4 million child assets. The split approach keeps the machine plus about 15 main assemblies in Salesforce: 96,000 assets, a twenty-fifth of the copy.

Assume 1,500 parts questions a month, each with three actions: find the asset, get the parts for the assembly from PLM, get availability and price from SAP. According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) an action costs 20 credits in production, so a question costs 60 credits, or 90,000 a month. At the [list price of $500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) that is about $450 a month for the actions. The one-off integration and PLM work costs far more; the billing model is explained in [Flex Credits: cost per action](../flex-credits-agentforce-cost-per-action/).

In the scenario, a pilot with ten technicians brings two findings. For machines delivered before 2016, PLM has only the type BOM, so the agent can name candidates but cannot confirm the variant; it has to say that, and the parts desk decides. And on 9 percent of the machines checked, consumed parts show an assembly replaced by a successor that the asset hierarchy does not reflect. Both are data problems. The decision in the scenario: technicians only, machines from 2016 onwards, and a monthly job that updates main assemblies from consumed parts.

## Where should you start?

```schritte
Test by hand first
  Take 20 recent spare part orders from the service desk and check whether serial number, asset and as-built list lead to the part that was actually ordered.
Agree on the serial number as the key
  Same format on the nameplate, in ERP, PLM and Salesforce, including leading zeros and plant prefixes.
Build the API before the agent
  Give the parts desk a screen on it first. If it does not help people, an agent will not help either.
Start with technicians
  Then open it to dealers with the portal rules above.
```

Which system leads for which data is the subject of [Salesforce integration](../../services/salesforce-integration/); the wider agent picture is in the masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).

An agent finds the right spare part only as reliably as your serial numbers lead to an as-built list.
