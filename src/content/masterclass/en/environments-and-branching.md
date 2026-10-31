---
title: "Salesforce sandbox strategy and branching"
description: "Which sandboxes a Salesforce programme needs, when scratch orgs fit, which branch model holds up, and how to run refreshes and hotfixes cleanly."
lang: en
slug: environments-and-branching
course: devops
translationKey: devops-03
chapter: 3
pubDate: 2026-10-28
short: "Environments and branches"
summary: "How sandboxes, scratch orgs and branches fit together so developer orgs stay current and hotfixes do not get lost."
takeaways:
  - "Scratch orgs live for 30 days at most and start empty. In a mature client org, developer sandboxes with source tracking are often more practical."
  - "Developer sandboxes fall behind with every merge. sfdx-hardis backpromote, Gearset and the back promotions in Copado and Flosum bring them back."
  - "A hotfix is finished only when a retrofit has put it into the integration branch too. Otherwise the next release overwrites the fix in production."
  - "A refresh replaces the sandbox with a new copy of production. Source tracking and undelivered changes are lost in the process."
articles: [devops-salesforce-enterprise, sfdx-hardis-training, sandbox-data-ai-coding-agents]
faq:
  - q: "How many sandboxes does a Salesforce programme with several partners need?"
    a: "At least one development environment per developer or story, plus an integration, a UAT and a staging sandbox. If you have no Partial Copy licence, UAT and staging share the Full sandbox, and you plan acceptance and the dress rehearsal one after the other."
  - q: "Should we use scratch orgs instead of sandboxes?"
    a: "For new, well-contained packages, yes. An org that has grown over years often cannot be deployed in full from the repository into an empty scratch org. Developer sandboxes with source tracking are then the better workplace."
  - q: "What is a backpromote in sfdx-hardis?"
    a: "A backpromote deploys into a developer sandbox what the team has merged into the parent branch since the last run, including deletions and deployment actions. According to Cloudity the feature is in beta, and it refuses production and the orgs of major branches."
  - q: "How often can a Full sandbox be refreshed?"
    a: "According to Salesforce, every 29 days; a Partial Copy every 5 days, Developer and Developer Pro sandboxes daily. Still put Full refreshes into the release calendar, because they interrupt running tests."
draft: false
---

A workable Salesforce sandbox strategy gives every pipeline stage its own org and its own Git branch: development in developer sandboxes or scratch orgs, then integration, UAT, staging and production. Feature branches are short-lived and move through the stage branches by pull request. Two things decide day to day whether the model holds: developer sandboxes must regularly catch up with the team's work, and every hotfix must go back into the integration branch. Otherwise the next release overwrites the fix in production. Tools such as sfdx-hardis, Gearset, Copado or Flosum support both; you set the rules as the client.

## Which sandboxes does a Salesforce programme need?

Salesforce offers [four sandbox types](https://www.salesforce.com/platform/what-is-salesforce-sandbox/) with different data and refresh intervals:

| Sandbox type | Contents | Data storage | Refresh at most |
|---|---|---|---|
| Developer | metadata only | 200 MB | daily |
| Developer Pro | metadata only | 1 GB | daily |
| Partial Copy | metadata plus a sample defined by a sandbox template | 5 GB | every 5 days |
| Full | metadata, all data and files | same as production | every 29 days |

How many of each type you have depends on your edition and the licences you bought. For a programme with several partners, I would assign the environments like this:

| Stage | Org | Who works there | Data |
|---|---|---|---|
| Development | developer sandbox or scratch org, one per developer or story | partner developers and admins | seed test data |
| Integration | Developer Pro | only the pipeline deploys, developers test | seed test data, interface stubs |
| UAT | Partial Copy, masked | business users, key users | sample, masked |
| Staging (preprod) | Full | release manager, tests against the SAP QA system | all data |
| Production | production | only the pipeline deploys | real data |

Two rules are not negotiable for me. In integration, UAT, staging and production only the pipeline deploys, never a person through change sets or Setup. And which data may sit in which stage is a decision you make with your data protection officer; the details are in [sandbox customer data: what AI coding agents may read](../../../blog/sandbox-customer-data-ai-coding-agents/). If you have no Partial Copy licence, UAT and staging share the Full sandbox, and acceptance and the dress rehearsal have to run one after the other.

Who owns which org and who approves deployments to it is set out in [chapter 2 on ownership and roles](../release-process-ownership-roles/). The sandboxes belong to the client, even if a partner uses them every day.

## When do scratch orgs fit, and where do they hit limits?

Salesforce describes a scratch org as a ["source-driven and disposable deployment of Salesforce code and metadata"](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs.html). It is built from the repository, starts empty and lives for 30 days at most; according to the [guide to creating them](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs-create.html), 7 days is the default. Once expired, it cannot be restored. Salesforce explicitly says not to put personal data into them.

The number is limited by the Dev Hub, which is your production org. According to the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs-editions-and-allocations.html):

