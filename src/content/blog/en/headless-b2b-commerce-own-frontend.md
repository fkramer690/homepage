---
title: "Headless B2B Commerce: own frontend, Salesforce core"
description: "When a manufacturer should run Salesforce B2B Commerce headless behind its own website or app, what stays in Salesforce and what your team must build and run."
pubDate: 2026-10-28
lang: en
slug: headless-b2b-commerce-own-frontend
translationKey: commerce-headless-b2b
topic: commerce
categories: [b2b-commerce, architecture]
tags: [b2b commerce, headless, connect rest api, react, storefront, manufacturing]
takeaways:
  - "With headless, your company hosts the frontend, runs its deployment pipeline and builds the login; with an Experience Builder store Salesforce hosts the site."
  - "Headless B2B Commerce is generally available, with a React B2B Storefront Blueprint and a reference app whose source is on GitHub."
  - "Pricing, inventory and checkout extensions run on the Connect API requests, so the same ERP logic applies in the LWR store and in your app."
  - "Headless pays off when a corporate website or customer app and a team to run it already exist. For a first store, an LWR store is the cheaper start."
faq:
  - q: "What is headless B2B Commerce in Salesforce?"
    a: "A setup where your own frontend, for example a React website or a mobile app, calls the Salesforce Commerce Connect REST APIs for search, product details, pricing, cart, checkout and order history. Salesforce B2B Commerce stays the commerce backend, and you build and host the user interface."
  - q: "Does a headless B2B store still need an Experience Cloud site?"
    a: "For guest cart and checkout with JWT, the Salesforce developer guide lists an active Experience Cloud site, a launched web store and a configured domain as prerequisites. For registered buyers the guides I read do not state it explicitly, so I would plan with the site and confirm it in a sandbox."
  - q: "Is there a starter project for a headless B2B storefront?"
    a: "Yes. Salesforce offers a React B2B Storefront Blueprint and a B2B Commerce headless reference app. The reference app's source code is published in the trailheadapps/commerce-b2b-headless repository on GitHub."
  - q: "Which licence do buyers need in a headless B2B store?"
    a: "The headless guides I read do not say. For buyers in a standard store, Trailhead names Customer Community Plus, so I would get the licence position for headless buyers confirmed by Salesforce in writing before the business case is final."
draft: false
---

Headless B2B Commerce means your own website or app is the storefront, while Salesforce B2B Commerce keeps catalogue, prices, cart, checkout and orders and serves them through the Commerce Connect REST APIs. Salesforce lists it as generally available, with a React B2B Storefront Blueprint and a headless reference app as a starting point. I would only go headless when a corporate website or a customer app already exists and a team runs it. Otherwise an LWR store built in Experience Builder is cheaper, because Salesforce hosts it and you do not have to test your own frontend against every Salesforce release.

## What does headless B2B Commerce mean?

In a normal Salesforce B2B store, the storefront is an Experience Cloud site built with Experience Builder, today usually on the LWR template. Headless separates the two layers. Salesforce describes it in the [headless API architecture guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-api-architecture.html) as an architecture where "the frontend presentation layer is separated from the commerce backend". Your frontend calls the Commerce Connect REST APIs for:

- authentication and session management,
- product search, category navigation and product details,
- pricing and promotions,
- cart and checkout,
- order placement and order history,
- account and profile data.

The product itself carries several names right now. Salesforce Help still says "Salesforce B2B Commerce", while Trailhead writes that B2B Commerce is now [Agentforce Commerce for B2B](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Headless works with the same product, there is no separate headless edition.

On the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/), Salesforce marks headless B2B Commerce as "GA Now" and promises "B2B buying anywhere your customers work", naming your site, your app and Slack. The same entry mentions a new React B2B Storefront Blueprint and an extensible checkout. In its [June 2026 release post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/), Salesforce adds a headless reference app, a working application that shows the recommended API sequences from catalogue to checkout, for teams building with React or Vue. The [developer guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-journey-overview.html) links its source code in the `trailheadapps/commerce-b2b-headless` repository.

## Salesforce keeps the data, you run the frontend

The split is clearer than in most architecture discussions, because Salesforce states it in the architecture guide: with headless, "your organization manages frontend hosting, deployment pipelines, and integration layers". With Experience Builder, Salesforce manages hosting, scaling and the core platform infrastructure.

| Part | Experience Builder store (LWR) | Headless |
|---|---|---|
| Catalogue, entitlements, buyer groups | Salesforce | Salesforce |
| Prices, cart, checkout logic, extensions | Salesforce | Salesforce |
| Order summaries and order history | Salesforce | Salesforce |
| Page layout, design, routing | Experience Builder | Your frontend code |
| Hosting and scaling of the storefront | Salesforce | You |
| Login flow and session handling | Site login | Your backend with OAuth |
| Deployment pipeline for the frontend | Salesforce release of the site | Your pipeline |
| Testing against Salesforce releases | Your store regression tests | Your store and frontend regression tests |

