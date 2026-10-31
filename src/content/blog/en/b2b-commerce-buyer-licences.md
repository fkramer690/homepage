---
title: "B2B Commerce buyer licences: who needs which one?"
description: "Which Salesforce licences buyers, buyer managers, merchandisers and sales reps need for B2B Commerce, member or login, and which limits to plan for early."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-buyer-licences
translationKey: commerce-buyer-licences
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: licences
tags: [B2B Commerce, licences, Customer Community Plus, Experience Cloud, dealers]
takeaways:
  - "From three login days a month, the member licence is cheaper. So login days per buyer decide the bill more than the number of dealers does."
  - "Buyer licences are not part of the Commerce editions. The B2B pricing page lists storefronts, Order Management and Data Cloud credits."
  - "At the Experience Cloud for Manufacturing list price, Customer Community Plus costs $35 per member or $15 per login and month."
  - "Customer Community Plus needs roles. The default is 50,000 portal roles per org, which Salesforce can extend for B2B."
  - "A buyer who orders for many accounts uses the Account Switcher, which slows down beyond 200 accounts and fails at 2,000."
faq:
  - q: "Which licence do buyers need in Salesforce B2B Commerce?"
    a: "Trailhead names Customer Community Plus for buyers and buyer managers. Buyers get the B2B Commerce User permission, buyer managers B2B Commerce Super User and Delegated External User Administration."
  - q: "Is a member or a login licence better for B2B buyers?"
    a: "It depends on login days per month. At $35 per member and $15 per login, a buyer with up to two login days a month is cheaper on login, from three days on the member licence is cheaper. Several logins on one day count once."
  - q: "Are buyer licences included in the B2B Commerce edition?"
    a: "No. The Growth and Advanced editions are billed as a share of gross merchandise value, and the pricing page lists no buyer licences. They come on top and belong in the quote as a separate line."
  - q: "Can buyer managers create users for their own company?"
    a: "Yes. Trailhead gives buyer managers the Delegated External User Administration permission, so they can manage buyers of their company in one or several buyer accounts."
draft: false
---

According to Trailhead, buyers and buyer managers in a Salesforce B2B Commerce store need a Customer Community Plus licence. Merchandisers who maintain the store need the "B2B and D2C Commerce" licence, developers and site builders a full Salesforce licence. The pricing page of the Commerce editions, which Salesforce bills as a share of gross merchandise value, lists none of these user licences. At the Experience Cloud for Manufacturing list price, a buyer costs $35 per member or $15 per login and month. Whether member or login licences are cheaper depends on how often your dealers actually log in.

## Which licences does B2B Commerce need?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", runs the store as a site on Experience Cloud. Everybody who works with the store needs a licence, and which one depends on the role. Salesforce's description of personas and permissions names these roles:

| Role | What the role does | Licence | Permissions |
|---|---|---|---|
| Buyer | Views and buys products for a company | Customer Community Plus | B2B Commerce User, Flow User |
| Buyer manager | Approves purchases, manages buyers | Customer Community Plus | B2B Commerce Super User, Manage Account Address, Delegated External User Administration |
| Merchandiser | Runs catalogue, store features and launches | B2B and D2C Commerce | Through the licence on the internal user |
| Developer, front-end builder | Loads product data, builds checkout and pages | Full Salesforce licence | Customize Application, Author Apex, Create and Set Up Experiences |

The [B2B Commerce pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) lists 6 or 10 storefronts, 20 inventory locations, Order Management, Data Cloud credits, the Merchant Agent and 3 or 5 users each for CRM Analytics and Knowledge. Buyer licences do not appear there. They come on top of the GMV fee, which I cover in [B2B Commerce pricing: what the GMV model costs](../b2b-commerce-pricing-gmv-model/).

## Buyers and buyer managers need Customer Community Plus

Both get Customer Community Plus. According to [Salesforce Help on external user licences](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5), this licence is meant for external users who need reports, dashboards and standard sharing. Partner Community is described there for business-to-business sites that need sales data, such as partner relationship management. Trailhead does not mention Partner Community for the store.

