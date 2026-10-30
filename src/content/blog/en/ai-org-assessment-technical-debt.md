---
title: "AI org assessment: technical debt before a partner change"
description: "Can an LLM assess a grown Salesforce org before a relaunch or partner change? What a batch run costs and which findings must come from deterministic tools."
pubDate: 2026-10-27
lang: en
slug: ai-org-assessment-technical-debt
translationKey: ai-org-assessment-technical-debt
topic: code-review
categories: [devops, architecture]
contactBrief: partner-governance
tags: [org assessment, technical debt, claude batch api, code analyzer, sfdx-hardis, partner change]
takeaways:
  - "An LLM is good at the reading part of an org assessment: what each class, flow and permission set does, which business process it serves and where two partners built the same logic twice."
  - "Counts, usage, API versions, rule violations and test coverage must come from deterministic tools such as Code Analyzer, sfdx-hardis monitoring and an Apex test run, never from the model."
  - "In the scenario, a batch run over 2,250 components costs about $59 on Sonnet 5.5 and $119 on Opus 5.5 at US list prices, because the Claude Batch API halves input and output prices."
  - "The real cost is architect time for preparing the questions and checking samples; in the scenario that is about ten days, against an assumed 47 days for reading everything by hand."
  - "The client should run the assessment with its own tools and account, because the outgoing partner defends its code and the incoming partner wants to sell a rebuild."
faq:
  - q: "Can ChatGPT or Claude assess a Salesforce org?"
    a: "They can read and explain retrieved metadata and code: purpose, business process, duplicated logic and risk in plain language. They cannot tell you what is unused, how many components exist or which rules are violated with certainty. Those findings need deterministic tools."
  - q: "What does an AI org assessment cost in tokens?"
    a: "In the scenario with 1,400 Apex classes and triggers, 600 flows and 250 permission sets, the first pass costs about $59 on Claude Sonnet 5.5 and $119 on Opus 5.5 through the Batch API at US list prices. A second pass per object adds about $10."
  - q: "Is the Claude Batch API suitable for confidential source code?"
    a: "Anthropic lists batch processing as not eligible for zero data retention, with results stored for 29 days. Retained data is not used for training without your permission. Strip hard-coded personal data first and check the setup with your data protection officer."
  - q: "Which tools find technical debt in Salesforce without AI?"
    a: "Salesforce Code Analyzer bundles eight engines, including PMD for Apex, CPD for duplicated code and a Flow Scanner. sfdx-hardis monitoring detects unused Apex classes, deprecated API versions, inactive users and underused permission sets. An Apex test run gives coverage."
  - q: "Who should commission the org assessment before a partner change?"
    a: "The client. Run it with your own API account and in your own repository, so the results stay with you and neither the outgoing nor the incoming partner shapes the findings."
draft: false
---

An AI org assessment is worth doing before a relaunch or partner change, as long as the model reads and the tools count. An LLM explains what each Apex class, flow and permission set does, which business process it serves and where partners built the same logic twice. In the scenario below, a batch run over 2,250 components costs about $59 to $119. Usage, rule violations and test coverage must come from deterministic tools: Code Analyzer, sfdx-hardis monitoring and an Apex test run. I run those first and give their results to the model.

## Why look at a grown org before a partner change?

A Salesforce org that has grown for ten years under several partners carries their handwriting. At a machine builder, one partner may have built the dealer portal, another the field service processes, a third the SAP integration for orders and spare parts. Each brought its own trigger framework, naming and test style. Before a new partner takes over or a relaunch starts, someone has to answer three questions: what is in the org, what of it is used, and what of it is risky to keep.

The two obvious candidates for that answer are poor ones. The outgoing partner defends its code. The incoming partner has an interest in finding a lot to rebuild. An assessment run by the client, with the client's tools, is the neutral baseline, and it later feeds the [object ownership matrix](../salesforce-object-ownership-matrix/) for the new set-up.

## What can an AI org assessment do that scanners cannot?

A scanner checks rules. It finds a query inside a loop or a class without a sharing keyword. It cannot tell you that two classes from two partners both calculate warranty end dates, with different rules for dealers in different countries. That is a question of meaning, and here an LLM is useful. Per component, I would ask the model for:

- **Purpose in two sentences**, in business terms a head of service understands.
- **Business capability**, for example warranty, spare parts, service contracts, dealer orders or quoting.
- **Objects touched**, so components can later be grouped by object.
- **Duplicated meaning**, logic that does the same as another component even when the code looks different.
- **Test quality**, whether a test class checks business results or only raises coverage.
- **A recommendation**: keep, refactor or replace with standard functionality.

Every finding must point to a method name or line number. I would drop every AI finding that cannot show where it comes from, because a model describes wrong things as confidently as right ones.

## Which findings must come from deterministic tools?

Anything that is a count, a usage figure or a rule violation. A model reading one class at a time cannot know whether that class is called anywhere, or prove that something is absent. These tools can:

- **[Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html)** bundles eight engines, among them PMD for Apex, CPD, which "identifies blocks of duplication across files", a Flow Scanner for security issues in flows and the Salesforce Graph Engine for deeper Apex analysis.
- **ApexGuru** is "available only in Production and Full Copy Sandbox orgs" and rates severity with runtime data, according to the [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server). For an assessment against production that is exactly what you want: performance findings ranked by real CPU use.
- **sfdx-hardis monitoring** runs, according to its [monitoring overview](https://sfdx-hardis.cloudity.com/salesforce-monitoring-home/), checks such as "Detect unused Apex classes in an org", "Detect Apex classes and triggers with deprecated API version", "Detect underused permission sets", "Detect inactive metadata", active users without logins in six months and the Salesforce Security Health Check.
- **An Apex test run** gives the real coverage per class, which no model should estimate.
- **Dependencies** come from the Tooling API object [MetadataComponentDependency](https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_metadatacomponentdependency.htm), which Salesforce still labels Beta. Who built what comes from Git history or the LastModifiedBy fields, not from the model's guess about coding style.

My rule: if a sentence in the report contains a number or the word "unused", a tool produced it. I wrote more about these tools as pipeline gates in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/); for an assessment you run them once against the whole org.

## A typical scenario: three partners, one org, one relaunch

Assume a machine builder with Sales Cloud, Service Cloud, Field Service, a dealer portal and SAP. Over twelve years three partners have worked on the org, and a fourth is about to take over. The org holds 1,400 Apex classes and triggers, 600 flows and 250 permission sets. All volumes and token sizes below are assumptions.

The order of work:

```schritte
Retrieve metadata
  Retrieve all metadata into a repository the client owns.
Run the tools
  Run Code Analyzer, sfdx-hardis monitoring and a full Apex test run.
Clean the data
  Remove hard-coded personal data from test classes with a pattern search.
Let the model read
  Send each component to the model, together with the assessment questions and the tool findings for that component.
Condense per object
  Group the answers by object and run a second pass per object, because a trigger, two flows and a validation rule on Work Order only make sense together.
```

### What the batch run costs

The [Claude Batch API](https://platform.claude.com/docs/en/build-with-claude/batch-processing) processes requests asynchronously, most batches within an hour, and charges 50 percent of standard prices. According to the [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), that means $1 input and $5 output per million tokens for Sonnet 5.5, and $2 and $10 for Opus 5.5. A batch holds up to 100,000 requests or 256 MB, whichever comes first. The scenario's input is roughly 150 MB of text (my estimate), so I would split it into two batches to stay clear of the limit.

- Code and metadata: 1,400 classes at 6,000 tokens, 600 flows at 10,000 tokens of flow XML, 250 permission sets at 4,000 tokens = 15.4 million tokens.
- Questions and tool findings: 12,000 tokens per request × 2,250 requests = 27 million tokens.
- Output: 1,500 tokens per component = 3.4 million tokens.

```kennzahlen
$59 | Sonnet 5.5, first pass: 42.4 million × $1 + 3.4 million × $5, rounded
$119 | Opus 5.5, first pass: 42.4 million × $2 + 3.4 million × $10, rounded
$10 | Second pass for 40 objects at 100,000 tokens in and 5,000 out on Opus 5.5
source: Claude pricing page (batch prices, US list prices), token volumes as assumptions in the scenario
```

Prompt caching stacks with the batch discount, but in batches cache hits are best effort; Anthropic names hit rates from 30 to 98 percent. I calculate without caching and treat any saving as a bonus. Thinking tokens are [billed as output](https://code.claude.com/docs/en/costs) and cannot be turned off on the 5.5 models; if they triple the output, the Opus pass rises to about $187. The basics of this token math are in the [masterclass chapter on costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).

### Where the real cost sits

The token bill is small; the work sits with people. In the scenario I would plan about ten architect days: three or four to set up the tools and write the questions, the rest to check a sample of 10 percent of the findings and every finding marked high risk. Reading 2,250 components by hand at an assumed ten minutes each would take about 375 hours, or 47 days. The LLM does the first read, and people decide.

## What about source code and data protection?

The org's source code belongs to the client, and test classes often contain names, email addresses or record IDs. Anthropic's [data retention page](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) lists batch processing as not eligible for zero data retention, because results are stored for 29 days. The same page says retained data is "never used for model training without your express permission". Strip personal data before the run and agree the set-up with your data protection officer; the German angle is in [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

If the zero-retention rule is strict, there are two alternatives. You pay full price without the batch, about $119 to $238 in the scenario, after checking which endpoints your contract covers. Or you use the AI documentation in sfdx-hardis, which according to its [AI setup page](https://sfdx-hardis.cloudity.com/salesforce-ai-setup/) works with Agentforce, OpenAI or, through LangChain.js, Anthropic, Google GenAI and Ollama for locally run models. The same page warns that the first documentation run "can make hundreds of API calls" and recommends committing the AI cache, and it caps calls per command at 10,000 by default.

## Who should own the assessment?

The client. Run the scans in your pipeline and the model calls in your own API account, and keep the results in your repository, as I argue for DevOps tools in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/). If a partner does the work, its contract should name the tools and data rules, see [partners coding with AI: what belongs in the contract](../partners-using-ai-coding-contract-rules/).

The assessment is the starting point for the handover: which objects move to which partner, which components get deleted and which are rebuilt. Steering that is part of [partner governance](../../services/partner-governance/).

## Where should you start?

1. Retrieve the full metadata into a repository you own.
2. Turn on sfdx-hardis monitoring for two weeks to collect usage data.
3. Run Code Analyzer and a full Apex test run against production metadata.
4. Write ten assessment questions and test them on 50 components, twice; if the two runs disagree on many risk ratings, sharpen the questions.
5. Run the batch, then the second pass per object.
6. Check samples and every high-risk finding before anything goes into the handover plan.

An AI org assessment costs less in tokens than one workshop day, as long as the tools deliver the facts and the model only explains them.
