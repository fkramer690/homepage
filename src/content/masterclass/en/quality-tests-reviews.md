---
title: "Salesforce quality: tests, reviews and quality gates"
description: "Which checks every Salesforce change must pass: mandatory reviews, Apex tests beyond 75 percent, flow tests, Code Analyzer and quality gates that block."
lang: en
slug: quality-tests-reviews
course: devops
translationKey: devops-06
chapter: 6
pubDate: 2026-10-28
short: "Quality, tests, reviews"
summary: "Which reviews, tests and automated checks every change must pass before it is merged, for code and for flows."
takeaways:
  - "A quality gate is a check that technically blocks a merge or a deployment while it is red; a report nobody has to read is not a gate."
  - "Salesforce requires 75 percent Apex coverage for production and, in the same guide, advises not to focus on the percentage; asserts, bulk tests and runAs count for more."
  - "Flows are automation just like Apex: flow tests, the Flow Scanner in Code Analyzer and the coverage threshold for flows deployed as active belong in the same pipeline."
  - "Code Analyzer only fails a run when you set --severity-threshold; without a threshold the pipeline stays green, whatever the report says."
  - "The client sets thresholds, rule sets and exceptions, and only the client's release manager changes them, the same for every partner."
articles: [pull-request-reviews-enterprise, quality-gates-ai-code-pipeline, reviewing-ai-generated-salesforce-code, api-67-user-mode-apex]
faq:
  - q: "Is 75 percent test coverage enough for a Salesforce release?"
    a: "For the deployment, yes; for quality, no. Salesforce itself says not to focus on the percentage. In the review, check that tests have real asserts, negative cases, a bulk case with at least 20 records and a run as a restricted user."
  - q: "Can Salesforce flows be tested automatically?"
    a: "Yes. Record-triggered and autolaunched flows can have flow tests, stored as the FlowTest metadata type and run by the Salesforce CLI with sf flow run test. For deploying a flow as active, Salesforce Help says coverage from Apex tests is what counts."
  - q: "Who may change thresholds and exceptions in the quality gates?"
    a: "Only one person on the client side, typically the release manager. If a partner changes thresholds or switches off rules to deliver faster, the gates lose their value for every other team."
  - q: "Do I need a commercial DevOps tool for quality gates?"
    a: "No. Salesforce Code Analyzer, validation deployments and the branch protection of your Git platform cover the core, and sfdx-hardis bundles them as open source. Gearset, Copado and Flosum offer the same with a web interface, their own rule sets and vendor support."
draft: false
---

Every Salesforce change should pass the same checks before it is merged, and every check must be able to block it. That means a mandatory review by a person, a validation deployment with Apex tests that prove more than 75 percent coverage, flow tests for the most important automations, and static analysis with Salesforce Code Analyzer including a threshold. The client sets the rules, thresholds and exceptions, the same for every partner. sfdx-hardis provides these gates as open source, Gearset, Copado and Flosum as commercial platforms. AI-generated code goes through the same gates, without exceptions.

## What is a quality gate in a Salesforce pipeline?

A quality gate is an automated or human check that holds a change back until it passes. The holding back is what matters: a report with 300 findings that does not block the merge changes nothing about the release. [Chapter 5](../building-the-pipeline/) showed how a pull request moves through the pipeline and which Apex test level belongs where. This chapter covers what gets checked at each station and who sets the bar.

I order gates by cost, cheap ones first:

```schritte
Static analysis | Runs in minutes
  Check Apex, Lightning Web Components and flows.
Validation deployment
  Against the target org, with Apex tests and coverage.
Flow tests
  For the critical automations.
Review
  By a person who only sees changes that have passed steps 1 to 3.
```

Your Git platform does the blocking. On GitHub, a protected branch can require, according to the [documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), a set number of approvals and passing status checks. I would switch on two options in every programme with several partners: approvals are dismissed when new commits arrive, and "Do not allow bypassing the above settings", because without it the rules do not apply to administrators. If partners have admin rights on the repository, branch protection is otherwise just a suggestion.

## Why are reviews mandatory, even with good automation?

Tools check rules. Whether a change fits the architecture, whether a new field is really needed, or whether a trigger collides with another team's flow is something only a person who knows the org can see. That is why, for me, every pull request without approval is blocked, no exceptions. The reasoning, and how to introduce reviews without slowing down, is in [why pull request reviews are a must](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).

For the roles from [chapter 2](../release-process-ownership-roles/), that means:

- **Partners review each other** for changes within their own area.
- **The client-side architect approves** anything touching the data model, sharing, permission sets or SAP integrations. On GitHub you enforce this with code owners: a file with a code owner needs that owner's approval.
- **The release manager** owns thresholds and rule sets and is the only one who changes them.

Flows, page layouts and permission sets belong in the review just like Apex. In service and Field Service orgs in particular, a large share of the business logic sits in flows built by the partners' admins. A review that only looks at code misses that half.

## Apex tests: why 75 percent is only the floor

