---
title: "Field Service mobile offline: which data goes on the device?"
description: "Which records the Salesforce Field Service mobile app should hold offline for technicians in plant halls, how Briefcase Builder works and which gaps to test."
pubDate: 2026-10-28
lang: en
slug: field-service-mobile-app-offline-data
translationKey: field-service-mobile-offline
topic: field-service
categories: [field-service]
tags: [field service, mobile, offline, briefcase builder, manufacturing]
takeaways:
  - "Briefcase Builder decides what each technician group downloads. Performance priming syncs the most critical changes every five minutes."
  - "Salesforce documents gaps: tasks in a briefcase are not primed, and global quick actions get no record ID offline."
  - "Community licence users can get an error when opening an appointment, so every offline test needs a partner technician's user."
  - "The device holds appointment, work order, asset with history, van stock and manual. Price lists and every asset of a territory stay online."
  - "Salesforce gives no upper limit for records offline. Cut the briefcase by role and measure the sync."
faq:
  - q: "Does the Salesforce Field Service mobile app work offline?"
    a: "Yes. According to Trailhead the app has basic offline support out of the box. With Briefcase Builder an admin defines which records each group of workers downloads, and changes made offline are synced back when the device has a connection again."
  - q: "What is Briefcase Builder in Salesforce Field Service?"
    a: "Briefcase Builder is the setup page where you choose which records are available offline, for which users and with which filters. Performance priming uses these briefcases to download exactly the records and metadata a worker's profile needs."
  - q: "How often does the Field Service app sync offline data?"
    a: "With performance priming the app syncs the most critical changes every five minutes while the device is connected. Records changed offline are stored on the device and synced when the connection returns."
  - q: "Which offline problems should I test before go-live?"
    a: "Salesforce lists five: tasks in a briefcase are not primed, global quick actions get no record ID, community licence users can get a missing record error, Appointment Assistant can conflict with LWC Offline, and on iOS changed components load only after a cold start."
draft: false
---

The Salesforce Field Service mobile app should hold everything a technician needs for today's jobs and nothing beyond that: the service appointment, the work order with its line items, the asset with its recent history, the van stock and the manual for that machine. You define this per technician group in Briefcase Builder, and performance priming keeps it current every five minutes while there is a connection. What does not belong on the device are full price lists or every asset in the territory. Before go-live, test the documented offline gaps with a real internal technician and a real partner user, in a hall without network.

## What does the Field Service app keep offline?

