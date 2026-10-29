---
title: "B2B webshop business case for manufacturers"
description: "How a manufacturer calculates whether a B2B shop on Salesforce pays off: GMV fee, buyer licences, inside sales time per order line and a three-year model."
pubDate: 2026-10-28
lang: en
slug: b2b-webshop-business-case-manufacturers
translationKey: commerce-business-case
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, business case, spare parts, inside sales, GMV, make-or-buy]
takeaways:
  - "A business case for a B2B shop on Salesforce compares the GMV fee, buyer licences, implementation and run costs with saved inside sales time, fewer order errors and additional revenue."
  - "The GMV fee grows with the value of each order line, the time saving with the number of lines. With high-value parts, the fee can eat most of the saving per line."
  - "In a typical scenario with 40,000 order lines, 4 minutes each and a GMV fee assumed at 2 percent, time and error savings cover only about 37 percent of three-year costs."
  - "A store usually pays off through additional revenue: after-hours orders, dealers who used to order elsewhere, fewer lost orders. That number needs the most scrutiny."
  - "Vendor studies such as the Forrester TEI study commissioned by Salesforce are based on a composite company. They show which levers exist, not what your store will earn."
faq:
  - q: "How do I calculate the business case for a B2B webshop?"
    a: "Model three years. Costs are the GMV fee, buyer licences, implementation, ERP integration and run costs. Benefits are inside sales time per order line, avoided order errors, fewer status calls and additional revenue. Let the digital share rise year by year, because the fee rises with it."
  - q: "How much inside sales time does a B2B shop save?"
    a: "That depends on your own process. Measure how long typing in one order line takes today, including checks and queries, and multiply by the lines you expect in the store. In my assumed scenario, 4 minutes at 55 euros per hour make about 3.70 euros per line."
  - q: "Is the Forrester study on Salesforce B2B Commerce reliable?"
    a: "It is a Total Economic Impact study by Forrester Consulting, commissioned by Salesforce, from April 2024. It interviewed four customer representatives and combined them into one composite manufacturer with $1 billion in revenue. Forrester itself advises readers to use their own estimates."
  - q: "Should dealers get member or login licences in a B2B store?"
    a: "On the Experience Cloud for Manufacturing price list, Customer Community Plus costs 35 euros per member or 15 euros per login per month. A dealer who logs in on fewer than three days a month is cheaper on a login licence, because several logins on one day count as one."
draft: false
---

A manufacturer calculates a B2B shop on Salesforce over three years: GMV fee, buyer licences, implementation, ERP integration and run costs on one side, saved inside sales time, fewer order errors and additional revenue on the other. The important part is that the GMV fee grows with the store's revenue, so the costs rise exactly when the store succeeds. In a typical scenario I calculate below, time and error savings alone cover only about a third of the costs. A store usually pays off through additional revenue and through inside sales capacity you actually redeploy. Both need honest numbers, not vendor averages.

## What belongs on the cost side?

Five items, and most estimates miss at least two:

1. **GMV fee.** Salesforce charges a percentage of gross merchandise value, the store revenue minus tax and shipping. The [pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) shows "Contact for Pricing" for Growth and Advanced and publishes no percentage. Details are in [B2B Commerce pricing: what the GMV model costs](../b2b-commerce-pricing-gmv-model/).
2. **Buyer licences.** Buyers need Customer Community Plus. On the [Experience Cloud for Manufacturing price list](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) it costs 35 euros per member or 15 euros per login per month, billed annually.
3. **Implementation.** Store setup, catalogue, buyer groups, entitlements, price books, checkout, tests.
4. **ERP integration.** Price and stock calls, order transfer, status and invoices back. In manufacturing this is often larger than the store itself.
5. **Run costs.** Catalogue maintenance, support for dealers, three Salesforce releases a year with regression tests.

## What belongs on the benefit side?

Four items, in the order in which I trust them:

1. **Inside sales time per order line.** Measure how long typing in one line takes today, including the query when a part number is wrong. This is the most reliable number, because you can stop the clock.
2. **Order errors.** Wrong part, wrong quantity, wrong address. Each one costs a return, a credit note and a second shipment.
3. **Fewer status calls.** When dealers see order status and history in the store, some calls disappear.
4. **Additional revenue.** Orders placed at night or at weekends, dealers who used to buy from a third party, orders that were never placed because the email got lost. This is the largest and least certain item.

One rule for item 1: saved time is only money when you use it. If inside sales keeps the same headcount and does the same work, the saving stays on paper. Decide in advance what happens with the freed capacity, for example active calls to dealers who order less than last year.

