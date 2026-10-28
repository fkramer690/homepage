---
title: "Aura to LWR: migrating a B2B Commerce store"
description: "When a manufacturer should move an Aura B2B store to LWR, what changes in components, checkout and styling, and how to plan the migration in steps."
pubDate: 2026-10-28
lang: en
slug: b2b-store-aura-to-lwr-migration
translationKey: commerce-aura-to-lwr-migration
topic: commerce
categories: [b2b-commerce, devops]
tags: [b2b commerce, lwr, aura, migration, lightning web components, experience cloud]
takeaways:
  - "Salesforce has published no retirement date for Aura B2B stores as of 27 October 2026. It recommends the LWR template for new stores and suggests that existing Aura stores consider migrating."
  - "An LWR store supports only Lightning web components. Custom styling uses --dxp styling hooks instead of your own CSS classes, and data comes through wire adapters."
  - "Migrating means creating a new store from the B2B Commerce (LWR) template; Salesforce documents no migration tool, only refactoring steps and a change set for the store configuration."
  - "Aura stores build checkout with Flow Builder, LWR stores use the built-in Salesforce Commerce Checkout. Custom checkout subflows have to be rebuilt, ideally as extensions."
  - "Replace Aura components with Lightning web components inside the running Aura store first. That work pays off either way and shrinks the actual switch."
faq:
  - q: "Is Salesforce retiring Aura B2B Commerce stores?"
    a: "As of 27 October 2026 Salesforce has not published a retirement date. Aura stores are not on the list of active product and feature retirements. Salesforce recommends LWR for new stores and only orgs enabled for Commerce before Spring '23 can still create Aura stores."
  - q: "Is there a tool that converts an Aura store to LWR?"
    a: "The Salesforce migration guide does not mention one. You create a new store from the B2B Commerce (LWR) template, move your components to Lightning web components, move the store configuration with a change set and publish the new store."
  - q: "Do Aura stores support Lightning web components?"
    a: "Yes. An Aura store supports both Aura components and Lightning web components, while an LWR store supports only Lightning web components. That is why replacing Aura components inside the running Aura store is the best first step."
  - q: "What happens to my checkout flow when I move to LWR?"
    a: "Aura stores build checkout as flows in Flow Builder. LWR stores use the Salesforce Commerce Checkout installed with the store, which you arrange in Experience Builder. Logic in custom checkout subflows, such as a credit check, has to be rebuilt, for example as an extension."
draft: false
---

Migrate an Aura B2B store to LWR when you need features or changes that are hard to build in Aura, or when custom Aura code keeps growing. There is no deadline: as of 27 October 2026 Salesforce has published no retirement date for Aura stores. Salesforce recommends the LWR template for new stores and offers a [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide) for existing ones, but no migration tool. You create a new store from the B2B Commerce (LWR) template and move components, checkout and configuration into it. I plan this as a rebuild of the storefront on top of the same commerce data, and I start inside the running Aura store.

## Which store do you run, and is there a deadline?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", has had three generations: the Visualforce managed package, stores on the core platform built with the Aura template, and stores built with the LWR template (Lightning Web Runtime). How to tell them apart is covered in [B2B Commerce versions: Visualforce, Aura or LWR?](../b2b-commerce-versions-visualforce-aura-lwr/).

According to the [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/get-started.html), only orgs that were enabled for Commerce before Spring '23 can still choose the Aura template. Salesforce recommends the B2B LWR template for new stores and suggests that existing Aura stores consider migrating.

A retirement date does not exist. Aura stores are not on the [list of active product and feature retirements](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1), and the migration guide names none. The list itself says that retirements not listed there are communicated through release notes, help articles or targeted emails, so keep an eye on the release notes three times a year. Until then, decide by features and effort, not by fear of a date nobody has announced.

## What is different in an LWR store?

The [key differences](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) are short, but each one affects custom code:

| Area | Aura store | LWR store |
|---|---|---|
| Components | Aura components and Lightning web components | Lightning web components only |
| Styling | Your own CSS classes | `--dxp` styling hooks, mapped to the Theme panel |
| Data access | `force:recordData`, `lightning:recordForm` | Wire service on Lightning Data Service |
| Checkout | Checkout flows in Flow Builder | Salesforce Commerce Checkout, arranged in Experience Builder |
| Cart page | Record page | Named page |

Two rows deserve attention. The first is checkout. For Aura stores, Salesforce says to [use Flow Builder to create checkout flows](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-setup-checkout-flow.html). LWR stores use the Salesforce Commerce Checkout that is installed with the store. Its shipping, tax and payment integrations run separately from the Aura checkout subflows, and Salesforce recommends [extensions over integrations](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2c-comm-integration-arch.html) for custom logic. If your Aura checkout has a subflow that calls the ERP for a credit check, that logic has to be rebuilt. How extensions work is covered in [Commerce extensions: custom code that survives updates](../commerce-extensions-custom-code/).

