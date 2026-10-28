---
title: "Prompt injection in dealer portals: protect Agentforce"
description: "Why dealer portals, Web-to-Lead, Email-to-Case and warranty forms open Agentforce to prompt injection, what ForcedLeak showed and how to defend them."
pubDate: 2026-10-27
lang: en
slug: prompt-injection-dealer-portals-agentforce
translationKey: prompt-injection-dealer-portals
topic: security
categories: [ai]
tags: [agentforce, prompt injection, security, dealer portal, experience cloud, manufacturing]
takeaways:
  - "Every field a dealer, customer or website visitor can write, from a warranty fault description to Web-to-Lead and Email-to-Case, is text an Agentforce agent may read and follow."
  - "ForcedLeak (CVSS 9.4, reported July 2025) made Agentforce send lead data to an expired allowlisted domain; Salesforce has enforced Trusted URLs for agents since 8 September 2025."
  - "Prompt filters and input validation help, but they are probabilistic; plan as if they miss and make sure a successful injection can do little harm."
  - "Break the lethal trifecta for every agent that reads external text: narrow read rights for the running user, no outbound actions or stray Trusted URLs, decisions in deterministic logic."
faq:
  - q: "What is prompt injection in Agentforce?"
    a: "Prompt injection means text that an attacker controls ends up in the agent's context and is treated as an instruction. With indirect injection the text sits in a record, for example a lead description or a warranty claim, and fires when an employee asks the agent about that record."
  - q: "Is ForcedLeak fixed?"
    a: "Yes. According to Noma, the expired domain was re-secured, and Salesforce has enforced a Trusted URL allowlist for Agentforce and Einstein AI since 8 September 2025, so agents cannot call or generate links to URLs outside it. The underlying pattern, instructions hidden in external text, still applies to every agent."
  - q: "Does the Einstein Trust Layer protect against prompt injection?"
    a: "Salesforce describes a prompt injection detector for its Trust Layer that scores user prompts. Salesforce does not describe how text read from records is screened, and any classifier misses some attacks. I treat it as one layer next to narrow permissions and closed exits."
  - q: "Which fields should a manufacturer treat as untrusted?"
    a: "Every field written by someone outside the company: Web-to-Lead forms, Email-to-Case, case and comment fields in the dealer portal, warranty fault descriptions, service partner reports and imported distributor data."
draft: false
---

Prompt injection in dealer portals is the most likely way an Agentforce agent at a manufacturer gets turned against you. Every field that a dealer, customer or website visitor can write, from a warranty fault description to Web-to-Lead and Email-to-Case, becomes text your agent reads. ForcedLeak showed in 2025 that hidden instructions in such a field could make Agentforce send CRM data out. No filter catches this reliably, so protection is an architecture decision: limit what the agent can see, remove its ways to send data out and keep decisions in deterministic logic.

## What did ForcedLeak show?

ForcedLeak is a vulnerability chain that Noma Security reported to Salesforce on 28 July 2025, rated CVSS 9.4. According to [The Hacker News](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html), it affected any org that used Agentforce with Web-to-Lead enabled. An attacker submitted a web form with hidden instructions in the Description field. Later an employee asked Agentforce an ordinary question about that lead. The agent carried out the hidden instructions along with the real question, read further lead data and sent it out, embedded in the address of an image. The target domain was on Salesforce's allowlist, but it had expired and could be bought for about $5.

```ablauf
ext: Attacker, Employee, Expired domain
sf: Lead description, Agentforce
Attacker --Web form--> Lead description
Employee --Question on lead--> Agentforce
Lead description --Hidden instruction--> Agentforce
Agentforce --Data in image URL--> Expired domain
```

Salesforce acknowledged the report on 31 July and has enforced Trusted URLs for Agentforce and Einstein AI since 8 September 2025, according to [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/). Salesforce told The Hacker News that the allowlist ensures "no malicious links are called or generated" through prompt injection. According to Noma, the expired domain was re-secured. Noma published the details on 25 September.

Two points matter more to me than the patch. Noma wrote that the model "lacked the ability to distinguish" between data loaded into its context and instructions from trusted sources. That holds for every language model. And a Salesforce spokesperson told [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/) that prompt injection is "a complex and evolving area". The specific exit is closed. The pattern behind it stays.

## Why are dealer portals and service mailboxes entry points?

