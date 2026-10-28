---
title: "AI agents in manufacturing: what works today"
description: "Which Agentforce agents manufacturers can use today, how rules, tests and security should look, and what Siemens and other references really show."
lang: en
slug: ai-agents-in-manufacturing
translationKey: masterclass-10
chapter: 10
short: "Agents in manufacturing"
summary: "Where Agentforce agents work for manufacturers today, how to build, test and secure them with rules, and what is only announced."
takeaways:
  - "In manufacturing, agents work today where volume is high, rules are clear and data is maintained: dealer enquiries on order status, maintenance booking in field service and pre-checking warranty claims."
  - "Salesforce Architects says anything you can express as code should be written as logic; Agent Script, Flow or the ERP decide credit limits and warranty eligibility, while the model understands and phrases."
  - "An agent reaches production like code: as metadata in Git, with test cases, a pass rate agreed in advance and monitoring of sessions after go-live."
  - "Every field that dealers, customers or prospects can write is untrusted input for an agent, and every connected app is an access path you protect like a password."
  - "According to the September 2026 announcement, two Siemens agents for inbound leads are live; Teamcenter, supplier onboarding and SAP steps are written in the future tense."
articles: [agent-script-deterministic-rules, warranty-adjudication-agent-winter-27, field-service-ai-agents-today, agentforce-sap-order-status, prompt-injection-dealer-portals, oauth-connected-apps-ai-lessons]
faq:
  - q: "Which agent is the best starting point for a machine builder?"
    a: "Usually the agent for dealer enquiries on order status and delivery dates, or proactive maintenance booking in field service. Both have high volume and clear rules. Warranty pre-checks follow once assets with serial number and warranty start are complete in Salesforce."
  - q: "Do I need Manufacturing Cloud for agents in manufacturing?"
    a: "For the manufacturing templates and the warranty agents, yes; Salesforce lists them under Manufacturing Cloud and Agentforce for Manufacturing. An agent that reads order status from SAP through a MuleSoft API can also be built in Service Cloud."
  - q: "How do I stop an agent from being manipulated through a dealer portal?"
    a: "Treat every free-text field from portals, forms or email as untrusted, enforce Trusted URLs and give the agent a user with minimal permissions. Decisions with monetary value belong in deterministic logic that no free text can talk round."
  - q: "What does an agent in manufacturing cost to run?"
    a: "Agentforce bills per action: 20 Flex Credits in production, 16 in a sandbox. At $500 per 100,000 credits that is $0.10 per action. Data 360 for documents, integration work and, for some features, per-user licences come on top."
draft: false
---

AI agents in manufacturing work today where a process has high volume, clear rules, maintained asset data and access to the ERP: dealer enquiries on order status and delivery dates, booking planned maintenance in field service and, once the installed base is right, pre-checking warranty claims. They are built to one rule: decisions in logic, language in the model. They reach production like code, with tests, and every field a dealer writes counts as outside input. Much of what has been announced, Siemens included, is not live yet.

## Which agents are available to manufacturers today?

Salesforce offers three groups of building blocks for manufacturing: templates from Agentforce for Manufacturing, agents in Manufacturing Cloud and agent features in Field Service. Status as of 27 October 2026, based on the linked pages.

