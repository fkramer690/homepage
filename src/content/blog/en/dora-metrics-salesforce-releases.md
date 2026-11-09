---
title: "DORA metrics for Salesforce: are releases improving?"
description: "Which DORA metrics show IT leadership whether Salesforce releases get faster and more stable, where the numbers come from and which traps to avoid."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: dora-metrics-salesforce-releases
translationKey: dora-metrics-salesforce-releases
topic: release
categories: [devops]
tags: [DORA metrics, release management, DevOps, KPIs]
takeaways:
  - "DORA metrics measure how fast and how stably changes reach production: lead time, deployment frequency, recovery time, change fail rate and rework rate."
  - "For IT leadership the trend over several months counts, not the single value and not the comparison with software companies."
  - "In Salesforce the numbers come from Git, the pipeline and incident data. Changes made directly in production are missing, so check the Setup Audit Trail too."
  - "The metrics help improve the release process, not rank partners. If you measure partners by them, you get polished numbers."
faq:
  - q: "What are DORA metrics?"
    a: "DORA metrics are key figures from the research of the DevOps Research and Assessment program. They measure how fast changes reach production and how often they cause problems."
  - q: "How many DORA metrics are there?"
    a: "For a long time there were four: deployment frequency, lead time for changes, change fail rate and recovery time. In 2024 the deployment rework rate was added, the share of unplanned deployments to fix bugs."
  - q: "Can you measure DORA metrics in Salesforce?"
    a: "Yes, if all production deployments run through Git and a pipeline and incidents are recorded. Tools such as sfdx-hardis calculate approximations from pipeline data; failures in production still need incident data."
  - q: "Which DORA metric matters most for Salesforce programs?"
    a: "No single metric is enough, DORA warns against that. For the steering committee I start with the change fail rate together with recovery time, because they show how often and how long a release disrupts operations. For the team the lead time, because it shows where work is waiting."
draft: false
---

DORA metrics show IT leadership whether Salesforce releases are getting faster and more stable. They measure how long a change takes to reach production, how often you deploy, how often a deployment causes problems and how quickly those problems are fixed. In Salesforce the numbers come from Git, the pipeline and incident data, and tools such as sfdx-hardis calculate approximations from the pipeline. What matters is the trend over several months. I use the metrics to improve the release process, not to measure partners against each other. If you do that, you get polished numbers.

## What are DORA metrics?

