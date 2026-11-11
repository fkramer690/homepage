---
title: "Agentforce in Enhanced Chat: handover to a human"
description: "How Enhanced Chat v2 routes chats to your Agentforce agent, when the agent hands over to your service team and what happens when nobody is available."
pubDate: 2026-10-31
lang: en
slug: enhanced-chat-agentforce-human-handover
translationKey: enhanced-chat-agentforce-handover
topic: service
categories: [ai]
tags: [Enhanced Chat, Agentforce, Omni-Channel, Escalation, Service Cloud, Manufacturing]
series: { id: enhanced-chat, part: 5 }
takeaways:
  - "In Enhanced Chat two Omni-Channel flows decide where a conversation goes: the inbound flow sends the session to the Agentforce agent, the outbound flow hands it to a queue staffed by people."
  - "If nobody is available at handover, Salesforce says the agent resumes the conversation, and escalation is attempted only once per session; a second request for a person goes nowhere."
  - "Routing, fallback queue and escalation work the same in Enhanced Chat v1 and v2; according to the comparison table, the v1 fallback message does not exist in v2."
  - "I would route machine downtime, safety issues and goodwill requests straight to people in the inbound flow, based on fixed pre-chat fields, without a language model making that call."
faq:
  - q: "How does an Agentforce agent in Enhanced Chat hand over to a human?"
    a: "The Escalation subagent recognises the reason, for example when the customer asks for a person. The agent then calls the outbound Omni-Channel flow, which uses the Route Work action to send the session and its history to a queue of service reps."
  - q: "What happens if nobody is available when the agent escalates?"
    a: "According to Trailhead the agent resumes the conversation, and Salesforce attempts escalation only once per session. Salesforce Help says you can customise the Escalation subagent to create a case in that situation."
  - q: "Does the service rep see what the customer wrote to the agent before?"
    a: "Yes. Salesforce Help says the conversation history, including messages and information gathered, is transferred to the next destination. An AI summary through Einstein Work Summaries is generated only when the conversation ends, according to Help."
  - q: "Does routing change when I move from Enhanced Chat v1 to v2?"
    a: "According to Salesforce's comparison table it does not: flow-based routing, queue, fallback queue and routing escalation are available in both versions. Check whether you use the fallback message in v1, though, because v2 does not have it."
draft: true
---

In Enhanced Chat an Omni-Channel flow decides who gets a conversation, not the code on your website. The inbound flow sends the messaging session to the Agentforce Service Agent and falls back to a queue if that fails. When the customer wants a person, the agent uses an outbound flow to hand the session and its history to your service team. If nobody there is available, the agent carries on, and Salesforce attempts escalation only once per session. For the handover to a human I would therefore plan the "nobody available" case first and the agent second.

## How does a chat in Enhanced Chat reach the Agentforce agent?

The Trailhead unit on [setting up the messaging connection](https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/set-up-the-messaging-connection) puts it briefly: "The Messaging connection relies on two Omni-Channel flows." Three building blocks come with them that many teams know from the old chat: a service channel for the Messaging Session object, a routing configuration and a queue for people.

The inbound flow receives the session with the pre-chat data, checks in the Trailhead example whether the customer already exists as a contact, and sends the conversation to the agent with the Route Work action. If that fails, the session goes to the queue. Two rules from the documentation matter for the project plan:

- The agent has to be active, otherwise it does not show up as a target in Flow Builder. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.agent_deploy_emp.htm&language=en_US&type=5) each inbound flow can serve exactly one agent, while one agent can have several inbound flows.
- The fallback queue is mandatory. The [example for an Enhanced Chat deployment](https://developer.salesforce.com/docs/ai/agentforce/guide/headless-examples-enhanced-chat-agent.html) creates one because it is required "so that conversations can escalate to a human service rep".

Enhanced Chat v2 does not change any of this. In the [comparison of v1 and v2](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5), flow-based routing, queue, fallback queue, routing escalation, estimated wait time and Omni Supervisor appear in both columns. v2 is a new client for the same messaging channel; the logic behind it stays in the channel and the flows. If you move from v1, you do not rebuild your routing.

```prozess
title: From the first sentence to a person taking over
lanes: Service team | Agentforce | Omni-Channel
Omni-Channel | Inbound flow | Session with pre-chat data goes to the agent via Route Work
loop: Agent not reachable: the session goes to the fallback queue
Agentforce | Conversation | The agent answers questions and calls its actions
gate: The Escalation subagent detects a reason for a person
Omni-Channel | Outbound flow | Checks whether anyone in the queue is available
Service team | Takeover | Session and history arrive with the service rep
loop: Nobody available: the agent carries on, no second attempt in this session
```

## When should the agent hand over to a human?

Salesforce puts the reasons into the instructions of the Escalation subagent. Trailhead gives examples: a customer explicitly asking for a person, negative sentiment and requests outside the agent's scope. That is a decision made by the language model: it reads the conversation and decides whether one of these cases applies.

For most questions that is enough. Manufacturers, however, have requests where I would not leave this decision to a model. A machine that is down costs the customer money every hour, a safety report has liability consequences, and the agent cannot grant goodwill anyway. These cases can be caught earlier: the inbound flow can decide on a pre-chat field or a hidden value from the portal before the agent even starts. How serial number and dealer number get into the session is the subject of part 6 of this series.

```tabelle
title: Where each handover reason is decided (my recommendation)
columns: Reason | Where to decide | Why
Customer wants a person | Escalation subagent | A clear request the model recognises reliably
Question outside the scope | Escalation subagent | Depends on content, fixed rules do not work here
Machine down | Inbound flow, pre-chat field * | Every minute counts, no detour through the agent
Safety-related report | Inbound flow, pre-chat field * | Liability, the report must arrive unchanged
Goodwill, price or delivery commitment | Fixed rule in the agent, then handover | A commitment with consequences needs a person
note: The Escalation subagent keeps everything that only emerges during the conversation.
```

Goodwill is the borderline case. The agent may take the request, collect photos and the serial number and then hand over. Commitments belong in fixed logic, as I describe in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/), so the agent does not promise something out of politeness.

