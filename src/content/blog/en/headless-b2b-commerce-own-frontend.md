---
title: "Headless B2B Commerce: own frontend, Salesforce core"
description: "When a manufacturer should run Salesforce B2B Commerce headless behind its own website or app, what stays in Salesforce and what your team must build and run."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: headless-b2b-commerce-own-frontend
translationKey: commerce-headless-b2b
topic: commerce
categories: [b2b-commerce, architecture]
tags: [b2b commerce, headless, connect rest api, react, storefront, manufacturing]
takeaways:
  - "With headless, your team owns the frontend code, its pipeline and the login design; it runs on your hosting or as a bundle in an Experience Cloud site."
  - "Headless B2B Commerce is generally available, with a React B2B Storefront Blueprint and a reference app whose source is on GitHub."
  - "Mapped pricing, inventory and checkout extensions can serve both your app and the LWR store. Which extension runs depends on the operation, so test it."
  - "Headless pays off when a website or customer app already exists, along with a team to run it. Without them, an LWR store usually means less effort to start."
faq:
  - q: "What is headless B2B Commerce in Salesforce?"
    a: "It is a setup where your own frontend, for example a React website or a mobile app, calls the Salesforce Commerce Connect REST APIs for search, product details, pricing, cart, checkout and order history. Salesforce B2B Commerce remains the commerce backend, and you build the user interface, which you host yourself or run as a bundle in an Experience Cloud site."
  - q: "Does a headless B2B store still need an Experience Cloud site?"
    a: "For guest cart and checkout with JWT, the Salesforce developer guide lists an active Experience Cloud site, a launched web store and a configured domain as prerequisites. Salesforce's React reference app is also served from an Experience Cloud site container. For other registered-buyer patterns, verify the requirement in a sandbox."
  - q: "Is there a starter project for a headless B2B storefront?"
    a: "Yes. Salesforce offers a React B2B Storefront Blueprint and a B2B Commerce headless reference app. The reference app's source code is published in the trailheadapps/commerce-b2b-headless repository on GitHub."
  - q: "Which license do buyers need in a headless B2B store?"
    a: "Buyers need the same licenses as in any B2B store, because the license follows the buyer's role, not the frontend. Salesforce Help lists External Apps or External Apps Login as the minimum for standard buyers, and Customer Community Plus or higher for buyer managers who manage other buyers. Confirm the SKU and login model in the contract."
draft: false
---

Headless B2B Commerce means your own website or app is the storefront, while Salesforce B2B Commerce keeps the catalog, prices, cart, checkout and orders and serves them through the Commerce Connect REST APIs. Salesforce lists it as generally available, with a React B2B Storefront Blueprint and a headless reference app as a starting point. I would choose a headless setup only when a corporate website or customer app already exists and a team runs it. Otherwise an LWR store built in Experience Builder usually means less effort, because there is no frontend codebase of your own to build, host and keep up to date.

## What does headless B2B Commerce mean?

In a normal Salesforce B2B store, the storefront is an Experience Cloud site built with Experience Builder, today usually on the LWR template. Headless separates the two layers. Salesforce describes it in the [headless API architecture guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-api-architecture.html) as an architecture where "the frontend presentation layer is separated from the commerce backend". Your frontend calls the Commerce Connect REST APIs for:

- authentication and session management,
- product search, category navigation and product details,
- pricing and promotions,
- cart and checkout,
- order placement and order history,
- account and profile data.

The product itself goes by several names right now. Salesforce Help still says "Salesforce B2B Commerce", while Trailhead writes that B2B Commerce is now [Agentforce Commerce for B2B](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Headless works with the same product. There is no separate headless edition.

On the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/), Salesforce marks headless B2B Commerce as "GA Now" and promises "B2B buying anywhere your customers work", naming your site, your app and Slack. The same entry mentions a new React B2B Storefront Blueprint and an extensible checkout. In its [June 2026 release post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/), Salesforce adds a headless reference app, a working application that shows the recommended API sequences from catalog to checkout, for teams building with React or Vue. The [developer guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-journey-overview.html) links to its source code in the `trailheadapps/commerce-b2b-headless` repository.

## Salesforce keeps the data, you run the frontend

The split is clearer than in most architecture discussions, because Salesforce states it in the architecture guide: with headless, "your organization manages frontend hosting, deployment pipelines, and integration layers". With Experience Builder, Salesforce manages hosting, scaling and the core platform infrastructure.

| Part | Experience Builder store (LWR) | Headless |
|---|---|---|
| Catalog, entitlements, buyer groups | Salesforce | Salesforce |
| Prices, cart, checkout logic, extensions | Salesforce | Salesforce |
| Order summaries and order history | Salesforce | Salesforce |
| Page layout, design, routing | Experience Builder | Your frontend code |
| Hosting and scaling of the storefront | Salesforce | You, or Salesforce if the app runs as a bundle in an Experience Cloud site |
| Login flow and session handling | Configured in the site | Designed by you: OAuth, external identity provider or a session-based flow |
| Deployment pipeline for the frontend | Salesforce release of the site | Your pipeline |
| Testing against Salesforce releases | Your store regression tests | Your store and frontend regression tests |

Salesforce remains the commerce system of record and orchestrates entitlements, cart and checkout, while individual decisions can still come from mapped external services such as ERP pricing, inventory, tax or payment. That is the main argument for headless: you get your own interface without building a second commerce engine.

## How does a headless checkout work technically?

