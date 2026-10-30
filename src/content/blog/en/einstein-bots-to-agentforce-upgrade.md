---
title: "Einstein Bot to Agentforce: convert or keep the menu?"
description: "Should your portal's Einstein Bot become an Agentforce service agent? What Upgrade Agent does, how cost and testing change, and which flows stay menu-driven."
pubDate: 2026-10-27
lang: en
slug: einstein-bots-to-agentforce-upgrade
translationKey: einstein-bots-to-agentforce
topic: service
categories: [ai]
tags: [einstein bots, agentforce, service cloud, dealer portal, flex credits, manufacturing]
takeaways:
  - "Upgrade Agent, announced at Dreamforce 2026, builds an Agentforce Service Agent from an Einstein Bot while the bot keeps running; it sits in Agentforce Labs, which Salesforce calls experimental and pre-release."
  - "I found no retirement date for Einstein Bots on Salesforce's pages, so the switch is a business decision; legacy Chat, by contrast, was scheduled for retirement on 14 February 2026."
  - "Bot conversations came as a licence allowance; an agent bills consumption at 20 Flex Credits ($0.10) per action or $2 per conversation, and both models are not supported in the same org."
  - "In the scenario, moving all 4,000 monthly portal conversations to an agent needs about 2.9 million credits a year for actions alone, more than the 2.75 million per org in Service Cloud Max."
  - "Keep identification, warranty registration, safety reports and single lookups by order number in menus or deterministic logic, and give the agent the free-text questions the bot never understood."
faq:
  - q: "Is Salesforce retiring Einstein Bots?"
    a: "On the Salesforce pages I checked by 27 October 2026 I found no retirement date for Einstein Bots. Salesforce did schedule legacy Chat for retirement on 14 February 2026, so bots on that channel had to move to Messaging for In-App and Web."
  - q: "What does the Agentforce Upgrade Agent do?"
    a: "According to Salesforce it converts an existing Einstein Bot into an Agentforce Service Agent in minutes, while the bot keeps running. It runs in Agentforce Labs, which Salesforce describes as experimental and pre-release, so treat the result as a draft."
  - q: "Can an Einstein Bot and an Agentforce agent run side by side?"
    a: "Yes. A Salesforce Developers blog post from December 2025 describes a bot that handles status and logging requests and routes complex questions to an Agentforce Service agent through an outbound Omni-Channel flow with a fallback queue."
  - q: "Is an Agentforce agent more expensive than an Einstein Bot?"
    a: "Usually per conversation, yes. Bot conversations were part of the licence allowance, while an agent consumes 20 Flex Credits per action. In the scenario, three actions per conversation cost $0.30, and the yearly volume exceeds a Max edition pool."
  - q: "How do I test an upgraded agent?"
    a: "Reuse the example phrases the bot's intents were trained with and the transcripts of failed bot conversations as test cases, run the set several times and agree a pass rate with the head of service before go-live."
draft: false
---

Convert an Einstein Bot to Agentforce only where customers type questions the bot never understood, and keep short, rule-bound paths menu-driven. Salesforce's Upgrade Agent, announced at Dreamforce 2026, builds an Agentforce Service Agent from your bot in minutes while the bot keeps running, but it is a Labs tool and its output is a draft. The bigger changes sit around the tool: cost moves from a licence allowance to Flex Credits per action, behaviour moves from scripted dialogs to a model that decides, and testing moves from clicking through paths to pass rates.

## Do you have to replace your Einstein Bot now?

I found no deadline. On the Salesforce pages I checked by 27 October 2026, Einstein Bots carry no retirement date. The pressure came from the channel instead: Salesforce's developer documentation says legacy Chat was ["scheduled for retirement on February 14, 2026"](https://developer.salesforce.com/docs/atlas.en-us.live_agent_rest.meta/live_agent_rest), with Messaging for In-App and Web as the successor. Salesforce's own [implementation guide for customer-facing agents](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/agentforce_implementation_customer.pdf) deploys its example agent on an Enhanced Web Chat channel inside an Experience Cloud site, which is the setup many manufacturer portals already use.

