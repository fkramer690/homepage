---
title: "Measuring AI productivity in Salesforce projects"
description: "Does AI really speed up your Salesforce programme? What METR, DORA and McKinsey found, which metrics to track and why the baseline must come first."
pubDate: 2026-10-27
lang: en
slug: measuring-ai-productivity-salesforce-projects
translationKey: measuring-ai-benefit-salesforce-projects
topic: governance
categories: [architecture, ai]
tags: [ai coding, productivity, dora metrics, programme management, salesforce devops]
takeaways:
  - "Measure AI productivity in a Salesforce programme with cycle time per story, defect escape rate, rework and change fail rate against your own baseline, never with developer self-reports."
  - "In the METR study experienced developers took 19 percent longer with AI on their own large codebases, while believing afterwards that AI had made them 20 percent faster."
  - "DORA 2025 found that AI adoption goes with higher delivery throughput but still with lower delivery stability: AI amplifies the strengths and weaknesses a team already has."
  - "McKinsey's 2026 survey found 11.8 percent average time savings but only 6.2 percent less rework, and 30 percent of leaders reported that team productivity fell."
  - "Faster coding only shortens a Salesforce programme if review, testing and user acceptance by the business keep up; otherwise the queue just moves."
faq:
  - q: "How do I measure whether AI coding speeds up my Salesforce project?"
    a: "Record cycle time per story, defect escape rate, rework and change fail rate for two to three months before AI tools are introduced. Then compare the same kinds of stories afterwards. Developer impressions and tool usage figures are no evidence, because the METR study showed a gap of almost 40 points between perceived and measured speed."
  - q: "Does AI make Salesforce developers faster?"
    a: "It depends on the setting. GitHub measured 55 percent faster on a small new JavaScript task, METR measured 19 percent slower for experienced developers in large existing codebases. A Salesforce org with years of triggers, Flows and integrations is closer to the METR setting, so gains should be measured, not assumed."
  - q: "Which metrics should I not use to judge AI productivity?"
    a: "Lines of code, the share of AI-generated code, number of licences, active users and prompt volume. McKinsey notes that they show whether people use the tools, not whether releases are faster or more reliable. Outcome metrics such as quality, speed and productivity say more."
  - q: "What are the DORA metrics?"
    a: "DORA currently uses five software delivery metrics: change lead time, deployment frequency and failed deployment recovery time for throughput, and change fail rate and deployment rework rate for instability. Rework rate was added in 2024."
draft: false
---

You measure AI productivity in a Salesforce project with outcome metrics on your own baseline: cycle time per story, defect escape rate, rework and change fail rate, recorded before the first coding agent arrives. Developer impressions and licence counts prove nothing. The published studies range from 55 percent faster to 19 percent slower, depending on the task and the codebase. A grown org with years of triggers, Flows and an SAP integration sits at the hard end of that range. So the honest answer to "is AI making our programme faster?" is a number you collected yourself.

## What do the studies say about AI coding productivity?

Five sources come up in every discussion, and they measure very different things.

