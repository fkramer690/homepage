---
title: "Keep Salesforce CPQ or move to Revenue Cloud?"
description: "When manufacturers should stay on Salesforce CPQ for now, move to Revenue Cloud or take a third route, with triggers, a decision matrix and first steps."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: keep-salesforce-cpq-or-revenue-cloud
translationKey: stay-on-cpq-or-migrate
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: make-or-buy
tags: [Salesforce CPQ, Revenue Cloud, migration, make-or-buy, decision]
takeaways:
  - "Reasons to move are agent-based quoting, newer consumption models such as wallets and commitments, or a product model that is redesigned anyway."
  - "Reasons to wait are a stable quoting process, prices from the ERP, an ERP migration under way or no budget for a redesign this year."
  - "A partner product or a custom approach fits when configuration rules live in the ERP or in engineering."
  - "The decision starts with an assessment of your CPQ org: rules, price logic, customisations and integrations show how big the redesign would be."
faq:
  - q: "Should I stay on Salesforce CPQ or move to Revenue Cloud?"
    a: "Stay for now if your quoting process is stable and you need nothing new. Move when you need features that only Revenue Cloud gets, such as agent-based quoting or consumption management with wallets, or when you redesign products and processes anyway. Simple usage billing also works with CPQ plus Salesforce Billing."
  - q: "How long does a migration from CPQ to Revenue Cloud take?"
    a: "Salesforce's CPQ page names three to six months as typical, from discovery to go-live, while its migration guidance sets no fixed timeframe. For manufacturers with ERP pricing, complex catalogs or installed-base data I would not plan with that range before an assessment."
  - q: "How many companies have moved from CPQ to Revenue Cloud?"
    a: "According to Salesforce, about 15 percent of Revenue Cloud Advanced customers migrated from Salesforce CPQ. That is a share of Advanced customers, not the share of CPQ customers who have moved."
  - q: "What does Revenue Cloud cost compared with CPQ?"
    a: "Revenue Cloud Advanced, which Salesforce names as the CPQ successor, is listed at €200 per user and month on an annual contract as an add-on to Sales Cloud (Growth: €150, without contracts and orchestration; as of 9 November 2026). Your CPQ renewal price depends on your existing contract, so compare it with a quote from your account team."
draft: false
---

Staying on Salesforce CPQ is allowed and often the right choice for now. Existing customers renew, add users and get support, and Salesforce has announced neither an end-of-life date nor a forced migration. Move to Revenue Cloud (now Agentforce Revenue Management) when you need something only it gets, such as agent-based quoting or newer consumption models, or when you redesign your product model anyway. Wait when your process is stable or a larger project has priority. And check a third route, a partner product or a custom approach, when your configuration rules live outside Salesforce. Start with an honest assessment of your CPQ org.

## Can you simply stay on CPQ?

Yes. According to [Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/), CPQ is "end of sale, not end of life". The exact status, including what applies to the Billing package, is in [Salesforce CPQ end of sale: what applies in October 2026](../salesforce-cpq-end-of-sale-status/).

Staying is therefore a legitimate decision. It is still a decision with a price:

```pro-contra
pro: What you keep
- Existing customers keep using CPQ under their current contracts, renew and buy additional users
- Support and critical fixes
- No end-of-life date and, according to Salesforce, "no forced migration"
contra: What you give up
- No new features: Salesforce directs new revenue innovation to Revenue Cloud, CPQ gets none
- Partners build up Revenue Cloud teams rather than CPQ teams, I expect
- So the knowledge to maintain a heavily customized CPQ org will not get cheaper
```

I would decide consciously and write down when you will look at it again, instead of letting it drift.

## When should you move to Revenue Cloud?

These triggers speak for a move in the next one to two years:

- **You need what only Revenue Cloud gets.** Salesforce announced Agentforce quoting in July 2025 as part of [Revenue Cloud](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/), with sellers creating quotes from a plain-language request. CPQ will not get such features.
- **New consumption models.** Subscriptions, renewals and simple usage billing also work with CPQ plus the Salesforce Billing package. If remote monitoring subscriptions or pay-per-use should run with commitments, grants and wallets, Revenue Cloud has consumption and wallet management; usage-based invoices need the separate Revenue Cloud Billing license.
- **The product model changes anyway.** A new product generation, a new variant structure or a catalog clean-up is a redesign. Doing it twice, once in CPQ and later again in Revenue Cloud, wastes the work.
- **Org relaunch or partner change.** When the org is rebuilt or a new partner takes over, the move fits into a project that is happening anyway. An [AI org assessment](../ai-org-assessment-technical-debt/) helps to see what is actually in the old org.
- **CPQ customisations are fragile.** If every release test breaks something in the quote calculator plugin and only one person understands it, a redesign removes a risk.

