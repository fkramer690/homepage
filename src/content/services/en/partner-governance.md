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
  - "I review every partner delivery in a pull request before it moves to the next environment."
  - "I write down the standards with the teams, based on what keeps coming up in reviews."
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
    text: "I look at how the teams build today: repository, deployments, pull requests, ownership and the main conflicts between streams."
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
source: my largest programme as an architect on the client side
```

At the start of this programme, nobody had defined who led which processes, objects and metadata. Changes overwrote each other, and the technical approaches of the teams had drifted far apart.

First, every change went through a pull request with a review, and for a while every single one crossed my desk. From those reviews we wrote down standards: naming conventions, one automation per object and context, test coverage. The object ownership matrix and the rules for configuration made the biggest difference. The matrix defined which stream was responsible for which object, and before a team changed an object it did not own, it coordinated with the owner. The configuration rules set out which values belong in custom metadata types or custom labels, so they are not hardcoded.

```tabelle matrix
title: Object ownership matrix, simplified example
columns: Object | Sales stream | Service stream | Field service stream
Account | Owner * | coordinates | coordinates
Opportunity | Owner * | coordinates | coordinates
Quote | Owner * | coordinates | coordinates
Case | coordinates | Owner * | coordinates
Asset | coordinates | Owner * | coordinates
Work Order | coordinates | coordinates | Owner *
note: Before a team changes another team's object, it coordinates with the owner.
```
After the first version, new edge cases came up over the following weeks. We addressed them in regular [Center of Excellence calls](../../blog/salesforce-center-of-excellence-cadence/), where upcoming changes were raised with enough lead time for all streams. After a while the edge cases disappeared, because topics came up before they turned into conflicts. Once the process ran smoothly, I handed it over to an internal colleague who has owned it since.

## Rules and tools belong to the client

A partner can write good standards too. But if it sets the rules, it decides how everyone else builds, including its competitors. If the repository, the pipeline and tools like Jira or Miro also sit with that partner, every change of partner gets expensive.

When the client owns the standards, the approval rights and the tools, a new partner starts with the same rules, tools and rights as everyone else, and a partner who leaves hands over nothing but their user accounts. Offers can then be compared fairly, because everyone delivers under the same conditions. More on this in [why clients should own their DevOps tools](../../blog/why-clients-should-own-their-devops-tools/).

## How do reviews fit in without slowing the programme down?

Reviews turn written standards into daily practice. They do not slow things down when pull requests are small, the pipeline runs every repeatable check and everyone knows when the review will come:

```stufen
1 | Small pull requests | Partner teams | Every change is small enough for a quick review.
2 | Automated checks | Pipeline | The pipeline runs every repeatable check.
3 | Agreed response times | Review by the client | Everyone knows when the review will come.
```

I describe the details in [why pull request reviews are a must in enterprise projects](../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/). The pipeline these checks run on is part of [DevOps and release management](../devops-release-management/); without one shared release process, no governance framework holds.
