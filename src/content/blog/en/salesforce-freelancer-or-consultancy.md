---
title: "Salesforce freelancer or consultancy: which fits when"
description: "When a manufacturer needs a Salesforce consultancy, when an independent architect on the client side, and why larger programmes usually have both."
pubDate: 2026-10-29
lang: en
slug: salesforce-freelancer-or-consultancy
translationKey: salesforce-freelancer-or-consultancy
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Freelancer, Consultancy, Implementation partner, Partner governance, Salesforce architect]
takeaways:
  - "A Salesforce consultancy or implementation partner provides delivery capacity: a team that builds, tests and runs. A single freelancer does not replace that team."
  - "An independent Salesforce architect on the client side pays off when decisions, standards and the steering of several partners should stay with the client, not with the partner who earns from them."
  - "The warnings against Salesforce freelancers are right for one role: the freelancer as a cheaper substitute for a development team. The architect role on the client side raises different questions."
  - "In larger programmes both work together. In my largest programme 5 partners built with more than 30 developers in 8 streams, and the standards for it came from the client side."
  - "The biggest risk of a freelancer is that he drops out. A decision log, documented standards and an internal colleague who can take over the role keep that risk small."
faq:
  - q: "Is a Salesforce freelancer cheaper than a consultancy?"
    a: "Per day often yes, because the consultancy's sales, overhead and margin fall away. The real question is which role you fill. For a whole delivery team a consultancy is almost always the better choice, for the architect role on the client side an independent architect."
  - q: "When should I not hire a Salesforce freelancer?"
    a: "When you need a complete implementation from one source, want a warranty for an overall result or expect round-the-clock support. One person cannot provide that."
  - q: "Can an independent architect work with our implementation partner?"
    a: "Yes, that is the normal case. The partner builds, the architect on the client side sets standards, reviews designs and pull requests and prepares decisions for the client."
  - q: "How do I avoid the knowledge staying with the freelancer?"
    a: "Decisions go into a decision log, standards into a shared document and code into a repository the client owns. Plan an internal colleague from the start who later takes over reviews and the CoE call."
draft: false
---

Whether you hire a Salesforce freelancer or a consultancy depends on the role you want to fill. If you need a team that builds, tests and runs an implementation, a consultancy or implementation partner is the right choice. A single Salesforce freelancer does not replace that team. If architecture decisions, standards and the steering of several partners should stay with you, an independent architect on the client side fits better than any partner, because he does not earn from the delivery. In larger programmes at manufacturers, both work together.

## What speaks against a Salesforce freelancer?

Search for Salesforce freelancers and you find articles from consultancies near the top that advise against them. Their arguments are not wrong:

- **One person drops out.** Illness, holidays, another project, and nobody takes over.
- **No team behind him.** A freelancer cannot add three developers at short notice when go-live gets closer.
- **Quality is hard to judge.** Profiles on portals are often anonymous, certifications say little about project experience.
- **No liability for an overall result.** Whoever hires a freelancer on time and materials carries the result risk alone.

All four points hold when a manufacturer uses a freelancer as a cheaper substitute for a development team. Then one person sits where a team belongs, and the client wonders why nothing moves.

For the role I work in myself, other questions matter. An architect on the client side does not build the implementation. He makes sure the teams who build follow the same rules, and that the client takes the decisions only the client can take.

## When is a consultancy the better choice?

A consultancy or implementation partner is the right choice when you buy capacity and responsibility for a result:

- **New implementation without your own Salesforce team.** You need consultants, developers, testers and a project lead who know each other and work as a unit.
- **Fixed price or a contract for a deliverable.** If you want a result at a fixed price, you need a contractor with a team who stands behind it.
- **Run and support.** Incidents on Monday morning, releases three times a year, new users: that needs an organisation, not one person.
- **Peaks in delivery.** More people before go-live, fewer afterwards. A partner can do that, a freelancer cannot.

A good partner brings its own architects. That works as long as there is one partner and the client can follow its decisions.

## When does an independent architect fit better?

