---
title: "Manufacturing Cloud add-ons: what costs extra"
metaTitle: "Manufacturing Cloud Pricing: what the add-ons cost extra"
description: "Which Manufacturing Cloud add-ons cost extra, from portal licenses to Agentforce and Connected Assets, where Salesforce pages disagree and what to ask."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: manufacturing-cloud-add-ons-extra-costs
translationKey: manufacturing-cloud-add-ons-costs
topic: governance
categories: [manufacturing-cloud, architecture]
contactBrief: licences
tags: [Manufacturing Cloud, licenses, add-ons, Experience Cloud, Agentforce, make-or-buy]
takeaways:
  - "Portal licenses cost $15 per login or $35 per member for customers, $20 or $50 for partners, per month at list price."
  - "The Agentforce add-on costs $150 per user and month on the add-ons page; the overview page says per login, so confirm the unit."
  - "Rebate Management has not been renewable since August 18, 2026; Channel Revenue Management is the successor."
  - "In the worked example, Connected Assets and extra OmniStudio calls would more than double the add-on costs."
faq:
  - q: "What does Salesforce Manufacturing Cloud cost?"
    a: "According to the pricing page (checked November 9, 2026), Sales Core and Service Core cost $275 per user and month, the Max editions $650 and Sales and Service Max $700, billed annually. Add-ons are charged on top: portal licenses from $15 per login and month, the Agentforce add-on at $150 per month and Channel Revenue Management at $30,000 per org and year."
  - q: "What do portal licenses for Manufacturing Cloud cost?"
    a: "According to the add-ons page (checked November 9, 2026), Experience Cloud for Manufacturing costs $15 per login or $35 per member per month for Customer Community Plus, and $20 per login or $50 per member for Partner Community, billed annually."
  - q: "Do I need the Agentforce add-on with a Max edition?"
    a: "The add-ons page lists the Agentforce for Manufacturing Cloud Add-on as available with Core and Advanced. The Max editions include the full Agentforce for Industries suite. Employee use is unmetered in both cases; customer-facing agents, prompts and Data 360 still consume Flex Credits."
  - q: "Is Channel Revenue Management included in Manufacturing Cloud?"
    a: "No. The add-ons page sells Channel Revenue Management for Manufacturing separately at $30,000 per org and year. Partner access, extra users and payouts can cost extra. It is also the successor of Rebate Management, which has not been renewable since August 18, 2026."
  - q: "What happens when OmniStudio calls exceed the edition limit?"
    a: "Core includes 100,000 OmniStudio calls per month, Max 1,000,000. The add-ons page sells 2 million additional calls at $10,000 per unit and month, which is $120,000 per year. Ask before go-live how calls are counted for your processes."
  - q: "Which Manufacturing Cloud add-on prices are unclear?"
    a: "The unit of the Agentforce add-on (the add-ons page says per user, the overview page says per login), the payout costs of Channel Revenue Management, and the edition used as the basis for pricing, because two footnotes on Enterprise and Unlimited Edition contradict each other."
draft: false
---

Manufacturing Cloud add-ons cost extra in addition to the edition price. Manufacturers who expose processes to dealers or customers need portal licenses, at $15 to $50 per month. The Agentforce add-on at $150 per month, Channel Revenue Management for Manufacturing at $30,000 per org and year and Connected Assets at $15,000 per org and month depend on the process. In an assumed scenario with 150 users and 400 dealers, the chosen add-ons raise the license line by about 40 percent. Some Salesforce pages disagree on units, and Rebate Management is no longer renewable, so each add-on should be included in the quote with a confirmed price.

## Which add-ons does Salesforce list for Manufacturing Cloud?

The [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) lists eleven add-ons (checked November 9, 2026), all prices in USD and generally billed annually. These are the ones relevant to most manufacturers:

| Add-on | List price | Available with | What it is for |
|---|---|---|---|
| Experience Cloud for Manufacturing, Customer Community Plus | $15 per login or $35 per member, per month | Core, Advanced, Max | Customer portal |
| Experience Cloud for Manufacturing, Partner Community | $20 per login or $50 per member, per month | Core, Advanced, Max | Dealer and partner portal |
| Agentforce for Manufacturing Cloud Add-on | $150 per user and month | Core, Advanced | Agents and AI for Core users |
| Channel Revenue Management for Manufacturing | $30,000 per org and year | Sales Core, Advanced, Max | Channel incentives and inventory |
| Connected Assets | $15,000 per org and month, billed annually | Core, Advanced, Sales Max | Telemetry from machines |
| Asset Service Lifecycle Management | $75 per user and month | Field Service editions | Asset management into the field |
| OmniStudio, 2 million additional calls | $10,000 per unit and month ($120,000 per year) | Core, Advanced, Max | More guided processes |
| MuleSoft Anypoint Platform | on request | Core, Advanced | Integration |

