---
title: "Usage-based maintenance in Field Service: hours, not dates"
description: "Trigger maintenance in Salesforce Field Service by operating hours or counters: usage and criteria rules, where the counter comes from and which limits apply."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-usage-based-maintenance
translationKey: field-service-usage-based-maintenance
topic: field-service
categories: [field-service]
tags: [field service, maintenance plans, operating hours, assets, IoT, ERP]
takeaways:
  - "Usage is a rule type inside recordset filter criteria, used by a criteria-based work rule and set on maintenance assets only."
  - "A criteria-based rule creates no new work order while its previous one is open. Other rules on the same asset still can."
  - "Limits: 2,600 work orders per generation run, 2,000 assets with an RRULE COUNT. Salesforce recommends at most five rules per plan or asset."
  - "In my target architecture the counter is supplied by the ERP or IoT platform. Raw sensor data stays in the IoT platform or historian."
faq:
  - q: "Can Salesforce Field Service schedule maintenance by operating hours?"
    a: "Yes. A criteria-based maintenance work rule points to recordset filter criteria, which can contain either usage rules, such as a usage counter for operating hours, or general conditions on asset fields. When the threshold is reached, a work order is generated."
  - q: "How do I set up 2,000 hours or 12 months, whichever comes first?"
    a: "Either combine a usage counter rule and a usage duration rule with OR in one recordset filter criteria, or use two conditions on your own fields joined by OR: at least 2,000 hours since the last service or at least 12 months since the last service. Salesforce Help describes the second pattern with activations or months since the last overhaul."
  - q: "Which fields can recordset filter criteria not use?"
    a: "According to Salesforce Help, URL, multi-select picklist, encrypted and text area fields are not supported, and currency fields cannot define filter criteria. Counters belong in number fields."
  - q: "Do I need IoT for usage-based maintenance?"
    a: "No. The counter can be typed in by the technician, sent by the ERP or written by an IoT platform. How often it must be updated depends on how far a machine may run past the threshold: maximum usage rate times the delay until the work order exists."
draft: false
---

In Salesforce Field Service you trigger maintenance by operating hours with a criteria-based maintenance work rule that reads a counter on the asset instead of a calendar date. Its recordset filter criteria hold either usage rules, such as a usage counter with a frequency of 2,000 hours, or general conditions such as "hours since last service of 2,000 or more". When they are met, the rule creates a work order. In my target architecture the counter is supplied by the ERP or the IoT platform, and raw sensor data stays outside Salesforce.

## Calendar, usage or criteria: which trigger fits?

Most maintenance plans start with the calendar: inspection every six months. For machines that run one shift at one customer site and three shifts at another, that creates two problems. The light user receives visits it does not need, the heavy user waits too long.

