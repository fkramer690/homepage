---
title: "Usage-based maintenance in Field Service: hours, not dates"
description: "Trigger maintenance in Salesforce Field Service by operating hours or counters: usage and criteria rules, where the counter comes from and which limits apply."
pubDate: 2026-10-28
lang: en
slug: field-service-usage-based-maintenance
translationKey: field-service-usage-based-maintenance
topic: field-service
categories: [field-service]
tags: [field service, maintenance plans, operating hours, assets, IoT, ERP]
takeaways:
  - "Salesforce Field Service triggers maintenance by operating hours through maintenance work rules that read a field on the asset instead of a calendar date."
  - "A usage-based rule reads a usage field on the asset, which may be a formula, and writes a next occurrence field, which may not be one, because the system updates it."
  - "Criteria-based rules use filter criteria such as downtime of 1,000 hours or more. While a generated work order is open, the rule creates no second one."
  - "Limits to plan for: at most 2,600 work orders and line items per generation run, 2,000 assets in a plan with a count rule, and no more than five rules per plan or asset."
  - "The counter comes from the ERP or IoT platform once a day. Raw sensor data stays outside Salesforce."
faq:
  - q: "Can Salesforce Field Service schedule maintenance by operating hours?"
    a: "Yes. Maintenance work rules can be usage-based or criteria-based. Both read values on the asset, such as an operating hours counter, and generate a work order when the threshold is reached."
  - q: "How do I set up 2,000 hours or 12 months, whichever comes first?"
    a: "Use one criteria-based rule with two conditions joined by OR: hours since the last service of 2,000 or more, months since the last service of 12 or more. Salesforce Help describes the same pattern with activations or months since the last overhaul."
  - q: "Which fields can recordset filter criteria not use?"
    a: "According to Salesforce Help, URL, multi-select picklist, encrypted and text area fields are not supported, and currency fields cannot define filter criteria. Counters belong in number fields."
  - q: "Do I need IoT for usage-based maintenance?"
    a: "No. The counter can be typed in by the technician, sent by the ERP or written by an IoT platform. A daily value is enough for maintenance intervals measured in hundreds of hours."
draft: false
---

In Salesforce Field Service you trigger maintenance by operating hours with maintenance work rules that read a counter on the asset instead of a calendar date. There are two variants. A usage-based rule reads a usage field on the asset, which may be a formula, and the system keeps a next occurrence field up to date. A criteria-based rule uses filter criteria, for example "cumulative downtime of 1,000 hours or more", and creates a work order when they are true. The counter comes from the ERP or the IoT platform once a day. Raw sensor data stays outside Salesforce.

## Calendar, usage or criteria: which trigger fits?

Most maintenance plans start with the calendar: inspection every six months. For machines that run one shift at one customer and three shifts at another, that is wrong twice. The light user gets visits it does not need, the heavy user waits too long.

