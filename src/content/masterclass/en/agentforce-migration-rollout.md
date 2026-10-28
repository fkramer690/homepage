---
title: "B2B Commerce: agents, migration and rollout"
description: "Buyer Agent and Merchandising Agent in a B2B store, moving from Aura to LWR, rolling out to dealers in waves, KPIs and running the store after go-live."
lang: en
slug: agentforce-migration-rollout
course: b2b-commerce
translationKey: commerce-05
chapter: 5
pubDate: 2026-10-28
short: "Agents, migration, rollout"
summary: "Buyer Agent and Merchandising Agent, the path from Aura to LWR and rolling out to dealers in waves."
takeaways:
  - "Agents come after a store that works: the Buyer Agent answers dealer questions from the store's catalogue, prices and orders, so it only makes errors in that data visible faster."
  - "Salesforce lists the Buyer Agent as generally available since June 2026; the complete order in the chat with payment at contract price is dated January 2027 as Carter for Buyers."
  - "Contract prices, credit limits and delivery dates come from store pricing and the ERP, never from the language model, and every dealer message is untrusted input."
  - "There is no retirement date for Aura stores as of 27 October 2026. Migrate to LWR when features, growing Aura code or a new checkout call for it."
  - "Roll the store out in waves by buyer group and measure per wave the share of order lines through the store, zero-result searches and inside sales minutes per line."
articles: [commerce-buyer-agent-whatsapp, commerce-merchandising-agent, commerce-aura-to-lwr-migration, commerce-dealer-rollout, commerce-kpis-after-go-live, prompt-injection-dealer-portals, multilingual-dealer-agents, distributor-replenishment-agent]
faq:
  - q: "Should a manufacturer launch the B2B store with the Buyer Agent from day one?"
    a: "I advise against it. The agent answers from the store's catalogue, entitlements, prices and orders. If that data is not right yet, dealers see the errors in a chat instead of on a product page. Launch the store, check the first wave, then add order status and reorder in the chat."
  - q: "Do I have to move an Aura B2B store to LWR soon?"
    a: "There is no deadline. As of 27 October 2026 Aura stores are not on the list of active retirements, and the migration guide names no date. Salesforce recommends LWR for new stores. Decide by the features you need and by the amount of your own Aura code."
  - q: "How long does rolling out a B2B store to dealers take?"
    a: "It depends on the number of dealers, the pricing logic and data quality. As an assumption for a manufacturer with about 250 dealers in three countries, I plan three waves over six months, with two weeks between waves for fixes and testing the next group."
  - q: "What does the Buyer Agent cost on top of the store?"
    a: "Salesforce publishes no separate price. Trailhead lists prerequisites including Service Cloud or Sales and Service Edition, the Agentforce and Einstein for Service add-ons and Data 360. Ask how agent usage is counted in your contract and calculate with your own number of dealer conversations."
draft: false
---

Agents belong in a B2B store that already works. The Buyer Agent answers dealer questions about products, order status and reorders from the store's data, and the Merchandising Agent helps maintain search, promotions and buyer accounts. Prices, credit and delivery dates still come from code and the ERP. Migrate an Aura store to LWR when features or growing custom code call for it, because there is no retirement date. Roll out in waves by buyer group, pilot dealers first. Measure per wave, and plan fixed regression tests for search, cart and checkout, because three Salesforce releases a year will touch all of them.

## Where does the store stand after the first four chapters?

This chapter assumes what the previous ones described: a decision for Salesforce B2B Commerce from [chapter 1](../b2b-commerce-worth-it-overview/), a catalogue with buyer groups and entitlements, customer prices and checkout on account, and an ERP integration that [chapter 4](../erp-integration-stock-orders/) used to settle what is called live and who owns the order. Salesforce now also markets the product as ["Agentforce Commerce for B2B"](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). The new name shows where Salesforce is taking it.

My order for the rest is still sober: first the store with the first dealers, then KPIs, then agents. An agent reads the same buyer groups, price books and order summaries as the storefront. If an entitlement is wrong, it shows the wrong part in the chat, just faster and in more convincing words.

## What do the Buyer Agent and the Merchandising Agent do today?

Salesforce offers two kinds of agents for B2B Commerce. One talks to dealers, the other works for the team that runs the store.

### Buyer Agent for dealers

You create the Buyer Agent from the template "Buyer Agent (B2B)". According to Trailhead it searches products by name, category or specification, shows past and current orders with their status and reorders by copying a past order. Salesforce's [June 2026 blog post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) lists it under "GA June 2026" and names WhatsApp and SMS as channels. The complete order in the chat, with confirmation and payment at contract price, is dated January 2027 on the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/) under the name Carter for Buyers.

