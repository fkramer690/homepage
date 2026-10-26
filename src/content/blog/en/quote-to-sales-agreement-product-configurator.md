---
title: "From Quote to Sales Agreement: the Configurator"
description: "How manufacturers carry configured products from the quote into a Salesforce sales agreement, what the configurator has to settle and where approvals belong."
pubDate: 2026-10-26
lang: en
slug: quote-to-sales-agreement-product-configurator
translationKey: manufacturing-cloud-quote-to-agreement
topic: data
tags: [Manufacturing Cloud, Sales Agreements, CPQ, Product Configurator, Manufacturing]
takeaways:
  - "For manufacturers with technically defined products, the product configurator decides what goes into the quote and what is later planned and measured in the sales agreement."
  - "What gets configured are properties that matter to the end customer and affect the manufacturer's price or cost, such as physical and chemical criteria, raw materials or certificates."
  - "A sales agreement plans quantities per product. Every configured variant that should be planned and measured therefore needs its own product identity that the ERP knows too."
  - "Salesforce can create a sales agreement from a quote, an opportunity or a custom object through the Connect API. A mapping defines which fields carry over."
  - "Salesforce CPQ is no longer sold to new customers. Anyone choosing a quoting system today compares Revenue Cloud Advanced, partner products and a custom approach."
faq:
  - q: "Can you create a sales agreement from a quote?"
    a: "Yes. The Manufacturing Cloud Connect API creates a sales agreement from a quote, an opportunity or a custom object. A mapping of type ConvertToSalesAgreement defines which fields carry over."
  - q: "Is Salesforce CPQ still sold?"
    a: "Not to new customers. According to Salesforce, CPQ is end of sale but not end of life: existing customers can still buy users, renew and get support. New features go into Revenue Cloud Advanced."
  - q: "What does a product configurator configure at a manufacturer?"
    a: "Everything that matters to the end customer and affects the manufacturer's price or cost. In my project that meant physical and chemical criteria such as grind size, the raw materials and certificates such as halal."
  - q: "Does every configuration need its own product?"
    a: "Every variant that is planned and measured in a sales agreement needs its own product identity, because the agreement holds quantities per product and actuals from the ERP have to be matched to a product."
draft: false
---

For a manufacturer with technically defined products, the product configurator decides what goes into the quote and what is later planned and measured in the sales agreement. In a global Manufacturing Cloud rollout we took a custom CPQ approach for this and built our own product configurator. The configured products were carried into the quote and then into the sales agreement. For that to hold up, three things have to be settled before the first quote: when a configuration becomes a product, which data moves from the quote to the agreement, and who approves the price.

## What actually gets configured at a manufacturer?

When people hear configurator, many think of machines: motor, controls, accessories, a bill of materials built from options. In the process industry it looks different. In my project, properties of the product itself were configured:

- **Physical and chemical criteria**, for example the grind size.
- **Raw materials** the product is made from.
- **Certificates**, for example halal.

The rule behind it was simple: configure everything that matters to the end customer and affects price or cost for the manufacturer. A finer grind costs more machine time, a certified raw material costs more to buy. The configurator has to know that cost effect, or sales quotes a price that does not cover the cost.

This leads to a requirement that often surfaces late: the rules on which combination is feasible and what it costs usually live in production, quality and procurement, rarely in sales. The configurator is only as good as the upkeep of those rules, and that needs owners outside Salesforce.

## Custom approach or standard product?

For quoting there are three routes today: Revenue Cloud Advanced from Salesforce, a partner product, or a custom approach on the platform. Salesforce CPQ is no longer an option for new customers. According to [Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/), CPQ is no longer sold to new customers, while existing customers can still buy users, renew and get support. New features go into Revenue Cloud Advanced, and there is no forced migration.

In the project we took a custom CPQ approach. Whether that would be the right choice again today depends on the same questions I ask in every make-or-buy decision:

- **How well does the standard model fit?** Off-the-shelf configurators are often built for options and bills of materials. Product properties with a cost effect, as described above, do not always fit that model.
- **Who maintains the rules?** A custom configurator is your own code, which has to be tested with every release and maintained by someone.
- **What does the licence cost over several years?** A standard product costs per user, a custom approach costs development and maintenance.

How I calculate such cases is described under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/). Whether Manufacturing Cloud itself pays off is covered in [part 1 of this series](../salesforce-manufacturing-cloud-is-it-worth-it/).

## When does a configuration become a product?

A sales agreement plans quantities per product. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/sales-agreements-forecasting-manufacturing-cloud/create-sales-agreement), it belongs to an account and a price book, and for each product you enter a total quantity that Salesforce spreads across the periods. The actuals that later come from the ERP are matched to a product as well.

So every configured variant that should be planned and measured in a sales agreement needs its own product identity. In Salesforce that is a product record, in the ERP usually a material number. Without a link between the two, actuals land on the wrong product or never reach the agreement.

For the design, that means deciding early:

1. **Which properties create a new product?** If a different grind size changes the material number in the ERP, it is a separate product. If it only changes the price, an attribute on the quote may be enough.
2. **Who creates the product?** When a new variant appears in a quote, it has to be created in the ERP before it can be ordered. That is a process with an approval, usually outside sales.
3. **How does the catalogue grow?** If almost every configuration is unique, the product catalogue grows fast. A rule for when a variant is reused helps.

How actuals then get from the ERP into the sales agreement is covered in [part 3: sales agreements, spotting customers behind on volume](../sales-agreements-volume-shortfall-erp/).

## How does the quote get into the sales agreement?

Salesforce provides a standard route. The [Manufacturing Cloud Connect API](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/connect_resources_sales_agreement.htm) creates a sales agreement from a quote, an opportunity or a custom object. A mapping of type ConvertToSalesAgreement defines which fields carry over. Fields the mapping does not cover can be filled with default values in the call. That also works with a custom CPQ approach, because the quote may be a custom object.

In terms of content, the mapping has to cover these points:

| What | In the quote | In the sales agreement |
|---|---|---|
| Customer | Account on the quote | Account on the agreement, at the right level of the account hierarchy |
| Product | Configured variant | Product with its own identity |
| Price | Price from the configuration, with discount if any | Sales price and discount per product |
| Quantity | Total or call-off quantity | Total quantity, spread across periods |
| Term | Quote validity, contract term | Start date, frequency and number of periods |

The term row is easy to miss. According to Trailhead, Salesforce calculates the end date from start date, frequency and number of periods. If the quote only holds a date range, someone has to decide how it turns into months or quarters.

According to Trailhead, a sales agreement always starts as a draft, gets approved and activates automatically on its start date. Which raises the next question.

## Where does price approval belong?

In one place. A quote with configured products often needs an approval, because the price depends on the configuration and therefore on cost. The sales agreement has its own approval step, which an admin can also switch off, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better).

I recommend approving the price once, on the quote, where the configuration and its cost are visible. If the agreement is created directly from the approved quote, its own approval can be lighter or dropped. Two approvals for the same price cost time and raise the question of which one counts when they differ.

When something changes later, such as a new variant or a new price during the term, the route repeats: configuration, quote, approval, agreement update. In my project, customers could also request new products and prices themselves through the customer portal. How the portal fits in is covered in a later part of this series.

## Where should you start?

Before the configurator is built or a product is chosen, settle four points:

1. **What gets configured?** A list of properties with a cost effect, agreed with production, quality and procurement.
2. **When does a product come into being?** The rule for which property creates a new material number in the ERP.
3. **Which fields move into the agreement?** The mapping from the table above, including term and account level.
4. **Where is the price approved?** One place, documented in the decision log of the [Salesforce architecture](../../services/salesforce-architecture/).

A sales agreement is only as clean as the products the configurator feeds into it. If you are weighing a custom configurator against a standard product, [send me a message](#contact).
