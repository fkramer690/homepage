---
title: "Agentforce Agent API: agents in your own dealer apps"
description: "How your dealer app or machine portal calls an Agentforce agent through the Agent API, and what that means for identity, security and Flex Credit costs."
pubDate: 2026-10-27
lang: en
slug: agentforce-agent-api-dealer-apps
translationKey: agent-api-own-apps
topic: ai
categories: [architecture, ai]
contactBrief: integration
tags: [agentforce, agent api, dealer portal, security, flex credits, manufacturing]
takeaways:
  - "Your backend gets a token through the client credentials flow, opens a session and sends or streams messages to the agent."
  - "With client credentials every dealer reaches Salesforce as the same run-as user, so sharing no longer separates their orders."
  - "Set the dealer account through the API at session start and let the actions filter on it in logic, never on the chat text."
  - "Whether Agent API calls also count as Headless Platform Interactions, whose rate is still TBA, is not stated on any page I could open."
  - "For employees using Claude or ChatGPT, the agent fits better as a hosted MCP tool because it keeps their own user context."
faq:
  - q: "What is the Agentforce Agent API?"
    a: "A REST API that gives access to Agentforce agents from anywhere that can call REST. A client creates a session for an agent, sends messages synchronously or as a stream and ends the session when done."
  - q: "Which agents can be called through the Agent API?"
    a: "Salesforce documents one exclusion: agents of type Agentforce (Default) are not supported. I would build a dedicated agent for the external app anyway, with only the topics and actions that app needs."
  - q: "Do dealers in our own app need Salesforce licences to use the agent?"
    a: "The setup guide only requires one run-as user with at least API Only access, which suits the Salesforce Integration user licence. The guide says nothing about the people typing into your app, so I would get the licence position confirmed in writing."
  - q: "How long may an agent take to answer through the Agent API?"
    a: "The Agent API has a 120-second timeout and returns HTTP 500 when a call exceeds it. A session also handles one request at a time, so your app must wait for the answer before sending the next message."
  - q: "Can Claude or ChatGPT call our Agentforce agent instead of our own app?"
    a: "Yes, through a hosted MCP server that exposes the agent as a tool. Only agents built with the new Agent Script Builder qualify, and the agent then runs in the context of the signed-in Salesforce user."
draft: false
---

The Agentforce Agent API lets your own dealer app, machine portal or service app talk to an Agentforce agent over REST. Your backend gets a token through the client credentials flow, opens a session, sends messages and streams the answer to the screen. The hard part is identity. Every dealer in your app reaches Salesforce as one run-as user, so Salesforce sharing no longer keeps dealer A out of dealer B's orders. I would build this only when your backend authenticates dealers itself, passes their account as a fixed variable and the agent's actions filter on it.

## What does the Agent API do?

Salesforce describes the [Agent API](https://developer.salesforce.com/docs/einstein/genai/guide/agent-api.html) as access to Agentforce agents "from anywhere that can call a REST API". The listed use cases include websites, headless agents and agents calling other agents. For a machine builder that means the dealer app, the machine portal or a service partner's app can use the agent your service team uses inside Salesforce.

The setup is short: an External Client App, a run-as user and a token, then start a session, send messages, end the session.

```vertiefung For developers
title: What the setup guide asks for in detail
- An External Client App with OAuth scopes `api`, `refresh_token`, `offline_access`, `chatbot_api` and `sfap_api`, the client credentials flow and JWT-based access tokens.
- A Run As user with at least API Only access.
- A token from your My Domain, then calls to `api.salesforce.com/einstein/ai-agent/v1`: start a session for an agent ID, send messages, end the session with a `DELETE`.

Source: [Agent API Get Started](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html)
```

Messages go either synchronously or as a [server-sent event stream](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-examples.html) with text chunks. One event matters for your app team: on `ValidationFailureChunk` the client has to remove chunks it already displayed, so a dealer may see text appear and disappear.

Three limits from the [considerations](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-considerations.html) and [troubleshooting](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-troubleshooting.html) pages shape the architecture. Agents of type "Agentforce (Default)" are not supported. A call that runs longer than 120 seconds returns HTTP 500. A session handles one request at a time and answers a second one with HTTP 423. If an action fetches order data from SAP through middleware, that lookup has to come back well inside the 120 seconds, which is one more reason for the narrow ERP API I describe in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/).

## Who is the user when a dealer asks?

I would settle this before anyone writes code. With client credentials, the token belongs to the run-as user. The session flag `bypassUser` decides whether the agent runs as the agent-assigned user or as the user tied to the token. Either way it is one Salesforce identity for every dealer in your app.

Salesforce's own architects warn about this pattern for headless access. In a [Salesforce blog post of 19 May 2026](https://www.salesforce.com/blog/headless-trust-model-agentic-architecture/) on agents calling Salesforce, Miriam McCabe writes: "The client credentials flow would create a service account pattern where all calls run as one identity, losing per-user permissions and the audit trail." That post covers MCP clients with human users; the Agent API guide prescribes client credentials. Know which protection you give up.

What you give up is sharing as a dealer boundary. The run-as user needs read access to the orders, assets and warranty claims of all dealers, otherwise the agent cannot answer anyone. The boundary moves into two places you own:

- **Your backend.** It authenticates the dealer through your own login, maps the user to a Salesforce account ID and keeps the client secret. The secret never goes into a mobile app or a browser.
- **The agent's actions.** The backend passes the account ID when it starts the session. The [Agent API variables guide](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-variables.html) says many variables are read-only and can only be set at session start, and that a variable must allow "value to be set by API". Every action, a Flow or Apex class, then filters on that variable. The language model never decides which account a query uses.

The second point is where [Agent Script and deterministic rules](../agent-script-deterministic-rules/) earn their place. A dealer who types "show me the orders of account 4711" is attempting exactly the cross-dealer access you want to block, and a filter in logic stops it where an instruction in the prompt may not. The wider pattern is in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

Audit follows the same logic. Salesforce logs the run-as user, so it cannot tell you which dealer asked. The session start takes an `externalSessionKey`, a UUID that, according to the setup guide, you can use to trace the conversation in the agent's event logs. I would write that key next to the dealer's user ID in your app's log, so a question from your data protection officer can be answered from both sides.

For the run-as user I would use the [Salesforce Integration user licence](https://help.salesforce.com/s/articleView?language=en_US&id=platform.integration_user.htm&type=5) with its API-only profile and a permission set on top. Orgs get "a limited number" of these licences by default; the page gives no figure. One External Client App and one run-as user per external app keeps the damage small; token and IP controls are in [connected apps and OAuth for AI integrations](../connected-apps-oauth-ai-integrations/).

## Agent API, chat channel and hosted MCP compared

The Agent API is one of three ways out of Salesforce, and the one with the most work on your side.

| Path | Who talks to the agent | Identity | Fits |
|---|---|---|---|
| Agent API | your own app or backend | one run-as user | dealer app, machine portal, system to agent |
| Enhanced Chat v2 | visitors on a website | Salesforce channel | service agent on a website |
| Hosted MCP tool | Claude, ChatGPT, Slackbot | signed-in Salesforce user | employees with their own AI client |

Salesforce positions its [custom connections](https://developer.salesforce.com/docs/ai/agentforce/guide/custom-connections.html), which let your client render agent answers as cards or forms through the Agent API, for teams that "need to build a channel from the ground up", and points to Enhanced Chat v2 when an out-of-the-box channel is enough. If your dealers already log in to an Experience Cloud portal, that portal with its licences and sharing is often the simpler home for the agent; the trade-offs are in [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).

For employees the [hosted MCP page on agents](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/agentforce.html) describes the opposite model: the agent runs "in the authenticated user's context", with sharing and field-level security applied. Only agents built with the new Agent Script Builder qualify. The page states no release status; the [GA announcement of 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) still said "soon". The MCP decisions for IT leads are in [MCP explained for IT leads](../mcp-salesforce-explained-for-it-leads/).

## Worked example: dealer app and machine portal

Assume a machine builder with 250 dealers and its own dealer app for orders and spare parts, plus a portal where end customers see their installed machines. Both run on the company's own backend and login. All numbers here are assumptions.

The dealer app gets an agent for order status and open warranty claims, the machine portal one for "which spare parts kit fits my machine". The backend passes the dealer's account ID or the customer's asset IDs, and actions query only within them.

Assume 5,000 sessions a month with three actions each. At [20 Flex Credits per action](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) that is 300,000 credits a month, 3.6 million a year. At [$500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/) list price that is $1,500 a month for actions alone, prompts and Data 360 grounding on top. The year exceeds the 2.75 million Flex Credits that the [Max edition](https://www.salesforce.com/service/pricing/) includes per org per year, before your service team uses a single credit.

The test I would insist on before go-live: dealer A asks for an order number of dealer B in twenty phrasings. Every answer must be "not found".

## What does it cost, and what is still open?

The considerations page says Agent API usage "impacts credit consumption" and links to a Salesforce Help article on generative AI usage and billing, which did not render for me. So I calculate with the action rate above, and sandbox actions cost 16 credits instead of 20.

The open line is the Headless Platform Interaction meter. The rate card lists it as "TBA". According to [Salesforce Ben](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/), every successful call by a registered agent through MCP or direct API traffic classed as agentic will count, with 30 days' notice before metering starts.

```hinweis offen
Neither source says whether a call to the Agent API from your dealer app counts as a Headless Platform Interaction on top of the agent's actions. I would ask your account executive for that answer in writing.
```

How to budget a meter without a price is in [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

## Begin with one read-only use case such as order status

1. **Pick one read-only use case**, such as order status for dealers, and keep write actions for later.
2. **Design the identity chain first**: your login, account mapping, a session variable set by the API, actions that filter on it.
3. **One External Client App and one integration user per external app**, with a permission set built from the action list.
4. **Run the cross-dealer test in a sandbox** and repeat it with every new action.
5. **Log `externalSessionKey` with the dealer's user ID** in your app.
6. **Get the Headless Platform Interaction question answered** before you size the Flex Credit order.

For the cross-dealer test, two dealer accounts in a sandbox are enough: logged in as dealer A, you ask for the orders of dealer B. Interface and identity design is what I do under [Salesforce integration](../../services/salesforce-integration/); all interfaces side by side are in the masterclass chapter [MCP and interfaces](../../masterclass/ai-salesforce/mcp-and-interfaces/).
