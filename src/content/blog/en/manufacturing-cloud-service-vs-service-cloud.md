---
title: "Manufacturing Cloud for Service or Service Cloud?"
description: "When Manufacturing Cloud Service Core is worth $80 to $100 more per user and month than Service Cloud, what the premium buys and who needs which licence."
pubDate: 2026-10-28
lang: en
slug: manufacturing-cloud-service-vs-service-cloud
translationKey: manufacturing-cloud-service-vs-service-cloud
topic: service
categories: [manufacturing-cloud, field-service]
contactBrief: licences
tags: [Manufacturing Cloud, Service Cloud, licences, warranty, make-or-buy]
takeaways:
  - "Manufacturing Cloud Service Core lists at $275 per user and month, Service Cloud Core at $195 and the legacy Service Cloud Enterprise at $175, so the premium is $80 to $100."
  - "The premium buys warranty lifecycle management, the Asset Service Console, the Service Console for Manufacturing, pre-work estimation and the manufacturing data model."
  - "Case management, the help centre, entitlements and knowledge are Service Cloud features. A hotline that only handles cases does not need Manufacturing Cloud."
  - "A mixed licence set is the normal answer: warranty adjudicators and campaign managers on Manufacturing Cloud, first-level agents on Service Cloud. Get the mix confirmed in writing."
  - "Field technicians need Field Service licences in either case, at $175 per Technician on Enterprise Edition."
faq:
  - q: "What does Manufacturing Cloud for Service cost?"
    a: "The pricing page lists Manufacturing Cloud Service Core at $275 and Service Max at $650 per user and month, billed annually, and Sales and Service Max at $700. Two footnotes contradict each other on whether these prices apply to Enterprise or Unlimited Edition, so check the quote."
  - q: "What is the difference between Manufacturing Cloud for Service and Service Cloud?"
    a: "Manufacturing Cloud for Service adds manufacturing features to service: warranty lifecycle management, the Asset Service Console, the Service Console for Manufacturing, pre-work estimation and a manufacturing data model. Case management, entitlements and knowledge come from Service Cloud."
  - q: "Can I mix Manufacturing Cloud and Service Cloud licences in one org?"
    a: "Licence mixes by role are common in Salesforce, but which Manufacturing Cloud records a Service Cloud user may read is a contract question. Ask Salesforce to confirm the mix and the access rights in writing before you sign."
  - q: "Do field technicians need Manufacturing Cloud licences?"
    a: "No. Technicians who work with the Field Service mobile app need Field Service licences, Technician at $175 per user and month on Enterprise Edition. Field Service also requires at least one Service Cloud licence in the org."
draft: false
---

Manufacturing Cloud Service Core lists at $275 per user and month. Service Cloud costs $195 in Core, the edition Salesforce now sells instead of Enterprise, and $175 on the legacy Enterprise list price. The premium is therefore $80 to $100 per user and month. In my view it pays off for the users who handle warranty claims from dealers or customers and run recalls or upgrades across an installed base. For case handling, entitlements and knowledge, Service Cloud is enough. Most manufacturers end up with a mixed licence set, and the mix belongs in the contract.

## What do the licences cost?

These are list prices per user and month, billed annually, as of October 2026:

| Licence | List price | Flex Credits per org and year |
|---|---|---|
| Service Cloud Core | $195 | 500,000 |
| Service Cloud Enterprise (legacy) | $175 | none listed |
| Manufacturing Cloud Service Core | $275 | 500,000 |
| Manufacturing Cloud Service Max | $650 | 2,750,000 |
| Manufacturing Cloud Sales & Service Max | $700 | 2,750,000 |

