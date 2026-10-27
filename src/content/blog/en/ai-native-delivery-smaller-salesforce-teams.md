---
title: "AI-native delivery: smaller Salesforce teams"
description: "AI-native delivery shrinks Salesforce teams to pods of architect, builder-reviewer and domain lead. What changes in a manufacturer's programme organisation."
pubDate: 2026-10-27
lang: en
slug: ai-native-delivery-smaller-salesforce-teams
translationKey: smaller-teams-ai-native-delivery
topic: governance
category: architecture
tags: [ai-native delivery, programme management, team setup, ai coding, partner governance, manufacturing]
takeaways:
  - "AI-native delivery means coding agents draft, build and test, while people set the intent, review the output and own the result; teams shrink to small pods of architect, builder-reviewer and domain lead."
  - "In McKinsey's 2026 survey, 79 percent of top-accelerating organisations reported smaller squads, with the median falling from about ten people to seven."
  - "The bottleneck moves to the manufacturer: each pod needs a domain lead from service, sales or after-sales who accepts working software every day."
  - "A short intent with testable acceptance criteria replaces the long specification for most stories; SAP interfaces and warranty or pricing rules still need precise specifications."
  - "A named person owns every artifact, agents work only in sandboxes and scratch orgs, and the same pipeline gates apply to human and agent code."
faq:
  - q: "What is AI-native delivery in Salesforce projects?"
    a: "A delivery model built around coding agents from the start: agents draft stories, code, tests and runbooks, while people define the intent, review the output and own each artifact. Small pods replace the classic pyramid of many junior developers."
  - q: "Do AI-native Salesforce teams really need fewer people?"
    a: "The evidence points that way but is thin. McKinsey reports that 79 percent of top accelerators shrank their squads, median from about ten to seven, based on a self-reported survey. Measure your own cycle times before you cut a team."
  - q: "Who should be the domain lead in a pod at a manufacturer?"
    a: "Someone from the business who knows the process and may decide on it, for example a warranty specialist from after-sales or a dispatcher from field service. Plan around half of that person's time; without it, the pod builds on assumptions."
  - q: "Does a daily demo replace user acceptance testing?"
    a: "For most stories it replaces the long wait for UAT, because the domain lead accepts in the sandbox every day. Processes that post into SAP, such as credit notes for warranty claims, still need an end-to-end test before release."
draft: false
---

AI-native delivery shrinks a Salesforce team to small pods: an architect, a builder-reviewer who steers the coding agents, and a domain lead from the business. For a manufacturer the larger change sits on its own side, not with the partner. Each pod needs someone from service, sales or after-sales who decides on the process every day and accepts working software in a daily demo. Short intents replace long specifications, and a named person owns every artifact. If your organisation cannot release those people, smaller partner teams will not make the programme faster.

## What is AI-native delivery?

AI-native delivery means designing the whole delivery lifecycle around AI agents instead of adding a coding assistant to the old process. The clearest description for Salesforce comes from a practitioner, not a study: Amit Chaudhary's [ApexHours article](https://www.apexhours.com/ai-native-delivery-for-salesforce/) of 19 October 2026. In his framework agents draft, build, test and document, while people "set intent and guardrails, review output, own the outcome". He calls the alternative "the old process with faster typing".

The framework has five building blocks that matter for programme organisation:

- **Intents instead of specifications.** An intent is an outcome-first requirement: the expected outcome, why it matters, the users affected, constraints and guardrails, and success criteria.
- **Small pods instead of a pyramid.** "Swap the big pyramid of junior developers for small pods: an architect, a builder-reviewer and a domain or BA lead."
- **A daily demo instead of a status stand-up.** The team shows the product owner working software built since the day before.
- **Named ownership.** "A named human owns every artifact." Agents work only in allowlisted sandboxes and scratch orgs, never in production.
- **The same gates for everyone.** PMD, Code Analyzer and ApexGuru run in CI for human and agent code alike.

I treat ApexHours as a well-argued practice framework. It gives no team sizes and no measured results, so the numbers have to come from elsewhere.

## Why do Salesforce teams get smaller?

McKinsey surveyed 334 product and engineering leaders in May 2026 and published the results in [Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) in August. Among the top-accelerating organisations, 79 percent said their squads had shrunk, with the median falling from about ten people to seven. One global technology company moved from product pods of 8 to 10 people to agentic teams of 4 to 6 and reported roughly twice the capacity and 50 to 80 percent shorter development cycles. McKinsey sees two role families emerging: "definers who fuse product and design, and builders who fuse development, testing, and operations".

Two caveats from the same source. The figures are self-reported by leaders, and 30 percent of respondents said team productivity fell. McKinsey also writes that "Speed is improving faster than quality". DORA's 2025 report found that AI adoption still has a [negative relationship with delivery stability](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), and DORA lists [working in small batches and a user-centric focus](https://dora.dev/capabilities/) among the seven capabilities that amplify AI's benefit. Small pods with daily feedback are a direct answer to both points. How to check whether your own programme gets faster is the topic of [measuring AI productivity in Salesforce projects](../measuring-ai-productivity-salesforce-projects/).