| Dev Hub edition | Active scratch orgs | Created per 24 hours |
|---|---|---|
| Enterprise | 40 | 80 |
| Unlimited, Performance | 100 | 200 |

Each scratch org has 500 MB of data and 50 MB of file storage. For a programme with 30 developers on Enterprise Edition that is enough, as long as expired orgs are deleted consistently.

The real limit lies elsewhere. A scratch org contains only what is in the repository and can be deployed, plus the features and settings from the definition file, which Salesforce calls the org's "shape". In my assessment, an org that has grown over years with Service Cloud, Field Service, a dealer portal, managed packages and manual settings can rarely be deployed in full into an empty scratch org. Getting there is a project of its own.

My advice for mature orgs: developer or Developer Pro sandboxes as the workplace, with [source tracking](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html) switched on. It exists only for these two types, not for Partial Copy and Full. Scratch orgs pay off for new, self-contained parts, for example a separate package for a warranty app. sfdx-hardis supports both; the [free training](../../../blog/sfdx-hardis-free-devops-training/) sets up a Dev Hub and scratch orgs, for example, but for a mature client org I would still start with sandboxes.

## What does a branch model look like that several partners can share?

A branch is a separate line of development in the Git repository. For Salesforce, a model with two kinds of branches has become common:

- **Stage branches** (major branches) belong to one org each. sfdx-hardis calls them ["major branches"](https://sfdx-hardis.cloudity.com/salesforce-devops-deploy-major-branches/), defined as "git branches that have an associated CI/CD org", with the chain `integration`, `uat`, `preprod` and `main` for production. A merge into the branch deploys to its org.
- **Feature branches** (user story branches) have no org of their own in the pipeline sense. A developer builds a story in their sandbox, commits to the feature branch and opens a pull request to `integration`.

```ablauf
sf: Feature branch, integration, uat, preprod, main production
Feature branch --Pull request--> integration
integration --Promotion--> uat
uat --Promotion--> preprod
preprod --Promotion--> main production
```

From there, changes move up between stage branches by pull request. According to sfdx-hardis, such a pull request promotes everything merged into the source branch since its last promotion. Gearset also works with long-lived environment branches in its pipelines. The tools are compared in [chapter 4](../devops-tools-compared/).

One honest caveat: DORA recommends [trunk-based development](https://dora.dev/capabilities/trunk-based-development/) for high-performing teams, with three or fewer active branches and merging to trunk at least once a day. A model with four stage branches goes against that. I still consider it right for programmes with business acceptance and several partners, because each stage stands for a different approval. You pay the price through long-lived feature branches. So my rule is: feature branches live for days, not weeks, and a story that does not fit into a sprint gets split.

Stories not yet accepted in UAT block a promotion from `uat` to `preprod`. sfdx-hardis offers [promotion branches](https://sfdx-hardis.cloudity.com/salesforce-devops-promotion-branches/) in beta for this, but calls them the exception path itself. The normal case is still to promote UAT as one tested version.

## How do developer sandboxes stay current?

Every merge into `integration` leaves every developer sandbox a little further behind. Whoever builds on a state from three weeks ago creates conflicts that only show up in the pull request, or deploys old versions of other people's components along with their own. That is how the changes that overwrite each other, which I described in [why DevOps decides Salesforce enterprise projects](../../../blog/why-devops-matters-salesforce-enterprise/), come about.

The process is called back promotion or backpromote: changes from a higher stage are brought back into the development environments. This is how the tools handle it:

```vertiefung Tools
title: Back promotion in sfdx-hardis, Gearset, Copado and Flosum
- **sfdx-hardis.** The [backpromote](https://sfdx-hardis.cloudity.com/salesforce-devops-backpromote/) deploys into a developer sandbox or scratch org what has been merged into the parent branch since the last run, including deletions and deployment actions. Before it runs, it shows each item compared with the sandbox; where they differ, you choose between overwriting, keeping and merging. It refuses production and the orgs of major branches, never runs a deployment action twice in the same sandbox, and runs from the VS Code extension or as `sf hardis:work:backpromote`. According to Cloudity the feature is in beta.
- **Gearset.** [Developer sandbox updates](https://docs.gearset.com/en/articles/9729558-getting-started-with-developer-sandbox-updates-in-pipelines) list each promotion to the base branch as an update you deploy to the sandbox. Before that, Gearset captures uncommitted work in the sandbox and merges it with the updates.
- **Copado.** [Back promotions](https://docs.essentials.copado.com/en/articles/8098362-back-promotions-with-copado-essentials) show which deployments an environment is missing and deploy them back together, without a refresh.
- **Flosum.** A [backpromotion pipeline](https://flosum.com/blog/keep-all-your-salesforce-sandboxes-in-sync-using-flosum-pipelines) brings production changes into the sandboxes.
```

The commercial tools make this convenient and usable with little Git knowledge; that is their strength. Which tool you pick matters less than one rule in the partner contract: before every new story and after every refresh, the developer sandbox is brought up to the state of its parent branch.

## Sandbox refresh without surprises

A refresh replaces the sandbox with a new copy of production. According to [Salesforce Help on users and contacts in sandboxes](https://help.salesforce.com/s/articleView?id=platform.data_sandbox_users_and_contacts.htm&language=en_US&type=5), user email addresses get `.invalid` appended when a sandbox is created or refreshed. Salesforce does not change other email addresses, such as those on contacts, though; at a manufacturer with thousands of dealer contacts in a Full sandbox, that is a real risk of accidental emails. Source tracking is [deleted](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html) by a refresh. With the Salesforce CLI, a refresh runs with [`sf org refresh sandbox`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_org_refresh_sandbox.html), which activates the sandbox automatically by default.

My checklist for every refresh of a stage sandbox:

```schritte
Secure changes first
  Commit or consciously discard every change that exists only in the sandbox. Gearset also recommends syncing the environment branch with `main` first and [pausing](https://docs.gearset.com/en/articles/10256103-salesforce-sandbox-refresh-in-a-pipeline) pipeline runs into that org during the refresh.
Deploy the stage branch
  After the refresh, the sandbox contains only what is already in production.
Check interfaces
  Do named credentials and endpoints point to the SAP QA system instead of the production one?
Restore the data
  Contact addresses, masking and seed data, as described in [chapter 7 on data and configuration](../data-and-configuration/).
Reconnect the pipeline
  If its authentication was tied to the old org.
```

Developer sandboxes are simpler: after the refresh, run a backpromote and the developer is up to date. sfdx-hardis then marks earlier runs as "Before refresh" and treats deployment actions as not yet run.

The timing of a refresh has one more side effect: it decides whether a sandbox sits on a [preview instance](https://trailhead.salesforce.com/content/learn/modules/sf_releases/sf-releases-sandbox-preview) and gets the next Salesforce release about four to six weeks before production. How to plan for that is covered in [chapter 8 on release planning](../release-planning-salesforce-releases/).

## The hotfix path

A defect in production cannot wait until UAT is accepted. So every programme needs a second, short path. In sfdx-hardis, according to the [hotfix documentation](https://sfdx-hardis.cloudity.com/salesforce-devops-hotfixes/), it looks like this: the developer starts a story targeting `preprod` in a sandbox cloned from production, the pull request goes to `preprod` and from there to `main`.

```hinweis achtung
The second pull request to `main` promotes everything merged into `preprod` since its last promotion, not only the hotfix. So nothing half-finished may sit in `preprod`.
```

The critical step comes afterwards. The stage branches below were cut before the fix and hold the old version of the same metadata. Once they are promoted, the fix disappears from production again. sfdx-hardis calls the way back a [retrofit](https://sfdx-hardis.cloudity.com/salesforce-devops-retrofit/): `main` is merged into a `retrofit/from-main` branch and brought to `integration` by pull request, and right away, because a delayed retrofit turns into a growing conflict. After a hotfix into `main`, Gearset automatically creates [back propagation pull requests](https://docs.gearset.com/en/articles/9773388-org-syncing-with-pipelines) for the lower environments, but does not promote them itself. Someone still has to review and merge them.

The same logic applies to changes someone made by hand in production. They come back into the repository from the bottom as a normal story. How you notice such changes at all is covered in [chapter 9 on operations and monitoring](../operations-monitoring-backup/).

## Example: three partners on one service org

A machine builder runs Service Cloud, Field Service and a dealer portal on one org, with SAP as ERP. Three partners work in parallel: one on field service, one on the portal, a nearshore team on interfaces. All figures here are assumptions.

- **18 developer sandboxes** of type Developer with source tracking, one per developer, plus a shared seed data set in the repository.
- **One integration sandbox** (Developer Pro) and an `integration` branch. Each partner merges there only by pull request with review.
- **One Partial Copy** for UAT, masked, with acceptance by service and sales.
- **One Full sandbox** for staging and end-to-end tests against the SAP QA system, refreshed after each of the company's quarterly releases.
- **One hotfix path** through `preprod`, with the retrofit on the same day.

The rules for this are in the contract with every partner: backpromote before every story, no changes in Setup of a stage org, no feature branch older than two weeks. How the pipeline runs between these stages technically is described in [chapter 5](../building-the-pipeline/). I design such models as part of my work in [DevOps and release management](../../../services/devops-release-management/).
