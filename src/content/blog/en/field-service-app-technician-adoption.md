---
title: "Field Service app: getting technicians on board"
description: "Why service technicians accept the Salesforce Field Service app or work around it, and what manufacturers should do before rolling it out to field service."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: field-service-app-technician-adoption
translationKey: change-technician-adoption
topic: field-service
categories: [field-service, change-management]
coAuthor: juliane
contactBrief: field-service
tags: [Field Service, adoption, change management, field technicians]
takeaways:
  - "Technicians accept the app when it takes work off their hands on site: asset history, spare parts and short forms instead of paper."
  - "In my projects, location tracking and who can see working hours data were the most sensitive topics. Raise them openly before setup, with the works council."
  - "An app that fails in a basement without a signal quickly loses the technicians' trust. Test the core job offline with primed data before the rollout."
  - "If feedback receives a quick, visible response and small fixes follow fast, word gets around. If nothing happens, the required field is filled with dots."
faq:
  - q: "Why do technicians reject a new Field Service app?"
    a: "In my projects, usually for three reasons: they fear more control, for example over their location; they see more documentation instead of less; or the app does not work reliably on site, for example without signal."
  - q: "Does the works council have to be involved in the Field Service app?"
    a: "Where a works council exists in Germany, location tracking, digital time recording and other technical means to monitor behavior or performance typically trigger co-determination, mainly under section 87(1)(6) of the Works Constitution Act. Review the exact scope for your planned configuration, and involve the data protection officer as well."
  - q: "How do you involve technicians early?"
    a: "Involve a small, representative group of technicians, including a skeptic and someone with little digital routine, who test forms and workflows on real jobs before the rollout and later remain the contacts in their region."
  - q: "How do you know whether technicians use the app?"
    a: "You can tell from service appointments or work orders completed in the app on time instead of entered later in the office, and from quality signals: rework in the back office, missing or invalid entries, sync errors, time until a service report is ready to send and phone calls to the office."
draft: false
---

Service technicians accept the Field Service mobile app when it takes work off their hands on site, and work around it when it mainly brings control and more documentation. That is why adoption is decided long before the rollout: by what the technician gets out of the app, by an open agreement on location tracking and hours with the works council, and by an app whose core job workflow also works with primed data in a basement without signal. In my experience, a small group of technicians who test all of this on real jobs beforehand is one of the most effective levers.

## Technician adoption is a topic of its own

Agentforce Field Service and Operations, formerly Salesforce Field Service, changes the working day of dispatchers and technicians. A technician who used to write reports on paper suddenly documents in an app. They see their appointments on the phone instead of on a note from the office, and they rightly wonder who can now see where they are.

Technicians are also a special group. They are rarely in the office, often attend training only once, and because they work under time pressure at the customer's machine, they have little room to troubleshoot unreliable software. Repeated failures on the first few jobs can quickly damage trust, especially without immediate support or a workaround, and that reputation can outlast the fix.

```praxis
In my Field Service projects with maintenance, breakdown jobs and commissioning, the stumbling blocks were in three places: asset data quality, technician acceptance and the interfaces with the ERP. All three are easier to get under control in one region than in the whole field service at once. That is why I prefer to roll out Field Service in waves, often region by region. I pick the first wave based on representative job types, controllable interfaces and few dependencies on other regions, because asset data and ERP interfaces are often central anyway.
```

## What keeps technicians from using the app?

In terms of the [ADKAR model](../change-management-salesforce-rollout/): in my Field Service rollouts, resistance showed up mostly around desire (the willingness to take part), while usability and offline problems limited ability (being able to do it in daily work). This table groups typical reasons; the stage is a starting point for the diagnosis, not proof:

| Reason | Stage | What helps |
|---|---|---|
| "Headquarters wants to see where I am" | desire | clarify location tracking openly, limit it, agree it with the works council |
| "I write more than before" | desire | short forms, prefilled data, only required fields someone needs |
| "Nothing works without signal" | ability | define offline data beforehand and test it in the basement |
| "This device is too slow, the documents too big" | ability | test on the actual devices with real technical documents |
| "I cannot find the feature" | knowledge | training on a real work order, technicians as key users in the region |
| "The update changed my workflow" | reinforcement | test releases in the beta program where possible and announce changes |