The tool itself is item 20 in Salesforce's list of [21 Dreamforce 2026 announcements](https://www.salesforce.com/blog/dreamforce-2026-announcements/): "Click Upgrade Agent on Agentforce Labs to convert an existing Einstein Bot into an Agentforce Service Agent." The post adds that it "builds the new agent in minutes, so your current bot keeps running while you review and adjust the upgraded version." It names no GA or beta status. On its [Agentforce Labs page](https://www.salesforce.com/agentforce/labs/) Salesforce writes: "Everything in Labs is experimental and pre-release." I would run it in a sandbox and treat the result as a first draft. Which parts of a bot carry over, such as dialogs, variables or Apex actions, is not described on any page I could open, so check it in your org before you estimate effort.

## What changes in behaviour when the bot becomes an agent?

An Einstein Bot follows a script. Salesforce described dialogs as ["the basic 'unit' of conversation"](https://developer.salesforce.com/blogs/2018/06/summer18-einstein-bots-for-the-people), intents as example phrases per dialog and rules as "a conditional engine" for runtime decisions, and bots can "present customers with pre-defined options in menus". When a dealer types something no intent matches, the bot says it did not understand and shows the menu again. Annoying, but visible.

An Agentforce Service Agent works with topics, instructions and actions, and a language model chooses the action and phrases the answer. That handles questions like "The spindle motor on serial 4711 failed again, is the part in stock and can a technician come this week?" It also changes how the system fails. An agent rarely says it does not understand. If the knowledge article is outdated or the delivery date from SAP is a week old, it gives a fluent, wrong answer. In machine building the expensive cases are warranty statements, delivery promises and anything that touches safety.

Two consequences:

- **Decisions with consequences move into deterministic logic** behind the agent, for example warranty eligibility or goodwill limits. I describe the mechanics in [Agent Script rules instead of LLM decisions](../agent-script-deterministic-rules/).
- **Knowledge becomes a production system.** A bot showed the one article a dialog pointed to. An agent reads and rephrases whatever grounding it gets, so every manual and article needs an owner and a review date.

## What changes in cost?

Einstein Bots were budgeted as an allowance. Salesforce's [Einstein features cheat sheet](https://www.salesforce.com/en-ca/wp-content/uploads/sites/4/documents/datasheets/einstein-features-cheat-sheet.pdf), updated April 2024, says "Service Cloud UE licenses come 25 Einstein Bot conversations PUPM" (per user per month), Enterprise Edition gets them only with the Digital Engagement add-on, and extra capacity was "100 conversations for $50 per month".

Agentforce bills consumption. The [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) lists Flex Credits at $500 per 100,000, and Salesforce's [May 2025 announcement](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) says "One Agentforce action consumes 20 Flex Credits ($0.10 USD)". The alternative is $2 per conversation, and the pricing page states that Flex Credits and conversations "will not be supported in the same org". Prompts and Data 360 grounding come on top of actions; I break them down in [Flex Credits per action](../flex-credits-agentforce-cost-per-action/).

There is a third model. The [rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) lists Help Agent resolutions at 400 credits, and Salesforce's [June 2026 announcement](https://www.salesforce.com/de/news/press-releases/2026/06/30/salesforce-agentforce-help-agent/) says there is no charge when the customer is handed to a human. Salesforce announced this for Help Agent, now marketed as Casey, which I cover in [the Casey article](../service-cloud-casey-service-rep-assistant/). I found nothing saying it applies to a custom service agent built from your bot.

The [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) lists Max with "2.75M Flex Credits per org per year". That pool is shared by every agent and every Data 360 job in the org.

## A typical scenario: a dealer portal bot with 4,000 conversations

Assume a machine builder with 300 dealers and service partners on an Experience Cloud portal. All numbers are assumptions for illustration. An Einstein Bot handles 4,000 conversations a month:

| Bot path | Share (assumed) | My recommendation |
|---|---|---|
| Order status by order number, SAP lookup | 30 % | keep in menu |
| Manuals and certificates by serial number | 15 % | keep in menu |
| Warranty registration of a new machine | 10 % | keep in menu |
| Machine breakdown report | 10 % | capture fixed fields, hand to a human |
| "Something else", free text | 35 % | convert to the agent |

**Option 1, convert everything.** At an average of three actions per conversation, 4,000 conversations need 240,000 credits a month, $1,200 at list price, or 2.88 million credits a year for actions alone. That exceeds the 2.75 million in a Service Cloud Max org before a single prompt, grounding job or test run. At $2 per conversation the same volume costs $8,000 a month.

**Option 2, hybrid.** The bot keeps the first four paths, 2,600 conversations. The 1,400 free-text conversations go to the agent. Free text tends to need more steps, so assume four actions: 112,000 credits, $560 a month, about 1.34 million a year.

```kennzahlen
2.88M | credits a year for actions if everything is converted
1.34M | credits a year for actions in the hybrid option
2.75M | Flex Credits per org and year in Service Cloud Max
source: scenario with assumed values; 20 credits per action from Salesforce's May 2025 announcement, pool from the Service Cloud pricing page
```

```hinweis offen
I assume the bot paths stay inside the existing licence allowance. Confirm that with your account executive, because a move to the new editions may change it.
```

Cost is the smaller argument for option 2: the free-text bucket is where the bot fails today, while the menu paths already work. A December 2025 post on the Salesforce Developers blog about handing off from Einstein Enhanced Bots to Agentforce agents, written by two Salesforce employees, describes this pattern with Einstein Enhanced Bots: the bot "triages transactions (Log/Status) and routes complex knowledge to an Agentforce Service agent", using a field on the Messaging Session, an outbound Omni-Channel flow and a fallback queue. The post covers only the handoff from bot to agent, not the way back.

## Which flows should stay menu-driven?

My criteria, in this order:

- **Identification and verification.** Customer number, dealer ID and serial number decide what the conversation may see. That should not depend on how a model reads a sentence, and free-text entry points are where [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/) starts.
- **Data capture with legal weight.** Warranty registration, commissioning date, the contact for safety notices. A menu or form captures exactly the mandatory fields.
- **Safety-relevant reports.** A breakdown with risk to people goes straight to a human queue with serial number and photos, without a summary in between. For the phone channel I cover the same question in [the breakdown hotline article](../breakdown-hotline-agentforce-voice/).
- **Single lookups with one key.** Order status by order number is one SAP call. An agent can answer it too, as described in [the SAP order status article](../agentforce-sap-order-status-mulesoft/), but it spends two or more actions on an answer the menu gives in two clicks.
- **Promises with liability**, such as confirmed delivery dates.

Convert to the agent: troubleshooting questions answered from manuals, mixed questions, dealers writing in their own language and follow-up questions in the same conversation.

If you move everything to Agentforce anyway, the deterministic paths can live inside the agent as Agent Script logic, but each step then runs on the agent's meter.

## How do testing and go-live change?

A bot is tested by walking each dialog path once: same input, same output. An agent needs a test set that runs several times against an agreed pass rate. The implementation guide scores response quality from 0 to 5 and counts 3 or higher as a pass, while topic and action checks are pass or fail. Thresholds and tooling are in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). Test runs in a sandbox cost 16 credits per action according to the rate card.

The bot gives you a head start. The example phrases each intent was trained with, plus the transcripts of the "something else" path, are a ready-made test set of real dealer questions.

The order I would follow:

```schritte
Review the paths
  Export each bot path with volume and drop-out rate for the last three months.
Mark the paths
  Mark every path as keep, convert or hand to a human, using the criteria above.
Generate the draft
  Run Upgrade Agent in a sandbox and cut the draft down to the converted paths.
Build the tests
  Build tests from intent phrases and transcripts and agree the pass rate with the head of service.
Go live with free text | 4 weeks
  Route only the free-text path to the agent through Omni-Channel with a fallback queue, and watch Digital Wallet.
Pick the next path
  Decide on the next path with those numbers.
```

An Einstein Bot needs a split between paths that must stay predictable and questions an agent answers better, and that split is an [architecture decision](../../services/salesforce-architecture/) worth making before the first upgrade click.
