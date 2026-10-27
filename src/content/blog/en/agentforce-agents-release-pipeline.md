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
  - "An Agentforce agent is metadata: its Agent Script file lives in an authoring bundle in Git and goes through pull request, validation and a scoped deployment like a Flow."
  - "Publishing creates a new agent version in inactive state; activation is a separate step, and only one version per agent can be active at a time."
  - "Committed agent versions can't be edited, and Salesforce blocks future deployments when source and target org drift apart, so a quick fix in the production Builder breaks the pipeline."
  - "Salesforce documents no rollback procedure; as I read the docs, the fastest fallback is reactivating the previous version, while Flows and Apex behind its actions need their own revert."
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

Salesforce moved agent development to a metadata model in 2026. According to the [Salesforce Developers Blog from May 2026](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle), the design-time definition of an agent is a single `.agent` file in Agent Script, stored in the `AiAuthoringBundle` metadata type. When a version is committed, the platform generates the runtime metadata from it:

- **Bot and BotVersion:** the agent and the settings of one version. "A single Einstein Bot or Agentforce Agent can have many versions, but only one version can be active," says the [Agentforce metadata reference](https://developer.salesforce.com/docs/ai/agentforce/references/agents-metadata-tooling/agents-metadata.html).
- **GenAiPlannerBundle:** subagents, instructions, actions and orchestration logic of one published version.
- **The actions underneath:** Flows, Apex classes and prompt templates the agent calls. They are ordinary metadata with their own lifecycle.

For a decision maker the point is this: the logic that decides whether a dealer gets an answer about warranty or spare parts is now a text file that can be compared, reviewed and reverted. That matters once rules such as warranty eligibility sit in Agent Script, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

One version detail needs attention now. The [Metadata API reference](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_aiauthoringbundle.htm) lists Winter '27 as API version 68.0, and the [Agentforce DX guide for moving agents between orgs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html) says agent metadata was updated in API v68: both orgs must be on v68 to move agents with the new types, which the example manifests call `AiAgentDefinition` and `AiAgentDefinitionVersion`. A pipeline set up in spring needs a check before the next agent release. The other pipeline changes of that release are in [what Winter '27 changes for your pipeline](../salesforce-winter-27-what-changes-for-your-pipeline/).

## How does an agent move through the release pipeline?

The [June 2026 post on the Agentic Development Lifecycle](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) describes the pro-code path step by step. In a client pipeline it looks like this:

1. **Pull request.** The partner commits the changed `.agent` file and any changed Flows or Apex classes on a feature branch. The reviewer reads the Agent Script diff like code.
2. **Validate.** `sf agent validate authoring-bundle` checks that the Agent Script compiles. Salesforce says validation "is required before the agent can be published", so it belongs in the pipeline as a gate.
3. **Scoped deploy.** Flows first, then the authoring bundle, each named with `--metadata`. The post advises against a bare `sf project deploy start`, because it ships everything that changed and can send agent metadata out by accident.
4. **Publish.** `sf agent publish authoring-bundle` compiles the Agent Script and creates a new agent, or a new version of an existing one, with its Bot, BotVersion and GenAi metadata, according to the [CLI reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_publish_authoring-bundle.html). The new version is inactive; the ADLC post notes that you can publish now and activate later.
5. **Test.** The test suite runs against the published version in the sandbox. Gates and pass rates are covered in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).
6. **Activate.** `sf agent activate` with `--api-name` and `--version` turns the version on. Activation "makes it immediately available to your users", says the [activate reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_activate.html).

One flag deserves a line in the pipeline review. The same reference says that with `--json` and without `--version`, "the latest agent version is automatically activated". In a script that runs unattended I always pass the version number, so the pipeline activates what the business owner approved and not whatever was published last.

The May post describes two ways to carry agents to the next org. Most pipelines keep only the `AiAuthoringBundle` in Git, deploy it and publish a new version in each org. Fully automated pipelines also keep the generated `GenAiPlannerBundle` in Git and deploy both together, which skips the manual commit step. For a manufacturer with one production org I prefer the first variant: Git holds only what people write, and each org generates its own runtime metadata. The price is that version numbers differ between orgs; Salesforce notes that planner version numbers "won't necessarily match" the bundle versions. Every release note should therefore say which production version belongs to which Git commit.

Three points from the guide on moving agents between orgs catch teams out:

- The first deployment to a target org needs the whole agent definition, not a single version.
- Flow, Apex and prompt template actions are retrieved automatically; Data 360 dependencies and custom objects have to be added to the manifest.
- The agent user must be assigned in the target org, with the permissions the agent needs. Salesforce also warns against editing retrieved agent metadata by hand: "Uploading edited metadata to an org can corrupt your org."

