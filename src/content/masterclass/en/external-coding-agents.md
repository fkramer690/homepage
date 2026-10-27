---
title: "Coding agents for Salesforce: Claude Code, Codex, Copilot"
description: "Which external coding agent fits your Salesforce team or partner? A comparison by integration, data residency, cost and governance for manufacturers."
lang: en
slug: external-coding-agents
translationKey: masterclass-04
chapter: 4
short: "External coding agents"
summary: "Claude Code, Codex, Copilot and DevOps agents compared: what the tool decides and what contract, data residency and rules decide."
takeaways:
  - "Claude Code, Codex, Copilot and Cursor can all work with Salesforce, because Salesforce opens its skills and hosted MCP servers to any compatible agent."
  - "There is no independent benchmark for Apex, LWC or Flow; test candidate agents on 10 to 20 tasks from your own backlog."
  - "Anthropic's first-party API only offers US or global inference; regional processing for Claude is available through Amazon Bedrock or Google Cloud."
  - "Anthropic puts Claude Code at about $13 per developer per active day, OpenAI puts Codex at $100 to $200 a month; the seat price is rarely the real bill."
  - "The rules file, the pipeline and the list of approved tools belong to the client, so that a change of partner or tool does not take the quality rules with it."
articles: [vibes-claude-code-copilot-comparison, ai-coding-works-council-gdpr, ai-coding-costs-salesforce-project]
faq:
  - q: "Which coding agent is best for Salesforce?"
    a: "Nobody can show that publicly, because there is no independent Apex benchmark. Salesforce using Claude internally and in Agentforce Vibes is a signal. Decide after a short test on your own code, and on contract, data residency and cost."
  - q: "May our partner use its own AI tools on our org?"
    a: "Yes, if the contract states which tools and models are allowed, where data is processed, that work happens in sandboxes only and that every change goes through review and the pipeline. Without these rules you do not know where your code and test data end up."
  - q: "Can Claude Code process data in the EU?"
    a: "Not through Anthropic's first-party API, which offers only US and global inference. Amazon Bedrock and Google Cloud offer regional endpoints, which Anthropic says carry a 10 percent premium. Check with the cloud provider which models run in which EU region."
  - q: "Does a German works council have to approve coding agents?"
    a: "As a rule, yes. According to CMS, AI systems are regularly objectively capable of collecting behaviour or performance data, which triggers co-determination under section 87(1) no. 6 of the Works Constitution Act. Plan for it before the pilot."
draft: false
---

In 2026 every major coding agent can do Salesforce work, from Claude Code to OpenAI Codex and GitHub Copilot. The reason sits with Salesforce: its skills and hosted MCP servers work with any compatible agent. Which tool your team or your partner uses therefore matters less for code quality than the rules file, the review and the pipeline. For a manufacturer, four questions drive the choice: where code and data are processed, what the contract says, how usage is billed and who controls the rules. There is no independent Apex benchmark that names a winning model.

## Which coding agents can work with Salesforce?

A coding agent is an AI tool that reads files, runs commands, starts tests and prepares changes as a commit or pull request on its own. Salesforce's own tool, Agentforce Vibes, is covered in [chapter 2](../salesforce-ai-development-tools/). This chapter is about the external agents your developers or your implementation partner often already have on their laptops.

| Tool | Vendor | Salesforce integration | Billing |
|---|---|---|---|
| Claude Code | Anthropic | official `salesforce-development` plugin with about 40 skills and three MCP servers | seat with allowance (Team, Enterprise) or tokens via API and cloud providers |
| OpenAI Codex | OpenAI | sf-skills library, named compatible by Salesforce | credits per token, included in ChatGPT plans |
| GitHub Copilot | GitHub | MCP client in VS Code, Agent HQ with Claude and Codex agents | seat with AI credits at $0.01 |
| Cursor | Anysphere | named compatible by Salesforce for sf-skills and hosted MCP | check prices with the vendor before use |
| Agentforce Vibes (for comparison) | Salesforce | native, skills preinstalled | Flex Credits or unmetered licence |

