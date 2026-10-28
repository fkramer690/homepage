---
title: "Manufacturing Cloud: features, costs and business case"
description: "What Salesforce Manufacturing Cloud contains, what editions and add-ons cost, who needs which licence and when Sales Cloud plus a custom build is better."
lang: en
slug: scope-and-business-case
course: manufacturing-cloud
translationKey: mfg-01
chapter: 1
pubDate: 2026-10-28
short: "Scope and business case"
summary: "What Manufacturing Cloud contains, what it costs and when Sales Cloud plus a custom build is the better choice."
takeaways:
  - "Manufacturing Cloud is an industry cloud on top of Sales Cloud and Service Cloud with its own data model; Trailhead calls the same product Agentforce Manufacturing."
  - "At list price Manufacturing Cloud Sales Core costs $275 per user and month and Sales Cloud Core $195. For 120 sales users that is $115,200 extra per year."
  - "Max costs $650 instead of $275 and brings 2.75 million instead of 500,000 Flex Credits per org and year, ten times the Omnistudio calls and, as the only edition, the full Agentforce for Industries suite."
  - "Portal licences, the Agentforce add-on, Channel Revenue Management and Connected Assets are not part of the edition and belong in the calculation from the start."
  - "Without volume agreements, dealer rebates or warranty claims through partners, the reason for the industry licence is gone; then I compare Sales Cloud plus a custom build over five years."
articles: [manufacturing-cloud-worth-it, manufacturing-cloud-feature-map, manufacturing-cloud-add-ons-costs, salesforce-editions-core-advanced-max, salesforce-licence-types]
faq:
  - q: "What is Salesforce Manufacturing Cloud?"
    a: "Manufacturing Cloud is Salesforce's industry product for manufacturers. It sits on top of Sales Cloud and Service Cloud and adds its own data model plus features such as sales agreements, account forecasting, dealer rebates, warranty claims and product recalls."
  - q: "Is Agentforce Manufacturing the same as Manufacturing Cloud?"
    a: "Yes. The product and pricing pages say Manufacturing Cloud, for example Manufacturing Cloud Sales Core. Trailhead and the pricing page footnotes call the same product Agentforce Manufacturing."
  - q: "How much does Manufacturing Cloud cost?"
    a: "According to the pricing page in October 2026, Sales Core and Service Core cost $275 per user and month each, Sales Max and Service Max $650 and Sales & Service Max $700, all on annual contracts. Two footnotes on Enterprise and Unlimited Edition contradict each other, so the binding price only shows up in the quote."
  - q: "Do all users need a Manufacturing Cloud licence?"
    a: "Not automatically. I assign users by what they do in the system: agreements and forecasts, warranty claims, reading and approving. Whether a mixed licence set is allowed in your org is something to get confirmed in writing in the quote."
  - q: "Does Manufacturing Cloud include a quoting system with a configurator?"
    a: "No. The feature lists on Trailhead and the product pages name product catalog management, but no quoting system with configurator, approvals and contract generation. For that, Revenue Cloud, a partner product or a custom build are the options."
draft: false
---

Salesforce Manufacturing Cloud pays off when your business runs on volume agreements with planned quantities, on dealer rebates or on warranty claims through partners. It is an industry cloud on top of Sales Cloud and Service Cloud and costs $80 more per user and month than Sales Cloud Core at list price. Portal licences, Agentforce for Core users, Channel Revenue Management and Connected Assets come on top. If none of the core features matches how you sell, Sales Cloud plus a targeted custom build is usually cheaper. Decide with a five-year make-or-buy calculation and a licence forecast per user group.

## What is Salesforce Manufacturing Cloud?

Manufacturing Cloud is an industry cloud, a package for one industry that Salesforce puts on top of Sales Cloud and Service Cloud. It brings its own data model for manufacturers and features the core products do not have. The [Trailhead quick look on Agentforce Manufacturing](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) describes it as an extension of the core products Agentforce Sales and Agentforce Service, which is what Trailhead now calls Sales Cloud and Service Cloud.

That also settles the naming question. The [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) sells "Manufacturing Cloud Sales Core", while its footnotes speak of "Agentforce Manufacturing for Sales". One product, two names. In this masterclass I write Manufacturing Cloud, because that is what the quote will say. The new name has one practical consequence: not every feature with "Agentforce" in its name is an agent. For each one, ask which subagent, which action and which licence stand behind it.

## Which features does Manufacturing Cloud contain?

The features fall into four areas. The list follows the Trailhead quick look and the product pages:

| Area | Features | Chapter |
|---|---|---|
| Sales | Sales agreements, account forecasting and advanced account forecasting, program-based business, account manager targets, visit management | 2 |
| Service | Service console and asset service console, warranty lifecycle management, product service campaigns, prework estimation, inventory features | 4 |
| Channel | Rebate management, partner lead, partner performance and partner visit management | 3 |
| Tools | Omnistudio, Business Rules Engine, Data Processing Engine | all |

