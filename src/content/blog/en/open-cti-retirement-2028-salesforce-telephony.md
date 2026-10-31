---
title: "Open CTI Ends in 2028: Which Telephony for Salesforce?"
description: "Salesforce retires Open CTI on 28 February 2028. The paths to Salesforce Voice, what they cost, and what it means for Genesys, Mirage and Microsoft Teams."
pubDate: 2026-10-28
lang: en
slug: open-cti-retirement-2028-salesforce-telephony
translationKey: open-cti-retirement-telephony
topic: service
categories: [architecture]
contactBrief: integration
tags: [Open CTI, Salesforce Voice, telephony, Service Cloud, Genesys, Microsoft Teams]
takeaways:
  - "Salesforce retires Open CTI on 28 February 2028. After that, softphones, call center adapters and custom CTI logic built on Open CTI stop working."
  - "The successor is Salesforce Voice, formerly Service Cloud Voice. There are four paths: keep your telephony vendor, run Amazon Connect yourself or through Salesforce, or get telephony directly from Salesforce."
  - "At list price, Partner Contact Center costs €50 per user and month on top of the telephony vendor's licence, and the native Contact Center €125."
  - "The rebuild matters more than the retirement itself: calls become VoiceCall records instead of tasks, screen pop and presence move to Omni-Channel, and reports need to be rebuilt."
  - "If you use an Open CTI product today, ask your vendor now about its path to Salesforce Voice and take stock of phone numbers, users, reports and custom logic."
faq:
  - q: "When will Open CTI be retired?"
    a: "On 28 February 2028. Since 16 February 2026, Open CTI is no longer available in newly created Agentforce Service orgs. Existing orgs can keep using it until the retirement, but get no new features."
  - q: "What replaces Open CTI?"
    a: "Salesforce Voice, formerly Service Cloud Voice. It brings calls into the same Omni-Channel widget as chat and email, creates a VoiceCall record for every call and provides transcripts that Agentforce can use."
  - q: "Can I keep using Genesys or Microsoft Teams?"
    a: "Yes, through Partner Contact Center, formerly Partner Telephony. Genesys offers CX Cloud with a voice package for this, and for Teams Phone there are partner products such as Unaric Voice. Check whether your vendor has a package for Salesforce Voice."
  - q: "How much does Salesforce Voice cost?"
    a: "According to the EU pricing page (October 2026), Partner Contact Center costs €50 per user and month plus the partner's telephony licence, Partner Contact Center with Amazon Connect €75 to €200 depending on the minute bundle, and the native Contact Center €125, each with an annual contract."
draft: false
---

Salesforce retires Open CTI on 28 February 2028. Every softphone that runs in Service Cloud through Open CTI today must move to Salesforce Voice by then, the successor of Service Cloud Voice. There are four paths, from "keep your telephony vendor" to "telephony directly from Salesforce". For manufacturers with a service hotline or customer service team, this means the telephony decision is on the table now, even if everything works today. I have worked with the CTI vendors Genesys and Mirage, and this is what matters when choosing.

## What changes with the retirement?

Open CTI is the JavaScript API through which third-party softphones have run in Salesforce for years. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/open-cti-to-voice-migration/prepare-for-open-cti-retirement), this is the timeline:

| Date | What happens |
|---|---|
| since 2020 | Open CTI in maintenance mode, no new features |
| 16 February 2026 | No longer available in newly created Agentforce Service orgs |
| 28 February 2028 | Retirement for all orgs |

