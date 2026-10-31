---
title: "Enhanced Chat Lightning Types: cards, photos, streaming"
description: "How an Agentforce agent in Enhanced Chat v2 shows spare part cards, accepts photos of the type plate and streams answers, and where the limits are."
pubDate: 2026-10-31
lang: en
slug: enhanced-chat-lightning-types-photos
translationKey: enhanced-chat-beyond-text
topic: service
categories: [ai, architecture]
tags: [Enhanced Chat, Agentforce, Lightning Types, Service Cloud, Spare parts, Dealer portal]
series: { id: enhanced-chat, part: 7 }
takeaways:
  - "With custom Lightning Types an Agentforce agent in Enhanced Chat v2 shows structured answers as a card, such as a spare part with image, availability and price; v1 cannot display them."
  - "Since the Winter '27 release, rolling out from the week of 21 September 2026, service agents accept screenshots, receipts and PDFs in Enhanced Chat v1 and v2."
  - "In managed mode, uploaded files land in a system variable and your agent logic decides what happens to them; for photos of a type plate that is the mode I would choose."
  - "Token streaming shows answers word by word, but the Trust Layer only checks the finished answer; the client must be able to remove streamed text again."
  - "Time selector, form and notification from the messaging components are missing in v2; if you need them, rebuild them as a Lightning Type or stay on v1 for now."
faq:
  - q: "What is a custom Lightning Type in Agentforce?"
    a: "A bundle of a required schema (schema.json) and optional files for input and display. The schema describes the data an agent action returns, and the renderer displays it as a card in the chat through a Lightning Web Component."
  - q: "Do custom Lightning Types work in Enhanced Chat v1?"
    a: "No. Salesforce's comparison table lists custom Lightning Types for Enhanced Chat v2 only. For the service agent in web chat, the bundle uses the channel folder enhancedWebChat."
  - q: "Can a customer send a photo to the agent in Enhanced Chat?"
    a: "Yes, since the Winter '27 release service agents accept screenshots, receipts and PDFs in Enhanced Chat v1 and v2. The agent's upload mode controls the behaviour: auto, managed, disabled or error."
  - q: "Is token streaming in Enhanced Chat safe?"
    a: "The Trust Layer can only check a streamed answer once it is complete. If the check fails, a validation signal arrives and the client should remove the text it has already shown."
draft: true
---

In Enhanced Chat v2 an Agentforce agent shows more than text: with custom Lightning Types the result of an action becomes a card in the chat, such as a spare part with image, availability and price. Since the Winter '27 release the same agent accepts photos, screenshots and PDFs, for example a picture of the type plate. With token streaming its answers appear word by word. Lightning Types exist only in v2, file upload in v1 and v2. I would start with a single card that answers the question your service gets most often by phone today.

## What are custom Lightning Types in Enhanced Chat?

