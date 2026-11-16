---
title: "Field Service mobile offline: which data goes on the device?"
description: "Which records the Salesforce Field Service mobile app should hold offline for technicians in plant halls, how Briefcase Builder works and which gaps to test."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-mobile-app-offline-data
translationKey: field-service-mobile-offline
topic: field-service
categories: [field-service]
tags: [field service, mobile, offline, briefcase builder, manufacturing]
takeaways:
  - "Briefcases determine what each technician group downloads. Performance priming syncs important changes about every five minutes and the rest within 24 hours."
  - "Salesforce documents gaps: tasks in a briefcase are not primed, and global quick actions do not receive a record ID offline."
  - "Community license users can get an error when opening an appointment offline, so if partners are in scope, test with a partner technician's user."
  - "My target setup: appointment, work order, asset with history, van stock and manual on the device. Price lists and every asset of a territory stay online."
  - "Salesforce publishes limits ranging from 50,000 to 400,000 records per user, depending on the briefcase type. Plan well below them and measure the sync."
faq:
  - q: "Does the Salesforce Field Service mobile app work offline?"
    a: "Yes. According to Trailhead the app has basic offline support out of the box. With Briefcase Builder an admin defines which records each group of workers downloads, and changes made offline are synced back when the device has a connection again."
  - q: "What is Briefcase Builder in Salesforce Field Service?"
    a: "Briefcase Builder is the setup page where you choose which records are available offline, which users they are available to and which filters apply. Performance priming uses briefcases that Salesforce generates automatically for each profile, and it downloads the records and metadata a worker's profile needs."
  - q: "How often does the Field Service app sync offline data?"
    a: "With performance priming, important changes arrive about every five minutes while the device is connected. Other included data and objects without Change Data Capture are refreshed at least once every 24 hours. Records changed offline are stored on the device and synced when the connection returns, which can still fail on validation errors or wrong device time."
  - q: "Which offline problems should I test before go-live?"
    a: "For LWC Offline, Salesforce documents five considerations: tasks in a briefcase are not primed, global quick actions get no record ID, community license users can get a missing record error, Appointment Assistant can conflict with LWC Offline, and on iOS changed components load only after a cold start. Add sync errors, device time, flows that need uncached data and related records you open on site."
draft: false
---

The Salesforce Field Service mobile app should hold everything a technician needs for today's jobs and nothing beyond that: the service appointment, the work order with its line items, the asset with its recent history, the van stock and the manual for that machine. You define this per technician group with briefcases; performance priming brings important changes about every five minutes, the rest within 24 hours. Full price lists and every asset in the territory stay online. Before go-live, test the documented offline gaps in a hall without network coverage, with a real internal technician and, if partners use the app, a real partner user.

## What does the Field Service app keep offline?

