---
title: "Breakdown hotline with Agentforce Voice: triage first"
description: "Agentforce Voice now speaks German. How triage and entitlements decide what a voice agent on a machine builder's breakdown hotline books, and what a call costs."
pubDate: 2026-10-27
lang: en
slug: breakdown-hotline-agentforce-voice
translationKey: breakdown-hotline-voice-agent
topic: field-service
categories: [field-service, ai]
tags: [agentforce voice, field service, service hotline, entitlements, manufacturing, flex credits]
takeaways:
  - "Salesforce lists German as generally available in Agentforce Voice since Dreamforce 2026, so a German-speaking breakdown hotline is now technically possible."
  - "On a breakdown hotline the voice agent should own intake and triage first: identify caller and machine, ask whether the machine is down, check the entitlement, open the case."
  - "The agent books a technician itself only when the machine still runs, the entitlement covers the visit and the fault class is known; machine-down calls with a response time go to a dispatcher."
  - "Entitlement checks and the booking gate belong in deterministic logic, for example Agent Script conditionals and available when, so the LLM never decides what the contract promises."
  - "A call costs about 120 Flex Credits ($0.60) with four voice actions, or 60 credits ($0.30) per minute for customers on Agentforce Voice Minutes, at US list price."
faq:
  - q: "Does Agentforce Voice support German?"
    a: "Yes. Salesforce's Dreamforce 2026 announcements list German among six new Agentforce Voice languages with the status GA. Test it with real calls from your customers, including noise from the shop floor and regional accents."
  - q: "Can an Agentforce Voice agent book a field service technician on its own?"
    a: "Yes, Salesforce lists Autonomous Scheduling with Agentforce Voice in the Winter '27 release highlights. For breakdowns I would let it book only when the machine still runs, the entitlement covers the visit and the fault is classified."
  - q: "What does an Agentforce Voice call cost?"
    a: "A voice action costs 30 Flex Credits, so a call with four actions costs 120 credits, $0.60 at US list price. Customers who bought Agentforce Voice Minutes pay 60 credits per minute instead. Telephony and the reps' voice licences come on top."
  - q: "What happens when the voice agent hands a call to a person?"
    a: "According to Salesforce, the native Salesforce Voice setup keeps the full transcript and session context across transfers, so the dispatcher sees what the caller already said. Escalation in Agent Script needs an active Omni-Channel connection."
  - q: "Should the voice agent read serial numbers from the caller?"
    a: "Only as a fallback. Identify the machine through the caller's phone number, contact, account and installed assets first, and read a spoken serial number back before using it, because speech recognition garbles codes."
draft: false
---

A machine builder can put an Agentforce Voice agent on the breakdown hotline now that Salesforce lists German as generally available, but I would let it own intake and triage before it owns the calendar. The agent identifies caller and machine, asks whether it is down and checks the entitlement. It books a technician itself only when the machine still runs, the contract covers the visit and the fault class is known. Machine-down calls with a committed response time go to a dispatcher with a filled case. Per call, expect roughly $0.60 to $1.80 in Flex Credits.

## What changed for a German-speaking breakdown hotline?

