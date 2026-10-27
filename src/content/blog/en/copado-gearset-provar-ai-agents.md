---
title: "Copado, Gearset and Provar AI agents: a client check"
description: "Copado Agentia, Gearset Cam and Provar MCP put AI agents into the Salesforce pipeline. What each does, its status and what to ask before you pay for it."
pubDate: 2026-10-27
lang: en
slug: copado-gearset-provar-ai-agents
translationKey: devops-ai-agents-copado-gearset
topic: devops
categories: [devops, ai]
tags: [copado, gearset, provar, ai agents, devops, due diligence]
takeaways:
  - "Copado Agentia, Gearset Cam and Provar MCP are AI agents from Salesforce DevOps and testing vendors; in October 2026 everything known about them comes from the vendors' own pages."
  - "Copado says Agentia is available in its Advanced and Pro editions, Gearset launched Cam on 2 September 2026 with pilot customers, and Provar MCP is a local plugin at no extra cost for Provar Automation customers."
  - "Neither Copado nor Gearset names the model behind its agent; Gearset's general AI terms name OpenAI and Amazon Web Services, US data centres and 90 days of retention."
  - "Before paying, ask in writing which model runs, where data is processed, how long it is kept, how usage is capped and who approves what the agent produces."
  - "A team already running open-source DevOps such as sfdx-hardis covers much of the same ground with a general coding agent and a model it chooses itself."
faq:
  - q: "What is Copado Agentia?"
    a: "Copado Agentia is Copado's set of AI agents for Salesforce delivery, announced on 13 April 2026. Copado describes agents for plan, build, test, release and operate, a Context Hub built from org metadata and pipeline history, and governance features such as approval gates and audit trails."
  - q: "Is Gearset Cam generally available?"
    a: "Gearset's announcement of 2 September 2026 describes pilots with a selection of customers and does not use the term GA. The product page names no price and offers a demo, so I would confirm the status and the service level in the order form."
  - q: "Which AI model do Copado Agentia and Gearset Cam use?"
    a: "Neither vendor names the model on its product pages. Gearset's general AI terms list OpenAI and Amazon Web Services among its providers; for Copado I found no public statement that covers Agentia. Ask both in writing."
  - q: "Does Provar MCP send data to Provar?"
    a: "According to Provar's documentation the MCP server runs entirely on the local machine and sends no project files, test code or credentials to Provar servers, unless you enable an optional API validation. The AI assistant you connect still sees the context, so your contract with that AI vendor applies."
  - q: "Do I need a paid DevOps AI agent if my team uses Claude Code or Copilot?"
    a: "Not necessarily. A general coding agent writes the change and a pipeline you own governs it. Paid DevOps agents add a prepared view of your org and a governance layer the vendor maintains, which helps teams without Git and pipeline know-how in house."
draft: false
---

Copado Agentia, Gearset Cam and Provar MCP are the AI agents three Salesforce DevOps and testing vendors brought out in 2026, and so far everything about them rests on vendor claims. Copado says Agentia is available in its Advanced and Pro editions, Gearset launched Cam with pilot customers, and Provar MCP is a free local plugin for Provar Automation customers. Before a manufacturer pays for any of them, I would ask four questions: which model runs, where the data is processed, how long it is kept and who approves what the agent produces. Only Gearset answers part of that in public.

## What do Copado Agentia, Gearset Cam and Provar MCP do?

All three put an AI agent somewhere between the ticket and the release, at different points. The descriptions below are the vendors' own. I found no independent test on Salesforce Ben or comparable Salesforce press.

