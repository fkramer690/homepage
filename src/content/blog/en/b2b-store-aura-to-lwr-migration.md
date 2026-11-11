---
title: "Aura to LWR: migrating a B2B Commerce store"
description: "When a manufacturer should move an Aura B2B store to LWR, what changes in components, checkout and styling, and how to plan the migration in steps."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-store-aura-to-lwr-migration
translationKey: commerce-aura-to-lwr-migration
topic: commerce
categories: [b2b-commerce, devops]
tags: [b2b commerce, lwr, aura, migration, lightning web components, experience cloud]
takeaways:
  - "As of November 9, 2026, Salesforce has announced no retirement date for Aura B2B stores, but recommends the LWR template for new stores."
  - "An LWR store supports only Lightning web components. Theme-aware styling uses --dxp hooks, and wire adapters are the preferred data access method."
  - "Migrating means creating a new LWR store. Salesforce documents refactoring steps and how to move the store configuration, but no conversion tool."
  - "In LWR stores, checkout is configured in Experience Builder instead of built as Aura checkout flows. Custom subflow logic is rebuilt, often as an extension."
  - "If the store stays on Aura for a while, replacing Aura components with Lightning web components first shrinks the later switch."
faq:
  - q: "Is Salesforce retiring Aura B2B Commerce stores?"
    a: "As of November 9, 2026, Salesforce has not publicly announced a retirement date. Aura stores are not on the list of active product and feature retirements, though retirements can also be announced through release notes or emails. Salesforce recommends LWR for new stores and only orgs enabled for Commerce before Spring '23 can still create Aura stores."
  - q: "Is there a tool that converts an Aura store to LWR?"
    a: "Salesforce's migration guide does not document an automated conversion tool. You create a new store from the B2B Commerce (LWR) template, move your components to Lightning web components, move the store configuration and publish the new store. Test in a sandbox how the configuration is transferred to the new store."
  - q: "Do Aura stores support Lightning web components?"
    a: "Yes. An Aura store supports both Aura components and Lightning web components, while an LWR store supports only Lightning web components. For a store that stays on Aura for several releases, replacing Aura components inside the running store reduces the later migration effort."
  - q: "What happens to my checkout flow when I move to LWR?"
    a: "Aura stores build checkout as flows in Flow Builder. LWR stores use the Salesforce Commerce Checkout installed with the store, whose page and components you arrange in Experience Builder; shipping, tax and payment are still handled through integrations or extensions. Logic in custom checkout subflows, such as a credit check, has to be rebuilt, for example as an extension."
draft: false
---

Migrate an Aura B2B store to LWR when you need features or changes that are hard to build in Aura, or when custom Aura code keeps growing. As of November 9, 2026, Salesforce has announced no retirement date for Aura stores. It recommends the LWR template for new stores and offers a [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide) for existing ones, but does not document a conversion tool. You create a new store from the B2B Commerce (LWR) template and move components, checkout and configuration into it. I plan this as a rebuild of the storefront that reuses the commerce records in the same org, and I usually start inside the running Aura store.

## Which store do you run, and is there a deadline?

Salesforce B2B Commerce, part of the Agentforce Commerce suite, has had three generations: the Visualforce managed package, stores on the core platform built with the Aura template, and stores built with the LWR template (Lightning Web Runtime). How to tell them apart is covered in [B2B Commerce versions: Visualforce, Aura or LWR?](../b2b-commerce-versions-visualforce-aura-lwr/).

According to the [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/get-started.html), only orgs that were enabled for Commerce before Spring '23 can still choose the Aura template. Salesforce recommends the B2B LWR template for new stores and suggests that existing Aura stores consider migrating.

As of November 9, 2026, no retirement date has been announced. Aura stores are not on the [list of active product and feature retirements](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1), and the migration guide names none. The list itself says that retirements not listed there are communicated through release notes, help articles or targeted emails, so monitor more than the three platform releases: B2B Commerce also ships monthly features and documentation changes. Until a date is announced, decide based on features and effort, not by fear of a date nobody has announced.

## An LWR store runs only Lightning web components

The [key differences](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) are quickly listed, but each one affects custom code:

| Area | Aura store | LWR store |
|---|---|---|
| Components | Aura components and Lightning web components | Lightning web components only |
| Styling | Your own CSS classes | Component CSS plus `--dxp` styling hooks for theme-aware branding, mapped to the Theme panel |
| Data access | `force:recordData`, `lightning:recordForm` | Wire adapters preferred; Commerce APIs and Apex remain possible |
| Checkout | Checkout flows in Flow Builder | Salesforce Commerce Checkout, arranged in Experience Builder |
| Cart page | Record page | Named page |

Two rows deserve attention. The first is checkout. For Aura stores, Salesforce says to [use Flow Builder to create checkout flows](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-setup-checkout-flow.html). LWR stores use the Salesforce Commerce Checkout that is installed with the store. Four layers matter there: the checkout page and layout in Experience Builder, custom checkout components, the shipping, tax and payment integrations, and extensions such as place-order validation. The integrations are separate from the Aura checkout subflows, and Salesforce recommends [extensions over integrations](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2c-comm-integration-arch.html) for custom logic. If your Aura checkout has a subflow that calls the ERP for a credit check, that logic has to be rebuilt. How extensions work is covered in [Commerce extensions: custom code that survives updates](../commerce-extensions-custom-code/).

