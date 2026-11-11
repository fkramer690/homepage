---
title: "Salesforce Enhanced Chat v2: should you switch from v1?"
description: "What Enhanced Chat v2 adds over v1, which eleven features it drops and who should switch. With a checklist for moving your Salesforce web chat deployment."
pubDate: 2026-10-31
lang: en
slug: salesforce-enhanced-chat-v2-switch
translationKey: enhanced-chat-v2-switch
topic: service
categories: [ai, architecture]
series: { id: enhanced-chat, part: 1 }
tags: [Enhanced Chat, Messaging for In-App and Web, Service Cloud, Agentforce, dealer portal, manufacturing]
takeaways:
  - "Enhanced Chat v2 is a new client for Service Cloud's Enhanced Web Chat; channel, routing and licence stay the same, and Salesforce says moving from v1 is optional."
  - "Only v2 supports Custom Lightning Types, token streaming, Agentforce Voice, the Context Events API and inline mode, which are exactly the features an Agentforce agent needs in a chat."
  - "According to Salesforce's comparison table, v2 lacks eleven v1 features, among them typing indicators, the fallback message, opt-out keywords and the Form and Time Selector messaging components."
  - "You switch by creating a new Embedded Service Deployment on the existing messaging channel; do not run v1 and v2 on the same domain, because messages may then fail to appear in v1."
  - "If an Agentforce agent answers in your web chat or will soon, switch to v2; if only people chat and you rely on forms inside the chat, you can stay on v1 for now."
faq:
  - q: "What is Salesforce Enhanced Chat v2?"
    a: "Salesforce describes Enhanced Chat v2 as a new customer interface for Service Cloud's Enhanced Web Chat, built for Agentforce agents. The messaging channel, Omni-Channel routing and the data stay the same as in v1."
  - q: "Do I have to move from Enhanced Chat v1 to v2?"
    a: "No. Salesforce states that moving from v1 to v2 is optional. As of 31 October 2026 I found no retirement date for v1 on Salesforce's pages."
  - q: "Is Enhanced Chat the same as Messaging for In-App and Web?"
    a: "Yes. Messaging for In-App and Web is the former name of the channel now called Enhanced Chat. v1 and v2 are two clients for the web variant of that channel."
  - q: "Do I need a new licence for Enhanced Chat v2?"
    a: "Not for moving from v1 to v2, because v2 uses the same channel. If you are still coming from legacy Chat, you may need Digital Engagement depending on your contract; check whether Enhanced Chat appears as a channel type in Messaging Settings."
  - q: "Does Enhanced Chat v2 apply to WhatsApp and the mobile app?"
    a: "No. According to Salesforce, v2 applies only to Enhanced Web Chat, not to Enhanced In-App Chat, WhatsApp, SMS, Apple Messages for Business, LINE or Bring Your Own Channel."
draft: true
---

Switch to Salesforce Enhanced Chat v2 as soon as an Agentforce agent answers in your web chat, or is about to. Only v2 shows structured answers as their own interface, streams answers word by word and receives the visitor's current page as context. Stay on v1 if only people chat and you need forms or time selection inside the chat, because v2 lacks those messaging components. Salesforce calls the move optional, it needs no new licence and it only touches the client on your website. It does need a new deployment and a careful test.

## What is Enhanced Chat v2?

Salesforce has renamed the Service Cloud web chat several times in a few years, and documentation, Trailhead and proposals use the names side by side. So first the map:

```tabelle
title: From legacy Chat to Enhanced Chat v2
columns: Name | What it is | Status
Chat (legacy Chat, Live Agent) | Old, synchronous web chat | Retirement 14 Feb 2026
Messaging for In-App and Web | New, asynchronous messaging channel | Former name
Enhanced Chat v1 | First client of Enhanced Web Chat | Running, no end announced
Enhanced Chat v2 | New client, built for agents | Available, move optional *
note: Messaging for In-App and Web and Enhanced Chat are the same channel. v1 and v2 are two clients for it.
```

Salesforce Help describes v2 as ["a new customer interface for Enhanced Chat"](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&language=en_US&type=5), optimised for modern features and agentic use cases. The sentence that matters comes right after: moving from v1 to v2 is optional.

For the architecture this means the messaging channel, routing through Omni-Channel flows, queues, user verification and data storage stay as they are. v2 only replaces what the visitor sees in the browser and the JavaScript APIs behind it. According to Salesforce, v2 applies to Enhanced Web Chat only. The mobile app (Enhanced In-App Chat), WhatsApp, SMS, Apple Messages for Business, LINE and Bring Your Own Channel are not affected.

