---
title: "Agentforce agents in the release pipeline: who releases?"
description: "How an Agentforce agent moves from sandbox to production: Agent Script in Git, validate, publish, deploy the version, activate, roll back, and who releases it."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: agentforce-agents-release-pipeline
translationKey: agentforce-agents-release-pipeline
topic: release
categories: [devops, ai]
tags: [agentforce, release management, devops, agent script, partner governance, manufacturing]
takeaways:
  - "The Agent Script file is stored in an authoring bundle in Git and passes through a pull request, validation and a scoped deployment like a Flow."
  - "Since API v68 you publish once in the source org and deploy that committed version; activation stays a separate step, one active version per agent."
  - "Committed versions cannot be edited. A quick fix in the production Builder causes the orgs to drift apart and blocks future deployments."
  - "There is no atomic rollback. Reactivating the previous version is the fastest fallback; Flows and Apex changes must be reverted separately."
  - "The partner builds and tests, the client's release manager deploys and activates, and the business owner approves activation in production."
faq:
  - q: "Can an Agentforce agent be deployed like other Salesforce metadata?"
    a: "Yes. Agent Script is stored in the AiAuthoringBundle metadata type. Since API v68, Salesforce documents publishing the bundle in the source org, retrieving the committed version and deploying it to the target org with the Salesforce CLI. You then test and activate it there."
  - q: "What happens when you publish an Agentforce agent?"
    a: "Salesforce checks that the Agent Script compiles, then creates a new agent or a new, committed version with its runtime metadata. The version can be activated later, so users only see it after activation."
  - q: "How do you roll back an Agentforce agent?"
    a: "Activate the previous version. Only one version can be active and sf agent activate accepts any version number. That does not revert changed Flows or Apex; those changes must be reverted separately through the pipeline. There is no atomic rollback of a whole release."
  - q: "Who should activate an Agentforce agent in production?"
    a: "The client. I recommend that the client's release manager activates it through the pipeline after the business owner, for example the head of service, has approved the test results. The partner builds and tests in sandboxes."
  - q: "Can I change an agent directly in production with Agentforce Builder?"
    a: "Only if you create a new version there; the source and target orgs then no longer match. Salesforce says mismatched agents block future deployments, so a change made in production has to be recreated in the source org right away."
draft: false
---

An Agentforce agent belongs in the release pipeline like any other metadata. Its Agent Script file is stored in an authoring bundle in Git, passes through a pull request and is validated; since API v68 the version is published once in the source org and that committed version is deployed to the next org. Activation is a separate step, and only one version per agent can be active. For a manufacturer whose implementation partner builds the agent, my answer to "who releases it?" is short: the partner builds and tests, the client deploys and activates, and the accountable business owner approves, for a dealer service agent the head of service.

## What does an Agentforce agent consist of in the repository?

According to the [Salesforce Developers Blog from May 2026](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle), an agent is defined in a single .agent file in Agent Script, stored in the AiAuthoringBundle metadata type. Up to API v67, committing a version generates this runtime metadata:

- **Bot and BotVersion:** the agent and one version of it. An agent "can have many versions, but only one version can be active," says the [metadata reference](https://developer.salesforce.com/docs/ai/agentforce/references/agents-metadata-tooling/agents-metadata.html).
- **GenAiPlannerBundle:** subagents, instructions and actions of one published version.
- **The actions underneath:** Flows, Apex and prompt templates, ordinary metadata components with their own lifecycles.

For a decision maker, this means: the logic that decides what a dealer is told about warranty or spare parts is now a text file that can be reviewed and reverted, which matters once rules such as warranty eligibility are defined in [Agent Script instead of the LLM](../agent-script-deterministic-rules/).

One detail matters now. The [Metadata API reference](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_aiauthoringbundle.htm) lists Winter '27 as API 68.0, and the [Agentforce DX guide for moving agents between orgs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html) says agent metadata changed in v68: both orgs must be on v68 to move agents with the new types (AiAgentDefinition in the example manifests). With v68 you list a committed version in the manifest as Agent#n, retrieve it from the source org and deploy it to the target org. The planner and version metadata described above apply to v67 and earlier. Other changes in that release are covered in [what Winter '27 changes for your pipeline](../salesforce-winter-27-what-changes-for-your-pipeline/).

## How does an agent move through the release pipeline?

The [June 2026 post on the Agentic Development Lifecycle](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) describes the pro-code path; the v68 guide adds how a committed version moves between orgs. In a client pipeline:

```schritte
Pull request
  The partner commits the changed .agent file and any changed Flows or Apex on a feature branch; the reviewer reads the Agent Script diff like code.
Validate
  sf agent validate authoring-bundle checks that the Agent Script compiles. Salesforce says validation "is required before the agent can be published", so it belongs in the pipeline as a gate.
Publish in the source org
  sf agent publish authoring-bundle creates a new agent, or a new committed version of an existing one, according to the [CLI reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_publish_authoring-bundle.html). The ADLC post says you can publish now and activate later.
Scoped deploy
  Changed Flows and Apex first, backward compatible with the active version, then the committed agent version, named explicitly in the manifest. The ADLC post warns that a bare sf project deploy start ships everything that changed, agent metadata included.
Test
  The suite runs against the deployed version in the sandbox; which version a test uses depends on the tool, and some CLI tests need an active agent. Gates and pass rates are covered in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).
Activate
  sf agent activate with --api-name and --version turns the version on. Activation "makes it immediately available to your users", says the [activate reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_activate.html).
```

