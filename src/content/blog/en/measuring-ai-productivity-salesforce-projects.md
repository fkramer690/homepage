---
title: "Measuring AI productivity in Salesforce projects"
description: "Does AI really speed up your Salesforce program? What METR, DORA and McKinsey found, which metrics to track and why the baseline must come first."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: measuring-ai-productivity-salesforce-projects
translationKey: measuring-ai-benefit-salesforce-projects
topic: governance
categories: [architecture, ai]
tags: [ai coding, productivity, dora metrics, program management, salesforce devops]
takeaways:
  - "In the METR study, experienced developers needed 19 percent more time with AI and later still believed they had worked 20 percent faster."
  - "In DORA 2025, higher AI adoption is associated with higher throughput but still with lower stability: AI amplifies what a team already has."
  - "In a McKinsey survey, leaders reported 11.8 percent time savings but only 6.2 percent less rework; 30 percent saw productivity fall."
  - "Even where AI speeds up coding, a Salesforce program only gets faster if review, testing and user acceptance keep up."
faq:
  - q: "How do I measure whether AI coding speeds up my Salesforce project?"
    a: "Record cycle time per story, defect escape rate, rework and change fail rate before AI tools are introduced, for at least one full release cycle and with enough stories per story type. Then compare the same kinds of stories afterwards, ideally against a team that starts later. Developer impressions and tool usage figures do not prove faster delivery, because the METR study showed a gap of almost 40 points between perceived and measured speed."
  - q: "Does AI make Salesforce developers faster?"
    a: "It depends on the setting. GitHub measured a 55 percent speed increase on a small new JavaScript task; METR measured a 19 percent slowdown for experienced developers in large existing codebases. A Salesforce org with years of triggers, Flows and integrations has more in common with the METR setting, so gains should be measured, not assumed."
  - q: "Which metrics should I not use to judge AI productivity?"
    a: "Lines of code, the share of AI-generated code, number of licenses, active users and prompt volume. McKinsey notes that they show whether people use the tools, not whether releases are faster or more reliable. Outcome metrics such as quality, speed and productivity say more."
  - q: "What are the DORA metrics?"
    a: "DORA currently uses five software delivery metrics: change lead time, deployment frequency and failed deployment recovery time for throughput, and change fail rate and deployment rework rate for instability. Rework rate was added in 2024."
draft: false
---

You measure AI productivity in a Salesforce project with outcome metrics on your own baseline: cycle time per story, defect escape rate, rework and change fail rate, recorded before the first coding agent is introduced. Developer impressions and license counts do not prove faster delivery. The studies below range from 55 percent faster to 19 percent slower, depending on the task and the codebase. A mature org with years of triggers, Flows and an SAP integration is at the difficult end of that range. So whether AI makes your program faster can only be answered with a number you collected yourself.

## What do the studies say about AI coding productivity?

Five frequently cited publications show how strongly the result depends on the task, the people and the measurement method.

