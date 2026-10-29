---
title: "Salesforce monitoring and backup after go-live"
description: "How to run a Salesforce org after go-live: org monitoring, metadata and data backup, technical debt, DORA metrics and a safe path for hotfixes."
lang: en
slug: operations-monitoring-backup
course: devops
translationKey: devops-09
chapter: 9
pubDate: 2026-10-28
short: "Operations and monitoring"
summary: "What go-live adds to the job: daily org monitoring, tested backups, visible technical debt, DORA metrics and a hotfix path."
takeaways:
  - "A metadata backup in Git and a data backup are two different things; Git does not hold records, and a data backup does not replace the history of your configuration."
  - "Daily org monitoring shows changes made directly in production with before and after; the Setup Audit Trail only tells you who changed what."
  - "A backup is worth something only once you have rehearsed the restore, including new record IDs, sharing and your SAP integration."
  - "DORA has measured five metrics since 2024; they show where changes wait in your pipeline and are not meant for ranking your partners."
  - "A hotfix goes through a branch and the pipeline and is then merged back into ongoing development, even when it is a single field."
articles: [sfdx-hardis-introduction, ai-org-assessment-technical-debt, devops-salesforce-enterprise]
faq:
  - q: "Is the pipeline's Git repository enough as a backup?"
    a: "For metadata, largely; for data, not at all. The repository holds only what came through the pipeline. A daily metadata backup of the org catches changes made directly in production, and records need their own data backup with a restore."
  - q: "Which backup solution does Salesforce offer itself?"
    a: "Salesforce offers Backup & Recover, formerly Own Recover, with daily backups of data, files and metadata, plus Backup & Recover Next as its new native solution. Salesforce does not publish prices; they depend on your needs."
  - q: "Does sfdx-hardis back up data as well?"
    a: "No. sfdx-hardis monitoring backs up the org's metadata to Git every day and runs checks. For records you need a product such as Salesforce Backup & Recover, Gearset Data Backup or Flosum Backup & Archive."
  - q: "Which DORA metrics are current?"
    a: "Five: change lead time, deployment frequency and failed deployment recovery time for throughput, and change fail rate and deployment rework rate for instability. Rework rate was added in 2024."
draft: false
---

After go-live, operations decide whether your release process holds. Five things belong to it: daily org monitoring that reports changes made directly in production, errors and limits; a metadata backup in Git; a separate data backup with a rehearsed restore; a visible list of technical debt; and DORA metrics that show where changes wait. Hotfixes go through the same pipeline and are merged back afterwards. For monitoring I use sfdx-hardis as the example, while Gearset, Flosum and Salesforce Backup & Recover cover parts of it commercially. All of it belongs to the client, not the partner.

## What does running Salesforce after go-live involve?

The first eight chapters followed a change all the way to production, most recently [release planning around the three Salesforce releases](../release-planning-salesforce-releases/). The deployment does not end the work. In a programme with several partners, configuration, data and usage of the org change every week, and not every change comes through the pipeline.

| Task | Question it answers | Example tool |
|---|---|---|
| Org monitoring | What changed in production, what is going wrong? | sfdx-hardis monitoring, Gearset change monitoring |
| Metadata backup | What did the configuration look like yesterday? | Git, sfdx-hardis, Gearset, Salesforce Backup & Recover |
| Data backup and restore | How do I get lost or overwritten records back? | Salesforce Backup & Recover, Gearset, Flosum |
| Technical debt | What in the org is unused, outdated or risky? | sfdx-hardis monitoring, Code Analyzer |
| DORA metrics | How fast and how stable do we deliver? | sfdx-hardis DORA report, Gearset reporting |
| Incidents and hotfixes | How does an urgent fix reach production safely? | your pipeline with a hotfix branch |

Each row needs one person who owns it. In most programmes that is the release role from [chapter 2](../release-process-ownership-roles/), backed by the partners.

## Org monitoring: what to check every day

Salesforce records Setup changes in the [Setup Audit Trail](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) for at least the last 180 days. It tells you who changed something and when. It does not tell you what the validation rule looked like before. That is exactly the question operations ask, for example when dealers suddenly cannot create warranty claims in the portal.

