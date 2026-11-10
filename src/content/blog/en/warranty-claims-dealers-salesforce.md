---
title: "Warranty Claims from Dealers in Salesforce"
description: "How Manufacturing Cloud models warranty terms, warranty claims from dealers and supplier recovery, and why everything depends on the asset data behind it."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: warranty-claims-dealers-salesforce
translationKey: manufacturing-cloud-warranty-claims
topic: service
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Warranty, Dealers, After-Sales, Manufacturing]
series: { id: manufacturing-cloud, part: 6 }
takeaways:
  - "A warranty is built from four records: the term, coverage per part, the link to the product and the warranty for the individual asset."
  - "Dealers submit warranty claims through a portal, including parts, labor and other costs."
  - "An adjudicator approves the amounts. An agent can prepare the check, but without serial number, start date and usage it cannot complete it either."
  - "From a warranty claim, Salesforce creates one supplier recovery claim per causal part."
  - "Warranty decides coverage. The repair itself, maintenance contracts and response times belong to Field Service."
faq:
  - q: "How do dealers submit warranty claims in Salesforce?"
    a: "Through a partner portal on Experience Cloud. According to Trailhead, partners create the claim with the affected asset, fault and repair dates and the costs for parts, labor and transport, and set its status to submitted. A claims administrator can enter claims that arrive by email or phone."
  - q: "What is a supplier recovery claim?"
    a: "A claim against the supplier when a warranty case is traced back to a purchased part. From a warranty claim, Salesforce creates one draft supplier recovery claim per causal part, which is then submitted to the supplier."
  - q: "Can an agent check warranty claims?"
    a: "According to Salesforce Help, the Warranty Claims Adjudication Agent checks claims for completeness, flags missing information, drafts requests for more details, prioritizes open claims and points out possible fraud. It does not approve or reject claims; that stays with the adjudicator. It needs the Agentforce for Manufacturing add-on or an Agentforce 1 edition and complete asset and warranty data."
draft: false
---

For serialized products, whether a dealer's warranty claim can be checked properly in Salesforce depends on the asset data: serial number, purchase or installation date and, where the term depends on it, usage. Manufacturing Cloud models warranty terms, the warranty for each asset, dealer claims and supplier recovery in one data model. That pays off when dealers and service partners submit warranty claims regularly and checking them takes a lot of manual work today. Without the asset data, neither a person nor an agent can perform the check reliably.

Like parts 4 and 5, I am writing this part as an evaluation guide, not as a project report. I treat warranty as a commercial process; the on-site visit is covered by the Field Service series.

## A warranty is built from four records

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/administer-warranty-terms):

- **Warranty term.** It holds the type, duration and start date of the warranty, the coverage for labor, parts and expenses as percentages, the covered usage and exclusions.
- **Warranty term coverage, the adjustment per part.** It extends or restricts a term for a specific part. Trailhead's example is a forklift whose engine is additionally covered and whose mast is excluded.
- **Product warranty term, the link to the product.** It connects a term with a product or a whole product family, so the right term applies automatically.
- **Asset warranty, the warranty for the individual asset.** It is assigned at purchase or installation. For a single asset, coverage can be extended or restricted, for example as a goodwill gesture.

For manufacturers with many variants, the coverage per part is where I see the main benefit. Instead of maintaining a separate term for every combination, there is one base term per family and exceptions per part. If you look up warranty terms in spreadsheets or contracts today, map this structure on paper first. It quickly shows whether your own rules fit into this structure.

## How does a warranty claim flow from dealer to credit note?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/capture-warranty-claims), the partner submits the claim through a partner portal on Experience Cloud. If it arrives by email, phone or web, a claims administrator creates it. The claim consists of several objects:

| Object | What it holds |
|---|---|
| Claim | Number, account, severity, type and reason for the claim |
| Claim Item | Affected asset, fault and repair dates, asset usage |
| Claim Coverage | Causal part and fault code, linked to the asset warranty |
| Claim Coverage Payment Detail | Cost per item, such as parts, labor or transport |
| Claim Participant | Stakeholders and their roles |