## Why does a quick fix in the production Builder break the pipeline?

The same guide states two rules: "You can't edit a committed agent", and "the agents in both your source and target orgs must match or future deployments will be blocked". A change in production therefore means a new version in production, and the next pipeline deployment is blocked until somebody creates a matching version in the source org.

Who may change an agent in production is a permission question, and I settle it before the first go-live. My rule: nobody has publish or activate rights in production except the release manager and a named deputy. If a dealer-facing agent must change during an incident, those two make the change, document it and rebuild the same version in the source org the same day.

## How do you roll back an Agentforce agent?

Salesforce documents no rollback procedure. The ADLC post recommends committing Agent Script to Git so you can revert to a known working version, and `sf agent activate` accepts any version number. A [Developers Blog post from May 2025](https://developer.salesforce.com/blogs/2025/05/deploy-your-agentforce-agents-with-zero-downtime-using-agent-versions) describes activating a new version as instantaneous, with no downtime for users. As I read these sources, the fastest rollback is to activate the previous version number. It takes minutes and needs no deployment.

It has a limit that I would explain to every head of service before the first release. As I read the metadata model, the agent version holds the planner, the subagents and references to actions, while the Flow or Apex class behind an action is separate metadata. If a release changed both the Agent Script and a Flow, reactivating the old version brings back the old instructions with the new Flow. The Flow needs its own revert through the pipeline. That is a good reason to keep agent changes and action changes in separate, small pull requests.

Deactivation is the emergency brake, and a hard one. The [Agentforce DX docs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-manage.html) say that deactivating "ends its open interactions, and makes it unreachable for all connections". For a dealer portal I would decide in advance where dealers land when the agent is off, for example a case form or the service hotline.

## A typical scenario: the partner builds, the client releases

Assume a machine builder with Service Cloud, SAP and a dealer portal, one production org and an implementation partner who built a dealer service agent. An internal Salesforce team of four owns Git and the pipeline, and releases go out every two weeks. All numbers here are assumptions.

Version 3 of the agent answers order status and warranty questions in production. For release 4 the partner adds a spare parts subagent and extends the order status Flow so it also returns the successor of a superseded part. The partner opens two pull requests, one for the Flow and one for the `.agent` file. The client architect reviews both, and the pipeline validates, deploys to the UAT sandbox, publishes and runs 60 test cases. The head of service approves the results. On release day the release manager deploys and publishes in production, where version 4 appears as inactive. At 7 a.m., before dealers in the first country start work, the pipeline activates version 4 with the version number from the approved release note.

Two days later the spare parts subagent recommends the wrong successor part for one product line. The release manager reactivates version 3 within a quarter of an hour, and order status and warranty answers keep working. The release note shows that version 3 also calls the extended order status Flow. The extra field does no harm, so the team leaves the Flow in place and brings the fix back as version 5 through the normal path. The partner never needed production rights.

## Who releases the agent when client and partner share the org?

The client, with clear lines between the roles:

- **Partner:** builds in scratch orgs or sandboxes, writes tests, opens pull requests, fixes findings. The ADLC post says "never give your agent access to the production environment", and I extend that to the partner's build users.
- **Client architect:** reviews Agent Script and actions, above all rules for warranty, discounts and credit limits.
- **Client release manager:** owns the pipeline, deploys, publishes and activates in production.
- **Business owner, for example the head of service:** approves activation based on the test results and decides on a rollback together with the release manager.

Each agent gets exactly one owner in the [object ownership matrix](../salesforce-object-ownership-matrix/), like an object. With several partners, two teams must never publish versions of the same agent. The pipeline and the repository belong to the client, as argued in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

Groups with several production orgs, for example one per subsidiary, face a gap. The CLI can generate an agent template for packaging in a second-generation managed package, according to the [agent command reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm), but I found no Salesforce guide for rolling one agent out to several of your own orgs. Until there is one, I would treat each org as its own release target with its own version log.

## Where should you start?

1. Put every agent's `.agent` file in the client repository and stop building agents directly in shared orgs.
2. Add `sf agent validate authoring-bundle` and scoped deploys to the pipeline.
3. Remove publish and activate rights in production from everyone except the release manager and a deputy.
4. Keep a version log per org: Git commit, version number, date, approver.
5. Write a rollback runbook: which version to reactivate, which Flows to revert, where dealers go when the agent is off.
6. Check that source and target orgs are on API v68 before the next agent deployment with the new metadata types.

Setting this up is part of my [DevOps and release management](../../services/devops-release-management/) work.

An agent is ready for an enterprise release process when every version, activation and rollback is as traceable as any other change. If your partner is about to deliver an agent and the release path is still open, [send me a message](#contact).
