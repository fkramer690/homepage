---
title: "Salesforce implementation partner governance"
headline: "Several Salesforce partners, one owner on the client side"
description: "Several implementation partners on one Salesforce org? One governance and release framework, clear ownership and reviews on the client side keep it in control."
lang: en
slug: partner-governance
translationKey: service-partner-governance
contactBrief: partner-governance
order: 2
lead: "When several implementation partners work on one Salesforce org, every partner delivers its part and nobody owns the whole. I set up one shared governance and release framework on the client side and review what partners deliver before mistakes get expensive."
situations:
  - "Several partners and internal teams work on the same org, and changes overwrite each other because nobody coordinates who deploys what and when."
  - "Nobody has defined which team owns which processes, objects and metadata."
  - "Similar problems are solved in very different ways, depending on which partner built them."
  - "Partner deliveries are accepted without a technical review, and problems only show up in UAT or production."
  - "Repository, pipeline or backlog sit with one partner, which makes it hard to compare or replace partners."
deliverables:
  - "I review every partner delivery in a pull request before it moves to the next environment."
  - "Together with the teams I write down the standards, based on what keeps coming up in reviews."
  - "I resolve conflicts when two streams want to change the same object."
  - "I run the Center of Excellence calls in which upcoming changes are raised."
  - "I onboard new partners into the documented setup."
results:
  - "One governance and release framework that applies to every partner and internal team"
  - "Development and architecture standards, from naming conventions to rules for automation and test coverage"
  - "An object ownership matrix that assigns every object and its metadata to one responsible stream"
  - "Repository, pipeline and tools owned by your company"
  - "A trained internal colleague who runs the process after the handover"
phases:
  - title: "Assessment"
    icon: "analyse"
    text: "I analyze how the teams work today: repository, deployments, pull requests, ownership and the main conflicts between streams."
  - title: "Framework and standards"
    icon: "design"
    text: "Together with the teams I write down standards, the object ownership matrix and the review rules. The first version covers most cases, and we add edge cases later."
  - title: "Reviews and Center of Excellence"
    icon: "team"
    text: "Every change goes through a pull request with review. In regular Center of Excellence calls we discuss new topics early, with enough lead time for all streams."
  - title: "Handover"
    icon: "handshake"
    text: "Once the process runs smoothly, I train an internal colleague and hand it over, so the client owns governance in the long term."
duration: "Assessment 2 to 4 weeks. The shared standards are in place after about 3 months. Including reviews and the Center of Excellence, the handover to your team usually comes after 6 to 12 months."
notFit:
  - "Only one partner works on the org, and the collaboration runs well."
  - "The company is not willing to enforce rules with its partners."
alternatives: "An internal platform owner with a technical background can take this on in the long term, if you have one. Hiring a general contractor to steer the other partners only works as long as its interests match yours."
progress:
  - measure: "Objects with an owning stream"
    how: "How many objects in the object ownership matrix have an owning stream."
  - measure: "Conflicts between streams"
    how: "How often changes from different teams overwrite each other in the org."
  - measure: "Wait time for review"
    how: "How long a pull request waits for its review."
  - measure: "Recurring findings"
    how: "Whether the same mistakes show up less often once they are in the standard."
reference: governance
faq:
  - q: "What is Salesforce partner governance?"
    a: "It is the set of rules, roles and reviews that let several implementation partners work on one Salesforce org by the same standards: shared standards, clear ownership of objects and metadata, one release process and a technical review of every delivery."
  - q: "How long does it take to establish standards across several partners?"
    a: "In my largest program, about three months. The very first version settled around 80 percent of the cases. We added the rest bit by bit. Over time, new topics were discussed in Center of Excellence calls before they caused conflicts."
  - q: "Why should the client, not a partner, own governance?"
    a: "If one partner sets the rules, it decides how all others build, including its competitors. When the client owns standards, repository and approvals, partners stay comparable and replaceable."
  - q: "What is an object ownership matrix?"
    a: "A table with one row per Salesforce object that names one owning stream. All other teams agree any change to that object with the owner first."
  - q: "Do you replace our implementation partner?"
    a: "No. Your partners keep building, and I steer them on the client side according to shared rules. If you want to replace a partner, I help you do it without losing knowledge and without delaying the program."
  - q: "How do you avoid becoming a bottleneck?"
    a: "I keep my work transparent. Decisions, standards and review criteria are documented where your team and your partners can see them, so nobody has to wait for me and the work does not depend on me."
