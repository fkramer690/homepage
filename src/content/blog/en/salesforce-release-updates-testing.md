---
title: "How to Test Salesforce Release Updates Before Enforcement"
metaTitle: "Salesforce Release Updates: Test Before Enforcement"
description: "Salesforce enforces release updates on a scheduled date. Which ones hit manufacturer orgs by summer 2027, as of November 2026, and how to test them properly."
pubDate: 2026-11-09
lang: en
slug: salesforce-release-updates-testing
translationKey: salesforce-release-updates
topic: release
categories: [devops]
tags: [Salesforce release, release updates, sandbox, integration, IT leadership]
takeaways:
  - "Many release updates offer a test run that switches the new behaviour on early. Not every test run can be switched off again."
  - "Marking an update as complete only records your progress. The change itself comes with the test run or with enforcement."
  - "As of November 2026, the updates with the highest risk for manufacturers hit integrations: SOAP login, the OAuth password flow and wrong instance URLs."
  - "For permission changes, a test as admin proves little. For login changes, only the integration user with a configuration equivalent to production counts."
  - "An interface update is done when the owner of the other side signs off with method, endpoint, test result and an abort condition."
faq:
  - q: "What is a Salesforce release update?"
    a: "A release update is a change to the Salesforce platform that Salesforce lists in Setup under Release Updates with a date or release. Until then you can test it, often with a test run; after it, Salesforce enforces it in every affected org according to its rollout plan."
  - q: "Can I postpone a Salesforce release update?"
    a: "Usually not. According to Salesforce, some release updates offer a limited self-service extension, but most do not, so check the update in Setup instead of planning on an extension."
  - q: "What is the difference between a test run and marking a release update as complete?"
    a: "The test run switches the new behaviour on in the org. Marking steps as complete only documents your progress and changes nothing in the org; the change becomes permanent when Salesforce enforces it."
  - q: "Which Salesforce changes affect integrations in 2027?"
    a: "As of November 2026: stricter SOAP login() from broad IP ranges from 31 January 2027 in production, the end of the OAuth username-password flow for connected apps on 20 February 2027, the end of support for incorrect instance URLs between January and March 2027, and the retirement of SOAP login() in API versions 31.0 to 64.0 with Summer '27."
draft: false
---

Salesforce release updates are platform changes that Salesforce lists in Setup under Release Updates with a date from which it enforces them in every affected org. Until then you decide when your org meets the change: test run in a sandbox, then production in a window you choose, with the process owners on hand. As of November 2026, the riskiest updates for manufacturers hit integrations: SOAP login needs a new permission from 1 December 2026 and stricter checks from 31 January 2027, the OAuth 2.0 username-password flow for connected apps ends on 20 February 2027, and Summer '27 retires SOAP login() in older API versions.

## What is a Salesforce release update?

