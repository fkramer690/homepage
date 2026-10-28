---
title: "Manufacturing Cloud: ERP integration, AI and rollout"
description: "Which data flows between SAP and Manufacturing Cloud, who owns prices, when Agentforce pays off and in which order countries go live in a global rollout."
lang: en
slug: erp-ai-and-rollout
course: manufacturing-cloud
translationKey: mfg-05
chapter: 5
short: "ERP, AI and rollout"
summary: "Which data flows between SAP and Manufacturing Cloud, when Agentforce pays off and in which order countries go live."
takeaways:
  - "SAP stays the master for accounts, products, orders and usually prices; Manufacturing Cloud receives actuals daily and sends approved rebates and warranty amounts back as credit memos."
  - "From 1 December 2026 every interface user that logs in with SOAP login() needs the Use Any API Auth permission; in Summer '27 SOAP login() in API versions 31.0 to 64.0 is retired."
  - "Agentforce pays off first in read-only processes with high volume, clean data and an API to the ERP, such as dealer questions about order status; one action costs 20 Flex Credits."
  - "A global rollout starts with a large country of reasonable complexity, brings one of the largest regions into the first two phases and keeps all countries at least 80 percent identical."
  - "Forecast sets, Data Processing Engine definitions and Business Rules Engine expression sets belong in every regression test before each of the three Salesforce releases a year."
articles: [manufacturing-cloud-erp-integration, penny-perfect-pricing-erp-prices, agentforce-yes-or-no-manufacturers, siemens-agentforce-lessons, multilingual-dealer-agents, manufacturing-cloud-global-rollout]
faq:
  - q: "Do I need MuleSoft to connect SAP to Manufacturing Cloud?"
    a: "No. The MuleSoft Accelerator for Manufacturing provides templates for syncing accounts, products and orders from SAP S/4HANA and for rebate credit memos. It does not cover sales agreements or warranty. Any middleware that works with the Salesforce APIs can do the same job."
  - q: "Should prices be calculated in Salesforce or in SAP?"
    a: "For most manufacturers running SAP I would keep SAP as the price master. Penny Perfect Pricing from Winter '27 prices telesales orders in Salesforce, but its licence and the import of SAP condition records are not documented, and two price engines drift apart."
  - q: "Is Agentforce included in Manufacturing Cloud?"
    a: "The pricing page lists the full Agentforce for Industries suite only in the Max editions, from $650 per user and month. For Core there is the Agentforce for Manufacturing Cloud Add-on from $150 a month; the unit differs between two Salesforce pages, so get it confirmed in writing."
  - q: "Which country should a global Manufacturing Cloud rollout start with?"
    a: "A large country of reasonable complexity: big enough to test the global template properly, and not so special that its edge cases shape the template for everyone else. One of the largest regions should be in the first two phases."
  - q: "What should I test in a Manufacturing Cloud org before a Salesforce release?"
    a: "The calculations that produce numbers: forecast sets, Data Processing Engine definitions for actuals, forecasts and rebates, Business Rules Engine expression sets for warranty, and the ERP interfaces. Compare the results in the preview sandbox with production."
draft: false
---

Once the features are designed, three questions decide a Manufacturing Cloud project: which system owns which data, where Agentforce actually takes work off people, and in which order the countries go live. SAP stays the master for accounts, products, orders and usually prices. Manufacturing Cloud receives actuals daily and sends approved rebates and warranty amounts back as credit memos. Agentforce pays off first in read-only processes with high volume and an API to the ERP. The rollout starts with a large country of reasonable complexity, and all countries work at least 80 percent the same way. Check every interface that logs in with SOAP login() before 1 December 2026.

## Which system owns which object?

Before anyone builds an interface, every object needs a leading system and a named owner. Manufacturing Cloud produces few of its numbers itself. A sales agreement from [chapter 2](../agreements-and-forecasting/) compares plan against actuals, and the actuals come from SAP. Rebates from [chapter 3](../dealer-and-partner-channel/) and warranty from [chapter 4](../warranty-and-after-sales/) run the other way: Salesforce approves, SAP pays.

This is how I would split ownership at a typical manufacturer running SAP:

| Data | Leading system | What Salesforce needs it for |
|---|---|---|
| Accounts and account hierarchy | SAP | Sales agreements, forecasts, portal |
| Products and product hierarchy | SAP | Sales agreements, rebates, warranty |
| Prices and conditions | SAP, unless you decide otherwise on purpose | Telesales, dealer quotes |
| Orders or order totals | SAP | Actuals, order status |
| Stock | SAP | A figure next to the shortfall |
| Sales agreements, forecasts, targets | Salesforce | Sales planning |
| Approved rebates and warranty amounts | Salesforce, paid in SAP | Credit memo to the dealer |

