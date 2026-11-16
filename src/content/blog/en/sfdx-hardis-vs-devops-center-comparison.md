---
title: "sfdx-hardis vs DevOps Center: which one fits in 2026"
description: "sfdx-hardis and Salesforce DevOps Center, now Lifecycle Center, compared: Git platforms, ease of use, costs, monitoring and when each tool is the right one."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: sfdx-hardis-vs-devops-center-comparison
translationKey: sfdx-hardis-vs-devops-center
topic: devops
categories: [devops]
tags: [sfdx-hardis, DevOps Center, Lifecycle Center, release management, CI/CD, Git]
takeaways:
  - "Lifecycle Center supports only GitHub.com cloud plans and Bitbucket Cloud. Teams on Azure DevOps or GitLab cannot use it today."
  - "sfdx-hardis runs in the client's CI on GitHub, GitLab, Azure DevOps, Bitbucket or Jenkins and adds monitoring, metadata backup and documentation."
  - "In my experience Lifecycle Center suits click-based teams on GitHub or Bitbucket Cloud; sfdx-hardis suits programs with several partners or other Git platforms."
  - "Exactly one tool per repository should decide on merges and promotions, otherwise you end up with two release processes."
faq:
  - q: "What is the difference between sfdx-hardis and DevOps Center?"
    a: "DevOps Center, now Lifecycle Center, is a native Salesforce app with a click-based interface in which work items move through a pipeline. sfdx-hardis is an open source toolkit made up of a CLI plugin and a VS Code extension. It runs in the client's CI pipeline on the client's Git platform and also provides monitoring, metadata backup and documentation."
  - q: "Does DevOps Center support GitLab or Azure DevOps?"
    a: "No. Lifecycle Center supports GitHub.com cloud plans, including GitHub Enterprise Cloud, and Bitbucket Cloud. The current Salesforce setup documentation does not give a date for GitLab or Azure DevOps."
  - q: "Is sfdx-hardis free?"
    a: "Yes, sfdx-hardis is open source under the AGPL-3.0 license and has no license fees. You pay for the Git platform, CI minutes, setup and someone to own it. Paid help is available from Cloudity. Companies with an open source policy should have their use of AGPL-licensed software reviewed."
  - q: "Can sfdx-hardis and Lifecycle Center be used together?"
    a: "Technically, both can point at the same org. I would still let only one tool per repository decide on merges and promotions, because otherwise two release processes work against each other."
  - q: "Does sfdx-hardis replace a Salesforce backup?"
    a: "No. sfdx-hardis keeps a metadata backup with history in Git. Business data, files and a full restore need a dedicated backup solution such as Salesforce Backup or a third-party product."
  - q: "Which tool is better for admins?"
    a: "Lifecycle Center is the easier starting point for admins because most day-to-day work starts in Salesforce, although pull requests are still reviewed on GitHub or Bitbucket. The sfdx-hardis VS Code extension handles most Git commands for admins, but it requires VS Code and some basic knowledge of branches."
---

[sfdx-hardis](/en/blog/sfdx-hardis-open-source-salesforce-devops/) and Salesforce DevOps Center, called Lifecycle Center since October 2026, both have no separate license fee and both move changes to production through Git. The difference is where the process is controlled. Lifecycle Center is a native app in a Salesforce org with a click-based interface, and it works only with GitHub.com and Bitbucket Cloud. sfdx-hardis runs as a pipeline in the client's CI, on GitHub, GitLab, Azure DevOps, Bitbucket or Jenkins, and adds monitoring, metadata backup and documentation. My rule of thumb from the programs I support is this: Lifecycle Center for click-based teams without multiple partners, sfdx-hardis for programs with several partners.

## What is the difference between sfdx-hardis and DevOps Center?

**Lifecycle Center** is what used to be called Next Generation DevOps Center. Salesforce moved the app into the platform in 2026: you open it from the App Launcher, and there is no package to install. Salesforce calls the org it runs in the hub org. That is where you create projects, pipelines and work items. A work item is one business change that you promote from stage to stage with a click, while the app creates branches, pull requests and deployments in the background. The old DevOps Center managed package continues to run for existing customers, but Salesforce recommends switching and using only one of the two at a time. The details of the move are in the [Salesforce help on Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.devops_center_overview.htm&language=en_US&type=5).

**sfdx-hardis** is an open source toolkit from Cloudity and a large community. It consists of a Salesforce CLI plugin, a VS Code extension and Docker images for the pipeline. The process is defined in configuration files in the repository and in the client's CI pipeline. I cover its scope in my [introduction to sfdx-hardis](/en/blog/sfdx-hardis-open-source-salesforce-devops/).

