---
title: "Setup with Agentforce: allow admin AI in production?"
description: "Setup with Agentforce changes fields, flows and permissions on request. Where the admin agent fits a governed release process and what to allow in production."
pubDate: 2026-10-27
lang: en
slug: setup-with-agentforce-admin-changes
translationKey: setup-with-agentforce-admin-changes
topic: governance
categories: [devops, ai]
tags: [setup with agentforce, einstein for flow, release management, governance, devops, manufacturing]
takeaways:
  - "Since May 2026 the Setup agent creates objects, fields, flows, Lightning pages, permission sets and sharing rules after approval."
  - "The approval click comes from the same person who asked. Metadata built by the agent therefore goes through repository and pipeline like any other change."
  - "In production I would allow the Setup agent for questions, access troubleshooting and user administration, and keep metadata changes in developer sandboxes."
  - "The agent can only do what the admin may do. In production, what counts is who holds Customize Application, not who may use the agent."
  - "Open questions: whether agent-built flows are saved active, how the Audit Trail labels them and what actions beyond 500 a month cost."
faq:
  - q: "What is Setup with Agentforce?"
    a: "An admin agent inside Salesforce Setup. Admins describe a task in natural language, the agent proposes a solution and applies it after approval, for example a custom object with fields, a flow, a permission set or a Lightning page."
  - q: "Should Setup with Agentforce be used in production?"
    a: "For questions, access troubleshooting and user administration such as freezing users, yes. For metadata changes like fields, flows, pages or sharing rules I would not: they belong in a developer sandbox and reach production through the repository and the pipeline."
  - q: "Does Setup with Agentforce log its changes?"
    a: "According to Trailhead, every change the agent makes can be reviewed in the Setup Audit Trail, which keeps at least the last 180 days. Whether an entry is labelled as made by the agent or only under the admin's name is not stated on the pages I checked."
  - q: "What does Setup with Agentforce cost?"
    a: "Salesforce's product page lists 500 free Setup agent actions per org and month, shared across all users, and says usage consumes Data 360 credits. The Admin blog calls Setup actions non-billable. A price for actions beyond the allowance is not published on those pages."
  - q: "What is the difference to Einstein for Flow?"
    a: "Einstein for Flow drafts a single flow of about six elements from a text prompt inside Flow Builder and consumes Einstein Requests. The Setup agent works across Setup and can create objects, permissions and pages as well."
draft: false
---

Setup with Agentforce and Einstein for Flow belong in a developer sandbox, as a faster way to produce metadata that then goes through the repository and the pipeline like any other change. In production I would allow the Setup agent for questions, access troubleshooting and user administration, and nothing that creates or changes metadata. The agent asks for approval before it acts, but that approval comes from the same admin who asked. It replaces neither a second reviewer, nor the object ownership matrix, nor the deployment that keeps production and repository in step.

## What can the Setup agent change, and what does Salesforce document?

Setup with Agentforce is an admin agent with an "Ask Setup Agent" button on Setup pages. Salesforce announced on the [Admin blog on 26 May 2026](https://admin.salesforce.com/blog/2026/setup-with-agentforce-is-generally-available) that it is "now Generally Available (GA)", without naming a release. The [Trailhead module for admins](https://trailhead.salesforce.com/content/learn/modules/setup-with-agentforce-for-admins/get-started-with-setup-with-agentforce) lists what it does:

- troubleshoot user access and manage users
- manage permission sets, permission set groups, org-wide defaults and sharing rules
- create custom objects and fields, create and manage flows
- create custom report types and Lightning pages
- create, modify and explain formulas
- answer questions from Salesforce Help and report on org health, usage and licences

Three statements from Salesforce matter for governance. The same Trailhead unit says: "The agent only takes action when you approve." It also says the agent "only helps with tasks for which you have the correct permissions", and that every change it makes can be reviewed in the Setup Audit Trail. According to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm), that trail covers at least the last 180 days.