The prerequisites are broader than the name suggests. Trailhead lists Agentforce Commerce for B2B, Service Cloud or Sales and Service Edition, the Agentforce and Einstein for Service add-ons, and Einstein generative AI with Data 360. If you run only Sales Cloud next to the store, you buy more than an agent. I found no separate price for the Buyer Agent on the official pages. How to estimate agent costs anyway is covered in the AI chapter on [costs and tokens](../../ai-salesforce/costs-and-tokens/). Subagents, channels and licences in detail are in [B2B Buyer Agent: ordering through WhatsApp and SMS](../../../blog/b2b-buyer-agent-whatsapp-ordering/).

For export dealers, language comes on top. Which languages Agentforce agents handle, what translation costs and how to keep knowledge per language is covered in [multilingual Agentforce agents for export dealers](../../../blog/multilingual-agentforce-agents-export-dealers/). Check for the Buyer Agent itself which languages are released for your dealer countries.

### Merchandising Agent for the store team

The [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) lists Merchant Agent under Agentforce in both Growth and Advanced. The innovations page dates the Merchandising Agent for B2B to August 2026: it boosts or buries products in search, creates products and manages buyer accounts in conversation. The [Trailhead unit on the merchandising skills](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) adds summaries of order value and conversion, and promotions from templates that a person reviews before they go live.

In a spare parts catalogue, boost and bury is the useful part: superseded part numbers down, successor parts and repair kits up. The [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) allow 100 boost and bury rules per store, whether a person or an agent creates them. Material number, unit and sales status stay in the ERP or PIM. My table of what the agent may and may not change is in [Merchandising Agent: what it does for a parts catalog](../../../blog/merchandising-agent-parts-catalog/).

## Why must the agent never make up a price?

For a manufacturer, the contract price is the most sensitive number in the whole chat. It comes from the store's pricing, which reads price books or calls the ERP, as described in [chapter 3](../prices-cart-checkout/). The same goes for credit limits, blocked customers and confirmed delivery dates. The language model understands the question and words the answer; code supplies the number. If the store shows only list prices because dealer prices live in SAP conditions, the agent will quote list prices too.

The second rule is about input. Every dealer message is text, and text can carry instructions. So I plan as if a filter will one day miss an injected instruction:

- The agent user reads only what the buyer may see.
- Actions that create orders or change data check permission, quantity and credit in code.
- No outbound action sends data to an address a dealer can influence.
- On WhatsApp and SMS the agent first has to know who is writing. The template brings a user verification subagent for this.

Attack patterns and countermeasures are in [prompt injection in dealer portals](../../../blog/prompt-injection-dealer-portals-agentforce/), the general limits of agents in the AI chapter [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/). If you keep dealer stock in Manufacturing Cloud, an agent can also propose replenishment. It becomes binding only once the ERP accepts it, see [distributor inventory and replenishment with Agentforce](../../../blog/distributor-inventory-replenishment-agentforce/). Other agents for manufacturers are placed in context in the chapter [ERP, AI and rollout](../../manufacturing-cloud/erp-ai-and-rollout/) of the Manufacturing Cloud masterclass.

## When is moving from Aura to LWR worth it?

Salesforce B2B Commerce has existed as a Visualforce package, as an Aura store and as an LWR store. According to the [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide), only orgs enabled for Commerce before Spring '23 can still create Aura stores, and Salesforce recommends LWR for new stores. There is no retirement date as of 27 October 2026: Aura stores are not on the [list of active retirements](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1). The same holds for B2B Commerce for Visualforce. Which generation you run is covered in [B2B Commerce versions: Visualforce, Aura or LWR?](../../../blog/b2b-commerce-versions-visualforce-aura-lwr/).

The [key differences](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) touch every piece of custom code: LWR supports only Lightning web components, styling uses `--dxp` styling hooks instead of custom CSS classes, data comes through wire adapters, and checkout is the built-in Salesforce Commerce Checkout instead of a flow. Salesforce documents no migration tool. So I plan the move as a rebuild of the storefront on the same commerce data.

I would migrate when at least one of these applies:

- A feature you need is not available in the Aura store or is hard to build there. Check each feature in the release notes and documentation.
- Custom Aura code keeps growing, and every new component is code you will rewrite later.
- Checkout has to change anyway, for example for a new credit check in the ERP.
- The partner who built the store is leaving the programme.

If the store runs stably with little custom code, waiting is a legitimate choice. I would still take the first step: replace Aura components in the running store with Lightning web components, because those run in both store types. Steps, checkout and the gaps in the guide are in [Aura to LWR: migrating a B2B Commerce store](../../../blog/b2b-store-aura-to-lwr-migration/).

## How do you roll the store out to dealers?

A B2B store shows every dealer its own catalogue and its own prices. A big bang therefore shows every data error to every dealer on the same day. The data model makes waves easy: buyers reach the store through buyer groups, so a wave is the set of buyer groups you connect to the store.

