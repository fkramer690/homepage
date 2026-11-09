---
title: "Warranty Claims Adjudication Agent: what to prepare"
description: "What the Winter '27 Warranty Claims Adjudication Agent in Manufacturing Cloud does, and which asset data, rules and approvals must be in place before it runs."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: warranty-claims-adjudication-agent
translationKey: warranty-adjudication-agent-winter-27
topic: ai
categories: [ai, manufacturing-cloud]
tags: [agentforce, warranty, manufacturing cloud, ai agents, dealers, after-sales]
takeaways:
  - "The Winter '27 agent ranks open claims, flags missing data and potential fraud and drafts requests. It never approves or rejects a claim."
  - "Manufacturing Cloud can adjudicate claims with Flow, the Business Rules Engine and expression sets. I would keep the binding coverage decision there."
  - "The agent relies on asset, warranty term, asset warranty and claim records. I would also require serial numbers and reliable warranty start dates."
  - "Claims above an agreed amount, every fraud flag, goodwill and claims with missing asset data should go to a human adjudicator before any credit note is issued."
  - "It needs the Agentforce for Manufacturing add-on at $150 per user and month list price, or Agentforce 1 Manufacturing, plus Flex Credits for usage."
faq:
  - q: "What does the Warranty Claims Adjudication Agent do?"
    a: "According to Salesforce Help it summarizes the claim queue, ranks open claims by value, age and complexity, checks claims for missing information, drafts requests for information and flags potential fraud. Adjudicators use it in the Agentforce panel or Slack. It is part of Winter '27, generally available since 12 October 2026."
  - q: "Does the agent replace the warranty adjudicator?"
    a: "No. Salesforce Help says the agent assists adjudicators but does not approve or reject claims, and it can draft a request for information but not send it. I would still route claims above an agreed amount, with fraud flags or with missing asset data to a person explicitly."
  - q: "What must be in place before I switch it on?"
    a: "The records the setup guide names: account, asset, warranty term, asset warranty, claim, claim item, claim coverage and claim coverage payment detail. In addition I would want serial numbers and reliable start dates, warranty terms maintained as rules, an agreed approval threshold and a dealer portal whose free-text fields are treated as untrusted input."
  - q: "What does the agent cost?"
    a: "It runs in Enterprise, Unlimited or Developer Edition with the Agentforce for Manufacturing add-on, listed at $150 per user and month, or in Agentforce 1 Manufacturing Edition. Usage adds Flex Credits: 20 per action in production, 16 in a sandbox, plus prompts and Data 360 consumption. Confirm the full product stack with your account team."
draft: false
---

The Warranty Claims Adjudication Agent in Manufacturing Cloud, part of Winter '27, helps warranty adjudicators work their queue. According to Salesforce Help it ranks open claims, checks them for missing information, drafts requests for information and flags potential fraud. It does not approve or reject claims. It depends on the asset, warranty and claim records behind it. Before you switch it on, your warranty terms need to exist as rules and asset warranties, and someone has to own the point where a person approves the money. I would let the agent sort and prepare claims, keep the coverage logic in rules and leave every decision with an adjudicator.

## What does the Warranty Claims Adjudication Agent do?

Salesforce lists it on the [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) under Winter '27 with one sentence: it should "speed up claim decisions" by validating coverage and flagging potential fraud. [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication.htm&language=en_US&type=5) is more precise: the agent summarizes queue volume, ranks open claims by value, age and complexity, validates claim data for completeness, flags missing information, drafts requests for additional details and identifies potential fraud earlier. Adjudicators reach it through the Agentforce panel or Slack. The [considerations](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication_agent_considerations.htm&language=en_US&type=5) are explicit: it "doesn't approve or reject claims", and it can draft a request for information but can't send it. With Winter '27 Salesforce renamed Manufacturing Cloud to Agentforce Manufacturing; I keep the old name because the product and pricing pages still use it. The same release adds guided warranty parts returns for dealers. Summer '26 had already brought the AI Warranty Concierge, which guides customers through a claim. Winter '27 became [generally available on 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

