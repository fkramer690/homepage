---
title: "Setup with Agentforce: allow admin AI in production?"
description: "Setup with Agentforce changes fields, flows and permissions on request. Where the admin agent fits a governed release process and what to allow in production."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: setup-with-agentforce-admin-changes
translationKey: setup-with-agentforce-admin-changes
topic: governance
categories: [devops, ai]
tags: [setup with agentforce, agentforce for flow, release management, governance, devops, manufacturing]
takeaways:
  - "Since May 2026, the Setup agent has been able to create objects, fields, flows, Lightning pages, permission sets and sharing rules after approval."
  - "The approval click comes from the same person who asked. Metadata built by the agent therefore passes through repository and pipeline like any other change."
  - "In production I would allow the Setup agent for questions, access troubleshooting and user administration, and keep metadata changes in developer sandboxes."
  - "The agent can only do what the admin may do. In production, what counts is who holds Manage Flows, Customize Application and similar rights."
  - "The Audit Trail names the admin and the agent. 500 free actions a month apply only with Flex Credits; otherwise Einstein Requests are used."
faq:
  - q: "What is Setup with Agentforce?"
    a: "It is an admin agent inside Salesforce Setup. Admins describe a task in natural language, and the agent proposes a solution and applies it after approval, for example by creating a custom object with fields, a flow, a permission set or a Lightning page."
  - q: "Should Setup with Agentforce be used in production?"
    a: "For questions, access troubleshooting and user administration such as freezing users, yes. For metadata changes like fields, flows, pages or sharing rules I would not: they belong in a developer sandbox and reach production through the repository and the pipeline."
  - q: "Does Setup with Agentforce log its changes?"
    a: "Yes. According to Salesforce Help, supported Setup changes made through the agent appear in the Setup Audit Trail with the admin in the User column and the agent's name and ID in the AI Agent column. Entries are deleted after 180 days, so export them if you need them longer."
  - q: "What does Setup with Agentforce cost?"
    a: "According to Salesforce Help, orgs with the Flex Credits add-on get 500 free Setup agent actions per month across all users. Without that add-on, Einstein Requests are consumed and there are no free actions. Data 360 credits are consumed in either case. Salesforce calls the 500 actions a contractual limit that may not be enforced technically, so you monitor it yourself."
  - q: "What is the difference between Setup with Agentforce and Agentforce for Flow?"
    a: "Agentforce for Flow, formerly Einstein for Flow, works inside Flow Builder: it drafts flows from a text prompt, summarizes flows and edits existing ones through prompts. It is in beta and needs the Foundations or Agentforce 1 editions with Data 360. The Setup agent works across Setup and can create objects, permissions and pages as well."
draft: false
---

Setup with Agentforce and Agentforce for Flow belong in a developer sandbox as faster ways to produce metadata that then passes through the repository and the pipeline like any other change. In production I would allow the Setup agent for questions, access troubleshooting and user administration, and nothing that creates or changes metadata. The agent asks for approval before it acts, but that approval comes from the same admin who asked. It replaces neither a second reviewer nor the object ownership matrix nor the deployment that keeps production and the repository in step.

## What can the Setup agent change, and what does Salesforce document?

Setup with Agentforce is an admin agent with an "Ask Setup Agent" button on Setup pages. Salesforce announced on the [Admin blog on 26 May 2026](https://admin.salesforce.com/blog/2026/setup-with-agentforce-is-generally-available) that it is "now Generally Available (GA)", without naming a release. The [Trailhead module for admins](https://trailhead.salesforce.com/content/learn/modules/setup-with-agentforce-for-admins/get-started-with-setup-with-agentforce) lists what it does:

- troubleshoot user access and manage users
- manage permission sets, permission set groups, org-wide defaults and sharing rules
- create custom objects and fields; create autolaunched, record-triggered and schedule-triggered flows
- create custom report types and new Lightning record pages, which you then edit and activate in Lightning App Builder
- create, modify and explain formulas
- answer questions from Salesforce Help and report on org health, usage and licenses

Three statements from Salesforce matter for governance. The same Trailhead unit says: "The agent only takes action when you approve." It also says the agent "only helps with tasks for which you have the correct permissions", and that its changes can be reviewed in the Setup Audit Trail. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=admin_monitorsetup.htm&language=en_US&type=5), the trail shows the admin in the User column and the agent's name and ID in the AI Agent column, and deletes entries after 180 days.

On cost, the [usage page in Salesforce Help](https://help.salesforce.com/s/articleView?id=xcloud.setup_agentforce_usage.htm&language=en_US&type=5) is more precise than the older Admin blog post, which called Setup actions non-billable. Orgs with the Flex Credits add-on get 500 free Setup agent actions per month across all users. Without that add-on, Einstein Requests are consumed and there are no free actions. Data 360 credits are consumed in either case. Salesforce calls the 500 actions a contractual limit that "may not be enforced in the Services as a technical matter", so monitoring it is your job. With three admins using the agent daily, that allowance can run out within a month.

```hinweis offen
I could not find on any Salesforce page I opened whether flows the agent builds are saved active or inactive, or whether behavior or the allowance differs between sandbox and production.
```

One independent test is worth knowing. Andy Engin Utkan tried the agent in a production org for [Salesforce Break in July 2026](https://salesforcebreak.com/2026/07/07/setup-with-agentforce-review/); at that time it could not list users with View All Data or Modify All Data, and his verdict was "This feature launched before it was fully baked." That is one author's test from July. He did not try flow creation, and the product has changed since. For a broader tool overview, see the masterclass chapter on [Salesforce AI development tools](../../masterclass/ai-salesforce/salesforce-ai-development-tools/).

Agentforce for Flow, formerly Einstein for Flow, is the narrower tool. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.flow_build_let_einstein_help_you_build_flows.htm&language=en_US&type=5), it drafts flows from a text prompt inside Flow Builder, summarizes flows and edits existing flows through prompts. Help labels it beta and requires the Foundations or Agentforce 1 editions with Data 360 enabled. A draft is not saved automatically.

## An agent change in production breaks the release process

A governed Salesforce program rests on one rule: production contains what the repository contains, and every change gets there through the pipeline. I describe why in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/). A field, flow or Lightning page created directly in production breaks that rule, whether a person builds it manually or an agent does.