With the retirement, the Open CTI API, call center adapters from AgentExchange, softphone layouts and call center definitions stop working. The same applies to custom CTI logic, meaning screen pops, routing rules and custom code. The [developer documentation](https://developer.salesforce.com/docs/service/api-cti/guide/sforce-api-cti-when-to-use.html) recommends doing new development on Salesforce Voice only.

This affects many products that are common in German-speaking service organisations. The Mirage CTI Data Connector, for example, which connects Swyx phone systems to Salesforce, is an integration based on Open CTI according to its [product description](https://www.enreach.de/en/products/complete-your-telephone-system/third-party-products/connectors/tap-product/mirage-cti-data-connector-for-salesforce.html).

## Which paths to Salesforce Voice are there?

Salesforce has just renamed the products, so quotes and documentation still show old names. The [Trailhead migration module](https://trailhead.salesforce.com/content/learn/modules/open-cti-to-voice-migration/choose-your-migration-path) names four paths:

1. **Partner Contact Center**, formerly Partner Telephony. Your current telephony vendor stays, only the connection to Salesforce is replaced. Salesforce names Genesys, Cisco, Five9 and Talkdesk as examples.
2. **Partner Contact Center with Telephony from Amazon Connect.** For companies that already run their own Amazon Connect instance in their own AWS account.
3. **Partner Contact Center with Amazon Connect.** Amazon Connect as telephony, with Salesforce provisioning and running the AWS infrastructure.
4. **Agentforce Contact Center.** Telephony directly from Salesforce, without a third-party vendor and without an AWS account.

For the first path, what counts is whether the vendor has a package for Salesforce Voice. Genesys offers a voice package with [CX Cloud](https://help.genesys.cloud/286118) that, according to Genesys, sets up partner telephony for Salesforce Voice. For Microsoft Teams Phone there are partner products such as [Unaric Voice](https://www.unaric.com/unaric-voice-for-microsoft-teams/service-cloud-voice-v2), where calls stay in Teams and call data lands in Salesforce as a VoiceCall.

## How much does Salesforce Voice cost?

The [EU pricing page](https://www.salesforce.com/eu/service/call-center-integration/voice-pricing/) and the [Contact Center page](https://www.salesforce.com/service/contact-center/pricing/) list these prices per user and month in October 2026:

| Option | List price | Telephony |
|---|---|---|
| Partner Contact Center | €50 | from your own partner, licensed separately |
| Partner Contact Center with Amazon Connect | €75 to €200 | 750 to 5,000 minutes per user and month |
| Contact Center (native) | €125 | native telephony, annual contract |
| Contact Center Plus | €250 | adds workforce and quality management |

An example with list prices: 40 service agents on Partner Contact Center cost €2,000 per month or €24,000 per year, on top of the telephony vendor's licence. According to the footnote, transcription on this path must also be licensed from the partner. With the native Contact Center it is €60,000 per year, but the telephony vendor goes away.

The comparison only works with the cost of today's telephony next to it. A company with a Genesys contract that runs for years calculates differently from one whose phone system is being replaced anyway. How I plan licences over several years is described in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## What takes more work than expected?

The switch means more than a new softphone. According to the [migration guide](https://developer.salesforce.com/docs/service/api-cti/guide/migrate-cti.html), three things change fundamentally:

- **Data model.** Open CTI usually logs calls as tasks. Salesforce Voice creates VoiceCall records. Every report and dashboard on calls has to be rebuilt on the new object.
- **Screen pop and presence.** Both move to Omni-Channel. Screen pop becomes an action in an Omni-Channel flow, and agent status is managed in Omni-Channel.
- **Custom UI.** Whatever runs in the softphone's iframe today has to be rebuilt with Voice Extensions and the Voice Toolkit.

Then there are the interfaces. Telephony rarely depends on Salesforce alone: caller identification needs customer data, callbacks need appointments, and some information comes from the ERP. I was involved in a global CTI rollout with Service Cloud Voice, Genesys, MuleSoft and Microsoft Teams. That list alone shows how many systems a hotline depends on, and every one of these connections has to be tested again during the switch. How I plan interfaces is described under [Salesforce integration](../../services/salesforce-integration/).

The gain is real, though. Calls appear in the same Omni-Channel widget as chat and email, supervisors see all channels in one place, and transcripts sit in Salesforce, where Agentforce can use them. If you plan a voice agent on the hotline later, you need this foundation anyway, as described in [breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/).

## How do I decide?

I start with three questions before talking about products:

1. **How long does today's telephony contract run, and who operates the system?** A Genesys contract with three years left points to Partner Contact Center. An old phone system that is being replaced anyway opens the question of native telephony.
2. **Do service agents already make calls through Teams?** Then a path where calls stay in Teams is the easiest for them. Teams is becoming more important as a telephony platform, because many companies already use it internally.
3. **How much custom CTI logic is there?** Screen pops with special logic, custom routing rules and reports drive the effort more than the number of users.

Phone and email remain the most important channels in most service organisations. A hotline that no longer rings in Salesforce in February 2028 hits service directly.

## Where should you start?

This quarter, take stock of what Open CTI does for you today: how many users are assigned to the call center, which phone numbers and queues exist, which reports use call data and which custom logic exists. At the same time, ask your telephony vendor in writing what its path to Salesforce Voice looks like and from when it is available. Then plan the switch so it does not coincide with a major release or the peak season in service.

February 2028 sounds like plenty of time. With selection, contract, rebuild and tests across several countries, it is used up quickly.
