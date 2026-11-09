---
title: "Request for Quote in B2B Commerce: cart to quote"
description: "How buyers in Salesforce B2B Commerce turn a cart into a quote request, how the approved quote comes back as a cart, and what the sales desk must organize."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: request-for-quote-b2b-commerce-cart-to-quote
translationKey: commerce-request-for-quote
topic: commerce
categories: [b2b-commerce, revenue-cloud]
tags: [B2B Commerce, Request for Quote, quotes, Revenue Cloud, sales desk]
takeaways:
  - "Signed-in buyers send their cart or a single product as a quote request. Salesforce calls the feature generally available."
  - "Simple products work with a B2B Commerce license; bundles need Revenue Cloud too. Subscription products are not supported in Request for Quote."
  - "With round-trip quoting, GA since June 2026, the buyer clicks Accept & Buy on an approved quote and checks out at the negotiated prices."
  - "ConnectApi.CommerceCart turns a cart into a quote and an approved quote into a cart; ConnectApi.CommerceQuotes lists and updates quotes."
  - "In my view the feature only works if the sales desk answers within a published response time; otherwise buyers go back to email."
faq:
  - q: "What is Request for Quote in Salesforce B2B Commerce?"
    a: "A store feature that lets buyers request a quote for complex or high-value purchases directly from their cart, or for a single product from the product page. The request becomes a quote that the sales desk reviews in Sales Cloud or Agentforce Revenue Management."
  - q: "Does Request for Quote need Revenue Cloud?"
    a: "Not for simple products. According to the Apex reference, simple products are supported with a B2B Commerce license alone, while static and dynamic bundles need B2B Commerce and Revenue Cloud. Subscription products are not supported. Confirm your product mix with Salesforce in writing."
  - q: "How does an approved quote get back to the buyer?"
    a: "Through round-trip quoting, which Salesforce made generally available in June 2026. The buyer opens the approved quote on My Quotes and clicks Accept & Buy; the items land in the cart at the negotiated prices, and the buyer checks out in the store. The feature has to be set up in the store first."
  - q: "Can a buyer reject or renegotiate a quote in the store?"
    a: "Yes. According to the Apex reference (API 67.0), a buyer can click Renegotiate or Decline on an approved quote on the My Quotes page. Renegotiate sets the quote back to Draft with the buyer's comments, Decline sets it to Denied. The setup page in Help calls the required status Rejected, so check the values in your org."
draft: false
---

In Salesforce B2B Commerce, a signed-in buyer can send the cart as a quote request, or request a quote for a single product from its product page. The request lands as a quote that your sales desk reviews in Sales Cloud or Agentforce Revenue Management. Once the quote is approved, the buyer accepts it in the store and checks out the resulting cart at the negotiated prices; Salesforce calls this round-trip quoting. Simple products need only B2B Commerce, bundles also Revenue Cloud, and subscriptions are not supported. In my experience, Request for Quote works only if your sales desk answers within a published response time.

## Why does a B2B store need Request for Quote?

Dealers do not only reorder known parts at known prices. They ask for a price on 200 units instead of 5, on a part they have never bought, or on a project with a delivery date. Today that is an email with an Excel list to inside sales, and the answer is a PDF that someone types back into an order.