On cost the sources do not agree. The [product page](https://www.salesforce.com/platform/setup/) lists 500 free Setup agent actions per org and month, shared across all users, and says usage consumes Data 360 credits. The Admin blog calls Setup actions non-billable and says only the Help and Navigation action uses a small amount of Data 360 credits, which was to move to a different framework around Dreamforce 2026. Assume three admins with 12 requests each per working day: that is about 750 requests a month. If every request counts as one action, which no page defines, the org would pass the allowance in the third week.

```hinweis offen
On no Salesforce page I opened could I find whether flows the agent builds are saved active or inactive, or whether the Setup Audit Trail marks a change as agent-made or only shows the admin's name.

Also open: whether behaviour or allowance differ between sandbox and production, what an action beyond the 500 costs, and whether the Data 360 change after Dreamforce happened.
```

One independent test is worth knowing. Andy Engin Utkan tried the agent in a production org for [Salesforce Break in July 2026](https://salesforcebreak.com/2026/07/07/setup-with-agentforce-review/); it could not list users with View All Data or Modify All Data, and his verdict was "This feature launched before it was fully baked." That is one author's test, and he did not try flow creation. For the wider tool overview, see the masterclass chapter on [Salesforce AI development tools](../../masterclass/ai-salesforce/salesforce-ai-development-tools/).

Einstein for Flow is the narrower tool. According to [Salesforce Ben](https://www.salesforceben.com/einstein-for-flow-now-generally-available-tutorial-and-first-steps/), it became GA in Spring '25, drafts flows of up to about six elements, needs the Manage Flows permission and consumes Einstein Requests in production and sandboxes. The draft is not saved automatically.

## An agent change in production breaks the release process

A governed Salesforce programme rests on one rule: production contains what the repository contains, and every change gets there through the pipeline. I describe why in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/). A field, flow or Lightning page created directly in production breaks that rule, whether a person clicks it together or an agent does.

The agent makes it worse in three ways:

- **Speed.** A data model with seven fields and a flow takes minutes. More direct changes reach production per week, and each one is drift between repository and org.
- **The approval looks like a review.** The admin who wrote the prompt approves the proposal. Nobody else checks whether the object belongs to another stream in the [object ownership matrix](../salesforce-object-ownership-matrix/), whether a flow on that object already exists, or whether the permission set is too broad.
- **The audit trail records what, not why.** It shows the change and a timestamp. It does not show a user story, a reviewer or a test, and after 180 days you need your own export.

Then the next deployment arrives. A partner deploys a Lightning record page from the repository and the field added in production disappears from the page. A validation in the pipeline runs against a sandbox that does not have the new flow, so it tests a different org from the one it deploys to.

## Should the Setup agent be allowed in production?

Yes, for a defined part of its work. I split by whether the action produces metadata that should live in the repository.

| Action | Production | Developer sandbox |
|---|---|---|
| Questions, help, org health, licence usage | allowed | allowed |
| Troubleshoot why a user cannot see a record | allowed | allowed |
| Freeze user, reset password, assign existing permission set | allowed, as today | allowed |
| New permission set, sharing rule, org-wide default | not allowed | allowed, then pipeline |
| Objects, fields, formulas, report types | not allowed | allowed, then pipeline |
| Flows, Lightning pages | not allowed | allowed, then pipeline |

User administration is already done in production in most orgs and never travels through a repository. Everything below that line is metadata and follows the release process.

You enforce this through permissions, not through a policy document. Salesforce says the agent can only do what the admin is allowed to do. So the question is who holds Customize Application and similar rights in production. If only the release user and one emergency admin hold them, no other admin can have the Setup agent build a flow in production, whatever its button offers.

## Worked example: an extended warranty field before a trade fair

Assume a machine builder with Service Cloud, Field Service for its technicians in the field and SAP as ERP. All numbers are assumptions. Two partners work on the org: partner A owns Asset in the ownership matrix, partner B owns Work Order. Three in-house admins handle users and small requests in production.

The head of service wants the hotline to see an "extended warranty until" date on the asset page before a trade fair campaign. On a Tuesday an admin asks the Setup agent in production for the field, a place on the Asset record page and a record-triggered flow that fills the date from the service contract. The agent proposes the solution, the admin approves, and it is done in ten minutes.

On Thursday partner A deploys its sprint release, which includes the Asset record page from the repository. The new field vanishes from the page. The flow keeps running, next to partner A's flow that already calculates warranty end from the installation date. The following week the hotline quotes two different warranty dates to a dealer. The Setup Audit Trail shows the changes, but no ticket and no reason.

The same request in a developer sandbox with source tracking would have taken the same ten minutes. The admin retrieves the changes into a branch, opens a pull request, partner A reviews it as owner of Asset and merges the two flows into one. The field reaches production in the next release, about a week later.

## First step: write the pipeline rule next to the ownership matrix

Setting up the release process and the rights model for admin AI is part of my [DevOps and release management](../../services/devops-release-management/) work. The order follows the permissions: whatever an admin may not do in production, the agent cannot do there either.

```schritte
Write the rule down
  Metadata changes reach production only through the pipeline, regardless of whether a person, a partner or an agent produced them. Put it next to the ownership matrix.
Check production rights
  List who holds Customize Application and comparable permissions. The Setup agent inherits exactly that list.
Sandboxes first
  Enable the agent in developer sandboxes first. [Source tracking](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html) works only in Developer and Developer Pro sandboxes, so agent changes can be retrieved and land in a pull request.
Run the same gates
  Agent-built flows and fields pass the same checks as partner code, as described in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/).
Read the audit trail
  Review production's Setup Audit Trail every week for changes not made by the release user, and export it before the 180 days run out.
Watch consumption
  Track Setup agent usage against the 500 actions and ask Salesforce in writing how actions beyond that are billed.
```
