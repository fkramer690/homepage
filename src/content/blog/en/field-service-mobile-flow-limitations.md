---
title: "Field Service mobile flow limitations in Winter '27"
description: "Which screen flow features still fail in the Salesforce Field Service mobile app, from data table to IN operator, and what works in Data Capture instead."
pubDate: 2026-11-06
lang: en
slug: field-service-mobile-flow-limitations
translationKey: field-service-mobile-flow-limits
topic: field-service
categories: [field-service]
tags: [field service, mobile, flow, data capture, offline]
takeaways:
  - "The app runs two flow types. The classic Field Service Mobile Flow is still heavily limited, Data Capture has closed many gaps since Winter '26."
  - "No data table on mobile. For selecting several records, the Data Capture lookup and the repeater with a data source are the documented options."
  - "The classic type has no IN or NOT IN, no conditional visibility, no section and 25 formula functions without IF, AND or OR."
  - "Offline, NOW() returns the sync time, not the device time. Time fields without a date are not supported at all."
  - "Winter '27 moves mobile flows to a native runtime. Salesforce has not said which limits it removes, so test on the device."
faq:
  - q: "Can I use a data table in a Field Service mobile flow?"
    a: "No. Salesforce states that the Data Table screen component is not compatible with mobile devices, and it is not in the list of Data Capture components. For a selection of several records, use the Data Capture lookup component or a repeater with a collection as data source."
  - q: "Does the IN operator work in the Field Service mobile app?"
    a: "Not in flows of the type Field Service Mobile Flow: Salesforce lists In and Not In as unsupported. For Data Capture flows the documentation says nothing either way, so test it on the device before you rely on it."
  - q: "What is the difference between a Field Service Mobile Flow and a Data Capture flow?"
    a: "Both run in the Field Service mobile app. The Data Capture flow type needs Lightning Data Service, works offline as a form and supports conditional visibility, sections, repeaters, lookups and about 50 formula functions. The older Field Service Mobile Flow type has none of these."
  - q: "Do mobile flows still behave the same after Winter '27?"
    a: "Not necessarily. With Winter '27 flows in the app run on a native architecture, rolled out with patches 264 to 264.3, and the screens look like standard record forms. Salesforce has not updated its list of flow limitations for it, so retest every mobile flow."
draft: false
---

A screen flow that runs on the desktop often fails in the Salesforce Field Service mobile app, and which features fail depends on the flow type. The classic type Field Service Mobile Flow still has no data table, no IN or NOT IN operator, no conditional visibility, no section and only 25 formula functions without IF. The newer Data Capture flow has caught up a lot since Winter '26, with conditional visibility, sections, repeaters, a multi-record lookup and about 50 functions. Data table and Transform are missing in both. With Winter '27, mobile flows move to a native runtime, and Salesforce has not yet said which limits that removes.

## Two flow types run in the app, and they are not equal

When people say "mobile flow", they mean one of two process types in Flow Builder:

- **Field Service Mobile Flow.** The older type. Salesforce's [flow considerations for the mobile app](https://help.salesforce.com/s/articleView?id=service.mfs_flow_considerations.htm&type=5) list about 50 limitations for it.
- **Data Capture flow.** The form type for technicians. It needs Lightning Data Service, which Salesforce made mandatory for all orgs by Spring '26 ([Lightning Data Service for Field Service Mobile](https://help.salesforce.com/s/articleView?id=service.mfs_lightning_data_service.htm&type=5)), and it has its own [limitations page](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_limitations.htm&type=5).

Over the last four releases nearly every new flow feature for the app went into Data Capture. Apart from the new runtime in Winter '27, I found no new flow capability for the classic type in the release notes from Winter '26 to Winter '27. A screen flow from the desktop does not run at all: Salesforce writes that only Field Service mobile flows are supported. How Data Capture forms are built is covered in [Field Service Data Capture: inspection forms without paper](../field-service-data-capture-inspection-forms/).

```tabelle
title: What works in which flow type (help pages as of November 2026)
columns: Feature | Field Service Mobile Flow | Data Capture flow *
Data table | no | no
Transform element | no | no
IN / NOT IN | no | not documented
Conditional visibility | no | yes, not with collection variables
Section and columns | no | yes, since Summer '26
Repeater | not documented | yes, up to 30 rows
Formula functions | 25, no IF, AND, OR | about 50, with IF, CASE, TEXT
Global variables | 3 | 11
note: "Not documented" means the help pages say nothing either way. Transform is derived: Salesforce lists it only for screen, autolaunched and record-triggered flows.
```

## Why is there no data table in the Field Service mobile app?

The [Data Table component](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements_screencmp_data_table.htm&type=5) is not compatible with mobile devices, Salesforce says so in its own reference. It is also missing from the [list of Data Capture components](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_reference.htm&type=5). The classic type does not allow Lightning components on screens at all, apart from file upload, so a custom table component is out as well.

```praxis
In my Field Service projects this gap hurts most. Technicians often have to pick several records in one step, and on the desktop the data table does that with one tap per row.
```

