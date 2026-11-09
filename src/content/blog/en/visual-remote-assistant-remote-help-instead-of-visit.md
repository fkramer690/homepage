---
title: "Visual remote assistance: when video replaces a visit"
metaTitle: "Visual remote assistance with Salesforce: video or visit?"
description: "Visual remote assistance with Salesforce Visual Remote Assistant: when a video call replaces a technician visit, what it costs, what to settle first."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: visual-remote-assistant-remote-help-instead-of-visit
translationKey: visual-remote-assistant-instead-of-visit
topic: field-service
categories: [field-service]
tags: [visual remote assistance, Visual Remote Assistant, field service, remote service, breakdown hotline, works council]
takeaways:
  - "Visual Remote Assistant sends the customer a link by SMS or email; the two-way video opens in the mobile browser without an app, login or password."
  - "The add-on costs $50 per user and month on top of the base license and is included in Agentforce 1 Field Service. External customers need no license."
  - "Video replaces a visit for parameters, operating errors and resets. For mechanical faults it can shorten the visit."
  - "Before the first session, settle recording consent, the works council and which faults may be closed remotely."
  - "Count the visits in your breakdown history that needed no part and no tool. That share is a first upper bound, not a forecast."
faq:
  - q: "What is visual remote assistance in field service?"
    a: "Visual remote assistance means a service expert sees the machine through the customer's phone camera and guides the operator by video and drawn markers. In Salesforce the product for it is Visual Remote Assistant, an add-on for Service Cloud (now also called Agentforce Service) and Field Service."
  - q: "What does Visual Remote Assistant cost?"
    a: "According to the Salesforce product page, the add-on costs $50 or 50 € per user and month, billed annually (checked 9 November 2026), on top of the Service Cloud or Field Service base license. It is included in the Agentforce 1 Field Service bundle. Internal users who start or run sessions need the license and permissions; external invitees join through a link and need none."
  - q: "Does the customer need an app for Visual Remote Assistant?"
    a: "No. The agent sends a link by SMS or email, the customer taps it, accepts the terms and grants camera access. The video then runs in the mobile browser, without app download, login or password."
  - q: "Can a technician on site start a video session with an expert?"
    a: "Yes. A technician can start a session from the work order in the Field Service mobile app, and the session is linked to that record. Experts can also be added to a running session."
  - q: "Where is the video data hosted?"
    a: "The installation manual names AWS North America as the default region and AWS Europe as an option; the region can only be changed while the VRA account is inactive. For customers in the EU I would choose the European region during setup. That alone is not a data protection decision: recordings, images, invitations by SMS and subprocessors belong in the assessment too."
draft: false
---

Visual remote assistance replaces a technician visit when the operator on site can fix the fault with guidance: a wrong parameter, an operating error, a reset, a dirty sensor. In Salesforce the tool for it is Visual Remote Assistant. The customer gets a link by SMS or email and opens a two-way video in the mobile browser, without app or login; the agent draws on the image. The add-on costs $50 per user and month on top of the base license and is included in Agentforce 1 Field Service. For mechanical repairs it rarely saves the visit, but it can save the second one.

## What does Visual Remote Assistant do?

Visual remote assistance is the general term: an expert sees what the customer sees and guides them by video. Visual Remote Assistant is the Salesforce product for it, a video tool for Service Cloud and Field Service. According to the [product page](https://salesforce.com/products/visual-remote-assistant), the agent "sends a secure link via SMS or email to the customer's mobile device", and when the customer taps it, "a two-way video stream is launched in their mobile browser". No app downloads, logins or passwords are required.

During the session, the agent can, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/visual-remote-assistant/set-up-visual-remote-assistant):

- add markers such as arrows or circles to the customer's phone display,
- take pictures for the record or forward them to a subject matter expert,
- add an expert to a running session,
- schedule a follow-up appointment,
- read barcodes and QR codes with optical character recognition (OCR), for example to look up an item number.

The product page adds recording for later review, since Winter '27 also [on demand](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_264_vra_ondemand_recording.htm&language=en_US&type=5), so the agent records only key moments such as proof of installation, OCR that surfaces knowledge articles and a satisfaction survey after each session. Desktop sharing is available as well.

Two technical details from the [installation and configuration manual](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/vra_installation_configuration_manual.pdf) matter for a machine builder; check them against the manual for your package version, because Salesforce supports only the latest and two previous versions. First, sessions start from a Salesforce record, such as a case or work order, and the session summary with its images can be stored on that record; recordings appear only when recording is enabled in the VRA configuration and the flow that retrieves them is active. Second, a technician can start a session from the work order in the Field Service mobile app. That covers the second use case: the technician on site calls in the expert from headquarters.

## The add-on costs $50 per user and month

```kennzahlen
$50 | per user and month for the add-on, billed annually
$650 | per user and month for Agentforce 1 Field Service, add-on included
source: Salesforce product page for Visual Remote Assistant and Field Service pricing page, October 2026
```

The product page lists the add-on in euros too, at 50 €. The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/) shows the same $50 as an add-on and lists Visual Remote Assistant as part of Agentforce 1 Field Service. Trailhead names Service Cloud or Field Service licenses as the prerequisite, and the Visual Remote Assistant licenses are bought through the account executive.

