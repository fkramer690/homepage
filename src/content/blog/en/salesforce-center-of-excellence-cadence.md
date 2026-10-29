---
title: "Salesforce Center of Excellence: format and cadence"
description: "How a Salesforce Center of Excellence works on the client side: two meetings, clear roles, decisions with lead time. Lessons from a programme with 8 streams."
pubDate: 2026-10-29
lang: en
slug: salesforce-center-of-excellence-cadence
translationKey: salesforce-center-of-excellence
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [center of excellence, CoE, partner governance, governance, object ownership matrix]
takeaways:
  - "A Salesforce Center of Excellence (CoE) is the body on the client side that sets standards and aligns upcoming changes across all teams and partners."
  - "Two meetings are enough to start: a weekly technical call for changes and edge cases, and a monthly meeting for roadmap and priorities."
  - "The CoE belongs to the client. Partners take part, but the chair and the decisions stay with the client, otherwise one partner sets the rules for its competitors."
  - "A CoE call works when streams present changes to shared objects before they build them. In my largest programme this made edge cases almost disappear."
  - "A CoE without enforcement is a talking shop. Its decisions have to show up in pull request reviews and in the pipeline."
faq:
  - q: "What is a Salesforce Center of Excellence?"
    a: "A team from across the company that owns standards, roadmap and enablement for the Salesforce platform. Salesforce describes it as the steering committee and knowledge hub for all Salesforce initiatives."
  - q: "How often should a Salesforce CoE meet?"
    a: "I recommend weekly for technical and operational topics and monthly for roadmap and priorities. That matches what Salesforce recommends on Trailhead."
  - q: "Who should lead a Salesforce Center of Excellence?"
    a: "The client, with a named CoE lead and an architect who runs the technical calls. Partners take part and bring their topics, but they do not decide on the rules for everyone."
  - q: "Does a mid-sized manufacturer need a CoE at all?"
    a: "As soon as more than one team or partner works on the same org, yes. It does not have to be a department; a weekly call with a fixed agenda and one owner are enough."
draft: false
---

A Salesforce Center of Excellence (CoE) is the body on the client side that sets standards and aligns upcoming changes across all teams and partners. For a manufacturer with several implementation partners, two meetings are enough to start: a weekly technical call where streams present changes to shared objects with lead time, and a monthly meeting for roadmap and priorities. The client chairs it, not a partner. In my largest programme, regular CoE calls made new edge cases almost disappear, because topics came up before they turned into conflicts.

## What is a Salesforce Center of Excellence?

In the Trailhead module [Salesforce Governance with a Center of Excellence](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/define-your-salesforce-coe), Salesforce describes the CoE as a team of experts from across the organisation that acts as the steering committee and knowledge hub for all Salesforce initiatives. It has three jobs there:

- **Vision:** a roadmap of where the platform is going, prioritised by value.
- **Standards:** rules for how work is done on the platform, from processes and data quality to development rules.
- **Enablement:** training, communication and support for users and teams.

In manufacturing companies with several partners, the second point is the most urgent in my experience. A roadmap usually exists already in some steering committee. What is missing is the place where teams settle, bindingly, who changes what in the org. Without that place you get what Salesforce calls [governance debt](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/learn-about-salesforce-governance-and-why-it-matters): technical debt, inconsistent data and users who build spreadsheets on the side.

## Why does the CoE belong on the client side?

A partner can moderate a CoE, and some sell that as a service. The problem: whoever sets the rules decides how everyone else builds. If five partners work on one org and one of them runs the CoE, it decides what its competitors are allowed to do. That is the same reason I insist on client ownership for the [object ownership matrix](../salesforce-object-ownership-matrix/) and for [repository and pipeline](../why-clients-should-own-their-devops-tools/).

Partners still sit at the table. Their leads present changes, bring edge cases from the project and push back when a standard does not work in practice. The chair, the decision and the documentation stay with the client, through a CoE lead and an architect.

## Which format does a CoE need at the start?

Trailhead recommends a [weekly schedule for operational and technical topics and a monthly one for strategy and roadmap](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/get-started-with-a-salesforce-coe). That matches what I recommend for programmes with several partners. You do not need more meetings at the start.

