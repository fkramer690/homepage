---
title: "Warranty Claims Adjudication Agent: what to prepare"
description: "What the Winter '27 Warranty Claims Adjudication Agent in Manufacturing Cloud does, and which asset data, rules and approvals must be in place before it runs."
pubDate: 2026-10-27
lang: en
slug: warranty-claims-adjudication-agent
translationKey: warranty-adjudication-agent-winter-27
topic: ai
categories: [ai, manufacturing-cloud]
tags: [agentforce, warranty, manufacturing cloud, ai agents, dealers, after-sales]
takeaways:
  - "Salesforce describes the Winter '27 Warranty Claims Adjudication Agent as validating coverage and flagging potential fraud; Winter '27 became generally available on 12 October 2026."
  - "Manufacturing Cloud already adjudicates claims with Flow, the Business Rules Engine and expression sets; the agent should work around these rules and leave the coverage decision to them."
  - "Before the agent runs, every claimed machine needs a serial number and a warranty start date in Salesforce, plus a usage source where terms depend on it; otherwise it decides on gaps."
  - "Claims above an agreed amount, every fraud flag, goodwill and claims with missing asset data should go to a human adjudicator before any credit note is issued."
  - "In the sources I could open, Salesforce has not published the licence, the fraud signals or a setup guide for this agent; clarify all three before you budget."
faq:
  - q: "What does the Warranty Claims Adjudication Agent do?"
    a: "According to the Manufacturing Cloud product page, it validates coverage and flags potential fraud to speed up claim decisions. It is part of the Winter '27 release, which became generally available on 12 October 2026."
  - q: "Does the agent replace the warranty adjudicator?"
    a: "I would not let it. Claims above an agreed amount, with fraud flags or with missing asset data should stay with a person. The agent sorts and prepares, the adjudicator approves the money."
  - q: "What must be in place before I switch it on?"
    a: "Assets with serial numbers and warranty start dates in Salesforce, warranty terms maintained as rules, an agreed approval threshold and a dealer portal whose free-text fields are treated as untrusted input."
  - q: "What does the agent cost?"
    a: "Salesforce has not published a separate price in the sources I could open. The existing Agentforce for Manufacturing warranty actions need an add-on licence per user, and an Agentforce action costs 20 Flex Credits ($0.10) at list price, 16 credits in a sandbox."
draft: false
---

The Warranty Claims Adjudication Agent in Manufacturing Cloud, part of Winter '27, checks whether a dealer's warranty claim is covered and flags potential fraud. It is only as good as the asset data and rules behind it. Before you switch it on, every claimed machine needs a serial number and a warranty start date in Salesforce, your warranty terms need to exist as rules, and someone has to own the point where a person approves the money. I would let the agent sort and prepare claims, keep the coverage logic in rules and leave payment approval with an adjudicator.

## What does the Warranty Claims Adjudication Agent do?

Salesforce lists it on the [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) under Winter '27 with one sentence: it should "speed up claim decisions" by validating coverage and flagging potential fraud. The same release adds guided warranty parts returns for dealers. Summer '26 had already brought the AI Warranty Concierge, which guides customers through a claim. Winter '27 became [generally available on 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

