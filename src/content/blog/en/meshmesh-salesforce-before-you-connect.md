---
title: "Before you connect MeshMesh to your Salesforce org"
metaTitle: "MeshMesh Salesforce beta: checklist before you connect"
description: "MeshMesh from Salesforce is in open beta. What its docs say about permissions, data region, deployments and the health check, and what to settle before a test."
pubDate: 2026-11-11
lang: en
slug: meshmesh-salesforce-before-you-connect
translationKey: meshmesh-salesforce-checklist
topic: ai
categories: [ai, devops]
tags: [MeshMesh, AI agent, Salesforce org, Permissions, Data protection, Health check]
takeaways:
  - "MeshMesh acts with the permissions of the signed-in Salesforce user. If an admin signs in, the agent has admin rights in Build Mode."
  - "The beta is capped at 1,000 accounts, includes 100,000 credits and is expected to end on January 31, 2027. Price and scope after that are open."
  - "MeshMesh lists Manufacturing Cloud, CPQ and Flows as experimental. The announcement speaks of more than 40 products."
  - "MeshMesh runs in the US East region on Anthropic models. Data protection and the works council belong before the first login."
  - "The agent's changes should go through your pipeline as a branch, not as a direct deployment into a shared sandbox."
faq:
  - q: "What is MeshMesh from Salesforce?"
    a: "MeshMesh is an AI agent that analyzes a Salesforce org, fixes problems and builds new features. Salesforce acquired the start-up in July 2026, and an open beta has been running since November 2026."
  - q: "How much does MeshMesh cost?"
    a: "Nothing during the beta: every account gets 100,000 credits until the beta ends. Pricing and packaging for general availability, planned for Salesforce fiscal year 2028, have not been set."
  - q: "Who can join the MeshMesh beta?"
    a: "Customers with an active Salesforce SKU and recognized Salesforce partners. The beta is capped at 1,000 accounts, admitted in cohorts; after that there is a waitlist."
  - q: "Can MeshMesh work in a production org?"
    a: "Technically yes. For the beta I recommend a developer sandbox. For analysis in production, MeshMesh offers a connection through Salesforce Headless 360 that only allows read access."
  - q: "Which AI models does MeshMesh use?"
    a: "According to the MeshMesh FAQ, models from Anthropic, under an enterprise agreement without training on customer data and without data retention. Processing runs in the US East region."
draft: false
---

MeshMesh is an AI agent from Salesforce that analyzes an org, fixes problems and builds new features, all driven by a conversation. An open beta with free credits has been running since November 2026. Before you connect MeshMesh to your Salesforce org, settle five points: which user the agent works as, in which environment, whether its changes go through your pipeline, where the data is processed and who checks the findings of its health check. My recommendation for a test: a developer sandbox, a dedicated integration user without admin rights, and Plan Mode only at first.

## What is MeshMesh from Salesforce?

