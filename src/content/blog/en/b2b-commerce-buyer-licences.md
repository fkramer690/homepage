---
title: "B2B Commerce buyer licenses: who needs which one?"
description: "Which Salesforce licenses buyers, buyer managers, merchandisers and sales reps need for B2B Commerce, member or login, and which limits to plan for early."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-buyer-licences
translationKey: commerce-buyer-licences
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: licences
tags: [B2B Commerce, licenses, Customer Community Plus, Experience Cloud, dealers]
takeaways:
  - "Plain buyers need only External Apps; buyer managers and buyers who see other buyers or switch accounts need Customer Community Plus."
  - "Buyer licenses are not part of the Commerce editions. The B2B pricing page lists storefronts, Order Management and Data Cloud credits."
  - "At the Experience Cloud for Manufacturing list price, Customer Community Plus costs $35 per member or $15 per login; members are cheaper from three login days."
  - "Customer Community Plus users need roles. The default is 50,000 portal roles per org, which Salesforce can extend for B2B."
  - "A buyer who orders for many accounts uses the Account Switcher, which slows down beyond 200 accounts and fails at 2,000."
faq:
  - q: "Which license do buyers need in Salesforce B2B Commerce?"
    a: "According to Salesforce Help, an External Apps license gives buyers the minimum access, or External Apps Login through the Registered Shopper SKU. Buyer managers and buyers who need to see other buyers need Customer Community Plus or higher."
  - q: "Is a member or a login license better for B2B buyers?"
    a: "For Customer Community Plus, it depends on login days per month. At $35 per member and $15 per login, a buyer with up to two login days a month is cheaper with login licensing; from three days on, the member license is cheaper. Several logins on one day count once."
  - q: "Are buyer licenses included in the B2B Commerce edition?"
    a: "The pricing page lists no buyer licenses. Growth is billed as a share of gross merchandise value, and Help names GMV or per-order pricing for Advanced. Ask whether External Apps buyer licenses are included and put every license in the quote as a separate line."
  - q: "Can buyer managers create users for their own company?"
    a: "Yes, if you assign them Delegated External User Administration, which Trailhead lists for the buyer manager persona. They can then manage buyers at their company in one or several buyer accounts."
draft: false
---

According to Salesforce Help, a plain buyer in a Salesforce B2B Commerce store needs only an External Apps license, or External Apps Login through the Registered Shopper SKU. Buyer managers, and buyers who need to see other buyers or switch between accounts, need Customer Community Plus or higher. Merchandisers need a Salesforce standard or Identity license with the Merchandiser permission set. The pricing page for the Commerce editions lists none of these user licenses. At the Experience Cloud for Manufacturing list price, Customer Community Plus costs $35 per member per month or $15 per login per month.

## Which licenses does B2B Commerce need?