- **GitHub, 2022.** In a [controlled experiment](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) 95 developers wrote an HTTP server in JavaScript. The Copilot group took about 1 hour 11 minutes, the control group 2 hours 41 minutes: 55 percent faster. A small, new, well-defined task.
- **METR, 2025.** In a [randomised study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) 16 experienced open-source developers worked on 246 real issues in their own projects, which average more than one million lines of code. With AI they took 19 percent longer. Beforehand they expected a 24 percent speed-up, and afterwards they still believed AI had made them 20 percent faster.
- **METR, February 2026.** In its [update](https://metr.org/blog/2026-02-24-uplift-update/) METR writes that developers are probably sped up more by today's tools, but that its data is "only very weak evidence for the size of this increase". One reason: more developers refused to work without AI at all, and 30 to 50 percent said they had skipped tasks they did not want to do without it.
- **DORA, 2025.** The [State of AI-assisted Software Development](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) surveyed nearly 5,000 professionals. 90 percent use AI at work and more than 80 percent believe it raised their productivity. AI adoption now goes with higher delivery throughput, but still with lower delivery stability. DORA's summary: "AI doesn't fix a team; it amplifies what's already there."
- **McKinsey, August 2026.** A [survey of 334 product and engineering leaders](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) found 11.8 percent average time savings across the development life cycle, but only 6.2 percent less rework. 30 percent reported that team productivity fell. About 80 percent of engineers gained roughly 3 percent, the top 20 percent about 55 percent.

My reading: the speed-up is real for some people and some tasks, and the average is far smaller than the vendor slides. The METR perception gap is the finding I would put in front of every steering committee. If the people doing the work misjudge their own speed by almost 40 points, a partner's "we are 30 percent faster" is an opinion.

## Why is a Salesforce org closer to METR than to GitHub?

A manufacturer's org after five or more years is a large existing codebase with implicit knowledge. Warranty logic in Apex, a dealer portal on Experience Cloud, Field Service with spare part reservations, order data from SAP or proALPHA through middleware, plus a managed package or two. An agent writing a new trigger on Case has to know the four automations already running there. That is the METR setting, not the GitHub one.

The second reason is where time goes. In my judgement, writing code is the smaller part of a story's lead time in a typical Salesforce programme. The larger part is waiting: for a review, for a free sandbox, for the head of service to test in UAT, for the next release window. AI shortens the build step. If nothing else changes, the story waits longer at the next queue. McKinsey's finding that organisations which redesigned their processes before adding AI were more than twice as likely to report gains above 20 percent points the same way.

## Which metrics show whether AI speeds up your Salesforce programme?

I would track five numbers, split by story type (configuration, Apex, integration), because AI helps very differently with a Flow change than with an SAP interface.

1. **Cycle time per story**, from "ready for development" to production, split into build, review wait, test and UAT wait. The split tells you where the time went.
2. **Defect escape rate**: defects found after release divided by all defects found for those stories. This shows whether speed is bought with quality.
3. **Rework share**: stories reopened after "done", plus what DORA calls deployment rework rate, the "percentage of deployments that are unplanned work to fix bugs".
4. **Change fail rate and change lead time.** Two of the five [DORA metrics](https://dora.dev/guides/dora-metrics/history/). They come from the pipeline, not from a survey; one open-source option that reports them is described in [sfdx-hardis as open-source Salesforce DevOps](../sfdx-hardis-open-source-salesforce-devops/).
5. **Pull request size and review wait.** AI makes large diffs cheap. DORA lists [working in small batches](https://dora.dev/capabilities/) as one of seven capabilities that amplify AI's benefit, and I would expect it to be the first discipline to slip once agents write the code.

What I would leave out as a success measure: lines of code, the share of AI-generated code, licences and prompt volume. McKinsey points out that adoption metrics show whether people use the tools, not whether releases get faster or more reliable, and 86 percent of its top accelerators track outcome metrics instead. Token cost per story is useful for budgeting, which I cover in [what AI coding costs in a Salesforce project](../ai-coding-costs-salesforce-project/).

## A typical scenario: two numbers that tell different stories

Assume a machine builder with Sales Cloud, Service Cloud and Field Service, an SAP integration through middleware and two implementation partners with eight developers in total. All numbers below are assumptions to show the method. Partner A proposes coding agents and promises "about 30 percent faster".

The programme manager first pulls three months of history from Jira and Git. Assume about 40 stories a month and a median cycle time of 18 working days: 4 days build, 3 days review wait, 6 days waiting for UAT by the service department and 5 days for testing and the release window. Defect escape rate 12 percent, rework 8 percent.

After three months with agents, assume the build step drops from 4 to 2.5 days. That is the good third the developers feel. But pull requests have doubled in size, so review wait grows from 3 to 4 days. UAT still waits 6 days because the service team tests twice a week. Cycle time falls from 18 to 17.5 days, less than 3 percent. Rework rises from 8 to 11 percent.

Both numbers are true. The coding is faster; the programme barely is. The useful conclusion is where to act: smaller pull requests with automated gates, fixed daily UAT slots with the head of service, and a reviewer on the client side with time reserved for it. Without the baseline, the steering committee would only have heard the 30 percent.

## Where should you start?

Start before the tools arrive, because a baseline cannot be reconstructed from memory.

1. **Clean up the status workflow** in Jira or Azure DevOps so that "ready", "in review", "in UAT" and "done" carry timestamps. Most programmes already have three months of usable history.
2. **Write down the definitions** with all partners: when cycle time starts, what counts as an escaped defect, what counts as rework. This belongs in the governance model, not in each partner's report.
3. **Label AI-assisted pull requests**, so you can compare like with like. Disclosure of AI use is a contract topic, see [rules for partners using AI coding](../partners-using-ai-coding-contract-rules/).
4. **Report monthly as trends**, never as a ranking of teams or partners. Teams that are ranked start optimising the number.
5. **Agree a review date**, for example after three months, and decide then whether the setup, the process or the commercial model changes. If a partner really delivers faster, that should show up in the price, which is the question behind [fixed price instead of time and materials](../fixed-price-vs-time-and-materials-ai/).

This is the core of how I set up [programme management for Salesforce programmes](../../services/program-management-nearshore/), and it rests on a working pipeline, as described in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

Measure AI benefit like any other investment: baseline first, a few outcome numbers, and a date to decide. If you want help setting up those numbers for your programme, [send me a message](#contact).
