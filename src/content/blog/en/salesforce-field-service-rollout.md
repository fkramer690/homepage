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
  - "I always roll out Salesforce Field Service in waves, region by region or country by country. Each wave brings its own data, dispatchers, technicians and partners."
  - "The works council plays a role on two topics: what technicians can see of each other, for example in timesheets, and the technicians' location."
  - "Both topics belong on the table proactively, before the first wave starts, not once the app is already on the devices."
  - "Location tracking in the Field Service app can be set by interval and accuracy and switched off for single technicians. These settings belong in the talks with the works council."
  - "Different regions and countries have different conditions. Waves by country make it possible to adapt the configuration to the rules in each."
faq:
  - q: "What is the best way to roll out Salesforce Field Service?"
    a: "In waves, region by region or country by country. Each wave covers the master data, territories, dispatchers, technicians and partners of one region. The first wave is also the test for all others."
  - q: "Does the works council need to be involved in Field Service?"
    a: "In Germany, the works council has a right of co-determination under section 87 of the Works Constitution Act for technical systems that monitor employee behaviour or performance. Location data and time recording typically fall under it. Other countries have their own rules, so check with legal."
  - q: "Can location tracking in the Field Service app be limited?"
    a: "Yes. Interval and accuracy can be set, from about 10 metres to about one kilometre. Single technicians can be excluded, and with Appointment Assistant tracking can be limited to the En Route status."
  - q: "What belongs in a rollout wave?"
    a: "Clean master data for the region, set-up territories and scheduling policy, trained dispatchers and technicians, connected partners, agreements with the works council and data protection, and metrics measured before and after go-live."
draft: false
---

I always roll out Salesforce Field Service in waves, region by region or country by country. Each wave brings its own master data, dispatchers, technicians and partners, and the first wave is the test for all others. Then there is a topic that often comes up too late: the works council. It plays a role on what technicians can see of each other, for example in timesheets, and on the technicians' location. Both should be raised proactively. And different regions and countries have different conditions that need checking before each wave.

This is the last part of the series. The parts before describe what has to be in place in every wave: the decision in [part 1](../salesforce-field-service-worth-it/), master data in [part 2](../salesforce-field-service-master-data/), scheduling in [part 3](../salesforce-field-service-scheduling-automation/), spare parts in [part 4](../salesforce-field-service-spare-parts-erp/), contracts in [part 5](../salesforce-field-service-maintenance-contracts/) and partners in [part 6](../salesforce-field-service-service-partners/).

## Why in waves and not all at once?

Field Service changes the working day of dispatchers and technicians. A dispatcher who has worked with a planning board for years suddenly reviews proposals from an engine. A technician who wrote reports on paper documents in an app. That does not work for everyone at the same time.

A wave limits the risk. If skills or visiting hours are missing in the first region, it affects one territory and not the whole field service. The mistakes of the first wave become checkpoints for the next. There is also a practical reason: the master data from part 2 can be cleaned region by region. Whoever starts everything at once needs everything clean at once.

```praxis
In my Field Service projects with maintenance, breakdown jobs and commissioning, the stumbling blocks were in three places: asset data quality, technician acceptance and the ERP interfaces. All three are easier to get under control in one region than across the whole field service at once.
```

A wave should cover:

- the cleaned master data of the region: assets, skills, visiting hours, absences
- the territories and the scheduling policy, with dispatcher release as in part 3
- the partners of the region, as described in part 6
- training for dispatchers and technicians shortly before go-live
- the agreements with the works council and data protection for that country
- metrics measured before and after go-live

Leave room between two waves. The first weeks after a region goes live are when dispatchers change proposals often and technicians have questions about the app. Starting the next wave in that phase spreads the project team's attention too thin. It helps when dispatchers of the next wave watch the live region first. They learn more there than in any training. Why training alone does not get technicians to accept the app is covered in [Field Service app: getting technicians on board](../field-service-app-technician-adoption/).

## Which topics go to the works council early?

Field Service collects data about employees. Two topics played a role in my projects.

**Visibility among technicians.** Who sees whose appointments, working hours and timesheets? According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5), Field Service offers timesheets in which technicians record their time for a week or a month, including travel and breaks, with an approval process. Whether a technician sees colleagues' times and appointments, whether the team lead sees everyone and who approves is decided by sharing. That needs to be settled before it gets built.

**Location.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_resource_tracking.htm&type=5), the mobile app can send technicians' location to Salesforce regularly. It lands in the Last Known Location field on the service resource, and a history can be recorded if wanted. For scheduling that is useful, because the engine knows where a technician is. For the works council it is a tool that can make behaviour and performance visible.

The good news: the technology can be configured. This is what I would discuss with the works council in concrete terms:

| Setting | Room to adjust |
|---|---|
| Interval | How often the app sends the location, in minutes |
| Accuracy | Fine (about 10 m), medium (about 100 m) or coarse (about 1 km) |
| Exceptions | Single technicians can be excluded from tracking |
| Time window | With Appointment Assistant only in the En Route status, on the way to the customer |
| History | Whether old locations are stored or only the latest one |

On top come the skills and absences from part 2 and the voice input I describe in [Field Service Mobile: guided flows and voice](../salesforce-field-service-mobile-guided-voice/). That is employee data too.

In Germany, the works council has a right of co-determination under [section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html) for technical systems that monitor employee behaviour or performance. How that applies in a given case is for legal to decide.

```hinweis achtung
From a project point of view, timing matters most. Whoever talks to the works council only once the app is fully configured risks weeks of delay and a configuration that has to be rebuilt.
```

## Why do regions and countries differ?

An international field service does not have one legal situation but many. Co-determination, data protection and working time rules differ by country, sometimes also by region or site with its own employee representation. What takes a short alignment in one country needs a formal works agreement in another.

That argues for waves by country. Each wave checks the conditions of its country before it starts. The configuration has to support that: mobile settings can be assigned per profile, so that location tracking is active in one country and not in another. Set it up that way from the start, so the second country does not inherit the settings of the first. What each country needs beyond law and technology, from a sponsor in the country management to key users, is covered in [chapter 4 of the change management masterclass](../../masterclass/change-management/change-management-rollout-countries/).

## How do you measure the success of a wave?

Every wave needs numbers from before and after. I would take the ones that already came up in the series:

- the four numbers from part 1: jobs per day, share of travel time, skills and first-time fix rate
- the failed visits from part 2 and their causes
- the share of proposals the dispatcher changes before release, from part 3
- the response times met, from part 5

If the numbers do not improve in the first wave, in my view it is rarely the product. Usually data is missing, or scheduling still happens on the side. Which numbers to watch is covered in [Field Service KPIs after go-live](../field-service-kpis-after-go-live/).

## Where should you start?

For the first wave, pick a region with clean data, an open-minded service manager and a manageable size. Bring the works council into planning that wave, not only into its acceptance. And check the conditions of each country before every further wave, before you commit to dates.

That concludes the series.
