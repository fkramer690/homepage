---
title: "B2B Buyer Agent: ordering through WhatsApp and SMS"
description: "What the Salesforce B2B Buyer Agent does for dealers today, what WhatsApp and SMS ordering needs, which licences apply and why prices must come from systems."
pubDate: 2026-10-28
lang: en
slug: b2b-buyer-agent-whatsapp-ordering
translationKey: commerce-buyer-agent-whatsapp
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Buyer Agent, Agentforce, WhatsApp, dealers, reorder]
takeaways:
  - "The Buyer Agent (B2B) template comes with five preconfigured subagents: product search, orders with status and reorder, account switching, user verification and global instructions."
  - "Salesforce names WhatsApp and SMS as channels; closing the whole order in the chat, including payment at contract price, is announced as Carter for Buyers for January 2027."
  - "Trailhead lists Agentforce Commerce for B2B, Service Cloud or Sales and Service edition, the Agentforce and Einstein for Service add-ons and Einstein generative AI with Data 360."
  - "Contract prices, discounts and credit decisions must come from the store's pricing or the ERP; the language model only phrases what those systems return."
  - "Start with order status and reorder for a pilot group on a store that already works, and treat every dealer message as untrusted input."
faq:
  - q: "What is the Salesforce B2B Buyer Agent?"
    a: "The Buyer Agent is an Agentforce agent for B2B Commerce stores. Built from the Buyer Agent (B2B) template, it searches products, shows order status and items, reorders past orders and lets a buyer switch between the accounts they may buy for."
  - q: "Can dealers order through WhatsApp with Salesforce B2B Commerce?"
    a: "Salesforce names WhatsApp and SMS as Buyer Agent channels in its June 2026 announcement. The full order in the chat, including confirmation and payment at contract price, is listed as Carter for Buyers with general availability in January 2027."
  - q: "Which licences does the B2B Buyer Agent need?"
    a: "Trailhead lists Agentforce Commerce for B2B, Service Cloud or Sales and Service edition (EE, UE or PXE), the add-ons Agentforce and Einstein for Service, and Einstein generative AI, which includes setting up Data 360."
  - q: "What does the B2B Buyer Agent cost?"
    a: "I found no separate price for the Buyer Agent on the official pages. The Agentforce add-on is a prerequisite, so ask how agent usage is counted in your contract and calculate it with your own number of dealer conversations."
draft: false
---

The B2B Buyer Agent lets dealers search products, check order status and reorder past orders in a chat, and Salesforce names WhatsApp and SMS as channels. Closing the whole order in the chat, including confirmation and payment at contract price, is dated January 2027 under the name Carter for Buyers. Before any of this helps, three things must be in place: a working B2B store with correct buyer groups and prices, the licences Trailhead lists, and systems that supply contract prices and credit decisions. I would start with order status and reorder for a pilot group of dealers and add the rest once the answers are reliable.

## What can the B2B Buyer Agent do today?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", has its own agent for buyers. In the [Trailhead unit on building a Buyer Agent](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/build-a-guided-shopping-ai-agent) you create it in Setup under Agents from the template "Buyer Agent (B2B)". The template brings five subagents. A subagent is a group of instructions and actions for one job:

- **Commerce Global Instructions:** rules for the whole agent, including the ID of the store it works for.
- **Commerce Product Search Assistant:** finds products and suggests categories, also when a search returns nothing.
- **Commerce Order:** shows order status and order items and reorders by cloning a past order.
- **Commerce Effective Accounts:** lets a buyer switch between the accounts they may buy for.
- **Commerce User Verification:** verifies the user before the agent shows sensitive data such as orders.

You can add your own subagents, for example an escalation to inside sales or a flow that creates a purchase order. The agent runs as an agent user, and in Salesforce's words this user "determines what your Buyer Agent can access and do".

The [introduction unit on Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) lists the same core: product search by name, category or specification, an overview of past and current orders, reorders and order status from placement to delivery. Salesforce's [June 2026 blog post on B2B Commerce](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) lists the Buyer Agent in the section "B2B Commerce innovations (GA June 2026)" and calls it a 24/7 buying assistant.

For a manufacturer this means: the agent covers the questions inside sales answers most often by phone, "where is my order" and "same as last time". It does not replace a store. Every answer comes from the catalogue, entitlements and orders the store already holds.

## WhatsApp and SMS: what is available when?

