---
title: "Salesforce Field Service: Bringing In Service Partners"
description: "Bringing external service partners and subcontractors into Salesforce Field Service: the same way of working as internal, fitting models, licenses and limits."
pubDate: 2026-10-27
lang: en
slug: salesforce-field-service-service-partners
translationKey: field-service-service-partners
topic: field-service
categories: [field-service]
series: { id: field-service, part: 6 }
tags: [Field Service, Service partners, Subcontractors, Experience Cloud, Manufacturing]
takeaways:
  - "Dispatchers and technicians should work the same way, whether an internal or an external technician takes the job."
  - "Either each partner technician is a service resource of their own, or the partner is a capacity-based resource. For the same way of working, the first fits."
  - "Partner technicians use the same app. They need an Experience Cloud license plus Field Service permission set licenses; Contractor Plus bundles them."
  - "A territory per partner only separates data together with private sharing settings and a check of which parent records get shared."
  - "Data access and invoicing stay deliberately different. A partner sees only what they need for their job."
faq:
  - q: "How do you bring subcontractors into Salesforce Field Service?"
    a: "The partner company is set up as an account with contacts, its technicians get Experience Cloud users with Field Service permissions and become service resources in the territories where they work. The engine then schedules them like internal technicians. Data access is settled separately through the sharing model."
  - q: "Which license do external technicians need for Field Service?"
    a: "Technically they need an Experience Cloud license (Customer Community Plus or Partner Community), the permission set licenses Field Service Scheduling and, for the app, Field Service Mobile, and a permission set with the object rights. Commercially, Salesforce sells contractor packages per user or per login; according to Salesforce, Contractor Plus includes Partner Community licenses."
  - q: "What is a capacity-based resource in Field Service?"
    a: "A resource, usually a partner, whose work is capped per period, for example eight hours or five appointments a day. It fits when the partner assigns their own people, but it does not support some features such as absences."
  - q: "Can internal employees use contractor licenses?"
    a: "No. According to Salesforce, contractor licenses are only for third-party contractors, not for your own employees."
draft: false
---

External service partners and subcontractors belong in your own processes in Salesforce Field Service. The goal is that the two worlds do not drift apart: dispatchers and technicians work the same way as far as possible, whether an internal or an external technician takes the job. Technically that usually means scheduling every partner technician as a resource of their own, giving them the same mobile app and designing data access for partners as an architecture topic of its own. In several of my projects that was exactly the goal.

This article is part 6 of the series. License prices for subcontractors are in [part 1](../salesforce-field-service-worth-it/), how the scheduling engine decides is in [part 3](../salesforce-field-service-scheduling-automation/).

## Internal and external technicians work the same way

Many manufacturers cover peaks, remote regions or certain trades with partners. If the partner is steered on the side, by email, phone and their own spreadsheet, two worlds appear. The dispatcher has two plans. The customer gets two kinds of service report. The partner's spare parts and working time only arrive with the invoice, and the asset history has gaps.

When both worlds work the same way, that goes away. The dispatcher sees internal and external technicians in the same plan, the engine chooses by the same rules, and every job ends with the same documentation on the same asset. The partner gains too. They get jobs with all the information about the asset instead of calling back for every order, and they know earlier what is coming in the next days. That makes them easier to plan, for their own people too. The master data from [part 2](../salesforce-field-service-master-data/) then applies to partners too: skills, territories and absences.

## Which models does Field Service offer?

According to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=fs_setting_up_contractors.htm) there are two ways to represent a partner:

| | Each partner technician as a service resource | Only the partner as a capacity-based resource |
|---|---|---|
| Scheduling | Engine schedules each technician | Engine schedules against a capacity, the partner assigns people |
| Mobile app | Every technician uses it | Optional, often only the partner manager |
| Skills | Maintained per technician | Only for the partner as a whole |
| Effort | Higher, every technician needs a user | Lower |
| Same way of working as internal | Yes | Only partly |

According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_define_resource_capacity.htm&type=5), a capacity-based resource can take a set amount of work per period, for example eight hours or five appointments a day. It does not support everything though. The list differs slightly between the classic engine and Enhanced Scheduling and Optimization; with the latter, Salesforce lists among others absences, optimization of a single resource and complex work as not supported.

For the goal of the same way of working, the first model fits better. The second makes sense for partners who only step in now and then and steer their people themselves anyway.

## What do partners need technically?

