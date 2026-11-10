---
title: "Agentforce KPIs after go-live: does the agent pay off?"
description: "Which Agentforce KPIs show 90 days after go-live whether an agent pays off for a manufacturer, where each number comes from, and when to switch it off."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: agentforce-kpis-after-go-live
translationKey: agentforce-kpis-after-go-live
topic: ai
categories: [ai]
tags: [agentforce, kpis, agent analytics, digital wallet, dealer service, manufacturing]
takeaways:
  - "What counts: escalation rate, task resolution rate, cost per resolution, handle time on escalated cases and the share answered out of hours."
  - "Agent Analytics supplies escalation, deflection and task resolution rates. Since July 2026 an LLM judges deflection from the full session."
  - "Cost per resolution combines the credits from Digital Wallet with your run costs: $2.98 in the worked example, against $6 for a service rep."
  - "The stop rule is agreed before go-live and applies per subagent. In the worked example the spare parts subagent costs $8.94 per resolution and is switched off."
faq:
  - q: "Where do I find the KPIs of an Agentforce agent?"
    a: "Escalation, deflection, abandonment and task resolution rates are in Agent Analytics in Agentforce Studio, under Observe & Optimize. Credits per agent come from Digital Wallet, and handle time after a handover comes from Service Cloud."
  - q: "What is a good escalation rate for an Agentforce agent?"
    a: "Salesforce does not publish a target value. I start with a stop threshold of 40 percent per subagent after two improvement cycles and adjust it based on the baseline for the enquiry type."
  - q: "Does Agentforce Observability consume Flex Credits?"
    a: "No. Since July 2026 Salesforce says Agentforce Observability is unmetered for every customer across all Agentforce SKUs. Usage still appears in Digital Wallet; new dashboards and the ingestion of external data remain metered."
  - q: "Is a deflected session the same as a resolved enquiry?"
    a: "No. Since July 16, 2026 an LLM scores deflection from 1 to 5 for the full session, and a session counts as deflected at 4 or 5 without escalation. That is better than the old rule, but still a judgment, not a confirmed fix. I count task resolution and check it with a monthly sample of 50 sessions read by the service team."
  - q: "When should a manufacturer switch off an Agentforce agent?"
    a: "Immediately after a confirmed breach of a hard rule, such as a wrong warranty statement. Otherwise on day 90 when the cost per resolved enquiry exceeds the cost of a service rep, or when escalation stays high after two improvement cycles."
draft: false
---

Agentforce KPIs after go-live answer one question on day 90: does the agent resolve dealer enquiries at a lower cost than your service desk, without handing the difficult ones over in worse shape? Five numbers carry the business case: escalation rate, task resolution rate, cost per resolved enquiry, handle time on escalated enquiries and the share of enquiries answered outside business hours. Agent Analytics, Digital Wallet and Service Cloud supply them. Hard rules on quality and data access are added on top. The switch-off rule goes on paper before go-live, agreed with the head of service, and it applies per subagent as well as to the whole agent.

## Which KPIs show whether an Agentforce agent pays off?

Salesforce's own customer figures point at the right kind of number. The [Agentforce 3 press release](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) reports 15 percent less average case handle time at Engine and 70 percent of 1-800Accountant's administrative chat engagements resolved autonomously during the 2025 tax weeks. Neither is a manufacturer, and both are vendor figures, but both measure work that no longer lands on a person.

For a machine builder's dealer agent I use five KPIs:

| KPI | What it measures | Where the number comes from |
|---|---|---|
| Escalation rate | Share of sessions handed to a service rep or another agent | Agent Analytics |
| Task resolution rate | Share of sessions judged fully resolved | Agent Analytics, Trust Layer detector |
| Cost per resolved enquiry | Credits plus run costs, divided by resolved sessions | Digital Wallet plus your own cost records |
| Handle time on escalated enquiries | Minutes a service rep spends after the handover | Service Cloud, Omni-Channel |
| Out-of-hours share | Resolved enquiries that arrived while the service desk was closed | Session start times against business hours |

## Where the numbers come from

