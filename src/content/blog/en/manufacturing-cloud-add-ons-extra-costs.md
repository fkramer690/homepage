---
title: "Manufacturing Cloud add-ons: what costs extra"
description: "Which Manufacturing Cloud add-ons cost extra, from portal licences to Agentforce and Connected Assets, where Salesforce pages disagree and what to ask."
pubDate: 2026-10-28
lang: en
slug: manufacturing-cloud-add-ons-extra-costs
translationKey: manufacturing-cloud-add-ons-costs
topic: governance
categories: [manufacturing-cloud, architecture]
contactBrief: licences
tags: [Manufacturing Cloud, licences, add-ons, Experience Cloud, Agentforce, make-or-buy]
takeaways:
  - "Most manufacturers need at least portal licences on top of Manufacturing Cloud: $15 per login or $35 per member for customers, $20 or $50 for partners, per month at list price."
  - "The Agentforce for Manufacturing Cloud Add-on costs $150 per month. The add-ons page says per user, the pricing page says per login. Get the unit in writing."
  - "Channel Revenue Management for Manufacturing costs $30,000 per org and year, Connected Assets $15,000 per org and month. Both only pay off for specific processes."
  - "Salesforce pages contradict each other on Manufacturing Intelligence ($220 per login or from $165) and on rebate management (from $75 without a unit, or part of Channel Revenue Management)."
  - "In an assumed scenario with 150 users and 400 dealers, typical add-ons raise the licence line by about 40 percent; Connected Assets and extra Omnistudio calls would double it."
faq:
  - q: "What do portal licences for Manufacturing Cloud cost?"
    a: "According to the add-ons page in October 2026, Experience Cloud for Manufacturing costs $15 per login or $35 per member per month for Customer Community Plus, and $20 per login or $50 per member for Partner Community, billed annually."
  - q: "Do I need the Agentforce add-on with a Max edition?"
    a: "The add-ons page lists the Agentforce for Manufacturing Cloud Add-on as available with Core and Advanced. The Max editions include the full Agentforce for Industries suite. Agent consumption is billed in Flex Credits either way."
  - q: "Is Channel Revenue Management included in Manufacturing Cloud?"
    a: "No. The add-ons page sells Channel Revenue Management for Manufacturing separately at $30,000 per org and year. Trailhead describes ship and debit as a feature within Channel Revenue Management."
  - q: "What happens when Omnistudio calls exceed the edition limit?"
    a: "Core includes 100,000 Omnistudio calls per month, Max 1,000,000. The add-ons page sells 2 million additional calls at $10,000 per unit and month, which is $120,000 per year. How calls are counted for your processes is worth asking before go-live."
  - q: "Which Manufacturing Cloud add-on prices are unclear?"
    a: "The unit of the Agentforce add-on (user or login), the price of Manufacturing Intelligence ($220 per login or from $165), the price of rebate management (from $75 without a unit) and the edition basis, because two pricing footnotes on Enterprise and Unlimited Edition contradict each other."
draft: false
---

Manufacturing Cloud add-ons cost extra on top of the edition, and almost every manufacturer needs at least one of them: portal licences for dealers and customers, at $15 to $50 per month. The Agentforce add-on at $150 per month, Channel Revenue Management for Manufacturing at $30,000 per org and year and Connected Assets at $15,000 per org and month depend on the process. In an assumed scenario with 150 users and 400 dealers, typical add-ons raise the licence line by about 40 percent. Several Salesforce pages contradict each other on prices and units, so each add-on belongs in the quote with a confirmed price.

## Which add-ons does Salesforce list for Manufacturing Cloud?

The [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) lists eleven add-ons in October 2026, all prices in USD. These are the ones relevant to most manufacturers:

