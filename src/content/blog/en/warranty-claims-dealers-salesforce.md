---
title: "Warranty Claims from Dealers in Salesforce"
description: "How Manufacturing Cloud models warranty terms, warranty claims from dealers and supplier recovery, and why everything depends on the asset data behind it."
pubDate: 2026-10-27
lang: en
slug: warranty-claims-dealers-salesforce
translationKey: manufacturing-cloud-warranty-claims
topic: service
category: manufacturing-cloud
tags: [Manufacturing Cloud, Warranty, Dealers, After-Sales, Manufacturing]
series: { id: manufacturing-cloud, part: 6 }
takeaways:
  - "Manufacturing Cloud models warranties on three levels: warranty terms per product family or product, adjustments per part, and the warranty of the individual asset."
  - "Dealers submit warranty claims through a portal, with parts, labour and costs. An adjudicator adjusts the amounts and approves them."
  - "Whether a claim is covered depends on the asset data: serial number, purchase or installation date and usage. Without it, neither a person nor an agent can check properly."
  - "From a warranty claim, Salesforce creates one supplier recovery claim per causal part."
  - "Warranty is a commercial process. The on-site visit, maintenance contracts and response times belong to Field Service."
faq:
  - q: "How do dealers submit warranty claims in Salesforce?"
    a: "Through a partner portal on Experience Cloud. According to Trailhead, partners create the claim with the affected asset, fault and repair dates and the costs for parts, labour and transport, and set it to submitted. A claims administrator can enter claims that arrive by email or phone."
  - q: "What is a supplier recovery claim?"
    a: "A claim against the supplier when a warranty case goes back to a purchased part. From a warranty claim, Salesforce creates one draft per causal part, which is then submitted to the supplier."
  - q: "Can an agent check warranty claims?"
    a: "According to Salesforce, the Warranty Claims Adjudication Agent checks coverage and flags possible fraud from Winter '27. It depends on complete asset and warranty data."
draft: false
---

Manufacturing Cloud pays off for warranty processes when dealers and service partners submit warranty claims regularly and checking them takes a lot of manual work today. It models warranty terms, the warranty of each asset, dealer claims and supplier recovery in one data model. Whether a claim is covered is decided by the asset data: serial number, purchase or installation date and usage. Like parts 4 and 5, I am writing this part as an evaluation guide, not as a project report. I treat warranty as a commercial process; the on-site visit is covered by the Field Service series.

## How does Manufacturing Cloud model a warranty?

On three levels. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/administer-warranty-terms):

- **Warranty term.** It holds the type, duration and start of the warranty, the coverage for labour, parts and expenses as percentages, the covered usage and exclusions. A term can cover a whole product family, a product or individual assets.
- **Warranty term coverage, the adjustment per part.** It extends or restricts a term for a specific part. Trailhead's example is a forklift whose engine is additionally covered and whose mast is excluded.
- **Asset warranty, the warranty of the individual asset.** It is assigned at purchase or installation. For a single asset, coverage can be extended or restricted, for example as goodwill.

For manufacturers with many variants, the middle level is the real benefit. Instead of maintaining a separate term for every combination, there is one base term per family and exceptions per part. If you look up warranty terms in spreadsheets or contracts today, rebuild this structure on paper first. It quickly shows whether your own rules fit into three levels.

## How does a warranty claim run from dealer to credit note?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/capture-warranty-claims), the partner submits the claim through a partner portal on Experience Cloud. If it arrives by email, phone or web, a claims administrator creates it. The claim consists of several objects:

| Object | What it holds |
|---|---|
| Claim | Number, account, severity, type and reason of the claim |
| Claim Item | Affected asset, fault and repair dates, asset usage |
| Claim Coverage | Causal part and fault code, linked to the asset warranty |
| Claim Coverage Payment Detail | Cost per item, such as parts, labour or transport |
| Claim Participant | Stakeholders and their roles |

