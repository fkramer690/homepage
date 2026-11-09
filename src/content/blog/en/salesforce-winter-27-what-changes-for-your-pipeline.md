---
title: "Salesforce Winter '27: what changes for your CI/CD pipeline"
description: "Around Winter '27 the Salesforce CLI stops printing tokens, Apex limits rise, the Developer Console is hidden, API retirements near. What release teams adjust."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: salesforce-winter-27-what-changes-for-your-pipeline
translationKey: salesforce-winter-27-pipeline
topic: release
categories: [devops]
tags: [release management, devops, salesforce cli, winter 27, apex]
takeaways:
  - "Since CLI 2.156.8 (28 October 2026) org display hides access tokens even with the old workaround, so scripts that read the token from it fail."
  - "The Salesforce CLI now requires Node.js 22 or later. npm installs and custom CI images need an update; the OS installers bundle Node.js 24."
  - "The Developer Console is hidden from Setup by default and in maintenance mode. In the new Web Console, Apex is read-only in production."
  - "Apex heap limits rise automatically from 6 to 10 MB for synchronous and from 12 to 25 MB for asynchronous code."
  - "API retirement dates are close: SOAP login() needs a new permission from 1 December 2026, and inactive orgs lose SOAP login() from 15 December 2026."
faq:
  - q: "What changes in the Salesforce CLI with Winter '27?"
    a: "Strictly these are CLI releases, which ship weekly, not part of the platform release. Since CLI 2.136.8 (27 May 2026) org display no longer prints secrets such as the access token, and CLI 2.156.8 removed the temporary workaround on 28 October 2026. Secrets are now shown only by the sf org auth show commands. The CLI also requires Node.js 22 or later; the OS installers bundle Node.js 24."
  - q: "Is the Developer Console removed in Winter '27?"
    a: "No. It no longer appears in the Setup menu by default and is in maintenance mode, but an admin can re-enable it. Salesforce positions the new Web Console as its successor; in production orgs Apex is read-only there."
  - q: "Do I need to do anything for the higher Apex heap limits?"
    a: "No. The new limits of 10 MB for synchronous and 25 MB for asynchronous Apex apply automatically. It is still worth reviewing code that was written around the old limits."
  - q: "Which API versions are affected by the Winter '27 retirement notices?"
    a: "SOAP login() in API versions 31.0 to 64.0 is retired in Summer '27, and SOAP, REST and Bulk API versions 31.0 to 40.0 stop receiving updates in Summer '27 and fail in Summer '28."
---

Winter '27 completed its production rollout in October 2026, and together with the weekly CLI releases around it, it brings changes that can break a CI/CD pipeline. The most urgent one: since 28 October the Salesforce CLI no longer prints access tokens with org display, even with the old workaround, and the CLI now needs Node.js 22. On top of that, the Developer Console is hidden from the Setup menu, Apex heap limits go up and the first API retirement dates are weeks away. The CLI changes can break CI now, the API dates break integrations later. This overview follows Salesforce's [developer guide to Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release).

## What breaks first in a Salesforce pipeline?

Two CLI changes need attention before anything else.