- **GitHub, 2022.** In a [controlled experiment](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) 95 developers wrote an HTTP server in JavaScript. The Copilot group took about 1 hour 11 minutes, the control group 2 hours 41 minutes: 55 percent faster. The task was small, new and well defined.
- **METR, 2025.** In a [randomized study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) 16 experienced open-source developers worked on 246 real issues in their own projects, which average more than one million lines of code. With AI, they needed 19 percent more time. Beforehand they expected a 24 percent speed-up, and afterwards they still believed AI had made them 20 percent faster.
- **METR, February 2026.** In its [update](https://metr.org/blog/2026-02-24-uplift-update/) METR writes that today's tools probably speed developers up more, but that its data is "only very weak evidence for the size of this increase". One reason: recruiting developers has become harder, and 30 to 50 percent of them said they chose not to submit some tasks because they did not want to do them without AI.
- **DORA, 2025.** The [State of AI-assisted Software Development](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) surveyed nearly 5,000 professionals. 90 percent use AI at work and more than 80 percent believe it raised their productivity. Higher AI adoption is now associated with higher delivery throughput, but still with lower delivery stability. DORA's summary: "AI doesn't fix a team; it amplifies what's already there."
- **McKinsey, August 2026.** A [survey of 334 product and engineering leaders](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) reported 11.8 percent average time savings across the development life cycle, but only 6.2 percent less rework, and 30 percent said team productivity had fallen. In a separate survey of 198 developers, about 80 percent reported gains of roughly 3 percent, while the top 20 percent reported gains of about 55 percent. All of these figures are self-reported.

```kennzahlen
55% | less time with Copilot on a small, new JavaScript task (GitHub 2022)
19% | more time with AI for experienced developers in their own large codebases (METR 2025)
20% | speed-up the same developers still believed in afterwards (METR 2025)
11.8% | average time savings reported across the development life cycle (McKinsey 2026)
source: GitHub, controlled experiment 2022; METR, randomized study July 2025; McKinsey, survey of 334 leaders, August 2026
```

My reading: the speed-up is real for some people and some tasks, and the average is far smaller than vendor presentations suggest. DORA followed up in 2026 with a report on the [ROI of AI-assisted software development](https://dora.dev/ai/roi), which also covers the productivity dip at the start of a rollout. The METR perception gap is the finding I would put in front of every steering committee. If the people doing the work misjudge their own speed by almost 40 points, a partner's "we are 30 percent faster" is a claim until it is measured.

## Why is a Salesforce org closer to METR than to GitHub?

After five or more years, a manufacturer's org is a large existing codebase with implicit knowledge. It may include warranty logic in Apex, a dealer portal on Experience Cloud, Field Service (now Agentforce Field Service and Operations) with spare part reservations, order data from SAP or proALPHA through middleware, plus a managed package or two. An agent writing a new trigger on Case has to know the four automations already running there. That is much closer to the METR setting than to the GitHub one. It is not the same, because an org mixes code with metadata, configuration and Flows, so METR is a warning against assumed gains rather than a Salesforce benchmark.

The second reason is where the time is spent. In my judgment, writing code is the smaller part of a story's lead time in a typical Salesforce program. The larger part is waiting: for a review, for an available sandbox, for the head of service to test in UAT, for the next release window. Where AI shortens the build step, the time saved only reduces lead time if review, testing and UAT absorb the extra throughput. If nothing else changes, the story waits longer at the next queue. McKinsey's finding that organizations which redesigned their processes before adding AI were more than twice as likely to report gains above 20 percent points in the same direction.

## Which metrics show whether AI speeds up your Salesforce program?

I would track five numbers, split by story type (configuration, Apex, integration) and by new versus changed components, because AI helps to very different degrees with a Flow change and with an SAP interface.

1. **Cycle time per story**, from "ready for development" to production, split into build, review wait, test and UAT wait. The split tells you where time was spent.
2. **Defect escape rate**: defects found within a fixed window after release, for example 60 days, divided by all defects found for those stories. This shows whether speed comes at the expense of quality.
3. **Rework share**: stories reopened after they were marked "done". Report it separately from what DORA calls deployment rework rate, the "percentage of deployments that are unplanned work to fix bugs".
4. **Change fail rate and change lead time.** Two of the five [DORA metrics](https://dora.dev/guides/dora-metrics/history/). DORA counts change lead time from commit to production, so it is not the story cycle time from point 1. In your own program both are derived from version control, deployment and incident data, not from a survey; one open-source option that reports them is described in [sfdx-hardis as open-source Salesforce DevOps](/en/blog/sfdx-hardis-open-source-salesforce-devops/).
5. **Pull request size and review wait.** AI lowers the effort required to create large diffs. DORA lists [working in small batches](https://dora.dev/capabilities/) as one of seven capabilities that amplify AI's benefit, and I would expect it to be the first discipline to slip once agents write the code.

For the steering committee I would add one economic view: accepted scope per unit of delivery cost. I would leave out the following success measures: lines of code, the share of AI-generated code, licenses and prompt volume. McKinsey points out that adoption metrics show whether people use the tools, not whether releases become faster or more reliable, and 86 percent of its top accelerators track outcome metrics instead. Token cost per story is useful for budgeting, which I cover in [what AI coding costs in a Salesforce project](/en/blog/ai-coding-costs-salesforce-project/).

## Worked example: two numbers that tell different stories

Assume a machine builder with Sales Cloud, Service Cloud and Field Service, an SAP integration through middleware and two implementation partners with eight developers in total. All numbers below are assumptions to show the method. Partner A proposes coding agents and promises "about 30 percent faster".

The program manager first extracts three months of history from Jira and Git. Assume about 40 stories a month and a median cycle time of 18 working days: 4 days for build, 3 days of review wait, 6 days waiting for the service department to perform UAT and 5 days for testing and the release window. The defect escape rate is 12 percent, and rework is 8 percent.

After three months with agents, assume the build step drops from 4 to 2.5 days. This saving of a good third is what the developers notice. But pull requests have doubled in size, so review wait grows from 3 to 4 days. The UAT wait stays at 6 days because the service team tests twice a week. Cycle time falls from 18 to 17.5 days, less than 3 percent. Rework rises from 8 to 11 percent.

Both numbers are true. Coding is faster; the overall program is barely faster. The useful conclusion is where to act: smaller pull requests with automated gates, fixed daily UAT slots agreed with the head of service, and a reviewer on the client side with dedicated time reserved for reviews. Without the baseline, the steering committee would have heard only the 30 percent.

## Clean up the status workflow before the tools arrive

Start before the tools are introduced, because a baseline cannot be reconstructed from memory.

```schritte
Clean up the status workflow
  In Jira or Azure DevOps, so that "ready", "in review", "in UAT" and "done" carry timestamps. Existing history only counts if the old statuses match the new definitions.
Write down the definitions
  With all partners: when cycle time starts, what counts as an escaped defect, what counts as rework. This belongs in the governance model, not in each partner's report.
Label AI-assisted pull requests
  With a small taxonomy rather than yes or no: which tool, and whether it completed code, generated tests or worked as an agent. So you can compare like with like. Disclosure of AI use is a contract topic, see [rules for partners using AI coding](/en/blog/partners-using-ai-coding-contract-rules/).
Report monthly as trends
  With medians and the number of stories behind them, never as a ranking of teams or partners. A before and after comparison shows a trend, not a cause; if teams start with the tools at different times, compare them. Teams that are ranked start optimizing the number.
Agree a review date
  For example after three months, and decide then whether the setup, the process or the commercial model changes. If a partner really delivers faster, the benefit should be reflected commercially, as a lower price, more accepted scope or shorter lead times, which is the question behind [fixed price instead of time and materials](/en/blog/fixed-price-vs-time-and-materials-ai/).
```

For the first report, cycle time and rework are enough; the other numbers follow once the definitions are agreed. This is the core of how I set up [program management for Salesforce programs](/en/services/program-management-nearshore/), and it rests on a working pipeline, as described in [why DevOps decides Salesforce enterprise projects](/en/blog/why-devops-matters-salesforce-enterprise/).