Here the sources need careful reading. The June blog post says the Buyer Agent is "available wherever your buyer is (WhatsApp, SMS, and more)". The [Trailhead unit on connecting the agent to a channel](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/connect-a-guided-shopping-agent-to-a-channel) describes the setup through Messaging for In-App and Web: enable Omni-Channel, create a queue, build an Omni-Channel flow that routes to the Buyer Agent with a fallback queue, then create the messaging channel. The unit states that these steps do not apply to standard or enhanced WhatsApp and SMS channels.

On the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/), Salesforce lists "Carter for Buyers" with "GA January 2027". According to the description, the whole order then closes inside the chat: reorder, confirm and pay at contract pricing, in WhatsApp or SMS.

My reading: web chat in the store is documented today. For WhatsApp and SMS, ask your account team which setup is supported for B2B in your org, and plan the complete ordering flow with payment for 2027. I would also clarify early with data protection and the works council whether orders may run through WhatsApp at all, and which phone numbers belong to which buyer account.

## Which licences does the Buyer Agent need?

The introduction unit on Trailhead names these prerequisites:

| Item | Requirement |
|---|---|
| Commerce licence | Agentforce Commerce for B2B |
| Edition | Service Cloud or Sales & Service Edition: EE, UE or PXE |
| Add-on licences | Agentforce and Einstein for Service |
| Platform | Einstein generative AI, set up together with Data 360 |

Two things stand out. First, the Buyer Agent needs Service Cloud, so a company that runs only Sales Cloud next to the store buys more than the agent. Second, I found no separate price for the Buyer Agent on the official pages. Usage runs on the Agentforce add-on, so the cost depends on your contract and your volume. How such a calculation works for a dealer service agent is shown in [Agentforce dealer service agent: cost per month](../dealer-service-agent-cost-calculation/).

## Why must contract prices and credit come from systems?

Carter for Buyers promises payment "at contract pricing". For a manufacturer the contract price is the most sensitive number in the whole chat. It must come from the store's pricing, which in turn reads price books or calls the ERP, never from the language model.

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

## Why is dealer chat text untrusted input?

Every message a dealer types reaches the agent as text, and text can contain instructions. In a store chat the buyer is logged in. On WhatsApp or SMS the agent first has to know who is writing, which is what the Commerce User Verification subagent is for. After that, the buyer can switch accounts through Commerce Effective Accounts, so the list of accounts per buyer must be correct.

I would plan as if a filter misses an injected instruction one day, and make sure that this does little harm:

- The agent user may read only the store data the buyer may see.
- Actions that create orders or change data validate in code, not in the prompt.
- No outbound action sends data to an address a dealer can influence.

The attack patterns and defences are covered in [Prompt injection in dealer portals: protect Agentforce](../prompt-injection-dealer-portals-agentforce/).

## What could a first pilot look like?

A typical scenario, as an assumption: a machine manufacturer sells spare parts and consumables to 150 dealers in Germany and Austria through a B2B store. Inside sales answers about 40 calls a day, most of them about order status or repeat orders of filters and wear parts.

In the pilot, 15 dealers with many repeat orders get the Buyer Agent in the store's web chat. Only two subagents do real work: Commerce Order for status and reorder, and Commerce Product Search Assistant. Order status comes from order summaries that the ERP keeps up to date. Escalation goes to a named inside sales queue. After four weeks, compare calls per pilot dealer with the months before, and read every conversation the agent escalated.

Only when these answers are reliable would I add a messaging channel such as WhatsApp, and only after Carter for Buyers is available would I let the agent close orders with payment. Fast reorders in the store itself are the topic of [reorders in B2B Commerce: templates, CSV, reorder](../b2b-commerce-reorder-order-templates/), and the back office side of agents in [Merchandising Agent: what it does for a parts catalog](../merchandising-agent-parts-catalog/).

## Where should you start?

1. **Check the store first.** Buyer groups, entitlements, prices and order status must be correct without an agent. An agent makes errors in this data visible faster, it does not fix them.
2. **Check the licences.** Service Cloud edition, Agentforce and Einstein for Service add-ons and Data 360 setup, as listed on Trailhead.
3. **Pick two jobs.** Order status and reorder, with a test set of real dealer questions and an escalation path.
4. **Decide the channel.** Web chat in the store first; WhatsApp and SMS after the questions of identity, data protection and support are answered.
5. **Write down what code decides.** Price, credit, delivery date and order creation stay in the store and the ERP.

The chapter [Agents, migration, rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) puts the Buyer Agent next to the store migration and the rollout to dealers. If the interfaces to your ERP are the open point, see [Salesforce integration](../../services/salesforce-integration/).

The Buyer Agent pays off once your store already gives dealers correct prices and order data, and WhatsApp is the last step, not the first. If you are planning it and want an independent view, [send me a message](#contact).