If your website still runs legacy Chat with `embedded_svc` in its code, you have a different problem. The [developer documentation](https://developer.salesforce.com/docs/atlas.en-us.live_agent_rest.meta/live_agent_rest) scheduled it for retirement on 14 February 2026. I cover the migration from legacy Chat in part two of this series, and moving an Einstein Bot in [Einstein Bot to Agentforce](../einstein-bots-to-agentforce-upgrade/).

## What does Enhanced Chat v2 add over v1?

Salesforce's [comparison table](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5) lists four features only v2 has. The v2 help page adds token streaming, a new design and faster loading of the chat window.

- **Custom Lightning Types.** The agent answers with its own interface instead of text, built as a Lightning Web Component. For a manufacturer that is the spare part card with picture, part number and availability, or the list of open technician slots. v1 cannot display these answers.
- **Token streaming.** The agent's answer appears word by word while it is generated. On longer answers the customer no longer stares at an empty window for several seconds.
- **Agentforce Voice.** The customer can talk to the agent inside the chat.
- **Context Events API.** With `utilAPI.setSessionContext` the website keeps telling the agent which page the visitor is on and what they searched for. The agent then knows someone is on the spare parts page of a specific product line without having to ask.
- **Inline mode.** The chat sits inside an area of the page instead of a floating button in the corner, for example as a fixed column next to the service form in the dealer portal.

All five points help the agent. For a service rep chatting with a dealer, v2 changes little. That is the real basis for the decision.

## What is missing in Enhanced Chat v2?

Read this part before you switch. According to the comparison table, v1 has eleven features that v2 does not:

```staerken-grenzen
title: Enhanced Chat v2: strong for agents, with gaps from v1
+ Lightning Types | structured answers such as spare part cards, v2 only *
+ Context | current page and search to the agent via the Context Events API
+ Streaming | answers appear word by word
- Comfort | no typing indicators, no emoji keyboard, no custom Enter key behaviour
- Messaging components | Form, Time Selector and Notification are missing
- Opt-out | no opt-out keywords and no opt-out confirmation
- Fallback | no fallback message
- Pre-chat | once per conversation only, not per session
- Custom LWC | no longer in the message bubble, only in header and pre-chat
better: For chats between customers and people that rely on forms in the chat: stay on v1 for now.
```

Three gaps weigh more in manufacturing than the rest. The **Form and Time Selector messaging components** are the usual way in v1 to collect data or let a customer pick a slot inside the chat. If you prepare service visits that way today, you need another solution in v2, for example a Custom Lightning Type that an agent sends. **Typing indicators** matter to customers chatting with a person: without them a long answer from a service rep looks like silence. And custom LWC in the message bubble, which in v1 can style an order status inside the answer, only work in header and pre-chat in v2.

Everything else stays the same: user verification, reCAPTCHA, visible and hidden pre-chat, routing through flow or queue, estimated wait time, attachments, transcript download, branding with colours and fonts, custom labels for translations, sensitive data rules, escalation and Omni Supervisor.

**Important for planning:** Salesforce warns that messages may fail to appear in v1 if v1 and v2 run on the same website, especially Lightning Types, which v1 cannot display. Plan the move per domain, never as side-by-side operation on one site.

## Who should switch to v2?

What decides it is who answers in the chat. My rule of thumb:

```pro-contra
pro: Switch to v2
- An Agentforce Service Agent answers in the web chat or is planned
- The agent should show spare parts, status or slots as a card
- The chat should know which product or parts page the visitor is on
- The chat should be embedded in the portal instead of a button
contra: Stay on v1 for now
- Only people chat, and typing indicators matter to them
- Form or Time Selector carry a process in the chat
- Customers opt out of the chat with an opt-out keyword
- Custom LWC in the bubble cannot move to header or pre-chat
```

An example, explicitly as an assumption: a machine builder runs the chat on two websites. On the public product site anonymous prospects ask about product lines; an agent should answer and hand over to sales when there is buying interest. In the dealer portal on Experience Cloud, logged-in dealers chat with inside sales and pick a callback slot with a Time Selector. Here I would move the public website to v2 and leave the portal on v1 for now. Since these are two domains, the versions do not collide. I describe the portal itself in [Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).

```praxis
PLACEHOLDER, to be written only after Fabian's answer: starting point in the project (v1 or legacy Chat), reason for v2, which missing feature was missed and how long the switch took.
```

One more boundary: if you bring the agent into your own app or portal without a Salesforce chat window, you end up with the Agent API. I compare the two routes in [Agent API for dealer apps](../agentforce-agent-api-dealer-apps/).

## How do you move from v1 to v2?

Salesforce describes the move for an existing channel in Help under [Create a v2 deployment for an existing channel](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_v2_existing_channel_deployment.htm&type=5). You need the permissions Customize Application and Modify Metadata Through Metadata API Functions, and Digital Experiences must be enabled in the org.

```schritte
Check what you use | admin and service
  Which of the eleven missing features does the deployment use today?
Create deployment | admin
  New Embedded Service Deployment, Enhanced Chat, Web, on the existing channel.
Switch to v2 | admin
  Switch to v2, then Switch & Publish; snippet into the website.
Test and republish | admin and service
  Check pre-chat, routing, agent and branding, republish after every change.
```

When you create the deployment you enter the website's domain; subdomains are included. For an Experience Cloud site you copy the site domain from Setup. You set up branding again in the new deployment; colours, fonts and window size exist in both versions.

I would settle two things first. One, reports: they hang off the channel and the messaging sessions, and since v2 only swaps the client I expect them to keep working. I found no Salesforce page that confirms this, so check it on a test day with real sessions. Two, the way back: the help page does not describe how to set a deployment from v2 back to v1. Keep the old v1 deployment until v2 has run stable for a while, and swap the snippet on the website in an emergency.

## Where should you start?

Put the comparison table next to your current deployment and tick off the eleven missing features. If none is in use, the switch is configuration and testing, and an agent in the chat gets better tools with v2. If one carries a process, such as picking a slot in the chat, plan the replacement first and the switch second. Whether Agentforce fits your service at all is something we settle in [Salesforce architecture](../../services/salesforce-architecture/) before any licence question.

Enhanced Chat v2 pays off where an agent answers, and can wait where people chat.
