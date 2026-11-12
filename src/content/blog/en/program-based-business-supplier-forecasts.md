---
title: "Program-based business: forecasts for suppliers"
description: "How program-based business in Manufacturing Cloud turns OEM program forecasts into component forecasts and sales agreements, and when it is overkill."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: program-based-business-supplier-forecasts
translationKey: manufacturing-cloud-program-based-business
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, program-based business, forecasting, suppliers, sales agreements, Data Processing Engine]
takeaways:
  - "Program and variant forecasts arrive as CSV files. Four Data Processing Engine templates calculate the component forecasts."
  - "Each component needs a quantity per unit, a minimum quantity and a lead time. That data usually lives in engineering or the ERP."
  - "The setup requires Advanced Account Forecasting, Data Pipelines and Program Based Business, plus three permission sets and the matching permission set licenses."
  - "Approved component forecasts become an opportunity and a sales agreement in two API steps."
faq:
  - q: "What is program-based business in Manufacturing Cloud?"
    a: "It is a Manufacturing Cloud feature for suppliers that deliver components for OEM programs. It holds forecasts per program, variant and component, calculates component demand with the Data Processing Engine and converts approved forecasts into opportunities and sales agreements."
  - q: "Where do program forecasts come from?"
    a: "According to Trailhead, account managers import program and variant forecasts from third-party research as CSV files. Records are matched by an external reference number, so a new file updates existing forecasts instead of duplicating them."
  - q: "How do component forecasts become sales agreements?"
    a: "The Transformation API converts finalised component forecasts into one opportunity with line items and schedules per period. Once the opportunity is won, the Sales Agreement Connect API converts it into a sales agreement with sales agreement products."
  - q: "Which permission sets does program-based business need?"
    a: "Salesforce Help names Manufacturing Advanced Account Forecast and Manufacturing Program Based Business for users, and Data Pipelines Base User for admins who run Data Processing Engine definitions. Users also need the matching permission set licenses, and whoever creates sales agreements needs the sales agreement permissions."
draft: false
---

Program-based business in Manufacturing Cloud helps suppliers that deliver components for OEM programs and have to plan quantities years in advance. It takes production forecasts per program and variant, often from third-party market data, calculates the component demand from them, lets account managers and engineering adjust the result, and converts approved forecasts into opportunities and sales agreements. That pays off with many programs, variants and components and forecasts that live in spreadsheets today. With a handful of programs, or when a planning system already derives component demand, it adds a second forecast instead of a better one.

## What is program-based business in Manufacturing Cloud?

[Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business) describes the supplier pyramid: the OEM at the top, then Tier 1, Tier 2 and Tier 3 suppliers. When the OEM launches a new product line, a program, every supplier below has to estimate how many of its parts that program will need, per variant and per month, long before the first order arrives.

The [product page for sales](https://salesforce.com/manufacturing/cloud/sales) lists what the feature covers: market size per manufacturer and program, third-party demand streams such as IHS and Dodge, margins and the effect of volume changes on fixed-cost allocation, and attach rates and pricing for engineering change orders. Trailhead's example is a car program, but the model fits any supplier whose parts go into mass-produced products for a few large customers.

It belongs to chapter 2 of the masterclass, [agreements and forecasting](/en/masterclass/manufacturing-cloud/agreements-and-forecasting/), next to account forecasting. Account forecasting plans the quantities that existing customers will take of existing products. Program-based business plans demand for programs that may not have started production yet.

## A program has three levels, each with its own forecast

The data model has three levels, each with its own forecast fact object, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/explore-forecast-facts-and-create-forecast-sets):

| Level | Object | Where the numbers come from |
|---|---|---|
| Program | Manufacturing Program Forecast Fact | CSV import |
| Variant | Manufacturing Program Variant Forecast Fact | CSV import |
| Component | Manufacturing Program Component Forecast Fact | Data Processing Engine |

Each level has a forecast set with dimensions, such as plant, model, variant and part, and measures, such as program quantity, market share, selling price per unit or expected profit per unit. All three must use the same period group type; the Trailhead example uses 24 monthly periods.

A program template defines which forecast sets apply at which level, and every new program is created from a template. The link between the OEM's product and the supplier's part is the Product Related Material record: program, variant, component, quantity per product unit, minimum eligible quantity, lead time and effective dates. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/set-up-programs-and-products), component forecasts are generated based on these dates, and a forecast below the minimum eligible quantity is raised to that minimum.

This is the record I would clarify first. Quantity per unit and lead time are engineering and ERP data. If nobody owns them in Salesforce, the component forecast is calculated from numbers that were right at the start of the program.

## Program and variant numbers come from files

Account managers import program and variant forecasts as CSV files into the two fact objects, with "Add and Update Records". Records are matched by the ExternalReferenceNumber field, so the next file updates existing forecasts instead of duplicating them. Trailhead's example uses data from IHS Markit, cleaned before the import.

Then users adjust the forecasts. Forecast sets define adjustment periods: in the example, account managers may change values in the first five days of each month and engineering managers in the next five. Every change is tracked with a note. An account manager who hears from the OEM's purchasing team that a variant will sell better than the market data says can raise the number, and the reason stays visible.

