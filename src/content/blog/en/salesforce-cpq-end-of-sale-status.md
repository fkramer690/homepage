---
title: "Salesforce CPQ end of sale: what applies in October 2026"
description: "What Salesforce has announced for CPQ and the Billing package, what existing customers may still do, and what to secure at the next renewal."
pubDate: 2026-10-28
lang: en
slug: salesforce-cpq-end-of-sale-status
translationKey: salesforce-cpq-end-of-sale-status
topic: revenue
categories: [revenue-cloud]
contactBrief: licences
tags: [Salesforce CPQ, Salesforce Billing, Revenue Cloud, end of sale, licences, renewal]
takeaways:
  - "Salesforce CPQ is end of sale, not end of life: new customers can no longer buy it, existing customers keep using it, add users, renew and get support."
  - "Salesforce has announced no end-of-life date for CPQ and states that there is no forced migration. CPQ receives support and critical fixes, but no new features."
  - "For the Salesforce Billing package there is no separate end-of-sale statement on a Salesforce page. A Salesforce spokesperson said current Billing customers keep full access."
  - "The often quoted date of March 2025 comes from third-party reports. The Salesforce page itself names no date."
  - "The next CPQ renewal is the moment to secure term, price increase cap and the right to run CPQ and Revenue Cloud side by side during a migration."
faq:
  - q: "Is Salesforce CPQ being discontinued?"
    a: "No end-of-life date has been announced. Salesforce calls CPQ end of sale, not end of life: it is no longer sold to new customers, while existing customers can keep using it, add users, renew and receive support and critical fixes."
  - q: "Do I have to migrate from Salesforce CPQ to Revenue Cloud?"
    a: "Not now. Salesforce states that there is no forced migration. CPQ will not receive new features, so the gap to Revenue Cloud grows with every release."
  - q: "Is Salesforce Billing also end of sale?"
    a: "Salesforce has published no separate end-of-sale page for the Billing package. A Salesforce spokesperson said in 2025 that current CPQ and Billing customers keep full access, and new customers are directed to Revenue Cloud Advanced and Revenue Cloud Billing."
  - q: "Can I still buy additional CPQ licences?"
    a: "Yes, as an existing customer. According to Salesforce you can buy additional users and renew under your existing contract terms."
  - q: "When did Salesforce stop selling CPQ?"
    a: "Salesforce's own page gives no date. Third parties such as SalesforceBen reported the end of sale in March 2025."
draft: false
---

Salesforce CPQ is end of sale, not end of life. New customers can no longer buy it. Existing customers can keep using CPQ, buy additional users, renew under their existing contract terms and receive support and critical fixes. New features will not come, and Salesforce has announced no end-of-life date and says there is no forced migration. For the Salesforce Billing package there is no separate statement on a Salesforce page, only a spokesperson's assurance of full access. So nobody has to migrate in a hurry, but the next CPQ renewal is the moment to secure the conditions for a later move to Revenue Cloud.

## What exactly has Salesforce announced for CPQ?

