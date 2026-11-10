---
title: "Fit-gap analysis for a Salesforce project, done right"
metaTitle: "Fit-Gap Analysis for Salesforce: Process and Template"
description: "Fit-gap analysis for Salesforce: how to check requirements against the standard, who should attend the workshops and which columns the template should include."
pubDate: 2026-11-23
lang: en
slug: fit-gap-analysis-salesforce
translationKey: fit-gap-analysis-salesforce
topic: governance
categories: [architecture]
tags: [fit-gap analysis, discovery, requirements, make or buy, change requests, decision log]
takeaways:
  - "A gap is only closed once a solution is decided: adapt the process, AppExchange, custom build or another system."
  - "The most expensive mistake happens before the rating: the workshop is attended by people who do not run the process themselves."
  - "For manufacturers, the effort lies in the edge cases. Analysing only the standard case leads to change requests after the fixed price has been agreed."
  - "Whether a requirement fits the standard also depends on edition and licenses. The fit-gap list is a license question as well."
faq:
  - q: "What is the difference between a fit-gap analysis and a gap analysis?"
    a: "A gap analysis compares a current state with a target state in general, for example in strategy, quality or skills. A fit-gap analysis checks, before a software rollout, which requirements the standard of a specific product covers and where gaps remain."
  - q: "Who should create the fit-gap analysis for Salesforce?"
    a: "The implementation partner rates the requirements because it knows the product in detail. The list and the decision on every gap should remain with the client; an architect on the client side checks whether the rating and the effort estimate are plausible."
  - q: "What happens to a gap in a fit-gap analysis?"
    a: "Typical options are: adapt the process to the standard, buy an AppExchange solution, build on the platform, leave the requirement in another system, or drop or defer it. The choice depends on frequency, business value and the maintenance effort for each Salesforce release."
  - q: "When does the fit-gap analysis happen in a Salesforce project?"
    a: "Before the binding offer, so in discovery or a paid pre-phase. If it happens only after the fixed price has been agreed, every gap outside the agreed scope usually turns into a change request."
draft: false
---

A fit-gap analysis checks every requirement of your processes against the Salesforce standard before implementation and rates it: the standard fits, the requirement can be met through configuration, or a gap remains, for which someone decides on a solution and an effort estimate. At manufacturers the value of the analysis depends on two conditions. The workshop is attended by the people who run the process every day, and the edge cases are on the table. Without both, you find the gaps in acceptance testing, and each of them turns into a change request.

## What a fit-gap analysis does for Salesforce

The fit-gap analysis connects process discovery with the offer. For every requirement, it answers how Salesforce covers it and how much that costs. It shares the idea of a gap with the general gap analysis from management, but applies it to a specific product: what can Salesforce do with the edition and licenses you plan to buy?

Every requirement receives one of three ratings:

```tabelle
title: Ratings in a fit-gap analysis
columns: Rating | What it means | Example for manufacturers
Fit | The standard covers the requirement without changes | Maintain contacts for a customer
Configuration | The standard is enough with fields, layouts, flows or permissions | Required fields per order type, approval above a discount threshold
Gap | The standard is not sufficient; a solution has to be chosen * | Select several records in one step in the technician's mobile flow
note: Only the marked row needs a decision on the solution. Configuration also requires design decisions, takes effort and belongs in the estimate.
```

In the SAP world a related approach is called fit-to-standard: the standard is demonstrated first, then the business says where it falls short. The same sequence works just as well for Salesforce, because business users judge a process better when they see it on screen than when they read a description on a slide.

## Why fit-gap analyses fail at the current process

Many gaps that surfaced late in my projects originated in process discovery.

```praxis
In every one of my projects, acceptance testing took longer than the client had planned, and change requests followed, because the business had not looked closely enough at its current state and the planned solution beforehand. In one project the process analysis sessions were not attended by the right people, because the actual contacts had not been released from their daily work. Incompletely captured current processes led to target processes that were not ideal, and shortly before go-live the business raised a large number of change requests.
```

A fit-gap analysis can only assess what is discussed in the workshop. If a team lead describes the process as the handbook describes it, the analysis rates exactly that process. The clerk in inside sales who handles warranty cases for three key accounts under account-specific rules is not in the room, and those exceptions are missing from the list. Those exceptions only become visible when the clerk uses the system with real cases for the first time in acceptance testing.

## Who belongs in fit-gap workshops

You need four roles in every workshop:

- **The people who run the process every day.** From inside sales, dispatch, service management or field service. They know the exceptions because they solve them every day.
- **A process owner with decision-making authority.** This person decides during the workshop whether an exception is kept or dropped. Without them, every gap gets postponed.
- **An architect who knows Salesforce and the neighbouring systems.** The architect recognises when a requirement belongs in the ERP or when the standard covers it with a different license.
- **The implementation partner's business analyst.** The analyst knows the product in detail, demonstrates the standard and records the rating. For topics such as Field Service or integrations, a solution architect from the partner joins.

The first group is the hardest to free up because day-to-day business needs them. So plan their time for these sessions as firmly as you plan the budget. If they cannot attend, postpone the workshop: with the wrong people, you get a list that looks complete but is not.

## Edge cases determine the effort

