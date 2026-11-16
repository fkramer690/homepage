---
title: "Prompt injection in dealer portals: protect Agentforce"
description: "Why dealer portals, Web-to-Lead, Email-to-Case and warranty forms open Agentforce to prompt injection, what ForcedLeak showed and how to defend them."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: prompt-injection-dealer-portals-agentforce
translationKey: prompt-injection-dealer-portals
topic: security
categories: [ai]
tags: [agentforce, prompt injection, security, dealer portal, experience cloud, manufacturing]
takeaways:
  - "Fields that outsiders can write to, from a warranty fault description to Email-to-Case, become instructions once their content reaches an agent's context."
  - "ForcedLeak leaked lead data through an expired allowlisted domain; SalesBleed bypassed the Trusted URLs redaction in 2026. Both are fixed."
  - "Prompt filters are probabilistic. Plan as if they miss and make sure a successful injection can do little harm."
  - "Break the lethal trifecta: narrow the read rights for the agent's execution context, give it no way out and put decisions in deterministic logic."
faq:
  - q: "What is prompt injection in Agentforce?"
    a: "Prompt injection means text that an attacker controls ends up in the agent's context and is treated as an instruction. With indirect injection the text sits in a record, for example a lead description or a warranty claim, and fires when an employee asks the agent about that record."
  - q: "Is ForcedLeak fixed?"
    a: "Yes. According to Noma, the expired domain was re-secured, and since September 8, 2025, Salesforce blocks or redacts URLs in Agentforce and Einstein AI responses that are not on the Trusted URL allowlist. Exceptions such as exact URLs in agent instructions or citations need their own review. In 2026 Zenity found a way around that redaction (SalesBleed), which Salesforce fixed in August 2026. The underlying pattern, instructions hidden in external text, still applies to every agent."
  - q: "Does the Einstein Trust Layer protect against prompt injection?"
    a: "Salesforce describes a prompt injection detector for its Trust Layer that scores user prompts. The cited post does not explain whether or how text read from records is screened, and any classifier misses some attacks. I treat it as one layer alongside narrow permissions and closed exits."
  - q: "Which fields should a manufacturer treat as untrusted?"
    a: "Every field written by someone outside the company: Web-to-Lead forms, Email-to-Case, case and comment fields in the dealer portal, warranty fault descriptions, service partner reports and imported distributor data, plus email bodies, attachments and knowledge content they can influence."
draft: false
---

Prompt injection in dealer portals is one of the most direct ways an Agentforce agent at a manufacturer can be turned against you. Fields that a dealer, customer or website visitor can write to, from a warranty fault description to Web-to-Lead and Email-to-Case, become text your agent reads once that text reaches its context. ForcedLeak in 2025 and SalesBleed in 2026 showed that hidden instructions in such a field could make Agentforce send CRM data out. Probabilistic filters give no hard boundary, so protection is an architecture decision: limit what the agent can see, remove its ways to send data out and keep decisions in deterministic logic.

## What did ForcedLeak show?

ForcedLeak is a vulnerability chain that Noma Security reported to Salesforce on July 28, 2025, and rated CVSS 9.4. According to [The Hacker News](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html), it could affect orgs in which Agentforce processed Web-to-Lead records. An attacker submitted a web form with hidden instructions in the Description field. Later an employee asked Agentforce an ordinary question about that lead. The agent carried out the hidden instructions along with the real question, read further lead data and put it into the address of an image in its answer. When the answer was rendered, the browser requested that image from the attacker's domain. The target domain was on Salesforce's allowlist, but it had expired and could be bought for about $5.

```ablauf
ext: Attacker, Employee, Expired domain
sf: Lead description, Agentforce
Attacker --Web form--> Lead description
Employee --Question on lead--> Agentforce
Lead description --Hidden instruction--> Agentforce
Agentforce --Image URL leak--> Expired domain
```

Salesforce acknowledged the report on July 31 and has enforced Trusted URLs for Agentforce and Einstein AI since September 8, 2025, according to [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/). Salesforce told The Hacker News that the allowlist ensures "no malicious links are called or generated" through prompt injection. According to Noma, the expired domain was re-secured.

