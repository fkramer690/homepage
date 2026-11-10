---
title: "Salesforce architect or system integrator?"
metaTitle: "Salesforce Architect vs System Integrator: Who Decides"
description: "Your system integrator brings its own architects. When is that enough, when does a manufacturer need a client-side Salesforce architect, and who decides what?"
pubDate: 2026-11-16
lang: en
slug: salesforce-architect-vs-system-integrator
translationKey: salesforce-architect-or-system-integrator
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Salesforce architect, System integrator, Implementation partner, Partner governance, Solution architect, Conflict of interest]
takeaways:
  - "The system integrator's architect often plans very well, but for a company that earns from effort, scope and follow-up business. That shapes scope questions."
  - "A client-side architect decides nothing alone. The role prepares decisions for the client and checks what the partner delivers."
  - "With one partner, a modest scope and an experienced internal IT team, the system integrator's architect is often enough."
  - "Once two partners build in one org, SAP is deeply connected or a partner switch is due, the client needs a technical mandate of its own."
faq:
  - q: "What is the difference between a Salesforce architect and a system integrator?"
    a: "A system integrator is a company that implements Salesforce and staffs a team of consultants, developers and its own architects. A Salesforce architect is a role. It can sit with the system integrator or on the client side, and that decides whose interests it represents."
  - q: "Do I need my own architect if my partner provides a solution architect?"
    a: "Not always. With one partner, a manageable scope and internal IT that can judge designs, the partner's solution architect is enough. When several partners work in one org or internal technical experience is missing, you need a voice of your own."
  - q: "How much time does a client-side architect need?"
    a: "At the start often three to five days a week, when target picture, standards and partner selection are on the table. Once the programme runs steadily, two days a week usually cover reviews, decisions and the meeting with the technical leads."
  - q: "Does a client-side architect work against the partner?"
    a: "No. The role makes sure the partner gets clear requirements and decisions are made quickly. Good partners value that because it shortens discussions about responsibilities and change requests."
draft: false
---

A client-side Salesforce architect and a system integrator's architect can have the same expertise. The difference is who they work for. The system integrator's architect works for a company that earns from effort, scope and follow-up business; the client-side Salesforce enterprise architect works for the manufacturer that has to run the org for ten years. With one partner, a modest scope and an experienced internal IT team, the system integrator's architect is usually enough. Once two partners build in one org, SAP is deeply connected or a partner switch is due, the client needs a technical mandate of its own.

## What a system integrator is and what it brings

Whether a freelancer, a consultancy or an internal colleague fills the client-side architect role is a different question, answered in [Salesforce freelancer or consultancy](../salesforce-freelancer-or-consultancy/). This article is about who prepares which decisions when the system integrator already brings its own architects.

A system integrator, in the Salesforce world usually called an implementation partner, is a company that implements and extends Salesforce. It provides a team: project management, consultants for the business processes, developers, testers and one or more architects, often called solution architect or technical architect.

These architects are often very good. They know the products, have seen many implementations and bring templates that have proven themselves. A good system integrator saves you many mistakes an internal team would make in its first project.

A Salesforce architect, on the other hand, means a role. It can sit with the system integrator, in your own IT or with an independent architect you hire yourself. Where it sits decides the answers to the questions on which client and partner have different interests.

## Where the interests diverge

On most questions client and partner want the same thing: a project that works and finishes on time. On some they do not, and that is where it shows who an architect works for.

```tabelle
title: Questions on which client and system integrator have different interests
columns: Question | Client's interest | System integrator's interest
Scope | Build as little as needed * | More scope usually means more revenue
Standard product, industry cloud or custom build | Whatever is cheaper over ten years * | What the team knows and sells well
Repository and pipeline | Owned by the client * | Often stay with the partner
Second partner | Competition and a fallback * | A competitor in its own org
Change requests | Edge cases belong in the estimate * | Edge cases are new orders
note: These interests follow from the partner's business model.
```

