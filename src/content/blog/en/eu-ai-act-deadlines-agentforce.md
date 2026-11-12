---
title: "EU AI Act deadlines: what they mean for Agentforce"
description: "Regulation (EU) 2026/1744 moves high-risk duties to 2027 and 2028. Which AI Act rules already apply to Agentforce in industry and which agents are high-risk."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: eu-ai-act-deadlines-agentforce
translationKey: eu-ai-act-agentforce-deadlines
topic: security
categories: [ai]
tags: [eu ai act, agentforce, compliance, ai agents, manufacturing, governance]
takeaways:
  - "Since 2 August 2026, people chatting with an Agentforce agent must be told at the first interaction that it is AI, unless that is obvious (Art. 50)."
  - "Regulation (EU) 2026/1744 moves high-risk obligations to 2 December 2027 for Annex III and to 2 August 2028 for AI in products under Annex I."
  - "An agent that ranks applicants or assigns work based on personal traits can be high-risk, and configuring it can make you its provider (Art. 3 or 25)."
  - "AI requirements under the Machinery Regulation come through delegated acts that apply by 2 August 2028. They concern the machine, not the CRM agent."
  - "Deployers of high-risk systems must keep logs for at least six months and inform workers and their representatives before use. Not legal advice."
faq:
  - q: "Is an Agentforce service agent a high-risk AI system under the EU AI Act?"
    a: "As a rule, no. An agent that answers questions about order status, delivery dates or spare parts is not on the Annex III list. It is a transparency case under Art. 50(1): people must be told at the start that they are talking to an AI. Have your legal team confirm the classification."
  - q: "Does Art. 50 apply in B2B, for example in a dealer portal?"
    a: "Usually yes, as I read the Commission's FAQ. The duty depends on whether the agent communicates directly with a natural person, and a dealer's employee in a chat is a natural person, unless it is already obvious that the system is AI. Agents that only work in the background and never talk to a person are outside Art. 50(1)."
  - q: "When do the high-risk obligations of the AI Act apply?"
    a: "According to the consolidated Art. 113, they apply from 2 December 2027 for stand-alone high-risk systems under Annex III and from 2 August 2028 for AI in products under Annex I. Systems already in use before those dates are generally covered only once they change significantly (Art. 111(2)). Transparency under Art. 50 has applied since 2 August 2026."
  - q: "Is Salesforce or my company responsible for an agent under the AI Act?"
    a: "Both have roles, and the split is not settled. Salesforce provides the platform; you deploy the agents you configure, and if you define an agent's purpose and put it into service under your name, you may be its provider under Art. 3. If you give a system a purpose that makes it high-risk, Art. 25 can also make you the provider. Salesforce itself urges customers to consult their own legal counsel."
  - q: "What does the Machinery Regulation change mean for machine builders?"
    a: "According to Cuatrecasas, machinery moves to section B of Annex I, and the substantive high-risk requirements for AI in machines will be introduced through delegated acts that apply by 2 August 2028 at the latest. That is a topic for product engineering, separate from CRM agents."
draft: false
---

The EU AI Act deadlines that Regulation (EU) 2026/1744 postponed matter less for most Agentforce projects in manufacturing than the one that has already passed. Since 2 August 2026, Art. 50 requires that people chatting with an AI agent know it is an AI, unless that is obvious, and in my reading a dealer service agent falls under that requirement. The new high-risk dates, 2 December 2027 for Annex III and 2 August 2028 for Annex I, affect you only if an agent helps decide about applicants or employees, or if AI is a safety component of a machine. This is my reading as an architect, not legal advice.

## What did Regulation (EU) 2026/1744 change?

According to [White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act), the regulation, known as the Digital Omnibus on AI, was published in the Official Journal on 24 July 2026 and entered into force on 27 July. It defers the high-risk obligations in Chapter III, where most of the compliance work lies. The consolidated [Art. 113](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-113) on the Commission's AI Act Service Desk gives the dates below; the date of 2 December 2026 for machine-readable marking comes from the [Commission's FAQ on Art. 50](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act):

```zeitleiste
2026-08-02 | Transparency under Art. 50: chatbots (provider), deepfakes and certain published text (deployer)
2026-12-02 | Machine-readable marking under Art. 50(2) for generative systems on the market before 2 August 2026
2027-12-02 | High-risk systems under Annex III, stand-alone uses such as recruitment and workforce management
2028-08-02 | High-risk systems under Annex I, AI in regulated products
```

