---
title: "Commerce extensions: custom code with less release risk"
description: "How to build custom pricing, stock and checkout logic in Salesforce B2B Commerce with extensions, so it carries less release risk and survives a partner change."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: commerce-extensions-custom-code
translationKey: commerce-extensions-custom-code
topic: commerce
categories: [b2b-commerce, devops]
tags: [b2b commerce, extensions, apex, sfdx, release management, partner governance]
takeaways:
  - "Commerce extensions are Apex classes at named extension points, such as pricing, inventory, tax, shipping or order creation."
  - "Domain extensions extend or replace a whole service. Endpoint extensions only change the request or response of one Connect API endpoint."
  - "When a domain extension modifies rather than replaces the standard, Salesforce strongly recommends calling super() to keep what future releases add."
  - "Extensions are the preferred way to customize Commerce. Cart Calculate extensions and older integrations cannot be mixed in one store."
  - "Extension classes, their registration and their store mapping belong in the client's repository and pipeline, so any partner can take them over."
faq:
  - q: "What are Salesforce Commerce extensions?"
    a: "They are Apex classes, called extension providers, that Salesforce runs at named extension points of B2B Commerce. They change how pricing, inventory, tax, shipping, checkout or single Connect API endpoints behave, without replacing the store."
  - q: "What is the difference between a domain extension and an endpoint extension?"
    a: "A domain extension works on a functional area such as pricing and can extend or replace the default service, which can affect several API endpoints. An endpoint extension changes the request or response of one Connect API endpoint and cannot replace its default behavior."
  - q: "How are commerce extensions registered?"
    a: "Salesforce recommends the Salesforce CLI with the commerce plug-in: sf commerce:extension:register registers the Apex class, sf commerce:extension:map maps it to a store. Alternatively you can use the RegisteredExternalService and StoreIntegratedService objects or the Connect API."
  - q: "Can payments be customized with a commerce extension?"
    a: "No. Salesforce states that payments currently cannot be customized with an extension. Payment gateways are connected through their own payment integration instead."
  - q: "Can old checkout integrations and Cart Calculate extensions run in the same store?"
    a: "No. Salesforce states that the Cart Calculate API is not compatible with integrations: a store uses either extensions or integrations, and an LWR store created from Spring '24 onward must disable Cart Calculate to keep integrations. Aura stores do not support Cart Calculate at all. Integrations remain fully supported, so I would switch when the code needs to change anyway, as a decision for the whole store."
draft: false
---

Custom store logic in Salesforce B2B Commerce carries the least release risk when it is built as commerce extensions that extend the standard behavior instead of replacing it. Extensions are Apex classes that Salesforce runs at named extension points such as pricing, inventory or order creation. Domain extensions that modify the standard behavior should call that behavior through super(), as Salesforce strongly recommends, and add only your specific logic before or after that call. Endpoint extensions change one API's request or response. Payments cannot be extended. The second half of the answer is ownership: extension code, registration and store mapping belong in your repository and pipeline, not in a partner's.

## What are commerce extensions?

Salesforce describes [extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) as "a mechanism for using Apex to customize the functionality that powers B2B and B2C storefronts". The Apex class is called an extension provider. When a buyer action, a Connect API request or another extension reaches an extension point, the platform checks whether a provider is mapped to that extension point name and runs it.

This applies to Salesforce B2B Commerce on the core platform, which is part of the portfolio that Salesforce now markets as Agentforce Commerce; the documentation still says B2B Commerce. The separate B2C Commerce architecture uses hooks instead, so a team with a B2C background will not find the same mechanism there.

There are two kinds:

- **Domain extensions** belong to a functional area. A provider can extend or replace the default behavior, and one change can affect several endpoints. For example, a pricing provider adjusts the standard price on product pages and again in the cart and checkout.
- **Endpoint extensions** belong to one Connect API resource. The provider can change the request before and the response after the call, but it cannot replace the standard behavior.

## Extension points from pricing to order creation

