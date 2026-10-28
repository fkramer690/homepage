---
title: "Commerce extensions: custom code that survives updates"
description: "How to build custom pricing, stock and checkout logic in Salesforce B2B Commerce with extensions, so it survives Salesforce releases and a change of partner."
pubDate: 2026-10-28
lang: en
slug: commerce-extensions-custom-code
translationKey: commerce-extensions-custom-code
topic: commerce
categories: [b2b-commerce, devops]
tags: [b2b commerce, extensions, apex, sfdx, release management, partner governance]
takeaways:
  - "Commerce extensions are Apex classes that plug into named extension points of Salesforce B2B Commerce, such as pricing, inventory, tax, shipping or order creation."
  - "Domain extensions can extend or replace a whole service, endpoint extensions only change the request or response of one Connect API endpoint and cannot replace it."
  - "Salesforce strongly recommends calling super() in domain extensions, so your code adds to the standard behaviour instead of rebuilding it and losing what later releases add."
  - "Extensions are the preferred way to customise Salesforce Commerce, older integrations remain supported, and payments cannot be customised with an extension."
  - "Extension classes, their registration and their store mapping belong in the client's repository and pipeline, so any partner can take them over."
faq:
  - q: "What are Salesforce Commerce extensions?"
    a: "Apex classes, called extension providers, that Salesforce runs at named extension points of B2B Commerce. They change how pricing, inventory, tax, shipping, checkout or single Connect API endpoints behave, without replacing the store."
  - q: "What is the difference between a domain extension and an endpoint extension?"
    a: "A domain extension works on a functional area such as pricing and can extend or replace the default service, which can affect several API endpoints. An endpoint extension changes the request or response of one Connect API endpoint and cannot replace its default behaviour."
  - q: "How are commerce extensions registered?"
    a: "Salesforce recommends the Salesforce CLI with the commerce plug-in: sf commerce:extension:register registers the Apex class, sf commerce:extension:map maps it to a store. Alternatively you can use the RegisteredExternalService and StoreIntegratedService objects or the Connect API."
  - q: "Can payments be customised with a commerce extension?"
    a: "No. Salesforce states that payments currently cannot be customised with an extension. Payment gateways are connected through their own payment integration instead."
  - q: "Should we migrate old checkout integrations to extensions?"
    a: "Salesforce calls extensions the preferred approach and says integrations remain fully supported. I would migrate when the code needs to change anyway, not as a project of its own."
draft: false
---

Custom store logic in Salesforce B2B Commerce survives releases when it is built as commerce extensions that add to the standard instead of replacing it. Extensions are Apex classes that Salesforce runs at named extension points such as pricing, inventory or order creation. Domain extensions should call `super()`, as Salesforce strongly recommends, so the default service still runs and your code only adds what is specific to you. Endpoint extensions change one API's request or response. Payments cannot be extended. The second half of the answer is ownership: extension code, registration and store mapping belong in your repository and pipeline, not in a partner's.

## What are commerce extensions?

Salesforce describes [extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) as "a mechanism for using Apex to customize the functionality that powers B2B and B2C storefronts". The Apex class is called an extension provider. When a buyer action, a Connect API request or another extension reaches an extension point, the platform checks whether a provider is mapped to that extension point name and runs it.

This applies to Salesforce B2B Commerce on the core platform, which Salesforce now also markets as Agentforce Commerce for B2B. The separate B2C Commerce architecture uses hooks instead, so a team that comes from B2C will not find the same mechanism there.

There are two kinds:

- **Domain extensions** belong to a functional area. A provider can extend or replace the default behaviour, and one change can affect several endpoints. Example: a pricing provider extends `commercestorepricing.PricingService` and overrides `processPrice` for product lists and detail pages and `processTransactionalPrice` for cart and checkout.
- **Endpoint extensions** belong to one Connect API resource. The provider extends `ConnectApi.BaseEndpointExtension` and can change the request before and the response after the call. It cannot replace the default functionality and cannot call `super()`.

## Which extension points exist?

The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) is short enough to read in full. For a manufacturer connecting SAP or another ERP, these matter most:

| Need | Extension point |
|---|---|
| Customer price from the ERP | `Commerce_Domain_Pricing_Service`, `Commerce_Domain_Pricing_CartCalculator` |
| Stock or availability from the ERP | `Commerce_Domain_Inventory_Service`, `Commerce_Domain_Inventory_CartCalculator` |
| Tax and shipping | `Commerce_Domain_Tax_Service`, `Commerce_Domain_Tax_CartCalculator`, `Commerce_Domain_Shipping_CartCalculator` |
| Check credit or blocks before ordering | `Commerce_Domain_Checkout_PlaceOrder` |
| Shape the order record | `Commerce_Domain_Checkout_CreateOrder` |
| Custom buyer group assignment | `Commerce_Domain_BuyerGroup_EvaluationService` |
| Filter or enrich products and search results | `Commerce_Endpoint_Catalog_Products`, `Commerce_Endpoint_Search_ProductSearch` |

