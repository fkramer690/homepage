---
title: "Salesforce Field Service licenses: who needs which?"
description: "Hotline, dispatcher, technician, back office, partner: which Salesforce Field Service license each role needs, what it costs and which rules trip up the bill."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-licences-by-role
translationKey: field-service-licences-by-role
topic: field-service
categories: [field-service]
contactBrief: licences
tags: [field service, licenses, dispatcher, technician, contractor plus, manufacturing]
takeaways:
  - "Dispatcher and Technician cost $175 per user and month, Field Service+ Core $250, Contractor Plus $80 or $32 per login (Enterprise Edition, 11/2026)."
  - "Dispatcher and Technician licenses may not be used for contact center or case management. A hotline agent who also dispatches needs a Field Service+ edition."
  - "Every Field Service org needs at least one Service Cloud license, and scheduling needs at least one Dispatcher license."
  - "For partner technicians, per user beats per login above 2.5 logins a month, so per login suits partners who only help out at peaks."
  - "A license matrix by role, built from what people do in the system, belongs in the business case before the first quote."
faq:
  - q: "Which license does a Field Service dispatcher need?"
    a: "A dispatcher who only plans and dispatches jobs needs the Dispatcher license at $175 per user and month. If the same person also works cases in the contact center, Dispatcher is not allowed; since November 2026 the price list offers Field Service+ Core at $250 for combined roles."
  - q: "Can a technician license be used for the service hotline?"
    a: "No. The Salesforce price list says Dispatcher and Technician licenses cannot be used for contact center, call center or customer case management. Hotline agents need a Service Cloud license or a Field Service+ edition."
  - q: "What does Contractor Plus cost?"
    a: "According to the Salesforce price list in November 2026, Contractor Plus costs $80 per user and month or $32 per login, in euros the same figures. It gives contractors portal and mobile app access."
  - q: "Do I need a Service Cloud license for Field Service?"
    a: "Yes. The price list requires at least one Service Cloud user license in the org. Confirm in the quote that the Field Service+ editions count toward that requirement."
draft: false
---

In Salesforce Field Service the license follows what a person does in the system, not the job title, and the price list sets hard rules for the mix. Dispatchers and technicians get Dispatcher or Technician at $175 per user and month. Hotline agents who work cases need Service Cloud, and if they also dispatch, a Field Service+ edition, from $250. Partner technicians get Contractor Plus at $80 per user or $32 per login. Two rules decide most bills: Dispatcher and Technician licenses may not be used for case management, and scheduling in Salesforce needs at least one Service Cloud license and dispatcher rights in the org.

Further questions about the product, from implementation to the ERP, are answered in the topic hub [Salesforce Field Service for manufacturers](../../masterclass/field-service/).

## What do the Field Service licenses cost?

Salesforce sells the product today as Field Service and Operations. The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/), changed on 5 November 2026, lists these prices per user and month, on an annual contract and for Enterprise Edition. The previous Field Service Plus ($230) and Agentforce 1 Field Service no longer appear on the page.

| License | What the price list says it covers | List price |
|---|---|---|
| Dispatcher | Scheduling and route optimization, job assignment | $175 |
| Technician | Work orders on the mobile app, also offline | $175 |
| Field Service+ Core | Everything in Dispatcher and Technician, Slack, "a complete selling and service solution", 500K Flex Credits per org | $250 |
| Field Service+ Advanced | Core plus Field Service Intelligence and security features, 1M Flex Credits per org | $450 |
| Contractor Plus | Contractor portal and mobile app access | $80 per user or $32 per login |
| Field Service Max | Advanced plus the Agentforce suite, Visual Remote Assistant, Asset Service Lifecycle Management, 2.75M Flex Credits per org and year | $650 |

On Unlimited Edition, Dispatcher and Technician cost $330 according to the footnote. The German pricing page still showed the old model with Field Service Plus on 9 November 2026, so confirm in the quote which model your contract uses. Whether the $650 Max edition pays off is a separate calculation, covered in [Field Service Max: when does the bundle pay off?](../agentforce-1-field-service-edition-worth-it/).

## The small print changes the bill

Three footnotes on the price list matter more than the prices themselves.

1. **At least one Service Cloud user license.** Field Service runs on Service Cloud. An org without a single Service Cloud user does not meet the requirement. Whether a Field Service+ edition counts here, I would have confirmed in the quote.
2. **At least one Dispatcher license.** Technicians and contractors need at least one Dispatcher in the org to use the scheduling tool. A pure technician rollout that uses Salesforce scheduling therefore needs a Dispatcher license or a Field Service+ edition that includes dispatcher rights.
3. **No case management on Dispatcher or Technician.** The price list says these two licenses cannot be used for contact center, call center or customer case management. The footnote allows it for "Field Service and Operations Plus", a name the price table no longer uses; I would have it confirmed in writing that Field Service+ Core carries that right.