The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) is short enough to read in full. For a manufacturer connecting SAP or another ERP, these matter most; the promotions calculator also belongs on the list if ERP discounts and store promotions can apply to the same cart:

```tabelle
title: Extension points that matter with an ERP
columns: Need | Extension point | Kind
Customer price from the ERP | Pricing service and cart calculator | Domain *
Stock or availability from the ERP | Inventory service and cart calculator | Domain *
Tax and shipping | Tax service, tax and shipping calculators | Domain
Check credit or blocks before ordering | Place order in checkout | Domain
Shape the order record | Create order in checkout | Domain
Custom buyer group assignment | Buyer group evaluation | Domain
Filter or enrich products and search results | Product and search endpoints | Endpoint
```

The page also states the default services you replace: inventory uses Omnichannel Inventory, pricing uses Salesforce price books, tax uses the Salesforce tax service, and shipping returns no charge until you extend it.

```hinweis achtung
According to the same page, if the store uses Faster Add-to-Cart, every product needs an entry in a store price book before you implement the pricing extension, even if the real price later comes from the ERP.
```

Which data should be retrieved live from the ERP and which should be copied into Salesforce is a design decision of its own. I cover it in [B2B Commerce and SAP: which data flows where?](/en/blog/b2b-commerce-sap-data-flows/).

## Why should a domain extension keep the standard behavior running?

Salesforce writes that it "strongly recommend[s] calling the super() method as a best practice to ensure platform compatibility" when you modify rather than fully replace the default. The super() call runs the standard service inside your own code. In practice there are three ways to write a domain provider:

1. Replace the standard entirely.
2. Let the standard behavior run and adjust the result, for example by applying an ERP discount to the standard price.
3. Do something before the standard behavior runs, for example read the buyer's ERP customer number, and then let the standard behavior run.

Variants 2 and 3 carry less release risk. When Salesforce adds something to the standard service, such as a new field or a promotion feature, a provider that keeps the standard running gets it automatically. A provider that replaces everything does not receive those changes for the methods it overrides. Either way, test every extension in a preview sandbox before each release. In a review of partner code, a full replacement of the standard is the first thing I would ask about. Sometimes it is justified, for example when the ERP is the only price master, but then the reason belongs in the code and in the architecture decision log.

```vertiefung For developers
title: How do I test a provider that calls super()?
The base classes live in a Salesforce namespace, and the [guide on mocking the base class](https://developer.salesforce.com/docs/commerce/extensions/guide/mock-the-base-apex-class.html) explains that the Apex test framework cannot mock across namespaces. The documented pattern is to make the provider `virtual`, wrap the `super()` call in a separate overridable method and override that method in a test subclass.

ERP callouts are simulated with `HttpCalloutMock`, as described in [writing tests for an extension provider](https://developer.salesforce.com/docs/commerce/extensions/guide/write-tests-for-an-extension-provider.html).
```

Code coverage alone does not prove that an extension was tested. Ask for assertions on prices, stock results, errors and fallback behavior.

## Extensions or the older integrations?

Before extensions, checkout logic was connected through integrations: an Apex interface that replaces a calculator. Salesforce now says that extensions "are now the preferred way to customize Salesforce Commerce" and that "integrations remain fully supported". Extensions cover more areas, with five cart calculators plus the pricing service and other services, whereas integrations had four checkout calculators.

One limitation determines the migration order: according to the [Cart Calculate API guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/cart-calculate-api.html), the API "isn't compatible with integrations". A store uses Cart Calculate extensions or integrations, not both; LWR stores created from Spring '24 onward have Cart Calculate switched on by default and must disable it to keep integrations, and Aura stores do not support it at all.

My rule: new stores start with extensions. Existing integrations stay until the code has to change anyway, for example because the ERP interface changes or the store moves from Aura to LWR. Then decide for the whole store whether it switches to Cart Calculate and extensions or keeps the integrations with Cart Calculate disabled. Rewriting working integrations only because a newer mechanism exists rarely pays off.

