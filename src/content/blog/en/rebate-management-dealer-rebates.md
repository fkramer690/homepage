---
title: "Rebate Management: Dealer Rebates Without Excel"
description: "When Manufacturing Cloud rebate management pays off for dealer rebates, where the revenue data comes from and why payouts still happen in the ERP."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: rebate-management-dealer-rebates
translationKey: manufacturing-cloud-rebate-management
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Rebate Management, Dealer Rebates, ERP, Manufacturing]
series: { id: manufacturing-cloud, part: 5 }
takeaways:
  - "Rebate management calculates rebate programs for dealers and customers in Salesforce: program, members, tiers, payout periods and payout approval."
  - "The calculation needs transactions in the Transaction Journal. At manufacturers they usually come from invoices in the ERP."
  - "Salesforce calculates and approves, the ERP pays. An integration pulls amounts and accruals into finance."
  - "Before go-live it has to be clear what counts as rebate-relevant revenue: order, delivery or invoice, with or without returns."
  - "Rebate management pays off with many dealers on tiered programs. A simple annual bonus for a few customers often runs in the ERP as well."
faq:
  - q: "What is rebate management in Salesforce?"
    a: "Rebate management is a Salesforce product for rebate and bonus programs that works with Manufacturing Cloud and is licensed separately. Since August 18, 2026 Salesforce no longer renews it; the successor is Channel Revenue Management. It manages programs, members and tiers, calculates payouts per period with the Data Processing Engine and routes them through an approval."
  - q: "Where does the revenue for the rebate calculation come from?"
    a: "From the Transaction Journal object. Salesforce fills it from orders in Salesforce, from partner CSV uploads through Experience Cloud, or via API and Data Loader from external systems such as the ERP."
  - q: "Does Salesforce pay out the rebates?"
    a: "No. Salesforce calculates and approves the amounts. An integration moves approved payouts and accruals into the ERP, and finance settles them there, for example as a credit note."
draft: false
---

Rebate management pays off for manufacturers who calculate rebate programs for many dealers, with tiers and periods, in spreadsheets today, and whose dealers keep asking where they stand. The Salesforce product manages programs and members, calculates rebates per period and routes them through an approval. Payouts still happen in the ERP. Whether it holds up is decided in two places: where the rebate-relevant revenue comes from, and what exactly counts as revenue. Like part 4, I am writing this part as an evaluation guide, not as a project report.

```hinweis achtung
Rebate management is not a core feature of Manufacturing Cloud but a separately licensed product. According to a [Salesforce knowledge article](https://help.salesforce.com/s/articleView?id=005393495&language=en_US&type=1), the Rebate Management products, including Rebate Management for Manufacturing, can no longer be renewed since August 18, 2026. Existing contracts run until their end date, and Salesforce names Channel Revenue Management as the successor. This article describes Rebate Management. For a new project, ask for Channel Revenue Management in the quote and check which of the points below it handles differently; the questions about revenue, transactions and settlement stay the same.
```

## What does rebate management do?

Rebate management covers a rebate program from definition to payout approval. The [Salesforce Help article on the workflow](https://help.salesforce.com/s/articleView?id=sf.admin_rebates_workflow.htm&language=en_US&type=5) describes the steps like this:

1. **Create the program.** The program manager creates the program and sets the payout frequency, monthly, quarterly or yearly.
2. **Enroll members.** Partner accounts become members of the program.
3. **Define rebate types and tiers.** Each rebate type has a calculation and tiers, for example a higher percentage above a certain revenue. Tiers can vary by custom criteria.
4. **Load transactions.** Members' revenue lands in the Transaction Journal object.
5. **Calculate.** A scheduled flow starts the Data Processing Engine, which aggregates transactions per member and period and works out the rebate.
6. **Review and approve.** Account managers and program managers review the amounts, adjust them if needed and approve them, by hand or through an approval by supervisors.
7. **Settle.** An integration pulls approved amounts into the ERP.

Until the calculation date, a member's status reads "Calculation in Progress", afterwards "Calculated". So sales can see during the period where a dealer stands, not only at year end.

## Where do the transactions come from?

The calculation only uses the revenue that sits in the Transaction Journal. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.admin_rebates_populate_transaction_data.htm&language=en_US&type=5) there are three routes:

| Source | How it reaches the Transaction Journal | Fits when |
|---|---|---|
| Orders in Salesforce | A predefined Data Processing Engine definition transfers active orders | orders live in Salesforce anyway |
| Partner documents | Partners upload invoices or proof of sale as CSV through Experience Cloud | the rebate depends on the dealer's sell-out |
| External systems | Integration, Bulk API or Data Loader, for example from the ERP | invoices live in the ERP |