The second is the cart page. It changed from a record page to a named page, so every component that navigates to the cart or builds a link to it with `lightning/navigation` needs an update, according to the guide's [Migrate Your Store](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/store-migration.html) page.

## How does the migration work, step by step?

The guide splits the work into preparation in the Aura store and the switch to a new LWR store. I follow the same split, because the preparation can run while dealers keep ordering.

**Preparation in the running Aura store** ([Prepare for Store Migration](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/prepare-for-migration.html)):

1. **Inventory.** In Setup, search for Lightning Components to list your Aura and Lightning web components.
2. **Replace Aura components.** Lightning web components run in Aura and LWR stores, often without changes. Aura components can contain Lightning web components, but not the other way round, so migrate child components first. If one Aura component cannot be replaced yet, reduce it to a thin wrapper. All Aura components have to go eventually.
```vertiefung For developers
title: How do I rework data access and events for LWR?
- **Move data access to the top.** Keep data operations in the outermost component, so the data layer changes in one place and nested components stay reusable.
- **Convert events.** Aura events declared with `aura:event` become DOM events in Lightning web components.
- **Use wire adapters.** Replace `force:recordData` with `@wire` and adapters from the `lightning/ui*Api` and Commerce namespaces. Apex methods you want to keep can be imported into Lightning web components.
```

**The switch:**

```schritte
Create the store
  Create a store from the **B2B Commerce (LWR)** template in Setup. The guide states that a new template is needed to complete the migration ([Create a Store with the LWR Template](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/create-lwr-template.html)).
Finish the refactoring
  Put the components into an SFDX project, finish the refactoring, update cart navigation and move branding to styling hooks.
Move the configuration
  Move the store configuration from the old store to the new one with a change set.
Publish
  Deploy, place the components in Experience Builder, preview on desktop and mobile, publish.
```

Salesforce writes that you do not have to recreate the store from scratch and that migration is mainly refactoring. That is true for the commerce data. For the storefront I would not rely on it: a new site, new styling, a new checkout and a new cart page add up to a rebuild of everything the buyer sees. I estimate and test it like one.

## What does the guide leave open?

The migration guide covers components and store configuration. It says nothing about catalogue, buyer groups, entitlement policies and price books, or about URLs and dealer bookmarks. Plan explicitly how the new store is connected to the existing buyer groups and price books, and test it with real buyer accounts before any dealer sees the store.

Experience metadata is easier to handle in a pipeline than with change sets. Salesforce describes [deploying store metadata](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-deploy-experience-metadata.html) with the Salesforce CLI and the ExperienceBundle or DigitalExperienceBundle types, committed to version control. The same page warns that some settings are not captured by the metadata and must be reapplied by hand, and that domains, URLs and single sign-on are tasks after deployment. Write those settings down before the switch. Where store configuration belongs in a pipeline is covered in the DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/).

## When is it worth it?

I would plan the migration when at least one of these applies:

- **A feature you need is not available or hard to build in your Aura store.** Salesforce's 2026 announcements, such as B2B Search, the Buyer Agent, headless commerce and order templates, do not say which store template they require. Check each one in the release notes and documentation before you base the migration on it.
- **Custom Aura code keeps growing.** Every new Aura component is code you will rewrite later.
- **Checkout needs a change anyway.** A new ERP interface or a new payment option is a good moment to rebuild checkout on LWR with extensions instead of extending a flow.
- **The partner who built the store is leaving.** A new partner should not have to learn Aura first.

If the store runs stably, has little custom code and no change is planned, waiting is a legitimate choice. Do the preparation steps anyway, because Lightning web components work in both stores.

A typical scenario, as an assumption: a machine builder has run an Aura store since 2021 with about 30 custom components and a checkout flow with an ERP credit check. In the first quarter the team replaces the leaf components with Lightning web components inside the Aura store and releases them normally. In the second quarter it builds the LWR store in a sandbox, rebuilds the credit check as a PlaceOrder extension and moves the styling to the Theme panel. Then one pilot buyer group switches to the new store, the old one stays online as a fallback for two weeks, and the remaining groups follow, as described in [B2B shop rollout to dealers](../b2b-shop-dealer-rollout/).

## Where should you start?

Start with the inventory: list all Aura components, the checkout flow with its subflows and every place that links to the cart. Then decide which components you replace inside the Aura store in the next two releases. Plan the switch itself into your [Salesforce release calendar](../../masterclass/devops-release-management/release-planning-salesforce-releases/), with regression tests for search, cart and checkout, because three Salesforce releases a year hit both the old and the new store. The other topics of this chapter, from agents to rollout, are in the B2B Commerce masterclass chapter on [agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/).

An Aura store has no deadline, but every new Aura component makes the later switch more expensive. If you want an independent view on whether and when your store should move, [send me a message](#contact).
