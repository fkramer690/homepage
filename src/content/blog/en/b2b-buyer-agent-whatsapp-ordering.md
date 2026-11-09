---
title: "B2B Buyer Agent: ordering through WhatsApp and SMS"
description: "What the Salesforce B2B Buyer Agent does for dealers today on web chat, WhatsApp and SMS, what Carter for Buyers adds, which meters apply and where prices come from."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-buyer-agent-whatsapp-ordering
translationKey: commerce-buyer-agent-whatsapp
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Buyer Agent, Agentforce, WhatsApp, dealers, reorder]
takeaways:
  - "The current template is called Agentforce for Guided Shopping - B2B; its subagents cover verification, product search and details, cart, orders and accounts."
  - "Enhanced WhatsApp and SMS are documented channels, inbound only. Ordering with payment in the chat is planned as Carter for Buyers, GA listed for January 2027."
  - "Salesforce bills the agent by consumption: messaging conversations in 24-hour windows, Einstein Requests or Flex Credits, and Data 360 usage."
  - "Contract prices, discounts and credit decisions must come from the store's pricing or the ERP; the language model only phrases what those systems return."
  - "Start with order status and reorder for a pilot group on a store that already works, and treat every dealer message as untrusted input."
faq:
  - q: "What is the Salesforce B2B Buyer Agent?"
    a: "The Buyer Agent is an Agentforce agent for B2B Commerce stores. Built from the template Agentforce for Guided Shopping - B2B, it searches products, shows product details, manages the cart, shows order status, reorders past orders and lets a buyer switch between the accounts they may buy for."
  - q: "Can dealers order through WhatsApp with Salesforce B2B Commerce?"
    a: "Salesforce Help documents Enhanced WhatsApp and Enhanced SMS as channels for the guided shopping agent, for conversations the buyer starts. The full order in the chat, including confirmation and payment at contract price, is listed as Carter for Buyers with general availability planned for January 2027."
  - q: "Which licenses does the B2B Buyer Agent need?"
    a: "The Trailhead module lists Agentforce Commerce for B2B, Service Cloud or Sales and Service edition, Agentforce, Einstein for Service and Einstein generative AI with Data 360. The current Help pages do not repeat that list, so confirm the SKUs in the quote."
  - q: "What does the B2B Buyer Agent cost?"
    a: "Salesforce Help calls it consumption-based: each conversation window counts under Agentforce ASA Messaging, model calls use Einstein Requests or Flex Credits, and Data 360 usage counts too. I found no separate list price, so take the rates from your order form."
draft: false
---

With the B2B Buyer Agent, dealers can already search products, fill a cart, check order status and reorder past orders in a chat, also on WhatsApp or SMS. Closing the whole order there, including confirmation and payment at contract price, is planned as Carter for Buyers for January 2027. So I would start with order status and reorder for a pilot group of dealers and add the rest once the answers are reliable. It needs a working B2B store with correct buyer groups and prices, a budget for consumption, and systems that supply contract prices and credit decisions.

## What can the B2B Buyer Agent do today?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", has its own agent for buyers. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_agent_guided_shopping_create_agent.htm&language=en_US&type=5) you create it in Agentforce Studio from the template "Agentforce for Guided Shopping - B2B"; older Trailhead units still call it "Buyer Agent (B2B)". The template brings standard subagents. A subagent is a group of instructions and actions for one job:

- **Commerce Customer Verification:** verifies the user before the agent shows sensitive data such as orders.
- **Commerce Product Search Assistant** and **Commerce Product Details:** find products, suggest categories and show product details.
- **Commerce Cart Management:** adds products to the cart, for simple products only.
- **Commerce Order:** shows order status and order items and reorders by cloning a past order into the cart.
- **Commerce Effective Accounts:** lets a buyer switch between the accounts they may buy for.

You can add your own subagents, for example an escalation to inside sales or a flow that creates a purchase order. The agent runs as an agent user, and in Salesforce's words this user "determines what your Buyer Agent can access and do".

The [introduction unit on Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) lists the same core: product search by name, category or specification, an overview of past and current orders, reorders and order status from placement to delivery. Salesforce's [June 2026 blog post on B2B Commerce](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) lists the Buyer Agent in the section "B2B Commerce innovations (GA June 2026)" and calls it a 24/7 buying assistant.

For a manufacturer this means: the agent covers the questions inside sales answers most often by phone, "where is my order" and "same as last time". It does not replace a store. The standard actions ground product, entitlement and order answers in the store; custom actions that reach other systems need their own checks.

## WhatsApp and SMS today, Carter for Buyers planned for January 2027

Here the sources need careful reading. The June blog post says the Buyer Agent is "available wherever your buyer is (WhatsApp, SMS, and more)". The [Trailhead unit on connecting the agent to a channel](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/connect-a-guided-shopping-agent-to-a-channel) describes the setup through Messaging for In-App and Web: enable Omni-Channel, create a queue, build an Omni-Channel flow that routes to the Buyer Agent with a fallback queue, then create the messaging channel. The unit states that these steps do not apply to standard or enhanced WhatsApp and SMS channels.

The [considerations in Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_agent_guided_shopping_considerations.htm&language=en_US&type=5) list Enhanced WhatsApp, Enhanced SMS and other enhanced messaging channels for the guided shopping agent, with three limits that matter for dealers: the agent supports only conversations the buyer starts, WhatsApp messages over 4,096 characters and SMS over 912 characters (396 with special characters) are not delivered and get no answer, and each conversation window lasts 24 hours.

