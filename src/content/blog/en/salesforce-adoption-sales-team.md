---
title: "Sales team not using Salesforce? Causes and fixes"
description: "Why sales teams work around Salesforce after go-live, how to tell process gaps from ADKAR gaps and which four levers raise CRM adoption in manufacturing sales."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-adoption-sales-team
translationKey: change-sales-adoption
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [CRM adoption, sales, change management, ADKAR, Salesforce rollout]
takeaways:
  - "In the sales rollouts I have seen, the bottleneck was more often desire in the ADKAR model than knowledge. Another training session then changes little."
  - "Adoption grows when a rep finds more in Salesforce before a customer meeting than in their own list, such as orders and service cases from the ERP."
  - "Old routes need a switch-off date. While sales can keep working the old way without limit, little changes, and double entry leads to a shadow spreadsheet."
  - "The pipeline meeting decides: when the head of sales only discusses what is in Salesforce, Salesforce is kept up to date."
faq:
  - q: "Why does the sales team not use the CRM?"
    a: "First check whether Salesforce supports the sales process reliably: performance, permissions, mobile use and integrated data. If it does, the reasons I see most often are that data entry brings the individual rep no benefit, data has to be entered twice and management keeps working with Excel lists."
  - q: "How do you increase CRM adoption in sales?"
    a: "Make Salesforce provide reps with something they would not otherwise have, such as ERP data, remove double entry, keep required fields to a minimum and have the head of sales discuss pipeline and forecast based only on Salesforce data."
  - q: "Do more required fields help against poor data quality in sales?"
    a: "Rarely. Too many required fields are filled with placeholders. A few required fields that someone visibly uses are better, plus reports that show where fields stay empty."
  - q: "Can you report on the CRM usage of individual sales reps?"
    a: "Where a works council exists in Germany, person-level usage reporting can trigger co-determination under section 87(1)(6) of the Works Constitution Act. Check it against the applicable IT or CRM works agreement before using it, and use the smallest level of detail that serves the purpose."
draft: false
---

Sales teams work around Salesforce when data entry helps management and only means work for the rep. Contacts are then kept in Outlook, forecasts in Excel and agreements in people's heads, and Salesforce receives only a summary at the end of the month. Once the system itself works, the bottleneck in the rollouts I have seen was more often desire than knowledge, so another training session helps little. What raises adoption in sales: before a customer meeting, Salesforce has to show more than the rep's own list, double entry has to go, and the head of sales discusses pipeline and forecast only from Salesforce data.

## Why does sales work around Salesforce?

Prosci's research found five main reasons why employees resist a change: they do not understand the reason for it, their role changes, they fear the unknown, they lack trust in leadership, or they were left out of the decisions ([Prosci: Understanding Why People Resist Change](https://www.prosci.com/blog/understanding-why-people-resist-change)). In sales, several of them usually combine.

There is one more reason that is typical for sales: a CRM quickly looks like a control tool. Someone who has known their customers for years sees little point in writing visit reports for a reader who never opens them. And time is short. In the seventh edition of Salesforce's [State of Sales](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/reports/sales/salesforce-state-of-sales-report-2026.pdf), with 4,050 sales professionals surveyed in August and September 2025, reps spend 60 percent of their working time on work other than selling. Every additional field is taken from that time.

Before you look for a people problem, check whether Salesforce supports the work reliably: load times, permissions and data visibility, mobile and offline use, quality of the integrated ERP data, and whether the CRM process matches how sales actually works. Only then does the [ADKAR model](/en/blog/change-management-salesforce-rollout/) help narrow down where adoption is stuck. An observation points to a possible diagnosis; it does not prove the stage:

| What you observe | Possible bottleneck | What helps |
|---|---|---|
| "What do they need all this for?" | Awareness | Head of sales explains which decision depends on the data |
| Required fields full of dots and placeholders | Desire | Fewer fields, visible benefit for the rep |
| Questions about where to find a function | Knowledge | Training on their own customers, key user in the team |
| Data entry works in the office, not on the road | Ability | Mobile app, Outlook integration |
| Back to Excel after three months | Reinforcement | Pipeline meeting only from Salesforce |

In the rollouts I have seen, the second row was the most common, typically when the system was built for sales but not with sales. Placeholders can also mean a field is required too early or the information does not exist yet at that point.

## What does the sales rep get out of it?

This question determines the Desire stage, and it needs a concrete answer. "Better data for the company" is not enough. In manufacturing companies, the most convincing answer is usually in the ERP: orders, delivery status, open invoices and call-off quantities from framework agreements. A rep who sees in Salesforce before the meeting that the customer has, say, only called off 60 percent of the agreed quantity and has two open service cases goes into the meeting better prepared than with their own list.