Willingness grows when the app delivers something. For a technician, that means in concrete terms: the asset history is visible on site, the right spare parts are known before the job, and the documentation is complete after the job instead of being written in the hotel at night. Offline, the final service report PDF is only generated once the device is back online. For an example of inspection forms without paper, see [Field Service Data Capture](../field-service-data-capture-inspection-forms/).

## How do you handle location and hours?

Where a works council exists, it plays a role in two topics: who can see and evaluate working, travel and break times, and the tracking of technicians' locations. Both should be raised proactively, before anything is set up. Interval and accuracy of location tracking in the Field Service mobile app can be configured, admins can exclude individual workers, and each user can withdraw the location permission in the phone's settings; iOS sends fewer updates in the background. The available settings are described in the [Field Service rollout](../salesforce-field-service-rollout/).

For adoption, openness matters more than the setting itself. A technician who learns from the works council what is tracked and why reacts differently from one who discovers it on a map in the office. With Appointment Assistant, tracking can be limited to the En Route status, so the location is only sent on the way to a job. The agreement also needs to define the purpose of tracking, who can access the data, which evaluations are not allowed and how long location history is kept; involve the data protection officer. This information belongs in the communication before the rollout, in plain words.

```hinweis achtung
Clarify location tracking and the visibility of working hours data with the works council before you set up the app in a region. An agreement after the fact costs weeks and the technicians' trust.
```

## How do you involve technicians before the rollout?

I recommend a small group of technicians per region who get involved before the rollout. Do not only pick enthusiasts: include a skeptic and someone with little digital routine, cover different devices and job types such as maintenance, breakdowns and commissioning, and include service partners if they use the app. In machinery manufacturing, that also means multiday commissioning with several technicians, serial numbers in deep asset structures, and safety and acceptance protocols with photos, readings and the customer's signature.

- **Test forms on real jobs.** An inspection form that looks logical from a desk can be useless in front of the machine, because the sequence does not match the workflow.
- **Check offline.** The group takes the app where there is no signal and reports which data is missing. What should be stored offline on the device is covered in [Field Service app offline](../field-service-mobile-app-offline-data/).
- **Train colleagues.** Experienced technicians explain the app more convincingly than a trainer from the project team, because they know the same jobs.
- **Remain contacts.** After the rollout they are the first points of contact in their region, like key users in inside sales. See [key users in Salesforce rollouts](../salesforce-key-user-network/).

It matters that this group can bring about real changes. If their feedback disappears in the backlog, they stop giving feedback.

## After the rollout every region needs a short way back

The first weeks after a region goes live are when technicians have the most questions about the app. During this phase the project team should be available rather than already starting the next region. After that, reinforcement counts: app updates can change workflows. Test major releases and relevant patches in the beta program, where a preview of about 30 days or 7 days is available, and define a separate response for emergency releases that come without a beta, as described in [testing Field Service app updates](../field-service-mobile-app-updates-testing/).

A short feedback route matters just as much. A technician who notices on site that a required field does not fit should be able to report it in a minute, ideally straight from the app or through their contact in the region. If the feedback is acknowledged and classified within a set time, small fixes follow quickly and larger ones receive a clear decision and date. Word spreads in the team, and that works better than a training session. If nothing happens, the required field is soon filled with dots.

The numbers show whether the app has caught on: service appointments or work orders completed in the app on time instead of entered later in the office, and service reports ready on the day of the job. Because required fields can force entries, add quality signals: rework in the back office, missing or invalid entries, sync errors and phone calls to the office. For how to set up such numbers, see [measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

## Win three to five test technicians in the first region

In the first region, find three to five technicians to start with who are willing to test the app on real jobs beforehand and together represent the team. Plan time for this in their schedule, otherwise they only test in their lunch break. In parallel, clarify location and hours with the works council, where one exists, and with the data protection officer, and write the result down in plain words. Then decide which forms and data technicians need on site, and drop the rest, even if a department at headquarters would like to have it.
