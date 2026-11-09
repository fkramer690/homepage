---
title: "Nearshore Salesforce teams with AI agents: what changes"
description: "What changes when nearshore and offshore Salesforce teams work with AI agents: review load, roles, onboarding and access rules for manufacturers."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: nearshore-salesforce-teams-ai-agents
translationKey: nearshore-teams-with-ai-agents
topic: governance
categories: [architecture, ai]
tags: [nearshore, ai coding, code review, onboarding, partner governance, manufacturing]
takeaways:
  - "Plan reviewer capacity with knowledge of your org, not developer headcount."
  - "In a McKinsey survey, leaders reported 11.8 percent time savings but only 6.2 percent less rework: speed grows faster than quality."
  - "In an Anthropic study, junior engineers who learned a library with an AI assistant scored 50 instead of 67 percent, with the largest gap in debugging."
  - "Every rotation in the team is an access event: tool account, org access and local agent transcripts are cleaned up per person."
  - "Agent settings belong to the client, and agents only get access to sandboxes and scratch orgs, never to production credentials."
faq:
  - q: "Do nearshore Salesforce teams get smaller with AI agents?"
    a: "Possibly, but I would only cut developers after measuring cycle time and rework. The safer first change is the mix: more review capacity with org knowledge per team. My starting heuristic of about eight developers per tightly coupled workstream still applies, checked against review queues."
  - q: "Who should review AI-generated code from a nearshore team?"
    a: "A senior in the nearshore team reviews every pull request first. Changes to shared objects, sharing, the data model or interfaces also need the client-side code owner, for which a CODEOWNERS file with branch protection enforces approval on the matching repository paths."
  - q: "Should junior developers in a nearshore team use coding agents?"
    a: "Yes, with tasks that build understanding, and with measured results. In Anthropic's study, participants who asked conceptual questions or had generated code explained scored far higher on the follow-up quiz than those who handed the work to the AI. The study shows short-term understanding, not long-term skill."
  - q: "Which accounts should nearshore developers use for coding agents?"
    a: "Commercial accounts the client provides or approves, never private plans. Anthropic does not train on Claude Code data under commercial terms; on the Free, Pro and Max plans that depends on a user setting."
draft: false
---

When nearshore Salesforce teams with AI agents produce more changes per developer, review capacity can become the bottleneck; measure it rather than assume it. For a manufacturer the planning number becomes reviewer capacity with knowledge of your org and processes, not developer headcount. Onboarding can get faster at reading an unknown org but can skip the judgment a reviewer needs later. And every rotation in the team becomes an access event: tool accounts, org access and local agent transcripts have to be cleaned up per person. The rules from my nearshore article still hold; agents make breaking them more expensive.

## What changes for nearshore Salesforce teams with AI agents?

In [my article on nearshore team size](../salesforce-nearshore-teams-eight-developers/) I describe what slows nearshore teams down more often than missing skills: rotation, turnover, overly senior teams and missing backing from the client. Coding agents such as Claude Code, Codex, Copilot or Agentforce Vibes remove none of them. They move the pressure to review, to the mix of roles, to onboarding and to access.

```praxis
I have worked with nearshore teams in Eastern Europe and nearshore and offshore teams in India, and rotation, turnover, overly senior teams and missing backing from the client were the same brakes in both regions.
```

My starting heuristic of about eight developers per tightly coupled workstream and a minimum stay agreed before the first sprint stay as they are; I check the eight against coordination effort and review queues. The pod model with architect, builder-reviewer and domain lead is covered in [AI-native delivery: smaller Salesforce teams](../ai-native-delivery-smaller-salesforce-teams/). Here the focus is on a team that sits in another country and another company, nearshore in Eastern Europe or offshore in India.

## Why does review become the bottleneck?

McKinsey surveyed 334 product and engineering leaders and sums it up: "Speed is improving faster than quality" ([Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle)). The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) warns that without strong testing, version control and fast feedback, "an increase in change volume leads to instability". Veracode measured the [security pass rate](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) of raw model output in July 2026. The report has no Apex results, so its figures are a general warning, not a Salesforce benchmark.

