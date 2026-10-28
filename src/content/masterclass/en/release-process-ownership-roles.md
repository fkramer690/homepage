---
title: "Release process ownership, roles and approvals"
description: "Who should own repository, pipeline and DevOps tool, which roles a Salesforce release needs, who approves what and what goes into every partner contract."
lang: en
slug: release-process-ownership-roles
course: devops
translationKey: devops-02
chapter: 2
pubDate: 2026-10-28
short: "Ownership and roles"
summary: "Who owns repository and pipeline, which four roles a release needs, who approves what and how the process survives a partner change."
takeaways:
  - "Repository, pipeline, DevOps tool, sandboxes and credentials belong to the client; partners work in them with personal users whose access ends with the engagement."
  - "A release process with several partners needs four named roles: a release manager and an architect on the client side, a technical lead per partner and product owners in the business."
  - "Approvals belong in a matrix and in the Git platform: branch protection, required reviews and code owners enforce what would otherwise only sit in a concept paper."
  - "Tool choice, pull requests, standards, release calendar and exit duties go into one annex to the framework contract, identical for every partner."
  - "A partner change costs little when the client owns the process: revoke access, renew certificates, reconcile org and repository."
articles: [client-owned-devops-tools, pull-request-reviews-enterprise, partners-ai-coding-sow-rules, ai-org-assessment-technical-debt]
faq:
  - q: "Who should be release manager in a Salesforce programme?"
    a: "Someone on the client side, ideally an employee. An external consultant can set the role up and run it for a few months but should hand it over to an internal colleague. A partner who delivers work itself should not decide on every partner's releases."
  - q: "May a partner deploy directly to the production org?"
    a: "No. In production only the pipeline deploys, with its own technical user. Partner users in production need neither Modify All Data nor Deploy Change Sets or Author Apex, because each of these permissions opens deployment through the Metadata API."
  - q: "Do required reviews need a specific Git licence?"
    a: "On GitHub, protected branches and code owners for private repositories start with GitHub Pro, Team or Enterprise. On GitLab, Code Owners is only in Premium or Ultimate. Check this before you settle on a Git platform."
  - q: "What happens to the history when a partner leaves the programme?"
    a: "If it sits in your repository and your tool, it stays complete. You only remove the users and renew certificates and integration passwords. If it sits with the partner, you have to export and migrate, often with losses."
draft: false
---

In a Salesforce release process, repository, pipeline, DevOps tool, sandboxes and credentials belong to you as the client. Partners work in them with personal users. Four roles carry the process: a release manager and an architect on the client side, a technical lead per partner and product owners in the business. Who approves what is written in a matrix and enforced in the Git platform, not just in a concept paper. The rules for all partners are written into every contract in the same words. A partner change then becomes a planned procedure: remove users, renew certificates, carry on.

## What should you own as the client?

[Chapter 1](../release-management-basics/) set the baseline: the release process belongs to you. In practice, the contracts, licences and admin rights for the building blocks below are in your name. Owning does not mean running your own servers. A cloud GitHub organisation is fine, as long as it is yours.

| Building block | Owned by | Partners get |
|---|---|---|
| Git repository and organisation on the Git platform | you, with at least two internal admins | write access to feature branches, no admin rights |
| Pipeline configuration and CI variables | you | read access, changes only by pull request |
| DevOps tool (sfdx-hardis configuration, Gearset team, Copado or Flosum org) | you | a personal licence or user, assigned by you |
| Production, sandboxes, Dev Hub | you | one user per person, rights to match the stage |
| Certificates, technical users, integration access to SAP | you, in your own vault | no direct access |
| Backlog, wiki, standards | you | edit rights in the project |

What this looks like depends on the product. With sfdx-hardis the configuration lives as files in the repository, so whoever owns the repository owns the process. In Gearset, according to the [Gearset docs](https://docs.gearset.com/en/articles/2477938-team-ownership-and-management), only team owners manage licence assignment, and anyone removed from the team immediately loses access to the shared history, while the history stays with the team. That is exactly the behaviour you want, but only if the team is yours. Flosum, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/development-lifecycle-management-with-flosum/understand-platform-structure-and-flow), runs on the Salesforce platform itself and does not need to move data elsewhere. Make sure the org Flosum runs in belongs to you. Which tool fits you is compared in [chapter 4](../devops-tools-compared/). For this chapter one point matters: whoever holds the tool's contract decides who has access.

Why the same applies to Jira, Confluence and Miro, and how to plan a move when a partner owns parts of it today, is covered in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/).

