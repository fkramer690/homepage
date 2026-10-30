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

AI-native delivery means building the delivery process around the agent instead of adding a coding assistant to the old process. How this changes the team set-up I described in [AI-native delivery: smaller Salesforce teams](../ai-native-delivery-smaller-salesforce-teams/). This article is about the flow itself. It is my target picture: I already use individual steps, I will set it up end to end from workshop to production in my next project, and a few gaps are still to close. It rests on four ideas:

```saeulen
roof: AI-native delivery
contract | Ticket | is the specification | An agent builds a story only as well as its acceptance criteria are written.
ai | Agent | does the legwork | Org analysis, minutes, stories, prototype, code, tests and release notes are drafted by the agent.
pipeline | Pipeline | checks deterministically | It validates and deploys without a model deciding anything.
team | People | decide at gates | They hold every conversation with the client themselves, the agent sits in no meeting.
base: One process, built around the agent
```

The difference to AI-assisted: there the old process gets a coding assistant, the business analyst keeps typing up stories, and the client sees something that runs only in acceptance testing. Here the agent delivers minutes, stories and a prototype, and every piece of feedback is classified against the confirmed minutes.

## How does the process run from workshop to production?

The process has three phases with 14 steps in total. Each graphic shows one phase in three lanes: what people do in conversation, what the agent does and what the pipeline checks. The dark bars are the gates where a person makes a binding decision. The blue column on the right shows the status of the Jira ticket and who sets it: the agent creates stories directly in Jira, the pipeline moves the status on by itself after validation and deployment.

### Discovery: the agent prepares, people hold the conversation

```prozess
title: Phase 1 of 3 · Discovery
lanes: People | Agent | Pipeline
ticket: Jira
Agent | Prepare the workshop | Org analysis, agenda, hypotheses
People | Discovery workshop | Client, BA, architect; transcript runs
Agent | Evaluation | Minutes, story drafts with timestamps | Stories created · agent
gate: Client confirms the minutes
Agent | Prototype | In a scratch org, in hours
People | Refinement on the prototype | Client clicks through, transcript runs
Agent | Story diff and impact | Changes, test cases, metadata | Stories updated · agent
gate: BA and architect approve the story | Ready for Agent · BA
```

Before the workshop the agent analyses the existing org: objects, flows, validation rules, permissions. From that it drafts the agenda, hypotheses and targeted questions, for example: "Three flows on Opportunity overlap. Who owns them on the business side?" The business analyst sharpens the agenda and strikes hypotheses that are politically sensitive. What such an org analysis looks like is in [AI org assessment: finding technical debt](../ai-org-assessment-technical-debt/).

In the workshop the business analyst moderates and does not have to take notes. From the transcript the agent produces minutes with decisions, open questions and owners, plus drafts of epics and stories in Jira, each with a timestamp. It keeps "the client said" strictly apart from "the agent interprets". The business analyst curates: strikes, sharpens, adds the fit-gap (standard, configuration or code), corrects misheard terms and mixed-up speakers.

Once the client confirms the minutes, the scope baseline stands. The agent then builds a prototype in a scratch org, a short-lived test org, within hours: objects, fields, layouts and a simple flow. In the refinement the client reacts to something real instead of paper. Afterwards the agent writes no new set of stories but a diff against the existing ones: "Acceptance criterion 2 changed because the client said at 00:41:07 …", with the affected metadata, test cases and impact against the state of the repository.

### Build: the agent codes, the developer reviews

```prozess
title: Phase 2 of 3 · Build
lanes: People | Agent | Pipeline
ticket: Jira
start: 7 | 3
Agent | Implementation | Plan, approval, code and tests | In progress · agent
Agent | Pull request | Description, Jira link, AI review | In review · agent
gate: Developer reviews and merges
Pipeline | CI validation | Delta as check deploy, tests, analyzer | Validated · pipeline
loop: Failure: agent reads the log and fixes, at most 2 attempts
```

Only when business analyst and architect set a story to "Ready for Agent" does the build start. The agent reads the ticket, creates a feature branch, writes an implementation plan and carries it out only after the developer approves it: Apex, Lightning Web Components or flow, each with tests. When a requirement is unclear it reads the linked passage of the transcript instead of guessing. It writes the pull request description with ticket link and component list, and an AI reviewer comments first.

Nothing is merged without a developer's review. In this process the developer reviews more than they write. Why I never give up this gate is in [Why pull request reviews are a must](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).

Then the pipeline runs: a delta package built with `sfdx-git-delta`, a check-only deploy against the integration sandbox, defined tests and a Code Analyzer gate. If it fails, the agent gets the log and may deliver a fix commit, at most two attempts. After that the developer takes over. Which checks I put into the pipeline for AI code I describe in [Quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/).

### Release: the client tests, the agent classifies

```prozess
title: Phase 3 of 3 · Release
lanes: People | Agent | Pipeline
ticket: Jira
start: 10 | 4
Pipeline | Deploy to UAT | Agent writes test scripts into the ticket | In UAT · pipeline
People | Acceptance test | Client tests, BA supports
Agent | Feedback triage | Bug, change request or question | Bug or CR created · agent
gate: BA and client decide on bugs and CRs
loop: Bugs back to 07, change requests as a new story to 06
gate: Client approves the release | Approved · client
Pipeline | Release to production | Quick deploy of the validated ID | Done · pipeline
Agent | Release notes and guide | BA proofreads
note: **Rule:** The agent has no access to production. Only the pipeline deploys there.
```