```kennzahlen
11.8 % | average time savings reported by leaders
6.2 % | less rework reported
56 % | security pass rate for raw AI-generated code
30 % | security pass rate for Java
source: McKinsey, Beyond the copilot, August 2026; Veracode GenAI Code Security Report, July 2026
```

Where agents do raise the change volume, in a nearshore team it lands on very few people. Review is not the only possible bottleneck: unclear requirements, test data, SAP dependencies and UAT capacity can limit more. The mix I recommend, a few seniors who carry architecture and reviews plus developers who like to build, works at human writing speed. With agents, the same few seniors face more and larger pull requests. If they wave them through, defects reach your integration sandbox. If they check properly, the speed gain turns into waiting time. With a team in India the working day also starts hours before yours, so a pull request that needs your architect waits until Germany is online. This is what I would set up:

- **Two review stages.** A senior in the nearshore team reviews every pull request first, using the checks in [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/). Changes to shared objects, sharing, the data model or interfaces also need your code owner. GitHub [requests code owners automatically](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) when a pull request touches their files, and branch protection can make their approval mandatory. The [object ownership matrix](../salesforce-object-ownership-matrix/) defines which objects are shared.
- **Reviewer hours in the contract.** Time-and-materials contracts can reward adding developers unless reviewer capacity and outcomes are governed separately, and with agents an extra developer mostly lengthens the review queue.
- **Small pull requests with the agent's plan attached.** The plan answers the question a reviewer would otherwise ask across the time zone.
- **Triage by risk.** McKinsey recommends that higher-risk changes "require stronger evidence and accountable human review": customer-facing behavior, regulated data, security-sensitive code. For a machine builder, warranty rules, prices and anything that posts to SAP go to your reviewer; a label change in the dealer portal does not.

## Steering an agent means more checking than typing

