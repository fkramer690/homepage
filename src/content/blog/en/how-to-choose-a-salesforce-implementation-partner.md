---
title: "How to choose a Salesforce implementation partner"
description: "How manufacturers choose a Salesforce implementation partner: warning signs in the proposal, pitch questions and why references say little about quality."
pubDate: 2026-11-06
lang: en
slug: how-to-choose-a-salesforce-implementation-partner
translationKey: choose-salesforce-implementation-partner
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [implementation partner, partner selection, partner governance, fixed price, vendor lock-in, code quality]
takeaways:
  - "The partner chooses its references and the contact who gets the satisfaction survey. Ask what went wrong in a project and what they changed since."
  - "If the estimate rests on a discovery that only covered the happy path, the edge cases come back later as change requests."
  - "Get key roles committed by name. The pitch brings senior people; the project often gets a mixed team with many juniors."
  - "Ask how milestones, delivery and quality gates connect. With AI coding in particular, the answer shows whether the partner plans for quality."
  - "Your code, metadata and pipeline configuration belong to you. Most proposals do not mention the topic at all."
faq:
  - q: "How do I find a Salesforce implementation partner?"
    a: "For a shortlist, use the consultant section on AppExchange and filter by product, industry and location. Base the decision on the discovery, the named team and the answers on quality assurance, not on stars and partner tier."
  - q: "Does the partner tier (Summit, Crest, Ridge) say anything about quality?"
    a: "Only to a point. The tier follows a score made up of several attributes, including the average customer satisfaction of completed projects, certifications and Navigator status. It says little about how the team assigned to you will work."
  - q: "Fixed price or time and materials: which is better with a Salesforce partner?"
    a: "A fixed price protects you when the discovery knows the edge cases of your processes and the proposal lists its assumptions, exclusions and acceptance criteria. Otherwise the risk comes back to you through change requests."
  - q: "What if the partner replaces key people after the project starts?"
    a: "Settle it in the contract beforehand: named key roles, your consent to any swap, an equivalent replacement and a handover period paid by the partner. Without that rule you usually notice the change only in the quality."
draft: false
---

Choose a Salesforce implementation partner on points that proposals often leave out, rather than on presentation polish and partner-selected references: how thoroughly the partner investigated your processes before pricing them, which people fill the key roles from day one, how the partner ties quality to milestones and whether you could continue without them. As an architect on the client side I have seen partners replaced more than once. Many of the reasons were visible in the proposal.

## Why references tell you little about an implementation partner

References are briefed by the partner. No partner will name the project where things went badly wrong. That is not an accusation: every implementation partner has skeletons in the closet, and anyone who claims otherwise has done few projects or is not telling you everything.

