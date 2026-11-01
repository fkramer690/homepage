---
title: "Teamwork and delivery with AI in Salesforce programmes"
description: "How roles, workflow, review gates, metrics and co-determination change when your Salesforce team works with coding agents, and what to settle first."
lang: en
slug: teamwork-and-delivery
translationKey: masterclass-09
chapter: 9
short: "Teamwork and delivery"
summary: "How manufacturers set up roles, review gates, metrics and works council approval when partners and in-house teams deliver with coding agents."
takeaways:
  - "With coding agents, the bottleneck moves from writing code to verification and business acceptance. That is where manufacturers should plan capacity."
  - "According to a 2026 McKinsey survey, teams save 11.8 percent of time but cut rework by only 6.2 percent, and 30 percent report falling productivity."
  - "Every agent-generated change needs a named human owner, fixed review gates with clear decision makers and a written Definition of Done."
  - "According to CMS, AI systems generally trigger co-determination under section 87(1) no. 6 BetrVG. Coding agents with per-person statistics qualify."
  - "Regulation (EU) 2026/1744 moves the AI Act's high-risk obligations to December 2027 and August 2028. Coding assistants are mostly not affected."
articles: [smaller-teams-ai-native-delivery, measuring-ai-benefit-salesforce-projects, nearshore-teams-with-ai-agents, partners-ai-coding-sow-rules, ai-coding-works-council-gdpr, eu-ai-act-agentforce-deadlines]
faq:
  - q: "Does a Salesforce team get smaller with coding agents?"
    a: "Often, yes. In McKinsey's 2026 survey, 79 percent of top accelerators reported smaller squads, with the median falling from about ten people to seven. For manufacturers the business share grows instead, because someone from service or sales has to accept work every day."
  - q: "Who approves AI-generated code in a Salesforce project?"
    a: "A named person, never the agent. I recommend one code owner per pull request, the automated checks in the pipeline and business acceptance by the domain lead. Code reaches production only through the pipeline, approved by the release manager."
  - q: "Does a German works council have to approve coding agents?"
    a: "As a rule, yes. According to CMS, the objective possibility of monitoring performance or behaviour is enough; no intent is required. Without consent or a conciliation committee ruling, the employer may not introduce the system. This is not legal advice."
  - q: "How do I measure whether AI makes my Salesforce programme faster?"
    a: "With cycle time per story, defect escape rate, rework and the DORA metrics, measured against a baseline from before the tools arrived. Self-reports do not work: in the METR study developers were 19 percent slower and believed they were 20 percent faster."
draft: false
---

When coding agents write code in a Salesforce programme, writing becomes cheap and verification becomes expensive. Teamwork and delivery with AI therefore come down to smaller teams with clear roles, a named person who owns every change, fixed review gates up to business acceptance, and metrics measured against a baseline. For manufacturers the biggest change sits on their own side. Service, sales or after-sales have to decide and accept work every day, and the works council and data protection come before the pilot, not after it.

## The bottleneck moves from writing to verification

