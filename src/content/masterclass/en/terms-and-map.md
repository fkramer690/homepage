---
title: "AI in Salesforce programmes: terms and map"
description: "The four layers of AI in a Salesforce programme, the key terms from vibe coding to Flex Credits and the product names with dates, sorted for manufacturers."
lang: en
slug: terms-and-map
translationKey: masterclass-01
chapter: 1
short: "Terms and map"
summary: "The four layers of AI in a Salesforce programme, what separates vibe coding from agentic engineering and which product name stands for what."
takeaways:
  - "AI in a Salesforce programme has four layers: AI for building, interfaces for agents, AI in the product and AI as the interface. Each has different owners, different risks and a different billing model."
  - "A coding agent such as Claude Code or Agentforce Vibes writes metadata and code; an Agentforce agent runs in the org and answers, for example, dealer enquiries. Mixing the two up leads to the wrong budget."
  - "Vibe coding means letting AI generate code without reviewing it. That is fine for workshop prototypes; an org holding dealer and warranty data needs review, tests and CI."
  - "Salesforce named its layer for external interfaces three times in about six months: Headless 360, AIforce, SIForce. Always write product names in concepts with a date."
articles: [vibe-coding-prototype-not-production, aiforce-salesforce-in-claude-slack, agentforce-yes-or-no-manufacturers]
faq:
  - q: "What is the difference between Agentforce and Agentforce Vibes?"
    a: "Agentforce is the platform for agents that run in your org, such as a service agent for dealers. Agentforce Vibes is a coding tool for developers that generates Apex, LWC and metadata. They share a brand name, but they are billed differently and owned by different people."
  - q: "Is vibe coding acceptable in Salesforce projects?"
    a: "For prototypes in a sandbox or Developer Edition, yes. For code that goes into a production org with customer, dealer or warranty data, I recommend agentic engineering: AI writes, a person reviews, and automated tests and pipeline checks decide whether it deploys."
  - q: "What does MCP mean in the Salesforce world?"
    a: "MCP (Model Context Protocol) is an open protocol through which AI apps and agents call tools and data in other systems. Since April 2026 Salesforce offers hosted MCP servers for Enterprise Edition and above, and every call runs with the signed-in user's permissions."
draft: false
---

AI in a Salesforce programme means four different things: AI that builds code and metadata, interfaces through which agents reach the org, AI that runs as an agent inside the org, and AI as a new interface, such as Salesforce in Claude or Slack. Almost every confusion in a steering committee comes from mixing these layers. Each layer has different owners, different risks and its own billing model. Separate them, always use product names with a date, and you can compare offers from Salesforce and partners on equal terms.

## The four layers of AI in a Salesforce programme

I sort every AI topic in a Salesforce programme into one of four layers first. Only then is it worth asking about tools.

| Layer | Question | Typical products (October 2026) | Example at a manufacturer | How it is billed |
|---|---|---|---|---|
| A: AI for building | How are Apex, LWC, flows and metadata created? | Agentforce Vibes, Claude Code with the Salesforce plug-in, Codex, GitHub Copilot | The partner builds dealer portal components with a coding agent | Tokens or user licence, paid by the partner or by you, depending on the contract |
| B: Interfaces | How does an agent reach the org, metadata and data? | sf CLI, skills, Hosted MCP Servers, MuleSoft APIs as MCP servers | An agent reads order status from SAP through a MuleSoft API | Integration work, Flex Credits for agentic calls in future |
| C: AI in the product | Which AI runs for users inside the org? | Agentforce with Builder, Agent Script and the Atlas Reasoning Engine, Agentforce for Manufacturing | A service agent answers dealer questions about spare parts and delivery dates | Flex Credits per action |
| D: AI as the interface | Where will users work with Salesforce? | AIforce: Salesforce in Claude, Slackforce, Agentforce Coworker | Key account managers prepare dealer visits in Claude | Still open, "subject to change" according to Salesforce |

Three figures show how different the billing is. An Agentforce action in layer C costs 20 Flex Credits according to [Salesforce](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/), which is $0.10 at $500 per 100,000 credits. Agentforce Vibes in layer A counts usage in units of up to 2,000 tokens according to its [billing documentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html), or runs on an unmetered licence with a cap for premium models. For agentic API and MCP calls in layer B, the [rate card of 31 August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) lists a "Headless Platform Interaction" meter with the rate shown as "TBA".

The layers are growing together. Salesforce describes a [development path for Agentforce agents](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) in which a coding agent such as Claude Code, Codex or Agentforce Vibes uses Agent Skills to write the agent definition in Agent Script. Layer A then builds layer C. Layer D is the newest and least mature. For accountability the split still holds: layer A belongs to delivery and the partner contract, B to integration architecture, C to the service and sales functions, D to the IT lead and data protection.

## What is the difference between vibe coding and agentic engineering?