## A typical scenario, as an assumption

A typical scenario, as an assumption: a manufacturer of conveyor systems sells spare parts through 250 dealers. The numbers:

- 40,000 spare parts order lines a year, average value 150 euros per line, so 6 million euros net.
- Inside sales needs 4 minutes per line at a full cost of 55 euros per hour: about 3.67 euros per line.
- 2 percent of manually entered lines contain an error that costs 60 euros to fix: 1.20 euros per line.
- The GMV fee is assumed at 2 percent.
- One member licence per active dealer at 35 euros a month.
- Implementation including ERP integration 250,000 euros, run costs 40,000 euros a year.

```hinweis offen
The GMV rate of 2 percent is a figure reported by integrators, not confirmed by Salesforce. Replace it with the rate from your quote.
```

With a digital share rising from 25 to 70 percent over three years, the result looks like this:

| Year | Store share | Lines in store | Time and error savings | GMV fee | Buyer licences | Run costs | Costs |
|---|---|---|---|---|---|---|---|
| 1 | 25 % | 10,000 | 48,700 € | 30,000 € | 42,000 € (100 dealers) | 40,000 € | 112,000 € |
| 2 | 50 % | 20,000 | 97,300 € | 60,000 € | 73,500 € (175 dealers) | 40,000 € | 173,500 € |
| 3 | 70 % | 28,000 | 136,300 € | 84,000 € | 105,000 € (250 dealers) | 40,000 € | 229,000 € |

Over three years, savings are about 282,000 euros. Costs are 514,500 euros plus 250,000 euros implementation, so 764,500 euros. The savings cover about 37 percent. To close the gap of roughly 482,000 euros, the store has to bring about 160,000 euros of additional contribution margin a year. At a contribution margin of 30 percent after the GMV fee, that is about 536,000 euros more parts revenue a year, almost 9 percent on top of 6 million.

That may well be realistic. But it is the number the decision rests on, and it should come from sales, with a reason per dealer group, not from a slide.

## Why does the GMV fee grow with success?

Look at the scenario per order line. The store saves 4.87 euros per line in time and errors. The GMV fee at 2 percent of 150 euros is 3 euros per line. In year three, buyer licences add another 3.75 euros per line. Per line, the store costs more than it saves in time.

Two effects are behind this. First, the fee scales with the value of a line, the saving with the number of lines. A line of 1,500 euros costs ten times as much fee as a line of 150 euros but takes the same 4 minutes to type in. Stores that sell many cheap consumables do better on this side than stores selling expensive assemblies. Second, the licence per dealer is fixed while small dealers order few lines. A dealer who logs in on two days a month is cheaper on a login licence at 15 euros, because according to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) several logins on one day count as one. Licence type per dealer group is a real lever in the model.

That is why I always model three years with a rising share. A one-year view hides that the fee rises while implementation is already paid.

## What about the Forrester study?

Salesforce promotes a [Total Economic Impact study by Forrester Consulting](https://tei.forrester.com/go/salesforce/b2bcommerce2024), commissioned by Salesforce and published in April 2024. Its headline figures:

```kennzahlen
289 % | three-year ROI reported by the study
under 6 months | payback reported by the study
4 | customer representatives interviewed as its basis
source: Forrester Consulting, Total Economic Impact study of Salesforce B2B Commerce, commissioned by Salesforce, April 2024
```

The four interviews are combined into one composite manufacturer with 1 billion dollars in revenue. Forrester itself advises readers to use their own estimates.

I read such studies as a list of levers: which benefits did those customers see, which costs did they name. The numbers do not transfer to a manufacturer with 250 dealers and 6 million euros in spare parts revenue. Your own clock in inside sales is worth more than any composite company.

## Where should you start?

Collect four numbers from the last twelve months: order lines by channel, average value per line, minutes per manually entered line and the cost of order errors. Then build the three-year model with the GMV rate as a variable at 1, 2 and 3 percent. Whether a store or a portal fits at all is covered in [B2B Commerce or dealer portal: when a shop pays off](../b2b-commerce-or-dealer-portal/), and the numbers to measure after launch are in [B2B shop KPIs: what to measure after go-live](../b2b-shop-kpis-after-go-live/). The overall decision is in the [masterclass chapter on whether B2B Commerce is worth it](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/), and an independent check of the numbers is part of my work on [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

A B2B shop pays off when additional revenue and redeployed capacity outweigh a fee that grows with every order.