Three sources describe the same pattern from different angles. The most detailed description for Salesforce comes from a practitioner: on 19 October 2026 Amit Chaudhary outlined "AI-native delivery" on [ApexHours](https://www.apexhours.com/ai-native-delivery-for-salesforce/), a delivery process built around AI agents from day one. It is a practice framework without measured data; the numbers come from McKinsey and DORA.

| Dimension | ApexHours (practitioner source, Oct 2026) | McKinsey (survey, Aug 2026) | DORA (2025) |
|---|---|---|---|
| Basis | Practice framework for Salesforce | 334 product and engineering leaders, May 2026 | nearly 5,000 respondents |
| Team | small pods: architect, builder-reviewer, domain or BA lead | 79 % of top accelerators with smaller squads, median from about 10 to 7 | no team size |
| Bottleneck | review and ownership | 11.8 % time saved, but only 6.2 % less rework | AI raises throughput, still hurts stability |
| Process | intent instead of specification, daily demo, same gates for people and agents | redesign the workflow before adding AI: more than twice as likely to gain over 20 % | small batches, version control, platform engineering |
| Measurement | cycle time, defect escape, rework, share of AI work accepted | 86 % of top accelerators track outcomes rather than adoption | DORA metrics |

Sources: [McKinsey: Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle), [DORA Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), [DORA capabilities](https://dora.dev/capabilities/).

McKinsey's figures temper expectations. Only 25 percent of director-level and above respondents report meaningful acceleration, and 30 percent of respondents say productivity fell. About 80 percent of engineers gain around 3 percent on average, the top 20 percent around 55 percent. DORA puts it this way: "AI doesn't fix a team; it amplifies what's already there."

For a manufacturer's Salesforce programme I read this as follows: if you only buy coding agent licences, you get faster code and the same queue in front of review, integration testing with SAP and acceptance by the service team. What has to change in the organisation is covered in [AI-native delivery: smaller Salesforce teams](../../../blog/ai-native-delivery-smaller-salesforce-teams/).

## Which roles does a Salesforce team with coding agents need?

Roles get broader and accountability gets sharper. ApexHours sums up the governance in one sentence: "A named human owns every artifact." Agents draft, people decide. This is how I would cut the roles at a manufacturer:

| Role | Responsibility | Who at a manufacturer |
|---|---|---|
| Architect | intent, data model, sharing model, Flow or Apex, rules file | ideally on the client side or independent |
| Builder-reviewer | steers agents, checks diffs, judges tests, code owner on the pull request | partner or in-house developers |
| Domain lead | acceptance criteria, daily acceptance in the demo | warranty clerk, field service dispatcher, dealer sales |
| Platform and DevOps (shared) | pipeline, org strategy, tool approvals, cost monitoring | internal IT or partner with a clear handover |
| Coding agent | drafts, code, tests, documentation, runbooks | works only in scratch orgs and sandboxes |

In my view the domain lead is the most critical role at a manufacturer. Without someone who decides every day whether a warranty workflow or a spare part reservation is right, a fast team quickly builds past the need. The head of service has to release that time before the partner restructures its team.

### Nearshore teams and partners

In nearshore teams the load also moves to review. More code per developer means more pull requests per reviewer, and that is exactly where many teams lack seniority. Why I cap nearshore teams at about eight developers anyway is explained in [Salesforce nearshore teams: why eight developers at most](../../../blog/salesforce-nearshore-teams-eight-developers/). What changes with agents in roles, onboarding and access rules is covered in [nearshore Salesforce teams with AI agents](../../../blog/nearshore-salesforce-teams-ai-agents/).

When a partner works with agents, the ground rules belong in the contract. ApexHours lists permitted tools, data handling without production or personal data, IP ownership and disclosure of AI use, all settled before kickoff. My checklist is in [partners coding with AI: what belongs in the contract](../../../blog/partners-using-ai-coding-contract-rules/); how partner incentives are shifting is in [chapter 5](../aiforce-and-system-integrators/).

## What does the workflow from intent to release look like?

ApexHours replaces the classic specification with an "intent": an outcome-first requirement with the desired outcome, the reason, the users affected, constraints and guardrails, and success criteria. A daily demo of working software replaces the status stand-up. For interfaces to SAP or rules with financial effect, such as warranty credit notes, I would still keep a precise specification.

This leads to a workflow I recommend for Salesforce programmes:

1. **Capture the intent**, plus data model, real field API names, sharing requirements and data volumes.
2. **Let the agent read the org**: it analyses metadata in a sandbox and reports dependencies.
3. **Approve the plan**: the architect checks that it covers the intent and the non-goals.
4. **Build in small steps** in a scratch org or feature sandbox without customer data, tests first.
5. **Pull request** with the AI share labelled, review by the code owner, checks in the pipeline.
6. **Daily demo**: the domain lead accepts on the running system.
7. **Release through the pipeline** with human approval; no agent has rights in production.

### Review gates: a recommendation

Which automated checks belong in the pipeline is covered in [chapter 8](../ai-code-best-practices/). Here the question is who decides at which point. My proposal:

| Gate | Check | Who | Blocking? |
|---|---|---|---|
| G0 Plan | plan covers intent and non-goals | architect | yes |
| G1 Local | Code Analyzer without blockers, tests green, test output as evidence | hook in the developer's tool | yes |
| G2 Agent review | deviation from spec, security patterns | second agent as reviewer | no, hints only |
| G3 Human | logic, sharing, data model, readability | named code owner | yes |
| G4 Pipeline | analyzer, Apex tests, validation deploy | CI | yes |
| G5 Business acceptance | acceptance criteria in the demo | domain lead | yes |
| G6 Release | change approval, rollback plan | release manager | yes |

G2 is deliberately non-blocking. A second agent spots anomalies; accountability stays with G3.

 Why every pull request needs a human review no matter who wrote the code is explained in [why pull request reviews are a must](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/). For Agentforce agents themselves a test gate with Testing Center comes on top, described in [testing Agentforce agents before go-live](../../../blog/testing-agentforce-agents-before-go-live/).

### Definition of Done: a recommendation

I would put these points in writing for every agent-generated Salesforce change:

- Named owner and reviewer on the pull request.
- Code Analyzer without blockers.
- Apex tests green, with positive, negative and bulk cases, business asserts and `runAs` for logic that depends on sharing.
- Validation deploy against the integration sandbox succeeded.
- New fields and objects in permission sets, no change to sharing settings without approval.
- API version unchanged, or raised on purpose and tested.
- AI share labelled, rules file updated when new conventions appear.
- Business acceptance in the demo documented.

## Which metrics show whether AI makes your programme faster?

Self-reports are no evidence. In the [METR study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) 16 experienced developers took 19 percent longer with AI in their own large repositories and afterwards estimated they had been 20 percent faster. METR has since marked these results as out of date itself; the lesson about self-assessment stands.

| Metric | Definition | Why |
|---|---|---|
| Cycle time per story | intent approval to production | core outcome from the business side |
| Defect escape rate | defects after release relative to all defects | quality over speed |
| Rework | effort on stories already marked "done" | falls more slowly than time saved, per McKinsey |
| Share of AI work accepted | accepted relative to generated changes | steers the rules file and working practice |
| DORA metrics | change lead time, deployment frequency, failed deployment recovery time, change fail rate, deployment rework rate | comparable across teams and partners |
| AI cost per story | tool and token costs divided by stories delivered | budget control |

The five DORA metrics are defined in the [DORA guide](https://dora.dev/guides/dora-metrics/). The baseline is what matters: record the values before the first agent arrives, and report them as a trend, never as a ranking of individuals. Why a ranking is also a problem under German labour law follows in the next section. How to set up the measurement and which numbers mislead is in [measuring AI productivity in Salesforce projects](../../../blog/measuring-ai-productivity-salesforce-projects/). The cost side is in [chapter 7](../costs-and-tokens/).

### Learning time belongs in the budget

According to McKinsey, about 38 percent of respondents name lack of time to learn as a top barrier, and embedded coaching is about 30 percent more common among top accelerators. I recommend a four-week onboarding: set up the tool with an org allowlist and read the rules file, then bug fixes with a test first under guidance, then a first feature with a plan and a labelled pull request, and finally reviews of other people's agent pull requests. Those weeks belong in the project plan, not on the side.

## Works council, GDPR and the EU AI Act

### Works council

This part applies to German companies. According to [CMS](https://cms.law/de/deu/legal-updates/ki-transformation-und-betriebsrat-mitbestimmung-richtig-gestalten), AI systems "as a rule" trigger co-determination rights under section 87(1) no. 6 of the Works Constitution Act (BetrVG). What counts is the objective possibility of monitoring, even without any intent. Without the works council's consent or a conciliation committee ruling, the employer may not introduce the system. CMS recommends framework works agreements that set the procedure for IT and AI applications.

How concrete this gets with coding agents shows in [Claude Code usage analytics](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics): admins see each team member's lines of code accepted per month, and in beta also merged pull requests per person. That is exactly the kind of performance data section 87 is about. So I would schedule the works council before the pilot. It applies directly to your own developers, admins and reviewers. This is my view as an architect, not legal advice.

### GDPR

Production data and personal data do not belong in a coding agent's context. Agents work in scratch orgs and sandboxes with anonymised test data; dealer and customer master data from the full copy sandbox stays out. For model routes: according to the [data residency documentation](https://platform.claude.com/docs/en/manage-claude/data-residency), the Anthropic API offers only "us" and "global" for inference, with no EU option. Through Amazon Bedrock or Google Cloud, the regional endpoint determines the location. [Chapter 4](../external-coding-agents/) compares the vendors' options, and [AI coding tools, works council and GDPR](../../../blog/ai-coding-tools-works-council-gdpr/) walks through the approval path.

### EU AI Act

According to [White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act), Regulation (EU) 2026/1744 was published in the Official Journal on 24 July 2026 and entered into force on 27 July.

| What | Deadline | Source |
|---|---|---|
| High-risk under Annex III, including employment | 2 December 2027 | White & Case |
| High-risk under Annex I, AI embedded in products | 2 August 2028 | White & Case |
| Most Art. 50 transparency obligations | since 2 August 2026 | White & Case |
| Art. 50(2) marking for generative systems on the market before 2 August 2026 | 2 December 2026 | [Cuatrecasas](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published) |

In my judgement, coding assistants in a Salesforce project are as a rule not high-risk systems. An Agentforce agent that pre-sorts job applications, on the other hand, could fall under Annex III. Machine builders have a second, separate topic: according to Cuatrecasas, the Machinery Regulation moves to section B of Annex I, and the substantive high-risk requirements are to come through delegated acts by 2 August 2028 at the latest. That concerns AI in your machines, not your CRM, and belongs with product engineering and legal. What the deadlines mean for Agentforce projects is in [EU AI Act deadlines for Agentforce](../../../blog/eu-ai-act-deadlines-agentforce/); agents in service and sales are covered in [chapter 10](../ai-agents-in-manufacturing/).

## Assumed: the first eight weeks at a machine builder

Assume a machine builder with Service Cloud, Field Service, a dealer portal and SAP S/4. A nearshore partner provides six developers; in-house there is one architect and two admins. The partner wants to work with coding agents. All numbers and circumstances are assumptions.

This is how I would set up the first eight weeks:

```schritte
Baseline and works council | weeks 1 to 2 · programme office
  Three months of history from Jira and Git: an assumed 35 stories a month, 16 working days cycle time, 10 percent rework. In parallel a draft framework agreement goes to the works council, with no per-person evaluation as the core commitment.
Contract and rules | week 2 · partner and internal architect
  The partner discloses tools and model routes; agents get access only to scratch orgs and developer sandboxes. The rules file lives in the manufacturer's repository, owned by the internal architect.
One stream as pilot | weeks 3 to 6 · domain lead
  Spare part ordering in the dealer portal, because the process is clear and little depends on SAP postings. A coordinator from spare parts sales is released half time and accepts work daily. Gates G0 to G6 apply from the first pull request.
Onboarding | weeks 3 to 6 · two partner developers
  Two developers go through the four weeks; the others keep working as before for now. That also gives a comparison group.
Evaluation | weeks 7 to 8
  Assume cycle time in the pilot stream falls to 12 days, but rework rises to 13 percent because pull requests grew. Consequence: smaller pull requests as a rule, a second reviewer on the client side, then the next stream.
```

The warranty stream comes later, because credit notes are posted in SAP and an end-to-end test before each release stays there. This sequencing is part of what I set up in [programme management for Salesforce programmes](../../../services/program-management-nearshore/); getting business time released and communicating with the team belong to [change management](../../../services/change-management-salesforce/). All chapters are on the [masterclass overview](../).