The rest are Feedback Management and survey packs. One oddity: the page lists add-ons as available with "Advanced", while the [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) prices only Core and Max editions, as I noted in [Salesforce editions Core, Advanced and Max](/en/blog/salesforce-editions-core-advanced-max/).

## Portal licenses for dealers and customers cost $15 to $50 a month

For manufacturers that expose agreements, claims, orders or service processes to dealers or customers, portal licenses are the most common extra cost. A member license is assigned to one user, who can log in as often as needed. A login license is bought as a monthly pool, and according to [Salesforce Help on Experience Cloud licenses](https://help.salesforce.com/s/articleView?id=sf.users_license_types_communities.htm&language=en_US&type=5) logging in several times on the same day counts as one daily unique login.

That gives a simple break-even. A partner member license costs $50, and a partner login license costs $20, so the member license becomes cheaper starting with the third login day per month. For customers, the comparison is $35 versus $15, again starting with the third day. As a rule of thumb, dealers who check orders and agreements weekly should use member licenses, while those who submit a warranty claim once a quarter should use login licenses. For seasonal use, base planning on daily unique logins over the year.

Which objects each license lets external users see, for example sales agreements or rebate claims, is covered in [part 7: the Manufacturing Cloud customer portal](/en/blog/manufacturing-cloud-customer-portal/). If dealers need to order spare parts in a shop with cart and checkout, that is B2B Commerce with its own cost model; see chapter 1 of the [B2B Commerce masterclass](/en/masterclass/b2b-commerce/b2b-commerce-worth-it-overview/).

## Agentforce: add-on or Max edition?

The add-ons page prices the Agentforce for Manufacturing Cloud Add-on at "$150/user/month". The pricing page lists the same add-on as "from $150 per login per month".

```hinweis offen
A per-user and a per-login price are different contracts. The detailed add-ons page and the [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) both say per user, so I plan on a per-user basis and have the unit confirmed in the quote.
```

The add-on is available with Core and Advanced, and the Max editions include the "full Agentforce for Industries suite". In list prices, Core plus add-on is $425 per user and month, Max $650. If only 20 key account managers need agents, the trade-off looks like this:

```pro-contra
pro: Add-on on Core
- $36,000 per year for the 20 users
- Moving the same 20 users from Core to Max would cost $90,000, if an org can mix Core and Max users at all
contra: What Max adds
- 2.75 million instead of 500,000 Flex Credits per org and year
- Higher platform limits, for example for OmniStudio calls
- Editions are licensed at org level, so mixing Core and Max users needs explicit confirmation from the account team
```

Employee use is unmetered with the add-on, and the pricing page lists Agentforce Coworker with "Unmetered usage" for Max. Customer-facing agents, prompts and Data 360 processing still consume Flex Credits, and for Core without the add-on the pricing page lists Agentforce "via Flex Credits". You can find guidance on estimating that consumption in [Flex Credits: Agentforce cost per action](/en/blog/flex-credits-agentforce-cost-per-action/) and in the masterclass chapter [costs and tokens](/en/masterclass/ai-salesforce/costs-and-tokens/).

## Which add-ons only matter for some manufacturers?

**Channel Revenue Management for Manufacturing, $30,000 per org and year.** This is where ship and debit and price protection for distributors are handled. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) calls ship and debit "a feature within Channel Revenue Management". The $30,000 is the base price with ten admin users; according to the [Channel Revenue Management pricing page](https://www.salesforce.com/sales/channel-revenue-management/pricing/), partner access, extra users and payouts are bought separately, and payouts consume credits based on their total value. It is worth it for manufacturers who sell through stocking distributors with price claims, but not for a few dealers with an annual bonus.

**Rebate Management: no longer renewable.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=005393495&language=en_US&type=1), Rebate Management, including Rebate Management for Manufacturing and the user add-on, has not been renewable since August 18, 2026. Existing subscriptions remain valid until the contract end date; the successor is Channel Revenue Management, which lists "Rebate Management and Payouts" as a feature. The "Rebate Management from $75" still shown on the [Experience Cloud add-on page](https://salesforce.com/manufacturing/cloud/experience-cloud) refers to the old add-on. [Part 5 of the series](/en/blog/rebate-management-dealer-rebates/) explains what rebate management does.

**Connected Assets, $15,000 per org and month.** That is $180,000 per year for machine telemetry in Salesforce. It only pays off once the service history is good enough to act on the data, as described in [predictive maintenance: what data you need](/en/blog/predictive-maintenance-salesforce-data-needed/).

**Manufacturing Intelligence, $220 per login and month.** Its [own page](https://salesforce.com/manufacturing/cloud/manufacturing-intelligence) lists CRM Analytics Plus at $165 and Manufacturing Intelligence at $220 per login and month, billed annually. The "from $165" on the Experience Cloud add-on page refers to the cheaper of the two. Before anyone budgets for it, I would want the included features in writing.

**Asset Service Lifecycle Management, $75 per user and month,** goes with Field Service editions, so it only concerns companies that also license Field Service.

## Platform limits turn into add-ons once a process runs on them

Every edition includes limits that look generous until a process relies on them. From the pricing page:

| Per edition | Core | Max |
|---|---|---|
| Flex Credits | 500,000 per org and year | 2,750,000 per org and year |
| OmniStudio calls | 100,000 per month | 1,000,000 per month |
| Business Rules Engine calls | 10,000 per month | 50,000 per month |
| Data storage | 20 MB per user | 1 GB per user |

The next block after OmniStudio's 100,000 calls in Core is a unit of 2 million calls at $10,000 per month. There is no smaller unit on the page. For the Business Rules Engine, which the product page uses for warranty claim approvals, this page lists no add-on price; Salesforce sells extra call blocks elsewhere, so ask for the price in the quote. If warranty claims, rebate rules and portal processes all use these engines, ask how calls are counted and what an extra block costs before the processes are built.

## Worked example: 150 users and 400 dealers

A machine builder licenses 150 sales users on Manufacturing Cloud Sales Core and opens a portal for 400 dealers. 100 dealers log in weekly, 300 about once a month. 20 key account managers are given agents, and the business sells through distributors with price protection. All figures are assumptions, and all prices are list prices per year:

| Line | Calculation | Per year |
|---|---|---|
| Sales Core | 150 users x $275 x 12 | $495,000 |
| Partner Community | (100 members x $50 + 300 logins x $20) x 12 | $132,000 |
| Agentforce add-on | 20 users x $150 x 12 | $36,000 |
| Channel Revenue Management | per org | $30,000 |
| **Add-ons** | | **$198,000** |

In this scenario the add-ons raise the license line by 40 percent, before any Channel Revenue Management payouts. If the same company also wants Connected Assets ($180,000) and exceeds the OmniStudio call allowance ($120,000), the add-ons come to $498,000, about as much as the 150 licenses themselves. Implementation, integration and Flex Credits beyond the pool are additional.

## What should you get in writing before signing?

1. **The price basis.** The edition cards are clear, but two older footnotes contradict each other: one says the prices are for Enterprise Edition and Unlimited costs $425, the other says they are for Unlimited Edition. Have the edition and SKU confirmed in the order form.
2. **The Agentforce unit:** per user or per login.
3. **Rebates:** Rebate Management has not been renewable since August 18, 2026; ask for Channel Revenue Management including partner access and payout credits, and for a migration path if you use Rebate Management today.
4. **Manufacturing Intelligence:** what it contains beyond CRM Analytics Plus.
5. **Portal licenses per group,** with the objects each group must see.
6. **OmniStudio and Business Rules Engine:** how calls are counted, and the price of an extra block.
7. **Add-ons for years two and three** at today's price, if they are on the roadmap.

Not every internal user needs the industry license either, as described in [does everyone need a full license?](/en/blog/salesforce-licences-full-licence-needed/). The full business case is in chapter 1 of the [Manufacturing Cloud masterclass](/en/masterclass/manufacturing-cloud/scope-and-business-case/), and the feature list behind it in [Manufacturing Cloud features: what is in the box](/en/blog/manufacturing-cloud-features-overview/). License forecasts are part of my work on [make-or-buy and licenses](/en/services/make-or-buy-licences/).