For manufacturers, the standard case can usually be demonstrated quickly: a service case, a field visit, a simple quote. The effort lies in the cases around it and at the interface with the ERP, for example prices, variants and availability. I have seen estimates where discovery covered only the happy path, the standard case by the book. The edge cases were then submitted as change requests, and the fixed price existed only on paper. For what to look for when choosing the partner, see [how to choose a Salesforce implementation partner](../how-to-choose-a-salesforce-implementation-partner/).

These questions bring edge cases to light:

- What happens when a customer who is blocked in the ERP places an order?
- How is a job handled when it runs over several days and technicians change?
- What does the technician do when no serial number can be read on the machine?
- Who approves an order when the approver is on holiday?
- Which countries, plants or brands work differently, and why?

Some gaps only become apparent when someone walks through the process step by step. In my Field Service projects this is the gap that hurts most: flows in the Field Service mobile app do not provide a data table, so the technician cannot select several records from a list in one step. If the fit-gap analysis finds it, the team plans a solution. If acceptance testing finds it, it becomes a change request. The details are in [Field Service Mobile App: flow limitations in Winter '27](../field-service-mobile-flow-limitations/).

## How does a fit-gap analysis work?

A fit-gap analysis for Salesforce has five steps. How long it takes depends on how many processes and variants you have.

```schritte
Scope the processes | client and architect
  A process list with variants by country, plant and brand, plus the systems at the edges.
Capture the current process | business
  With the people who run the process, including the most common exceptions.
Demonstrate the standard | partner
  Show the process in a demo org using standard functionality and note deviations.
Rate | partner and architect
  Rate every requirement as fit, configuration or gap, with a rough effort estimate.
Decide on gaps | process owners
  Choose a solution for each gap and record it in the decision log.
```

The third step is what separates a fit-gap analysis from a requirements list in Excel. Once the business sees the standard, some requirements are dropped because the standard solves them differently and well enough. Others only emerge at this point because someone says: that is not how we work.

The rating is made against the licenses you plan to buy. Whether a requirement is a fit or a gap often depends on the edition, an add-on or an industry cloud. In one manufacturing project, sales agreements, a core feature of Manufacturing Cloud, were not relevant to the business. A custom solution on the core platform was cheaper and simpler to maintain. I describe such trade-offs on the page [license check and make or buy](../../services/make-or-buy-licences/).

## Template: the columns a fit-gap list should include

The fit-gap list is a table with one row per requirement. Every row contains these fields:

```eintrag Fit-gap list
Requirement | The requirement in the business's own words, with number and process step
Frequency and risk | How often the case occurs and what happens if it is missing
Rating | Fit, configuration or gap *
Solution | For a gap: adapt the process, AppExchange, custom build or other system
Effort and license | A rough estimate and whether another edition, an add-on or more licenses are needed
Decision | Who decided, when, and with a reference to the decision log
note: With this list, any partner can give an initial estimate, and after a change of partner the new partner knows what was built and why.
```

Many templates leave out the frequency and risk column, yet it is the most useful one. A gap that occurs twice a year rarely justifies a custom build that has to be retested for each of the three Salesforce releases per year. The calculation changes when the rare case has legal or contractual consequences, for example a recall or a response time promised to a key account. For a binding offer, the list alone is not enough: integrations, data migration, permissions and acceptance criteria must be covered too. The license column prevents a solution from being approved whose license costs nobody planned for.

## Every gap needs an agreed solution

For every gap, you choose one of these options, and each has a cost:

- **Adapt the process.** Fits when the deviation has no business value and grew out of habit. The cheapest option, but it needs the backing of the process owner.
- **AppExchange solution.** Fits when a package covers the case. You pay ongoing license costs and bring in another vendor.
- **Custom build on the platform.** Fits when the case is frequent and has clear business value. It only pays off if tests and standards keep maintenance manageable for every release.
- **Other system.** Fits when the data is mastered there anyway, for example prices or stock in the ERP. The gap then becomes an interface, as described on the page [Salesforce integration](../../services/salesforce-integration/).
- **Drop or defer.** Fits when nobody can justify the value of the requirement or it can wait for a later phase. Record who decided this.

The first question for every gap is therefore whether the process can be adapted. Only once the process owner explains why the deviation has to stay is it worth discussing code or packages. Record the decision and its rationale; the article on the [decision log](../salesforce-architecture-decision-log/) shows what such a log looks like.

## Who owns the fit-gap analysis

Usually the implementation partner creates the fit-gap analysis as part of discovery. That makes sense, because it knows the product. Two things should still remain with the client: the list itself, in your own wiki or ticket system, and the decision on every gap.

The partner rates what it would implement and prepares its offer on that basis. An architect on the client side checks whether rating and effort are plausible and whether a gap is cheaper to close in the standard, with a different license or in another system. The difference between the two roles is described in [Salesforce architect or system integrator?](../salesforce-architect-vs-system-integrator/), and how I set up this work is on the page [Salesforce architecture](../../services/salesforce-architecture/).

## First step: collect ten exceptions per process

Before you plan the first fit-gap workshop, ask one person in each process area who runs the process every day to write down the ten most common exceptions, plus the rare ones that become expensive if they are missed: what happens, how often it occurs and who makes the decision today. This list goes to the partner before the workshop. After an hour of preparation, you can see whether your discovery assesses the standard case or your day-to-day business.