```zeitleiste
2025-07-28 | Noma Security reports ForcedLeak to Salesforce, CVSS 9.4
2025-07-31 | Salesforce acknowledges the report
2025-09-08 | Salesforce enforces Trusted URLs for Agentforce and Einstein AI
2025-09-25 | Noma publishes the details
2026-06-01 | Zenity reports SalesBleed, a bypass of the Trusted URLs redaction
2026-08-19 | Zenity confirms Salesforce's fix for the bypass
```

The allowlist did not end the story. In [SalesBleed](https://labs.zenity.io/post/salesbleed-0-click-data-exfiltration-on-agentforce), Zenity Labs again started from a Web-to-Lead form. Edge cases in the URL redaction let a link through, and the data left via a DNS lookup, either when the chat rendered an image or when Slack built a link preview for an agent that had been published there. Zenity writes that "this specific chain is closed".

Two points matter more to me than the patch. Noma wrote that the model "lacked the ability to distinguish" between data loaded into its context and instructions from trusted sources. That is still true of today's LLM-based agents. And a Salesforce spokesperson told [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/) that prompt injection is "a complex and evolving area". The specific exit is closed. The pattern behind it stays.

## Dealer portals and service mailboxes are entry points

Simon Willison named the pattern the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) in June 2025: an agent with access to private data, exposure to untrusted content and the ability to communicate externally can be made to leak that data. Willison called ForcedLeak a [classic case](https://simonwillison.net/2025/Sep/26/agentforce/) of it. In a manufacturing org untrusted text comes in through more doors than Web-to-Lead:

- **Web-to-Lead** for quote and spare part requests on your website. Usually, no login is needed.
- **Email-to-Case** on the service mailbox. Unless upstream filters restrict senders, anyone who knows the address can create a case.
- **The dealer portal** on Experience Cloud: case descriptions, comments, warranty claims with a free-text fault description. These require a login, but a hundred dealer organizations each bring their own staff turnover and password habits.
- **Service partner reports** in Field Service, written by external technicians.
- **Distributor imports** such as order notes or claim lists.

A buyer agent that takes orders by WhatsApp or SMS adds one more door, see [B2B Buyer Agent: ordering through WhatsApp and SMS](/en/blog/b2b-buyer-agent-whatsapp-ordering/).

The person who triggers the attack is your own employee doing their job. A warranty clerk asks the agent to summarize today's claims. A sales rep asks about a new lead. Nothing in their request is wrong. The instruction sits in a record they never opened.

The leg that decides how bad it gets is private data. Internal agents often run with broad access to help across accounts. If such an agent reads one dealer's claim, it may also be able to read other dealers' prices, rebate terms or margin fields. In the [customer portal article](/en/blog/manufacturing-cloud-customer-portal/) I argue that margin and cost fields must never go outside. An agent with the wrong permissions is one way they still can.

## Why is a prompt filter not enough?

Salesforce describes a [prompt injection detector](https://www.salesforce.com/blog/prompt-injection-detection/) for its [Trust Layer](/en/blog/einstein-trust-layer-what-it-protects/). Its AI Research team describes a classifier that scores user prompts so the platform can intervene before they reach the agent. That is useful. But the March 2025 post describes screening user prompts and does not say how text pulled from records, such as a warranty claim, is screened. And any classifier is probabilistic. Willison's view of guardrail products that claim to stop 95 percent of attacks: in web application security that is "very much a failing grade".

Salesforce's [ISV security guide](https://developer.salesforce.com/docs/platform/isvforce/guide/secure-agentforce-prompt-injection-data.html) asks developers to validate user-controlled data before it goes into a prompt, with an allowlist of characters and length limits, and to leave the data out when it fails. I would apply that wherever external text goes into a prompt, with rules for each kind of content: strict checks for structured fields, length limits for free text. A character allowlist on a fault description would destroy model numbers and units. Validation raises the effort for an attacker. It does not make the agent safe, because a convincing instruction can be short and written in plain words.

So I treat detection as one layer and plan as if it will miss.

## How do you protect Agentforce against prompt injection?

The goal is that a successful injection does little harm. For every agent that reads external text, break at least one leg of the trifecta, ideally two.

1. **Mark the external content.** List every field that someone outside the company can write, per object and channel, plus email bodies, attachments and knowledge articles they can influence. A business analyst can keep that list current.
2. **Close the exits.** Trusted URLs enforcement is on in every org, so review what it allows: exact URLs in agent instructions, wildcards, CSP directives and the [Trusted URLs](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_csptrustedsite.htm) list itself. Each entry needs an owner and a reason, and an entry for a campaign microsite from years ago carries the same domain takeover risk that ForcedLeak exploited in a Salesforce-managed allowlist. A new entry allows images by default. Exits also include agent actions that send emails, post to Slack or call webhooks. An agent that summarizes external text should have none of them.
3. **Shrink the execution context.** First decide in whose context the agent runs: an employee agent works with the permissions of the signed-in employee, a service agent with its own agent user. Salesforce [recommends](https://www.salesforce.com/blog/best-practices-for-secure-agentforce-implementation-2/) granting only what is essential, plus regular reviews of role hierarchies and organization-wide defaults. An agent that handles one dealer's claim should see that claim, the asset and that dealer's account, not the whole installed base. That takes sharing or query filters, not just object permissions.
4. **Keep decisions and writes out of the model.** Warranty approval, credit notes and price exceptions belong behind deterministic gates, as described in [Agent Script: rules instead of the LLM](/en/blog/agent-script-deterministic-rules/). An action hidden behind an `available when` condition cannot be triggered by text in a claim, provided the condition comes from trusted data or a deterministic action and not from the model's reading of the claim. Anything that moves money or sends data to a third party gets a human approval step.
5. **Separate reading from acting.** A paper on design patterns that Willison [summarized](https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/) puts the principle in one line: "once an LLM agent has ingested untrusted input, it must be constrained". In Salesforce I build that as a summarizing step without actions, whose output a person or a deterministic step then uses.
6. **Test and look back.** Add guardrail cases with hidden instructions to the agent's test set, as in [testing Agentforce agents before go-live](/en/blog/testing-agentforce-agents-before-go-live/), search existing records for unusual instructions in the external fields, as Noma recommended after ForcedLeak, and monitor blocked Trusted URL and CSP violations and the agent's action calls.

## Example: warranty claims from 120 dealers

Assume a maker of packaging machines with 120 dealers, SAP as its ERP system and Manufacturing Cloud with a dealer portal. All numbers are assumptions used to show the method. Dealers submit around 300 warranty claims a month, each with a free-text fault description. The company plans an agent with its own agent user that summarizes new claims for the warranty team every morning.

The first design review identifies all three legs of the trifecta. The agent user is a copy of a warranty clerk's profile, so it can read every dealer account, all claims and the rebate agreements. The fault description is external text. And the agent has an action that emails the dealer a confirmation, and its summaries render links.

The fixes are dull. A flow hands the agent one claim at a time, and the agent user gets read access only to claims, assets and dealer accounts; rebate agreements and margin fields are no longer accessible. The email action moves to a separate step that a clerk triggers after reading the summary. In this example the Trusted URLs list shrinks from 14 entries to 6, each with a named owner. Eligibility checks run as deterministic logic against serial number and warranty start, which is also how the [Warranty Claims Adjudication Agent](/en/blog/warranty-claims-adjudication-agent/) is meant to work.

After that, a hidden instruction in a fault description can still distort one summary. It cannot reach rebate or margin data, it is limited to that one claim, and it has no way out. The remaining risk is a misleading summary, and the clerk catches it because claims above an agreed amount are always read in full. In my judgment that residual risk is acceptable. An agent with broad read rights and an email action is not.

## Spend half a day on the fields outsiders can write

For a first pass I would sit with the Salesforce admin and the head of service for half a day and answer five questions:

1. Which fields and other content in our org can people outside the company write or influence?
2. Which agents, prompts or flows read those fields?
3. What can each agent's execution context see beyond the record in front of it?
4. Which actions, links or Trusted URLs give it a way out?
5. Which decisions does the model make that a rule should make?

The same questions apply to external AI tools that read Salesforce data through MCP, because the trifecta does not care which client reads the field. I cover that in [hosted MCP servers and data access](/en/blog/salesforce-hosted-mcp-servers-data-access/), and the OAuth side in [connected apps and AI integrations](/en/blog/connected-apps-oauth-ai-integrations/). Mapping data flows and permissions like this is part of my [Salesforce architecture work](/en/services/salesforce-architecture/).
