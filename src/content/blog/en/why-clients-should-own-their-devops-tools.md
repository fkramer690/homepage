---
title: "Why clients should own their Salesforce DevOps tools"
description: "Git repository, pipeline, Jira, Miro: why the client, not the implementation partner, should control the workspaces, licenses and access rights of a project."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: why-clients-should-own-their-devops-tools
translationKey: client-owned-devops-tools
topic: ownership
categories: [devops]
tags: [partner governance, devops, jira, vendor lock-in, access management]
takeaways:
  - "Workspaces, licenses, admin rights and access belong to the client, from the Git repository and pipeline to Jira, Confluence and Miro."
  - "Owning the tools does not mean running your own servers: cloud services are fine, as long as the workspace and admin rights belong to the client."
  - "Partners get named access with roles appropriate to their task, for the duration of the engagement, and their work stays in the client's systems."
  - "Tools owned by a partner create lock-in, make partners hard to compare and put history, documentation and decisions at risk when the engagement ends."
  - "Setting up client-owned tools costs little at the start compared with fixing it later, during a partner exit."
faq:
  - q: "Do clients need to host their DevOps tools on their own servers?"
    a: "No. Cloud services such as GitHub, GitLab, Jira or Miro are fine. What matters is that the workspace, the data, the admin rights and, where the licensing model allows it, the contract belong to the client, not to an implementation partner."
  - q: "Why is it a problem if the partner owns the Jira or Git workspace?"
    a: "The client then depends on the partner for access, history and documentation. When the engagement ends or a second partner joins, data has to be migrated or is lost, and partners are hard to compare."
  - q: "Which tools should be owned by the client?"
    a: "Everything that holds project knowledge or controls releases: Salesforce orgs and Dev Hub, Git repository, CI/CD pipeline, Jira, Confluence, Miro, password vaults, integration users and certificates, plus the side tools where knowledge accumulates, such as chat channels and API test workspaces."
  - q: "How should partners get access?"
    a: "Through named personal identities in the client's tools, often their own accounts invited into the client's workspace, with roles limited to the task and access that ends with the engagement. The client must be able to grant and revoke that access on its own. Shared or anonymous accounts should not be used."
---

Clients should own their Salesforce DevOps tools because whoever controls the workspaces, licenses and access rights controls the project. That applies to the Git repository and CI/CD pipeline as much as to Jira, Confluence and Miro. Owning them does not mean running your own servers. Cloud services are fine, as long as the workspaces and admin rights belong to the client and stay with the client beyond any partnership. Partners get named access with the rights they need to perform their task.

## What does it mean to own your DevOps tools?

Owning the tools means holding the keys, wherever the software runs. In practice that means:

- The **contract and licenses** for each tool are in the client's name where the licensing model allows it, and in every case the client keeps admin control, data access and exit rights.
- The **admin rights** sit with client employees, not only with partner staff.
- The **workspace** (the GitHub organization, the Jira site, the Miro team) belongs to the client.
- **Partners are invited** as users into the client's workspace, not the other way round.

An empty GitHub organization, Jira Cloud site or Miro team can be created in an afternoon. No servers of your own, no infrastructure project. Making it ready for production, with single sign-on, roles and the client's security rules, takes deliberate preparation. The core difference, though, is whose name is on the workspace and who can grant and revoke access.

![Who owns what in a Salesforce program: the client owns accounts, licenses and admin rights, the Git repository and CI/CD pipeline, Jira, Confluence and Miro workspaces, Salesforce orgs, sandboxes and Dev Hub, and secrets, integration users and certificates. The client grants and revokes access. The partner receives named personal user accounts, roles limited to the task and access only for the engagement, and work stays in client systems. When a partner leaves, access is removed and nothing has to be migrated.](../../../assets/blog/tool-ownership-en.png)

## Which tools are we talking about?

In a typical Salesforce program, project knowledge and control are spread across more tools than people realize:

1. **Salesforce orgs, sandboxes and the Dev Hub.** These usually belong to the client already. But check who holds the system administrator accounts and whether they are personal. The Dev Hub needs special attention: it owns scratch orgs, package versions and namespaces, so for client-specific packages it belongs in the client's production org, not in a partner's Developer Edition or trial org.
2. **Git repository and CI/CD pipeline.** The repository is the history of every change, and the pipeline decides what reaches production. I explain why both are essential in my article on [why DevOps decides Salesforce enterprise projects](/en/blog/why-devops-matters-salesforce-enterprise/).
3. **Jira or Azure Boards.** User stories, acceptance criteria, defects and decisions. Without them, nobody can explain later why something was built the way it was.
4. **Confluence or a wiki.** Architecture decisions, interface descriptions, operating manuals.
5. **Miro or similar whiteboards.** Process maps, data models and workshop results, often the only place where the target picture was ever drawn.
6. **Secrets and technical users.** Integration users, certificates, API keys and the password vault that holds them.

