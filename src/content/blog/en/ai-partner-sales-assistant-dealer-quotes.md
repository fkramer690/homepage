---
title: "AI Partner Sales Assistant: dealer quotes with AI"
description: "What the AI Partner Sales Assistant and AI Sales Concierge in Manufacturing Cloud do, and which product, price and discount data must be clean first."
pubDate: 2026-10-27
lang: en
slug: ai-partner-sales-assistant-dealer-quotes
translationKey: partner-sales-assistant-dealer-quotes
topic: ai
categories: [manufacturing-cloud, ai]
tags: [agentforce, manufacturing cloud, dealers, quoting, pricing, ai agents]
takeaways:
  - "Setup, licence and price of both agents were in no Salesforce source I could open on 27 October 2026. Ask in writing before you budget."
  - "If dealer prices live only as SAP conditions, the agent quotes list prices. Decide the price master first."
  - "Configured machines stay with the sales desk until the agent can call the rules. I start with accessories and standard machines."
  - "An AI quote is ready when your sales desk would sign it unchanged."
faq:
  - q: "What does the AI Partner Sales Assistant do?"
    a: "According to the Manufacturing Cloud product page, it accelerates channel sales by finding products and building quotes in seconds. Salesforce lists it under the Summer '26 release."
  - q: "What is the difference to the AI Sales Concierge?"
    a: "The Sales Concierge (Winter '27) addresses customers on your Experience Cloud site. Per the release highlights they can search assets, locate dealers and request quotes. The Partner Sales Assistant addresses dealers and distributors."
  - q: "Which data must be clean before dealers get AI quotes?"
    a: "One product record per sellable variant with a description a dealer can search, links between accessories and the machines they fit, price books per market and dealer tier from the ERP, configuration rules and discount limits stored as rules."
  - q: "What does an AI-built dealer quote cost?"
    a: "Salesforce has not published a price for these agents in the sources I could open. A standard Agentforce action costs 20 Flex Credits ($0.10) in production and 16 in a sandbox; the licence for partner users is the open item."
draft: false
---

The AI Partner Sales Assistant (Summer '26) helps dealers find products and build quotes in Manufacturing Cloud, and the AI Sales Concierge (Winter '27) does the same for customers on your Experience Cloud site. Salesforce describes each in one sentence, so I treat them as a new front end on your existing quoting data. That data decides the result. Before any dealer gets an AI-built quote, every sellable variant needs a product record a dealer can search, a price per market and dealer tier, a rule for what can be built and a discount limit the model cannot talk round.

## What do the AI Partner Sales Assistant and the AI Sales Concierge do?

Both appear on the [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/). Under Summer '26 Salesforce promises to "accelerate channel sales with an AI Partner Sales Assistant that finds products and builds quotes in seconds". Under Winter '27 it promises to "turn self-service visits into qualified pipeline with an AI Sales Concierge that finds products and builds quotes in seconds". Winter '27 has been [generally available since 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

The release material adds a little. The [Winter '27 highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) describe Sales Concierge for Customers as an AI buying experience on your Experience Cloud site, where customers "search assets, locate dealers, and request quotes". A Sales Concierge for Manufacturing with product and accessory search, dealer search and quick quote creation was already listed in the [Spring '26 highlights](https://trailhead.salesforce.com/it/content/learn/modules/spring-26-release-highlights/see-whats-new-agentforce-manufacturing-media-public-sector-nonprofit). For the Partner Sales Assistant I found no entry in the [Summer '26 Manufacturing highlights](https://trailhead.salesforce.com/content/learn/modules/summer-26-release-highlights/see-whats-new-manufacturing-media-nonprofit-and-agentforce-net-zero), which name warranty claims assistance, sample management and purchase orders.

```hinweis offen
Setup guides, licence terms and prices for both agents were not in the sources I could open on 27 October 2026. Ask Salesforce before you budget.
```

One difference matters for a decision. "Request quotes" and "builds quotes" are different things: a request lands with your sales desk, a built quote carries a price the dealer will hold you to.

```vertiefung For admins
title: Which agent actions sit underneath?
The Manufacturing section in the navigation of the Standard Agent Action Reference in Salesforce Help lists Agentforce for Manufacturing actions such as Search Product And Parts, Get Product Price Details, Get Price Books, Search Dealers for Products, Create Opportunity with Products and Preferred Seller and Create Quote from Opportunity. I found no Help page that describes these actions in detail. The one action page I opened, [Get Warranty Claims for Account](https://help.salesforce.com/s/articleView?id=ai.agent_ref_mfg_get_wrnty_claims_for_acct.htm&language=en_US&type=5), requires the Agentforce for Manufacturing add-on for each user or Agentforce 1 Manufacturing Edition. I expect both agents to use actions like these, but Salesforce does not say so, so treat that as my assumption.
```

## Which quoting agent fits which channel?

Winter '27 also brings a quoting agent outside Manufacturing Cloud. According to the [Winter '27 announcement](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), the Revenue Management Agent Enhancements cover "self-service quoting for customer buyers, integrated quoting for partners", so that "partners transact without leaving their workspace".

| | AI Partner Sales Assistant | AI Sales Concierge | Revenue Management agent |
|---|---|---|---|
| Release | Summer '26 | Winter '27 | Winter '27 |
| Who uses it | Dealers, distributors | Customers on your site | Customer buyers, partners |
| What Salesforce says | Finds products, builds quotes | Finds products, builds quotes; highlights say request quotes | Self-service and partner quoting |
| Product | Manufacturing Cloud | Manufacturing Cloud | Revenue Cloud |

