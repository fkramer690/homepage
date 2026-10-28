---
title: "Revenue Cloud catalog, configurator and pricing"
description: "How the Revenue Cloud product catalog, constraint configurator and Salesforce Pricing work together for manufacturers, and which prices should come from SAP."
lang: en
slug: product-catalog-configurator-pricing
course: revenue-cloud
translationKey: revenue-02
chapter: 2
short: "Catalog, configurator, pricing"
summary: "How the product catalog, constraint configurator and Salesforce Pricing work together, and which prices should come from SAP."
takeaways:
  - "In Revenue Cloud the catalog comes first: product classifications with attributes describe a machine family, so variants stay attribute values instead of thousands of product records."
  - "The configurator has two rule engines: configuration rules for simple if-then logic and the constraint rules engine for interdependent attributes, modelled in CML."
  - "Salesforce Pricing calculates with pricing procedures that read decision tables. After every change to pricing data the decision tables need a refresh, or quotes use old values."
  - "Every price type needs one master. Conditions that also apply to EDI, phone or shop orders without Salesforce should stay in SAP and be requested through an API."
  - "Catalog records, constraint models and pricing procedures change what sales can quote. Each needs an owner at the manufacturer, versions and regression cases."
articles: [revenue-cloud-product-catalog-variants, revenue-cloud-configurator-constraint-rules, revenue-cloud-pricing-procedures, customer-prices-sap-or-salesforce-pricing, manufacturing-cloud-quote-to-agreement]
faq:
  - q: "What replaces CPQ product rules and price rules in Revenue Cloud?"
    a: "Product rules are rebuilt as configuration rules or constraint models in the Product Configurator. Price rules and the quote calculator plugin are rebuilt as pricing procedures in Salesforce Pricing. Nothing is converted automatically, because the data model is different."
  - q: "Do I have to copy the SAP material master into Revenue Cloud?"
    a: "No. Salesforce needs the sellable products with material number, description and list price. Bills of materials, plant data and purchasing data stay in SAP, because the quote does not use them."
  - q: "When does a machine variant need its own product record?"
    a: "When the ERP has its own material number for it, when it is planned in a sales agreement, or when it is stocked and serviced separately. Everything else stays an attribute value on the base machine."
  - q: "Can a portal or an agent get a price from Revenue Cloud without a quote?"
    a: "Yes. The Salesforce Pricing Business APIs include a headless pricing resource that builds a context and prices it in one call. Portals, stores and agents should call it instead of calculating prices themselves."
  - q: "Who should own pricing procedures after go-live?"
    a: "A pricing admin in sales operations, with controlling signing off changes. The implementation partner builds the procedures but does not decide the order of discounts or the price logic."
draft: false
---

In Revenue Cloud, three parts decide what sales can quote. The product catalog describes what is sold, with product classifications and attributes instead of one record per variant. The Product Configurator decides which combinations are valid, with configuration rules for simple logic and the constraint rules engine for interdependent attributes. Salesforce Pricing calculates the price with pricing procedures, decision tables and context definitions. For a manufacturer with SAP, the key decision sits between these parts: which prices and rules stay in SAP and which move to Salesforce. My rule is one master per price type and per rule set, and one owner at the manufacturer for each.

## How do catalog, configurator and pricing work together?

The three parts build on each other. The catalog holds products, attributes and bundle structure. The configurator works on that structure and checks which options and attribute values fit together. Salesforce Pricing then takes the configured line, reads the price book and calculates the net price step by step. A badly modelled catalog makes both the rules and the pricing harder, so the catalog design comes first.

All three run on standard objects of the core platform, not in a managed package. A note on names: salesforce.com says Revenue Cloud, Trailhead says Agentforce Revenue Management, and the Developer Guide for Winter '27 is titled Revenue Management Developer Guide. The [overview of product names](../../../blog/revenue-cloud-product-names-rlm-rca/) sorts this out.

If you come from Salesforce CPQ, the mapping is simple to state and laborious to do. Product rules become configuration rules or constraint models. Price rules and the quote calculator plugin become pricing procedures. Nothing is converted automatically; the other differences are in [Salesforce CPQ vs Revenue Cloud](../../../blog/salesforce-cpq-vs-revenue-cloud-differences/). Whether Revenue Cloud fits your business at all is covered in [chapter 1](../revenue-cloud-overview/).

## The product catalog: classifications instead of thousands of products

Product Catalog Management holds the products and their structure. According to the [Trailhead module on product catalog management](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management), the building blocks are:

- **Catalogs**, for example one for products and one for services.
- **Categories and subcategories** for browsing; a product can sit in several.
- **Attributes**, defined once and shared by many products.
- **Product classifications**, templates with a set of attributes. A product created from a classification inherits them and can override single ones.
- **Simple products and bundles**. Simple products stand alone, bundles have a hierarchy of items.

