---
title: "B2B shop rollout to dealers: in which order?"
description: "In which order a manufacturer should open a Salesforce B2B store to dealers: waves by buyer group, buyer managers, inside sales and checks per wave."
pubDate: 2026-10-28
lang: en
slug: b2b-shop-dealer-rollout
translationKey: commerce-dealer-rollout
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, rollout, dealers, buyer groups, buyer managers, change management]
takeaways:
  - "Roll out a B2B store in waves by buyer group, starting with pilot dealers who reorder known parts often. A big bang puts every data error in front of every dealer on the same day."
  - "In Salesforce B2B Commerce buyers reach the store through buyer groups, so a wave is simply the set of buyer groups that get the store, with their entitlements and price books."
  - "Buyer managers with Delegated External User Administration can create users, reset passwords and deactivate users for their own account, which takes user admin off your service desk."
  - "Inside sales keeps taking phone and email orders during the transition. Dealers move because the store is faster, not because the phone stops working."
  - "Before each wave, test entitlements, prices, stock calls and checkout with a real buyer account of that wave, not only with an admin user."
faq:
  - q: "Should a B2B shop go live for all dealers at once?"
    a: "I advise against it. Start with a pilot group of dealers who reorder often, fix what they find, then add further buyer groups in waves. Each wave brings its own entitlements, prices and ERP data, and errors stay contained to one group."
  - q: "Which dealers should be in the pilot?"
    a: "Dealers with many repeat orders of known parts, a contact who will give honest feedback and a manageable range of special conditions. They show quickly whether search, prices and checkout work, and they benefit most from the store."
  - q: "Who manages dealer users in a Salesforce B2B store?"
    a: "Your admin enables accounts and contacts as buyers. With Delegated External User Administration, a buyer manager at the dealer can create and edit users, reset passwords and activate or deactivate users of their own account. Salesforce supports this for Customer Community Plus and Partner Community licences, among others."
  - q: "What licence do dealer users need for a B2B store?"
    a: "Trailhead names Customer Community Plus for buyers and buyer managers. The Salesforce list price for Experience Cloud for Manufacturing is $35 per member or $15 per login per month, billed annually."
draft: false
---

Roll out a B2B shop to dealers in waves, by buyer group, and start with pilot dealers who reorder known parts often. In Salesforce B2B Commerce buyers reach the store through buyer groups, so each wave is a defined set of buyer groups with their own entitlements, prices and ERP data. Before a wave starts, test exactly that data with a real buyer account. Give each dealer a buyer manager who administers their own users, and let inside sales keep taking phone orders until the store has proven itself. A typical plan has three waves over six months; the order follows reorder volume and data readiness, not the org chart.

## Why waves instead of one go-live?

A B2B store shows every dealer their own catalogue and their own prices. That is its value, and it is also its risk. A wrong entitlement hides parts a dealer needs, a wrong price book shows a price the sales team never agreed. With a big bang, these errors reach all dealers on the same day, and inside sales spends the first weeks explaining instead of selling.

Salesforce's data model makes waves natural. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-how-buyers-access-your-store), buyers are connected to stores through buyer groups. A buyer group bundles buyer accounts with the same needs and carries their entitlement policies, which decide which products they see, and their price books. A store can have several buyer groups. So a wave is simply the set of buyer groups that you connect to the store, and you can test each group before its dealers get access. How to structure those groups is covered in [Buyer groups and entitlements](../buyer-groups-entitlements-product-visibility/).

The same logic applies to every rollout I plan. For Salesforce Field Service I described it in [why rollouts go in waves](../salesforce-field-service-rollout/), and for Manufacturing Cloud in [the order of a global rollout](../manufacturing-cloud-global-rollout/). In a dealer store the waves are smaller and faster, because the users are external and the processes are simpler.

## Which dealers go first?

I choose pilot dealers by four criteria:

- **Many repeat orders of known parts.** Spare parts, consumables and accessories that the dealer orders by part number. These dealers find out in a week whether search and reorder work.
- **A contact who gives honest feedback.** A purchasing lead who tells you what annoys them is worth more than the biggest account.
- **Few special conditions.** Dealers with complex pricing come in a later wave, after the price logic has been tested on simpler cases.
- **A clean data basis.** Correct account hierarchy in the ERP, maintained contacts, known delivery addresses.