```hinweis achtung
The third rule is where I see the most risk. In smaller service teams the same three people often answer the breakdown line in the morning and plan technicians in the afternoon. On a Dispatcher license, that is a breach of the license terms, even if the system technically lets them open a case.
```

## Which role needs which license?

I build the license matrix from what a person does in the system, not from their job title. For a manufacturer's service organization, it usually looks like this:

| Role | What they do in Salesforce | License |
|---|---|---|
| Hotline agent | Takes calls, works cases, checks entitlements, creates work orders | Service Cloud |
| Hotline agent who also dispatches | Works cases and plans technicians | Field Service+ Core |
| Dispatcher | Plans, moves and releases appointments | Dispatcher |
| Own technician | Works appointments on the mobile app, records time, parts and readings | Technician |
| Partner technician | Takes jobs from you on the app or in a portal | Contractor Plus |
| Back office | Invoices, checks reports, maintains contracts | Depends on the objects they edit |

Service Cloud itself now comes in new editions. The [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) lists Core at $195 per user and month and says Core replaces Enterprise. For the hotline, that is the comparison price: $195 for Service Cloud Core against $250 for Field Service+ Core. The $55 difference is the price gap between two bundles; have the exact rights confirmed in the order form.

The back office is the role I check most carefully. People who only invoice in the ERP need no Salesforce license at all. People who read service reports or maintain contracts may get by with a cheaper license, depending on which objects they edit. How to test that without rebuilding standard functions is covered in [Salesforce licenses: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## When does Contractor Plus per login pay off?

Contractor Plus costs $80 per user and month or $32 per login. The break-even is simple: $80 divided by $32 is 2.5. A partner technician who logs in more than two or three times a month is cheaper on a user license. Below that, per login wins.

```hinweis offen
The pricing page says contractor licenses are also available on a monthly logins basis and refers to sales for details, so I would have the counting rule written into the order form.
```

Salesforce's [architecture guide on contractor sharing](https://architect.salesforce.com/docs/architect/fundamentals/guide/field-service-contractor-sharing-patterns.html) describes a contractor company as a third-party entity that manages its own workforce. That is who these licenses are for: your service partners, not your own staff on a cheaper ticket. How partner technicians get their own resource and territory is covered in [Field Service: how to bring in service partners](../salesforce-field-service-service-partners/).

## Worked example: hotline, dispatch, own technicians and two partners

The figures are assumed. A machine builder runs a hotline with 6 agents, 4 dispatchers, 45 own technicians and two service partners. Partner A sends 5 technicians who work for the machine builder about ten days a month. Partner B has 3 technicians who only help out at peaks, about two days a month each.

| Role | Count | License | Per month |
|---|---|---|---|
| Hotline | 6 | Service Cloud Core at $195 | $1,170 |
| Dispatcher | 4 | Dispatcher at $175 | $700 |
| Own technicians | 45 | Technician at $175 | $7,875 |
| Partner A | 5 | Contractor Plus per user at $80 | $400 |
| Partner B | 3 | Contractor Plus, 6 monthly logins bought at $32 | $192 |
| **Total** | | | **$10,337** |

That is $124,044 per year at list price. If Partner B were on user licenses, it would cost $240 instead of $192 a month. If the hotline is also supposed to dispatch on weekends, all six agents move to Field Service+ Core: $1,500 instead of $1,170, so $3,960 more per year. If instead the four dispatchers take over the breakdown line in the evening, they need Field Service+ Core as well: $1,000 instead of $700 a month.

The point of the exercise is less the total than the decisions it forces. Who answers calls, who dispatches, and who does both? Once that is written down, the license matrix follows almost by itself.

## Before the quote, settle roles, partners, edition and add-ons

- **Who does case management.** Every person who works cases and also plans technicians needs a Field Service+ edition. That is a process question first.
- **How partners work.** Regular partner technicians on user licenses, occasional ones per login. Agree on the counting rule.
- **Which edition.** The prices above apply to Enterprise Edition. On Unlimited Edition, Dispatcher and Technician cost $330.
- **Which add-ons.** Agentforce for Field Service and Operations, Visual Remote Assistant and Appointment Assistant are sold as add-ons; since 5 November 2026 the pricing page shows no price for them, and Field Service Max includes several. Only the roles that use them need them.
- **Growth.** A license forecast for three years, by role and wave, avoids buying 45 technician licenses on day one when the first wave has 15.

How all this fits into the overall business case for Field Service is covered in [part 1 of the series](../salesforce-field-service-worth-it/) and in [chapter 1 of the Field Service masterclass](../../masterclass/field-service/field-service-business-case-licences/). If the service organization also runs warranty claims, check the [Manufacturing Cloud chapter on warranty and after-sales](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) before you buy licenses for the same people twice.

## List every person and what they do in the system

List every person in the service organization with what they do in the system each week, then assign the license by the rules above. I do this as part of [make-or-buy and license forecasts](../../services/make-or-buy-licences/), before the negotiation starts.
