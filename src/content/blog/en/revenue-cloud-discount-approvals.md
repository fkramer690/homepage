---
title: "Discount approvals in Revenue Cloud: Advanced Approvals"
description: "How to design discount and margin approvals with Advanced Approvals in Revenue Cloud so sales stays fast, finance keeps control and decisions are traceable."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-discount-approvals
translationKey: revenue-cloud-discount-approvals
topic: revenue
categories: [revenue-cloud]
tags: [revenue cloud, advanced approvals, discounts, margin, quote, cpq migration]
takeaways:
  - "The approval preview currently shows only configured sample values, not the real chain of a quote. Test the chains with real submissions."
  - "Margin approvals need trusted cost data on every relevant quote line, usually from the ERP. Without it, approve on discount and deal size."
  - "Since September 2026 the Approval Agent submits, tracks and summarizes approvals; the threshold and approver still come from the workflow."
  - "Do not assume Advanced Approvals from Salesforce CPQ will carry over. Redesign rules, chains and approvers in the migration and test them."
faq:
  - q: "What is Advanced Approvals in Revenue Cloud?"
    a: "Advanced Approvals is the approval feature of Revenue Cloud, which Salesforce now calls Revenue Management. It is included in Revenue Cloud Growth and Advanced and provides invocable actions for parallel or sequential approval chains with detailed audit trails, built on Flow Approval Processes and Flow Orchestration."
  - q: "Can sales see who has to approve a discount before submitting?"
    a: "Not reliably yet. Salesforce documents a preview of approval workflows, but a Knowledge article from 8 October 2026 says the preview shows only the sample values from Configure Test Output, the same for every quote. The real approvers appear after submission. Until that changes, I would publish the approval matrix where reps can see it."
  - q: "Can I migrate CPQ approval rules to Revenue Cloud?"
    a: "Do not plan on copying them. CPQ approvals come from the separate Advanced Approvals package, and Salesforce Help states that the data models of CPQ and Revenue Cloud differ significantly and recommends a redesign. Treat approval rules, chains and approvers as a rebuild item with their own test cases, unless your migration tool proves otherwise."
  - q: "Should an AI agent approve discounts?"
    a: "Not based on its own judgment. The threshold and the approver should come from the approval workflow, and the decision from the approver. Since September 2026 the Approval Agent lets reviewers approve or reject faster with AI summaries; the reviewer still decides, the agent executes."
draft: false
---

In Revenue Cloud, discount and margin approvals run on Advanced Approvals: approval workflows with stages, serial and parallel approvers and an audit trail. A rep starts the process from the quote. Keep the approval matrix short, with discount, margin and deal size as the triggers, and make it visible to reps, because the preview currently shows only sample values. Margin approvals need trusted cost data, usually from the ERP, on every relevant quote line. The thresholds belong in rules, never in an agent's judgment. If you come from Salesforce CPQ, plan approvals as a rebuild, because the Advanced Approvals package is a different model.

## What is Advanced Approvals in Revenue Cloud?

Revenue Cloud is Salesforce's quote-to-cash suite on standard objects; Salesforce now calls it Revenue Management, while the licenses are still Revenue Cloud Growth and Advanced. Its approval feature is Advanced Approvals. According to the [developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm), it provides invocable actions for "intricate parallel or sequential approval chains" with "detailed audit trails". Business APIs let you preview approval levels before a record is submitted. It is available in Enterprise, Unlimited and Developer Edition orgs with a Revenue Cloud Growth or Advanced license where Advanced Approvals is enabled.

```vertiefung For admins
title: What is Advanced Approvals built on?
Technically it is built on Flow Approval Processes and powered by Flow Orchestration, whose limits apply too. According to the [Flow Approval Process data model](https://developer.salesforce.com/docs/platform/data-models/guide/platform-flow-approval-process.html), stages, steps and decisions are built in Flow Builder, and each run creates approval submissions and approval work items. [Advanced Approvals](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) adds actions for parallel and sequential approval chains. For you that means two things. An admin who knows Flow and Flow Orchestration can read and change the approval logic. And every approval leaves records that can be used for reporting and audits.
```

## How does an approval run on a quote?

