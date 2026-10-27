---
title: "B2B Commerce versions: Visualforce, Aura or LWR?"
description: "Which generation of Salesforce B2B Commerce you run, Visualforce package, Aura or LWR store, how to find out and what follows for your roadmap."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-versions-visualforce-aura-lwr
translationKey: commerce-versions-visualforce-aura-lwr
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Visualforce, Aura, LWR, CloudCraze, migration]
takeaways:
  - "Salesforce B2B Commerce exists in three generations: the Visualforce managed package from the CloudCraze acquisition in 2018, and stores on the core platform with an Aura or an LWR template."
  - "The last major version of B2B Commerce for Visualforce listed in Salesforce Help is 4.13 from Winter '21. Since Summer '25, Salesforce maintains only patch notes for it."
  - "Aura store templates are only offered to orgs that had Commerce enabled before Spring '23. Salesforce recommends the LWR template for new stores."
  - "As of 27 October 2026, Salesforce has published no retirement date for Aura stores or the Visualforce package. Plan by the features you need, not by fear of a deadline."
faq:
  - q: "What is the difference between B2B Commerce for Visualforce and B2B Commerce on Lightning?"
    a: "B2B Commerce for Visualforce is the managed package that came with CloudCraze, with storefront pages in Visualforce. B2B Commerce on the core platform builds the store as an Experience Cloud site with Experience Builder, using an Aura or an LWR template."
  - q: "Is B2B Commerce for Visualforce being retired?"
    a: "Salesforce has published no retirement date as of October 2026, and the package is not on the list of active retirements. The last major version listed in Help is 4.13 from Winter '21, and since Summer '25 Salesforce maintains only patch notes."
  - q: "Can I still create a B2B Commerce store with the Aura template?"
    a: "Only if Commerce was enabled in your org before Spring '23. Salesforce recommends the B2B Commerce (LWR) template for new stores."
  - q: "How do I find out which B2B Commerce version my company runs?"
    a: "An installed B2B Commerce managed package points to Visualforce. For core stores, the checkout tells you: Aura stores configure checkout as a flow in Flow Builder, LWR stores configure checkout steps in Experience Builder."
draft: false
---

Salesforce B2B Commerce exists in three generations. The oldest is B2B Commerce for Visualforce, a managed package that came with the CloudCraze acquisition in 2018. The two newer ones run on the core platform as stores on Experience Cloud, built either with an Aura or with an LWR template. Aura templates are only offered to orgs that had Commerce enabled before Spring '23, and Salesforce recommends LWR for new stores. As of 27 October 2026, there is no published retirement date for Aura stores or the Visualforce package. Which generation you run decides how much of the current roadmap reaches your store.

## Which generations of B2B Commerce exist?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", has a history that explains much of the confusion in projects:

