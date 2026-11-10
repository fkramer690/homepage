---
title: "B2B checkout: purchase order, card or invoice?"
description: "Which payment options a Salesforce B2B store needs when dealers buy on account: purchase order, card, Salesforce Payments and an ERP credit check."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-checkout-purchase-order-card-invoice
translationKey: commerce-checkout-purchase-order
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, checkout, purchase order, payments, credit limit, erp]
takeaways:
  - "In Salesforce B2B Commerce a purchase order counts as a form of payment but triggers no payment flow; the PO number travels to the ERP for invoicing."
  - "An order can only be placed if the cart has either a payment authorisation or a purchase order. Every checkout has to end with one of those two outcomes."
  - "The Purchase Order component needs no payment gateway. Dual Payment offers card and purchase order; Salesforce Payments runs on Stripe or Adyen."
  - "Payments cannot be customized with a Commerce extension. Custom payment logic needs an Apex adapter or a custom checkout component."
  - "Credit limit and order block belong in the ERP. The validate method of the PlaceOrder extension asks the ERP before the order exists."
faq:
  - q: "Does a B2B store on Salesforce need a payment gateway?"
    a: "Not if all buyers order on account. The Purchase Order component is meant for B2B stores that accept purchase orders only and do not need a gateway. A gateway is only needed when some buyers pay by card."
  - q: "What happens to the purchase order number in Salesforce B2B Commerce?"
    a: "The buyer enters it at checkout. Salesforce does not process a payment for it; according to the developer guide the number is used by downstream systems for invoicing and payment processing, which for most manufacturers means the ERP."
  - q: "Can the store check a dealer's credit limit before the order is placed?"
    a: "Not out of the box. The PlaceOrder extension point runs cart validations when the buyer places the order, and you can override its validate method with your own logic, for example a live call to the ERP that checks available credit and order blocks."
  - q: "Can I use any payment provider with B2B Commerce?"
    a: "Salesforce lists three routes: provider packages on AppExchange that support B2B stores, Salesforce Payments with Stripe or Adyen, or a custom gateway. A custom server-side gateway requires an Apex adapter, because payments cannot be customized with extensions."
draft: false
---

A B2B store for dealers who buy on account needs a purchase order option first and a card option second, if at all. Salesforce B2B Commerce has a Purchase Order component that works without a payment gateway, a Dual Payment component for card and purchase order, and Salesforce Payments with Stripe or Adyen, which can also show a purchase order option in B2B stores. A purchase order triggers no payment in Salesforce; invoicing stays in the ERP. The store has to check whether the dealer may order at all: credit limit and order block. The ERP has to provide that answer before the order is placed.

## What does payment mean in a B2B store?

Most of a manufacturer's dealers pay by invoice after delivery, on payment terms agreed in the dealer contract. The store does not collect money. It collects an order and a reference that the dealer's purchasing department will recognize on the invoice: the purchase order number, or PO number.

The Salesforce developer guide describes exactly this. A purchase order can act as a form of payment in a B2B store, but it is "not technically a payment". Purchase orders "do not trigger payment flows out of the box", and the PO number is used by downstream systems for invoicing and payment processing ([Salesforce Developers, payment component options](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-component-options.html)).

The same page contains the rule that shapes every checkout design: if there is neither a payment authorisation nor a purchase order for the cart, the order cannot be placed. So each buyer needs at least one of these two options to complete checkout.

Salesforce now also markets the product as "Agentforce Commerce for B2B". The checkout components are the same under both names.

## The payment components of Salesforce B2B Commerce

The developer guide lists these options for B2B stores, available in Enterprise, Unlimited and Developer Edition:

| Component | What it does | Needs |
|---|---|---|
| Purchase Order | For B2B stores that accept purchase orders only | No gateway |
| Payment | Card payment through a third-party provider | Server-side gateway |
| Dual Payment | Card and purchase order, for B2B stores only | Server-side gateway for the card |
| Salesforce Payments | Several payment methods, saved methods optional, B2B stores can show a PO option | Salesforce Payments license and a merchant account set up in the Commerce app |
| Express Checkout | Apple Pay, Google Pay, PayPal and Venmo | Salesforce Payments |
| Custom component | Your own client-side component that talks to the provider directly | Own development |

