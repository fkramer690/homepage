---
title: "Testing Agentforce agents: when is one ready to go live?"
description: "When is an Agentforce agent ready for production? Testing Center, sf agent test, the LLM judge, pass-rate gates and monitoring, explained for manufacturers."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: testing-agentforce-agents-before-go-live
translationKey: testing-agentforce-agents
topic: ai
categories: [ai]
tags: [agentforce, testing center, ai agents, quality gates, devops, manufacturing]
takeaways:
  - "Salesforce provides testing tools, but it does not provide a threshold. You agree on the test set and the pass rate across several runs yourself."
  - "A test case checks the subagent, the actions and the outcome. A language model grades the outcome, so hard business rules need exact checks on data."
  - "Confirm in writing whether test runs cost credits: the Testing API guide says they consume requests and credits."
  - "I recommend 100 percent for hard rules and critical cases over several trials, and about 90 percent per run for answer quality, plus a human review."
  - "Session traces, health metrics and a staged rollout must be in place on day one, and representative failed conversations become new test cases."
faq:
  - q: "What is the Agentforce Testing Center?"
    a: "Testing Center is the Salesforce tool for testing agents before go-live. It generates synthetic test interactions, runs them in parallel in a sandbox and checks routing, actions and answers. Developers run the same kind of tests with the sf agent test commands from the CLI."
  - q: "What pass rate should an Agentforce agent reach before go-live?"
    a: "Salesforce publishes no threshold. I recommend 100 percent for rule checks and guardrail cases and around 90 percent for answers graded by the LLM judge across three runs, agreed by the business owner, IT, security and the data owners before testing starts. Critical cases must pass in every trial."
  - q: "Do Agentforce tests cost Flex Credits?"
    a: "Have that confirmed for your contract. The Testing API guide states that running tests consumes requests and credits, and the rate card lists actions in sandboxes and scratch orgs at 16 Flex Credits instead of 20. Data 360 queries during tests can add Data 360 credits."
  - q: "Can Agentforce tests run in a CI pipeline?"
    a: "Yes. sf agent test run returns results as JSON, TAP or JUnit, so a pipeline can read them and block a deployment when the pass rate falls below the agreed threshold."
  - q: "How many test cases does an agent need to start with?"
    a: "Anthropic calls 20 to 50 tasks drawn from real failures a good start. For a dealer agent I would take them from real dealer emails and service tickets and add edge cases and guardrail cases."
draft: false
---

Testing Agentforce agents should end with a number that determines whether they can go live. An agent is ready for production when it passes an agreed test set at an agreed pass rate, over several runs, in a sandbox, and when monitoring is switched on before the first dealer contacts it. That gate is necessary, not sufficient: permissions, data protection, fallbacks, load and a way to switch the agent off are checked as well. Salesforce supplies the tools, not the threshold. The business owner, for example the head of service, sets the thresholds with IT, security and the data owners, and I would write them down before the pilot starts.

## Why is testing an AI agent different from testing Apex?

