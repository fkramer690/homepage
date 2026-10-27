---
title: "Salesforce AI development tools: what exists, what it costs"
description: "Agentforce Vibes, skills, the Claude Code plugin, Agentforce DX, Code Analyzer and admin AI: what Salesforce offers for AI development and what it costs."
lang: en
slug: salesforce-ai-development-tools
translationKey: masterclass-02
chapter: 2
short: "Salesforce tools"
summary: "Which AI tools Salesforce itself offers for development and administration, what they cost and where their limits are."
takeaways:
  - "Salesforce offers its own coding agent, Agentforce Vibes, and the same capabilities as skills, a Claude Code plugin and MCP servers for other agents. The choice of agent stays open."
  - "Agentforce Vibes is not available in the EU Operating Zone. Outside Developer Edition it has required Flex Credits or an unmetered licence since June 2026."
  - "The unmetered licence caps the premium model at 2,500 requests or 36 million tokens per org every 30 days, not per user. Six developers with 25 requests a day each reach it after eight working days."
  - "Since July 2026 new Agentforce agents can only be built with Agent Script. As an AiAuthoringBundle they can be versioned in Git, tested and released through the pipeline."
  - "Code Analyzer and ApexGuru check code without a language model. Salesforce has no rules specific to AI-generated code, so these checks belong in the pipeline as a mandatory step."
articles: [vibes-claude-code-copilot-comparison, testing-agentforce-agents, ai-rules-file-salesforce-repo, agent-script-deterministic-rules]
faq:
  - q: "Is Agentforce Vibes free?"
    a: "Only in Developer Edition, and only up to a limit: 110 requests or 1.5 million tokens per org, for one month from first use, with no refresh. All other orgs need Flex Credits or an unmetered licence, whose premium model is capped at 2,500 requests or 36 million tokens per org every 30 days."
  - q: "Can I use Agentforce Vibes in the EU Operating Zone?"
    a: "No. According to the Salesforce FAQ, Vibes is not available in the EU Operating Zone, but it is supported in EU orgs outside it. If you then turn to Claude Code with the Salesforce plugin or another agent with sf-skills, check data residency and contract terms for that tool separately."
  - q: "Do I need Agentforce Vibes to build Agentforce agents?"
    a: "No. Agentforce agents are built in Agentforce Builder or as an Agent Script file with Agentforce DX through the Salesforce CLI. Salesforce documents how Claude Code, Codex or Vibes generate these files with skills, so the tool your partner uses is secondary."
  - q: "Does Salesforce check AI-generated code automatically?"
    a: "Only if you set it up. Code Analyzer and ApexGuru check all code the same way, whoever wrote it, and Salesforce documents no rules specific to AI code. For the check to count, it has to run as a mandatory step in the pipeline."
draft: false
---

In 2026 Salesforce offers two routes for AI-assisted development: its own coding agent, Agentforce Vibes, and the same capabilities as skills, a plugin and MCP servers for other agents such as Claude Code or Codex. For a manufacturer, picking the agent is the smaller decision. Three things underneath matter more: Agentforce DX, which turns Agentforce agents into versioned metadata, Code Analyzer as a checker without a language model, and billing. Since June 2026 Vibes is free only in Developer Edition, within limits, and it is not available in the EU Operating Zone.

## Which AI development tools does Salesforce offer?

These tools belong to the "AI for building" layer from [chapter 1](../terms-and-map/), plus the admin AI in Setup. As of October 2026:

| Tool | Purpose | Status, October 2026 | Billing |
|---|---|---|---|
| Agentforce Vibes 2.0 | coding agent in VS Code | GA since 12 June 2026 | Flex Credits or unmetered licence |
| Agentforce Vibes IDE (formerly Code Builder) | VS Code in the browser, launched from Setup | in every Developer Edition since April 2026 | as Vibes |
| Skills library `forcedotcom/sf-skills` | Salesforce knowledge for Claude Code, Codex, Cursor and Vibes | open source, over 100 skills according to Salesforce | free, model usage billed separately |
| Claude Code plugin `salesforce-development` | about 40 skills, three MCP servers, agents and hooks | published 19 August 2026 | free, Claude usage billed separately |
| Agentforce DX (`sf agent`) | build, test and release Agentforce agents as metadata | GA since May 2025 | no separate price published |
| Agentforce Builder and Agent Script | design Agentforce agents | GA since Spring '26, the only way to create new agents since July 2026 | included with Agentforce purchase |
| Code Analyzer with ApexGuru | static analysis of Apex, LWC and flows | eight engines, skills for agents | no separate price published |
| Setup with Agentforce | admin agent on every Setup page | can be enabled, GA status not confirmed | Data 360 credits |
| Einstein for Flow | flow drafts and formulas from text | GA since Spring '25 | Einstein Requests |