You license the internal users who start or run sessions: hotline agents, remote experts, perhaps senior technicians. External customers join through a link and need nothing. Eight users add $400 a month or $4,800 a year at list price, on top of their Service Cloud or Field Service licenses. Compared with the cost of one avoided trip abroad, that is small. The real effort lies in setup, network and device checks, the rules for remote fixes and training the hotline.

## When can visual remote assistance replace a visit?

In my view, video fits four situations for a machine builder:

- **Operating errors and parameters.** The machine runs, but wrongly, because a recipe or setting was changed. The agent sees the panel and guides the operator back.
- **Simple fixes the customer may do.** Cleaning a sensor, resetting a safety door switch, reseating a connector. Your own safety rules decide what an operator may touch.
- **Export customers far away.** A visit to another continent costs days. Where such trips are frequent, a video call that solves even one case in five can pay off quickly.
- **Diagnosis before dispatch.** The operator shows the type plate, the error message and the damaged part. The technician then has a better chance to travel once, with the right part and the right skill.

Video does not replace a visit when the work needs tools, a qualified electrician or a signed acceptance on site, or when the customer does not allow cameras in production. For those cases it shortens the visit instead. That is often where most of the value sits, because a second visit for a missing part costs about as much as the first.

Visual Remote Assistant fits the triage logic I describe for the [breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/): first decide whether the machine is down and what the contract covers, then decide whether video, a part shipment or a technician solves it. For the expert behind the video, the [troubleshooting agent](../field-service-ai-troubleshooting-manuals/) only helps if manuals carry the same product key as the asset.

## Worked example: 20 percent solved by video

The figures are assumed. A packaging machine builder dispatches a technician for 150 breakdown calls a month, a third of them to customers outside Europe. These are the calls the phone could not solve.

The builder licenses six hotline agents and two remote experts, so eight users at $50, which is $4,800 a year. The target for the first year: 20 percent of these dispatches solved by video, so 30 visits a month fewer. That assumes the customer accepts the video, has a camera and network on site and a capable operator, so measure offer, acceptance and connection rates too. On top, the technician gets the fault confirmed by video before every remaining visit.

The method matters more than the target. Before the pilot, the service team pulls a year of breakdown work orders and tags each one: operating error, parameter, wear part, mechanical damage, electrical fault. Only the first two categories, plus wear parts the customer may change, are candidates for a video fix. If those make up 35 percent of last year's visits, 20 percent is realistic. If they make up 10 percent, the business case rests on better diagnosis, and that should be stated honestly.

Two numbers show after three months whether it works: the share of video sessions that close the case, and the share of those cases with a repeat call within seven days. A video fix followed by a visit two days later avoided no dispatch, even if it made that visit shorter, so measure the diagnostic value separately: first-time fix rate and visits with missing parts.

## Visual Remote Assistant or a third-party tool?

Salesforce is not the only vendor. TechSee, SightCall and Zoho Lens sell visual remote assistance as their own product, and TechSee lists an app for Agentforce on the AppExchange. For a manufacturer the question is less which video is better than where the session lives.

- **Visual Remote Assistant** runs in your Salesforce org. Sessions start from the case or the work order, and the result stays on that record. It fits when service already runs on Service Cloud and Field Service and you want one license conversation, not two.
- **A third-party tool** fits when you need more than video and drawing, for example image recognition with AI, augmented reality guidance or remote help for customers outside your Salesforce processes. Then plan the integration as part of the project: who starts the session, where recording and result land, and which data the vendor processes.

My rule of thumb: start with the tool that keeps the session where your service team already works. Switch only when a concrete requirement is missing, such as AR guidance for a complex assembly, and test the candidate with your three most frequent fault types first.

## Before the first session: consent, works council, closing rules

**Recording and data protection.** Recording is switched on in the VRA configuration, for whole sessions or since Winter '27 on demand. The customer's staff appear in the video, and so does their production hall. An agreement with the customer company does not replace the legal basis and information for the people on camera; clarify the legal basis for live video and separately for recording, retention and who sees it with your data protection officer. Some customers will not allow it, so the process has to work without recording too.

**Works council for your own staff.** Even without recordings, session times, durations, notes and VRA reports per user make it a technical system that can monitor performance. In Germany the works council has a say in that from the start, including access, reports and retention. I would bring this in at the same time as the timesheet and location topics from the [Field Service rollout](../salesforce-field-service-rollout/).

**Hosting region.** The installation manual names AWS North America as the default region and AWS Europe as an option. The session domains run under techsee.me, and SMS invitations go through gateway providers. Your data protection officer should know this before the first customer call, and your IT should check firewall rules, browsers and the camera permissions on customer devices.

**Which faults may be closed remotely.** Write down which fault classes a video session may close without a visit report, and how the instruction given to the operator is documented on the case. If the operator follows a wrong instruction and damages the machine, you need to know what was said.

## Sort last year's breakdowns by cause

```schritte
Tag the breakdowns
  Sort last year's breakdown visits by cause and count the ones that needed no part and no tool, as a first upper bound.
Run a pilot | 3 months
  One product line, one export region, two or three users.
Measure and decide
  Check the fix rate and repeat calls, then decide on the full rollout.
```

How this fits with the mobile app and service documents is part of the [masterclass chapter on the mobile app](../../masterclass/field-service/field-service-mobile-app-documents/). Whether Field Service pays off at all is covered in [Salesforce Field Service: when is it worth it?](../salesforce-field-service-worth-it/), and the license question as a whole under [make-or-buy and licenses](../../services/make-or-buy-licences/).
