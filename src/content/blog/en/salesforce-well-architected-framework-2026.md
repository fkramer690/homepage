---
title: "Salesforce Well-Architected: What the new framework changes"
description: "Since September 2026 the Salesforce Well-Architected Framework has five pillars and an agentic lens. What changed and how to use it in your programme."
pubDate: 2026-10-23
updatedDate: 2026-10-27
lang: en
slug: salesforce-well-architected-framework-2026
translationKey: salesforce-well-architected-2026
topic: governance
categories: [architecture]
tags: [Well-Architected, Architecture, Governance, Agentforce, Cost]
takeaways:
  - "Salesforce stopped maintaining Well-Architected after Dreamforce 2024, announced its return in August 2025 and published a new framework on 14 September 2026."
  - "Three pillars (Trusted, Easy, Adaptable) became five: Trust, Reliability, Operational Excellence, Resource and Cost Optimization, and Fairness."
  - "A new Agentic Enterprise lens adds an agent variant to every pillar, and agents have to meet the same bar as any other solution."
  - "Cost is now a pillar of its own, covering licences, sandboxes and build versus buy; for clients this is the most useful change."
  - "The framework is a good shared language for design reviews with several partners, but the client still has to make the trade-offs between pillars."
faq:
  - q: "What is the Salesforce Well-Architected Framework?"
    a: "Salesforce's guidance for designing and reviewing solutions on its platform. It provides questions, patterns and a shared vocabulary and is available for free in the Salesforce Architecture Center at architect.salesforce.com."
  - q: "What are the five pillars of the new Well-Architected Framework?"
    a: "Trust, Reliability, Operational Excellence, Resource and Cost Optimization, and Fairness. Each pillar also has a variant for the Agentic Enterprise, meaning solutions with AI agents."
  - q: "What happened to Trusted, Easy and Adaptable?"
    a: "The old content moved into the five new pillars. Salesforce documents where each part went on a separate Legacy Framework Mapping page; some old areas were split across several pillars."
  - q: "Is there a tool that checks an org against Well-Architected?"
    a: "An automated org check is not part of the framework. At Dreamforce 2026 Salesforce showed an Architect Agent in the Architecture Center that answers architecture questions based on this content; Salesforce did not state availability or pricing."
  - q: "Is the Well-Architected Framework only for Agentforce?"
    a: "No. The five pillars apply to every Salesforce solution. The agentic lens adds to them for Agentforce and other AI agents and does not replace them."
---

The Salesforce Well-Architected Framework has been rebuilt: since 14 September 2026 it has five pillars instead of three, namely Trust, Reliability, Operational Excellence, Resource and Cost Optimization, and Fairness, plus a lens for solutions with AI agents. Before that, the programme had been dormant for almost a year. For CIOs and heads of CRM in manufacturing, one thing is new above all: cost and operations now have pillars of their own. That makes the framework usable as a shared standard for design reviews with several implementation partners. It does not make the trade-offs between the pillars for you.

## What happened since the relaunch?

The history is short, but it explains why the framework looks different today:

- **After Dreamforce 2024** the website stopped being updated, as [Salesforce Ben reported](https://www.salesforceben.com/salesforce-well-architected-set-to-return-community-news-and-validating-data-models/). The programme was effectively shut down.
- **On 8 August 2025** Chief Architect Emin Gerba and Christophe Coenraets announced its return on the [Salesforce blog](https://www.salesforce.com/blog/relaunching-well-architected-program/). Remarkably frank: many architects had told them that ending it was a mistake.
- **For Dreamforce 2025, from 13 October,** the reworked [Architecture Center](https://www.salesforce.com/blog/relaunching-salesforce-architecture-program/) went live, with new decision guides (for example on Data 360, event-driven architecture and asynchronous processing) and new fundamentals on Agentforce and the Agentic Enterprise. Only parts of Trusted and Adaptable in the framework itself were refreshed.
- **On 14 September 2026** Salesforce published the [new Well-Architected Framework](https://www.salesforce.com/blog/new-well-architected-framework/). According to Salesforce, hundreds of architects contributed through focus groups, surveys and community events.
- **At Dreamforce 2026**, according to [Salesforce Ben](https://www.salesforceben.com/new-well-architected-framework-and-agent-revealed-at-dreamforce-26/), Salesforce added an Architect Agent, an AI assistant in the Architecture Center grounded in this content.

So the real rebuild is the September 2026 version. The 2025 relaunch mainly put the platform around it back on its feet.

## What changed in the Well-Architected Framework?

The old framework had three pillars with eight qualities in total: Trusted (secure, compliant, reliable), Easy (intentional, automated, engaging) and Adaptable (resilient, composable). The new [framework](https://architect.salesforce.com/docs/architect/well-architected/guide/framework.html) has five pillars:

1. **Trust:** security, access, privacy, data governance and integration security.
2. **Reliability:** availability, recovery and scaling, including disaster recovery and load testing.
3. **Operational Excellence:** monitoring, DevOps, automation, incident management and continuous improvement.
4. **Resource and Cost Optimization:** code organisation, packaging, data lifecycle, performance, build versus buy, licences and sandboxes.
5. **Fairness:** accessibility, transparency, non-discrimination and AI ethics.

Salesforce did not throw the old content away; it re-sorted it. The [Legacy Framework Mapping](https://architect.salesforce.com/docs/architect/well-architected/guide/tea-pillar-mapping.html) page shows where each part went. Some examples: monitoring used to sit under Reliable and now belongs to Operational Excellence. Disaster recovery used to sit under Resilient and now belongs to Reliability. Business value and ROI used to sit under Automated and now belong to Resource and Cost Optimization. Accessibility and privacy rights sit under Fairness, while legal compliance and data residency stay with Trust. Messaging, eventing and API management moved out of the framework into the Integration Patterns.

```saeulenwechsel
before: Previously: three pillars
old: Trusted | secure, compliant, reliable
old: Easy | intentional, automated, engaging
old: Adaptable | resilient, composable
title: Well-Architected: from three to five pillars
Trust | Security < Secure | Legal, data residency < Compliant
Reliability | Availability, scaling < Reliable | Disaster recovery < Resilient
Operational Excellence | Monitoring < Reliable | Strategy, governance < Intentional | Automation < Automated | ALM, incidents < Resilient
Resource and Cost Optimization * | Performance < Reliable | ROI, maintainability < Automated, Intentional | Licences, sandboxes < 2026 framework
Fairness | Ethics, privacy rights < Compliant | Accessibility < Engaging
note: **New:** Agentic Enterprise lens for every pillar.
note: **Moved out:** messaging, eventing and APIs to the Integration Patterns.
```

What stands out is how concrete the new pages are. Two figures from them:

```kennzahlen
70% | of governor limits as the ceiling under normal load, so there is headroom for peaks
99.5% | as your own solution's target against a 99.9% platform SLA, so an error budget remains
source: Salesforce Well-Architected Framework in the Architecture Center
```

More examples from the text:

- **Disaster recovery:** define RTO and RPO per business capability, restore backups regularly, and run a full failover drill once a year for critical systems.
- **Multi-org:** only when business requirements justify the extra complexity, for example regulatory data isolation.
- **DevOps:** measure DORA metrics (deployment frequency, lead time, change failure rate, recovery time, rework rate) and check regularly whether production has drifted from what is in version control.
- **Accessibility:** test against WCAG 2.2 AA.

## What does the Agentic Enterprise lens mean?

The second big change is the Agentic Enterprise lens. It is no sixth pillar. Each of the five pillars gets a variant that describes what applies on top when AI agents decide and act on their own: permissions and audit trails for agents, handling failures when several agents are orchestrated, the Agent Development Lifecycle, token consumption and explainable decisions.

The key sentence is in the announcement blog: "Agents don't get their own rulebook." An agent has to meet the same requirements for security, stability and cost as any other solution in your org. That matches my stance from Agentforce projects: business value and data quality come before the agent. More on that in [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

## What is really new for CIOs and heads of CRM?

From the point of view of a client-side architect, three changes matter.

**Cost has its own pillar.** In the old framework cost only appeared at the edges. Now licences, sandboxes and build versus buy have a pillar of their own. That was overdue. From my pre-sales work with Salesforce I know that full licences are offered by default, even though many users do not need them. For one client that easily adds up to six figures a year. An architecture review that ignores this is incomplete.

**Operations sit next to design as equals.** Operational Excellence bundles DevOps, monitoring and incident management. That puts operations into every architecture review instead of leaving them for after go-live. Having DORA metrics in the official framework gives clients an argument with partners who still deploy by hand. Why I insist on this is in [Why DevOps matters in Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

**The framework names trade-offs.** More encryption and audit logging cost money. Higher availability costs money. More autonomy for agents raises the risk of unfair decisions. Salesforce writes: "The goal is not to maximize every pillar simultaneously." These trade-offs belong in a decision log, with the name of whoever decided.

## Where are the limits of the framework?

For all the agreement: it is still a vendor document.

- **It recommends Salesforce tools.** Shield Platform Encryption, Event Monitoring and Field Audit Trail are named as solutions. These are paid add-ons. Whether they pay off for your data belongs in the cost pillar, not automatically in the trust pillar.
- **The change log has no dates.** It lists what was published or enhanced, but not when. If you base architecture decisions on a specific recommendation, record the version with a date in your own decision log.
- **The Architect Agent is not tangible yet.** Salesforce showed it at Dreamforce but did not state availability or pricing. I would test it before trusting it with architecture questions.
- **It does not replace a decision.** The framework provides questions and patterns. Whether you need 99.5 percent availability or 99, whether you build or buy, depends on your business model and not on the document.

## How do I use the framework in a programme with several partners?

I already used the old framework with Trusted, Easy and Adaptable in client projects and presented it in user group talks.

```praxis
In my largest programme so far, more than 30 developers in 8 streams worked for 5 implementation partners in the same org. It took us about three months to settle the shared standards: naming conventions, one automation per object, test coverage rules, a matrix of which stream owns which object, and rules for what belongs in custom metadata types or custom labels. 80 percent were in place after the first round, the rest was added over the following months.
```

With the new framework I would sort these standards along the five pillars today. Naming conventions, packaging and object ownership are Resource and Cost Optimization and Operational Excellence. Permissions and integration users are Trust. The advantage: every partner knows the framework, so the discussion does not start from zero, and every deviation can be assigned to a pillar.

In practice that means:

1. **Structure design reviews by pillar.** Every partner answers the same five blocks of questions for larger changes.
2. **Log trade-offs.** Where one pillar gives way to another, it goes into the decision log with a reason.
3. **Do not treat agents separately.** Agentforce work goes through the same review, extended by the agent variant of each pillar.
4. **Take the cost pillar seriously.** Check licences and sandboxes against actual use once a year.

How I set up standards and reviews in such programmes is part of my [work on partner governance and architecture](../../services/partner-governance/).

## Where should you start?

Read the [overview in the Architecture Center](https://architect.salesforce.com/docs/architect/well-architected/guide/overview.html) and the legacy mapping if your teams still work with Trusted, Easy and Adaptable. Then check your existing development standards against the five pillars. Cost and operations are usually what is missing. The new Well-Architected Framework is a useful shared standard as long as you make the decisions yourself.