An Apex unit test is designed to give the same result for the same controlled input: green or red. An agent built on a language model can answer the same dealer question in two different ways across two runs. Both answers may be fine, or one may be wrong. Anthropic describes this in its [guide to agent evaluations](https://anthropic.com/engineering/demystifying-evals-for-ai-agents): because model outputs vary between runs, you run several trials per task. The same guide shows why one green run proves little. An agent that solves a task in 75 percent of trials passes three trials in a row only about 42 percent of the time.

So the question becomes: how often does it pass, and which failures can we live with? A clumsy delivery date summary is annoying. A wrong statement that a machine is still under warranty can lead to a credit note. These failures need different gates.

## Salesforce's tools for testing agents

Salesforce introduced the [Agentforce Testing Center](https://www.salesforce.com/news/?p=83400) in November 2024. It generates hundreds of synthetic interactions from a plain-language description and runs them in parallel in a sandbox. For teams that work with source control, [Agentforce DX](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html) offers the same through VS Code, CLI commands and a testing API.

Salesforce currently has two test paths. The legacy Testing Center and the testing API, which most of the documentation below describes, store tests as `AiEvaluationDefinition`. The newer Testing Center in Agentforce Studio uses its own test definitions and runner (`--test-runner agentforce-studio` in the CLI) and is labeled beta in Salesforce Help. In the pro-code path of the legacy model a test is a YAML file. According to the [Salesforce Developers Blog from June 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce), each test case holds a user utterance and up to three expectations: the subagent the conversation should be routed to, the actions that should run, and a plain-language description of the correct outcome. A language model acting as a judge grades that outcome. `sf agent test create` loads the spec into the org and `sf agent test run` executes it.

```vertiefung For developers
title: What else a test spec can check
- **Quality metrics.** Coherence, completeness and conciseness, each as pass or fail, plus latency in milliseconds, according to the [test spec documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-customize.html).
- **Custom evaluations.** Exact string or number comparisons on data that an action produced, selected with a JSONPath expression. Salesforce [shows](https://developer.salesforce.com/blogs/2025/10/test-your-agentforce-agents-with-custom-evaluation-criteria) `string_comparison` and `numeric_comparison`. This is the deterministic part of agent testing in the legacy model, and I would use it for every rule that must hold without exception. The newer custom scorers in Agentforce Studio use an LLM as judge, so they are no replacement for an exact check.
- **CI output.** Results come as JSON, TAP or JUnit, according to the [documentation for test runs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-run.html), so a pipeline reads them like Apex test results.
```

The tooling is changing quickly. The [TDX 2026 roundup](https://www.salesforce.com/blog/tdx-2026-roundup-agentforce-edition/) announced GA for Testing Center enhancements with custom scoring and multi-turn tests for May 2026, but Salesforce Help still labels the Agentforce Studio experience as beta. At [Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) Salesforce added conversation testing with a task resolution metric (beta) and custom scorers (API GA, user interface in beta). The developer docs I cite still describe the legacy test process, not the newer Testing Center in Agentforce Studio, so check the current status and beta terms in your org. Keep your test cases as plain files in Git, so they survive the next tool change.

```hinweis achtung
Agent testing is [available only in sandboxes](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), and the testing API guide notes that running tests consumes requests and credits and can modify data. According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) of November 3, 2026, an action costs 16 credits in a sandbox or scratch org instead of 20 in production. Billing rules for testing change from release to release, so have your account executive confirm in writing whether your test runs are metered.

And if an action reserves a part in a connected ERP test system, every test run does that too.
```

## How do you set pass-rate gates for go-live?

Salesforce gives you scores, but it publishes no threshold that means "ready". The June 2026 lifecycle post names none, and neither do the testing docs. The gates are therefore a project decision, and I split them by risk:

1. **Business rules: 100 percent, checked exactly.** Warranty eligibility, credit limits, discount approvals. These belong in deterministic logic, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/), and you test them with action checks and custom evaluations that leave no room for interpretation. One failure blocks the release.
2. **Routing and actions: close to 100 percent.** If a spare parts question lands in the wrong subagent or the order lookup does not run, the answer cannot be right. These checks are pass or fail and cheap to repeat.
3. **Answer quality: a pass rate over several runs.** For the outcome graded by the LLM judge I start with 90 percent in each of three full runs, and I look at which cases fail: a case that fails in every run is a finding, even if the total stays above 90 percent. That number is my starting point, not a Salesforce value; the business owner confirms or changes it.
4. **Guardrails: no failures.** Out-of-scope requests, questions about another dealer's orders, instructions hidden in free text. Dealer portals and warranty forms are entry points for prompt injection, which I cover in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

The judge needs checking too. Anthropic recommends calibrating model graders against human experts, so the service expert reads a sample of judged answers in the first runs. If the expert and the judge often disagree, the outcome descriptions in the test cases are too vague.

## Worked example: a spare parts agent for dealers

Assume a machine builder with SAP, Service Cloud and a dealer portal. The planned agent answers dealer questions about spare part availability and order status. All numbers below are assumptions to show the method.

**The test set.** The team writes 60 test cases: 40 typical questions from real dealer emails, 10 edge cases such as superseded part numbers or a serial number missing from the installed base, and 10 guardrail cases such as a request for another dealer's orders. Each case uses three actions on average: identify the machine, query SAP, write the answer. Anthropic's guide calls 20 to 50 tasks drawn from real failures a good start.

**The cost.** If test actions are billed at sandbox rates, one full run is 60 × 3 = 180 actions at 16 credits, so 2,880 credits. Three runs per release add up to 8,640 credits, about $43 at the [list price of $500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/), before prompts and Data 360. Three runs every week over a twelve-week pilot would cost roughly $520, less than the cost of one wrong availability promise to a dealer whose machine is down. If your test runs are unmetered, only costs from connected systems and Data 360 remain. How to estimate the rest of the bill is the topic of [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

**The first result.** Routing and actions pass in 58 of 60 cases, the outcome in 49 of 60. The failures cluster: eight of the eleven involve superseded part numbers, where SAP returns the old number and the agent reports the part as unavailable. That is a task for the SAP team, not a prompt problem. Once the API returns the successor part, the outcome passes in 56, 55 and 56 of 60 cases over three runs, above 90 percent each time, no case fails in all three runs, all guardrail cases pass, a service expert has read a sample of the judged answers, and the head of service approves go-live for dealers in one country first.

Most failures in such a run point to data and interfaces, which is why I put [business value and data quality first](../agentforce-business-value-data-quality-first/).

## After go-live, monitoring runs from day one

Tests cover the questions you thought of. Dealers will ask others, so monitoring runs from day one:

- **Session traces.** With [Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) Salesforce introduced a session tracing data model in Data Cloud, now Data 360, built on OpenTelemetry. With the Session Trace OTel API (beta), traces can be pulled per session and forwarded to tools such as Splunk or Datadog; it requires Data 360. Traces contain messages and action inputs, so restrict access to them.
- **Health and alerts.** Agentforce Observability shows latency, escalation and error rates, and alerts per metric are configured in Agentforce Studio. Agent Health Monitoring with 16 or more built-in metrics has been GA since Dreamforce 2026.
- **Staged rollout.** Publishing creates an inactive agent version; activating it is a separate step. Start with one dealer group and expand the rollout when the numbers hold.
- **Feedback loop.** Triage failed conversations, remove duplicates and personal data, and add representative or high-risk failures to the regression suite.

Retest whenever something the agent depends on changes: a subagent, a Flow, knowledge articles, a Salesforce release, the SAP API.

## The client owns the tests

Delivery partners may write and run the tests, but the test set, the thresholds and the go-live decision belong to the company that answers to its dealers. It is the principle from [DevOps for enterprise projects](../why-devops-matters-salesforce-enterprise/): agent tests live in the same repository and pipeline, with JUnit output and a gate that blocks the deployment when results fall below the threshold. Setting this up is part of my [DevOps and release management](../../services/devops-release-management/) work.

```schritte
Name unacceptable failures
  Together with the business owner, for example a wrong warranty statement or data from another dealer.
Collect 20 to 50 real questions
  From dealer emails and service tickets, then add edge cases and guardrail cases.
Mark the rules
  Which rules need exact checks instead of the judge?
Agree thresholds
  Thresholds and the number of runs, before the first test, not after the first result.
Clarify test billing
  Whether test runs are metered, and the budget for every regression run until the end of the pilot.
Switch on monitoring
  And define the rollout group, before you activate the agent.
```
