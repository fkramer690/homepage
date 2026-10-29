---
title: "Salesforce DevOps rollout: roadmap and metrics"
description: "The roadmap from change sets to your own Salesforce pipeline in seven phases: team training, avoiding typical mistakes, measuring progress, planning for agents."
lang: en
slug: rollout-roadmap
course: devops
translationKey: devops-10
chapter: 10
pubDate: 2026-10-28
short: "Rollout and roadmap"
summary: "Seven phases from change sets to a client-owned pipeline, with training, metrics and an outlook on coding agents."
takeaways:
  - "A Salesforce DevOps rollout works in phases with a checkable result: ownership, Git, validation, quality gates, data, release calendar and operations, in that order."
  - "One stream or partner goes first as a pilot, the others follow on dates written into the contract; a cut-off date ends change sets for UAT and production."
  - "The most important investment is an internal release role; licence savings from the tool choice are better spent there than on extra partner days."
  - "Measure against a baseline: the DORA metrics plus your own figures, such as manual steps in the release plan and waiting time until the first review."
  - "Coding agents amplify what the pipeline already does; they come after the quality gates, with a rules file in your repository and the same checks as for people."
articles: [sfdx-hardis-training, quality-gates-ai-code-pipeline, agentforce-agents-release-pipeline, ai-rules-file-salesforce-repo, nearshore-teams-with-ai-agents]
faq:
  - q: "How long does the move from change sets to a Salesforce pipeline take?"
    a: "It depends on the number of teams, partners and integrations. Plan in phases with exit criteria rather than a fixed end date. The pilot with one stream shows after a few releases how fast the others can follow."
  - q: "Do all partners have to switch to the new pipeline at the same time?"
    a: "No. One stream goes first, the others follow on fixed dates. The tool, the branch model and the approval rules apply to everyone from the start, though, and belong in the contracts."
  - q: "What training do admins and developers need for Salesforce DevOps?"
    a: "For Git, pull requests and merge conflicts, hands-on courses such as levels 1 and 2 of the free sfdx-hardis training or the free courses on Gearset's DevOps Launchpad are enough. Release managers also need level 3 or their tool vendor's training."
  - q: "Which metrics show that the DevOps rollout is working?"
    a: "The five DORA metrics, meaning deployment frequency, lead time, change fail rate, recovery time and deployment rework rate, measured against a baseline. Add your own figures: share of deployments through the pipeline, manual steps per release and waiting time until the first review."
  - q: "When should coding agents enter the Salesforce pipeline?"
    a: "Once pull request reviews are mandatory, the quality gates block and a rules file sits in the client's repository. Before that, agents mostly produce more unreviewed changes."
draft: false
---

The move from change sets to a Salesforce DevOps pipeline works in phases, not in one big switch. I recommend seven phases in the order of this masterclass: settle ownership and tooling, make Git the single source, build a validation pipeline, switch on quality gates, bring data and configuration along, set a release calendar and secure operations. Each phase ends with a result you can check. One stream goes first as a pilot, and the other partners follow on fixed dates. In parallel you build knowledge in-house, for example with the free sfdx-hardis training, and measure progress against a baseline. Coding agents come once this pipeline is in place.

## What does the roadmap from change sets to a pipeline look like?

The nine chapters before this one each describe one building block. For the rollout, the order matters, because each phase depends on the one before:

| Phase | What you get | Exit criterion | Chapter |
|---|---|---|---|
| 1. Ownership and tooling | You own repository, pipeline and tools; roles and approvals are named | Release manager named, tool decision in writing, rules in every partner contract | [1](../release-management-basics/), [2](../release-process-ownership-roles/), [4](../devops-tools-compared/) |
| 2. Git as the source | Production metadata in the repository, sandbox strategy, branch model | Every change starts on a feature branch | [3](../environments-and-branching/) |
| 3. Validation pipeline | Pull requests, validation deployments, delta deployments, login without passwords | UAT and production no longer accept change sets | [5](../building-the-pipeline/) |
| 4. Quality gates | Mandatory reviews, Apex and Flow tests, static analysis with a threshold | Merge only with a green pipeline and approval | [6](../quality-tests-reviews/) |
| 5. Data and configuration | Reference and configuration data from the repository, masked sandboxes | No manual data step left in the release plan | [7](../data-and-configuration/) |
| 6. Release rhythm | Release calendar, freeze windows, plan for the three Salesforce releases | Calendar for twelve months published | [8](../release-planning-salesforce-releases/) |
| 7. Operations | Monitoring, backup, hotfix path, metrics | Restore rehearsed once, hotfix runs through the pipeline | [9](../operations-monitoring-backup/) |

