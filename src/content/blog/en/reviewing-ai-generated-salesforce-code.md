---
title: "Reviewing AI-generated Salesforce code as the client"
description: "How to check AI-generated Salesforce code from partners: six typical defects, what the pipeline must catch and what a human reviewer on the client side checks."
pubDate: 2026-10-27
lang: en
slug: reviewing-ai-generated-salesforce-code
translationKey: reviewing-ai-generated-salesforce-code
topic: code-review
categories: [devops, ai]
tags: [code review, ai coding, apex, partner governance, devops, manufacturing]
takeaways:
  - "The pipeline catches SOQL in loops and missing sharing declarations. Human review time belongs to tests, field choice, data access and business rules."
  - "Veracode measured a 56 percent security pass rate for raw models in 2026, with Java at 30 percent. There is no data for Apex."
  - "A test that only asserts a non-null result adds coverage and proves nothing. Salesforce itself advises against focusing on the percentage."
  - "Since API version 67.0, Apex runs in user mode by default. If an agent bumps the version, the bump needs its own test."
  - "AI reviewers give the partner hints. Approval for data model, sharing and portal access stays with a person on the client side."
faq:
  - q: "Do I have to read every line of AI-generated Salesforce code?"
    a: "No. With Code Analyzer, Apex tests and a validation deploy as merge gates, the human reviewer focuses on tests, data access, field choice, scope and business rules. Changes to sharing, the data model and integrations should always get a human approval on the client side."
  - q: "Can an AI tool approve pull requests in our repository?"
    a: "GitHub can let Copilot approvals count toward required approvals, but the feature is in public preview and off by default. For an org with customer and dealer data I would keep it off and use AI reviews as hints for the partner."
  - q: "Which tool finds SOQL queries inside loops?"
    a: "Salesforce Code Analyzer runs PMD, whose rule OperationWithLimitsInLoop flags SOQL, DML and other limited operations inside loops. ApexGuru adds performance checks, for example for schema describe calls."
  - q: "Should partners disclose which code an AI agent generated?"
    a: "Yes. Ask for the AI-generated parts to be marked in the pull request, together with the test run and the Code Analyzer result. Put that rule into the contract so it applies to every partner in the programme."
draft: false
---

As the client, you review AI-generated Salesforce code by splitting the work. Your partner's pipeline catches what machines find reliably: SOQL and DML in loops, missing sharing declarations, missing CRUD and field-level security checks. Your human reviewer spends the time on what tools miss: tests that prove nothing, fields that exist but are the wrong ones, business rules that only look right and data access that is too wide. Ask for evidence instead of "all tests pass", and keep the final approval with a person on your side.

## Why does AI-generated Salesforce code need a different review?

The code compiles and looks tidy. That is the trap. Veracode tested current models for its [2026 GenAI Code Security Report](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) and found an average security pass rate of 56 percent. Java came last with 30 percent. The tests ran against raw models, without agent tooling, guardrails or human review. There is no Apex-specific study, but Apex is close enough to Java that I treat this as a warning.

Volume is the second difference: with coding agents, the partner opens more pull requests, while your review capacity stays the same. The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), based on nearly 5,000 technology professionals, found that AI adoption improves delivery throughput but still has a negative relationship with delivery stability. More changes reach your org faster, and the review decides whether they also break things faster.

Salesforce says it plainly in the documentation for its own coding agent, Agentforce Vibes: "Permission modes protect your filesystem. Code review protects your application." ([Trust and Verification](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html)). The basics are in [why pull request reviews are a must](../why-pull-request-reviews-are-a-must-in-enterprise-projects/); here I focus on what changes when an agent wrote the code.

## Six typical defects in AI-generated Salesforce code

Salesforce lists most of these in its own checklists for agent output. Some are a job for the pipeline, the rest need a person who knows your org.

1. **SOQL and DML inside loops.** The code works with one record and fails during a data load or a bulk update from the ERP. Salesforce's checklist asks whether queries in triggers "could hit the 100 SOQL limit in bulk operations". The PMD rule `OperationWithLimitsInLoop` flags queries, DML and other limited operations inside loops ([PMD performance rules](https://docs.pmd-code.org/latest/pmd_rules_apex_performance.html)). Pipeline.
2. **Missing sharing and field-level security.** PMD flags classes with DML but no sharing declaration and data access without a permission check. Since API version 67.0, Apex runs in user mode by default. In my judgement, models trained mostly on older Apex will keep producing old patterns, and an agent may raise a class's API version on the side. Why that can make queries return fewer records is the topic of [API 67.0 and user mode](../api-67-apex-user-mode-fewer-records/). Pipeline for the declaration, person for the intent.
3. **Tests that prove nothing.** Salesforce requires 75 percent coverage for a deployment and says in the same guide "don't focus on the percentage" ([Apex testing best practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)). An agent told to reach 75 percent reaches it. Salesforce's checklist for agent output names `System.assertNotEquals(null, result)` as an example of an assertion that is not meaningful. Person.
4. **Invented or wrong fields.** Salesforce asks reviewers whether the code references "real fields and objects from your org (not placeholder names)" ([Workflow Patterns](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-workflow-patterns.html)). A field that does not exist usually fails the validation deploy. The expensive case is a field that exists but is the wrong one, for example an old warranty date from a data migration next to the one your SAP interface maintains. Only someone who knows your data model sees that. Person.
5. **Incomplete metadata.** New fields that are missing from the permission sets, or references to objects that are not part of the deployment. The validation deploy finds missing references; missing permissions show up when service reps report empty fields. Pipeline plus checklist.
6. **Business logic that looks right.** Warranty eligibility, discount limits, delivery date rules for spare parts. The agent builds what the user story says, and user stories in manufacturing rarely list every exception. Person, ideally the domain lead.

