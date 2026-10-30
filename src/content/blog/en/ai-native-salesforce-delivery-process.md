---
title: "AI-native Salesforce delivery process in 14 steps"
description: "An AI-native delivery process for Salesforce from workshop to deployment: what the agent does, where people decide at five gates and what the pipeline checks."
pubDate: 2026-10-30
lang: en
slug: ai-native-salesforce-delivery-process
translationKey: ai-native-delivery-process
topic: devops
categories: [devops, ai]
tags: [AI-native delivery, coding agents, Jira, DevOps, requirements, manufacturing]
takeaways:
  - "In an AI-native delivery process for Salesforce the Jira ticket becomes the executable specification: an agent does the legwork from workshop minutes to pull request, people decide at five fixed gates."
  - "The common thread is an unbroken chain from a sentence in the workshop transcript through requirement, story, commit and test to the release note; every line of code traces back to something the client said."
  - "The most important gate is the spec approval \"Ready for Agent\" by business analyst and architect, because a mistake there is cheapest to fix."
  - "The pipeline stays deterministic, with no AI decisions; only the pipeline has access to production, the agent works in scratch orgs and sandboxes only."
  - "The agent classifies feedback from user acceptance testing as bug, change request or open question, with evidence from the confirmed minutes; scope creep becomes visible."
faq:
  - q: "What is the difference between AI-assisted and AI-native Salesforce delivery?"
    a: "AI-assisted means the old process gets a coding assistant. AI-native means the process is built around the agent: it analyses, takes minutes, drafts and codes, while people curate and decide at fixed gates."
  - q: "May an AI agent deploy to production?"
    a: "No. Access to production lies with the pipeline only, which rolls out an already validated deployment ID by quick deploy. The agent works in scratch orgs and sandboxes that are explicitly allowed for it."
  - q: "May workshops with the client be recorded?"
    a: "Only with the consent of everyone taking part, at large companies often with the works council as well, and once it is clear in whose tenant the transcript is stored. If the client does not want a recording, the business analyst dictates a summary right after the meeting, which takes the same route."
  - q: "Who is responsible for the quality of the agent's output?"
    a: "On the business side the business analyst, technically the architect through the rules file in the repository, in the code the developer who reviews every pull request. The agent decides nothing binding."
draft: false
---

An AI-native delivery process for Salesforce turns the Jira ticket into an executable specification. An agent does the legwork from preparing the workshop to the pull request, the pipeline checks deterministically, and people decide at five fixed gates: minutes, spec, code review, bugs and change requests, release. The process has 14 steps from the first requirement to production. It holds together a chain that classic projects rarely manage: every line of code traces back to a sentence someone at the client said. For manufacturers one thing changes most: the business sees something that runs much earlier and has to confirm faster in return.

## What does AI-native mean in a Salesforce project?

AI-native delivery means building the delivery process around the agent instead of adding a coding assistant to the old process. How this changes the team set-up I described in [AI-native delivery: smaller Salesforce teams](../ai-native-delivery-smaller-salesforce-teams/). This article is about the flow itself. It rests on four ideas:

- **The ticket is the specification.** An agent can only build a story as well as its acceptance criteria are written. That is why the spec approval is the most important gate.
- **The agent does the legwork.** Org analysis, minutes, story drafts, prototype, code, tests, test scripts, release notes.
- **The pipeline is a deterministic quality fence.** It validates and deploys without a model deciding anything.
- **People sit at clearly defined gates** and hold every conversation with the client themselves. The agent takes part in no meeting.

```vergleich
without: AI-assisted: the old process, typed faster
- The business analyst writes the minutes and types up stories.
- The client sees something that runs only in acceptance testing.
- Developers use a coding assistant, the flow stays the same.
- Gut feeling decides whether feedback is a bug or a change request.
with: AI-native: the ticket as executable specification
- The agent delivers minutes and story drafts, the business analyst curates.
- The client clicks through a prototype in the second meeting.
- The agent builds approved stories, people check at fixed gates.
- Every piece of feedback is classified against the confirmed minutes.
```

## How does the process run from workshop to production?

The graphic shows all 14 steps in three lanes: what people do in conversation, what the agent does and what the pipeline checks. The blue bars are the gates where a person makes a binding decision.