**Agent Analytics.** It sits in Agentforce Studio under Observe & Optimize. The [Trailhead module on agent analytics](https://trailhead.salesforce.com/content/learn/modules/agent-analytics-and-monitoring/monitor-agent-metrics-and-scores) defines escalation rate as the "share of sessions that escalated to a support representative or another agent". For service agents, deflection and abandonment have been [judged by an LLM since July 16, 2026](https://help.salesforce.com/s/articleView?id=005305353&language=en_US&type=1): deflection is a score from 1 to 5, abandonment is classified as true, false or unsure, and a non-escalated session counts as deflected at 4 or 5. Task resolution rate is the share of sessions "evaluated as fully resolved by the Trust Layer Task Resolution detector", which works for agents built in the new Agentforce Builder. Quality scores such as answer faithfulness require Audit and Feedback in Setup. Performance Insights breaks each metric down by subagent, intent or action, which is where the switch-off decision gets made.

Reading them costs no credits: Salesforce's [Observability post of July 2026](https://www.salesforce.com/blog/agentforce-observability/) says Observability "is now unmetered for every customer across all Agentforce SKUs".

**Digital Wallet.** [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) breaks consumption down "to the agent, action, and channel level" and supports custom tags for your own reporting. It requires Data 360. Dividing one agent's credits by its resolved sessions gives the consumption part of the cost per resolved enquiry. Knowledge upkeep, regression tests and partner days sit in your own books, and in the worked example below they are the larger part.

**Service Cloud.** Escalations routed through Omni-Channel become AgentWork records, a [work assignment routed to an agent](https://developer.salesforce.com/docs/atlas.en-us.260.0.object_reference.meta/object_reference/sforce_api_objects_agentwork.htm), here meaning the human rep. Report handle time after the handover against the baseline from before go-live. A clean summary from the agent should lower it; dealers who arrive annoyed after three failed attempts raise it.

**Out-of-hours share.** Salesforce offers no ready-made metric. I count sessions that start outside the service desk's hours, per country, and how many were resolved. For an exporter with dealers in Asia or the Americas this can be the strongest argument.

Agent Health Monitoring, listed as GA in the [Dreamforce 2026 announcements](https://www.salesforce.com/blog/dreamforce-2026-announcements/) with "16+ built-in metrics", covers errors and latency. It shows whether the agent runs, not whether it pays off.

## Why does a deflected session not count as resolved?

Deflection is the number vendors like to show, and the weakest of the set. Under the old event-based rule, a session in which a dealer got a wrong delivery date and closed the window counted as deflected. Salesforce wrote in the Observability post that these rates "typically measure proxy signals", and since July 16, 2026 an LLM evaluates the full session instead. That improves the metric, but the judge can misread a session too, and sessions from before May 2026 carry no score.

```hinweis achtung
Since an LLM judges deflection and abandonment, the definition can change under your trend line. Note the switch date and the prompt version next to each monthly figure.
```

Billing adds a third definition. For resolution-based Help Agent pricing, [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.service_cloud_billable_usage_types.htm&language=en_US&type=5) bills 400 credits per resolution when the session is not abandoned, has at least two user messages and two agent responses, and ends with positive feedback or, without feedback, with no escalation request. In Enhanced Chat one resolution covers up to two hours; a longer session counts again. That model is compared with Flex Credits in [what a dealer service agent costs](../flex-credits-agentforce-cost-per-action/).

So I count an enquiry as resolved only when the task resolution detector says so, and I have a senior service rep read 50 sessions a month. Wrong answers in sessions marked as resolved mean the KPI is too optimistic, and that gap goes into the report.

## Worked example: a dealer agent after 90 days

Assume a machine builder with 350 dealers in 30 countries, SAP as ERP and an agent in the dealer portal with two subagents: order status and spare part availability. All figures below are assumptions to show the method; only the credit multipliers and the list price come from Salesforce.

**Month three.** 2,400 sessions, 1,500 on order status and 900 on spare parts. Escalation rate 30 percent (720 sessions), abandonment 8 percent, task resolution rate 52 percent (1,248 sessions). The monthly sample of 50 shows three wrong delivery dates.

**Cost.** Three actions at 20 credits, per the [rate card of November 3, 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf), make 60 credits per session and 144,000 a month; a prompt template the agent calls as an action is billed as that action, not again as a prompt. At the [list price of $500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/) that is $720. Add three partner days at $1,000 for knowledge upkeep, fixes and regression tests: $3,720 a month, or $2.98 per resolved enquiry. Before go-live a service rep needed six minutes per enquiry at $60 an hour, so $6. The two figures cover different scopes: including the rep hours for escalations discussed below, the end-to-end cost is about $4.05 per incoming enquiry.

**Handle time.** The 720 escalated enquiries take 7.5 minutes each, longer than before, because only the difficult ones arrive: 90 rep hours against 240 before go-live. If dealers from half of the 192 abandoned sessions call afterwards, add 10 hours. The gross saving is about 140 hours or $8,400 a month; after $3,720 in agent costs, about $4,680 remain.

**Out of hours.** 26 percent of sessions start outside 7:00 to 18:00 CET, and 58 percent of those are resolved: about 360 sessions a month in which a dealer no longer waits for the next morning.

**Per subagent.** Order status: escalation 14 percent, task resolution 70 percent. Spare parts: escalation 57 percent, task resolution 22 percent, because parts outside the central warehouse need a manual check by the parts desk. The spare parts subagent uses $270 in credits and, by the partner's ticket log, caused half of the fixes, so it carries half of the run costs: $1,770 for 198 resolved enquiries, or $8.94 each, more than a service rep. With a different allocation key the figure changes, so log partner effort per subagent from day one.

```kennzahlen
$2.98 | per resolved enquiry, whole agent
$6 | per enquiry for a service rep before go-live
$8.94 | per resolved enquiry, spare parts subagent
source: worked example with assumed values; credit multipliers from the Flex Credits rate card of November 3, 2026, list price from Salesforce
```

The decision on day 90: order status stays and goes to the next dealer group. Spare parts are taken out of the agent and go to the parts desk through a structured portal form until regional stock data reaches Salesforce. Part identification is covered in [spare parts by serial number](../spare-parts-by-serial-number-ai/).

## When should you switch an agent off?

Gartner [expects](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) more than 40 percent of agentic AI projects to be canceled by the end of 2027, citing "escalating costs, unclear business value or inadequate risk controls". A stop rule written down before go-live makes that a routine decision. I would agree these triggers with the head of service and apply them per subagent:

1. **Immediately:** a confirmed breach of a hard rule, such as a wrong warranty statement or exposing another dealer's order data. The subagent stays off until the fix passes the regression tests from [testing before go-live](../testing-agentforce-agents-before-go-live/).
2. **After two improvement cycles of 30 days:** escalation rate above 40 percent or task resolution below 40 percent.
3. **On day 90:** cost per resolved enquiry above the cost of a service rep per enquiry, unless the business case explicitly pays for something else, such as out-of-hours coverage.
4. **At any time:** handle time on escalated enquiries clearly above the baseline for the same enquiry type, because then the agent shifts work instead of saving it.

The 40 percent values are my starting points, not Salesforce figures. Switching off does not have to mean ending: narrow the agent to one subagent, run it only while the service desk is closed, or fix and retest. For the last option, Agent Optimizer ranks recurring failure patterns from production sessions by impact. Salesforce's [September 2026 post](https://www.salesforce.com/blog/agent-optimizer/) says it is available in beta, and the Dreamforce list announced GA for October; as of November 9, 2026, [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.generative_ai_optimization_agent_use.htm&language=en_US&type=5) still labels it pilot or beta. A/B Experimentation lets a fix compete with the current version on split traffic and is announced as beta for October, so check the status in your org.

## Prepare the 90-day review with three months of baseline data

1. **Measure the baseline** for three months: dealer enquiries by type, handle time, arrival time by country.
2. **Switch on Audit and Feedback** so that quality and trust scores are available from day one.
3. **Check the agent and action tags in Digital Wallet** and add custom tags per subagent, so you can report its credits separately.
4. **Write down the thresholds and the decision owner,** the head of service, not IT.
5. **Book the sample reading** of 50 sessions a month into a named person's calendar, weighted toward warranty and other high-risk intents.
6. **Fix the review dates:** day 30, day 60, decision on day 90.

The KPIs need a business case from before go-live, which is why I put [business value and data quality first](../agentforce-business-value-data-quality-first/). Deciding which agents are worth their costs is part of my [make-or-buy and license planning](../../services/make-or-buy-licences/) work.
