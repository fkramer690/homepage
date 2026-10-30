---
title: "Salesforce partner governance for multi-vendor programmes"
headline: "Several Salesforce partners, one owner on the client side"
description: "Several implementation partners on one Salesforce org? One governance and release framework, clear ownership and reviews on the client side keep it in control."
lang: en
slug: partner-governance
translationKey: service-partner-governance
contactBrief: partner-governance
order: 7
lead: "When several implementation partners work on one Salesforce org, every partner delivers its part and nobody owns the whole. I set up one common governance and release framework on the client side and review what partners deliver, before it gets expensive."
situations:
  - "Several partners and internal teams work on the same org, and changes overwrite each other because nobody coordinates who deploys what and when."
  - "Nobody has defined which team owns which processes, objects and metadata."
  - "Similar problems are solved in very different ways, depending on which partner built them."
  - "Partner deliveries are accepted without a technical review, and problems show up in UAT or production."
  - "Repository, pipeline or backlog sit with one partner, which makes it hard to compare or replace partners."
deliverables:
  - "Governance and release framework that applies to every partner and internal team"
  - "Development and architecture standards, from naming conventions to rules for automation and test coverage"
  - "Object ownership matrix: which stream is responsible for which object and its metadata"
  - "Pull request reviews on the client side, including technical review of partner deliveries"
  - "Center of Excellence format to agree on standards and upcoming changes across streams"
  - "Onboarding of new partners into a documented setup"
  - "Handover of the process to an internal colleague"
results:
  - "Written standards that every partner follows and that reviews enforce"
  - "Clear ownership for processes, objects and metadata across all streams"
  - "Comparable partners, because they all work by the same rules"
  - "Repository, pipeline and tools owned by the client, not by a partner"
  - "An internal owner who runs the process after the handover"
phases:
  - title: "Assessment"
    icon: "analyse"
    text: "I look at how the teams actually build today: repository, deployments, pull requests, ownership and the main conflicts between streams."
  - title: "Framework and standards"
    icon: "design"
    text: "Together with the teams I write down standards, the object ownership matrix and the review rules. The first version covers most cases, edge cases follow."
  - title: "Reviews and Center of Excellence"
    icon: "team"
    text: "Every change goes through a pull request with review. Regular Center of Excellence calls raise new topics early, with enough lead time for all streams."
  - title: "Handover"
    icon: "handshake"
    text: "Once the process runs, I hand it over to an internal colleague and train them, so the client owns governance long term."
faq:
  - q: "What is Salesforce partner governance?"
    a: "It is the set of rules, roles and reviews that makes several implementation partners work on one Salesforce org in the same way: shared standards, clear ownership of objects and metadata, one release process and a technical review of every delivery."
  - q: "How long does it take to establish standards across several partners?"
    a: "In my largest programme it took about three months. The first version covered around 80 percent of the cases; the remaining edge cases were added step by step until new topics were raised early in Center of Excellence calls."
  - q: "Why should the client, not a partner, own governance?"
    a: "If one partner sets the rules, it decides how all others build, including its competitors. When the client owns standards, repository and approvals, partners stay comparable and replaceable."
  - q: "What is an object ownership matrix?"
    a: "A simple table that defines which stream or team is responsible for each Salesforce object and its metadata. It prevents two teams from changing the same object without coordination."
blogTags: [partner governance, partnersteuerung, pull request review, vendor lock-in, code quality, codequalität]
---

Partner governance on the client side is what keeps a Salesforce programme with several implementation partners in control. It means one set of standards, clear ownership for every object and process, one release process and someone who technically reviews each delivery before it moves on. Without it, every partner optimises its own scope, and the client pays for the conflicts between them. I take on this role as an independent architect, without ties to any vendor or partner.

## What does this look like in a real programme?

```kennzahlen
30+ | developers in eight streams
5 | implementation partners plus internal teams
3 | months until the standards were stable
80 % | of cases covered by the first version
source: my largest programme as an architect on the client side
```

The largest programme I steered had more than 30 developers in eight streams, delivered by five implementation partners plus internal teams. At the start, nobody had clearly defined who led which processes, objects and metadata. Changes overwrote each other, and the technical approaches of the teams had drifted far apart.

The first step was simple and effective: every change went through a pull request with a review, and for a while every single one crossed my desk. From those reviews we wrote down standards. They covered the usual topics, such as naming conventions, one automation per object and context, and test coverage. Two elements made the biggest difference:

- **An object ownership matrix**, which defined which stream was responsible for which object. Before a team changed an object it did not own, it had to coordinate with the owner.
- **Rules for configuration**, for example which values belong in custom metadata types or custom labels instead of being hardcoded.

![Simplified example of an object ownership matrix: the sales stream owns Account, Opportunity and Quote, the service stream owns Case and Asset, the field service stream owns Work Order. Every other stream coordinates with the owner before it changes one of these objects.](../../../assets/blog/object-ownership-matrix-en.png)

It took about three months until the standards were stable. The first version covered roughly 80 percent of the cases. New edge cases came up over the following weeks. We addressed them in regular [Center of Excellence calls](../../blog/salesforce-center-of-excellence-cadence/), where upcoming changes were raised with enough lead time for all streams. After a while the edge cases disappeared, because topics came up before they turned into conflicts. Once the process ran smoothly, I handed it over to an internal colleague who now owns it.

## Why does governance belong on the client side?

A partner can write good standards. What matters is who owns the rules and the tools. I explain this in more detail in [why clients should own their DevOps tools](../../blog/why-clients-should-own-their-devops-tools/).

```vergleich
without: Rules and tools with a partner
- The partner decides how every other partner builds, including its competitors.
- The repository, the pipeline and tools like Jira or Miro belong to it.
- Partners are hard to compare or replace.
with: Rules and tools with the client
- The standards, the review rights and the tools belong to the client.
- A new partner is onboarded into a documented setup.
- A partner who leaves hands over nothing but their user accounts.
- Offers can be compared fairly, and conversations about quality stay honest.
```

## How do reviews fit in without slowing the programme down?

Reviews are the instrument that turns written standards into daily practice. They do not slow things down when three conditions are met:

```stufen
1 | Small pull requests | Partner teams | Every change is small enough for a quick review.
2 | Automated checks | Pipeline | The pipeline runs every repeatable check.
3 | Agreed response times | Review by the client | Everyone knows when the review will come.
```

I describe the details in [why pull request reviews are a must in enterprise projects](../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/). Partner governance works best together with a solid release process, which is why it usually goes hand in hand with [DevOps and release management](../devops-release-management/).
