---
title: "AIforce and system integrators: what SI/AI Force means"
description: "AIforce, the SIForce rename and Salesforce's new partner model: what is confirmed, what is not, and what manufacturers should settle with their partners."
lang: en
slug: aiforce-and-system-integrators
translationKey: masterclass-05
chapter: 5
short: "AIforce and partners"
summary: "What AIforce and SIForce really are, and how Salesforce's new partner model shifts the interests of your implementation partner."
takeaways:
  - "AIforce is the layer launched on 15 September 2026 that makes Salesforce data and workflows usable in Claude, Slack and Lightning."
  - "The rename to SIForce rests on a single post by Marc Benioff on X so far. I found no Salesforce document that uses the name."
  - "Executive Order 14434 applies only to US federal agencies. Salesforce, its partners and manufacturers in Europe do not have to rename anything."
  - "Since 2026 partners earn on consumption and on agents in production. When your credit consumption rises, your partner benefits too."
  - "Measure partners on outcomes you can check yourself, cap Flex Credits and write rules for AI-assisted coding into the contract."
articles: [aiforce-salesforce-in-claude-slack, fixed-price-ai-salesforce-partners, partners-ai-coding-sow-rules]
faq:
  - q: "What is AIforce in Salesforce?"
    a: "AIforce is an interface layer Salesforce announced at Dreamforce on 15 September 2026. It makes Salesforce data, workflows and permissions usable from Claude, Slack and Lightning, and consists of Claudeforce, Slackforce, Agentforce Coworker and the Headless Toolkit."
  - q: "Is SIForce the official new name for AIforce?"
    a: "Not confirmed so far. Salesforce Ben reports a post by Marc Benioff on X on 9 October 2026 but found no official announcement. Up to 27 October 2026 I found no Salesforce document using the name SIForce, so I keep writing AIforce."
  - q: "What does the new partner program change for my implementation partner?"
    a: "According to Salesforce's March 2026 announcement, there are two tiers, Summit and Select, and 28 competencies instead of 170 distinctions. Incentives follow active consumption instead of seats, and Agentforce capability must be proven in a sandbox. Your partner now has an interest in your agents going live and being used a lot."
  - q: "Does my partner need to be in the FDE Partner Network?"
    a: "No. The network is an exclusive group led by large consultancies such as Accenture and Deloitte. For a mid-sized manufacturer it matters more whether the partner has put agents into production in comparable processes and knows a manufacturer's ERP setup."
draft: false
---

In autumn 2026 "SI / AI Force" means two things. AIforce is the layer Salesforce launched on 15 September 2026 to make its data and workflows usable from Claude, Slack and Lightning. The rename to SIForce is so far known only from secondary press; no Salesforce document confirms it. SI also stands for system integrator, and Salesforce has rewired those incentives: partners now earn on consumption and on agents in production. For manufacturers that means keeping the name AIforce, piloting small, and measuring partners on outcomes, cost caps and clear AI rules.

## What does "SI / AI Force" mean?

Anyone asking about "SI Force" or "AI Force" in October 2026 usually means one of two things, often both at once:

| Reading | What it refers to | Who it affects |
|---|---|---|
| AIforce (SIForce according to the CEO) | Interface layer that makes Salesforce usable from Claude, Slack and Lightning | IT lead, sales, service, data protection |
| SI as system integrator | The implementation partner who introduces and runs Salesforce for you | Programme manager, procurement, business units |

The two are linked. Your partner is expected to deliver the new layer, and since 2026 Salesforce pays partners differently for doing so. That is why this chapter covers both readings. The basic terms and the four layers of AI around Salesforce are in [chapter 1](../terms-and-map/); the coding agents partners build with today are in [chapter 4](../external-coding-agents/).

## AIforce: the interface layer above Agentforce

