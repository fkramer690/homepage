---
title: "Ship and debit: distributor claims in Salesforce"
description: "When Channel Revenue Management pays off for ship and debit and price protection claims from distributors, what it costs and which channel data it needs."
pubDate: 2026-10-28
lang: en
slug: ship-and-debit-price-protection-distributors
translationKey: channel-revenue-ship-and-debit
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Channel Revenue Management, Ship and Debit, Price Protection, Distributors]
takeaways:
  - "Ship and debit compensates a distributor who sells to a named end customer below its own purchase cost under an agreed special price. The distributor claims the difference."
  - "Channel Revenue Management validates claims against programme rules, special pricing terms and transaction data and flags duplicates, wrong quantities and ineligible transactions."
  - "Channel Revenue Management for Manufacturing is listed as an add-on at $30,000 per org and year. Partner access is bought separately, and another Salesforce page lists rebate management from $75 without a unit."
  - "Rebates reward volume over a period. Ship and debit and price protection compensate price, deal by deal or when list prices fall."
  - "Without sell-through data and distributor stock, claim validation checks documents, not sales. That is where overpayments come from."
faq:
  - q: "What is ship and debit?"
    a: "Ship and debit, also called a special pricing agreement, is a contract that sets a discounted price for a specific end customer. The distributor sells below its purchase cost and claims the difference from the manufacturer, with proof of sale."
  - q: "How is ship and debit different from a rebate?"
    a: "A rebate rewards a dealer for volume over a period, calculated afterwards. Ship and debit compensates the price gap on specific sales to specific end customers, claim by claim."
  - q: "What does Channel Revenue Management cost?"
    a: "The Manufacturing Cloud add-ons page lists Channel Revenue Management for Manufacturing at $30,000 per org and year. The general pricing page shows no price, says it requires a Sales Cloud or CRM licence and lists partner access, extra users and payouts as available for purchase."
  - q: "Do distributors need a portal licence to submit claims?"
    a: "In the Trailhead lifecycle, claim clerks submit claims through an Experience Cloud partner portal. Partner Community for Manufacturing is listed at $20 per login or $50 per member and month. Which licence Salesforce requires for claim submission, ask your account team."
draft: false
---

Channel Revenue Management pays off for ship and debit when a manufacturer handles many special price claims from distributors and checks them by hand today. Ship and debit means the distributor sells to a named end customer below its own purchase cost and claims the difference. Salesforce validates such claims against programme rules and transaction data and adds price protection for falling list prices. The add-on is listed at $30,000 per org and year, partner access extra. It only holds up when sell-through and distributor stock data arrive, because without them the validation can only check whether the paperwork fits the programme.

## What is ship and debit?

Ship and debit is a special price for one deal. The [Trailhead unit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) calls it a special pricing agreement: "a contract that defines the discounted price for a specific customer", with a duration and the products included. Each programme is tailored to one combination of distributor and end customer.

The mechanics in the Trailhead example: a distributor buys sensor modules at $100 and sells them at $90 to end customers who order more than 1,000 units. The manufacturer reimburses $10 per unit. The distributor wins the project, the manufacturer keeps the list price for everyone else.