White & Case stresses that the deferral is limited to Chapter III and does not cover transparency. The AI literacy duty in Art. 4 was softened: providers and deployers now take measures that support their staff's AI literacy instead of ensuring a sufficient level of AI literacy.

## Who is provider and who is deployer in an Agentforce project?

The AI Act assigns duties by role. Under [Art. 3](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-3), a provider develops an AI system, or has it developed, and places it on the market or puts it into service under its own name. A deployer uses an AI system under its authority in a professional context. Salesforce provides the platform and you as the manufacturer deploy the agents you configure in your org. It remains unclear exactly where the line is drawn: if you define an agent's purpose, instructions, actions and channel and put it into service under your own name, you may already be its provider under Art. 3.

[Art. 25(1)](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-25) shifts that split: a deployer becomes a provider if it puts its own name on a high-risk system, modifies one substantially, or changes the intended purpose of a system so that it becomes high-risk. Agentforce is a general platform; if you configure an agent that ranks job applicants, you arguably create that high-risk purpose yourself, either directly under Art. 3 or through Art. 25, and assume the provider duties of Art. 16 with it. Salesforce's [AI literacy guide](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/guides/ai-literacy-and-compliance.pdf) from May 2025 urges customers to consult their own legal counsel. I would take that literally: your legal team should classify your agents.

## A dealer chat agent is a transparency case

Most Agentforce agents at manufacturers answer questions from dealers, customers or service partners about orders, delivery dates, spare parts or appointments. None of that is on the Annex III list. These agents fall under Art. 50(1), applicable since 2 August 2026.

According to the Commission's FAQ, the duty applies when the system is AI, is built for a two-way exchange, communicates directly, and the other party is a natural person. A purchasing clerk at a dealer is a natural person, so as I read the FAQ, B2B does not take you outside the scope of Art. 50(1). An agent that only classifies cases in the background is not covered; one that answers the dealer is. The notice has to come at the start of the first interaction, clearly and accessibly. Art. 50(1) exempts AI that is obvious to a reasonably well-informed, observant person in the context, but that exception is to be read restrictively, so I would not rely on a robot icon. The FAQ names fines of up to 15 million euros or 3 percent of worldwide annual turnover, whichever is higher, with lower caps for small and mid-sized companies.