The [Help article on approvals in a quote](https://help.salesforce.com/s/articleView?language=en_US&id=ind.approvals_use_advanced_approvals_in_a_quote.htm&type=5) describes the flow from the rep's side. The rep saves the quote after all pricing changes and clicks Submit for Approval. The workflow starts, and the approvers see their work items when they log in. Salesforce's example routes by discount: at 25 percent, a sales manager approves; above 50 percent, a sales VP approves as well.

Beyond this basic flow, the same Help section documents several features that affect how fast approvals feel in daily work:

- **Preview.** The preview is meant to show the rep which approval steps will apply before submitting. According to a [Knowledge article from 8 October 2026](https://help.salesforce.com/s/articleView?id=005461444&language=en_US&type=1), it currently returns only the sample values from Configure Test Output, the same for every quote.
- **Serial and parallel approvers.** Finance and sales management can review at the same time instead of one after the other.
- **Smart Approvals and rule-based auto-approvals.** When a rep resubmits a recalled or rejected quote, steps that were already approved can be skipped if the conditions still hold.
- **Delegation.** Approvers hand their work items to a deputy during holidays.
- **Notifications in Slack and by email.** These help approvers who do not live in Salesforce.

My recommendation: make the approver visible from day one, through the preview once it evaluates real quotes and through the published matrix until then. Most frustration with approvals comes from reps who submit and then wait without knowing who they are waiting for.

## Discount, margin and deal size as triggers

An approval matrix is the table that says which deviation needs which approver. Keep it to a handful of triggers that sales can remember. A worked example: a component maker sells standard parts and configured assemblies through 25 internal sales reps. A matrix for it could look like this.

| Trigger | Threshold | Approver |
|---|---|---|
| Discount on list price | above 15 percent | Sales manager |
| Discount on list price | above 30 percent | Head of sales |
| Margin per quote | below 25 percent | Sales controlling |
| Deal size | above €500,000 | Managing director |
| Payment terms | longer than standard | Finance |

Three rules keep such a matrix workable. Each trigger has exactly one owner who can change the threshold. Thresholds are written down outside Salesforce as well, so sales and finance argue about the policy and not about a Flow. And every new trigger has to justify itself against the existing ones, or the matrix grows until every quote needs three signatures.

The discount itself comes from pricing. How Revenue Cloud calculates list price, volume discount and manual discount in sequence is covered in [Salesforce Pricing: how Revenue Cloud calculates prices](/en/blog/revenue-cloud-pricing-procedures-explained/). The approval should check the result of that calculation, not recalculate it.

## Margin needs cost data from the ERP

A margin approval needs a trusted cost on every quote line that matters for margin. Revenue Cloud has the necessary fields on the quote line item, such as unit cost and effective margin, but in manufacturing the cost usually lives in the ERP: standard cost or a calculated cost per material in SAP controlling. Salesforce does not know it unless you bring it over.

I see three ways, and I would pick the simplest that finance accepts:

1. **Standard cost synced per product.** Good enough for standard parts. Finance decides how often it is refreshed.
2. **Cost calculated by the ERP on request.** Needed for configured assemblies where the cost depends on the options. That means an API call when the quote is priced.
3. **No margin approval.** Base approvals on discount and deal size only, and let controlling review margins after the order. This is honest, and better than a margin field nobody trusts.

Whichever route you take, decide who owns the cost field and lock it with field permissions. If sales can edit it, the margin approval is decoration. My [object ownership matrix](/en/blog/salesforce-object-ownership-matrix/) is the tool I use to write that down.

## Why do approval rules stay deterministic, even with an agent in front?

Because approval routing has a right answer. A discount is above 30 percent or it is not, and the head of sales either is the approver or is not. Whether the head of sales then approves is a judgment call, and that belongs to a person. If an agent interprets the routing rule, the same quote can take a different path on Monday than on Tuesday, and an auditor will ask why.

Salesforce Help lists an Agentforce area for Advanced Approvals with three subagents: Approval Management, Search Approval Record and Summarize Multiple Approval Work Items. Since the week of 14 September 2026 the [Approval Agent](https://help.salesforce.com/s/articleView?id=release-notes.rn_rev_agentforce_approvals_agent.htm&type=5) lets reps submit, recall and track approvals, and lets reviewers get AI summaries and comments and approve or reject faster. It needs Advanced Approvals and Agentforce enabled; Agentforce for Revenue Management is part of Revenue Cloud Advanced, not Growth. That is a sensible split. The workflow controls the threshold and the approver, and the approver makes the decision. I discuss the same idea for agents in general in [Agent Script: why business rules don't belong in the LLM](/en/blog/agent-script-deterministic-rules/).

## Approvals from CPQ are rebuilt

In Salesforce CPQ, approvals come from a separate managed package, Advanced Approvals, with approval rules, conditions, approvers and approval chains. The [Trailhead module for CPQ admins](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/discover-advanced-approvals) shows the model: a rule has at least one condition, such as a partner discount above 20 percent, and an approver or approver group.

The names sound alike, but do not assume anything will carry over. [Salesforce Help on the migration](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) states that the data models of CPQ and Revenue Cloud "differ significantly" and that reports and dashboards on CPQ objects must be recreated; it recommends treating the move as a redesign. For approvals that means:

- Every approval rule and chain is rebuilt as a workflow.
- Conditions on CPQ quote fields point to different fields on the standard quote.
- Approval history stays in the CPQ objects as long as the package and its data remain; decide whether you archive, migrate or report on it.
- Each rule gets a test case with the expected approver, before and after go-live.

I would use the migration to clean up. CPQ orgs tend to collect approval rules that nobody can explain. Rebuild only what the head of sales and finance confirm. The full migration path is in the chapter [from CPQ to Revenue Cloud](/en/masterclass/revenue-cloud/from-cpq-to-revenue-cloud/).

## Write the approval matrix on one page

Write the approval matrix on one page before anyone builds a workflow: triggers, thresholds, owners and the source of the cost data. Then build the workflows with parallel approvers and delegation, and test each rule with one quote that should trigger it and one that should not. How approvals fit into the path from quote to order is covered in the chapter [quote, contract, order](/en/masterclass/revenue-cloud/quote-contract-order/), and I help with this as part of [Salesforce architecture](/en/services/salesforce-architecture/).