- **Pilot first.** Dealers with many repeat orders of known parts, an honest contact person and few special conditions.
- **Buyer managers at the dealer.** According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-roles-permissons-store-setup/define-personas-permissions) they get Customer Community Plus with B2B Commerce Super User and Delegated External User Administration. With that they create users for their own account, reset passwords and deactivate users without a ticket to your service desk.
- **Test per wave.** Entitlements, prices, stock, checkout and order status with a real buyer account of that wave, never only with an admin user.
- **Inside sales stays available.** Phone and email keep working. Dealers switch because the store is faster. When a pilot dealer phones in a reorder, the colleague walks them through the store once.
- **Keep training short.** One session per buyer manager on user administration and one page on searching by part number and reordering are enough to start.

A typical scenario, as an assumption: a compressor manufacturer sells spare parts to 250 dealers in Germany, Austria and Switzerland. Wave 1 brings fifteen pilot dealers in Germany into one buyer group in months 1 and 2. Wave 2 follows with the remaining German dealers in three groups by dealer tier, wave 3 with Austria, Switzerland and the key accounts with special conditions. Two weeks between waves are reserved for fixes. Wave 1 gets the Buyer Agent only after three months of ordering in the store. The full sequence is in [B2B shop rollout to dealers](../../../blog/b2b-shop-dealer-rollout/). If dealers and inside sales have to change how they work, plan [change management](../../../services/change-management-salesforce/) from the first wave.

## Which KPIs show whether the store works?

Dealers order anyway. The question is whether they order through the store and whether that costs you less. I measure per buyer group, about three months after each wave:

| KPI | Question behind it | Source |
|---|---|---|
| Share of order lines through the store | Are dealers switching? | ERP, with a channel flag |
| Zero-result searches | Do dealers find their parts? | Search analytics in Data Cloud |
| Conversion from search to order | Does finding lead to buying? | Search analytics, Merchant Agent |
| Inside sales minutes per order line | Does the store save work? | Own measurement, before and after |
| Orders needing manual correction | Is the data right? | ERP or order summaries |

Salesforce [announced search analytics in Data Cloud in July 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/), with search queries, click-through rates, conversions and zero-result searches. It consumes Data Cloud credits, of which Growth includes 250K and Advanced 500K according to the pricing page. Salesforce does not publish the consumption, so look at the Digital Wallet after the first month.

Two things must be in place before go-live: a channel flag in the order interface so every line in the ERP can be traced to the store, and two weeks of time measurement in inside sales as a baseline. Without those numbers the [business case](../../../blog/b2b-webshop-business-case-manufacturers/) stays a claim. Details and a sample calculation are in [B2B shop KPIs: what to measure after go-live](../../../blog/b2b-shop-kpis-after-go-live/).

## What does running the store take after go-live?

Salesforce ships three releases a year, and each one touches storefront, checkout and extensions. I would keep a fixed regression list for the store that runs in the preview sandbox before every release:

1. Search by current and old part number, with ten typical parts.
2. Prices for one buyer account per buyer group, checked against the ERP.
3. Cart, reorder and checkout with a purchase order number through to the order in the ERP.
4. Order status and order history from the ERP.
5. Every custom extension and every custom Lightning web component.
6. If the Buyer Agent is live: a fixed test set of real dealer questions with expected answers.

Store configuration, meaning buyer groups, entitlement policies and price books, runs through the pipeline like metadata. How to place the three releases in a calendar is covered in the DevOps chapter on [Salesforce release planning](../../devops-release-management/release-planning-salesforce-releases/), how to introduce such a way of working step by step and measure it in the chapter on the [rollout roadmap](../../devops-release-management/rollout-roadmap/). I support pipeline and test automation as part of [DevOps and release management](../../../services/devops-release-management/).

## Where should you start?

1. **Store before agent.** First wave live, data checked, KPIs collected. Then order status and reorder in web chat for the pilot group, WhatsApp only after that.
2. **Clarify the store generation.** Aura or LWR, amount of custom Aura code, planned changes to checkout. That decides whether the migration comes before or after the rollout.
3. **Cut the waves.** A dealer list with order lines, pricing logic and data quality, and from it the pilot and the following waves.
4. **Measure baselines.** Channel flag in the ERP and inside sales time per line, before the first dealer orders.
5. **Write the regression list.** Six items as above, kept in the client's repository.

All five chapters are on the [masterclass overview page](../). If you need to decide which data between ERP, PIM and Salesforce belongs to whom, see how I help under [Salesforce architecture](../../../services/salesforce-architecture/).

A B2B store carries its weight when the first dealers find their parts at their price on the first try, and agents, migration and KPIs all build on that foundation. If you are planning this for your dealers, [send me a message](#contact).