**The org display command no longer prints secrets.** Many pipelines and helper scripts call sf org display and read the access token from the output, for example to call the REST API directly or to pass the session to another tool. Since CLI version 2.136.8 of 27 May 2026 the command no longer shows secrets. Salesforce offered a temporary workaround through the environment variable SF_TEMP_SHOW_SECRETS and removed it with [CLI version 2.156.8](https://github.com/forcedotcom/cli/blob/main/releasenotes/README.md) on 28 October 2026. The CLI ships weekly, so these changes are not tied to the platform release; they hit every runner that updates the CLI. To read a secret on purpose, the release notes point to the sf org auth show-\* commands.

```hinweis achtung
The workaround ended with CLI 2.156.8 on 28 October 2026. On any runner with that version or later, scripts that depend on the token in the output of org display fail, even if SF_TEMP_SHOW_SECRETS is set.
```

What to do:

1. Search your pipeline definitions, scripts and repositories for org display and for parsing of accessToken.
2. Let each pipeline job authenticate directly, ideally with the JWT bearer flow: the private key sits in the secret store of the CI platform, the matching certificate in the External Client App, instead of passing tokens around between steps.
3. Test the changed jobs in a feature branch, starting with jobs that have failed since the CLI update.

![Pipeline authentication from 28 October 2026: pipelines that call sf org display, read the accessToken and pass it on break, because the command no longer shows secrets and the SF_TEMP_SHOW_SECRETS workaround ends on 28 October 2026. What works is each pipeline job authenticating itself with the JWT bearer flow and a certificate stored in the client's secret store, with no tokens passed between steps, tested in a feature branch first. Also check that the Salesforce CLI runs on Node.js 22 or later.](../../../assets/blog/winter-27-org-display-en.png)

**The CLI requires Node.js 22 or later.** This matters where the CLI is installed with npm or runs in a self-built image: if such a runner still has an older Node version, installing or updating the CLI fails. The operating system installers bundle their own runtime, currently Node.js 24. Check the base images of your pipeline, the setup steps of hosted runners and the machines of your developers. Check tools that build on the Salesforce CLI, such as [sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/), as well.

## The Developer Console is hidden from Setup

With Winter '27 the Developer Console no longer appears in the Setup menu by default. According to the [release note](https://help.salesforce.com/s/articleView?id=release-notes.rn_developer_console.htm&language=en_US&type=5) it is in maintenance mode, gets only high-severity security fixes, and an admin can re-enable it. Its successor is the Web Console, which is generally available. In production orgs, Apex is read-only in the Web Console.

For well-run programs little changes. Editing code or running ad hoc changes directly in production has always been a risk: no review, no history, no way back. The new default pushes teams towards the way it should work anyway: every code and metadata change in the repository, reviewed in a pull request and deployed through the pipeline. I explain why that matters in [why pull request reviews are a must in enterprise projects](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).

Some teams still use the Developer Console for quick queries, log analysis or anonymous Apex in production. Those habits need a replacement now. Agree on which tasks are allowed in production, who may do them and how they are documented.

## What changes in Apex and LWC?

Several changes help developers, some of them automatically:

- **Higher heap limits.** The Apex heap limit rises from 6 to 10 MB for synchronous and from 12 to 25 MB for asynchronous code. This applies automatically. I would not redesign batch or asynchronous code just because of the higher limit; transaction boundaries and error handling change too. Reassess it with performance tests when the code is touched anyway.
- **Warnings for very old API versions.** The compiler now warns about classes and triggers saved with API versions 9.0 to 19.0. In older enterprise orgs such classes still exist. They are good candidates for clean-up.
- **New Apex features in preview and beta.** Integration tests are available as developer preview. FORMULA() in SOQL, the Apex Symbol API and cursors for Data 360 objects are in beta. Beta features should not end up in production code without a deliberate decision.
- **LWC improvements.** Complex template expressions, lwc:external for third-party web components and refresh() on state managers are generally available.
- **CLI templates.** The CLI has new templates for Batchable and Queueable classes and new debug options for apex run.

## Which API retirement dates come next?

Winter '27 ships API version 68.0. None of the following retirements is in effect yet, but the first ones are weeks away, and they affect integrations more than the pipeline itself. The SOAP dates come from the [SOAP login() retirement article](https://help.salesforce.com/s/articleView?id=005132110&language=en_US&type=1):

```zeitleiste
2026-12-01 | The SOAP API login() call requires the user permission "Use Any API Auth"
2026-12-15 | Sandboxes: SOAP login() disabled in orgs without SOAP login() activity in the last six months; broad login IP ranges need a security token
2027-01-31 | Production: the same two SOAP login() rules apply
2027-02-20 | The OAuth username-password flow ends
Summer '27 | SOAP login() in API versions 31.0 to 64.0 is retired
Summer '27 | SOAP, REST and Bulk API versions 31.0 to 40.0 stop receiving updates
Summer '28 | SOAP, REST and Bulk API versions 31.0 to 40.0 fail
```

The permission only covers 1 December. Rarely run jobs, such as annual or disaster recovery processes, need a check before 15 December, because the six-month check runs once. Together with the end of the username-password flow, this is a real workload for integration teams. I describe the inventory and migration in [Salesforce password integrations end in 2027](../salesforce-password-integrations-end-2027/).

## What else release managers should know

Three smaller points with governance impact:

- **The Agentforce platform is on by default** in orgs whose licenses already include Agentforce access. Decide who may build and activate agents, and make sure agent configuration goes through the same release process as other metadata.
- **Gemini model rerouting.** Starting the week of 20 October 2026, Salesforce rerouted requests to Gemini 2.5 Pro, Flash and Flash-Lite to newer Gemini models. If prompt templates or agents rely on a specific model, test their results again.
- **Multi-agent orchestration is generally available** (rolling out since August, as Agentforce release notes update monthly), and Agent Script gained functions and else if chains. Both make agent logic more powerful, and more reason to review it like code.

## Winter '27 checklist, starting with the token scripts

Three releases a year mean a checklist like this every few months. A pipeline that runs every change through validation and tests catches most of these issues early, which is one of the reasons [DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/). For a release team, these steps cover the essentials:

1. Find and fix every use of org display tokens in pipelines; jobs that still rely on them fail on CLI 2.156.8 or later.
2. Update Node.js to version 22 or later wherever the CLI is installed with npm or in self-built images.
3. Agree on rules for production access now that the Developer Console is hidden.
4. List classes and triggers with API versions below 20.0 and plan their update.
5. Check which integration users log in via SOAP: grant the permission for 1 December, check rarely run jobs and broad IP ranges before 15 December, and plan the migration before Summer '27.
6. Define who may build and activate agents, and put agent metadata under version control.
7. Retest prompt templates and agents that depended on specific Gemini models.
