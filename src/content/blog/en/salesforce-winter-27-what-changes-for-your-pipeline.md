---
title: "Salesforce Winter '27: what changes for your pipeline"
description: "Winter '27 changes the Salesforce CLI, raises Apex limits, hides the Developer Console and starts API retirements. What dev and release teams need to adjust."
pubDate: 2026-10-23
lang: en
slug: salesforce-winter-27-what-changes-for-your-pipeline
translationKey: salesforce-winter-27-pipeline
topic: release
categories: [devops]
tags: [release management, devops, salesforce cli, winter 27, apex]
takeaways:
  - "From 28 October 2026 the Salesforce CLI command org display no longer prints access tokens, so pipeline scripts that read the token from its output will break."
  - "The Salesforce CLI now requires Node.js 22 or later, which means CI runner images and developer machines need an update."
  - "Winter '27 hides the Developer Console in Setup and makes Apex read-only in the new Web Console for production orgs, which strengthens the case for deploying only through a pipeline."
  - "Apex heap limits rise automatically from 6 to 10 MB for synchronous and from 12 to 25 MB for asynchronous code."
  - "API retirements have started: SOAP login() needs a new permission from 1 December 2026 and API versions 31.0 to 40.0 stop receiving updates in Summer '27."
faq:
  - q: "What changes in the Salesforce CLI with Winter '27?"
    a: "The org display command no longer prints secrets such as the access token, and the temporary workaround ends on 28 October 2026. The CLI also requires Node.js 22 or later."
  - q: "Is the Developer Console removed in Winter '27?"
    a: "It no longer appears in the Setup menu by default. The new Web Console replaces it, and in production orgs Apex is read-only there."
  - q: "Do I need to do anything for the higher Apex heap limits?"
    a: "No. The new limits of 10 MB for synchronous and 25 MB for asynchronous Apex apply automatically. It is still worth reviewing code that was written around the old limits."
  - q: "Which API versions are affected by the Winter '27 retirement notices?"
    a: "SOAP login() in API versions 31.0 to 64.0 is retired in Summer '27, and SOAP, REST and Bulk API versions 31.0 to 40.0 stop receiving updates in Summer '27 and fail in Summer '28."
---

Winter '27 is fully rolled out since 9 October 2026, and for development and release teams it brings changes that can break a pipeline. The most urgent one: from 28 October the Salesforce CLI no longer prints access tokens with `org display`, and the CLI now needs Node.js 22. On top of that, the Developer Console disappears from the Setup menu, Apex heap limits go up and the first API retirements take effect. None of this is dramatic on its own, but each item can stop a deployment on the wrong day. This overview is based on Salesforce's [developer guide to Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) and sorted by urgency.

## What breaks first in a Salesforce pipeline?

Two CLI changes need attention before anything else.

**The org display command no longer prints secrets.** Many pipelines and helper scripts call `sf org display` and read the access token from the output, for example to call the REST API directly or to pass the session to another tool. With Winter '27 the command no longer shows secrets. Salesforce offered a temporary workaround through the environment variable `SF_TEMP_SHOW_SECRETS`, and that workaround ends on 28 October 2026. After that date, scripts that depend on the token in the output fail.

What to do:

1. Search your pipeline definitions, scripts and repositories for `org display` and for parsing of `accessToken`.
2. Let each pipeline job authenticate directly, ideally with the JWT bearer flow and a certificate stored in the client's secret store, instead of passing tokens around between steps.
3. Test the changed jobs in a feature branch before 28 October.