Price protection is the second use case. Salesforce describes it as protecting partner margins when prices change. When the manufacturer lowers a list price, distributors holding stock bought at the old price want the difference. The [product page](https://www.salesforce.com/sales/channel-revenue-management/) says price protection can be set up by "partner, price type, duration, or eligibility". The object behind it, [PriceProtectionTerm](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_priceprotectionterm.htm), exists since API version 63.0.

## How does Salesforce validate a claim?

The [Trailhead unit on the lifecycle](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/explore-the-ship-and-debit-lifecycle) describes six steps:

1. **Prepare the org.** The admin enables the features and sets up partner collaboration through Experience Cloud.
2. **Design the programme.** The channel manager defines special pricing terms, eligibility and claim requirements, then enrols partners and eligible end customers.
3. **Sell.** The distributor sells at the special price.
4. **Submit the claim.** A claim clerk at the distributor submits it through the partner portal, with invoices or purchase orders as proof of sale.
5. **Validate.** Automated checks compare the claim with programme rules, special pricing terms and transaction data. They flag duplicates, wrong quantities and ineligible transactions. Flows handle submission and approval, the Data Processing Engine handles large volumes.
6. **Settle.** Finance reviews, adjusts and reimburses. The Transaction Journal records approved payouts for audit.

The core object is the rebate partner special pricing term. It holds the special price, the reference price, the reimbursable difference, quantity thresholds, eligibility criteria and products. A claim that passes all checks gets the status System Processed. The first unit also names CRM Analytics dashboards and predefined workflows for claim validation, and lists Business Rules Engine as a prerequisite module.

Payment itself stays where it is today. Salesforce calculates and approves, the credit note is booked in the ERP. That is the same split as for [rebate management](../rebate-management-dealer-rebates/), and the interface carrying approved amounts to SAP should be planned with it.

## What does Channel Revenue Management cost?

Salesforce publishes two different views:

| Source | What it says |
|---|---|
| [Manufacturing Cloud add-ons](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) | Channel Revenue Management for Manufacturing, $30,000 per org and year, available with the Sales editions and Max |
| [Channel Revenue Management pricing](https://www.salesforce.com/sales/channel-revenue-management/pricing/) | No price, request a quote. Requires a Sales Cloud or CRM licence. Includes 10 channel manager admin users, channel inventory tracking, deal and design registration, rebate, ship and debit and price protection management. Partner access, additional users and payouts available for purchase |
| [Experience Cloud add-on page](https://salesforce.com/manufacturing/cloud/experience-cloud) | Rebate Management "from $75", without a unit |

So the $30,000 covers the add-on for the org, and partner access for distributors comes on top. The Manufacturing Cloud add-ons page lists Partner Community for Manufacturing at $20 per login or $50 per member and month. Whether payouts are counted and how many are included, the pages do not say. The $75 rebate management listing does not fit the $30,000 figure. Ask Salesforce which of these applies to your contract, and whether rebate management alone is already part of your edition.

How I would turn that into a five-year comparison against the current process is described under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

## How is ship and debit different from rebates?

Rebates reward volume. A dealer reaches a tier over a quarter or a year and gets a percentage back afterwards, as described in [rebate management for dealer rebates](../rebate-management-dealer-rebates/). Ship and debit compensates price, deal by deal, for a specific end customer. Price protection compensates price as well, triggered by a list price change instead of a deal.

That difference changes who works with the system. Rebates are calculated by programme managers at period end. Ship and debit claims arrive continuously, from claim clerks at distributors, and someone at the manufacturer has to process them within days. Trailhead promises reimbursements "within hours instead of weeks" for claims that pass automated validation. The claims that fail still need a person.

In my view, many manufacturers selling through dealers only need rebates. Ship and debit matters when distributors hold stock and quote projects for end customers you also know, typical for components, electronics or industrial supplies sold through a two-tier channel.

## Which data does claim validation need?

Sell-through and stock. A claim says: I sold 1,200 units to customer X at $90. To check it, Salesforce needs to know three things:

- **That the sale happened.** Proof of sale documents or point-of-sale data from the distributor, ideally as a regular file, not as a PDF per claim.
- **That the units came from your stock.** Channel inventory per distributor, so a claim for 1,200 units does not exceed what the distributor bought.
- **That the end customer was eligible.** A clean customer master, so "Customer X Ltd" and "Customer X Limited" count as one company when they are one.

Without these, the validation checks whether the documents match the programme, not whether the sale was real. Overpayments in price protection come from the same gap: a distributor claims stock on hand at the old price that it no longer has. Channel inventory tracking is in the package; the data still has to come from the distributors. How distributor stock reaches Salesforce, and how old it is when it arrives, I describe in [Agentforce for distributor stock and replenishment](../distributor-inventory-replenishment-agentforce/).

## Scenario: 15 distributors and 600 claims a month

A typical scenario, as an assumption: a manufacturer of electronic components sells through 15 distributors in Europe. 600 ship and debit claims arrive per month by email, with Excel lists attached. Two people in sales operations check them against special price approvals in a shared folder and pass approved amounts to finance.

With Channel Revenue Management, special prices become pricing terms, distributors submit claims through the portal, and the validation rejects duplicates and claims above the approved quantity before a person looks. Assume 80 percent of claims pass automatically. The two people then handle 120 exceptions instead of 600 claims.

Against that stand $30,000 a year for the add-on, portal licences for 15 distributors and the interface work. For partner access, the customer portal article explains [what partners see and which licence covers it](../manufacturing-cloud-customer-portal/). If only three distributors send twenty claims a month, I would keep the current process and tighten the approval rules first.

The chapter on the [dealer and partner channel](../../masterclass/manufacturing-cloud/dealer-and-partner-channel/) shows where ship and debit sits next to rebates, portals and dealer visits.

## Where should you start?

1. **Count.** Claims per month, rejected claims and the average time to payment today.
2. **Data.** Which distributors can deliver sell-through and stock as files, and how often.
3. **Price.** Add-on, partner access and payout volume quoted in writing.
4. **Process.** Who approves exceptions, and how approved amounts reach the ERP.

Channel Revenue Management pays off for ship and debit when claim volume is high and distributors deliver the data to check it. If you want to calculate that for your channel, [send me a message](#contact).
