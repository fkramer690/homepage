---
title: "Program-based business: forecasts for suppliers"
description: "How program-based business in Manufacturing Cloud turns OEM programme forecasts into component forecasts and sales agreements, and when it is overkill."
pubDate: 2026-10-28
lang: en
slug: program-based-business-supplier-forecasts
translationKey: manufacturing-cloud-program-based-business
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, program-based business, forecasting, suppliers, sales agreements, Data Processing Engine]
takeaways:
  - "Program-based business helps suppliers that deliver components into OEM programmes: it derives component forecasts from programme and variant forecasts and converts them into opportunities and sales agreements."
  - "Programme and variant forecasts arrive as CSV files, for example from third-party market data. Component forecasts are calculated by four Data Processing Engine templates."
  - "Each component needs a Product Related Material record with quantity per unit, minimum eligible quantity and lead time. That data usually lives in engineering or the ERP."
  - "Program-based business needs Advanced Account Forecasting, Data Pipelines, the Program Based Business feature and two permission sets. Trailhead names no licence, so ask."
  - "With a handful of programmes, or when a planning system already derives component demand, program-based business adds a second forecast instead of a better one."
faq:
  - q: "What is program-based business in Manufacturing Cloud?"
    a: "A Manufacturing Cloud feature for suppliers that deliver components into OEM programmes. It holds forecasts per programme, variant and component, calculates component demand with the Data Processing Engine and converts approved forecasts into opportunities and sales agreements."
  - q: "Where do programme forecasts come from?"
    a: "According to Trailhead, account managers import programme and variant forecasts from third-party research as CSV files. Records are matched by an external reference number, so a new file updates existing forecasts instead of duplicating them."
  - q: "How do component forecasts become sales agreements?"
    a: "The Transformation API converts finalised component forecasts into one opportunity with line items and schedules per period. Once the opportunity is won, the Sales Agreement Connect API converts it into a sales agreement with sales agreement products."
  - q: "Which permission sets does program-based business need?"
    a: "Trailhead names Manufacturing Advanced Account Forecast and Manufacturing Program Based Business for users, and Data Pipelines Base User for admins who run Data Processing Engine definitions."
draft: false
---

Program-based business in Manufacturing Cloud helps a supplier that delivers components into OEM programmes and has to plan quantities years ahead. It takes production forecasts per programme and variant, often from third-party market data, calculates the component demand from them, lets account managers and engineering adjust the result, and converts approved forecasts into opportunities and sales agreements. That pays off with many programmes, variants and components and forecasts that live in spreadsheets today. With a handful of programmes, or when a planning system already derives component demand, it adds a second forecast instead of a better one.

## What is program-based business in Manufacturing Cloud?

[Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business) describes the supplier pyramid: the OEM at the top, then Tier 1, Tier 2 and Tier 3 suppliers. When the OEM launches a new product line, a programme, every supplier below has to estimate how many of its parts that programme will need, per variant and per month, long before the first order arrives.

The [product page for sales](https://salesforce.com/manufacturing/cloud/sales) lists what the feature covers: market size per manufacturer and programme, third-party demand streams with IHS and Dodge as examples, margins and the effect of volume changes on fixed-cost allocation, and attach rates and pricing for engineering change orders. Trailhead's example is a car programme, but the model fits any supplier whose parts go into series products of a few large customers.

It belongs to chapter 2 of the masterclass, [agreements and forecasting](../../masterclass/manufacturing-cloud/agreements-and-forecasting/), next to account forecasting. Account forecasting plans what existing customers take of existing products. Program-based business plans the demand of programmes that may not have started production yet.

## How is a programme modelled?

The data model has three levels, each with its own forecast fact object, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/explore-forecast-facts-and-create-forecast-sets):

| Level | Object | Where the numbers come from |
|---|---|---|
| Programme | Manufacturing Program Forecast Fact | CSV import |
| Variant | Manufacturing Program Variant Forecast Fact | CSV import |
| Component | Manufacturing Program Component Forecast Fact | Data Processing Engine |

Each level has a forecast set with dimensions, such as plant, model, variant and part, and measures, such as programme quantity, market share, selling price per unit or expected profit per unit. All three must use the same period group type; the Trailhead example uses 24 monthly periods.

A programme template defines which forecast sets apply at which level, and every new programme is created from a template. The link between the OEM's product and the supplier's part is the Product Related Material record: programme, variant, component, quantity per product unit, minimum eligible quantity, lead time and effective dates. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/set-up-programs-and-products), component forecasts are generated based on these dates, and a forecast below the minimum eligible quantity is raised to that minimum.

That record is the part I would clarify first. Quantity per unit and lead time are engineering and ERP data. If nobody owns them in Salesforce, the component forecast is calculated from numbers that were right at the start of the programme.

## Where do the programme and variant numbers come from?

From files. Account managers import programme and variant forecasts as CSV files into the two fact objects, with "Add and Update Records". Records are matched by the ExternalReferenceNumber field, so the next file updates existing forecasts instead of duplicating them. Trailhead's example uses data from IHS Markit, cleaned before the import.