## Which roles does a release process need?

Programmes with several partners easily develop the same gap: each partner owns its stream, nobody owns the whole. Four roles close it. In small programmes one person can hold two roles, but the responsibility still has to be named.

- **Release manager (client side).** Owns the pipeline, the release calendar and every promotion from integration through UAT to production. The [sfdx-hardis release manager guide](https://sfdx-hardis.cloudity.com/salesforce-devops-release-home/) describes the job well: check validation jobs, solve conflicts, merge into the major branches, ship hotfixes and bring them back into the build branches afterwards, produce release notes and DORA metrics. According to the same page, one or two team members take this role, and on small projects a tech lead or senior admin can do it part time.
- **Architect (client side).** Writes the development and architecture standards, approves architecture-relevant changes (new objects, integrations, sharing, the permission model) and decides when two streams need the same object. Which stream owns which object is set out in an [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/).
- **Technical lead per partner.** Makes sure the team's pull requests arrive complete, small and checked, does the first review within the stream and supplies the input for the release notes. Has no approval rights for stages that affect other partners.
- **Product owner in the business.** For example the head of service for Field Service or the head of sales for the dealer portal. Accepts stories in UAT and decides from a business point of view whether a feature goes live for users with the next release.

The release role is the one programmes most often save on. My position, which I have set out in several articles: if you save licence costs with an open-source tool such as sfdx-hardis, the money is best invested in an internal release role. The same holds for commercial platforms such as Gearset, Copado or Flosum. Their advantage is that roles and approvals can be set up in one interface and the vendor provides support; a person on your side still has to own the approvals. More on this in [why DevOps decides Salesforce enterprise projects](../../../blog/why-devops-matters-salesforce-enterprise/).

```praxis
In one programme I supported, every pull request went across my desk at first. Once the process was stable, I handed it over to an internal colleague. That is the path I recommend: build it with outside help, hand it over internally.
```

## Who approves what?

An approval matrix answers two questions for every kind of change: who checks, and who decides? Here is a starting point that I would adapt to your streams:

| Change | Checked by | Approved by |
|---|---|---|
| Pull request within one stream | second developer or the partner's lead | the partner's lead, with a green pipeline |
| Change to an object another stream owns | lead of the owning stream | architect |
| New object, new integration, sharing or permission model | architect | architect |
| Promotion to UAT | release manager | release manager |
| Release to production | release manager, product owner | product owner for the business, release manager technically |
| Hotfix | architect or lead | release manager and the product owner affected |
| Pipeline, branch protection, tool configuration | release manager | client side only |

What a good review checks and how it stays fast is covered in [why pull request reviews are a must](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/). This chapter is about enforcement, because a matrix in the wiki stops nobody.

### In the Git platform

On GitHub, [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) require a minimum number of approvals and passing status checks before a merge. Two details are often missed. Admins are exempt from the rules by default until you switch on "Do not allow bypassing the above settings". And for private repositories, protected branches start with GitHub Pro, Team or Enterprise. A [CODEOWNERS file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) automatically requests the owning stream as reviewer when a pull request changes its files, and "Require review from Code Owners" makes that mandatory. That is how the second row of the matrix becomes real: the order object's metadata belongs to the integration stream, and no other partner merges past it.

GitLab offers [Code Owners](https://docs.gitlab.com/user/project/codeowners) in Premium and Ultimate; on protected branches, code owner approval can be made mandatory. In Azure DevOps the building blocks are called [branch policies](https://learn.microsoft.com/en-us/vsts/git/branch-policies): a minimum number of reviewers and automatically included reviewers for specific folders, which you can mark as "Required".

### In the DevOps tools

The commercial platforms bring their own approvals. According to its [docs](https://docs.gearset.com/en/articles/9927191-gearset-security-roles), Gearset offers custom roles with permissions on pipelines, CI jobs and orgs from "Deployment Teams and Automation Starter", and suggests as an example a "Production Deployment" role assigned only when needed. Copado Essentials Plus has an [approval process](https://docs.essentials.copado.com/en/articles/6887394-approval-process-with-copado-essentials) in which users with the Owner or Team Lead role approve deployments from an org. With sfdx-hardis, approvals run through the Git platform's pull requests, so through the branch protection above.

### In the Salesforce org

A pipeline is of little use if someone can deploy around it.

```hinweis achtung
According to the [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_metadata_perm.htm), deploying through the Metadata API needs "Modify Metadata Through Metadata API Functions" or "Modify All Data". The first is switched on automatically as soon as someone has "Deploy Change Sets" or "Author Apex".
```

So check in production, UAT and staging which partner users hold one of these permissions. Only the pipeline's technical user should deploy there, as [chapter 5](../building-the-pipeline/) describes. For temporary rights, say for an analysis in production, permission set assignments can get an expiration date according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/platform-app-builder-certification-maintenance-winter-23/get-hands-on-with-permission-set-expiration), after which the rights lapse automatically.

## Which rules belong in every partner contract?

I am an architect, not a lawyer. The points below describe what I want to see in writing from a technical point of view. Your legal department turns them into clauses. I recommend one annex to the framework contract that applies identically to every partner, instead of renegotiating rules in every statement of work.

1. **Work happens in your tools.** Code, tickets and documentation are created in your repository and your backlog, with personal, named users. Shared logins are ruled out.
2. **The tool is fixed.** The choice is made at the start of the programme and applies to every partner. Whoever joins later does not bring their own release tool.
3. **Every change by pull request.** Including flows, permission sets and layouts. Nobody changes anything directly in Setup in integration, UAT, staging or production.
4. **Standards and review rules apply.** The client's standards document is part of the contract, as are agreed response times for reviews.
5. **Definition of done.** Tests with real asserts, a pull request description that links to the story, documented pre and post deployment steps.
6. **Release calendar and freeze windows.** The partner plans against your calendar, not its own. How the calendar is built is covered in [chapter 8](../release-planning-salesforce-releases/).
7. **Hotfixes through the same pipeline.** No exception for "urgent".
8. **Rules for AI coding.** Which tools, which data, which review. The checklist for this is in [partners coding with AI: what belongs in the contract](../../../blog/partners-using-ai-coding-contract-rules/).
9. **Exit.** Handover with no work outside the repository, confirmation that local copies of your code and credentials are deleted, and active support for the handover over an agreed period.

I have worked with nearshore teams in Eastern Europe and India, and my view is that written rules are worth more than any alignment call. A team in another time zone cannot quickly ask whether a Setup click in UAT is fine. It needs the rule beforehand.

## How does the release process survive a partner change?

Once ownership, roles and contract rules are in place, a partner change is a procedure with a checklist. A typical scenario, as an assumption: a packaging machine manufacturer runs Service Cloud with Field Service, a dealer portal and an SAP integration. Three partners work on the org. After a tender, the partner for the service stream is replaced by a new one, with four weeks of overlap.

1. **Take stock before the exit is announced.** A comparison between production and the repository shows what never reached the repository. The setup audit trail helps: according to the [Salesforce object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) it shows Setup changes for at least the last 180 days. Older drift only shows up in the comparison. What an assessment of technical debt before the change looks like is covered in [AI org assessment: technical debt before a partner change](../../../blog/ai-org-assessment-technical-debt/).
2. **Onboard the new partner into the existing setup.** It gets users in the repository, the tool and the sandboxes, reads the standards and submits small pull requests in its first week, closely followed by the release manager.
3. **Update CODEOWNERS.** The service stream's objects change owner without the process changing.
4. **Revoke access.** On the last day, every user of the old partner loses access to the Git platform, the tool, the sandboxes and production.
5. **Renew secrets.** Pipeline certificates, passwords of technical users, access to the SAP middleware. Anything the old partner has ever seen gets replaced.

In this scenario the release calendar runs on without a break, because pipeline, history and standards belong to the manufacturer. From day one the new partner works by the same rules as the other two, and the partners stay comparable. The same situation with a pipeline in the old partner's account would have meant a migration in the middle of the change.

## Where do you start?

1. List every tool with contract holder, admins and partner users.
2. Name a release manager and an architect on the client side, even if one person does both.
3. Write the approval matrix on one page and map it to branch protection and CODEOWNERS.
4. Remove direct deployment rights from partner users in the stage orgs.
5. Draft the annex for all partner contracts with your legal department.

Running this across all partners is the core of my work in [partner governance](../../../services/partner-governance/). Which orgs and branches the roles in this chapter work with follows in [chapter 3 on environments and branches](../environments-and-branching/).

A release process stays stable when you own it, every role is named and every partner has signed the same rules. If you would like ownership, roles and partner contracts in your programme reviewed, [send me a message](#contact).