Each of these can end up in a partner's account without anyone deciding that it should. A partner starts quickly, uses its own Jira site and its own Git organization, and a year later the client's project history lives in someone else's system.

## What goes wrong when the partner owns the tools?

As long as the collaboration runs well, nobody notices. The problems appear when something changes:

- **The engagement ends.** Data has to be exported and migrated. Depending on the tool and the migration path, configurations, app data, links or version history can be lost. Sometimes the export is simply not a priority for a partner who is leaving.
- **A second partner joins.** Now the new partner needs access to a competitor's workspace, or a second set of tools appears. Standards drift and teams overwrite each other's work.
- **Partners are hard to compare.** If one partner owns the repository and the pipeline, they also own the release process, and every other partner works by their rules.
- **People leave.** When the only admin of a tool is a partner employee who changes jobs, even the partner may struggle to regain control.
- **Security and compliance.** The client can't answer simple audit questions: who has access to our source code, our requirements, our credentials?

```vergleich
without: Tools with the partner
- On a change, configuration, links and history can be lost in the export.
- * The repository, backlog and reasoning leave with the partner.
- The only admin of a tool works for the partner.
with: Tools with the client
- A departing partner hands over knowledge, not systems.
- * The repository, backlog and decisions stay in the company.
- The client answers audit questions about access itself.
quote: Partners come and go. The repository, the backlog and the architecture decisions should stay.
```

None of this is a reproach to partners. Mature partners can work in a client-controlled toolchain when it is usable and responsibilities are clear. That also makes their own exit clean and their work visible. Owning the tools does not replace contractual rights to the deliverables; both belong in the contract.

## Owning the tools keeps partners comparable and replaceable

As an [architect on the client side](/en/#about), one of my main goals is to keep implementation partners comparable and replaceable. That only works if the foundations belong to the client: the repository, the pipeline, the backlog and the documentation. Then a new partner can be onboarded into a known setup with written standards. A departing partner still hands over knowledge, open risks and running tasks, but nobody has to extract repositories or backlogs from its systems. Comparing partners also needs shared delivery standards and metrics.

Client-owned tools also make it possible to build up internal responsibility. In the program I described in my DevOps article, the release process was eventually handed over to an internal colleague. A handover like that is only realistic when the tools and rights are already on the client side. Otherwise, the internal person inherits a process that still depends on someone else's accounts. Ownership of tools is the basis of good [partner steering and governance](/en/services/partner-governance/).

## Rules for practice, before the first partner starts

These rules have proven useful and should ideally be in place before the first implementation partner starts:

1. **Client creates the workspaces.** GitHub or GitLab organization, Jira and Confluence site, Miro team: all set up by the client, with licenses in the client's contract.
2. **At least two client admins per tool.** Never a single admin, and never only partner staff. Add a tested emergency access procedure. Broad admin rights are granted only where time-limited ones are not enough.
3. **Named personal identities only.** Every partner employee gets their own identity, usually their own account invited into the client's workspace. No shared logins, so access is traceable and can be removed individually.
4. **Roles match the task.** Developers get write access to the repository, not admin rights to the organization. Changes to pipeline security and branch protection need the client's approval, even if an authorized partner specialist carries them out.
5. **Strong authentication.** Admins on both sides use phishing-resistant MFA. In Salesforce, this has been mandatory for privileged users since July 2026, including in production, in sandboxes and with single sign-on.
6. **Access has an end date.** Partner accounts are reviewed regularly and removed when the engagement or the person's role ends.
7. **Secrets stay in the client's vault.** Each integration has its own client-managed, least-privilege integration user; credentials and keys are rotated whenever partner staff had access to them.
8. **Write it into the contract.** The statement of work says that all work products, including code, tickets and documentation, are created in the client's tools, and who holds the rights to them.

```hinweis tipp
If a partner already owns some of the tools, plan the move early and do it in a calm phase, not during an exit. The Git history itself is usually easy to move; permissions, branch rules, secrets, runners and webhooks need an inventory and a test. Jira and Miro take more planning, but are still far cheaper to move now than later.
```

## List every tool with its contract holder and admins

Make a simple list for every tool in the project: who holds the contract, who the admins are, which partner employees have access, how data can be exported and when access was last reviewed. Include side tools such as partner chat channels and API test workspaces. In many programs that list alone shows where the risks are. For every row where a partner holds the contract or the admin rights, set a date by which ownership moves to you.