On the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/), Salesforce lists "Carter for Buyers" with "GA January 2027", a roadmap date that can still move. According to the description, the whole order then closes inside the chat: reorder, confirm and pay at contract pricing, in WhatsApp or SMS.

My reading: web chat, WhatsApp and SMS are documented today for search, cart, status and reorder, each channel with its own setup. The complete ordering flow with payment in the chat is planned for 2027. I would also clarify early with data protection and the works council whether orders may run through WhatsApp at all, and which phone numbers belong to which buyer account.

## Which licenses and meters does the Buyer Agent need?

The introduction unit on Trailhead names these prerequisites:

| Item | Requirement |
|---|---|
| Commerce license | Agentforce Commerce for B2B |
| Edition | Service Cloud or Sales & Service Edition: EE, UE or PXE |
| Add-on licenses | Agentforce and Einstein for Service |
| Platform | Einstein generative AI, set up together with Data 360 |

The current Help pages do not repeat this list, so I would have the SKUs confirmed in the quote, especially whether Service Cloud is really needed next to the store. The running cost is clearer: Salesforce Help calls the agent consumption-based. Each 24-hour conversation window counts under Agentforce ASA Messaging, model calls use Einstein Requests or Flex Credits, and Data 360 processing and storage count too. I found no separate list price, so the rates come from your order form and the volume from your dealer conversations. How such a calculation works for a dealer service agent is shown in [Agentforce costs for manufacturers](../flex-credits-agentforce-cost-per-action/).

## Contract prices and credit come from the store and the ERP

Carter for Buyers promises payment "at contract pricing". For a manufacturer the contract price is the most sensitive number in the whole chat. It must come from the store's pricing, never from the language model. Depending on the architecture, that pricing reads price books, contract-based or advanced pricing, or calls the ERP; the diagram shows one example.

```ablauf
sf: Buyer Agent, Store pricing, Order summaries
erp: ERP
ext: Dealer chat
Dealer chat --question--> Buyer Agent
Buyer Agent --price--> Store pricing
Store pricing --conditions--> ERP
Store pricing ..contract price..> Buyer Agent
Buyer Agent --status--> Order summaries
ERP ..keeps current..> Order summaries
Buyer Agent ..answer..> Dealer chat
```

The same applies to credit limits, blocked accounts and delivery dates. The model understands the dealer's question and phrases the answer. Which price applies, whether the account may order on credit and when the goods ship are decided by code, the store or the ERP. I explain the general rule for agents in the AI masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/), and how a confirmed delivery date comes from SAP in [Agentforce and SAP: order status through MuleSoft](../agentforce-sap-order-status-mulesoft/).

```hinweis achtung
If the store shows list prices because contract prices still live only in SAP conditions, the agent will also quote list prices. Settle the price master before the agent goes live.
```

## Dealer chat text is untrusted input

Every message a dealer types reaches the agent as text, and text can contain instructions. In a store chat the buyer is logged in. On WhatsApp or SMS the agent first has to know who is writing. The Commerce Customer Verification subagent is a building block for that, not a finished answer: decide how a phone number maps to a buyer, how long a verified session lasts and which actions need a fresh confirmation. After that, the buyer can switch accounts through Commerce Effective Accounts, so the list of accounts per buyer must be correct.

I would plan as if a filter misses an injected instruction one day, and make sure that this does little harm:

- The agent user may read only the store data the buyer may see, and a negative test proves that buyer A never sees the orders of buyer B.
- Actions that create orders or change data validate in code, not in the prompt.
- No outbound action sends data to an address a dealer can influence.

The attack patterns and defences are covered in [Prompt injection in dealer portals: protect Agentforce](../prompt-injection-dealer-portals-agentforce/).

## Worked example: pilot with 15 of 150 dealers

Assume a machine manufacturer sells spare parts and consumables to 150 dealers in Germany and Austria through a B2B store. Inside sales answers about 40 calls a day, most of them about order status or repeat orders of filters and wear parts.

In the pilot, 15 dealers with many repeat orders get the Buyer Agent in the store's web chat. Only two subagents do real work: Commerce Order for status and reorder, and Commerce Product Search Assistant. Order status comes from order summaries that the ERP keeps up to date. Escalation goes to a named inside sales queue. After four weeks, compare calls per pilot dealer with the months before, and read every conversation the agent escalated.

Only when these answers are reliable would I add a messaging channel such as WhatsApp, and only once Carter for Buyers is generally available would I let the agent close orders with payment. Fast reorders in the store itself are the topic of [reorders in B2B Commerce: templates, CSV, reorder](../b2b-commerce-reorder-order-templates/), and the back office side of agents in [Merchandising Agent: what it does for a parts catalog](../merchandising-agent-parts-catalog/).

## Check the store without an agent

1. **Check the store first.** Buyer groups, entitlements, prices and order status must be correct without an agent. An agent makes errors in this data visible faster, it does not fix them.
2. **Check licenses and meters.** Get the SKUs confirmed in the quote and estimate conversations, Einstein Requests or Flex Credits and Data 360 usage.
3. **Pick two jobs.** Order status and reorder, with a test set of real dealer questions and an escalation path.
4. **Decide the channel.** Web chat in the store first; WhatsApp and SMS after the questions of identity, data protection and support are answered.
5. **Write down what code decides.** Price, credit, delivery date and order creation stay in the store and the ERP.

The chapter [Agents, migration, rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) puts the Buyer Agent next to the store migration and the rollout to dealers. If the interfaces to your ERP are the open point, see [Salesforce integration](../../services/salesforce-integration/).
