---
title: "B2B shop rollout to dealers: in which order?"
description: "In which order a manufacturer should open a Salesforce B2B store to dealers: waves by buyer group, buyer managers, inside sales and checks per wave."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-shop-dealer-rollout
translationKey: commerce-dealer-rollout
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, rollout, dealers, buyer groups, buyer managers, change management]
takeaways:
  - "Roll out the store in waves by buyer group, starting with dealers who frequently reorder known parts. A big bang shows every data error to every dealer at once."
  - "A wave is a defined set of dealer accounts and users, with the buyer groups, entitlements and price books they need to reach the store."
  - "With delegated admin, buyer managers create users, reset passwords and deactivate users of their own account, taking user admin off your service desk."
  - "Inside sales keeps taking phone and email orders during the transition. Dealers move because the store is faster, not because the phone stops working."
  - "Before each wave, test entitlements, prices, stock calls and checkout with a dedicated test buyer configured to match that wave, not only with an admin."
faq:
  - q: "Should a B2B shop go live for all dealers at once?"
    a: "I advise against it. Start with a pilot group of dealers who reorder often, fix what they find, then add further buyer groups in waves. Each wave brings its own entitlements, prices and ERP data, and errors usually stay limited to that group."
  - q: "Which dealers should be in the pilot?"
    a: "Dealers with many repeat orders of known parts, a contact who will give honest feedback and a manageable range of special conditions. They show quickly whether search, prices and checkout work, and they benefit most from the store."
  - q: "Who manages dealer users in a Salesforce B2B store?"
    a: "Your admin enables accounts and contacts as buyers. With Delegated External User Administration, a buyer manager at the dealer can create and edit users, reset passwords and activate or deactivate users for their own account. Salesforce supports this for Customer Community Plus and Partner Community licenses, among others. Plan a backup buyer manager per dealer."
  - q: "What license do dealer users need for a B2B store?"
    a: "According to Salesforce Help, External Apps is the minimum for buyers. Buyer managers, who access other buyers, need Customer Community Plus or higher. Salesforce lists Experience Cloud for Manufacturing at $35 per member or $15 per login per month, billed annually. B2B Commerce itself is licensed separately."
draft: false
---

Roll out a B2B shop to dealers in waves, by buyer group, and start with pilot dealers who frequently reorder known parts. In Salesforce B2B Commerce buyers reach the store through buyer groups, so each wave is a defined set of dealer accounts and users with their buyer groups, prices and ERP data. Test that exact data with a test buyer before the wave starts. Give each dealer a buyer manager for their own users, and let inside sales keep taking phone orders until the store has proven itself. The order follows reorder volume and data readiness, not the org chart.

## Why waves instead of one go-live?

A B2B store shows every dealer their own catalog and their own prices. That is its value, and it is also its risk. A wrong entitlement hides parts a dealer needs, and a wrong price book shows a price the sales team never agreed to. With a big bang, these errors reach all dealers on the same day, and inside sales spends the first weeks explaining instead of selling.

Salesforce's data model makes waves natural. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model), buyers are connected to stores through buyer groups. A buyer group bundles buyer accounts with the same needs and is linked to entitlement policies, which decide which products they see, and to price books. A store can have several buyer groups. So a wave is a defined set of accounts and users together with their buyer groups, and you can test those groups before the dealers get access. Store access requires more than assigning the group: the account has to be enabled as a buyer account, and each contact needs a user with the right license and permission sets. How to structure those groups is covered in [Buyer groups and entitlements](../buyer-groups-entitlements-product-visibility/).

The same logic applies to every rollout I plan. For Salesforce Field Service I described it in [why rollouts go in waves](../salesforce-field-service-rollout/), and for Manufacturing Cloud in [the order of a global rollout](../manufacturing-cloud-global-rollout/). In a dealer store the waves are often smaller and faster, because each one covers fewer users.

## Which dealers go first?

I choose pilot dealers by four criteria:

- **Many repeat orders of known parts.** Spare parts, consumables and accessories that the dealer orders by part number. These dealers find out in a week whether search and reorder work.
- **A contact who gives honest feedback.** A purchasing lead who tells you what annoys them is worth more than the biggest account.
- **Few special conditions.** Dealers with complex pricing join in a later wave, after the price logic has been tested on simpler cases.
- **A clean data basis.** Correct account hierarchy in the ERP, maintained contacts, known delivery addresses.

Leave the largest dealer out of the pilot unless it fits these criteria. A bad first impression with the most important account is hard to repair.

## What do buyer managers do?

