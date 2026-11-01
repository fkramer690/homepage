---
title: "Agentforce agents in the release pipeline: who releases?"
description: "How an Agentforce agent moves from sandbox to production: Agent Script in Git, validate, publish, activate, roll back, and who releases it in a shared org."
pubDate: 2026-10-27
lang: en
slug: agentforce-agents-release-pipeline
translationKey: agentforce-agents-release-pipeline
topic: release
categories: [devops, ai]
tags: [agentforce, release management, devops, agent script, partner governance, manufacturing]
takeaways:
  - "The Agent Script file lives in an authoring bundle in Git and goes through pull request, validation and a scoped deployment like a Flow."
  - "Publishing creates a new agent version in inactive state; activation is a separate step, and only one version per agent can be active at a time."
  - "Committed versions cannot be edited. A quick fix in the production Builder makes the orgs drift apart and blocks future deployments."
  - "Salesforce documents no rollback. The fastest fallback is reactivating the previous version; Flows and Apex need their own revert."
  - "The partner builds and tests, the client's release manager deploys, publishes and activates, and the business owner approves activation in production."
faq:
  - q: "Can an Agentforce agent be deployed like other Salesforce metadata?"
    a: "Yes. Agent Script is stored in the AiAuthoringBundle metadata type and deployed with the Salesforce CLI. After the deployment you publish the bundle in the target org, which creates the agent version, and then activate it."
  - q: "What happens when you publish an Agentforce agent?"
    a: "Salesforce checks that the Agent Script compiles, then creates a new agent or a new version with its Bot, BotVersion and GenAi metadata. The version starts inactive, so users only see it after activation."
  - q: "How do you roll back an Agentforce agent?"
    a: "Salesforce publishes no rollback procedure. Because only one version can be active and sf agent activate accepts any version number, I would reactivate the previous version and revert changed Flows or Apex separately through the pipeline."
  - q: "Who should activate an Agentforce agent in production?"
    a: "The client. I recommend that the client's release manager activates through the pipeline after the business owner, for example the head of service, has approved the test results. The partner builds and tests in sandboxes."
  - q: "Can I change an agent directly in production with Agentforce Builder?"
    a: "Only by creating a new version there, and then source and target org no longer match. Salesforce says mismatched agents block future deployments, so a change made in production has to be recreated in the source org right away."
draft: false
---

An Agentforce agent belongs in the release pipeline like any other metadata. Its Agent Script file sits in an authoring bundle in Git, goes through a pull request, is validated and deployed to the next org, and is published there as a new, inactive version. Activation is a separate step, and only one version per agent can be active. For a manufacturer whose implementation partner builds the agent, my answer to "who releases it?" is short: the partner builds and tests, the client deploys and activates, and the head of service approves.

## What does an Agentforce agent consist of in the repository?

According to the [Salesforce Developers Blog from May 2026](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle), an agent is defined in a single `.agent` file in Agent Script, stored in the `AiAuthoringBundle` metadata type. Committing a version generates the runtime metadata:

- **Bot and BotVersion:** the agent and one version of it. An agent "can have many versions, but only one version can be active," says the [metadata reference](https://developer.salesforce.com/docs/ai/agentforce/references/agents-metadata-tooling/agents-metadata.html).
- **GenAiPlannerBundle:** subagents, instructions and actions of one published version.
- **The actions underneath:** Flows, Apex and prompt templates, ordinary metadata with their own lifecycle.

For a decision maker this means: the logic that decides what a dealer hears about warranty or spare parts is now a text file that can be reviewed and reverted, which matters once rules such as warranty eligibility sit in [Agent Script instead of the LLM](../agent-script-deterministic-rules/).

One detail matters now. The [Metadata API reference](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_aiauthoringbundle.htm) lists Winter '27 as API 68.0, and the [Agentforce DX guide for moving agents between orgs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html) says agent metadata changed in v68: both orgs must be on v68 to move agents with the new types (`AiAgentDefinition` in the example manifests). Other changes of that release are in [what Winter '27 changes for your pipeline](../salesforce-winter-27-what-changes-for-your-pipeline/).

## How does an agent move through the release pipeline?

The [June 2026 post on the Agentic Development Lifecycle](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) describes the pro-code path. In a client pipeline:

```schritte
Pull request
  The partner commits the changed `.agent` file and any changed Flows or Apex on a feature branch; the reviewer reads the Agent Script diff like code.
Validate
  `sf agent validate authoring-bundle` checks that the Agent Script compiles. Salesforce says validation "is required before the agent can be published", so it belongs in the pipeline as a gate.
Scoped deploy
  Flows first, then the authoring bundle, each named with `--metadata`. The post warns that a bare `sf project deploy start` ships everything that changed, agent metadata included.
Publish
  `sf agent publish authoring-bundle` creates a new agent, or a new version of an existing one, with its Bot, BotVersion and GenAi metadata, according to the [CLI reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_publish_authoring-bundle.html). The ADLC post says you can publish now and activate later, so as I read it the version starts inactive.
Test
  The suite runs against the published version in the sandbox; gates and pass rates are covered in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).
Activate
  `sf agent activate` with `--api-name` and `--version` turns the version on. Activation "makes it immediately available to your users", says the [activate reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_activate.html).
```

