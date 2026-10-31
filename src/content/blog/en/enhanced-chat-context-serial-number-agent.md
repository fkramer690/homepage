---
title: "Enhanced Chat context: serial number, page and search"
description: "How hidden pre-chat and context events in Enhanced Chat v2 pass serial number, dealer number, page and search to your Agentforce agent, and where they stop."
pubDate: 2026-10-31
lang: en
slug: enhanced-chat-context-serial-number-agent
translationKey: enhanced-chat-context
topic: ai
categories: [ai, architecture]
tags: [Enhanced Chat, Agentforce, Pre-Chat, Context Events, Serial number, Dealer portal]
series: { id: enhanced-chat, part: 6 }
takeaways:
  - "Hidden pre-chat passes fixed values such as serial number or dealer number once before the conversation begins; channel parameters and an Omni-Channel flow carry them to the Messaging Session and the agent."
  - "Context events exist only in Enhanced Chat v2: utilAPI.setSessionContext sends the current page and the latest search, and the agent reads this context again with every message."
  - "The context event schema is fixed to currentPage and search, so a serial number gets no field of its own there; it comes through pre-chat or sits in the page URL."
  - "Only pre-chat values count for the agent's welcome message; the agent uses context events from the customer's first message onwards."
  - "Everything the browser sends can be changed by the visitor; serial number and page are hints for the agent, while a dealer's identity comes from user verification."
faq:
  - q: "What is hidden pre-chat in Enhanced Chat?"
    a: "Hidden pre-chat fields are values your website sends to Salesforce through JavaScript without showing them to the customer. There are only custom fields, all of type text, and they must be set before the conversation begins."
  - q: "What are context events in Enhanced Chat v2?"
    a: "Context events use utilAPI.setSessionContext to pass the visitor's current page and latest search to the Agentforce agent. The agent reads the context with every message; the method is only available in Enhanced Chat v2."
  - q: "Can I send custom fields such as the serial number through context events?"
    a: "No. Salesforce requires exactly the documented schema with currentPage and search. Send a serial number as a hidden pre-chat field, or build the page URL so it contains the machine."
  - q: "Why does the welcome message ignore my page context?"
    a: "Salesforce states that context from context events is not used for the welcome message. If the agent should name the machine in its greeting, the value has to come through hidden pre-chat."
draft: true
---

An Agentforce agent in Enhanced Chat only knows which machine the customer means if your website tells it. There are two ways, with different timing. Hidden pre-chat passes fixed values such as serial number or dealer number before the conversation begins; they travel through channel parameters and an Omni-Channel flow to the Messaging Session and on to the agent as a context variable. Context events, available only in Enhanced Chat v2, send the current page and the latest search with every message. My rule: what stays the same during the conversation goes through pre-chat, what changes goes through a context event. Neither replaces a login.

## Why does the agent ask for the serial number first?

Without context the agent only has the text the customer types. A service technician is in the spare parts catalogue of your portal, on the page of one machine, opens the chat and asks: "Which filter fits?" The agent has to ask back which machine this is about. The technician looks for the type plate, types the serial number and may get a digit wrong. That page knew the answer all along.

Context also decides routing. The Omni-Channel flow that hands a conversation to the agent or a queue can only branch on values it receives. A dealer with a dealer number should be treated differently from an anonymous website visitor. How agent, queue and handover to people work together is part 5 of this series; this part is about how the values reach Salesforce in the first place.

The agent itself needs the serial number so its action finds the right parts. Which data has to come from PLM, ERP and the installed base for that is covered in [spare parts by serial number](../spare-parts-by-serial-number-ai/). This article covers the step before: how does the number get from the web page into the agent's variable?

## What is the difference between hidden pre-chat and context events?

