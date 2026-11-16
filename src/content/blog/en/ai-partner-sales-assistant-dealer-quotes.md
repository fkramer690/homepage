---
title: "AI Partner Sales Assistant: dealer quotes with AI"
description: "What the AI Partner Sales Assistant and AI Sales Concierge in Manufacturing Cloud do, and which product, price and discount data you must clean first."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: ai-partner-sales-assistant-dealer-quotes
translationKey: partner-sales-assistant-dealer-quotes
topic: ai
categories: [manufacturing-cloud, ai]
tags: [agentforce, manufacturing cloud, dealers, quoting, pricing, ai agents]
takeaways:
  - "Each user of the manufacturing actions needs the Agentforce for Manufacturing add-on, listed from $150. Get the rules for partner users in writing."
  - "If dealer prices live only as SAP conditions, the standard actions only see list prices. Decide the price master first."
  - "Configured machine quotes should stay with the sales desk until the agent can call the rules. I start with accessories and standard machines."
  - "An AI quote is ready when your sales desk would sign it unchanged."
faq:
  - q: "What does the AI Partner Sales Assistant do?"
    a: "According to the Manufacturing Cloud product page, it accelerates channel sales by finding products and building quotes in seconds. Salesforce lists it under the Summer '26 release; Salesforce Help documents the matching template as Agentforce for Industries Sales Concierge for Partners."
  - q: "How does it differ from the AI Sales Concierge?"
    a: "Sales Concierge for Customers (Winter '27) addresses customers on your Experience Cloud site; a Sales Concierge for Manufacturing was already in Spring '26. The release highlights say these concierges can search assets, locate dealers and request quotes. The Partner Sales Assistant addresses dealers and distributors."
  - q: "Which data must be clean before dealers get AI quotes?"
    a: "One product record per sellable variant with a description a dealer can search, links between accessories and the machines they fit, an effective price per market, currency and dealer tier from the ERP, configuration rules and discount limits stored as rules."
  - q: "What does an AI-built dealer quote cost?"
    a: "There are three cost blocks: portal access for partner users, the Agentforce for Manufacturing add-on, which Salesforce Help requires for each user of the actions and which the Manufacturing Cloud pricing page lists as starting at $150 a month, and consumption. A standard action consumes 20 Flex Credits in production, $0.10 at list price, plus any separately metered prompts."
draft: false
---

The AI Partner Sales Assistant (Summer '26) helps dealers find products and build quotes in Manufacturing Cloud, and the AI Sales Concierge (Winter '27) does the same for customers on your Experience Cloud site. Salesforce Help documents the templates behind these marketing names as Industries Sales Assistance and Sales Concierge for Partners: a new front end for your existing quoting data. That data decides the result. Before any dealer gets an AI-built quote, every sellable variant needs a product record a dealer can search for, a price per market and dealer tier, a rule for what can be built, and a discount limit the model cannot bypass.

## What do the AI Partner Sales Assistant and the AI Sales Concierge do?

Both appear on the [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/). For Summer '26, Salesforce promises to "accelerate channel sales with an AI Partner Sales Assistant that finds products and builds quotes in seconds". For Winter '27, it promises to "turn self-service visits into qualified pipeline with an AI Sales Concierge that finds products and builds quotes in seconds". Winter '27 has been [generally available since October 12, 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

