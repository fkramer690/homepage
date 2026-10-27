---
title: "Agentforce Vibes, Claude Code, Codex or Copilot?"
description: "Which coding agent should your Salesforce team or partner use? A client-side decision by contracts, EU data residency, cost model and governance."
pubDate: 2026-10-27
lang: en
slug: agentforce-vibes-claude-code-copilot
translationKey: vibes-claude-code-copilot-comparison
topic: devops
tags: [ai coding, agentforce vibes, claude code, github copilot, data residency, partner governance]
takeaways:
  - "Which coding agent a Salesforce team uses is mostly decided by four client-side facts: existing contracts, EU data residency, cost model and governance, and only then by the model."
  - "Agentforce Vibes is not available in the Hyperforce EU Operating Zone; if your org sits there, the choice is between Copilot, Claude Code through a cloud provider and Codex."
  - "Anthropic's first-party API offers only US or global inference, while GitHub Copilot has offered EU data residency for all generally available features since April 2026, at 10 percent more AI credits."
  - "Codex supports EU data residency only on ChatGPT Enterprise, and only in the Codex app and CLI; ChatGPT Business has no data residency and Codex Web is excluded."
  - "I recommend at most two approved coding agents, accounts owned by the client and one rules file in the client's repository that every agent reads."
faq:
  - q: "Which coding agent is best for Salesforce development?"
    a: "No public benchmark settles that for Apex, LWC or Flow. Salesforce built its first official plugin for Claude Code, Agentforce Vibes runs inside your Salesforce contract, Copilot inside GitHub. Choose by contract, data residency and governance, then test on tasks from your own backlog."
  - q: "Can we use Agentforce Vibes in the EU?"
    a: "Yes for orgs outside the Hyperforce EU Operating Zone. Salesforce states that Vibes is not available in the EU Operating Zone or in Government Cloud, and that data is handled within Salesforce's trust boundary and not stored after the session."
  - q: "Is there an EU option for Claude Code?"
    a: "Not through Anthropic's own API, which offers US or global inference only. Claude Code can run through Amazon Bedrock in an EU region, or Claude models can be used through Copilot with EU data residency enabled."
  - q: "Should the partner bring its own coding agent?"
    a: "I would not allow that by default. If the partner works with its own accounts, you do not control data residency, retention or offboarding. Give partner developers seats in your own GitHub, Claude or ChatGPT organisation, or a Vibes licence in your org."
draft: false
---

Choosing a coding agent for Salesforce, whether Agentforce Vibes, Claude Code, Codex or Copilot, is a client decision more than a developer preference. Four facts on your side decide it: the contracts and tools you already run, whether code and prompts must be processed in the EU, the cost model you can control and the governance your IT security expects. If your org sits in the Hyperforce EU Operating Zone, Vibes is out. If EU processing is mandatory, Anthropic's own API is out and Copilot or Bedrock come in. Model quality decides last.

## Why should the client decide, not the developer?

Developers and partners arrive with preferences. A nearshore team may know Claude Code, your internal developers may have Copilot in VS Code, and your Salesforce account executive will offer Agentforce Vibes. Each choice routes your source code, your metadata and sometimes test data from a sandbox to a model provider under a specific contract. For a manufacturer, that code holds discount approvals, dealer conditions, warranty rules and the interface definitions to SAP or proALPHA.

