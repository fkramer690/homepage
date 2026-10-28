---
title: "Salesforce DevOps tools compared for manufacturers"
description: "Change sets, Salesforce CLI, Lifecycle Center, sfdx-hardis, Gearset, Copado and Flosum compared, with criteria and a decision matrix for manufacturers."
lang: en
slug: devops-tools-compared
course: devops
translationKey: devops-04
chapter: 4
short: "Tools compared"
summary: "From change sets to commercial platforms: which DevOps tool fits your Git platform, your team and your implementation partners."
takeaways:
  - "Salesforce DevOps can be built with three kinds of tools: Salesforce's own standard tooling, open source such as sfdx-hardis, and commercial platforms such as Gearset, Copado or Flosum."
  - "Change sets only work between orgs of the same production org, carry no data and have no version control; they are not enough for several partners on one org."
  - "Lifecycle Center, called DevOps Center until October 2026, is native to Salesforce but supports only GitHub.com cloud plans and Bitbucket Cloud and is not available in the EU Operating Zone."
  - "The Git platform your IT already runs often rules out half of the tools; settle it before any product demo."
  - "A commercial tool fits the principle of client ownership, as long as the contract, the admin rights and the repository are in your name."
articles: [sfdx-hardis-vs-devops-center, sfdx-hardis-introduction, devops-ai-agents-copado-gearset, client-owned-devops-tools]
faq:
  - q: "Are change sets enough for a Salesforce programme with several partners?"
    a: "No. Change sets move Setup changes between orgs of the same production org, but without version control, without review and without a comparison of states. As soon as two teams work on the same components, you lack the basis to see and resolve conflicts."
  - q: "What is Lifecycle Center?"
    a: "Lifecycle Center is the name of Next Generation DevOps Center since October 2026. It is a native Salesforce app with no package, with work items, pipelines, test suites and quality gates, and it supports GitHub.com cloud plans and Bitbucket Cloud as Git platforms."
  - q: "Can I use Lifecycle Center with Azure DevOps or GitLab?"
    a: "Not today. Salesforce lists only GitHub.com cloud plans, including GitHub Enterprise Cloud, and Bitbucket Cloud. Salesforce has named GitLab and Azure as a priority, but without a date."
  - q: "Is a commercial DevOps tool better than sfdx-hardis?"
    a: "It answers a different question. Gearset, Copado and Flosum sell an interface, add-on modules and vendor support. sfdx-hardis has no licence fees but needs someone on the client side who understands the pipeline. The role you can fill matters more than the feature list."
  - q: "Who should sign the contract for the DevOps tool?"
    a: "The client. Licences, admin rights and the repository belong in your name, and partners get named users. Then the release process stays with you, even when a partner leaves."
draft: false
---

There are three ways to do Salesforce DevOps: Salesforce's standard tooling with change sets, Salesforce CLI and Lifecycle Center (called DevOps Center until October 2026), open source with sfdx-hardis, and commercial platforms such as Gearset, Copado and Flosum. Change sets are not enough for a programme with several partners, because they have no version control. Lifecycle Center suits small admin teams on GitHub.com or Bitbucket Cloud. sfdx-hardis suits clients who want to own and run the pipeline themselves. The commercial platforms pay off when you want to buy an interface, add-on modules and vendor support. Decide by Git platform, team, partners, ownership, cost and support, in that order.

## What does Salesforce provide out of the box?

Salesforce ships three tools at no extra licence cost. They build on each other, but solve very different problems.

### Change sets