| Add-on | List price | Available with | What it is for |
|---|---|---|---|
| Experience Cloud for Manufacturing, Customer Community Plus | $15 per login or $35 per member, per month | Core, Advanced, Max | Customer portal |
| Experience Cloud for Manufacturing, Partner Community | $20 per login or $50 per member, per month | Core, Advanced, Max | Dealer and partner portal |
| Agentforce for Manufacturing Cloud Add-on | $150 per user and month | Core, Advanced | Agents and AI for Core users |
| Channel Revenue Management for Manufacturing | $30,000 per org and year | Sales Core, Advanced, Max | Channel incentives and inventory |
| Connected Assets | $15,000 per org and month, billed annually | Core, Advanced, Sales Max | Telemetry from machines |
| Asset Service Lifecycle Management | $75 per user and month | Field Service editions | Asset management into the field |
| Omnistudio, 2 million additional calls | $10,000 per unit and month ($120,000 per year) | Core, Advanced, Max | More guided processes |
| MuleSoft Anypoint Platform | on request | Core, Advanced | Integration |

The rest are Feedback Management and survey packs. One oddity: the page lists add-ons as available with "Advanced", while the [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) prices only Core and Max editions, as I noted in [Salesforce editions Core, Advanced and Max](../salesforce-editions-core-advanced-max/).

## What do dealers and customers in the portal cost?

Portal licences are the add-on almost nobody avoids. A member licence belongs to one user, who can log in as often as needed. A login licence is bought as a monthly pool, and according to [Salesforce Help on Experience Cloud licences](https://help.salesforce.com/s/articleView?id=sf.users_license_types_communities.htm&language=en_US&type=5) logging in several times on the same day counts as one daily unique login.

That gives a simple break-even. A partner member costs $50, a partner login $20, so the member licence pays off from the third login day per month. For customers it is $35 against $15, again from the third day. Dealers who check orders and agreements weekly belong on member licences, those who submit a warranty claim once a quarter on logins.

Which objects each licence lets external users see, for example sales agreements or rebate claims, is covered in [part 7: the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/). If dealers should order spare parts in a shop with cart and checkout, that is B2B Commerce with its own cost model, see chapter 1 of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/).

## Agentforce: add-on or Max edition?

The add-ons page prices the Agentforce for Manufacturing Cloud Add-on at "$150/user/month". The pricing page lists the same add-on as "from $150 per login per month".

```hinweis offen
A per-user and a per-login price are different contracts: with logins, users who rarely use the agent cost less; with users, every named person counts. I would not plan with either unit until the quote states it.
```

The add-on is available with Core and Advanced, and the Max editions include the "full Agentforce for Industries suite". In list prices, Core plus add-on is $425 per user and month, Max $650. If only 20 key account managers need agents, the trade-off looks like this:

```pro-contra
pro: Add-on on Core
- $36,000 per year for the 20 users
- Moving the same 20 users from Core to Max would cost $90,000
contra: What Max adds
- 2.75 million instead of 500,000 Flex Credits per org and year
- Higher platform limits, for example for Omnistudio calls
- Whether one org may mix Core and Max users is a question for the account team
```

Either way, every agent action still costs Flex Credits; for Core the pricing page lists Agentforce "via Flex Credits". How to estimate that consumption is in [Flex Credits: Agentforce cost per action](../flex-credits-agentforce-cost-per-action/) and in the masterclass chapter [costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).

## Which add-ons only matter for some manufacturers?

**Channel Revenue Management for Manufacturing, $30,000 per org and year.** This is where ship and debit and price protection for distributors live. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) calls ship and debit "a feature within Channel Revenue Management". Worth it for manufacturers who sell through stocking distributors with price claims, not for a few dealers with an annual bonus.