## What happens when no human is available?

This is the part I miss most often in concepts. According to Trailhead the outbound flow checks whether anyone in the queue is available and only then hands over. Otherwise: "If no reps are available and escalation fails, the agent resumes the conversation." And right after that: "Escalation is attempted only once per session."

```hinweis achtung
Escalation runs only once per session. If it fails because nobody is logged in at 6:30 pm, the customer will not reach a person in that session, even if they ask again ten minutes later. Plan what the agent says in that case.
```

For a manufacturer with a service hotline from 7 am to 5 pm and dealers in other time zones this is the normal case, not an edge case. I would settle three things before the agent goes live:

- **What the agent says.** You set the escalation message in the agent's messaging connection. Trailhead shows a neutral wording ("One moment while I check if there are any … reps available"). You also need an honest answer for the case that nobody is available, with the next time someone will be.
- **What happens to the request.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.agent_deploy_emp.htm&language=en_US&type=5) you can customise the Escalation subagent to create a case when the transfer does not succeed. For manufacturers I would make that the rule, with serial number and fault description in the case.
- **What is missing in v2.** The comparison table lists "Add Fallback Message" for v1, not for v2. If you use this setting in v1, find out before the switch which message the customer sees in v2 instead.

Both versions can show the estimated wait time. With a small service team it often helps more than any wording, because the customer can decide whether to wait or to accept a case.

## What does the service rep see after the handover?

According to Salesforce Help, "the conversation history, including messages and information gathered" is transferred to the next destination. The rep sees what customer and agent wrote and does not have to start from scratch.

That does not give the rep a summary yet. [Einstein Work Summaries](https://help.salesforce.com/s/articleView?id=service.cc_generative_ai_work_summaries.htm&language=en_US&type=5) creates a summary for messaging sessions "automatically when a conversation ends", according to Help. The page does not document a summary at the moment of handover. After twenty messages nobody likes reading the whole history while the customer is waiting.

So I would have the agent write the key data into fields before the handover: serial number, machine type, fault description, what the customer has already tried. That is one more action per escalated conversation and so a few more [Flex Credits](../flex-credits-agentforce-cost-per-action/). In return the rep starts with three fields instead of a transcript. Where this data lives and why the messages themselves do not show up in standard reports is covered in part 3 of this series.

## What I saw in the project

PLACEHOLDER: practice example from Fabian's Enhanced Chat v2 project. Open points: how was the handover built, which reasons went straight to people, how was the "nobody available" case solved, and what did not work at go-live? This section will be written after Fabian's answers.

## How do you test the handover before go-live?

Most agent tests check answers. For the handover you also need tests in which only the situation in the service team changes. My list:

- **Customer asks for a person right away**, with a rep available in the queue. Does the full history arrive?
- **Same request, nobody logged in.** What does the agent say, is a case created?
- **Second request in the same session** after a failed escalation. Does the answer stay honest?
- **Agent deactivated.** Does the session land in the fallback queue?
- **Machine down in the pre-chat form.** Does the conversation go straight to people, without the agent?
- **v1 and v2 on the same website.** Salesforce warns that messages may then fail to appear in v1. Test on separate domains.

How to agree pass rates for the agent's answers is described in [Testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). After go-live the escalation rate is the figure I look at first, together with the number of failed handovers; more in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/). If you are replacing an Einstein Bot, the split between menu, agent and person is in [Upgrading an Einstein Bot to Agentforce](../einstein-bots-to-agentforce-upgrade/).

## Where should you start?

Before the first flow, write down which requests must never land with the agent, who sits in the queue at which times and what the customer hears when nobody is there. These three answers shape your flows, not the other way round, and to me they belong in the [architecture](../../services/salesforce-architecture/) of the service channel before anyone configures the agent.

A good handover to a human in Enhanced Chat is decided on the evening when nobody is left in the queue.
