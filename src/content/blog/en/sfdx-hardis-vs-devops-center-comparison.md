---
title: "sfdx-hardis vs DevOps Center: which one fits in 2026"
description: "sfdx-hardis and Salesforce DevOps Center, now Lifecycle Center, compared: Git platforms, ease of use, costs, monitoring and when each tool is the right one."
pubDate: 2026-10-28
lang: en
slug: sfdx-hardis-vs-devops-center-comparison
translationKey: sfdx-hardis-vs-devops-center
topic: devops
categories: [devops]
tags: [sfdx-hardis, DevOps Center, Lifecycle Center, release management, CI/CD, Git]
takeaways:
  - "sfdx-hardis and Salesforce DevOps Center, called Lifecycle Center since October 2026, both come without licence fees, but they follow different approaches."
  - "Lifecycle Center is a native app in a Salesforce org with a click-based interface and supports only GitHub.com cloud plans and Bitbucket Cloud."
  - "sfdx-hardis runs as a pipeline in the client's CI on GitHub, GitLab, Azure DevOps, Bitbucket or Jenkins and adds monitoring, backup and documentation."
  - "Lifecycle Center suits smaller, click-based teams on GitHub or Bitbucket Cloud; sfdx-hardis suits programmes with several partners or another Git platform."
  - "Exactly one tool per repository should decide on merges and promotions, otherwise you end up with two release processes."
faq:
  - q: "What is the difference between sfdx-hardis and DevOps Center?"
    a: "DevOps Center, now Lifecycle Center, is a native Salesforce app with a click-based interface in which work items move through a pipeline. sfdx-hardis is an open source toolkit made of a CLI plugin and a VS Code extension that runs as a pipeline on the client's Git platform and also provides monitoring, backup and documentation."
  - q: "Does DevOps Center support GitLab or Azure DevOps?"
    a: "No. Lifecycle Center supports GitHub.com cloud plans, including GitHub Enterprise Cloud, and Bitbucket Cloud. Salesforce has named GitLab and Azure DevOps as a priority, but without a date."
  - q: "Is sfdx-hardis free?"
    a: "Yes, sfdx-hardis is open source and has no licence fees. You pay for the Git platform, CI minutes, the setup and a person who owns it. Paid help is available from Cloudity."
  - q: "Can sfdx-hardis and Lifecycle Center be used together?"
    a: "Technically both can point at the same org. I would still let only one tool per repository decide on merges and promotions, otherwise two release processes work against each other."
  - q: "Which tool is better for admins?"
    a: "Lifecycle Center is the easier start for admins, because everything happens in Salesforce. The sfdx-hardis VS Code extension takes most Git commands off admins' hands, but it needs VS Code and some basic knowledge of branches."
---

sfdx-hardis and Salesforce DevOps Center, called Lifecycle Center since October 2026, both come without licence fees and both take changes to production through Git. The difference is where the process lives. Lifecycle Center is a native app in a Salesforce org with a click-based interface, and it works only with GitHub.com and Bitbucket Cloud. sfdx-hardis runs as a pipeline in the client's CI, on GitHub, GitLab, Azure DevOps, Bitbucket or Jenkins, and adds monitoring, backup and documentation. My rule of thumb: Lifecycle Center for small, click-based teams, sfdx-hardis for programmes with several partners.

## What is the difference between sfdx-hardis and DevOps Center?

**Lifecycle Center** is what used to be called Next Generation DevOps Center. Salesforce moved the app into the platform in 2026: you open it from the App Launcher, there is no package to install. Salesforce calls the org it runs in the hub org. That is where you create projects, pipelines and work items. A work item is one business change that you promote from stage to stage with a click, while the app creates branches, pull requests and deployments in the background. The old DevOps Center managed package keeps running for existing customers, but Salesforce recommends the switch, and only one of the two can be active at a time. The details of the move are in the [Salesforce help on Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.devops_center_overview.htm&language=en_US&type=5).

**sfdx-hardis** is an open source toolkit from Cloudity and a large community. It consists of a Salesforce CLI plugin, a VS Code extension and Docker images for the pipeline. The process sits in configuration files in the repository and in the client's CI pipeline. What it covers is in my [introduction to sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/).

In short: with Lifecycle Center, Salesforce is the control centre and Git is the storage. With sfdx-hardis, the Git platform is the control centre and Salesforce is the target.

## The comparison at a glance

| Criterion | Lifecycle Center (DevOps Center) | sfdx-hardis |
|---|---|---|
| Origin | Salesforce, native app | Open source, Cloudity and community |
| User interface | Clicks in Salesforce, plus DX Inspector in the dev org | VS Code extension and CLI |
| Where the pipeline runs | Hub org, a Salesforce service calls the Git platform | In the client's CI |
| Git platforms | GitHub.com incl. Enterprise Cloud, Bitbucket Cloud | GitHub, GitLab, Azure DevOps, Bitbucket, Jenkins |
| Tests and quality gates | Test suites and quality gates before review and promotion | Validation, Apex tests and static analysis on every pull request |
| Deploying data | Through DX Inspector | Through deployment actions, for example with SFDMU |
| Monitoring and backup | Not included | Scheduled org checks, metadata backup, Grafana dashboards |
| Documentation | Not included | Generated from the repository, including flows |
| Ticketing | Jira import as a one-off copy | Jira, Azure Boards, ServiceNow and others |
| AI | MCP tools in the Salesforce DX MCP Server, governance (beta) | Coding agents for fixes, deployment agent (beta) |
| Support | Salesforce support | Community, paid through Cloudity |