The [headless checkout guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-checkout.html) shows the sequence. The frontend reads the active checkout and creates one from the active cart if there is none. It sets the delivery address and delivery method with PATCH calls, authorizes a purchase order payment with the request type `SimplePurchaseOrder` and the PO number as the token, and then places the order in two steps, `prepare` and `submit`. The response contains the order reference number and the order summary ID.

For an architect, the important detail is that the pricing, inventory, tax and checkout logic runs behind these calls. When your frontend calls the corresponding Commerce APIs for the same web store, mapped extensions can reuse the same pricing, inventory, tax and checkout integrations, so a pricing extension that asks SAP for the customer price can serve your React app as well as the LWR store. Which extension runs depends on the operation, the extension mapping and the Cart Calculate setup, so test the exact API sequence. How to build those extensions so they survive releases is covered in [Commerce extensions: custom code that survives updates](/en/blog/commerce-extensions-custom-code/), and where customer prices should come from in [Customer prices in B2B Commerce](/en/blog/b2b-commerce-customer-prices-price-books-erp/).

```ablauf
ext: Your frontend
sf: Connect REST API, Pricing extension, Order summary
erp: SAP customer price
Your frontend --checkout call--> Connect REST API
Connect REST API --triggers--> Pricing extension
Pricing extension --asks for price--> SAP customer price
SAP customer price ..price back..> Pricing extension
Connect REST API --prepare, submit--> Order summary
```

Login is the part you have to design and implement. For registered buyers, the [headless login guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-login.html) describes the OAuth authorize and token endpoints, external identity providers and custom Apex-based authentication. After login, all storefront calls rely on the active session. The React reference app logs in through Apex with `Site.login()` and then uses the Salesforce session. For guests, Salesforce documents [cart and checkout with a JWT](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-guest-jwt.html). The setup uses a backend for frontend and a unique visitor ID per guest, and it lists an active Experience Cloud site, a launched web store and a configured domain as prerequisites. Salesforce's [React reference app](https://github.com/trailheadapps/commerce-b2b-headless) is also served from an Experience Cloud site container. So do not assume headless removes the Experience Cloud setup; verify it for the login pattern you choose.

```hinweis offen
Buyer licenses follow the role, not the frontend: Salesforce Help names External Apps or External Apps Login for standard buyers and Customer Community Plus or higher for buyer managers, see [B2B Commerce buyer licenses](/en/blog/b2b-commerce-buyer-licences/). Confirm the SKU and login model in the contract before anyone calculates a business case.
```

## Four conditions for headless at a manufacturer

I see four conditions, and I would want at least the first and the last to be true:

1. **A frontend already exists that buyers use.** A corporate website with product content, or a customer app for machine operators. Duplicating that content in an Experience Cloud site would cost more than connecting it.
2. **Ordering is one function among others.** In a machine app, ordering wear parts sits next to machine status and documents. A separate shop would break that flow.
3. **Several channels share one backend.** Website, app and later Slack or an agent all use the same catalog, prices and orders.
4. **A frontend team exists for years.** In-house or under a long-term contract, with React skills, its own pipeline and someone who answers when the shop is slow.

Worked example: a machine builder runs a React app in which 3,000 operators see the status of their machines. Adding an "order wear parts" feature to that app through the Connect APIs keeps the buyer in a tool they already open daily. The same manufacturer's 200 dealers, who order spare parts in bulk, are better served by a standard LWR store. Both can run on the same Salesforce catalog.

Headless is the wrong choice for a first store without a frontend team, or when the main goal is to get dealers off the phone quickly. If an LWR store already exists and a mobile app only needs to reuse it, the June release post also names Mobile Publisher, which packages that store as a branded app for the Apple and Google app stores. It does not replace a machine app with its own workflows.

## What does headless cost beyond the license?

Salesforce offers the public Growth and Advanced editions with pricing based on a percentage of GMV, the storefront's merchandise value without tax and shipping, but does not publish the percentage. Salesforce Help also lists PPO and GMV allocations for standalone licenses, so the model depends on the SKU, see [B2B Commerce pricing and the GMV model](/en/blog/b2b-commerce-pricing-gmv-model/). I found no separate price for headless. The real extra cost is on your side:

- building the frontend and a backend for frontend that holds the OAuth credentials,
- hosting, monitoring and on-call support for the storefront,
- regression tests against Salesforce releases and release updates, for the APIs your frontend calls,
- planned upgrades of the pinned API version before Salesforce retires it.

The frontend repository and pipeline should belong to you, not to the agency that builds the frontend, for the same reasons I give in [why clients should own their DevOps tools](/en/blog/why-clients-should-own-their-devops-tools/). If you also want an Agentforce agent inside your own app, the [Agent API](/en/blog/agentforce-agent-api-dealer-apps/) is the separate entry point, with its own identity questions. How agents reuse the same interfaces is covered in the AI masterclass chapter on [MCP and interfaces](/en/masterclass/ai-salesforce/mcp-and-interfaces/).

## Check channels in use and the frontend team

Write down which channels buyers really use today and which one should take orders. Then check whether a frontend team will exist for the next three years. If both checks point to headless, build a short proof of concept with the reference app against a sandbox that holds your real catalog and your pricing extension, and measure how quickly cart and checkout respond with the live ERP call. Treat the repository as a reference implementation only, as its README says: do not deploy its metadata unchanged, and review every site, guest user, network, profile and permission setting. The data flows behind it are covered in the chapter [ERP integration](/en/masterclass/b2b-commerce/erp-integration-stock-orders/) in my B2B Commerce masterclass, and I support this kind of decision through [Salesforce integration](/en/services/salesforce-integration/).
