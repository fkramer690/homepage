---
title: "Salesforce editions Core, Advanced, Max for manufacturers"
description: "What the Salesforce editions Core, Advanced and Max mean for a manufacturer's license plan, how far the Flex Credit pools go and why credits rarely justify Max."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: salesforce-editions-core-advanced-max
translationKey: salesforce-editions-core-advanced-max
topic: governance
categories: [architecture, ai]
contactBrief: licences
tags: [licenses, editions, flex credits, agentforce, make-or-buy, manufacturing]
takeaways:
  - "Sales and Service Cloud Core, Advanced and Max list at $195, $395 and $550 per user and month; legacy-edition pricing stays unchanged."
  - "The pools hold 500,000, 1 million and 2.75 million Flex Credits per org, which would cost $2,500, $5,000 and $13,750 at list price."
  - "In the worked example, a dealer agent with 1,500 enquiries a month and three actions each uses 1.08 million credits a year."
  - "Moving 200 users from Core to Advanced costs $480,000 a year more for credits with a list price of $2,500, so choose by features."
  - "Manufacturing Cloud lists only Core and Max, and since November 2026 Field Service has its own Core, Advanced and Max editions."
faq:
  - q: "Do existing Salesforce customers have to move to Core, Advanced or Max?"
    a: "No. Salesforce says existing customer pricing on legacy editions remains unchanged; your renewal terms still come from your contract. Whether Enterprise and Unlimited will still be offered at every renewal is not confirmed, so ask your account executive before the renewal talks start."
  - q: "Are the Flex Credits in the new editions per user or per org?"
    a: "Per org. The pricing tables list 500K Flex Credits per org for Core, and Max is stated per org per year. Confirm the entitlement period in the order form. Unused credits do not roll over past the order end date."
  - q: "How many Agentforce actions does the Core pool cover?"
    a: "500,000 credits cover 25,000 standard actions at 20 credits each, about 2,080 a month. Prompts, sandbox tests and Data 360 processing are also billed in Flex Credits, so the real number of actions is lower."
  - q: "Is the Max edition worth it for a manufacturer?"
    a: "Max is worth it when you need its features, such as the full Agentforce for Industries suite in Manufacturing Cloud or Service Rep Assistant and contact center functions in Service Cloud. For credits alone it is far too expensive for most user bases: 2.25 million extra credits cost about $11,250 at list price."
  - q: "What does Manufacturing Cloud cost in the new editions?"
    a: "The pricing page shows Sales Core and Service Core at $275 and the Max editions at $650 or $700 per user and month, billed annually. There is no Advanced edition on that page (as of 9 November 2026)."
draft: false
---

The Salesforce editions Core, Advanced and Max change a manufacturer's license plan mainly at the next renewal. Pricing on legacy editions stays unchanged, and the included Flex Credit pools are small next to the seat costs: the 500,000 credits in Core would cost $2,500 at list price. A single dealer service agent can use more than the Advanced pool. I would therefore choose the edition by the features your sales and service teams need and plan agent consumption as its own budget line. Manufacturing Cloud and, since November 2026, Field Service have their own edition prices.

## What changed with Core, Advanced and Max?

On 3 September 2026 Salesforce [announced three editions](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) for Sales, Service and Industries. The prices and included credits for Sales Cloud and Service Cloud:

| Edition | List price per user and month | Flex Credits per org | Credits at list price |
|---|---|---|---|
| Core | $195 | 500,000 | $2,500 |
| Advanced | $395 | 1,000,000 | $5,000 |
| Max | $550 | 2,750,000 | $13,750 |