An architect at the system integrator can give honest advice on these questions, and many do. But the role carries a conflict it cannot resolve: the employer earns from scope and follow-up business. Under a fixed price this partly reverses, and every extra edge case becomes a risk the partner would rather bill as a change request. On make-or-buy questions, referral fees, reseller discounts, joint sales targets with the vendor or the partner's own tier can also play a part. I take no commissions from Salesforce, tool vendors or implementation partners, so the question never arises with me.

## Who decides what?

A client-side architect takes no work away from the partner. The role makes sure decisions stay with the client and the partner knows what it is measured against. This is how I split the work in larger programmes:

```tabelle matrix
title: Split between client-side architect and system integrator
columns: Topic | Client-side architect | System integrator
Target architecture and system boundaries | Drafts, client decides * | provides input
Solution design per stream | reviews | Designs *
Development standards | Drafts, client puts them in force * | applies them
Code and metadata | reviews via pull request | Builds *
Estimate and proposal | Reviews * | Writes *
Make-or-buy and licences | Prepares the decision * | provides input
Technical approval before the release | Go or no-go * | provides evidence
```

The decision itself is the client's, usually the head of CRM or the programme owner; business acceptance stays with the business. The architect prepares it so it can be made in one meeting, with options, costs over the lifetime and a recommendation, and then records it in the [decision log](../salesforce-architecture-decision-log/).

## When is the system integrator's architect enough?

Not every manufacturer needs an architect of its own. These criteria decide:

```tabelle
title: System integrator's architect or client-side architect
columns: Criterion | SI architect usually enough | Client-side architect advisable
Partners | One partner, no second in sight | Two or more partners in one org *
SAP and ERP | Few, simple interfaces | Customers, prices, orders, assets via SAP *
Internal experience | Someone can judge Salesforce designs | Nobody internally can say no *
Repository and pipeline | Already owned by you | Sit with the partner *
Occasion | Ongoing development | Partner switch, project in trouble, make-or-buy *
note: If no row on the right applies, spend the money on a good partner and an internal person who learns Salesforce.
```

## When do manufacturers need a client-side architect?

It looks different as soon as one of these situations occurs:

- **Several partners in one org.** Without shared standards each partner builds by its own rules. In my largest programme five implementation partners with more than 30 developers worked in eight streams on one org. The standards came from the client side, and it took about three months until they were in place.
- **SAP and other core systems.** For customers, materials, prices, orders, assets with serial numbers and service cases someone has to decide which system is the system of record. That decision holds for years, and a pure Salesforce stream often sees only its own part of it.
- **Standard product, industry cloud or custom build.** Whether Manufacturing Cloud, Field Service, an AppExchange solution or a custom build pays off depends on the business model. Someone who earns neither from licences nor from the implementation should assess that.
- **Partner switch or a project in trouble.** Then the client needs someone who understands the org and owes nothing to any partner. How a switch works is covered in [switching Salesforce partners without a standstill](../switching-salesforce-implementation-partner/).
- **No technical experience of your own.** When nobody internally can judge the partner's designs, the partner decides in practice.

```praxis
In one programme I supported, every pull request went across my desk at first. Once the process was running steadily, I handed it over to an internal colleague.
```

A client-side architect does not have to stay forever. The goal is for the role to be filled internally at some point, with documented standards and a colleague who takes over reviews and the meeting with the technical leads.

## What a client-side architect costs

An independent Salesforce architect usually charges a day rate. I work at EUR 1,200 net per day remote, plus a flat fee or expenses on site, with at least two days a week and up to five at the start. Compared with the partner budget this is a small item: in a programme with 30 developers the client pays the partners many times that. If part of that team waits even one day for a decision, it quickly costs more than a week of architect time.

What steering several partners looks like in practice is described on the [partner governance](../../services/partner-governance/) page.

## First step: assign the five conflict questions in your programme

Take the table of questions on which client and system integrator have different interests and write down, for each question, who answers it in your programme today. If the partner answers more than two of them without anyone on your side able to check the answer, you are missing the role of a client-side architect, internal or external.