Sources: [Vibes GA](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0), [Vibes IDE](https://developer.salesforce.com/blogs/2026/04/new-developer-edition-agentforce-vibes-claude-mcp), [plugin and skills](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin), [Agentforce DX](https://developer.salesforce.com/blogs/2025/05/introducing-agentforce-dx-pro-code-tools), [Agent Script](https://www.salesforce.com/blog/upgrade-to-agent-script/), [Code Analyzer engines](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html).

The direction turned around within a year. In October 2025 Vibes launched as an agent built on the open-source Cline project, [GA with a limited number of requests](https://developer.salesforce.com/blogs/2025/10/unleash-your-innovation-with-agentforce-vibes-vibe-coding-for-the-enterprise). In 2026 Salesforce ships the same knowledge to any agent. Under the name Headless 360, [every major capability is meant to be available as an API, MCP tool or CLI command](https://developer.salesforce.com/blogs/2026/05/headless-360-what-it-means-for-developers): over 60 MCP tools, over 30 coding skills, over 4,000 APIs and over 220 CLI commands. Every action runs as a specific user, with sharing rules, field-level security, validation rules and governor limits. For you as the client, this means the agent your team uses does not decide what it may do in the org.

One note for partner proposals: "Einstein for Developers" and "Agentforce for Developers" are [older names](https://developer.salesforce.com/blogs/2024/09/introducing-agentforce-for-developers) from 2023 and 2024, which ran on Salesforce's own models at the time. If a proposal names one of them, it describes a predecessor of Vibes.

## Agentforce Vibes: what it does and what it costs

According to the [GA announcement](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0), Vibes 2.0 runs on Salesforce's Coding Agent Platform, "powered by Claude and the Mastra agent orchestration engines". According to the [Claudeforce announcement](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) of August 2026, Claude is the default model. The features that matter to a client:

- **Plan Mode:** the agent breaks a task into a plan before it changes files.
- **Approvals:** the default mode "Run safe defaults" edits files inside the workspace without asking. Paths outside it, protected files and writes to `.git/` need approval.
- **Sub-agents:** a lead agent hands work to sub-agents for Apex, LWC, Jest tests and SOQL, each in its [own Git worktree](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-overview.html).
- **MCP:** [permissions can be managed per tool](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-permissions-safety.html), and a switch that auto-approves non-destructive Salesforce MCP write operations is off by default.
- **Rules and skills:** project rules live in [`.vibes/rules/`](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html), formerly `.a4drules/`. Project rules override global rules. Built-in rules such as `production-guardrails` can be switched off but not edited.

The docs do not say whether Vibes also reads `CLAUDE.md` or `AGENTS.md`. According to [Anthropic](https://code.claude.com/docs/en/memory), Claude Code reads `CLAUDE.md` or an existing `AGENTS.md`. If your partner works with Vibes and your own team with Claude Code, you need the rules in two places or one shared source. Why this file belongs in your repository and who should own it is covered in [the AI rules file in your Salesforce repository](../../blog/ai-rules-file-salesforce-repository/).

### Licence options and caps

| Licence option | Models | Cap |
|---|---|---|
| Unmetered licence, "included" | GPT-5 | contractual fair use |
| Unmetered licence, "premium" | Claude Sonnet 4.6 | 2,500 requests or 36 million tokens per org, reset 30 days after first use |
| Flex Credits | Sonnet 4.6 (default), GPT-5, GPT-5.4, Opus 4.5 to 4.8 | pay per use, in units of 2,000 tokens, rounded up |
| Developer Edition | Claude Sonnet | 110 requests or 1.5 million tokens per org, one month, no refresh |

Sources: [Vibes usage and billing](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html), [Vibes FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html).

The figure I would check first: according to the FAQ the unmetered cap applies per org, not per user. Once it is reached, the team carries on with GPT-5 or pays Flex Credits. Opus runs as an "Advanced prompt", which the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) prices at 16 credits; at $500 per 100,000 credits that is $0.08 per started block of 2,000 tokens. The [Vibes pricing page](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) lists the unmetered licence as a flat fee of $125 per user and month. The billing page does not say which tier Sonnet and GPT fall into; ask your account team.

Since 1 June 2026, Vibes outside Developer Edition has required [Flex Credits or a paid licence](https://www.salesforceben.com/agentforce-vibes-no-longer-free-for-use/). At Dreamforce 2026, SalesforceBen reported a restored Developer Edition allowance of [50 requests or 1 million tokens with a daily reset](https://www.salesforceben.com/developer-features-and-announcements-from-dreamforce-26/). The official FAQ still says 110 requests for one month without refresh. I plan with the FAQ.

For European manufacturers one FAQ sentence weighs most: "Agentforce Vibes isn't available in the EU Operating Zone." In EU orgs outside the Operating Zone, Vibes is supported under standard terms. Group, Professional, Essentials and Government Cloud are excluded as well. If you chose the EU Operating Zone for data protection reasons, you end up with external agents and their own data residency questions. The comparison by contract, data residency and cost model is in [Agentforce Vibes, Claude Code or Copilot](../../blog/agentforce-vibes-claude-code-copilot/), and the external agents themselves are in [chapter 4](../external-coding-agents/).

## Skills, the plugin and Headless 360: Salesforce knowledge for other agents

The skills library `forcedotcom/sf-skills` is open source. In [June 2026](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) Salesforce listed examples such as `generating-apex`, `generating-apex-test`, `generating-lwc-components`, `debugging-apex-logs` and `generating-flow`. You install it with `npx skills add forcedotcom/sf-skills`. It comes preinstalled in Vibes, and in [August 2026](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) Salesforce named the same install route for OpenCode, Claude Code, Codex and Cursor.

The Claude Code plugin from the same announcement bundles about 40 of these skills, leaving out Data 360, Commerce and mobile. It adds three MCP servers (`salesforce-api-context`, `salesforce-metadata-experts`, `salesforce-lsp`), a development agent, a read-only `architecture-review` agent that grades a project against the pillars of the Well-Architected Framework, and hooks. One hook validates Agent Script syntax, another validates deployments. A hook runs automatically, while a sentence in a prompt only works if the model follows it. That is why I consider the hooks the most valuable part.

Salesforce itself points out that plugins are vendor-specific, while skills and MCP are standards. Skills are essentially instructions and scripts the model loads when needed. They make an agent better at Salesforce, but they enforce nothing. Enforcement comes from hooks, Code Analyzer and the pipeline.

Three dates belong here. According to the maintainers' [end-of-life notice](https://github.com/forcedotcom/mcp/issues/46), the local Salesforce DX MCP Server reaches end of life on 2 November 2026; what that means for your partner is in [chapter 3](../mcp-and-interfaces/). According to [SalesforceBen](https://www.salesforceben.com/developer-features-and-announcements-from-dreamforce-26/), an MCP plugin for Claude Code is due in Winter '27, while Salesforce is only projecting Spring '27 for a Codex plugin and hopes for governance of tools and skills in Vibes by then. Treat these as roadmap, not commitments. DevOps Center MCP was [announced at TDX 2026](https://www.salesforceben.com/salesforce-headless-360-and-agentforce-vibes-2-0-revealed-at-tdx-2026/) without an availability date.

## Agentforce DX and Agent Script: agents as metadata

For a manufacturer planning a first agent for dealer enquiries, this part matters more than the coding agent. [Agentforce DX](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html) extends the Salesforce DX tools to agents: CLI commands and a VS Code extension to create, test and release agents outside Agentforce Studio. Since [May 2026](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle) an agent lives as an `.agent` file in the `AiAuthoringBundle` metadata type. Each published version generates a `GenAiPlannerBundle`, and API version 66.0 is required. In the pipeline it takes three steps:

```
sf project deploy start --metadata AiAuthoringBundle --target-org uat
sf agent publish authoring-bundle --api-name Dealer_Service --target-org uat
sf agent activate --api-name Dealer_Service --version 2 --target-org uat
```

An agent then follows the same path as Apex: pull request, review, deployment, sign-off. The new Agentforce Builder has been GA since Spring '26. Since July 2026 new agents can [only be created there](https://www.salesforce.com/blog/upgrade-to-agent-script/); the legacy builder is frozen, no end date has been published, and moving an agent means rebuilding it. Agent Script has been [open source since TDX 2026](https://www.salesforce.com/blog/tdx-2026-roundup-agentforce-edition/). The language separates logic that runs as code from instructions to the language model. Why credit limits, warranty eligibility and price approvals belong in the logic is covered in [Agent Script: why business rules don't belong in the LLM](../../blog/agent-script-deterministic-rules/).

In [June 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) Salesforce showed how Claude Code, Codex or Vibes use skills to design, deploy and test an Agent Script file. Tests are YAML specs with an expected topic, expected actions and an expected outcome, and a language model grades the outcome as judge. Salesforce names no pass rate. How to set that threshold before the pilot is covered in [testing Agentforce agents before go-live](../../blog/testing-agentforce-agents-before-go-live/).

## Code Analyzer and ApexGuru: checks without a language model

According to the [docs](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html), Code Analyzer bundles eight engines: PMD, ESLint, RetireJS, Regex, Flow Scanner, CPD, Salesforce Graph Engine and ApexGuru. It runs from the CLI, in VS Code and in CI/CD. For agents there are [three skills](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/skills.html) that turn a request into CLI commands, set up the configuration and create custom PMD rules. MCP access to Code Analyzer has been [unsupported since June 2026](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/mcp.html). Salesforce recommends the CLI or VS Code unless you need a language model, because every model call has financial and ecological costs.

According to [Salesforce](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server), ApexGuru finds SOQL in loops, unbounded queries, expensive schema lookups and queries that fetch more fields than the code uses. Severity based on real runtime data requires ApexGuru in production or a full copy sandbox.

Salesforce documents no rules specific to AI-generated code. I think that is right, because Code Analyzer checks quality whatever the source of the code. The consequence for you is clear, though: the check that decides the route to production runs in the pipeline without a language model, not in the agent's chat. How review and gates fit together is in [chapter 8](../ai-code-best-practices/), and setting them up is part of my work in [DevOps and release management](../../services/devops-release-management/).

## Admin AI: Setup with Agentforce, Einstein for Flow and Prompt Builder

Admin AI changes the same org, just through the UI instead of code.

- **Einstein for Flow**, according to [SalesforceBen](https://www.salesforceben.com/einstein-for-flow-now-generally-available-tutorial-and-first-steps/), generates flow drafts of up to about six elements, formulas and flow descriptions. Each generation consumes Einstein Requests, in production and sandbox.
- **Setup with Agentforce** requires Data Cloud and, once enabled, shows an "Ask Setup Agent" button on Setup pages. According to [SalesforceTime](https://salesforcetime.com/2026/09/01/setup-with-agentforce-everything-you-need-to-know/), the agent creates objects, fields, users, permissions, sharing settings, flows, report types and Lightning pages, proposes changes before applying them and consumes Data 360 credits. I found no GA status on any Salesforce page.
- **Prompt Builder** is [GA](https://developer.salesforce.com/blogs/2025/10/build-and-optimize-agents-with-new-agentforce-360-features) and since Winter '26 handles images and PDFs, returns structured HTML or JSON and runs up to 1,000 prompts in a batch.

Admin AI therefore draws on three currencies: Einstein Requests, Data 360 credits and Flex Credits. That belongs in licence planning. My recommendation: use the Setup agent and Einstein for Flow in sandboxes only, and move the results through the pipeline like any other metadata change. An agent that changes sharing settings in production only makes the old problem of direct changes faster.

## A typical scenario: choosing tools at a machine builder

Assume a machine builder with Sales Cloud, Service Cloud, a dealer portal and SAP. An implementation partner works with six developers, and a first Agentforce agent for dealer order status enquiries is planned. All numbers are assumptions to show the method.

1. **Org location.** If the org sits in the EU Operating Zone, Vibes is not an option. Assume it is an EU org outside it.
2. **Coding licence.** The partner wants the unmetered licence with Sonnet. Assume 25 agentic requests per developer per working day at an average of 30,000 tokens. Six developers make 150 requests and 4.5 million tokens a day. The 36 million token cap is reached after eight working days; the 2,500 requests would last just under 17. Because the cap applies per org, the team works with GPT-5 from day nine or pays Flex Credits. I found no documentation on whether Salesforce counts the full context of each agent step, so clarify that before signing.
3. **Metered with Opus.** The same 30,000 tokens are 15 units of 16 credits, so 240 credits or $1.20 per request. 150 requests a day cost $180, about $3,780 over 21 working days.
4. **The agent itself.** It is built as Agent Script in Git, with the credit check and the order lookup as logic. Assume 60 test cases with three actions each, run three times. That is 540 actions at 16 credits in the sandbox, so 8,640 credits or $43.20.
5. **The gate.** Code Analyzer runs on every pull request in the pipeline, whether Vibes, Claude Code or a person wrote the code.

In this scenario the question of which agent is answered quickly. The time goes into the licence cap, the open counting question and the gates.

## What should you decide now?

1. **Clarify the org location.** EU Operating Zone or not decides whether Vibes is an option.
2. **Calculate the licence route.** Unmetered against Flex Credits, with the per-org cap and $125 per user and month for the flat fee.
3. **Create a rules file in the client repository** for every tool your partners may use.
4. **Accept Agentforce agents only as Agent Script in Git**, with a test spec and an agreed pass rate.
5. **Make Code Analyzer a mandatory pipeline step**, with ApexGuru runtime data from production or a full copy sandbox.
6. **Keep admin AI in sandboxes.**

On its [product page](https://www.salesforce.com/agentforce/developers/vibe-coding/) Salesforce says teams can "innovate up to 95% faster" with Vibes. The page cites no study. Measure the effect in your own programme, as described in [chapter 9](../teamwork-and-delivery/), and look next at [chapter 3](../mcp-and-interfaces/) for the interfaces these tools use to reach your org.

Choose the coding agent by org location and licence, and put quality into Agent Script, tests and a pipeline that you own. If you want a second opinion on your tool choice or your partner's licence calculation, [send me a message](#contact).
