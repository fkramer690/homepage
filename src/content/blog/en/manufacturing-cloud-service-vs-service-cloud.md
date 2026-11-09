---
title: "Manufacturing Cloud for Service or Service Cloud?"
metaTitle: "Manufacturing Cloud vs Service Cloud: $275 vs $195 per user"
description: "Manufacturing Cloud Service Core lists at $275 per user and month, Service Cloud Core at $195. Who needs the $80 premium (warranty claims) and when a mix wins."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: manufacturing-cloud-service-vs-service-cloud
translationKey: manufacturing-cloud-service-vs-service-cloud
topic: service
categories: [manufacturing-cloud, field-service]
contactBrief: licences
tags: [Manufacturing Cloud, Service Cloud, licenses, warranty, make-or-buy]
takeaways:
  - "The pricing page ties warranty lifecycle management, two service consoles, pre-work estimation and the data model to it. Confirm them per edition."
  - "Case management, entitlements and knowledge are Service Cloud features. A pure hotline does not need Manufacturing Cloud."
  - "I test a role-based mix first: warranty on Manufacturing Cloud, first level on Service Cloud. Read access depends on permission set licenses."
  - "Technicians who use the Field Service mobile app need Field Service licenses in either case, at $175 per Technician on Enterprise Edition."
faq:
  - q: "What does Manufacturing Cloud for Service cost?"
    a: "The pricing page lists Manufacturing Cloud Service Core at $275 and Service Max at $650 per user and month, billed annually, and Sales and Service Max at $700. Two footnotes contradict each other on whether these prices apply to Enterprise or Unlimited Edition, so check the quote."
  - q: "What is the difference between Manufacturing Cloud for Service and Service Cloud?"
    a: "Manufacturing Cloud for Service adds manufacturing features to service: warranty lifecycle management, the Asset Service Console, the Service Console for Manufacturing, pre-work estimation and a manufacturing data model. Case management, entitlements and knowledge come from Service Cloud."
  - q: "Can I mix Manufacturing Cloud and Service Cloud licenses in one org?"
    a: "In my programs I test a mix by role first. Access to warranty and claim objects comes with permission set licenses such as Warranty Lifecycle Management and Claims Management Foundation, so a Service Cloud user cannot simply read them because they are in the same org. Ask Salesforce to confirm the mix, the permission set licenses and the access rights in writing before you sign."
  - q: "Do field technicians need Manufacturing Cloud licenses?"
    a: "No. Technicians who work with the Field Service mobile app need Field Service licenses, Technician at $175 per user and month on Enterprise Edition. Field Service also requires at least one Service Cloud license in the org, existing Service Cloud customers need at least one Dispatcher license, and technicians need a dispatcher for scheduling."
draft: false
---

Manufacturing Cloud Service Core lists at $275 per user and month. Service Cloud costs $195 in Core, which Salesforce describes as the replacement for Enterprise Edition. The premium is therefore $80 per user and month. In my view it pays off for the users who handle warranty claims from dealers or customers. For case handling, entitlements and knowledge, Service Cloud is enough, and recall campaigns are also available through an add-on. A mixed license set is usually the cheaper answer, and the mix belongs in the contract.

## What do the licenses cost?

These are list prices per user and month, billed annually, as of October 2026:

| License | List price | Flex Credits per org and year |
|---|---|---|
| Service Cloud Core | $195 | 500,000 |
| Manufacturing Cloud Service Core | $275 | 500,000 |
| Manufacturing Cloud Service Max | $650 | 2,750,000 |
| Manufacturing Cloud Sales & Service Max | $700 | 2,750,000 |