Field Service knows three kinds of maintenance work rules, described on the help page on [preventive maintenance](https://help.salesforce.com/s/articleView?id=service.fs_preventive_maintenance.htm&language=en_US&type=5):

| Rule type | Reads | Typical use |
|---|---|---|
| Calendar-based | Interval in days, weeks, months | Statutory inspections, fixed contract dates |
| Usage-based | A usage field on the asset and a next occurrence field | Operating hours, cycles, strokes |
| Criteria-based | Recordset filter criteria on asset fields | Thresholds, combined conditions, "whichever comes first" |

Recordset filter criteria are a saved set of conditions on asset fields, such as "operating hours since last service is greater than or equal to 2,000". The basics of maintenance plans, service contracts and entitlements are covered in [how to model maintenance contracts](../salesforce-field-service-maintenance-contracts/).

## How does a usage-based rule work?

The rule points to two fields on the asset. The usage field holds the counter, for example operating hours. According to Help, it may be a formula, so you can calculate it from other asset fields. The next occurrence field holds the point at which the next maintenance is due. It may not be a formula, because the system updates it itself.

That means: one number field per counter type on the asset, filled from outside, plus one system-maintained field per rule. The overview page names the fields but does not spell out every step of the calculation, so I test it in a sandbox with a few real counter readings before the first plan goes live.

```hinweis achtung
One trap is combining rules. According to the help article on [criteria-based maintenance](https://help.salesforce.com/s/articleView?id=sf.fs_rfc_create_any_criteria.htm&language=en_US&type=5), a criteria rule and a calendar rule generate work orders independently of each other, even with the same suggested date. If you add a calendar rule "every 12 months" next to an hours rule, you can get two work orders for the same compressor in the same week. "Whichever comes first" belongs in one rule.
```

## How do criteria-based rules behave?

You create recordset filter criteria with conditions on standard or custom asset fields, choose whether all must be true or at least one, and attach them to a maintenance work rule of type criteria-based. Help's own example combines 60,000 activations or six months since the last overhaul with OR logic. That is exactly the "whichever comes first" pattern machine builders write into their service contracts.

Three rules from Help shape the design:

- **One open work order at a time.** While a generated work order is not completed, the rule creates no new one. Cannot Complete, Canceled, Completed and Closed count as completed.
- **The condition must reset.** If the condition is still true after completion, the next run creates another work order. Help's example: cumulative downtime rises from 982 to 1,024 hours, a work order is created, and because the value stays above 1,000, the next one follows. Compare against "hours since last service", and store the counter reading at completion, for example with a flow when the work order closes. Help suggests the same: update a custom field as work orders finish.
- **Field types.** URL, multi-select picklist, encrypted and text area fields cannot be used, and currency fields cannot define filter criteria. Counters belong in number fields.

Help also mentions asset attributes as a way to track values such as activations since the last overhaul. The [AssetAttribute object](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm) exists since API version 57.0. Why I use attributes for some values and fields for others is in [Field Service asset hierarchy: how deep for a machine?](../field-service-asset-hierarchy-machines/).

One permission detail: the Maintenance Work Rule and Recordset Filter Criteria objects need the same access and sharing, otherwise rules stop working for some users.

## Where does the counter come from?

Help names three sources: maintained by hand, updated by an IoT platform, or through an integration from AppExchange. For a machine builder that usually means:

- **The IoT platform** writes the operating hours of connected machines once a day.
- **The ERP**, for example SAP, sends counter readings it already gets from the customer or from service reports.
- **The technician** reads the counter on site and enters it in the mobile app. For unconnected machines, that is the only source.

A daily value is enough. A maintenance interval of 2,000 hours does not need minute-level data, and 1,200 counter updates a day are a small interface. The raw time series stay in the IoT platform or historian, as described in [predictive maintenance in Salesforce: what data you need](../predictive-maintenance-salesforce-data-needed/). Decide which source wins when two disagree, for example when the technician reads 2,140 hours and the ERP still shows 1,980. Like every master data question, this needs one leading system per field, as in [what data scheduling needs](../salesforce-field-service-master-data/). The interface itself belongs on the [Salesforce integration](../../services/salesforce-integration/) list.

## Which limits matter?

The [Field Service limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) that hit usage-based plans first:

```kennzahlen
2,600 | Work orders and line items combined, at most per maintenance plan and generation run
2,000 | Maintenance assets, at most in a plan with a count-based work rule
5 | Maintenance work rules per plan or asset, at most (Salesforce recommendation)
365 days | Generation horizon, at most
source: Salesforce Help, Field Service limits
```

Help gives 2,600 assets per plan as the practical limit, less than 1,300 with two rules per asset and less than 650 with four. The generation timeframe is at most 20 years.

In practice I split plans by product series or service region. That keeps every plan below the limits and gives each one an owner.

## A typical scenario, as an assumption: 1,200 compressors

A typical scenario, as an assumption: a compressor manufacturer services 1,200 units in the field under contract. The contract says: service every 2,000 operating hours or every 12 months, whichever comes first. 800 units are connected, 400 are not.

**Data.** Each asset gets a number field for operating hours, a field for the reading at the last service and a date of the last service. A formula calculates hours since the last service, a second one the months. The IoT platform writes the hours of the connected units every night. For the other 400, technicians enter the reading at every visit, and the 12-month condition carries them.

**Rule.** One criteria-based rule with two conditions joined by OR. A flow writes the reading and the date to the asset when the work order is completed, which resets both conditions.

**Plans.** Three plans by region with about 400 assets each, well below 2,600 work orders per run.

**Effect.** Assume half the connected units run two shifts at about 4,000 hours a year: they get two services a year instead of one. Single-shift units at 1,800 hours a year fall back to the 12-month condition. Compared with a fixed six-month calendar for all 1,200 units, that is 1,600 instead of 2,400 visits a year, and the heavily used compressors still get theirs on time.

## Where should you start?

Pick one series and write down the interval from the contract in one sentence. Check where the counter lives today and how often it is updated. Then model the fields, one criteria-based rule and the reset flow in a sandbox, and test with ten real assets before you move the whole series. The [masterclass chapter on assets, maintenance and parts](../../masterclass/field-service/field-service-assets-maintenance-parts/) shows where this fits next to contracts, spare parts and service partners.

Maintenance by operating hours needs one counter on the asset, one rule with OR logic and a reset at completion.
