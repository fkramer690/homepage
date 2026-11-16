---
title: "Fixed price vs time and materials: AI in Salesforce"
description: "Does AI move Salesforce projects from time and materials to fixed price? Four commercial models, Salesforce's new partner incentives and a worked scenario."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: fixed-price-vs-time-and-materials-ai
translationKey: fixed-price-ai-salesforce-partners
topic: governance
categories: [architecture, ai]
contactBrief: partner-governance
tags: [fixed price, time and materials, partner governance, ai coding, partner program, manufacturing]
takeaways:
  - "Under hourly billing a partner bills fewer days for every day a coding agent saves, so you only see the gain if it shows up in time records or extra scope."
  - "Salesforce announced consumption-linked payouts for its consulting track in March 2026, and its FDE Partner Network ties incentives to agents in production."
  - "In a McKinsey survey, leaders reported 11.8 percent time savings but only 6.2 percent less rework, so base pricing on your own measured effort, not on claims."
  - "Outcome components work as a share of the fee, tied to a metric the manufacturer measures itself and capped in the consumption unit your contract uses."
faq:
  - q: "Does AI make fixed-price Salesforce projects cheaper?"
    a: "Not automatically. A fixed price based on the old estimate passes the whole AI gain to the partner. You only save money if prices are reviewed against measured effort, for example every six months."
  - q: "When is time and materials still the right model?"
    a: "For discovery, undocumented ERP or MES interfaces and production support, where nobody can estimate the effort reliably. A cap and a fixed review date keep it under control."
  - q: "What does Salesforce's new partner program reward?"
    a: "According to Salesforce's announcement of March 2, 2026, the reworked consulting track links partner payouts to active consumption rather than seat provisioning, and post-sales subsidies reward agent activation and consumption. Which incentives apply depends on the partner's eligibility. The FDE Partner Network ties incentives to agents reaching production."
  - q: "Can I pay my partner per outcome for an Agentforce agent?"
    a: "Yes, as a share of the fee. Tie part of the fee to a metric you measure yourself, such as the share of correct answers in a defined monthly sample, and document which dependencies, such as master data and ERP availability, each side is responsible for."
draft: false
---

AI coding pushes Salesforce projects toward fixed price for work packages with clear acceptance criteria, while time and materials keeps its place for discovery and undocumented interfaces. The question behind fixed price vs time and materials is who keeps the productivity gain when a partner builds with coding agents. Under hourly billing the partner bills fewer days for every day the agent saves, so the gain only reaches you if you can see it. Salesforce has also announced incentives for eligible partners tied to consumption and to agents in production. I would pay for results when they can be measured, by the hour when nobody can estimate the effort.

## Why does AI put time and materials under pressure?

Time and materials (T&M) means you pay for the person-days worked, whatever the result. The model has always created a poor incentive: a slower team earns more. That was tolerable as long as you could compare similar tasks in the same org over time, even though effort always depended on org complexity, technical debt, integrations and requirement quality.

Coding agents break that stability. When a developer has Claude Code or Agentforce Vibes draft the Apex class, the test class and the deployment manifest, the build step can shrink a lot. Under T&M the partner then bills fewer days, or uses the freed capacity for more stories from your backlog. You only capture the gain if the saved effort is visible in time records or is converted into additional scope delivered. I do not assume bad intent here. I see an information gap that the commercial model has to close.

The size of the gain remains uncertain, and that matters for pricing. McKinsey's [survey of 334 product and engineering leaders](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) published in August 2026 (fielded in May) shows what respondents themselves reported across the development life cycle:

```kennzahlen
11.8 % | average time savings
6.2 % | less rework
30 % | reported that team productivity fell
source: McKinsey, survey of product and engineering leaders (334 overall, 173 director level and above), self-reported, August 2026
```

METR's [randomized study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) measured experienced developers as 19 percent slower with AI in early 2025; its [February 2026 update](https://metr.org/blog/2026-02-24-uplift-update/) points to a speed-up but calls its own data "an unreliable signal". Before you renegotiate based on a partner's claim, measure it yourself, as described in [measuring AI productivity in Salesforce projects](/en/blog/measuring-ai-productivity-salesforce-projects/).

So the gain is real for some tasks and uncertain on average. A commercial model has to settle who carries that uncertainty.

## What changed in Salesforce's partner incentives?

Your partner has two sources of income: what it invoices you and what it receives from Salesforce. The second one changed in 2026.

