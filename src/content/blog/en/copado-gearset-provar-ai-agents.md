---
title: "Copado, Gearset and Provar AI agents: a client check"
description: "Copado Agentia, Gearset's agent Cam and Provar MCP bring AI into the Salesforce pipeline. What each does, its status and what to ask before you pay for it."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: copado-gearset-provar-ai-agents
translationKey: devops-ai-agents-copado-gearset
topic: devops
categories: [devops, ai]
tags: [copado, gearset, provar, ai agents, devops, due diligence]
takeaways:
  - "Agentia is in Copado's Advanced and Pro editions, Agentia Headless is GA since October 20, Cam is sold by quote, and Provar MCP is free for Provar customers."
  - "Copado names Vertex AI with Gemini and Claude but not the model per agent; Gearset's AI terms name OpenAI, AWS, US data centers and 90 days of retention."
  - "Before paying, ask in writing which model runs, where data is processed, how long it is kept, how usage is capped and who approves what the agent produces."
  - "A team already running open-source DevOps such as sfdx-hardis covers parts of the workflow with a general coding agent and a provider it chooses itself."
faq:
  - q: "What is Copado Agentia?"
    a: "Copado Agentia is Copado's set of AI agents for Salesforce delivery, announced on April 13, 2026. Copado describes agents for plan, build, test, release and operate, a Context Hub built from org metadata and pipeline history, and governance features such as approval gates and audit trails."
  - q: "Is Gearset Cam generally available?"
    a: "Gearset launched Cam on September 2, 2026 with figures from pilot customers. Today the pricing page lists the Gearset Agent with \"Request a quote\" but no GA label and no price, so I would confirm the status and the service level in the order form."
  - q: "Which AI model do Copado Agentia and Gearset Cam use?"
    a: "Copado's privacy notice of August 5, 2026 names Google Cloud Vertex AI with Gemini and Claude models as the backend of its AI features, but not which model each Agentia function uses. Gearset's general AI terms list OpenAI and Amazon Web Services among its providers. Ask both in writing for the exact model per function."
  - q: "Does Provar MCP send data to Provar?"
    a: "According to Provar's documentation the MCP server runs entirely on the local machine and sends no project files, test code or credentials to Provar servers, unless you enable an optional API validation. The AI assistant you connect still sees the context, so your contract with that AI vendor applies."
  - q: "Do I need a paid DevOps AI agent if my team uses Claude Code or Copilot?"
    a: "Not necessarily. A general coding agent writes the change and a pipeline you own governs it. Paid DevOps agents add a prepared view of your org and a governance layer the vendor maintains, which helps teams that already run a governed delivery process and want the vendor to integrate and support the agent."
draft: false
---

Copado Agentia, Cam, the Gearset Agent, and Provar MCP are the 2026 AI offerings of three Salesforce DevOps and testing vendors, all described by vendor claims. Copado says Agentia is available in its Advanced and Pro editions, Gearset sells Cam by quote after a pilot phase, and Provar MCP is a free local tool layer for the AI assistant of Provar Automation customers. Before a manufacturer pays, I would ask four questions: which model runs, where the data is processed, how long it is kept and who approves what the agent produces. Both agent vendors answer only part of that publicly.

## What do Copado Agentia, Gearset Cam and Provar MCP do?

The descriptions below are the vendors' own; I found no independent test on Salesforce Ben or comparable Salesforce press.