For the gateway, the [gateway options page](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-gateway-options.html) names three routes: a provider package from AppExchange, Salesforce Payments as the native Stripe integration, or a custom gateway. Salesforce has since added a [native integration with Adyen](https://www.salesforce.com/blog/salesforce-native-integration-adyen/) to Salesforce Payments. For AppExchange packages, Salesforce asks you to check that the package supports B2B stores. A custom server-side gateway requires an Apex adapter.

```vertiefung For developers
title: Where does custom payment logic go?
The extension framework that covers pricing, inventory, tax, shipping and order creation does not cover payments: "Currently, payments can't be customized with an extension" ([Salesforce Developers, extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html)). Special payment rules therefore end up in the Apex adapter or a custom component, and in both cases your team has to own that code through every release.
```

In the flow-based checkout, buyers choose between purchase order and card on the order summary page. When they choose purchase order, they are asked for the PO number and the billing address ([Salesforce Developers, purchase order or credit card flows](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-checkout-choose-po-or-cc.html)).

## When do dealers need a card at all?

My view: for a manufacturer's spare parts store, card payment is the exception. Dealers with a customer account in the ERP already have payment terms, and they would not change them for a webshop. I see three cases where a card makes sense:

- **New buyers** who do not have a customer account or credit check yet and want to order today.
- **One-off buyers**, such as small workshops that order a part twice a year.
- **Buyers without credit**, whose orders the finance department only accepts against immediate payment.

Each card payment creates work that a purchase order does not. Someone has to book the card payment in the ERP against the invoice, and someone has to handle refunds and chargebacks. Salesforce writes that Salesforce Payments and some AppExchange providers "may be interoperable" with Order Management; that is a prompt to check, not a promise about your ERP.

So I recommend the Purchase Order component when the store is for known dealers only, and Dual Payment or Salesforce Payments with the PO option when a defined group of buyers should pay by card. Starting with card payments because consumer webshops do it adds a gateway, fees and a reconciliation process for orders that would have been placed on account anyway.

## The PlaceOrder extension checks credit limit and order block

Credit limits, open items and order blocks live in the ERP, for example in credit management in SAP. The store knows none of this. Without a check, a blocked dealer can place an order that the ERP will reject later, and the inside sales team has to call and explain.

The check belongs in the PlaceOrder service, extension point `Commerce_Domain_Checkout_PlaceOrder`. According to the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html), it runs cart validations when a buyer places an order, as part of the Place Order Action API. For your own logic you extend the base Apex class and override the `validate` method. According to the [Apex reference](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/CheckoutPlaceOrder.html), this works only with the enhanced Place Order Actions API, allows one external callout per transaction and no DML or asynchronous Apex. If credit and block status sit behind two ERP services, a middleware endpoint has to combine them into one answer. Inside it, a live call asks the ERP two questions: is the account blocked, and does the order total fit the open credit? If not, the order is not created and the buyer sees a message.

```ablauf
sf: Checkout, Validate check, Order summary
erp: Credit check, Sales order, Invoice
Checkout --PO number--> Validate check
Validate check --Live call--> Credit check
Credit check ..Answer..> Validate check
Validate check --> Order summary
Order summary --Handover--> Sales order
Sales order --> Invoice
```

Three decisions belong in the specification:

1. **What the buyer sees.** "Please contact your sales representative" is enough; the credit limit itself usually is not something a buyer at a dealer should read in a webshop.
2. **What happens on a timeout.** If the ERP does not answer in time, the store either blocks the order or accepts it. If your ERP checks credit again when it creates the sales order, accepting is the friendlier choice.
3. **Card orders.** A card payment that is authorised does not need the credit limit check, but an order block can still apply. The validate logic has to know which way the buyer pays.

I would not copy credit limits into Salesforce in a nightly batch to save the live call. A copy from last night is wrong exactly when it matters, for the dealer who placed three large orders this morning.

## Worked example: pump manufacturer with 300 dealers

A manufacturer of pumps sells spare parts through 300 dealers in Germany, Austria and Switzerland. All dealers have a customer account in SAP and pay within 30 days. In addition, around 50 small service workshops a year order once or twice and have no customer account.

For this setup I would choose Salesforce Payments or Dual Payment, with the purchase order option for the dealer buyer group and card payment for the workshops. Every order with a purchase order goes through the validate check against SAP. Card orders skip the credit limit check but not the block check, and their payment has to be posted to accounting in SAP, which adds one interface. Before deciding, I would ask finance which dealers reject invoices without their own PO number; for those dealers, the validate method can also reject orders with an empty PO field.

If the workshops turn out to be fewer than expected, the simpler alternative is a store with the Purchase Order component only and a sales process that sets up a customer account before the first order.

## What happens after the order is placed?

When an order is placed in the store, Salesforce creates an order summary. Order summaries created by B2B Commerce itself have the lifecycle type unmanaged; those created by Salesforce Order Management are managed. For unmanaged order summaries, updates from the external system "must be reflected in Salesforce" ([Salesforce Developers, managed and unmanaged order summaries](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html)). The order with the PO number, billing address and payment information goes to the ERP, which creates the sales order and later the invoice.

Who owns the order from that point on is covered in [B2B store orders to the ERP](../b2b-store-orders-to-erp/), and which data flows between store and SAP in [B2B Commerce and SAP: which data flows where?](../b2b-commerce-sap-data-flows/). How dealers get to the checkout faster, with past orders and templates, is the topic of [reorders in B2B Commerce](../b2b-commerce-reorder-order-templates/).

## Ask finance how dealers pay

Start with finance before you design the store. Ask how each group of buyers pays today, which system holds credit limits and order blocks, and how fast that system can answer a live call. Then choose the component, and write down the validate logic with its timeout behavior. The chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) discusses checkout alongside price and reorder decisions, and the interface work behind the credit check is part of [Salesforce integration](../../services/salesforce-integration/).