## How are component forecasts calculated?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/track-and-transform-component-forecasts), component forecasts are calculated with four predefined Data Processing Engine templates, using the process type Program Based Business:

- **Generate Program Component Forecast** for the first run of a program, or when program and variant forecasts change.
- **Recalculate Program Component Forecast** (Trailhead still says "Calculate") recalculates after components are added or removed or Product Related Material records change.
- **Rollover Program Component Forecast** runs at month end: the first period expires, a new one is added.
- **Regenerate Program Component Forecast** runs after changes to forecast sets, dimensions or period groups; it expires existing records and creates new ones.

Admins clone and customize the templates, and scheduled flows run them weekly in the example. The engine reads programs, variant forecasts, Product Related Material, products, price book entries and periods, and writes forecasted quantity and revenue per component and period.

This has two consequences for the architecture. Cloned DPE definitions, forecast sets and flows are configuration that has to move through the release process like everything else, as described in [data and configuration in the pipeline](/en/masterclass/devops-release-management/data-and-configuration/). And the record count grows with programs, variants, components, dimensions and periods.

```hinweis offen
Salesforce documents [recommended volumes for program-based business](https://help.salesforce.com/s/articleView?id=ind.mfg_pbb_admin_considerations_large_volumes_concept.htm&language=en_US&type=5): for large orgs, up to 150 programs, 60 periods and 58.5 million component forecast records. An org includes 1 GB of Data Processing Engine export per day, which the standard templates turn into about 3 million forecast records a day; higher volumes need the Data Pipelines add-on.
```

## An approved forecast becomes a sales agreement in two steps

There are two API steps. First, the Transformation API converts finalised component forecasts into an opportunity. The mappings are defined with the ObjectHierarchyRelationship metadata, usage type Transformation Mapping: from component forecast to opportunity, opportunity line item and opportunity line item schedule, plus a supporting mapping from the program to the opportunity, because the account is not set automatically. The result is one opportunity with a line item per component and a schedule per period.

Second, once the opportunity is won (a process rule I recommend, not a technical requirement), the Sales Agreement Connect API converts the opportunity and its line items into a sales agreement with sales agreement products. From there, actuals from the ERP take over, as described in [sales agreements: spot customers behind on volume](/en/blog/sales-agreements-volume-shortfall-erp/). If the agreement comes out of a configured quote instead, the path is in [from quote to sales agreement](/en/blog/quote-to-sales-agreement-product-configurator/).

```ablauf
ext: Market data CSV
sf: Program forecast, Component forecast, Opportunity, Sales agreement
erp: ERP
Market data CSV --Import--> Program forecast
Program forecast --DPE--> Component forecast
Component forecast --Transformation API--> Opportunity
Opportunity --Won--> Sales agreement
ERP ..Actuals..> Sales agreement
```

Trailhead does not describe an approval status for the forecast. Who declares a component forecast final, and when, is your process to define. The Sales Planning agent has a documented subagent that converts program component forecasts into opportunities, covered in [what the Sales Planning agent really does](/en/blog/agentforce-sales-planning-agreements-forecasts/). I would only let it run once that approval step exists.

## What do you need before you start?

- **Features in Setup:** Advanced Account Forecasting, Data Pipelines and Program Based Business. The metadata type for program templates has existed since API 54.0, the program objects since API 55.0.
- **Permission sets:** Manufacturing Advanced Account Forecast and Manufacturing Program Based Business for users, Data Pipelines Base User for admins.
- **License:** Salesforce Help lists the permission set licenses for Manufacturing Cloud users; get the exact set confirmed in the quote, as with every feature in [Manufacturing Cloud features: what is in the box](/en/blog/manufacturing-cloud-features-overview/).
- **Data:** a source for program and variant forecasts, Product Related Material from engineering or the ERP, and price book entries for selling prices.

## Worked example: hydraulic cylinders for 12 programs

Assume a supplier of hydraulic cylinders delivers parts for 12 programs at four agricultural machinery OEMs. Each program has about four variants, each variant uses about ten of the supplier's parts, and those parts are built in two plants. Today every key account manager keeps a spreadsheet per OEM.

With 24 monthly periods, that is about 12 x 4 x 10 x 2 x 24 = 23,040 component forecast records under these simple assumptions, far below the recommended volumes. Nobody reviews them one by one; the team works through filtered deviations. The benefit lies in three places: one calculation method instead of twelve spreadsheets, adjustments with a reason, and opportunities created from the forecast instead of being typed in again. The cost lies in data: lead times and quantities per unit have to come from engineering, and market data for agricultural machinery programs has to be bought or collected.

## When is program-based business overkill?

- **A handful of programs.** With three programs, opportunity schedules and a spreadsheet are enough.
- **A planning system already derives component demand** from OEM forecasts. Then Salesforce would hold a second forecast, and the team would spend the meeting arguing about which one counts.
- **No third-party or OEM forecast data.** Without program forecast figures, there is nothing to derive component demand from.
- **No sales agreements afterwards.** The conversion into opportunities and agreements is half the value.

If you do go ahead, component data needs a named owner, and the integration with planning in the ERP needs one authoritative number. That integration is part of my work on [Salesforce integration](/en/services/salesforce-integration/).
