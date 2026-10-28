---
title: "Keep Salesforce CPQ or move to Revenue Cloud?"
description: "When manufacturers should stay on Salesforce CPQ for now, move to Revenue Cloud or take a third route, with triggers, a decision matrix and first steps."
pubDate: 2026-10-28
lang: en
slug: keep-salesforce-cpq-or-revenue-cloud
translationKey: stay-on-cpq-or-migrate
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: make-or-buy
tags: [Salesforce CPQ, Revenue Cloud, migration, make-or-buy, decision]
takeaways:
  - "Staying on Salesforce CPQ is allowed: existing customers renew, add users and get support, there is no end-of-life date and no forced migration."
  - "Reasons to move are needs that only Revenue Cloud covers: new features such as agent-based quoting, usage-based or recurring billing in Salesforce, or a product model that is redesigned anyway."
  - "Reasons to wait are a stable quoting process, prices that come from the ERP anyway, a larger project such as an ERP migration, or no budget for a redesign this year."
  - "A third route exists: a partner product or a custom approach on the platform, especially when configuration rules live in the ERP or in engineering."
  - "The decision starts with an assessment of your CPQ org: rules, price logic, customisations and integrations show how big the redesign would be."
faq:
  - q: "Should I stay on Salesforce CPQ or move to Revenue Cloud?"
    a: "Stay for now if your quoting process is stable and you need nothing new. Move when you need features that only Revenue Cloud gets, such as agent-based quoting or usage-based billing, or when you redesign products and processes anyway."
  - q: "How long does a migration from CPQ to Revenue Cloud take?"
    a: "Salesforce names three to six months as typical, from discovery to go-live. I would plan the lower end only for a clean org with few customisations."
  - q: "How many companies have moved from CPQ to Revenue Cloud?"
    a: "According to Salesforce, about 15 percent of Revenue Cloud Advanced customers migrated from Salesforce CPQ. The rest did not come from CPQ."
  - q: "What does Revenue Cloud cost compared with CPQ?"
    a: "Revenue Cloud Advanced is listed at €200 per user and month on an annual contract, Revenue Cloud Growth at €150 (October 2026). Your CPQ renewal price depends on your existing contract, so compare it with a quote from your account team."
draft: false
---

Staying on Salesforce CPQ is allowed and often the right choice for now. Existing customers renew, add users and get support, and Salesforce has announced neither an end-of-life date nor a forced migration. Move to Revenue Cloud when you need something only Revenue Cloud gets, such as agent-based quoting or usage-based billing, or when you redesign your product model anyway. Wait when your process is stable, prices come from the ERP anyway or a larger project has priority. And check a third route, a partner product or a custom approach, when your configuration rules live outside Salesforce. Start with an honest assessment of your CPQ org.

## Can you simply stay on CPQ?

Yes. According to [Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/), CPQ is "end of sale, not end of life". Existing customers can keep using it under their current contracts, buy additional users, renew and receive support and critical fixes. There is no end-of-life date and "no forced migration". What CPQ will not get is new features. The exact status, including what applies to the Billing package, is in [Salesforce CPQ end of sale: what applies in October 2026](../salesforce-cpq-end-of-sale-status/).

Staying is therefore a legitimate decision. It is still a decision with a price: every release adds to Revenue Cloud and nothing to CPQ. I also expect partners to build up Revenue Cloud teams rather than CPQ teams, so the knowledge to maintain a heavily customised CPQ org will not get cheaper. I would decide consciously and write down when you will look at it again, instead of letting it drift.

## When should you move to Revenue Cloud?

These triggers speak for a move in the next one to two years:

- **You need what only Revenue Cloud gets.** Salesforce announced Agentforce quoting in July 2025 as part of [Revenue Cloud](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/), with sellers creating quotes from a plain-language request. CPQ will not get such features.
- **Recurring or usage-based revenue.** If service contracts, remote monitoring subscriptions or pay-per-use should be sold, changed and billed in Salesforce, Revenue Cloud brings assets with state periods, usage rating and Revenue Cloud Billing.
- **The product model changes anyway.** A new product generation, a new variant structure or a catalog clean-up is a redesign. Doing it twice, once in CPQ and later again in Revenue Cloud, wastes the work.
- **Org relaunch or partner change.** When the org is rebuilt or a new partner takes over, the move fits into a project that is happening anyway. An [AI org assessment](../ai-org-assessment-technical-debt/) helps to see what is actually in the old org.
- **CPQ customisations are fragile.** If every release test breaks something in the quote calculator plugin and only one person understands it, a redesign removes a risk.