The page also states the defaults you replace: inventory uses Omnichannel Inventory, pricing uses Salesforce price books, tax uses the Salesforce tax service, and shipping charges nothing until you extend it.

```hinweis achtung
According to the same page, if the store uses Faster Add-to-Cart, every product needs an entry in a store price book before you implement the pricing extension, even if the real price later comes from the ERP.
```

Which data should come live from the ERP and which should be copied into Salesforce is a design decision of its own. I cover it in [B2B Commerce and SAP: which data flows where?](../b2b-commerce-sap-data-flows/).

## Why should a domain extension call super()?

Salesforce writes that it "strongly recommend[s] calling the `super()` method as a best practice to ensure platform compatibility". In practice there are three ways to write a domain provider:

1. Replace the method entirely, without `super()`.
2. Call `super()` and adjust the result, for example apply an ERP discount to the standard price.
3. Do something before `super()`, for example read the buyer's ERP customer number, then let the standard run.

Variants 2 and 3 survive releases better. When Salesforce adds something to the standard service, such as a new field or a promotion feature, a provider that calls `super()` gets it automatically. A provider that replaces everything has silently frozen the standard at the state of the day it was written. In a review of partner code, a full replacement without `super()` is the first thing I would ask about. Sometimes it is justified, for example when the ERP is the only price master, but then the reason belongs in the code and in the architecture decision log.

```vertiefung For developers
title: How do I test a provider that calls super()?
The base classes live in a Salesforce namespace, and the [guide on mocking the base class](https://developer.salesforce.com/docs/commerce/extensions/guide/mock-the-base-apex-class.html) explains that the Apex test framework cannot mock across namespaces. The documented pattern is to make the provider `virtual`, wrap the `super()` call in a separate `@TestVisible` method and override that method in a test subclass.

ERP callouts are simulated with `HttpCalloutMock`, as described in [writing tests for an extension provider](https://developer.salesforce.com/docs/commerce/extensions/guide/write-tests-for-an-extension-provider.html).
```

If a partner delivers extensions without these tests, coverage is usually reached by calling code without asserting anything.

## Extensions or the older integrations?

Before extensions, checkout logic was connected through integrations: an Apex interface that replaces a calculator. Salesforce now says that extensions "are now the preferred way to customize Salesforce Commerce" and that "integrations remain fully supported". Extensions cover more areas, with five cart calculators plus the pricing service and other services, where integrations had four checkout calculators.

My rule: new logic goes into extensions. Existing integrations stay until the code has to change anyway, for example because the ERP interface changes or the store moves from Aura to LWR. Rewriting working integrations only because a newer mechanism exists rarely pays off.

Payments are the exception. Salesforce states: "Currently, payments can't be customized with an extension." Payment gateways keep their own adapter, see [B2B checkout: purchase order, card or invoice?](../b2b-checkout-purchase-order-card-invoice/).

## How do extensions survive a change of partner?

Registration and mapping are two separate steps, and both are configuration that someone has to reproduce in every environment. Salesforce recommends the CLI: `sf plugins install @salesforce/commerce`, then `sf commerce:extension:register` for the class and `sf commerce:extension:map` for the store. The same works through the `RegisteredExternalService` and `StoreIntegratedService` objects or the Connect API, and merchants can map domain extensions in the admin interface.

That last option is the risk. A mapping changed by hand in production is invisible in Git. A typical scenario, as an assumption: a partner maps a new pricing provider directly in production to fix an urgent price error, the change never reaches the repository, and the next deployment from the pipeline maps the old provider again. Nobody notices until dealers complain about wrong prices.

What I would put into the contract and the pipeline:

- Extension classes, tests and the register and map commands live in the client's repository, as I argue in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).
- The pipeline runs the CLI commands per environment, so mappings are reproducible. Salesforce notes that managing extensions needs the latest Salesforce CLI, so pin and update the CLI version deliberately.
- Every extension change goes through a [pull request review](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) that checks `super()`, timeouts of ERP callouts and test assertions.
- Manual mapping in production is reserved for emergencies and followed by a commit the same day.

The DevOps masterclass covers how store configuration travels with metadata in [data and configuration](../../masterclass/devops-release-management/data-and-configuration/) and how to set up the pipeline in [building the pipeline](../../masterclass/devops-release-management/building-the-pipeline/).

## Where should you start?

List every piece of custom logic in your store and assign it to an extension point, an old integration or a custom component. Mark each domain provider that does not call `super()` and ask for the reason. Then check whether registration and mapping can be rebuilt from the repository in a fresh sandbox. If that fails, you have found your biggest dependency on the current partner. The ERP side of the same decisions is part of the chapter [ERP integration](../../masterclass/b2b-commerce/erp-integration-stock-orders/), and the same extensions also serve a [headless storefront](../headless-b2b-commerce-own-frontend/).

Extensions that call the standard and live in your pipeline are the custom code you can still maintain after the next release and the next partner; if you want a second look at yours, [send me a message](#contact).
