---
title: "Discount approvals in Revenue Cloud: Advanced Approvals"
description: "How to set up discount and margin approvals with Advanced Approvals in Revenue Cloud so that sales stays fast, finance keeps control and audits hold up."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-discount-approvals
translationKey: revenue-cloud-discount-approvals
topic: revenue
categories: [revenue-cloud]
tags: [revenue cloud, advanced approvals, discounts, margin, quote, cpq migration]
takeaways:
  - "Discount approvals in Revenue Cloud run on Advanced Approvals: approval workflows with stages and steps, serial and parallel approvers and an audit trail, started from the quote."
  - "A preview through the Advanced Approvals Business APIs shows the approval levels before a rep submits, so nobody has to guess who will be asked."
  - "Margin approvals only work when cost data from the ERP is on every quote line; without it, approve on discount and deal size only."
  - "Approval rules stay deterministic: an agent may submit, summarise or search approvals, but the threshold and the approver come from the workflow."
  - "The Advanced Approvals package of Salesforce CPQ does not carry over to Revenue Cloud; rules, chains and approvers are rebuilt and tested as part of the migration."
faq:
  - q: "What is Advanced Approvals in Revenue Cloud?"
    a: "Advanced Approvals is the approval feature of Revenue Cloud, called Revenue Management in the developer guide. It provides invocable actions for parallel or sequential approval chains with detailed audit trails, and Business APIs that preview approval levels before a record is submitted."
  - q: "Can sales see who has to approve a discount before submitting?"
    a: "Yes. Salesforce documents a preview of approval workflows, and the Business APIs return the approval levels and related details before submission. I would show that preview on the quote so the rep knows the approvers and the expected wait."
  - q: "Can I migrate CPQ approval rules to Revenue Cloud?"
    a: "Not as a copy. CPQ approvals come from the separate Advanced Approvals package, and Salesforce Help states that the data models of CPQ and Revenue Cloud differ significantly. Treat approval rules, chains and approvers as a rebuild item with their own test cases."
  - q: "Should an AI agent approve discounts?"
    a: "No. The threshold and the approver should come from the approval workflow. Salesforce Help lists Agentforce subagents for managing, searching and summarising approvals, which help approvers work faster without moving the decision into the model."
draft: false
---

In Revenue Cloud, discount and margin approvals run on Advanced Approvals: approval workflows with stages, serial and parallel approvers and an audit trail, which a rep starts from the quote. Keep the approval matrix short, with discount, margin and deal size as the triggers, and let the preview show the approvers before submission. Margin approvals need cost data from the ERP on every quote line. The thresholds belong in rules, never in an agent's judgement. If you come from Salesforce CPQ, plan approvals as a rebuild, because the Advanced Approvals package does not carry over.

## What is Advanced Approvals in Revenue Cloud?

Revenue Cloud is Salesforce's quote-to-cash suite on standard objects; Help and the developer guide currently call it Revenue Management. Its approval feature is Advanced Approvals. According to the [developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm), it provides invocable actions for "intricate parallel or sequential approval chains" with "detailed audit trails". Business APIs let you preview approval levels before a record is submitted. It is available in Enterprise, Unlimited and Developer Edition orgs where Advanced Approvals is enabled.

```vertiefung For admins
title: What is Advanced Approvals built on?
Technically it sits on the Flow approval model. According to the [Flow Approval Process data model](https://developer.salesforce.com/docs/platform/data-models/guide/platform-flow-approval-process.html), stages, steps and decisions are built in Flow Builder, and each run creates approval submissions and approval work items. [Advanced Approvals](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) adds actions for parallel and sequential approval chains. For you that means two things. An admin who knows Flow can read and change the approval logic. And every approval leaves records that reporting and audits can use.
```

## How does an approval run on a quote?