**Phase 1 needs little technology and decides the most.** Whoever picks the tool sets the standard. If the choice comes late, or a client leaves it to the first partner, two partners build two processes and the client pays to merge them. I therefore recommend making the tool decision early and binding for every partner, for the reasons in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/).

**Phase 2 starts with production as the truth.** Until the repository exists, the production org is the only complete source. You pull the starting point with `sf project retrieve start` and a `package.xml` passed via `--manifest`, according to the [CLI reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_retrieve_start.html). From that day on, anyone who changes something in production Setup creates drift, and drift goes back into the repository before the next release runs.

**Phases 3 and 4 overlap with a delay.** A pipeline that blocks everything from day one meets hundreds of legacy findings in a mature org. Partners then switch rules off instead of fixing code. I would block only severe findings at first and report the rest, as described in [quality gates for AI code](../../../blog/quality-gates-for-ai-code-salesforce-pipeline/), and tighten the threshold every quarter.

**A pilot goes first.** Pick a stream with many small changes and limited risk, such as the dealer portal, not the SAP integration. After two or three releases in the pilot you see where your pipeline sticks, before every partner depends on it. The other streams follow on dates written into the contract. A cut-off date ends change sets for UAT and production; after that there is no exception for "just this one field".

## How do you enable your team and your partners?

```hinweis tipp
The most important investment is a person: an internal release role that owns the pipeline, the calendar and the approvals. If you pick an open-source tool or a cheaper package, the licence savings are better spent there than on extra partner days. Without that role, the process effectively belongs to whichever partner knows it best again.
```