The [Trailhead module on offline briefcases](https://trailhead.salesforce.com/content/learn/modules/offline-briefcase/allow-access-to-information-online) describes three layers.

- **Basic offline support.** The app works without network out of the box, with a limited set of records on the device.
- **Briefcases.** In Briefcase Builder an admin chooses objects, filters and the users or groups a briefcase applies to. Custom objects can go offline like any other record.
- **Performance priming.** It uses the briefcases to load exactly the records and metadata a worker's profile needs, holds more records than standard priming and syncs the most critical changes every five minutes.

Changes made offline are saved on the device and sent to Salesforce when the connection returns. Flows that reference records from the briefcase also run offline, which matters for forms and guided steps.

What Salesforce does not publish is a fixed number of records a device can hold. I found no official limit, so I would not plan with one. Size the briefcase by role and measure how long priming takes on a real device.

## Which data belongs on the device for a machine builder?

My rule: whatever the technician needs to finish the job and document it without calling the office goes offline. Everything else stays online, because every record has to be synced, and a heavy briefcase makes the morning sync slow.

| On the device | Why |
|---|---|
| Service appointments for today and tomorrow | The day's plan, including a job that moves to the next morning |
| Work order with line items and required parts | What to do and what to bring |
| Asset with the last work orders | Previous faults and repairs at this machine |
| Van stock (product items of the van) | Check and record parts used |
| Manual and service bulletins for this asset | Troubleshooting at the machine |
| Forms and service report templates | Documentation on site |

| Stays online | Why |
|---|---|
| Full price lists | Prices are set in the office or the ERP |
| Every asset in the territory | Thousands of records nobody opens today |
| Stock of all warehouses | The ERP owns it, the back office looks it up |
| Closed work orders older than a few months | Rarely needed, heavy to sync |

Van stock is easy to underestimate. A live lookup from the ERP does not work in the basement of a factory, as I described in [Field Service spare parts: ERP or Salesforce?](../salesforce-field-service-spare-parts-erp/). The copy of the van stock has to be in Salesforce and on the device.

Manuals need a second look. A troubleshooting agent finds the right manual only if every document carries the same product key as the asset, which is covered in [Field Service AI troubleshooting: fix the manuals first](../field-service-ai-troubleshooting-manuals/). The same key decides whether the briefcase can filter the right manual for the device. Whether the file itself opens without a network depends on how it is stored, so test it with a large PDF.

## Which offline gaps does Salesforce document?

The [considerations for LWC Offline in the Field Service mobile app](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sfs_gs_lwc_considerations.htm) list five known issues. They are easy to miss in a first test with an admin user, so I put all of them in the test plan.

1. **Tasks are not primed.** A Task object in a briefcase triggers an error during priming. The other objects are still primed. The fix is to remove tasks from the briefcase.
2. **Global quick actions get no record ID.** Started from a record page, they do not know which record the technician is looking at. A custom action that should work on the current work order belongs on the object, not in the global actions.
3. **Missing record error for community licence users.** When a user on a community licence opens a service appointment, the record can be missing.
4. **Appointment Assistant and LWC Offline.** Salesforce names a conflict that can result in missing URLs.
5. **iOS cold start.** Changes to Lightning web components load on iOS only after the app is fully closed and started again. A technician who never closes the app keeps the old version.

```hinweis achtung
Point 5 also matters for every release of your own components. Who tells 50 technicians to close the app completely after a deployment? This belongs in the release plan, together with the app versions Salesforce ships. I cover the routine for that in [Field Service app updates: how to test each release](../field-service-mobile-app-updates-testing/).
```

## Partner technicians test offline separately

Many manufacturers bring subcontractors into the same app. Partner technicians then work as community users with Field Service permissions, as described in [Field Service: how to bring in service partners](../salesforce-field-service-service-partners/). Point 3 of the list above hits exactly these users.

Partners also have different sharing. They see only their own territory and their own appointments. A briefcase that works for internal technicians can therefore deliver fewer records to a partner, or none of the related ones. My advice: give partners a briefcase of their own and test it with a real partner user, never with an admin who switches profiles.

## Worked example: a day without network

A machine builder sends a technician to a customer's production hall. The compressors stand in a basement, there is no mobile network from 7:00 to 16:00, and the customer's guest Wi-Fi does not reach down there.

- **7:00, in the car park.** The app primes three appointments for the day: annual maintenance of two compressors and a leak at a third. The asset history shows a replaced valve at the third compressor four months ago.
- **9:30, at the machine.** The technician checks the van stock for a seal kit, records it as consumed, fills in the inspection form and gets the customer's signature on the service report. Everything is saved on the device.
- **11:00, in the office.** The dispatcher adds a fourth job at the same customer. The technician does not see it, because the device has no connection. The dispatcher has to call the customer's site contact.
- **16:30, back in the car.** The app syncs. Consumption goes to Salesforce and through the interface to the ERP, the service report reaches the back office, and the fourth job appears.

The scenario shows what offline really means for planning. The device works, but the plan freezes at the last sync. Dispatchers need to know which technicians are in halls without network, and a short call is part of the process.

The service report in this scenario comes from Document Builder. Custom components in its template have to read their data offline as well. How that works is shown in [Document Builder: five limits and workarounds](../salesforce-document-builder-limits-workarounds/).

## Cut one briefcase per role

```schritte
Map roles to briefcases
  Internal technician, partner technician, supervisor. One briefcase per role, with filters on territory and date.
List the records per job type
  For annual maintenance, breakdown and commissioning, check what the technician opens on site. Leave out everything nobody opens.
Test in a real hall
  Prime in the morning, switch to airplane mode, run a full job with parts, form and signature, sync in the evening.
Run the five known issues
  Each one with internal and partner user, on iOS and Android.
Measure the sync
  Time for the morning priming and size on the device, with the briefcase of your busiest region.
```

Offline design decides whether forms and documents work later. The next step is the form itself, covered in [Field Service Data Capture: inspection forms without paper](../field-service-data-capture-inspection-forms/), and the whole topic is part of [chapter 3 of the Field Service masterclass](../../masterclass/field-service/field-service-mobile-app-documents/).