For most manufacturers it will be the third route, because invoices are created in the ERP. That raises the same question as for sales agreements in [part 3](../sales-agreements-volume-shortfall-erp/): which data does the ERP deliver, at which level and how often?

The second route is interesting for a particular kind of program. If the rebate depends on the dealer's sales to their own customers, only the dealer knows the numbers. Then they upload them, and the manufacturer needs a check before it turns into a payout.

## What counts as rebate-relevant revenue?

No system answers this question. According to Help, program managers decide what a transaction contains and whether to calculate per transaction or on an aggregate. Before building, I would put three points in writing:

- **Order, delivery or invoice.** A rebate on orders runs ahead of the invoice, a rebate on invoices is closer to what finance books. Which one applies should be in the dealer contract.
- **Returns and credit notes.** Is a return deducted from revenue, and in which period? Without that rule, Salesforce calculates a rebate on revenue that never stayed.
- **Which products.** Many programs exclude product groups or weight them differently. Those criteria have to be fields on the transactions, or the tiers cannot take them into account.

Three more points are often missing from the first draft, because they only show up once money has been paid:

- **Status of the transactions.** According to [Help on the rebate calculation](https://help.salesforce.com/s/articleView?id=xcloud.admin_rebates_dpe_templates.htm&language=en_US&type=5), the calculation does not automatically exclude transactions by their status. If only approved transactions should count, that filter has to be configured.
- **Corrections after period close.** Late invoices, returns and credit notes arrive after a period has been calculated. Decide whether a closed period is reopened or the correction goes into the next one.
- **Audit trail.** Who changed a tier or an amount, and who approved it, has to be traceable for finance and for disputes with dealers.

Today these rules usually live in the spreadsheet someone in sales or finance calculates with. So the first step of an implementation is to read that spreadsheet and turn every formula in it into a rule. The spreadsheet rarely contains the correction and approval steps around it, so those come from finance, not from the file.

## The payout stays in the ERP

According to Help, an integration pulls approved amounts and accruals into the ERP, and finance settles them there, by check, credit note or another method.

This gives the architecture a clear split. **Salesforce leads** for programs, members, tiers, the calculation and the approval, **the ERP leads** for invoices, credit notes, accruals and posting:

```ablauf
erp: Invoices, Payout
sf: Transaction Journal, Calculation, Approval
Invoices --Integration--> Transaction Journal
Transaction Journal --> Calculation
Calculation --> Approval
Approval --Amounts--> Payout
```

Accruals deserve their own meeting with finance. Anyone accruing an annual rebate monthly needs a number every month. If it comes from Salesforce, it has to be in the ERP in time for month-end close. How I decide leading systems per type of data is described under [integration with ERP, middleware and telephony](../../services/salesforce-integration/).

## Dealers can see their amounts in the portal

That is optional. According to Help, partners can see their payouts through Experience Cloud. For dealers who ask about their status by email today, that is the most visible benefit.

In the overview of portal licenses I describe in [part 7: Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/), Salesforce lists rebate claims under the Partner Community for Manufacturing license. So if you want to show dealers their rebates in the portal, plan for partner licenses, not the cheaper customer license.

```hinweis achtung
A dealer who sees their interim status adjusts their behavior to it. If returns are missing there or numbers are a week old, there is trouble at the end of the period. I would only switch on the interim status once the calculation has been right internally for a few periods.
```

## When does rebate management pay off?

```praxis
In one manufacturing project I evaluated Manufacturing Cloud and decided against it, because its core feature did not fit the business.
```

The rule from that applies here too: you buy a feature when it fits the business. For rebate management, I would recommend it when several of these points apply:

- **Many members.** Dozens or hundreds of dealers, not a handful of customers.
- **Tiered programs.** Several levels, product groups or periods that change every year.
- **Errors in the spreadsheet.** The calculation is laborious today, error-prone or depends on one person.
- **Dealers ask.** Inside sales regularly answers questions about rebate status.

I would hold back with a simple annual bonus for a few customers. Many ERP systems can settle that through pricing conditions, without a second logic in Salesforce. Rebates reward volume; price claims from distributors are a different process, see [ship and debit](../ship-and-debit-price-protection-distributors/). Whether Manufacturing Cloud pays off as a whole is covered in [part 1 of this series](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Write every formula in the current rebate spreadsheet down as a rule

Before the first program is created, settle these points:

1. **Today's spreadsheet.** Write down every formula in it as a rule.
2. **Rebate-relevant revenue.** Order, delivery or invoice, with returns, product groups, transaction status and corrections after period close.
3. **Transactions.** Which system delivers them, at which level and how often?
4. **Settlement.** When do approvals and accruals reach the ERP, aligned with month-end close?

I go through the formulas in the current spreadsheet line by line with sales and finance. A formula nobody can explain does not go into the first program.
