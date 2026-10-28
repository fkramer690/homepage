---
title: "Predictive maintenance in Salesforce: what data you need"
description: "When a machine builder has enough service history for failure prediction in Salesforce, what streaming machine data costs, and when maintenance plans suffice."
pubDate: 2026-10-27
lang: en
slug: predictive-maintenance-salesforce-data-needed
translationKey: predictive-maintenance-data-readiness
topic: field-service
categories: [field-service, ai]
tags: [predictive maintenance, field service, data 360, asset service prediction, manufacturing, flex credits]
takeaways:
  - "Asset Service Prediction learns from current asset data and the service history of similar assets, so linked work orders and coded failure causes matter more than sensors."
  - "Salesforce announced Asset Service Prediction as an open beta in June 2024, and the product page lists it without a status today, so ask for written availability in your edition."
  - "Streaming machine data into Data 360 costs 3,500 Flex Credits per million rows in the base tier, so 15-minute aggregates cost a few hundred times less than raw one-second readings."
  - "With a few hundred units per series and fault codes in free text, maintenance plans with usage and condition triggers are the honest alternative to failure prediction."
  - "Raw time series belong in the IoT platform or historian; Salesforce needs counters, aggregates and threshold events that create a work order."
faq:
  - q: "Does Salesforce Field Service support predictive maintenance?"
    a: "Salesforce lists Asset Service Prediction, which predicts when and why an asset fails from current asset data and the service history of similar assets, based on Data 360. It was announced as an open beta in June 2024. The product page shows no status, so confirm availability and price for your edition."
  - q: "What does streaming machine data into Data 360 cost?"
    a: "According to the Flex Credits rate card of 31 August 2026, the Streaming Pipeline costs 3,500 credits per million rows in the base tier and the Real-Time Pipeline 250,000 credits per million events. At $500 per 100,000 credits, a million streamed rows cost $17.50 before volume tiers."
  - q: "How much service history do I need for failure prediction?"
    a: "Salesforce publishes no minimum. My rule of thumb: per model series and failure mode, a few dozen documented failures with a coded cause, on work orders linked to the asset by serial number."
  - q: "What is the alternative to predictive maintenance in Salesforce?"
    a: "Maintenance plans and maintenance work rules generate work orders by interval, and Salesforce describes preventive plans built around asset use, condition and criteria such as a temperature threshold. For August 2025 Salesforce announced an agent that books those visits with the customer."
draft: false
---

A machine builder has enough data for predictive maintenance in Salesforce when one model series has hundreds of comparable units, every corrective work order is linked to a serial number and failure causes sit in coded fields. Asset Service Prediction learns from that service history, and sensor data comes second. If the history is thin, [maintenance plans with usage and condition triggers](../field-service-usage-based-maintenance/) are the honest alternative. Telemetry is affordable as aggregates: in my example below, raw one-second readings from 300 machines cost about $65,900 a month in Flex Credits, 15-minute aggregates about $180.

## What does Salesforce offer for predictive maintenance today?

Salesforce sells several functions under the heading of proactive service, and only two of them predict anything. Status according to the [asset management news of June 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/), the [Agentforce for Manufacturing announcement](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) of August 2025 and the current [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/):

