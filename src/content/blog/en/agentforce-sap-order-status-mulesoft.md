---
title: "Agentforce and SAP: order status through MuleSoft"
description: "How an Agentforce agent answers order status and availability from SAP S/4HANA through MuleSoft and API Catalog, and which checks must stay deterministic."
pubDate: 2026-10-27
lang: en
slug: agentforce-sap-order-status-mulesoft
translationKey: agentforce-sap-order-status
topic: ai
tags: [agentforce, sap, mulesoft, integration, manufacturing, dealer service]
takeaways:
  - "An Agentforce agent reads order status from SAP S/4HANA through an API: a MuleSoft API enabled in Topic Center, published to Exchange and synced into API Catalog becomes an agent action."
  - "MuleSoft's documentation says topic instructions are nondeterministic and should not contain business rules; which dealer may see which order belongs in the API and in code."
  - "Availability comes from the availability check in SAP; the agent passes on the confirmed date and never estimates one from stock figures or lead times."
  - "A narrow agent API with three operations and precomputed fields such as overall status and next confirmed date gives more stable answers than generic OData services."
  - "Give the agent its own client application in API Manager, so a rate limit per contract stops a looping agent before it slows down the dealer portal."
faq:
  - q: "Can Agentforce read order status from SAP S/4HANA?"
    a: "Yes, through an API. The documented route runs through MuleSoft: the SAP S/4HANA OData Connector reads the OData APIs of S/4HANA Cloud or on-premise, and the Mule API becomes an agent action through Topic Center and API Catalog."
  - q: "Do I need MuleSoft to connect Agentforce to SAP?"
    a: "No. An External Service action works with any REST API that has an OpenAPI description and a named credential. MuleSoft adds the SAP connector, governance rulesets and gateway policies such as rate limits, which pays off when it is already in use."
  - q: "Which checks should not be left to the LLM?"
    a: "Which dealer may see which order, the availability check and confirmed dates, credit and delivery blocks, and every write action such as changing a delivery date. These run in SAP, in the API or in Agent Script; the model understands the question and words the answer."
  - q: "Should an Agentforce agent use MCP instead of an API action?"
    a: "For Agentforce itself the API Catalog action is the documented path. MuleSoft can turn the same API into an MCP server, which matters when external agents should use it. Check the current status of Agentforce's native MCP client before building a production agent on it."
  - q: "What happens when SAP is not reachable?"
    a: "The action fails. The agent must say so and offer a callback or a handover instead of answering from old data, and this case belongs in the test set before go-live."
draft: false
---

An Agentforce agent answers order status and availability from SAP S/4HANA by calling an API at the moment the dealer asks. The documented route runs through MuleSoft: a Mule API reads S/4HANA, is enabled for agent topics and actions in Topic Center, published to Exchange and synced into API Catalog in Salesforce, where it becomes an agent action. Everything with a right answer stays deterministic: which dealer may see which order, the availability check, the confirmed date. Those live in SAP and in the API. The model understands the question and words the answer.

## How does an Agentforce agent get the order status from SAP?

Through a chain of five links, and each link needs an owner. The [Salesforce Developers blog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) describes the order: define topics, actions and instructions in Topic Center while you design the API, build it, publish it to Anypoint Exchange and sync it with API Catalog. Named Credentials and External Services are then created automatically, and the agent calls the API as an action. Flow and Apex can call the same API.

For a machine builder the chain looks like this:

1. **SAP S/4HANA** holds sales orders, schedule lines, deliveries and the availability check. The [MuleSoft SAP S/4HANA OData Connector](https://docs.mulesoft.com/sap-s4hana-cloud-connector/latest/) supports the OData APIs of S/4HANA Cloud and on-premise and can query entities, invoke remote functions and run batch requests. On the SAP side it needs a communication user assigned to the communication arrangements for exactly the APIs you want to expose.
2. **A Mule API** turns these OData services into a few operations an agent can use.
3. **Topic Center** marks operations as agent actions in the OpenAPI spec. According to [MuleSoft's documentation](https://docs.mulesoft.com/anypoint-code-builder/ai-enabling-api-project-topic-center), only OAS 3.0 and 3.1 are supported, and agent metadata cannot sit in a schema defined with `$ref`.
4. **API Catalog** in Salesforce receives the API once an active API instance exists in API Manager. In Salesforce's [Agentforce workshop](https://developer.salesforce.com/workshops/agentforce-workshop/mulesoft/3-explore-api-catalog) you then activate the actions and grant them to users through a permission set.
5. **The agent** gets the topic and its actions in Agent Builder.

Two prerequisites tend to surprise teams: a tenant relationship between the Anypoint organisation and a Salesforce org with agent entitlements, and API Catalog enabled in that org. If MuleSoft and Salesforce contracts sit with different departments, sort this out before the first sprint.

I have not found an official Salesforce reference architecture for Agentforce with S/4HANA, only this generic MuleSoft pattern. So your partner's design is the architecture, and someone on your side should review it.

Without MuleSoft, an [External Service action](https://developer.salesforce.com/blogs/2025/05/call-third-party-apis-from-an-agent-with-external-service-actions) on an OpenAPI document and a named credential is the alternative, for example behind another middleware; Salesforce caps the spec upload at 10 MB. MuleSoft adds the SAP connector, governance rulesets and gateway policies. If it already runs in your company, I would use it. Buying it for one agent rarely pays off. Which middleware fits is part of [Salesforce integration](../../services/salesforce-integration/).

## Which API design makes the agent reliable?

The API an agent calls should be narrower than the API a developer calls. A generic sales order service returns far more than a dealer needs, including internal plant data. Give a model all of that and it will talk about it.

I would design three operations for a dealer agent:

- **Order status** by SAP order number or the dealer's purchase order number: overall status, items with open quantity, the next confirmed date, a tracking number once shipped.
- **Delivery dates** per item, with only the confirmed date and partial deliveries listed separately.
- **Availability** for material, quantity and desired date: yes or no plus the earliest confirmed date from the SAP availability check. No stock figure, because stock levels are commercial information dealers do not need.

The MuleSoft flags decide what the agent may do with each field. `x-sfdc/agent/action/publishAsAgentAction` makes an operation an action, `isUserInput` marks what the agent asks the dealer for, `isDisplayable` marks what it may show, and `x-sfdc/privacy/isPii` switches on the PII service for an operation. The External Services blog adds that action and parameter descriptions are taken from the spec. Good descriptions in the OpenAPI document are prompt engineering done once, in a reviewed file.

Precompute what dealers ask most. "Overall status" and "next confirmed date" should be fields the API calculates, not conclusions the model draws from ten schedule lines.

## What stays deterministic?

MuleSoft's own Topic Center documentation says instructions "are nondeterministic, so they shouldn't include sensitive or deterministic business rules". I would put that sentence on the first page of every agent design. For order status it covers four things.

**Who may see which order.** This is the biggest risk. A dealer logged into the portal is a contact on an account, and the account carries the SAP sold-to number. That number must reach the API from the session, set by code, never from the chat. The API returns an order only if the sold-to matches and otherwise answers "not found", exactly as for an order that does not exist. If the model passes order number and customer number, dealer A reads dealer B's order by typing a number. Email enquiries are weaker still, because a sender address proves little; more in [prompt injection through dealer portals](../prompt-injection-dealer-portals-agentforce/).

**Availability and dates.** SAP runs the availability check. The agent passes on the confirmed date and never estimates one from stock or lead times. If SAP has no confirmed date, the answer is "not confirmed yet".

**Blocks.** Credit and delivery blocks are SAP decisions. Whether a dealer hears about a credit block or gets "please contact your sales rep" is a business decision that belongs in the API response, not in the prompt.

**Write actions.** Changing a delivery date or placing an order is a second phase, with gates as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/). For the first release I would keep the agent read-only.

## A typical scenario: order status for 400 dealers

Assume a machine builder with S/4HANA on-premise, 400 dealers in Europe, a dealer portal on Experience Cloud and MuleSoft already serving the portal's order list. All numbers here are assumptions.

Assume 2,000 order enquiries a month, each with up to three API calls: order status, delivery dates, availability of one replacement item. That is about 6,000 calls a month, roughly 300 per working day. SAP will not notice. A bug that makes the agent call the API in a loop will. MuleSoft's [Rate-Limiting SLA policy](https://docs.mulesoft.com/mule-gateway/policies-included-rate-limiting-sla) sets limits per client application through contracts in API Manager and answers with HTTP 429 once the quota is used up. So the agent gets its own client application with its own limit, assume 60 requests a minute, separate from the portal. A looping agent hits its own ceiling, and dealers in the portal keep working.

Three findings typically show up in the first test week. Orders taken by phone carry no dealer purchase order number, so the agent must also search by SAP order number. Some dealers have several sold-to numbers for subsidiaries, so the account needs a mapping that someone maintains, the same problem as with [sales agreements and ERP actuals](../sales-agreements-volume-shortfall-erp/). And one plant does not maintain confirmed dates for spare parts, so for those items the agent can only say "not confirmed yet". That is a data problem, and no prompt fixes it.

What a conversation costs in Flex Credits is calculated in [the dealer service agent cost calculation](../dealer-service-agent-cost-calculation/).

## Live call or a copy in Salesforce?

The agent should call SAP live. The dealer asks about today, and a nightly copy shows yesterday. The price is a dependency: during an SAP maintenance window the action fails. The agent must then say so and offer a callback or a handover, and that case belongs in the test set, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).

A copy still has its place, for example van stock that technicians need offline, as in [spare parts between ERP and Field Service](../salesforce-field-service-spare-parts-erp/). I would not let the agent present dates from such a copy as current.

MuleSoft can also turn the same API into an MCP server: [Agent Fabric](https://docs.mulesoft.com/general/agent-fabric-overview) describes an MCP Bridge that does this without custom code and keeps the existing gateway policies. That matters when external agents such as Claude should reach the API. For Agentforce itself the API Catalog action is the documented path. Salesforce announced a native MCP client for Agentforce as a [pilot with the July 2025 release](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce); I would check its current status before building a production agent on it. What MCP means for an IT lead is in [MCP explained for IT leads](../mcp-salesforce-explained-for-it-leads/).

## Where should you start?

1. **Check the API.** Is there a Mule API or another REST API for sales orders, and does it return confirmed dates per item?
2. **Fix identity first.** Every dealer account needs the right sold-to numbers, maintained by a named person.
3. **Design the agent API** with three operations and precomputed fields, reviewed by sales and IT together.
4. **Separate client applications** for agent and portal, each with its own rate limit.
5. **Test the unhappy paths:** someone else's order number, a missing confirmed date, SAP offline.

If your ERP has no API at all, see [legacy ERP without an API](../legacy-erp-without-api-ai-agents/); whether the process is ready for an agent at all, see [Agentforce for manufacturers: start now or wait](../agentforce-yes-or-no-manufacturers/).

An agent that reads order status from SAP is mostly an integration project with a language model on top. If you want a second opinion on the API design or the access rules, [send me a message](#contact).
