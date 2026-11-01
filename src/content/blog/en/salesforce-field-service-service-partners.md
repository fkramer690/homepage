---
title: "Field Service: How to Bring In Service Partners"
description: "Bringing external service partners and subcontractors into Salesforce Field Service: the same way of working as internal, fitting models, licences and limits."
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
  - "Partner technicians use the same app as internal ones. They need a community licence and permission set licences for scheduling and mobile."
  - "A service territory of its own for each partner company makes sure the partner only sees their own people and appointments."
  - "Data access and invoicing stay deliberately different. A partner sees only what they need for their job."
faq:
  - q: "How do you bring subcontractors into Salesforce Field Service?"
    a: "The partner company is set up as an account with contacts, its technicians get community users with Field Service permissions and become service resources in a territory of their own. The engine then schedules them like internal technicians."
  - q: "Which licence do external technicians need for Field Service?"
    a: "They need a community licence, according to Salesforce Customer Community Plus or Partner Community, plus the permission set licences for Field Service Scheduling and Mobile. Salesforce offers contractor licences per user or per login for this."
  - q: "What is a capacity-based resource in Field Service?"
    a: "A resource, usually a partner, whose work is capped per period, for example eight hours or five appointments a day. It fits when the partner assigns their own people, but it does not support some features such as absences."
  - q: "Can internal employees use contractor licences?"
    a: "No. According to Salesforce, contractor licences are only for third-party contractors, not for your own employees."
draft: false
---

External service partners and subcontractors belong in your own processes in Salesforce Field Service. The goal is that the two worlds do not drift apart: dispatchers and technicians work the same way as far as possible, whether an internal or an external technician takes the job. Technically that usually means scheduling every partner technician as a resource of their own, giving them the same mobile app and separating the partner by a service territory of their own. In several of my projects that was exactly the goal.

This article is part 6 of the series. Licence prices for subcontractors are in [part 1](../salesforce-field-service-worth-it/), how the scheduling engine decides is in [part 3](../salesforce-field-service-scheduling-automation/).

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

According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_define_resource_capacity.htm&type=5), a capacity-based resource can take a set amount of work per period, for example eight hours or five appointments a day. It does not support everything though, such as absences, optimization of a single resource or complex work with several appointments.

For the goal of the same way of working, the first model fits better. The second makes sense for partners who only step in now and then and steer their people themselves anyway.

## What do partners need technically?

The steps are in [Salesforce Help on contractor access](https://help.salesforce.com/s/articleView?id=fs_contractor_access.htm&language=en_US&type=5). In short:

- **Account and contacts.** The partner company is an account, its technicians and the partner manager are contacts.
- **Community licence.** Partners work as users of an Experience Cloud site, with Customer Community Plus or Partner Community, depending on what the company bought.
- **Field Service permissions.** The permission set licences Field Service Scheduling and Field Service Mobile, plus a permission set of its own with the object rights needed.
- **Own profile and own mobile settings.** That way the app can be configured differently for partners without changing the internal version.
- **One service territory per partner company.** The partner manager then sees only their own people and appointments. If they should dispatch themselves, the dispatch console can be added to the Experience Cloud site.

There are two kinds of licences. Partners who work regularly get licences per user. For seasonal or rare work there are licences per login, according to Salesforce up to 20 users per login bought. How to spread licences sensibly across all roles is covered in [Salesforce licences: does everyone need a full licence?](../salesforce-licences-full-licence-needed/), and the Field Service roles in detail in [Salesforce Field Service licences: who needs which?](../field-service-licences-by-role/).

```hinweis achtung
Contractor licences are only for third-party contractors, not for your own employees.
```

## What does a partner job look like from start to finish?

Played through once, in the first model: equipment fails at a customer in a region without own technicians. The work order is created like any other, with work type, required skills and parts. The engine finds a technician with a matching skill in the partner's territory and proposes them. The dispatcher reviews the proposal as in part 3 and releases it. The partner technician sees the appointment in their app, with asset, history and checklist. On site they record working time, parts used and measured values and get the customer's signature. The service report comes from the same template as for internal technicians. What the standard can do there is covered in [Service Documents: is Document Builder enough?](../salesforce-service-documents-document-builder/).

For the customer, the job then looks exactly like one with an own technician. For the back office, everything sits on the same asset. And the partner invoice can be checked against the feedback from the app instead of a handwritten report.

## Data access, invoicing and proof of skills stay separate

The same way of working does not mean the same rights. I would separate three things on purpose:

- **Data access.** A partner technician sees their appointments, the asset and the history they need for the job. Contract details, prices and other customers stay hidden. Sharing via territory and profile handles that. Also agree with data protection which customer data a partner may see, and put that into the contract with the partner.
- **Invoicing.** Internal jobs run through cost centres, partner jobs through an invoice. The feedback from the app, working time and parts used from [part 4](../salesforce-field-service-spare-parts-erp/), is the basis for checking that invoice.
- **Proof of skills.** For your own technicians, HR maintains the skills. For partners it has to be clear who reports them and who checks them before the engine schedules the partner for a job.

## First step: write down how a job reaches your most important partner

Take your most important partner and write down how a job reaches them today and how the feedback comes back. Every step that runs differently from internal technicians is a candidate for alignment. Start with one partner and one territory before connecting all of them. Mixed setups are fine: a large core partner works in the first model, a small partner for peaks in the second. What matters is that the decision is made deliberately per partner and documented. How the rollout then runs in waves is covered in the [last part of the series](../salesforce-field-service-rollout/).
