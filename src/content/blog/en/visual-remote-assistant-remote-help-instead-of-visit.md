---
title: "Visual Remote Assistant: video help instead of a visit?"
description: "When a video session with Visual Remote Assistant can replace a technician visit for a machine builder, what it costs and what to settle before the first call."
pubDate: 2026-10-28
lang: en
slug: visual-remote-assistant-remote-help-instead-of-visit
translationKey: visual-remote-assistant-instead-of-visit
topic: field-service
categories: [field-service]
tags: [Visual Remote Assistant, field service, remote service, breakdown hotline, works council]
takeaways:
  - "Visual Remote Assistant sends the customer a link by SMS or email; the two-way video opens in the mobile browser without an app, login or password."
  - "The add-on costs $50 per user and month (October 2026) and is included in Agentforce 1 Field Service. The customer needs no licence."
  - "Video replaces a visit for parameters, operating errors and resets. For mechanical faults it shortens the visit, because the right part comes along."
  - "Before the first session, settle recording consent, the works council and which faults may be closed remotely."
  - "Count the visits in your breakdown history that needed no part and no tool. That share is your realistic potential."
faq:
  - q: "What does Visual Remote Assistant cost?"
    a: "According to the Salesforce product page, the add-on costs $50 or 50 € per user and month, billed annually (October 2026). It is included in the Agentforce 1 Field Service bundle. Only the people who run sessions need a licence; the customer joins through a link."
  - q: "Does the customer need an app for Visual Remote Assistant?"
    a: "No. The agent sends a link by SMS or email, the customer taps it, accepts the terms and grants camera access. The video then runs in the mobile browser, without app download, login or password."
  - q: "Can a technician on site start a video session with an expert?"
    a: "Yes. According to the installation manual, sessions can be started from the Field Service mobile app through an app extension, and the technician lands on the related work order. Experts can also be added to a running session."
  - q: "Where is the video data hosted?"
    a: "The installation manual names AWS North America as the default region and AWS Europe as an option. For customers in the EU I would choose the European region during setup and document that choice for data protection."
draft: false
---

Visual Remote Assistant replaces a technician visit when the operator on site can fix the fault with guidance: a wrong parameter, an operating error, a reset, a sensor that needs cleaning. The customer gets a link by SMS or email and opens a two-way video in the mobile browser, without app or login, and the agent draws on the image. The add-on costs $50 per user and month on the price list of October 2026 and is included in Agentforce 1 Field Service. For mechanical repairs the video does not save the visit, but it saves the second one, because the technician arrives with the right part.

## What does Visual Remote Assistant do?

Visual Remote Assistant is a video tool for Service Cloud and Field Service. According to the [product page](https://salesforce.com/products/visual-remote-assistant), the agent "sends a secure link via SMS or email to the customer's mobile device", and when the customer taps it, "a two-way video stream is launched in their mobile browser". No app downloads, logins or passwords are required.

During the session, the agent can, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/visual-remote-assistant/set-up-visual-remote-assistant):

- add markers such as arrows or circles to the customer's phone display,
- take pictures for the record or forward them to a subject matter expert,
- add an expert to a running session,
- schedule a follow-up appointment,
- read barcodes and QR codes with optical character recognition (OCR), for example to look up an item number.

The product page adds automatic recording for later review, OCR that surfaces knowledge articles and a satisfaction survey after each session. Desktop sharing is available as well.

Two technical details from the [installation and configuration manual](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/vra_installation_configuration_manual.pdf) (Summer '25 version) matter for a machine builder. First, sessions start from a Salesforce record, such as a case or work order, and the session summary with its images is attached to that record. Second, a technician can start a session from the Field Service mobile app through an app extension. That covers the second use case: the technician on site calls in the expert from headquarters.

## The add-on costs $50 per user and month

```kennzahlen
$50 | per user and month for the add-on, billed annually
$650 | per user and month for Agentforce 1 Field Service, add-on included
source: Salesforce product page for Visual Remote Assistant and Field Service pricing page, October 2026
```

The product page lists the add-on in euros too, at 50 €. The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/) shows the same $50 as an add-on and lists Visual Remote Assistant as part of Agentforce 1 Field Service. Trailhead names Service Cloud or Field Service licences as the prerequisite, and the Visual Remote Assistant licences are bought through the account executive.