A **custom Lightning Type** is a description of data plus the interface Salesforce uses to show that data. According to the [Agentforce Developer Guide](https://developer.salesforce.com/docs/ai/agentforce/guide/lightning-types-custom.html) it has three parts: the schema defines structure and validation, the editor handles input, the renderer handles output. Technically it is a LightningTypeBundle, available from API version 64.0.

```tabelle
title: How a custom Lightning Type is built
columns: File | Required | Purpose
schema.json | yes * | Data structure and rules as JSON Schema, for Apex types the reference to the Apex class
editor.json | no | Own input through a Lightning Web Component
renderer.json | no | Own display through a Lightning Web Component, for one item or a list
enhancedWebChat | channel folder | Overrides the display for the service agent in Enhanced Chat v2 *
note: Based on the Agentforce Developer Guide, as of 31 October 2026.
```

The flow in the chat is always the same. The customer asks, the agent calls an action, usually an Apex method or a flow, and the action returns data in the format of the Lightning Type. The renderer turns it into the card. This matters for the architecture: the card shows only what the action delivers. The agent does not invent a part number or a price when the data comes from the ERP or PLM and the language model only passes it on.

For the service agent in web chat you create the channel folder `enhancedWebChat` in the bundle. The mobile view has `lightningMobileGenAi`, employee agents in Lightning Experience have `lightningDesktopGenAi`. So one type can look different in your customer's chat than in your inside sales console.

## Which cards are worth building for manufacturers?

I would only build answers as a card when they are structured and the customer uses them afterwards. Three candidates are obvious for manufacturers, stated here as an assumption:

- **Spare part card:** part number, image, availability, dealer or customer price and a button to the cart. The data comes from PLM and ERP, as described in [spare parts by serial number](../spare-parts-by-serial-number-ai/).
- **Order status:** order number, line items, delivery date, tracking number. A typical question for inside sales; the route through MuleSoft to SAP is in [Agentforce and SAP](../agentforce-sap-order-status-mulesoft/).
- **Appointment options:** two or three free slots for a technician that the customer picks from.

For the third one, look at the [comparison table from Salesforce](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5). The ready-made messaging components "Time Selector", "Form" and "Notification" exist in v1, not in v2. Custom LWC in the text bubble are gone in v2 as well. Rich links and questions with static or dynamic options exist in both versions. If you offer appointments through the time selector today, you rebuild the selection in v2 as a Lightning Type or keep this channel on v1 for now.

```staerken-grenzen
title: Custom Lightning Types in Enhanced Chat v2
+ Structured answer | a card instead of running text, with data from the action *
+ One type, several channels | own display for web chat, mobile and Lightning Experience
- v2 only | Enhanced Chat v1 does not display the types
- Build effort | schema, Apex or flow and an LWC per card
- Missing components | time selector, form and notification do not exist in v2
better: For plain choice questions, the answer options that v1 and v2 already include are enough.
```

One warning from the switch guide belongs here: if v1 and v2 run on the same website, messages may fail to appear in v1. A card that only v2 shows is one more reason not to run both versions side by side on one domain.

## Can the agent accept photos and PDFs?

Yes. The [Developer's Guide to the Winter '27 release](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) says that service and employee agents can now accept screenshots, receipts and PDFs on Enhanced Chat v1, Enhanced Chat v2 and Lightning Experience. The agent can read the file, attach it to a record or use it as context. The rollout starts the week of 21 September 2026.

The upload mode in the agent's configuration controls this. The guide names four values: `auto` (the default), `managed`, `disabled` and `error`. In managed mode, uploaded files land in the system variable `uploaded_files`, and your agent logic decides what to do with them. The guide does not describe what auto does with a file in detail; I would test that in a sandbox before relying on it.

For manufacturers the photo of the type plate is the obvious case. The customer does not know the serial number but can take a picture of it. I would choose managed for this: the logic checks whether an image arrived, has the serial number read, matches it against the asset in Salesforce and asks again if it does not fit. Only then does the agent look for spare parts. The same logic attaches a photo of damage to the case, so the technician sees it before the visit.

I would clarify two things before go-live. First the [rate limits](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.miaw_rate_limits.htm): 12 files per conversation and minute. Second, what happens to the images. A photo from the shop floor sometimes shows more than the type plate, such as people or other equipment. Where the file is stored and when it is deleted belongs in the data protection concept before the first customer sends a picture. How to protect inputs in the dealer portal is covered in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

## What does token streaming bring, and what is the catch?

With **token streaming** the agent's answer appears word by word instead of as a whole block after a few seconds of waiting. Salesforce lists it on the [v2 overview page](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&language=en_US&type=5) as one of the agentic features. For the customer the chat feels faster, even if the answer takes just as long.

The catch is in the [Messaging API documentation](https://developer.salesforce.com/docs/service/messaging-api/references/about/server-sent-events-payloads-token-streaming.html): the Trust Layer can only check an answer for hallucinations once it is complete. If the check fails, Salesforce sends a validation signal with the reason "UNGROUNDED", and the client can remove the text it has already streamed. Another set of tokens may follow.

```hinweis achtung
A customer can read a streamed answer before the Trust Layer has rejected it. For prices, delivery dates and safety instructions I would therefore deliver the answer as a card from an action instead of as streamed free text.
```

If you build your own client on the Messaging API, you implement streaming yourself from CapabilitiesVersion 63: tokens carry an increasing `sequenceNumber`, can arrive out of order and must be sorted. For the standard v2 client the API documentation gives no details on this. What else the Trust Layer checks and masks is in [Einstein Trust Layer: what it protects](../einstein-trust-layer-what-it-protects/).

## What I saw in the project

**[Placeholder, waiting for Fabian]** An anonymised example from Fabian's Enhanced Chat v2 project goes here: which answers were built as cards, whether customers could send photos and whether streaming was on. Until he confirms it, the article stays a draft.

## Where should you start?

I would go in this order:

1. Count the three most frequent questions your service gets by phone and email. If one of them is structured, such as order status or a spare part, it becomes the first card.
2. Build and test the action behind it without a card first. Once it returns the right data, the Lightning Type is the smaller step.
3. Choose the upload mode on purpose and clear it with data protection, instead of simply leaving auto in place.
4. Only switch on streaming once it is clear which answers go through cards and which may stream as free text.

If you use the time selector or forms in v1 today, check this gap before the switch. The frame for it is the [Salesforce architecture](../../services/salesforce-architecture/), where agent, actions and data sources come together.

A good card in the chat starts with clean data from ERP and PLM; the interface is the smaller part after that.