The second is the cart page. It changed from a record page to a named page, so every component that navigates to the cart or builds a link to it with `lightning/navigation` needs an update, according to the guide's [Migrate Your Store](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/store-migration.html) page.

## Prepare in the Aura store first, then switch

The guide splits the work into preparation in the Aura store and the switch to a new LWR store. I follow the same split, because the preparation can happen while dealers keep ordering.

**Preparation in the running Aura store** ([Prepare for Store Migration](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/prepare-for-migration.html)):

1. **Inventory.** In Setup, search for Lightning Components to list your Aura and Lightning web components.
2. **Replace Aura components.** Lightning web components run in Aura and LWR stores, often without changes. This pays off if the store stays on Aura for several releases; if a full rebuild is close, double regression testing may cost more than it saves. Aura components can contain Lightning web components, but not the other way round, so migrate child components first. If one Aura component cannot be replaced yet, reduce it to a thin wrapper. Eventually, all Aura components have to be replaced.

```vertiefung For developers
title: How do I rework data access and events for LWR?
- **Move data access to the top.** Keep data operations in the outermost component, so changes to the data layer are made in one place and nested components stay reusable.
- **Convert events.** Aura events declared with `aura:event` become DOM events in Lightning web components.
- **Prefer wire adapters.** Replace `force:recordData` with `@wire` and adapters from the `lightning/ui*Api` and Commerce namespaces. Apex methods you want to keep can be imported into Lightning web components.
```

**The switch:**

```schritte
Create the store
  Create a store from the **B2B Commerce (LWR)** template in Setup. The guide states that a new template is needed to complete the migration ([Create a Store with the LWR Template](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/create-lwr-template.html)).
Finish the refactoring
  Put the components into an SFDX project, finish the refactoring, update cart navigation and move theme branding to styling hooks where it should follow the Theme panel.
Move the configuration
  The guide moves the store configuration with a change set. The detailed help page describes change sets between connected orgs, so test in a sandbox how the configuration reaches the new store in the same org.
Publish
  Deploy, place the components in Experience Builder, preview on desktop and mobile, publish.
```

Salesforce states that you do not have to recreate the store from scratch and that migration is mainly refactoring. That is true for the core commerce records in the org; store assignments and configuration still have to be moved and checked. For the storefront, I would not rely on that framing: a new site, new styling, a new checkout and a new cart page add up to a rebuild of everything the buyer sees. I estimate and test it as a rebuild.

## What does the guide leave open?

The migration guide covers components and store configuration. It says nothing about catalog, buyer groups, entitlement policies and price books, or about URLs and dealer bookmarks. Plan explicitly how the new store is connected to the existing buyer groups and price books, and test it with real buyer accounts before any dealer sees the store.

Experience metadata is easier to handle in a pipeline than with change sets. Salesforce describes [deploying store metadata](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-deploy-experience-metadata.html) with the Salesforce CLI and the ExperienceBundle or DigitalExperienceBundle types, committed to version control. The same page warns that some settings are not captured by the metadata and must be reapplied by hand, and that domains, URLs and single sign-on must be handled after deployment. Write those settings down before the switch. Where store configuration belongs in a pipeline is covered in the DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/).

## When is it worth it?

I would plan the migration when at least one of these applies:

- **A feature you need is not available or hard to build in your Aura store.** Check each new feature in the release notes for its template requirement before you base the migration on it. Headless commerce is a separate frontend architecture, and the Buyer Agent also works outside the store in WhatsApp or SMS, so neither is a reason to move to LWR on its own.
- **Custom Aura code keeps growing.** Every new Aura component is code you will rewrite later.
- **Checkout needs a change anyway.** A new ERP interface or a new payment option is a good opportunity to rebuild checkout on LWR with extensions instead of extending a flow.
- **The partner who built the store is leaving.** A new partner should not have to learn Aura first.

If the store is stable, has little custom code and no change is planned, waiting is a legitimate choice. Do the preparation steps anyway, because Lightning web components work in both stores.

Worked example: a machine builder has run an Aura store since 2021 with about 30 custom components and a checkout flow with an ERP credit check. In the first quarter the team replaces the leaf components with Lightning web components inside the Aura store and releases them normally. In the second quarter the team builds the LWR store in a sandbox, rebuilds the credit check as a place-order validation extension with a timeout and a clear message if the ERP does not respond, and moves the styling to the Theme panel. Then one pilot buyer group switches to the new store. Before that, domains and redirects, single sign-on, open carts, buyer group assignments, the search index and links in order emails are resolved, and rollback criteria are documented. The old store stays online as a fallback for two weeks, and the remaining groups follow, as described in [B2B shop rollout to dealers](../b2b-shop-dealer-rollout/).

## List Aura components and checkout subflows

Start with the inventory: list all Aura components, the checkout flow with its subflows and every place that links to the cart. Then decide which components you replace inside the Aura store in the next two releases. Plan the switch itself into your [Salesforce release calendar](../../masterclass/devops-release-management/release-planning-salesforce-releases/), with regression tests for search, cart and checkout, because three Salesforce releases a year plus monthly Commerce changes affect both the old and the new store. The other topics, from agents to rollout, are covered in the B2B Commerce masterclass chapter on [agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/).
