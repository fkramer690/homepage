---
title: "B2B checkout: purchase order, card or invoice?"
description: "Which payment options a Salesforce B2B store needs when dealers buy on account: purchase order, card, Dual Payment, Stripe and a credit check against the ERP."
pubDate: 2026-10-28
lang: en
slug: b2b-checkout-purchase-order-card-invoice
translationKey: commerce-checkout-purchase-order
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, checkout, purchase order, payments, credit limit, erp]
takeaways:
  - "In Salesforce B2B Commerce a purchase order counts as a form of payment but triggers no payment flow; the PO number travels to the ERP for invoicing."
  - "An order can only be placed if the cart has either a payment authorisation or a purchase order. Every checkout has to end in one of the two."
  - "The Purchase Order component needs no payment gateway. Dual Payment offers card and purchase order and is for B2B stores only; Salesforce Payments runs on Stripe."
  - "Payments cannot be customised with a Commerce extension. Custom payment logic needs an Apex adapter or a custom checkout component."
  - "Credit limit and order block belong to the ERP. The PlaceOrder extension with its validate method is the place to ask the ERP before the order exists."
faq:
  - q: "Does a B2B store on Salesforce need a payment gateway?"
    a: "Not if all buyers order on account. The Purchase Order component is meant for B2B stores that accept purchase orders only and need no gateway. A gateway is only needed when some buyers pay by card."
  - q: "What happens to the purchase order number in Salesforce B2B Commerce?"
    a: "The buyer enters it at checkout. Salesforce does not process a payment for it; according to the developer guide the number is used by downstream systems for invoicing and payment processing, which for most manufacturers means the ERP."
  - q: "Can the store check a dealer's credit limit before the order is placed?"
    a: "Not out of the box. The PlaceOrder extension point runs cart validations when the buyer places the order, and you override its validate method with your own logic, for example a live call to the ERP that checks open credit and order blocks."
  - q: "Can I use any payment provider with B2B Commerce?"
    a: "Salesforce lists three routes: provider packages on AppExchange that support B2B stores, Salesforce Payments with Stripe, or a custom gateway. A custom server-side gateway requires an Apex adapter, because payments cannot be customised with extensions."
draft: false
---

A B2B store for dealers who buy on account needs a purchase order option first and a card option second, if at all. Salesforce B2B Commerce has a Purchase Order component that works without a payment gateway, a Dual Payment component for card and purchase order, and Salesforce Payments on Stripe, which can also show a purchase order option in B2B stores. A purchase order triggers no payment in Salesforce, invoicing stays in the ERP. What the store has to add is the check whether the dealer may order at all, meaning credit limit and order block. That answer has to come from the ERP before the order is placed.

## What does payment mean in a B2B store?

Most dealers of a manufacturer pay by invoice after delivery, on payment terms agreed in the dealer contract. The store does not collect money. It collects an order and a reference that the dealer's purchasing department will recognise on the invoice: the purchase order number, or PO number.

The Salesforce developer guide describes exactly this. A purchase order can act as a form of payment in a B2B store, but it is "not technically a payment". Purchase orders "do not trigger payment flows out of the box", and the PO number is used by downstream systems for invoicing and payment processing ([Salesforce Developers, payment component options](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-component-options.html)).

The same page contains the rule that shapes every checkout design: if there is neither a payment authorisation nor a purchase order for the cart, the order cannot be placed. So each buyer needs at least one of the two ways to finish.

Salesforce now also markets the product as "Agentforce Commerce for B2B". The checkout components are the same under both names.

## Which payment components does Salesforce B2B Commerce offer?

The developer guide lists these options for B2B stores, available in Enterprise, Unlimited and Developer Edition:

| Component | What it does | Needs |
|---|---|---|
| Purchase Order | For B2B stores that accept purchase orders only | No gateway |
| Payment | Card payment through a third-party provider | Server-side gateway |
| Dual Payment | Card and purchase order, for B2B stores only | Server-side gateway for the card |
| Salesforce Payments | Several payment methods, saved methods optional, B2B stores can show a PO option | Stripe merchant account |
| Express Checkout | Apple Pay, Google Pay, PayPal and Venmo | Salesforce Payments |
| Custom component | Your own client-side component that talks to the provider directly | Own development |

For the gateway, the [gateway options page](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-gateway-options.html) names three routes: a provider package from AppExchange, Salesforce Payments as the native Stripe integration, or a custom gateway. For AppExchange packages, Salesforce asks you to check that the package supports B2B stores. A custom server-side gateway requires an Apex adapter.