In its [Dreamforce 2026 announcements](https://www.salesforce.com/blog/dreamforce-2026-announcements/) of 28 September, Salesforce lists six new Agentforce Voice languages, German among them, with the status GA. The [Agentforce Voice product page](https://www.salesforce.com/agentforce/voice/) calls the product "GA in all regions". Before that, Agentforce Voice did not speak German.

These platform facts matter for the hotline design:

- **Telephony.** According to the [Salesforce developer blog](https://developer.salesforce.com/blogs/2026/10/agentforce-voice-for-agent-script-voice-enabling-best-practices), Agentforce Voice runs on Salesforce Voice with Telephony Providers, formerly Service Cloud Voice. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-voice-quick-look/meet-agentforce-voice) names two paths: native Salesforce Voice or your existing telephony provider.
- **Handover.** The native path "maintains full call transcripts and session context across the entire interaction, including transfers", says the same Trailhead unit. The dispatcher does not ask for the serial number again.
- **Booking by phone.** The [Winter '27 release highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) list Autonomous Scheduling with Agentforce Voice for Field Service. The highlights carry no status label, so check availability in your org.

Salesforce's examples are planned appointments: the [Winter '27 announcement](https://salesforce.com/news/stories/winter-2027-product-release-announcement) promises to cut "15-minute booking calls down to seconds". A breakdown call is a harder job. The generic service agent is covered in [Casey and the Service Rep Assistant](../service-cloud-casey-service-rep-assistant/).

## Why is a breakdown call harder than a booking call?

The caller is usually a maintenance technician standing next to a stopped line in a loud hall. They want a technician of yours, not a menu. Four facts decide the next step, and the caller says none of them in a form a system can use:

- **Which machine.** Serial numbers are long and alphanumeric. The Salesforce developer blog warns that speech to text can mishear technical terms, and Salesforce's [Agentforce Voice guide](https://www.salesforce.com/agentforce/voice/agentforce-voice-guide-full/) advises checking in pre-launch testing how the agent pronounces product identifiers and numerical codes. I would identify the machine through caller number, contact, account and installed assets, and ask for the serial number only when the account has several machines of that type.
- **Down or running.** "It makes a strange noise and we stopped it" can mean either. The LLM should not infer this from a story. The agent asks a closed question, "Is the machine standing still right now?", and stores the answer in a variable.
- **What the contract promises.** The response time sits on the entitlement record. According to [Salesforce Ben](https://www.salesforceben.com/complete-guide-to-salesforce-entitlements-and-milestones-in-service-cloud/), entitlements can be related to accounts, assets, cases and service contracts, and milestones count down within business hours. How to model this is in [modelling maintenance contracts](../salesforce-field-service-maintenance-contracts/).
- **Safety.** Injury, fire, a leaking medium: the agent transfers at once and asks nothing except a callback number.

## How should triage decide what the agent books itself?

This is the rule set I would start with. Every row is a branch in logic, not an instruction in the prompt.

| Situation on the call | What the agent does | Who decides |
|---|---|---|
| Safety issue | Transfers immediately | Human |
| Caller or machine not identified | Transfers with what it has | Dispatcher |
| Machine down, entitlement with response time | Opens a high-priority case on the asset, starts the milestone, transfers live | Dispatcher |
| Machine down, no valid entitlement | Opens a case, says the visit is billable, transfers or books a callback | Dispatcher |
| Machine runs with restrictions, entitlement valid, known fault class | Books a technician slot within the entitlement's hours | Agent |
| Machine runs, fault unclear | Opens a case, books a callback from a service engineer | Service engineer |
| Question on manuals, parts or order status | Answers or opens a case | Agent |

Why not let the agent book machine-down calls too? A stopped press with a four-hour commitment may mean pulling a technician off a maintenance visit. That trade-off needs the day's schedule and a person who can call the other customer.

In Agent Script, the [fetch-data pattern](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-fetch-data.html) runs actions "to retrieve data before the LLM begins reasoning", so asset and entitlement are loaded before the model speaks. [Conditionals](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-conditionals.html) "evaluate before the prompt reaches the LLM". With [available when](https://developer.salesforce.com/sample-apps/agent-script-recipes/action-configuration/available-when-filtering), the booking action is "completely hidden from the LLM" unless entitlement valid, machine running and fault class known are all true. Handover uses [`@utils.escalate`](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html), which needs an active Omni-Channel connection. The model keeps what it is good at: understanding German speech and asking the next question. The reasoning behind this split is in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

## What does a voice call on the hotline cost?

The [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) of 31 August 2026 prices a standard or custom voice action at 30 credits in production and 24 in a sandbox. The voice example on the [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) counts four voice actions per call, 120 credits. At $500 per 100,000 credits that is $0.60 per call.

A footnote on the rate card says that for certain customers the Agentforce Voice Minutes usage type applies instead. The [supplemental rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Agentforce-Voice-Minutes-Supplemental-Rate-Card-02.03.2026.pdf) sets it at 60 credits per minute, 48 in a sandbox. A six-minute breakdown call then costs 360 credits, or $1.80. Triage calls run long, so ask which model your contract uses.

Two items are open or extra:

- **Speech meters.** The rate card lists speech to text at 150 credits per hour of transcription. It does not say whether a voice agent call triggers it in addition, and I found no Salesforce page that does. Ask before you sign.
- **Telephony and seats.** I found no Salesforce page that says whether dispatchers who take transferred calls need their own Salesforce Voice seat, so I would plan for it and ask. The [Salesforce Voice pricing page](https://www.salesforce.com/eu/service/call-center-integration/voice-pricing/) lists Contact Center at $125 per user and month with unlimited platform voice minutes, or Partner Contact Center at $50 if you keep your telephony provider.

For the method behind per-action estimates, see [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

## A typical scenario: 400 hotline calls a month

Assume a machine builder with SAP, Service Cloud and Field Service live, 1,200 machines under contract and a hotline staffed by two dispatchers from 7:00 to 17:00. Outside these hours an on-call engineer takes every call; how to plan those shifts in Field Service is covered in [Field Service on-call duty](../field-service-on-call-shifts/). All numbers are assumptions.

Assume 400 calls a month: 120 machine down, 160 machine running with restrictions, 120 questions. Each call needs about six voice actions: identify caller, find asset, check entitlement, open the case, find slots or transfer, confirm.

- **Credits on voice actions.** 400 × 6 × 30 = 72,000 credits, about $360 a month.
- **Credits on Voice Minutes.** At five minutes per call, 400 × 5 × 60 = 120,000 credits, about $600 a month.
- **What the agent books.** Of the 160 restricted calls, assume 100 have a valid entitlement and a known fault class. Once booking is on, the agent books those; the rest go to a person as a case.
- **What the dispatchers gain.** Assume eight minutes of intake per call today, about 53 hours a month. The 120 machine-down calls still reach a person, but with asset, entitlement and running milestone already on the case.

The credits are small either way. The gain is at night: the on-call engineer gets a classified case instead of a raw call.

## What has to be in place before the agent answers the phone?

1. **Phone numbers on contacts and clean assets.** Without them every call becomes a transfer, and with duplicated machines the agent picks the wrong one.
2. **Entitlements as records.** If contracts live in SAP, replicate response times to Salesforce. The Agentforce Voice guide cites a "2-second action latency benchmark", and a live ERP lookup during the call puts that at risk.
3. **Fault classes.** The booking gate needs a short list of classes a technician can plan for.
4. **Tests in German with real audio.** Salesforce lists Voice and Conversation Testing as Beta in the Dreamforce announcements. Record test calls with hall noise and regional accents, and plan the test load at 24 credits per voice action, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).
5. **Data protection and disclosure.** Trailhead states zero data retention policies with OpenAI, Deepgram and ElevenLabs. The greeting should still say that an AI answers; the legal side is in [EU AI Act deadlines for Agentforce](../eu-ai-act-deadlines-agentforce/).

## Where should you start?

Run the voice agent on the hotline outside business hours first, with intake and triage only and no booking. Compare its classification with the on-call engineer's judgement for four weeks. Then switch on booking for the restricted-but-running row, and only after that for daytime calls. Where this sits among the other Field Service agents is in [AI agents in Field Service: what works today?](../field-service-ai-agents-what-works-today/), the licence side in [make-or-buy and licence planning](../../services/make-or-buy-licences/).

A voice agent on the breakdown hotline pays off when it hands dispatchers a classified case and leaves the decision on machine-down calls with them. If you want to work through the triage rules for your hotline, [send me a message](#contact).