```vertiefung For developers
title: Which PMD rules cover sharing, and what does API version 67.0 change?
`ApexSharingViolations` flags classes with DML but no sharing declaration, `ApexCRUDViolation` flags data access without a permission check; a query `WITH USER_MODE` passes that rule ([PMD security rules](https://docs.pmd-code.org/latest/pmd_rules_apex_security.html)).

Since API version 67.0, classes without a declaration run in the current user's sharing context and `WITH SECURITY_ENFORCED` no longer compiles ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)).
```

## What should the pipeline check automatically?

Everything a rule can decide belongs in the pipeline, so your reviewer never has to comment on it. For Salesforce that means at least:

- **Salesforce Code Analyzer** on every pull request. Version 5 bundles eight engines, among them PMD for Apex, the Salesforce Graph Engine for deeper Apex security analysis, a Flow Scanner and ApexGuru ([Code Analyzer engines](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html)).
- **Apex tests and a validation deploy** against an integration sandbox, so missing fields and dependencies fail before anyone reviews.
- **A merge block** until the pipeline is green.

The order of gates and open source options are in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/). One point belongs here: AI reviewers. GitHub Copilot and Claude Code can review pull requests, and a fresh reviewer does find things. Anthropic warns in its [Claude Code best practices](https://code.claude.com/docs/en/best-practices) that "a reviewer that's asked to find problems will always find *something*", and that fixing every finding leads to extra abstraction layers. GitHub can let Copilot approvals satisfy the required approval rule, but that is in public preview and off by default ([GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/code-review)). I would keep it off. An AI review is a useful hint for the partner; the approval for your org stays with a person.

## What does the human reviewer on the client side check?

You do not need to read every line. Once the pipeline is green, I would go through a pull request with AI-generated code in this order:

1. **Tests first.** Do the assertions check business behaviour, including a negative case and a bulk case with at least 20 records, as Salesforce recommends? A test class that creates one record and checks for "not null" sends the pull request back.
2. **Data access.** Every `without sharing` and every `WITH SYSTEM_MODE` needs a written reason. In a dealer portal this is the line that decides whether one dealer sees another dealer's data.
3. **Fields and objects.** Are these the fields the business actually maintains? Are new fields in the right permission sets?
4. **Scope.** Does the diff touch only what the story needs? An agent that "also tidied up" three other classes or raised their API version adds risk nobody asked for.
5. **Business rule.** Does the logic match the acceptance criteria, including the exceptions? For anything around warranty, prices or credit limits I would pull in the domain lead.

Ask the partner for evidence: as Anthropic's guidance puts it, "All tests pass" on its own tells you very little. I want the test run and the Code Analyzer result in the pull request, plus a note which parts an agent generated. That belongs in the contract, as described in [rules for partners who code with AI](../partners-using-ai-coding-contract-rules/), and it is part of my [partner governance](../../services/partner-governance/) work.

## Worked example: a dealer portal story

Assume a machine builder with a dealer portal on Experience Cloud, Service Cloud and SAP as ERP. A partner implements the story "dealers see the open warranty claims for their machines". All numbers are assumptions. The pull request contains an Apex controller, a test class, a Lightning web component and two new fields, about 400 changed lines, most of them generated by an agent.

The pipeline catches two things within minutes: a query for claims inside a loop over the dealer's assets, and a helper class without a sharing declaration. The partner fixes both before a person looks at the pull request.

The human review takes about 45 minutes and finds three issues no tool reports:

- The test class creates one asset and one claim and asserts that the result is not null. Coverage is 92 percent. The test would also pass if the controller returned every claim in the org.
- The query filters on a warranty end date field from an old migration that nobody maintains. The field the SAP interface updates has a similar name.
- The controller runs `without sharing` with the comment "needed for portal users". With that, a dealer could see claims from machines sold by other dealers.

The third finding is the expensive one: a data leak between competing dealers that no coverage figure would have shown. Against that, 45 minutes of review is cheap.

## Keep approval for sharing and data model on the client side

```schritte
Protect the main branches
  Require approval from a person on your side for changes to the data model, sharing, integrations and portal access.
Gates before every merge
  Put Code Analyzer, Apex tests and a validation deploy in front of every merge, in a pipeline you own. This is the core of my [DevOps and release management](../../services/devops-release-management/) work.
Write a review checklist
  Write a one-page checklist with the six defects above and give it to every partner.
Require evidence
  Require test output, the Code Analyzer result and the AI-generated parts marked in the pull request.
Keep pull requests small
  One story per pull request; a 400-line agent diff is reviewable, a 4,000-line one gets waved through.
Count findings
  Count review findings by category. After a few sprints you know which rules belong in the [AI rules file of your repository](../ai-rules-file-salesforce-repository/) and which gate is missing.
```