The [Trailhead module on offline briefcases](https://trailhead.salesforce.com/content/learn/modules/offline-briefcase/allow-access-to-information-online) describes three layers.

- **Basic offline support.** The app works without a network connection out of the box, with a limited set of records on the device.
- **Briefcases.** In Briefcase Builder an admin chooses objects, filters and the users or groups a standard briefcase applies to. Custom objects can be made available offline like other records.
- **Performance priming.** It works with profile briefcases that Salesforce generates automatically, loads the records and metadata a worker's profile needs and supports more records than standard priming. According to the [help article](https://help.salesforce.com/s/articleView?id=service.wfs_mobile_work_with_performance_priming.htm&language=en_US&type=5), "important changes sync about every 5 minutes", other included data at least once a day. It needs Enterprise or Unlimited Edition, Winter '26 or later, app version 264 or later and Field Service Mobile licenses.

The product now runs as Agentforce Field Service and Operations; the app and much of the documentation still say Field Service.

Changes made offline are saved on the device and sent to Salesforce when the connection returns. That sync can fail: validation rules reject a record, a device clock set ahead causes "CreatedDate in future", and date fields show the sync time instead of the offline time unless Support enables accurate record dates, according to the [offline considerations](https://help.salesforce.com/s/articleView?id=service.mfs_offline_considerations.htm&language=en_US&type=5). Supported mobile flows can run offline if all the data and metadata they need are cached; if a flow needs additional data, it fails. When used offline, Data Capture creates and updates records only after the device is online again; this and other flow limits are listed in [Field Service mobile flow limitations](/en/blog/field-service-mobile-flow-limitations/).

Salesforce does publish limits. According to the [overview of briefcase types](https://help.salesforce.com/s/articleView?id=service.mfs_hvb_briefcase_types.htm&language=en_US&type=5), a standard briefcase primes up to 50,000 records per user, a profile briefcase for performance priming up to 100,000 unique records and a high-volume briefcase up to 400,000. Performance priming also caps a briefcase at 2,000 service appointments and 75,000 records per rule. I would plan well below these numbers and measure how long priming takes on a real device.

## Which data belongs on the device for a machine builder?

My rule, for a model where prices are set in the office: whatever the technician needs to finish the job and document it without calling the office goes offline. Everything else stays online, because every record has to be synced, and a heavy briefcase makes the morning sync slow.

| On the device | Why |
|---|---|
| Service appointments for today and tomorrow | The day's plan, including a job that moves to the next morning; a job entering the window can take up to 24 hours to arrive |
| Work order with line items and required parts | What to do and what to bring |
| Asset with the last work orders | Previous faults and repairs at this machine |
| Van stock (product items of the van) | Check and record parts used |
| Manual and service bulletins for this asset | Troubleshooting at the machine |
| Forms and service report templates | Documentation on site |

| Stays online | Why |
|---|---|
| Full price lists | Prices are set in the office or the ERP, unless technicians quote on site |
| Every asset in the territory | Thousands of records nobody opens today |
| Stock of all warehouses | In this model the ERP owns it and the back office looks it up |
| Closed work orders older than a few months | Rarely needed, heavy to sync |

Van stock is easy to underestimate. A live lookup in the ERP does not work in the basement of a factory, as I described in [Field Service spare parts: ERP or Salesforce?](/en/blog/salesforce-field-service-spare-parts-erp/). A copy of the van stock has to be in Salesforce and on the device.

Manuals need a second look. A troubleshooting agent finds the right manual only if every document carries the same product key as the asset, which is covered in [Field Service AI troubleshooting: fix the manuals first](/en/blog/field-service-ai-troubleshooting-manuals/). The same key determines whether the briefcase can filter the right manual for the device. Whether the file itself opens without a network depends on how it is stored, so test it with a large PDF. Do the same for related records such as line items and the asset's previous work orders: check on the device which screen, tab or flow makes them reachable offline, because a table like the one above is a target state, not a guarantee of what is primed.

## Which offline gaps does Salesforce document?

The [considerations for LWC Offline in the Field Service mobile app](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sfs_gs_lwc_considerations.htm) list five known issues. They are not a complete list of offline problems; the sync errors above are in addition to them. The five are easy to miss in a first test with an admin user, so I put all of them in the test plan.

1. **Tasks are not primed.** A Task object in a briefcase triggers an error during priming. The other objects are still primed. The fix is to remove tasks from the briefcase.
2. **Global quick actions do not receive a record ID.** Started from a record page, they do not know which record the technician is looking at. A custom action that should work on the current work order belongs on the object, not in the global actions.
3. **Missing record error for community license users.** When a user on a community license opens a service appointment, the record can be missing.
4. **Appointment Assistant and LWC Offline.** Salesforce describes a conflict that can result in missing URLs.
5. **iOS cold start.** Changes to Lightning web components load on iOS only after the app is fully closed and started again. A technician who never closes the app keeps the old version.

```hinweis achtung
Point 5 also matters for every release of your own components. Who tells 50 technicians to close the app completely after a deployment? This belongs in the release plan, together with the app versions Salesforce ships. I cover the routine for that in [Field Service app updates: how to test each release](/en/blog/field-service-mobile-app-updates-testing/).
```

## Partner technicians test offline separately

Many manufacturers bring subcontractors into the same app. Partner technicians then work as community users with Field Service permissions, as described in [Field Service: how to bring in service partners](/en/blog/salesforce-field-service-service-partners/). If partners are in scope, point 3 of the list above can affect exactly these users.

Partners also usually have different sharing, often limited to their own territory and appointments. A briefcase that works for internal technicians can therefore deliver fewer records to a partner, or none of the related ones. My advice: give partners a briefcase of their own and test it with a real partner user, never with an admin who switches profiles.

## Worked example: a day without network

A machine builder sends a technician to a customer's production hall. The compressors are in a basement, there is no mobile network from 7:00 to 16:00, and the customer's guest Wi-Fi does not reach down there.

- **7:00, in the car park.** The app primes three appointments for the day: annual maintenance of two compressors and a leak at a third. The asset history shows that a valve was replaced at the third compressor four months ago.
- **9:30, at the machine.** The technician checks the van stock for a seal kit, records it as consumed, fills in the inspection form and gets the customer's signature on the service report. The data is saved on the device.
- **11:00, in the office.** The dispatcher adds a fourth job at the same customer. The technician does not see it, because the device has no connection. The dispatcher has to call the customer's site contact.
- **16:30, back in the car.** The app syncs. Parts consumption is sent to Salesforce and through the interface to the ERP, the service document is generated and sent to the back office, and the fourth job appears, as long as no record is rejected during sync.

The scenario shows what offline really means for planning. The device works, but the plan freezes at the last sync. Dispatchers need to know which technicians are in halls without a network connection, and a short call is part of the process.

The service document in this scenario is generated with [Document Builder](/en/blog/salesforce-service-documents-document-builder/). The data and signature are captured offline, but the final PDF can depend on the sync completing, and custom components in its template have to read their data offline as well. How that works is shown in [Document Builder: five limits and workarounds](/en/blog/salesforce-document-builder-limits-workarounds/).

## Cut the briefcases by role

```schritte
Map roles to briefcases
  Internal technician, partner technician, supervisor. With standard briefcases, one per role with filters on territory and date; with performance priming the profile is the separation, so roles need matching profiles.
List the records per job type
  For annual maintenance, breakdown and commissioning, check what the technician opens on site. Leave out everything nobody opens.
Test in a real hall
  Prime in the morning, switch to airplane mode, run a full job with parts, form and signature, sync in the evening.
Run the known issues and conflict cases
  The five LWC considerations, plus a validation error at sync, a wrong device clock and an appointment changed in the office while the technician edits it. With an internal user and, if in scope, a partner user, on iOS and Android.
Measure the sync
  Time for the morning priming and size on the device, with the briefcase of your busiest region.
```

Offline design determines whether forms and documents work later. The next step is the form itself, covered in [Field Service Data Capture: inspection forms without paper](/en/blog/field-service-data-capture-inspection-forms/), and the whole topic is part of [chapter 3 of the Field Service masterclass](/en/masterclass/field-service/field-service-mobile-app-documents/).
