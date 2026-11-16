---
title: "Manufacturing Cloud features: what is in the box"
description: "Which features Manufacturing Cloud brings for sales, service and dealers, which ones need their own switch and which Salesforce sells as separate add-ons."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: manufacturing-cloud-features-overview
translationKey: manufacturing-cloud-feature-map
topic: governance
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, licenses, sales agreements, warranty, dealer channel, make-or-buy]
takeaways:
  - "The core sales and partner features each have their own setting in IndustriesManufacturingSettings, false by default."
  - "Ship and debit sits in Channel Revenue Management at $30,000 per org and year. Recall campaigns and repair estimates come with an add-on."
  - "Features with Agentforce in their name are not always agents. Ask which subagent, action and license stand behind each one."
  - "A quote should name every feature the business case needs, with the license that covers it, not only the edition."
faq:
  - q: "Which features does Salesforce Manufacturing Cloud include?"
    a: "For sales: sales agreements, account forecasting, program-based business, account manager targets and visit management. For service: service console, asset service console and warranty lifecycle management, depending on the edition. For the channel: partner lead, performance and visit management. Product service campaigns, work order estimation and inventory features belong to the Asset Service Lifecycle Management add-on, while rebates and ship and debit belong to Channel Revenue Management."
  - q: "Is Manufacturing Cloud the same as Agentforce Manufacturing?"
    a: "Yes. The product and pricing pages say Manufacturing Cloud, for example Manufacturing Cloud Sales Core. Trailhead and the pricing footnotes say Agentforce Manufacturing. Both mean the same product. Agentforce for Manufacturing, with 'for', is something else: the agent templates, sold as an add-on for Core and Advanced users."
  - q: "Is ship and debit part of Manufacturing Cloud?"
    a: "Trailhead lists it among the Agentforce Manufacturing capabilities, but describes Ship and Debit Process Management as a feature within Channel Revenue Management. The add-ons page sells Channel Revenue Management for Manufacturing separately at $30,000 per org per year."
  - q: "How do I see which Manufacturing Cloud features are active in my org?"
    a: "Check the Manufacturing settings in Setup or retrieve the IndustriesManufacturingSettings metadata. Sales and partner features such as advanced account forecasting, programs, account manager targets and partner visit management each have their own field, and each field is false by default. Warranty, consoles and add-ons are enabled elsewhere."
draft: false
---

Salesforce Manufacturing Cloud contains three groups of features: sales agreements, forecasting, programs, targets and visits for sales; warranty and two consoles for service; partner features for the dealer channel. The core sales and partner features are switched on one by one, so "we have Manufacturing Cloud" tells you little about what actually runs. Some capabilities that Salesforce lists right next to them are sold separately, among them rebates, ship and debit, recall campaigns and Connected Assets. Before a quote is signed, I want every feature the business case depends on listed in the quote, together with the license that covers it.

## What does Manufacturing Cloud contain for sales?