The [Sales Cloud pricing page](https://www.salesforce.com/sales-cloud/pricing/) lists the pools per org, and the [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) states Max explicitly "per org per year". Confirm the entitlement period for Core and Advanced in your order form. All three editions are billed annually. The value column uses the list price of [$500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/).

Every edition bundles Slack, Tableau Next, data security and the Premier Success Plan. The differences that matter for a manufacturer sit in the AI and service features. In Service Cloud, Advanced adds Casey, the help agent, and Max adds the full Agentforce for Service suite with Service Rep Assistant, unmetered Agentforce Coworker and contact center functions such as workforce engagement. In Sales Cloud, Max adds Agentforce for Sales, Sales Planning and Salesforce Maps. What Casey and Service Rep Assistant do for a service team is in [Service Cloud AI assistants](../service-cloud-casey-service-rep-assistant/).

For existing customers Salesforce writes that "existing customer pricing on legacy editions remains unchanged", and Agentforce 1 Edition customers can move to Max at no extra cost. For new buyers the Sales Cloud pricing page already lists only Free, Starter, Pro Suite, Core, Advanced and Max. Whether Enterprise and Unlimited stay available at your renewal is [not confirmed](https://www.salesforceben.com/salesforce-announces-3-replacement-editions-bundling-ai-slack-and-security/). The claimed "70% more value" of Core over Enterprise only counts if your teams use what is bundled.

The edition question only concerns users who need a full CRM license. Readers, approvers and dealers often do not, as described in [does everyone need a full license](../salesforce-licences-full-licence-needed/). I would settle that first, because every user on a Platform or portal license is one you do not pay Core or Max for.

## A Flex Credit pool covers 25,000 to 137,500 actions a year

According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) (updated 3 November 2026), a standard or custom action costs 20 credits in production. That turns the pools into actions:

- **Core:** 25,000 actions a year, about 2,080 a month.
- **Advanced:** 50,000 actions a year, about 4,170 a month.
- **Max:** 137,500 actions a year, about 11,460 a month.

These are upper limits, because the rate card bills more than actions in Flex Credits:

- **Prompts** cost 2 to 16 credits each, depending on the model class.
- **Sandbox tests** cost 16 credits per action, so testing an agent is not free.
- **Data 360** charges 150 credits per MB at the base tier to process unstructured documents such as manuals and spare part catalogs. The Manufacturing Cloud page describes the Core credits as "Flex credits for AI, Agentforce, Data, and more".
- **Headless Platform Interactions**, the meter for agent calls through API or MCP, are listed with the rate "TBA". Salesforce says Max will include an allocation of Headless 360 capacity in the future, without a date. Why this becomes a budget risk is in [MCP access as a budget item](../flex-credits-agentforce-cost-per-action/).

Two contract details matter. Credits must be used before the order end date and do not roll over. And the pricing pages state the pool per org, independent of seats: as listed, an org with 30 users gets the same 500,000 credits as one with 3,000. If you run separate orgs for sales and service or for regions, ask how the pool is allocated. How to estimate consumption per action is in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

## Worked example: 200 users and one dealer agent

Assume a machine builder with SAP, 120 Sales Cloud users and 80 Service Cloud users on Enterprise Edition, with the renewal due in spring 2027. All numbers are assumptions to show the method. The company plans one agent that answers dealer enquiries about order status, delivery dates and spare part availability.

Assumed consumption per year:

- **Production:** 1,500 enquiries a month with three actions each, 54,000 actions at 20 credits: 1,080,000 credits.
- **Prompts:** two standard prompts per enquiry at 4 credits: 144,000 credits.
- **Tests:** four test cycles of 500 conversations with three actions at 16 credits: 96,000 credits.
- **Data 360:** 1,000 MB of manuals and spare part lists processed once at 150 credits per MB: 150,000 credits.

That is about 1.47 million credits a year. Compared at list price for 200 users, with extra credits bought in packs of 100,000:

| Edition | Seats per year | Included credits | Credits to buy | Total |
|---|---|---|---|---|
| Core | $468,000 | 500,000 | 1,000,000 for $5,000 | $473,000 |
| Advanced | $948,000 | 1,000,000 | 500,000 for $2,500 | $950,500 |
| Max | $1,320,000 | 2,750,000 | none, 1.28 million expire | $1,320,000 |

The step from Core to Advanced costs $480,000 a year and brings 500,000 credits with a list price of $2,500. At this scale credits are no argument for an edition. The decision rests on features: does service need Casey, does sales use Sales Programs? If yes, upgrade for those. If not, Core plus purchased credits is cheaper. A fourth option is to stay on Enterprise Edition at unchanged pricing and buy 1.5 million credits for $7,500 at list price, plus whatever Agentforce license your contract requires. The dealer agent itself is calculated in detail in [what a dealer service agent costs](../flex-credits-agentforce-cost-per-action/).

## What about Manufacturing Cloud and Field Service?

**Manufacturing Cloud.** Salesforce announced new pricing for the Industries editions for "later this fall". As of 9 November 2026 the [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/), last changed on 6 October, shows Sales Core and Service Core at $275 and the Max editions at $650, or $700 for Sales and Service Max, billed annually, with 500K Flex Credits per org in Core and 2.75 million in Max. It prices no Advanced edition and lists the full Agentforce for Industries suite only in Max. What comes on top as add-ons is in [Manufacturing Cloud add-ons: what costs extra](../manufacturing-cloud-add-ons-extra-costs/). Its footnotes on Enterprise and Unlimited contradict each other, which I covered in [when Manufacturing Cloud pays off](../salesforce-manufacturing-cloud-is-it-worth-it/).

```hinweis achtung
If your renewal falls in the coming months, I would not sign three years of Manufacturing Cloud seats without asking whether further Industries editions, such as an Advanced tier, are coming, and without the right to switch once they are.
```

**Field Service.** Since November 2026 the [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/), last changed on 5 November, has its own editions: Field Service+ Core at $250, Field Service+ Advanced at $450 and Field Service Max at $650 per user and month, with 500K, 1M and 2.75M Flex Credits per org. Dispatcher and Technician stay as role licenses at $175, without credits; on them the Scheduling Agent "requires Flex Credits". The earlier Field Service Plus and Agentforce 1 Field Service no longer appear on the page. A machine builder with field technicians therefore still plans per role: editions for the office, Technician licenses plus purchased credits for most of the field. Which license fits which role is in [Field Service licenses by role](../field-service-licences-by-role/), and whether Field Service pays off at all in [is Salesforce Field Service worth it](../salesforce-field-service-worth-it/).

**Revenue Cloud.** For quoting and billing, Revenue Cloud has its own editions, covered in [Revenue Cloud pricing: Growth, Advanced and add-ons](../revenue-cloud-editions-pricing/).

## When is Max worth it for a manufacturer?

For a user base like the 200 users above, Max is worth it for its features, not for its credits.

```pro-contra
pro: Max can make sense when
- Service needs **Service Rep Assistant and contact center functions** anyway
- Manufacturing Cloud users need the **full Agentforce for Industries suite**, which the pricing page lists only in Max
- You are on **Agentforce 1 Edition** today; the move to Max costs nothing extra
- Many employees use **Agentforce Coworker**, which the Service Cloud page lists as unmetered in Max
contra: What the credits do not make up for
- Compared with Core, Max includes 2.25 million more credits, worth about $11,250 at list price
- The price difference for 200 users is $852,000 a year
```

An edition applies to the whole org, so mixing Core and Max seats in one org is not the normal route. If only a small group of power users needs AI features, ask whether those features are sold as user-level add-ons instead of lifting all 200 users. These trade-offs are the core of my [make-or-buy and license planning](../../services/make-or-buy-licences/).

## Clean up the user base before the renewal

1. **Clean up the user base.** Decide who needs a full license at all before you compare editions.
2. **List features per user group** that exist only in Advanced or Max, and today's add-ons an edition would replace.
3. **Estimate credits per agent and year,** with prompts, sandbox tests and Data 360, not only production actions.
4. **Get three answers in writing:** pool per org and year, allocation across several orgs, and what happens to unused credits at the order end date.
5. **Set up monitoring.** [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) shows consumption by agent, action and channel and sends alerts at thresholds; it requires Data 360.
6. **For Manufacturing Cloud,** ask whether further Industries editions are coming, and secure the right to switch.