Formally, Art. 50(1) is a provider duty. The FAQ does not resolve whether that means Salesforce or you in this setup; in practice, the agent's welcome message is configured in your org. My recommendation: put the disclosure there, in every portal language. Salesforce's [Trailhead module on guardrails and trust patterns](https://trailhead.salesforce.com/content/learn/modules/trusted-agentic-ai/explore-agentforce-guardrails-and-trust-patterns) also recommends clear rules for handing off to a human (good practice rather than an Art. 50 duty) and lists the [Einstein Trust Layer](/en/blog/einstein-trust-layer-what-it-protects/) audit trail among its implementation best practices.

```hinweis offen
The machine-readable marking under Art. 50(2) is a provider duty for generative output; ask Salesforce in writing how it covers its features.
```

The labeling of published text under Art. 50(4) concerns information to the public on matters of public interest, not a delivery date for a dealer.

## When does an Agentforce agent become high-risk?

Annex III lists stand-alone high-risk uses. In a manufacturer's Salesforce org, point 4 on employment is the one to watch. The Commission's [Service Desk page on employment](https://ai-act-service-desk.ec.europa.eu/en/node/464) separates the cases:

- **In scope, 4(a) recruitment:** ranking candidates, scoring applicant answers, targeted job ads.
- **In scope, 4(b) work relationships:** assigning shifts or on-call windows based on worker performance, evaluating performance.
- **Exempt under Art. 6(3):** scheduling interviews, acknowledgment emails, organizing CV data, as narrow procedural or preparatory tasks.
- **Never exempt:** systems that profile natural persons.

The field service angle is easy to miss. 4(b) covers allocating tasks based on individual behavior or personal traits. Assigning jobs by certified skill, territory and availability is not automatically high-risk, but skills are personal characteristics, so this requires the same assessment. Ranking technicians by first-time fix rate and assigning work accordingly comes close to allocating tasks based on individual behavior, although whether a rule-based optimizer is an AI system at all is a separate question. I discuss how the engine decides in [scheduling automation in Field Service](/en/blog/salesforce-field-service-scheduling-automation/).

If an agent is high-risk, [Art. 26](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26) gives you, as a deployer, concrete duties from 2 December 2027: use it according to the provider's instructions, assign human oversight to competent people with authority, check the input data you control, monitor operation, keep automatically generated logs for at least six months unless other legislation provides otherwise, and inform workers' representatives and affected workers before use. In Germany, the works council is involved much earlier anyway; I discuss that path in [AI coding tools, works council and GDPR](/en/blog/ai-coding-tools-works-council-gdpr/).

## Annex I concerns the machine, not the CRM agent

Annex I covers AI in products under EU harmonization law. For machine builders, [Cuatrecasas](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published) reports the key change: the Machinery Regulation (EU) 2023/1230 moves from section A to section B of Annex I. Only a few AI Act provisions then apply directly to AI in machinery. The substantive high-risk requirements are to be added to the Machinery Regulation through delegated acts, which are to apply by 2 August 2028 at the latest. Until those delegated acts or the corresponding harmonized standards exist, manufacturers can, according to Cuatrecasas, keep referring to the harmonized standards or common specifications adopted under the AI Act to show a presumption of conformity.

Under [Art. 6(1)](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6), an Annex I system is high-risk only if two conditions are met: the AI is a safety component of the product or the product itself, and the product needs a third-party conformity assessment under its sector law. This concerns AI in machine control or safety functions and belongs with product engineering and the legal team, not with your Agentforce agents. The new [Art. 6(1a)](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6) also states that AI systems "solely used for non-safety related aspects of user assistance" are not safety components. Art. 6(1b) takes precedence: AI whose failure or malfunctioning would endanger health and safety is a safety component. A CRM agent that suggests a spare part to a technician is, in my reading, user assistance in that sense, as long as its advice is not part of a safety-critical maintenance step.

## Example: four AI ideas at a machine builder

Assume a machine builder with SAP, Service Cloud, Field Service with 60 technicians and a portal for 250 dealers. All details are assumed. The AI steering group asks which AI Act date applies to four ideas.

**Dealer service agent in the portal.** It answers order status and delivery dates. This is a transparency case under Art. 50(1), due since 2 August 2026. The action now is to add disclosure in the welcome message in all portal languages, provide a handoff on request, and add a test case that checks the disclosure, as described in [testing Agentforce agents before go-live](/en/blog/testing-agentforce-agents-before-go-live/).

**Technician assignment by performance score.** Field service wants complex jobs to go to the technicians with the best fix rate. This may fall under Annex III 4(b) from 2 December 2027 and is a works council topic today. My recommendation: assign by certified skills and availability, and keep performance data out of dispatch.

**Applicant pre-screening for service technicians.** HR wants an agent that ranks applications. This is clearly Annex III 4(a), and under Art. 25 the company likely becomes the provider. The alternative is an agent that only schedules interviews and sends acknowledgements, both listed among the Art. 6(3) exceptions.

**Condition monitoring in the next machine generation.** Product engineering embeds a model that detects wear. Annex I applies only if it acts as a safety component and the machine needs third-party conformity assessment; pure maintenance support could fall under Art. 6(1a), unless its failure would endanger health and safety under Art. 6(1b). Either way, this is a workstream for product engineering, outside the CRM program.

One idea needs Art. 50 compliance before launch, two should be redesigned to stay out of high-risk, and one belongs to another team.

## List every agent in the org

1. **List every agent** and AI feature in the org, with purpose and the people it talks to.
2. **Classify each one** by role, as provider or deployer, and by category: transparency, Annex III, Annex I or none.
3. **Fix Art. 50 now** for every agent that talks to people.
4. **Design HR and workforce use cases** so that they fit the Art. 6(3) exceptions where possible, and plan for Art. 26 where they do not.
5. **Check log retention** of agent sessions and the Trust Layer audit trail against the six-month requirement in Art. 26; you configure the retention period, and whether the content suffices as Art. 26 logs is a legal question.
6. **Document the AI Act roles you have assessed** and agree on cooperation and evidence duties in the contracts with Salesforce and your implementation partner.
7. **Get legal sign-off** on the classification before go-live.

Where the classification shapes the architecture, for example which decision needs a human approval step, I support the client side as part of [Salesforce architecture](/en/services/salesforce-architecture/). Whether Agentforce is the right starting point at all is covered in [Agentforce for manufacturers: start now or wait?](/en/blog/agentforce-yes-or-no-manufacturers/), and chapter 9 of the [AI masterclass](/en/masterclass/ai-salesforce/teamwork-and-delivery/) puts the AI Act alongside works council and GDPR.