Salesforce calls the Claude Code plugin ["our first official plugin, built for Claude Code"](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin). It bundles about 40 of the more than 100 skills in the open sf-skills library and sets up the MCP servers salesforce-api-context, salesforce-metadata-experts and salesforce-lsp. For OpenCode, Codex and Cursor, Salesforce names the same skills library as installable; I found no official plugin for those agents in the Salesforce documentation. According to the [Summer '26 guide](https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release), the hosted MCP servers connect to "any MCP-compatible AI client, such as Claude, ChatGPT, Cursor". GitHub moves Copilot one level up with [Agent HQ](https://github.blog/news-insights/company-news/pick-your-agent-use-claude-and-codex-on-agent-hq/): since February 2026, Claude and Codex agents run there next to GitHub's own agent, at launch as a public preview for Copilot Pro+ and Enterprise.

In practice, Claude Code ships the most ready-made Salesforce setup today. With the other agents, your team configures skills and MCP servers itself. The full comparison by contract, EU data residency, cost model and governance is in [Agentforce Vibes, Claude Code or Copilot](../../../blog/agentforce-vibes-claude-code-copilot/). If anyone still runs the local Salesforce DX MCP Server, the required switch is in [chapter 3](../mcp-and-interfaces/).

## Why the tool matters less than rules and pipeline

At TDX 2026 Salesforce announced that everything on the platform becomes an API, an MCP tool or a CLI command, and according to [SalesforceBen](https://www.salesforceben.com/salesforce-headless-360-and-agentforce-vibes-2-0-revealed-at-tdx-2026/) it named Claude Code, Cursor, Codex and Windsurf explicitly. An agent's Salesforce knowledge therefore comes from skills, MCP servers and your project rules more than from the tool itself.

The rules live in a rules file in the repository, such as `CLAUDE.md` or `AGENTS.md`. It describes naming conventions, forbidden patterns and the definition of done. According to the [GitHub changelog](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions), the Copilot coding agent reads `AGENTS.md`, `CLAUDE.md` and `GEMINI.md` alongside GitHub's own formats. One well-kept file in the client's repository therefore works across several tools. Why that file should belong to the client is covered in [the AI rules file in your Salesforce repository](../../../blog/ai-rules-file-salesforce-repository/), and the general principle in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/).

### No benchmark for Apex

I found no independent, public benchmark that measures Claude, GPT and Gemini on Apex, LWC or Flow. Salesforce [claimed better accuracy](https://www.salesforce.com/blog/agentforce-developers-llms/) for its earlier code model xGen-Code but published no scores, only an internal survey with about 125 minutes saved per week. What does exist is security data: Veracode's [2026 GenAI Code Security Report](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) measures a 56 percent security pass rate for AI-generated code, and only 30 percent for Java. Apex is syntactically close to Java, so I would take that number seriously.

Salesforce's own choice is a signal. According to the [GA announcement](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0), Agentforce Vibes is "powered by Claude and the Mastra agent orchestration engines", and according to the [Claudeforce press release](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) Salesforce plans to make Claude Code and Claude Enterprise available to all of its own developers and knowledge workers. A signal does not replace a measurement on your code. I recommend a small test suite of your own: 10 to 20 tasks from your backlog, for example a trigger handler with a bulk test, an LWC for the dealer portal and a flow change in the warranty process. Measure deployment success, test results and the number of review findings. The checks every piece of AI code must pass are in [chapter 8](../ai-code-best-practices/).

## Anthropic, OpenAI and Google: what the partnerships mean

Separate two decisions: which model your Agentforce agents use at runtime, for example a service agent answering dealer questions, and which coding agent your developers use. Salesforce's partnerships affect the two differently.

| Vendor | In Agentforce at runtime | In development | My reading |
|---|---|---|---|
| Anthropic | Claude via Amazon Bedrock inside the Salesforce Trust Boundary; a reasoning model for the Atlas Reasoning Engine | default in Agentforce Vibes; Claude Code for Salesforce employees | deepest integration; customers get the plugin and skills, not Claude Code licences |
| OpenAI | GPT-4o to GPT-5.6, operated by partners in a "shared trust zone" | GPT models selectable in Vibes; Codex with sf-skills | broad model choice, EU data residency for API projects |
| Google | Gemini 2.5 to 3.6 via Vertex AI; Gemini Enterprise GA in the Reasoning Engine according to SalesforceBen | the Vibes announcement names only Claude and GPT | relevant for Agentforce, hardly for the code path |

Sources: [Supported Models](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html), [Anthropic, October 2025](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership), [Claudeforce](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/), [SalesforceBen on Dreamforce 2026](https://www.salesforceben.com/biggest-dreamforce-26-announcements-everything-in-a-nutshell/).

One detail for your architecture: the Supported Models page currently lists Claude up to Sonnet 5 and Opus 4.8, and describes the "Salesforce Default" model as a "managed mix of trusted models (currently including GPT-4o)". Press release and documentation are not in step. Check in Setup which model your agent actually uses instead of relying on the announcement.

## Where are code, metadata and test data processed?

A manufacturer's repository holds more than people think: pricing logic, discount approvals, dealer terms and the interface definitions to SAP. The prompts are even more sensitive. Anyone who hands an agent error logs from a full-copy sandbox sends customer and dealer data to the model. That is why the question of where processing happens comes before the choice of tool.

| Route | Where processing happens | Open point |
|---|---|---|
| Anthropic first-party API (also Claude Code via the Console) | inference "us" or "global", workspace storage US only | no EU option |
| Claude via Amazon Bedrock or Google Cloud | regional endpoints, according to Anthropic at a 10 % premium over global | which models in which EU region, check with the cloud provider |
| Claude Code on Team or Enterprise seats | no EU option found in the sources checked | clarify contractually with Anthropic |
| OpenAI API with an EU project | in-region processing, requests and responses not stored | OpenAI does not say there whether Codex is covered |
| ChatGPT Enterprise with an EU workspace | storage in Europe, optional in-region inference since January 2026 | same question for Codex |
| GitHub Copilot | GitHub Enterprise Cloud with data residency exists | ask GitHub where Copilot model calls run |

Sources: [Anthropic data residency](https://platform.claude.com/docs/en/manage-claude/data-residency), [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing), [OpenAI data residency in Europe](https://openai.com/index/introducing-data-residency-in-europe/), [GitHub changelog, September 2026](https://github.blog/changelog/month/09-2026/).

German labour law adds another step. According to [CMS](https://cms.law/de/deu/legal-updates/ki-transformation-und-betriebsrat-mitbestimmung-richtig-gestalten), AI systems are generally capable of evaluating performance or behaviour data, so introducing them usually requires a works agreement, and using them without one is not permitted. In my reading, coding agents with usage statistics fall under this; have your labour lawyer confirm for your set-up. How to bring in the works council and GDPR early is covered in [AI coding tools, works council and GDPR](../../../blog/ai-coding-tools-works-council-gdpr/).

## What do coding agents cost per developer?

All major vendors now bill by tokens. The seat price buys an allowance, not unlimited use.

| Tool | Billing | Vendor's reference figure |
|---|---|---|
| Claude Code | tokens; on Team and Enterprise from a seat allowance with five-hour and weekly windows | about $13 per active day, $150 to $250 per month, 90 % of users below $30 per active day |
| OpenAI Codex | credits per million tokens, since April 2026 | $100 to $200 per developer per month; a GPT-5.6 Sol task uses 5 to 40 credits |
| Copilot Business / Enterprise | $19 / $39 per user per month with 1,900 / 3,900 AI credits, pooled across the enterprise | 1 credit = $0.01, consumption by model and tokens |
| Agentforce Vibes | Flex Credits in units of 2,000 tokens, or unmetered licence | premium model capped at 2,500 requests or 36M tokens per 30 days, then Flex Credits or GPT-5 |

Sources: [Claude Code costs](https://code.claude.com/docs/en/costs), [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card-2), [GitHub Copilot plans](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), [Vibes usage and billing](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html).

If you only look at Copilot's seat price, you underestimate agentic use. 1,900 credits equal $19 of model usage. A developer who consumes as much as the Claude Code average of $13 a day uses up their share of the pool in a day and a half. The calculation for a whole programme, and whether client or partner should pay, is in [what AI coding costs in a Salesforce project](../../../blog/ai-coding-costs-salesforce-project/). Token prices and caching are covered in depth in [chapter 7](../costs-and-tokens/).

## What about the Salesforce-specific DevOps agents?

The DevOps vendors shipped their own agents in 2026. They do not replace the coding agent; they govern what reaches production.

- **Gearset Cam** takes a ticket through to a pull request and checks beforehand that the change is deployable, according to the [announcement of 2 September 2026](https://assets.gearset.com/2026/09/01112431/Gearset-2026-Cam-Announcement.pdf). In pilots, Cam delivered up to 44 percent of a team's pull requests, and at one customer 75 percent of those were merged. These are vendor figures.
- **Copado Agentia Headless** brings Copado's agents into the IDE and is generally available according to [Copado](https://www.copado.com/dreamforce-2026-copado).
- **Provar MCP** is an open-source Salesforce CLI plugin that generates tests and validates them against more than 240 rules, according to [Provar](https://provar.com/blog/product/provar-mcp-bringing-ai-to-salesforce-test-automation/). It runs with Claude, Copilot and Cursor and costs nothing extra with a Provar Automation licence.

Neither Gearset nor Copado names the underlying model in these sources. For a manufacturer with data protection requirements that is a due diligence question: which model, which region, which retention.

## A typical scenario: choosing tools at a machine builder

Assume a machine builder with SAP S/4HANA, Service Cloud and a dealer portal on Experience Cloud. Three internal developers work with a partner who provides five nearshore developers. All numbers are assumptions. The internal developers have Copilot Business through the existing GitHub licence; the partner wants to use Claude Code with its own accounts.

This is how I would approach it:

1. **Set the approved list.** Copilot stays, Claude Code is added, but through an account the client owns, either Enterprise seats or Bedrock with a regional endpoint. I rule out the partner's own accounts, because then nobody knows where code and logs end up.
2. **Rules file in the client's repository.** An `AGENTS.md` as the shared base that Copilot reads, plus a short `CLAUDE.md` that points to it. The internal architect owns it, not the partner.
3. **Limit where agents work.** Agents work only in developer sandboxes without production data. Dealer data from the full-copy sandbox does not go into prompts.
4. **Estimate cost realistically.** Eight developers with an assumed 15 active days cost about $1,560 a month at Anthropic's $13 average. If all eight had Copilot Business, the seat price would be $152, but the pooled 15,200 credits cover only $152 of model usage. With similarly intensive agentic work, both tools end up in the same range.
5. **Adjust the contract.** The partner discloses which tools and models it uses, and the cost is either priced into the day rate or passed through. What belongs in the SOW is in [partners using AI coding: contract rules](../../../blog/partners-using-ai-coding-contract-rules/).
6. **Start with the test suite.** 15 tasks from the backlog, both tools, the same gates. The result decides, not individual developers' preferences.

In my judgement, agreeing with the works council and data protection takes longer than choosing the tool in a setup like this, so plan that first. Steering several partners with different tools is part of my work in [partner governance](../../../services/partner-governance/), and the gates belong in [DevOps and release management](../../../services/devops-release-management/). How Salesforce is shifting its partner model towards agents is the topic of [chapter 5](../aiforce-and-system-integrators/).

Choose the coding agent by contract, data residency and cost, and put the quality into a rules file, review and pipeline that you own. If you want a second opinion on your approved list or the rules for your partner, [send me a message](#contact).
