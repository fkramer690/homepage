---
title: "AI tool decision matrix: what to use when in Salesforce"
description: "Twelve manufacturing scenarios with tool, reason and cost: coding agents, Hosted MCP, Agentforce, ERP integration and EU data residency for Salesforce."
lang: en
slug: ai-tool-decision-matrix
translationKey: masterclass-06
chapter: 6
short: "What to use when"
summary: "Which AI tool fits which job, in twelve scenarios for manufacturers, from workshop prototype to ERP agent and EU data residency."
takeaways:
  - "The baseline rule for AI in a Salesforce programme: agents work in a sandbox or scratch org, data arrives read-only through Hosted MCP, and releases go only through the pipeline with review."
  - "Which coding agent fits is usually decided by contracts, data residency and the existing toolchain, and less often by model quality."
  - "Salesforce says Agentforce Vibes is not available in the Hyperforce EU Operating Zone; Anthropic's direct Claude API offers only US or global inference, so EU processing runs through Amazon Bedrock, for example."
  - "For agents in production, rules such as warranty eligibility or credit limits belong in deterministic logic, while the language model handles language and intent."
  - "If the ERP has no API, the options are document extraction with RPA or the Systems Integration Agent; the RPA step and the agent both work through the user interface and need tests and monitoring."
articles: [agentforce-yes-or-no-manufacturers, vibes-claude-code-copilot-comparison, agentforce-sap-order-status, legacy-erp-without-api-agents]
faq:
  - q: "Which coding agent is best for Salesforce?"
    a: "No Apex benchmark settles that. I choose by contract and context: Agentforce Vibes when Flex Credits are already in the Salesforce contract, Copilot for a GitHub Enterprise customer, Claude Code with the official Salesforce plugin when the choice is open and the changes are large."
  - q: "May an AI agent work directly in the production org?"
    a: "Not for development. Coding agents work in sandboxes and scratch orgs, and changes reach production through a pull request, automated checks and the pipeline. Read-only data access through Hosted MCP with a named user is the exception I allow after review."
  - q: "How do I get EU data processing for AI coding?"
    a: "Anthropic's direct Claude API only offers US and global inference. Claude through Amazon Bedrock in an EU region, OpenAI API projects with EU residency or GitHub offerings with data residency are ways to get there. Agentforce Vibes is not available in the Hyperforce EU Operating Zone."
  - q: "When do I need Agentforce and when just a coding agent?"
    a: "A coding agent helps your team build Salesforce. Agentforce is an agent in production that, for example, answers dealer enquiries and costs Flex Credits per action. Decide, budget and test the two separately."
draft: false
---

AI in a Salesforce programme follows one baseline rule: the agent works in a sandbox or scratch org, gets data read-only through Hosted MCP, and releases go only through the pipeline with review. Which tool your team or partner uses inside that rule is usually decided by customer contracts, data residency and the existing toolchain, and less often by model quality. For agents in production, ERP access and cost per action come on top. The matrix below turns this into twelve scenarios that actually come up at manufacturers, from workshop prototype to order status from SAP.

## Which question decides the tool choice?

The first question is whether you are talking about building or running. That sounds obvious, but in workshops both topics often end up on the same slide.

- **Building:** a coding agent such as Agentforce Vibes, Claude Code, Codex or Copilot writes Apex, LWC, flows and metadata. Billing is by tokens or per user. The output is code that has to pass review and the pipeline.
- **Running:** an Agentforce agent answers dealer enquiries, pre-checks warranty claims or reads order status from the ERP. Billing is per action in Flex Credits. The output is an answer to a customer or dealer.

Each world has its own criteria, its own budget and its own tests. The terms behind them are explained in [chapter 1](../terms-and-map/), Salesforce's own tools in [chapter 2](../salesforce-ai-development-tools/) and the external coding agents in [chapter 4](../external-coding-agents/).

## The decision matrix for manufacturers

Status as of 27 October 2026, based on the linked pages. Prices are US list prices.

### Building: coding agents, data and pipeline

