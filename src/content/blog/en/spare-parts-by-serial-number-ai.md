---
title: "Spare parts by serial number: can an AI agent do it?"
description: "Can an Agentforce agent find the right spare part for a serial number? The data it needs from PLM, ERP and Salesforce assets, and what must stay rule-based."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: spare-parts-by-serial-number-ai
translationKey: spare-parts-serial-number-ai
topic: field-service
categories: [field-service, manufacturing-cloud]
tags: [agentforce, spare parts, field service, PLM, installed base, dealer portal]
takeaways:
  - "The data comes from PLM (as-built, as-maintained, service BOM), the ERP (material, availability, price) and Salesforce (installed base, service history)."
  - "Siemens announced the pattern in September 2026 and showed an agent-to-agent demo with its Teamcenter SLM app in November; general availability is not stated."
  - "I keep the full parts list in PLM and query it through an API. Salesforce holds the machine and main assemblies; the proposal is written to the work order."
  - "Dealers may only query machines that belong to their own account. The action checks that on the server before any serial number goes to PLM."
faq:
  - q: "Can Agentforce identify spare parts by serial number?"
    a: "Yes, through an action that calls an API returning the parts for that serial number, usually from PLM and enriched with ERP data. Siemens showed this with its paid Teamcenter SLM app for Salesforce in a November 2026 demo; I found no statement that it is generally available."
  - q: "What is an as-built BOM?"
    a: "The parts list of one specific delivered machine, with the variants and revisions actually installed. The engineering BOM describes the machine type. For spare parts you also need the as-maintained state after repairs and the service BOM with approved alternatives."
  - q: "Should the full parts list be copied into Salesforce assets?"
    a: "Usually not. Hundreds of line items per machine across thousands of machines become millions of records to load and keep in sync. I would keep the machine and its service-relevant main assemblies in Salesforce and query the rest live."
  - q: "What does a parts lookup cost in Flex Credits?"
    a: "At the list price on November 9, 2026, an Agentforce action costs 20 Flex Credits, which is $0.10. A lookup that uses exactly three actions comes to about $0.30. The real number of actions varies, and user, integration, portal and PLM licenses are added on top."
  - q: "Can dealers use the same agent in the portal?"
    a: "Yes, with stricter rules: only machines the server confirms as the dealer's own, dealer prices from the ERP, availability instead of stock levels, and only spare-relevant positions instead of the full design structure."
draft: false
---

An AI agent can identify the right spare part for a serial number, but only when your systems can already answer that question based on rules: which parts are built into this machine today, and which replacements are approved. For spare parts by serial number the agent needs the as-built and as-maintained structure and the service BOM from PLM, material, availability and price from the ERP, and the installed base from Salesforce. It understands the question, narrows it down to an assembly and presents the result, but never picks a part number on its own. Siemens announced this pattern with Teamcenter in September 2026 and showed a demo in November.

## What did Siemens announce, and what is live?

The most visible public example is the [Siemens and Salesforce release of September 15, 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx). By combining Agentforce with Teamcenter Service Lifecycle Management, it says, "a service technician can identify the right spare parts for a specific serial number before the first site visit", and "a customer can find and order the right part without waiting for an engineer or calling a hotline". Roland Busch, President and CEO of Siemens AG, describes it as "putting a virtual engineer in the hands of service technicians and salespersons".