In short: with Lifecycle Center, the process is controlled from Salesforce, and the repository holds the versioned state of the metadata. With sfdx-hardis, process and pipeline reside on the Git platform, and Salesforce is the target.

```steuerzentrale
title: Where the release process is controlled
side: Lifecycle Center | Hub org in Salesforce | Development, UAT, Production
- Source | Git | GitHub.com, Bitbucket Cloud | branch, PR
- Target | Salesforce orgs | UAT, production | deployment
note: A Salesforce service calls the Git platform from the outside.
side: sfdx-hardis | Git platform with CI | Pull request, Checks, Merge
- Target | Salesforce orgs | UAT, production | deployment
- Plus | Monitoring | Backup, documentation | scheduled
note: The runner in the client's CI connects from the inside.
```

## The comparison at a glance

```tabelle
title: Lifecycle Center and sfdx-hardis compared
columns: Criterion | Lifecycle Center ~ Lifecycle | sfdx-hardis
User interface | Clicks in Salesforce, plus DX Inspector in the dev org * | VS Code extension and CLI
Where the pipeline runs | Hub org, a Salesforce service calls the Git platform | In the client's CI *
Tests and quality gates | Test suites and quality gates before review and promotion | Validation, Apex tests and static analysis on every pull request
Deploying data | With work items or DX Inspector | Through deployment actions, for example with SFDMU
Monitoring and backup | Not included | Scheduled org checks, metadata backup, Grafana dashboards *
Documentation | Not included | Generated from the repository, including flows *
Ticketing | Jira import, each a snapshot without sync | Jira, Azure Boards, ServiceNow and others *
AI | MCP tools in the Salesforce DX MCP Server, governance (beta) | Coding agents for fixes, deployment agent (beta)
mark: Strength
```

As for origin: Lifecycle Center comes from Salesforce and is covered by Salesforce support. sfdx-hardis comes from Cloudity and the community, with paid support available through Cloudity.

As of October 2026, I use the Salesforce help and the Winter '27 release notes as sources for Lifecycle Center, and the [project documentation](https://sfdx-hardis.cloudity.com/) and the [overview of version 8](https://sfdx-hardis.cloudity.com/sfdx-hardis-v8/) for sfdx-hardis.

## Which Git platforms are supported?

At many companies the question is settled right here. According to the [setup considerations for Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.next_gen_devops_center_setup_considerations.htm&language=en_US&type=5), only GitHub.com cloud plans, including GitHub Enterprise Cloud, and Bitbucket Cloud work. GitHub Enterprise Server, Bitbucket Data Center, GitLab and Azure DevOps are not supported. The current setup documentation does not give a date for GitLab or Azure DevOps. More providers were already promised when DevOps Center launched in 2022, and so far only Bitbucket Cloud has been added.

sfdx-hardis ships ready-made pipelines for GitHub, GitLab, Azure DevOps, Bitbucket and Jenkins. Because the pipeline runs in the client's CI, the connection is established from the inside: the runner fetches the repository and deploys to the org. You should check in a short test whether your self-hosted variant is fully supported, for example for pull request comments. For Lifecycle Center, the answer for self-hosted platforms is a clear no.

```tabelle matrix
title: Which Git platform works with which tool
columns: Git platform | Lifecycle Center ~ Lifecycle | sfdx-hardis
GitHub.com and Enterprise Cloud | supported * | supported *
GitHub Enterprise Server | not supported | check in a test *
Bitbucket Cloud | supported * | supported *
Bitbucket Data Center | not supported | check in a test *
GitLab | not supported, no date | supported *
Azure DevOps | not supported, no date | supported *
Jenkins | not supported | supported *
note: As of October 2026. Check self-hosted variants with sfdx-hardis in a short test, for example pull request comments.
```

So if you use Azure DevOps, as many industrial companies that standardize on Microsoft tools do, you cannot use Lifecycle Center today without changing your Git platform. And few companies change their Git platform for a release tool.

## Where does the release process live, and who owns it?

In Lifecycle Center, projects, pipelines and work items are records in the hub org. The repository stays with the client, the process around it is managed in Salesforce.

```vertiefung For IT
title: What IT should know before connecting Lifecycle Center
- The GitHub connection runs through a Salesforce OAuth app that requests access to all repositories of the account.
- Repositories in a GitHub organization appear only after an owner of that organization approves the app.
- If the Git platform has IP restrictions, the Lifecycle Center addresses must be added to the allowlist.
```

