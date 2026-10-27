---
title: "Nearshore Salesforce teams with AI agents: what changes"
description: "What changes when nearshore Salesforce teams in Eastern Europe or India work with AI agents: review load, roles, onboarding and access rules for manufacturers."
pubDate: 2026-10-27
lang: en
slug: nearshore-salesforce-teams-ai-agents
translationKey: nearshore-teams-with-ai-agents
topic: governance
category: architecture
tags: [nearshore, ai coding, code review, onboarding, partner governance, manufacturing]
takeaways:
  - "When nearshore Salesforce teams work with AI agents, the bottleneck moves from writing code to review; reviewer capacity with knowledge of your org becomes the number to plan, not developer headcount."
  - "McKinsey's 2026 survey found 11.8 percent average time savings but only 6.2 percent less rework, so more code reaches the reviewers without getting better at the same rate."
  - "In an Anthropic study, mostly junior engineers who learned a new library with an AI assistant scored 50 percent on a follow-up quiz against 67 percent without it, with the largest gap in debugging."
  - "Every rotation in a nearshore team becomes an access event: tool account, org access and local agent transcripts, which Claude Code keeps in plaintext for 30 days by default, are cleaned up per person."
  - "Agent settings belong to the client: managed settings developers cannot override, agents only in sandboxes and scratch orgs, and Agentforce Vibes disabled for production."
faq:
  - q: "Do nearshore Salesforce teams get smaller with AI agents?"
    a: "Possibly, but I would only cut developers after measuring cycle time and rework. The safer first change is the mix: more review capacity with org knowledge per team. The cap of about eight developers per team still applies."
  - q: "Who should review AI-generated code from a nearshore team?"
    a: "A senior in the nearshore team reviews every pull request first. Changes to shared objects, sharing, the data model or interfaces also need the client-side code owner, which a CODEOWNERS file with branch protection enforces."
  - q: "Should junior developers in a nearshore team use coding agents?"
    a: "Yes, with tasks that build understanding. In Anthropic's study, participants who asked conceptual questions or had generated code explained scored far higher on the follow-up quiz than those who handed the work to the AI."
  - q: "Which accounts should nearshore developers use for coding agents?"
    a: "Commercial accounts the client provides or approves, never private plans. Anthropic does not train on Claude Code data under commercial terms; on the Free, Pro and Max plans that depends on a user setting."
draft: false
---

Nearshore Salesforce teams with AI agents produce more code per developer, and that moves the bottleneck to review. For a manufacturer the planning number becomes reviewer capacity with knowledge of your org and processes, not developer headcount. Onboarding gets faster at reading an unknown org but can skip the judgement a reviewer needs later. And every rotation in the team becomes an access event: tool accounts, org access and local agent transcripts have to be cleaned up per person. The rules from my nearshore article still hold; agents make breaking them more expensive.

## What changes for nearshore Salesforce teams with AI agents?

In [my article on nearshore team size](../salesforce-nearshore-teams-eight-developers/) I describe what slows nearshore teams down more often than missing skills: rotation, turnover, overly senior teams and missing backing from the client. I have worked with nearshore teams in Eastern Europe and India, and those factors were the same in both regions. Coding agents such as Claude Code, Codex, Copilot or Agentforce Vibes remove none of them. They move the pressure to review, to the mix of roles, to onboarding and to access.

The cap of about eight developers per team and a minimum stay agreed before the first sprint stay as they are. The pod model with architect, builder-reviewer and domain lead is covered in [AI-native delivery: smaller Salesforce teams](../ai-native-delivery-smaller-salesforce-teams/). Here the focus is on a team that sits in another country and another company.

## Why does review become the bottleneck?

In McKinsey's survey of 334 product and engineering leaders, respondents reported average time savings of 11.8 percent but only 6.2 percent less rework: "Speed is improving faster than quality" ([Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle)). The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) warns that without strong testing, version control and fast feedback, "an increase in change volume leads to instability". Veracode measured a [56 percent security pass rate](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) for raw AI-generated code in July 2026, and 30 percent for Java, the closest relative of Apex.

In a nearshore team this lands on very few people. The mix I recommend, a few seniors who carry architecture and reviews plus developers who like to build, works at human writing speed. With agents, the same two seniors face more and larger pull requests. If they wave them through, defects reach your integration sandbox. If they check properly, the speed gain turns into waiting time. With a team in India the working day also starts hours before yours, so a pull request that needs your architect waits until Germany is online. This is what I would set up:

- **Two review stages.** A senior in the nearshore team reviews every pull request first, using the checks in [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/). Changes to shared objects, sharing, the data model or interfaces also need your code owner. GitHub [requests code owners automatically](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) when a pull request touches their files, and branch protection can make their approval mandatory. The [object ownership matrix](../salesforce-object-ownership-matrix/) defines which objects are shared.
- **Reviewer hours in the contract.** A partner paid per head gains from adding developers, and with agents an extra developer mostly lengthens the review queue.
- **Small pull requests with the agent's plan attached.** The plan answers the question a reviewer would otherwise ask across the time zone.
- **Triage by risk.** McKinsey's top accelerators demand "stronger evidence and accountable human review" for customer-facing behaviour, regulated data and security-sensitive code. For a machine builder, warranty rules, prices and anything that posts to SAP go to your reviewer; a label change in the dealer portal does not.

## Which roles shift in a nearshore team?

