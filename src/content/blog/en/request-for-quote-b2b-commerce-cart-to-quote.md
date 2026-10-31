---
title: "Request for Quote in B2B Commerce: cart to quote"
description: "How buyers in Salesforce B2B Commerce turn a cart into a quote request, how the approved quote comes back as a cart, and what the sales desk must organise."
pubDate: 2026-10-28
lang: en
slug: request-for-quote-b2b-commerce-cart-to-quote
translationKey: commerce-request-for-quote
topic: commerce
categories: [b2b-commerce, revenue-cloud]
tags: [B2B Commerce, Request for Quote, quotes, Revenue Cloud, sales desk]
takeaways:
  - "Signed-in buyers send their cart or a single product as a quote request. Salesforce calls the feature generally available."
  - "The sales desk reviews quotes in Sales Cloud or Revenue Management. Salesforce Help lists Advanced Pricing powered by Revenue Cloud as a requirement."
  - "Quote to Cart and round-trip quoting, announced in June 2026, send the negotiated quote back to the buyer as a cart to check out."
  - "ConnectApi.CommerceQuotes lists quotes, creates one from a product page and lets the buyer renegotiate or decline an approved quote."
  - "The feature only works if the sales desk answers quote requests within a fixed time; otherwise buyers go back to email and phone."
faq:
  - q: "What is Request for Quote in Salesforce B2B Commerce?"
    a: "A store feature that lets buyers request a quote for complex or high-value purchases directly from their cart, or for a single product from the product page. The request becomes a quote that the sales desk reviews in Sales Cloud or Agentforce Revenue Management."
  - q: "Does Request for Quote need Revenue Cloud?"
    a: "Salesforce Help lists Advanced Pricing for Commerce Powered by Revenue Cloud as required for Request for Quote. The Apex reference for creating a quote from a product supports simple products with a B2B Commerce licence and bundles only with Revenue Cloud. Confirm your case with Salesforce."
  - q: "How does an approved quote get back to the buyer?"
    a: "With Quote to Cart, which Salesforce announced in June 2026: once a quote is negotiated and approved, the seller shares it with the buyer as a cart, and the buyer reviews it and checks out in the store."
  - q: "Can a buyer reject or renegotiate a quote in the store?"
    a: "Yes. According to the Apex reference (API 67.0), a buyer can click Renegotiate or Decline on an approved quote on the My Quotes page. Renegotiate sets the quote back to Draft with the buyer's comments, Decline sets it to Denied."
draft: false
---

In Salesforce B2B Commerce, a signed-in buyer can send the cart as a quote request, or request a quote for a single product from its product page. The request lands as a quote that your sales desk reviews in Sales Cloud or Agentforce Revenue Management. Once the quote is negotiated and approved, Quote to Cart, announced in June 2026, sends it back to the buyer as a cart to check out in the store. Salesforce Help lists Advanced Pricing powered by Revenue Cloud as a requirement. The technology is the smaller part, though. Request for Quote works only if your sales desk answers within a fixed time.

## Why does a B2B store need Request for Quote?

Dealers do not only reorder known parts at known prices. They ask for a price on 200 units instead of 5, on a part they have never bought, or on a project with a delivery date. Today that is an email with an Excel list to inside sales, and the answer is a PDF that someone types back into an order.

