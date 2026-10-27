---
title: "Testing Agentforce agents: when is one ready to go live?"
description: "When is an Agentforce agent ready for production? Testing Center, sf agent test, the LLM judge, pass-rate gates and monitoring, explained for manufacturers."
pubDate: 2026-10-27
lang: en
slug: testing-agentforce-agents-before-go-live
translationKey: testing-agentforce-agents
topic: ai
tags: [agentforce, testing center, ai agents, quality gates, devops, manufacturing]
takeaways:
  - "An Agentforce agent is ready for production when it passes an agreed test set at an agreed pass rate over several runs; Salesforce provides the tools but publishes no threshold."
  - "Each Agentforce test case can check the subagent, the actions that ran and the outcome, which a language model grades as judge; hard business rules need exact checks instead."
  - "Agent tests run in sandboxes, consume credits and can change data; an action costs 16 Flex Credits there, so three runs of 60 cases with three actions each cost about $43."
  - "Hard rules such as warranty eligibility need 100 percent, answer quality a pass rate such as 90 percent over three runs, agreed with the business owner before the pilot."
  - "Session traces, health metrics and a staged rollout must be active on day one, and every failed production conversation becomes a new test case."
faq:
  - q: "What is the Agentforce Testing Center?"
    a: "Testing Center is the Salesforce tool for testing agents before go-live. It generates synthetic test interactions, runs them in parallel in a sandbox and checks routing, actions and answers. Developers run the same kind of tests with the sf agent test commands from the CLI."
  - q: "What pass rate should an Agentforce agent reach before go-live?"
    a: "Salesforce publishes no threshold. I recommend 100 percent for rule checks and guardrail cases and around 90 percent for answers graded by the LLM judge across three runs, confirmed by the business owner before testing starts."
  - q: "Do Agentforce tests cost Flex Credits?"
    a: "Yes. Salesforce states that running tests consumes requests and credits. Actions in sandboxes and scratch orgs cost 16 Flex Credits instead of 20 in production, so budget test runs like any other usage."
  - q: "Can Agentforce tests run in a CI pipeline?"
    a: "Yes. sf agent test run returns results as JSON, TAP or JUnit, so a pipeline can read them and block a deployment when the pass rate falls below the agreed threshold."
  - q: "How many test cases does an agent need to start with?"
    a: "Anthropic calls 20 to 50 tasks drawn from real failures a good start. For a dealer agent I would take them from real dealer emails and service tickets and add edge cases and guardrail cases."
draft: false
---

Testing Agentforce agents ends with a number, not a gut feeling. An agent is ready for production when it passes an agreed test set at an agreed pass rate, over several runs, in a sandbox, and when monitoring is switched on before the first dealer writes to it. Salesforce supplies the tools: Testing Center, the `sf agent test` commands and a language model that grades the answers. It does not supply the threshold. That number belongs to the business owner, for example the head of service, and I would write it down before the pilot starts.

## Why is testing an AI agent different from testing Apex?

