---
title: "Warranty and after-sales in Manufacturing Cloud"
description: "Warranty claims, recalls and the installed base in Manufacturing Cloud: what the service features do, who needs a licence and where Field Service takes over."
lang: en
slug: warranty-and-after-sales
course: manufacturing-cloud
translationKey: mfg-04
chapter: 4
pubDate: 2026-10-28
short: "Warranty and after-sales"
summary: "Warranty claims, recalls and the installed base: when Manufacturing Cloud for Service is enough and where Field Service begins."
takeaways:
  - "Service Core lists at $275 per user and month, $80 more than Service Cloud Core. The premium pays off for warranty and recall teams."
  - "Every after-sales feature starts from one asset per machine with serial number, product, owner and warranty start date."
  - "Warranty claims run from the dealer portal through rules-based adjudication to a credit note in the ERP. The Winter '27 agent also validates coverage."
  - "Product service campaigns bundle a recall with one item per machine. Finding the right machines depends on serial numbers and production batches in Salesforce."
  - "Manufacturing Cloud decides whether damage is covered and who pays. The on-site visit, maintenance plans and technician stock belong to Field Service."
articles: [manufacturing-cloud-service-vs-service-cloud, manufacturing-cloud-installed-base-assets, manufacturing-cloud-warranty-claims, warranty-adjudication-agent-winter-27, manufacturing-cloud-product-service-campaigns, spare-parts-serial-number-ai]
faq:
  - q: "What does Manufacturing Cloud for Service add to Service Cloud?"
    a: "The pricing page lists warranty lifecycle management, the Asset Service Console, the Service Console for Manufacturing and pre-work estimation, plus the manufacturing data model. Trailhead also lists product service campaigns. Cases, entitlements and knowledge come from Service Cloud."
  - q: "Does every service user need a Manufacturing Cloud licence?"
    a: "No. I would license by role: warranty adjudicators and the people who run recalls on Manufacturing Cloud, first-level agents who only handle cases on Service Cloud. Get the mix and the read access to warranty records confirmed in writing."
  - q: "What does the Warranty Claims Adjudication Agent need before it runs?"
    a: "Assets with serial numbers and warranty start dates in Salesforce, warranty terms maintained as rules, an agreed threshold above which a person approves, and a dealer portal whose free text is treated as untrusted input. Salesforce has not published a licence or setup guide in the sources I could open."
  - q: "Are product service campaigns part of Manufacturing Cloud?"
    a: "Trailhead lists them among the Manufacturing Cloud service capabilities, but the pricing page does not mention them. Ask Salesforce in writing which edition includes them before you plan a recall process on them."
  - q: "Do field technicians need Manufacturing Cloud licences?"
    a: "No. Technicians who work in the Field Service mobile app need Field Service licences. According to the Field Service pricing page, Field Service also requires at least one Service Cloud user licence in the org."
draft: false
---

Manufacturing Cloud for Service pays off when dealers or customers submit warranty claims regularly and recalls or upgrades run across hundreds of machines. It adds warranty terms, claims with adjudication, product service campaigns and an asset view on top of Service Cloud, at $275 per user and month instead of $195 for Service Cloud Core. Everything rests on the installed base: one asset per machine with serial number, owner and warranty start date. Without that data, neither a person nor the Winter '27 adjudication agent can check a claim. Manufacturing Cloud decides whether damage is covered and who pays; the visit to the customer belongs to Field Service.

## Manufacturing Cloud for Service or Service Cloud?

Salesforce sells this part of the industry cloud as Manufacturing Cloud for Service; on the price list the same product appears as "Agentforce Manufacturing for Service". According to the [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/), Service Core costs $275, Service Max $650 and Sales & Service Max $700 per user and month, billed annually. The [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) lists Core at $195 and says "Core replaces Enterprise Edition". So a new buyer pays $80 more per user and month for the manufacturing layer. Existing customers on legacy Enterprise compare against their old price, as described in [Manufacturing Cloud for Service or Service Cloud](../../../blog/manufacturing-cloud-service-vs-service-cloud/).

Two footnotes on the Manufacturing Cloud pricing page contradict each other: one says the prices are for Enterprise Edition and Unlimited costs $425, the other says they are for Unlimited Edition. Which price applies only shows in your quote.

The premium buys, according to the pricing page, Warranty Lifecycle Management, the Asset Service Console, the Service Console for Manufacturing and Pre-Work Estimation. The [Trailhead overview](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) adds product service campaigns, which the pricing page does not name. Service Cloud alone already covers cases, entitlements, knowledge and standard assets with serial numbers.