Request for Quote (RFQ) keeps that conversation in the store. Salesforce described it in its [Spring '26 B2B innovations post](https://www.salesforce.com/blog/b2b-commerce-innovations-spring-26/) as the step "from self-service to sales-assisted": buyers request a quote without leaving the storefront. The [June 2026 post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) calls RFQ "already generally available". Trailhead also calls the product Agentforce Commerce for B2B; the feature is the same under both names.

[Salesforce Help on pricing for B2B stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) describes it like this: buyers in B2B stores can request quotes for complex or high-value purchases directly from their cart, and you review and manage the quotes in Sales Cloud or Agentforce Revenue Management. Which products work depends on the license: according to the [Apex reference for ConnectApi.CommerceCart](https://developer.salesforce.com/docs/platform/apex-ref/references/apex-ref/apex-connectapi-commercecart-static-methods.html), simple products are supported with B2B Commerce alone, static and dynamic bundles only with B2B Commerce and Revenue Cloud, and subscription products not at all. When Revenue Cloud pricing in the store is worth the license is covered in [Advanced Pricing in B2B stores](../advanced-pricing-b2b-store-revenue-cloud/).

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
  With Accept & Buy, the approved quote becomes a cart. The buyer checks out with the negotiated prices, usually with a purchase order number, as described in [B2B checkout: purchase order, card or invoice?](../b2b-checkout-purchase-order-card-invoice/).
```

On step 4, the June 2026 post says: "once a quote is negotiated and approved, sellers can share it with customers as a cart". Salesforce calls this round-trip quoting and lists it as generally available since June 2026. It is not automatic, though: the store needs the quote components on the My Quotes page, and the buyer triggers the conversion. The Apex reference sets limits that matter for design:

- **Accept & Buy versus Duplicate to Cart.** Accept & Buy works only on Approved or Accepted quotes and keeps the negotiated prices. Duplicate to Cart copies a draft quote into a cart at the original prices.
- **No overlap, no partial conversion.** The conversion fails if the buyer's cart already contains a product from the quote, and a quote cannot be converted in part. Promotions and bonus products are not supported.
- **Once per order.** A quote turns into a cart once if that cart is used to place an order.

## The quote APIs for custom components

If you build your own components, two Apex classes matter; a headless frontend uses the matching Commerce Connect REST resources. The round trip itself sits in [ConnectApi.CommerceCart](https://developer.salesforce.com/docs/platform/apex-ref/references/apex-ref/apex-connectapi-commercecart-static-methods.html): createQuoteFromCart (API 66.0) turns the active cart into a quote, createCartFromQuote (API 67.0) turns an approved quote back into a cart. [ConnectApi.CommerceQuotes](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexref.meta/apexref/apex_ConnectAPI_CommerceQuotes_static_methods.htm) has four methods for everything around it:

| Method | API version | What it does |
|---|---|---|
| getQuotes | 66.0 | All quotes of an account, with sorting, paging and date filter |
| getQuoteDetail | 66.0 | Details of one quote for an account |
| createQuoteFromProduct | 67.0 | Creates a quote from a product page |
| updateQuote | 67.0 | Renegotiate or decline an approved quote |

Two details from the reference matter for design:

- **createQuoteFromProduct** creates a temporary secondary cart to process the request and deletes it afterwards, whether the call succeeds or fails. The buyer's real cart stays untouched.
- **updateQuote** only works on approved quotes. Renegotiate moves the quote back to Draft and saves the buyer's comments, Decline sets it to Denied. The setup page in Help lists Rejected instead of Denied among the required status values, so check the picklist in your org.

The statuses are a starting point for your process: a Draft quote from the store usually means work for the sales desk, an Approved quote is with the buyer, a declined quote is a reason worth reading. For routing and response times you still need a queue owner and your own fields.

```hinweis offen
**Licenses per product type.** According to the Apex reference, simple products are supported with B2B Commerce or B2B Commerce and Revenue Cloud licenses; static and dynamic bundles require B2B Commerce and Revenue Cloud; subscription products are not supported at all. For a manufacturer selling machines as bundles or service as subscriptions, that decides the scope. Get the binding answer for your products from Salesforce in writing.
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

With RFQ, the integrator puts the parts list into the cart and requests a quote with the project name in the comment. The quote lands in a queue per country, the desk prices it with the Revenue Cloud procedure that sales already uses for machine quotes, and approves it. The integrator gets the quote in My Quotes, asks for one change through Renegotiate, receives the revised quote, clicks Accept & Buy and checks out the cart. The order reaches SAP with the negotiated prices and the quote number as reference.

The numbers are invented to show the method. What I would measure in the first three months: share of quote requests through the store instead of email, response time, and share of approved quotes that become orders.

## Set response time and price authority for the sales desk

Start with the sales desk, not the component. Write down the response time, the queue owners and the price authority, and test the round trip with one buyer group that already sends many quote requests. Then check the license question for your product types with Salesforce, especially bundles and subscriptions.

The chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) shows how RFQ fits next to customer prices, checkout and reorders. How a quote in Revenue Cloud continues to contract and order is covered in the chapter [quote, contract, order](../../masterclass/revenue-cloud/quote-contract-order/) of the Revenue Cloud masterclass. Where RFQ touches several partners and teams, steering it is part of my work on [partner governance](../../services/partner-governance/).
