---
title: "Enhanced Scheduling and Optimization: switch now?"
description: "Should an existing Field Service org move to Enhanced Scheduling and Optimization? Limits, what disappears, what behaves differently and how to test it."
pubDate: 2026-10-28
lang: en
slug: field-service-enhanced-scheduling-optimization-switch
translationKey: field-service-enhanced-scheduling-eso
topic: field-service
categories: [field-service]
tags: [Field Service, Enhanced Scheduling, Optimization, Scheduling Console, Dispatching]
takeaways:
  - "New Salesforce orgs have Enhanced Scheduling and Optimization switched on for all service territories by default. Existing orgs can switch all territories at once or territory by territory."
  - "The enhanced engine raises limits that matter in manufacturing: 250 skills per service resource instead of 100, and 50,000 optimized appointments per rolling 24 hours or 500 per scheduling licence, whichever is higher."
  - "Scheduling recipes are not available with the enhanced engine; Salesforce points to the Fix Schedule Overlaps flow instead. Optimization Insights is replaced by the Optimization Hub."
  - "Several work rules treat empty fields differently, and an appointment without a territory gets candidates from all territories. Data quality decides how smooth the switch is."
  - "The new Scheduling Console is only available with Enhanced Scheduling and Optimization, so the engine decision also decides the dispatchers' screen."
faq:
  - q: "What is Enhanced Scheduling and Optimization in Salesforce Field Service?"
    a: "It is the newer scheduling and optimization engine of Field Service. It assigns service appointments to technicians by scheduling policy, like the older engine, but with higher limits, different handling of some work rules and predictive point-to-point travel. New orgs have it on by default."
  - q: "Can I switch to Enhanced Scheduling and Optimization for one territory only?"
    a: "Yes. According to the Field Service guide, existing orgs can switch all service territories or enable the enhanced engine per territory. That allows a pilot territory before the rest follows."
  - q: "What happens to scheduling recipes after the switch?"
    a: "Scheduling recipes are not available with Enhanced Scheduling and Optimization. Salesforce Help names the Fix Schedule Overlaps automated flow as the replacement, so recipes in use need a new design before the switch."
  - q: "Do I need Enhanced Scheduling and Optimization for the Scheduling Console?"
    a: "Yes. Trailhead states that the Scheduling Console is available only with Enhanced Scheduling and Optimization. Orgs on the older engine keep the Classic Dispatch Console."
draft: false
---

An existing Field Service org should move to Enhanced Scheduling and Optimization, but territory by territory and after a check of its data, not in one go. New orgs have the enhanced engine on for all territories by default anyway, and the new Scheduling Console only works with it. The switch brings higher limits, such as 250 skills per technician instead of 100. It also removes scheduling recipes and changes how several work rules treat empty fields. In my view the right order is: clean the data, rebuild the recipes, switch one pilot territory, compare proposals for four weeks, then switch the rest.

## What is Enhanced Scheduling and Optimization?

Enhanced Scheduling and Optimization, often shortened to ESO, is the newer engine behind scheduling in Salesforce Field Service. It does the same job as the older engine: it reads the scheduling policy, filters out technicians with work rules, ranks the rest with service objectives and books a slot. How that decision works is covered in [how much Field Service scheduling should be automatic](../salesforce-field-service-scheduling-automation/).

