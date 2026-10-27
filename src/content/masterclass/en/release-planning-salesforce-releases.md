---
title: "Salesforce release planning: calendar and releases"
description: "Release calendar, cadence and freeze windows for Salesforce, plus sandbox preview, release updates, API versions and the retirements that hit pipelines."
lang: en
slug: release-planning-salesforce-releases
course: devops
translationKey: devops-08
chapter: 8
short: "Release planning"
summary: "How to align your release calendar with the three Salesforce releases, release updates and retirements."
takeaways:
  - "A Salesforce release calendar lays two calendars on top of each other: your own cadence with freeze windows, and Salesforce's calendar with three releases, release updates and retirements."
  - "Whether a sandbox gets the new release early depends on its instance; only a refresh before the cutoff changes that, and for Winter '27 the cutoff was 27 August 2026."
  - "Sandboxes on the preview release do not belong in the deployment path to production, because they work with a newer API version than the production org."
  - "Release updates carry a date by which you should complete their steps; a test run enables the change immediately, so it belongs in a sandbox first."
  - "Several retirements with fixed dates run until Summer '28, from the CLI token change on 28 October 2026 to API versions 31.0 to 40.0."
articles: [salesforce-winter-27-pipeline, api-67-user-mode-apex, salesforce-password-integrations-2027, salesforce-dx-mcp-server-end-of-life]
faq:
  - q: "How often does Salesforce ship a new release?"
    a: "Three times a year: Spring, Summer and Winter. According to Salesforce, Spring typically arrives in February, Summer in June and Winter in October. The exact dates for your instance are in the maintenance calendar on Salesforce Trust."
  - q: "How do I get a sandbox onto the preview release?"
    a: "Create or refresh the sandbox before the cutoff given in the Sandbox Preview Instructions. The Release Type column on the Sandboxes page in Setup shows whether a sandbox sits on a preview instance. A refresh after the cutoff moves it to a non-preview instance."
  - q: "What happens if I ignore a release update?"
    a: "Salesforce enforces it with the release named under Enforcement Scheduled or Enforced In. After the Complete Steps By date it shows as overdue. The change then applies without your test."
  - q: "Can we deploy during the sandbox preview?"
    a: "Yes, as long as the path to production runs only through sandboxes on the production release. Deploying from a preview sandbox to production easily fails on metadata the older API version does not know."
draft: false
---

Salesforce release planning means laying two calendars on top of each other. Your own calendar sets the cadence in which changes reach production, when you freeze and who informs the business. Salesforce's calendar brings three releases a year, each with a sandbox preview, release updates and a new API version, plus retirements with fixed dates. In autumn 2026 those include 28 October for the Salesforce CLI, 1 December for SOAP logins and 20 February 2027 for the password flow. A release manager on the client side keeps both calendars in one place and makes them binding for every partner.

## What belongs in a Salesforce release calendar?

A release calendar is the one view every team reads to see when it may deliver and when it may not. In a programme with several implementation partners on one org, each partner has its own sprint plan. The calendar therefore belongs to the client, maintained by the release manager from [chapter 2](../release-process-ownership-roles/), and the partners plan into it. With eight teams on one org, as in one of my programmes, it is the only place where all dates come together.

Four layers go into it:

1. **Your own releases:** regular dates, hotfix rules, freeze windows.
2. **The Salesforce releases:** pre-release org, release notes, sandbox preview cutoff, sandbox upgrade, upgrade of your production instance.
3. **Retirements and release updates:** dates on which something stops working if nobody acts.
4. **Business dates:** quarter end in sales, stocktaking, plant shutdowns, SAP releases, trade fairs with new products in the dealer portal.

The fourth layer is the one people forget. A release on the last day of the quarter hits sales exactly when quotes and orders have to go through Salesforce. A release that changes the SAP interface does not belong in the week the SAP team imports its own transports.

## Which cadence and freeze windows fit?

I recommend a fixed cadence over releases on demand. Every two or three weeks on the same weekday is a good start for most programmes. A fixed date forces partners to ship small packages, and the business knows when things change. Anything urgent that cannot wait goes through the hotfix path from [chapter 3](../environments-and-branching/), not through a special release.

A freeze window is a period in which nothing is deployed to production except approved hotfixes. Three kinds make sense on Salesforce:

- **Around the upgrade of your production instance.** The Friday before the upgrade weekend and the first working days after it. In that period you want to attribute every defect clearly: does it come from the Salesforce release or from yours?
- **During the sandbox preview, for the path to production.** Deployments continue, but only through sandboxes on the same release as production. More on that below.
- **From the business.** Quarter and year end, stocktaking, SAP go-live dates.

Freeze windows are in the calendar before partners plan their sprints. A freeze rule announced two days ahead gets worked around.