Training comes next, and it should be hands-on. I have used sfdx-hardis in client projects for about two years and completed all three levels of the [free sfdx-hardis training](https://sfdx-hardis.cloudity.com/salesforce-devops-training/) in October 2026. In 27 labs you build a complete pipeline on free Developer Edition orgs and a GitHub account, and you only get a badge once a job has checked the work in your own repository. Even with prior experience it took me almost a day. My notes are in [what I learned from the sfdx-hardis training](../../../blog/sfdx-hardis-free-devops-training/).

The commercial vendors have their own offers, and I have taken courses from Gearset, Flosum and Copado. Gearset runs [DevOps Launchpad](https://docs.gearset.com/en/articles/4497508-what-is-devops-launchpad), a free platform with courses, quizzes and certificates whose content is mostly not tied to Gearset. According to its [training page](https://copado.com/training), Copado offers the Copado Academy and free workshops that include an exam voucher. Flosum has two courses, Professional and Expert, under [Flosum Certified Learning](https://flosum.com/certification). Use the training for the tool you chose; for Git and pull request basics, any of them will do.

| Role | What they need to handle | Suitable training |
|---|---|---|
| Admins and consultants | Branch, pull request, merge conflict without fear | sfdx-hardis levels 1 and 2, DevOps Launchpad |
| Developers and tech leads | Deployment steps, quality gates, test coverage | sfdx-hardis level 2, the tool vendor's training |
| Release managers | Reviews, UAT, production, hotfix, metrics | sfdx-hardis level 3, the tool vendor's training |
| Product owners, business units | Read the release calendar, sign off UAT | no course, one hour with the release manager |

I would treat partners like internal teams and require in the contract that every developer shows the basic training and has read the onboarding document in your repository before their first pull request. That costs a day per person and saves the discussion in sprint three about why the partner would like to deploy by change set after all. How this fits into steering several partners is part of my [partner governance](../../../services/partner-governance/) work.

## Which mistakes slow the rollout down?

These patterns follow from the structure of a programme with several partners, which is why they keep coming back:

- **The tool comes before the process.** A licence does not replace a branch model, an approval rule or a release manager.
- **The first partner sets everything up.** Repository and pipeline then sit in their organisation, and a partner change turns into a migration project.
- **All streams switch at once.** A pipeline fault then stops the whole programme instead of one pilot.
- **Production stays open.** A quick fix in production Setup creates drift, and the next deployment either overwrites it or fails.
- **Gates block everything from day one.** The result is switched-off rules and `// NOPMD` comments instead of better code.
- **Only developers get trained.** Admins keep building in Setup because nobody showed them pull requests.
- **Nobody measures.** Without a baseline you cannot show the steering committee what the change achieved.

```hinweis achtung
Mandatory reviews belong in from the start, even while the pipeline is still simple. The reasons are in [why pull request reviews are a must](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).
```

## How do you measure progress?

DORA now describes [five metrics](https://dora.dev/guides/dora-metrics-four-keys/) for software delivery: change lead time, deployment frequency, failed deployment recovery time, change fail rate, and deployment rework rate, the share of unplanned deployments caused by a production incident. The first three measure throughput, the last two instability.

The tools provide part of this. According to its documentation, the [sfdx-hardis DORA report](https://sfdx-hardis.cloudity.com/hardis/doc/salesforce-devops-dora-report/) computes all five per major branch, as described in [chapter 9](../operations-monitoring-backup/), and the [overview](https://sfdx-hardis.cloudity.com/salesforce-devops-home/) rates the classic four against industry benchmarks. Gearset has a [DevOps performance dashboard](https://docs.gearset.com/en/articles/11560575-measuring-your-devops-performance) with the same four, which requires a Teams or Enterprise Automation Platform licence and Pipelines with the promotion branch strategy; change failure rate and time to restore are based on bugs your team reports in promotions. Both figures are therefore only as good as the discipline in reporting.

For a programme in rollout, I would add four figures of my own, because they show progress earlier than DORA:

1. **Share of deployments through the pipeline** among all deployments to UAT and production. The target is 100 percent by the cut-off date.
2. **Manual steps in the release plan.** Every line someone executes by hand in Setup is a risk on release night.
3. **Waiting time until the first review** per pull request. If it rises, you are short of review capacity, not developer capacity.
4. **Drift findings per month** from monitoring, meaning changes in production that did not come from the repository.

Take the baseline before phase 2 starts, from the release plans of the last six months if need be. I would report these figures to the steering committee every quarter on one page, split by stream and partner.

## A typical scenario, as an assumption: three partners, one org

A typical scenario, as an assumption: a machine builder runs Service Cloud, Field Service for its field technicians, a dealer portal on Experience Cloud and an SAP integration for orders and spare parts. Three partners deploy by change set, and every four weeks there is a release with a plan of 60 manual lines. All figures are assumptions.

```schritte
Settle ownership | Months 1 and 2 · client
  The client names an internal release manager, decides on a tool and adds an annex to all three contracts with the branch model, the review duty and the cut-off date.
Start the pilot | Month 3
  The repository is built from production, and the dealer portal stream starts as the pilot.
Validate and train | Months 4 and 5
  Validation on every pull request, gates block severe findings. The release manager and two admins do the training.
Switch all streams | Month 6
  The Field Service and SAP partners switch, cut-off date for change sets.
Data and operations | Months 7 to 9
  Price books and Field Service configuration move into the repository, the release calendar is set, and monitoring reports drift.
```

After nine months the release plan has twelve manual lines instead of 60, UAT gets new builds weekly instead of monthly, and a partner change in the Field Service stream would be a contract question, not a technical project. These figures are planning values for the example, not measurements.

## What changes when coding agents work in the pipeline?

Coding agents write code faster than people can review it. A pipeline with mandatory reviews and blocking gates absorbs that; a pipeline without them just moves it into production faster. That is why DORA lists [working in small batches](https://dora.dev/capabilities/) among the capabilities that offset the risk when AI speeds up development. For me the order is clear: phases 1 to 4 first, then agents.

When you get there, four things change:

- **A rules file enters the repository.** `CLAUDE.md`, `AGENTS.md` or `.vibes/rules/` belong to you and have a named owner on your side, see [the AI rules file in your Salesforce repository](../../../blog/ai-rules-file-salesforce-repository/).
- **The gates get rules for typical agent mistakes**, such as a check whether an agent raised the API version of an Apex class in passing. Details in [quality gates for AI code](../../../blog/quality-gates-for-ai-code-salesforce-pipeline/).
- **Agentforce agents become release items themselves.** Their Agent Script lives in Git and goes through validation, publish and activation, see [Agentforce agents in the release pipeline](../../../blog/agentforce-agents-release-pipeline/).
- **The DevOps tools bring their own agents.** sfdx-hardis lists a Coding Agent Auto-Fix (Beta) for deployment errors in its overview, and Copado and Gearset have announced their own agents, which I assess in [Copado, Gearset and Provar AI agents: a client check](../../../blog/copado-gearset-provar-ai-agents/). Every suggestion from an agent passes the same checks and a human review.

Review capacity takes the biggest hit, especially with nearshore teams in other time zones. I have worked with nearshore teams in Eastern Europe and India, and what agents shift there is covered in [nearshore Salesforce teams with AI agents](../../../blog/nearshore-salesforce-teams-ai-agents/).

From here, the AI masterclass takes over. Which coding agent suits your team or partner, and what the contract needs to say about it, is covered in [chapter 4 of the AI masterclass](../../ai-salesforce/external-coding-agents/). How roles, review gates and metrics change when teams deliver with agents is in [chapter 9 of the AI masterclass](../../ai-salesforce/teamwork-and-delivery/). The operations this phase builds on are described in the previous [chapter 9 on operations and monitoring](../operations-monitoring-backup/), and all chapters of this masterclass are on the [overview page](../). I support the rollout itself as part of [DevOps and release management](../../../services/devops-release-management/).

A DevOps rollout is finished when your own team could run the release process without today's partner.