![Pipeline authentication from 28 October 2026: pipelines that call sf org display, read the accessToken and pass it on break, because the command no longer shows secrets and the SF_TEMP_SHOW_SECRETS workaround ends on 28 October 2026. What works is each pipeline job authenticating itself with the JWT bearer flow and a certificate stored in the client's secret store, with no tokens passed between steps, tested in a feature branch first. Also check that the Salesforce CLI runs on Node.js 22 or later.](../../../assets/blog/winter-27-org-display-en.png)

**The CLI requires Node.js 22 or later.** CI runners often use pinned Docker images or preinstalled Node versions. If a runner still has an older Node version, installing or updating the CLI fails. Check the base images of your pipeline, the setup steps of hosted runners and the machines of your developers. Tools that build on the Salesforce CLI, such as [sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/), follow the same requirement.

## Why does the Developer Console change matter?

With Winter '27 the Developer Console no longer appears in the Setup menu by default. Its successor is the Web Console, which is generally available. In production orgs, Apex is read-only in the Web Console.

For well-run programmes this is good news. Editing code or running ad hoc changes directly in production has always been a risk: no review, no history, no way back. The new default pushes teams towards the way it should work anyway, with every change in the repository, reviewed in a pull request and deployed through the pipeline. I explain why that matters in [why pull request reviews are a must in enterprise projects](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).

Some teams still use the Developer Console for quick queries, log analysis or anonymous Apex in production. Those habits need a replacement now. Agree on which tasks are allowed in production, who may do them and how they are documented.

## What changes in Apex and LWC?

Several changes help developers, some of them automatically:

- **Higher heap limits.** The Apex heap limit rises from 6 to 10 MB for synchronous and from 12 to 25 MB for asynchronous code. This applies automatically. Code that was split into batches only to stay below the old limits can be simplified later, but there is no need to rush.
- **Warnings for very old API versions.** The compiler now warns about classes and triggers saved with API versions 9.0 to 19.0. In older enterprise orgs such classes still exist. They are good candidates for clean-up.
- **New Apex features in preview and beta.** Integration tests are available as developer preview. `FORMULA()` in SOQL, the Apex Symbol API and cursors for Data 360 objects are in beta. Beta features should not end up in production code without a deliberate decision.
- **LWC improvements.** Complex template expressions, `lwc:external` for third-party web components and `refresh()` on state managers are generally available.
- **CLI templates.** The CLI has new templates for `Batchable` and `Queueable` classes and new debug options for `apex run`.

## Which API retirements start now?

Winter '27 ships API version 68.0 and starts a series of retirements that affect integrations more than the pipeline itself:

- **1 December 2026:** the SOAP API login() call requires the user permission "Use Any API Auth".
- **Summer '27:** SOAP login() in API versions 31.0 to 64.0 is retired.
- **Summer '27 and '28:** SOAP, REST and Bulk API versions 31.0 to 40.0 stop receiving updates in Summer '27 and fail in Summer '28.

Together with the end of the OAuth username-password flow on 20 February 2027, this is a real workload for integration teams. I describe the inventory and migration in [Salesforce password integrations end in 2027](../salesforce-password-integrations-end-2027/).

## What else should release managers know?

Three smaller points with governance impact:

- **The Agentforce platform is on by default.** Decide who may build and activate agents, and make sure agent configuration goes through the same release process as other metadata.
- **Gemini model rerouting.** Requests to Gemini 2.5 Pro, Flash and Flash-Lite were rerouted to newer Gemini models on 20 October 2026. If prompt templates or agents rely on a specific model, test their results again.
- **Multi-agent orchestration is generally available**, and Agent Script gained functions and `else if` chains. Both make agent logic more powerful, and more reason to review it like code.

## What is a practical checklist for Winter '27?

For a release team, these steps cover the essentials:

1. Find and fix every use of `org display` tokens in pipelines before 28 October.
2. Update Node.js to version 22 on runners, Docker images and developer machines.
3. Agree on rules for production access now that the Developer Console is hidden.
4. List classes and triggers with API versions below 20.0 and plan their update.
5. Check which integration users log in via SOAP and give them the required permission or migrate them.
6. Define who may build and activate agents, and put agent metadata under version control.
7. Retest prompt templates and agents that depended on specific Gemini models.

Three releases a year mean a checklist like this every few months. A pipeline that runs every change through validation and tests catches most of these issues early, which is one of the reasons [DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/). If you want a second opinion on your release process, [send me a message](#contact).