DORA stands for DevOps Research and Assessment, a research program that has studied since 2014 what makes good software delivery. Today the metrics are split into two groups ([dora.dev: History of DORA's software delivery metrics](https://dora.dev/guides/dora-metrics/history/)):

| Metric | Meaning | Group |
|---|---|---|
| Change lead time | time from commit to successful deployment in production | throughput |
| Deployment frequency | how often changes are deployed to production | throughput |
| Failed deployment recovery time | time to recover from a deployment that needs immediate intervention | throughput |
| Change fail rate | share of deployments that need immediate intervention | instability |
| Deployment rework rate | share of unplanned deployments caused by an incident in production | instability |

The rework rate was added as the fifth metric in 2024. That is why many tools and articles still talk about the four DORA metrics.

I liked the numbers when I first looked at them in sfdx-hardis, because a steering committee understands them. Nobody there wants to know how many pull requests were merged. But everybody understands the question whether a release disrupts operations less often than six months ago. What I learned about this in the training is in [what I learned from the free sfdx-hardis training](../sfdx-hardis-free-devops-training/).

## Where do the numbers come from in Salesforce?

The metrics need a data source in which every change has a timestamp. In Salesforce that is most reliable when all changes run through Git and a pipeline, and when incidents are linked to the deployment that caused them:

- **Lead time** from Git: time of the commit or pull request and time of the deployment to production.
- **Deployment frequency** from the pipeline runs against the production org.
- **Change fail rate and rework rate** from incidents and hotfixes: an incident is assigned to the deployment that caused it. Hotfix branches and rollbacks are clues, but not every hotfix fixes the last deployment.
- **Recovery time** from the ticket system: time from the impairment caused by the deployment until service is restored, by a fix, a rollback or deactivating the change.

sfdx-hardis provides a report on these metrics, and commercial DevOps tools for Salesforce offer similar analyses. Note what such a report measures: sfdx-hardis counts failed deployment jobs as change failures and measures lead time from pull request creation, so its values are pipeline approximations. A red job that never reached production is not a DORA failure, and a green job can still disrupt operations. The tool also rates values as Elite to Low against DORA benchmarks; I would not take that rating into the steering committee unchecked. I set up the pipeline for this on the client's own platform, see [DevOps and release management](../../services/devops-release-management/).

```hinweis achtung
Changes made directly in the production org do not show up in any Git statistics. Check the Setup Audit Trail regularly and export it, because Salesforce keeps it for only 180 days and it covers setup changes, not data. If it lists many changes by users outside the pipeline, the DORA numbers are too good to be true.
```

## Salesforce has its own traps that distort the numbers

Salesforce programs have a few peculiarities that distort the numbers:

- **Fixed release dates.** If you deploy once a month, most of the lead time is waiting for the next date. That is a decision of the program, not a problem of the developers. The number still shows what this decision costs.
- **Manual steps.** A deployment counts as successful, but afterwards someone has to activate three flows by hand, for example because "Deploy processes and flows as active" is not enabled. If that goes wrong, it is a failure that never appears as a failed deployment in any statistic.
- **Data instead of metadata.** Product catalogs, pricing rules or configurator rules are stored as records in some clouds. If they are changed by hand, they are missing from the metrics.
- **Large packages.** A release with 200 changes that has one defect counts as one failed deployment. Smaller releases make the change fail rate more meaningful.

## IT leadership looks at the trend, not the single value

I recommend three rules:

1. **Trend instead of single value.** One month says little. With monthly releases, look at a rolling window of at least six to twelve deployments, and show absolute numbers such as "2 of 6" next to the percentage.
2. **No comparison with software companies.** The top values in the DORA reports come from teams that deploy several times a day. A manufacturer with a monthly Salesforce release compares itself with itself.
3. **No ranking of partners.** With several partners it is tempting to measure every partner by their change fail rate. Then hotfixes get renamed and defects get logged as new requirements. The metrics belong to the program; the quality of single deliveries is what the [pull request review](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) is for.

```pro-contra
pro: DORA metrics in the steering committee
- Numbers anyone understands without technical knowledge
- Show whether investments in the release process pay off
- Can be partly automated from pipeline data
contra: What to keep in mind
- Need agreed definitions and incident data, not only the pipeline
- Direct changes in production are missing from the numbers
- Used to compare partners, they lose their meaning
```

## Which lever improves which number?

The metrics are only useful if a bad number leads to an action. This mapping fits Salesforce programs, because every lever sits in the release process itself and not in a budget for new tools:

- **Long lead time:** where does the change wait? Often for the review, for UAT or for the release date. Smaller pull requests and agreed review response times help with the first cause, a shorter release cycle with the last.
- **Low deployment frequency:** releases are too big or too much work. Automated post-deployment steps make a release cheaper and so possible more often.
- **High change fail rate:** defects slip past the tests. A [UAT with test users per role](../salesforce-uat-business-acceptance-testing/) and regression tests for the most important processes catch many of them before production.
- **Long recovery time:** there is no fast path for fixes. A hotfix sandbox refreshed close to the production state and a dedicated hotfix branch shorten it.

Worked example: a program with twelve releases a year, four of which caused an incident that needed immediate intervention, has a change fail rate of 33 percent. Together with the recovery time and the affected processes, this tells the steering committee more than a list of open tickets, and it can be checked again after every measure.

## First step: deployment frequency and change fail rate

Start with two numbers: deployment frequency and change fail rate. Deployment frequency can be read from the pipeline, the change fail rate from the deployments plus the incidents assigned to them, even before a tool reports them automatically. Set today's value as the baseline and report the trend once a month. Lead time follows as soon as all changes run through pull requests. Count as rework every unplanned change made because of an incident in production, including a fix made directly in Setup that you only find in the Setup Audit Trail.