## When is waiting the better choice?

Waiting makes sense when:

- **The quoting process is stable** and nobody is asking for new functions.
- **Prices come from the ERP anyway.** If CPQ mainly fetches a net price from SAP and prints a quote, Revenue Cloud adds little to that step.
- **A larger project has priority.** An S/4HANA migration or a Manufacturing Cloud rollout ties up the same people. Two redesigns in parallel rarely end well.
- **There is no budget for a redesign this year.** A half-financed migration is worse than a well-run CPQ org.

Waiting does not mean doing nothing. Delete unused rules, document the price logic and secure a renewal that allows parallel operation later. That makes a later move cheaper.

## Is there a third route?

Yes, and I would always check it before signing anything. For quoting there are three routes today: Revenue Cloud, a partner product, or a custom approach on the platform. How a custom approach with its own product configurator feeds quotes and sales agreements is described in [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/).

A third route fits when your configuration rules live in SAP variant configuration, in a PLM system or with application engineers, and Salesforce would only display the result. Then a full constraint model in Revenue Cloud duplicates rules that someone has to keep in sync. The make-or-buy questions are the same as for any product: how well does the standard fit, who maintains the rules, and what do licence and maintenance cost over several years. I describe how I calculate that under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

Salesforce's own numbers give some context. According to the CPQ page, about 15 percent of Revenue Cloud Advanced customers migrated from CPQ. So about 85 percent of them did not come from CPQ. The figure shows that migrations happen. It does not show that CPQ customers are running out of time.

## The decision matrix

| Situation | Stay on CPQ for now | Move to Revenue Cloud | Third route |
|---|---|---|---|
| Stable process, no new requirements | Yes | Later | No |
| Agent-based quoting wanted | No | Yes | Check partner products |
| Recurring or usage-based billing in Salesforce | No | Yes | Rarely |
| Product model redesigned anyway | No | Yes | If rules live in the ERP |
| Prices calculated in SAP | Yes | Only with a clear benefit | Yes |
| Configuration rules in SAP or PLM | Yes | Check effort carefully | Yes |
| ERP migration running | Yes | After the ERP | After the ERP |
| Fragile CPQ customisations | Short term | Yes | Yes |

The matrix is a starting point. If two columns are ticked, the deciding factors are usually budget and the people who can model rules and prices.

## What does a move cost?

Licences are the easier part. The [Revenue Cloud pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) lists Revenue Cloud Growth at €150 and Revenue Cloud Advanced at €200 per user and month on an annual contract (October 2026). As an assumption, 50 quoting users on Advanced cost €120,000 a year at list price. Billing, Dynamic Revenue Orchestrator and other add-ons come on top. Your current CPQ price depends on your contract, so ask your account team for both figures.

The larger cost is the redesign. Salesforce names three to six months as a typical migration, and its [migration guide](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) makes clear that tools do not replace design decisions for custom logic and integrations. Why that is so is explained in [Salesforce CPQ vs Revenue Cloud: the real differences](../salesforce-cpq-vs-revenue-cloud-differences/).

A typical scenario, as an assumption: a machine builder with 50 CPQ users, 200 product rules, a quote calculator plugin and a CPQ renewal in nine months. Prices come from SAP, the configurator rules partly from engineering. Here I would renew CPQ for two years with an option for parallel operation, clean up the rules now, and run a proof of concept for the ten most important machines in Revenue Cloud before committing to a migration.

## Where should you start?

Assess your CPQ org first: number of product and price rules, size of the quote calculator plugin, integrations on SBQQ objects, open subscriptions and the renewal date. Then put the triggers above next to your roadmap for the next two years. The masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/) walks through the whole path from status to migration.

Stay, move or take a third route: each is right for some companies, as long as you choose it deliberately. If you want an independent assessment of your CPQ org, [send me a message](#contact).
