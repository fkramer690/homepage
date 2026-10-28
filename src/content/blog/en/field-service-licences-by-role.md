---
title: "Field Service licences: which role needs which one?"
description: "Hotline, dispatcher, technician, back office, partner: which Salesforce Field Service licence each role needs, what it costs and which rules trip up the bill."
pubDate: 2026-10-28
lang: en
slug: field-service-licences-by-role
translationKey: field-service-licences-by-role
topic: field-service
categories: [field-service]
contactBrief: licences
tags: [field service, licences, dispatcher, technician, contractor plus, manufacturing]
takeaways:
  - "Dispatcher and Technician cost $175 per user and month each, Field Service Plus $230 and Contractor Plus $80 per user or $32 per login (price list, October 2026, Enterprise Edition, annual contract)."
  - "Dispatcher and Technician licences may not be used for contact centre or case management. A hotline agent who also dispatches needs Field Service Plus."
  - "Every Field Service org needs at least one Service Cloud user licence, and technicians and contractors need at least one Dispatcher licence for scheduling to work."
  - "For partner technicians, per user beats per login above 2.5 logins a month, so per login suits partners who only help out at peaks."
  - "A licence matrix by role, built from what people actually do in the system, belongs in the business case before the first quote."
faq:
  - q: "Which licence does a Field Service dispatcher need?"
    a: "A dispatcher who only plans and dispatches jobs needs the Dispatcher licence at $175 per user and month. If the same person also works cases in the contact centre, the price list requires Field Service Plus at $230."
  - q: "Can a technician licence be used for the service hotline?"
    a: "No. The Salesforce price list says Dispatcher and Technician licences cannot be used for contact centre, call centre or customer case management. Hotline agents need a Service Cloud licence or Field Service Plus."
  - q: "What does Contractor Plus cost?"
    a: "According to the Salesforce price list in October 2026, Contractor Plus costs $80 per user and month or $32 per login, in euros the same figures. It gives contractors portal and mobile app access."
  - q: "Do I need a Service Cloud licence for Field Service?"
    a: "Yes. The price list requires at least one Service Cloud user licence in the org. Field Service Plus includes service user functionality, so hotline staff on Field Service Plus also count."
draft: false
---

In Salesforce Field Service each role in the service organisation needs its own licence, and the price list sets hard rules for the mix. Dispatchers and technicians get Dispatcher or Technician at $175 per user and month. Hotline agents who work cases need Service Cloud, and if they also dispatch, Field Service Plus at $230. Partner technicians get Contractor Plus at $80 per user or $32 per login. Two rules decide most bills: Dispatcher and Technician licences may not be used for case management, and every org needs at least one Service Cloud licence and one Dispatcher licence.

## What do the Field Service licences cost?

