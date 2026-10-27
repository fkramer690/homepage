---
title: "Fixed price vs time and materials: AI in Salesforce"
description: "Does AI move Salesforce projects from time and materials to fixed price? Four commercial models, Salesforce's new partner incentives and a worked scenario."
pubDate: 2026-10-27
lang: en
slug: fixed-price-vs-time-and-materials-ai
translationKey: fixed-price-ai-salesforce-partners
topic: governance
tags: [fixed price, time and materials, partner governance, ai coding, partner program, manufacturing]
takeaways:
  - "AI pushes Salesforce work packages with testable acceptance criteria towards fixed price; discovery, undocumented ERP interfaces and support stay on time and materials."
  - "Under hourly billing a partner loses revenue for every day a coding agent saves, so pure time and materials gives partners little reason to show you the productivity gain."
  - "Since March 2026 Salesforce links partner payouts to active consumption instead of seats, and the FDE Partner Network ties incentives to agents reaching production."
  - "McKinsey found 11.8 percent average time savings but only 6.2 percent less rework, so prices should follow measured cycle times rather than a partner's claim."
  - "Outcome components work as a share of the fee, tied to a metric the manufacturer measures itself and combined with a cap on Flex Credits per transaction."
faq:
  - q: "Does AI make fixed-price Salesforce projects cheaper?"
    a: "Not automatically. A fixed price based on the old estimate passes the whole AI gain to the partner. It only gets cheaper for you if prices are renegotiated against measured effort, for example every six months."
  - q: "When is time and materials still the right model?"
    a: "For discovery, undocumented ERP or MES interfaces and production support, where nobody can estimate the effort reliably. A cap and a fixed review date keep it under control."
  - q: "What does Salesforce's new partner program reward?"
    a: "According to Salesforce's announcement of 2 March 2026, partner payouts are linked to active consumption rather than seat provisioning, and post-sales subsidies reward agent activation and consumption. The FDE Partner Network ties incentives to agents reaching production."
  - q: "Can I pay my partner per outcome for an Agentforce agent?"
    a: "Yes, as a share of the fee. Tie a part of it to a metric you measure yourself, such as the share of correct answers in a monthly sample, and keep data quality and ERP availability explicitly on your side of the contract."
draft: false
---

AI coding pushes Salesforce projects towards fixed price for work packages with clear acceptance criteria, while time and materials keeps its place for discovery and undocumented interfaces. The question behind fixed price vs time and materials is who keeps the productivity gain when a partner builds with coding agents. Under hourly billing the partner loses revenue for every day the agent saves, so it has little reason to show you the saving. Salesforce, meanwhile, now pays partners for consumption and for agents in production. I would pay for results where you can measure them and by the hour only where nobody can estimate.

## Why does AI put time and materials under pressure?

Time and materials (T&M) means you pay for the person-days actually worked, whatever the result. The model always had a weak incentive: a slower team earns more. That was tolerable because the effort for Salesforce work was fairly stable. A Flow, a Lightning page or an Apex trigger with tests took roughly the same time with any good team.

Coding agents break that stability. When a developer has Claude Code or Agentforce Vibes draft the Apex class, the test class and the deployment manifest, the build step can shrink a lot. Under T&M the partner then bills fewer days and earns less. Every incentive points towards using the agent quietly and billing as before. I do not assume bad intent here. I assume a business model that punishes honesty.

