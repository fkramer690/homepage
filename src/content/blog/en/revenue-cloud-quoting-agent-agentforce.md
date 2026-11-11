---
title: "Revenue Cloud quoting agent: what it can do today"
description: "What the Agentforce quoting agent in Revenue Cloud does for an internal sales desk, what has to be in place first, what it costs and where it stops."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-quoting-agent-agentforce
translationKey: revenue-cloud-quoting-agent
topic: revenue
categories: [revenue-cloud, ai]
tags: [revenue cloud, agentforce, quoting agent, quotes, flex credits, ai agents]
takeaways:
  - "Salesforce reports 75 percent less quoting time and 87 percent fewer clicks for its own sales team. That is a vendor figure, not a benchmark for you."
  - "A maintained catalog and synced pricing data are required; for production use I would also have configuration rules and approval limits in place first."
  - "With Winter '27, Salesforce announced agent quoting for customer self-service, partners in their own workspace and renewal packages for account executives."
  - "An agent action costs 20 Flex Credits in production (16 in a sandbox), so a five-action quote costs about $0.50 at list price before prompts."
faq:
  - q: "What does the quoting agent in Revenue Cloud do?"
    a: "It creates, modifies and summarizes quotes while respecting role-based access, quotes valid products according to catalog and fulfillment rules, keeps pricing and discounting within system guardrails and handles new business quotes, asset amendments and quote updates through the Quote Management subagent."
  - q: "What do I need before using the quoting agent?"
    a: "Before using the quoting agent, you need Revenue Cloud with a maintained product catalog, pricing data synced through Salesforce Pricing, Agentforce enabled and an employee agent with the Quote Management subagent. In practice, you should also define discount limits as rules and approval workflows that catch what the agent must not decide."
  - q: "Can dealers and customers use the quoting agent?"
    a: "Salesforce announced self-service quoting for customer buyers and integrated quoting for partners with the Winter '27 release, generally available since 12 October 2026. Salesforce Help documents the setup for partner access in detail. For customer users, check Salesforce Help and confirm with Salesforce which agent and license your scenario needs. Licenses for external users need to be clarified separately."
  - q: "What does the quoting agent cost?"
    a: "Under the Flex Credits model, agent actions cost 20 credits each in production and 16 in a sandbox (rate card of 3 November 2026), with credits listed at $500 per 100,000. Prompts are billed on top depending on the model tier. Salesforce also sells per-user Agentforce licensing, so the applicable model depends on your contract. You also need Revenue Cloud licenses for the users the agent works for."
draft: false
---

The quoting agent in Revenue Cloud turns a request in plain language into a quote: it picks valid products from the catalog, prices them with Salesforce Pricing, applies discounts within the guardrails and can amend and summarize quotes. For an internal sales desk with standard products and clean pricing data, that saves real time. Before it goes live, you need a maintained catalog and synced prices, and I would add configuration rules in Salesforce and discount limits enforced by approvals. For configured machines whose rules live outside Salesforce, the standard agent cannot help without a custom integration.

## What does the Revenue Cloud quoting agent do?

Salesforce announced agent quoting for Revenue Cloud in July 2025, and the expanded quote actions became available with the Winter '26 release that autumn. In the [announcement](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/), reps describe what they need, and the agent generates the quote, "automatically pulling the correct products, pricing, and terms". The headline numbers come from Salesforce's own sales team: 75 percent less quoting time and 87 percent fewer clicks. That is a vendor figure from one company and its own sales team. I would not put it into a business case for a machine builder.