The [Help article on approvals in a quote](https://help.salesforce.com/s/articleView?language=en_US&id=ind.approvals_use_advanced_approvals_in_a_quote.htm&type=5) describes the flow from the rep's side. The rep saves the quote after all pricing changes and clicks Submit for Approval. The workflow starts, and the approvers see their work items when they log in. Salesforce's example routes by discount: from 25 percent a sales manager approves, above 50 percent a sales VP as well.

Around this core, the same Help section documents several features that decide how fast approvals feel in daily work:

- **Preview.** The rep sees which approval steps will apply before submitting.
- **Serial and parallel approvers.** Finance and sales management can review at the same time instead of one after the other.
- **Smart Approvals and rule-based auto-approvals.** Submissions that meet defined conditions are approved automatically.
- **Delegation.** Approvers hand their work items to a deputy during holidays.
- **Notifications in Slack and by email**, for approvers who do not live in Salesforce.

My recommendation: use the preview from day one. Most frustration with approvals comes from reps who submit and then wait without knowing for whom.

## Which approval matrix fits a manufacturer?

An approval matrix is the table that says which deviation needs which approver. Keep it to a handful of triggers that sales can remember. A typical scenario, as an assumption: a component maker sells standard parts and configured assemblies through 25 internal sales reps. A matrix for it could look like this.

| Trigger | Threshold | Approver |
|---|---|---|
| Discount on list price | above 15 percent | Sales manager |
| Discount on list price | above 30 percent | Head of sales |
| Margin per quote | below 25 percent | Sales controlling |
| Deal size | above €500,000 | Managing director |
| Payment terms | longer than standard | Finance |

Three rules keep such a matrix workable. Each trigger has exactly one owner who can change the threshold. Thresholds are written down outside Salesforce as well, so sales and finance argue about the policy and not about a Flow. And every new trigger replaces an old one, or the matrix grows until every quote needs three signatures.

The discount itself comes from pricing. How Revenue Cloud calculates list price, volume discount and manual discount in sequence is covered in [Salesforce Pricing: how Revenue Cloud calculates prices](../revenue-cloud-pricing-procedures-explained/). The approval should check the result of that calculation, not recalculate it.

## Where does the margin for an approval come from?

A margin approval needs a cost per quote line. In manufacturing that cost lives in the ERP: standard cost or a calculated cost per material in SAP controlling. Salesforce does not know it unless you bring it over.

I see three ways, and I would pick the simplest that finance accepts:

1. **Standard cost synced per product.** Good enough for standard parts. Finance decides how often it is refreshed.
2. **Cost calculated by the ERP on request.** Needed for configured assemblies where the cost depends on the options. That means an API call when the quote is priced.
3. **No margin approval.** Approve on discount and deal size only, and let controlling review margins after the order. Honest, and better than a margin field nobody trusts.

Whichever route you take, decide who owns the cost field. If sales can edit it, the margin approval is decoration. My [object ownership matrix](../salesforce-object-ownership-matrix/) is the tool I use to write that down.

## Why do approval rules stay deterministic, even with an agent in front?

Because an approval has a right answer. A discount is above 30 percent or it is not, and the head of sales is the approver or not. If an agent interprets that rule, the same quote can take a different path on Monday than on Tuesday, and an auditor will ask why.

Salesforce Help lists an Agentforce area for Advanced Approvals with three subagents: Approval Management, Search Approval Record and Summarize Multiple Approval Work Items. That is a sensible split. The agent helps approvers find and understand their work items and helps reps track their submissions. The workflow keeps the threshold and the approver. The same idea for agents in general is in [Agent Script: why business rules don't belong in the LLM](../agent-script-deterministic-rules/).

```hinweis offen
Third-party Winter '27 summaries also mention an approval agent for reps. I could not open the Revenue Cloud release notes to confirm it, so check them before you plan with it.
```

## What changes when you migrate approvals from CPQ?

In Salesforce CPQ, approvals come from a separate managed package, Advanced Approvals, with approval rules, conditions, approvers and approval chains. The [Trailhead module for CPQ admins](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/discover-advanced-approvals) shows the model: a rule has at least one condition, such as a partner discount above 20 percent, and an approver or approver group.

The names sound alike, but nothing carries over. [Salesforce Help on the migration](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) states that the data models of CPQ and Revenue Cloud "differ significantly" and that reports and dashboards on CPQ objects must be recreated. For approvals that means:

- Every approval rule and chain is rebuilt as a workflow.
- Conditions on CPQ quote fields point to different fields on the standard quote.
- Approval history stays in the CPQ objects; decide whether you archive or report on it.
- Each rule gets a test case with the expected approver, before and after go-live.

I would use the migration to clean up. CPQ orgs tend to collect approval rules that nobody can explain. Rebuild only what the head of sales and finance confirm. The full migration path is in the chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/).

## Where should you start?

Write the approval matrix on one page before anyone builds a workflow: triggers, thresholds, owners and the source of the cost data. Then build the workflows with preview, parallel approvers and delegation, and test each rule with a quote that should and one that should not trigger it. How approvals fit into the path from quote to order is in the chapter [quote, contract, order](../../masterclass/revenue-cloud/quote-contract-order/), and I help with this as part of [Salesforce architecture](../../services/salesforce-architecture/).

A short approval matrix with clear owners keeps sales fast and gives finance control. If you want a second opinion on yours, [send me a message](#contact).