```hinweis offen
If your dealers already have Partner Community licences for a partner portal, I would ask Salesforce in writing whether these users can buy in the store with the licence they have. Two licences for the same person at the same dealer is the most expensive answer.
```

Buyer and buyer manager share the licence and differ in their permission set. A buyer manager, according to Trailhead:

- manages buyers in one buyer account or across several,
- reads, creates and edits carts and orders, like a buyer,
- edits address fields on contact point addresses, which buyers can only read.

With Delegated External User Administration, the dealer's buyer manager onboards new staff without a ticket to your inside sales team. In a rollout this saves more work than most store features, which is why I describe it in [the dealer rollout](../b2b-shop-dealer-rollout/).

## Member or login licence: which is cheaper?

Help explains the two models like this. A member licence is assigned to one person, who can log in as often as they like. For login licences you buy a number of logins per month, and each login to the site uses one. Several logins by the same person on the same day count once, Salesforce calls this a daily unique login.

The [Experience Cloud for Manufacturing page](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) lists these list prices, billed annually:

| Licence | Per member and month | Per login and month |
|---|---|---|
| Customer Community Plus | $35 | $15 |
| Partner Community | $50 | $20 |

The break-even is simple. A buyer with two login days a month costs $30 on login and $35 as a member. From three login days, at $45, the member licence is cheaper. Anyone who orders weekly therefore gets a member licence, anyone who orders a few times a year a login licence.

Worked example: a manufacturer with 250 dealers, each with one buyer manager and two buyers, so 750 users. 150 of them order several times a week and get member licences: 150 × $35 = $5,250 a month. The other 600 log in once a month on average: 600 logins × $15 = $9,000. Together that is $14,250 a month, or $171,000 a year at list price. With member licences for all 750 users it would be $26,250 a month, or $315,000 a year.

```hinweis achtung
A login day is any day someone logs in, also to check an order status. If the store is where dealers look up delivery dates, login days rise even when orders do not.
```

## Roles and the Account Switcher limit the plan

Some limits sit next to the licence and show up late if nobody checks them. The [Commerce developer guide on buyer limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) and Help name these:

- **Roles.** Customer Community Plus and Partner Community need roles for external users. The default limit is 50,000 roles across all portals of an org. According to the developer guide, Salesforce can extend this for B2B, and above one million shoppers you talk to your account team. Help also mentions account role optimization, which creates a role only when an account has a second user.
- **Buyer users.** 1.5 million buyers and buyer managers combined, as a soft limit.
- **Account Switcher.** A buyer who orders for several accounts, for example central purchasing at a dealer group with many branches, switches between them. The soft limit is 200 accounts. Beyond that, performance degrades, and at 2,000 accounts the switcher fails. Above 200 you need your own switcher.
- **Report subscriptions.** Customer Community Plus does not include them. A buyer manager who expects a weekly report by email will not get it this way.

## What about sales reps and inside sales?

Internal staff work in Salesforce with their internal licence. The Trailhead persona list for the store has no sales rep. Two current features are aimed at them:

- **Order templates**, generally available since September 2026 according to the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/): buyers and sales reps create, save and reuse common orders.
- **Reorder portal**: a rep invites a buyer to a page with past orders ready to reorder. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal), integrating it with Sales Cloud needs an Agentforce Commerce licence and an enabled digital experience.

My advice: write down per internal group what they do in the store, for example look at it as a dealer would, order on a dealer's behalf or maintain the catalogue, and have Salesforce confirm in the quote which licence covers each activity. Which internal users really need a full licence is covered in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## First step: count login days per buyer

Build a list with four columns: role, number of people, login days per month and licence. Fill it from your order data of the last twelve months: who ordered how often by phone, email or portal. Then check the limits above, especially roles and the Account Switcher for dealer groups. Whether a store or a portal fits your dealers at all is the question in [B2B Commerce or dealer portal](../b2b-commerce-or-dealer-portal/), and the whole cost picture is in [chapter 1 of the B2B Commerce masterclass](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/). Licence forecasts like this are part of my work on [make-or-buy and licences](../../services/make-or-buy-licences/).
