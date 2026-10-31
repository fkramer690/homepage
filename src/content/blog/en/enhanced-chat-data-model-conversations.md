---
title: "Enhanced Chat data model: where conversations live"
description: "Which Salesforce Enhanced Chat data sits in your org, why the messages are stored off platform and what your service team can and cannot report on."
pubDate: 2026-10-31
lang: en
slug: enhanced-chat-data-model-conversations
translationKey: enhanced-chat-data-model
topic: service
categories: [architecture, ai]
tags: [Enhanced Chat, Messaging for In-App and Web, data model, reporting, Data Cloud, GDPR]
series: { id: enhanced-chat, part: 3 }
takeaways:
  - "In Enhanced Chat, the session, the customer, the participants and the metrics are normal records in your org; the individual messages (ConversationEntry) are stored off platform in a separate Salesforce database."
  - "Off-platform objects are not in Object Manager, cannot be queried with SOQL and appear in no standard report, so reports show how many and how fast, but not what was written."
  - "You reach the message content through the Conversation Data API, a sync to Data Cloud or the bulk export tool, which runs at most once every seven days."
  - "Whatever service wants to analyse later, such as serial number, machine type or request type, belongs in a field on the messaging session or the case before the chat goes live."
  - "Deletion works through Flow or Apex with the Conversation Service API; retention period and storage region of the off-platform data are not in the documentation, so get both confirmed in writing."
faq:
  - q: "Where does Salesforce store Enhanced Chat messages?"
    a: "According to Salesforce, the individual messages (ConversationEntry) are stored off platform in a separate database built for messaging. Session, customer and metrics are normal records in the org."
  - q: "Can I report on Enhanced Chat transcripts in Salesforce reports?"
    a: "Not with standard reports. Messaging Session, Messaging Session Metrics and AgentWork are reportable; for the content you need the Conversation Data API, Data Cloud or the bulk export."
  - q: "Does Enhanced Chat v2 change the data model?"
    a: "No. Salesforce describes v2 as a new client for the same messaging channel, so sessions end up in the same objects as with v1."
  - q: "How do I delete a customer's Enhanced Chat data?"
    a: "With the Conversation Service API actions in Flow or Apex: whole conversations by ID, or one participant with all their messaging data. Deletion runs asynchronously; you check completion in ConversationApiLog."
draft: true
---

In the Enhanced Chat data model, the session, the customer and the metrics are normal records in your Salesforce org; the messages are not. Every single message is a ConversationEntry, and Salesforce stores it off platform, in a separate database next to the org. For reporting this means you see how many chats there were, how fast agents answered and which case came out of it, but not what the dealer wrote. To analyse content you need the Conversation Data API, Data Cloud or the bulk export. This applies to Enhanced Chat v1 and v2 alike, and it should be decided before go-live.

This is part 3 of the series on Salesforce Enhanced Chat for manufacturers. Part 2 covers the move from legacy Chat, part 4 the verified dealers in a portal. This part answers the question that comes up in almost every service project after the first month: why are the chats not in my reports?

## How is the Enhanced Chat data model structured?

Enhanced Chat used to be called Messaging for In-App and Web (MIAW). Technically it is a messaging channel, and Salesforce's [Messaging Object Model](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model.html) describes the objects behind it. Seven of them cover daily work:

```tabelle
title: Enhanced Chat: which object lives where
columns: Object | What it is | Where it lives | Reports and SOQL
MessagingChannel | The channel, for example Enhanced Web Chat | In the org | Yes
MessagingEndUser | The customer on this channel, one record per channel | In the org | Yes
MessagingSession | One session with start, end, status and case | In the org | Yes *
MessagingSession­Metrics | Response times and message counts per session | In the org | Yes *
Conversation | Container for all sessions of one customer on the channel | In the org | Not in standard reports
ConversationEntry | Every single message or event | Off platform | No
note: Source: Salesforce Messaging Object Model and On-Platform vs. Off-Platform Messaging Objects, as of October 2026.
```

Add Participant and ConversationParticipant, which recognise a person or bot across conversations, and RelatedRecord, which links a message to a session or a call. RelatedRecord is off platform too.

Admins do most of their work on MessagingSession. That is where the case, the contact, the pre-chat fields and the status sit. Conversation lives in the org, but Salesforce states explicitly that it is not available in standard reports.

Enhanced Chat v2 changes none of this. Salesforce describes v2 as a new client for the same messaging channel. Whether a dealer writes in the v1 or the v2 window, the session ends up in the same objects. What v2 adds, Lightning Types, files sent to the agent and token streaming, ends up as a richer message in ConversationEntry, so off platform as well.

## Why are chat messages stored off platform?

Salesforce gives load as the reason: off-platform objects live in a "separate, purpose-built database" designed for the volume of real-time messaging. As an assumption: if every message were a record in the org, 3,000 chats a month with 30 messages each would add 90,000 records a month for chat alone.

The consequences are listed on [On-Platform vs. Off-Platform Messaging Objects](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model-on-off-platform.html): off-platform objects do not appear in Object Manager, cannot be queried with SOQL and cannot be reached through standard reports. My reading of that: no custom fields on a message, no validation and no Apex trigger that fires on a single message.