The partner enters the claimed amount per item and sets the claim to submitted. The adjudicator enters the approved amount. On the [product page](https://www.salesforce.com/manufacturing/cloud/service/), Salesforce also lists automated approvals through business rules. According to the [product page](https://www.salesforce.com/manufacturing/cloud/), Winter '27 adds the Warranty Claims Adjudication Agent, which checks coverage and flags possible fraud, and guided warranty parts returns for dealers.

I would book the credit note to the dealer in the ERP, as with rebates in [part 5](../rebate-management-dealer-rebates/). Salesforce checks and approves, an integration transfers the approved amount, and finance books it. That integration belongs in the plan from the start, or the dealer sees an approved claim in the portal and is still waiting for the money.

## Why does everything depend on the asset data?

Because every check is a question about the asset. Is this serial number still under warranty? When did it start, at purchase or at installation? Is usage below the limit? Is the defective part covered?

The asset warranty only answers these questions when the asset and its data are in Salesforce. For many manufacturers that is exactly the gap:

- **Sales through dealers.** The manufacturer ships to the dealer, the dealer sells to the end customer. Only the dealer knows whether and when the asset was installed. Without registration at sale, the warranty start date is missing.
- **Installed base in the ERP.** Serial numbers live in the ERP or in production, but not as assets in Salesforce. Then an integration is needed before the first claim can be checked.
- **Usage.** Operating hours or cycles come from the asset itself, from the dealer or not at all. If usage is part of the term, it needs a source.

For the Winter '27 agent this matters even more. An agent that checks coverage reads the same fields as a person, just faster and without asking. If the data is missing, it judges on gaps. Why I look at data quality first with agents is described in [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

In the overview of portal licences I describe in [part 7](../manufacturing-cloud-customer-portal/), the customer licence Customer Community Plus for Manufacturing covers assets and warranties, while Salesforce lists warranty claims under the partner licence. So for dealers who submit claims, plan for partner licences.

## What is supplier recovery?

Recovering costs from the supplier. When a warranty case goes back to a purchased part, the manufacturer claims the costs back from the supplier. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mfg_warranties_suppliers_create_claims.htm&language=en_US&type=5), an action on the warranty claim creates one draft supplier recovery claim per causal part. It is reviewed and submitted to the supplier.

For that to work, the causal part has to be captured cleanly in the claim, with fault code and link to the supplier. That is the part of the process dealers care least about, because it gains them nothing. A required field in the portal and a check by the claims administrator are therefore worth more than a later analysis.

## Where does warranty end and Field Service begin?

At the customer's door. Manufacturing Cloud settles whether damage is covered, who gets which amount and who pays in the end. Who drives to the customer when, with which spare part, is a question for Field Service. The same goes for maintenance contracts and committed response times, which run through service contracts and entitlements in Salesforce. How that works is covered in [part 5 of the Field Service series](../salesforce-field-service-maintenance-contracts/).

Both topics meet at the asset. The same asset carries the warranty, the maintenance history and the work orders. If you introduce both, design the asset model once, not per project. Whether Field Service pays off is covered in the [Field Service series](../salesforce-field-service-worth-it/).

## When does warranty management in Salesforce pay off?

I would recommend it when several of these points apply:

- **Claims come from outside.** Dealers and service partners submit warranty claims regularly, today by email or form.
- **Terms are varied.** Several product families, parts with their own rules, goodwill for individual assets.
- **Recovery is worth it.** A relevant share of warranty costs goes back to purchased parts.
- **Asset data exists or is coming.** Serial numbers and start dates are in Salesforce or can arrive through an integration.

I would hold back with few warranty cases a year that a quality department handles well in the ERP, and when asset data is missing and nobody wants to collect it. Then the data model adds little. Whether Manufacturing Cloud pays off as a whole is covered in [part 1 of this series](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Where should you start?

Before the first warranty term is created, settle four points:

1. **Asset data.** Where do serial number, purchase or installation date and usage live, and how do they reach Salesforce?
2. **Terms.** Can your rules be expressed as base term, exceptions per part and adjustment per asset?
3. **Submission.** Which fields does the dealer fill in the portal, and which are required, including for recovery?
4. **Credit note.** How does the approved amount reach the ERP, and when does the dealer see that it has been paid?

Warranty management in Manufacturing Cloud is as good as the asset data it checks against. If you are evaluating warranty processes with dealers in Salesforce, [send me a message](#contact).