For objects inside the org I use the [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/). For ERP interfaces I add two columns, direction and frequency. The most common gap is the account hierarchy: if the sold-to party in SAP does not sit on the same level as the account that holds the sales agreement, you need a mapping table, and that table needs an owner too.

## Which data flows between SAP and Manufacturing Cloud?

Master data and actuals flow into Salesforce, money flows back. The frequency follows the question the data answers. Sales agreements run for months, so a daily load is enough for their actuals. A dealer asking about an order wants today's status; I call that live in SAP instead of copying it, as in [Agentforce and SAP: order status through MuleSoft](../../../blog/agentforce-sap-order-status-mulesoft/). All flows with direction and frequency are in [Manufacturing Cloud and SAP: which data flows where](../../../blog/manufacturing-cloud-sap-integration-data-flows/).

The [MuleSoft Accelerator for Manufacturing](https://docs.mulesoft.com/manufacturing/latest/) provides templates for two of these flows: syncing accounts, products and orders from SAP S/4HANA, and credit memos for approved rebate payouts. It does not create sales agreements and names no warranty flow. Salesforce lists MuleSoft on the [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) only with "Request a quote". If you already run MuleSoft, the templates save design time. Buying it just for these flows rarely pays off.

For late orders and corrections there is the [Refresh Actuals Calculation](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_refresh_actuals_calculation.htm) action. It is available from API version 47.0 and recalculates the actuals of a sales agreement for the current, past or future periods. When SAP books a return for last month, the middleware calls it for the affected agreements. Otherwise account managers call customers about a shortfall that no longer exists.

How the same question looks for a B2B store is covered in the [ERP integration](../../b2b-commerce/erp-integration-stock-orders/) chapter of the B2B Commerce masterclass. I help design these interfaces under [Salesforce integration](../../../services/salesforce-integration/).

### Which login deadlines apply to ERP interfaces?

Many ERP interfaces still log in with a technical user and a password. According to the [developer's guide to Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) there are three steps:

1. From 1 December 2026 every user who logs in through SOAP API login() needs the Use Any API Auth permission. Without it they get an error.
2. In Summer '27 SOAP login() in API versions 31.0 to 64.0 is retired.
3. SOAP, REST and Bulk API versions 31.0 to 40.0 stop getting fixes in Summer '27, and calls fail from Summer '28.

The risk is an actuals load that fails silently: sales sees an old shortfall and believes it. How to find the affected interfaces is in [Salesforce password integrations end in 2027](../../../blog/salesforce-password-integrations-end-2027/).

## Who owns prices: SAP or Penny Perfect Pricing?

With Winter '27, [generally available since 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), Salesforce offers its own price engine for orders. According to the [developer guide](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/guide/overview.html), Penny Perfect Pricing prices advanced order line items, which is the telesales ordering flow, and describes 19 objects from API version 68.0. Calculation schema, search strategies and condition records with tiers look a lot like the SAP condition technique.

For most manufacturers I would still keep SAP as the price master. Two price engines drift apart as soon as the pricing team changes a condition in SAP and the copy only arrives overnight. Two points are also open: the developer documentation names no licence and no standard way to load SAP condition records. Settle both in writing before a project plan depends on them. The trade-off, with a scenario for spare parts telesales, is in [Penny Perfect Pricing: ERP prices in Salesforce?](../../../blog/penny-perfect-pricing-erp-prices/).

The boundaries stay as in the other chapters: quotes with a configurator belong to Revenue Cloud, see [catalog, configurator, pricing](../../revenue-cloud/product-catalog-configurator-pricing/), and store prices to B2B Commerce, see [prices, cart, checkout](../../b2b-commerce/prices-cart-checkout/).

## When does Agentforce pay off for manufacturers?

When a process meets five criteria, which I describe in [Agentforce for manufacturers: start now or wait?](../../../blog/agentforce-yes-or-no-manufacturers/): enough volume, data that holds up, API access to the ERP, a cost model that works and an edition that fits. Dealer questions about order status and delivery dates often meet them. A warranty pre-check where the installed base lacks warranty start dates does not.

Two numbers drive the cost. A standard or custom action costs 20 Flex Credits according to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), which at [$500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) is $0.10. And the edition sets the pool: according to the [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/), the Core editions include 500,000 Flex Credits per org and year, the Max editions 2.75 million and, as the only ones, the full Agentforce for Industries suite. For Core there is the Agentforce for Manufacturing Cloud Add-on: the add-ons page says $150 per user and month, the pricing page "from $ 150 login/month". Get the unit confirmed in writing. How to estimate credits per action is covered in the [costs and tokens](../../ai-salesforce/costs-and-tokens/) chapter of the AI masterclass.

The most visible industry reference shows where to start. In the [Siemens and Salesforce announcement](https://www.salesforce.com/news/press-releases/2026/09/15/siemens-agentforce-redefine-industrial-sales-service/) of 15 September 2026, two agents for inbound leads are live, for 18,000 sellers in 132 countries. Teamcenter answers for service and supplier onboarding in SAP are written in the future tense. In [Siemens and Agentforce: lessons for manufacturers](../../../blog/siemens-agentforce-lessons-for-manufacturers/) I derive an order from it: read-only with high volume first, then reading from the ERP, then answers from PLM and serial numbers, and write steps into the ERP last. Which agents exist today for sales, service and warranty is in the [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/) chapter.

## How does an agent serve dealers in many languages?

For exporters with dealers in many countries, language is a planning question of its own. Salesforce separates generally available languages from beta languages in Agentforce, and according to its [multi-language guide](https://www.salesforce.com/blog/multi-language-guide/) the customer is responsible for quality assurance in beta languages. Check every dealer language against the current list, because Salesforce changes it regularly. Translation itself is cheap: the rate card lists 4,000 Flex Credits per million characters translated, which is $20 at list price.

Knowledge costs more. According to the same guide, the retriever filters out knowledge articles whose language does not match the session language, so an Italian dealer only finds Italian articles. If you do not want that, you build a custom retriever without the language filter. I would maintain knowledge in one or two languages, keep safety and warranty content per country and test every approved language with real dealer questions before go-live. The worked example and the split are in [Multilingual Agentforce agents for export dealers](../../../blog/multilingual-agentforce-agents-export-dealers/). In the rollout, language becomes a column in the country table.

## In which order do you roll out Manufacturing Cloud globally?

First the goal is fixed, usually harmonising processes. That leads to a global template with the decisions that are hard to change after the first country: the account level of sales agreements, the rule for when a configuration becomes its own product, and what customers and dealers see in the portal. In [Rolling out Manufacturing Cloud globally](../../../blog/manufacturing-cloud-global-rollout/) I describe the rules I derive from that:

- **First country:** large, with reasonable complexity. A small pilot country confirms a template that later breaks at the first large country.
- **Large region early:** one of the largest regions joins in the first two phases, so the template is under real load while changes are still cheap.
- **Order after that:** a table with one row per country and columns for processes, business units, IT systems and brands. For Manufacturing Cloud I add two columns: own ERP or shared, and dealer languages.
- **80 percent the same:** legal requirements are given, every other local requirement is justified and decided by one role on the client side.
- **Change management:** key users, communication before go-live and a look at usage afterwards, in every country.

The ERP column carries the most weight. A country with its own SAP system or its own middleware needs new interfaces for actuals, rebates and warranty. If it shares the ERP with a country that is already live, the path is shorter. How I build a roadmap with phases and gates is in the [rollout roadmap](../../devops-release-management/rollout-roadmap/) chapter of the DevOps masterclass, and the work with people in each country under [change management for Salesforce programmes](../../../services/change-management-salesforce/).

## What do you need to retest after every Salesforce release?

Salesforce ships three releases a year, and preview sandboxes get each one before production. How to align that with your own release calendar is in the [release planning](../../devops-release-management/release-planning-salesforce-releases/) chapter of the DevOps masterclass. In a Manufacturing Cloud org the parts that produce numbers belong in the regression test first:

- **Forecast sets.** They are metadata of type [AdvAccountForecastSet](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/meta_advaccountforecastset.htm), available since API version 53.0, and define the forecast configuration per business unit.
- **Data Processing Engine definitions.** They aggregate actuals, forecasts and rebates; Salesforce lists them as [BatchCalcJobDefinition](https://developer.salesforce.com/docs/atlas.en-us.264.0.loyalty.meta/loyalty/tooling_api_objects_batchcalcjobdefinition.htm).
- **Business Rules Engine expression sets.** The metadata type is [ExpressionSetDefinition](https://developer.salesforce.com/docs/atlas.en-us.264.0.api_meta.meta/api_meta/meta_expressionsetdefinition.htm); in many orgs they hold warranty and rebate rules.
- **ERP interfaces.** Every new API version is a reason to check the API versions of your interfaces against the deadlines above.

My test per release is deliberately small: one forecast regeneration, one actuals refresh for three sales agreements, one warranty claim through the expression set and one rebate run for a period, each in the preview sandbox and compared with production. If a number differs, you know before your account managers do. For these definitions to move between orgs like any other configuration, they belong in the repository, as described in the [data and configuration](../../devops-release-management/data-and-configuration/) chapter.

## How does this chapter fit with the others?

This chapter closes the masterclass. It assumes the decisions from the business case, agreements, dealer channel and warranty, and settles what they need in operation and across many countries. Before it came [chapter 4 on warranty and after-sales](../warranty-and-after-sales/), and all five chapters are on the [overview page](../).

Manufacturing Cloud is only as good as the SAP data it receives, and a rollout only as good as the template that holds in the first large country. If you want an independent review of your interfaces, agents or rollout order, [send me a message](#contact).