- **Copado Agentia.** Announced on 13 April 2026 in [Copado's press release](https://www.copado.com/resources/blog/copado-introduces-agentia-tm-bringing-context-aware-ai-agents-to-salesforce-devops). A Context Hub combines org metadata, dependencies, pipelines and history with your own documentation and policies. On top sit agents for plan, build, test, release and operate, an Orchestrate Agent that coordinates them, and Agentia Studio for your own workflows and custom Agentforce agents. Copado lists policy-driven controls, automated testing, approval gates, audit trails and role-based access as built-in governance. Agentia Headless brings the agents into the IDE.
- **Gearset Cam.** According to [Gearset's announcement of 2 September 2026](https://assets.gearset.com/2026/09/01112431/Gearset-2026-Cam-Announcement.pdf), Cam takes a ticket, asks for clarification when the request is unclear, plans and builds the change and checks that it is deployable before it opens a pull request. Its work runs through the team's existing release process with the same tests and reviews as human changes, and an audit trail records what Cam built and why.
- **Provar MCP.** Published on 1 July 2026 on the [Provar blog](https://provar.com/blog/product/provar-mcp-bringing-ai-to-salesforce-test-automation/). It is an open-source Salesforce CLI plugin that lets an AI assistant such as Claude, GitHub Copilot or Cursor read org metadata, generate Provar tests and Page Objects, validate them against more than 240 quality rules, run them and triage failures. It covers test automation only.

Copado and Gearset sell an agent that changes your org. Provar adds a tool to the AI assistant your developers already use. That difference decides most of the due diligence below.

## What is generally available and what is still a pilot?

Product status matters to a manufacturer because a pilot rarely comes with a service level or a fixed price. As of 27 October 2026 the vendors state this:

| Product | Status as the vendor states it | Price published | Model named |
|---|---|---|---|
| Copado Agentia | "available today" in the Agentia Advanced and Agentia Pro editions (April 2026) | no | no |
| Copado Agentia Headless | "officially GA" on Copado's Dreamforce 2026 page, no date given | no | no |
| Gearset Cam | launched with pilots at "a selection of Gearset customers", no GA label | no | no |
| Provar MCP | included with a Provar Automation licence, CLI plugin installed from the beta tag | no extra cost | uses your AI assistant |

Sources: Copado press release, [Copado Dreamforce 2026 page](https://www.copado.com/dreamforce-2026-copado), Gearset announcement and [Gearset agent page](https://gearset.com/solutions/gearset-agent/), [Provar MCP documentation](https://documentation.provar.com/documentation/v3/provar-mcp/).

The one hard number comes from Gearset: "Within a week, one customer had Cam creating 44% of their team's pull requests, with 75% of these successfully merged." That is one customer, measured by the vendor, after one week. I read it as evidence that Cam can produce mergeable pull requests in a real org, and nothing more. One in four of those pull requests was not merged, and a person reviewed every one of them.

## Which model, which region, which retention?

This is where the three products differ most, and where a manufacturer with GDPR obligations and a works council should look first.

**Gearset** publishes general AI terms in its [product and location specific terms](https://gearset.com/legal/product-and-location-terms/), in a version effective from 15 September 2026. They do not mention Cam by name, but they cover Gearset's AI functionality as a whole:

- Providers include "OpenAI and Amazon Web Services", with "data centres in the United States and as otherwise specified in the Documentation".
- Gearset keeps input and output for 90 days, or a shorter period you set; the providers keep nothing.
- Gearset does not train models on customer data, but may use input and output to assess and improve its services.
- Usage is measured in credits with a monthly cap from the order form. At the cap, Gearset suspends the AI functionality until the end of the month.
- The customer "may not use the AI functionality to replace or substantially replace human decision making".

US data centres mean a transfer to a third country, which your data protection officer has to assess before any production metadata goes in.

**Copado** names no model and no region for Agentia on the pages I opened. Its public data sheet "Copado AI and your data" dates from June 2024 and covers CopadoGPT and Test Copilot, not Agentia. That says nothing about the quality of the answers; it means you need them in writing before you sign.

**Provar MCP** runs "entirely on your local machine", according to its documentation, and sends "no project files, test code, or credentials" to Provar servers unless you switch on an optional API validation. The metadata and test cases still reach whichever AI assistant you connect. The data question therefore moves to your contract with Anthropic, GitHub or Cursor, which you should have settled anyway; the [works council and GDPR article](../ai-coding-tools-works-council-gdpr/) covers that part. As I read the vendors' pages, Provar MCP is the easiest of the three to approve. My reading of these terms is not legal advice.

## A typical scenario: a machine builder with Copado and a nearshore partner

Assume a machine builder with Sales Cloud for dealer sales, Field Service for its service technicians and an SAP S/4HANA integration for spare parts and warranty. The pipeline runs on Copado. Three internal developers work with a partner who provides six nearshore developers, and the partner already codes with Claude Code through accounts the client owns. All numbers here are assumptions.

Copado offers an upgrade to Agentia. This is how I would handle it:

1. **Separate building from governing.** The coding agent already writes Apex and Flows. The question for Agentia is whether its Context Hub and approval gates add something the existing pipeline and the [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/) do not.
2. **Get the four answers in writing.** Model and provider, processing region, retention, and how usage is metered and capped. Until they are on paper, Agentia only sees a developer sandbox without customer or dealer data.
3. **Pilot one narrow ticket type.** For example 20 small changes on the warranty claim object: new fields, picklist values, a validation rule. Measure how many pull requests merge without rework and how long review takes, against the same kind of tickets done by the coding agent alone.
4. **Add Provar MCP if Provar is already licensed.** The regression tests for the dealer portal are the obvious target. It costs nothing extra, and the data stays inside a tool chain that is already approved.
5. **Decide after six weeks** on numbers from your own org, not on the vendor's 44 and 75 percent.

If the same machine builder ran Gearset instead, the steps stay the same, except that step 2 starts from Gearset's published terms and asks whether an EU region is available.

## When is open source plus a general coding agent enough?

Paid DevOps agents bring two things a general coding agent lacks out of the box: a prepared view of your org and pipeline, and a governance layer the vendor maintains. For teams without Git and pipeline know-how in house, that is worth real money.

A team that already runs [sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/) gets much of it without a second AI contract. According to the [sfdx-hardis AI setup guide](https://sfdx-hardis.cloudity.com/salesforce-ai-setup/), it explains deployment errors, describes Flows and Apex classes and improves generated documentation. The provider can be Agentforce, OpenAI, Anthropic, Google or a local Ollama model, set by environment variables or routed through a corporate gateway. You choose the model and therefore the region. Its coding agent auto-fix is in beta, and the guide says an expert must review those changes before merging.

Pair that with Claude Code, Codex or Copilot for the build work, compared in [Agentforce Vibes, Claude Code, Codex or Copilot](../agentforce-vibes-claude-code-copilot/), and a pipeline you own decides what reaches production. The trade-off is support. With open source, you or your architect own the setup. With Copado or Gearset you pay someone else to own it, and you inherit their model choice.

## What should you ask before you pay?

I would put these questions to any DevOps vendor selling an AI agent, and get the answers into the order form:

- Which model and which provider run the agent, and will you tell us before you change them?
- In which region is input processed, and is an EU region available?
- How long are prompts, code and metadata kept, by you and by the model provider, and can we shorten it?
- Is our data used for training or for improving your service?
- How is usage metered, what is the monthly cap, and what happens when we reach it?
- Is the product generally available, in beta or in a pilot, and which service level applies?
- Who approves the agent's pull requests, and can it ever deploy without a human?
- What happens to the context the agent built about our org when we leave?

The last two connect to points I make elsewhere: the client should [own the DevOps tools](../why-clients-should-own-their-devops-tools/), and the same rules belong in [partner contracts for AI coding](../partners-using-ai-coding-contract-rules/). Setting this up is part of my [DevOps and release management](../../services/devops-release-management/) work, and the wider tool choice is covered in [chapter 4 of the AI masterclass](../../ai-masterclass/external-coding-agents/).

A DevOps AI agent is worth paying for once the vendor answers the model, region and retention questions in writing and a pilot in your own org beats your current setup. If you want a second opinion before signing an Agentia or Cam order, [send me a message](#contact).