| Area | Feature | Status |
|---|---|---|
| Sales planning | Spot gaps between build plan and sales, schedule an account visit with talking points | [available since August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) |
| Inventory | Check stock during a customer call, request replenishment across distributors | available since August 2025 |
| Asset service | Find assets needing maintenance, draft repair quote and work order | available since August 2025 |
| Channel sales | Channel Management | slated for GA in October 2025 |
| Warranty | AI Warranty Concierge guides customers through a claim | [Summer '26](https://www.salesforce.com/manufacturing/cloud/) |
| Channel sales | AI Partner Sales Assistant finds products and builds quotes | Summer '26 |
| Warranty | Warranty Claims Adjudication Agent validates coverage and flags potential fraud | Part of the Winter '27 release, which was [GA on 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/); no separate status stated for the agent |
| Sales | AI Sales Concierge finds products and builds quotes for self-service visitors | Winter '27 |
| Field service | Proactive maintenance booking based on maintenance plan dates | [announced May 2025](https://www.salesforce.com/blog/proactive-maintenance/), no GA date found |
| Voice | Agentforce Voice in German and five other new languages | [GA since Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) |
| Legacy systems | Systems Integration Agent learns browser-based applications and, per Salesforce, works without code, APIs or RPA | GA since Dreamforce 2026 |

On licensing: according to the [Manufacturing Cloud page](https://www.salesforce.com/manufacturing/cloud/), only the Max editions include the full Agentforce for Industries suite, at $650 (Sales Max or Service Max) or $700 (Sales & Service Max) per user per month on an annual contract. Core editions include Flex Credits for AI. On 3 September 2026 Salesforce said new pricing for the Industries editions would come ["later this fall"](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/). I found no separate licence statement for the warranty adjudication agent in the sources I could open.

For a machine builder I sort this list by three questions: how many similar cases are there per month, where does the rule live, and is the data behind it maintained? That usually gives this order: dealer order status and planned maintenance first, then the job report, then warranty. Which field service features pay off is covered in [AI agents in field service](../../../blog/field-service-ai-agents-what-works-today/), what has to be in place before the warranty agent in [Warranty Claims Adjudication Agent: what to prepare](../../../blog/warranty-claims-adjudication-agent/). Whether an agent is the right next step at all, I check with the criteria in [Agentforce for manufacturers: start now or wait?](../../../blog/agentforce-yes-or-no-manufacturers/). How to introduce agents in field service step by step is in [chapter 5 of the Field Service masterclass](../../field-service/field-service-ai-agents-rollout/).

## How do you build an agent that answers the same way twice?

In the earlier Agentforce, the language model made every decision at runtime, from intent to action selection. Identical inputs could take different paths. For a warranty rejection a dealer disputes, that is unusable. The new Agentforce with hybrid reasoning has been generally available since February 2026, and Salesforce Architects states the rule in its [guide to Agent Script](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script): "if you can express a decision as code, it should be written as logic."

Agent Script is the declarative language that describes an agent. Logic instructions run as code with no model call; prompt instructions are interpreted by the model. An action with an `available when` condition disappears from the model's tool list while the condition is false. A dealer over the credit limit gets no order, however they phrase the request. How gates, `before_reasoning` and escalation fit together is described in [Agent Script: business rules don't belong in the LLM](../../../blog/agent-script-deterministic-rules/).

In manufacturing most rules already have a home, and the agent should ask there instead of rebuilding them:

| Layer | Systems | Agent's job | Integration |
|---|---|---|---|
| Front office | Manufacturing Cloud, Service Cloud, Field Service | Dealer enquiries, quotes, warranty, scheduling | native, rules in Agent Script, Flow and Business Rules Engine |
| Back office | SAP S/4, proALPHA | Read order status, availability, credit status | MuleSoft API [synced to API Catalog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) as an agent action |
| Engineering | PLM such as Teamcenter | Spare parts by serial number, technically valid upgrades | API; announced at Siemens |
| Legacy | ERP or MES without API | Capture orders from PDFs | MuleSoft IDP with RPA, documents under [80 percent confidence go to a human](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce), or the Systems Integration Agent |

On the API Catalog route, Salesforce creates Named Credentials and External Services automatically. I found no official reference architecture specifically for Agentforce with SAP S/4HANA; the pattern comes from general MuleSoft documentation. What it looks like for order status and what stays deterministic is in [Agentforce and SAP order status](../../../blog/agentforce-sap-order-status-mulesoft/), the options without an interface in [legacy ERP without an API](../../../blog/legacy-erp-without-api-ai-agents/).

For knowledge from manuals and articles, the agent needs grounding through Data 360. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud), the Agentforce Data Library is the quick route but limited to unstructured content and one source per library. Multiple sources, structured data and zero copy need the advanced Data 360 setup. Machine builders have manuals per variant and revision, and before they are processed it should be clear which manual belongs to which serial number. Processing costs 150 Flex Credits per MB at the base tier according to the [rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf); the arithmetic is in [chapter 7](../costs-and-tokens/).

## How does an agent get to production safely?

An Agentforce agent is now a set of metadata that a coding agent can help write. The [Salesforce Developers blog of June 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) describes the path like this:

| Phase | What happens | Tool |
|---|---|---|
| Design | Plan subagents in a coding agent's plan mode; a human decides data model, actions and permissions | e.g. Claude Code with the Salesforce skills |
| Build | Generate Agent Script as an AiAuthoringBundle and validate it locally | `sf agent generate authoring-bundle`, `sf agent validate authoring-bundle` |
| Test | Smoke test in preview, regression from YAML test cases; a model acting as judge grades the expected outcome | `sf agent preview`, `sf agent test run` |
| Release | Deploy, publish as an inactive version, activate, version in Git | `sf agent publish authoring-bundle`, `sf agent activate` |
| Operate | Analyse sessions in the Session Trace Data Model in Data 360 | observing-agentforce skill |

For decision makers this means an agent is a release artefact like Apex. It belongs in the same pipeline with review and approval, and I would rule out changes directly in the production org's builder in the contract. Because a model grades answer quality, results vary between runs. Go-live therefore needs a pass rate agreed in advance, and Salesforce does not give one. My split by risk, with 100 percent for business rules, is in [testing Agentforce agents before go-live](../../../blog/testing-agentforce-agents-before-go-live/).

Dreamforce 2026 added tools for operations: Agent Health Monitoring with 16+ metrics is GA and Agent Optimizer was slated for GA in October, while A/B experimentation (from October) and voice and conversation testing are in beta. If you plan a German-language voice agent, you test the voice side with beta tools for now. I would build that into the schedule and acceptance criteria. The automated checks for code are in [chapter 8](../ai-code-best-practices/).

## What security risks do agents bring?

Two incidents from 2025 show where the attack surface is:

| Incident | What happened | Lesson |
|---|---|---|
| [ForcedLeak](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html), CVSS 9.4, disclosed September 2025 | Hidden instructions in the description field of a Web-to-Lead form; Agentforce sent lead data as an image request to an expired allowlisted domain that could be bought for about $5 | Fields written by outsiders are untrusted input; Salesforce now enforces a Trusted URL allowlist |
| [Salesloft Drift](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html), 8 to at least 18 August 2025 | Stolen OAuth and refresh tokens of an AI chat app; queries on Cases, Accounts, Users and Opportunities, hunting for AWS keys and passwords; Google counted more than 700 potentially affected organisations | Connected apps are high-value access paths; limit scopes, rotate tokens, keep no secrets in CRM records |

At manufacturers these fields are everywhere: Web-to-Lead, dealer portals on Experience Cloud, email-to-case, the fault description in a warranty claim, distributor uploads. MCP servers, Salesforce in Claude and third-party agents also add OAuth connections, exactly the kind of access abused in the Drift incident. My minimum list before the first agent:

1. **One user per agent and integration** with minimal permissions. Hosted MCP runs every call with the permissions of the user who authorised the connection, according to the [security page](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html). An admin has no business there.
2. **Read-only servers first**, such as sobject-reads, write tools only after approval.
3. **Enforce Trusted URLs** and check the allowlist regularly for expired domains.
4. **No secrets in records**; treat connected app tokens like passwords.
5. **Monitor API logs**; MCP traffic can be filtered with `API_CLIENT_CATEGORY` = `SALESFORCE_HOSTED_MCP`.
6. **Put decisions with monetary value behind `available when`**, so no free text can trigger a credit note.

The Hosted MCP security page does not mention prompt injection or IP restrictions. Your architect has to close that gap. Details are in [prompt injection through dealer portals](../../../blog/prompt-injection-dealer-portals-agentforce/) and [connected apps and OAuth in AI integrations](../../../blog/connected-apps-oauth-ai-integrations/), the interfaces themselves in [chapter 3](../mcp-and-interfaces/).

## What do the industry references show?

**Siemens** is the most visible industrial reference. According to the [announcement of 15 September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx), an engagement agent and a qualification agent work in Sales Cloud and route inbound leads to 18,000 sellers. Before, more than 2,500 unqualified leads arrived each month; now Siemens engages all inbound leads across 132 countries. Teamcenter "will work with Agentforce", and an SDR agent for distributors, Slackbot for supplier onboarding and Agentforce Operations for the final steps in SAP are also in the future tense. Roland Busch speaks of "a virtual engineer in the hands of service technicians and salespersons". Anyone arguing internally that "Siemens already does this" should read the tense of the release.

**Brenntag**, a chemical distributor rather than a manufacturer in the strict sense, became the first Agentforce customer in Germany in [November 2024](https://corporate.brenntag.com/en/media/news/brenntag-implements-autonomous-ai-agents-on-its-salesforce-platform-as-first-customer-in-germany.html). Its agents answer order and product questions around the clock, initially as a pilot for selected customers and supply partners. Brenntag published no figures.

**JPW Industries**, a US manufacturer, is quoted in the Agentforce for Manufacturing announcement: manual orders took 16 to 24 hours and now take less than one hour with Agentforce, and case resolution became almost 40 percent faster despite 15 percent more workload. That is a customer statement in a Salesforce release.

I found no case study from the German-speaking market with hard figures on service, warranty or field service agents. Market figures need a footnote too: Salesforce reports more than $1.5bn Agentforce ARR for the quarter to July 2026, but [from that quarter on](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/default.aspx) counts Slackbot, AI offerings and Headless 360 as well. And Gartner [expects](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) more than 40 percent of agentic AI projects to be cancelled by the end of 2027, due to cost, unclear value or weak risk controls.

## A typical scenario: a roadmap for a machine builder

Assume a machine builder with SAP S/4 and an existing MuleSoft API, Service Cloud, Field Service with 45 technicians and around 200 dealers who order through a portal. Manufacturing Cloud is being introduced. All circumstances and numbers are assumptions meant to show the approach.

```schritte
Dealer agent for order status | Quarter 1
  The agent reads order and delivery date through the MuleSoft API. `before_reasoning` makes sure a dealer only sees their own orders. Before go-live, 150 test cases from real, anonymised enquiries run, including questions about other dealers' orders and free text with hidden instructions. The decision date after eight weeks is agreed in advance.
Data work and inventory | in parallel · IT
  IT reconciles the installed base with SAP until every machine has a serial number and warranty start, and lists all connected apps with their scopes.
Maintenance booking | Quarter 2
  The agent books maintenance for customers with maintained downtime windows. For everyone else it proposes slots and hands over to dispatch.
Warranty pre-check | Quarters 3 and 4
  Only once the asset data is right does the agent check coverage. The rule stays in the expression set; amounts above the agreed limit and every fraud flag go to a claims handler.
```

**Deliberately not in the plan:** troubleshooting for special-purpose machines while manuals are not mapped to serial numbers, and agents in SAP processes that the ERP decides itself today.

At year end three agents run, all under the same rules: own user, rules in logic, tests before every change.

## What is coming until 2028?

```zeitleiste
2026-11 | Long-horizon agents: GA announced by Salesforce
2026-12-02 | EU AI Act: marking obligation for generative systems on the market before 2 August 2026
2027-12-02 | EU AI Act: high-risk obligations under Annex III
2028-08-02 | EU AI Act: high-risk obligations under Annex I, AI as a safety component in products
```

- **Long-horizon agents** that pursue a goal over days or weeks are still in pilot.
- **Koa**, Salesforce's first CRM reasoning model built on NVIDIA Nemotron, is expected to reach GA in Winter 2026, [in US regions first](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx). For orgs in the EU it is not relevant for now.
- **Headless Platform Interactions**, the meter for agentic API and MCP access, is still listed as "TBA" on the rate card. When external agents access Salesforce, that becomes a budget line, described in [MCP access as a budget risk](../../../blog/mcp-api-calls-salesforce-budget-risk/).
- **EU AI Act:** according to [White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act), the deadlines in the timeline follow from Regulation (EU) 2026/1744. For machine builders, Annex I concerns the machine more than the CRM agent. What this means for Agentforce projects is in [EU AI Act deadlines for Agentforce](../../../blog/eu-ai-act-deadlines-agentforce/) and [chapter 9](../teamwork-and-delivery/).

Which rules belong in your agents and which stay in the ERP is something I sort out on the client side as part of [Salesforce architecture](../../../services/salesforce-architecture/), the ERP connection as part of [Salesforce integration](../../../services/salesforce-integration/). All chapters are listed on the [masterclass overview](../).

Start with the agent whose rules and data are already in place, and treat it like code with tests and its own permissions from day one. If you would like a second opinion on your roadmap, [send me a message](#contact).