- **Copado Agentia.** Announced on April 13, 2026 in [Copado's press release](https://www.copado.com/resources/blog/copado-introduces-agentia-tm-bringing-context-aware-ai-agents-to-salesforce-devops). A Context Hub combines org metadata, dependencies, pipelines and history with your own documentation and policies. On top sit agents for plan, build, test, release and operate, an Orchestrate Agent that coordinates them, and Agentia Studio for custom workflows and Agentforce agents. Which of these each edition includes is something to confirm in the quote. Built-in governance, per Copado: policy controls, automated testing, approval gates, audit trails and role-based access.
- **Cam, the Gearset Agent.** According to [Gearset's announcement of September 2, 2026](https://assets.gearset.com/2026/09/01112431/Gearset-2026-Cam-Announcement.pdf), Cam takes a ticket, asks for clarification when the request is unclear, plans and builds the change and checks that it is deployable before it opens a pull request. Its work runs through the team's release process with the same tests and reviews as human changes, with an audit trail.
- **Provar MCP.** Published on July 1, 2026 on the [Provar blog](https://provar.com/blog/product/provar-mcp-bringing-ai-to-salesforce-test-automation/). It is not an agent itself but an "AI-assisted quality layer" in the Provar DX CLI: an MCP server through which an AI assistant such as Claude, GitHub Copilot or Cursor reads org metadata, generates Provar tests and Page Objects, validates them against quality rules, runs them and triages failures. The blog says more than 240 rules, the current documentation 170+; ask Provar which count applies.

Copado and Gearset sell an agent that produces changes for your release process; Cam's published workflow ends with a pull request, not a direct deployment. Provar adds a tool to the AI assistant your developers already use, which changes what the due diligence covers.

## What is generally available and what is still a pilot

A pilot rarely comes with a service level or a fixed price, so status matters. As of November 9, 2026:

| Product | Status as the vendor states it | Price published | Model named |
|---|---|---|---|
| Copado Agentia | "available today" in the Agentia Advanced and Agentia Pro editions (April 2026) | no | Vertex AI with Gemini and Claude, no model per function |
| Copado Agentia Headless (agents in CLI and IDE) | generally available since October 20, 2026 | no | Vertex AI with Gemini and Claude, no model per function |
| Cam, the Gearset Agent | launched September 2026 with pilot results, sold by quote, no GA label | no | no; AI terms name OpenAI and AWS |
| Provar MCP | included with a Provar Automation license, CLI plugin installed from the beta tag | no extra cost | uses your AI assistant |

Sources: Copado press release, [Copado GA announcement for Agentia Headless](https://www.copado.com/resources/blog/bring-your-own-agent-keep-your-pipeline-agentia-headless-is-now-generally-available), [Copado privacy notice](https://www.copado.com/legal/privacy), Gearset announcement, [Gearset pricing](https://gearset.com/pricing/) and [Gearset agent page](https://gearset.com/solutions/gearset-agent/), [Provar MCP documentation](https://documentation.provar.com/documentation/v3/provar-mcp/).

The one hard number comes from Gearset:

```kennzahlen
44% | of a team's pull requests were created by Cam at one customer within a week
75% | of these pull requests were successfully merged
source: Gearset announcement of September 2, 2026
```

That is one customer, measured by the vendor, after one week. It shows that Cam can produce mergeable pull requests in a real org, nothing more. The announcement does not say whether the other quarter failed review, was still pending or was dropped, and every one went through the team's review.

## Model, region and retention set the three apart most

Here the three products differ most, and this is where a manufacturer with GDPR obligations and a works council should start.

**Gearset** publishes general AI terms in its [product and location specific terms](https://gearset.com/legal/product-and-location-terms/), in a version effective from September 15, 2026. They do not mention Cam by name, but they cover Gearset's AI functionality as a whole:

- Providers include "OpenAI and Amazon Web Services", with "data centers in the United States and as otherwise specified in the Documentation".
- Gearset keeps input and output for 90 days or, where the software offers it, a shorter period you set; the providers keep nothing.
- Gearset does not train models on customer data, but may use input and output to assess and improve its services.
- Usage is measured in credits with a monthly cap from the order form. At the cap, Gearset suspends the AI functionality until the end of the month.
- The customer "may not use the AI functionality to replace or substantially replace human decision making".

```hinweis achtung
US data centers mean a third-country transfer your data protection officer must assess before production metadata goes in.
```

**Copado** names Google Cloud Vertex AI, "which incorporates third party models like Google Gemini and Anthropic's Claude Models", as the backend of its AI features in its [privacy notice](https://www.copado.com/legal/privacy) effective August 5, 2026, and its developer site lists API endpoints in the US (default), the EU and three other regions. It does not say which model each Agentia function uses or whether the EU endpoint keeps processing in the EU. I would have the order form confirm that these terms apply to the edition you buy.

**Provar MCP** runs "entirely on your local machine", according to its documentation, and sends "no project files, test code, or credentials" to Provar servers unless you switch on an optional API validation. The metadata and test cases still reach whichever AI assistant you connect. So connecting it creates a new data flow and permission path: which folders the client may read, which tools it may call on its own and whether it can start test runs. The data question moves to your contract with Anthropic, GitHub or Cursor; the [works council and GDPR article](../ai-coding-tools-works-council-gdpr/) covers that part. Path scoping and audit logs in the Provar documentation help with that approval. My reading of these terms is not legal advice.

## Worked example: a machine builder with Copado and a nearshore partner

Assume a machine builder with Sales Cloud for dealer sales, Field Service for its service technicians and an SAP S/4HANA integration for spare parts and warranty. The pipeline runs on Copado. Three internal developers work with a partner who provides six nearshore developers, and the partner already codes with Claude Code through accounts the client owns. All numbers here are assumptions.

Copado offers an upgrade to Agentia. This is how I would handle it:

1. **Separate building from governing.** The coding agent already writes Apex and Flows. The question for Agentia is whether its Context Hub and approval gates add something the existing pipeline and the [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/) do not.
2. **Get the four answers in writing.** Model and provider, processing region, retention, and how usage is metered and capped. Until they are on paper, Agentia only sees a developer sandbox without customer or dealer data.
3. **Pilot one narrow ticket type.** For example 20 small changes on the warranty claim object: new fields, picklist values, a validation rule. Measure merges without rework and review time against similar tickets done by the coding agent alone.
4. **Add Provar MCP if Provar is already licensed.** The regression tests for the dealer portal are the obvious target. There is no separate fee, but connecting it to the coding agent is a new data flow that needs its own approval.
5. **Decide after six weeks** on numbers from your own org, not on the vendor's 44 and 75 percent.

With Gearset the steps are the same; step 2 starts from Gearset's published terms and asks for an EU region.

## When is open source plus a general coding agent enough?

A team that already runs [sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/) gets parts of what paid DevOps agents offer without a second AI contract, not the vendors' context, testing and governance layers. According to the [sfdx-hardis AI setup guide](https://sfdx-hardis.cloudity.com/salesforce-ai-setup/), it explains deployment errors and describes Flows and Apex classes. The provider can be Agentforce, OpenAI, Anthropic, Google or a local Ollama model, set by environment variables or routed through a corporate gateway. You choose the provider and, where the provider and contract support it, the processing region; a local model keeps inference local. Its coding agent auto-fix is in beta, and the guide says an expert must review those changes before merging.

Pair that with Claude Code, Codex or Copilot, compared in [Agentforce Vibes, Claude Code, Codex or Copilot](../agentforce-vibes-claude-code-copilot/), and a pipeline you own decides what reaches production. The trade-off is support.

```pro-contra
pro: A paid DevOps agent fits when
- you already run a governed delivery process and want the vendor to support the agent
- you want a prepared view of org and pipeline
- the vendor should maintain the governance layer
- you want to pay someone else for setup and support
contra: Open source and a coding agent are enough when
- your team already runs sfdx-hardis
- you want to choose the provider and its region yourself
- you or your architect own the setup
```

## Put these questions in writing before you pay

I would put these questions to any DevOps vendor selling an AI agent and get the answers into the order form:

- Which model and which provider run the agent, and will you tell us before you change them?
- In which region is input processed, and is an EU region available?
- How long are prompts, code and metadata kept, by you and by the model provider, and are they used for training?
- How is usage metered, what is the monthly cap, and what happens when we reach it?
- Is the product generally available, in beta or in a pilot, and which service level applies?
- Who approves the agent's pull requests, and can it ever deploy without a human?
- What happens to the context the agent built about our org when we leave?

The last two follow from two rules: the client should [own the DevOps tools](../why-clients-should-own-their-devops-tools/), and the same terms belong in [partner contracts for AI coding](../partners-using-ai-coding-contract-rules/). Setting this up is part of my [DevOps and release management](../../services/devops-release-management/) work; the wider tool choice is in [chapter 4 of the AI masterclass](../../masterclass/ai-salesforce/external-coding-agents/).