Salesforce describes AIforce as "a live interface layer that brings the full power of Salesforce to wherever people and agents work" ([announcement of 15 September 2026](https://www.salesforce.com/news/stories/aiforce-announcement/)). In Salesforce's architecture picture AIforce sits above Data 360, Customer 360 and Agentforce. Requests run on the user's existing permissions; Salesforce says there is no new permissions model. The model provider is not supposed to retain business data.

| Component | Contents | Status according to Salesforce |
|---|---|---|
| Claudeforce | Salesforce in Claude (MCP server with 37 sales skills), Salesforce Development plug-in for Claude Code with about 40 skills | Salesforce in Claude: beta for all customers; service and industry skills only announced |
| Slackforce | Slackforce Surfaces, Slackbot, Slack CRM, Slack Code | no availability dates |
| Agentforce Coworker | AI teammate in Lightning | available; Salesforce reports 100,000 activations in 35 days |
| Headless Toolkit | MCPs, APIs, plug-ins, skills and developer tools | no status given |

For a manufacturer this is mainly a sales topic today. The 37 skills are sales skills; after-sales and field service teams have nothing to test yet. On cost, Salesforce itself writes: "Pricing and packaging are subject to change." The [Flex Credits rate card of 31 August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) still lists the Headless Platform Interactions meter for agentic access as "TBA". How external tools reach your org through MCP is covered in [chapter 3](../mcp-and-interfaces/), the cost side in [chapter 7](../costs-and-tokens/).

One distinction saves a lot of confusion in workshops. In the [Claudeforce announcement of 27 August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) Claude is a reasoning model for the Atlas Reasoning Engine and the default model in Agentforce Vibes, Agentforce Coworker and Slack. That is Claude in Salesforce. Salesforce in Claude is the other direction: CRM data shows up in the Claude app your staff use. For data protection these are two separate reviews. What an IT lead should do about it now is in the article [AIforce: Salesforce in Claude and Slack explained](../../../blog/aiforce-salesforce-in-claude-and-slack/).

### AIforce and Headless 360

Salesforce Ben describes the naming sequence as Headless 360 at TDX in April, AIforce at Dreamforce, then SIForce. Salesforce's own AIforce announcement does not mention Headless 360, yet the company keeps using the term: since Q2 of fiscal 2027 Headless 360 counts towards [Agentforce ARR of more than $1.5 billion](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/default.aspx), Max editions are to include [Headless 360 capacity](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) in future, and the rate card assigns the new meter to Headless 360 usage. My reading: AIforce is the interface, Headless 360 the billable API and MCP access underneath. In contracts, the name Salesforce prints on the order form is the one that counts.

## Is AIforce now called SIForce?

All that is documented is one post. On 9 October 2026 Marc Benioff wrote on X: "The era of Super Intelligence is here. AIForce is officially SIForce." I could not open the post itself, so the rename rests on secondary press alone. [Salesforce Ben reported on 12 October](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/) that there did not appear to be any official announcement from Salesforce and that it had asked Salesforce for comment. Up to 27 October 2026 I found no Salesforce press release or help article that uses SIForce.

The trigger, on the other hand, can be read in the primary source. [Executive Order 14434](https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/) of 29 September 2026 tells US executive departments and agencies to write "Super Intelligence" instead of "Artificial Intelligence" in their own documents. Existing regulations stay as they are, no enforceable rights are created, and private companies are not mentioned. Salesforce did not have to rename anything; it was a voluntary choice. That US federal agencies are Salesforce customers and now have to say "SI" is a plausible motive, but it is my assumption.

```zeitleiste
2026-04 | Headless 360 at TDX, according to Salesforce Ben
2026-09-15 | Salesforce launches AIforce at Dreamforce
2026-09-29 | Executive Order 14434 for US executive agencies
2026-10-09 | Marc Benioff on X: "AIForce is officially SIForce"
2026-10-12 | Salesforce Ben finds no official announcement
```

For your documents I recommend "AIforce (announced by the CEO as SIForce)" until Salesforce confirms the name in writing. Three names in about six months are also a good reason to structure architecture documents by capability rather than by product name.

## SI as system integrator: what changes in the partner model

The second reading concerns your implementation partner. Salesforce [rebuilt its partner program on 2 March 2026](https://www.salesforce.com/news/stories/rewarding-value-through-new-salesforce-partner-program/):

- Two tiers, Summit and Select.
- 28 core competencies instead of 170 distinctions, including the increasingly demanded ones for Agentforce and Data 360.
- Incentives follow active consumption rather than seat provisioning.
- Agentforce capability is proven through sandbox validation, not just a knowledge test.
- AI governance and security guardrails are required.

The announcement gives no start date for the new tiers. On 15 April 2026 Salesforce added the [Forward Deployed Engineer Partner Network](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/), the FDE network for short. It is an exclusive group with Accenture and Deloitte as launch partners, plus Capgemini, Cognizant, IBM Consulting, KPMG, PwC, Slalom, TCS and smaller regional firms. Members get a direct link to Salesforce's product teams and insight into the roadmap. Salesforce ties their incentives to agents reaching production and names industry depth as a criterion, manufacturing included. The claim that these firms drove one third of all successful Agentforce implementations is Salesforce's own figure with no published method.

### What the new incentives mean for you as a client

The logic has shifted from "licence sold, project billed by the hour" to "agent in production, consumption running". Partly that is good for you, but there is a conflict.

```pro-contra
pro: What works for you
- A partner who earns at go-live wants agents in production
- Less interest in pilots that never reach production
contra: Where the conflict lies
- Every agent action costs you Flex Credits
- Salesforce now rewards your partner for that consumption
- Three actions instead of one cost you more and the partner nothing
```

On top of that, partners now build with coding agents themselves. That shortens work that used to be billed by the hour. Whether fixed price or outcome-based contracts fit better as a result is the subject of [fixed price vs. time and materials with AI](../../../blog/fixed-price-vs-time-and-materials-ai/). What belongs in the contract when a partner codes with AI, meaning disclosure, data handling, IP, no production access and review, is in [partners using AI coding: contract rules](../../../blog/partners-using-ai-coding-contract-rules/).

## Worked example: two offers for a dealer agent

Assume a machine builder with Service Cloud, SAP and a dealer portal. It wants an agent that answers dealer questions on order status and delivery dates and asks two partners for offers. All numbers and circumstances are assumptions.

| | Offer A | Offer B |
|---|---|---|
| Partner | long-standing partner | has Agentforce projects in production |
| Pricing | time and materials, estimated at 60 person-days | fixed price for the same scope plus a bonus if, after three months, 30 percent of dealer enquiries are answered without a service agent |
| AI tools | The offer says nothing about them. | The team works with Claude Code and the Salesforce plug-in. |
| Access | not stated | Hosted MCP access to the production org for testing |

From an architect's point of view I would proceed like this:

```schritte
Ask partner A
  Whether and which coding agents the team uses. I find it unlikely that a partner uses no AI at all in 2026; either way it belongs openly in the contract.
Fixed price yes, production access no
  Accept B's fixed price, refuse the production access. Agents work in sandboxes and scratch orgs; releases go through the pipeline.
Sharpen the success measure
  B's rate only counts if wrong answers are sampled and checked and the cost per answered enquiry stays below an agreed limit.
Settle Flex Credits
  Decide who pays for Flex Credits, in sandbox and production, and agree a monthly cap with an alert.
Settle ownership
  Who runs the agent after go-live, who maintains prompts, tests and the SAP interface? With several partners an [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/) helps.
```

After that the two offers can be compared, because AI use, access and consumption are on the table. Price, references and team then decide which partner fits better.

## What should manufacturers settle with their partners now?

- **Fix the name.** Write "AIforce" in concepts until Salesforce confirms SIForce in writing, and describe capabilities rather than product names.
- **Agree outcomes instead of hours** where the scope is clear, with a metric you can measure yourself.
- **Cap consumption.** Expected actions per transaction, a credit ceiling, responsibility for sandbox tests.
- **Write AI rules into the contract**: disclosure of tools, no production access, human review, IP in the code.
- **Check industry depth.** Ask for agents in production for warranty, spare parts or dealer sales, not for certificates or the FDE network logo.

These points are part of my work in [partner governance](../../../services/partner-governance/). Which tool fits which purpose is the subject of the next chapter, the [decision matrix](../ai-tool-decision-matrix/); how teams organise themselves around AI is covered in [chapter 9](../teamwork-and-delivery/). All chapters are listed on the [masterclass overview](../).