```hinweis tipp
My rule: license by role. Warranty adjudicators and the quality team that runs recalls work on Manufacturing Cloud, a first-level hotline that opens cases and answers from knowledge stays on Service Cloud. One point belongs in the contract: which warranty records a Service Cloud user may read. How I frame the licence mix as a make-or-buy question is described under [make-or-buy and licence forecasts](../../../services/make-or-buy-licences/), and the scope of the whole industry cloud is in [chapter 1](../scope-and-business-case/).
```

## After-sales starts with the installed base

Every after-sales question is a question about one machine. Is this serial number still under warranty? Is it affected by the recall? Which seal fits it? The asset record answers all three, or none.

The minimum per machine: serial number, product, owning account, location and the date that starts the warranty. Manufacturing Cloud adds three things on top:

| Addition | What it does |
|---|---|
| Asset milestones | The [AssetMilestone object](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetmilestone.htm), available from API 58.0, records "the key events in the lifecycle of an asset, such as manufacturing, registration, or resale", with a date, the stage Active, Expired or Tentative, and the source system that reported it. |
| Account and contact participants | They link several companies and people to one machine: dealer, operator, service partner. |
| Fleets | They group the machines of a customer with many sites, with usage per machine. |

The data model is the easy part. The hard part is the source. The ERP knows the serial number and the dealer it shipped to, but not the end customer. The dealer knows the handover date, commissioning knows the installation date. Each field needs exactly one owner, written down before the first claim is checked. The full field list, the source table and the rule for the warranty start date are in [installed base in Manufacturing Cloud](../../../blog/installed-base-asset-milestones/). Planning the ERP interface for it is part of my work on [Salesforce integration](../../../services/salesforce-integration/).

## How does a warranty claim run from dealer to credit note?

Manufacturing Cloud models warranties on three levels. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/administer-warranty-terms), the warranty term sets type, duration, start and the covered labour, parts and expenses; warranty term coverage extends or restricts it for specific parts; and the asset warranty assigns the term to one machine "when assets are purchased or installed". For manufacturers with many variants, the middle level saves the most work: one base term per product family, exceptions per part.