| Function | What it does | Status and price |
|---|---|---|
| Maintenance plans and work rules | Generate work orders per asset by interval | Standard Field Service |
| Usage and condition criteria | Preventive plans around "asset use, condition, and specific criteria", for example a temperature threshold | On the [product page](https://www.salesforce.com/service/field-service-management/), no separate price |
| Proactive maintenance agent | Contacts customers and books visits from maintenance plan dates | Announced as GA for August 2025, 20 Flex Credits per action |
| Asset Service agent template | Identifies "asset issues that require maintenance", drafts repair estimates and service orders | Available since August 2025 |
| Asset Health Score | Scores assets by age, usage, telemetry and repair history via Data 360 | Part of Connected Assets, $15,000 per org per month |
| Asset Service Prediction | Predicts the time of and reason for a failure | Open beta announced in June 2024, product page without a status |

The manufacturing announcement avoids the term predictive maintenance and speaks of agents that "warn customers and service teams of issues before they happen". The [asset management page](https://www.salesforce.com/service/field-service-management/asset-management/) lists Connected Assets with 10,000 connected digital assets, the Asset Health Score and an "Actionable Telematics Framework". The function overview is in [AI agents in Field Service: what works today?](../field-service-ai-agents-what-works-today/). Here the question is narrower: is your data ready for the last two rows? Both rows start from the machines as asset records, see [installed base in Manufacturing Cloud](../installed-base-asset-milestones/).

## When is the service history enough for failure prediction?

Salesforce describes Asset Service Prediction as a model that can "identify common issues based on current asset data and service history of similar assets". Its own example: a cooling fan failure on a certain generator model is often followed by fuel system service, so a technician handles both in one visit. That example only works because past work orders say which component failed. I check six points before talking about licences:

- **Similar assets exist in the data.** Similarity is a modelling decision. If every special machine is its own product record, without series, variant and retrofit status, the model has no comparable units.
- **Corrective work orders are linked to the asset.** Every repair carries the serial number. Old work orders with only an account and a free text field count for nothing. The groundwork is the one from [master data for Field Service](../salesforce-field-service-master-data/).
- **Failure causes are coded.** Component and cause are picklists. A well-written job report in prose helps the customer and not the model.
- **A usage axis exists.** Operating hours or cycles at the time of failure. Without them the model sees calendar age only, and a machine on three shifts wears out faster than one on a single shift.
- **Third-party repairs are reported.** If dealers or [service partners](../salesforce-field-service-service-partners/) repair machines in their countries and report only warranty cases, the history has holes exactly where the fleet is largest.
- **Enough failures per mode.** My rule of thumb: a few dozen documented, coded failures per model series and failure mode before a prediction steers dispatching.

A report of corrective work orders per series and failure code shows in an afternoon whether prediction is realistic.

## What does streaming machine data into Data 360 cost?

The [Flex Credits rate card of 31 August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) prices two lines for machine data:

- **Streaming Pipeline:** 3,500 credits per million rows in the base tier, falling to 2,800, 1,400 and 700 at higher monthly volumes. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=data.c360_a_data_usage_types.htm&language=en_US&type=5), the streaming Ingestion API counts here.
- **Real-Time Pipeline:** 250,000 credits per million events, about 71 times the streaming rate per unit. It counts events only when they belong to a real-time data graph.

Tiers apply per usage type and reset on the first day of each month. Flex Credits cost [$500 per 100,000](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/). The [streaming Ingestion API](https://developer.salesforce.com/docs/data/data-cloud-ref/guide/c360a-api-streaming-ingestion.htm) processes data "approximately every 3 minutes". For maintenance, where a work order is created hours or days before the visit, that is fast enough, and I see no reason to pay the real-time rate. [Bulk ingestion](https://developer.salesforce.com/docs/data/data-cloud-ref/guide/c360a-api-salesforce-cdp-ingestion.htm) suits daily or weekly loads. The help page books it as Batch Data Pipeline, a name the August rate card does not show.

Take 300 connected machines with 12 signals each:

```kennzahlen
$65,900 | a month for raw readings, one per second: 9.3 billion rows, about 13.2 million credits even with the volume tiers
$181 | a month for 15-minute aggregates with minimum, maximum and mean per signal: 10.4 million rows, 36,288 credits
source: Flex Credits rate card of 31 August 2026 and Salesforce pricing news ($500 per 100,000 credits), volumes as assumptions
```

For time series already in a data lake, Salesforce advertises zero copy access. Help bills federation by records retrieved from the source, and I found no matching rate card line.

```hinweis offen
The rate card shows no line of its own for bulk ingestion (Batch Data Pipeline) or for federation. Ask your account executive which line applies to each, and get both rates in writing.
```

Grounding agents on manuals is a separate cost block, described in [Data 360 costs for AI agents](../data-360-costs-for-ai-agents/).

Raw time series belong in the IoT platform or historian the machine builder already runs. Salesforce needs counters, aggregates and threshold events, because those are what create a work order.

## When is maintenance-plan-based service the honest alternative?

Much of the value promised under "predictive" comes from two simpler things: no planned maintenance gets missed, and intervals follow real usage instead of the calendar. Field Service covers both without a prediction model.

Maintenance plans generate the work orders, and maintenance work rules on the asset handle different intervals, as described in [modelling maintenance contracts](../salesforce-field-service-maintenance-contracts/). The product page adds plans around asset use and condition, with service scheduled when "an asset's temperature exceeds a set threshold". The data model has an [AssetAttribute object](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_assetattribute.htm) that "stores asset attributes to track and analyze asset conditions", available since API version 57.0. An operating hours counter written once a day from SAP, proALPHA or the IoT platform is enough for usage-based intervals.

The proactive maintenance agent then books the visit. If one booking takes five actions, that is 100 credits or $0.50.

I consider this the honest answer when series are small, machines are customer-specific, fault codes were free text until recently or dealers do not report repairs. Failure prediction is worth a pilot when one series has many hundreds of connected units, the coded history covers several years and unplanned downtime costs real money under an availability commitment in the service contract.

## A typical scenario: 1,400 machines in five series

Assume a machine builder with SAP, Service Cloud and Field Service already live. All numbers are assumptions to show the method.

1,400 machines are in the field across five series, the largest with 350 units. 300 machines are connected through the builder's own IoT gateway. Work orders have been linked to assets since a data migration in 2022, fault codes are picklists since 2024. Dealers in three countries service their own customers and report only warranty cases.

**The check.** The largest series shows 14 spindle replacements in four years, five of them with a coded cause, none from the dealer countries. That is too thin for a prediction anyone in dispatching would trust.

**The decision.**

1. **Usage-based intervals.** The IoT platform writes operating hours once a day to the asset. Maintenance work rules switch from every six months to every 2,000 operating hours. No Data 360 credits are needed for this.
2. **Three condition signals.** Spindle temperature, vibration and coolant pressure go to Data 360 as 15-minute aggregates: 2.6 million rows, 9,072 credits, about $45 a month. A threshold creates a work order.
3. **Booking by agent.** 250 visits a month at five actions each: 25,000 credits, about $125.
4. **History first.** Coded fault codes become mandatory for dealers as part of the warranty process. In 2028 the builder counts again.

The total is about 34,000 credits, roughly $170 a month. Connected Assets at $15,000 per org per month only pays off once the health score drives decisions the thresholds cannot.

## Where should you start?

1. **Count** corrective work orders per series and coded failure cause for the last three years.
2. **Close the gaps**: asset links, picklists for causes, reporting duties for dealers and service partners.
3. **Decide where raw data lives** and define which aggregates, counters and events go to Salesforce.
4. **Estimate credits per signal** before the first machine is connected, using [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).
5. **Ask Salesforce in writing** for the status and price of Asset Service Prediction in your edition.

How machine data, ERP and Salesforce fit together is part of my [integration architecture work](../../services/salesforce-integration/).

Predictive maintenance starts with a clean service history, and the sensors come second. If you want a second opinion on whether your data is ready, [send me a message](#contact).