The steps are in [Salesforce Help on contractor access](https://help.salesforce.com/s/articleView?id=fs_contractor_access.htm&language=en_US&type=5). In short: the partner company is an account, its people are contacts with users on an Experience Cloud site (Customer Community Plus or Partner Community), plus the permission set licenses Field Service Scheduling and Field Service Mobile and a permission set with the object rights. A profile and mobile settings of their own let you configure the app for partners without touching the internal version. Partner technicians become members of the territories where they work. If the partner manager should dispatch themselves, the Scheduling Console, which replaces the Classic Dispatch Console from Summer '26 on, can be added to the Experience Cloud site according to [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.fs_scheduling_console_parent.htm&language=en_US&type=5).

Commercially, Salesforce sells contractor packages per user for regular partners and login-based packages for seasonal work. According to [Salesforce](https://help.salesforce.com/s/articleView?id=005036403&language=en_US&type=1), Contractor Plus includes Partner Community licenses, not Customer Community Plus. How to spread licenses across all roles is covered in [Salesforce licenses: does everyone need a full license?](../salesforce-licences-full-licence-needed/) and in [Salesforce Field Service licenses: who needs which?](../field-service-licences-by-role/).

```hinweis achtung
Contractor licenses are only for third-party contractors, not for your own employees.
```

## What does a partner job look like from start to finish?

Played through once as an illustration, in the first model: equipment fails at a customer in a region without own technicians. The work order is created like any other, with work type, required skills and parts. The engine finds a partner technician with a matching skill who is a member of that territory and proposes them. The dispatcher reviews the proposal as in part 3 and releases it. The partner technician sees the appointment in their app, with asset, history and checklist. On site they record working time, parts used and measured values and get the customer's signature. The service report comes from the same template as for internal technicians. What the standard can do there is covered in [Service Documents: is Document Builder enough?](../salesforce-service-documents-document-builder/).

For the customer, the job then looks exactly like one with an own technician. For the back office, everything sits on the same asset. And the partner invoice can be checked against the feedback from the app instead of a handwritten report.

## Data access, invoicing and proof of skills stay separate

The same way of working does not mean the same rights. I would separate three things on purpose:

- **Data access.** A partner technician sees their appointments, the asset and the history they need for the job. Contract details, prices and other customers stay hidden. A territory or a profile alone does not do that. The profile controls object and field rights, not which records someone sees. Separation needs private org-wide defaults and a deliberately set external sharing model, plus the Field Service sharing settings. According to [Salesforce](https://help.salesforce.com/s/articleView?id=002470705&language=en_US&type=1), sharing a service appointment with a territory can also share parent records such as accounts, assets and work orders; which of them is configurable. Test that with a partner user before go-live. Also agree with data protection which customer data a partner may see, and put that into the contract with the partner.
- **Invoicing.** Internal jobs run through cost centers, partner jobs through an invoice. The feedback from the app, working time and parts used from [part 4](../salesforce-field-service-spare-parts-erp/), is the basis for checking that invoice.
- **Proof of skills.** For your own technicians, HR maintains the skills. For partners it has to be clear who reports them and who checks them before the engine schedules the partner for a job.

## What do you need to decide?

Partner integration is not an IT project. These decisions belong to service management, purchasing and data protection:

- **Which model for which partner.** The deciding question is who plans the individual technicians, and whether their skills, availability and feedback should live in Salesforce per person. If yes, the first model fits, even for a rarely used specialist. If the partner plans their people themselves, the second is enough. Decide per partner and document why.
- **How data protection is settled.** The partner sees customer data. Responsibilities, the contractual basis, which data for which purpose and retention periods have to be settled with data protection before the first user is created, not after the first question from a customer.
- **How the partner invoice is checked.** If working time and parts from the app are the basis, the partner contract has to say so.
- **What happens when a partner leaves.** Asset history, service reports and measured values stay in your org, because the partner worked in your system. Deactivate their users, keep the service records and decide with data protection what happens to the personal data of the partner's people: retain, delete or anonymize. Keeping the service history is a strong argument for the first model.

Three warning signs that the partner model does not hold: the dispatcher keeps a separate plan for partners, partner jobs have no service report on the asset, and the partner invoice can only be checked against handwritten reports.

## First step: write down how a job reaches your most important partner

Take your most important partner and write down how a job reaches them today and how the feedback comes back. Every step that runs differently from internal technicians is a candidate for alignment. Start with one partner and one territory before connecting all of them. Mixed setups are fine: a large core partner works in the first model, a small partner for peaks in the second. What matters is that the decision is made deliberately per partner and documented. How the rollout then runs in waves is covered in the [last part of the series](../salesforce-field-service-rollout/).