MeshMesh was founded in 2023 by Kevin Nuest, David DeVore and Calvin Hoenes. In July 2026 the team moved to Salesforce. At first, Salesforce would not tell [Salesforce Ben](https://www.salesforceben.com/has-salesforce-acquired-meshmesh/) whether this was an acquisition. The [investor release of July 24, 2026](https://investor.salesforce.com/news/news-details/2026/Salesforce-Grants-Equity-Awards-to-Qualified-and-MeshMesh-Under-Its-Inducement-Equity-Incentive-Plan/default.aspx) then calls it one and names three MeshMesh employees who received stock awards. Salesforce has not disclosed a price.

Mike Wolff, Chief Growth Officer at Salesforce, announced the open beta [on LinkedIn](https://www.linkedin.com/posts/mwolff1_introducing-the-meshmesh-from-salesforce-activity-7525971855753789440-9X06) in November. His key sentence: "Work that used to be complex, slow, and expensive becomes a conversation." He splits the work into diagnose, fix and build. According to the [MeshMesh website](https://meshmesh.io), the product is part of Maestro, a Salesforce initiative to make using and implementing every Salesforce product simple. I found no Salesforce source on Maestro itself.

According to the [documentation on agents](https://docs.meshmesh.io/concepts/agents), MeshMesh works in three modes. In Plan Mode the agent reads the org and writes a plan; in Research Mode it produces analyses and reports. Neither changes anything. Only in Build Mode does MeshMesh change the org: it deploys metadata, changes data and, where needed, works the user interface in a browser. Its Salesforce knowledge is held in a context layer that MeshMesh calls Cloud Control. The language models behind it come from Anthropic, according to the [MeshMesh FAQ](https://docs.meshmesh.io/faq).

## The MeshMesh documentation is more careful than the announcement

The announcement sounds like a finished product for every cloud. The MeshMesh documentation describes a beta with limits, and the documentation is what your planning should rely on.

```tabelle
title: MeshMesh: announcement and documentation, as of Nov 11, 2026
columns: | Announcement | Documentation *
Products | Context layer understands more than 40 products | Website: 34 clouds, context model: 18+ products in depth, many marked experimental
Access | Beta open to everyone | 1,000 accounts in cohorts, then a waitlist
Requirement | not stated | Customers with an active Salesforce SKU or recognized partners
Cost | not stated | 100,000 free credits per account, price after the beta open
Period | not stated | From Nov 2, 2026, expected end Jan 31, 2027
note: Sources: Mike Wolff's LinkedIn post, meshmesh.io, and the FAQ and product overview in the MeshMesh documentation.
```

One detail matters for manufacturers. The [product overview](https://docs.meshmesh.io/) lists Manufacturing Cloud, CPQ, Flows and Reports and Dashboards as experimental. Sales Cloud, Service Cloud, Field Service, Data Cloud and Agentforce appear without that label. If MeshMesh works on your sales agreements or complex flows, you are testing an experimental capability inside a beta.

MeshMesh plans general availability for Salesforce fiscal year 2028, which starts in February 2027. Scope, price and packaging can change until then, so a budget cannot be planned with any confidence today. Independent consultants without partner status or their own SKU cannot join the beta. I cannot test MeshMesh myself for that reason; everything here comes from the documentation and the sources named.

## Whose permissions does MeshMesh use in your org?

The default connection is a managed package. A Salesforce admin installs it once per org and enables the external client app "MeshMesh Studio". After that, every user of the org connects through OAuth, with their own Salesforce login. The [guide to the managed package](https://docs.meshmesh.io/guides/connect-salesforce-managed-package) is clear about the consequence: the agent can do everything the signed-in user can do, and nothing more.

If a system administrator signs in, MeshMesh can write Apex, change permissions and delete data in Build Mode. MeshMesh itself recommends a dedicated integration user without the permissions Modify All Data, Customize Application, Author Apex and Manage Users. For production orgs there is also a connection through [Salesforce Headless 360](https://docs.meshmesh.io/guides/connect-salesforce-headless-360), itself in beta, where MeshMesh allows read access only on every request.

My rule for the beta: the agent works with its own user, never with an admin's login, and only in a developer sandbox. The MeshMesh FAQ also advises always connecting a sandbox or test environment. Which data may be stored there is covered in [sandbox customer data and AI coding agents](../sandbox-customer-data-ai-coding-agents/). A full copy sandbox with dealer prices and service cases is the wrong place for an agent in beta.

## MeshMesh changes belong in the repository

In Build Mode, MeshMesh deploys metadata straight into the connected org. According to the website, the agent tests changes in a sandbox before they are deployed to production, and every change can be rolled back. That does not replace the route every other change takes in a well-run program: branch, pull request, review, validation deployment and release.

According to the [guide to the GitHub connection](https://docs.meshmesh.io/guides/connect-github), MeshMesh can clone repositories, create branches, commit and push. The agent uses the GitHub account of the person who starts it. Use that route: MeshMesh delivers a branch, and your pipeline decides whether the change is deployed to the org. An agent that deploys straight into a shared sandbox causes the same conflicts as a developer who bypasses the pipeline. For GitLab, Azure DevOps or Bitbucket the documentation names no ready-made integration, only the general connection through MCP servers.

```praxis
In a program with several implementation partners, every pull request went across my desk at first; later I handed that over to an internal colleague. The shared standards only held because no change bypassed that route. I treat an AI agent as one more developer: it follows the same rules, or it works only in its own sandbox.
```

What a review should also check for code written by agents is in [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/). How a pipeline for several teams is set up is on my page about [DevOps and release management](../../services/devops-release-management/).

## Where does MeshMesh process your data?

According to the [documentation on the network allowlist](https://docs.meshmesh.io/network-allowlist), MeshMesh runs in the US East region. MeshMesh asks customers whose data must be processed in the EU to get in touch and then sets up dedicated regional infrastructure. For the connection to Salesforce, MeshMesh uses two fixed IPv4 addresses shared by all customers. If your org restricts login IP ranges, you have to allow both.

The models come from Anthropic. According to the FAQ, MeshMesh has an enterprise agreement that rules out training on customer data and data retention at the model provider. For your data protection officer this means one more service provider with processing in the US. That does not rule out a test, but it belongs in the review before the first login.

In Germany, the works council is also involved. According to its [security page](https://docs.meshmesh.io/security), MeshMesh keeps complete audit trails for all actions. A tool that produces usage data per person usually falls under co-determination under section 87 (1) no. 6 of the German Works Constitution Act. The details are in [AI coding tools: works council and GDPR](../ai-coding-tools-works-council-gdpr/).

```hinweis offen
Region of processing, list of subprocessors, retention of org metadata and query results at MeshMesh, and the contractual basis of the beta: get these answers in writing before any user makes the connection.
```

## The MeshMesh health check does not replace your own review

The screenshot in Mike Wolff's post shows a Data 360 health check. Since [November 9, 2026](https://docs.meshmesh.io/releases/2026-11-09), MeshMesh has offered the recipe "Audit Snapshot of Org Health" for this. According to the [recipe description](https://docs.meshmesh.io/recipes/audit-snapshot-of-org-health), it only reads the org, takes 30 to 45 minutes and needs an admin-level user with read access to Setup. The result is a score across six dimensions, a license overview with active and idle seats, a funnel from ingestion to activation in Data Cloud, a section on security and code, and up to 15 prioritized moves.

As a starting point for an inventory that is useful, and in the beta it only costs credits. I would still check two areas myself.

On licenses, the report comes from the vendor that sells them. That is not automatically a conflict of interest, since the report does show idle seats. From my pre-sales work with Salesforce, though, I know that full licenses are offered by default, including for users who only read data or approve records. With a large user base that easily adds up to six figures a year. Login data does not show whether an active user would need a cheaper license type. Only a look at what that user does shows it, which is how I approach [make-or-buy and licenses](../../services/make-or-buy-licences/).

On Data Cloud, the report shows where the data pipeline stops and suggests moves on credit consumption. Whether a data stream is needed at all, or whether the ERP should send the data to Salesforce directly, is an architecture decision. A health check can prepare it but cannot make it. What an AI-assisted analysis has to deliver before a partner switch is covered in [AI org assessment: technical debt before a partner switch](../ai-org-assessment-technical-debt/).

## First step: test MeshMesh in a developer sandbox until the end of January

The beta is expected to run until January 31, 2027. That is enough time for a small, clean test that gives you your own evidence before general availability. The durations are my suggestion for a mid-sized org.

```schritte
Prepare the sandbox | 1 week · IT
  Developer sandbox with test data, dedicated integration user, data protection and works council informed.
Read and plan | 1 week · Architecture
  MeshMesh runs the health check and plans two real stories in Plan Mode.
Build on a branch | 2 weeks · Development
  Build Mode writes to a branch, the pipeline checks it, a person reviews it.
Assess | 1 day · IT leadership
  Compare time, quality and review effort with how your team delivers today.
```

Pick two stories from your backlog that your team has already estimated, for example a validation rule with exceptions and a flow with an approval. Then measure MeshMesh against that estimate and against the review effort, not against the "up to 90%" time saving on the website.