Everything that decides what a buyer may see, pay and order stays in Salesforce. That is the main argument for headless: you get your own interface without building a second commerce engine.

## How does a headless checkout work technically?

The [headless checkout guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-checkout.html) shows the sequence. The frontend reads the active checkout and creates one from the active cart if there is none. It sets the delivery address and delivery method with PATCH calls, authorises a purchase order payment with the request type `SimplePurchaseOrder` and the PO number as token, and then places the order in two steps, `prepare` and `submit`. The response contains the order reference number and the order summary ID.

The important detail for an architect: the pricing, inventory, tax and checkout logic runs behind these calls. Commerce extensions are triggered by Connect API requests, so a pricing extension that asks SAP for the customer price runs for your React app in the same way as for the LWR store. How to build those extensions so they survive releases is covered in [Commerce extensions: custom code that survives updates](../commerce-extensions-custom-code/), and where customer prices should come from in [Customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/).

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

Login is the part you build yourself. For registered buyers, the [headless login guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-login.html) uses the OAuth authorize and token endpoints, supports external identity providers and custom Apex-based authentication, and after login all storefront calls rely on the active session. For guests, Salesforce documents [cart and checkout with a JWT](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-guest-jwt.html): a backend for frontend, a unique visitor ID per guest, and as prerequisites an active Experience Cloud site, a launched web store and a configured domain. Headless therefore does not mean you get rid of the Experience Cloud site.

```hinweis offen
Which licence buyers in a headless store need is not stated in the guides I read. For a standard store, Trailhead names Customer Community Plus, see [B2B Commerce buyer licences](../b2b-commerce-buyer-licences/). I would get the headless case confirmed in writing before anyone calculates a business case.
```

## Four conditions for headless at a manufacturer

I see four conditions, and I would want at least the first and the last to be true:

1. **A frontend already exists that buyers use.** A corporate website with product content, or a customer app for machine operators. Duplicating that content in an Experience Cloud site would cost more than connecting it.
2. **Ordering is one function among others.** In a machine app, ordering wear parts sits next to machine status and documents. A separate shop would break that flow.
3. **Several channels share one backend.** Website, app and later Slack or an agent all use the same catalogue, prices and orders.
4. **A frontend team exists for years.** In-house or under a long-term contract, with React skills, its own pipeline and someone who answers when the shop is slow.

Worked example: a machine builder runs a React app in which 3,000 operators see the status of their machines. Adding "order wear parts" to that app through the Connect APIs keeps the buyer in a tool they already open daily. The same manufacturer's 200 dealers, who order spare parts in bulk, are better served by a standard LWR store. Both can run on the same Salesforce catalogue.

Headless is the wrong choice for a first store without a frontend team, or when the main goal is to get dealers off the phone quickly. If you only need a mobile app, the June release post also names Mobile Publisher, which publishes a branded app to the Apple and Google stores without building a headless frontend.

## What does headless cost beyond the licence?

Salesforce sells B2B Commerce as a share of storefront revenue and publishes no percentage, see [B2B Commerce pricing and the GMV model](../b2b-commerce-pricing-gmv-model/). I found no separate price for headless. The real extra cost sits on your side:

- building the frontend and a backend for frontend that holds OAuth credentials,
- hosting, monitoring and on-call for the storefront,
- regression tests against every Salesforce release, for the APIs your frontend calls,
- deliberate upgrades of the API version in your calls, instead of drifting.

The frontend repository and pipeline should belong to you, not to the agency that builds it, for the same reasons I give in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/). If you also want an Agentforce agent inside your own app, the [Agent API](../agentforce-agent-api-dealer-apps/) is the separate entry point, with its own identity questions. How agents reuse the same interfaces is covered in the AI masterclass chapter on [MCP and interfaces](../../masterclass/ai-salesforce/mcp-and-interfaces/).

## Check channels in use and the frontend team

Write down which channels buyers really use today and which one should take orders. Then check whether a frontend team will exist for the next three years. If both answers point to headless, build a short proof with the reference app against a sandbox that holds your real catalogue and your pricing extension, and measure how fast cart and checkout answer with the live ERP call. The data flows behind it are part of the chapter [ERP integration](../../masterclass/b2b-commerce/erp-integration-stock-orders/) in my B2B Commerce masterclass, and I support this kind of decision under [Salesforce integration](../../services/salesforce-integration/).