Salesforce B2B Commerce, which Salesforce now calls "Agentforce Commerce for B2B" although Help and pricing pages still use both names, runs the store as a site on Experience Cloud. Everyone who works with the store needs a license, and the right one depends on the role. [Salesforce Help on B2B Commerce licenses](https://help.salesforce.com/s/articleView?id=commerce.comm_b2b_licenses.htm&language=en_US&type=5) and the personas on Trailhead give the following picture (checked 9 November 2026):

| Role | What the role does | License | Permissions |
|---|---|---|---|
| Buyer | Views and buys products for a company | External Apps or External Apps Login (Registered Shopper SKU) | B2B Commerce User, Flow User |
| Buyer who sees other buyers or uses the Account Switcher | Orders for several accounts, sees colleagues' orders | Customer Community Plus or higher | B2B Commerce User |
| Buyer manager | Manages buyers, carts and addresses | Customer Community Plus or higher | B2B Commerce Super User, Manage Account Address, Delegated External User Administration |
| Merchandiser | Runs the catalog, store features and launches | Salesforce standard or Identity license | Merchandiser or Commerce Admin permission set |
| Developer, front-end builder | Loads product data, builds checkout and pages | Internal Salesforce license, depending on the task | Customize Application, Author Apex, Create and Set Up Experiences |

The [B2B Commerce pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) lists 6 or 10 storefronts, 20 inventory locations, Order Management, Data Cloud credits, the Merchant Agent and 3 or 5 users each for CRM Analytics and Knowledge. Buyer licenses do not appear there; ask whether your edition includes any. Otherwise they are charged on top of the GMV fee, which I cover in [B2B Commerce pricing: what the GMV model costs](../b2b-commerce-pricing-gmv-model/).

## Buyer managers need Customer Community Plus, plain buyers do not

The dividing line is access to other buyers. According to Help, "B2B Commerce requires a Customer Community Plus or higher license to access other buyers." A dealer's central purchaser who orders for several branches, or a buyer manager who manages colleagues, therefore needs Customer Community Plus. A buyer who only orders for their own account gets by with External Apps. According to [Salesforce Help on external user licenses](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5), Customer Community Plus is meant for external users who need reports, dashboards and standard sharing. Partner Community is described there for business-to-business sites that need sales data, such as partner relationship management. Trailhead does not mention Partner Community for the store.

```hinweis offen
If your dealers already have Partner Community licenses for a partner portal, I would ask Salesforce in writing whether these users can buy in the store with the license they have. Two licenses for the same person at the same dealer are the most expensive solution.
```

A buyer manager, according to Trailhead:

- manages buyers in one buyer account or across several,
- reads, creates and edits carts and orders, like a buyer,
- edits address fields on contact point addresses, which buyers can only read.

If you assign Delegated External User Administration, the dealer's buyer manager can onboard new staff without opening a ticket with your inside sales team. In a rollout this saves more work than most store features, which is why I describe it in [the dealer rollout](../b2b-shop-dealer-rollout/).

## Member or login license: which is cheaper for Customer Community Plus?

Help explains the two models like this. A member license is assigned to one person, who can log in as often as they like. For login licenses you buy a number of logins per month, and each login to the site uses one. Several logins by the same person on the same day count once; Salesforce calls this a daily unique login. The logins are pooled monthly across all login users, so plan for peaks, not averages.

The [Experience Cloud for Manufacturing page](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) lists these add-on list prices, billed annually (checked 9 November 2026). For External Apps I found no public list price:

| License | Per member per month | Per login per month |
|---|---|---|
| Customer Community Plus | $35 | $15 |
| Partner Community | $50 | $20 |

The break-even is simple. A buyer with two login days a month costs $30 with login licensing and $35 as a member. From three login days, at $45, the member license is cheaper. As a rule of thumb, a buyer manager who works weekly gets a member license, while one who logs in a few times a year gets a login license.

Worked example: a manufacturer with 250 dealers, each with one buyer manager and two buyers, so 750 users. The 500 buyers order only for their own account and get External Apps, with pricing set in the quote. The 250 buyer managers need Customer Community Plus: 100 work weekly and use member licenses, at 100 × $35 = $3,500 a month; the other 150 log in about once a month, at 150 logins × $15 = $2,250. Together that is $5,750 a month, or $69,000 a year at list price. Customer Community Plus member licenses for all 750 users would cost $26,250 a month, or $315,000 a year.

```hinweis achtung
A login day is any day someone logs in, including a day when they only check an order status. If the store is where dealers look up delivery dates, login days rise even when orders do not.
```

## Roles and the Account Switcher limit the plan

Some limits sit next to the license and show up late if nobody checks them. The [Commerce developer guide on buyer limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) and Help list the following:

- **Roles.** Customer Community Plus and Partner Community need roles for external users. The default limit is 50,000 roles across all portals in an org. According to the developer guide, Salesforce can extend this for B2B, and above one million shoppers, you should talk to your account team. Help also mentions account role optimization, which creates a role only when an account has a second user.
- **Buyer users.** 1.5 million buyers and buyer managers combined, as a soft limit.
- **Account Switcher.** A buyer who orders for several accounts, for example a central purchasing team at a dealer group with many branches, switches between them. The soft limit is 200 accounts. Beyond that, performance degrades, and at 2,000 accounts the switcher fails. Above 200 you need your own switcher.
- **Report subscriptions.** Customer Community Plus does not include them. A buyer manager who expects a weekly report by email will not get it this way.

## What about sales reps and inside sales?

Internal staff work in Salesforce with their internal license. The Trailhead persona list for the store does not include a sales rep. Two current features are aimed at them:

- **Order templates**, generally available since September 2026 according to the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/): buyers and sales reps create, save and reuse common orders.
- **Reorder portal**: a rep invites a buyer to a page with past orders ready to reorder. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal), integrating it with Sales Cloud requires an Agentforce Commerce license and an enabled digital experience.

My advice: for each internal group, write down what they do in the store, for example look at it as a dealer would, order on a dealer's behalf or maintain the catalog, and have Salesforce confirm in the quote which license covers each activity. Which internal users really need a full license is covered in [Salesforce licenses: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## Count login days per buyer

Build a list with four columns: role, number of people, login days per month and license. Fill it using order data from the last twelve months: who ordered how often by phone, email or through the portal. Then check the limits above, especially roles and the Account Switcher for dealer groups. Whether a store or a portal fits your dealers at all is the question in [B2B Commerce or dealer portal](../b2b-commerce-or-dealer-portal/), and the whole cost picture is in [chapter 1 of the B2B Commerce masterclass](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/). License forecasts like this are part of my work on [make-or-buy and licenses](../../services/make-or-buy-licences/).