After the merge the pipeline deploys to the UAT sandbox, and the agent writes test scripts straight from the acceptance criteria into the ticket. The client tests, the business analyst supports the sessions. The agent classifies every piece of feedback: **bug** when it contradicts a confirmed criterion, **change request** when it is new, **open question** when the evidence is missing. Business analyst and client confirm the classification. Bugs go back to implementation, change requests are assessed as a new story, commercially as well. Scope creep becomes visible, with evidence instead of gut feeling. How an acceptance test with the business is set up is in [Salesforce UAT with the business](../salesforce-uat-business-acceptance-testing/).

After approval the pipeline rolls out the already validated deployment ID by quick deploy. The agent writes release notes and a user guide in the language of the business, and the business analyst proofreads.

## Who decides what in this process?

Agent and pipeline decide nothing binding. Every decision that affects scope, quality or production is made by a named person.

```tabelle
title: Who decides in which phase
columns: | Discovery | Build | Release
Client | Explains and confirms the minutes * | Answers questions | Tests and approves the release *
Business analyst | Moderates, curates and approves the spec * | Clarifies business questions | Supports the test, decides on CRs *
Architect | Sets guardrails and approves the spec * | Maintains the rules file | Watches data model and sharing
Developer | Checks the prototype | Approves plans, reviews and merges * | Takes over on escalation
Agent | Analyses, takes minutes, drafts | Builds code and tests | Test scripts, triage, release notes
Pipeline | Not involved yet | Validates, sets the Jira status | Deploys, sets the Jira status
mark: Gate
note: Marked are the decisions at the five gates. Everything else is groundwork for them.
```

The roles change more than the tools do. The business analyst writes less and decides more; the core skill becomes spotting contradictions between what was said and what was meant. The architect becomes the keeper of the rules file, the Markdown file in the repository with trigger framework, naming conventions, sharing rules and prohibitions that the agent reads at the start of every session. It is the biggest lever on the quality of everything the agent produces, see [AI rules file in the Salesforce repository](../ai-rules-file-salesforce-repository/). The client needs more discipline with confirmations, otherwise speed turns into chaos.

## An example: from a sentence in the workshop to the release note

A scenario as an assumption, to show the chain. In the discovery workshop of a machine builder the head of sales says at minute 14: "We do not close an opportunity under 10,000 euros."

- The agent turns this into the requirement "close opportunities only from 10,000 euros" in the minutes, with a reference to 00:14:52, and into a story with this acceptance criterion.
- In the refinement on the prototype the head of sales notices that lost opportunities must still be closable under 10,000 euros. The agent shows this as a diff to the story: the rule only applies to "Closed Won". Business analyst and architect approve.
- The agent builds a validation rule on the opportunity, writes the test for 9,999 and 10,000 euros and links the ticket in the commit. The developer reviews, the pipeline validates and sets the ticket to "In UAT".
- In the acceptance test a sales rep reports that small spare parts orders should still count as won. The agent classifies this as a change request, because no confirmed criterion provides an exception.
- The release note names the new minimum amount for won opportunities.

If someone asks a year later why the rule applies at 10,000 euros, the chain leads back to the statement in the workshop in two clicks.

```kette
title: Traceability: from a sentence in the workshop to the release note
Sentence in transcript | 00:14:52: "We do not close an opportunity under 10,000 euros."
Requirement | Close opportunities only from 10,000 euros
Story | Applies to Closed Won only, added in the refinement on the prototype
Commit | Validation rule: Closed Won with `Amount < 10000` is rejected
Test | 9,999 euros is rejected, 10,000 euros goes through
Release note | Won opportunities need at least 10,000 euros
note: Every link points to the one before. That keeps every line of code traceable.
```

## Which tools do you need for it?

The process does not depend on a particular coding agent. It needs four connections, as of October 2026:

- **Jira for agent and pipeline.** The pipeline sets the ticket status itself after every run, so nobody maintains it by hand. Through the Atlassian Rovo MCP Server coding agents can read and write Jira and, according to [Atlassian](https://www.atlassian.com/blog/jira/mcp-enhancements), also read the development panel with linked branches, pull requests and commits. Jira also lets you assign work items directly to [Claude, Cursor, Codex, GitHub Copilot or the Jira Coding Agent](https://www.atlassian.com/software/jira/dev).
- **Access to the sandboxes.** Through the Salesforce CLI with the skills from [sf-skills](https://github.com/forcedotcom/sf-skills), the [Salesforce Claude Code plugin](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) or Hosted MCP Servers. According to its README the local Salesforce DX MCP Server reaches end of life on 2 November 2026; what that means for your partners is in [Salesforce DX MCP Server: end of life on 2 November 2026](../salesforce-dx-mcp-server-end-of-life/). The agent reaches every org the Salesforce CLI on its machine is logged in to. That is why only fixed sandbox aliases are logged in there, never production.
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

Start with the gate that saves the most: the spec approval. Only when this track runs reliably is the rest worth it.

```schritte
Spec approval | one stream · BA and architect
  Write the stories so that an agent can build them without asking back.
Measure | in code review · developer
  Count how often the developer still has to ask.
Secure | in parallel
  Settle recording and tenant, lock every production access except the pipeline's.
Expand | once it runs reliably
  Add the prototype and the feedback triage.
```

An AI-native delivery process gets fast because people decide at a few gates and everything in between stays traceable.