The sources for Lifecycle Center are the Salesforce help and the Winter '27 release notes, for sfdx-hardis the [project documentation](https://sfdx-hardis.cloudity.com/) and the [overview of version 8](https://sfdx-hardis.cloudity.com/sfdx-hardis-v8/), as of October 2026.

## Which Git platforms are supported?

At many companies the question is settled right here. According to the [setup considerations for Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.next_gen_devops_center_setup_considerations.htm&language=en_US&type=5), only GitHub.com cloud plans, including GitHub Enterprise Cloud, and Bitbucket Cloud work. GitHub Enterprise Server, Bitbucket Data Center, GitLab and Azure DevOps are out. Salesforce has named GitLab and Azure as a priority after launch, with no date. More providers were already promised when DevOps Center launched in 2022, and so far only Bitbucket Cloud has arrived.

sfdx-hardis ships ready-made pipelines for GitHub, GitLab, Azure DevOps, Bitbucket and Jenkins. Because the pipeline runs in the client's CI, the connection comes from the inside: the runner fetches the repository and deploys to the org. Whether your self-hosted variant is fully covered, for example for pull request comments, is best checked in a short test. For Lifecycle Center, the answer for self-hosted platforms is a clear no.

So if you work on Azure DevOps, like many industrial companies that run on Microsoft tools, you cannot use Lifecycle Center today without changing Git platform. And nobody changes their Git platform for a release tool.

## Where does the release process live, and who owns it?

In Lifecycle Center, projects, pipelines and work items are records in the hub org. The repository stays with the client, the process around it lives in Salesforce.

```vertiefung For IT
title: What IT should know before connecting Lifecycle Center
- The GitHub connection runs through a Salesforce OAuth app that requests access to all repositories of the account.
- Repositories of a GitHub organisation only show up once an owner of that organisation approves the app.
- If the Git platform has IP restrictions, the Lifecycle Center addresses need to go on the allowlist.
```

With sfdx-hardis, everything sits in files in the repository and in the pipeline configuration. With branch protection, a partner can only change them through a pull request the client approves. That fits my basic rule that [clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/): whoever controls repository and pipeline controls the release process.

For operations this means: Lifecycle Center needs an admin in the hub org, sfdx-hardis needs someone who understands the pipeline. Either way it is a role that someone on the client side should hold.

## What do both really cost?

Neither has licence fees. The real costs are elsewhere:

- **Lifecycle Center:** you need GitHub or Bitbucket Cloud, with their per-user costs. According to Salesforce, the AI features through MCP tools can be used together with services that consume paid credits. Setup is quick, because nothing is installed.
- **sfdx-hardis:** CI minutes on the Git platform, setting up the pipeline and a person who maintains it. Cloudity offers paid help, but you do not need it.

In the programmes I support, the cost of a responsible release role is always higher than the cost of the tool. So choose the tool by the role you can actually fill: an admin who clicks, or someone who is at home with pipelines.

## What I see in projects

I have used sfdx-hardis in client projects for about two years, and in October 2026 I completed all three levels of the [free sfdx-hardis training](../sfdx-hardis-free-devops-training/). In programmes with several implementation partners, what counts most for me is that the process is binding: every partner works through the same pipeline, every pull request is validated the same way, and [reviews are mandatory](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) before anything is merged. Monitoring and generated documentation come along without a separate project.

I have no project experience with Lifecycle Center that I could cite here. I therefore describe the following case as an assumption: a mid-sized machine builder runs one Salesforce org with two admins, no in-house developers, and already uses GitHub for another team. For this client, Lifecycle Center would be a good step away from change sets. The admins stay in Salesforce, they still get source control, and quality gates and test runs are built in. sfdx-hardis would be too much tool for too small a team there.

## When does which tool fit?

Lifecycle Center fits when

- mostly admins and consultants click and little code is written,
- GitHub.com or Bitbucket Cloud is already in place,
- one team works on one org, without several partners,
- the org is not in the EU Operating Zone or Government Cloud Plus, where Lifecycle Center is not available.

sfdx-hardis fits when

- several teams or partners work on the same org,
- the Git platform is GitLab, Azure DevOps or a self-hosted variant,
- monitoring, metadata backup and documentation are needed,
- someone on the client side can own the pipeline, or that role is being built.

If you need a fully managed service with org comparisons and contractual support instead, commercial platforms such as Gearset or Copado are the more honest answer. How these vendors are currently adding AI agents to their products is summarised in [Copado, Gearset and Provar AI agents](../copado-gearset-provar-ai-agents/).

## Can you combine both?

Technically both can point at the same org and even the same repository. Lifecycle Center handles merges that happen outside the app, and sfdx-hardis validates every pull request, wherever it comes from. I still would not do it. When two tools decide on the same stage branches, there are two release processes, and in the end nobody knows which state counts in production.

```hinweis tipp
Decide per repository which tool owns merges and promotions. If you switch later, make it a planned cut, not a gradual drift.
```

For teams using coding agents this question matters more. Lifecycle Center is building a governance layer for agents in the hub org, sfdx-hardis relies on the checks in the pipeline. Which [quality gates should stop AI-generated code](../quality-gates-for-ai-code-salesforce-pipeline/) applies to both tools in the same way.

## Where should you start?

Answer three questions first: which Git platform is set at your company, how many teams and partners work on the org, and who takes on the release role? With these three answers the choice is made in most cases. If you are new to the topic, [why DevOps matters in Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/) explains the basics, and setting up a binding process is part of my work in [DevOps and release management](../../services/devops-release-management/).

Both tools are good, they just fit different teams. If you would like to discuss which one fits your programme, [send me a message](#contact).
