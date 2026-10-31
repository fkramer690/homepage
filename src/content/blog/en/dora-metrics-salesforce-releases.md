---
title: "DORA metrics for Salesforce: are releases improving?"
description: "Which DORA metrics show IT leadership whether Salesforce releases get faster and more stable, where the numbers come from and which traps to avoid."
pubDate: 2026-10-29
lang: en
slug: dora-metrics-salesforce-releases
translationKey: dora-metrics-salesforce-releases
topic: release
categories: [devops]
tags: [DORA metrics, release management, DevOps, KPIs]
takeaways:
  - "DORA metrics measure how fast and how stably changes reach production: lead time, deployment frequency, recovery time, change fail rate and rework rate."
  - "For IT leadership the trend over several months counts, not the single value and not the comparison with software companies."
  - "In Salesforce the numbers come from Git and the pipeline. Changes made directly in production are missing, so the Setup Audit Trail belongs in the picture too."
  - "The metrics help improve the release process, not rank partners. If you measure partners by them, you get polished numbers."
faq:
  - q: "What are DORA metrics?"
    a: "DORA metrics are key figures from the research of the DevOps Research and Assessment programme. They measure how fast changes reach production and how often they cause problems."
  - q: "How many DORA metrics are there?"
    a: "For a long time there were four: deployment frequency, lead time for changes, change fail rate and recovery time. In 2024 the deployment rework rate was added, the share of unplanned deployments to fix bugs."
  - q: "Can you measure DORA metrics in Salesforce?"
    a: "Yes, if changes run through Git and a pipeline. Tools such as sfdx-hardis provide a report on the metrics; without a pipeline there is no reliable data."
  - q: "Which DORA metric matters most for Salesforce programmes?"
    a: "For the steering committee usually the change fail rate, because it shows how often a release disrupts operations. For the team the lead time, because it shows where work is waiting."
draft: false
---

DORA metrics show IT leadership whether Salesforce releases are getting faster and more stable. They measure how long a change takes to reach production, how often you deploy, how often a deployment causes problems and how quickly those problems are fixed. In Salesforce the numbers come from Git and the pipeline, and tools such as sfdx-hardis report them directly. What matters is the trend over several months. I use the metrics to improve the release process, not to measure partners against each other. If you do that, you get polished numbers.

## What are DORA metrics?

DORA stands for DevOps Research and Assessment, a research programme that has studied since 2014 what makes good software delivery. Today the metrics are split into two groups ([dora.dev: History of DORA's software delivery metrics](https://dora.dev/guides/dora-metrics/history/)):

| Metric | Meaning | Group |
|---|---|---|
| Change lead time | time from commit to successful deployment in production | throughput |
| Deployment frequency | how often changes are deployed to production | throughput |
| Failed deployment recovery time | time until a failed deployment is fixed | throughput |
| Change fail rate | share of deployments that cause failures in production | instability |
| Deployment rework rate | share of deployments that are unplanned bug fixes | instability |

The rework rate was added as the fifth metric in 2024. That is why many tools and articles still talk about the four DORA metrics.

I liked the numbers when I first looked at them in sfdx-hardis, because a steering committee understands them. Nobody there wants to know how many pull requests were merged. But everybody understands the question whether a release disrupts operations less often than six months ago. What I learned about this in the training is in [what I learned from the free sfdx-hardis training](../sfdx-hardis-free-devops-training/).

## Where do the numbers come from in Salesforce?

The metrics need a data source in which every change has a timestamp. In Salesforce that is only reliable when all changes run through Git and a pipeline:

- **Lead time** from Git: time of the commit or pull request and time of the deployment to production.
- **Deployment frequency** from the pipeline runs against the production org.
- **Change fail rate and rework rate** from hotfixes: every hotfix branch and every rollback points to a deployment that caused problems.
- **Recovery time** from the ticket system: time from the incident report to the deployment of the fix.

sfdx-hardis provides a report on these metrics, and commercial DevOps tools for Salesforce offer similar analyses. I set up the pipeline for this on the client's own platform, see [DevOps and release management](../../services/devops-release-management/).

```hinweis achtung
Changes made directly in the production org do not show up in any Git statistics. Check the Setup Audit Trail regularly. If it lists many changes by users outside the pipeline, the DORA numbers are too good to be true.
```

## Salesforce has its own traps that distort the numbers

Salesforce programmes have a few peculiarities that distort the numbers:

- **Fixed release dates.** If you deploy once a month, most of the lead time is waiting for the next date. That is a decision of the programme, not a problem of the developers. The number still shows what this decision costs.
- **Manual steps.** A deployment counts as successful, but afterwards someone has to activate three flows by hand. If that goes wrong, it is a failure that never appears as a failed deployment in any statistic.
- **Data instead of metadata.** Product catalogues, pricing rules or configurator rules are stored as records in some clouds. If they are changed by hand, they are missing from the metrics.
- **Large packages.** A release with 200 changes that has one defect counts as one failed deployment. Smaller releases make the change fail rate more meaningful.

## IT leadership looks at the trend, not the single value

I recommend three rules:

1. **Trend instead of single value.** One month says little. Only over three to six months can you see whether smaller releases, more automation or reviews have an effect.
2. **No comparison with software companies.** The top values in the DORA reports come from teams that deploy several times a day. A manufacturer with a monthly Salesforce release compares itself with itself.
3. **No ranking of partners.** With several partners it is tempting to measure every partner by their change fail rate. Then hotfixes get renamed and defects get logged as new requirements. The metrics belong to the programme; the quality of single deliveries is what the [pull request review](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) is for.

```pro-contra
pro: DORA metrics in the steering committee
- Numbers anyone understands without technical knowledge
- Show whether investments in the release process pay off
- Come out of the pipeline without extra effort
contra: What to keep in mind
- Without a pipeline there is no reliable data
- Direct changes in production are missing from the numbers
- Used to compare partners, they lose their meaning
```

## Which lever improves which number?

The metrics are only useful if a bad number leads to an action. This mapping fits Salesforce programmes, because every lever sits in the release process itself and not in a budget for new tools:

- **Long lead time:** where does the change wait? Usually for the review, for UAT or for the release date. Smaller pull requests and agreed review response times help with the first cause, a shorter release cycle with the last.
- **Low deployment frequency:** releases are too big or too much work. Automated post-deployment steps make a release cheaper and so possible more often.
- **High change fail rate:** defects slip past the tests. A [UAT with test users per role](../salesforce-uat-business-acceptance-testing/) and regression tests for the most important processes catch most of them.
- **Long recovery time:** there is no fast path for fixes. A hotfix environment with the production state and a dedicated hotfix branch shorten it.

Worked example: a programme with twelve releases a year, four of which needed a hotfix, has a change fail rate of 33 percent. This number alone tells the steering committee more than a list of open tickets, and it can be checked again after every measure.

## First step: deployment frequency and change fail rate

Start with two numbers: deployment frequency and change fail rate. Both can be read from the pipeline and the number of hotfixes, even before a tool reports them automatically. Set today's value as the baseline and report the trend once a month. Lead time follows as soon as all changes run through pull requests. A hotfix is every change that reaches production outside the planned release, including a fix made directly in Setup that you only find in the Setup Audit Trail.