Note the tenses. The same release says Teamcenter "will work with Agentforce". What Siemens reports as running today, with numbers, is inbound lead handling: 100 percent of inbound leads engaged across 132 countries. So in September, the spare parts case was an announced pattern from a company that sells its own PLM software, but without published results. On [November 3, 2026](https://blogs.sw.siemens.com/service-lifecycle-management/2026/11/03/agent-to-agent/) Siemens introduced an agent-to-agent capability for its Teamcenter SLM for Salesforce app, a paid [AppExchange app](https://appexchange.salesforce.com/appxListingDetail?listingId=4d11758a-a5d0-4174-baff-3e2b85dbfe3e) that already brings service BOM and as-maintained structures into Salesforce, and showed it in a demo. I found no release date or GA statement for the agent functionality. The announcement still names the right building blocks: engineering data for each serial number, a CRM with the installed base, and an agent in between.

## Which data does the agent need for spare parts by serial number?

The question "which seal fits this machine?" touches three systems:

| Question | Leading system | Data |
|---|---|---|
| Which machine is it? | Salesforce | Asset with serial number, customer, site, machine type, parent and child assets |
| What was built in, and what is approved? | PLM | As-built and as-maintained structure per serial number, service BOM with alternatives and substitutes, revisions |
| What changed since delivery? | Salesforce Field Service | Work orders with consumed parts, retrofits, replaced assemblies |
| Can the customer get it, at what price? | ERP (SAP, proALPHA) | Material number, successor material, sales status, availability, customer or dealer price |

An **as-built parts list** (as-built BOM) is the bill of materials of one delivered machine, with the variants and revisions actually installed. The engineering BOM describes the machine type. For a custom machine with options, they can differ in the exact line item the technician asks about. Two more views matter for service: the as-maintained structure shows what is installed today after repairs and retrofits, and the service BOM lists the serviceable parts with approved alternatives and substitutes.

On the Salesforce side, [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets) defines an asset as "a specific purchased or installed product" and describes asset hierarchies as a way to track related assets, such as the components of a machine, as a single unit, built with the Parent Asset field. Work orders can be linked to assets. That is the anchor: the agent hands the asset's identity to PLM and ERP. The standard serial number field is not unique, so the integration needs a unique external ID; the serial number is the search value. How assets get into Salesforce is covered in [master data for Field Service](/en/blog/salesforce-field-service-master-data/).

The row I would check first is the third. The as-built list shows the machine on the day it left the plant. Five years later two pumps have been replaced and a dealer has fitted a retrofit kit. If those changes live only in paper reports, PLM and Salesforce both describe a machine that no longer exists. Consumed parts on completed work orders are an important input for the as-maintained state, which is one more reason to record them in the app, as described in [spare parts between ERP and Field Service](/en/blog/salesforce-field-service-spare-parts-erp/). They do not update the structure on their own: a consumed product record says which material was used, not which part was removed or where the new one is installed. That needs an explicit replacement step, for example with asset relationships, and a decision on which system holds the as-maintained master.

## Keep the parts list in PLM and call it live

**Full copy.** Every as-built position becomes a child asset. More data could be made available offline, but only what the mobile offline configuration actually syncs with the work order. The trade-off is data volume: every line item of every machine is a record to load, keep in sync with PLM and partly carry onto the mobile device.

**Live lookup.** PLM or a middleware layer offers an API such as "spare-relevant positions for serial number X and assembly Y". The [Salesforce Developers blog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) describes the route through MuleSoft: define topics and actions in Topic Center, publish the API to Exchange and sync it to API Catalog, after which "named credentials and external services will be automatically created". The agent calls the API as an action, and Flow and Apex can call the same API. The blog does not name PLM or SAP; [Agentforce and SAP](/en/blog/agentforce-sap-order-status-mulesoft/) applies the same pattern to order status.

Between the two there are other options, such as a cache only for open work orders or the Siemens app itself. **My recommendation for this architecture: split by use.** Salesforce holds the machine and its service-relevant main assemblies as an asset hierarchy, which warranty, service contracts and the dealer portal need anyway. The full parts list stays in PLM and is retrieved live when needed. For a factory basement with no network coverage, the agent runs before the visit and writes its proposal to the work order as products required. Products required can sync offline with the work order, so test that in your mobile configuration.

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

If your PLM has no API or no as-built data per serial number, the agent has nothing to call; for older systems see [legacy ERP without an API](/en/blog/legacy-erp-without-api-ai-agents/).

## What should the agent decide, and what not?

Which parts are approved for a serial number is decided by rules: there can be several approved options, such as alternatives, successors or a complete assembly, but the agent must not invent one. That decision belongs in the API. The agent adds value around that answer:

- **Understanding the question.** "The feed pump on the left of line 2 is leaking" has to become one assembly in the hierarchy. If two assemblies fit, the agent asks a follow-up question instead of choosing.
- **Reading context.** Fault code, recent work orders and a photo narrow it down. Salesforce's [Field Service troubleshooting announcement](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) already describes an agent that analyzes photos provided by the technician.
- **Preparing the result.** It prepares part numbers, quantities and availability as a short list, plus a proposal for products required on the work order, which a person confirms.

What stays rule-based: the parts list itself, successor materials (resolved in ERP or PLM, never guessed from similar descriptions), prices and any order placement. If the API returns nothing, the agent says so and hands over to the parts desk. How to enforce such gates is described in [Agent Script: rules instead of the LLM](/en/blog/agent-script-deterministic-rules/).

### Technician or dealer?

The technician is the easier start: internal user, known machine, work order as context. A dealer in the portal needs stricter rules:

- **Only the dealer's own machines.** The action checks on the server that the asset belongs to an account the dealer may see, and only then passes the serial number from that asset to PLM. Free text can be a search value, but never the basis for authorization. The PLM API should receive only the internally resolved asset ID or filter by account itself. Otherwise one dealer reads the configuration of a machine sold by another. A spare parts store can use the same rule, see [show only parts for each machine](/en/blog/spare-parts-shop-parts-per-machine/).
- **Dealer prices and availability from the ERP.** Show whether and when a part is available, as in the SAP article, and keep stock levels internal.
- **Only spare-relevant positions.** The full as-built structure is design knowledge and has no place in a dealer chat.
- **Free text is untrusted.** Portal fields are entry points for manipulated instructions, see [prompt injection through dealer portals](/en/blog/prompt-injection-dealer-portals-agentforce/).

Which portal license lets dealers see assets at all is covered in [the Manufacturing Cloud customer portal](/en/blog/manufacturing-cloud-customer-portal/).

## Worked example: 6,000 machines and one seal

Assume a machine builder with 6,000 installed machines, 40 technicians, 150 dealers, SAP and a PLM with as-built lists per serial number for machines delivered since 2016. All numbers here are assumptions.

Assume 400 spare-relevant positions per machine. A full copy would mean 2.4 million child assets. The split approach keeps the machine plus about 15 main assemblies in Salesforce: 96,000 assets, one twenty-fifth of the full-copy volume.

Assume 1,500 parts questions a month, each with three actions: find the asset, get the parts for the assembly from PLM, get availability and price from SAP. According to the [Flex Credits rate card of November 3, 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) an action costs 20 credits in production, so a question costs 60 credits, or 90,000 a month. At the [list price of $500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) that is about $450 a month for the actions, if each question uses three. The one-off integration and PLM work costs far more; the billing model is explained in [Flex Credits: cost per action](/en/blog/flex-credits-agentforce-cost-per-action/).

In this illustrative scenario, which is not a measured customer result, assume that a pilot with ten technicians produces two findings. For machines delivered before 2016, PLM has only the type BOM, so the agent can name candidates but cannot confirm the variant; it has to state that limitation, and the parts desk decides. And on some of the machines checked, consumed parts show an assembly replaced by a successor that the asset hierarchy does not reflect. Both are data problems. The decision in the scenario is to start with technicians only, limit the scope to machines from 2016 onwards, and add a replacement step on the work order that updates main assemblies when a technician swaps one.

## Check 20 spare part orders by hand

```schritte
Test by hand first
  Take 20 recent spare part orders from the service desk as a discovery sample and check whether serial number, asset and parts list lead to the part that was actually ordered. That shows data problems; it is not a release test.
Agree on a unique asset key
  A unique external ID for the integration, and the serial number in the same format on the nameplate, in ERP, PLM and Salesforce, including leading zeros and plant prefixes, as the search value.
Build the API before the agent
  Give the parts desk a screen on it first. If it does not help people, an agent will not help either.
Start with technicians
  Then open it to dealers with the portal rules above.
```

Which system is authoritative for which data is the subject of [Salesforce integration](/en/services/salesforce-integration/). The wider agent picture is in the masterclass chapter [AI agents in manufacturing](/en/masterclass/ai-salesforce/ai-agents-in-manufacturing/).