```hinweis achtung
When --json is used without --version, "the latest agent version is automatically activated", the same reference says. In an unattended script I always pass the version number, so the pipeline activates what the business owner approved, not whatever was published last.
```

Up to v67, the May post described two options: publishing in every org, or deploying the generated GenAiPlannerBundle, where planner version numbers "won't necessarily match" the bundle versions. With v68, deploying the committed version is the documented path, and source and target must match. Every release note should still say which production version belongs to which Git commit, for audit and operational purposes.

```vertiefung For developers
title: Three traps when moving an agent to a new org
The v68 guide on moving agents lists them:
- The first deployment to a new org needs the whole agent definition, not just one version.
- Custom objects and fields the agent uses must be added to the manifest.
- The agent user and its permissions must be assigned in the target org.
```

## Why does a quick fix in the production Builder break the pipeline?

The same guide states two rules: "You can't edit a committed agent", and "the agents in both your source and target orgs must match or future deployments will be blocked". A change in production therefore creates a new version in production, and the next pipeline deployment is blocked until someone creates a matching version in the source org.

My rule is set before the first go-live: nobody has deployment or activation rights in production except the pipeline user, the release manager and a named deputy. Even a hotfix is built in the source org and is delivered through an expedited pipeline run. If an incident ever forces a change in production, it is a documented break-glass exception, and a matching new version is created in the source org the same day.

## How do you roll back an Agentforce agent?

Salesforce offers no atomic rollback of a whole release. Its documentation describes activating an earlier version as the way back. The ADLC post recommends Git so you can revert to a known working version, sf agent activate accepts any version number, and a [Developers Blog post from May 2025](https://developer.salesforce.com/blogs/2025/05/deploy-your-agentforce-agents-with-zero-downtime-using-agent-versions) describes switching versions as instantaneous, without downtime. As I read these sources, the fastest rollback is to activate the previous version number. This takes minutes and requires no deployment.

This has a limit every head of service should know. As I read the metadata model, the agent version holds the planner and references to actions, while the Flow or Apex class behind an action is separate metadata. If a release changed both the Agent Script and a Flow, reactivating the old version brings back the old instructions with the new Flow. The Flow needs its own revert, one more reason to keep agent and action changes in separate pull requests.

Deactivation is the emergency brake, and a drastic one. The [Agentforce DX docs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-manage.html) say that deactivating "ends its open interactions, and makes it unreachable for all connections". Behavior can differ by channel, so I would test it in the dealer portal before relying on it and decide in advance where dealers should be sent instead, for example to a case form or the service hotline.

## Worked example: the partner builds, the client releases

Assume a machine builder with Service Cloud, SAP, a dealer portal and one production org. A partner built the dealer service agent; an internal team of four owns Git and the pipeline, with a release every two weeks. All numbers are hypothetical.

Version 3 of the agent answers order status and warranty questions in production. For release 4 the partner adds a spare parts subagent and extends the order status Flow so it also returns the successor part for a superseded part. The client architect reviews two pull requests, one for the Flow and one for the .agent file; the pipeline validates, publishes version 4 in the integration sandbox, deploys it to the UAT sandbox and runs 60 test cases, and the head of service approves the results. On release day the same version 4 is deployed to production as inactive, and at 7 a.m. the pipeline activates it with the version number from the approved release note.

Two days later the spare parts subagent recommends the wrong successor part for one product line. The release manager reactivates version 3 within 15 minutes; order status and warranty answers remain available. Version 3 also calls the extended Flow, but the extra field does no harm, so the Flow stays and the fix is delivered as version 5 through the normal path. The partner never needed production rights.

## The client releases, even in a shared org

The client releases, with clear lines between the roles:

- **Partner:** builds in scratch orgs or sandboxes, writes tests, opens pull requests. The ADLC post advises building in scratch orgs or sandboxes and not giving the agent production access; I apply the same rule to the partner's build users.
- **Client architect:** reviews Agent Script and actions, especially warranty, discount and credit limit rules.
- **Client release manager:** owns the pipeline, controls the deployment and activates in production, with a technical pipeline user for the deployment itself.
- **Business owner, for example the head of service:** approves activation on the basis of test results and decides on rollbacks with the release manager, without technical activation rights.

Each agent is assigned exactly one owner in the [object ownership matrix](../salesforce-object-ownership-matrix/), so two partners never build versions of the same agent. The pipeline and repository belong to the client, as argued in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/); setting them up is part of my [DevOps and release management](../../services/devops-release-management/) work.

Groups with one production org per subsidiary face a gap. The [agent command reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm) lists an agent template for second-generation managed packages, which fits ISVs better than a group with its own orgs. I would treat each org as its own release target, with the same source version but its own tests, agent user, permissions, activation and version log.

## Put the .agent files in the client repository

1. Put every agent's .agent file in the client repository and stop building agents directly in shared orgs.
2. Add sf agent validate authoring-bundle and scoped deploys to the pipeline.
3. Remove deployment and activation rights in production from everyone except the pipeline user, the release manager and a deputy.
4. Keep a version log per org: Git commit, version number, date, approver.
5. Write a rollback runbook: which version to reactivate, which Flows to revert, and where dealers are routed when the agent is deactivated.
6. Check that the Salesforce CLI is current and the project and manifests use API 68.0 with the new agent metadata types.
