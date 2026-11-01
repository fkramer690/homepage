---
title: "Sales team not using Salesforce? Causes and fixes"
description: "Why sales teams work around Salesforce after go-live, which ADKAR stage is behind it and which four levers raise CRM adoption in manufacturing sales."
pubDate: 2026-10-29
lang: en
slug: salesforce-adoption-sales-team
translationKey: change-sales-adoption
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [CRM adoption, sales, change management, ADKAR, Salesforce rollout]
takeaways:
  - "The most common cause is missing desire in the ADKAR model, not missing knowledge. Another training session changes little."
  - "Adoption grows when a rep finds more in Salesforce before a customer meeting than in their own list, such as orders and service cases from the ERP."
  - "There must be no way back. As long as sales can keep working the old way, nothing changes, and double entry leads straight to a shadow spreadsheet."
  - "The pipeline meeting decides: when the head of sales only discusses what is in Salesforce, Salesforce gets maintained."
faq:
  - q: "Why does the sales team not use the CRM?"
    a: "Usually because data entry brings the individual rep no benefit, data has to be entered twice and management keeps working with Excel lists. Missing knowledge is the less common reason."
  - q: "How do you increase CRM adoption in sales?"
    a: "Make Salesforce give reps something they do not have otherwise, such as ERP data, remove double entry, keep few required fields and have the head of sales discuss pipeline and forecast only from Salesforce."
  - q: "Do more required fields help against poor data quality in sales?"
    a: "Rarely. Too many required fields get filled with placeholders. Better are a few required fields that someone visibly uses, plus reports that show where fields stay empty."
  - q: "Can you report on the CRM usage of individual sales reps?"
    a: "In Germany, reports per person are a topic for the works council and need to be agreed with it first. For steering, figures per team or country are usually enough."
draft: false
---

Sales teams work around Salesforce when data entry helps management and only means work for the rep. Contacts then live in Outlook, forecasts in Excel and agreements in people's heads, and Salesforce gets a summary at the end of the month. The cause is usually missing desire, more rarely missing knowledge, so another training session helps little. What raises adoption in sales: before a customer meeting Salesforce has to show more than the rep's own list, double entry has to go, and the head of sales discusses pipeline and forecast only from Salesforce.

## Why does sales work around Salesforce?

Prosci's research found five main reasons why employees resist a change: they do not understand the reason for it, their role changes, they fear the unknown, they lack trust in leadership, or they were left out of the decisions ([Prosci: Understanding Why People Resist Change](https://www.prosci.com/blog/understanding-why-people-resist-change)). In sales, several of them usually come together.

There is one more reason that is typical for sales: a CRM quickly looks like a control tool. Someone who has known their customers for years sees little point in writing visit reports for a reader who never opens them. And time is short. In the fifth edition of Salesforce's [State of Sales](https://www.salesforce.com/news/stories/sales-research-2023/) with 7,775 responses, sales professionals said they spend only 28 percent of their working time selling. Every additional field comes out of that time.

The [ADKAR model](../change-management-salesforce-rollout/) shows where it is stuck:

| What you observe | Missing stage | What helps |
|---|---|---|
| "What do they need all this for?" | Awareness | Head of sales explains which decision depends on the data |
| Required fields full of dots and placeholders | Desire | Fewer fields, visible benefit for the rep |
| Questions about where to find a function | Knowledge | Training on their own customers, key user in the team |
| Data entry works in the office, not on the road | Ability | Mobile app, Outlook integration |
| Back to Excel after three months | Reinforcement | Pipeline meeting only from Salesforce |

The second row is the most common. It appears when the system was built for sales but not with sales.

## What does the sales rep get out of it?

This question decides desire, and it needs a concrete answer. "Better data for the company" is not enough. At manufacturers the most convincing answer usually sits in the ERP: orders, delivery status, open invoices and call-off quantities from framework agreements. A rep who sees in Salesforce before the meeting that the customer has, say, only called off 60 percent of the agreed quantity and has two open service cases walks in better prepared than with their own list.

```praxis
In Manufacturing Cloud I introduced sales agreements with actuals from the ERP. The stumbling block was the ERP interface, and that is exactly where the benefit for sales lies: without actuals, a sales agreement only shows what was agreed, not what the customer really takes.
```

How this data gets into Salesforce is covered in [Manufacturing Cloud and SAP: which data flows where](../manufacturing-cloud-sap-integration-data-flows/). For adoption, the order matters most: data that helps sales should be there at go-live, not in a later phase. Otherwise sales learns in the first weeks that Salesforce only takes and never gives, and that impression sticks.

## Double entry leads straight to a shadow spreadsheet

Double entry is the fastest route to a shadow spreadsheet. Nobody should have to type in again what is already stored somewhere else. Check three places before go-live in sales:

- **Email and calendar.** The [Outlook and Gmail integration](https://trailhead.salesforce.com/content/learn/modules/email-and-calendar-integrations-quick-look/learn-about-email-and-calendar-integration-tools) shows matching Salesforce records next to the email and relates emails and events to them. Einstein Activity Capture syncs contacts and events automatically. A rep who plans visits in the calendar anyway does not have to record them a second time.
- **Data from the ERP.** Customer numbers, addresses, orders and revenue come through the interface. Sales does not maintain them by hand.
- **Old lists.** The Excel forecast and the private customer file get a switch-off date that the head of sales announces. As long as both routes are open, the familiar one wins.

For me the last point matters most. When new processes or systems are introduced, you always have to make sure there is no way back. If the option to work the old way remains, no change will happen. In practice: the old template disappears from the shared drive, the old report is no longer sent out, and quotes that do not come from Salesforce no longer get approved by the manager.

## How many required fields can an opportunity take?

Fewer than most functional designs plan for. Every required field needs someone who actually uses its content, in a report, a forecast or a decision. If nobody does, the field becomes optional or goes. The question for every required field in the workshop is: who reads it, and what do they do with it?

Too many required fields show up quickly in the data: placeholders, always the same picklist value, close dates moved by four weeks every month. How to find these signs in reports is covered in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

```hinweis tipp
Have two sales reps and the head of sales go through the fields of an opportunity together before anything is built. Whatever none of the three needs stays optional. This also involves sales in the decision, one of the points Prosci names against resistance.
```

## The pipeline meeting decides whether data gets maintained

In the end, leadership reinforces whether Salesforce gets maintained. When the head of sales opens the Salesforce dashboard in the weekly pipeline meeting and only discusses what is in it, the team maintains Salesforce. When they ask for an Excel list before the meeting, the team maintains the Excel list. This is the reinforcement stage, and it costs no licence and no development.

The same applies one level up. If the sales forecast for the management board comes from Salesforce, it gets maintained there. What a forecast from Salesforce can look like for manufacturers is covered in [Account forecasting for manufacturing sales](../account-forecasting-sales-volume-planning/).

I draw one line here. Rankings of individual reps by data quality lead to maintained figures instead of maintained data. In Germany, a report per person needs to be agreed with the works council first anyway. For steering, figures per team or country are enough, and the conversation with individuals is held by their manager or the [key user](../salesforce-key-user-network/).

## Ask two reps how they prepare a customer meeting

Sit down with two sales reps and ask: what do you look at before a customer meeting, and where is it today? Everything they name that is not in Salesforce is your list for the next releases. Then agree a date with the head of sales from which pipeline and forecast are only discussed from Salesforce. I developed this approach with my cooperation partner [Juliane Winterscheid](../../partners/juliane-winterscheid/), who has supported a global Sales Cloud rollout among other projects. Read more about [Salesforce change management consulting](../../services/change-management-salesforce/).