A developer who steers an agent spends more time describing, checking and correcting than typing. Salesforce describes this for its own engineers in [four proficiency levels](https://engineering.salesforce.com/how-salesforce-built-an-agentic-engineering-enablement-strategy-for-thousands-of-software-engineers/): AI-Assisted, AI-Validating, AI-Orchestrating and AI-Native. At the second level, "Engineers shift from trusting AI output to validating it."

Salesforce built these levels as a shared language for learning, not to score engineers, so I use them for coaching, not as a partner assessment. To judge a proposed team I ask for evidence instead: agent pull requests the seniors have reviewed, their defect escape rate and how they configure the tools. The seniors who carry reviews should be validating agent output before agents write code for production.

Domain knowledge is the second shift. An agent knows Apex and Flow. It does not know, for example, whether the warranty start date is reliable for machines sold through dealers, or whether one plant maintains spare part numbers differently. A nearshore team was always far from that knowledge, and with agents a wrong assumption turns into working code within hours. That makes the domain lead on your side even more important. Whatever the team learns about your org goes into the [AI rules file in your repository](../ai-rules-file-salesforce-repository/), so it survives the next rotation.

## How does onboarding change with agents?

Agents can shorten the first weeks, but whether onboarding gets faster overall is something to measure, for example time to the first independent change. A new developer can let the agent read the metadata in a sandbox and explain which flows, triggers and validation rules run on Work Order before changing anything.

The risk is that the new person never builds a reviewer's understanding. In an [Anthropic study](https://www.anthropic.com/research/AI-assistance-coding-skills) from January 2026, 52 mostly junior engineers learned an unfamiliar Python library. The group with an AI assistant scored 50 percent on a follow-up quiz, the group without 67 percent, with the largest gap in debugging, and was not significantly faster. Participants who asked conceptual questions or had generated code explained scored around 65 to 86 percent, those who handed coding or debugging to the AI below 40 percent. The sample is small, and the authors expect a larger effect with agentic tools.

For a nearshore team that matters because today's juniors are the reviewers you need after the next rotation. If they spend their first months delegating, nobody can replace a senior who leaves.

So I would build onboarding around explanation: the agent explains existing automation, the new person writes the test, and reviews of other people's agent pull requests start in the first month. A four-week plan is in [chapter 9 of my AI masterclass](../../masterclass/ai-salesforce/teamwork-and-delivery/). About 38 percent of McKinsey's respondents name lack of time to learn as a top barrier, so I would put the onboarding days into the nearshore plan and agree who pays for them.

## Which access rules apply when nearshore developers use agents?

Tools, model routes, data classes and no production access belong in the contract, see [partners coding with AI: what belongs in the contract](../partners-using-ai-coding-contract-rules/). For nearshore teams three points get sharper, because people change.

**Settings the developer cannot change.** According to the [permissions documentation](https://code.claude.com/docs/en/permissions), Claude Code's managed settings cannot be overridden by user or project settings. That is where deny rules such as `Read(./.env)` and `disableBypassPermissionsMode`, which prevents sessions without approval prompts, belong. They are policy controls, not a sealed boundary, because subprocesses can still read files; keep secrets outside the workspace and use sandboxing or isolated development environments. Make sure Agentforce Vibes is [off for production](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), and keep production credentials away from every other coding agent. The local Salesforce DX MCP Server, which only reached explicitly allowlisted orgs, reached end of life on November 2, 2026, see [the DX MCP Server end of life](../salesforce-dx-mcp-server-end-of-life/).

**Rotation is an access event.** Claude Code keeps session transcripts in plaintext under `~/.claude/projects/` for 30 days by default, according to [Anthropic's data usage page](https://code.claude.com/docs/en/data-usage). When a developer leaves, their laptop holds what the agent read, and commercial accounts keep data on the server for 30 days by default; transcripts sent with feedback can be kept much longer. The offboarding checklist per person removes the tool account and org access, covers repository clones, caches and cloud sessions, and the partner confirms that local transcripts with your code are deleted. I would switch off feedback uploads centrally.

**Agreed data classes only.** Personal, confidential or export-controlled data that is not approved stays out of the agent context, wherever the developer sits; sandboxes hold masked or synthetic data. Service cases with customer names, serial numbers and dealer prices are typical examples. Where prompts are processed depends on the model route: Anthropic's own API offers only "us" and "global" as [inference regions](https://platform.claude.com/docs/en/manage-claude/data-residency), storage is a separate setting, and on Bedrock or Vertex other rules apply. For your in-house staff the works council comes in, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## Worked example: the field service stream with a nearshore team

Assume a machine builder with Service Cloud, Field Service, a dealer portal and SAP. A nearshore partner carries the field service stream with seven developers and one senior who reviews; the client has an architect and an admin. The partner introduces coding agents. All numbers are assumptions.

- **Before agents:** about 25 pull requests per sprint, first review within a working day.
- **After four sprints:** about 40 larger pull requests per sprint. The median wait for a review rises to three days, and the client architect sees more changes to Work Order and Asset, which the service stream also uses.
- **Decisions:** a second partner reviewer billed as reviewer hours, CODEOWNERS for Work Order, Asset and the SAP interface, and a size limit per pull request.
- **Rotation in month five:** the offboarding checklist runs within a day, and the replacement starts with two weeks of explanation tasks on the work order automation.

Whether the stream got faster stays open until cycle time and rework are compared with the baseline, see [measuring AI productivity in Salesforce projects](../measuring-ai-productivity-salesforce-projects/). The extra developer the partner offered first would only have lengthened the queue.

## Count reviewers per team

1. **Count reviewers per team**, not only developers, and check their backlog.
2. **Ask the partner for evidence of agent reviews** by the seniors, not for a level per person.
3. **Set up code owners** for shared objects, sharing, data model and interfaces.
4. **Put managed settings, org allowlists and the offboarding checklist in place** before agents write code.
5. **Plan onboarding time** and agree who pays.
6. **Measure cycle time and rework** before and after.

For point 1, a look at the open pull requests and how long they wait for a review on average is enough. Planning team setups, reviewer capacity and rotation rules is part of my [program management for nearshore teams](../../services/program-management-nearshore/).
