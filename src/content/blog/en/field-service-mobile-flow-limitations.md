---
title: "Field Service mobile flow limitations: Winter '27 update"
description: "Which flow features are unsupported in the Salesforce Field Service mobile app, what Data Capture improves and which gaps still need a redesign."
pubDate: 2026-11-06
lang: en
slug: field-service-mobile-flow-limitations
translationKey: field-service-mobile-flow-limits
topic: field-service
categories: [field-service]
tags: [field service, mobile, flow, data capture, offline]
takeaways:
  - "The app runs two flow types. The classic Field Service Mobile Flow is still heavily limited; Data Capture has gained a feature in each release since Winter '26."
  - "There is no mobile data table and no equivalent replacement. The Data Capture lookup is the only documented way to pick several records."
  - "The classic type does not support IN or NOT IN, conditional visibility, or sections. IF(), AND() and OR() are missing, && and || work."
  - "Data Capture forms can be filled offline, but record changes are processed only when the device is back online."
  - "Winter '27 moves mobile flows to a native runtime. Salesforce does not say that the update removes any documented limit, so test every flow on the device."
faq:
  - q: "Can I use a data table in a Field Service mobile flow?"
    a: "No. Salesforce states that the Data Table screen component is not compatible with mobile devices, and it is not in the list of Data Capture components. The Data Capture lookup lets a technician select one or more records; a table with a checkbox per row has no standard equivalent."
  - q: "Does the IN operator work in the Field Service mobile app?"
    a: "Treat it as unsupported. Salesforce's mobile flow considerations list In and Not In as unsupported in the Field Service mobile app, without an exception for Data Capture, and the Data Capture page does not mention them. Model the check with individual conditions or move the logic to the back end."
  - q: "What is the difference between a Field Service Mobile Flow and a Data Capture flow?"
    a: "Both run in the Field Service mobile app. Data Capture needs Lightning Data Service and supports conditional visibility, sections, repeaters, lookups and 50 formula functions. The older Field Service Mobile Flow lacks these screen features and supports only 25 formula functions. In Data Capture, create, update, and delete operations run only once the device is online."
  - q: "Do mobile flows still behave the same after Winter '27?"
    a: "Not necessarily. With Winter '27, flows in the app run on a native architecture, rolled out in patches 264 through 264.3, and the screens look like standard record forms. The limitations page still lists the old restrictions, so retest every mobile flow."
draft: false
---

The Salesforce Field Service mobile app runs two flow types, and for new technician forms Data Capture is usually the better choice: it supports conditional visibility, sections, repeaters and a lookup for several records, and forms can be filled offline. Neither type has a data table for picking records from a list, and neither supports the IN operator. Offline, Data Capture collects the answers, but creates and updates records only once the device is online again. The classic Field Service Mobile Flow lacks most of these features. With Winter '27, both run on a new native runtime, so every existing mobile flow needs a retest on the device.

## Two flow types run in the app, and they are not equal

When people say "mobile flow", they mean one of two process types in Flow Builder:

- **Field Service Mobile Flow.** This is the older type. Salesforce's [flow considerations for the mobile app](https://help.salesforce.com/s/articleView?id=service.mfs_flow_considerations.htm&type=5) list its restrictions.
- **Data Capture flow.** This is the form type for technicians. It needs Lightning Data Service, which Salesforce made mandatory for all orgs by Spring '26 ([Lightning Data Service for Field Service Mobile](https://help.salesforce.com/s/articleView?id=service.mfs_lightning_data_service.htm&type=5)), and has its own [limitations page](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_limitations.htm&type=5).

In the Data Capture release notes from Winter '26 to Summer '26 I counted a new flow capability in every release. For the classic type I found none in the same period (as of November 2026). The standard Screen Flow process type is not supported in the app; only these two types are. How Data Capture forms are built is covered in [Field Service Data Capture: inspection forms without paper](../field-service-data-capture-inspection-forms/).

```tabelle
title: What works in which flow type (help pages as of November 2026)
columns: Feature | Field Service Mobile Flow | Data Capture flow *
Data table | no | no
IN / NOT IN | no | no, general app limitation
Transform element | not listed | not listed
Conditional visibility | no | yes, not with collection variables
Section and columns | no | yes, since Summer '26
Lookup for several records | no | yes, since Spring '26
Formula functions | 25, no IF(), AND(), OR() | 50, with IF(), CASE(), TEXT()
Global variables | 3 | 11
note: "Not listed": the Transform reference names only screen, autolaunched and record-triggered flows. I infer from that list that it is missing in both mobile types.
```

"Works offline" has three layers that are easy to mix up. The technician can open and fill a Data Capture form without a connection. The form can read only the records that are in the technician's briefcase. Create, update, and delete operations must be placed at the end of the flow and wait until the device is online, and they must target objects supported by the User Interface API. For a process that needs a new record on site, that last point matters more than a missing formula function.

## Why is there no data table in the Field Service mobile app?

The [Data Table component](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements_screencmp_data_table.htm&type=5) is not compatible with mobile devices; Salesforce says so in its own reference. It is also missing from the [list of Data Capture components](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_reference.htm&type=5). The classic type does not allow Lightning components on screens at all, apart from file upload, and Data Capture does not support custom Lightning web components either. A custom table is therefore not an option in either type.

```praxis
In my Field Service projects this gap hurts most. Technicians often have to pick several records in one step, and on the desktop the data table does that with one click per row.
```

There is no equivalent replacement. What Salesforce documents for Data Capture:

- **Lookup component (Spring '26).** The technician searches for one or more records, for example assets, and can select them offline too. This is the only documented multi-record selection. It works when the technician knows what to search for. It does not show a prepared list to tick off.
- **Repeater with a data source (Summer '26).** A collection prepopulates the rows, and the technician checks or edits each row. The repeater is meant for capturing data about several items, not for selecting them. A selection can be modeled with a checkbox per row and evaluated after the screen, with a limit of 30 rows.

Worked example: during annual maintenance on a packaging line, the technician has to mark which of eight assemblies were inspected and which need a follow-up job. On the desktop that is one data table with eight checkboxes. In Data Capture it becomes either eight lookup searches or a repeater with eight prefilled rows, each with a checkbox, plus a loop after the screen that collects the ticked rows.

In the classic type neither exists. Collection choice sets are not supported there, and a record choice set does not keep the selected value: only the input component stores it.

## IN, Transform and formulas: logic has to be rebuilt

The mobile flow considerations page lists the **IN and NOT IN operators** as unsupported in the Field Service mobile app. The same page names Data Capture as an exception for conditional visibility, but not for IN, and the Data Capture page does not mention IN at all. I treat it as unsupported in both types. A long list of values in a decision is a sign that the logic belongs in the back end or in a field that is set before the flow starts.

**Transform** does not appear on any mobile page, and the [Flow Elements reference](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements.htm&type=5) lists only screen, autolaunched and record-triggered flows for it. The replacement is a loop with assignments.

**Formulas** are the most common surprise. The classic type supports 25 functions. IF(), AND(), OR(), TEXT(), TODAY() and ISPICKVAL() are not among them; logical expressions work only with operators. Data Capture lists 50 functions, including IF(), CASE(), TEXT(), DATEVALUE() and REGEX(), but INCLUDES(), HOUR() and MINUTE() are missing there too.

```vertiefung For developers
title: Rules for the classic type that only show up on the phone
- Logical operators must be written as `&&`, `||`, `==` and `!=`; `AND`, `OR`, `=` and `<>` fail in the app.
- A decision may have at most nine conditions; Get Records accepts neither OR nor custom logic.
- Collection assignments are limited to Add, Equal and Equals Count.
- If you replace IN with CONTAINS on a list of values, put the separator around the list and around the search value, for example `;A1;A10;` and `;A1;`, otherwise A1 matches A10.
- A debug run and a desktop run behave like a normal screen flow, so a formula with AND works there and fails only in the app. For Data Capture the debugger has run on the same offline engine as the app since Winter '26.
```

```hinweis achtung
"Is Required" and the execution order of several forms are not enforced. According to a [Salesforce knowledge article from 15 September 2026](https://help.salesforce.com/s/articleView?id=005459773&language=en_US&type=1), a technician can submit a Data Capture form while leaving a required question blank and can complete forms in any order. Salesforce recommends adding a check to the work order or service appointment that blocks the status Completed until the form results exist.
```

For inspections and acceptance protocols, this is the limitation I would raise first with the service management team, because it determines whether completion is enforced or only requested on the screen. Whether a form is enough as proof for a customer or an authority is a separate question.

## Date and time behave differently offline

The date and time input itself is not the problem. Data Capture has its own Date & Time component with minimum, maximum and default value. The trouble starts around that input, and it helps to separate four points in time: when the work happened, when a formula was evaluated, when the record synced, and what the record's audit fields show.

- **NOW() offline.** According to the [offline considerations](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_offline_considerations.htm&type=5), NOW() in a date/time field returns the time the record synced to the server, not the time on the device.
- **Audit dates.** Created and last modified dates of records changed offline are correct only with the setting "Accurate Record Dates for Offline", which Salesforce Support switches on. It does not fix a business timestamp filled by NOW().
- **Time without a date.** The app does not support the Time data type at all ([supported data types](https://help.salesforce.com/s/articleView?id=service.mfs_data_types.htm&type=5)). Scheduled start and end times, as well as the arrival window of the service appointment, are excluded as date/time fields too.
- **Bugs in 2026.** The [mobile patch notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_mobile_patch_notes.htm&release=264&type=5) list fixes for 12:00 AM being dropped (Android 260.2), a picker that ignored the time interval (iOS 262.3) and screen fields bound to $Flow.CurrentDateTime that did not load (Android 264.1).

If the time of the work matters, capture it in its own field and decide whether the technician may enter it, the device sets it or the server assigns it. Then test that choice online and offline.

## What changes with native mobile flows in Winter '27?

Since [Winter '27](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_264_mobile_native_flows.htm&release=264&type=5), flows in the app run on a native architecture: faster loading, stronger offline support, and screens that match the design of the standard record forms. The rollout is gradual and depends on the instance, with patch 264, 264.1, 264.2 or 264.3. The patch notes from June to September 2026 show how much changed under the hood. Patches 262.2 and 262.3 alone fixed several defects in how empty and null values were passed on iOS and Android, some of which sent a decision down the wrong path.

```hinweis achtung
The current limitations page still lists IN, sections and conditional visibility as restrictions, and the native runtime release note does not say that any of them have been removed. Do not assume the native runtime lifts any of them. I will add the results here once I have tested these points on a device.
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
  Flows that collect data and need visibility rules, sections or a lookup for several records.
Test on both platforms
  On iOS and Android, online and in flight mode, with the patch version your users have.
```

Which records a flow can read offline is determined by the briefcase; see [Field Service mobile offline: which data goes on the device?](../field-service-mobile-app-offline-data/). In Field Service programs I work with the team to decide which mobile process belongs in Data Capture, in a mobile flow, in normal record editing or in the back end; that is part of my [solution architecture](../../services/salesforce-architecture/) work.