The figures on AppExchange help with the shortlist ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/consultants-on-appexchange/find-the-right-consultant-on-appexchange)). The satisfaction survey after the project goes to the contact the partner itself enters, and terminated projects do not count towards the average ([Salesforce Partner Community](https://partners.salesforce.com/s/Customer_Satisfaction_new)).

```tabelle
title: What the AppExchange listing shows
columns: Listing data | Shows | Does not show
Certified experts | Size of the Salesforce practice | Who sits on your project *
Specialisations | The firm's product and industry experience | Experience of the team you get *
Stars and satisfaction | Verdict of the contacts the partner entered | Projects that were terminated *
Partner tier | Score from satisfaction, certifications and Navigator status | Quality on a single project *
note: Good for the shortlist, too little for the decision.
```

The better question is: which project went wrong for you, what did you learn, and how can I see that it will not happen again? A partner with a concrete answer, a changed rule or a new review step, has done something with its mistakes. If you can, also talk to a former customer who is not on the reference list.

## Which warning signs show up in the proposal?

I have seen each of the following points in proposals, and each one made itself felt later in the project.

```tabelle
title: Warning signs in a Salesforce partner's proposal
columns: Warning sign | What it turns into | What you ask
Optimistic fixed price | Processes missing from the work packages turn up during the project | Which of our processes is not covered? *
Discovery only for the happy path | Edge cases come back as change requests | Which special cases did you discuss? *
Senior people in the pitch | A mixed team with many juniors on the project | Who fills the key roles from day one, by name? *
Nothing on repository and pipeline | The partner is hard to replace | Could we continue without you after go-live? *
Nothing on quality assurance | Defects only show up in testing | How do milestones and quality gates connect? *
note: Each point can be clarified before the award. After the award it costs money.
```

The first point is often underrated. In my cases the fixed price was too optimistic, and the client did not even know which functions the individual work packages contained and whether they covered its needs. When a process then turns out to be missing, the price no longer covers the actual scope, and the protection of the fixed price erodes with every change request. How fixed price and time and materials shift now that partners build with AI is covered in [fixed price vs. time and materials](../fixed-price-vs-time-and-materials-ai/).

## The discovery decides how reliable the estimate is

An estimate without any discovery has become rare. A discovery that stays on the surface is more common: I have seen estimates for which only the happy path was discussed, the standard case done by the book. At manufacturers, though, the effort often sits in the edge cases.

```vergleich
without: Discovery only for the happy path
- Only the standard case done by the book is discussed.
- Devices without a serial number, orders spanning two plants or own framework agreements are missing.
- Rules, data model and interfaces for them are in no estimate.
- * The edge cases come back later as change requests.
with: Discovery with edge cases
- * The list of special cases comes with the proposal.
- Assumptions behind the estimate and open decisions are written down.
- You see before the award what the price covers and what it does not.
quote: For manufacturers, the effort sits in the edge cases, not in the standard case.
```

So do not ask whether a discovery took place; ask to see this evidence. If the partner cannot show any of it, you have no evidence that edge cases were covered.

Part of the responsibility lies with the client. In every one of my projects, user acceptance testing took longer than planned, because the client's people were not available, and change requests followed because the business had not looked closely enough at its own solution and the status quo beforehand. So also ask the partner what it expects from you: which process owners it needs and for how many days, when you have to make which decisions, and who prepares the test cases, provides test data and tests.

## The team in the pitch is not automatically the team on the project

The pitch brings the experienced people. On the project, in my cases, the team was then very mixed, with many juniors. That is not bad in itself, juniors need projects. It becomes bad when nobody experienced reviews their work and the client only notices in the quality.

```praxis
I have seen partners replaced more than once. The reasons were similar: the quality was never there, or it dropped because the partner's people left the project or the company. Or sales had sold something the team had never done before, and the project needed more time and more budget.
```

That gives you the questions for the pitch. Who fills the key roles from day one, by name and share of time, and what seniority does the rest of the team have? Who has implemented exactly this product and the scenarios you need, which for a manufacturer often means installed base and asset hierarchies, spare parts from the ERP or scheduling for field technicians? And who takes over when a key person leaves, and who pays for the onboarding?

## How do you ask about quality without giving away the answer?

Ask "Will you work in our repository to our standards?" and every partner says yes. So I ask these questions indirectly: I describe a problem and let the partner explain how they would solve it. A partner with a good approach then describes it as their solution without me prompting it. Code review and test rules rarely appear in a proposal, and especially now that partners code with AI tools, a partner should explain unprompted how it reviews every change, whoever or whatever wrote it.

- **Milestones and quality.** "How do your project milestones connect with delivery and quality gates?" Good answers name concrete checks: code review, test coverage and automated checks in the pipeline, but also data migration, integration tests and readiness for acceptance testing. A milestone only counts as technically complete once they all pass; the business acceptance comes on top, with its own criteria. More in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/) and [partners using AI coding](../partners-using-ai-coding-contract-rules/).
- **A second partner.** "In two years another partner joins for Field Service. How do we keep the two from overwriting each other?" Good answers mention pull requests, an [object ownership matrix](../salesforce-object-ownership-matrix/) and a shared [sandbox strategy](../salesforce-sandbox-strategy-multiple-partners/).
- **Taking over after go-live.** "We want to run the platform ourselves later. What do we get from you then?" This shows whether code, configuration and documentation are meant to sit with you or stay with the partner.

## What belongs in the contract with the partner

What sounds good in the pitch has to go into the contract, or it does not count. These points belong there at a minimum:

- **Named key roles,** swaps only with your consent, an equivalent replacement and a handover period at the partner's cost.
- **Ownership and access:** code, metadata, documentation and pipeline configuration built for you belong to you from the start, with admin access to repository and pipeline. For the partner's accelerators and templates, the contract states your right of use.
- **Quality gates with defined checks** for the technical completion of every milestone, with the evidence the partner delivers.
- **Assumptions and exclusions** of the estimate, and a rule for edge cases the discovery did not cover: who assesses them, and under what conditions do they become change requests?

If several partners work on one org, there is one more question: who sets the rules for all of them. In my largest programme, five partners worked with more than 30 developers on one org, and the standards came from the client side, as described on the [partner governance](../../services/partner-governance/) page. When an independent architect makes sense for this is covered in [Salesforce freelancer or consultancy](../salesforce-freelancer-or-consultancy/).

## First step: write down three problem cases for every partner

Before you invite partners, decide what you will measure them on and give all of them the same cases from your own programme.

```schritte
Write down cases | before the invitation · client
  An edge case from your process, a second partner joining, a key person on the partner side leaving.
Set criteria | before the first pitch · client
  The same criteria for every partner, so the best presentation does not win by default.
Play the cases | in the pitch · each partner
  Each partner explains how it would handle the same three cases.
Ask for evidence | with the proposal · partner
  Key roles by name, the list of special cases from the discovery, the assumptions behind the price.
```