| Generation | Technology | Status October 2026 |
|---|---|---|
| B2B Commerce for Visualforce | Managed package from CloudCraze (acquired 2018), Visualforce pages | Last major version 4.13 (Winter '21), patch notes only |
| B2B Commerce, Aura store | Core platform, Experience Cloud site, Aura template | New Aura stores only in orgs enabled before Spring '23 |
| B2B Commerce, LWR store | Core platform, Experience Cloud site, LWR template | Recommended for new stores |

Salesforce announced the completed [acquisition of CloudCraze](https://salesforce.com/news/stories/salesforce-completes-its-acquisition-of-cloudcraze/) on 6 April 2018 and described it as a B2B commerce platform built natively on Salesforce. That product continued as B2B Commerce for Visualforce. Later, Salesforce built B2B Commerce into the core platform, with its own objects for stores, buyer groups, carts and orders, and with storefronts as Experience Cloud sites. Help and Trailhead call this "B2B Commerce on Lightning Experience" in older material and simply "B2B Commerce" in newer material.

## What do I need to know about B2B Commerce for Visualforce?

The [release notes page in Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.b2b_commerce_release_notes.htm&type=5) lists patch notes for versions 4.5 to 4.13. The newest is [version 4.13 from Winter '21](https://help.salesforce.com/s/articleView?language=en_US&id=sf.b2b_commerce_rn_2021_winter_patches.htm&type=5). The same page says that since Summer '25 Salesforce maintains only patch notes for B2B Commerce for Visualforce. The [list of installation URLs](https://help.salesforce.com/s/articleView?id=000388718&language=en_US&type=1) calls it "the B2B Commerce managed package" and advises installing the most recent patch for your major release, because patches are cumulative.

A Trailhead unit on [B2B Commerce on Lightning Experience](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-basics/explore-b2b-commerce-on-lightning-experience) answers the question whether customers must move with "no": Salesforce will continue to support the Visualforce deployment option. I take that at face value. I also note that the last major version listed is Winter '21, and that recent announcements such as the [June 2026 innovations](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) with headless, Buyer Agent and Quote to Cart do not mention the Visualforce package.

My reading: a Visualforce store keeps running and gets fixes. New capabilities come on the core platform. If your store does its job and your roadmap needs nothing new, there is no urgency. If you want agents, new search or headless, the path leads to a store on the core platform, and I would plan it as a new implementation with the same business requirements, not as an upgrade.

## What is the difference between Aura and LWR stores?

Both run on the same core platform with the same commerce data: buyer accounts, buyer groups, entitlement policies, price books, carts and orders. They differ in the frontend. The [migration guide's key differences](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) name these:

- **Components.** Aura stores support Aura components and Lightning web components. LWR stores support only Lightning web components.
- **Styling.** In Aura you write your own CSS classes. In LWR, components use shadow DOM, and you style them with "--dxp" styling hooks that map to the Theme panel.
- **Data access.** Lightning web components get data through wire adapters. Aura uses more restrictive form-based components such as force:recordData.
- **Checkout.** According to the [developer guide on the Aura checkout flow](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-setup-checkout-flow.html), Aura stores run checkout as a flow you configure in Flow Builder. LWR stores use Salesforce Commerce Checkout, and you configure its steps in Experience Builder.

The [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide) states that orgs which had Commerce enabled before Spring '23 can still choose an Aura template, and that Salesforce recommends the B2B LWR template for new stores and suggests that existing Aura stores consider migration.

## Is there a retirement date for Aura or Visualforce?

No. As of 27 October 2026, neither Aura stores nor B2B Commerce for Visualforce appear in the [list of active product and feature retirements](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1), and the migration guide names no date. I would only act on a date that Salesforce publishes in Help or in a release note.

That is why I plan by features, not fear. A typical scenario, as an assumption: a manufacturer runs an Aura store for spare parts since 2022, with 15 custom Aura components for the parts list per machine and a custom checkout flow. The store works, and dealers use it. The trigger for a move to LWR would be concrete: the company wants the Buyer Agent, or the next partner should build only Lightning web components, or the Aura code grows with every release. Without such a trigger, the migration costs money and brings dealers the same store.

Two checks belong in every roadmap discussion:

- **Which new feature do we want, and does Salesforce document it for our store template?** The June 2026 announcements do not name a template. Ask the partner for the Help or developer page that confirms support for your store type.
- **How much custom Aura code do we have?** Every Aura component is a piece the [migration](../b2b-store-aura-to-lwr-migration/) replaces. The more there are, the larger the move.

## How do I find out what my company runs?

Many manufacturers do not know it exactly, because a partner set up the store years ago. Three checks give an answer within an hour:

1. **Installed packages.** If the B2B Commerce managed package is installed and the store pages are Visualforce, you run the Visualforce generation.
2. **Stores in Setup.** Core stores appear under Stores in Setup. The [LWR migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/create-lwr-template.html) creates new stores there with the "B2B Commerce (LWR)" template.
3. **Checkout and components.** If checkout runs as a flow in Flow Builder, the store uses the Aura template. If checkout steps are set in Experience Builder, it is LWR. The [migration preparation](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/prepare-for-migration.html) also suggests reviewing Aura components under Lightning Components in Setup.

Write the result down with the number of custom components and the partner who built them. That one page is the basis for every later decision.

## Where should you start?

Find out which generation you run and list the features on your roadmap for the next two years. Then check per feature whether Salesforce documents it for your store type. If nothing on the list needs a new generation, keep the store and invest in data and processes. If something does, plan the move with the [release planning for Salesforce releases](../../masterclass/devops-release-management/release-planning-salesforce-releases/) in mind, because a store migration should not collide with a major release. The cost side is covered in [chapter 1 of the B2B Commerce masterclass](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/), the move itself in [chapter 5 on agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/), and the licence question for buyers in [B2B Commerce buyer licences](../b2b-commerce-buyer-licences/). Store architecture decisions like this are part of my [Salesforce architecture](../../services/salesforce-architecture/) work.

Know your generation before you discuss a roadmap, and move only when a feature you need requires it; if you want an independent view on your store, [send me a message](#contact).