Which question each feature answers and where it stops is in [Manufacturing Cloud features: what is in the box](../../../blog/manufacturing-cloud-features-overview/). Two points from it decide the business case.

First, almost every sales and partner feature has its own switch. The [IndustriesManufacturingSettings metadata](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) has one field each for sales agreements, account forecasts, advanced forecasting, targets, programmes and the three partner features, all false by default. So a licence says nothing about what runs in your org. An org can pay for Manufacturing Cloud for years and use only sales agreements.

Second, the feature list also contains things Salesforce sells separately. Trailhead lists ship and debit and price protection under "Rebates" and Connected Assets under "Agentforce Service". On the [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) both have a price of their own.

What none of these lists contains is a quoting system with configurator, approvals and contract generation. Trailhead only names product catalog management. Quotes and configuration are covered by the Revenue Cloud masterclass, starting with the [overview and decision](../../revenue-cloud/revenue-cloud-overview/) and the chapter on [product catalog, configurator and pricing](../../revenue-cloud/product-catalog-configurator-pricing/).

## How much does Manufacturing Cloud cost compared to Sales Cloud?

List prices in October 2026, per user and month, billed annually, from the [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) and the [Sales Cloud pricing page](https://www.salesforce.com/sales-cloud/pricing/):

| Edition | Sales Cloud | Manufacturing Cloud |
|---|---|---|
| Core | $195 | $275 (Sales Core or Service Core) |
| Advanced | $395 | not listed |
| Max | $550 | $650 (Sales Max or Service Max) |
| Sales & Service Max | | $700 |

```kennzahlen
$80 | Core premium per user and month
$960 | Core premium per user and year
$115,200 | Premium per year for 120 sales users
source: Manufacturing Cloud and Sales Cloud pricing pages, list prices October 2026
```

One uncertainty belongs in every calculation. The pricing page has two footnotes that contradict each other. One says the prices are for Enterprise Edition and Unlimited costs $425. The other says they are for Unlimited Edition and Enterprise costs $275. Which price applies to your edition only shows up in the quote. On top of that, Salesforce [announced in September 2026](https://www.salesforce.com/in/news/?p=14535) that "new pricing for Agentforce Industry Editions will go into effect later this fall". The Manufacturing Cloud page already uses Core and Max, but its footnotes still speak of Enterprise and Unlimited. How the new editions differ is in [Salesforce editions Core, Advanced and Max](../../../blog/salesforce-editions-core-advanced-max/). If your renewal is due now, keep the option to switch editions once the industry prices are final.

### Core or Max: what changes besides the price

The gap between Core and Max is large, and it buys more than agents. The pricing page lists per edition:

| Per edition | Core | Max |
|---|---|---|
| Flex Credits | 500,000 per org and year | 2,750,000 per org and year |
| Omnistudio calls | 100,000 per month | 1,000,000 per month |
| Business Rules Engine calls | 10,000 per month | 50,000 per month |
| Data storage | 20 MB per user | 1 GB per user |
| Agentforce | via Flex Credits | full Agentforce for Industries suite |

Flex Credits are the consumption currency Salesforce uses to bill agent actions, prompts and data processing. How far a pool goes is calculated in the chapter [costs and tokens](../../ai-salesforce/costs-and-tokens/) of the AI masterclass. The pools apply per org, regardless of the number of users.

For manufacturers the call limits often matter more than the credits. Omnistudio builds guided processes, the Business Rules Engine evaluates rules, for example when approving warranty claims. If warranty, rebates and portal processes all run on these engines, 10,000 rule calls a month go quickly. In my view only a feature need that Core does not cover justifies Max. For extra credits alone, Max is too expensive.

## Which add-ons show up in the quote?

The edition is the first line of a quote. The following add-ons are on the add-ons page and belong in the calculation from the start, not in the last round of negotiation:

- **Portal licences.** Experience Cloud for Manufacturing costs $15 per login or $35 per member and month for customers, $20 or $50 for partners. Anyone who connects dealers almost always needs them.
- **Agentforce for Manufacturing Cloud Add-on.** The add-ons page says $150 per user and month, the pricing page "from $150" per login. Get the unit in writing.
- **Channel Revenue Management for Manufacturing.** $30,000 per org and year; this is where ship and debit and price protection for distributors live.
- **Connected Assets.** $15,000 per org and month, billed annually, for machine data in Salesforce.
- **Additional Omnistudio calls.** 2 million calls for $10,000 per month, with no smaller unit.
- **Manufacturing Intelligence.** Its [own page](https://salesforce.com/manufacturing/cloud/manufacturing-intelligence) says $220 per login and month, the [Experience Cloud page](https://salesforce.com/manufacturing/cloud/experience-cloud) "from $165" without a unit. The same page lists rebate management "from $75", also without a unit.

What this adds up to in an assumed scenario with 150 users and 400 dealers is calculated in [Manufacturing Cloud add-ons: what costs extra](../../../blog/manufacturing-cloud-add-ons-extra-costs/). There the typical add-ons raise the licence line by about 40 percent.

## Who needs which licence?

A quote from a partner or account team often assumes that every user gets the industry licence. Instead, I build a licence forecast by activity:

1. **Sales with agreements and forecasts** needs Sales Core or Sales Max.
2. **Back office for warranty claims and recalls** works with service features, so Service Core or Service Max. Anyone who needs both sides ends up on Sales & Service Max at $700.
3. **Reading, approving, reporting** often needs no full licence. Whether a Platform licence may see the objects involved, a sales agreement for example, has to be clarified before you buy. The limits and prices of Platform licences are in [Salesforce licences: does everyone need a full one?](../../../blog/salesforce-licences-full-licence-needed/).
4. **Dealers and customers** get portal licences, member licences for frequent use, login licences for occasional use.
5. **Interfaces** to the ERP run on integration users without a user interface.

```hinweis offen
The pricing page does not say which service features a Sales Core user may use, nor whether a mixed set of Core, Max and Sales Cloud users is allowed in one org. Get both confirmed in writing before the licence count goes into the contract.
```

## When is Manufacturing Cloud the wrong choice?

The most important case: your sales team does not work with long-term volume agreements. Sales agreements are the central sales feature. A sales agreement records prices and planned quantities per customer, product and period and sets the actual quantities against them. In [part 1 of the series](../../../blog/salesforce-manufacturing-cloud-is-it-worth-it/) I describe a manufacturing project where exactly this feature did not matter; there, a custom build on the platform was cheaper and easier to maintain.

The second case: framework contracts and call-offs already live cleanly in the ERP. Then the question is whether Salesforce should own them at all. Two systems that both maintain quantities and prices will drift apart sooner or later. Often it is enough for Salesforce to show the numbers from the ERP.

The third case: the real problem sits in the quote, with many variants and configuration rules. Manufacturing Cloud does not solve that. The decision then belongs to Revenue Cloud or another quoting route, and Manufacturing Cloud may follow later for the agreements.

## Does Manufacturing Cloud pay off for a machine builder without volume agreements?

Only if another feature carries the premium on its own. A machine builder often sells individual machines in project business, without recurring quantities. Then the main reason is gone, and three candidates remain:

- **Warranty through dealers.** Claims come in from outside through a portal and are checked by hand today. Warranty lifecycle management with approval rules can carry the case. It is a service feature, so the users need Service Core.
- **Recalls and retrofits** across many delivered machines. Product service campaigns need a maintained installed base with serial numbers.
- **Dealer rebates** that are calculated in spreadsheets today.

If none of these clearly applies, I stay with Sales Cloud and Service Cloud. The features in detail are in [chapter 3 on the dealer channel](../dealer-and-partner-channel/) and [chapter 4 on warranty and after-sales](../warranty-and-after-sales/).

## Make-or-buy over five years

Choosing between an industry cloud and a custom build is a make-or-buy question over several years. The price in year one is the least interesting number. For both options I calculate four blocks:

1. **Licences per user group**, with expected growth and the add-ons on the roadmap.
2. **Implementation** by internal teams and partners. An industry cloud also has to be configured, integrated and tested.
3. **Maintenance and releases.** Custom code causes effort with each of the three Salesforce releases a year. Salesforce develops a standard feature further.
4. **Follow-up costs**, such as a later switch or add-ons that only become necessary in year three.

A typical scenario, as an assumption: a component maker with 120 sales users wants to see plan against actuals per customer and product. The list prices come from the pricing pages, all other numbers are assumptions.

| Five years | Manufacturing Cloud Sales Core | Sales Cloud Core plus custom build |
|---|---|---|
| Licence premium, 120 users | $576,000 | 0 |
| Implementing agreements | $80,000 | $150,000 |
| Maintenance and releases | $50,000 | $150,000 |
| **Total** | **$706,000** | **$300,000** |

For a lean plan against actuals view the custom build wins clearly. The picture turns once renewals, approvals, forecasts, dealer access and rebates are added. Each of them raises implementation and maintenance of the custom build, while the licence premium stays the same. So calculate the feature scope you will need in three years, not just the first step.

The result belongs in a decision log: which features were checked, which numbers applied, who decided. After a partner change it is often the only document that explains why the org looks the way it does. How I build these calculations is described under [make-or-buy and licence forecasts](../../../services/make-or-buy-licences/); fitting the result into the overall architecture is part of [Salesforce architecture](../../../services/salesforce-architecture/).

## Where should you start?

Before a quote is on the table, three questions to sales and service help: what share of revenue runs through volume agreements? How are dealer bonuses calculated today? Who checks warranty claims, and how long does it take? The answers show faster than any demo whether Manufacturing Cloud fits. If a quote is already there, check it against the checklist in the feature overview: every feature from the business case, with the licence that covers it.

If the answer is volume agreements, [chapter 2 on agreements and forecasting](../agreements-and-forecasting/) continues with the data that has to come from the ERP for them. All chapters are on the [overview page](../).

Manufacturing Cloud pays off when its core features match your business, and a five-year calculation shows that earlier than the first workshop. If you want a quote checked or the business case calculated, [send me a message](#contact).