| # | Scenario | Tool or approach | Why | Cost and governance |
|---|---|---|---|---|
| 1 | Clickable prototype for a workshop, such as a dealer portal in LWC | Vibe coding with Agentforce Vibes in a Developer Edition org or Claude Code against a scratch org | Throwaway code, speed matters, no customer data; Martin Fowler places vibe coding in [software for a small circle](https://martinfowler.com/bliki/VibeCoding.html) | Developer Edition: [110 requests or 1.5M tokens](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html), one month, no refresh; discard the code afterwards |
| 2 | Project features, Flex Credits already in the Salesforce contract | [Agentforce Vibes 2.0](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0) with rules files and Plan Mode | Runs under the Salesforce contract, billed in Flex Credits | Flat Fee [$125 per user per month](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/), premium model capped at [2,500 requests or 36M tokens](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) per 30 days |
| 3 | Large refactorings, features across many metadata types, architecture reviews | Claude Code with the [salesforce-development plugin](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) | About 40 Salesforce skills, Apex language server, deploy validation hooks, an architecture review agent | Anthropic cites [around $13 per developer per active day](https://code.claude.com/docs/en/costs), $150 to $250 per month; settle the data contract |
| 4 | Customer runs GitHub Enterprise with Copilot | Copilot, or Claude and Codex through [Agent HQ](https://github.blog/news-insights/company-news/pick-your-agent-use-claude-and-codex-on-agent-hq/), plus the open Salesforce skills library | Admins control permitted agents and models, audit logs exist | Enterprise [$39 per user including $39 of AI Credits](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/); Claude and Codex in Agent HQ launched as public preview in February 2026 |
| 5 | Org sits in the Hyperforce EU Operating Zone, or EU processing is mandatory | Claude Code through Amazon Bedrock in an EU region, or OpenAI API projects with EU residency | Vibes is [not available in the EU Operating Zone](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html); the direct Claude API offers [only "us" and "global"](https://platform.claude.com/docs/en/manage-claude/data-residency) | Data processing agreement, works council, no production data in prompts |
| 6 | Agent needs data, such as checking the installed base before a migration | Hosted MCP with the sobject-reads server against a sandbox | [Named user, PKCE, field security and sharing apply](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html), read-only | Docs say [only for customers with Flex Credits](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md); the meter for agentic access is still "TBA" |
| 7 | Code quality, tests, deploy validation | sf CLI with Code Analyzer and Apex tests as a hook and in the pipeline | Deterministic and free of token cost; Salesforce itself [recommends the CLI over MCP](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/mcp.html) when no LLM is needed | Free; the only reliable check that something is done |
| 8 | Existing setup with the local DX MCP Server @salesforce/mcp | Pin version 0.30.15, move to skills, plugin and Hosted MCP | End of life on [2 November 2026](https://github.com/forcedotcom/mcp/issues/46) | Restrict access to fixed sandbox aliases, never to all orgs |

### Running: agents in service, sales and ERP

| # | Scenario | Tool or approach | Why | Cost and governance |
|---|---|---|---|---|
| 9 | Agent that pre-checks warranty claims from dealers | Agentforce Builder with Agent Script, tests before go-live | Salesforce's rule: what [can be expressed as code belongs in logic](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) | [20 Flex Credits per action in production, 16 in a sandbox](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) |
| 10 | Agent returns order status or availability from SAP S/4 | MuleSoft API, [synced to API Catalog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog), used as an agent action | Documented pattern, named credentials are created automatically | MuleSoft licence; integration user with minimal permissions |
| 11 | Old ERP or MES without an API | MuleSoft IDP with RPA, or the Systems Integration Agent | IDP routes documents under [80 percent confidence to a human](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce); the Systems Integration Agent has been [GA since Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) | RPA and the Systems Integration Agent work through the user interface; plan monitoring |
| 12 | Sales wants to use Salesforce directly in Claude | Salesforce in Claude from the AIforce layer | [Available to all customers in beta](https://www.salesforce.com/news/stories/aiforce-announcement/) | "Pricing and packaging are subject to change"; pilot with a small group |

Two notes on the matrix. Row 5 is often the decisive one for European manufacturers, because it can rule out row 2. IT should check whether the org sits in the EU Operating Zone before any tool comparison starts. And row 6 looks harmless, but it is the point where an external model reads real customer data. What to check there is covered in [chapter 3](../mcp-and-interfaces/).

## Six questions in the right order

The matrix is for looking things up. In a conversation with the IT lead and the programme manager I prefer to walk through these six questions in order, because early answers remove later options.

1. **Prototype or production?** Vibe coding in a Developer Edition or scratch org is fine for a prototype. Production needs agentic engineering: a human reads the code, and tests and the pipeline decide on the merge. Fowler keeps the two terms apart for exactly this reason.
2. **Which data and residency rules apply?** If the org sits in the EU Operating Zone, Agentforce Vibes is out. If data protection requires EU processing, Anthropic's direct Claude API is out, while Claude through Bedrock in an EU region remains. For Codex I found no statement from OpenAI that the [EU residency for API projects](https://openai.com/index/introducing-data-residency-in-europe/) applies there too; I would get that in writing.
3. **Which contracts and tools already exist?** If Flex Credits are already in the Salesforce contract, Vibes is the natural choice. If IT runs GitHub Enterprise, Copilot is. With a free choice I use Claude Code as the reference, because Salesforce built its first official plugin for it. The full comparison is in [Agentforce Vibes, Claude Code or Copilot](../../blog/agentforce-vibes-claude-code-copilot/).
4. **What is the job?** Code goes to the coding agent, metadata knowledge to the API context server, data to Hosted MCP, business rules of a runtime agent to Agent Script, releases to the pipeline.
5. **Which cost model fits?** Heavy, steady use favours flat per-user fees; light or fluctuating use favours pay-per-use. The numbers are in [chapter 7](../costs-and-tokens/).
6. **Which checks are deterministic?** Code Analyzer, Apex tests, a validation deploy and human review come before every merge, whichever agent wrote the code. What those checks look like is covered in [chapter 8](../ai-code-best-practices/).

For agents in production a seventh question comes before all others: is the process worth it at all? I go through volume, data quality, ERP access, cost model and edition in [Agentforce for manufacturers: start now or wait?](../../blog/agentforce-yes-or-no-manufacturers/).

## A typical scenario: three initiatives at a machine builder

Assume a machine builder with Sales Cloud and Service Cloud in an org that sits in the Hyperforce EU Operating Zone. Headquarters runs SAP S/4, while an acquired plant still uses an older ERP without an interface. IT runs GitHub Enterprise, and an implementation partner supplies six developers. All circumstances and numbers are assumptions. Three initiatives are on the table.

**A prototype for the dealer portal.** Sales wants to show in a workshop how dealers could order spare parts. That is row 1. A separate Developer Edition org holds no customer data, so the partner can build there with Vibes or Claude Code, as long as data protection signs off on the test data. After the workshop the code is deleted, not reused.

**The partner's coding agents.** Because the org sits in the EU Operating Zone, Vibes is out for project work (row 5). That leaves Copilot Enterprise on the existing GitHub licence (row 4) or Claude Code through Bedrock in an EU region (rows 3 and 5). With Bedrock, AWS bills the usage, so its price list belongs in the comparison, not Anthropic's. How I set up an approved-tools list, a cost estimate and a comparison on real backlog tasks is shown in the scenario in [chapter 4](../external-coding-agents/). The works council and the data processing agreement come before the decision, as described in [AI coding tools, works council and GDPR](../../blog/ai-coding-tools-works-council-gdpr/). Whatever the tool, agents work only in sandboxes, and the pipeline checks with Code Analyzer and Apex tests (row 7).

**An agent for order status.** Dealers ask about delivery dates every day. A MuleSoft API to SAP S/4 exists, which is row 10. The agent calls it as an action, and the decision about which data a dealer may see sits in Agent Script. The details are in [Agentforce and SAP order status](../../blog/agentforce-sap-order-status-mulesoft/). For the acquired plant without an API (row 11) I would not roll out the agent at first. RPA breaks when screens change, and I would test whether the Systems Integration Agent really copes with that on a copy of the system first. The options are in [legacy ERP without an API](../../blog/legacy-erp-without-api-ai-agents/).

In the end each initiative uses a different tool, and that is normal. What stays the same are the rules: no agent in production, data only read-only and under a named user, releases only through the pipeline.

## Where does the matrix not help?

Three questions no table answers.

- **Model quality for Apex.** There is no public benchmark for Apex, flows and metadata, as described in [chapter 4](../external-coding-agents/). Only a comparison on your own backlog can decide, measured by review findings and rework.
- **Ownership.** Who maintains the rules file in the repository, who approves Hosted MCP access and who pays for Flex Credits is a contract question between you and your partner. I covered that in [chapter 5](../aiforce-and-system-integrators/).
- **Whether Salesforce is the right place.** Decisions SAP already makes do not belong in an agent in Salesforce. For routine work without language, a flow or an ERP job is often cheaper than any agent.

Sorting out these decisions for your org and your partners is part of my work in [Salesforce architecture](../../services/salesforce-architecture/). Where agents carry weight in manufacturing today is the subject of [chapter 10](../ai-agents-in-manufacturing/); all chapters are listed on the [masterclass overview](../).

Settle data residency and contracts first, then the job, and keep the rules the same for every tool. If you want a second opinion on the tool choice for your initiatives, [send me a message](#contact).