You license the people who start sessions: hotline agents, remote experts, perhaps senior technicians. The customer joins through a link and needs nothing. Eight users cost $400 a month or $4,800 a year at list price. Compared with the cost of one avoided trip abroad, that is small. The real effort lies in setup, the rules for remote fixes and training the hotline.

## When can a video session replace a visit?

In my view, video fits four situations for a machine builder:

- **Operating errors and parameters.** The machine runs, but wrongly, because a recipe or setting was changed. The agent sees the panel and guides the operator back.
- **Simple fixes the customer may do.** Cleaning a sensor, resetting a safety door switch, reseating a connector. Your own safety rules decide what an operator may touch.
- **Export customers far away.** A visit to another continent costs days. A video call that solves even one case in five pays off quickly.
- **Diagnosis before dispatch.** The operator shows the type plate, the error message and the damaged part. The technician then travels once, with the right part and the right skill.

Video does not replace a visit when the work needs tools, a qualified electrician or a signed acceptance on site, or when the customer does not allow cameras in production. For those cases it shortens the visit instead. That is often where most of the value sits, because a second visit for a missing part costs as much as the first.

Visual Remote Assistant fits the triage logic I describe for the [breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/): first decide whether the machine is down and what the contract covers, then decide whether video, a part shipment or a technician solves it. For the expert behind the video, the [troubleshooting agent](../field-service-ai-troubleshooting-manuals/) only helps if manuals carry the same product key as the asset.

## Worked example: 20 percent solved by video

The figures are assumed. A packaging machine builder takes 150 breakdown calls a month, a third of them from customers outside Europe. Today, almost every call that is not solved on the phone ends in a visit.

The builder licenses six hotline agents and two remote experts, so eight users at $50, which is $4,800 a year. The target for the first year: 20 percent of breakdown calls solved by video, so 30 visits a month fewer. On top, the technician gets the fault confirmed by video before every remaining visit.

The method matters more than the target. Before the pilot, the service team pulls a year of breakdown work orders and tags each one: operating error, parameter, wear part, mechanical damage, electrical fault. Only the first two categories, plus wear parts the customer may change, are candidates for a video fix. If those make up 35 percent of last year's visits, 20 percent is realistic. If they make up 10 percent, the business case rests on better diagnosis, and that should be stated honestly.

Two numbers show after three months whether it works: the share of video sessions that close the case, and the share of those cases with a repeat call within seven days. A video fix followed by a visit two days later saved nothing.

## Before the first session: consent, works council, closing rules

**Recording consent.** Sessions can be recorded, and recording is controlled by a custom permission. The customer's staff appear in the video, and so does their production hall. Agree with the customer whether you record at all, who sees the recording and how long you keep it. Some customers will not allow it, so the process has to work without recording too.

**Works council for your own staff.** If sessions with your own agents or technicians are recorded or evaluated, that is a technical system that can monitor performance. In Germany the works council has a say in that. I would bring this in at the same time as the timesheet and location topics from the [Field Service rollout](../salesforce-field-service-rollout/).

**Hosting region.** The installation manual names AWS North America as the default region and AWS Europe as an option. The session domains run under techsee.me. Your data protection officer should know both before the first customer call.

**Which faults may be closed remotely.** Write down which fault classes a video session may close without a visit report, and how the instruction given to the operator is documented on the case. If the operator follows a wrong instruction and damages the machine, you need to know what was said.

## First step: sort last year's breakdowns by cause

```schritte
Tag the breakdowns
  Sort last year's breakdown visits by cause and count the ones that needed no part and no tool.
Run a pilot | 3 months
  One product line, one export region, two or three users.
Measure and decide
  Check the fix rate and repeat calls, then decide on the full rollout.
```

How this fits with the mobile app and service documents is part of the [masterclass chapter on the mobile app](../../masterclass/field-service/field-service-mobile-app-documents/). Whether Field Service pays off at all is covered in [Salesforce Field Service: when is it worth it?](../salesforce-field-service-worth-it/), and the licence question as a whole under [make-or-buy and licences](../../services/make-or-buy-licences/).