Salesforce distinguishes between buyers and buyer managers. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_b2b_licenses.htm&type=5), External Apps is the minimum license for buyers. Buyer managers, and buyers who need to access other buyers, need Customer Community Plus or higher. Salesforce ships preconfigured Buyer and Buyer Manager permission sets. Manage Account Addresses is not enabled in these permission sets; if buyers or buyer managers need to create and edit addresses, enable it. A buyer manager manages the buyers of their account and, according to the [data model module](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model), can also view the purchases and carts of their buyers. Treat order approvals as a separate requirement: if buyer managers should approve orders, plan and test that process explicitly.

[Delegated External User Administration](https://help.salesforce.com/s/articleView?id=platform.networks_DPUA.htm&language=en-us&type=5) is what makes waves cheap to run. Users with this permission can create and edit members, reset passwords and activate or deactivate members for the account they manage. A dealer's purchasing lead can then onboard a new colleague without opening a ticket with your service desk. You enable delegated administration for the buyer manager's profile or permission set. Plan one buyer manager per dealer plus a backup before the wave starts, and walk them through user admin in a short call.

Licenses belong in the plan too. According to the [Experience Cloud for Manufacturing page](https://www.salesforce.com/manufacturing/cloud/experience-cloud/), Experience Cloud for Manufacturing is sold per member or per login, billed annually. That is the price for the external users, not for the store itself. Which variant fits depends on how often dealers order; more on this in [B2B Commerce buyer licenses](../b2b-commerce-buyer-licences/). Large dealer groups with many locations need one more check for the Account Switcher, which lets a buyer order for several accounts; the relevant limit is listed in the [Salesforce limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html).

```kennzahlen
$35 | Experience Cloud for Manufacturing per member per month
$15 | Experience Cloud for Manufacturing per login per month
200 | Accounts per buyer, a soft limit beyond which the Account Switcher can slow down
source: Salesforce, Experience Cloud for Manufacturing page (list prices, billed annually) and Salesforce limits for buyer groups and accounts
```

## Test each wave as a buyer of that wave

Admin users see everything, so tests with an admin prove nothing about a dealer. Before each wave, log in as a dedicated test buyer configured to match the dealers in that wave, not with a real dealer's login, and check:

1. **Entitlements.** Does the buyer see the parts they buy today, and not the parts reserved for other groups?
2. **Prices.** Do ten typical items show the price the dealer pays today, including tier prices? If prices are fetched live from the ERP, does the call respond fast enough?
3. **Stock and delivery dates.** Do availability messages match what the ERP says?
4. **Checkout.** Does an order with a purchase order number reach the ERP, with the correct delivery address and payment terms?
5. **Order history and status.** Does the order appear in the store with the status from the ERP?

A wave goes live only when all five checks pass for the test buyer and open defects are fixed or have an agreed workaround. Each wave adds new data, so each wave gets this test, not only the first one. Treat buyer groups, entitlement policies and price books as configuration that moves through your pipeline, as described in the DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/).

## Inside sales keeps taking orders

Inside sales keeps taking phone and email orders during the whole rollout. Dealers move to the store because it is faster and always open, not because the old channel was switched off. Forcing the switch creates frustration among the very dealers you want to win. If you want to stop simple phone reorders at some point, decide that for each buyer group and tell the dealers well in advance.

Inside sales does have a new job: when a pilot dealer calls with a reorder that the store could have handled, the rep offers to walk them through it once. After two or three months, measure how many order lines arrive through the store for each buyer group, and talk to dealers who continue to order by phone. The numbers to watch are covered in [B2B shop KPIs after go-live](../b2b-shop-kpis-after-go-live/). Inside sales also needs to see store orders in Salesforce, so they can answer status calls without asking the dealer to repeat everything.

## Worked example: three waves in six months

Assume a manufacturer of compressors sells spare parts to 250 dealers in Germany, Austria and Switzerland.

```schritte
Wave 1 | Months 1 and 2
  15 pilot dealers in Germany with high reorder volume and standard dealer prices, one buyer group. Weekly feedback calls, fixes released every two weeks.
Wave 2 | Months 3 and 4
  The remaining German dealers in three buyer groups by dealer tier. Inside sales actively points callers to the store.
Wave 3 | Months 5 and 6
  Austria and Switzerland with their own price books, currency, tax and delivery terms, plus the large key accounts with special conditions.
```

Between waves, there are two weeks without a new group, reserved for fixes and for testing the next wave's data. If wave 1 shows that search does not find parts by old part numbers, wave 2 waits until that is solved.

## First step: a dealer list with order lines and data quality

Start with a list of all dealers, their annual order lines, their price logic and the quality of their data, and choose the pilot group from that list. Name a buyer manager for each pilot dealer, set up the test buyer accounts and write down the five checks above. The rest of this topic, from agents to the move from Aura to LWR, is in the masterclass chapter on [agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/). If dealers and inside sales have to change how they work, plan [change management](../../services/change-management-salesforce/) from the first wave.