The [Summer '23 release notes](https://resources.docs.salesforce.com/244/latest/en-us/sfdc/pdf/salesforce_summer23_release_notes.pdf) describe the enhanced engine as available for new users by default. The current [Field Service guide](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/support_field_service.pdf) says it plainly: new orgs have Enhanced Scheduling and Optimization enabled for all service territories, and existing orgs can switch all territories or enable it per territory.

So the question is only open for orgs that went live with the older engine. For them nothing changes automatically. The engine keeps running as before until someone decides to switch, and without a deadline that decision tends to get postponed.

## Which limits change with the switch?

The [limits for Enhanced Scheduling and Optimization](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_limits.htm&language=en_US&type=5) in Salesforce Help list the numbers. These are the ones that matter for a machine or plant builder:

| Limit | Enhanced Scheduling and Optimization |
|---|---|
| Skills per service resource | 250, compared with 100 on the older engine |
| Optimized service appointments | 50,000 per rolling 24 hours or 500 per Field Service Scheduling licence, whichever is higher |
| Horizon for absences and appointment changes | 30 days; changes beyond it get no travel time or lunch break update |
| Service territories per scheduled job request | 100, or 1,000 with Dynamic Scaling |

The skills limit is the one I would look at first. A service technician at a machine builder often carries skills per machine series, per control system, per safety training and per language. With 100 skills that gets tight in larger product ranges. With 250 there is room.

The 50,000 appointments are rarely the bottleneck. A service organisation with 45 technicians stays far below that, and the figure applies until you have more than 100 scheduling licences. Consumption can be checked in Setup under Company Information.

The 30-day horizon matters for planned maintenance. If dispatchers book annual maintenance visits two months ahead, those bookings sit outside the window where the engine updates travel time. That is fine as long as optimization rearranges the plan once the appointments come into range.

According to the [considerations for Enhanced Scheduling and Optimization](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_considerations.htm&language=en_US&type=5), travel is calculated with point-to-point predictive routing, which needs map coverage in the regions where your technicians work. Optimization also needs no separate activation step, because it runs with a Platform Integration User.

## What disappears and what behaves differently?

Two things go away. Scheduling recipes, the automations that certain events trigger to solve overlaps in the schedule, are not available. Salesforce Help names the Fix Schedule Overlaps automated flow as the replacement. Optimization Insights is replaced by the Optimization Hub. If your dispatchers rely on recipes today, the replacement has to be designed and tested before the switch, not after it.

Then there are work rules that give different results with the same data. The same Help article lists them.

```vertiefung For admins
title: Which work rules behave differently?
- **Match Fields and Extended Match** handle empty fields differently.
- **Match Boolean** is not applied if the Boolean field on the service resource is empty.
- **Match Territory** treats an appointment with an empty territory field as open to resources from all territories.
- **Working territories**: secondary territory memberships are handled differently.
- **Match Skills** gets an additional "at least one skill matches" option.
- **Capacity-based resources** lose support for absences and resource efficiency.
- **In-day optimization** has a different run time.
```

Most of these points have one thing in common: empty fields. An appointment without a territory, a resource without a value in a checkbox field, a work order with a missing match field. On the older engine these gaps may have been harmless by accident. On the new one they lead to different candidates. That is why the switch is first a data project, and why I would start with the checks from [what data Field Service scheduling needs](../salesforce-field-service-master-data/).

One change helps manufacturers directly. Appointments that violate a rule could not be optimized on the older engine. With the enhanced engine, optimization can find an acceptable slot for them or drop them from the schedule.

## Why does the switch also decide the dispatcher console?

Salesforce now has two dispatcher screens: the Classic Dispatch Console with the familiar Gantt, and the new Scheduling Console. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console), the Scheduling Console is available only with Enhanced Scheduling and Optimization.

That links two decisions that look separate. An org that stays on the older engine also stays on the Classic Dispatch Console. New console features, such as AI explanations for proposed slots or multiday jobs shown as one connected job in Winter '27, then stay out of reach. Whether dispatchers should move now is covered in [the Field Service Scheduling Console: move dispatchers now?](../field-service-scheduling-console-dispatchers/).

## A typical scenario, as an assumption: one pilot territory first

Assume a machine builder with 45 technicians in five service territories, Field Service live since 2021 on the older engine, four dispatchers and two scheduling recipes for late appointments. All numbers are assumptions to show the method.

```schritte
Data check | 2 weeks
  A report lists appointments without a territory, resources with empty fields used in Match Fields or Match Boolean rules and technicians with secondary territory memberships. The result: 6 percent of open appointments have no territory, mostly breakdowns created from cases.
Rebuild recipes | 2 weeks
  The two recipes get rebuilt with the Fix Schedule Overlaps flow and tested in a full sandbox.
Pilot | 4 weeks
  One territory with nine technicians switches to the enhanced engine. Dispatchers note every proposal they change and why, as they did when automation was introduced.
Comparison
  If the share of changed proposals in the pilot territory is no higher than in the others, the remaining territories follow one per week.
```

The configuration for this, the territory setting, scheduling policies and work rules, consists of records rather than metadata. It belongs in the pipeline as described in the DevOps masterclass chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/), otherwise the tested sandbox state and production drift apart.

## Where should you start?

Start with three lists: appointments without a territory, work rules that read fields which are often empty, and recipes in use. They show how much work the switch is. Then pick the territory with the cleanest data as the pilot. How the engine fits into dispatching as a whole is covered in the masterclass chapter on [scheduling and dispatch](../../masterclass/field-service/field-service-scheduling-dispatch/).

For an org on the older engine, the switch is due as soon as the data is clean, because the new console and the higher limits only come with it.