A developer who steers an agent spends more time describing, checking and correcting than typing. Salesforce describes this for its own engineers in [four proficiency levels](https://engineering.salesforce.com/how-salesforce-built-an-agentic-engineering-enablement-strategy-for-thousands-of-software-engineers/): AI-Assisted, AI-Validating, AI-Orchestrating and AI-Native. At the second level, "Engineers shift from trusting AI output to validating it."

I would use that grid when a partner proposes a nearshore team: for each person, which level, and which agent pull requests have they reviewed? At least the seniors who carry reviews should be at the validating level before agents write code for production.

Domain knowledge is the second shift. An agent knows Apex and Flow. It does not know that the warranty start date is unreliable for machines sold through dealers, or that one plant maintains spare part numbers differently. A nearshore team was always far from that knowledge, and with agents a wrong assumption turns into working code within hours. That makes the domain lead on your side even more important. Whatever the team learns about your org goes into the [AI rules file in your repository](../ai-rules-file-salesforce-repository/), so it survives the next rotation.

## How does onboarding change with agents?

Agents shorten the first weeks. A new developer can let the agent read the metadata in a sandbox and explain which flows, triggers and validation rules run on Work Order before changing anything.

The risk is that the new person never builds a reviewer's understanding. In an [Anthropic study](https://www.anthropic.com/research/AI-assistance-coding-skills) from January 2026, 52 mostly junior engineers learned an unfamiliar Python library. The group with an AI assistant scored 50 percent on a follow-up quiz, the group without 67 percent, with the largest gap in debugging, and was not significantly faster. Participants who asked conceptual questions or had generated code explained scored around 65 to 86 percent, those who handed coding or debugging to the AI below 40 percent. The sample is small, and the authors expect a larger effect with agentic tools.

For a nearshore team that matters because today's juniors are the reviewers you need after the next rotation. If they spend their first months delegating, nobody can replace a senior who leaves.

So I would build onboarding around explanation: the agent explains existing automation, the new person writes the test, and reviews of other people's agent pull requests start in the first month. A four-week plan is in [chapter 9 of my AI masterclass](../../ai-masterclass/teamwork-and-delivery/). About 38 percent of McKinsey's respondents name lack of time to learn as a top barrier, so I would put the onboarding days into the nearshore plan and agree who pays for them.

## Which access rules apply when nearshore developers use agents?

Tools, model routes, data classes and no production access belong in the contract, see [partners coding with AI: what belongs in the contract](../partners-using-ai-coding-contract-rules/). For nearshore teams three points get sharper, because people change.

**Settings the developer cannot change.** According to the [permissions documentation](https://code.claude.com/docs/en/permissions), Claude Code's managed settings cannot be overridden by user or project settings. That is where deny rules such as `Read(./.env)` and `disableBypassPermissionsMode`, which prevents sessions without approval prompts, belong. Agentforce Vibes can be [disabled per org](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) under Setup, Agentforce Vibes Extensions, which I would do for production. The local Salesforce DX MCP Server only reaches [explicitly allowlisted orgs](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html); its end of life is covered [here](../salesforce-dx-mcp-server-end-of-life/).

**Rotation is an access event.** Claude Code keeps session transcripts in plaintext under `~/.claude/projects/` for 30 days by default, according to [Anthropic's data usage page](https://code.claude.com/docs/en/data-usage). When a developer leaves, their laptop holds what the agent read. The offboarding checklist per person removes the tool account, org access and allowlist entry, and the partner confirms that local transcripts with your code are deleted.

**No real data in agent context.** Service cases with customer names, serial numbers and dealer prices stay out, wherever the developer sits. Where prompts are processed depends on the model route; Anthropic's own API offers only "us" and "global" as [inference regions](https://platform.claude.com/docs/en/manage-claude/data-residency). For your in-house staff the works council comes in, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## A typical scenario: the field service stream with a nearshore team

Assume a machine builder with Service Cloud, Field Service, a dealer portal and SAP. A nearshore partner carries the field service stream with seven developers and one senior who reviews; the client has an architect and an admin. The partner introduces coding agents. All numbers are assumptions.

- **Before agents:** about 25 pull requests per sprint, first review within a working day.
- **After four sprints:** about 40 larger pull requests per sprint. The median wait for a review rises to three days, and the client architect sees more changes to Work Order and Asset, which the service stream also uses.
- **Decisions:** a second partner reviewer billed as reviewer hours, CODEOWNERS for Work Order, Asset and the SAP interface, and a size limit per pull request.
- **Rotation in month five:** the offboarding checklist runs within a day, and the replacement starts with two weeks of explanation tasks on the work order automation.

Whether the stream got faster stays open until cycle time and rework are compared with the baseline, see [measuring AI productivity in Salesforce projects](../measuring-ai-productivity-salesforce-projects/). The extra developer the partner offered first would only have lengthened the queue.

## Where should you start?

1. **Count reviewers per team**, not only developers, and check their backlog.
2. **Ask the partner for the agent level per person.**
3. **Set up code owners** for shared objects, sharing, data model and interfaces.
4. **Put managed settings, org allowlists and the offboarding checklist in place** before agents write code.
5. **Plan onboarding time** and agree who pays.
6. **Measure cycle time and rework** before and after.

Planning team setups, reviewer capacity and rotation rules is part of my [programme management for nearshore teams](../../services/program-management-nearshore/).

Nearshore Salesforce teams with AI agents deliver more only when review capacity, onboarding and access rules grow with the output. If you want to check your nearshore setup before the agents arrive, [send me a message](#contact).
