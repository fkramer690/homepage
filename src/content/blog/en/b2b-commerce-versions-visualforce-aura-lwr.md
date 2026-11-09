---
title: "B2B Commerce versions: Visualforce, Aura or LWR?"
description: "Which generation of Salesforce B2B Commerce you run, Visualforce package, Aura or LWR store, how to find out and what follows for your roadmap."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-versions-visualforce-aura-lwr
translationKey: commerce-versions-visualforce-aura-lwr
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Visualforce, Aura, LWR, CloudCraze, migration]
takeaways:
  - "B2B Commerce exists in three generations: the Visualforce package from the CloudCraze acquisition in 2018, and stores with an Aura or LWR template."
  - "The latest major version Salesforce documents for B2B Commerce for Visualforce is 4.13 from Winter '21. Since Summer '25, only patch notes are maintained."
  - "Per the migration guide, Aura store templates are only offered to orgs with Commerce enabled before Spring '23. LWR is recommended for new stores."
  - "As of 9 November 2026, I found no public retirement date for Aura stores or the Visualforce package. Plan by features, but check operating risk too."
faq:
  - q: "What is the difference between B2B Commerce for Visualforce and B2B Commerce on Lightning?"
    a: "B2B Commerce for Visualforce is the managed package that came with CloudCraze, with storefront pages in Visualforce. B2B Commerce on the core platform builds the store as an Experience Cloud site with Experience Builder, using an Aura or an LWR template."
  - q: "Is B2B Commerce for Visualforce being retired?"
    a: "As of 9 November 2026, I found no public retirement date, and the package is not on the list of active retirements. That list is not exhaustive, so also check notices Salesforce sent to your org. The latest major version listed in Help is 4.13 from Winter '21, and since Summer '25 Salesforce maintains only patch notes."
  - q: "Can I still create a B2B Commerce store with the Aura template?"
    a: "According to the LWR migration guide, only if Commerce was enabled in your org before Spring '23. Other Help pages simply say new B2B stores use LWR, so check which templates your org offers. Salesforce recommends the B2B Commerce (LWR) template for new stores."
  - q: "How do I find out which B2B Commerce version my company runs?"
    a: "Start from the production store URL and find the site and store behind it. An installed B2B Commerce managed package only points to Visualforce if the live store pages are Visualforce. For standard core stores, the checkout tells you: Aura stores configure checkout as a flow in Flow Builder, LWR stores configure checkout steps in Experience Builder."
draft: false
---

For roadmap purposes, Salesforce B2B Commerce exists in three generations. The oldest is B2B Commerce for Visualforce, a managed package that came with the CloudCraze acquisition in 2018. The two newer ones run on the core platform as stores on Experience Cloud, built either with an Aura or with an LWR template. According to the migration guide, Aura templates are only offered to orgs that had Commerce enabled before Spring '23, and Salesforce recommends LWR for new stores. As of 9 November 2026, I found no public retirement date for Aura stores or the Visualforce package. Which generation you run decides how much of the current roadmap reaches your store.

## Which generations of B2B Commerce exist?

Salesforce B2B Commerce, which some Salesforce material such as Trailhead also calls "Agentforce Commerce for B2B", has a history that explains much of the confusion in projects:

| Generation | Technology | Status October 2026 |
|---|---|---|
| B2B Commerce for Visualforce | Managed package from CloudCraze (acquired 2018), Visualforce pages | Latest documented major version 4.13 (Winter '21), patch notes only |
| B2B Commerce, Aura store | Core platform, Experience Cloud site, Aura template | New Aura stores only in orgs enabled before Spring '23 |
| B2B Commerce, LWR store | Core platform, Experience Cloud site, LWR template | Recommended for new stores |

Salesforce announced the completed [acquisition of CloudCraze](https://salesforce.com/news/stories/salesforce-completes-its-acquisition-of-cloudcraze/) on 6 April 2018 and described it as a B2B commerce platform built natively on Salesforce. That product continued as B2B Commerce for Visualforce. Later, Salesforce built B2B Commerce into the core platform, with its own objects for stores, buyer groups, carts and orders, and with storefronts as Experience Cloud sites. Help and Trailhead call this "B2B Commerce on Lightning Experience" in older material and simply "B2B Commerce" in newer material.

```zeitleiste
2018-04-06 | Salesforce completes the CloudCraze acquisition
Winter '21 | Version 4.13, the latest documented major version of B2B Commerce for Visualforce
Spring '23 | Aura templates only for orgs that had Commerce enabled before Spring '23
Summer '25 | Salesforce maintains only patch notes for the Visualforce package
2026-06 | Innovations with headless, Buyer Agent and Quote to Cart
```

## B2B Commerce for Visualforce only gets patches

The [release notes page in Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.b2b_commerce_release_notes.htm&type=5) lists patch notes for versions 4.5 to 4.13. The newest is [version 4.13 from Winter '21](https://help.salesforce.com/s/articleView?language=en_US&id=sf.b2b_commerce_rn_2021_winter_patches.htm&type=5). The same page says that since Summer '25 Salesforce maintains only patch notes for B2B Commerce for Visualforce. The [list of installation URLs](https://help.salesforce.com/s/articleView?id=000388718&language=en_US&type=1) calls it "the B2B Commerce managed package" and advises installing the most recent patch for your major release, because patches are cumulative.

A former Trailhead unit on B2B Commerce on Lightning Experience answered the question whether customers must move with "no": Salesforce will continue to support the Visualforce deployment option. That unit is no longer online and was not dated, so I would not build on it alone. I also note that the latest major version listed is Winter '21, and that recent announcements such as the [June 2026 innovations](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) with headless, Buyer Agent and Quote to Cart do not mention the Visualforce package.

My reading: a Visualforce store keeps running, but the public documentation promises no regular patch cadence and no further major release. New capabilities come on the core platform. If your store does its job and your roadmap needs nothing new, there is no feature-driven deadline; still assess security findings, partner skills and integrations before you decide to stay. If you want agents, new search or headless, I expect the path to lead to a store on the core platform, but verify the supported store architecture per feature in the product documentation. I would plan the move as a new implementation with the same business requirements, not as an upgrade.

## What is the difference between Aura and LWR stores?

Both run on the same core platform with the same commerce data: buyer accounts, buyer groups, entitlement policies, price books, carts and orders. They differ in the frontend. The [migration guide's key differences](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) name these:

- **Components.** Aura stores support Aura components and Lightning web components. LWR stores support only Lightning web components.
- **Styling.** In Aura you write your own CSS classes. In LWR, components use shadow DOM, and you style them with "--dxp" styling hooks that map to the Theme panel.
- **Data access.** Lightning web components typically get data through wire adapters. Aura uses more restrictive form-based components such as force:recordData.
- **Checkout.** According to the [developer guide on the Aura checkout flow](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-setup-checkout-flow.html), Aura stores run checkout as a flow you configure in Flow Builder. LWR stores use Salesforce Commerce Checkout, and you configure its steps in Experience Builder.

The [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide) states that orgs which had Commerce enabled before Spring '23 can still choose an Aura template, and that Salesforce recommends the B2B LWR template for new stores and suggests that existing Aura stores consider migration.

## Is there a retirement date for Aura or Visualforce?

Not that I could find. As of 9 November 2026, neither Aura stores nor B2B Commerce for Visualforce appear in the [list of active product and feature retirements](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1), and the migration guide names no date. That list is not exhaustive, though: Salesforce also announces retirements in release notes and direct customer notices. So check your contract and the notices sent to your org, and do not act on rumors.

That is why I plan by features, not fear. Worked example: a manufacturer runs an Aura store for spare parts since 2022, with 15 custom Aura components for the parts list per machine and a custom checkout flow. A move to LWR then needs a concrete trigger:

```pro-contra
pro: Keep the Aura store
- The store works, and dealers use it
- No published retirement date
- Without a trigger, the migration costs money and brings the same store
contra: Triggers for LWR
- The company wants the Buyer Agent (which has its own license prerequisites)
- The next partner should build only Lightning web components
- Every new Aura enhancement adds to the later migration
```

Two checks belong in every roadmap discussion:

- **Which new feature do we want, and does Salesforce document it for our store template?** The June 2026 announcements do not name a template. Ask the partner for the Help or developer page that confirms support for your store type.
- **How much custom Aura code do we have?** The [migration](../b2b-store-aura-to-lwr-migration/) means a new LWR store, and every custom Aura component has to be replaced or removed. Components are one cost driver; checkout, integrations, styling, URLs and cutover are others.

## Find out within an hour what your company runs

Many manufacturers do not know it exactly, because a partner set up the store years ago. Three checks usually give an answer within an hour. Start from the production store URL, because an org can contain old packages and several stores:

1. **Installed packages.** If the B2B Commerce managed package is installed and the store pages are Visualforce, you run the Visualforce generation.
2. **Stores in Setup.** Core stores appear under Stores in Setup. The [LWR migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/create-lwr-template.html) creates new stores there with the "B2B Commerce (LWR)" template.
3. **Checkout and components.** If checkout runs as a flow in Flow Builder, the store uses the Aura template. If checkout steps are set in Experience Builder, it is LWR. The [migration preparation](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/prepare-for-migration.html) also suggests reviewing Aura components under Lightning Components in Setup.

Write the result down with the number of custom components and the partner who built them. That one page is the basis for every later decision.

## Identify your generation and check roadmap features

Find out which generation you run and list the features on your roadmap for the next two years. Then check per feature whether Salesforce documents it for your store type. If nothing on the list needs a new generation, keep the store and invest in data and processes. If something does, plan the move with the [release planning for Salesforce releases](../../masterclass/devops-release-management/release-planning-salesforce-releases/) in mind, because a store migration should not collide with a major release. The cost side is covered in [chapter 1 of the B2B Commerce masterclass](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/), the move itself in [chapter 5 on agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/), and the license question for buyers in [B2B Commerce buyer licenses](../b2b-commerce-buyer-licences/). Store architecture decisions like this are part of my [Salesforce architecture](../../services/salesforce-architecture/) work.