The partner enters the claimed amount per item and sets the claim status to submitted. The adjudicator enters the approved amount. On the [product page](https://www.salesforce.com/manufacturing/cloud/service/), Salesforce also lists automated approvals through business rules. According to the [product page](https://www.salesforce.com/manufacturing/cloud/), Winter '27 adds the Warranty Claims Adjudication Agent and guided warranty parts returns for dealers. [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication.htm&language=en_US&type=5) describes the agent as supporting the adjudicator: it checks claims for completeness, flags missing information, drafts requests for more details, prioritizes open claims and points out possible fraud. It does not approve or reject claims. It needs the Agentforce for Manufacturing add-on or an Agentforce 1 edition, so it belongs in the quote as a separate line.

I would create the credit note for the dealer in the ERP, as with rebates in [part 5](../rebate-management-dealer-rebates/). Salesforce handles checking and approval, an integration transfers the approved amount, and finance posts it. That integration belongs in the plan from the start, or the dealer sees an approved claim in the portal and is still waiting for the money.

```ablauf
sf: Dealer portal, Warranty claim, Adjudication, Recovery claim
erp: Credit note
ext: Supplier
Dealer portal --submitted--> Warranty claim
Warranty claim --> Adjudication
Adjudication --approved amount--> Credit note
Warranty claim --per causal part--> Recovery claim
Recovery claim --submitted--> Supplier
```

## Every check is a question about the asset

Is this serial number still under warranty? When did the warranty start, at purchase or at installation? Is usage below the limit? Is the defective part covered?

The asset warranty can answer these questions only when the asset and its data are in Salesforce. For many manufacturers that is exactly the gap:

- **Sales through dealers.** The manufacturer ships to the dealer, the dealer sells to the end customer. Only the dealer knows whether and when the asset was installed. Unless the sale is registered, the warranty start date is missing.
- **Installed base in the ERP.** Serial numbers live in the ERP or in production, but not as assets in Salesforce. Then an integration is needed before the first claim can be checked. How to get the installed base into Salesforce is covered in [installed base in Manufacturing Cloud](../installed-base-asset-milestones/).
- **Usage.** Operating hours or cycles come from the asset itself, from the dealer or may not be available at all. If usage is part of the term, it needs a source.

For the Winter '27 agent this matters even more. An agent that helps prepare the check works with the same fields as a person. If the data is missing, its completeness check flags gaps instead of helping the adjudicator decide. Why I look at data quality first for agents is described in [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

In the portal license overview in [part 7](../manufacturing-cloud-customer-portal/), the customer license Customer Community Plus for Manufacturing covers assets and warranties, while Salesforce lists warranty claims under the partner license. So for dealers who submit claims, plan for partner licenses.

## What is supplier recovery?

Recovering costs from the supplier. When a warranty case is traced back to a purchased part, the manufacturer claims the costs from the supplier. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mfg_warranties_suppliers_create_claims.htm&language=en_US&type=5), an action on the warranty claim creates one draft supplier recovery claim per causal part. It is reviewed and submitted to the supplier.

For that to work, the causal part has to be captured cleanly in the claim, with a fault code and a link to the supplier. That is the part of the process dealers care least about, because it gives them no benefit. A required field in the portal and a check by the claims administrator are therefore worth more than analysis after the fact.

## Where does warranty end and Field Service begin?

Between carrying out the service and deciding commercial coverage. Manufacturing Cloud determines whether damage is covered, who receives which amount and who pays in the end. Field Service answers who goes to the customer, when, and with which spare part. The two overlap: a work order can trigger a warranty check, the on-site diagnosis provides the fault code and causal part, and parts and labor from the visit go into the claim. The same goes for maintenance contracts and committed response times, which run through service contracts and entitlements in Salesforce. How that works is covered in [part 5 of the Field Service series](../salesforce-field-service-maintenance-contracts/).

Both topics meet at the asset. The same asset carries the warranty, the maintenance history and the work orders. If you introduce both, design the asset model once, not per project. Where the line runs in detail is in [chapter 4 of the Manufacturing Cloud masterclass](../../masterclass/manufacturing-cloud/warranty-and-after-sales/). Whether Field Service pays off is covered in the [Field Service series](../salesforce-field-service-worth-it/).

## When does warranty management in Salesforce pay off?

I would recommend it when several of the points on the pro side apply:

```pro-contra
pro: Salesforce pays off when
- dealers and service partners submit claims regularly, today by email or form
- warranty terms vary: several product families, parts with their own rules, goodwill for individual assets
- a relevant share of warranty costs goes back to purchased parts
- serial numbers and start dates are in Salesforce or can be brought in through an integration
contra: I would hold back when
- there are few warranty cases a year that a quality department handles well in the ERP
- asset data is missing and nobody wants to collect it
```

In the second case the data model adds little. Whether Manufacturing Cloud pays off as a whole is covered in [part 1 of this series](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Find the asset data and bring it into Salesforce

Before the first warranty term is created, clarify these points:

1. **Asset data.** Where do the serial number, purchase or installation date and usage data live, and how do they reach Salesforce?
2. **Terms.** Can your rules be expressed as a base term, exceptions per part and adjustments per asset?
3. **Submission.** Which fields does the dealer fill in the portal, and which are required, including fields needed for recovery?
4. **Credit note.** How does the approved amount reach the ERP, and when does the dealer see that it has been paid?

For point 1, I take one quarter's warranty claims and check how many have a serial number, a start date and usage data. That ratio determines whether the project starts with the terms or with the asset data.
