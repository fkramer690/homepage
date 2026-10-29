---
title: "Salesforce UAT: who tests before the release?"
description: "Who tests what in Salesforce user acceptance testing, how much time the business has to plan and when a release counts as approved, also with several partners."
pubDate: 2026-10-29
lang: en
slug: salesforce-uat-business-acceptance-testing
translationKey: salesforce-uat-business-testing
topic: release
categories: [devops, architecture]
contactBrief: partner-governance
tags: [UAT, acceptance testing, release management, partner governance]
takeaways:
  - "UAT (user acceptance testing) is the acceptance test by the business: it checks whether a feature fits the process, not whether the code works."
  - "The partner owes the technical test before UAT. If defects such as missing permissions or broken fields only show up in UAT, the system test was missing."
  - "Test cases come from the acceptance criteria of the user story, before anything is built, and they belong to the client."
  - "UAT runs in the Full Copy sandbox with test users per role, and a release is only approved once the business has agreed in writing."
faq:
  - q: "What is UAT in Salesforce projects?"
    a: "UAT stands for user acceptance testing. Business users check in a production-like sandbox whether a new feature reflects their process correctly before it goes to production."
  - q: "Who should run the acceptance test, the partner or the business?"
    a: "The business. The partner tests beforehand whether everything works technically. If the partner also runs the acceptance test, they are checking their own interpretation of the requirement."
  - q: "How long does UAT take?"
    a: "That depends on the size of the release. More important than the duration is that testers are really freed up for that time and do not test on the side."
  - q: "What happens to defects found in UAT?"
    a: "Every defect gets a severity. Blocking defects prevent the approval, smaller ones go into a later release with documentation. The business decides this rating, not the partner."
draft: false
---

In Salesforce UAT (user acceptance testing) the business checks whether a new feature reflects its process correctly. Whether code and configuration work technically has to be settled before that: the implementation partner owes this system test. Test cases come from the acceptance criteria of the user story, before anything is built, and they belong to the client. UAT runs in a production-like sandbox with test users per role. A release is only approved once the business agrees. With several partners, this separation is the most important lever to keep UAT from turning into a bug hunt.

## What is UAT, and what is it not?

A Salesforce programme has several kinds of testing that often get mixed up:

| Test | Who | Question |
|---|---|---|
| Developer test, Apex tests | developers, automatically in the pipeline | Does my building block work? |
| System test | partner | Does the feature work with the right permissions, data and interfaces? |
| Integration test | partner and ERP team | Does the data arrive correctly in the ERP and back? |
| UAT, acceptance test | business | Does the feature reflect our process? |
| Regression test | automated where possible | Does everything that worked before still work? |

UAT is the only stage in which the people who will later work with the system do the testing. That is why it is expensive to burden it with defects an earlier stage should have caught. When an inside sales rep discovers in UAT that they lack access to a field, the system test was missing. That costs a day of testing and trust in the project.

## Why does UAT with several partners so often turn into a bug hunt?

In many programmes partner deliveries are accepted without a technical review, and the problems only show up in UAT or in production. With several partners two effects add to that:

- **Everyone tests their own part.** Partner A tests the quoting process, partner B the order handover to the ERP. The path from quote to order in the ERP is first tested by the business in UAT.
- **UAT is the first shared state.** If every partner tests in their own environment, the changes only meet in the UAT sandbox. A [sandbox strategy with one shared integration environment](../salesforce-sandbox-strategy-multiple-partners/) brings that moment forward.

The solution is the same as for code quality: the client sets the rules, and every delivery is checked before it moves on. A feature only goes to UAT once the system test is documented and the [pull request review](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) has approved it.

## How does a UAT run?

A UAT per release follows these steps. The duration depends on the scope, so only the responsibility is listed here:

```schritte
Write test cases | before the build · business with product owner
  Test cases with starting data and expected result come from the acceptance criteria of every user story.
System test | before UAT · partner
  The partner tests every feature with the real roles and documents the result in the ticket.
Prepare UAT | a few days before · client
  Refresh the Full Copy, create test users per role, check test data and interfaces to the test ERP.
Acceptance test | fixed time window · business
  Testers run through the test cases and record defects with severity and screenshot.
Approval | end of the time window · business
  Go or no-go: blocking defects stop the release, smaller ones go into a later release with documentation.
```

Three points decide whether this works:

1. **Test users per role.** If you test as an administrator, you will not find permission problems. Every role from the [permission concept](../salesforce-permission-concept-permission-sets/) needs a test user with exactly its permissions.
2. **Real data volumes.** A report that loads in one second in an empty sandbox may take thirty with three million assets. That is why UAT runs in the Full Copy.
3. **Testers who are freed up.** Business users who test next to their daily work test the simplest path and stop as soon as it works. So whoever plans UAT also plans who takes over their work in the business during that time. Good testers are the key users who will be the first point of contact in their team after go-live. What else they do and how much time they need is in [Key users in Salesforce rollouts: what they do](../salesforce-key-user-network/).

## How much time does the business need to plan?

There is no fixed number, but there is a simple calculation. Count the test cases of the release, estimate the time per test case for running and documenting it, and multiply by the number of roles that have to run it. Add a buffer for retests, because every fix gets checked again. As an assumption: 40 test cases at 20 minutes each, two roles per test case, add up to about 27 hours, closer to four person days with retests. These days have to be in the testers' calendars before the release is planned, not afterwards.

## Who decides whether a defect stops the release?

The business rates the defects. The partner can judge how much work a fix is, but not whether inside sales can work without the field. I recommend three levels:

- **Blocking:** the process cannot be carried out without a fix. The release does not go live.
- **Major:** there is a workaround users can live with for a few weeks. The release goes live, the fix comes with the next release.
- **Cosmetic:** labels, order, colours. Goes into the backlog.

```hinweis offen
Write down in the partner contract what "accepted" means: who agrees, in which form, and which defect levels prevent acceptance. Otherwise a feature counts as accepted as soon as it runs in production.
```

## What can be automated?

UAT itself cannot be automated, because it is about the judgement of business users. What comes before and after it can be: regression tests for the most important processes that run with every release, and preparing the sandbox after a refresh. A good start are the five processes where most money is at stake, such as quote, order and invoice. The more of this the pipeline takes over, the more time testers have for the new features. This matters most for mobile apps in field service, because every app version can change how technicians work, see [testing Field Service app updates](../field-service-mobile-app-updates-testing/).

## Where do you start?

In your next release, separate system test and acceptance test. Ask the partner for a documented system test per feature before it goes into the UAT sandbox, and create test users per role. For the release after that, the business writes the test cases while the user stories are being refined.

UAT becomes short and meaningful when the business only tests what only the business can judge. If you want your release process with several partners reviewed, [send me a message](#contact) or read more about [partner governance](../../services/partner-governance/).