An Apex test gives the same result every time: same input, same output, green or red. An agent built on a language model can answer the same dealer question in two different ways on two runs. Both answers may be fine, or one may be wrong. Anthropic describes this in its [guide to agent evaluations](https://anthropic.com/engineering/demystifying-evals-for-ai-agents): because model outputs vary between runs, you run several trials per task. The same guide shows why one green run proves little. An agent that solves a task in 75 percent of trials passes three trials in a row only about 42 percent of the time.

For a decision maker this changes the question. "Did the test pass?" becomes "How often does it pass, and which failures can we live with?" A clumsy summary of a delivery date is annoying. A wrong statement that a machine is still under warranty costs money and a credit note. These two failures need different gates.

## Which tools does Salesforce provide for testing agents?

Salesforce introduced the [Agentforce Testing Center](https://www.salesforce.com/news/?p=83400) in November 2024. It generates hundreds of synthetic interactions from a plain-language description, runs them in parallel and works in sandboxes, which support Agentforce and Data Cloud. For teams that work with source control, [Agentforce DX](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html) offers the same through VS Code, CLI commands and a testing API.

In the pro-code path a test is a YAML file. According to the [Salesforce Developers Blog from June 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce), each test case holds a user utterance and up to three expectations: the subagent the conversation should be routed to, the actions that should run, and a plain-language description of the correct outcome. A language model acting as a judge grades that outcome. `sf agent test create` loads the spec into the org and `sf agent test run` executes it. Beyond that, the platform offers:

- **Quality metrics.** Coherence, completeness and conciseness, each as pass or fail, plus latency in milliseconds, according to the [test spec documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-customize.html).
- **Custom evaluations.** Exact string or number comparisons on data that an action produced, selected with a JSONPath expression. Salesforce [shows](https://developer.salesforce.com/blogs/2025/10/test-your-agentforce-agents-with-custom-evaluation-criteria) `string_comparison` and `numeric_comparison`. This is the deterministic part of agent testing, and I use it for every rule that must hold without exception.
- **CI output.** Results come as JSON, TAP or JUnit, according to the [documentation for test runs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-run.html), so a pipeline reads them like Apex test results.
- **Validation before publishing.** Salesforce requires validation before an agent can be published and adds that automated validation is "a safety net, not a substitute for judgment".

The tooling is changing quickly. Testing Center enhancements with custom scoring and multi-turn tests went GA in May 2026, according to the [TDX 2026 roundup](https://www.salesforce.com/blog/tdx-2026-roundup-agentforce-edition/). At [Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) Salesforce added conversation testing with a task resolution metric (beta) and custom scorers (API GA, user interface in beta). The developer docs I checked still describe the legacy test process and say documentation for the new Testing Center in Agentforce Studio, currently in beta, will follow. My advice: keep your test cases as plain files in Git, so they survive the next tool change.

Two practical points are easy to miss. Agent testing is [available only in sandboxes](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), and Salesforce notes that running tests consumes requests and credits and can modify data. According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), an action costs 16 credits in a sandbox or scratch org instead of 20 in production. And if an agent action creates a case or reserves a part in a connected test ERP, every test run does that too.

## How do you set pass-rate gates for go-live?

Salesforce gives you scores, but it publishes no threshold that means "ready". The June 2026 lifecycle post names none, and neither do the testing docs. The gates are therefore a project decision, and I split them by risk:

1. **Business rules: 100 percent, checked exactly.** Warranty eligibility, credit limits, discount approvals. These belong in deterministic logic, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/), and you test them with action checks and custom evaluations that leave no room for interpretation. One failure blocks the release.
2. **Routing and actions: close to 100 percent.** If a spare parts question lands in the wrong subagent or the order lookup does not run, the answer cannot be right. These checks are pass or fail and cheap to repeat.
3. **Answer quality: a pass rate over several runs.** For the outcome graded by the LLM judge I start with 90 percent in each of three full runs. That number is my starting point, not a Salesforce value; the business owner confirms or changes it.
4. **Guardrails: no failures.** Out-of-scope requests, questions about another dealer's orders, instructions hidden in free text. Dealer portals and warranty forms are entry points for prompt injection, which I cover in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

The judge itself needs checking too. Anthropic recommends calibrating model graders closely against human experts. In practice the service expert reads a sample of the judged answers in the first runs. If expert and judge disagree often, the outcome descriptions in the test cases are too vague, and that is where I would fix things first.

## A typical scenario: a spare parts agent for dealers

Assume a machine builder with SAP, Service Cloud and a dealer portal. The planned agent answers dealer questions about spare part availability and order status. All numbers below are assumptions to show the method.

**The test set.** The team writes 60 test cases: 40 typical questions taken from real dealer emails, 10 edge cases such as superseded part numbers or a serial number missing from the installed base, and 10 guardrail cases such as a request for a special discount or for another dealer's orders. Each case uses three actions on average: identify the machine, query SAP, write the answer. Anthropic's guide calls 20 to 50 tasks drawn from real failures a good start, so 60 is enough for a first gate.

**The cost.** One full run is 60 × 3 = 180 actions at 16 sandbox credits, so 2,880 credits. Three runs per release add up to 8,640 credits, about $43 at the [list price of $500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/), before prompts. A weekly regression over a twelve-week pilot costs roughly $520. Compared with one wrong availability promise to a dealer with a machine standing still, that is cheap. How to estimate the rest of the bill is the topic of [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

**The first result.** Routing and actions pass in 58 of 60 cases. The outcome passes in 49 of 60 on the first run. The failures cluster: eight of the eleven involve superseded part numbers, where SAP returns the old number and the agent reports the part as unavailable. That is a task for the SAP team, not a prompt problem. Once the API returns the successor part, the outcome rate reaches 93, 91 and 92 percent over three runs, all guardrail cases pass, and the head of service approves go-live for the dealers of one country first.

The pattern in such a run is typical: most failures point at data and interfaces, which is why I put [business value and data quality first](../agentforce-business-value-data-quality-first/).

## What happens after go-live?

Tests cover the questions you thought of. Dealers will ask others. So monitoring has to run from the first day:

- **Session traces.** With [Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) Salesforce introduced a session tracing data model in Data Cloud, now Data 360, built on the OpenTelemetry standard. The Session Trace OTel API, in beta since TDX 2026, exports traces to tools such as Splunk, Datadog and New Relic.
- **Health and alerts.** Command Center shows latency, escalation frequency and error rates and sends alerts. Agent Health Monitoring with more than 16 built-in metrics is GA since Dreamforce 2026.
- **Staged rollout.** Publishing creates an inactive agent version, and activating it is a separate step. Start with one dealer group or one country and widen when the numbers hold. A/B experimentation for agent variants is in beta.
- **Feedback loop.** Every production conversation that went wrong becomes a new test case. After six months the test set reflects what dealers really ask.

Retest whenever something under the agent changes: a new subagent, a changed Flow, new knowledge articles, a Salesforce release, a changed SAP API. The agent depends on all of them, and none of them announces its side effects.

## Where should you start, and who owns the tests?

The client should own them. The partner who builds the agent writes and runs the tests, but the test set, the thresholds and the go-live decision belong to the company that answers to its dealers. It is the same principle I apply to reviews and pipelines in [DevOps for enterprise projects](../why-devops-matters-salesforce-enterprise/): agent tests live in the same repository and run in the same pipeline, with JUnit output and a gate that blocks the deployment below the threshold. Setting this up is part of my [DevOps and release management](../../services/devops-release-management/) work.

1. **Name the unacceptable failures** together with the business owner, for example a wrong warranty statement or data from another dealer.
2. **Collect 20 to 50 real questions** from dealer emails and service tickets, then add edge cases and guardrail cases.
3. **Mark the rules** that need exact checks instead of the judge.
4. **Agree thresholds and the number of runs** before the first test, not after the first result.
5. **Budget sandbox credits** for every regression run until the end of the pilot.
6. **Switch on monitoring and define the rollout group** before you activate the agent.

An Agentforce agent is ready when it meets thresholds you set in advance, run after run, and when you can see what it does in production from the first day. If you want a second pair of eyes on your test set or your go-live gates, [send me a message](#contact).
