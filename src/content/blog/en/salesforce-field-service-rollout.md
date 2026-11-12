---
title: "Salesforce Field Service Implementation: Why in Waves?"
description: "Rolling out Salesforce Field Service in waves: what a wave contains, which topics go to the works council early and why every country has its own rules."
pubDate: 2026-10-27
lang: en
slug: salesforce-field-service-rollout
translationKey: field-service-rollout
topic: field-service
categories: [field-service]
series: { id: field-service, part: 7 }
tags: [Field Service, Rollout, Works council, Data protection, Manufacturing]
takeaways:
  - "Each wave includes its own data, dispatchers, technicians and partners. The first wave is the test for all others."
  - "With the works council, two topics dominated in my projects: what technicians see of each other and where they are. Show the council the whole system."
  - "Location tracking in the app can be configured by interval and accuracy, and switched off for individual technicians. These settings should be discussed."
  - "Each country has its own rules. Waves by country let you adapt the configuration to local requirements."
faq:
  - q: "What is the best way to roll out Salesforce Field Service?"
    a: "Roll it out in waves, region by region or country by country. Each wave covers the master data, territories, dispatchers, technicians and partners of one region. The first wave is also the test for all others."
  - q: "Does the works council need to be involved in Field Service?"
    a: "In Germany, as a rule yes. Under section 87 of the Works Constitution Act, the works council has a say in technical systems suitable for monitoring behavior or performance, and in working time rules, among other topics. Section 90 adds information and consultation on new work processes. Location data and time recording are typical topics; status times, KPIs and automated scheduling can be too. Other countries have their own rules, so check with legal."
  - q: "Can location tracking in the Field Service app be limited?"
    a: "Yes. Interval and accuracy can be set, from about 10 meters to about one kilometer. Individual technicians can be excluded, and with Appointment Assistant, tracking can be limited to the En Route status."
  - q: "What belongs in a rollout wave?"
    a: "Clean master data for the region, configured territories and scheduling policy, trained dispatchers and technicians, connected partners, agreements with the works council and on data protection, and metrics measured before and after go-live."
draft: false
---

I always roll out Salesforce Field Service in waves, region by region or country by country. Each wave includes its own master data, dispatchers, technicians and partners, and the first wave is the test for all others. Then there is a topic that is often raised too late: the works council. In my projects it mattered above all for what technicians can see of each other, for example in timesheets, and for their location. Both should be raised proactively, along with everything else the system records about technicians. Different regions and countries also have different conditions that need to be checked before each wave.

This is the last part of the series. The earlier parts describe what has to be in place in every wave: the decision in [part 1](/en/blog/salesforce-field-service-worth-it/), master data in [part 2](/en/blog/salesforce-field-service-master-data/), scheduling in [part 3](/en/blog/salesforce-field-service-scheduling-automation/), spare parts in [part 4](/en/blog/salesforce-field-service-spare-parts-erp/), contracts in [part 5](/en/blog/salesforce-field-service-maintenance-contracts/) and partners in [part 6](/en/blog/salesforce-field-service-service-partners/). The topic hub [Salesforce Field Service for manufacturers](/en/masterclass/field-service/) collects short answers to common questions about the product. If you want support for the rollout on the client side, independent of the implementation partner, the page [Salesforce Field Service consultant](/en/salesforce-field-service-consultant/) describes what I take on.

## The first wave is the test for all others

Field Service changes the working day of dispatchers and technicians. A dispatcher who has worked with a planning board for years suddenly reviews proposals from a scheduling engine. A technician who used to write reports on paper now documents work in an app. Such a change cannot be rolled out to everyone at the same time.

A wave limits the risk. If skills or visiting hours are missing in the first region, it affects one territory and not the whole field service. The mistakes of the first wave become checkpoints for the next. There is also a practical reason: the master data from part 2 can be cleaned region by region. Whoever starts everything at once needs everything clean at once.

```praxis
In my Field Service projects with maintenance, breakdown jobs and commissioning, the stumbling blocks fell into three areas: asset data quality, technician acceptance and the ERP interfaces. All three are easier to manage in one region than across the whole field service at once.
```

A wave should cover:

- the cleaned master data of the region: assets, skills, visiting hours, absences
- the territories and the scheduling policy, with dispatcher release as in part 3
- the partners of the region, as described in part 6
- training for dispatchers and technicians shortly before go-live
- the agreements with the works council and on data protection for that country
- metrics measured before and after go-live