```praxis
In Manufacturing Cloud, I introduced sales agreements with actuals from the ERP; in that project, the ERP was the chosen source, while Salesforce can also calculate actuals from orders in Salesforce or receive them by API. The stumbling block was the ERP interface, and that is exactly where the benefit for sales lies: without actuals, a sales agreement only shows what was agreed, not what the customer actually takes.
```

How this data reaches Salesforce is covered in [Manufacturing Cloud and SAP: which data flows where](/en/blog/manufacturing-cloud-sap-integration-data-flows/). For adoption, the order matters most: at go-live, the sales team should already receive at least one clear, reliable benefit, derived from how reps prepare their customer meetings, rather than only in a later phase. An unstable interface damages trust more than a first release with clearly stated limits. Otherwise, the sales team learns in the first weeks that Salesforce requires input but provides no value in return, and that impression lasts.

## Double entry leads straight to a shadow spreadsheet

Double entry is the fastest route to a shadow spreadsheet. Nobody should have to re-enter what is already stored somewhere else. Check three places before go-live in sales:

- **Email and calendar.** The [Outlook and Gmail integration](https://trailhead.salesforce.com/content/learn/modules/email-and-calendar-integrations-quick-look/learn-about-email-and-calendar-integration-tools) shows matching Salesforce records next to the email and lets reps log emails and events to them. Einstein Activity Capture can capture emails and events automatically and, depending on setup, sync contacts too. If it is configured for the events sales needs, a rep who plans visits in the calendar anyway does not have to record them a second time.
- **Data from the ERP.** Customer numbers, addresses, orders and revenue are transferred through the interface. Sales does not maintain them by hand.
- **Old lists.** The Excel forecast and the private customer file have a switch-off date announced by the head of sales. As long as both routes are open, the familiar one wins.

For me the last point matters most. When new processes or systems are introduced, the old route needs an end date. If the option to work the old way remains open without limit, little will change. That does not mean switching off overnight: define the conditions under which the old route closes, keep a time-limited fallback for real emergencies, and switch off once the new process has proven it works. In practice: the old template disappears from the shared drive, the old report is no longer sent out, and if Salesforce is the agreed system for quotes, managers stop approving quotes created outside it.

## How many required fields can an opportunity take?

Fewer than most functional designs plan for. Every required field needs someone who actually uses the data it captures, in a report, a forecast or a decision. If nobody does, the field becomes optional or is removed. The question for every required field in the workshop is: who reads it, and what do they do with it?

Too many required fields show up quickly in the data: placeholders, always the same picklist value, close dates moved by four weeks every month. How to find these signs in reports is covered in [Measuring Salesforce adoption after go-live](/en/blog/salesforce-adoption-metrics-after-go-live/).

```hinweis tipp
Have two sales reps and the head of sales go through the fields of an opportunity together before anything is built. Any field that none of the three needs stays optional. This also involves the sales team in the decision, one of the points Prosci names for reducing resistance.
```

## The pipeline meeting decides whether data gets maintained

In the end, leadership determines whether Salesforce is kept up to date. When the head of sales opens the Salesforce dashboard in the weekly pipeline meeting and only discusses what is in it, the team keeps Salesforce up to date. When they ask for an Excel list before the meeting, the team keeps the Excel list up to date. This is the reinforcement stage, and it requires no additional license or development work.

The same applies one level up. If the sales forecast for the management board comes from Salesforce, it is kept up to date there. What a forecast from Salesforce can look like for manufacturers is covered in [Account forecasting for manufacturing sales](/en/blog/account-forecasting-sales-volume-planning/).

I draw one line here. Rankings of individual reps by field fill rate tend to produce maintained figures instead of maintained data. Where a works council exists in Germany, person-level usage reporting can trigger co-determination under section 87(1)(6) of the Works Constitution Act and should be checked against the applicable IT or CRM works agreement before use; data protection applies either way. For steering, use the smallest level of detail that serves the purpose, often team or country, and have the manager or the [key user](/en/blog/salesforce-key-user-network/) speak with individuals.

## Ask two reps how they prepare a customer meeting

Sit down with two sales reps and ask: what do you look at before a customer meeting, and where do you find it today? Everything they name that is not in Salesforce becomes your list for the next releases. Then agree a date with the head of sales from which pipeline and forecast are discussed based only on Salesforce data. I developed this approach with my cooperation partner [Juliane Winterscheid](/en/partners/juliane-winterscheid/), who has supported a global Sales Cloud rollout among other projects. Read more about [Salesforce change management consulting](/en/services/change-management-salesforce/).