The [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) lists Core at $195 and answers in its FAQ that "Core replaces Enterprise Edition, Advanced replaces Unlimited Edition, and Max replaces Agentforce 1 Edition". It no longer shows an Enterprise price. Salesforce [announced in September](https://www.salesforce.com/in/news/?p=14535) that "existing customer pricing on legacy editions remains unchanged". So new buyers usually compare against $195, existing Enterprise customers against the price in their current contract; expansion SKUs can differ. How the new editions differ is covered in [Salesforce editions Core, Advanced and Max](../salesforce-editions-core-advanced-max/).

The [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) has two footnotes that contradict each other. One says the prices are for Enterprise Edition and Unlimited costs $425. The other says the prices are for Unlimited Edition. The same announcement says new pricing for the industry editions will follow "later this fall". As of November 2026 the public page is inconsistent, so the order form has to name the SKU, the base edition, the included permission set licenses and the price.

## The premium buys warranty, two consoles and the data model

The Manufacturing Cloud pricing page lists these service features: Warranty Lifecycle Management, Asset Service Console, Service Console for Mfg and Pre-Work Estimation, plus the manufacturing data models. Service Max adds Contact Center Digital, Workforce Management, Quality Management and Customer Signal Intelligence, and the Max editions include "all full suite of Agentforce for Industries". The per-edition marks did not come through on the page I read, so confirm in the quote which edition includes which feature.

What these features do:

- **Warranty lifecycle management.** Warranty terms, claims from dealers, adjudication and supplier recovery, covered in [warranty claims from dealers](../warranty-claims-dealers-salesforce/).
- **Asset Service Console.** Milestones, warranties, cases, work orders and claims per machine. The data behind it is the topic of [installed base in Manufacturing Cloud](../installed-base-asset-milestones/).
- **Service Console for Manufacturing.** A redesigned contact page with assets, cases and orders of the caller's account. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/service-console-for-manufacturing-cloud-admin-essentials/learn-about-the-service-console-for-manufacturing), its timeline, recommendations and record alerts components are "available with the Industries Service Excellence license". Ask whether Service Core includes it.
- **Product service campaigns** for recalls and upgrades. Trailhead lists them as a Manufacturing Cloud capability, the pricing page does not. In Salesforce Help they belong to [Asset Service Lifecycle Management](https://help.salesforce.com/s/articleView?id=xcloud.aslm_psc_parent.htm&language=en_US&type=5), which Salesforce also offers outside Manufacturing Cloud, with Field Service, so campaigns alone do not justify Manufacturing Cloud. See [product recalls in Salesforce](../product-recalls-service-campaigns/).

## What does Service Cloud cover on its own?

More than many expect. The Service Cloud Core edition lists case management and a self-service help center. Check in the quote whether Core covers writing knowledge articles or only reading them. The comparison table on the pricing page also lists service contracts and entitlements, knowledge management, and asset management and product tracking. Assets with serial numbers and hierarchies are standard Salesforce objects.

So a hotline that takes calls, opens cases, checks a service contract and answers from knowledge articles works on Service Cloud. What it lacks is the manufacturing layer: warranty terms per product and part, claims with payment details per item, asset milestones, participants and fleets, campaigns with causal parts. If you only need a warranty end date on the asset to show the agent, and the ERP already calculates it reliably, a custom field is enough.

## Worked example: 45 users in service

I would decide by role, not by department. The example is an assumed machine builder with 45 service users. It is an isolated list price comparison under two assumptions: Service Core includes the warranty features, and the hotline gets read access to warranty data without a Manufacturing Cloud license. Both need confirmation.

| Role | Users | License |
|---|---|---|
| Hotline, first level | 30 | Service Cloud Core |
| Warranty adjudicators | 10 | Manufacturing Cloud Service Core |
| Quality, recalls | 5 | Manufacturing Cloud Service Core |

All 45 on Manufacturing Cloud Service Core cost $148,500 a year at list price. The mixed set costs $49,500 for the 15 Manufacturing Cloud users plus $70,200 for the 30 on Service Cloud Core, $119,700 in total. The difference is $28,800 a year, or 30 users times $80 times 12 months.

Three groups fall outside this table:

- **Field technicians** need Field Service licenses either way. The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/) lists Technician at $175 and Field Service+ Core at $250 since its November 2026 update, requires at least one Service Cloud user license, at least one Dispatcher for existing Service Cloud customers, and forbids Dispatcher and Technician licenses for case management. Whether Field Service pays off is covered in [is Salesforce Field Service worth it](../salesforce-field-service-worth-it/).
- **Dealers** who submit claims work in a portal with partner licenses, see [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).
- **Managers who only read reports** may not need a full license at all, see [does everyone need a full license](../salesforce-licences-full-licence-needed/).

```hinweis offen
One point I would always get in writing: which Manufacturing Cloud records, such as warranty claims or asset warranties, a Service Cloud user may see. Access comes with [permission set licenses](https://help.salesforce.com/s/articleView?id=mfg_permission_set_licenses.htm&language=en_US&type=5): Warranty Lifecycle Management, Claims Management Foundation and Industry Service Excellence for the consoles. The hotline usually needs to read warranty data, even if it never edits it.
```

## How do I decide?

A short rule that works for most manufacturers:

- **Warranty claims come in from outside:** Manufacturing Cloud for Service for the people who handle them.
- **Only recalls and upgrades:** compare Service Cloud plus Asset Service Lifecycle Management with Manufacturing Cloud.
- **Service means cases, contracts and answers:** Service Cloud, with a custom field for the warranty end date if needed.
- **Many technicians in the field:** decide Field Service as its own question, but check the service base license and Dispatcher rule it needs.

The alternative is a custom build on Service Cloud: your own objects for warranty terms, claims and campaigns.

```pro-contra
pro: Custom build on Service Cloud
- A nominal license difference of $14,400 a year for the 15 users above, $72,000 over five years if list prices and user counts stay the same
- Wins when your warranty process is simple, such as one term per product and few claims
contra: What you take on
- A custom warranty process with dealer portal, approvals and supplier recovery rarely costs less to build and maintain
- You own every change yourself
```

This is the same make-or-buy question as for the whole industry cloud, covered in [is Manufacturing Cloud worth it](../salesforce-manufacturing-cloud-is-it-worth-it/) and in the [scope and business case chapter](../../masterclass/manufacturing-cloud/scope-and-business-case/). I describe the approach under [make-or-buy and license forecasts](../../services/make-or-buy-licences/).

## Count the users per role for one region

Count the users per role for one region: how many handle warranty claims, how many run campaigns, how many only take calls. Then ask for a quote with exactly that mix, including the Industries Service Excellence question and read access for Service Cloud users. The after-sales features themselves are in the [warranty and after-sales chapter](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) of the Manufacturing Cloud masterclass.