Salesforce now documents two ways to select or work through several records in a Data Capture flow:

- **Lookup component (Spring '26).** The technician searches and selects one or more records, for example assets, also offline. The selection fills the flow variables.
- **Repeater with a data source (Summer '26).** A collection variable fills the rows in advance, and the technician checks or changes each row. The [Summer '26 release notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_data_capture.htm&release=262&type=5) name asset inspections and inventory items as examples. The limits: 30 rows, and a row cannot refer to values in another row. A loop after the screen does the cross-row checks.

Neither is a table with checkboxes. The lookup works well when the technician knows what to search for, the repeater when the list is known before the screen opens. In the classic type there is no good equivalent. Collection choice sets are not supported there, and a record choice set does not even keep the selected value: only the input component stores it.

## IN, Transform and formulas: logic has to be rebuilt

The classic type rejects the **IN and NOT IN operators**. The usual replacement is a decision with one condition per value, but a decision may have at most nine conditions in this type, and Get Records accepts neither OR nor custom logic. For longer value lists I would check with CONTAINS against a text that lists the values with a separator. For Data Capture the documentation does not mention IN at all. It only rules out "contains" for record, date and date/time collections in decisions.

**Transform** appears on no mobile page. The [Flow Elements reference](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements.htm&type=5) limits it to screen flows, autolaunched flows without a trigger and record-triggered flows. Both mobile types are separate process types and are not on that list. The replacement is a loop with assignments, and in the classic type collection assignments are limited to Add, Equal and Equals Count.

**Formulas** are the most common surprise. The classic type knows 25 functions: no IF, no AND or OR as functions, no TEXT, no TODAY, no ISPICKVAL. Logical operators must be written as `&&`, `||` and `==`. Data Capture supports about 50, including IF, CASE, TEXT, DATEVALUE and REGEX, but INCLUDES, HOUR, MINUTE and TIMEVALUE are missing there too.

```hinweis tipp
Test the classic type on the phone, not only in debug. Debug and a run on the desktop behave like a normal screen flow, so a formula with AND works there and fails only in the app. For Data Capture the debugger has run on the same offline engine as the app since Winter '26.
```

## Date and time behave differently offline

The date and time input itself is not the problem. Data Capture has its own Date & Time component with minimum, maximum and default value. The trouble starts around it:

- **NOW() offline.** According to the [offline considerations](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_offline_considerations.htm&type=5), NOW() in a date/time field returns the time the record synced, not the time on the device. A correct timestamp for records created offline needs the setting "Accurate Record Dates for Offline", which Salesforce Support switches on.
- **NOW() in validations.** Put it into a separate formula resource, otherwise the flow may use an old timestamp.
- **Time without a date.** The app does not support the Time data type at all ([supported data types](https://help.salesforce.com/s/articleView?id=service.mfs_data_types.htm&type=5)). Scheduled start and end and the arrival window of the service appointment are excluded as date/time fields too.
- **Bugs in 2026.** The [mobile patch notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_mobile_patch_notes.htm&release=264&type=5) list fixes for 12:00 AM being dropped (Android 260.2), a crash on dates outside the picker range (Android 262.3), a picker that ignored the time interval (iOS 262.2 and 262.3) and screen fields bound to $Flow.CurrentDateTime that did not load (Android 264.1).

If a technician reports a wrong time, check first whether the record was created offline and which app version was on the phone.

## What changes with native mobile flows in Winter '27?

Since [Winter '27](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_264_mobile_native_flows.htm&release=264&type=5), flows in the app run on a native architecture: faster loading, stronger offline support, screens in the design of the standard record forms. The rollout is gradual, depending on the instance with patch 264, 264.1, 264.2 or 264.3. The patch notes from June to September 2026 show how much changed underneath: record collections now render as a list, lookups keep their selection, and empty text fields are no longer sent as blank text, which could send a decision down the wrong path.

```hinweis achtung
Salesforce has not updated the flow limitations page for the native runtime. It still lists IN, sections and conditional visibility as unsupported. Whether the native runtime lifts any of these limits for the classic type is open. I will add the results here once I have tested these points on a device.
```

Until then I treat every mobile flow as untested after the switch. How to test app versions before they reach all technicians is described in [Field Service mobile app updates](../field-service-mobile-app-updates-testing/).

## First step: sort your mobile flows by type and test the gaps on a phone

List every flow the technicians start in the app and note its process type. Then work through it like this:

```schritte
List the flows
  Flow name, process type, which object starts it and whether it must work offline.
Check against the table
  Mark every element, operator and formula function the help pages exclude.
Move forms to Data Capture
  Flows that collect data and need visibility rules, sections or multi-record selection.
Test on both platforms
  On iOS and Android, online and in flight mode, with the patch version your users have.
```

Which records a flow can read offline is decided in the briefcase, see [Field Service mobile offline: which data goes on the device?](../field-service-mobile-app-offline-data/). Whether a flow is the right tool for a mobile process at all is part of the [solution architecture](../../services/salesforce-architecture/) I do for Field Service programmes.
