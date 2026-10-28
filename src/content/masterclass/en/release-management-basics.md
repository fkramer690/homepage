---
title: "Salesforce release management: the basics"
description: "What source-driven development, pipeline and release mean, what bad releases cost with several partners, and the path from change sets to a pipeline."
lang: en
slug: release-management-basics
course: devops
translationKey: devops-01
chapter: 1
pubDate: 2026-10-28
short: "Why releases decide"
summary: "The core terms, the cost of bad releases with several partners and five maturity stages from change sets to your own pipeline."
takeaways:
  - "Salesforce release management means every change comes from a Git repository through a fixed pipeline with review and tests, and a release goes live for users on a planned date."
  - "A deployment is the technical transfer of metadata into an org; a release is the planned go-live for users, with communication and sign-off by the business."
  - "In programmes with several partners, bad releases cost mostly rework across team boundaries, repeated UAT runs and downtime in service or the dealer portal."
  - "Change sets only work between orgs of the same production org and carry no data and no history; they are not enough for several teams on one org."
  - "The path from change sets to a pipeline has five stages and needs no big bang, but it does need an early decision that binds every partner."
articles: [devops-salesforce-enterprise, client-owned-devops-tools, pull-request-reviews-enterprise]
faq:
  - q: "What is the difference between a deployment and a release?"
    a: "A deployment moves metadata into an org; it can happen every day. A release is the planned go-live of a set of changes for users, with a date, communication, training and sign-off by the business."
  - q: "When is a pipeline worth it instead of change sets?"
    a: "As soon as a second team or a second partner works on the same org. From then on changes overwrite each other, and without a repository nobody can show who changed what and when."
  - q: "Do I need a commercial DevOps tool to start?"
    a: "No. A Git repository, the Salesforce CLI and an open-source option such as sfdx-hardis are enough for a complete pipeline. Commercial platforms such as Gearset, Copado or Flosum add a managed interface and vendor support. What matters is that the choice is made early and applies to every partner."
  - q: "Who should own the release pipeline?"
    a: "You, the client. Repository, pipeline and tools are in your name, and partners work in them with personal users. That keeps the process stable when a partner changes."
draft: false
---

Salesforce release management decides whether a programme with several partners stays predictable. Once two teams work on the same org, pushing changes from sandbox to sandbox with change sets no longer works. You need a Git repository as the single source of truth, a pipeline that checks and rolls out every change the same way, and clear rules on who approves what and when. Repository, pipeline and tools belong to you as the client, not to the implementation partner. The way there has five stages from change sets to your own pipeline, and none of them requires a big bang.

## What does release management mean for Salesforce?

Release management is the discipline of moving changes to a Salesforce org from development to users in a planned, checked and traceable way. DevOps describes the way of working and the tools behind it. In conversations with business units and partners the same terms come up again and again, and people often mean different things by them. This is how I use them in this masterclass:

- **Source-driven development** means the version control system, not the org, is the source of truth. The [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-intro.html) puts it briefly: "Instead of the org, your version control system is the source of truth." Whatever is not in the repository does not count.
- **Version control** is a system such as Git that stores every version of every file with author, time and reason. Every change can be traced, compared and reverted. For Salesforce it holds metadata such as objects, fields, flows, permission sets and Apex classes as files.
- **Continuous integration (CI)** means every change is checked automatically before it is merged into a shared state. For Salesforce that is a validation deployment, Apex tests and static code analysis.
- **Continuous delivery (CD)** means checked changes can be rolled out to the next environment automatically at any time, without manual steps from a spreadsheet.
- **Pipeline** is the fixed sequence of environments and automated checks every change passes through, for example developer sandbox, integration, UAT, production. Every change takes the same route, hotfixes included.
- **Deployment** is the technical transfer of metadata into an org. For a production deployment that includes Apex, the [Salesforce CLI reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html) runs all local tests by default, and according to the [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/pages/apex_testing_intro.htm) tests must cover at least 75 percent of the Apex code and all of them must pass.
- **Release** is a planned set of changes that goes live for users on a fixed date. It includes communication, training and sign-off by the business.

For decision makers the difference between deployment and release matters most. Deployments can run daily, in sandboxes even several times a day. A release is a business decision: the head of service decides from which day field technicians use the new job completion screen. If you mix the two up, you either plan too few deployments and get huge, risky packages, or you switch features on before the business is ready.

