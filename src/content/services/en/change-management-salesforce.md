---
title: "Change management for Salesforce programmes"
description: "Change management for Salesforce programmes: introduce new processes, standards and releases so business teams, developers and partners use them every day."
lang: en
slug: change-management-salesforce
translationKey: service-change
order: 7
lead: "A new Salesforce release is rolled out quickly. Whether business teams, developers and partners work differently afterwards is another question. I plan the introduction of new processes and standards on the client side so they reach daily work and stay there."
situations:
  - "Salesforce is live, but parts of the business still work with Excel, email and their own lists."
  - "New standards for development and release have been agreed, but every partner and team reads them differently."
  - "Releases become smaller and more frequent, and business teams learn about changes only once they are in production."
  - "Management expects results from the programme but is rarely there when decisions about the rollout are due."
deliverables:
  - "Rollout plan per release: which groups are affected, what changes for them and when they hear about it"
  - "A format in which business teams, developers and partners see upcoming changes early and can have a say"
  - "Introduction of new standards in stages, starting with the most common cases"
  - "Alignment with management on backing, priorities and open decisions"
  - "A feedback route from daily work back into the backlog"
results:
  - "Processes and standards that are used in daily work, not only written down"
  - "Business teams that know before a release what changes for them"
  - "Teams and partners that work by the same rules"
  - "Fewer shadow solutions next to Salesforce"
phases:
  - title: "Affected groups and changes"
    text: "I clarify which groups a release or a new standard affects and what changes in concrete terms for each group in its daily work."
  - title: "Rollout in stages"
    text: "The most common cases come first. Edge cases follow step by step instead of trying to settle everything in a first version."
  - title: "Early alignment"
    text: "Upcoming changes are raised with enough lead time, in a fixed format for business teams, developers and partners."
  - title: "Follow-up"
    text: "Feedback from daily work goes back into the backlog, and I check whether new processes and standards are actually used."
faq:
  - q: "How long does it take to introduce new standards in a large programme?"
    a: "In my largest programme, with more than 30 developers and five implementation partners, about three months. The first version covered around 80 percent of the cases, and the edge cases were added over time."
  - q: "Who has to take part in change management?"
    a: "Business teams, developer teams, partners and management. Without backing from management, decisions and attention are missing, and new rules become a recommendation that not everyone follows."
  - q: "What changes with smaller, more frequent releases?"
    a: "Business teams get small changes more often instead of rare large packages. That lowers the risk of each release but needs a fixed route on which the people affected learn in advance what is coming."
blogTags: [Partner governance, Governance, DevOps training, Release management]
---

Change management in a Salesforce programme means introducing new processes, standards and releases so that the people who work with them actually use them. That applies to the business teams who do their daily work in Salesforce as much as to the developer teams and implementation partners who are meant to build by common rules. I take on this work on the client side, closely tied to architecture, partner governance and release management, because that is where most changes start.

## Why do new processes not reach daily work?

A release is technically rolled out in minutes. What happens next decides whether anyone works differently. The reasons it does not happen are usually the same:

- **The people affected hear about it too late.** Anyone who first sees a change in production looks for a way around it.
- **Everything is meant to be settled at once.** A first version that tries to cover every edge case arrives late and is rarely read.
- **Backing from management is missing.** Without decisions from the top, new rules stay a recommendation.
- **There is no way back.** Problems from daily work end up in emails, not in the backlog.

## How did I introduce new standards in a large programme?

In my largest programme, more than 30 developers worked in eight streams with five implementation partners. Common standards for naming conventions, one automation per object, test coverage and an [object ownership matrix](../../blog/salesforce-object-ownership-matrix/) took about three months until people lived by them.

The first version covered around 80 percent of the cases. The edge cases were added step by step as they came up in the project. Later we raised new topics with lead time in regular Center of Excellence calls, before they turned into problems. At some point hardly any new edge cases came up. I describe the rules for several partners under [partner governance](../partner-governance/).

## What changes for business teams?

With a clean release process, releases become smaller and more frequent. For business teams this means small changes more often instead of one large package per quarter. For that to work, they need a fixed route on which they learn in advance what changes, and a route back on which they report what does not fit their daily work. Before each release I clarify with the owners in the business which teams are affected, what changes in their processes and who informs them. That goes into the release plan before development is finished. After the release I check whether the new processes are used and bring feedback from daily work into the backlog. I describe the release process itself under [DevOps and release management](../devops-release-management/).

If a rollout is coming up or new processes are not being used, [write to me](#contact) or read more [about me](../../#about).