The [Trailhead quick start for a quoting agent](https://trailhead.salesforce.com/content/learn/projects/quick-start-build-an-agent-to-create-quotes-fast/build-your-first-agentforce-quoting-agent) is more precise about the scope. The agent:

- creates, modifies and summarizes quotes and respects role-based access,
- follows product catalog and fulfillment rules, which keeps it within the products the catalog allows, but does not guarantee that every configuration can be built,
- keeps pricing and discounting within system guardrails,
- handles new business quotes, amendments to assets and quote updates.

The work is done by the Quote Management subagent, whose actions are based on flows. In the exercise you ask for 15 headsets with 15 percent discount for an account and opportunity, then change the discount to 10 percent; you then email the quote yourself from the opportunity with a template. Salesforce Help lists a second building block, the Product Selection subagent, for searching and filtering products. The product is called Revenue Cloud on salesforce.com; Help and Trailhead list the agent under Agentforce Revenue Management or Revenue Management.

## Catalog, prices and rules come before the agent

The agent reads the same records your sales desk reads. What an experienced rep corrects by habit, the agent passes on. So the preparation is mostly data and rules work:

- **Catalog.** Every sellable product, option and spare part should have a catalog entry with an active flag and a description that uses the words a rep would type. How to model variants without copying the ERP material master is covered in the chapter [catalog, configurator, pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/).
- **Synced pricing data.** The Trailhead setup starts with Sync Pricing Data in Salesforce Pricing Setup. If prices are not synced, the agent quotes nothing useful.
- **Configuration rules in Salesforce.** The agent stays within catalog rules. If your rules sit in SAP variant configuration or in an engineer's head, the standard actions do not see them; only a custom action with an integration could.
- **Discount limits as approvals.** The agent may apply a discount a rep asks for. Whether it needs approval should be decided by the approval workflow, as described in [discount approvals in Revenue Cloud](../revenue-cloud-discount-approvals/).
- **Agentforce setup.** Agentforce must be enabled, with an employee agent that has the Quote Management subagent, a permission set that grants agent access and search indexing for the product search. Check the edition and add-on the agent needs, and read the [considerations page](https://help.salesforce.com/s/articleView?id=ind.qocal_agentforce_considerations.htm&language=en_US&type=5) in Help: as of 9 November 2026 the agent supports English (en_US) only, and as an employee agent it inherits the considerations and billing of that agent type. For a German sales desk, that is the first thing to check.

I would count the share of products that a rep can find by the words customers use. If it is low, fix that before the pilot.

## Winter '27 adds self-service, partners and renewals

The [Winter '27 announcement](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/) for the release that has been generally available since 12 October 2026 extends agent quoting to three groups: "self-service quoting for customer buyers, integrated quoting for partners, and automated renewal package assembly for account executives". Customers "order without a rep", partners "transact without leaving their workspace", and account executives get "a drafted quote and risk signals" before a renewal.

The agent could already create renewal quotes before; what is new is the prepared renewal package with risk signals. Check the release notes for each of the three features to see which editions and user types they cover. For manufacturers, renewal drafts are the most interesting part. Maintenance and remote monitoring subscriptions renew every year, and preparing the renewal quote is routine work. Partner and self-service quoting raise commercial questions first: which prices a dealer sees, and whether a customer's self-service quote may undercut the dealer.

```hinweis offen
Salesforce Help includes a setup page for community and partner access to Agentforce in Revenue Management. The licenses for external users are a separate item to clarify.
```

If your dealers quote in Manufacturing Cloud instead, look at the [AI Partner Sales Assistant for dealer quotes](../ai-partner-sales-assistant-dealer-quotes/). Using two quoting agents with two quote models is the setup I would avoid.

## What does the quoting agent cost?

Two cost blocks apply. First, Revenue Cloud licenses are needed for the users on whose behalf the agent works. Second, the agent itself has a cost. Under the Flex Credits consumption model it is billed per action, at the rates on the [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) and the [rate card of 3 November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf); Salesforce also offers per-user Agentforce licenses, so check which model your contract uses:

```kennzahlen
$500 | per 100,000 Flex Credits
20 | Flex Credits per standard action
$0.10 | per standard action in production
source: Salesforce Agentforce pricing page and Flex Credits rate card, 3 November 2026
```

Prompts are charged on top and depend on the model tier.

As a rough estimate, assume that a quote dialogue needs five actions, such as finding the account, searching products, creating the quote, adding lines and applying a discount. That is 100 credits or $0.50 per quote in production. It is a happy-path example: adding a single product can already take several actions, so quotes with many lines, clarifying questions or retries cost more. At 1,500 agent quotes a month you are at about $750 plus prompts. Tests in a sandbox also consume credits, at 16 instead of 20 per action. [Agentforce costs for manufacturers](../flex-credits-agentforce-cost-per-action/) explains how to estimate all meters, and the AI masterclass chapter on [costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/) shows how to put them into a budget.

## When is the quoting agent the wrong tool?

I would not use it, or not yet, in four situations:

1. **Engineered to order.** If each machine is designed for a specific order, the quote comes from engineering, not from a catalog.
2. **Rules outside Salesforce.** If configuration logic sits in SAP variant configuration or a PLM, the agent quotes combinations that cannot be built.
3. **Prices only in SAP conditions.** If Salesforce holds list prices and the net price comes from SAP, the agent quotes the wrong price unless pricing calls SAP.
4. **Few quotes with high value.** With ten quotes a month and weeks of negotiation, a good sales engineer matters more than an agent.

## Worked example: spare parts and retrofit quotes on the sales desk

A packaging machine manufacturer runs a sales desk that handles spare parts and retrofit requests from existing customers: wear part kits, upgrade packages and service hours. Prices are in Salesforce price books, synced from SAP every night, and the catalog has clean descriptions. The desk handles a large number of small quotes.

Here the agent fits well. A rep types "wear part kit for line 3 plus two service days, 10 percent discount", and the agent finds the kit and the service item in the catalog and builds the quote for the customer's account. Discounts above the limit go to the approval workflow. New machine quotes stay with the sales engineers, because the configuration rules for those machines still live in SAP. The agent is introduced in one country first and tested with real requests from the last quarter.

## Write 30 test requests for one quote type

Pick one quote type with standard products and synced prices, write 30 test requests from real cases and define the expected quote for each. Run them in a sandbox before any customer or dealer sees an agent quote, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). The chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/) covers where agents fit in manufacturing beyond quoting, and [quote, contract, order](../../masterclass/revenue-cloud/quote-contract-order/) covers the whole path from quote to order.