[sfdx-hardis monitoring](https://sfdx-hardis.cloudity.com/salesforce-monitoring-home/) answers it with a dedicated Git repository. Every night a CI job retrieves all metadata from the org and commits whenever something changed. Further checks run on top of that backup, most of them daily and the less urgent ones weekly:

- **Daily:** Apex tests, Apex and Flow runtime errors, org limits, calls to deprecated API versions, suspect Setup actions by anyone other than the deployment user, analysis of deployments and validations, code quality through MegaLinter.
- **Weekly:** Security Health Check, MFA configuration, licence usage, active users without a login for six months, upcoming Release Updates and the date of the next Salesforce upgrade.

Results go to Slack, Microsoft Teams, email, or through an API to Grafana. According to the docs, sfdx-hardis replaces usernames and email addresses with stable pseudonyms in reports and notifications when monitoring runs in CI. That helps if your works council asks.

```hinweis tipp
According to the docs, a green job only means it ran to the end. Failing tests or a limit close to its maximum show up in the notifications. The job turns red only when it could not run itself, for example because of expired authentication. So set up at least one channel that someone actually reads.
```

I have used sfdx-hardis in client projects for about two years, and monitoring does not need a CI/CD project. You can switch it on before the pipeline is in place. Gearset's [change monitoring](https://docs.gearset.com/en/articles/604536-automating-org-change-tracking-and-metadata-backup) takes a daily metadata snapshot with a comparison to the previous day, rollback of individual changes and notifications by email, Slack, Teams or Chatter. If you already deploy with Gearset, you get this without a separate repository and with a well-made interface.

In daily work, the most important alert is the change made directly in production. An admin quickly adjusts a permission set while onboarding a dealer, a partner fixes a formula in Setup. The next deployment from the repository wipes that change out. Monitoring shows it the next morning, and it goes back into the repository as a user story.

## Which backups does a Salesforce org need?

Two, and they solve different problems. The **metadata backup** protects configuration and code: objects, fields, flows, Apex, profiles, permission sets. The **data backup** protects records: accounts, assets, work orders, warranty claims, files.

Your Git repository already is a metadata backup, but only for what came through the pipeline. The daily backup from monitoring covers the rest. According to the [metadata backup docs](https://sfdx-hardis.cloudity.com/salesforce-monitoring-metadata-backup/), sfdx-hardis reads profiles again in full and records deleted components as deletions in the Git history. sfdx-hardis does not back up records.

For data there are several options:

| Product | What it backs up | Frequency according to the vendor |
|---|---|---|
| [Salesforce Backup & Recover](https://help.salesforce.com/s/articleView?id=xcloud.backup_recover_o_overview.htm&language=en_US&type=5) | data, files, metadata, managed packages, sandboxes | daily, optional Continuous Data Protection |
| [Backup & Recover Next](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.backup_recover.htm&type=5) | data, a full backup first, then incremental | daily |
| [Gearset Data Backup](https://docs.gearset.com/en/articles/8120431-data-backup) | data and metadata | every 24 hours, hourly for up to 10 objects |
| [Flosum Backup & Archive](https://docs.flosum.com/backup-and-archive) | data and metadata, plus archiving | scheduled or manual |

Backup & Recover used to be called Own Recover. Salesforce [agreed to acquire Own](https://www.salesforce.com/news/press-releases/2024/09/05/salesforce-signs-definitive-agreement-to-acquire-own-company/) in September 2024 and closed the deal on 18 November 2024. On its [product page](https://www.salesforce.com/platform/data-backup-recovery/), Salesforce states a default retention of 99 years and says on pricing only that it "varies based on each customer's individual needs". According to its docs, Gearset stores backups on AWS in the US, Ireland, Australia or Canada, and according to its [product page](https://gearset.com/solutions/backup) it can alert you when unusual numbers of records are added, changed or deleted. With Flosum, ask about the storage location directly.

Which product fits depends less on features than on your setting: where may the data live, which tool do you already deploy with, who may trigger a restore? That decision belongs in the tool choice from [chapter 4](../devops-tools-compared/), not in a later add-on order.

### Why you should rehearse the restore

A backup that nobody has ever restored from is an assumption. The [Salesforce Help page on restoring records with Salesforce Backup](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.backup_restore_restore_records.htm&type=5) points to two things that can hurt in manufacturing. After a restore you can export a report that maps each original record ID to the new one, so restored records can have new IDs.

```hinweis achtung
If your SAP integration writes order status back by Salesforce ID, those updates miss after a restore. External IDs on the affected objects protect you against this.
```

Also, according to the [guide on planning a backup strategy](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.backup_restore_plan.htm&type=5), restored share objects can bring back outdated access. After a restore, check that dealers still see only their own assets. Salesforce Help lists Salesforce Backup, Backup & Recover and Backup & Recover Next as separate topics; find out which product you have licensed and rehearse the restore with exactly that one.

I would rehearse a restore once a quarter in a sandbox, using an object that processes depend on, such as assets with maintenance plans. Moving and masking data between orgs is covered in [chapter 7](../data-and-configuration/).

## Keeping technical debt visible

Technical debt grows quietly in an org with several partners: an Apex class nobody calls any more, a permission set with two users, a field without a description, classes on old API versions. The weekly sfdx-hardis checks find exactly that, among them unused Apex classes, unused custom labels, inactive metadata, underused permission sets, missing field descriptions and Apex on deprecated API versions. The quality gates before the merge from [chapter 6](../quality-tests-reviews/) prevent new debt; monitoring shows the old.

A list alone changes nothing. I recommend a separate backlog for technical debt, with a fixed share of capacity in every release, and clear ownership: whoever built a component cleans it up. Before a partner change, a deeper analysis pays off. How an LLM can do the reading while the tools supply the facts is covered in [AI org assessment: technical debt before a partner change](../../../blog/ai-org-assessment-technical-debt/).

## Which DORA metrics make sense for Salesforce?

DORA (DevOps Research and Assessment) is the research programme behind the most widely used software delivery metrics. According to [dora.dev](https://dora.dev/guides/dora-metrics/), there are five today:

| Metric | What it measures |
|---|---|
| Change lead time | The time a change takes from being committed to version control to being deployed in production. |
| Deployment frequency | The number of deployments in a given period, or the time between deployments. |
| Failed deployment recovery time | The time it takes to recover from a deployment that fails and requires immediate intervention. |
| Change fail rate | The share of deployments that require immediate intervention, such as a rollback or a hotfix. |
| Deployment rework rate | The share of deployments that are unplanned and happen because of an incident in production. |

The first three measure throughput, the last two instability. According to the [history of the metrics](https://dora.dev/guides/dora-metrics/history/), the former MTTR was renamed and redefined in 2023, and rework rate was added in 2024. Many tools still show the four older metrics.

The sfdx-hardis [DORA report](https://sfdx-hardis.cloudity.com/hardis/doc/salesforce-devops-dora-report/) computes all five for each stage of the pipeline, from the deployment jobs and pull requests in your Git platform. Deployments outside the pipeline, such as change sets, do not count. For a client, the most useful part to me is how long changes wait at each stage. If user stories sit in UAT for three weeks because the service team has no time to test, you see it there. Gearset's [DevOps performance dashboard](https://docs.gearset.com/en/articles/11560575-measuring-your-devops-performance) shows the four classic metrics, with change failure rate based on bugs your team reports. It requires an Automation Platform licence at the Teams or Enterprise tier.

I would set two rules. First, compare numbers only within one tool. sfdx-hardis measures lead time from the creation of the pull request, DORA from the commit. Second, measure the process, not the partners. A ranking makes teams slice changes thin to look good and label failures differently.

## Incidents and hotfixes in operations

When something breaks in production, the first question is: data or metadata? The path depends on the answer.

```schritte
Detect
  Monitoring reports Apex or Flow errors, or users call in. Gearset can alert on unusual data changes.
Classify
  If configuration or code is wrong, it goes through the pipeline. If records were lost or overwritten, it goes through the data backup.
Fix
  Metadata through a hotfix branch with review and validation. Data through a targeted restore of the affected fields and records.
Merge back
  The hotfix goes back into the development branches.
Follow up
  Record the cause, the duration and whether a deployment was involved. Change fail rate and rework rate come from this.
```

sfdx-hardis describes this as two streams: RUN for quick fixes, BUILD for the next version. A [hotfix](https://sfdx-hardis.cloudity.com/salesforce-devops-hotfixes/) goes through a branch to preprod and production, followed by a retrofit into the BUILD branches. The docs are blunt about it: fixing something by hand in Setup is never on the list, not even at 2 am, because the next deployment overwrites it. The hotfix path in the branch model is covered in [chapter 3](../environments-and-branching/), validation in the pipeline in [chapter 5](../building-the-pipeline/).

A typical scenario, as an assumption: a machine builder runs Field Service and a dealer portal. On Monday morning, monitoring reports Flow errors when work orders are created. The audit trail shows a change in Setup on Friday, and the metadata backup shows the changed decision in the flow. At the same time it turns out that a data import over the weekend overwrote the warranty end date on thousands of assets. The flow is fixed by hotfix and merged back. The warranty end date comes back through a restore of exactly that field from Friday's backup, without touching Monday's new work orders.

## Who owns operations?

The monitoring repository, the backup product, the notification channels and the metrics belong to the client, for the same reasons as the repository and the pipeline: they should survive a partner change. Why I see it that way is in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/). Partners get access to the channels and the duty to respond to alerts about their components within an agreed time. That belongs in the contract; see [partner governance](../../../services/partner-governance/).

How monitoring and backup fit into the whole process is covered in [why DevOps decides Salesforce enterprise projects](../../../blog/why-devops-matters-salesforce-enterprise/) and the [introduction to sfdx-hardis](../../../blog/sfdx-hardis-open-source-salesforce-devops/). The order in which to introduce all of this is the topic of the last chapter, [rollout and roadmap](../rollout-roadmap/). My advice for the start: monitoring and data backup first, because you can switch on both before the pipeline is finished. How I support this is described under [DevOps and release management](../../../services/devops-release-management/).

Stable operations mean you can see every change, get every record back and trace every hotfix; if you would like to set this up or have it reviewed for your org, [send me a message](#contact).