blogTags: [partner governance, partnersteuerung, pull request review, vendor lock-in, code quality, codequalität]
readMore: [choose-salesforce-implementation-partner, object-ownership-matrix, development-standards-definition-of-done, sandbox-strategy-multiple-partners, salesforce-center-of-excellence, fixed-price-ai-salesforce-partners, ai-org-assessment-technical-debt, salesforce-freelancer-or-consultancy]
masterclass: devops
---

Partner governance on the client side is what keeps a Salesforce program with several implementation partners under control. It means one set of standards, clear ownership for every object and process, one release process and someone who technically reviews each delivery before it moves on. Without it, every partner optimizes its own scope, and the client pays for the conflicts between them. I take on this role as an independent architect, without ties to any vendor or partner.

```partnerfluss architect
without: Without an owner on the client side | Every partner delivers its part, conflicts only show in the org.
with: With an architect on the client side | Every delivery runs through standards and review, one checked stream reaches the org.
```

## More than 30 developers, five partners and one org

```kennzahlen
30+ | developers in eight streams
5 | implementation partners plus internal teams
3 | months until the standards were stable
80 % | of cases covered by the first version
source: my largest program as an architect on the client side
```

When this program started, no object had an owner. Teams overwrote each other's changes, and each team built by its own rules.

As a first step, we agreed that every change reaches the org only through a pull request with a review, and for a while I checked all of them myself. Whatever kept coming up in those reviews became a standard, such as naming conventions, one automation entry point per object and context, and rules for test coverage. Two levers made the biggest difference:

```hebel
Object ownership matrix | One owning stream per object
  A team that wants to change another stream's object talks to the owner first.
Configuration rules | No fixed values in code
  Thresholds and switches live in custom metadata types, texts in custom labels.
```

```tabelle matrix
title: Object ownership matrix, sample excerpt
columns: Object | Sales stream | Service stream | Field service stream
Opportunity | Owner * | coordinates | coordinates
Case | coordinates | Owner * | coordinates
Asset | coordinates | Owner * | coordinates
Work Order | coordinates | coordinates | Owner *
```

The structure of the matrix, with an example, is described in [Salesforce Object Ownership Matrix: Who Owns What?](/en/blog/salesforce-object-ownership-matrix/).

In the weeks after the first version, new edge cases came up. We addressed them in regular [Center of Excellence calls](/en/blog/salesforce-center-of-excellence-cadence/), where we presented upcoming changes with enough lead time for all streams. Over time, hardly any new edge cases appeared, because topics were discussed before they turned into conflicts. Once the process ran smoothly, I handed it over to an internal colleague who has owned it since.

## Rules and tools belong to the client

A partner can write good standards too. But if it sets the rules, it decides how everyone else builds, including its competitors. If the repository, the pipeline and tools like Jira or Miro also sit with that partner, every change of partner becomes expensive.

When the client owns the standards, the approval rights and the tools, a new partner starts with the same rules, tools and rights as everyone else. A partner who leaves hands over open work and knowledge, while the repository, pipeline and standards stay where they are. Offers can then be compared fairly, because everyone delivers under the same conditions. More on this in [why clients should own their DevOps tools](/en/blog/why-clients-should-own-their-devops-tools/). What to ask about this when you select a partner is covered in [how to choose a Salesforce implementation partner](/en/blog/how-to-choose-a-salesforce-implementation-partner/).

## How do reviews fit in without slowing the program down?

Reviews turn written standards into daily practice. They do not slow things down when pull requests are small, the pipeline runs every repeatable check and everyone knows when the review will be done:

```stufen
1 | Small pull requests | Partner teams | Every change is small enough for a quick review.
2 | Automated checks | Pipeline | The pipeline runs every repeatable check.
3 | Agreed response times | Review by the client | Everyone knows when the review will come.
```

I describe the details in [why pull request reviews are a must in enterprise projects](/en/blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/). The pipeline these checks run on is part of [DevOps and release management](/en/services/devops-release-management/); without one shared release process, no governance framework holds.