A release update is a change Salesforce makes to the platform for security, performance or new behaviour, announced in Setup before it becomes mandatory. The [Release Updates page in Setup](https://help.salesforce.com/s/articleView?id=xcloud.release_updates_view.htm&language=en_US&type=5) sorts them into views such as Needs Action, Due Soon, Overdue and Archived. Each update explains what changes, who is affected and how it affects your org, and lists the steps with a date.

Four concepts are easy to mix up, and the difference decides what you can still undo, according to [Salesforce Help on release updates](https://help.salesforce.com/s/articleView?id=xcloud.release_updates_troubleshoot.htm&language=en_US&type=5):

```tabelle
title: Four concepts of a Salesforce release update to tell apart
columns: Concept | What happens in the org | Can you undo it?
Test run enabled | The new behaviour is on, ahead of enforcement | Often, with Disable Test Run, but not for every update
Steps marked complete | Nothing, it only records your progress | Not relevant
Enforced | Salesforce switches the change on for good | No *
Extension | The enforcement date moves for your org | Only some updates offer a limited self-service extension
note: Read in each update whether it has a test run and whether the test run can be switched off again.
```

Release updates are one of the six checks I recommend for every Salesforce release, next to release notes, regression test, interfaces, communication and the check after the upgrade. The whole sequence is in [Salesforce release schedule and what IT checks each time](../salesforce-release-schedule-what-it-checks/). This article goes deeper into release updates, because they are the check where Salesforce decides the result for you when you miss the date.

Dates move. The end of the OAuth password flow, first planned for the Winter '27 release, now has its own date, 20 February 2027, according to the [Salesforce knowledge article on the username-password flow](https://help.salesforce.com/s/articleView?id=005461279&language=en_US&type=1). The date that counts is the one in Setup of your production org, checked again shortly before each release.

## Which release updates hit manufacturer orgs by summer 2027?

Manufacturers rarely run Salesforce on its own. Installed base, spare part prices and order status come from the ERP, often via middleware, dealer portals log in through Salesforce and partners add packages. That is where the current changes hit. Two kinds are mixed in the list: release updates you can test early, and retirements you can only meet by migrating.

```tabelle
title: Changes for integrations up to summer 2027 (as of 9 November 2026)
columns: Change | Date | Kind | Where it hits manufacturers
SOAP login() needs Use Any API Auth | 1 Dec 2026 | release update | ERP middleware and data loaders with SOAP login *
SOAP login() from broad IP ranges needs token or mTLS; unused SOAP login is switched off | 15 Dec 2026 sandbox, 31 Jan 2027 production | security requirement | Integrations from a very broad login IP range, orgs with hardly any SOAP login *
OAuth username-password flow ends | 20 Feb 2027 | release update | Nightly syncs, reporting exports, older connectors *
Incorrect instance URLs in API calls no longer supported | Production from 12 Jan to 25 Mar 2027, by instance | release update | Middleware configs with a host name of an old instance
SOAP login() in API 31.0 to 64.0 retired | Summer '27 | retirement | Older connectors and scripts
API 31.0 to 40.0 unsupported, calls fail from Summer '28 | Summer '27 and Summer '28 | retirement | Interfaces nobody has touched in years
mark: integration
note: For release updates, check the date in Setup of your production org. For security requirements and retirements, check the linked Salesforce schedule.
```

The SOAP milestones are in the [Salesforce article on the SOAP login() retirement](https://help.salesforce.com/s/articleView?id=005132110&language=en_US&type=1): from 15 December 2026 in sandboxes and 31 January 2027 in production, calls from very broad trusted IP ranges need a security token or mutual TLS, and in orgs that had no SOAP login at all in the six months before, Salesforce switches SOAP login off once. That check counts the whole org: one regular SOAP caller keeps it on. If an annual inventory sync or a seasonal price upload is the only SOAP caller, it is at risk now; every remaining SOAP caller is at risk with Summer '27. The API versions follow the [API end-of-life policy](https://developer.salesforce.com/docs/platform/api-rest/guide/api-rest-eol.html): from Summer '27 versions 31.0 to 40.0 of the SOAP, REST and Bulk APIs get no fixes and no security updates, and from Summer '28 calls to them fail.

The instance URL change only affects calls to a host name of an instance your org no longer runs on, for example after an org migration. According to the [Salesforce end-of-support schedule](https://help.salesforce.com/s/articleView?id=005228941&language=en_US&type=1), most sandboxes were switched on 3 to 5 November 2026. So your sandboxes may already behave like production will in the spring. How to find every integration that still logs in with a password is in [Salesforce password integrations end in 2027](../salesforce-password-integrations-end-2027/).

One update from Winter '27 matters in service: [profile filtering](https://help.salesforce.com/s/articleView?id=release-notes.rn_permissions_profile_filtering_enforced.htm&language=en_US&type=5). Users only see their own profile name unless they hold a permission that allows more, such as View All Profiles. Review automation and components that read other users' profile names, for example in assignment to queues or technicians, and test them with the user they run as.

## Test runs only prove something with the affected identities

Who tests decides what the test proves. For permission changes such as profile filtering, an admin often holds exactly the permissions that keep the old behaviour, so the admin's test passes and the dispatcher's fails. For login changes, no user role helps: only the integration user with a client configuration equivalent to production shows whether the call still works. Same login method, same connector version, same security settings; credentials and target systems stay specific to the sandbox.

So every test run needs the identities that are affected. For a manufacturer these are usually the integration user of the ERP interface, a technician with the Field Service mobile app, a dealer user in the partner portal and a service agent. For each interface that uses one of the affected login paths, test the business case that runs through it, for example:

- if the installed base interface logs in via SOAP: force a new login, then transfer a new serial number from the ERP,
- if the spare part price check calls the ERP through middleware with the password flow: one price and availability query from a service case,
- if the dealer portal hands orders to the ERP through an old endpoint: one order from the portal until it arrives in the ERP.

One successful sync cycle is not enough. For interface updates, test the login, the business happy path, one error case, a new login after the session or token expires and at least one scheduled batch. Ask which jobs run only once a month or once a year, because they are the ones a test run in November does not see.

```schritte
Sort | week 1 · admin
  List every open update with its date and kind, and mark those that touch integrations or assignment.
Assign | week 1 · architect
  One owner per update, for interfaces also the owner of the other side.
Test | weeks 2 to 4 · key users and integration
  Test run in a sandbox, processes run as the affected identities, rare jobs included.
Switch on | before the date · operations
  Where available and the fallback is acceptable: test run in production in a monitored window, with an abort condition.
Watch | first week · operations
  Login history, middleware logs and the queues the update could affect.
```

Choose the sandbox by risk, not by type. What counts is configuration close to production, the same permissions, the same endpoint configuration in the middleware and data that represents your processes. A full copy is not always the best choice: it raises the effort for data protection, and external systems are often switched off or pointed elsewhere in it. Which sandbox is on the preview for the next release is covered in the [sandbox strategy with several partners](../salesforce-sandbox-strategy-multiple-partners/).

## Switch on in production on your date, before Salesforce enforces it

If an update offers a test run in production, the sandbox test passed and the impact and fallback are acceptable, enable it yourself in a monitored window before enforcement. Waiting for enforcement means the change lands on a date you do not control, often close to the release upgrade, and finding out whether a failure comes from the release or from the update takes longer.

```vergleich
without: Salesforce enforces on its date
- The change lands close to the release upgrade.
- Isolating whether a failure comes from the release or from the update is harder and slower.
- The integration owner learns about it from a failed sync.
with: You switch on in your window
- The date is in the team calendar and all owners are available.
- One change at a time, so the cause of a failure is clear.
- The abort condition and the fallback are written down beforehand.
```

For manufacturers with shifts and plants in several time zones, a night window is not automatically the best one. Pick the window in which the Salesforce owner, the integration owner and the business process owner are available, and the plant is not in its busiest hours. Before switching on, write down three things: what evidence shows the update works, which symptom stops it, and what you do then. If the test run cannot be disabled, plan containment or a fix forward instead of a rollback: correct the automation or permission in Salesforce, pause the affected interface or fix the client side. Decide per update which side that is, and have that owner on call.

## Interfaces and packages need a written sign-off from the other side

For updates that touch interfaces, the Salesforce admin cannot give the all-clear alone. SOAP login, password flow and endpoints are configured in the middleware, the ERP connector or the partner's package, not in Salesforce. A sign-off is only useful when it says what was tested:

```eintrag Sign-off for an interface update
System and owner | Which system calls Salesforce, who answers for it
Login | Method, integration user, client configuration
Endpoint and API version | My Domain URL, version in the connector
Test and result | Which cases ran, when, with which result *
Evidence | Login history or middleware log of the test
Abort condition | Which symptom stops the switch-on, who decides
note: For packages, ask the vendor for the same fields in writing.
```

The time for these tests comes from key users and integration owners who also have a day job, and that is where plans slip. My experience comes from acceptance testing in general, not from release updates in particular:

```praxis
In every project so far, UAT or the acceptance of stories took longer than the client planned, because the client's people were not available.
```

Book the key users' time for release update tests as soon as the date in Setup is known. How to organise acceptance with the business is described in [Salesforce UAT: business acceptance testing](../salesforce-uat-business-acceptance-testing/). Release updates belong in the same release rhythm I describe under [DevOps and release management](../../services/devops-release-management/).

```vertiefung For developers
title: How to find the callers behind an integration update
- Filter Login History by login type and API version to see which users log in via SOAP and with which version.
- Search middleware configuration, Named Credentials and scripts for host names of old instances and replace them with the My Domain URL.
- Search code and connector settings for the OAuth grant type "password".
- Grant Use Any API Auth via a permission set only to the integration users that still need SOAP login, and plan their move to OAuth with an external client app before Summer '27.
```

## First step: one list with an owner for every open release update

Open Setup in production, go to Release Updates and write every open update into one list with its date, kind, test run option and the processes it touches. Give each one an owner by name, and for interface updates add the owner of the other side. As long as the list is from November 2026, start with SOAP login: Use Any API Auth by 1 December, and the jobs that log in rarely before 31 January 2027.
