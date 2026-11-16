---
title: "AI org assessment: technical debt before a partner change"
description: "Can an LLM assess a grown Salesforce org before a relaunch or partner change? What a batch run costs and which findings must come from deterministic tools."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: ai-org-assessment-technical-debt
translationKey: ai-org-assessment-technical-debt
topic: code-review
categories: [devops, architecture]
contactBrief: partner-governance
tags: [org assessment, technical debt, claude batch api, code analyzer, sfdx-hardis, partner change]
takeaways:
  - "An LLM is good at reading what each class, flow and permission set does and where two partners built the same logic twice."
  - "Counts, usage, API versions, rule violations and test coverage are produced by deterministic tools such as Code Analyzer, never from the model."
  - "In the worked example, a batch run over 2,250 components costs about $59 on Sonnet 5.5 and $119 on Opus 5.5 at global batch list prices."
  - "The expensive part is architect time: about ten days in the worked example, against an assumed 47 days for reading everything by hand."
  - "The client runs the assessment itself, because the outgoing partner defends its code and the incoming one wants to sell a rebuild."
faq:
  - q: "Can ChatGPT or Claude assess a Salesforce org?"
    a: "They can read and explain retrieved metadata and code: purpose, business process, duplicated logic and risk in plain language. They cannot determine with certainty what is unused, how many components exist or which rules are violated. Those findings need deterministic tools."
  - q: "What does an AI org assessment cost in tokens?"
    a: "In the worked example with 1,400 Apex classes and triggers, 600 flows and 250 permission sets, the first pass costs about $59 on Claude Sonnet 5.5 and $119 on Opus 5.5 through the Batch API at global list prices as of November 9, 2026. A second pass per object adds about $10."
  - q: "Is the Claude Batch API suitable for confidential source code?"
    a: "Anthropic lists batch processing as not eligible for zero data retention, with 29-day retention. That covers what you send, including source code and tool findings, not only the results. Retained data is not used for training without your permission. Strip hard-coded personal data first and check the setup with your data protection officer."
  - q: "Which tools find technical debt in Salesforce without AI?"
    a: "Salesforce Code Analyzer bundles eight engines, including PMD for Apex, CPD for duplicated code and a Flow Scanner. sfdx-hardis monitoring flags async Apex classes that have not run for a year, classes on old API versions, inactive users and permission sets assigned to few users. These are indicators, not proof that something can be deleted. An Apex test run gives line coverage."
  - q: "Who should commission the org assessment before a partner change?"
    a: "The client. Run it with your own API account and in your own repository, so the results stay with you and neither the outgoing nor the incoming partner shapes the findings."
draft: false
---

An AI org assessment is worth doing before a relaunch or partner change, as long as the model reads and the tools count. An LLM explains what each Apex class, flow and permission set does, which business process it serves and where partners built the same logic twice. In the worked example below, a batch run over 2,250 components costs about $59 to $119. Usage, rule violations and test coverage must be produced by deterministic tools: Code Analyzer, sfdx-hardis monitoring and an Apex test run. I run those first and give their results to the model.

## A grown org carries the handwriting of every partner

A Salesforce org that has grown for ten years under several partners carries their handwriting. At a machine builder, one partner may have built the dealer portal, another the field service processes, a third the SAP integration for orders and spare parts. Each brought its own trigger framework, naming conventions and test style. Before a new partner takes over or a relaunch starts, someone has to answer three questions: what is in the org, what of it is in use, and what would be risky to keep.

The two obvious candidates for that answer are poor ones. The outgoing partner defends its code. The incoming partner has an interest in finding a lot to rebuild. An assessment run by the client, with the client's tools, is the neutral baseline, and it later feeds the [object ownership matrix](/en/blog/salesforce-object-ownership-matrix/) for the new set-up.

## What can an AI org assessment do that scanners cannot?

A scanner checks rules. It finds a query inside a loop or a class without a sharing keyword. It cannot tell you that two classes from two partners both calculate warranty end dates, with different rules for dealers in different countries. That is a question of meaning, which is where an LLM is useful. Per component, I would ask the model for:

- **Purpose in two sentences**, in business terms that a head of service understands.
- **Business capability**, for example warranty, spare parts, service contracts, dealer orders or quoting.
- **Objects touched**, taken from parsers and metadata where possible, so components can later be grouped by object. The model only adds relations it infers, marked as such.
- **Duplicated meaning**, logic that performs the same function as another component even when the code looks different. A model that analyzes only one component cannot confirm this; it names candidates, and a later pass compares them side by side.
- **Test quality**, whether a test class checks business results or only increases coverage. For this, the test class is included in the request together with the class it tests.
- **A recommendation**: keep, refactor or replace with standard functionality.

Every finding must point to a method name or line number. I would drop every AI finding that cannot point to its source, because a model describes wrong things as confidently as right ones.

## Which findings must come from deterministic tools?

Anything that is a count, a usage figure or a rule violation. A model reading one class at a time cannot know whether that class is called anywhere, or prove that something is absent. These tools can:

- **[Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html)** bundles eight engines, among them PMD for Apex, CPD, which "identifies blocks of duplication across files", a Flow Scanner for security issues in flows and the Salesforce Graph Engine for deeper Apex analysis.
- **ApexGuru** is "available only in Production and Full Copy Sandbox orgs" and rates severity with runtime data, according to the [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server). It has to be enabled in Setup, and whether it is included depends on edition and contract. For an assessment against production that is what you want: performance findings ranked by real CPU use. Plan it as its own step: according to the [ApexGuru engine page](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-apexguru.html) it scans only Apex classes and triggers, with at most 100 scans per requesting org and 200 per production org family in 24 hours.
- According to its [monitoring overview](https://sfdx-hardis.cloudity.com/salesforce-monitoring-home/), **sfdx-hardis monitoring** runs checks such as "Detect unused Apex classes in an org", "Detect Apex classes and triggers with deprecated API version", "Detect underused permission sets", "Detect inactive metadata", active users without logins in six months and the Salesforce Security Health Check. Read the names carefully: "unused" Apex means async classes (batch, queueable, schedulable) that have not run for 365 days, "deprecated" means at or below a configurable API version (default 50), "underused" means assigned to five users or fewer, and "inactive" means technically deactivated or in draft.
- **A freshly executed Apex test run** at a defined test level gives reproducible line coverage per class, which no model should estimate. Coverage still says nothing about the quality of the assertions.
- **Dependencies** are retrieved from the Tooling API object [MetadataComponentDependency](https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_metadatacomponentdependency.htm), which Salesforce still labels Beta. A query returns at most 2,000 records, so it is one dependency source among several, next to static references in code and flow metadata. Who built what is shown by Git history or the LastModifiedBy fields, not from the model's guess about coding style.

My rule: if a sentence in the report contains a number or the word "unused", a tool produced it. Even then, the finding is an indicator, not proof that something can be deleted. I wrote more about these tools as pipeline gates in [quality gates for AI code](/en/blog/quality-gates-for-ai-code-salesforce-pipeline/); for an assessment you run them once against the whole org.

## Worked example: three partners, one org, one relaunch

Assume a machine builder with Sales Cloud, Service Cloud, Field Service, a dealer portal and SAP. Over twelve years three partners have worked on the org, and a fourth is about to take over. The org holds 1,400 Apex classes and triggers, 600 flows and 250 permission sets. All volumes and token sizes below are assumptions. The scope is code, flows and permissions; the data model, sharing, integrations and installed packages need their own review.

The order of work:

```schritte
Retrieve metadata
  Retrieve all supported metadata types in scope into a repository the client owns, and document what could not be retrieved.
Run the tools
  Run Code Analyzer, sfdx-hardis monitoring and a full Apex test run.
Clean the data
  Remove hard-coded personal data from test classes with a pattern search.
Let the model read
  Send each component to the model, together with the assessment questions and the tool findings for that component.
Condense per object
  Group the answers by object and run a second pass per object, because a trigger, two flows and a validation rule on Work Order only make sense together. Then compare duplicate candidates per business capability across objects.
```

### What the batch run costs

The [Claude Batch API](https://platform.claude.com/docs/en/build-with-claude/batch-processing) processes requests asynchronously, completes most batches within an hour, and charges 50 percent of standard prices. According to the [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), that means $1 for input and $5 for output per million tokens for Sonnet 5.5, and $2 and $10 for Opus 5.5. A batch holds up to 100,000 requests or 256 MB, whichever comes first. I would measure the serialized requests and split them into at least two batches to stay clear of that limit.

- Code and metadata: 1,400 classes at 6,000 tokens, 600 flows at 10,000 tokens of flow XML, 250 permission sets at 4,000 tokens = 15.4 million tokens.
- Questions, output schema and the tool findings for that component: 12,000 tokens per request × 2,250 requests = 27 million tokens.
- Output: 1,500 tokens per component = 3.4 million tokens.

```kennzahlen
$59 | Sonnet 5.5, first pass: 42.4 million × $1 + 3.4 million × $5, rounded
$119 | Opus 5.5, first pass: 42.4 million × $2 + 3.4 million × $10, rounded
$10 | Second pass for 40 objects with 100,000 input tokens and 5,000 output tokens on Opus 5.5
source: Claude pricing page (batch list prices, global inference, as of November 9, 2026; US-only inference costs 1.1 times as much), token volumes as assumptions in the worked example
```

Prompt caching stacks with the batch discount, but in batches cache hits are best effort; Anthropic reports hit rates from 30 to 98 percent. I calculate without caching and treat any saving as a bonus. Thinking tokens are [billed as output](https://code.claude.com/docs/en/costs) and cannot be disabled on the 5.5 models; if they triple the output, the Opus pass rises to about $187. The basics of this token math are in the [masterclass chapter on costs and tokens](/en/masterclass/ai-salesforce/costs-and-tokens/).

### Where the real cost sits

The token bill is small; the effort lies with people. In the worked example I would plan about ten architect days: three or four days to set up the tools and write the questions, and the rest to check a sample of the findings, spread across component types, partners and risk classes, plus every finding marked high risk. Reading 2,250 components by hand at an assumed ten minutes each would take about 375 hours, or 47 days. Both figures are rough estimates; privacy clearance and reviews with process owners are additional. The LLM does the first read, and people decide.

## What about source code and data protection?

Before you upload source code, check that the client may process it with an external AI provider, including partner frameworks and third-party components in the org. Test classes also often contain names, email addresses or record IDs. Anthropic's [data retention page](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) lists batch processing as not eligible for zero data retention, with 29-day retention, which applies to what you send as well as to the results. The same page says retained data is "never used for model training without your express permission". Strip personal data before the run and agree on the set-up with your data protection officer; I discuss the German perspective in [AI coding tools, works council and GDPR](/en/blog/ai-coding-tools-works-council-gdpr/).

If the zero-retention rule is strict, there are two alternatives. You pay full price without batch processing, about $119 to $238 in the worked example. That only helps if Anthropic has enabled zero data retention for your organization; this is not self-serve and requires Anthropic's sales team. Or you use the AI documentation feature in sfdx-hardis, which according to its [AI setup page](https://sfdx-hardis.cloudity.com/salesforce-ai-setup/) works with Agentforce, OpenAI or, through LangChain.js, Anthropic, Google GenAI and Ollama for models run locally. The same page warns that the first documentation run "can make hundreds of API calls" and recommends committing the AI cache, and it caps calls per command at 10,000 by default.

## Who should own the assessment?

The client. Run the scans in your pipeline, make the model calls from your own API account, and keep the results in your repository, as I argue for DevOps tools in [why clients should own their DevOps tools](/en/blog/why-clients-should-own-their-devops-tools/). If a partner does the work, its contract should name the tools and data rules, see [partners coding with AI: what belongs in the contract](/en/blog/partners-using-ai-coding-contract-rules/).

The assessment is the starting point for the handover: which objects move to which partner, which components are deleted and which are rebuilt. Managing that is part of [partner governance](/en/services/partner-governance/).

## Retrieve all metadata into a repository you own

1. Retrieve the metadata in scope into a repository you own and list what could not be retrieved.
2. Turn on sfdx-hardis monitoring. Two weeks show whether it works reliably; for delete decisions, look at a full business cycle per process, because warranty or year-end processes may be executed rarely.
3. Run Code Analyzer and a full Apex test run against production metadata.
4. Write ten assessment questions and test them twice on 50 components; if the two runs disagree on many risk ratings, refine the questions.
5. Run the batch, then the second pass per object.
6. Check samples and every high-risk finding before anything is added to the handover plan.