Andrej Karpathy coined "vibe coding" in February 2025: you "fully give in to the vibes, embrace exponentials, and forget that the code even exists". Simon Willison [sharpened the term in May 2025](https://simonwillison.net/2025/May/1/not-vibe-coding/): vibe coding means generating code with AI without caring about the code that is produced. Not all AI-assisted programming counts.

Since 21 May 2026 Martin Fowler has separated [vibe coding from "agentic engineering"](https://martinfowler.com/bliki/VibeCoding.html). In agentic engineering the LLM writes the code, but developers review it and care about its internal structure. Fowler sees vibe coding as appropriate for disposable software, personal tools and prototypes. The risks he names are security, because such apps can expose sensitive data or credentials, maintainability, and wrong behaviour that nobody notices.

For a manufacturer I draw the line like this:

- **Vibe coding is fine** for a clickable draft of the dealer portal in a requirements workshop, a script that generates spare-part test data, or an analysis nobody needs after a week. Always in a sandbox or Developer Edition.
- **Agentic engineering is required** for anything that goes into the production org: warranty logic, price approvals, interfaces to SAP or proALPHA, approvals in the dealer portal. Review, tests and automated checks in the pipeline come with it.

Where exactly the line runs, and which checks a prototype has to pass before it goes live, is covered in [vibe coding in Salesforce: prototype or production](../../../blog/vibe-coding-salesforce-prototype-vs-production/). The review rules for AI code itself are the topic of [chapter 8](../ai-code-best-practices/).

A third term shows up in partner decks: "AI-native delivery". It describes a delivery process planned around coding agents from the start, with smaller teams and different roles. What that means for your programme organisation is in [chapter 9](../teamwork-and-delivery/).

## Coding agent or Agentforce agent: the basic terms

The most common mix-up in conversations with business teams: a coding agent builds, an Agentforce agent runs. Both are called "agent" and both use language models, yet they have nothing in common beyond the fact that one can build the other.

| Term | Meaning in the Salesforce world |
|---|---|
| Coding agent | A tool that plans and writes code, runs commands and tests, such as Claude Code, Codex, Copilot or Agentforce Vibes. Layer A. |
| Agentforce agent | An agent working at runtime in your org, for example a service agent for dealers. Layer C. |
| MCP (Model Context Protocol) | According to [Salesforce](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce), an open protocol that makes it easier for AI apps and agents to connect to tools and data sources. Layer B. |
| Hosted MCP Servers | MCP servers run by Salesforce, [generally available since 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition and above. Every transaction runs as the authenticated user, with that user's sharing and field permissions. |
| Skill | A package of instructions and templates that a coding agent loads when needed. The open library forcedotcom/sf-skills had more than 60 skills in [June 2026](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills). |
| Rules file | Standing project instructions for the coding agent, such as `CLAUDE.md` for [Claude Code](https://code.claude.com/docs/en/best-practices) or `.vibes/rules/` for [Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html). Belongs in the client's repository. |
| Agent Script | According to [Salesforce Architects](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script), a declarative language that defines how an Agentforce agent behaves. It separates deterministic logic from instructions the language model interprets. |
| Atlas Reasoning Engine | The runtime that executes Agent Script as a state machine. Rules run as code; the language model is called only where prompt instructions are present. |
| Einstein Trust Layer | Protection layer for Agentforce: grounding in CRM data, masking of sensitive data, toxicity detection, audit trail and zero data retention agreements with model providers ([docs](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html)). |
| Flex Credits | Consumption currency for Agentforce and other services, $500 per 100,000 credits. |
| Token | A piece of text a model processes. How many tokens a text produces depends on the tokenizer, the language and the type of content, according to [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing). Claude Sonnet 5.5 costs $2 per million input and $10 per million output tokens there. |

For architects the key sentence is in the Architects guide: if you can express a decision as code, it should be written as logic. Warranty eligibility, credit limits and price approvals fall into that category, and none of them belong in a prompt.

## Why is everything called Agentforce? Names with dates

In autumn 2026 "Agentforce" stands for at least four things: the agent platform, the coding tool Agentforce Vibes, the AI teammate Agentforce Coworker and the umbrella brand Agentforce 360. Add the renames, and concepts and offers age quickly.

| Date | Event | Source |
|---|---|---|
| 10 Aug 2023 | Einstein for Developers in open beta, Apex from natural language | [Salesforce Developers](https://developer.salesforce.com/blogs/2023/08/einstein-for-developers-open-beta) |
| 16 Sep 2024 | Renamed Agentforce for Developers, GA | [Salesforce Developers](https://developer.salesforce.com/blogs/2024/09/introducing-agentforce-for-developers) |
| 23 Jun 2025 | Agentforce 3 announced, with Command Center and a native MCP client (both slated for summer 2025) | [Salesforce IR](https://investor.salesforce.com/news/news-details/2025/Salesforce-Launches-Agentforce-3-to-Solve-the-Biggest-Blockers-to-Scaling-AI-Agents-Visibility-and-Control/default.aspx) |
| 21 Aug 2025 | Agentforce for Manufacturing with templates for sales planning, inventory and asset service | [Salesforce News](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) |
| 1 Oct 2025 | Agentforce Vibes GA, with limited requests and chat features from the open-source Cline project | [Salesforce Developers](https://developer.salesforce.com/blogs/2025/10/unleash-your-innovation-with-agentforce-vibes-vibe-coding-for-the-enterprise) |
| 13 Oct 2025 | Agentforce 360 available worldwide, Data Cloud renamed Data 360 | [Salesforce press](https://www.salesforce.com/de/news/press-releases/2025/10/13/agentic-enterprise-announcement/), [Salesforce Ben](https://www.salesforceben.com/salesforce-data-cloud-renamed-to-data-360-as-part-of-agentforce-360/) |
| April 2026 | Headless 360 and Agentforce Vibes 2.0 presented at TDX | [Salesforce Ben](https://www.salesforceben.com/salesforce-headless-360-and-agentforce-vibes-2-0-revealed-at-tdx-2026/) |
| 29 Apr 2026 | Hosted MCP Servers GA | [Salesforce Developers](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) |
| 12 Jun 2026 | Agentforce Vibes 2.0 GA, with Claude and GPT models | [Announcement](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0) |
| 19 Aug 2026 | First official Claude Code plug-in `salesforce-development` with about 40 skills | [Salesforce Developers](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) |
| 27 Aug 2026 | Claudeforce: Claude as a reasoning model for the Atlas Reasoning Engine and default in Vibes, Coworker and Slack | [Salesforce press](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) |
| 15 Sep 2026 | AIforce at Dreamforce, Salesforce in Claude in beta | [Salesforce News](https://www.salesforce.com/news/stories/aiforce-announcement/) |
| 9 Oct 2026 | Marc Benioff on X: "AIForce is officially SIForce", no press release | [Salesforce Ben](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/) (secondary source) |

I take two lessons from this. First, Einstein for Developers, Agentforce for Developers and Agentforce Vibes are one product line: Salesforce Ben describes Vibes as a [rebrand and upgrade of Agentforce for Developers](https://www.salesforceben.com/developer-features-and-announcements-from-dreamforce-25/), and the documentation URL still contains `einstein-for-devs`. An offer in 2026 that promises "Einstein for Developers" describes an outdated state. Second, according to Salesforce Ben the layer for external interfaces was called Headless 360, AIforce and SIForce within about six months. In concepts I write "AIforce (as of October 2026)", and in contracts I use the name printed on the order form. What AIforce contains and what an IT lead should do now is in [AIforce: Salesforce in Claude and Slack](../../../blog/aiforce-salesforce-in-claude-and-slack/); the second reading of "SI" as system integrator is in [chapter 5](../aiforce-and-system-integrators/).

## A typical scenario: "AI" four times in one steering committee

Assume a machine builder with Sales Cloud, Service Cloud, SAP and a dealer network with a portal. All numbers are assumptions for illustration. One morning, the steering committee has four AI requests on the agenda:

1. **Head of sales:** key account managers should prepare dealer visits in Claude and update opportunities from there. That is layer D. Salesforce in Claude is a beta, and Salesforce says prices may still change. Before anything else, someone has to check whether sharing for warranty cases and price agreements is too open.
2. **Head of service:** an agent should answer dealer enquiries about order status and delivery dates. That is layer C, with a dependency on layer B, because the answers live in SAP. Assume 1,500 enquiries a month with three actions each: 4,500 actions at 20 credits make 90,000 credits, about $450 a month, before testing and integration work.
3. **Implementation partner:** it wants to build the new dealer portal with coding agents and promises shorter sprints. That is layer A. What counts here are review rules, the rules file and the pipeline, whatever the tool is called.
4. **IT lead:** asks who actually reads which data when Claude, the partner's agent and the service agent all talk to the org at once. That is layer B, and it affects the other three.

Without the layers, these four requests land in one pot called "AI initiative" with one budget and one owner. With the layers they become four projects with four owners: sales with IT and data protection, service, programme management with partner governance, integration architecture. Only the second needs an Agentforce decision. Whether the service agent starts now or the data gets fixed first is answered in [Agentforce for manufacturers: start now or wait?](../../../blog/agentforce-yes-or-no-manufacturers/).

## Where to read on in this masterclass

The following chapters take the layers one at a time:

- **Layer A:** [chapter 2](../salesforce-ai-development-tools/) covers Salesforce's own tools, [chapter 4](../external-coding-agents/) the coding agents from Anthropic, OpenAI and GitHub.
- **Layer B:** [chapter 3](../mcp-and-interfaces/) explains MCP and the interfaces agents use to reach your org.
- **Layer C:** [chapter 10](../ai-agents-in-manufacturing/) deals with agents in service, field service and warranty.
- **Across layers:** [chapter 6](../ai-tool-decision-matrix/) gives the decision matrix, [chapter 7](../costs-and-tokens/) the costs with worked examples.

All chapters are listed on the [masterclass overview](../). Sorting the layers for your own programme is a typical starting point for my work on [Salesforce architecture](../../../services/salesforce-architecture/).

Once you separate the four layers and date every product name, you can place any AI offer for Salesforce before anyone talks about tools. If you would like an independent second opinion on that, [send me a message](#contact).