The agent makes it worse in three ways:

- **Speed.** A data model with seven fields and a flow takes minutes. More direct changes reach production per week, and each one creates drift between repository and org.
- **The approval looks like a review.** The admin who wrote the prompt approves the proposal. Nobody else checks whether the object belongs to another stream in the [object ownership matrix](../salesforce-object-ownership-matrix/), whether a flow on that object already exists, or whether the permission set is too broad.
- **The audit trail records what, not why.** It shows the supported Setup change, admin, agent and a timestamp. It does not show a user story, a reviewer or a test, and after 180 days you need your own export.

Then the next deployment arrives. A partner deploys a Lightning record page and its activation from the repository, and the page built in production loses its assignment. A validation in the pipeline runs against a sandbox that does not have the new flow, so it tests a different org from the one it deploys to.

## Should the Setup agent be allowed in production?

Yes, for a defined part of its work. I split by whether the action produces metadata that belongs in the repository.

| Action | Production | Developer sandbox |
|---|---|---|
| Questions, help, org health, license usage | allowed | allowed |
| Troubleshoot why a user cannot see a record | allowed as a first diagnosis, verify the answer | allowed |
| Freeze a user, reset a password, assign an existing permission set | allowed for single users, as today | allowed |
| Bulk user changes, profile changes, admin rights | only with a ticket and a second person | allowed |
| New permission set, sharing rule, org-wide default | not allowed | allowed, then pipeline |
| Objects, fields, formulas, report types | not allowed | allowed, then pipeline |
| Flows, Lightning pages | not allowed | allowed, then pipeline |

Routine user administration is already done in production in most orgs and never passes through a repository. Salesforce Help lists limitations for access troubleshooting, for example when sharing is controlled by parent, so treat its answers as a diagnosis, not a security decision. Everything below that line is metadata and follows the release process.

You enforce this through permissions, not through a policy document. Salesforce says the agent can only do what the admin is allowed to do. So the question is who holds the task-specific rights in production: Manage Flows for flows, Customize Application for objects and fields, Manage Profiles and Permission Sets, Manage Sharing, and the user management rights. If only the release user and one emergency admin hold the metadata rights, no other admin can have the Setup agent build a flow in production, whatever options its button offers. Who may use the agent at all is controlled by the Setup with Agentforce User permission set group.

## Worked example: an extended warranty field before a trade fair

Assume a machine builder with Service Cloud, Field Service for its field technicians and SAP as its ERP system. All numbers are assumptions. Two partners work on the org: partner A owns Asset in the ownership matrix, partner B owns Work Order. Three in-house admins handle users and small requests in production.

The head of service wants the hotline to see an "extended warranty until" date on the asset page before a trade fair campaign. On a Tuesday an admin asks the Setup agent in production for the field, a new Asset record page that shows it and a record-triggered flow that fills the date from the service contract. The agent proposes the solution, the admin approves, activates the page in Lightning App Builder and the flow in Flow Builder, and it is done in fifteen minutes.

On Thursday partner A deploys its sprint release, which includes the Asset record page and its activation from the repository. The hotline sees partner A's page again, without the new field. The flow keeps running alongside partner A's flow, which already calculates warranty end from the installation date. The following week the hotline quotes two different warranty dates to a dealer. The Setup Audit Trail shows the changes, but no ticket and no reason.

The same request in a developer sandbox with source tracking would have taken the same fifteen minutes. The admin retrieves the changes into a branch and opens a pull request. Partner A reviews it as owner of Asset and merges the two flows into one. The field reaches production in the next release, about a week later.

## Write the pipeline rule next to the ownership matrix

Setting up the release process and the rights model for admin AI is part of my [DevOps and release management](../../services/devops-release-management/) work. The sequence follows the permissions: whatever an admin may not do in production, the agent cannot do there either.

```schritte
Write the rule down
  Metadata changes reach production only through the pipeline, regardless of whether a person, a partner or an agent produced them. Put it next to the ownership matrix.
Check production rights
  List who holds Manage Flows, Customize Application and comparable permissions. The Setup agent inherits exactly that list.
Sandboxes first
  Enable the agent in developer sandboxes first. [Source tracking](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html) works only in Developer and Developer Pro sandboxes, so supported metadata changes by the agent can be retrieved and added to a pull request.
Run the same gates
  Agent-built flows and fields pass the same checks as partner code, as described in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/).
Read the audit trail
  Review production's Setup Audit Trail every week for changes not made by the release user, filter on the AI Agent column, and export it before the 180 days run out.
Watch consumption
  Track Setup agent usage against the 500 actions if you have Flex Credits, or against your Einstein Requests otherwise, and ask Salesforce in writing how actions beyond that are billed.
```