**Hidden pre-chat** fields are values your website sends to Salesforce through JavaScript without the customer seeing them. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/messaging-optimization-for-in-app-and-web/collect-information-to-help-end-users) there are no standard hidden fields, only custom ones, and all of them are text fields. The website calls [`prechatAPI.setHiddenPrechatFields`](https://developer.salesforce.com/docs/service/messaging-web/references/m4w-reference/prechatAPI.html), which according to the reference "must be called after the onEmbeddedMessagingReady event is dispatched and before the conversation begins". After that the value is fixed for this conversation.

**Context events** are new in Enhanced Chat v2. With [`utilAPI.setSessionContext`](https://developer.salesforce.com/docs/service/messaging-web/guide/context-events.html) the website sends an object called `_AgentContext` with exactly two parts: `currentPage`, the URL of the page, and `search` with search result, filters and facets. Salesforce says the input must follow the exact schema of its example. The agent reads this context again with every customer message, so the website can update it on every page change.

```tabelle
title: Hidden pre-chat and context events compared
columns: | Hidden pre-chat | Context events
Version | Enhanced Chat v1 and v2 | Enhanced Chat v2 only *
Timing | once, before the conversation begins | again with every message *
Fields | custom text fields, any name * | only currentPage and search
Path into Salesforce | channel parameter, flow, Messaging Session | variables in Agentforce Builder
Welcome message | used * | not used
Typical values | serial number, dealer number, portal | product page, spare parts search
note: Based on the Salesforce documentation as of 31 October 2026.
```

One restriction is easy to miss. Salesforce states that context from context events isn't used for the welcome message; pre-chat variables are there for that. If the agent should open with "You are asking about the machine with serial number …", the number has to come through hidden pre-chat.

## How does the serial number reach the agent?

A hidden pre-chat value passes several stations on its way, and at each one the name can be misspelt.

```kette
title: The path of a serial number from the page to the agent
Website | setHiddenPrechatFields with the key Serial_Number
Messaging channel | custom parameter, channel variable name Serial_Number
Parameter mapping | flow variable input_SerialNumber
Omni-Channel flow | Update Records writes to the field Serial_Number__c
Messaging Session | custom field Serial_Number__c
Agentforce Builder | field on the Context tab as Messaging Session variable
note: Example names. The same name has to appear in the JavaScript and on the channel.
```

The key in the JavaScript has to match the channel variable name of the parameter on the messaging channel. The parameter mapping turns it into a flow variable. The Omni-Channel flow writes the value with an Update Records element into a custom field on the Messaging Session; Trailhead shows this with `Order_Number` and `Order_Number__c`. On the way, the flow turns every pre-chat value into text. Finally, according to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=experience.support_context_passing_framework_variables.htm), you add the field in Agentforce Builder on the Context tab under Messaging Session Variables. Only then can the agent map it to action inputs and use it in instructions. If the agent is active, you have to deactivate it for this change.

Context events take a shorter path. You create four variables in Agentforce Builder (`currentPage`, `search_result`, `search_filters`, `search_facets`) and allow API write access on each. The website calls `setSessionContext`, or `sendTextMessage`, which sends context and message in one call so the context is already there for exactly that message.

```vertiefung For developers
title: What the website calls and when
- Both calls only after the `onEmbeddedMessagingReady` event; register the listener before `embeddedservice_bootstrap.init`.
- Hidden pre-chat: `embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({ "Serial_Number": "…" })`, removed again with `removeHiddenPrechatFields([...])`, both before the conversation begins.
- Context events: `embeddedservice_bootstrap.utilAPI.setSessionContext([{ name: "_AgentContext", value: { valueType: "StructuredValue", value: { currentPage: "…", search: { result: "…", filters: [], facets: [] } } } }])`, with `then`, `catch` and `finally` for success, error and cleanup.
- Don't call context events in `initEmbeddedMessaging`. On Experience Cloud sites the code goes into the site's head markup.
- Salesforce documents no lengths, call counts or payload sizes for either path. I would try them in a test before the website relies on them.

Sources: [Hidden pre-chat](https://developer.salesforce.com/docs/service/messaging-web/guide/pre-chat.html), [Context events](https://developer.salesforce.com/docs/service/messaging-web/guide/context-events.html)
```

## Which values belong in pre-chat and which in context?

For a manufacturer I sort the values by one question: does the value change while the customer is chatting?

Hidden pre-chat carries the values that are fixed for the conversation. The dealer or customer number from the portal, which portal or website the chat starts from, and the serial number when the customer opens the chat on the page of one specific machine. Language belongs here too; it has its own standard variable, `EndUserLanguage`, as described in [multilingual agents for export markets](../multilingual-agentforce-agents-export-dealers/).

Context events carry the values that change with every click. The page the customer is on right now, for example the product page of a machine series or a spare parts list. And the search in the parts catalogue with search term, filters such as series or year of manufacture, and facets.

It gets difficult when the customer switches machines during the conversation. The serial number from pre-chat is then out of date, and context events have no field for a serial number. My approach would be to build the portal URLs so they contain the machine, for example with the asset ID in the path. Then the new machine is in `currentPage`, and the agent's action reads it from there. This is a design I would test before building it, not a documented feature.

Another open point for me is what a resumed conversation does with pre-chat values. Enhanced Chat keeps conversations across days and devices, and v2 only offers the pre-chat setting "Every Conversation". Whether a dealer who comes back after a week still carries the serial number from the first visit is not described in the documentation. It belongs in every test plan.

**[Placeholder practice example, waiting for Fabian]** Which values were passed through hidden pre-chat in the Enhanced Chat project, were context events used, and where did a value get lost on the way?

## Can the agent trust values from the browser?

Not as proof. Hidden pre-chat and context events come from JavaScript in the visitor's browser, and any visitor can change them with the browser's developer tools.

```hinweis achtung
A dealer number from hidden pre-chat is a claim made by the browser. If actions filter orders, prices or warranty claims by that number, a visitor with a changed number sees another dealer's data. Identity comes from user verification (part 4 of this series); treat pre-chat values as hints only.
```

A changed serial number does no harm as long as the action only shows matching parts from the public catalogue. It becomes dangerous for anything that belongs to one specific customer. The same principle applies as for the [Agent API in your own dealer apps](../agentforce-agent-api-dealer-apps/): the action filters in logic by a verified identity, never by what is in the chat or the context.

The search field is a second issue. `search.result` and the search term are text the visitor writes, and the agent reads it with every message. That makes the search field an entry point for hidden instructions, as I described for [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/). I would only pass values the website generates itself, such as filters and facets from fixed lists, and shorten or drop the free search term.

## Where should you start?

Run ten test conversations without context and write down what the agent asks first. Each of these questions is a candidate for hidden pre-chat or context events. Fix the names once and use them in the JavaScript, on the channel, in the flow and on the Messaging Session field. These names belong in the [architecture documentation](../../services/salesforce-architecture/), not only in the code. Then change every value in the browser during testing and check what the agent shows.

Context saves the customer the first question back; security still comes from the login.
