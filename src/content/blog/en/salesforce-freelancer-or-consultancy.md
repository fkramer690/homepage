---
title: "Salesforce freelancer or consultancy: which fits when"
description: "When a manufacturer needs a Salesforce consultancy, when an independent architect on the client side, and why larger programs usually have both."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-freelancer-or-consultancy
translationKey: salesforce-freelancer-or-consultancy
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Freelancer, Consultancy, Implementation partner, Partner governance, Salesforce architect]
takeaways:
  - "A consultancy provides delivery capacity, a team that builds, tests and runs, and a single freelancer does not replace that team."
  - "An independent architect on the client side pays off when decisions and standards should stay with the client, not with the partner who earns from them."
  - "The warnings against freelancers are valid when a freelancer is used as a cheaper substitute for a development team, but not when the role is an architect role."
  - "In my largest program 5 partners built with more than 30 developers in 8 streams, and the standards came from the client side."
  - "A decision log, documented standards and an internal colleague as a stand-in keep the risk of a freelancer dropping out small."
faq:
  - q: "Is a Salesforce freelancer cheaper than a consultancy?"
    a: "Per day, often yes, because the consultancy's sales, overhead and margin fall away. The real question is which role you fill. For a whole delivery team, a consultancy is almost always the better choice. For the architect role on the client side, an independent architect is usually the better fit."
  - q: "When should I not hire a Salesforce freelancer?"
    a: "When you need a complete implementation from one source, want one provider to be responsible for the overall result or expect round-the-clock support. One person cannot carry that, whatever the contract says."
  - q: "Can an independent architect work with our implementation partner?"
    a: "Yes, that is the normal case. The partner builds, the architect on the client side sets standards, reviews designs and pull requests and prepares decisions for the client."
  - q: "How do I prevent knowledge from staying with the freelancer?"
    a: "Decisions go into a decision log, standards into a shared document and code into a repository the client owns. Identify an internal colleague from the start who can later take over reviews and the CoE call."
draft: false
---

Whether you hire a Salesforce freelancer or a consultancy depends on the role you want to fill. If you need a team that builds, tests and runs an implementation, a consultancy or implementation partner is the right choice. A single Salesforce freelancer does not replace that team. If architecture decisions, standards and the coordination of several partners should remain with you, the right fit is an independent architect on the client side, because he does not earn money from delivery work. In larger programs at manufacturers, both work together.

## What speaks against a Salesforce freelancer?

Search for Salesforce freelancers and you find articles from consultancies near the top that advise against them. Their arguments are not wrong:

- **One person drops out.** Illness, holidays, another project, and nobody takes over.
- **No team behind him.** A freelancer cannot add three developers at short notice when go-live gets closer.
- **Quality is hard to judge.** Profiles on portals are often anonymous, certifications say little about project experience.
- **No responsibility for an overall result.** Under a time and materials contract, the client carries most of the delivery risk; a small provider can agree on a defined deliverable, but its capacity remains limited.

All four points hold when a manufacturer uses a freelancer as a cheaper substitute for a development team. Then one person is used where a team is needed, and the client wonders why nothing is moving forward.

For the role I work in myself, other questions matter. An architect on the client side does not build the implementation. He makes sure the teams that build the solution follow the same rules, and that the client makes the decisions only the client can make.

## When is a consultancy the better choice?

A consultancy or implementation partner is the right choice when you need delivery capacity and accountability for a result:

- **New implementation without your own Salesforce team.** You need consultants, developers, testers and a project lead who know each other and work as a unit.
- **Fixed price or a contract for a deliverable.** If you want a result at a fixed price, you need a contractor with a team who can deliver it. Whether a consultancy is truly accountable for the result depends on the contract, its acceptance criteria and liability terms.
- **Run and support.** Incidents on Monday morning, releases three times a year, new users: that needs an organization, not one person.
- **Peaks in delivery.** More people before go-live, fewer afterwards. A partner can do that, a freelancer cannot.

A good partner brings its own architects. That works as long as there is one partner and the client can follow its decisions. How to spot a good partner in the proposal is covered in [how to choose a Salesforce implementation partner](../how-to-choose-a-salesforce-implementation-partner/).