For a purchasing decision that is thin. In the sources I could open, Salesforce has not published which fraud signals the agent uses, which licence it needs or a setup guide like the ones for its other manufacturing agents. What is documented are the [Agentforce for Manufacturing warranty actions](https://help.salesforce.com/s/articleView?id=ai.agent_ref_mfg_get_wrnty_claims_for_acct.htm&language=en_US&type=5): Check Asset For Warranty, Check Coverage for Parts, Get Asset Warranties and Get Warranty Claims for Account, which finds claims by asset ID, serial number or claim number. They require the Agentforce for Manufacturing add-on for each user, or Agentforce 1 Manufacturing Edition. I expect the adjudication agent to build on these actions, but that is my assumption, so ask your account team before you put a number in the budget.

The data model underneath, from warranty terms to supplier recovery, is described in [warranty claims from dealers in Salesforce](../warranty-claims-dealers-salesforce/). Here I look only at the agent and what it needs.

## What changes compared with rules-based adjudication?

Manufacturing Cloud can adjudicate claims without any AI today. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=mfg_warranties_adjudication_process_worflow.htm&language=en_US&type=5), a record-triggered flow starts when a claim meets defined conditions, collects the claim data through Context Service and hands it to an expression set in the Business Rules Engine. The expression set validates the claim and returns adjusted amounts and a status, and the flow updates the claim and emails the participants. A [Claim Validation element](https://help.salesforce.com/s/articleView?id=mfg_warranties_flow_bre.htm&language=en_US&type=5) reports whether a claim is approved and which products are not covered. A Scoring Framework adds a prediction of how likely a claim is to be approved, based on past approvals.

In practice such a rule set looks like this: a claim goes to manual review if its amount exceeds a limit per product family or if the fault occurred within a few months of installation. Routine claims pass, the rest go to a person.

So the question "is this covered?" already has a deterministic answer. An agent adds value where rules are weak: reading the dealer's free-text fault description, comparing it with the fault code and the parts claimed, noticing that the same serial number came in twice, summarising the case for the adjudicator and drafting a request for missing information. Salesforce's own [architect guide on hybrid reasoning](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) states the rule I would apply: "if you can express a decision as code, it should be written as logic." How to build that split is the topic of [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

## What must be in place before the agent checks claims?

### Asset data with serial numbers and start dates

Every coverage check is a question about one machine. If the asset is missing in Salesforce or has no warranty start date, the agent has nothing to check against and will judge on gaps. For manufacturers selling through dealers, the gap usually sits in registration: the dealer knows when the machine was handed over, the manufacturer does not. Take the claims of the last twelve months and count how many serial numbers exist as assets with a start date. Below about 95 percent I would fix registration first. How to build that asset data is covered in [installed base in Manufacturing Cloud](../installed-base-asset-milestones/).

### Warranty terms as rules, not as PDFs

The agent validates coverage against what is maintained. Terms that live in contracts, spreadsheets or the heads of the warranty team have to become warranty terms and expression set rules first. Usage limits need a source for operating hours. If the dealer types the hours in by hand, treat that value as part of the claim, not as a fact.

### An approval threshold with an owner

Decide before go-live which claims may pass automatically and which always go to an adjudicator. My default list: amounts above an agreed limit, every fraud flag, every claim with missing asset data, and all goodwill. Agree the limit with the head of service and finance, because it is a commercial decision. Technically, Agent Script helps here: an action behind an `available when` gate is removed from the model's tool list until deterministic code opens the gate, so an approval action stays invisible until the rules have passed.

### The dealer portal as an attack surface

The agent reads text that dealers write. In 2025 the ForcedLeak vulnerability (rated CVSS 9.4 by its finder, Noma Security) showed that instructions hidden in the description field of a Web-to-Lead form could make Agentforce send lead data to an outside domain; Salesforce responded by enforcing a Trusted URL allowlist, as [The Hacker News reported](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html). A fault description in a warranty claim is the same kind of field. I cover the protection in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

### Licence and test budget

According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), a standard or custom action costs 20 credits in production and 16 in a sandbox. Flex Credits cost [$500 per 100,000](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/), so one action costs $0.10. Plan two separate lines: consumption, which you can estimate, and the licence, which only Salesforce can answer for now.

## A typical scenario: agricultural machinery sold through 90 dealers

Assume a maker of agricultural machinery with 90 dealers in Germany and Austria, SAP as ERP and Manufacturing Cloud with a dealer portal. All numbers are assumptions to show the method.

**Volume.** 350 warranty claims a month, two adjudicators, an average claimed amount of €1,400.

**Data check.** 18 percent of the claimed serial numbers have no installation date, because dealers did not register the handover. Operating hours are typed in by the dealer.

**First step without AI.** A mandatory handover registration in the portal with installation date and hours, plus a one-off load of the installed base from SAP. Then the expression set takes over warranty period, hours limit and covered parts. Assume three months for both.

**Then the agent.** It reads the fault description, checks it against fault code and parts, flags repeated serial numbers and faults shortly after installation, writes a summary and drafts the request for missing information. Claims above €2,500, every flag and every data gap go to the adjudicators. Assume that is 30 percent of the volume.

**Consumption.** Assume five actions per claim: 350 × 5 × 20 = 35,000 credits, about $175 a month. A test set of 200 real, anonymised claims costs 200 × 5 × 16 = 16,000 credits, or $80 per sandbox run. Ten runs before go-live come to $800.

The consumption is small. The real cost is the three months of data work, and the open item is the licence.

## Who decides what: rule, agent or adjudicator?

| Decision | Where | Why |
|---|---|---|
| Is the machine under warranty on the fault date? | Expression set | Date comparison, must be reproducible |
| Is the part covered, are the hours below the limit? | Expression set | Clear rule from the warranty term |
| Do description, fault code and parts fit together? | Agent | Free text needs language |
| Is the claim suspicious? | Agent flags, adjudicator decides | A flag is a hint, not proof |
| Amounts above the limit, goodwill | Adjudicator | Commercial responsibility |
| Credit note to the dealer | ERP | Finance books the payment |

The agent goes to production like any other change: with a test set of real claims, an agreed pass rate and monitoring afterwards, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). Drawing these lines between rules, agent and people is part of my [architecture work](../../services/salesforce-architecture/). If you have not decided on Manufacturing Cloud itself yet, start with [whether Manufacturing Cloud pays off](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Where should you start?

1. **Measure asset coverage**: share of last year's claims whose serial number exists as an asset with start date.
2. **Run rules-based adjudication first.** According to Salesforce Help it is available in Enterprise, Unlimited and Developer Editions, and it shows quickly whether your terms work as rules.
3. **Agree the approval threshold** with service and finance, in writing.
4. **Treat portal free text as untrusted** before any agent reads it.
5. **Ask Salesforce three questions**: which licence, which fraud signals, which setup documentation.
6. **Build a test set** from real claims, including rejected ones and known fraud cases.

The Warranty Claims Adjudication Agent can speed up decisions, but only on top of clean asset data, rules that already work and a clear approval line. If you want a second opinion on whether your warranty process is ready for it, [send me a message](#contact).