The [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) answers in its FAQ that "Core replaces Enterprise Edition, Advanced replaces Unlimited Edition, and Max replaces Agentforce 1 Edition". Depending on which version of the page loads, it still shows Enterprise at $175. Salesforce [announced in September](https://www.salesforce.com/in/news/?p=14535) that "existing customer pricing on legacy editions remains unchanged". So existing Enterprise customers compare against $175, new buyers against $195. How the new editions differ is covered in [Salesforce editions Core, Advanced and Max](../salesforce-editions-core-advanced-max/).

The [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) has two footnotes that contradict each other. One says the prices are for Enterprise Edition and Unlimited costs $425. The other says the prices are for Unlimited Edition. The same announcement says new pricing for the industry editions will follow "later this fall". Which price applies to you only shows in the quote.

## What does the premium buy?

The Manufacturing Cloud pricing page lists these service features: Warranty Lifecycle Management, Asset Service Console, Service Console for Mfg and Pre-Work Estimation, plus the manufacturing data models. Service Max adds Contact Center Digital, Workforce Management, Quality Management and Customer Signal Intelligence, and the Max editions include "all full suite of Agentforce for Industries". The per-edition marks did not come through on the page I read, so confirm in the quote which edition includes which feature.

What these features do:

- **Warranty lifecycle management.** Warranty terms, claims from dealers, adjudication and supplier recovery, covered in [warranty claims from dealers](../warranty-claims-dealers-salesforce/).
- **Asset Service Console.** Milestones, warranties, cases, work orders and claims per machine. The data behind it is the topic of [installed base in Manufacturing Cloud](../installed-base-asset-milestones/).
- **Service Console for Manufacturing.** A redesigned contact page with assets, cases and orders of the caller's account. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/service-console-for-manufacturing-cloud-admin-essentials/learn-about-the-service-console-for-manufacturing), its components need "an Industry Service Excellence add-on license". Ask whether Service Core includes it.
- **Product service campaigns** for recalls and upgrades. Trailhead lists them as a Manufacturing Cloud capability, the pricing page does not. See [product recalls in Salesforce](../product-recalls-service-campaigns/).

## What does Service Cloud cover on its own?

More than many expect. The Service Cloud Core edition lists case management and a self-service help centre. The comparison table on the pricing page also lists service contracts and entitlements, knowledge management, and asset management and product tracking. Assets with serial numbers and hierarchies are standard Salesforce objects.

So a hotline that takes calls, opens cases, checks a service contract and answers from knowledge articles works on Service Cloud. What it lacks is the manufacturing layer: warranty terms per product and part, claims with payment details per item, asset milestones, participants and fleets, campaigns with causal parts. If you only need a warranty end date on the asset to show the agent, a custom field is enough.

## Who needs which licence?

I would decide by role, not by department. A typical scenario, as an assumption: a machine builder with 45 service users.

| Role | Users | Licence |
|---|---|---|
| Hotline, first level | 30 | Service Cloud Core |
| Warranty adjudicators | 10 | Manufacturing Cloud Service Core |
| Quality, recalls | 5 | Manufacturing Cloud Service Core |

All 45 on Manufacturing Cloud Service Core cost $148,500 a year at list price. The mixed set costs $49,500 for the 15 Manufacturing Cloud users plus $70,200 for the 30 on Service Cloud Core, $119,700 in total. The difference is $28,800 a year, or 30 users times $80 times 12 months.

Three groups fall outside this table:

- **Field technicians** need Field Service licences either way. The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/) lists Technician at $175 and Field Service Plus at $230, requires "at least one (1) Service Cloud user license" and forbids Dispatcher and Technician licences for case management. Whether Field Service pays off is covered in [is Salesforce Field Service worth it](../salesforce-field-service-worth-it/).
- **Dealers** who submit claims work in a portal with partner licences, see [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).
- **Managers who only read reports** may not need a full licence at all, see [does everyone need a full licence](../salesforce-licences-full-licence-needed/).

One point I would always get in writing: which Manufacturing Cloud records, such as warranty claims or asset warranties, a Service Cloud user may see. The hotline usually needs to read them, even if it never edits them.

## How do I decide?

A short rule that works for most manufacturers:

- **Warranty claims come in from outside and recalls or upgrades happen regularly:** Manufacturing Cloud for Service for the people who handle them.
- **Service means cases, contracts and answers:** Service Cloud, with a custom field for the warranty end date if needed.
- **Many technicians in the field:** decide Field Service separately; it does not depend on this choice.

The alternative is a custom build on Service Cloud: your own objects for warranty terms, claims and campaigns. In the scenario above the premium for the 15 Manufacturing Cloud users is $14,400 a year compared with Service Cloud Core, or $72,000 over five years at list price. A custom warranty process with dealer portal, approvals and supplier recovery rarely costs less to build and maintain, and you own every change yourself. The custom build wins when your warranty process is simple, such as one term per product and few claims.

This is the same make-or-buy question as for the whole industry cloud, covered in [is Manufacturing Cloud worth it](../salesforce-manufacturing-cloud-is-it-worth-it/) and in the [scope and business case chapter](../../masterclass/manufacturing-cloud/scope-and-business-case/). I describe the approach under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

## Where should you start?

Count the users per role for one region: how many handle warranty claims, how many run campaigns, how many only take calls. Then ask for a quote with exactly that mix, including the Industry Service Excellence question and read access for Service Cloud users. The after-sales features themselves are in the [warranty and after-sales chapter](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) of the Manufacturing Cloud masterclass.

Manufacturing Cloud for Service is worth its premium for the people who work on warranty and recalls, and rarely for the whole service team. If you are weighing that licence mix, [send me a message](#contact).