| | Technical CoE call | Roadmap meeting |
|---|---|---|
| Cadence | weekly | monthly |
| Chair | client-side architect | CoE lead |
| Attendees | technical leads of all streams and partners, release manager | sponsor, CoE lead, business units, architect |
| Content | upcoming changes to shared objects, edge cases from reviews, new or changed standards | priorities, roadmap, budget, new partners |
| Outcome | a decision, an updated standard or matrix | a prioritised backlog for the coming months |

The roadmap meeting is also the place for budget questions that cut across units. One example is the Agentforce allowance I describe in [Digital Wallet: Agentforce cost control for plants](../digital-wallet-agentforce-cost-control/): someone in the CoE has to watch the pool and run the chargeback to plants and subsidiaries.

## How does a technical CoE call run?

The technical call is the part that makes the difference. To keep it from turning into a status meeting, it needs a fixed agenda:

1. **Upcoming changes to shared objects.** A stream presents what it wants to change on Account, Asset or another shared object, before it builds. The owning stream according to the matrix says whether it fits and where the change belongs.
2. **Edge cases from reviews.** Anything that came up in [pull request reviews](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) and is not covered by a standard comes here.
3. **Record decisions.** Every decision goes where the standards live, not into one partner's meeting minutes.

Status reports do not belong in this call. Whoever wants to report what their team finished in the sprint does that in the sprint review. Otherwise 15 people sit together for an hour and the one change to Account that the call was meant for gets five minutes at the end.

It also matters who decides. The question belongs to the stream that owns the object. If two streams cannot agree, the client-side architect decides. A CoE that settles every question by vote becomes slow and political.

## What did a CoE bring in my programme with eight streams?

The largest programme I steered had more than 30 developers in eight streams, delivered by five implementation partners and internal teams. At the start nobody had defined which team owned which objects and metadata. Changes overwrote each other.

First we sent every change through a pull request with review and wrote standards from what the reviews showed, including the object ownership matrix. The CoE came in as the second building block, as the place for everything the standards did not cover yet.

```praxis
It took about three months until the standards were stable. The first version covered around 80 percent of cases. We discussed the edge cases in regular center of excellence calls, where streams presented upcoming changes with enough lead time for everyone else. Eventually the edge cases almost disappeared, because topics came up before they turned into conflicts. Once the process ran, I handed it over to an internal colleague who has owned it since.
```

The handover is where you see whether the CoE holds. If it depends on an external person, it ends with that person's contract. That is why an internal owner belongs in it from day one, first sitting in on the calls and then running them.

## Centralised, federated or hybrid: which model fits?

Trailhead distinguishes three models. In the centralised model the CoE can veto poor technical designs instead of only making recommendations. In the federated model individual units run their own implementation and the CoE advises. In the hybrid model the CoE sets standards centrally and the units enforce them themselves.

For several partners on one shared org I would start centralised. When five partners build on the same objects, someone has to be able to say no, and the review enforces that no technically.

```pro-contra
pro: Centralised CoE with a veto
- Standards apply equally to every partner
- Conflicts on shared objects are decided before anyone builds
- Partners stay comparable and replaceable
contra: What you accept in return
- The CoE architect becomes a bottleneck at first
- Plants and subsidiaries with their own wishes wait for decisions
- Without management backing the veto gets ignored
```

If a group runs several orgs, for example one per subsidiary, the hybrid model fits better. The CoE then sets the shared rules and each org enforces them with its own team.

## Where should you start?

A CoE does not have to be a new department. This is the order I recommend:

```schritte
Assign ownership | client
  Name a sponsor in management and a CoE lead. Without backing from the top, rules stay recommendations.
Write the first standards | architect
  Development standards and an object ownership matrix in a first version that covers around 80 percent of cases.
Start the weekly call | architect and all streams
  Fixed agenda: changes to shared objects, edge cases from reviews, record decisions.
Add the monthly roadmap meeting | CoE lead and business units
  Priorities, budget and new partners, once the technical call runs.
Hand over | internal owner
  An internal colleague takes over the calls and maintains the standards.
```

How to anchor new rules in daily work is described under [change management](../../services/change-management-salesforce/). The overall frame for several partners is under [partner governance](../../services/partner-governance/).

A Center of Excellence works when it starts small, belongs to the client and its decisions show up in reviews. If you are setting up a CoE right now or yours has turned into a talking shop, [send me a message](#contact).