One limit matters for anyone planning custom logic. The extension framework that covers pricing, inventory, tax, shipping and order creation does not cover payments: "Currently, payments can't be customized with an extension" ([Salesforce Developers, extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html)). Special payment rules therefore end up in the Apex adapter or a custom component, and both are code your team has to own through every release.

In the flow-based checkout, buyers choose between purchase order and card on the order summary page. When they choose purchase order, they are asked for the PO number and the billing address ([Salesforce Developers, purchase order or credit card flows](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-checkout-choose-po-or-cc.html)).

## When do dealers need a card at all?

My view: for a manufacturer's spare parts store, the card is the exception. Dealers with a customer account in the ERP already have payment terms, and they would not change them for a webshop. I see three cases where a card makes sense:

- **New buyers** who do not have a customer account or credit check yet and want to order today.
- **One-off buyers**, such as small workshops that order a part twice a year.
- **Buyers without credit**, whose orders the finance department only accepts against immediate payment.

Each card payment brings work that the purchase order does not. Someone has to book the card payment in the ERP against the invoice, and someone has to handle refunds and chargebacks. Salesforce writes that Salesforce Payments and some AppExchange providers "may be interoperable" with Order Management; that is a hint to check, not a promise about your ERP.

So I recommend the Purchase Order component when the store is for known dealers only, and Dual Payment or Salesforce Payments with the PO option when a defined group of buyers should pay by card. Starting with a card because consumer webshops do it adds a gateway, fees and a reconciliation process for orders that would have come in on account anyway.

## How does the store check credit limit and order block?

Credit limits, open items and order blocks live in the ERP, in SAP for example in credit management. The store knows none of this. Without a check, a blocked dealer can place an order that the ERP will reject later, and inside sales has to call and explain.

The place for the check is the PlaceOrder service, extension point `Commerce_Domain_Checkout_PlaceOrder`. According to the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html), it runs cart validations when a buyer places an order, as part of the Place Order Action API. For your own logic you extend the base Apex class and override the `validate` method. Inside it, a live call asks the ERP two questions: is the account blocked, and does the order total fit the open credit? If not, the order is not created and the buyer sees a message.

Three decisions belong in the specification:

1. **What the buyer sees.** "Please contact your sales representative" is enough; the credit limit itself usually is not something a dealer's buyer should read in a webshop.
2. **What happens on timeout.** If the ERP does not answer in time, the store either blocks the order or accepts it. If your ERP checks credit again when it creates the sales order, accepting is the friendlier choice.
3. **Card orders.** A card payment that is authorised does not need the credit check. The validate logic has to know which way the buyer pays.

I would not copy credit limits into Salesforce overnight to save the live call. A copy from last night is wrong exactly when it matters, for the dealer who placed three large orders this morning.

## A typical scenario, as an assumption

A manufacturer of pumps sells spare parts through 300 dealers in Germany, Austria and Switzerland. All dealers have a customer account in SAP and pay within 30 days. On top, around 50 small service workshops a year order once or twice and have no customer account.

For this setup I would choose Salesforce Payments or Dual Payment, with the purchase order option for the dealer buyer group and card payment for the workshops. Every purchase order passes the validate check against SAP. Card orders skip the credit check, but their payment has to reach accounting in SAP, which adds one interface. Before deciding, I would ask finance which dealers reject invoices without their own PO number; for those, the validate method can also refuse an empty PO field.

If the workshops turn out to be fewer than expected, the simpler alternative is a store with the Purchase Order component only and a sales process that sets up a customer account before the first order.

## What happens after the order is placed?

An order from the store creates an order summary in Salesforce. Order summaries created by B2B Commerce have the lifecycle type unmanaged, and updates from the external system "must be reflected in Salesforce" ([Salesforce Developers, managed and unmanaged order summaries](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html)). The order with PO number, billing address and payment information goes to the ERP, which creates the sales order and later the invoice.

Who owns the order from that point on is covered in [B2B store orders to the ERP](../b2b-store-orders-to-erp/), and which data flows between store and SAP in [B2B Commerce and SAP: which data flows where?](../b2b-commerce-sap-data-flows/). How dealers get to the checkout faster, with past orders and templates, is the topic of [reorders in B2B Commerce](../b2b-commerce-reorder-order-templates/).

## Where should you start?

Start with finance, before the store design. Ask how each group of buyers pays today, which system holds credit limits and order blocks, and how fast that system can answer a live call. Then choose the component, and write down the validate logic with its timeout behaviour. The chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) puts the checkout next to price and reorder decisions, and the interface work behind the credit check is part of [Salesforce integration](../../services/salesforce-integration/).

Most dealers should finish the checkout with a PO number and a credit check from the ERP, and only a defined group should need a card. If you are designing that checkout, [send me a message](#contact).