For a machine builder this means one classification per machine family, with the attributes sales has to ask about, such as working width, drive, control and voltage. The base machines are created from it. The decision that shapes the whole catalog is when a variant becomes its own product. I use three tests: the ERP has its own material number for it, it is planned in a sales agreement, or it is stocked and serviced separately. Everything else stays an attribute value. Accessories with their own material number become components of a configurable bundle. With that rule, a catalog for 40 base machines stays at a few hundred records. The details, including a worked example, are in [Revenue Cloud product catalog: modelling machine variants](../../../blog/revenue-cloud-product-catalog-variants/).

### Which product data comes from the ERP?

I would not copy the material master. Salesforce needs the sellable products, not plant data, purchasing data or bills of materials.

| Data | Master |
|---|---|
| Material number, product name, list price | ERP |
| Categories, classifications, selling attributes | Salesforce |
| Bundle structure and cardinality | Salesforce |
| Bill of materials | ERP or PLM |

Attribute values need a mapping to the SAP characteristic values. If "control" has the value "S2" in Salesforce, SAP must know the same value, or the order fails at the hand-over. Spare parts and services go into catalogs of their own, with their own owners.

## The configurator: which rule engine for which product?

The Product Configurator is the screen in which sales picks bundle options and sets attribute values; the configured product then goes to the quote or order. Trailhead names [three approaches that grow with product complexity](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/get-started-with-product-configurator): basic validation rules, selection rules and constraint-based modelling.

Behind them are two engines. Configuration rules work with explicit if-then logic and suit simple to moderate products. The constraint rules engine, which Salesforce calls its solution "for complicated, high-volume configurations", uses a constraint-based model, evaluates all possible combinations and [filters out invalid ones in real time](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/explore-product-configurator-with-constraint-rules-engine). A pump with five options and three exclusions needs no constraint model. A machine where frame size, drive power, voltage and safety category depend on each other does.

Constraint models are written in CML, the Constraint Modeling Language. Visual Builder is a no-code interface that generates CML, the CML Editor is a script editor for complex logic. In my view CML is code, even when part of it is clicked together, and it needs someone who thinks in types, value ranges and cardinalities. In most manufacturing companies that is neither the admin nor the application engineer who knows the rules, so plan for both. Trailhead also documents the other route: a third-party configurator connects through APIs, while Salesforce keeps pricing, product data and quoting. When the constraint engine pays off and when it does not is the subject of [Revenue Cloud configurator: when constraint rules pay off](../../../blog/revenue-cloud-configurator-constraint-rules/).

### Where do your configuration rules live today?

That question decides the route more than any feature list:

- **Spreadsheets and the heads of application engineers.** The best case for Revenue Cloud. The rules have to be written down anyway, and CML gives them a home with tests.
- **SAP variant configuration.** If SAP checks every order again, a rebuild in CML creates a second rule set that drifts away from the first. Either SAP stays the master and Salesforce takes the result, or the master moves to Salesforce and SAP accepts the configuration.
- **PLM or an engineering configurator** that produces drawings or bills of materials. Then that tool stays, and Salesforce receives the configured product with its price-relevant attributes.

Whichever route you take, name the person who maintains the rules after go-live before the build starts.

## How does Salesforce Pricing calculate a price?

Salesforce Pricing has four base parts, per the [Trailhead unit on pricing](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/configure-pricing-for-products). Price books store the prices. Decision tables map to the tables that hold the pricing data, because pricing procedures do not read the objects directly. A context definition, by default SalesTransactionContext, carries quote, order or asset data into the calculation and the result back. A pricing procedure defines the pricing elements and runs them in sequence, each taking the output of the previous one.

A typical sequence for a manufacturer is list price (or a contract price), attribute discount, volume discount, manual discount and an aggregate per product family. The order is business logic: whether the manual discount comes before or after the volume discount changes the net price. Sales management and controlling decide it, not the person who builds the procedure. The result is a price waterfall that shows every step from list price to net price, in the simulation and on the quote line.

One detail catches most teams in the first weeks. After a price book entry or a volume tier changes, the quote still calculates with the old value until Sync Pricing Data has refreshed the decision tables. If SAP loads list prices every night, the sync belongs in the same job. The [Salesforce Pricing Business APIs](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/pricing_business_apis.htm) also offer headless pricing, which builds a context and prices it in one call, so a portal, a store or an agent can ask for the same price without creating a quote. How the B2B store does that is in the B2B Commerce chapter on [prices, cart and checkout](../../b2b-commerce/prices-cart-checkout/). The elements, the sync and the testing are explained in [Salesforce Pricing: how Revenue Cloud calculates prices](../../../blog/revenue-cloud-pricing-procedures-explained/).

## Which prices should come from SAP?