I would choose by where your quote lives today. If you already quote in Revenue Cloud, look at the Revenue Management agent first; what it can do today is covered in [the Revenue Cloud quoting agent](../revenue-cloud-quoting-agent-agentforce/). If dealers quote on standard quotes and price books in Manufacturing Cloud, the manufacturing agents fit. Two quoting agents on two quote models is the setup I would avoid.

For machine builders with dealers, the Sales Concierge raises a commercial question before a technical one. If an end customer finds a machine on your site and gets a price, which dealer receives the lead, and may that price undercut what the dealer quotes? Settle routing and price visibility with the head of sales before go-live.

## Catalogue, prices, rules and discount limits must be right first

An agent that builds a quote reads the same records your sales desk reads. What an experienced desk corrects by habit, the agent passes straight to the dealer.

### A catalogue a dealer can search

Every sellable variant and accessory needs its own product record with a correct active flag, and superseded products need a pointer to the successor. ERP short texts are written for internal staff; a dealer types "quick coupler for 8 tonne excavator". Accessories need a link to the machine models they fit, or the agent offers an attachment that does not fit the coupler. Count the share of accessories with such a link before anything else.

### Prices per market and dealer tier

If SAP holds list prices, dealer discounts per tier and surcharges as conditions while Salesforce holds only the list price, the agent quotes the list price. You need price books per country, currency and dealer tier with validity dates, synced from the ERP. Salesforce sees the gap too: the Winter '27 highlights name Penny Perfect Pricing with multimarket pricing, multiple units of measure, calculation schema and ERP integration inside Manufacturing Cloud. What is known about it so far is in [Penny Perfect Pricing: ERP prices in Salesforce?](../penny-perfect-pricing-erp-prices/). Decide one price master: either the ERP calculates and Salesforce shows the result through an API, as in [order status from SAP via MuleSoft](../agentforce-sap-order-status-mulesoft/), or Salesforce calculates with the same schema.

### Rules for what can be built

If option rules live in a separate configurator, in PLM or in the heads of application engineers, the agent cannot respect them. Siemens shows the target picture: in its [September 2026 announcement](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) a sales rep "can quote only those upgrades that are technically valid and manufacturable", but Teamcenter "will work with Agentforce", in the future tense. For a mid-sized machine builder I would restrict the agent to products without configuration and keep configured machines with the sales desk until the rules can be called as an API. How configuration, product identity and approval connect is covered in [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/).

### Discount limits as rules

The tier discount is part of the price; anything above it is a decision. The model should never make that decision. Put the limit into deterministic logic, so an approval action stays hidden until the rule allows it, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/). Rebates paid after the period stay out of the quote price.

### Dealers, territories and the installed base

The Sales Concierge locates dealers and searches assets. That needs dealer accounts with territories and the product lines each dealer may sell, and assets with serial numbers so a customer finds parts for their own machine. Partner users should see only their own price book and customers, and every field a dealer or customer types is outside input for the agent, as I describe in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/). Which portal licence covers quotes is part of [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).

## Worked example: 140 dealers and one sales desk

Assume a maker of compact construction machinery with 140 dealers in 12 countries, SAP S/4HANA and Manufacturing Cloud with a partner portal. All numbers are assumptions to show the method.

**Today.** Dealers send 1,800 quote requests a month by email to a sales desk of six. A quote takes 1.5 working days. 70 percent concern attachments, accessories and standard machines, 30 percent configured machines.

**Data check.** 35 percent of the 8,000 accessories have no link to the machine models they fit. Salesforce holds list prices only; three dealer tiers live in SAP conditions. Extra discounts are approved by email.

**Order of work.** Compatibility links from product management, tier prices from SAP into price books per country with a nightly sync, and an approval rule for any discount above the tier. Assume four months. Then a pilot with 15 dealers on attachments only.

**Consumption.** If the agent bills like other Agentforce actions, assume eight actions per quote. According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), an action costs 20 credits in production and 16 in a sandbox, and Flex Credits cost [$500 per 100,000](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/). For the 1,260 simple quotes: 1,260 × 8 × 20 = 201,600 credits, about $1,008 a month. A test set of 300 real dealer requests costs 300 × 8 × 16 = 38,400 credits, or $192 per sandbox run.

The consumption is small next to six people on a desk. The work sits in four months of catalogue and price data, and the open item is the licence for partner users.

## Pick one channel and measure the catalogue

```schritte
Pick one channel first
  Dealers through the Partner Sales Assistant or end customers through the Sales Concierge.
Measure the catalogue
  Share of accessories linked to machine models, share of products with a description a dealer would search for.
Decide the price master
  Get tier prices into price books with validity dates.
Write discount limits as rules
  With an owner in sales and finance.
Ask Salesforce in writing
  Licence per partner user, which actions the agent calls, consumption model, and how it relates to the Revenue Management agent.
Build a test set
  From real dealer requests, including wrong part numbers and unbuildable combinations, as in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).
```

Where these agents fit among the other manufacturing agents is covered in the masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/). Drawing the line between ERP, configurator and agent is part of my [architecture work](../../services/salesforce-architecture/).