## When does an independent architect fit better?

It becomes critical when the partner also makes decisions that affect its own revenue, or when several partners build on the same org. Then the client needs someone on its side of the table.

```pro-contra
pro: Independent architect on the client side
- Represents only the client in the engagement: no license resale, no referral fees, no share in the delivery
- Sets standards that apply to every partner alike
- Reviews designs and pull requests independently of the supplier
- Prepares decisions such as whether to use an industry cloud or a custom build, without a sales interest
contra: What he does not provide
- No delivery capacity for a whole implementation
- No contract for an overall result
- No built-in cover from colleagues if he drops out, unless a named backup has been agreed
- No operations and no round-the-clock support
```

Typical situations in which I am called in:

- **Several partners on one org.** Each partner builds by its own rules until the automations on one object block each other. Who owns which object is settled by an [object ownership matrix](../salesforce-object-ownership-matrix/), and it belongs to the client.
- **Decisions before signing.** Whether Manufacturing Cloud is worth it or whether a custom build on the platform is enough should not be answered by whoever sells the licenses or the project. For licenses, I regularly see full licenses offered by default although many users do not need them. That can easily add up to six figures per year.
- **Ensuring quality the client cannot check alone.** An architect on the client side reviews changes before anything goes to production. I explain why that is a must in enterprise projects in [pull request reviews](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).
- **Keeping tools and knowledge with the client.** The repository, pipeline and decisions belong to the client, so changing partners remains possible. I describe this in detail in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

## The architect and the partners have separate roles

In most programs I work in, there are both: partners who build, and me on the client side. The roles are clearly split.

| Task | Client | Architect on the client side | Implementation partner |
|---|---|---|---|
| Target picture and architecture decisions | decides | prepares, documents in the decision log | contributes proposals |
| Standards and object ownership matrix | approves | drafts and maintains | follows them, reports edge cases |
| Delivery, tests, deployment | accepts | reviews designs and pull requests | builds and delivers |
| Center of Excellence | chairs | runs the technical call | presents changes |
| Licenses and contracts | negotiates | calculates demand and variants | provides quantities |

```praxis
In my largest program, 5 implementation partners worked on the same org, with more than 30 developers across 8 streams. The standards for that org, from naming conventions to one automation entry point per object to the object ownership matrix, took about three months to define. 80 percent of the standards were in place after the first round, and the edge cases emerged step by step. Later, changes were presented ahead of time in the technical CoE call every two weeks, until hardly any new edge cases appeared.
```

No single partner could have taken this role without setting the rules for its competitors. And no freelancer could have done the work of the 30 developers. How that board works is covered in [Salesforce Center of Excellence: cadence and format](../salesforce-center-of-excellence-cadence/).

## These questions help you check an independent architect

If you are looking for an architect on your side of the table, you need different questions than you would ask a developer:

- **What was the last decision he prepared, and how is it documented?** Ask to see an anonymized [decision log](../salesforce-architecture-decision-log/). Someone who keeps no decision log leaves you with nothing but his memory.
- **How many partners has he steered at the same time?** An architect who only worked inside one partner does not know the conflicts between partners first hand.
- **Where does he say no?** Ask about a role he turned down. I, for example, do not take pure admin or developer roles, or roles where the architecture is already fixed and only needs to be signed off.
- **What happens if he drops out?** A freelancer has no bench of colleagues unless a named backup is agreed. The minimum is documented standards, a decision log and an internal colleague who can take over reviews and calls. In one program, every pull request crossed my desk at first, and once the process was stable, I handed it over to an internal colleague.
- **Who is the contracting party?** For my engagements, the contracting party is FK Solution Design GmbH, billed monthly based on effort. Many clients hire through a staffing agency, which works as well.

## Write down which role is missing

First write down which role is missing: capacity that builds, or control that decides. If capacity is missing, look for a partner, and no freelancer portal solves that. If control is missing, because a partner checks its own work or several partners build by their own rules, get an architect on your side before the next tender goes out. I describe how I fill this role on the page [Freelance Salesforce Architect](../../freelance-salesforce-architect/) and under [partner governance](../../services/partner-governance/).