**Rebate management: a price conflict.** The [Experience Cloud add-on page](https://salesforce.com/manufacturing/cloud/experience-cloud) lists "Rebate Management from $75" without a unit. The [Channel Revenue Management pricing page](https://www.salesforce.com/sales/channel-revenue-management/pricing/) lists "Rebate Management and Payouts" as a feature of a quote-based offering and notes that it "Requires a Sales Cloud or CRM license". Whether rebates are included in your edition, cost from $75 per something, or need Channel Revenue Management, I cannot tell from these pages. What rebate management does is in [part 5 of the series](../rebate-management-dealer-rebates/).

**Connected Assets, $15,000 per org and month.** That is $180,000 per year for machine telemetry in Salesforce. It only pays off once the service history is good enough to act on the data, as described in [predictive maintenance: what data you need](../predictive-maintenance-salesforce-data-needed/).

**Manufacturing Intelligence: another price conflict.** Its [own page](https://salesforce.com/manufacturing/cloud/manufacturing-intelligence) says $220 per login and month, billed annually. The Experience Cloud add-on page lists it "from $165", without a unit. That page describes it only as insights "throughout the entire sales and revenue cycle". Before anyone budgets it, I would want the price and the contents in writing.

**Asset Service Lifecycle Management, $75 per user and month,** goes with Field Service editions, so it only concerns companies that also license Field Service.

## When do platform limits turn into add-ons?

Every edition includes limits that look generous until a process runs on them. From the pricing page:

| Per edition | Core | Max |
|---|---|---|
| Flex Credits | 500,000 per org and year | 2,750,000 per org and year |
| Omnistudio calls | 100,000 per month | 1,000,000 per month |
| Business Rules Engine calls | 10,000 per month | 50,000 per month |
| Data storage | 20 MB per user | 1 GB per user |

The step after Omnistudio's 100,000 calls in Core is a unit of 2 million calls at $10,000 per month. There is no smaller unit on the page. For the Business Rules Engine, which the product page uses for warranty claim approvals, the page lists no add-on price at all. If warranty claims, rebate rules and portal processes all run on these engines, ask how calls are counted and what an extra block costs before the processes are built.

## A typical scenario, as an assumption: 150 users and 400 dealers

A machine builder licenses 150 sales users on Manufacturing Cloud Sales Core and opens a portal for 400 dealers. 100 dealers log in weekly, 300 about once a month. 20 key account managers get agents, and the business sells through distributors with price protection. All numbers are assumptions, all prices list prices per year:

| Line | Calculation | Per year |
|---|---|---|
| Sales Core | 150 users x $275 x 12 | $495,000 |
| Partner Community | (100 members x $50 + 300 logins x $20) x 12 | $132,000 |
| Agentforce add-on | 20 users x $150 x 12 | $36,000 |
| Channel Revenue Management | per org | $30,000 |
| **Add-ons** | | **$198,000** |

The add-ons raise the licence line by 40 percent. If the same company also wants Connected Assets ($180,000) and outgrows the Omnistudio calls ($120,000), the add-ons cost more than the 150 licences themselves. Implementation, integration and Flex Credits beyond the pool come on top.

## What should you get in writing before signing?

1. **The price basis.** The pricing page has two footnotes: one says the prices are for Enterprise Edition and Unlimited costs $425, the other says they are for Unlimited Edition. Which applies to you?
2. **The Agentforce unit:** per user or per login.
3. **Rebate management:** included, "from $75" per what, or Channel Revenue Management.
4. **Manufacturing Intelligence:** $220 or from $165, and what it contains.
5. **Portal licences per group,** with the objects each group must see.
6. **Omnistudio and Business Rules Engine:** how calls are counted, and the price of an extra block.
7. **Add-ons for years two and three** at today's price, if they are on the roadmap.

Not every internal user needs the industry licence either, as described in [does everyone need a full licence?](../salesforce-licences-full-licence-needed/). The full business case is in chapter 1 of the [Manufacturing Cloud masterclass](../../masterclass/manufacturing-cloud/scope-and-business-case/), and the feature list behind it in [Manufacturing Cloud features: what is in the box](../manufacturing-cloud-features-overview/). Licence forecasts are part of my work on [make-or-buy and licences](../../services/make-or-buy-licences/).

The edition price is only the first line of a Manufacturing Cloud quote, and the add-ons decide the total. If you want a quote checked line by line, [send me a message](#contact).