With sfdx-hardis, everything is stored in files in the repository and in the pipeline configuration. With branch protection, a partner can only change them through a pull request the client approves. That fits my basic rule that [clients should own their DevOps tools](/en/blog/why-clients-should-own-their-devops-tools/): whoever controls the repository and the pipeline controls the release process.

For operations this means: Lifecycle Center needs an admin in the hub org, sfdx-hardis needs someone who understands the pipeline. Either way it is a role that someone on the client side should hold.

## The cost sits in the release role

Neither tool has a separate license fee, but Lifecycle Center requires a Salesforce edition that includes it. The costs are elsewhere:

- **Lifecycle Center:** you need GitHub or Bitbucket Cloud, with their per-user costs. According to Salesforce, the AI features provided through MCP tools can be used with services that consume paid credits. Nothing is installed, but the hub org, repository, branch protection and pipeline stages still need to be set up.
- **sfdx-hardis:** CI minutes on the Git platform, pipeline setup and someone to maintain it. Cloudity offers paid help, but you do not need it.

```eisberg
title: What both tools really cost
visible: License: €0 | for both tools
- Git platform | Cost per user on GitHub, Bitbucket or your platform | both
- CI minutes and credits | Minutes for the pipeline, credits for AI services | per tool
- Setup | less for Lifecycle Center, building the pipeline for sfdx-hardis | both
- Release role | an admin who clicks, or someone who maintains the pipeline | biggest item *
```

In the programs I support, the cost of a responsible release role is always higher than the cost of the tool. So choose the tool based on the role you can fill: an admin who handles releases in the UI, or someone who is at home with pipelines.

## What I see in projects

I have used sfdx-hardis in client projects for about two years, and in October 2026 I completed all three levels of the [free sfdx-hardis training](/en/blog/sfdx-hardis-free-devops-training/). In programs with several implementation partners, what counts most for me is that the process is binding: every partner works through the same pipeline, every pull request is validated the same way, and [reviews are mandatory](/en/blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/) before anything is merged. Monitoring and generated documentation are included without a separate project.

```partnerfluss review
without: Every partner on its own path | Changes only meet in the org, conflicts show up late.
with: One pipeline for all partners | Every pull request is validated and reviewed the same way before it is merged.
```

I have no project experience with Lifecycle Center that I could cite here. I therefore describe the following case as a hypothetical scenario: a mid-sized machine builder runs one Salesforce org with two admins, has no in-house developers, and already uses GitHub for another team. For this client, Lifecycle Center would be a good step away from change sets. The admins stay in Salesforce, and they still get source control, while quality gates and test runs are built in. sfdx-hardis would likely be more than that team needs.

## When does which tool fit?

Lifecycle Center fits when

- most changes are made by admins and consultants through clicks, and little code is written,
- GitHub.com or Bitbucket Cloud is already in place,
- one team works on one org, without multiple partners involved,
- the org is not in the EU Operating Zone or Government Cloud Plus, where Lifecycle Center is not available.

sfdx-hardis fits when

- several teams or partners work on the same org,
- the Git platform is GitLab, Azure DevOps or a self-hosted variant,
- monitoring, metadata backup and documentation are needed,
- someone on the client side can own the pipeline, or the organization is building that role.

If you need a fully managed service with org comparisons and contractual support instead, commercial platforms such as Gearset or Copado should be on the list as well. How these vendors are currently adding AI agents to their products is summarized in [Copado, Gearset and Provar AI agents](/en/blog/copado-gearset-provar-ai-agents/).

## Do not let both tools own promotions

Technically both can point at the same org and even the same repository. Lifecycle Center handles merges that happen outside the app, and sfdx-hardis validates every pull request, wherever it comes from. I still would not let both decide on promotions. When two tools decide on the same stage branches, there are two release processes, and in the end nobody knows which state is authoritative in production.

Decide per repository which tool owns merges and promotions. If you switch later, make it a planned cutover, not a gradual drift.

For teams using coding agents, this question matters even more. Lifecycle Center is building a governance layer for agents in the hub org, sfdx-hardis relies on the checks in the pipeline. The same [quality gates for AI-generated code](/en/blog/quality-gates-for-ai-code-salesforce-pipeline/) apply to both tools.

## Settle Git platform, teams and release role

Answer three questions first: which Git platform is standardized at your company, how many teams and partners work on the org, and who takes on the release role? In most cases, these answers determine the choice. If you are new to the topic, [why DevOps matters in Salesforce enterprise projects](/en/blog/why-devops-matters-salesforce-enterprise/) explains the basics, and setting up a binding process is part of my work in [DevOps and release management](/en/services/devops-release-management/).