```hinweis offen
The [setup guide](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication_prepare_org.htm&language=en_US&type=5) lists five add-ons the org needs, from Manufacturing Cloud for Service and Warranty Lifecycle Management to the Agentforce Employee Agent add-on. Which signals the fraud check uses is not described in detail on the pages I opened. Have your account team confirm the product stack and the fraud logic before you put a number in the budget.
```

Salesforce also documents the [Agentforce for Manufacturing warranty actions](https://help.salesforce.com/s/articleView?id=ai.agent_ref_mfg_get_wrnty_claims_for_acct.htm&language=en_US&type=5): Check Asset For Warranty, Check Coverage for Parts, Get Asset Warranties and Get Warranty Claims for Account, which finds claims by asset ID, serial number or claim number. They require the Agentforce for Manufacturing add-on for each user, or Agentforce 1 Manufacturing Edition. I expect the adjudication agent to build on these actions, but that is my assumption.

The data model underneath, from warranty terms to supplier recovery, is described in [warranty claims from dealers in Salesforce](../warranty-claims-dealers-salesforce/). Here I look only at the agent and what it needs.

## Rules-based adjudication exists today

Manufacturing Cloud can adjudicate claims without any AI today. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=mfg_warranties_adjudication_process_worflow.htm&language=en_US&type=5), a record-triggered flow starts when a claim meets defined conditions, collects the claim data through Context Service and hands it to an expression set in the Business Rules Engine. The expression set validates the claim and returns adjusted amounts and a status, and the flow updates the claim and emails the participants. A [Claim Validation element](https://help.salesforce.com/s/articleView?id=mfg_warranties_flow_bre.htm&language=en_US&type=5) reports whether a claim is approved and which products are not covered. A Scoring Framework adds a prediction of how likely a claim is to be approved, based on past approvals.

In practice such a rule set looks like this: a claim goes to manual review if its amount exceeds a limit per product family or if the fault occurred within a few months of installation. Routine claims pass, the rest go to a person.

So the question "is this covered?" can have a deterministic answer once rules and data are in place. An agent adds value where rules are weak. Documented are queue ranking, completeness checks, fraud flags and drafted requests for missing information. Comparing the dealer's free-text fault description with the fault code and the parts claimed is not described as a standard function; I would treat it as an extension and test it separately. Salesforce's own [architect guide on hybrid reasoning](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) states the rule I would apply: "if you can express a decision as code, it should be written as logic." How to build that split is the topic of [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

## What has to be in place before the agent

### Asset data with serial numbers and start dates

Every coverage check is a question about one machine. The setup guide names the records the agent relies on: account, asset, warranty term, asset warranty, claim, claim item, claim coverage and claim coverage payment detail. Serial number and start date are not listed as required fields, but in my view they decide whether the asset warranty is right. If the asset is missing in Salesforce or has no warranty start date, the agent has nothing to check against and will judge on gaps. For manufacturers selling through dealers, the gap usually sits in registration: the dealer knows when the machine was handed over, the manufacturer does not. Take the claims of the last twelve months and count how many serial numbers exist as assets with a start date. Below about 95 percent I would fix registration first. How to build that asset data is covered in [installed base in Manufacturing Cloud](../installed-base-asset-milestones/).

### Warranty terms as rules, not as PDFs

The agent validates coverage against what is maintained. Terms that live in contracts, spreadsheets or the heads of the warranty team have to become warranty terms and expression set rules first. Usage limits need a source for operating hours. If the dealer types the hours in by hand, treat that value as part of the claim, not as a fact.

### An approval threshold with an owner

Decide before go-live which claims may pass automatically and which always go to an adjudicator. My default list: amounts above an agreed limit, every fraud flag, every claim with missing asset data, and all goodwill. Agree the limit with the head of service and finance, because it is a commercial decision. The standard agent has no approval action at all. If you extend it with your own actions, Agent Script helps: an action behind an `available when` gate is removed from the model's tool list until deterministic code opens the gate.

### The dealer portal as an attack surface

The agent reads text that dealers write. In 2025 the ForcedLeak vulnerability (rated CVSS 9.4 by its finder, Noma Security) showed that instructions hidden in the description field of a Web-to-Lead form could make Agentforce embed lead data in an image URL on an expired but still trusted domain, which the browser then loaded; Salesforce responded by enforcing a Trusted URL allowlist, as [The Hacker News reported](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html). An allowlist limits where data can go, it does not make the text safe. A fault description in a warranty claim is the same kind of field. I cover the protection in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

### License and test budget

Consumption has published prices:

```kennzahlen
20 credits | per standard or custom action in production
16 credits | per action in a sandbox
$0.10 | per action in production, at $500 per 100,000 Flex Credits
source: [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) and [Salesforce press release on flexible pricing](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/)
```

Plan two separate lines. The license: the [Manufacturing Cloud add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) lists Agentforce for Manufacturing at $150 per user and month, on top of the products the setup guide requires. And consumption: according to the [considerations](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication_agent_considerations.htm&language=en_US&type=5) employee agents also use generative AI prompts and Data 360, which consume credits too.

## Worked example: agricultural machinery sold through 90 dealers

Assume a maker of agricultural machinery with 90 dealers in Germany and Austria, SAP as ERP and Manufacturing Cloud with a dealer portal. All numbers are assumptions to show the method.

**Volume.** 350 warranty claims a month, two adjudicators, an average claimed amount of €1,400.

**Data check.** 18 percent of the claimed serial numbers have no installation date, because dealers did not register the handover. Operating hours are typed in by the dealer.

**First step without AI.** A mandatory handover registration in the portal with installation date and hours, plus a one-off load of the installed base from SAP. Then the expression set takes over warranty period, hours limit and covered parts. Assume three months for both.

**Then the agent.** It ranks the queue, flags missing data and potential fraud and drafts the request for missing information. Comparing the fault description with fault code and parts would be a custom extension, tested separately. Claims above €2,500, every flag and every data gap go to the adjudicators. Assume that is 30 percent of the volume.

**Consumption.** Assume five actions per claim: 350 × 5 × 20 = 35,000 credits, about $175 a month for actions alone. A test set of 200 real, anonymized claims costs 200 × 5 × 16 = 16,000 credits, or $80 per sandbox run. Ten runs before go-live come to $800.

Prompts and Data 360 come on top, so measure them in the sandbox. The action share is small. The real cost is the three months of data work, plus the add-on for two adjudicators, $300 a month at list price.

## Who decides what: rule, agent or adjudicator?

| Decision | Where | Why |
|---|---|---|
| Is the machine under warranty on the fault date? | Expression set | Date comparison, must be reproducible |
| Is the part covered, are the hours below the limit? | Expression set | Clear rule from the warranty term |
| Do description, fault code and parts fit together? | Agent, as an extension | Free text needs language |
| Is the claim suspicious? | Agent flags, adjudicator decides | A flag is a hint, not proof |
| Amounts above the limit, goodwill | Adjudicator | Commercial responsibility |
| Credit note to the dealer | ERP | Finance books the payment |

The agent goes to production like any other change: with a test set of real claims, an agreed pass rate and monitoring afterwards, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). Drawing these lines between rules, agent and people is part of my [architecture work](../../services/salesforce-architecture/). If you have not decided on Manufacturing Cloud itself yet, start with [whether Manufacturing Cloud pays off](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Check your data before go-live

1. **Measure asset coverage**: share of last year's claims whose serial number exists as an asset with start date.
2. **Run rules-based adjudication first.** According to Salesforce Help it is available in Enterprise, Unlimited and Developer Editions, and it shows quickly whether your terms work as rules.
3. **Agree the approval threshold** with service and finance, in writing.
4. **Treat portal free text as untrusted** before any agent reads it.
5. **Ask Salesforce three questions**: which add-ons your org needs, which signals the fraud check uses, and how many credits prompts and Data 360 consume.
6. **Build a test set** from real claims, including rejected ones and known fraud cases.