```prozess
title: AI-native delivery process for Salesforce
lanes: People | Agent | Pipeline
chain: Sentence in transcript, Requirement, Story, Commit, Test, Release note
phase: Discovery
Agent | Prepare the workshop | Org analysis, agenda, hypotheses
People | Discovery workshop | Client, BA, architect; transcript runs
Agent | Evaluation | Minutes, story drafts with timestamps
gate: Client confirms the minutes
Agent | Prototype | In a scratch org, in hours
People | Refinement on the prototype | Client clicks through, transcript runs
Agent | Story diff and impact | Changes, test cases, metadata
gate: BA and architect approve: Ready for Agent
phase: Build
Agent | Implementation | Plan, approval, code and tests
Agent | Pull request | Description, Jira link, AI review
gate: Developer reviews and merges
Pipeline | CI validation | Delta as check deploy, tests, analyzer
loop: Failure: agent reads the log and fixes, at most 2 attempts
phase: Release
Pipeline | Deploy to UAT | Agent writes test scripts into the ticket
People | Acceptance test | Client tests, BA supports
Agent | Feedback triage | Bug, change request or question
gate: BA and client decide on bugs and change requests
loop: Bugs back to 07, change requests as a new story to 06
gate: Client approves the release
Pipeline | Release to production | Quick deploy of the validated ID
Agent | Release notes and guide | BA proofreads
note: **Rule:** The agent has no access to production. Only the pipeline deploys there.
```

### Discovery: the agent prepares, people hold the conversation

Before the workshop the agent analyses the existing org: objects, flows, validation rules, permissions. From that it drafts the agenda, hypotheses and targeted questions, for example: "Three flows on Opportunity overlap. Who owns them on the business side?" The business analyst sharpens the agenda and strikes hypotheses that are politically sensitive. What such an org analysis looks like is in [AI org assessment: finding technical debt](../ai-org-assessment-technical-debt/).

In the workshop the business analyst moderates and does not have to take notes. From the transcript the agent produces minutes with decisions, open questions and owners, plus drafts of epics and stories in Jira, each with a timestamp. It keeps "the client said" strictly apart from "the agent interprets". The business analyst curates: strikes, sharpens, adds the fit-gap (standard, configuration or code), corrects misheard terms and mixed-up speakers.

Once the client confirms the minutes, the scope baseline stands. The agent then builds a prototype in a scratch org, a short-lived test org, within hours: objects, fields, layouts and a simple flow. In the refinement the client reacts to something real instead of paper. Afterwards the agent writes no new set of stories but a diff against the existing ones: "Acceptance criterion 3 changed because the client said at 00:23:14 …", with the affected metadata, test cases and impact against the state of the repository.

### Build: the agent codes, the developer reviews

Only when business analyst and architect set a story to "Ready for Agent" does the build start. The agent reads the ticket, creates a feature branch, writes an implementation plan and carries it out only after the developer approves it: Apex, Lightning Web Components or flow, each with tests. When a requirement is unclear it reads the linked passage of the transcript instead of guessing. It writes the pull request description with ticket link and component list, and an AI reviewer comments first.

Nothing is merged without a developer's review. In this process the developer reviews more than they write. Why I never give up this gate is in [Why pull request reviews are a must](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).

```praxis
In one programme I supported, every pull request went across my desk at first. Once the process ran smoothly, I handed it over to an internal colleague.
```

Then the pipeline runs: a delta package built with `sfdx-git-delta`, a check-only deploy against the integration sandbox, defined tests and a Code Analyzer gate. If it fails, the agent gets the log and may deliver a fix commit, at most two attempts. After that the developer takes over. Which checks I put into the pipeline for AI code I describe in [Quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/).

### Release: the client tests, the agent classifies

After the merge the pipeline deploys to the UAT sandbox, and the agent writes test scripts straight from the acceptance criteria into the ticket. The client tests, the business analyst supports the sessions. The agent classifies every piece of feedback: **bug** when it contradicts a confirmed criterion, **change request** when it is new, **open question** when the evidence is missing. Business analyst and client confirm the classification. Bugs go back to implementation, change requests are assessed as a new story, commercially as well. Scope creep becomes visible, with evidence instead of gut feeling. How an acceptance test with the business is set up is in [Salesforce UAT with the business](../salesforce-uat-business-acceptance-testing/).

After approval the pipeline rolls out the already validated deployment ID by quick deploy. The agent writes release notes and a user guide in the language of the business, and the business analyst proofreads.

## Who decides what in this process?

Agent and pipeline decide nothing binding. Every decision that affects scope, quality or production is made by a named person.