For a production deployment, the [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/api/apex_testing_intro.htm) requires tests to cover at least 75 percent of Apex code, all tests to pass and every trigger to have some coverage. The same documentation also says, in its [testing best practices](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/api/apex_testing_best_practices.htm): "don't focus on the percentage of code that is covered." Coverage measures which lines ran, not whether the result is right.

What I want to see in the definition of done instead is almost word for word in the same guide:

- **Real asserts** using the methods of the `Assert` class to check business behaviour.
- **Positive and negative cases**, valid and invalid inputs.
- **Bulk tests with at least 20 records**, so a trigger does not hit governor limits during the nightly import of order status from SAP.
- **Tests with `runAs`** in different user contexts, for example as a service technician or as a dealer in the portal.
- **Their own test data** instead of org data, so tests still run after a sandbox refresh.

```kennzahlen
75 % | Apex coverage Salesforce requires at least for a production deployment
20 | records at least in every bulk test
80 to 90 % | stricter threshold sfdx-hardis recommends for clean projects
source: Apex Developer Guide (testing best practices), sfdx-hardis parameter apexTestsMinCoverageOrgWide
```

PMD rules from the [best practices category](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html) enforce the machine-checkable part: `ApexUnitTestClassShouldHaveAsserts` requires at least one assert, `ApexUnitTestShouldNotUseSeeAllDataTrue` forbids access to org data, `ApexUnitTestClassShouldHaveRunAs` requires at least one `runAs`. A test that only checks for "not null" still passes the first rule. Whether an assert proves anything remains a job for the review.

You can raise the coverage threshold itself. In sfdx-hardis the parameter is [`apexTestsMinCoverageOrgWide`](https://sfdx-hardis.cloudity.com/schema/sfdx-hardis-json-schema-parameters.html), default 75, and the documentation recommends stricter values such as 80 or 90 for clean projects. In a mature org with years of legacy code, I would raise the bar for new and changed classes and bring overall coverage up step by step. API version 67.0 is a special case: Apex runs in user mode by default there, and a test without `runAs` cannot see which records a restricted user loses. Details in [API 67.0: why Apex sees fewer records](../../../blog/api-67-apex-user-mode-fewer-records/).

## How do you test flows?

In many manufacturing orgs, flows are the bigger share of automation: status changes on service orders, escalations on warranty cases, notifications to dealers. Yet many pipelines let them through unchecked. There are three tools:

**Flow tests.** According to the [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_flowtest.htm), record-triggered, autolaunched and Data Cloud-triggered flows can have tests that check expected results. They live in the repository as the `FlowTest` metadata type. The Salesforce CLI runs them with [`sf flow run test`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_flow_run_test.html), with results also in JUnit format for the pipeline; `sf logic run test` runs flow and Apex tests together. One practical detail: the running user needs the "View All Data" permission. That affects your pipeline's technical user.

**Coverage for flows deployed as active.** By default, flows that are active in a sandbox arrive in production as inactive, according to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=flow_distribute_deploy_active.htm), and someone has to activate them by hand. With the "Deploy processes and flows as active" setting in Process Automation Settings, you set a coverage threshold. It applies to processes and autolaunched flows deployed through change sets or the Metadata API, and it is measured through Apex tests: at least one Apex test must cover the configured percentage of active processes and autolaunched flows. Flows with screens are exempt from the requirement. The values are in the Tooling API object [`FlowTestCoverage`](https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_flowtestcoverage.htm). For a pipeline that should deploy to production without manual steps, this setting is the clean route.

**Static analysis of flows.** The Flow Scanner in Code Analyzer finds typical build mistakes in flows before any test runs.

My recommendation: every record-triggered flow on a core object such as work order, asset or warranty case gets at least one flow test for the main path and one for the most important failure case. Screen flows still get tested by the business in UAT.

## Static analysis with Salesforce Code Analyzer

Version 5 of [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) bundles eight engines, all enabled by default. These matter most for your pipeline:

| Engine | Checks | Typical finding |
|---|---|---|
| PMD | Apex and Visualforce | SOQL in loops, missing sharing declaration, tests without asserts |
| ESLint | JavaScript in Lightning Web Components | unsafe patterns, defects in component code |
| Flow Scanner | flows | database operations in loops, missing fault paths, hard-coded IDs |
| Salesforce Graph Engine | deeper analysis of Apex across call paths | security gaps that only show up across several classes |
| Regex | your own patterns from `code-analyzer.yml` | hard-coded endpoints instead of a Named Credential |
| CPD | duplicated code | copied logic in several handlers |

The [Flow Scanner rules](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/rules-flow.html) are especially useful for partner admins: `DbInLoop` reports Get, Create, Update and Delete elements inside loops, `MissingFaultHandler` elements without a fault path, `HardcodedId` org-specific IDs that break on deployment. Two rules report when user input in a flow running in system context selects or changes records, a privilege escalation risk.

