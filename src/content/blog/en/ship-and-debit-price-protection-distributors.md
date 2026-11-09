---
title: "Ship and debit: distributor claims in Salesforce"
metaTitle: "Salesforce ship and debit: process, cost and data needed"
description: "Ship and debit in Salesforce: how claims are validated, which sell-through and stock data you need, and what comes on top of the $30,000 list price."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: ship-and-debit-price-protection-distributors
translationKey: channel-revenue-ship-and-debit
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Channel Revenue Management, Ship and Debit, Price Protection, Distributors]
takeaways:
  - "In ship and debit, the distributor sells to a named end customer below its own purchase cost and claims the difference from the manufacturer."
  - "Channel Revenue Management validates claims against program rules and transaction data and flags duplicates, wrong quantities and ineligible sales."
  - "Channel Revenue Management for Manufacturing is listed at $30,000 per org and year. Partner access, extra users and payout volume can come on top."
  - "Rebates reward volume over a period. Ship and debit and price protection compensate price, deal by deal or when list prices fall."
  - "Without structured sell-through data the check stays document-based, and without distributor stock there is no match. That is where overpayments start."
faq:
  - q: "What is ship and debit?"
    a: "In ship and debit, the manufacturer approves a special price for a distributor for specific products, end customers, quantities and periods. The distributor sells from stock below its purchase cost and then claims the difference from the manufacturer, with proof of sale. The special pricing agreement sets the terms; the claim triggers the refund."
  - q: "How is ship and debit different from a rebate?"
    a: "A rebate rewards a dealer for volume over a period, calculated afterwards. Ship and debit compensates the price gap on specific sales to specific end customers, claim by claim."
  - q: "What does Channel Revenue Management cost?"
    a: "The Manufacturing Cloud add-ons page lists Channel Revenue Management for Manufacturing at $30,000 per org and year. The general pricing page shows no price, says it requires a Sales Cloud or CRM license and lists partner access, extra users and payouts as available for purchase. Salesforce measures usage by the total value of calculated payouts; how much is included has to be in the quote."
  - q: "Which data does Salesforce need for ship and debit?"
    a: "At a minimum special pricing terms, eligible distributors and end customers, and proof of sale. For largely automatic validation you also need structured sell-through data and a match against deliveries, returns and distributor stock."
  - q: "Do distributors need a portal license to submit claims?"
    a: "In the Trailhead lifecycle, claim clerks submit claims through an Experience Cloud partner portal. Partner Community for Manufacturing is listed at $20 per login or $50 per member and month. Which license Salesforce requires for claim submission, ask your account team."
draft: false
---

Channel Revenue Management pays off for ship and debit when a manufacturer handles many special price claims from distributors and checks them by hand today. Ship and debit means the distributor sells to a named end customer below its own purchase cost and claims the difference. Salesforce validates such claims against program rules and transaction data and adds price protection for falling list prices. The add-on is listed at $30,000 per org and year, partner access extra. It only holds up when sell-through and distributor stock data arrive, because without them the validation mainly checks whether the paperwork fits the program.

## What is ship and debit?

Ship and debit is a special price for one deal, and the name describes the two steps: the distributor ships at the approved special price and then debits the manufacturer for the difference. The [Trailhead unit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) calls it a special pricing agreement: "a contract that defines the discounted price for a specific customer", with a duration and the products included. Each program is tailored to one combination of distributor and end customer.

The mechanics in the Trailhead example: a distributor buys sensor modules at $100 and sells them at $90 to end customers who order more than 1,000 units. The manufacturer reimburses $10 per unit. The distributor wins the project, the manufacturer keeps the list price for everyone else.