The capability gap between the tools is smaller than the marketing suggests. Salesforce describes its open skills library as [compatible with any coding agent](https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release), naming Claude Code and Codex, and the Hosted MCP servers connect to any MCP-compatible client. Salesforce built its first official plugin for Claude Code: according to [Salesforce's announcement of 19 August 2026](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin), it bundles about 40 skills, three MCP servers, deployment validation hooks and a read-only architecture review agent. The feature comparison sits in [chapter 4 of the AI masterclass](../../ai-masterclass/external-coding-agents/). This article covers the decision.

## Four questions that decide the coding agent for Salesforce

### 1. Which contracts and tools do you already have?

Every option rides on a contract you may already hold:

- **Agentforce Vibes** runs under your Salesforce contract: [$125 per user and month](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) as a flat fee, or metered Flex Credits that "consume the same credits used by Agentforce".
- **GitHub Copilot** runs under GitHub. Since February 2026, Claude and Codex are [available as coding agents in Copilot Business](https://github.blog/changelog/2026-02-26-claude-and-codex-now-available-for-copilot-business-pro-users/), after Enterprise and Pro+, once an admin enables "Partner Agents". One contract then covers three agents.
- **Claude Code** comes with every paid Claude plan. [Claude Enterprise](https://claude.com/pricing) costs $20 per seat and month plus usage at API rates, with a 20-seat minimum. Through Amazon Bedrock it is [billed per token to your AWS account](https://code.claude.com/docs/en/costs).
- **Codex** is part of [ChatGPT Business and Enterprise](https://openai.com/business/pricing/).

If one of these contracts already exists, procurement, data processing agreement and SSO are often in place. That saves weeks.

### 2. Must code and prompts be processed in the EU?

This is the question that removes options. What the vendors state on their own pages:

| Route | EU processing |
|---|---|
| Agentforce Vibes | [not available in the EU Operating Zone](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html); data stays within Salesforce's trust boundary and is not stored after the session; processing region not stated |
| Claude Code, Anthropic API or Claude plans | [inference "us" or "global" only](https://platform.claude.com/docs/en/manage-claude/data-residency), workspace storage US only |
| Claude Code through Amazon Bedrock | region follows the endpoint; Claude Code uses the [`eu.` inference profiles in `eu-*` regions](https://code.claude.com/docs/en/amazon-bedrock.md); according to Anthropic, regional endpoints carry a [10 percent premium](https://platform.claude.com/docs/en/about-claude/pricing) |
| GitHub Copilot | [EU data residency since 13 April 2026](https://github.blog/changelog/2026-04-13-copilot-data-residency-in-us-eu-and-fedramp-compliance-now-available) for all generally available features including cloud agent and CLI, off by default, 10 percent more AI credits |
| Codex | data residency on ChatGPT Enterprise only; [Codex app and CLI supported, Codex Web excluded](https://help.openai.com/en/articles/9903489) |

Two details matter for Salesforce teams. The [EU model list for Copilot](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency) includes Claude Opus 5.5 and Sonnet 5.5, so a team can work with Claude models under EU processing without an AWS account. And for Vibes, I would get the processing region from Salesforce in writing before your data protection officer signs off. Whether the works council has to agree is a separate question, covered in [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

### 3. Which cost model can you control?

The tools differ less in price than in who sees the spend:

- **Copilot** includes credits worth the seat price, [$19 or $39 per user](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), pooled across the enterprise, then $0.01 per credit. Admins set [budgets per enterprise, cost centre and user](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/).
- **Claude Team and Enterprise** draw on a seat allowance. Usage beyond it needs usage credits with spend limits per organisation, group or member.
- **Claude Code on Bedrock** shows up in the AWS bill. Anthropic's analytics do not cover it, so per-user figures need OpenTelemetry or a gateway.
- **Vibes metered** draws from the same Flex Credit pool as your production agents. A partner team can eat the budget you planned for a dealer service agent.

The numbers for a full team, and whether client or partner should pay, are in [what AI coding costs in a Salesforce project](../ai-coding-costs-salesforce-project/).

### 4. Which governance does your IT security expect?

- **Identity and audit.** Claude Enterprise adds SCIM, audit logs, a compliance API and custom retention to the SSO that Team already has. ChatGPT Business has SSO but no SCIM, no role-based access and no compliance API; Enterprise has all three.
- **Scope of use.** OpenAI lets admins [govern Codex Local and Codex Cloud separately](https://help.openai.com/en/articles/11369540), so you can allow the CLI and block delegated cloud tasks. Vibes can be [disabled for a production org](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) in Setup.
- **Training and retention.** Anthropic [does not train on code sent under commercial terms](https://code.claude.com/docs/en/data-usage) and retains it for 30 days; zero data retention for Claude Code is enabled per organisation by the account team. OpenAI does not use business inputs for training by default.
- **One rules file.** The Copilot coding agent [reads AGENTS.md and CLAUDE.md](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions). One file in your repository can steer several tools, see [the AI rules file for your Salesforce repository](../ai-rules-file-salesforce-repository/).

## A typical scenario: two approved tools instead of four

Assume a machine builder with Sales Cloud, Service Cloud and Field Service on an EU org outside the EU Operating Zone, SAP S/4HANA and GitHub Enterprise Cloud. The data protection officer requires EU processing for code that contains dealer conditions. Two internal admins maintain flows, three internal developers build Apex and LWC, and a partner adds six nearshore developers for the dealer portal. All of this is an assumption to show the method.

The requests on the table: the admins want Vibes, the internal developers want Copilot, the partner wants Claude Code on its own accounts and one developer asks for Codex.

How I would decide:

1. **Copilot Enterprise as the default for all nine developers**, with EU data residency enabled. It runs on the existing GitHub contract, partner developers get seats in the client's organisation, and Claude Sonnet 5.5 is available under EU processing. I take Enterprise over Business because agent sessions burn credits and Enterprise includes $39 instead of $19 per seat. At list price: 9 × $39 = $351 a month including pooled credits, with 10 percent more credits per request.
2. **Vibes flat fee for the two admins** at 2 × $125 = $250 a month, on one condition: Salesforce confirms the processing region in writing. Until then the admins use Copilot.
3. **No partner accounts.** If the partner insists on Claude Code for the official plugin, it runs through the client's AWS account in an EU region, with a budget and OpenTelemetry.
4. **No Codex for now.** ChatGPT Business has no data residency, and Enterprise would be a third contract for one developer.

The result is two tools and one `AGENTS.md`, owned by the internal architect. How the partner contract reflects this is in [contract rules for partners coding with AI](../partners-using-ai-coding-contract-rules/).

## When is each tool the wrong choice?

- **Agentforce Vibes:** the org sits in the EU Operating Zone or Government Cloud, metered use would compete with Flex Credits planned for agents, or much of the work is middleware and SAP mapping outside Salesforce.
- **Claude Code on Anthropic accounts:** EU inference is mandatory. Bedrock solves that, but you give up Anthropic's usage dashboards.
- **GitHub Copilot:** your repositories live outside GitHub, so the cloud agent and partner agents have nothing to work on.
- **Codex:** you only have ChatGPT Business and need EU processing, or the team wants Codex Web, which is excluded from residency even on Enterprise.

## How do you decide in four weeks?

1. **Week 1:** check whether the org sits in the EU Operating Zone and list the contracts you hold with Salesforce, GitHub, Anthropic, OpenAI and AWS.
2. **Week 2:** settle the residency rule with data protection and start the works council process.
3. **Week 3:** approve at most two tools, all accounts in the client's name, and write the rules file.
4. **Week 4:** run 10 to 15 backlog tasks through the approved tools and the same pipeline gates, as described in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/).

Setting these rules across several partners is part of my work in [partner governance](../../services/partner-governance/) and [DevOps and release management](../../services/devops-release-management/).

Pick the coding agent by contract, residency and governance, and keep quality in the rules file and pipeline you own. If you want a second opinion on your approved list, [send me a message](#contact).
