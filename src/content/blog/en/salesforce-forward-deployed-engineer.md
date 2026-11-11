---
title: "Salesforce forward deployed engineers explained"
metaTitle: "Salesforce Forward Deployed Engineer (FDE) explained"
description: "What a Salesforce forward deployed engineer does, what it costs, when it pays off for manufacturers and what IT leaders must settle before the pod starts."
pubDate: 2026-11-11
lang: en
slug: salesforce-forward-deployed-engineer
translationKey: salesforce-forward-deployed-engineer
topic: ai
categories: [ai, architecture]
tags: [Forward Deployed Engineer, FDE, Agentforce, Implementation partner, Salesforce architect, AI agents]
takeaways:
  - "Salesforce deploys FDEs in pods: two engineers and a deployment strategist who take one Agentforce use case into production in your org."
  - "Since April 2026, partners in the FDE Partner Network provide such engineers too. Their incentives are tied to agents running in production."
  - "There is no public price. Gartner estimates FDE fees at more than 200,000 US dollars per quarter and use case."
  - "An FDE works on one use case. Decisions, standards and operations after hypercare still need an owner on the client side."
faq:
  - q: "What is a Salesforce forward deployed engineer?"
    a: "A forward deployed engineer is an engineer from Salesforce or a partner who designs, builds and takes one Agentforce use case into production directly in the client's org. FDEs also report platform limits back to Salesforce product management."
  - q: "How much does a forward deployed engineer cost?"
    a: "Salesforce publishes no price. Gartner estimates that FDE fees can exceed 200,000 US dollars per quarter and use case, For clearly scoped work, compare it with classic partner models."
  - q: "Does an FDE replace the implementation partner?"
    a: "No. An FDE pod takes one use case into production. Process design across several clouds, SAP integration, data migration and ongoing development stay with the implementation partner or your own team."
  - q: "What is the Salesforce FDE Partner Network?"
    a: "A selection of partners Salesforce announced on 15 April 2026, including Accenture, Deloitte, Capgemini and PwC. They get direct access to the product teams, and their incentives are tied to agents going into production."
draft: false
---

A Salesforce forward deployed engineer (FDE) is a developer who builds one specific Agentforce use case in a client's org and stays with it into production. FDEs are employed by Salesforce itself or, since April 2026, by a partner in the FDE Partner Network. For a manufacturer, an FDE pays off when platform limits, data or permissions are the biggest risk for a clearly scoped Agentforce use case with measurable value. An FDE does not replace the implementation partner, nor the person on the client side who prepares decisions and owns the agent after go-live.

## What is a forward deployed engineer?

The role was popularised by Palantir, where engineers worked directly with clients and built the software on site, as the [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers) describes. OpenAI, Anthropic, Google and Microsoft adopted the model for their AI products. Salesforce uses it for Agentforce and partly for Data 360.