Then people adjust. Forecast sets define adjustment periods: in the example, account managers may change values in the first five days of each month and engineering managers in the next five. Every change is tracked with a note. An account manager who hears from the OEM's purchasing that a variant will sell better than the market data says can raise the number, and the reason stays visible.

## How are component forecasts calculated?

With four predefined Data Processing Engine templates, process type Program Based Business, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/track-and-transform-component-forecasts):

- **Generate Program Component Forecast** for the first run of a programme, or when programme and variant forecasts change.
- **Calculate Program Component Forecast** recalculates every period, for example when new components or Product Related Material records appear.
- **Rollover Program Component Forecast** runs at month end: the first period expires, a new one is added.
- **Regenerate Program Component Forecast** after changes to forecast sets, dimensions or period groups; it expires existing records and creates new ones.

Admins clone and customise the templates, and scheduled flows run them; weekly in the example. The engine reads programmes, variant forecasts, Product Related Material, products, price book entries and periods, and writes forecasted quantity and revenue per component and period.

Two consequences for the architecture. Cloned DPE definitions, forecast sets and flows are configuration that has to move through the release process like everything else, as described in [data and configuration in the pipeline](../../masterclass/devops-release-management/data-and-configuration/). And the record count grows with programmes, variants, components, dimensions and periods.

```hinweis offen
Account forecasting has documented limits for forecast records, described in [account forecasting for sales volume planning](../account-forecasting-sales-volume-planning/). Whether component forecasts count against the same limits I could not find documented; clarify it before the first large programme.
```

## How does an approved forecast become a sales agreement?

In two API steps. First, the Transformation API converts finalised component forecasts into an opportunity. The mappings are defined with the ObjectHierarchyRelationship metadata, usage type Transformation Mapping: component forecast to opportunity, to opportunity line item and to opportunity line item schedule, plus a support mapping from the programme to the opportunity, because the account is not set automatically. The result is one opportunity with a line item per component and a schedule per period.

Second, once the opportunity is won, the Sales Agreement Connect API converts opportunity and line items into a sales agreement with sales agreement products. From there, actuals from the ERP take over, as described in [sales agreements: spot customers behind on volume](../sales-agreements-volume-shortfall-erp/). If the agreement comes out of a configured quote instead, the path is in [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/).

```ablauf
ext: Market data CSV
sf: Programme forecast, Component forecast, Opportunity, Sales agreement
erp: ERP
Market data CSV --Import--> Programme forecast
Programme forecast --DPE--> Component forecast
Component forecast --Transformation API--> Opportunity
Opportunity --Won--> Sales agreement
ERP ..Actuals..> Sales agreement
```

Trailhead describes no approval status for the forecast. Who declares a component forecast final, and when, is your process to define. The Sales Planning agent has a documented subagent that converts program component forecasts into opportunities, covered in [what the Sales Planning agent really does](../agentforce-sales-planning-agreements-forecasts/). I would only let it run once that approval step exists.

## What do you need before you start?

- **Features in Setup:** Advanced Account Forecasting, Data Pipelines and Program Based Business. The metadata switch for programs exists since API 54.0.
- **Permission sets:** Manufacturing Advanced Account Forecast and Manufacturing Program Based Business for users, Data Pipelines Base User for admins.
- **Licence:** Trailhead names none. Get it confirmed in the quote, as with every feature in [Manufacturing Cloud features: what is in the box](../manufacturing-cloud-features-overview/).
- **Data:** a source for programme and variant forecasts, Product Related Material from engineering or the ERP, and price book entries for selling prices.

## A typical scenario, as an assumption

A supplier of hydraulic cylinders delivers into 12 programmes of four agricultural machinery OEMs. Each programme has about four variants, each variant uses about ten of the supplier's parts, built in two plants. Today every key account manager keeps a spreadsheet per OEM.

With 24 monthly periods, that is about 12 x 4 x 10 x 2 x 24 = 23,040 component forecast records per run, still few enough for the team to review the large deviations. The benefit lies in three places: one calculation logic instead of twelve spreadsheets, adjustments with a reason, and opportunities created from the forecast instead of typed in again. The cost lies in data: lead times and quantities per unit have to come from engineering, and market data for agricultural machinery programmes has to be bought or collected.

## When is program-based business overkill?

- **A handful of programmes.** With three programmes, opportunity schedules and a spreadsheet are enough.
- **A planning system already derives component demand** from OEM forecasts. Then Salesforce would hold a second forecast, and the meeting argues about which one counts.
- **No third-party or OEM forecast data.** Without programme numbers there is nothing to derive components from.
- **No sales agreements afterwards.** The conversion into opportunities and agreements is half the value.

If you do go ahead, the integration with planning in the ERP needs one leading number, which is part of my work on [Salesforce integration](../../services/salesforce-integration/).

Program-based business pays off for suppliers with many programmes and a clear owner for component data.