```hinweis achtung
With `--json` and without `--version`, "the latest agent version is automatically activated", says the same reference. In an unattended script I always pass the version number, so the pipeline activates what the business owner approved, not whatever was published last.
```

The May post names two variants. In the first variant only the `AiAuthoringBundle` is in Git and each org publishes its own new version. Fully automated pipelines also deploy the generated `GenAiPlannerBundle` and skip the manual commit step. For a manufacturer with one production org I prefer the first: Git holds only what people write. The price is that version numbers differ between orgs, since planner version numbers "won't necessarily match" the bundle versions. Every release note should therefore say which production version belongs to which Git commit.

```vertiefung For developers
title: Three traps when moving an agent to a new org
The guide on moving agents names them explicitly:
- The first deployment to a new org needs the whole agent definition.
- Data 360 dependencies and custom objects must be added to the manifest by hand.
- The agent user must be assigned in the target org.
```

## Why does a quick fix in the production Builder break the pipeline?

The same guide states two rules: "You can't edit a committed agent", and "the agents in both your source and target orgs must match or future deployments will be blocked". A change in production therefore means a new version in production, and the next pipeline deployment is blocked until somebody creates a matching version in the source org.

My rule, set before the first go-live: nobody has publish or activate rights in production except the release manager and a named deputy. If a dealer-facing agent must change during an incident, those two make the change, document it and rebuild the version in the source org the same day.

## How do you roll back an Agentforce agent?

Salesforce documents no rollback procedure. The ADLC post recommends Git so you can revert to a known working version, `sf agent activate` accepts any version number, and a [Developers Blog post from May 2025](https://developer.salesforce.com/blogs/2025/05/deploy-your-agentforce-agents-with-zero-downtime-using-agent-versions) describes switching versions as instantaneous, without downtime. As I read these sources, the fastest rollback is to activate the previous version number: minutes, no deployment.

This has a limit every head of service should know. As I read the metadata model, the agent version holds the planner and references to actions, while the Flow or Apex class behind an action is separate metadata. If a release changed both the Agent Script and a Flow, reactivating the old version brings back the old instructions with the new Flow. The Flow needs its own revert, one more reason to keep agent and action changes in separate pull requests.

Deactivation is the emergency brake, and a hard one. The [Agentforce DX docs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-manage.html) say that deactivating "ends its open interactions, and makes it unreachable for all connections". For a dealer portal I would decide in advance where dealers land then, for example a case form or the service hotline.

## Worked example: the partner builds, the client releases

Assume a machine builder with Service Cloud, SAP, a dealer portal and one production org. A partner built the dealer service agent; an internal team of four owns Git and the pipeline, with a release every two weeks. All numbers are assumptions.

Version 3 of the agent answers order status and warranty questions in production. For release 4 the partner adds a spare parts subagent and extends the order status Flow so it also returns the successor of a superseded part. The client architect reviews two pull requests, one for the Flow and one for the `.agent` file; the pipeline validates, deploys to the UAT sandbox, publishes and runs 60 test cases, and the head of service approves the results. On release day version 4 is published in production as inactive, and at 7 a.m. the pipeline activates it with the version number from the approved release note.

Two days later the spare parts subagent recommends the wrong successor part for one product line. The release manager reactivates version 3 within 15 minutes; order status and warranty answers keep working. Version 3 also calls the extended Flow, but the extra field does no harm, so the Flow stays and the fix returns as version 5 through the normal path. The partner never needed production rights.

## The client releases, even in a shared org

The client, with clear lines between the roles:

- **Partner:** builds in scratch orgs or sandboxes, writes tests, opens pull requests. The ADLC post advises building in scratch orgs or sandboxes and not giving the agent production access; I extend that to the partner's build users.
- **Client architect:** reviews Agent Script and actions, above all warranty, discount and credit limit rules.
- **Client release manager:** owns the pipeline, deploys, publishes and activates in production.
- **Business owner, for example the head of service:** approves activation on the basis of test results and decides on rollbacks with the release manager.

Each agent gets exactly one owner in the [object ownership matrix](../salesforce-object-ownership-matrix/), so two partners never publish versions of the same agent. Pipeline and repository belong to the client, as argued in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/); setting them up is part of my [DevOps and release management](../../services/devops-release-management/) work.

Groups with one production org per subsidiary face a gap. The [agent command reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm) lists an agent template for second-generation managed packages, but I found no Salesforce guide for rolling one agent out to several of your own orgs. Until then I would treat each org as its own release target with its own version log.

## Put the .agent files in the client repository

1. Put every agent's `.agent` file in the client repository and stop building agents directly in shared orgs.
2. Add `sf agent validate authoring-bundle` and scoped deploys to the pipeline.
3. Remove publish and activate rights in production from everyone except the release manager and a deputy.
4. Keep a version log per org: Git commit, version number, date, approver.
5. Write a rollback runbook: which version to reactivate, which Flows to revert, where dealers go when the agent is off.
6. Check that both orgs are on API v68 before deploying agents with the new metadata types.
