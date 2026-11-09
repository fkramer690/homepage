---
title: "Salesforce UAT: who tests before the release?"
description: "Who tests what in Salesforce user acceptance testing, how much time the business has to plan and when a release counts as approved, also with several partners."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-uat-business-acceptance-testing
translationKey: salesforce-uat-business-testing
topic: release
categories: [devops, architecture]
contactBrief: partner-governance
tags: [UAT, acceptance testing, release management, partner governance]
takeaways:
  - "40 test cases at 20 minutes each with two roles add up to about 27 hours, or about four person-days with a 20 percent retest buffer."
  - "A documented system test is an entry criterion for UAT. The contract states who delivers it and who owns the end-to-end test across partners."
  - "UAT runs in a production-like sandbox with test users per business role. A release is only approved once the business has agreed in writing."
faq:
  - q: "What is UAT in Salesforce projects?"
    a: "UAT stands for user acceptance testing. Business users check in a production-like sandbox whether a new feature reflects their process correctly before it goes to production. The acceptance decision belongs to the business, not to the implementation partner."
  - q: "Who should run the acceptance test, the partner or the business?"
    a: "The business. The partner tests beforehand whether everything works technically. If the partner also runs the acceptance test, they are checking their own interpretation of the requirement."
  - q: "How long does UAT take?"
    a: "That depends on the size of the release. As a calculation: test cases times minutes per test case times the number of roles, plus a retest buffer. 40 test cases at 20 minutes with two roles come to about four person-days. More important than the duration is that testers are freed up for that time."
  - q: "What happens to defects found in UAT?"
    a: "Every defect gets a severity. Blocking defects prevent the approval, smaller ones go into a later release with documentation. The business rates the process impact, not the partner. IT and data protection also rate defects in permissions, privacy or data integrity."
  - q: "When is a Salesforce UAT complete?"
    a: "When all critical test cases have been run, no blocking defect is open, retests have passed and the business has approved the tested version in writing. Open major defects need an agreed date for the fix."
draft: false
---

In Salesforce UAT (user acceptance testing) the business checks whether a new feature reflects its process correctly. Whether code and configuration work technically has to be settled before that: the implementation partner delivers this system test, and the contract should say so. Test cases come from the acceptance criteria of the user story, before anything is built, and they belong to the client. UAT runs in a production-like sandbox with test users per business role. A release is only approved once the business agrees in writing. With several partners, this separation is the most important lever to keep UAT from turning into a bug hunt.

## What is UAT, and what is it not?

A Salesforce program has several kinds of testing that often get mixed up:

| Test | Who | Question |
|---|---|---|
| Developer test, Apex tests | developers, automated in the pipeline | Does my building block work? |
| System test | partner | Does the feature work with the right permissions, data and interfaces? |
| Integration test | partner and ERP team | Does the data arrive correctly in the ERP and back? |
| UAT, acceptance test | business | Does the feature reflect our process? |
| Regression test | automated where possible | Does everything that worked before still work? |

Business users can be involved earlier, for example in prototypes or demos. In UAT at the latest they test themselves and decide whether the feature fits their process. That is why it is expensive to burden it with defects an earlier stage should have caught. When an inside sales rep discovers in UAT that they lack access to a field, the system test was missing. That blocks planned test runs, ties up business time and costs trust in the project.

## With several partners, UAT often turns into a bug hunt

In many programs partner deliveries are accepted without a technical review, and the problems only show up in UAT or in production. With several partners two effects add to that:

- **Everyone tests their own part.** Partner A tests the quoting process, partner B the order handover to the ERP. The path from quote to order in the ERP is first tested by the business in UAT.
- **UAT is the first shared state.** If every partner tests in their own environment, the changes only meet in the UAT sandbox. A [sandbox strategy with one shared integration environment](../salesforce-sandbox-strategy-multiple-partners/) brings that moment forward.

So the client sets the rules, and every delivery is checked before it moves on. The path across several partners needs a named owner: a client-side test lead, a lead partner or the program management, who coordinates the end-to-end test and decides when UAT starts. A feature only goes to UAT once these entry criteria are met:

- The release candidate is fully deployed to the UAT sandbox, with a clear version.
- System and integration tests are documented and passed, and the [pull request review](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) has approved the code.
- Test users, test data and interfaces to the test ERP have been checked.
- Known defects are documented, and a short smoke test of the environment has passed.

## How does a UAT run?

A UAT per release follows these steps. The duration depends on the scope, so only the responsibility is listed here:

```schritte
Write test cases | before the build · business with product owner
  Test cases with starting data and expected result come from the acceptance criteria of every user story.
System test | before UAT · partner
  The partner tests every feature with the real roles and documents the result in the ticket.
Prepare UAT | before the test window · client
  Schedule the sandbox refresh, mask personal data, create test users per role, check test data and interfaces to the test ERP.
Acceptance test | fixed time window · business
  Testers run through the test cases and record defects with severity and screenshot.
Approval | end of the time window · business
  Go or no-go for the tested version, in writing: blocking defects stop the release, smaller ones go into a later release with documentation.
```

On the business side, three points decide whether this works:

1. **Test users per role.** If you test as an administrator, you will not find permission problems. Every business role from the [permission concept](../salesforce-permission-concept-permission-sets/), such as inside sales or service dispatcher, needs a test user with exactly its permissions: license, permission sets and sharing.
2. **Real data volumes.** A report that loads quickly in a nearly empty sandbox can be much slower with millions of assets. That is why UAT runs in a Full sandbox when data volumes and data relationships are complex. For a clearly scoped release, a Partial Copy sandbox with selected test data can be enough. A Full sandbox can only be refreshed every 29 days, and the refresh can take several days, so it belongs early in the release plan. If you copy production data, mask personal and confidential fields, especially when several partners have access to the sandbox.
3. **Testers who are freed up.** Business users who test next to their daily work test the simplest path and stop as soon as it works. So whoever plans UAT also plans who takes over their work in the business during that time. Good testers are the key users who will be the first point of contact in their team after go-live. What else they do and how much time they need is in [Key users in Salesforce rollouts: what they do](../salesforce-key-user-network/).

## How much time does the business need to plan?

There is no fixed number, but there is a simple calculation. Count the test cases of the release, estimate the time per test case for running and documenting it, and multiply by the number of roles that have to run it. Add a buffer for retests, because every fix gets checked again. As a worked example: 40 test cases at 20 minutes each, two roles per test case, add up to about 27 hours of pure test time. With a 20 percent retest buffer that is about 32 hours, or four person-days. Preparation and defect triage come on top. These days have to be in the testers' calendars before the release is planned, not afterwards.

## Who decides whether a defect stops the release?

The business rates the process impact of a defect. The partner can judge how much work a fix is, but not whether inside sales can work without the field. IT and data protection also rate defects in permissions, privacy or data integrity, such as a duplicate posting in the ERP; these are never cosmetic. I recommend three levels:

- **Blocking:** the process cannot be carried out without a fix. The release does not go live.
- **Major:** there is a workaround users can live with for a few weeks. The release goes live, the fix comes with the next release.
- **Cosmetic:** labels, order, purely visual differences that do not affect use or understanding. Goes into the backlog.

```hinweis offen
Write down in the partner contract what "accepted" means: who agrees, in which form, and which defect levels prevent acceptance. Otherwise you will argue later about whether go-live or use already counts as acceptance.
```

## Automation covers what comes before and after UAT

The acceptance decision stays with people, because it is about the judgment of business users. Much of what comes before and after it can be automated, for example with Apex tests and Flow tests in the pipeline: regression tests for the most important processes that run with every release, and preparing the sandbox after a refresh. A good start are the five processes where most money is at stake, such as quote, order and invoice. The more of this the pipeline takes over, the more time testers have for the new features. This matters most for mobile apps in field service, because new app versions, operating system updates and changed offline settings can change how technicians work, see [testing Field Service app updates](../field-service-mobile-app-updates-testing/).

## Separate system test and acceptance test in the next release

In your next release, separate system test and acceptance test. Ask the partner for a documented system test per feature before it goes into the UAT sandbox; that rule belongs in your [partner governance](../../services/partner-governance/). Create test users per role. For the release after that, the business writes the test cases while the user stories are being refined.