Manufacturing Cloud is an industry cloud on top of Sales Cloud and Service Cloud, with its own data model for manufacturers. Whether it is worth the cost is covered in [Manufacturing Cloud: is it worth it?](/en/blog/salesforce-manufacturing-cloud-is-it-worth-it/). Here the question is narrower: what is in the box. The [product page for sales](https://salesforce.com/manufacturing/cloud/sales) and the [Trailhead quick look](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) name five sales features:

| Feature | What it does | The question it answers |
|---|---|---|
| Sales agreements | Run-rate agreements with planned quantities, price, cost and margin per period; actuals from the ERP or order management | Which customer is behind on committed volume? |
| Account forecasting | A forecast across new and run-rate business, with a formula builder and a hand-over to demand and financial planning systems | What will each customer take per product and month? |
| Program-based business | Market size per manufacturer and program, third-party demand data, component forecasts | How many components will an OEM program need? |
| Account manager targets | Top-down targets by volume, revenue or a custom measure | Is the team on track per customer, product and region? |
| Visit management | Visits planned from action plan templates, tasks and metrics captured on mobile | What did the rep check at the customer or dealer? |

Forecasting exists twice: the settings have one switch for account forecasts and one for advanced account forecasting. The Trailhead quick look lists only the advanced version. How it works and where its limits are is covered in [account forecasting for sales volume planning](/en/blog/account-forecasting-sales-volume-planning/), while programs are covered in [program-based business for suppliers](/en/blog/program-based-business-supplier-forecasts/).

Trailhead also lists product catalog management, which keeps product definitions and pricing structures in one place. Standard quotes come with the underlying Sales Cloud. A quoting system with configurator, complex pricing, approvals and contract generation does not appear in any of these feature lists; for that I look at Revenue Cloud.

## For service, warranty, campaigns and two consoles come on top

The [product page for service](https://salesforce.com/manufacturing/cloud/service) names three blocks:

- **Service console.** A timeline of customer interactions, alerts on warranty renewals, asset problems, order delays and open cases, and actions such as creating a warranty claim or selling an extended warranty.
- **Asset service console.** One view per asset with milestones, serial number, related accounts and contacts, warranties, cases, work orders and claims.
- **Warranty lifecycle management.** Warranty programs by duration, usage limits and covered parts, business rules that approve claims, and claims submitted by partners and customers through portals or the API.

Trailhead adds three more: product service campaigns for recalls and upgrades on a defined set of assets, prework estimation of labor, parts and cost before work begins, and inventory features for parts availability and replenishment. Salesforce Help lists all three under [Asset Service Lifecycle Management](https://help.salesforce.com/s/articleView?id=xcloud.aslm_psc_enable_aslm.htm&language=en_US&type=5), where the estimation is called work order estimation. The [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) sells that add-on at $75 per user per month for Field Service editions. Trailhead describes capabilities, not what a license includes.

The pricing page lists a separate service edition, Service Core at $275 per user per month, and combines sales and service only in Sales & Service Max at $700. The comparison table assigns features per edition, but the checkmarks did not come through in the text version I read, so check the table on the page and in the quote. Technician scheduling and the field mobile app belong to Field Service, with their own licenses unless a bundle in the quote includes them, as described in [is Salesforce Field Service worth it?](/en/blog/salesforce-field-service-worth-it/).

## What is in it for dealers and the channel?

This is where the feature lists get confusing. Trailhead groups the channel features under two headings:

- **Rebates:** rebate management, ship and debit process management, price protection, and Agentforce for channel revenue management.
- **Channel Revenue Management:** partner visit management, an actionable relationship center and a distributor performance dashboard.

The [ship and debit module](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) is clear: "Ship and Debit Process Management is a feature within Channel Revenue Management." And the [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) sells Channel Revenue Management for Manufacturing separately, at $30,000 per org per year. So a capability on the Agentforce Manufacturing feature list is an add-on in the quote.

Partner visit management is the opposite case. It has its own switch in the Manufacturing settings, next to partner lead management and partner performance management, but Trailhead lists it under the Channel Revenue Management heading. Salesforce Help documents it as a [Manufacturing Cloud feature](https://help.salesforce.com/s/articleView?id=ind.mfg_pvm_container.htm&language=en_US&type=5) in Enterprise and Unlimited Edition, which suggests that it is not part of the add-on. The Trailhead heading alone proves nothing either way.

```hinweis offen
Make sure the order form confirms that your edition provisions the permission sets for partner visit management before you plan dealer visits around it.
```

Rebate management itself is covered in [part 5 of the series](/en/blog/rebate-management-dealer-rebates/). Salesforce Help ties the rebate permission sets for portal users to an add-on license for Rebate Management, so plan it as an add-on, not as part of the edition. The conflicting prices are listed in [Manufacturing Cloud add-ons: what costs extra](/en/blog/manufacturing-cloud-add-ons-extra-costs/).

## Core sales and partner features have their own switch

Salesforce built it that way. The [IndustriesManufacturingSettings metadata](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) has one boolean field per sales and partner feature, all set to false by default. Warranty, the consoles and the add-ons are enabled in other places:

| Setting | Feature | Since API |
|---|---|---|
| enableIndManufacturing | Sales agreements | 47.0 (component) |
| enableIndustriesMfgAccountForecast | Account forecasts | 47.0 (component) |
| enableIndustriesMfgAdvForecast | Advanced account forecasting | 47.0 (component) |
| enableIndustriesMfgTargets | Account manager targets | 49.0 |
| enableIndustriesMfgProgram | Manufacturing programs | 54.0 |
| enablePartnerLeadManagement, enablePartnerPerformanceManagement, enablePartnerVisitManagement | Partner features | 56.0 |
| enableFleetManagement | Fleet management | 59.0 |

For the first three fields, the page gives no separate version, only the component's 47.0.

A license and an active feature are two different things. A usable feature needs four layers: the edition or add-on in the contract, the feature setting in the org, the permission set license for the user, and the permission set with data access. External users also need an Experience Cloud license. An org can pay for Manufacturing Cloud for years and use only sales agreements. On top of that, features depend on each other: program-based business needs advanced account forecasting, Data Pipelines and its own permission sets, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business). And the switches are metadata. They belong in version control and the release process like every other setting, not in a click in production.

## Manufacturing Cloud and Agentforce Manufacturing are the same product

Both names are in use. The pricing page sells "Manufacturing Cloud Sales Core", while its footnotes refer to "Agentforce Manufacturing for Sales". Trailhead calls the whole product Agentforce Manufacturing. It is one product with two names.

The name causes a practical problem. Trailhead lists "Agent-powered sales agreements", but the description is about long-term agreements on prices and products, without naming any agent action. "Agentforce for sales planning" is a real agent template with three documented subagents, as described in [what the Sales Planning agent really does](/en/blog/agentforce-sales-planning-agreements-forecasts/). And the automatic forecast for new products, which Trailhead attributes to Agentforce Manufacturing, is a scheduled calculation.

In every vendor workshop I would ask the same question: which subagent, which action, which license? Mind the small word: Agentforce Manufacturing is the product, while Agentforce for Manufacturing refers to the agent templates. For Core, the pricing page lists Agentforce via Flex Credits, and the add-ons page sells the Agentforce for Manufacturing Cloud add-on at $150 per user per month for Core and Advanced; the full Agentforce for Industries suite is only in the Max editions.

## Worked example: a quote for a hydraulics maker

Assume a maker of hydraulic components receives a quote for 120 Sales Core and 40 Service Core users. The business case lists six requirements: sales agreements with distributors, targets per account manager, quarterly visits at 60 dealers, warranty claims from dealers through a portal, price protection for distributors and an agent for agreement questions.

Checked against the feature lists:

1. **Sales agreements and targets:** in the sales feature list, each with its own switch.
2. **Dealer visits:** switch in the Manufacturing settings and documented as a Manufacturing Cloud feature; the permission sets need to be confirmed.
3. **Warranty claims:** a service feature, so the adjudicators need Service Core. The dealers need portal licenses on top.
4. **Price protection:** Channel Revenue Management, $30,000 per org per year.
5. **Agent:** Agentforce for Manufacturing add-on at $150 per user per month for Core users, or a Max edition.

Only two of the six points are clearly covered by the edition, and dealer visits most likely are too. Warranty, price protection and the agent need a separate line, and the dealers' Experience Cloud licenses are additional.

## What should the quote name explicitly?

1. **Every feature from the business case by name**, with the edition or add-on that covers it.
2. **Sales or service licenses per user group**, so warranty adjudicators do not end up on Sales Core.
3. **Channel features:** rebate management, partner visit and partner performance management, included or Channel Revenue Management.
4. **Portal licenses** per external user group.
5. **Agentforce:** add-on or Max, and the unit it is billed in.
6. **Permission set licenses** per user group, because they decide who can actually use a feature.
7. **Platform limits:** Flex Credits, Omnistudio and Business Rules Engine calls in the edition.
8. **The price basis:** the pricing page footnotes contradict each other on Enterprise and Unlimited Edition.

This list is the first half of chapter 1 of the [Manufacturing Cloud masterclass](/en/masterclass/manufacturing-cloud/scope-and-business-case/). Weighing the features against a custom build is part of my work on [make-or-buy and license forecasts](/en/services/make-or-buy-licences/).
