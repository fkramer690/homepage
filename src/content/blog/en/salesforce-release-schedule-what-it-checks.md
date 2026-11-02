---
title: "Salesforce Release Schedule and What IT Checks Each Time"
description: "Salesforce release schedule explained: three releases a year, sandbox preview, dates per instance and what IT leaders check before every release."
pubDate: 2026-11-02
lang: en
slug: salesforce-release-schedule-what-it-checks
translationKey: salesforce-release-schedule
topic: devops
categories: [devops]
tags: [Salesforce release, release notes, sandbox preview, release schedule, release updates, IT leadership]
takeaways:
  - "Salesforce ships three releases a year: Spring in February, Summer in June and Winter in October. You do not choose the timing."
  - "According to Salesforce, preview sandboxes get the release four to five weeks before production. A refresh before the cutoff decides which ones."
  - "For Winter '27, the release notes came out on 19 August, and production followed on three weekends between 4 September and 9 October."
  - "Each release needs five checks in the plan: release notes by product, release updates, regression test, interfaces and communication."
faq:
  - q: "How often does Salesforce release?"
    a: "Three times a year. Spring comes in February, Summer in June and Winter in October."
  - q: "When are the Salesforce release notes published?"
    a: "A few weeks before the first production date. For Winter '27, they came out on 19 August 2026, and the first production instances followed on 4 September."
  - q: "What is the Salesforce sandbox preview?"
    a: "According to Salesforce, sandboxes on preview instances get the new release four to five weeks before production. This lets you test your own customisations against the release in advance. A refresh before the cutoff decides whether a sandbox is on preview."
  - q: "When is Salesforce Spring '27?"
    a: "According to Salesforce, Spring releases come in February and the sandbox preview in January. The exact dates per instance are in the maintenance calendar on Salesforce Trust."
draft: false
---

Salesforce rolls out a major release three times a year, in February, June and October, and you do not set the timing yourself. The Salesforce release schedule therefore sets the rhythm in which IT leaders have to check: read the release notes, put sandboxes on the preview, test and inform the business. This article shows the sequence using Winter '27 as an example, which checks belong in every release and what to plan for Spring '27 now.

## How does a Salesforce release work?

According to the [Salesforce FAQ on the release schedule](https://help.salesforce.com/s/articleView?id=005224913&language=en_US&type=1), new features arrive three times a year: Spring in February, Summer in June and Winter in October. Upgrades run outside business hours and at weekends. Salesforce publishes the maintenance schedule one year in advance.

Every release has the same milestones. For Winter '27, they looked like this according to the [Salesforce Admin blog](https://admin.salesforce.com/blog/2026/admin-winter-27-release-countdown):

```zeitleiste
2026-08-13 | Sign-up for pre-release orgs
2026-08-19 | Release notes published
2026-08-27 | Sandbox refresh cutoff
2026-08-28 | Sandbox preview begins
2026-09-04 | First production instances, more on 2 and 9 October
```

So between the release notes and the last production date there were about seven weeks, and for some instances only just over two. If you only read what changes after the production date, there is no buffer left.

## The pre-release org and the preview sandbox do different jobs

Before every release, Salesforce offers two ways to see what is new early. The pre-release org is an empty Developer Edition that, according to the Admin blog, you can sign up for a few days before the release notes, for Winter '27 from 13 August. It is useful for getting to know new features and deciding whether a pilot is worthwhile. It does not contain your own customisations, data or interfaces.

That is what the preview sandbox is for. It is a copy of your org on the new release. Only there can you see whether your own flow, a validation rule or a partner's component still works the way it did before. For IT leaders, the preview sandbox is therefore the more important tool. The pre-release org is more for architects and product owners who decide about new features.

If partners develop for you, the agreement should say who runs the tests in the preview sandbox and by when results are due. Otherwise nobody tests in the end, because everyone assumes someone else did.

## The date depends on your org's instance

Your production org sits on an instance, and each instance has its own date. Which one applies is in the maintenance calendar on Salesforce Trust. For Winter '27, there were three production weekends.

For sandboxes, there is a second distinction. According to the [sandbox preview instructions](https://help.salesforce.com/s/articleView?id=000391927&type=1&language=en_US), sandboxes on preview instances are upgraded to the new release early, for Winter '27 on 28 and 29 August. Sandboxes on other instances stay on the old release and are upgraded with production. You change a sandbox's instance only through a refresh, and it only counts if it happens before the cutoff.

For planning, this means: at least one sandbox should be on the preview, so you can test the release before it reaches production. At least one should stay on the old release, so that ongoing development and hotfixes are tested against what production runs.

## Which checks do IT leaders run for each release?

The release notes are long. Nobody has to read everything, but each check needs an owner and a date:

```schritte
Release notes | week 1 · architect
  Filter by the products in use and mark changes with impact.
Release updates | weeks 1 to 2 · admin
  Check in Setup which updates are enforced and by when.
Regression test | weeks 2 to 4 · team and key users
  Run through core processes in the preview sandbox.
Interfaces | weeks 2 to 4 · integration
  Check API versions, logins and retired features.
Communication | before production · product owner
  Inform the business about visible changes.
```

For the **release notes**, filtering by the products the org actually uses helps. Then mark three kinds of change: what users see, what can break your own customisations and what is being switched off. An example for the pipeline is in [Salesforce Winter '27: what changes for your pipeline](../salesforce-winter-27-what-changes-for-your-pipeline/).

**Release updates** in Setup are changes that Salesforce enforces on a fixed date. You can activate and test them in a sandbox beforehand. If you leave them, you meet them in production on the enforcement date.

In the **regression test**, the processes that count are the ones the company earns money or serves customers with: quote, order, service case, field job. Keep the test cases from release to release, so the next run goes faster. Automated tests for the most important flows pay off especially here, because they run three times a year against a release you did not build yourself. The mobile app in field service has its own rhythm, which I describe in [Field Service app updates: test every version](../field-service-mobile-app-updates-testing/).

```praxis
In one programme, I built the release process. At first, every pull request went across my desk. Once the process was stable, I handed it over to an internal colleague.
```

Salesforce's own releases belong in the same process, with the same tests and approvals as your own releases.

For **communication**, a forwarded email from Salesforce is rarely enough. What the business needs to know is described in [communicating Salesforce releases to the business](../salesforce-release-communication-business/). Whether your own releases run stably is shown by the [DORA metrics for Salesforce](../dora-metrics-salesforce-releases/).

## Spring '27 arrives in February, the preview in January

Following the pattern in the FAQ, preview sandboxes get Spring '27 in January 2027, and production follows in February. The exact dates per instance appear in the maintenance calendar on Trust once Salesforce releases them. I update this article with every release.

```hinweis tipp
Put the three releases a year into your own release planning as fixed dates. Avoid large deployments of your own in the weeks around the production date, so that an error can be clearly attributed.
```

How I set up release processes with clients is described under [DevOps and release management](../../services/devops-release-management/).

## Fix the sandbox plan for Spring '27 in December

Decide in December which sandbox goes on the preview for Spring '27 and which stays on the current release. Use Salesforce's Sandbox Preview Guide to check which instance each sandbox is on, and plan the necessary refresh before the cutoff in January. Name an owner for each of the five checks and put the dates into the team calendar as soon as Salesforce announces the release notes.