At Salesforce, FDEs work in pods. According to the [Salesforce blog](https://www.salesforce.com/blog/fdes-back-to-build-agentforce/), a pod has two FDEs and one deployment strategist. The FDEs build agents, actions, integrations and guardrails, the limits within which an agent may act. Salesforce job ads ask for production code in Python, JavaScript, Java or Apex. The deployment strategist advises the client on the use case, the success metrics and the rollout.

A second task sets the FDE apart from a consultant. According to [Salesforce Engineering](https://engineering.salesforce.com/accelerating-agentforce-deployments-from-6-months-to-3-weeks-across-150-enterprises/), FDEs document every technical blocker and feed it into the product roadmap instead of building a one-off fix for the client. They report to product management every week. So an FDE works for your use case and for their employer's product at the same time.

## How Salesforce built its FDE model

Salesforce made its own FDE model public in 2025 and extended it to partners in 2026:

```zeitleiste
2025-07-14 | Salesforce blog by a senior FDE: agent response time cut from 15 to 3 or 4 seconds
2025-11-15 | Salesforce describes the pod model with two FDEs and one deployment strategist
2026-04-15 | Launch of the FDE Partner Network with Accenture and Deloitte as launch partners
2026-08-12 | Deloitte announces the first FDE engagement delivered by a global system integrator
2026-09-29 | Gartner warns of premium fees without delivery depth and of high abandonment rates
```

Besides Accenture and Deloitte, the [FDE Partner Network](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/) includes Capgemini, Cognizant, IBM Consulting, KPMG, PwC, Slalom, TCS and a few regional firms. The partners get a direct line to the product teams. Salesforce ties their incentives to agents going into production and describes four components: solution architecture, agent design, go-live with hypercare, and adoption and change management.

Individual partner engineers can become verified FDE practitioners. According to [diginomica](https://diginomica.com/node/31193), this takes a knowledge assessment, a two-day workshop and proof on a live client project. Salesforce named 84 partners and more than 800 verified practitioners there. What the new partner model means for your implementation partner's interests is covered in the chapter [AIforce and system integrators](../../masterclass/ai-salesforce/aiforce-and-system-integrators/) of the AI masterclass.

## What an FDE costs and who pays

Salesforce publishes no price for deploying its own FDEs. The partners have no simple answer either: according to diginomica, Accenture said FDE rates are hard to set because the people are scarce, and asked Salesforce for pricing clarity.

The only publicly stated order of magnitude comes from Gartner. According to [CIO Dive](https://www.ciodive.com/news/can-forward-deployed-engineers-fdes-fix-ai-gartner/831833/), Gartner estimates that FDE fees can exceed 200,000 US dollars per quarter and use case. It counts about 2,000 active FDEs worldwide, with demand about four times higher. Gartner also expects around 70 percent of vendor-led AI engineering efforts to be abandoned by 2028.

```hinweis achtung
Gartner warns that the label "forward deployed" is used loosely. Some providers charge premium fees without the delivery depth, programme management and change management that would justify them. Ask for agents the provider has taken into production and for the people who built them.
```

For an IT leader this means an FDE engagement is an investment in a single use case, and an expensive one. For a clearly described task without platform risk, a good implementation partner with a stable team is often cheaper and easier to plan. According to CIO Dive, clients that do not build their own engineering skills keep paying these premium rates.

## FDE, implementation partner and client-side architect

An FDE pod joins a programme in which other roles usually work already. The split then looks like this:

```tabelle
title: Who is responsible for what in an Agentforce programme
columns: Role | Works for | Delivers
Salesforce FDE pod | Salesforce | One agent in production, feedback to the product *
Partner FDE | The partner with the FDE designation | The same, embedded in the partner's delivery team
Implementation partner | The partner | Processes, integration, migration, ongoing development
Client-side architect | The manufacturer | Target architecture, standards, decisions, handover to operations *
note: The FDE pod is limited in time and to one use case. The other roles stay for the whole programme.
```

In my largest programme, five implementation partners worked with more than 30 developers in eight streams on one org. An FDE pod would have been one more party developing in the same org. It has to follow the same development standards, the same [object ownership matrix](../salesforce-object-ownership-matrix/) that defines which stream owns which object, and the same release process. Otherwise a very good team builds a very good agent that nobody can maintain and extend safely after hypercare.

This belongs to [partner governance](../../services/partner-governance/): who brings which rules, who approves, who owns the repository and the pipeline. An FDE pod changes none of that. It makes the questions more urgent, because it works fast and leaves the project after a few weeks.

## What Salesforce FDEs name as the biggest blockers

The FDE director for Agentforce summed up on the Salesforce engineering blog what slowed down rollouts at more than 150 companies. The first two points matter most, because they are organisational:

- **Decision paralysis.** AI councils and architecture boards take a long time over fundamental decisions, and governance reviews on security, compliance and observability ask for detailed scorecards. According to Salesforce, mid-sized companies decide faster.
- **Unfinished platforms.** Many orgs are in the middle of a migration, and the data is spread across systems. Whether Data 360 connects it by API or by zero copy is an architecture decision with consequences for performance and cost.
- **Too many instructions.** Clients keep adding rules to the agent's instructions, and the agent answers worse as a result. Fixed business logic belongs in flows or code, as I describe in [Agent Script: keep business rules out of the LLM](../agent-script-deterministic-rules/).
- **Missing tests.** Single-turn tests do not show whether a conversation over several steps works. Salesforce built its own framework for multi-turn tests. How to solve this in your project is covered in [Testing Agentforce agents](../testing-agentforce-agents-before-go-live/).

Salesforce says this cut rollout time from about six months to a few weeks. The method behind that figure is not disclosed. The first two blockers, however, no FDE can remove alone. If nobody has prepared the decision for the architecture board, even the best pod waits. That is also the subject of [Decision makers as the bottleneck in AI Salesforce projects](../decision-makers-bottleneck-ai-salesforce/).

## When does an FDE pay off for manufacturers?

I would base an FDE engagement on these criteria:

- **One use case with measurable value.** For example a service agent for dealer enquiries with a clear target such as resolution rate or handling time. Without a baseline and a target, the price cannot be justified.
- **The biggest risk is the platform.** The use case needs Data 360, complex permissions, new features or short response times. That is where the direct line to the product team helps most.
- **Someone takes over afterwards.** Your team or your implementation partner can develop the agent further after hypercare. Otherwise you buy a prototype with production access.
- **Decision paths are short.** Data access, permissions and approval in the architecture board can be settled in days, not months.

An FDE would not pay off when most of the effort is process design across several clouds, a deep SAP integration or data cleansing. That is work for an implementation partner over months. And if it is still open whether an agent is the right approach at all, settle that first. The criteria are in [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/)

A shorter version for CIOs is on LinkedIn: [Before Salesforce sends you forward deployed engineers, answer three questions](https://www.linkedin.com/pulse/before-salesforce-sends-you-forward-deployed-engineers-fabian-kramer-jqxde/).

## First step: settle three responsibilities before the pod starts

Before a Salesforce FDE pod or a partner FDE starts in your org, write down three names: who drives architecture board decisions on the agent within a week, who approves data access and permissions, and who owns the agent functionally and technically after hypercare. If one of these names is missing, fill the role before the start, internally or with an architect on your side, and agree with the pod which metric must be reached after 90 days.