- **New partner program, March 2, 2026.** Salesforce [reworked its consulting track](https://www.salesforce.com/news/stories/rewarding-value-through-new-salesforce-partner-program/) around two tiers, Summit and Select, and links partner payouts "to active consumption rather than seat provisioning". Post-sales implementation subsidies reward "agent activation and consumption". Salesforce says it is "targeting $1 billion in revenue from partner incentives". The announcement gives no start date, and which incentives a partner receives depends on its eligibility.
- **Forward Deployed Engineering (FDE) Partner Network, April 15, 2026.** The FDE Partner Network is an [exclusive group](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/) with Accenture and Deloitte as launch partners, selected for production outcomes and industry depth, including manufacturing. Incentives are tied "to agents reaching production".

Salesforce's own pricing moves the same way. The [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) of November 3, 2026 lists the usage type Help Agent Resolutions at 400 credits in production and zero in a sandbox, which is $2 per resolution at the US list price of [$500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/) as of November 9, 2026. Other usage types, such as actions, still count in a sandbox. Salesforce describes the [Agentic Enterprise License Agreement (AELA)](https://www.salesforce.com/pricing/flexible-buying-models/) as a fixed price for a fixed term with unlimited access to its consumption services and no overages.

For a manufacturer this has two sides. A partner paid at go-live has less interest in pilots that never reach production. Consumption-oriented incentives can conflict with your goal of keeping the number of agent actions per dealer enquiry low; whether they do depends on the partner's eligibility and the specific incentive. I would ask every partner which Salesforce incentives a project triggers. The incentives are legitimate, but they explain why a proposal looks the way it does.

## Four commercial models and where they fit

| Model | You pay for | Who keeps the AI gain | Fits in manufacturing |
|---|---|---|---|
| Time and materials | person-days worked | you, if saved effort shows up in time records or extra scope | discovery, undocumented ERP or MES interfaces, production support |
| Fixed price per work package | an accepted result | the partner | dealer portal forms, warranty claim intake, Flows and Apex with testable criteria |
| Price catalog per story size | stories sized S, M or L | shared, if you reprice regularly | continuous change after go-live |
| Outcome component | a measured business result | shared | agents with a metric you measure yourself |

**Fixed price needs a specification you can test.** "A dealer submits a warranty claim with serial number, fault code and photos; the claim is checked against the warranty start date of the asset and passed to SAP for the credit note" can be accepted. "Improve dealer service" cannot. AI makes building cheaper; it does nothing to clarify an unclear requirement. Under German law, [CMS points out](https://cms.law/de/deu/legal-updates/meilensteine-und-abnahme-in-it-projekten) that software development is often treated as a contract for work with formal acceptance, while a service contract has no statutory acceptance. The pricing model does not determine the contract type: what matters is whether a specific result or diligent work is owed, and a service contract can also include tests and approvals. Have your lawyer draft this; this is not legal advice.

**A price catalog is suitable for run-and-change work.** You agree on prices per story size once, the partner profits from every efficiency, and you get predictable costs. One condition applies: review the catalog every six months against measured effort, or the partner keeps the gain forever. Cycle time alone is a poor basis, because it includes waiting for your business stakeholders, test data and approvals. Look at active work time, rework, defects after acceptance and package size separately.

**Outcome components work as a share of the fee, not as the entire fee.** No partner controls your asset data, the availability of your SAP system or how many dealers use the portal. A fee that depends entirely on adoption is a gamble for both sides. In my view, 10 to 20 percent of the fee tied to a metric is a range worth discussing.

**The price must specify who pays for tokens.** McKinsey estimates that tokens, compute, infrastructure and AI operations can reach up to 20 percent of existing labor costs. They stay with whichever party the contract assigns them to, under fixed price as well as under T&M. If a partner uses Agentforce Vibes in your org, it can consume your Flex Credits. The numbers are in [what AI coding costs in a Salesforce project](/en/blog/ai-coding-costs-salesforce-project/).

## Worked example: renewing a framework contract

Assume a machine builder with Sales Cloud, Service Cloud, Field Service and SAP. It works with one implementation partner on a framework contract of 600 person-days a year at $1,100 per day, $660,000 in total. At renewal, the partner says its team now builds with coding agents and wants to keep the day rate. All figures are hypothetical and are included only to show the method.

Three work packages are planned for next year.

**Warranty claim form in the dealer portal.** The SAP interface for credit notes exists and the rules are documented. Conventional estimate: 45 person-days, $49,500. The partner expects the work to take about 30 days with agents. Under T&M you would pay $33,000, and the partner loses $16,500 of revenue for being honest. A fixed price of $49,500 lets the partner keep everything. I would offer a fixed price of around $41,000: the partner's effective revenue rises to about $1,370 per day if it delivers in 30 days, you save 17 percent, and acceptance is based on written test cases.

**Spare part data from a subsidiary's legacy system.** Nobody knows the data model and there is no API documentation. Any fixed price would hide a large risk premium. I would contract ten days of discovery under T&M with a cap, then fix the price for the build once the interface is understood.

**Agent for dealer questions on spare part availability.** Use a fixed price up to go-live, plus a variable 15 percent paid after three months if a monthly random sample of answers is at least 90 percent correct, as an illustration. The contract has to define what counts as correct, which errors are critical (a wrong availability promise, for example), the minimum sample size and who rates disputed cases. The machine builder owns the measurement and the spare part master data; the partner owns prompts, actions, tests, error handling and monitoring for stale or missing data. A cap on the consumption unit per answered enquiry, whether Flex Credits or resolutions depending on your buying model, protects you from an agent that keeps getting more expensive.

The T&M day rate stays at $1,100 for discovery and support. What changes is that on fixed-price packages the partner earns more by working faster instead of losing revenue.

## Sort the backlog by type of work

1. **Sort the backlog** into packages with testable acceptance criteria, discovery work and continuous change. Each type gets its own commercial model.
2. **Measure a baseline** of active work time and rework before you renegotiate, so you price on data instead of claims.
3. **Ask for disclosure** of the coding agents in use and of the Salesforce incentives the project triggers. The contract clauses for AI use are covered in [partners using AI coding: contract rules](/en/blog/partners-using-ai-coding-contract-rules/).
4. **Agree who pays** for tokens and Flex Credits in development, sandbox tests and production.
5. **Review prices every six months** against measured numbers. Smaller AI-native teams change the cost base as well, see [AI-native delivery with smaller Salesforce teams](/en/blog/ai-native-delivery-smaller-salesforce-teams/).

Setting up these commercial rules is part of my work in [partner governance](/en/services/partner-governance/), on the client side and without a stake in any partner's revenue. For the baseline in point 2, about 20 comparable stories from your ticket system provide an initial indication, once you group them by type and size and separate active work from waiting time.