## How do the three Salesforce releases a year work?

According to its [releases page](https://www.salesforce.com/releases/), Salesforce ships a major release three times a year: Spring typically in February, Summer in June, Winter in October. The sequence is the same every time. For Winter '27 it looked like this, according to Salesforce's [admin release countdown](https://admin.salesforce.com/blog/2026/admin-winter-27-release-countdown) and the [Sandbox Preview Instructions](https://help.salesforce.com/s/articleView?id=000391927&language=en_US&type=1):

| Date | Step |
|---|---|
| 13 August 2026 | Pre-release org sign-up |
| 19 August 2026 | Release notes on Salesforce Help |
| 27 August 2026, 6 p.m. Pacific Time | Cutoff for sandboxes that should get the preview |
| 28 and 29 August 2026 | Upgrade of sandboxes on preview instances |
| 4 September, 2 October, 9 October 2026 | Upgrade of production orgs, depending on the instance |
| 9 and 10 October 2026 | Upgrade of sandboxes on non-preview instances |

The exact date for your production instance is in the [maintenance calendar on Salesforce Trust](https://status.salesforce.com/products/all/maintenances). I give no dates for Spring '27 here, because I could not find them published by Salesforce yet. Add them once Trust shows them for your instance. If Spring '27 arrives in February as usual, it falls into the same weeks as the end of the password flow on 20 February 2027. That belongs in the plan.

### Sandbox preview: which sandbox gets the release early?

Whether a sandbox gets the new release early depends on its instance. All sandboxes on a preview instance are upgraded together; sandboxes on non-preview instances stay on the current release until production has moved too. The Release Type column on the Sandboxes page in Setup shows which instance a sandbox has. Only a refresh changes it: according to Salesforce Help, a sandbox created or refreshed after the cutoff lands on a non-preview instance and reverts to the old release. A refresh rebuilds the sandbox from production, so its own data and configuration are gone afterwards.

Two rules follow for the release calendar:

- **At least one sandbox deliberately on preview.** Salesforce recommends this in the [Trailhead module on the sandbox preview](https://trailhead.salesforce.com/content/learn/modules/sf_releases/sf-releases-sandbox-preview). That is where regression tests, SAP interface tests and the release update tests run. Schedule the planned sandbox refreshes from [chapter 3](../environments-and-branching/) before the cutoff.
- **Preview sandboxes stay out of the deployment path to production.** A preview sandbox works with the new API version and knows metadata that production does not know yet. Gearset's [documentation on preview sandboxes](https://docs.gearset.com/en/articles/9297189-salesforce-preview-and-non-preview-sandboxes) explicitly advises against adding them to the pipeline, and Gearset makes a new API version its [default](https://docs.gearset.com/en/articles/4934349-how-does-gearset-handle-salesforce-metadata-api-releases) only after general availability. For Winter '27, Salesforce itself offered an Apex setting that keeps the old heap limit when deploying from a Winter '27 sandbox to a production org still on Summer '26, as described in the [developer guide to Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release).

With the Salesforce CLI, and so with sfdx-hardis too, the [Salesforce documentation](https://developer.salesforce.com/docs/platform/sfdx-setup/guide/sfdx-setup-apiversion.html) says: without a setting, the CLI uses the highest API version the target org supports. Set `sourceApiVersion` in `sfdx-project.json` and raise it only after production has been upgraded, in a pull request of its own.

### Release updates: changes with an enforcement date

Release updates are changes that Salesforce announces and enforces with a set release, because they can change how existing customisations behave. They sit in Setup under [Release Updates](https://help.salesforce.com/s/articleView?language=en_US&id=sf.release_updates.htm&type=5), sorted into Needs Action, Due Soon, Overdue and Archived. Each update shows a Complete Steps By date and the release in which Salesforce enforces it. Many offer a test run. According to Salesforce Help, the change is then "immediately enabled in your org", and in sandboxes the test period may end earlier.

That makes a fixed slot in the calendar: after every Salesforce release the release manager goes through the list, gives each update an owner, starts the test run in the preview or integration sandbox first and activates the update in production on a date of your choosing, before Salesforce does. Two current examples: the new "Use Any API Auth" permission for SOAP logins from 1 December 2026 can be tested in advance through the release update in Setup, according to Salesforce. The end of the OAuth password flow is also published as a [release update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5), and Salesforce has already moved its date once.

If you do not want to check the list by hand: according to its [documentation](https://sfdx-hardis.cloudity.com/salesforce-monitoring-home/), sfdx-hardis monitoring gathers warnings about upcoming and overdue release updates every week and reports the instance's next upgrade date. More on monitoring in [chapter 9](../operations-monitoring-backup/).

### API versions: every release brings a new one

Every release brings a new API version, Winter '27 brought 68.0. That alone changes nothing in your code, because every Apex class and trigger stores its own version. The risk lies in raising it. From API 67.0, Apex classes run in user mode and with sharing, and queries then silently return fewer records. Why that happens and how to plan the move is in [API 67.0 user mode: why Apex sees fewer records](../../../blog/api-67-apex-user-mode-fewer-records/). Coding agents like to raise versions in passing, so a rule for this also belongs in the rules file from [chapter 8 of the AI masterclass](../../ai-salesforce/ai-code-best-practices/).

My suggestion for the calendar: once a year, a planned package that raises `sourceApiVersion` and the classes in batches by business domain, with tests as real users. It includes the classes the compiler has warned about since Winter '27 because they are saved at versions 9.0 to 19.0.

## Which retirements hit your pipeline?

Retirements are dates on which something stops working. Until Summer '28 these are in the calendar:

| Date | What ends | Who it hits |
|---|---|---|
| 28 October 2026 | `sf org display` no longer prints access tokens, the workaround ends | pipeline scripts that read the token |
| 2 November 2026 | local Salesforce DX MCP Server reaches end of life according to its README | partners' coding agents |
| 1 December 2026 | SOAP login() needs "Use Any API Auth" | integration users |
| 20 February 2027 | OAuth username-password flow for connected apps | interfaces, data loaders, tools |
| Summer '27 | SOAP login() in API 31.0 to 64.0; API 31.0 to 40.0 without updates | older interfaces |
| Summer '28 | SOAP, REST and Bulk API 31.0 to 40.0 fail | older interfaces |

On top of that, the Salesforce CLI has required Node.js 22 or later since Winter '27, which affects CI runners and Docker images. The details are in four articles: [Winter '27 and your pipeline](../../../blog/salesforce-winter-27-what-changes-for-your-pipeline/), [password integrations end in 2027](../../../blog/salesforce-password-integrations-end-2027/), [DX MCP Server end of life](../../../blog/salesforce-dx-mcp-server-end-of-life/) and the API 67.0 article above. How the pipeline authenticates without passwords is covered in [chapter 5](../building-the-pipeline/).

For planning, what counts is that every retirement gets an owner on the client side and a done date before the Salesforce date. For the password flow I would switch the setting off in production myself a few days earlier, with the team on standby. The outage then happens on a day you chose.

## Informing the business

The business notices a release whether it comes from you or from Salesforce. Salesforce switches some features on automatically with every release; the [Trailhead module on release strategy](https://trailhead.salesforce.com/content/learn/modules/sf_releases/sf_releases_strategy) calls them "Quick Wins". A changed screen in field service is a change for the technician on site, no matter who triggered it.

What works without much effort:

- **A calendar the business can see.** Release dates, freeze windows and the Salesforce upgrade, without technical detail.
- **User release notes per release.** Organised by role: inside sales, service, field service, sales, dealers in the portal. One sentence per item on what changes for that role.
- **Key users test in the preview sandbox.** People who know the processes see within an hour whether a Salesforce release changes warranty handling or spare parts ordering.
- **One channel for feedback.** Salesforce itself advises telling users where to report questions and problems.
- **External users early.** Dealers in the portal do not plan their training around your sprint. They need a longer lead time.

## A typical scenario, as an assumption: a machine builder before Spring '27

A typical scenario, as an assumption: a machine builder runs Service Cloud, Field Service and a dealer portal connected to SAP S/4. Three partners work on one org, and releases go live every second Thursday. The release manager on the client side plans in November:

1. She adds the SOAP login date of 1 December and the end of the password flow on 20 February, and gives both an owner. The integration inventory runs until the end of November.
2. As soon as Trust shows the Spring '27 dates, she enters the sandbox preview cutoff, the upgrade weekend of the production instance and a freeze window around it.
3. A partial copy sandbox is refreshed before the cutoff and becomes the preview sandbox for SAP interface tests and release updates. Integration, UAT and staging stay on the production release.
4. Because Spring '27 and the end of the password flow may fall into the same weeks, she switches the password flow off herself at the end of January, separate from the Salesforce upgrade.
5. The partners get the calendar in writing. Anyone who wants to deliver during a freeze needs her approval.

None of these steps needs a new tool. It needs someone on the client side who owns the calendar, and partners who are contractually bound to plan into it. How such rules get into partner contracts is part of my [partner governance](../../../services/partner-governance/) work; the data side of a release is covered in [chapter 7](../data-and-configuration/), and all chapters are on the [overview page](../).

A release calendar that shows your dates and Salesforce's in one place turns retirements and upgrades into plannable work; if you want your calendar or release process reviewed for that, [send me a message](#contact).