Leave time between two waves. The first weeks after a region goes live are when dispatchers change proposals often and technicians have questions about the app. Starting the next wave in that phase spreads the project team's attention too thin. It helps when dispatchers from the next wave first spend time watching a region that is already live. They learn more there than in any training. Why training alone is not enough for technician adoption is covered in [Field Service app: getting technicians on board](/en/blog/field-service-app-technician-adoption/).

## Which topics go to the works council early?

Field Service collects employee data. Two topics were most important in my projects.

**Visibility among technicians.** Who sees whose appointments, working hours and timesheets? According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5), Field Service offers timesheets with an approval process, in which technicians record their time for a week or a month, including travel and breaks. Sharing settings determine whether a technician sees colleagues' times and appointments, whether the team lead sees the whole team and who approves timesheets. That needs to be settled before the sharing model is built.

**Location.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_resource_tracking.htm&type=5), the mobile app can regularly send technicians' location data to Salesforce. It is stored in the Last Known Location field on the service resource, and a history can be recorded if wanted. Scheduling uses it for specific cases, not for normal planning. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.pfs_emergency.htm&language=en_US&type=5), emergency dispatch calculates travel time from the last known location, as long as it is recent enough; otherwise it uses the last appointment or the home base. Regular travel time planning uses appointment addresses, previous appointments and the home base. For the works council, location tracking is a tool that can make behavior and performance visible. So ask which use case really needs it.

The technology can be configured. In concrete terms, I would discuss these settings with the works council:

| Setting | Room to adjust |
|---|---|
| Interval | How often the app sends the location, in minutes |
| Accuracy | Fine (about 10 m), medium (about 100 m) or coarse (about 1 km) |
| Exceptions | Single technicians can be excluded from tracking |
| Time window | With Appointment Assistant only in the En Route status, on the way to the customer |
| History | Whether old locations are stored or only the latest one |

Added to this are the skills and absences from part 2 and the voice input I describe in [Field Service Mobile: guided flows and voice](/en/blog/salesforce-field-service-mobile-guided-voice/). That is employee data too.

In Germany, co-determination extends beyond these two topics. [Section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html) covers, among others, technical systems suited to monitor behavior or performance, the start and end of working time and breaks, and rules of conduct. [Section 90](https://www.gesetze-im-internet.de/betrvg/__90.html) requires timely information and consultation on new technical systems, work processes and workplaces. So I would not present only a list of features to the works council, but the whole system, with a short check for each topic:

- What data about technicians does it record: location, status times, working time, skills, absences, voice input?
- Who sees it: colleagues, team lead, dispatcher, partner?
- Which evaluations are possible: KPIs, utilization, comparisons between technicians?
- What does the engine decide automatically, and who can override it?

How that applies in a given case is a matter for the legal team to decide.

```hinweis achtung
From a project point of view, timing matters most. Whoever talks to the works council only once the app is fully configured risks weeks of delay and a configuration that has to be rebuilt.
```

## Why do regions and countries differ?

An international field service is subject to multiple legal frameworks. Co-determination, data protection and working time rules differ by country, sometimes also by region or site with its own employee representation. What requires only a brief discussion in one country may require a formal works agreement in another.

That is an argument for waves by country. For each wave, check the conditions in that country before the wave starts. The configuration has to support that: mobile settings can be assigned per profile, so that location tracking is active in one country and not in another. Set it up that way from the start, so the second country does not inherit the settings of the first. Keep the number of such variants small, though, because profiles also carry permissions, and one profile per country and role quickly becomes hard to maintain. [Chapter 4 of the change management masterclass](/en/masterclass/change-management/change-management-rollout-countries/) covers what each country needs beyond legal and technical work, from a sponsor in country management to key users.

## How do you measure the success of a wave?

Every wave needs numbers from before and after. I would use the metrics already introduced in the series:

- the four numbers from part 1: jobs per day, share of travel time, skill and part mismatches and first-time fix rate
- the failed visits from part 2 and their causes
- the share of proposals the dispatcher changes before release, from part 3
- the share of response times met, from part 5

If the numbers do not improve in the first wave, in my view the cause is more often data or scheduling done outside the system than the product. I still check every possible cause: data, configuration, integration, adoption, process fit and product fit. If the product does not fit the type of field service, that is a finding like any other. The numbers to watch are covered in [Field Service KPIs after go-live](/en/blog/field-service-kpis-after-go-live/).

## First step: a region with clean data for the first wave

For the first wave, pick a region with clean data, an open-minded service manager and a manageable size. Involve the works council in planning that wave, not only when it is time to approve it. And check the conditions in each country before every subsequent wave, before you commit to dates.