A change set sends customisations from one org to another, typically from a sandbox to production. According to the [Salesforce help on change sets](https://help.salesforce.com/apex/HTViewHelpDoc?id=changesets.htm), three limits apply: change sets contain only changes you can make through the Setup menu, they contain no data, and they work only between orgs that are affiliated with the same production org and linked by a deployment connection. An inbound change set is always deployed as a whole.

For an admin who moves a field and a validation rule every few weeks, that is enough. For a programme with several teams, the essentials are missing: there is no history in Git, no pull request, no review and no comparison of which state sits where. When two partners touch the same page layout or the same flow version, whoever deploys last wins. [Chapter 1](../release-management-basics/) describes exactly this state as the starting point of the maturity path.

### Salesforce CLI

[Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) is Salesforce's command-line tool for development and build automation. It creates orgs, synchronises source in both directions between project and org, and runs on a developer's machine or in a CI pipeline. Commands such as [`sf project deploy validate`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html) check a deployment without changing anything, with `RunLocalTests` by default.

The CLI is the foundation; the process on top is up to you. If you use it alone, you build branch rules, delta deployments, notifications and tests yourself. The CLI can be extended with plugins, and that is what sfdx-hardis builds on.

### Lifecycle Center, formerly DevOps Center

Since October 2026, Next Generation DevOps Center has been called [Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.devops_center_overview.htm&language=en_US&type=5). It is built into the platform, with no package to install. In a hub org you create projects, pipelines and work items; a work item moves from stage to stage with a click, while branches, pull requests and deployments are created in the background. Testing with test suites and quality gates is included by default, and a governance feature for developers and coding agents is in beta. Salesforce explicitly positions Lifecycle Center as an alternative to change sets.

The [setup considerations](https://help.salesforce.com/s/articleView?id=platform.next_gen_devops_center_setup_considerations.htm&language=en_US&type=5) contain the points that often decide the matter in manufacturing:

- Only GitHub.com cloud plans, including GitHub Enterprise Cloud, and Bitbucket Cloud work as Git platforms. Salesforce has named GitLab and Azure as a priority in its [admin blog](https://admin.salesforce.com/blog/2026/the-future-of-salesforce-devops-is-here-whats-new-for-admins), with no date.
- Lifecycle Center is not available in the EU Operating Zone or in Government Cloud Plus.
- The hub org cannot be a sandbox, and only one of Lifecycle Center or the old DevOps Center managed package can be active.
- Migrating projects from the managed package is a developer preview. I would not rely on it for production projects until it is generally available.

How Lifecycle Center compares with sfdx-hardis in detail is in my [comparison of sfdx-hardis and DevOps Center](../../../blog/sfdx-hardis-vs-devops-center-comparison/). In short: with Lifecycle Center, Salesforce is the control centre and Git is the storage.

## sfdx-hardis: the open source route

[sfdx-hardis](https://sfdx-hardis.cloudity.com/) is a free open source toolkit from Cloudity and a large community. It consists of a Salesforce CLI plugin, a VS Code extension and Docker images for the pipeline. The pipeline runs on the client's Git platform: GitHub, GitLab, Azure DevOps, Bitbucket or Jenkins. Besides CI/CD it brings org monitoring, metadata backup and generated documentation.

I have used sfdx-hardis in client projects for about two years. In programmes with several implementation partners, what counts for me is that the whole process sits as configuration in the client's repository. With branch protection, a partner can change it only through a pull request the client approves.

The price is know-how. There are no licence fees, but there are CI minutes, the setup and a person on the client side who understands the pipeline. Cloudity offers help as a service provider, but you do not need it. What the toolkit covers is in my [introduction to sfdx-hardis](../../../blog/sfdx-hardis-open-source-salesforce-devops/).

## What do Gearset, Copado and Flosum do better?

The three big commercial platforms sell what open source does not provide: a ready-made interface, add-on modules from one source and a vendor who stands behind operations. I have worked through the DevOps courses of all three vendors. The details below come from the vendors' own pages, as of October 2026.

**Gearset** runs as a service outside your org; according to [Gearset](https://gearset.com/), nothing has to be installed in your orgs. Gearset supports GitHub, GitLab, Bitbucket, Azure DevOps, AWS CodeCommit and generic Git. Its strength is the visual comparison of metadata between orgs, plus pipelines, backup, sandbox seeding with masked data, observability and code reviews as separate products. Gearset is the only one of the three with a public [price list](https://gearset.com/pricing/): the Starter plan for comparison and deployment costs 215 USD per Gearset user per month, and pipelines and CI/CD come as an automation plan from 550 USD per team per month. You can trial it for 30 days without a card.

**Copado** describes itself on its [website](https://www.copado.com/) as a Salesforce-native DevOps solution and has offered the Agentia Advanced and Agentia Pro editions since April 2026. According to the [Copado documentation](https://docs.copado.com/), the Agentia Advanced edition targets teams with one production org and 3 to 10 people, and Agentia Pro targets enterprises with several orgs, with quality gates, governance and the Orchestrate Agent. On top come robotic testing and a context hub for the AI agents. The documentation for the Advanced edition lists [GitHub, GitLab, Bitbucket and Azure](https://docs.essentials.copado.com/en/articles/4109764-setup-git-connections) as Git platforms, each also self-hosted. I found no public price list from Copado.

**Flosum** is, according to the [vendor](https://www.flosum.com/products/devops), also Salesforce-native and has its own metadata-aware version control. Git is explicitly optional there; GitHub, GitLab, Bitbucket and Azure DevOps can be connected. Flosum stresses audit evidence generated in the pipeline itself and names frameworks such as SOX and GxP. That is relevant for makers of medical devices or lab equipment. Besides DevOps there are Backup and Archive, a Data Migrator and a Trust Center. Pricing is quote-based, according to Flosum.

I have not checked other vendors such as AutoRABIT or Blue Canvas for this chapter. How Copado and Gearset are adding AI agents and what to ask before you pay is in [Copado, Gearset and Provar AI agents](../../../blog/copado-gearset-provar-ai-agents/).

## Which criteria should drive the choice?

I go through the criteria in this order, because the first ones rule out the most.

1. **Git platform.** Which platform does your IT already run? On Azure DevOps or a self-hosted GitLab, Lifecycle Center is out today. Nobody changes their Git platform for a release tool.
2. **Team.** Who works with the tool every day: admins who click, or developers at home with VS Code and branches? And is there someone on the client side who can own a pipeline?
3. **Partners.** How many teams and implementation partners work on the same org? From the second partner on, you need pull requests with [mandatory reviews](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/) and one process that everyone uses the same way.
4. **Ownership.** Is the contract in your name, do your employees hold admin rights, does the repository sit in your organisation? Why that matters is in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/).
5. **Cost.** Licence, CI minutes, setup and above all the release role. In my assessment, in a programme with several partners that role costs more than any tool.
6. **Support.** Do you need a contract with response times, or are the community and a service provider on demand enough?

## The decision matrix

The facts in the table come from the vendor pages linked above. The "Fits" row is my assessment.

| Criterion | Change sets | Lifecycle Center | sfdx-hardis | Gearset | Copado | Flosum |
|---|---|---|---|---|---|---|
| Git platforms | none | GitHub.com incl. Enterprise Cloud, Bitbucket Cloud | GitHub, GitLab, Azure DevOps, Bitbucket, Jenkins | GitHub, GitLab, Bitbucket, Azure DevOps, AWS CodeCommit, generic Git | GitHub, GitLab, Bitbucket, Azure, also self-hosted | own version control, Git optional |
| Where the process lives | Setup of the orgs | hub org | client's repository and CI | Gearset service | Salesforce-native, per Copado | Salesforce-native, per Flosum |
| User interface | clicks in Setup | clicks in Salesforce | VS Code and CLI | web interface | vendor interface | vendor interface |
| Add-ons | none | tests, quality gates, governance (beta) | monitoring, metadata backup, documentation | backup, seeding, observability, code reviews | robotic testing, AI agents | backup, Data Migrator, Trust Center |
| Licence cost | none | none | none | public, from 215 USD per user per month | no public price list found | on request |
| Support | Salesforce | Salesforce | community, Cloudity as service provider | vendor | vendor | vendor |
| Fits | a few admins, small changes | one admin team without partners on GitHub or Bitbucket Cloud | several partners, if a release role exists on the client side | mixed teams wanting comparison and modules from one source | large programmes with several orgs and governance needs | regulated environments with audit duties |

Two things the matrix does not show. First, the quality of support, which you only learn in reference calls. Second, how well a tool handles your actual metadata, for example Field Service configuration or Experience Cloud pages for a dealer portal. Check that in a short test with your own org before you sign.

## A typical scenario, as an assumption

A machine builder runs Sales Cloud for dealer sales, Service Cloud and Field Service for its service technicians, and an SAP integration for spare parts. Two implementation partners work on the same org, one of them with a nearshore team. IT runs Azure DevOps for all other applications. Deployments so far use change sets.

The Git platform rules out Lifecycle Center. Change sets are out because of the two partners. That leaves sfdx-hardis, Gearset, Copado and Flosum. If the manufacturer has someone who can own a pipeline on Azure DevOps, or wants to build that role, I would start with sfdx-hardis and put the licence savings into exactly that internal release role. If that person is missing and is not meant to exist, a commercial platform with vendor support is the more honest choice. Then what counts is that the contract is in the manufacturer's name, not in one of the partners'.

## How do you make the decision binding?

The tool choice belongs at the start of a programme and applies to every partner. Whoever joins later works in the existing setup and does not bring their own. That goes into the contract, as described in [chapter 2 on ownership and roles](../release-process-ownership-roles/).

Three rules are not negotiable for me:

- **One tool per repository decides on merges and promotions.** Two tools on the same stage branches make two release processes.
- **Licences and admin rights sit with the client.** That applies to Gearset, Copado and Flosum just as much as to the Git platform under sfdx-hardis.
- **History stays portable.** With Flosum, where Git is optional, I would still switch on the Git connection so that the version history stays readable without the tool.

The sandboxes and branches each of these tools builds on are covered in [chapter 3](../environments-and-branching/). How they become a pipeline with pull requests, validations and delta deployments follows in [chapter 5](../building-the-pipeline/). I help with the selection and setup as part of [DevOps and release management](../../../services/devops-release-management/) and, when several partners are involved, in [partner governance](../../../services/partner-governance/).

The right tool is the one that fits your Git platform and has a responsible person on the client side. If you would like your selection checked against these criteria, [send me a message](#contact).