## Waiting fits a stable process and prices from the ERP

Waiting makes sense when:

- **The quoting process is stable** and nobody is asking for new functions.
- **Prices come from the ERP anyway.** If CPQ mainly fetches a net price from SAP and prints a quote, Revenue Cloud adds little to that step.
- **A larger project has priority.** An S/4HANA migration or a Manufacturing Cloud rollout ties up the same people. Two redesigns in parallel rarely end well.
- **There is no budget for a redesign this year.** A half-financed migration is worse than a well-run CPQ org.

Waiting does not mean doing nothing. Delete unused rules, document the price logic and secure a renewal that allows parallel operation later. That makes a later move cheaper.

## The third route: partner product or custom approach

Yes, and I would always check it before signing anything. Besides Revenue Cloud there are partner products, custom approaches on the platform, quoting in the ERP or engineering configuration with Salesforce as the front end, and mixed setups during a transition. It helps to decide separately where selling, configuration, pricing and billing are led; for manufacturers these do not have to sit in one product. How a custom approach with its own product configurator feeds quotes and sales agreements is described in [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/).

A third route fits when your configuration rules live in SAP variant configuration, in a PLM system or with application engineers, and Salesforce would only display the result. Then a full constraint model in Revenue Cloud duplicates rules that someone has to keep in sync. The make-or-buy questions are the same as for any product: how well does the standard fit, who maintains the rules, and what do license and maintenance cost over several years. I describe how I calculate that under [make-or-buy and license forecasts](../../services/make-or-buy-licences/).

Salesforce's own numbers give some context. According to the CPQ page, about 15 percent of Revenue Cloud Advanced customers migrated from CPQ. That is a share of Advanced customers, not the share of the CPQ installed base that has moved. The figure shows that migrations happen. It does not show that CPQ customers are running out of time.

## The decision matrix

| Situation | Stay on CPQ for now | Move to Revenue Cloud | Third route |
|---|---|---|---|
| Stable process, no new requirements | Yes | Later | No |
| Agent-based quoting wanted | No | Yes | Check partner products |
| Simple subscription or usage billing in Salesforce | With Salesforce Billing | Possible | Rarely |
| Consumption with commitments or wallets | Usually not | Yes, with Billing license | Rarely |
| Product model redesigned anyway | Only as a transition | Usually | If rules live in the ERP |
| Prices calculated in SAP | Yes | Only with a clear benefit | Possible |
| Configuration rules in SAP or PLM | Yes | Check effort carefully | Yes |
| ERP migration running | Yes | Design together, build after | Design together, build after |
| Fragile CPQ customisations | Short term | Yes | Yes |

The matrix is a starting point. If two columns are ticked, the deciding factors are usually budget and the people who can model rules and prices.

## What does a move cost?

Licenses are the easier part, but not only per user. The [Revenue Cloud pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) lists these prices on an annual contract:

```kennzahlen
€150 | Revenue Cloud Growth per user and month
€200 | Revenue Cloud Advanced per user and month
source: Salesforce Revenue Cloud pricing page, as of 9 November 2026, add-on to Sales Cloud
```

Salesforce names Advanced as the CPQ successor; Growth lacks contracts, Dynamic Revenue Orchestrator and Agentforce for Revenue Management, so it is not a like-for-like replacement for many CPQ orgs. As an assumption, 50 quoting users on Advanced add €120,000 a year at list price on top of Sales Cloud. The Revenue Cloud Billing license and consumption-based credits for some features come on top. Your current CPQ price depends on your contract, so ask your account team for both figures.

The larger cost is the redesign. Salesforce's CPQ page names three to six months as a typical migration, but its [migration guide](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) sets no fixed timeframe and makes clear that tools do not replace design decisions for custom logic and integrations. Why that is so is explained in [Salesforce CPQ vs Revenue Cloud: the real differences](../salesforce-cpq-vs-revenue-cloud-differences/).

A worked example: a machine builder with 50 CPQ users, 200 product rules, a quote calculator plugin and a CPQ renewal in nine months. Prices come from SAP, the configurator rules partly from engineering. Here I would first ask Salesforce to price a renewal and a licensed parallel period long enough for assessment, build and cutover, clean up the rules now, and run a proof of concept for the ten most important machines in Revenue Cloud before committing to a migration.

## Assess your CPQ org

Assess your CPQ org first: number of product and price rules, size of the quote calculator plugin, integrations on SBQQ objects, open subscriptions, assets and contracts, billing data if you use Salesforce Billing, approvals, quote documents, reports, the amount of historical data and the renewal date. Then put the triggers above next to your roadmap for the next two years. The masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/) walks through the whole path from status to migration.