The release material adds a little. The [Winter '27 highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) describe Sales Concierge for Customers as an AI buying experience on your Experience Cloud site, where customers "search assets, locate dealers, and request quotes". A Sales Concierge for Manufacturing with product and accessory search, dealer search and quick quote creation was already listed in the [Spring '26 highlights](https://trailhead.salesforce.com/it/content/learn/modules/spring-26-release-highlights/see-whats-new-agentforce-manufacturing-media-public-sector-nonprofit). For the Partner Sales Assistant I found no entry in the [Summer '26 Manufacturing highlights](https://trailhead.salesforce.com/content/learn/modules/summer-26-release-highlights/see-whats-new-manufacturing-media-nonprofit-and-agentforce-net-zero), which name warranty claims assistance, sample management and purchase orders.

```hinweis achtung
According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_overview.htm&language=en_US&type=5), the templates run on Enterprise, Performance and Unlimited Edition, and each user who accesses the actions needs the Agentforce for Manufacturing add-on or Agentforce 1 Manufacturing Edition. Before you budget, get in writing how that applies to external partner users.
```

One difference matters for a decision. "Request quotes" and "builds quotes" are different things: a request goes to your sales desk, a built quote creates a concrete price expectation the dealer will treat as yours, even before it is legally binding.

```vertiefung For admins
title: Which agent actions sit underneath?
The Manufacturing section in the navigation of the Standard Agent Action Reference in Salesforce Help lists Agentforce for Manufacturing actions such as Search Product And Parts, Get Product Price Details, Get Price Books, Search Dealers for Products, Create Opportunity with Products and Preferred Seller and Create Quote from Opportunity. Salesforce Help documents them as part of the [Industries Sales Assistance template](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_industries_sales_assistance.htm&language=en_US&type=5) with a Sales Concierge subagent. Some of them, such as Search Dealers for Products, run prompt templates themselves, which matters for consumption.
```

## Which quoting agent fits which channel?

Winter '27 also brings a quoting agent outside Manufacturing Cloud. According to the [Winter '27 announcement](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), the Revenue Management Agent Enhancements cover "self-service quoting for customer buyers, integrated quoting for partners", so that "partners transact without leaving their workspace".

| | AI Partner Sales Assistant | AI Sales Concierge | Revenue Management agent |
|---|---|---|---|
| Release | Summer '26 | Winter '27 | Winter '27 |
| Who uses it | Dealers, distributors | Customers on your site | Customer buyers, partners |
| What Salesforce says | Finds products, builds quotes | Finds products, builds quotes; highlights say request quotes | Self-service and partner quoting |
| Product | Manufacturing Cloud | Manufacturing Cloud | Revenue Management, formerly Revenue Cloud |

I would choose based on where your quote lives today. If you already quote in Revenue Management, formerly Revenue Cloud (not Salesforce CPQ), look at its agent first; what it can do today is covered in [the Revenue Cloud quoting agent](/en/blog/revenue-cloud-quoting-agent-agentforce/). If dealers quote on standard quotes and price books in Manufacturing Cloud, the manufacturing agents fit. I would avoid running two quoting agents on two quote models.

For machine builders with dealers, the Sales Concierge raises a commercial question before a technical one. If an end customer finds a machine on your site and gets a price, which dealer receives the lead, and is that price allowed to undercut what the dealer quotes? Settle routing and price visibility with the head of sales before go-live.

## Catalog, prices, rules and discount limits must be right first

An agent that builds a quote reads the same records your sales desk reads. What experienced sales desk staff correct out of habit, the agent passes straight to the dealer.

### A catalog a dealer can search

Every directly quoted SKU and accessory needs its own product record with a correct active flag (configured variants need a product model or configurator instead), and superseded products need a pointer to the successor. ERP short texts are written for internal staff; a dealer types "quick coupler for 8 tonne excavator". Accessories need a link to the machine models they fit, or the agent offers an attachment that does not fit the coupler. Count the share of accessories with such a link before anything else.

### Prices per market and dealer tier

If SAP holds list prices, dealer discounts per tier and surcharges as conditions while Salesforce holds only the list price, the standard actions can only use the list price from the price book mapping. You need an effective price per country, currency and dealer tier with validity dates, synced from the ERP, whether as price books, price book entries or pricing conditions. Salesforce sees the gap too: the Winter '27 highlights name Penny Perfect Pricing with multimarket pricing, multiple units of measure, calculation schema and ERP integration inside Manufacturing Cloud. Salesforce Help documents it for order pricing; I found no source saying that the quote action calls it. More in [Penny Perfect Pricing: ERP prices in Salesforce?](/en/blog/penny-perfect-pricing-erp-prices/). Decide on one price master: the ERP calculates and Salesforce shows the result through an API, as in [order status from SAP via MuleSoft](/en/blog/agentforce-sap-order-status-mulesoft/); the ERP conditions are replicated and Salesforce calculates with the same schema; or Salesforce maintains the pricing itself.