In the pipeline you call `sf code-analyzer run` or the GitHub Action. According to the [CI/CD guide](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html), it has to be version 2 of the action; version 1 uses the retired Code Analyzer v4. Without `--rule-selector`, the `Recommended` rule set runs.

```hinweis achtung
The run only becomes a gate with `--severity-threshold`: according to the [command reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html), the command exits with an error code as soon as a finding meets that severity. Without the flag everything stays green.
```

In an org with ten years of Apex, I would block from "High" and report the rest. Block everything on day one and you get hundreds of legacy findings, and partners start switching off rules instead of fixing code. Lower the threshold once the backlog is cleaned up; how to make technical debt visible first is covered in [chapter 9](../operations-monitoring-backup/).

## How do the gates run in sfdx-hardis and in commercial tools?

All tools from [chapter 4](../devops-tools-compared/) cover the gates, with different ways of working.

**sfdx-hardis**, which I have used in client projects for about two years, starts two control jobs on every pull request, according to its [documentation](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/). The first simulates the deployment to the target org, runs the Apex tests, calculates coverage and posts the result to the pull request with a visual diff of changed flows. The second runs MegaLinter with PMD for Apex, ESLint for Lightning Web Components, a search for hard-coded tokens and copy-paste detection. According to the documentation, merging happens only when both are green. The [MegaLinter configuration](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/) marks the PMD threshold with a comment that only the release manager may change it, and `// NOPMD` is meant "only for false positives, never to publish faster". Watch out for the `testCoverageNotBlocking` option, which according to the [documentation](https://sfdx-hardis.cloudity.com/salesforce-devops-smart-deployment/) allows deployments despite insufficient coverage. It has no place in a production setup.

**Gearset** brings its own customisable rule sets with [Code Reviews](https://docs.gearset.com/en/articles/11478945-what-is-code-reviews), covering every metadata type including flows, plus automatic fixes and dashboards that quantify technical debt. Used as a status check on a protected branch, it blocks the promotion of a pull request that fails, according to [Gearset](https://docs.gearset.com/en/articles/11478649-planning-your-clayton-trial). A dedicated rule reports [flows without tests](https://docs.gearset.com/en/articles/14121616-code-reviews-rule-untested-flows), which saves you the script you would otherwise write yourself.

**Copado** offers enforceable [quality gates](https://www.copado.com/product-detail/quality-assurance) based on your definition of done, and Robotic Testing for automated UI tests. According to the [Salesforce guide](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html), Code Analyzer can be integrated so that chosen severities block deployments.

**Flosum** offers a [code scan step](https://docs.flosum.com/devops/pipeline/pipeline-operations/pipeline-operation-code-scan) in the pipeline, using PMD or its own broader rule set that also covers flows. If a finding reaches the configured threshold, the step fails.

```hinweis tipp
The commercial tools score on interface, rule sets and support, sfdx-hardis on transparency, because every rule and threshold is a file in your repository. With all of them, thresholds belong in your repository or tool account, not with the partner.
```

## AI-generated code: the same gates, no exceptions

When your partners work with coding agents, the number of pull requests goes up and your review capacity stays the same. That argues for enforcing the gates above without exceptions. New gates are hardly needed. Typical AI defects such as queries in loops, missing sharing declarations and tests that prove nothing are caught by the same combination of Code Analyzer, validation and review. Two additions pay off: a check that stops an API version jump to 67.0 without a task, and a rule that AI-generated parts are flagged in the pull request.

What AI code needs beyond that, from the rules file to org boundaries for agents, is covered in [chapter 8 of the AI masterclass](../../ai-salesforce/ai-code-best-practices/). The gates in detail are in [quality gates for AI code](../../../blog/quality-gates-for-ai-code-salesforce-pipeline/), and the review from the client's side in [reviewing AI-generated Salesforce code](../../../blog/reviewing-ai-generated-salesforce-code/).

## A typical scenario, as an assumption

A machine builder runs Service Cloud with Field Service for its field technicians, a dealer portal and an SAP integration. Two partners work on the same org, one on field service, one on the portal. All details are assumptions.

An admin from the first partner builds a record-triggered flow on the work order that updates the related appointments when the status changes, with an update element inside a loop. In the sandbox it works with one order. In the pull request, the Flow Scanner reports `DbInLoop` and `MissingFaultHandler`, both above the threshold, and the merge is blocked. The admin moves the update after the loop, adds a fault path and two flow tests.

In the validation deployment, an Apex test from the second partner then fails: the bulk test of the SAP import class creates 200 work orders and now runs through the new flow. Without that test, the problem would have shown up during the nightly import in production. Finally, the review by the client's architect settles the business question no tool asks: whether the appointment on a cancelled order should be deleted or only cancelled.

Which configuration data such flows need in sandboxes for tests to mean something is covered in [chapter 7](../data-and-configuration/). How I support programmes with this is described under [DevOps and release management](../../../services/devops-release-management/) and [partner governance](../../../services/partner-governance/).

In Salesforce programmes with several partners, quality comes from gates that block and thresholds the client sets.