## What changes in a manufacturer's programme organisation?

### The business side becomes the bottleneck

In a classic programme the business writes requirements, then waits weeks for UAT. In a pod, the domain lead looks at working software every day and decides on the spot. For a machine builder that means a warranty specialist from after-sales, a dispatcher from field service or someone from dealer sales who may decide on their process. In my judgement this person needs around half of their time for the pod. Heads of service rarely plan for that, and it is the first thing I would negotiate before any partner proposal.

### Intents replace most of the specification

A good intent for a dealer portal story fits on half a page: dealers see the delivery date of their spare part order without calling, measured by fewer phone enquiries; constraints are dealer-specific prices and sharing by account. McKinsey adds that specifications should be clear enough "for an agent to act on", which I read as testable acceptance criteria, not as more prose. Two things keep a precise specification: interfaces to SAP or proALPHA, because the ERP team works on its own release plan, and rules with financial effect such as warranty eligibility or price approval.

### Status meetings turn into demos

The daily demo replaces the stand-up and much of the steering report. A steering committee that sees the warranty claim form working in the sandbox needs fewer traffic lights. McKinsey lists two-day sprints as an illustrative marker. I would not copy that while SAP transports move in fixed windows; a short cycle in Salesforce with a release rhythm that matches the ERP works better.

### Ownership has to be written down

With fewer people, each one carries more knowledge, and an agent owns nothing. The named owner per artifact fits the [object ownership matrix](../salesforce-object-ownership-matrix/) I use when several partners share one org: one team owns each object, one person owns each Flow, class and agent. The pipeline gates come on top, see [quality gates for AI code in the Salesforce pipeline](../quality-gates-for-ai-code-salesforce-pipeline/).

## A typical scenario: from one large partner team to three pods

Assume a machine builder with Sales Cloud, Service Cloud, Field Service and an SAP integration. Its partner works with a classic team of twelve: one architect, one project lead, two business analysts, six developers (four of them junior) and two testers. All numbers here are assumptions to show the method. Three streams are planned: warranty claims from dealers, spare part ordering in the dealer portal, and field service work orders with spare part reservations.

The partner proposes three pods. Each pod gets an architect and a builder-reviewer from the partner; one platform and DevOps engineer serves all three. That is seven partner people instead of twelve. The domain leads come from the manufacturer: a warranty specialist, a dealer sales coordinator and a field service dispatcher, each at about half time, so 1.5 full-time equivalents the business did not give before.

Three decisions make or break this setup:

- **No domain lead, no pod.** If the head of service cannot release the dispatcher, the field service pod waits. Without daily acceptance it builds on guesses, and the demo becomes a show for the partner.
- **One lead architect across the pods.** Three pod architects would each design their own Account and Asset model. I would keep data model, sharing and the SAP interface with one architect on the client side.
- **Formal testing stays where SAP posts.** Warranty credit notes go to SAP, so that stream keeps an end-to-end test before each release. The portal stream releases after daily acceptance.

Whether seven people deliver what twelve did is an open question until cycle times are measured. The partner's price for the new setup belongs in the commercial model, see [fixed price vs time and materials](../fixed-price-vs-time-and-materials-ai/).

## Where does the pod model not fit yet?

- **Streams dominated by waiting.** If most of a story's lead time is spent waiting for the SAP team or a middleware change, a faster Salesforce pod changes little.
- **Businesses that cannot release people.** Without daily decisions from service or sales, a classic team with a product owner and planned UAT is the safer setup. Its developers can still use coding agents.
- **Teams without a working pipeline.** Pods push more changes per day. Without version control, automated tests and validation deploys, the faster pace mostly produces faster defects.
- **Thin seniority at the partner.** A pod has no juniors who learn on the side. If the builder-reviewer leaves, a large share of the knowledge leaves with them. Minimum staffing periods matter even more than in the setup I describe in [why I cap nearshore teams at eight developers](../salesforce-nearshore-teams-eight-developers/), and what changes for nearshore teams working with agents is covered in [nearshore Salesforce teams with AI agents](../nearshore-salesforce-teams-ai-agents/).

## Where should you start?

1. **Pick one stream** with a clear process, a decision maker in the business and few ERP dependencies. Dealer portal stories are often a good fit.
2. **Name the domain lead first** and get the time approved by their manager before the partner restructures.
3. **Write intents** for the first ten stories with testable acceptance criteria, and keep precise specifications for interfaces and rules with financial effect.
4. **Agree the guardrails** with the partner: named owner per artifact, agents only in sandboxes and scratch orgs, the same gates for all code. The contract side is in [partners coding with AI: contract rules](../partners-using-ai-coding-contract-rules/).
5. **Measure cycle time and rework** for three months and only then decide on the other streams.

Planning streams, team setups and the business time behind them is the core of my [programme management for Salesforce programmes](../../services/program-management-nearshore/).

Smaller Salesforce teams work when the manufacturer puts its own process experts into the pods every day. If you want to check whether your programme is ready for that, [send me a message](#contact).