The claim itself usually comes from outside. The [service page](https://salesforce.com/manufacturing/cloud/service) says partners and customers can submit claims "via API or portals" and that business rules can automate approvals. The flow in short:

```ablauf
sf: Claim in portal, Rules check, Adjudicator, Approved claim
erp: Credit note
ext: Supplier
Claim in portal --> Rules check
Rules check --Routine claim--> Approved claim
Rules check --Other claims--> Adjudicator
Adjudicator --Amount--> Approved claim
Approved claim --Interface--> Credit note
Approved claim ..Recovery claim..> Supplier
```

The dealer submits the claim in the partner portal with machine, fault, causal part and costs per item. The rules check warranty period, usage limit and covered part. For a purchased part, a supplier recovery claim goes back to the supplier, and finance books the credit note in the ERP.

The credit note is easy to leave out of the plan. Without it the dealer sees an approved claim in the portal and is still waiting for the money. The objects, the supplier recovery and the portal licences for dealers are covered in [warranty claims from dealers](../../../blog/warranty-claims-dealers-salesforce/). Which portal licence dealers need was the topic of [chapter 3](../dealer-and-partner-channel/).

### What does the adjudication agent add?

Winter '27, [generally available since 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), brings a Warranty Claims Adjudication Agent. The [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) describes it in one sentence: it "validates coverage and flags potential fraud". In the sources I could open, Salesforce has not published its licence, its fraud signals or a setup guide.

I would let rules decide coverage and let the agent work where rules are weak: reading the dealer's free-text fault description, comparing it with fault code and parts, spotting a serial number that came in twice, and drafting a request for missing data. Amounts above an agreed limit, every fraud flag, goodwill and claims with missing asset data go to a person. What to prepare, including a test set and the Flex Credits per claim, is in [the Warranty Claims Adjudication Agent](../../../blog/warranty-claims-adjudication-agent/). The wider agent picture for manufacturers is in the AI masterclass chapter [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/).

## Recalls and upgrades with product service campaigns

A product service campaign, according to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaign.htm) available from API 51.0, "represents a set of activities to be performed" on a set of assets. Each affected machine becomes one campaign item with its own status. The [data model](https://developer.salesforce.com/docs/platform/data-models/guide/product-service-campaign-management.html) adds definitions with affected product and serial range, production batches, the causal part, partners and unsold dealer stock. The same model fits a safety recall and a retrofit kit for a whole series.

The weak point is the selection. A campaign finds the right machines only when every machine exists as an asset with a serial number and the link from component batch to machine is known. Select too broadly and you pay for work on machines that are fine; too narrowly and faulty machines stay in the field.

Worked example: a supplier's valve batch is faulty and sits in 1,800 machines sold through 70 dealers, 120 of them still unsold in dealer stock. The campaign covers the 1,680 machines at end customers as items, the unsold ones as partner inventory, and the valve as causal part with a product return against credit from the supplier. Dealers report each machine as done, not a number per dealer. The full walkthrough, and when a list in the quality system is enough, is in [product recalls in Salesforce](../../../blog/product-recalls-service-campaigns/).

```hinweis offen
The pricing page does not mention product service campaigns. Get confirmed which edition includes them before you plan a recall process on them.
```

## The whole machine history on one screen

Two consoles, for two kinds of calls. The [Service Console for Manufacturing](https://trailhead.salesforce.com/content/learn/modules/service-console-for-manufacturing-cloud-admin-essentials/learn-about-the-service-console-for-manufacturing) is a redesigned contact page: the caller's details plus the assets, cases and orders of their account. Its timeline, recommendations and record alerts components are "available with the Industries Service Excellence license", so ask whether your edition includes it. The Asset Service Console starts from the machine instead: according to the service page it shows "asset warranties, cases, work orders, and claims related to an asset".

Both consoles look only as complete as the data behind them. If milestones, warranties and claims hang on the asset, the agent sees the whole history in one place. If half the machines have no warranty start date, the console shows the gap sooner than a report.

## Spare parts by serial number

The question "which part fits this machine?" touches three systems. Salesforce holds the asset with its main assemblies, PLM the as-built parts list per serial number, the ERP material, availability and price. I would keep the full parts list in PLM and call it live through an API instead of loading hundreds of positions per machine as child assets. An agent can then narrow the question down to an assembly and present the result, while the mapping from serial number to part number stays rule-based. The data checks and an assumed scenario with 6,000 machines are in [spare parts by serial number](../../../blog/spare-parts-by-serial-number-ai/).

## Where does warranty end and Field Service begin?

At the customer's door. Manufacturing Cloud settles whether damage is covered, who gets which amount and who pays in the end. Who drives to the customer, when and with which part, is Field Service: work orders, scheduling, maintenance plans and technician stock.

| Topic | Where it belongs |
|---|---|
| Warranty terms, claims, adjudication, supplier recovery | Manufacturing Cloud |
| Recall definition, affected machines, dealer status | Manufacturing Cloud |
| Assets, milestones, participants | Shared, designed once |
| Work orders, appointments, maintenance plans, van stock | Field Service |
| Telemetry and asset health | Connected Assets add-on |

Field technicians need Field Service licences in either case. The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/) also requires "at least one (1) Service Cloud user license" and forbids Dispatcher and Technician licences for case management. Two add-ons appear here often: according to the [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/), Connected Assets costs $15,000 per org and month and Asset Service Lifecycle Management $75 per user and month, the latter with Field Service editions. Neither is needed for a clean installed base; whether telemetry pays off is covered in [predictive maintenance in Salesforce](../../../blog/predictive-maintenance-salesforce-data-needed/).

The asset hierarchy, maintenance plans and service partners are the topic of the Field Service masterclass chapter [assets, maintenance, parts and partners](../../field-service/field-service-assets-maintenance-parts/). If you introduce both clouds, design the asset model once for both. Drawing that line is part of my [Salesforce architecture](../../../services/salesforce-architecture/) work.

## In which order would I introduce after-sales?

1. **Count the gaps.** Take last year's warranty claims and check how many serial numbers exist as assets with owner and start date.
2. **Settle the licence mix by role** and get read access for Service Cloud users in writing.
3. **Fix registration.** Make the dealer's handover registration a required step in the portal.
4. **Run rules-based adjudication** and the ERP credit note before any agent.
5. **Test a campaign** against one past quality case before a real recall depends on it.
6. **Add the agent last**, with an approval threshold agreed with service and finance.

Start with step 1, because warranty, recalls and agents all depend on the installed base. The data flows between SAP and Manufacturing Cloud, including credit notes, are the topic of [chapter 5](../erp-ai-and-rollout/).
