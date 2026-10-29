---
title: "Field Service app: getting technicians on board"
description: "Why service technicians accept the Salesforce Field Service app or work around it, and what manufacturers should do before rolling it out to field service."
pubDate: 2026-10-29
lang: en
slug: field-service-app-technician-adoption
translationKey: change-technician-adoption
topic: field-service
categories: [field-service, change-management]
contactBrief: field-service
tags: [Field Service, adoption, change management, field technicians]
takeaways:
  - "Technician adoption is one of the stumbling blocks of every Field Service rollout, next to the data quality of assets and the ERP interfaces."
  - "Technicians accept the app when it takes work off their hands on site: asset history, spare parts and short forms instead of paper."
  - "Location tracking and the visibility of working hours are the most sensitive topics. They belong on the table openly before setup, with the works council."
  - "An app that hangs in a basement without signal loses the technicians' trust in the first week. Offline capability is tested before the rollout."
faq:
  - q: "Why do technicians reject a new Field Service app?"
    a: "Usually for three reasons: they fear more control, for example over their location, they see more documentation instead of less, or the app does not work reliably on site, for example without signal."
  - q: "Does the works council have to be involved in the Field Service app?"
    a: "In Germany, as a rule yes, as soon as the system can evaluate employees' behaviour or performance. In Field Service this mainly concerns location tracking and the visibility of hours and appointments."
  - q: "How do you involve technicians early?"
    a: "With a small group of experienced technicians who test forms and workflows on real jobs before the rollout and later remain the contacts in their region."
  - q: "How do you know whether technicians use the app?"
    a: "From work orders closed in the app instead of being entered later in the office, from completed forms and from feedback that comes from the site instead of by phone."
draft: false
---

Service technicians accept the Salesforce Field Service app when it takes work off their hands on site, and work around it when it mainly brings control and more documentation. That is why adoption is decided long before the rollout: by what the technician gets out of the app, by an open agreement on location tracking and hours with the works council, and by an app that also works in a basement without signal. A small group of experienced technicians who test all of this on real jobs beforehand is the most effective lever for that.

## Why is technician adoption a topic of its own?

Field Service changes the working day of dispatchers and technicians. A technician who used to write reports on paper suddenly documents in an app. They see their appointments on the phone instead of on a note from the office, and they rightly wonder who can now see where they are.

Technicians are also a special group. They are rarely in the office, often attend training only once and have little patience with software that does not work in front of the machine at the customer's site. If the app fails twice in the first week, the team considers it useless, and that reputation lasts longer than any defect.

```praxis
In my Field Service projects with maintenance, breakdown jobs and commissioning, the stumbling blocks were in three places: data quality of the assets, acceptance by the technicians and the interfaces to the ERP. All three are easier to get under control in one region than in the whole field service at once. That is why I roll out Field Service in waves, region by region.
```

## What keeps technicians from using the app?

In terms of the [ADKAR model](../change-management-salesforce-rollout/): with technicians, desire (the willingness to take part) and ability (being able to do it in daily work) are missing most often. This table sorts the typical reasons:

| Reason | Stage | What helps |
|---|---|---|
| "Headquarters wants to see where I am" | desire | clarify location tracking openly, limit it, agree it with the works council |
| "I write more than before" | desire | short forms, prefilled data, only required fields someone needs |
| "Nothing works without signal" | ability | define offline data beforehand and test it in the basement |
| "I cannot find the feature" | knowledge | training on a real work order, technicians as key users in the region |
| "After the update everything is different" | reinforcement | test app updates beforehand and announce them |

Willingness grows when the app delivers something. For a technician that concretely means: the asset history is visible on site, the right spare parts are known before the job, and the service report is finished after the job instead of being written in the hotel at night. What inspection forms without paper look like is in [Field Service Data Capture](../field-service-data-capture-inspection-forms/).

## How do you handle location and hours?

The works council plays a role in two topics: the visibility of technicians to each other, for example in timesheets, and the location of technicians. Both should be raised proactively, before anything is set up. Location tracking in the Field Service app can be configured in interval and accuracy and switched off for individual technicians. The available settings are in the [Field Service rollout](../salesforce-field-service-rollout/).

For adoption, openness counts more than the setting itself. A technician who learns from the works council that their location is only transmitted while travelling to a job reacts differently from one who discovers it on a map in the office. The agreement therefore belongs in the communication before the rollout, in plain words.

```hinweis achtung
Clarify location tracking and the visibility of hours with the works council before you set up the app in a region. An agreement after the fact costs weeks and the technicians' trust.
```

## How do you involve technicians before the rollout?

I recommend a small group of experienced technicians per region who work along before the rollout:

- **Test forms on real jobs.** An inspection form that looks logical at a desk can be useless in front of the machine, because the order does not match the workflow.
- **Check offline.** The group takes the app where there is no signal and reports which data is missing. What should be stored offline on the device is in [Field Service app offline](../field-service-mobile-app-offline-data/).
- **Train colleagues.** Experienced technicians explain the app more convincingly than a trainer from the project, because they know the same jobs.
- **Remain contacts.** After the rollout they are the first contacts in their region, like key users in inside sales, see [key users in Salesforce rollouts](../salesforce-key-user-network/).

It matters that this group can bring about real changes. If their feedback disappears in the backlog, they stop giving feedback.

## What happens after the rollout?

The first weeks after a region goes live are when technicians have the most questions about the app. During this phase the project team should be reachable and not already start the next region. After that, reinforcement counts: every app update can change workflows and should be tested beforehand, as described in [testing Field Service app updates](../field-service-mobile-app-updates-testing/).

A short way back matters just as much. A technician who notices on site that a required field does not fit should be able to report it in a minute, ideally straight from the app or through their contact in the region. If a visible change follows within two weeks, word spreads in the team faster than through any training. If nothing happens, the required field soon gets filled with dots.

Whether the app has landed shows in numbers: work orders closed in the app instead of being entered later in the office, completed forms and service reports on the day of the job. How to set up such numbers is in [measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

## Where do you start?

In the first region, find three to five experienced technicians who are willing to test the app on real jobs beforehand. In parallel, clarify location and hours with the works council and write the result down in plain words. Then decide which forms and data the technician really needs on site, and drop the rest, even if a department at headquarters would like to have it.

Technicians accept the app when it makes their day easier and they know what happens with their data. If you are rolling out Field Service to your technicians, [send me a message](#contact).