If you come from legacy Chat, you notice this straight away. There the transcript was a record in the org, and some reports were built right on top of it. Salesforce's [Trailhead module on the migration](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat) accordingly tells you to be prepared to replace your current reports with new ones. Even the description of the old ConversationEntry object in the Object Reference now applies only to legacy Chat, according to Salesforce.

## What can you report on in Enhanced Chat?

Everything in the org is reportable. For a head of service that means three sources:

- **MessagingSession:** chats per day, channel and status, waiting time until an agent accepts, linked cases and every field you write to the session from pre-chat or a flow.
- **MessagingSessionMetrics:** according to the [Object Reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_messagingsessionmetrics.htm), metrics such as average agent response time, available from API version 62.0 (October 2024), plus message counts per side.
- **AgentWork:** the Omni-Channel work assignment with handle time when a person takes over the chat.

What you cannot report on is the content: which machine, which spare part, which error message, what the Agentforce agent answered. How to read an agent's figures after go-live is covered in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/).

My conclusion: everything the head of service will want to count belongs in a field on the session or the case. Serial number and dealer number come in through hidden pre-chat fields; the request type is set by the agent or the service rep when closing. That is a data model decision that has to be made before go-live. Working out afterwards from transcripts how many requests concerned one product line is more expensive and less accurate.

```praxis
PLACEHOLDER, to be replaced with Fabian's experience: how was chat content analysed in the Enhanced Chat project (fields on session or case, Data Cloud, export, not at all)? Which question from the head of service could standard reports not answer?
```

## How do you get to the chat content?

On [Access Conversation Data](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model-access-data.html) Salesforce names three ways. Which one fits depends on whether you need single conversations or all of them.

```tabelle
title: Three ways to the chat messages
columns: Way | What for | Limits
Conversation Data API (GET) | Single conversations in near real time, with bot messages and rich content * | 90 requests per user per minute
Data Cloud sync | All conversations as a data stream for analysis | Up to one hour delay
Bulk export tool | Archive and compliance, all data from the start | At most once every seven days
note: The older Connect REST API for conversation entries returns text only, without bot messages. Salesforce recommends the GET API for new integrations.
```

**Conversation Data API.** For an integration that attaches a transcript to a case or hands it to a ticket system, this is the way. Salesforce "strongly" recommends it for all new integrations. It fetches one conversation at a time, which is too slow for analysis at scale.

**Data Cloud.** For the question "what do our dealers chat about" you need all conversations at once. Salesforce recommends the sync to Data Cloud for that, with a delay of up to an hour and, according to Salesforce, at no extra cost for most customers. If you run Agentforce in the chat, Data Cloud is usually set up already.

**Bulk export.** Exports all conversation data from the start and runs at most once every seven days. Salesforce positions it for archiving and compliance. It does not work as a regular feed into a data warehouse.

```vertiefung For developers
title: How the APIs differ in detail
- The Conversation Data API needs an External Client App with the client credentials flow, the sfap_api scope and a run-as user with API Only User; Conversation Service API must be switched on in Setup.
- The older Connect REST API for conversation entries allows 1,000 calls per application, user and hour by default. Every call marks the conversation as active and counts against the org's limit of simultaneously active conversations.
- Voice calls: entries are linked to the VoiceCall only after the call ends and cannot be retrieved before.
```

## How do you delete chat data under GDPR?

A dealer asks for their data to be deleted, and their messages sit in a database you cannot see in Setup. For this Salesforce offers two actions in the [Conversation Data API](https://developer.salesforce.com/docs/service/conversation-data-api/guide/delete-with-flow-and-apex.html) that you call from Flow or Apex:

- **Delete Conversations By Id** deletes one or more conversations with their data.
- **Delete Conversation Participants By Participant Entity Id** deletes a messaging end user with all of their messaging data.

Flow takes up to 50 IDs per call. Both actions run asynchronously: when the call returns, nothing is deleted yet. You only see completion in the ConversationApiLog records. If the customer still has an open session, the deletion fails unless you set the parameter that closes open sessions first. The actions only appear in Flow Builder once Conversation Service API is switched on in Setup.

I would build this as a fixed part of the deletion process, not as manual work per request. If your privacy process deletes contacts and cases today, it otherwise misses exactly the part with the content.

```hinweis offen
How long Salesforce keeps the off-platform messages and in which region they are stored is not stated on any of the developer pages I read. Get both confirmed in writing for your org before your data protection officer approves the chat.
```

For the region question, see the article on [EU data residency for Agentforce](../agentforce-eu-data-residency-models/), because a chat with an agent touches both topics.

## Where should you start?

Before the first dealer chats, I clarify three questions with the head of service and data protection:

1. **Which questions should reporting answer?** Every question that needs content (product line, spare part, fault pattern) becomes a field on MessagingSession or Case, plus a rule for who fills it.
2. **Do we need the content in bulk?** If yes, plan the Data Cloud sync and check whether it comes at no extra cost in your org. If you only need single conversations, the GET API is enough.
3. **How do we delete, and how long do we keep data?** Build the deletion flow with the two actions, and clarify retention and region in writing.

If you record these decisions early in the [Salesforce architecture target picture](../../services/salesforce-architecture/), you do not have to rebuild reports after go-live. In short: in Enhanced Chat the conversation lives next to the org, and everything you want to count has to be a field in the org first.