Salesforce sells the product today as Field Service and Operations. The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/) lists these prices in October 2026, per user and month, on an annual contract and for Enterprise Edition. The [German pricing page](https://www.salesforce.com/de/products/field-service/pricing) shows the same figures in euros.

| Licence | What the price list says it covers | List price |
|---|---|---|
| Dispatcher | Scheduling and route optimisation, job assignment | $175 |
| Technician | Work orders on the mobile app, also offline | $175 |
| Field Service Plus | Everything in Dispatcher and Technician, plus Service Cloud and Sales Cloud | $230 |
| Contractor Plus | Contractor portal and mobile app access | $80 per user or $32 per login |
| Agentforce 1 Field Service | Field Service Plus with AI, credits and further products | $650 |

On Unlimited Edition, Dispatcher and Technician cost $330 and the Plus bundle $380 according to the footnote. Whether the $650 bundle pays off is a separate calculation, covered in [Agentforce 1 Field Service: when does the bundle pay off?](../agentforce-1-field-service-edition-worth-it/).

## Which rules in the small print change the bill?

Three footnotes on the price list matter more than the prices themselves.

1. **At least one Service Cloud user licence.** Field Service runs on Service Cloud. An org without a single Service Cloud user does not meet the requirement. Field Service Plus includes service user functionality and counts.
2. **At least one Dispatcher licence.** Technicians and contractors need at least one Dispatcher in the org to use the scheduling tool. A pure technician rollout without a dispatcher licence does not work.
3. **No case management on Dispatcher or Technician.** The price list says these two licences cannot be used for contact centre, call centre or customer case management. Field Service Plus can.

The third rule is where I see the most risk. In smaller service teams the same three people often answer the breakdown line in the morning and plan technicians in the afternoon. On a Dispatcher licence, that is a breach of the licence terms, even if the system technically lets them open a case.

## Which role needs which licence?

I build the licence matrix from what a person does in the system, not from their job title. For a manufacturer's service organisation, it usually looks like this:

| Role | What they do in Salesforce | Licence |
|---|---|---|
| Hotline agent | Takes calls, works cases, checks entitlements, creates work orders | Service Cloud |
| Hotline agent who also dispatches | Works cases and plans technicians | Field Service Plus |
| Dispatcher | Plans, moves and releases appointments | Dispatcher |
| Own technician | Works appointments on the mobile app, records time, parts and readings | Technician |
| Partner technician | Takes jobs from you on the app or in a portal | Contractor Plus |
| Back office | Invoices, checks reports, maintains contracts | Depends on the objects they edit |

Service Cloud itself now comes in new editions. The [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) lists Core at $195 per user and month and says Core replaces Enterprise. For the hotline, that is the comparison price: $195 for Service Cloud Core against $230 for Field Service Plus. The $35 difference buys the right to dispatch.

The back office is the role I check most carefully. People who only invoice in the ERP need no Salesforce licence at all. People who read service reports or maintain contracts may get by with a cheaper licence, depending on which objects they edit. How to test that without rebuilding standard functions is covered in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## When does Contractor Plus per login pay off?

Contractor Plus costs $80 per user and month or $32 per login. The break-even is simple: $80 divided by $32 is 2.5. A partner technician who logs in more than two or three times a month is cheaper on a user licence. Below that, per login wins. The pricing page says contractor licences are also available on a monthly logins basis and refers to sales for details, so I would have the counting rule written into the order form.

Salesforce's [architecture guide on contractor sharing](https://architect.salesforce.com/docs/architect/fundamentals/guide/field-service-contractor-sharing-patterns.html) describes a contractor company as a third-party entity that manages its own workforce. That is who these licences are for: your service partners, not your own staff on a cheaper ticket. How partner technicians get their own resource and territory is covered in [Field Service: how to bring in service partners](../salesforce-field-service-service-partners/).

## A typical scenario: what does the licence bill look like?

A typical scenario, as an assumption: a machine builder runs a hotline with 6 agents, 4 dispatchers, 45 own technicians and two service partners. Partner A sends 5 technicians who work for the machine builder about ten days a month. Partner B has 3 technicians who only help out at peaks, about two days a month each.

| Role | Count | Licence | Per month |
|---|---|---|---|
| Hotline | 6 | Service Cloud Core at $195 | $1,170 |
| Dispatcher | 4 | Dispatcher at $175 | $700 |
| Own technicians | 45 | Technician at $175 | $7,875 |
| Partner A | 5 | Contractor Plus per user at $80 | $400 |
| Partner B | 3 | Contractor Plus, 6 logins at $32 | $192 |
| **Total** | | | **$10,337** |

That is $124,044 per year at list price. If Partner B were on user licences, it would cost $240 instead of $192 a month. If the hotline is also supposed to dispatch on weekends, all six agents move to Field Service Plus: $1,380 instead of $1,170, so $2,520 more per year. If instead the four dispatchers take over the breakdown line in the evening, they need Field Service Plus as well: $920 instead of $700 a month.

The point of the exercise is less the total than the decisions it forces. Who answers calls, who dispatches, and who does both? Once that is written down, the licence matrix follows almost by itself.

## What should be clear before the quote?

- **Who does case management.** Every person who works cases and also plans technicians needs Field Service Plus. That is a process question first.
- **How partners work.** Regular partner technicians on user licences, occasional ones per login. Agree on the counting rule.
- **Which edition.** The prices above apply to Enterprise Edition. On Unlimited Edition, Dispatcher and Technician cost $330.
- **Which add-ons.** Agentforce for Field Service and Operations ($125), Visual Remote Assistant ($50) and Appointment Assistant ($25) are priced per user. Only the roles that use them need them.
- **Growth.** A licence forecast for three years, by role and wave, avoids buying 45 technician licences on day one when the first wave has 15.

How all this fits into the overall business case for Field Service is covered in [part 1 of the series](../salesforce-field-service-worth-it/) and in [chapter 1 of the Field Service masterclass](../../masterclass/field-service/field-service-business-case-licences/). If the service organisation also runs warranty claims, check the [Manufacturing Cloud chapter on warranty and after-sales](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) before you buy licences for the same people twice.

## Where should you start?

List every person in the service organisation with what they do in the system each week, then assign the licence by the rules above. I do this as part of [make-or-buy and licence forecasts](../../services/make-or-buy-licences/), before the negotiation starts.

The licence follows the role, and the role follows the process, so settle who works cases and who dispatches first; if you want a second opinion on your matrix, [send me a message](#contact).