Simon Willison named the pattern the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) in June 2025: an agent with access to private data, exposure to untrusted content and the ability to communicate externally can be made to leak that data. Willison called ForcedLeak a [classic case](https://simonwillison.net/2025/Sep/26/agentforce/) of it. In a manufacturing org untrusted text comes in through more doors than Web-to-Lead:

- **Web-to-Lead** for quote and spare part requests on your website. No login needed.
- **Email-to-Case** on the service mailbox. Anyone who knows the address can create a case.
- **The dealer portal** on Experience Cloud: case descriptions, comments, warranty claims with a free-text fault description. These need a login, but a hundred dealer organisations each bring their own staff turnover and password habits.
- **Service partner reports** in Field Service, written by external technicians.
- **Distributor imports** such as order notes or claim lists.

A buyer agent that takes orders by WhatsApp or SMS adds one more door, see [B2B Buyer Agent: ordering through WhatsApp and SMS](../b2b-buyer-agent-whatsapp-ordering/).

The person who triggers the attack is your own employee doing their job. A warranty clerk asks the agent to summarise today's claims. A sales rep asks about a new lead. Nothing in their request is wrong. The instruction sits in a record they never opened.

The leg that decides how bad it gets is private data. Internal agents often run with broad access to help across accounts. If such an agent reads one dealer's claim, it may also be able to read other dealers' prices, rebate terms or margin fields. In the [customer portal article](../manufacturing-cloud-customer-portal/) I argue that margin and cost fields must never go outside. An agent with the wrong permissions is one way they still can.

## Why is a prompt filter not enough?

Salesforce describes a [prompt injection detector](https://www.salesforce.com/blog/prompt-injection-detection/) for its Trust Layer. Its AI Research team describes a classifier that scores user prompts so the platform can intervene before they reach the agent. That is useful. But the March 2025 post describes screening user prompts and does not say how text pulled from records, such as a warranty claim, is screened. And any classifier is probabilistic. Willison's view of guardrail products that claim to stop 95 percent of attacks: in web application security that is "very much a failing grade".

Salesforce's [ISV security guide](https://developer.salesforce.com/docs/platform/isvforce/guide/secure-agentforce-prompt-injection-data.html) asks developers to validate user-controlled data before it goes into a prompt, with an allowlist of characters and length limits, and to leave the data out when it fails. I would apply that to every externally written field. It raises the effort for an attacker. It does not make the agent safe, because a convincing instruction can be short and written in plain words.

So I treat detection as one layer and plan as if it will miss.

## How do you protect Agentforce against prompt injection?

The goal is that a successful injection does little harm. For every agent that reads external text, break at least one leg of the trifecta, ideally two.

1. **Mark the external fields.** List every field that someone outside the company can write, per object and channel. A business analyst can keep that list current.
2. **Close the exits.** Check that Trusted URLs enforcement is active in your org. Then review the [Trusted URLs](https://developer.salesforce.com/docs/atlas.en-us.254.0.lightning.meta/lightning/security_trusted_urls_manage.htm) list itself: each entry needs an owner and a reason, and an entry for a campaign microsite from years ago is exactly the kind of expired domain ForcedLeak used. A new entry allows images by default. Exits also include agent actions that send emails, post to Slack or call webhooks. An agent that summarises external text should have none of them.
3. **Shrink the running user.** Every agent has a running user that determines what it can read and do. Salesforce [states](https://www.salesforce.com/blog/best-practices-for-secure-agentforce-implementation-2/) that new agents have no permissions by default and recommends granting only what is essential, plus regular reviews of role hierarchies and organisation-wide defaults. An agent that handles one dealer's claim should see that claim, the asset and that dealer's account, not the whole installed base.
4. **Keep decisions and writes out of the model.** Warranty approval, credit notes and price exceptions belong behind deterministic gates, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/). An action hidden behind an `available when` condition cannot be triggered by text in a claim. Anything that moves money or sends data to a third party gets a human approval step.
5. **Separate reading from acting.** A paper on design patterns that Willison [summarised](https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/) puts the principle in one line: "once an LLM agent has ingested untrusted input, it must be constrained". In Salesforce I build that as a summarising step without actions, whose output a person or a deterministic step then uses.
6. **Test and look back.** Add guardrail cases with hidden instructions to the agent's test set, as in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/), and search existing records for unusual instructions in the external fields, as Noma recommended after ForcedLeak.

## A typical scenario: warranty claims from 120 dealers

Assume a maker of packaging machines with 120 dealers, SAP as ERP and Manufacturing Cloud with a dealer portal. All numbers are assumptions to show the method. Dealers submit around 300 warranty claims a month, each with a free-text fault description. The company plans an employee agent that summarises new claims for the warranty team every morning.

The first design review finds all three legs. The agent's running user is a copy of a warranty clerk's profile, so it can read every dealer account, all claims and the rebate agreements. The fault description is external text. And the agent has an action that emails the dealer a confirmation, plus summaries that render links.

The fixes are dull. The running user gets read access only to claims, assets and the submitting dealer's account; rebate agreements and margin fields drop out. The email action moves to a separate step that a clerk triggers after reading the summary. The Trusted URLs list, assumed at 14 entries, shrinks to 6, each with a named owner. Eligibility checks run as deterministic logic against serial number and warranty start, the way the [Warranty Claims Adjudication Agent](../warranty-claims-adjudication-agent/) is meant to work as well.

After that, a hidden instruction in a fault description can still distort one summary. It cannot reach data outside that claim and has no way out. The remaining risk is a misleading summary, and the clerk catches it because claims above an agreed amount are always read in full. In my judgement that residual risk is acceptable. An agent with broad read rights and an email action is not.

## Where should you start?

For a first pass I would sit with the Salesforce admin and the head of service for half a day and answer five questions:

1. Which fields in our org can people outside the company write?
2. Which agents, prompts or flows read those fields?
3. What can each agent's running user see beyond the record in front of it?
4. Which actions, links or Trusted URLs give it a way out?
5. Which decisions does the model make that a rule should make?

The same questions apply to external AI tools that read Salesforce data through MCP, because the trifecta does not care which client reads the field. I cover that in [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/), and the OAuth side in [connected apps and AI integrations](../connected-apps-oauth-ai-integrations/). Mapping data flows and permissions like this is part of my [Salesforce architecture work](../../services/salesforce-architecture/).

An agent that reads text from dealers or the web needs narrow read rights and no way out, and with both in place prompt injection becomes a quality issue instead of a data leak. If you want a second look at your portal and agent setup, [send me a message](#contact).