How large the gain really is remains open, and that matters for pricing. McKinsey's [survey of 334 product and engineering leaders](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) from August 2026 found 11.8 percent average time savings across the development life cycle, but only 6.2 percent less rework, and 30 percent reported that team productivity had fallen. METR's [randomised study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) measured experienced developers as 19 percent slower with AI in early 2025; its [February 2026 update](https://metr.org/blog/2026-02-24-uplift-update/) points to a speed-up but calls its own data "an unreliable signal". Before you renegotiate on a partner's claim, measure it yourself, as described in [measuring AI productivity in Salesforce projects](../measuring-ai-productivity-salesforce-projects/).

So the gain is real for some tasks and uncertain on average. A commercial model has to settle who carries that uncertainty.

## What changed in Salesforce's partner incentives?

Your partner has two sources of income: your invoices and Salesforce. The second one changed in 2026.

- **New partner program, 2 March 2026.** Salesforce [rebuilt its consulting track](https://www.salesforce.com/news/stories/rewarding-value-through-new-salesforce-partner-program/) around two tiers, Summit and Select, and links partner payouts "to active consumption rather than seat provisioning". Post-sales implementation subsidies reward "agent activation and consumption". Salesforce targets $1 billion in revenue from partner incentives. The announcement gives no start date.
- **Forward Deployed Engineer (FDE) Partner Network, 15 April 2026.** An [exclusive group](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/) with Accenture and Deloitte as launch partners, selected for production outcomes and industry depth, manufacturing included. Incentives are tied "to agents reaching production".

Salesforce's own pricing moves the same way. The [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) lists Help Agent Resolutions at 400 credits in production and none in a sandbox, which is $2 per resolution at [$500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/). Forrester [describes the Agentic Enterprise License Agreement (AELA)](https://www.forrester.com/blogs/ai-agents-become-economic-actors-salesforce-rewrites-the-rules-of-pricing) as unlimited use of Agentforce, Data 360 and MuleSoft for a fixed fee over two or three years.

For a manufacturer this has two sides. A partner paid at go-live has less interest in pilots that never reach production. A partner rewarded for consumption has no interest in keeping the number of agent actions per dealer enquiry low. I would ask every partner which Salesforce incentives a project triggers. The incentives are legitimate, but they explain why a proposal looks the way it does.

## Four commercial models and where they fit

| Model | You pay for | Who keeps the AI gain | Fits in manufacturing |
|---|---|---|---|
| Time and materials | person-days worked | you, if the partner reports honestly | discovery, undocumented ERP or MES interfaces, production support |
| Fixed price per work package | an accepted result | the partner | dealer portal forms, warranty claim intake, Flows and Apex with testable criteria |
| Price catalogue per story size | stories sized S, M or L | shared, if you reprice regularly | continuous change after go-live |
| Outcome component | a measured business result | shared | agents with a metric you measure yourself |

**Fixed price needs a specification you can test.** "A dealer submits a warranty claim with serial number, fault code and photos; the claim is checked against the warranty start date of the asset and passed to SAP for the credit note" can be accepted. "Improve dealer service" cannot. AI makes building cheaper; it does nothing for an unclear requirement. Under German law, [CMS points out](https://cms.law/de/deu/legal-updates/meilensteine-und-abnahme-in-it-projekten) that software development is often treated as a contract for work with formal acceptance, while a service contract, the usual form of T&M, has no statutory acceptance. That difference is what moves risk to the partner.

**A price catalogue suits run and change.** You agree prices per story size once, the partner profits from every efficiency, and you get predictable costs. The catch: review the catalogue every six months against measured cycle times, or the partner keeps the gain forever.

**Outcome components work as a share, not as the whole fee.** No partner controls your asset data, the availability of your SAP system or how many dealers use the portal. A fee that depends entirely on adoption is a gamble for both sides. In my view, 10 to 20 percent of the fee tied to a metric is a range worth discussing.

**Who pays for tokens belongs in the price.** McKinsey estimates that tokens, compute, infrastructure and AI operations can reach up to 20 percent of existing labour costs. Under fixed price the partner carries them; under T&M the contract has to say who does. The numbers are in [what AI coding costs in a Salesforce project](../ai-coding-costs-salesforce-project/).

## A typical scenario: renewing a framework contract

Assume a machine builder with Sales Cloud, Service Cloud, Field Service and SAP. It works with one implementation partner on a framework contract of 600 person-days a year at €1,100 per day, €660,000 in total. At renewal the partner says its team now builds with coding agents and wants to keep the day rate. All figures are assumptions to show the method.

Three work packages are planned for next year.

**Warranty claim form in the dealer portal.** The SAP interface for credit notes exists and the rules are documented. Classic estimate: 45 person-days, €49,500. The partner expects about 30 days with agents. Under T&M you would pay €33,000, and the partner loses €16,500 of revenue for being honest. A fixed price of €49,500 lets the partner keep everything. I would offer a fixed price of around €41,000: the partner earns about €1,370 per day actually worked, you save 17 percent, and acceptance follows written test cases.

**Spare part data from a subsidiary's legacy system.** Nobody knows the data model and there is no API documentation. Any fixed price would hide a large risk premium. I would buy ten days of discovery on T&M with a cap, then fix the price for the build once the interface is understood.

**Agent for dealer questions on spare part availability.** Fixed price up to go-live, plus a variable 15 percent paid after three months if a monthly sample of 50 answers is at least 90 percent correct. The machine builder owns the measurement and the spare part master data; the partner owns prompts, actions and tests. A cap on Flex Credits per answered enquiry protects against an agent that grows expensive while the partner is rewarded for consumption.

The day rate stays the same. What changes is that the partner earns more by working faster instead of losing revenue.

## Where should you start?

1. **Sort the backlog** into packages with testable acceptance criteria, discovery work and continuous change. Each type gets its own model.
2. **Measure a baseline** of cycle time and rework before you renegotiate, so you price on data instead of claims.
3. **Ask for disclosure** of the coding agents in use and of the Salesforce incentives the project triggers. The contract clauses for AI use are covered in [partners using AI coding: contract rules](../partners-using-ai-coding-contract-rules/).
4. **Agree who pays** for tokens and Flex Credits in development, sandbox tests and production.
5. **Review prices every six months** against measured numbers. Smaller AI-native teams change the cost base as well, see [AI-native delivery with smaller Salesforce teams](../ai-native-delivery-smaller-salesforce-teams/).

Setting up these commercial rules is part of my work in [partner governance](../../services/partner-governance/), on the client side and without a stake in any partner's revenue.

Fixed price for what you can test, hours for what nobody can estimate and a measured share for outcomes is the mix I would put into the next framework contract. If you want a second opinion on a partner proposal, [send me a message](#contact).