The binding source is the Salesforce page [Navigating the Future of Salesforce CPQ](https://www.salesforce.com/sales/cpq/end-of-life/). As of October 2026 it states:

- "Salesforce CPQ is end of sale, not end of life."
- Existing customers "can continue using Salesforce CPQ, buy additional users, renew licenses, and receive support", under their existing contract terms.
- CPQ is in a maintenance phase: "existing customers continue to receive support and critical fixes", but CPQ "will not receive new features or innovations".
- "Salesforce has not announced an end-of-life date for CPQ."
- "There is no forced migration" to the new product.
- About 15 percent of Revenue Cloud Advanced customers migrated from CPQ, and a typical migration runs three to six months from discovery to go-live.

The press release on [Agentforce for Revenue](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/) from 16 July 2025 adds that Salesforce "remains committed to supporting current Salesforce CPQ customers" and that it "rebuilt its CPQ solution as the all-new Revenue Cloud". That last sentence explains the situation: Revenue Cloud is the successor, and Salesforce built it as a new product rather than as a new CPQ version.

## What may existing customers still do, and what not?

In practice the status means:

| Question | Answer for existing CPQ customers |
|---|---|
| Keep using CPQ in production | Yes |
| Buy additional CPQ users | Yes |
| Renew the CPQ contract | Yes, under existing contract terms |
| Support and critical fixes | Yes |
| New features | No |
| End-of-life date | None announced |
| Forced migration | None |
| New CPQ for a new company or subsidiary org | Not as a new customer; clarify with your account team |

The last row is my own reading. A group that already licenses CPQ and wants to open a new org for a subsidiary should ask in writing whether that counts as an existing customer. I would not assume it.

What "no new features" means over time is easy to underestimate. Salesforce ships three releases a year. Each one adds to Revenue Cloud, and CPQ stays where it is. The Agentforce quoting functions that Salesforce announced in July 2025, for example, are part of Revenue Cloud. A CPQ org does not stop working, it just falls further behind the product Salesforce is actively building.

## What applies to Salesforce Billing?

Here the statements are thinner, and I would keep to exactly what is published. The CPQ page does not mention the Salesforce Billing package at all. It names Revenue Cloud Billing as the billing product of the new suite.

The only statement on Billing comes from a Salesforce spokesperson quoted by [SalesforceBen](https://www.salesforceben.com/salesforce-confirms-the-future-of-cpq/) in March 2025: "Current Salesforce CPQ & Salesforce Billing customers will continue to receive full access", and new customers are directed to Revenue Cloud Advanced and Revenue Cloud Billing.

Whether the Billing package is still sold to new customers is not stated on any Salesforce page I found. For your planning, the practical consequence is the same as for CPQ: existing customers keep running it, and Salesforce develops billing in Revenue Cloud Billing. If invoices come from the Billing package today, the move is a finance project as much as a CRM project. The details are in the article on [moving from Salesforce Billing to Revenue Cloud Billing](../from-salesforce-billing-to-revenue-cloud-billing/).

## Where does the date March 2025 come from?

Many articles say Salesforce stopped selling CPQ in March 2025. That date comes from third-party reporting such as the SalesforceBen article quoted above, updated on 27 March 2025. The Salesforce page itself names neither an end-of-sale date nor an end-of-life date. If you cite a date in a board paper or a tender, mark it as reported.

The background helps when partners use different names. Salesforce CPQ and Salesforce Billing are managed packages with the namespaces `SBQQ` and `blng`, based on SteelBrick, which Salesforce bought for $360 million according to [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/) in December 2015. The successor appeared from Spring '24 as Revenue Lifecycle Management, then as Revenue Cloud Advanced. Salesforce documentation now also says Revenue Management or Agentforce Revenue Management. When a partner says "Revenue Cloud", ask whether they mean the new product or the offering Salesforce [introduced in November 2020](https://www.salesforce.com/news/stories/introducing-revenue-cloud/) under the same name, which brought together CPQ, Billing, partner relationship management and B2B Commerce. How the two products differ technically is covered in [Salesforce CPQ vs Revenue Cloud: the real differences](../salesforce-cpq-vs-revenue-cloud-differences/).

## What should you secure at the next CPQ renewal?

For me the renewal is the real deadline, because that is when you still have something to negotiate with. Before you sign, clarify these points in writing:

1. **Term.** A longer term gives planning certainty if the migration is two or three years away. A shorter one keeps flexibility if Revenue Cloud is already on the roadmap. Decide which you need before the account team proposes one.
2. **Price increase cap.** For a product without new features, I would not accept open-ended increases at the next renewals.
3. **Parallel operation.** Salesforce's [migration guide](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) lists "Retain CPQ License" and "Coexistence During Transition" as planning topics. A migration runs CPQ and Revenue Cloud side by side for a while, so the contract should allow both without paying twice for every user for longer than necessary.
4. **User growth.** If you expect more quoting users, agree the price for additional CPQ users now.
5. **Billing.** If you also run the Billing package, renew it together with CPQ and on the same terms, so the two products do not end up with different notice periods.

A typical scenario, as an assumption: a machine builder with 60 CPQ users renews in spring 2027 and expects to move to Revenue Cloud in about two years. A two-year term with a cap on increases and a written option to run Revenue Cloud next to CPQ for six months fits this plan. A three-year term without that option would force a decision at the wrong time. How I prepare such negotiations is described under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/), and which users need which licence at all is covered in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## Does end of sale mean you should move now?

No. The status removes the urgency, and I would use that time. Whether staying, moving or a third route fits depends on your processes, your pricing master and your budget, and I go through the criteria in [keep Salesforce CPQ or move to Revenue Cloud?](../keep-salesforce-cpq-or-revenue-cloud/). For manufacturers who are only now choosing a quoting system, CPQ is no longer an option at all. They compare Revenue Cloud, partner products and a custom approach, as described in [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/).

## Where should you start?

Find the renewal date of your CPQ and Billing contracts, list how many users and which customisations you have, and decide before the account team calls whether you want a short or a long term. The whole path from status to migration is laid out in the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/).

CPQ will keep running, so the question is whether your next contract supports the plan you actually have. If you want an independent view before your renewal, [send me a message](#contact).