```tabelle
title: Roles in the AI-native delivery process
columns: | Discovery | Build | Release
Client | Explains, confirms the minutes * | Answers questions | Tests, approves the release *
Business analyst | Moderates, curates, approves the spec * | Clarifies business questions | Supports the test, decides on CRs *
Architect | Sets guardrails, approves the spec * | Maintains the rules file | Watches data model and sharing
Developer | Checks the prototype | Approves plans, reviews, merges * | Takes over on escalation
Agent | Analyses, takes minutes, drafts | Builds code and tests | Test scripts, triage, release notes
Pipeline | Not involved yet | Validates deterministically | Deploys to UAT and production
mark: decides
note: Marked are the decisions at the five gates. Everything else is groundwork for them.
```

The roles change more than the tools do. The business analyst writes less and decides more; the core skill becomes spotting contradictions between what was said and what was meant. The architect becomes the keeper of the rules file, the Markdown file in the repository with trigger framework, naming conventions, sharing rules and prohibitions that the agent reads at the start of every session. It is the biggest lever on the quality of everything the agent produces, see [AI rules file in the Salesforce repository](../ai-rules-file-salesforce-repository/). The client needs more discipline with confirmations, otherwise speed turns into chaos.

## An example: from a sentence in the workshop to the release note

A scenario as an assumption, to show the chain. A machine builder wants to check warranty claims from its dealers in Salesforce. In the discovery workshop the head of after-sales says at minute 23: "I want to see claims over 5,000 euros myself."

- The agent turns this into the requirement "approval by the head of after-sales from 5,000 euros" in the minutes, with a reference to 00:23:14, and into a story with this acceptance criterion.
- In the refinement on the prototype she adds that her deputy's approval is enough while she is on holiday. The agent shows this as a diff to the existing story, business analyst and architect approve.
- The agent builds the approval process, writes the test for 4,999 and 5,001 euros and links the ticket in the commit. The developer reviews, the pipeline validates.
- In the acceptance test a clerk reports that he also wants to send claims over 10,000 euros to the managing director. The agent classifies this as a change request, because no confirmed criterion asks for it.
- The release note names the approval from 5,000 euros with the deputy rule.

If someone asks a year later why the limit is 5,000 euros, the chain leads back to the statement in the workshop in two clicks.

## Which tools do you need for it?

The process does not depend on a particular coding agent. It needs four connections, as of October 2026:

- **Jira for agents.** Through the Atlassian Rovo MCP Server coding agents can read and write Jira and, according to [Atlassian](https://www.atlassian.com/blog/jira/mcp-enhancements), also read the development panel with linked branches, pull requests and commits. Jira also lets you assign work items directly to [Claude, Cursor, Codex, GitHub Copilot or the Jira Coding Agent](https://www.atlassian.com/software/jira/dev).
- **Access to the org.** Through the Salesforce CLI or an MCP server, only to explicitly allowed orgs. According to the [Salesforce documentation](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html) the local Salesforce DX MCP Server only reaches orgs that are allowed when it starts; according to its README it reaches end of life on 2 November 2026. What that means for your partners is in [Salesforce DX MCP Server: end of life on 2 November 2026](../salesforce-dx-mcp-server-end-of-life/). Never allow production.
- **A Git pipeline** that validates and deploys without AI, with production access for the pipeline only. How I set it up is described under [DevOps and release management](../../services/devops-release-management/).
- **Transcription in the client's tenant**, for example through the recording in Teams. Consent and the works council I cover in [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## Where does the process stumble?

**In discovery:**

- **A transcript is no truth.** A sentence in a meeting is no decision. The agent never creates binding stories from it without the business analyst's check.
- **Clients who do not want a recording.** Then the business analyst dictates a summary right after the meeting, which takes the same route.
- **Retention.** Delete transcripts after acceptance or reduce them to the confirmed minutes.

**In the Salesforce part:**

- **Click development.** Admins keep building flows and layouts in sandboxes. The process needs a step in which the agent retrieves and commits such changes, otherwise Git drifts away from the org.
- **Profiles, permission sets, destructive changes.** The classic deployment traps belong in the rules file as explicit rules.
- **Configuration data.** CPQ and Field Service set-ups or custom settings are no metadata deployment and need their own track.

## Where should you start?

Start with the gate that saves the most: the spec approval. For one stream, have the stories written so that an agent can build them without asking back, and measure how often the developer still has to ask in the review. In parallel, settle recording and tenant for the workshops and lock every production access except the pipeline's. Only when this track runs reliably is it worth adding the prototype and the feedback triage.

An AI-native delivery process gets fast because people decide at a few gates and everything in between stays traceable.