Price protection is the second use case. Salesforce describes it as protecting partner margins when prices change. When the manufacturer lowers a list price, distributors holding stock bought at the old price want the difference. The [product page](https://www.salesforce.com/sales/channel-revenue-management/) says price protection can be set up by "partner, price type, duration, or eligibility". The object behind it, [PriceProtectionTerm](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_priceprotectionterm.htm), exists since API version 62.0.

## How does Salesforce validate a claim?

The [Trailhead unit on the lifecycle](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/explore-the-ship-and-debit-lifecycle) describes six steps:

```schritte
Prepare the org | Admin
  Enable the features and set up partner collaboration through Experience Cloud.
Design the program | Channel manager
  Define special pricing terms, eligibility and claim requirements, then enrol partners and eligible end customers.
Sell | Distributor
  The distributor sells at the special price.
Submit the claim | Claim clerk at the distributor
  Submission through the partner portal, with invoices or purchase orders as proof of sale.
Validate | Automated
  Checks compare the claim with program rules, special pricing terms and transaction data and flag duplicates, wrong quantities and ineligible transactions.
Settle | Finance
  Review, adjust and reimburse. The Transaction Journal records approved payouts for audit.
```

Flows handle submission and approval, the Data Processing Engine handles large volumes. The core object is the rebate partner special pricing term. It holds the special price, the reference price, the reimbursable difference, quantity thresholds, eligibility criteria and products. A claim that passes all checks gets the status System Processed. The first unit also names CRM Analytics dashboards and predefined workflows for claim validation, and lists Business Rules Engine as a prerequisite module.

Payment itself stays where it is today. In the typical target architecture Salesforce calculates and approves, and the credit note is booked in the ERP; Salesforce does not replace accounting. Whether the handover happens at the approved claim or at the payout is a solution design decision. That is the same split as for [rebate management](../rebate-management-dealer-rebates/), and the interface carrying approved amounts to SAP should be planned with it.

## What Salesforce publishes on price, and what stays open

Salesforce publishes two different views:

| Source | What it says |
|---|---|
| [Manufacturing Cloud add-ons](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) | Channel Revenue Management for Manufacturing, $30,000 per org and year, available with the Sales editions and Max |
| [Channel Revenue Management pricing](https://www.salesforce.com/sales/channel-revenue-management/pricing/) | No price, request a quote. Requires a Sales Cloud or CRM license. Includes 10 channel manager admin users, channel inventory tracking, deal and design registration, rebate, ship and debit and price protection management. Partner access, additional users and payouts available for purchase |

So the $30,000 is the list price of the add-on for the org, not necessarily the contract value. Partner access for distributors comes on top; which external license fits cannot be derived clearly from the public pages. The [Manufacturing Cloud Experience Cloud page](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) lists Partner Community for Manufacturing at $20 per login or $50 per member and month.

```hinweis offen
Payouts are counted: according to [Salesforce Help](https://help.salesforce.com/s/articleView?id=xcloud.chrm_payout_usage.htm&language=en_US&type=5), usage is based on the total value of all payouts from rebates, ship and debit, price protection and stock rotation over the order term. How much is included, the pages do not say. Get Salesforce to state in writing which price and which payout volume apply to your contract.
```

How I would turn that into a five-year comparison against the current process is described under [make-or-buy and license forecasts](../../services/make-or-buy-licences/).

## How is ship and debit different from rebates?

Rebates reward volume. A dealer reaches a tier over a quarter or a year and gets a percentage back afterwards, as described in [rebate management for dealer rebates](../rebate-management-dealer-rebates/). Ship and debit compensates price, deal by deal, for a specific end customer. Price protection compensates price as well, triggered by a list price change instead of a deal.

That difference changes who works with the system. Rebates are calculated by program managers at period end. Ship and debit claims arrive continuously, from claim clerks at distributors, and someone at the manufacturer has to process them within days. Trailhead promises reimbursements "within hours instead of weeks" for claims that pass automated validation. The claims that fail still need a person.

In my view, many manufacturers selling through dealers only need rebates. Ship and debit matters when distributors hold stock and quote projects for end customers you also know, typical for components, electronics or industrial supplies sold through a two-tier channel.

## Claim validation needs sell-through and distributor stock

Sell-through and stock. A claim says: I sold 1,200 units to customer X at $90. To check it, Salesforce needs to know three things:

- **That the sale happened.** Proof of sale documents or point-of-sale data from the distributor, ideally as a regular file, not as a PDF per claim.
- **That the units came from your stock.** Channel inventory per distributor, so a claim for 1,200 units does not exceed what the distributor bought.
- **That the end customer was eligible.** A clean customer master, so "Customer X Ltd" and "Customer X Limited" count as one company when they are one.

Without structured sell-through data, the validation mainly checks whether the documents match the program. Without stock, it cannot check whether the claimed quantity fits the distributor's deliveries, returns and inventory, and that match is what finds duplicate claims and overpayments. Overpayments in price protection come from the same gap: a distributor claims stock on hand at the old price that it no longer has. Channel inventory tracking is in the package; the data still has to come from the distributors. How distributor stock reaches Salesforce, and how old it is when it arrives, I describe in [Agentforce for distributor stock and replenishment](../distributor-inventory-replenishment-agentforce/).

## Example: 15 distributors and 600 claims a month

The figures are assumed. A manufacturer of electronic components sells through 15 distributors in Europe. 600 ship and debit claims arrive per month by email, with Excel lists attached. Two people in sales operations check them against special price approvals in a shared folder and pass approved amounts to finance.

With Channel Revenue Management, special prices become pricing terms, distributors submit claims through the portal, and the validation rejects duplicates and claims above the approved quantity before a person looks. Assume 80 percent of claims pass automatically. The two people then handle 120 exceptions instead of 600 claims. The 80 percent is not a Salesforce figure. For a business case I would first run 100 to 200 historical claims against the planned rules and measure the real rate.

Against that stand $30,000 a year for the add-on, portal licenses for 15 distributors and the interface work. For partner access, the customer portal article explains [what partners see and which license covers it](../manufacturing-cloud-customer-portal/). If only three distributors send twenty claims a month, I would keep the current process and tighten the approval rules first. The chapter on the [dealer and partner channel](../../masterclass/manufacturing-cloud/dealer-and-partner-channel/) shows where ship and debit sits next to rebates, portals and dealer visits.

## Count claims per month

1. **Count.** Claims per month, rejected claims and the average time to payment today.
2. **Data.** Which distributors can deliver sell-through and stock as files, and how often.
3. **Test.** Run 100 to 200 historical claims against the planned rules and count how many pass automatically.
4. **Price.** Add-on, partner access and payout volume quoted in writing.
5. **Process.** Who approves exceptions, and how approved amounts reach the ERP.