It gets critical when the partner also decides on things it earns from, or when several partners build on the same org. Then the client needs someone on its side of the table.

```pro-contra
pro: Independent architect on the client side
- Works only for the client and does not earn from the size of the delivery
- Sets standards that apply to every partner alike
- Reviews designs and pull requests independently of the supplier
- Prepares decisions like industry cloud or custom build without a sales interest
contra: What he does not provide
- No delivery capacity for a whole implementation
- No contract for an overall result
- No cover by colleagues when he drops out
- No run and no round-the-clock support
```

Typical situations in which I am called in:

- **Several partners on one org.** Each partner builds by its own rules until the automations on one object block each other. Who owns which object is settled by an [object ownership matrix](../salesforce-object-ownership-matrix/), and it belongs to the client.
- **Decisions before signing.** Whether Manufacturing Cloud pays off or a custom build on the platform is enough should not be answered by whoever sells the licences or the project. With licences I regularly see full licences offered by default although many users do not need them. That can easily add up to six figures per year.
- **Securing quality the client cannot check alone.** An architect on the client side reads along before anything goes to production. Why that is a must in enterprise projects is in [pull request reviews](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).
- **Keeping tools and knowledge with the client.** Repository, pipeline and decisions belong to the client, so a change of partner stays possible. I describe this in detail in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

## How do the architect and the partners work together?

In most programmes I work in, there are both: partners who build, and me on the client side. The roles are clearly split.

| Task | Client | Architect on the client side | Implementation partner |
|---|---|---|---|
| Target picture and architecture decisions | decides | prepares, documents in the decision log | contributes proposals |
| Standards and object ownership matrix | approves | drafts and maintains | follows them, reports edge cases |
| Delivery, tests, deployment | accepts | reviews designs and pull requests | builds and delivers |
| Center of Excellence | chairs | runs the technical call | presents changes |
| Licences and contracts | negotiates | calculates demand and variants | provides quantities |

```praxis
In my largest programme 5 implementation partners built on the same org with more than 30 developers in 8 streams. The standards for it, from naming conventions to one automation per object to the object ownership matrix, took about three months. 80 percent were in place after the first round, the edge cases came in step by step. Later, changes were presented with lead time in the technical CoE call every two weeks, until new edge cases had almost disappeared.
```

No single partner could have taken this role without setting the rules for its competitors. And no freelancer could have done the work of the 30 developers. What the board around it looks like is in [Salesforce Center of Excellence: cadence and format](../salesforce-center-of-excellence-cadence/).

## How do you check an independent Salesforce architect?

If you are looking for an architect for your side of the table, other questions help than for a developer:

- **Which decision did he prepare last, and how is it documented?** Ask to see an anonymised [decision log](../salesforce-architecture-decision-log/). Whoever keeps none leaves you nothing but his memory.
- **How many partners has he steered at the same time?** An architect who only worked inside one partner does not know the conflicts between partners first hand.
- **Where does he say no?** Ask for a role he turned down. I, for example, do not take pure admin or developer roles, or roles where the architecture is already fixed and only needs to be signed off.
- **How does he handle dropping out?** Cover by colleagues does not exist with a freelancer. What must exist: documented standards, a decision log and an internal colleague who can take over reviews and calls. In one programme every pull request went across my desk at first, and once the process was stable I handed it over to an internal colleague.
- **Who is the contracting party?** With me it is FK Solution Design GmbH, billed monthly by effort. Many clients hire through a staffing agency, which works as well.

## Where should you start?

First write down which role is missing: capacity that builds, or control that decides. If capacity is missing, look for a partner, and no freelancer portal solves that. If control is missing, because a partner checks its own work or several partners build by their own rules, get an architect on your side before the next tender goes out. How I fill this role is on the page [Freelance Salesforce Architect](../../freelance-salesforce-architect/) and under [partner governance](../../services/partner-governance/).

An independent architect does not replace your partners, he makes sure they build by your rules. If you want to clarify which role is missing in your programme, [send me a message](#contact).