Agentforce Field Service and Operations, still commonly called Salesforce Field Service, has two types of maintenance work rules, calendar-based and criteria-based, described on the help page on [preventive maintenance](https://help.salesforce.com/s/articleView?id=service.fs_preventive_maintenance.htm&language=en_US&type=5). Usage is not a third type but a rule type inside the recordset filter criteria a criteria-based rule uses:

| Trigger | Configured as | Typical use |
|---|---|---|
| Calendar | Work rule type calendar-based, interval in days, weeks, months | Statutory inspections, fixed contract dates |
| Usage | Criteria-based work rule with usage rules (usage counter, usage duration) | Operating hours, cycles, strokes |
| General criteria | Criteria-based work rule with conditions on asset fields | Thresholds, combined conditions, "whichever comes first" |

Recordset filter criteria define a saved set of conditions on asset fields, such as "operating hours since last service is greater than or equal to 2,000". The basics of maintenance plans, service contracts and entitlements are covered in [how to model maintenance contracts](/en/blog/salesforce-field-service-maintenance-contracts/).

## How does a usage-based rule work?

According to the help article on [usage-based maintenance](https://help.salesforce.com/s/articleView?id=sf.fs_create_usage_based_rfc.htm&language=en_US&type=5), you select Usage as the rule type in the recordset filter criteria and attach the criteria to a criteria-based work rule. "You can add usage-based maintenance rules to maintenance assets only", so they apply to each maintenance asset, not centrally to the plan. A usage counter rule reads a meter such as operating hours, with a frequency, a first occurrence and a usage rate; a usage duration rule counts elapsed time. The usage field may be a formula, the next occurrence field may not, because the system updates it.

Two schedule modes decide how the next due point is updated. With a fixed schedule, work orders follow strict intervals on the lifetime counter, so a late 5,000-hour service does not shift the 10,000-hour one. With a floating schedule, the next due point is the reading at completion plus the frequency, and that recalculation only happens when the work order status maps to the Closed or Completed category. Lead time and usage rate produce a suggested maintenance date before the threshold is reached. I test both modes in a sandbox with a few real counter readings before the first plan goes live.

```hinweis achtung
One common pitfall is combining rules. According to the help article on [criteria-based maintenance](https://help.salesforce.com/s/articleView?id=sf.fs_rfc_create_any_criteria.htm&language=en_US&type=5), a criteria rule and a calendar rule generate work orders independently of each other, even with the same suggested date. If you add a calendar rule "every 12 months" next to an hours rule, you may end up with two work orders for the same compressor in the same week. "Whichever comes first" should be modeled in one rule: either a usage counter and a usage duration rule combined with OR, where the earlier date applies, or general conditions joined by OR.
```

## A criteria-based rule waits while its own work order is open

For general criteria you create recordset filter criteria with conditions on standard or custom asset fields, choose whether all must be true or at least one, and attach them to a maintenance work rule of type criteria-based. Help's own example combines 60,000 activations or six months since the last overhaul with OR logic. That is exactly the "whichever comes first" pattern machine builders write into their service contracts.

Three Salesforce Help rules shape the design:

- **One open work order per rule.** While the work order generated by this rule is not completed, the rule does not create a new one; other independent rules on the asset can still do so. Cannot Complete, Canceled, Completed and Closed count as completed.
- **The condition must be reset.** If the condition is still true after completion, the next run creates another work order. Help's example: cumulative downtime rises from 982 to 1,024 hours, a work order is created, and because the value stays above 1,000, the next one follows. Compare the threshold against "hours since last service", and store the counter reading when the service was actually performed. Salesforce Help suggests the same approach: update a custom field when work orders are completed. The flow should react only to a status that indicates the work was performed, such as Completed, not to Canceled or Cannot Complete, which unblock generation even though no service was performed on the machine.
- **Field types.** URL, multi-select picklist, encrypted and text area fields cannot be used, and currency fields cannot be used to define filter criteria. Counters belong in number fields.

Help also mentions asset attributes as a way to track values such as activations since the last overhaul. The [AssetAttribute object](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm) was introduced in API version 53.0; Salesforce recommends at most 10 attributes per asset for usage-based maintenance, and offline briefcases do not include them. I explain why I use attributes for some values and fields for others in [Field Service asset hierarchy: how deep for a machine?](/en/blog/field-service-asset-hierarchy-machines/).

One permission detail: Salesforce requires matching full-access permissions and sharing rules for Maintenance Work Rule and Recordset Filter Criteria; otherwise, rules stop working for some users.

## Where does the counter come from?

Salesforce Help names three sources: manual maintenance, updates by an IoT platform, or an AppExchange integration. For a machine builder, that usually means:

- **The IoT platform** writes the operating hours of connected machines, for example once a day.
- **The ERP**, for example SAP, sends counter readings it already receives from the customer or from service reports.
- **The technician** reads the counter on site and enters it in the mobile app. For unconnected machines, this is usually the only source.

How often the value must be updated follows from the acceptable overshoot: maximum usage rate times the delay until the work order exists. A machine running 24 hours a day with a daily update and a daily generation run can exceed the threshold by about two days, which is acceptable for a 2,000-hour interval but not for a safety inspection. 800 daily updates for the connected units are usually manageable, but the interface still needs retries, bulk processing and an eye on automation that is triggered on every update. In my target architecture the raw time series stay in the IoT platform or historian, as described in [predictive maintenance in Salesforce: what data you need](/en/blog/predictive-maintenance-salesforce-data-needed/). Decide which source takes precedence when two sources disagree, for example when the technician reads 2,140 hours and the ERP still shows 1,980. Like every master data question, this requires one system of record per field, as discussed in [what data scheduling needs](/en/blog/salesforce-field-service-master-data/). The interface itself should be part of the [Salesforce integration](/en/services/salesforce-integration/) scope.

## The limits: 2,600 work orders per generation run

The [Field Service limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) that affect usage-based plans first:

```kennzahlen
2,600 | Work orders per maintenance plan and generation run; with one line item per asset the limit applies to the line items
2,000 | Maintenance assets, at most in a plan whose calendar rule ends with an RRULE COUNT
5 | Maintenance work rules per plan or asset, recommended by Salesforce (technical maximum 25,000 per plan)
365 days | Generation horizon, at most
source: Salesforce Help, Field Service limits
```

Salesforce Help gives 2,600 assets per plan as the practical limit, with less than 1,300 assets if there are two rules per asset and less than 650 if there are four. That simplification assumes one work order per rule and run; with a short recurrence over a long generation timeframe, which can be up to 20 years, the plan reaches 2,600 records much earlier. The COUNT limit concerns calendar rules such as "monthly, 24 times", not usage counters.

In practice I split plans by product series or service region. That gives each plan an owner and keeps generation runs manageable.

## Worked example: 1,200 compressors

The figures are hypothetical. A compressor manufacturer services 1,200 units in the field under contract. The contract says: service every 2,000 operating hours or every 12 months, whichever comes first. 800 units are connected, 400 are not.

**Data.** Each asset receives a number field for operating hours, a field for the reading at the last service and a date of the last service. One formula calculates hours since the last service, and a second formula calculates the months since the last service. The IoT platform writes the hours of the connected units every night. For the other 400, technicians enter the reading at every visit, and the 12-month condition covers them.

**Rule.** One criteria-based rule with two general conditions joined by OR. I chose custom fields over the native usage counter here because the 400 unconnected units have no reliable usage rate, and the same reset logic should apply to all of them. A flow writes the reading and the date to the asset when the work order reaches Completed, which resets both conditions; Canceled and Cannot Complete do not reset the conditions.

**Plans.** Three plans by region with about 400 assets each, so each regional service manager owns one plan.

**Effect.** Assume half the connected units run two shifts at about 4,000 hours a year: they receive two services a year instead of one. Single-shift units at 1,800 hours a year are governed by the 12-month condition. Compared with a fixed six-month calendar for all 1,200 units, that is 1,600 instead of 2,400 visits a year, and the heavily used compressors are still serviced on time.

## First step: one series with ten assets in a sandbox

Pick one series and write down the interval from the contract in one sentence. Check where the counter is maintained today and how often it is updated. Then model the fields, one criteria-based rule and the reset flow in a sandbox, and test with ten real assets before you roll out the setup to the whole series. The [masterclass chapter on assets, maintenance and parts](/en/masterclass/field-service/field-service-assets-maintenance-parts/) shows where this fits next to contracts, spare parts and service partners.