### Rules for what can be built

If option rules live in a separate configurator, in PLM or only in application engineers' heads, the agent cannot respect them. Siemens shows the target state: in its [September 2026 announcement](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) a sales rep "can quote only those upgrades that are technically valid and manufacturable", but the announcement says Teamcenter "will work with Agentforce", using the future tense. For a mid-sized machine builder I would restrict the agent to products without configuration and keep configured machines with the sales desk until the rules can be called as an API. How configuration, product identity and approval connect is covered in [from quote to sales agreement](/en/blog/quote-to-sales-agreement-product-configurator/).

### Discount limits as rules

The tier discount is part of the price; anything above it is a decision. The model should never make that decision. Put the limit into deterministic logic, so an approval action stays hidden until the rule allows it, as described in [Agent Script: rules instead of the LLM](/en/blog/agent-script-deterministic-rules/). Rebates paid after the period stay out of the quote price.

### Dealers, territories and the installed base

The Sales Concierge locates dealers and searches assets. That needs dealer accounts with territories and the product lines each dealer may sell, and assets with serial numbers so a customer finds parts for their own machine. Partner users should see only their own price book and customers, and every field a dealer or customer types is outside input for the agent, as I describe in [prompt injection in dealer portals](/en/blog/prompt-injection-dealer-portals-agentforce/). Which portal license covers quotes is part of [the Manufacturing Cloud customer portal](/en/blog/manufacturing-cloud-customer-portal/).

## Worked example: 140 dealers and one sales desk

Assume a maker of compact construction machinery with 140 dealers in 12 countries, SAP S/4HANA and Manufacturing Cloud with a partner portal. All numbers are assumptions to show the method.

**Today.** Dealers send 1,800 quote requests a month by email to a sales desk of six. A quote takes 1.5 working days. 70 percent are for attachments, accessories and standard machines, and 30 percent are for configured machines.

**Data check.** 35 percent of the 8,000 accessories have no link to the machine models they fit. Salesforce holds list prices only; three dealer tiers live in SAP conditions. Extra discounts are approved by email.

**Order of work.** Compatibility links from product management, tier prices from SAP into price books per country with a nightly sync, and an approval rule for any discount above the tier. Assume four months. Then run a pilot with 15 dealers on attachments only.

**Consumption.** If the agent bills like other Agentforce actions, assume eight actions per quote. According to the [Flex Credits rate card of November 3, 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf), an action consumes 20 credits in production and 16 in a sandbox, and for Agentforce for Industries customers prompts are metered on top. Flex Credits cost [$500 per 100,000](https://www.salesforce.com/agentforce/pricing/) at list price. For the 1,260 simple quotes: 1,260 × 8 × 20 = 201,600 credits, about $1,008 a month before prompts. Check the real count in the sandbox trace and Digital Wallet. A test set of 300 real dealer requests costs 300 × 8 × 16 = 38,400 credits, or $192 per sandbox run.

Consumption is small compared with the cost of a six-person sales desk. The larger license cost may be the add-on: if every dealer user who quotes needs it at $150 a month, that cost alone exceeds the consumption. The work sits in four months of catalog and price data.

## Pick one channel and measure the catalog

```schritte
Pick one channel first
  Dealers through the Partner Sales Assistant or end customers through the Sales Concierge.
Measure the catalog
  Share of accessories linked to machine models, share of products with a description a dealer would search for.
Decide the price master
  Get tier prices into price books with validity dates.
Write discount limits as rules
  With an owner in sales and finance.
Ask Salesforce in writing
  How the per-user add-on applies to partner users, which actions and prompts the agent calls, and how it relates to the Revenue Management agent.
Build a test set
  From real dealer requests, including wrong part numbers and unbuildable combinations, as in [testing Agentforce agents before go-live](/en/blog/testing-agentforce-agents-before-go-live/).
```

Where these agents fit among the other manufacturing agents is covered in the masterclass chapter [AI agents in manufacturing](/en/masterclass/ai-salesforce/ai-agents-in-manufacturing/). Drawing the line between ERP, configurator and agent is part of my [architecture work](/en/services/salesforce-architecture/).