Payments are the exception. Salesforce states: "Currently, payments can't be customized with an extension." Payment gateways continue to use their own adapter; see [B2B checkout: purchase order, card or invoice?](/en/blog/b2b-checkout-purchase-order-card-invoice/).

## Registration and mapping belong in the repository

Registration and mapping are two separate steps, and both are configuration items that someone has to reproduce in every environment. Salesforce recommends doing both with the Salesforce command line, which can run in a pipeline; the Connect API and the admin interface work too, and merchants can map domain extensions there themselves.

That last option is the risk. A mapping changed by hand in production is invisible in Git. Suppose a partner maps a new pricing provider directly in production to fix an urgent price error, the change never reaches the repository, and the pipeline applies the mapping from the repository during the next deployment, which is the old provider. Nobody notices until dealers complain about wrong prices.

```vertiefung For developers
title: Class names, extension point names and CLI commands
- **Domain pricing provider:** extends `commercestorepricing.PricingService` and overrides `processPrice` (product lists and detail pages) and `processTransactionalPrice` (cart and checkout).
- **Endpoint provider:** extends `ConnectApi.BaseEndpointExtension`; no `super()` call.
- **Extension point names used here:** `Commerce_Domain_Pricing_Service`, `Commerce_Domain_Pricing_CartCalculator`, `Commerce_Domain_Inventory_Service`, `Commerce_Domain_Inventory_CartCalculator`, `Commerce_Domain_Tax_Service`, `Commerce_Domain_Tax_CartCalculator`, `Commerce_Domain_Shipping_CartCalculator`, `Commerce_Domain_Checkout_PlaceOrder`, `Commerce_Domain_Checkout_CreateOrder`, `Commerce_Domain_BuyerGroup_EvaluationService`, `Commerce_Endpoint_Catalog_Products`, `Commerce_Endpoint_Search_Products`. The full list, including promotions and split shipment, is on the reference page.
- **Registration and mapping:** `sf plugins install @salesforce/commerce`, then `sf commerce:extension:register` for the class and `sf commerce:extension:map` for the store; or the objects `RegisteredExternalService` and `StoreIntegratedService`.
```

What I would put into the contract and the pipeline:

- Extension classes, tests and the registration and mapping commands live in the client's repository, as I argue in [why clients should own their DevOps tools](/en/blog/why-clients-should-own-their-devops-tools/).
- The pipeline runs the CLI commands per environment, with the store names and IDs for each environment, so mappings are reproducible. Salesforce notes that managing extensions needs the latest Salesforce CLI, so pin tested versions of the CLI and commerce plug-in and update both on a fixed cadence.
- Every extension change goes through a [pull request review](/en/blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/) that checks whether the standard behavior still runs, whether ERP callout timeouts are handled and whether tests include assertions.
- Manual mapping in production is reserved for emergencies and followed by a commit the same day.
- Each extension has a written runtime policy: ERP timeout, retries, fallback, monitoring, and what the buyer sees when a live price or stock information is not available.

The DevOps masterclass covers how store configuration travels with metadata in [data and configuration](/en/masterclass/devops-release-management/data-and-configuration/) and how to set up the pipeline in [building the pipeline](/en/masterclass/devops-release-management/building-the-pipeline/).

## Map every piece of custom logic to an extension point

List every piece of custom logic in your store and assign it to an extension point, an old integration or a custom component, keeping in mind that cart calculation uses either extensions or integrations. Mark each domain provider that replaces the standard behavior and ask for the reason. Then check whether registration and mapping can be rebuilt from the repository in a fresh sandbox. If that fails, you have found your biggest dependency on the current partner. The ERP side of the same decisions is covered in the chapter [ERP integration](/en/masterclass/b2b-commerce/erp-integration-stock-orders/), and the same extensions can also serve a [headless storefront](/en/blog/headless-b2b-commerce-own-frontend/).