One set of dates is never yours. According to its [release overview](https://www.salesforce.com/releases/), Salesforce ships three seasonal releases a year, typically Spring in February, Summer in June and Winter in October, with a sandbox preview of four to six weeks beforehand. Your release calendar has to work around these dates. [Chapter 8](../release-planning-salesforce-releases/) covers how.

## What do bad releases cost in a programme with several partners?

I have worked in a programme with eight teams and 32 developers, on orgs where several implementation partners worked at the same time, and with nearshore teams in Eastern Europe and India. Without a shared release process, the same patterns appear every time; I describe them in more detail in [why DevOps decides Salesforce enterprise projects](../../../blog/why-devops-matters-salesforce-enterprise/). For a budget they translate into five kinds of cost:

1. **Rework across team boundaries.** Team A deploys a page layout, team B deploys the same object with an older version a day later. The fix ties up both teams, and with distributed teams across time zones every alignment takes longer.
2. **Repeated testing.** Every faulty deployment to UAT invalidates other teams' test results. Key users from sales and service test the same cases twice and lose trust in the sign-off.
3. **Downtime for the business.** In manufacturing, a production defect often hits the processes with the most customer contact: service orders, spare parts orders in the dealer portal, the order handover to SAP.
4. **Growing packages.** Teams with bad release experiences release less often. Less frequent releases get bigger, bigger releases get riskier. The [five DORA metrics](https://dora.dev/guides/dora-metrics/) make this measurable, for example deployment frequency and change fail rate, the share of deployments that need immediate rework such as a rollback or an emergency patch.
5. **Dependency and blame.** Without history in the repository nobody can show which partner made which change. Arguing about it costs steering time and strains the collaboration.

A typical scenario, as an assumption: a machinery manufacturer runs Service Cloud with Field Service, a dealer portal on Experience Cloud and an SAP interface. Three partners work on the same org, one each for service, sales with the portal, and integration. On Friday evening the sales partner deploys a new validation rule on the order object with a change set. It is correct in the partner's sandbox, but it does not know a field the integration partner introduced two weeks earlier. On Monday the nightly order handover from SAP fails, dealers see no delivery dates, and the service team has to postpone its own UAT run because the org is unstable. None of these costs shows up as its own line in the project budget. A validation deployment against the shared state in the repository would have shown the conflict before the merge.

## Why are change sets no longer enough?

Change sets are the standard tool many orgs start with, and for a single admin they are fine. According to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=changesets.htm), they need a deployment connection, which only exists between orgs affiliated with the same production org. They contain only changes you can make in Setup, no records, and they are deployed as a whole. For a programme with several partners the decisive things are missing:

- no version history, so no comparison and no clean rollback
- no review before a change reaches the next environment
- no automated checks against other teams' work
- components are clicked together by hand, and something is easily missed
- no record of who changed what, when and why

The core problem is the source of truth more than the tool. As long as the org is the truth, the last person to deploy decides which version counts.

## Five maturity stages from change sets to a pipeline

Hardly any company jumps straight from change sets to a fully automated pipeline, and it does not have to. I place programmes in five stages. Each stage has a clear benefit, and each one prepares the next.

| Stage | How changes reach production | Source of truth | Biggest risk | Chapters |
|---|---|---|---|---|
| 1. Clicks and change sets | in Setup or by change set, by hand | the org | overwrites, no history | 1 |
| 2. Repository as a backup | still by hand, metadata is also saved to Git | the org, Git is a copy | repository and org drift apart | 2, 3 |
| 3. Pull requests with checks | changes are built in a branch, every pull request gets a review and a validation deployment | the repository | checks get bypassed while production stays open | 4, 5, 6 |
| 4. Pipeline to production | every environment, production included, only through the pipeline, with delta deployments and a hotfix path | the repository | data, configuration and Salesforce releases stay manual | 7, 8 |
| 5. Operations and measurement | as stage 4, plus monitoring, backups and metrics | the repository | the process ages when nobody owns it | 9, 10 |

Two places in this table are the hardest in practice. The step from stage 2 to 3 moves the source of truth from the org into the repository. From then on, every change made directly in a shared org is a process failure. And the step from 3 to 4 closes the back door: as long as someone with admin rights may deploy to production, the pipeline is only a recommendation.

The validation deployment is the first tool that pays off as early as stage 3.

```vertiefung For developers
title: How do validation and quick deploy work?
With `sf project deploy validate` the [Salesforce CLI](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html) checks whether a deployment would succeed without changing anything. After a successful validation the package can be rolled out by quick deploy for up to ten days without running the tests again.
```

Stages 3 to 5 need a tool. One open-source option is [sfdx-hardis](https://sfdx-hardis.cloudity.com/), maintained by Cloudity with a community; it ships pipelines for GitHub, GitLab, Azure DevOps, Bitbucket and Jenkins as well as monitoring and metadata backup. I have used it in client projects for about two years. Commercial platforms such as [Gearset](https://gearset.com/), [Copado](https://www.copado.com/) or [Flosum](https://www.flosum.com/products/devops) offer a managed interface, vendor support and less operating effort on your side; Flosum describes itself as a native solution on the Salesforce platform. [Chapter 4](../devops-tools-compared/) compares which tool fits which programme. For this chapter two rules count: the choice is made early and binds every partner. And if open source saves you licence costs, the money is best spent on an internal release role.

## Who owns the release process?

You do. That is the basic assumption of every chapter that follows. Repository, pipeline, DevOps tool and sandboxes are in your name, and partners get personal users with the rights their task needs. Why the same applies to Jira, Confluence and Miro is in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/).

The second principle: every change goes through a pull request with a review, flows and permission sets included. The review is the cheapest point at which a programme with many teams agrees on one way of building. What a good review checks is in [why pull request reviews are a must](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).

```praxis
In one programme I worked on, at first every pull request went across my desk. Once the process was stable, I handed it over to an internal colleague.
```

Both principles are governance questions and belong in the contracts with your partners. That is where I start in [DevOps and release management](../../../services/devops-release-management/) and in [partner governance](../../../services/partner-governance/).

## The path through the ten chapters

The masterclass follows one company along this path. Each chapter builds on the previous one.

| No. | Chapter | The question behind it |
|---|---|---|
| 1 | Why releases decide | Which terms, which costs, which maturity stage? |
| 2 | [Ownership and roles](../release-process-ownership-roles/) | Who owns what, who approves what, what goes into the partner contract? |
| 3 | [Environments and branches](../environments-and-branching/) | Which sandboxes, which branch model, which hotfix path? |
| 4 | [Tools compared](../devops-tools-compared/) | Salesforce standard tooling, open source or a commercial platform? |
| 5 | [Building the pipeline](../building-the-pipeline/) | How do pull request, validation, tests and deployment work? |
| 6 | [Quality, tests, reviews](../quality-tests-reviews/) | Which quality gates must every change pass? |
| 7 | [Data and configuration](../data-and-configuration/) | How do price books, product data and configuration records move along? |
| 8 | [Release planning](../release-planning-salesforce-releases/) | How do your own calendar and three Salesforce releases fit together? |
| 9 | [Operations and monitoring](../operations-monitoring-backup/) | What happens after go-live, and how do you measure stability? |
| 10 | [Rollout and roadmap](../rollout-roadmap/) | In which order do you introduce all of this? |

Chapter 10 also builds the bridge to coding agents in the pipeline. For more on that, the AI masterclass has a chapter on [teamwork and delivery](../../ai-salesforce/teamwork-and-delivery/).

## Where do you stand today?

Six questions are enough for a first assessment. You should be able to answer each in one sentence:

- In whose name are the Git repository and the DevOps tool?
- Can anyone change something in Setup in production today without it showing up in the repository?
- Does every change go through a pull request with a review, including those from the partner with the biggest team?
- Which version is in UAT right now, and how do you know?
- Who approves a release, and who decides on a hotfix?
- How long does it take to take back a faulty change in production?

If you hesitate on more than two of them, your programme is at stage 1 or 2. Then settle ownership and roles first and the tool after that. The path continues in [chapter 2: ownership and roles](../release-process-ownership-roles/).

A Salesforce programme with several partners stays predictable only when you own the release process and every change takes the same route. If you want to know which stage your programme is at, [send me a message](#contact).