Request for Quote (RFQ) keeps that conversation in the store. Salesforce described it in its [Spring '26 B2B innovations post](https://www.salesforce.com/blog/b2b-commerce-innovations-spring-26/) as the step "from self-service to sales-assisted": buyers request a quote without leaving the storefront. The [June 2026 post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) calls RFQ "already generally available". Salesforce now also markets the product as Agentforce Commerce for B2B; the feature is the same under both names.

[Salesforce Help on pricing for B2B stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) describes it like this: buyers in B2B stores can request quotes for complex or high-value purchases directly from their cart, and you review and manage the quotes in Sales Cloud or Agentforce Revenue Management. The same page lists Advanced Pricing for Commerce Powered by Revenue Cloud as required for Request for Quote. When that is worth the licence is covered in [Advanced Pricing in B2B stores](../advanced-pricing-b2b-store-revenue-cloud/).

## How does a cart become a quote and the quote a cart again?

The round trip has four steps:

```schritte
Request | Buyer
  The buyer fills a cart, or opens a product page, and requests a quote instead of checking out.
Negotiation | Sales desk
  The request becomes a quote. The sales desk adjusts prices or quantities and approves it in Sales Cloud or Revenue Management.
Response | Buyer
  The buyer sees the quote on the My Quotes page and either accepts, asks for changes or declines.
Order | Buyer
  With Quote to Cart, the approved quote comes back as a cart. The buyer checks out with the negotiated prices, usually with a purchase order number, as described in [B2B checkout: purchase order, card or invoice?](../b2b-checkout-purchase-order-card-invoice/).
```

On step 4, the June 2026 post says: "once a quote is negotiated and approved, sellers can share it with customers as a cart". Salesforce calls this round-trip quoting. The June post presents Quote to Cart and round-trip quoting as part of a release labelled "GA June 2026", but it gives the explicit status "generally available" only for RFQ. Before you plan step 4 into a rollout, check in your org which of these parts are active.

## The CommerceQuotes APIs for custom components

If you build your own components or a headless frontend, the Apex class [ConnectApi.CommerceQuotes](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexref.meta/apexref/apex_ConnectAPI_CommerceQuotes_static_methods.htm) is the interface. It has four methods:

| Method | API version | What it does |
|---|---|---|
| getQuotes | 66.0 | All quotes of an account, with sorting, paging and date filter |
| getQuoteDetail | 66.0 | Details of one quote for an account |
| createQuoteFromProduct | 67.0 | Creates a quote from a product page |
| updateQuote | 67.0 | Renegotiate or decline an approved quote |

Two details from the reference matter for design:

- **createQuoteFromProduct** creates a temporary secondary cart to process the request and deletes it afterwards, whether the call succeeds or fails. The buyer's real cart stays untouched.
- **updateQuote** only works on approved quotes. Renegotiate moves the quote back to Draft and saves the buyer's comments, Decline sets it to Denied.

The statuses are the hook for your process. Every quote in Draft is work for the sales desk, every Approved quote waits for the buyer, every Denied quote is a reason worth reading.

```hinweis offen
**Licences per product type.** According to the Apex reference, simple products are supported with B2B Commerce or B2B Commerce and Revenue Cloud licences; static bundled products require B2B Commerce and Revenue Cloud. This reads less strict than the Help page, which lists Advanced Pricing as required for Request for Quote. Get the binding answer for your products from Salesforce in writing.
```

## Who answers the quote, and how fast?

This is where RFQ succeeds or fails, and none of it is configuration. A buyer who requests a quote in the store and waits three days will send the next request by email, because email at least reaches a person.

Before go-live I would settle these points in writing:

- **Response time.** For example, a reply within one working day for spare parts and three days for project quantities. Measure it from the first day.
- **Ownership.** Which team receives requests from which buyer group or country, and who covers absences. A queue without an owner is a waiting room.
- **Price authority.** Up to which discount the desk approves alone, and from when a manager signs off. If you run approvals in Revenue Cloud, put the limits in rules there.
- **Validity.** How long an approved quote holds before prices are checked again.
- **Order path.** What happens when a buyer accepts by email instead of in the store. If the desk then enters the order by hand, the round trip breaks.

Large dealers also ask through sales reps and partner portals. If AI builds quotes there too, the same desk and the same price rules should serve both channels, as I describe for the [AI Partner Sales Assistant](../ai-partner-sales-assistant-dealer-quotes/).

## Worked example: 400 system integrators

Assume a manufacturer of conveyor components sells to 400 system integrators. Most orders are reorders at tier prices, but about one order in ten is project business with larger quantities and a target price. Inside sales gets these requests by email today and answers within an average of four days.

With RFQ, the integrator puts the parts list into the cart and requests a quote with the project name in the comment. The quote lands in a queue per country, the desk prices it with the Revenue Cloud procedure that sales already uses for machine quotes, and approves it. The integrator gets the quote in My Quotes, asks for one change through Renegotiate, receives the revised quote and checks out the cart that Quote to Cart creates. The order reaches SAP with the negotiated prices and the quote number as reference.

The numbers are invented to show the method. What I would measure in the first three months: share of quote requests through the store instead of email, response time, and share of approved quotes that become orders.

## First step: set response time and price authority for the sales desk

Start with the sales desk, not the component. Write down the response time, the queue owners and the price authority, and test the round trip with one buyer group that already sends many quote requests. Then check the licence question for your product types with Salesforce, because Help and the Apex reference read differently.

The chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) shows how RFQ fits next to customer prices, checkout and reorders. How a quote in Revenue Cloud continues to contract and order is covered in the chapter [quote, contract, order](../../masterclass/revenue-cloud/quote-contract-order/) of the Revenue Cloud masterclass. Where RFQ touches several partners and teams, steering it is part of my work on [partner governance](../../services/partner-governance/).