Leave the largest dealer out of the pilot unless it fits these criteria. A bad first impression with the most important account is hard to repair.

## What do buyer managers do?

Salesforce distinguishes buyers and buyer managers. According to the [Trailhead module on personas and permissions](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-roles-permissons-store-setup/define-personas-permissions), buyers get Customer Community Plus with the B2B Commerce User permission set. Buyer managers get the same licence with B2B Commerce Super User, the Manage Account Address permission and Delegated External User Administration. A buyer manager approves purchases and manages buyers, and according to the [data model module](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-how-buyers-access-your-store) can also view the purchases and carts of their buyers.

[Delegated External User Administration](https://help.salesforce.com/s/articleView?id=platform.networks_DPUA.htm&language=en-us&type=5) is what makes waves cheap to run. Users with this permission can create and edit members, reset passwords and activate or deactivate members for the account they manage. A dealer's purchasing lead can then onboard a new colleague without a ticket at your service desk. Plan one buyer manager per dealer before the wave starts and walk them through user admin in a short call.

Licences belong in the plan too. The list price for Customer Community Plus on the [Experience Cloud for Manufacturing page](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) is $35 per member or $15 per login per month, billed annually. Which one fits depends on how often dealers order, see [B2B Commerce buyer licences](../b2b-commerce-buyer-licences/). Large dealer groups with many locations need one more check: the Account Switcher, which lets a buyer order for several accounts, starts to degrade beyond 200 accounts per buyer, according to the [Salesforce limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html).

## What has to be tested before each wave?

Admin users see everything, so tests with an admin prove nothing about a dealer. Before each wave, log in as a real buyer of that wave and check:

1. **Entitlements.** Does the buyer see the parts they buy today, and not the parts reserved for other groups?
2. **Prices.** Do ten typical items show the price the dealer pays today, including tier prices? If prices come live from the ERP, does the call answer fast enough?
3. **Stock and delivery dates.** Do availability messages match what the ERP says?
4. **Checkout.** Does an order with a purchase order number reach the ERP, with correct delivery address and payment terms?
5. **Order history and status.** Does the order appear in the store with the status from the ERP?

Each wave adds new data, so each wave gets this test, not only the first one. Treat buyer groups, entitlement policies and price books as configuration that moves through your pipeline, as described in the DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/).

## What happens to inside sales?

Inside sales keeps taking phone and email orders during the whole rollout. Dealers move to the store because it is faster and always open, not because the old channel was switched off. Forcing the switch creates frustration exactly with the dealers you want to win.

Inside sales does have a new job: when a pilot dealer calls with a reorder that the store could have handled, the rep offers to walk them through it once. After two or three months, measure per buyer group how many order lines arrive through the store, and talk to dealers who stay on the phone. The numbers to watch are covered in [B2B shop KPIs after go-live](../b2b-shop-kpis-after-go-live/). Inside sales also needs to see store orders in Salesforce, so they can answer status calls without asking the dealer to repeat everything.

## A typical scenario: three waves in six months

A typical scenario, as an assumption: a manufacturer of compressors sells spare parts to 250 dealers in Germany, Austria and Switzerland.

- **Months 1 and 2, wave 1:** 15 pilot dealers in Germany with high reorder volume and standard dealer prices, one buyer group. Weekly feedback calls, fixes released every two weeks.
- **Months 3 and 4, wave 2:** the remaining German dealers in three buyer groups by dealer tier. Inside sales actively points callers to the store.
- **Months 5 and 6, wave 3:** Austria and Switzerland with their own price books and delivery terms, plus the large key accounts with special conditions.

Between waves there are two weeks without a new group, reserved for fixes and the test of the next wave's data. If wave 1 shows that search does not find parts by old part numbers, wave 2 waits until that is solved.

## Where should you start?

Start with a list of all dealers with their yearly order lines, their price logic and the quality of their data, and choose the pilot group from it. Name a buyer manager for each pilot dealer, set up the test buyer accounts and write down the five checks above. The rest of this topic, from agents to the move from Aura to LWR, is in the masterclass chapter on [agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/). If dealers and inside sales have to change how they work, plan [change management](../../services/change-management-salesforce/) from the first wave.

A dealer store succeeds when the first dealers find their parts at their price on the first try, so roll out in waves and test each one. If you are planning such a rollout, [send me a message](#contact).