SAP calculates customer prices with the condition technique: price lists, customer prices, discounts per material group, surcharges and scales, each with a validity period. Revenue Cloud can calculate the same prices. Trouble starts when both do it for the same price, because the quote and the SAP order confirmation then differ sooner or later, and inside sales sorts it out order by order.

There are three routes, and you can choose per price type:

| Route | Master | Fits when |
|---|---|---|
| A: SAP calculates, Salesforce asks through an API | SAP | Conditions also apply to orders without Salesforce |
| B: conditions rebuilt in Salesforce Pricing | Salesforce | Price authority moves to sales for good, SAP accepts the price |
| C: list prices from SAP, discounts in Salesforce | Split | Sales negotiates discounts per deal |

For route A, the [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/) documents the pattern with SAP sales order simulation, but for Sales Cloud and Salesforce CPQ, not for Revenue Cloud. For Revenue Cloud you build the call yourself and test the response time with real quote sizes. My usual split, as an assumption for a typical machine builder: machines on route C, spare parts and dealer conditions on route A, because they also apply to EDI orders. The full comparison is in [Customer prices: SAP conditions or Salesforce Pricing?](../../../blog/customer-prices-sap-conditions-or-salesforce-pricing/), and the wider split of quote to cash between the two systems is part of [chapter 1](../revenue-cloud-overview/).

## From the configured quote to the sales agreement

Many manufacturers do not stop at the quote. In run-rate business the configured product is planned in a sales agreement in Manufacturing Cloud, with quantities per product and period. Two things follow for this chapter. Every variant that is planned in an agreement needs its own product identity that SAP knows too, which is the second of the three catalog tests above. And the price is approved once, on the quote, and carried into the agreement, so the agreement needs no pricing logic of its own.

How configured products move from the quote into the agreement, and what the configurator has to settle beforehand, is described in [From quote to sales agreement: the configurator](../../../blog/quote-to-sales-agreement-product-configurator/). The agreement side is covered in the Manufacturing Cloud chapter on [agreements and forecasting](../../manufacturing-cloud/agreements-and-forecasting/).

## How do you test pricing and rules?

Catalog, constraint models and pricing procedures change what every sales rep can quote. A wrong rule shows up at the customer, not in a log. I treat all three like code:

- **Regression cases for pricing.** A fixed set of reference quotes with documented net prices: each product group, each volume tier, contract customers, manual discounts above and below approval thresholds. The JSON mode of the pricing simulation lets you store a case and run it again after every change.
- **Regression and performance cases for constraint models.** Valid configurations that must work, invalid ones that must be rejected with the expected message. The [CML User Guide](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/CML_User_Guide.pdf) names the target: less than 100 milliseconds per model run, fewer than 1,000 backtracks and no violations.
- **Catalog as data.** Classifications, attributes and bundles are records. The Developer Guide has an [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) with the deployment sequence and lookup fields per area, including catalog, pricing and configurator.

How configuration data moves through a pipeline is the subject of the DevOps chapter on [data and configuration](../../devops-release-management/data-and-configuration/), and how tests fit into the release process is in [quality, tests and reviews](../../devops-release-management/quality-tests-reviews/).

## A typical scenario, as an assumption

A typical scenario, as an assumption: a manufacturer of packaging machines sells 30 base machines in three families through direct sales, and spare parts through dealers. Two families have their compatibility rules in spreadsheets kept by application engineers, the third uses SAP variant configuration.

The design would look like this. Three classifications with about a dozen attributes each, 30 base machines, configurable bundles for tooling and safety packages, a separate spare parts catalog loaded from SAP. Constraint models for the two spreadsheet families, with compatibility tables loaded from a custom object and regression cases per family. The SAP family keeps its configurator for now, and Salesforce takes the result through an interface. Machine prices follow route C with list prices from SAP every night and the sync right after the load. Dealer prices for spare parts follow route A. Product management owns the catalog and the constraint models, a pricing admin in sales operations owns the procedures, and controlling signs off every pricing change.

## What should be decided before a partner builds?

1. **Catalog owner and the three variant tests**, written down before the first data load.
2. **Rule master per product line**: Revenue Cloud, SAP variant configuration or an external configurator, never two.
3. **Price master per price type**, including contract prices and dealer conditions.
4. **Order of the pricing elements**, agreed by sales management and controlling.
5. **Regression cases** for pricing and constraint models, owned by the manufacturer.

Setting these boundaries between SAP and Salesforce is part of my work on [Salesforce architecture](../../../services/salesforce-architecture/), and the price interface itself falls under [Salesforce integration](../../../services/salesforce-integration/). [Chapter 3](../quote-contract-order/) continues with approvals, contracts and the order hand-over to SAP, and all chapters are on the [overview page](../).

Catalog, configurator and pricing work in Revenue Cloud when each has one master and one owner at the manufacturer. If you want to check that for your products and prices, [send me a message](#contact).
