---
title: "Field Service app updates: how to test each release"
description: "How manufacturers test new versions of the Salesforce Field Service mobile app with beta builds, debug builds and a fixed routine before technicians get them."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-mobile-app-updates-testing
translationKey: field-service-mobile-release-testing
topic: field-service
categories: [field-service, devops]
tags: [field service, mobile, release management, testing, beta]
takeaways:
  - "Besides three platform releases a year, the app has its own major, patch and emergency versions that reach technicians through App Store and Google Play."
  - "The beta program provides builds about a month before major releases and a week before patches; emergency fixes have no beta."
  - "Salesforce rolls out versions over several days, so technicians may run mixed versions for up to a week. That is a risk, not a test window."
  - "Each version gets eight scripted test cases on iOS and Android, with offline priming, a Data Capture form, the service report and a partner user."
  - "A pilot group running the beta for two weeks before each major version finds the problems that admins in the office miss."
faq:
  - q: "How often is the Salesforce Field Service mobile app updated?"
    a: "The app has major versions three times a year, such as 260.0 for Spring '26 and 264 for Winter '27, patch versions in between and emergency releases without a beta. In September 2026 alone Salesforce released patch 262.3 on 4 September and a further patch on 23 September."
  - q: "How do I get beta versions of the Field Service mobile app?"
    a: "Through the Field Service Mobile Beta and Early Adopters Program on Salesforce Developers. Beta builds are available one month before major releases and one week before as-needed patch releases. For 260.0 the beta only worked with Spring '26 sandbox orgs."
  - q: "Can I stop the Field Service app from updating on technicians' devices?"
    a: "Salesforce publishes the app through the App Store and Google Play and rolls it out over several days. For more control Salesforce points to mobile device management (MDM); clarify with the team that manages your devices what it can hold back. Do not hold back too long: from 18 January 2027 versions older than 264.1 face forced logouts."
  - q: "What should a test routine for a new app version cover?"
    a: "Login and resume after the app was in the background, offline priming and a full job without network, parts consumed, a Data Capture form, the service report with signature, your own components after a cold start and a partner user, on iOS and Android."
draft: false
---

A manufacturer should test every new version of the Salesforce Field Service mobile app before it reaches technicians, with three tools. The beta program provides builds one month before major releases and one week before patches. Debug builds let developers check their own components in a sandbox. And a fixed routine of eight scripted test cases on iOS and Android covers offline work, forms, the service report and a partner user. Emergency releases come without a beta, so they get a quick smoke test after release. The rollout runs over several days, which mixes versions but is no test window.

## How often does the Field Service app change?

The app has its own version numbers next to the platform releases: the major version 260.0 belonged to Spring '26, 264 to Winter '27. [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.mfs_updates_continuous_delivery.htm&language=en_US&type=5) names three release types: major releases three times a year, patch releases as needed and daily emergency releases, which have no beta. A few dates from the release posts in the Field Service Mobile group of the Trailblazer Community:

| Version | Beta | Release | Content |
|---|---|---|---|
| 260.0 (Spring '26) | 14 January 2026 | GA in March 2026 | Voice to Form GA, new Data Capture features, GIS mapping, startup progress |
| 262.3 (patch) | 26 August 2026 | 4 September 2026 | Login and startup fixes on iOS and Android |
| 262.3.1 iOS, Android e-patch | none named | 23 September 2026 | Further patch |
| 264.1 (Winter '27) | not named | October 2026 | Refresh token rotation; update required before 18 January 2027 |

The [262.3 post](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000pPWBC0A4) shows why patches matter. On iOS the app could log users out unexpectedly after it had been in the background, and a startup watchdog counted time in the background and caused false timeouts. On Android users could get stuck in the in-app browser during sign-in. These are exactly the errors that stop a technician at the customer's door.

Both posts add that Salesforce deploys major and patch releases over several days, and that updates may not reach all users until seven days after general availability. For a service organization this means for up to a week some technicians run the old version and some the new one. Salesforce does not promise that your pilot group gets the update first, so the rollout is no extra test window. With Winter '27 Salesforce also started moving mobile flows to a native runtime, so mobile flows belong in the test routine, see [Field Service mobile flow limitations](../field-service-mobile-flow-limitations/).

```hinweis tipp
Note the exact app version with every mobile ticket, together with platform, operating system, connectivity and reproduction steps. The version is shown in the app under Profile, Settings, About.
```

## The beta program and debug builds deliver versions early

The [Field Service Mobile Beta and Early Adopters Program](https://developer.salesforce.com/tools/field-service-mobile-beta) is open to customers. According to Salesforce, beta releases are available one month before major releases and one week before as-needed patch releases. The 262.3 dates match that: beta on 26 August, release on 4 September.

Two limits matter for planning. First, the beta is tied to the matching preview: according to the 260.0 post, that beta could only be used with Spring '26 sandbox orgs. Technicians cannot test it in their daily work against production. Second, Salesforce describes the beta as a way to test compatibility and prepare your own customisations ahead of the rollout to workers, so it belongs on test devices.

One date belongs in every calendar now: according to the [release note](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_264_mobile_refresh_token.htm&language=en_US&type=5), version 264.1 and later use refresh token rotation, and devices on older versions face periodic forced logouts from 18 January 2027, losing unsynced work.

Debug builds are the developers' tool. Salesforce offers them for major and patch releases, to test your own customisations in sandboxes. They run in the Android emulator or the iOS simulator, so they need a developer machine and not a technician's device.

## Which test routine should run for each version?

A good routine is short enough to run in half a day and covers the places where a version change breaks something. Mine has these steps, each on iOS and on Android:

1. **Update and login.** Update the app in place on a device with primed data and pending uploads, then sign in with single sign-on, put the app in the background for an hour, open it again.
2. **Offline priming.** Prime with a real technician profile, switch to airplane mode, open appointment, work order and asset history.
3. **Full job offline.** Record parts consumed from the van stock, change the status, add a photo.
4. **Data Capture form.** Fill a real inspection form, close it halfway, resume it, submit it.
5. **Service report or service document.** With classic service reports, capture the signature and preview offline, sync, then check the final PDF. With Document Builder, check the service document with its template, signatures and custom components.
6. **Your own components.** Close the app fully and restart, because on iOS changed Lightning web components load only after a cold start.
7. **Partner user.** Repeat steps 1 to 3 with a real partner user: Experience Cloud license, Field Service Mobile license, permission sets and sharing as in production.
8. **Back office and ERP.** After sync, check that consumption and report arrived, including the interface to the ERP.

Steps 2 and 7 come from the known offline gaps described in [Field Service mobile offline: which data goes on the device?](../field-service-mobile-app-offline-data/). Step 4 matters because Data Capture gets frequent feature and fix updates, see [Field Service Data Capture: inspection forms without paper](../field-service-data-capture-inspection-forms/). Step 5 with Document Builder tests the custom components in your templates, which I described in [Document Builder: five limits and workarounds](../salesforce-document-builder-limits-workarounds/).

Write the steps as scripts with expected results, the same way as test cases for a platform release. The [quality and tests chapter of the DevOps masterclass](../../masterclass/devops-release-management/quality-tests-reviews/) explains how such tests fit into quality gates.

## Who owns app versions and devices?

App versions sit between two teams. The Salesforce team knows the org and the customisations. Device management knows the devices, the operating system versions and the rules for app updates. Neither of them sees the whole picture alone.

I would make one person responsible for each app version, usually the release manager of the Salesforce program. That person follows the release posts, starts the beta test, collects results and decides together with device management whether anything has to wait. Operating system updates on the devices belong in the same plan, because a major iOS or Android update can change sign-in, background processing and offline behavior. Before each test cycle, compare the device fleet with Salesforce's list of supported operating systems.

The calendar for this is the same one that holds the platform releases. How to build it with freeze windows and preview sandboxes is covered in the [release planning chapter of the DevOps masterclass](../../masterclass/devops-release-management/release-planning-salesforce-releases/). What Winter '27 changed for pipelines is in [Salesforce Winter '27: what changes for your CI/CD pipeline](../salesforce-winter-27-what-changes-for-your-pipeline/).

## Worked example: eight pilot technicians

A machine builder runs 100 technicians, 70 on iPads and 30 on Android tablets, plus 15 partner technicians. The release manager sets up a pilot group of eight: five internal technicians on iOS, two on Android and one partner technician.

```schritte
Preview sandbox | before the sandbox preview cutoff · release manager
  The release manager makes sure a sandbox sits on a preview instance in time and loads test data from three typical machines. Once the beta arrives, about four weeks before the major version, the pilot devices get it.
Run the routine | weeks one and two of the beta · pilot technicians and developers
  The pilot technicians run the routine once a week, about two hours each time, on spare devices with the beta installed. Developers test the team's own components with debug builds in parallel.
Fix the findings | two weeks before release · developer
  In this scenario one custom component in the service report shows an empty field on Android. The fix goes into the next deployment before the app version reaches production.
Release | release week · pilot technicians
  The update rolls out over several days. The pilot technicians are the first contact for colleagues.
```

The effort is about 32 hours of technician time per major version, plus the release manager's time. One failed login wave across 100 technicians on a Monday morning costs more.

The other technicians should know before the update what changes for them and whom to ask. That is the same task as with every release for the back office, described in [Communicating Salesforce releases to the business](../salesforce-release-communication-business/).

## Sign up for the beta program

1. **Sign up for the beta program** and subscribe to the release posts of the Field Service Mobile group.
2. **Write the routine** as eight scripts with expected results, plus a short smoke test for emergency releases.
3. **Name the pilot group** with both platforms and at least one partner technician.
4. **Put app versions in the release calendar** next to the platform releases.
5. **Agree with device management** how app and operating system updates reach the devices.

App testing is part of [chapter 3 of the Field Service masterclass](../../masterclass/field-service/field-service-mobile-app-documents/). Setting up a release process that covers it belongs to my work in [DevOps and release management](../../services/devops-release-management/).
