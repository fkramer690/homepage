---
title: "Switching Salesforce partners without a standstill"
metaTitle: "Switch Salesforce Partner: Handover Checklist and Process"
description: "How to switch your Salesforce implementation partner without stopping the programme: process, handover checklist and what you must own before giving notice."
pubDate: 2026-11-10
lang: en
slug: switching-salesforce-implementation-partner
translationKey: switch-salesforce-partner
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Partner switch, Implementation partner, Handover, Partner governance, Repository, Org assessment]
takeaways:
  - "A partner switch rarely fails because of the new partner. It fails on what the client never owned: repository, pipeline, access and knowledge."
  - "Secure access, code and open work before you give termination notice. Afterwards you negotiate from the weaker position."
  - "An org assessment run by the client shows the new partner what it takes over and stops it from selling a rebuild first."
  - "Plan four to eight weeks of overlap in which you pay both partners. That costs less than a release nobody understands any more."
faq:
  - q: "How long does it take to switch Salesforce partners?"
    a: "With preparation, selection and handover, plan three to six months. The handover itself, with both partners overlapping, usually takes four to eight weeks, depending on the size of the org and how much work is open."
  - q: "Does the code in my Salesforce org belong to me or to the partner?"
    a: "The metadata sits technically in your org, but the Git repository, the pipeline and the DevOps tool licences often sit with the partner. Usage rights to code, partner components and packages are a matter of your contract. Before giving notice, clarify what you may keep using and pass on to the new partner."
  - q: "Can the old partner refuse the handover?"
    a: "Whether it may is a contractual and legal question to clarify with procurement and legal. In practice it gets difficult when scope, price and deadlines of the handover are not in the contract. That is why a handover clause belongs in every partner contract."
  - q: "Should the new partner run the org assessment?"
    a: "Better not alone. A new partner has an interest in finding a lot to rebuild. Have the assessment run from the client side and give the result to the new partner."
draft: false
---

You switch Salesforce partners without stopping the programme when you secure everything that sits under the old partner's control before you give termination notice: repository, pipeline, access, open work and the knowledge behind decisions. Then you have the org assessed from the client side, choose the new partner based on that assessment and plan four to eight weeks in which both partners work in parallel. I have seen several partner switches as an architect on the client side, and the handover almost never depended on the new partner.

## Why manufacturers switch their Salesforce partner

```praxis
The reasons for a partner switch were similar in my projects: the quality was never there, or it dropped because the partner's people left the project or the company. Or sales had sold something the team had never done before, and the project needed more time and more budget.
```

Manufacturers add a pattern of their own: the org has grown over years, and several partners have built on it. One introduced sales, a second customer service, a third the SAP interface. When one of them leaves, the handover does not stop at its own building blocks. It touches shared objects, triggers and flows the others depend on.

The reason is rarely a single mistake. Usually missed dates pile up, releases bring bugs into production, and the team has to look up who built something before it can answer a question. Once you are there, the question is no longer whether to switch, but how to do it without hurting day-to-day business.

## What you must own before giving notice

Before termination notice, the old partner is usually most willing to cooperate. Afterwards every open point runs through contract, budget and priorities. So check beforehand what sits with you and what does not.

```tabelle
title: Handover checklist for a partner switch
columns: Area | What you check | Where it often gets stuck
Repository | Is the Git repository in your account, with admin access for you? * | Repository in the partner's account
Pipeline | Do pipeline, DevOps tool and CI runners run under your licence and account? * | DevOps tool licensed to the partner
Access | Which users, integration users, connected apps, certificates and named credentials depend on the partner's people? | Interfaces run on personal accounts
Open work | Which branches, pull requests, stories and sandboxes are in progress? | Half-finished work only exists in sandboxes
Knowledge | Is there a decision log and documentation of data model and interfaces? | Decisions live in emails and heads
Contracts | Who holds AppExchange packages and third-party licences, which handover duty exists? | No handover service in the contract
note: The marked items cost the most time after the notice.
```

The repository matters most. The metadata sits in your org, but the history of who changed what and why only exists in the Git repository. If it lives in the partner's account, you lose exactly the knowledge the new partner needs to get up to speed. Whether you may keep using the partner's code and components is a matter of your contract; clarify that before you take over the repository. Why repository and DevOps tools belong with the client in the first place is covered in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

```hinweis achtung
Before giving notice, check whether interfaces to SAP or other systems run on a user, a certificate or a connected app tied to one of the partner's people. If the user is deactivated when the person leaves or the certificate expires, the interface stops. Move such connections to your own integration users first and rotate any credentials the partner knows.
```

How to clean up integration users and connected apps is covered in [cleaning up Salesforce integration users](../salesforce-integration-users-cleanup/).

## How does a Salesforce partner switch work?

A switch has four phases. The durations are guide values for an org with a few hundred users and several partners; a small org moves faster.

```schritte
Secure | 2 to 4 weeks · client
  Bring repository, pipeline, access and open work under your own control, before the notice.
Assess | 2 to 4 weeks · client
  Org assessment from the client side: what exists, what is probably used, what is risky.
Select | 4 to 8 weeks · client
  Have new partners bid on the basis of the assessment, with the same questions for all.
Hand over | 4 to 8 weeks · both partners
  Overlap with knowledge transfer, a small handover release and a clear cut-off date.
```

**Secure.** Put the repository into your own account or have it transferred there, with all branches and the history. Have it scanned for passwords, keys and customer data first, and rotate any credentials you find. Get the pipeline configuration and check whether a deployment works without the partner. Only when it does is the partner replaceable.

**Assess.** An org assessment shows what the org contains: how many Apex classes, flows and permission sets there are, where rules are broken and how high test coverage is. Whether something is used, the tools only indicate; the business confirms it. I run deterministic tools first and then give the results to a language model that describes the purpose and business process of each component, as a proposal someone checks. How that works and what it costs is in [AI org assessment before a partner switch](../ai-org-assessment-technical-debt/).

**Select.** Give all candidates the same assessment and the same questions. A partner that recommends a rebuild after a two-hour presentation without having read the assessment is selling you a project. What to look for in the selection is covered in [how to choose a Salesforce implementation partner](../how-to-choose-a-salesforce-implementation-partner/).

**Hand over.** The overlap starts after a stable release. Both partners work: the old one explains, the new one asks and builds the first stories under supervision. It ends with a small handover release the new partner takes through the pipeline alone, with acceptance testing and a rollback plan, and a cut-off date after which the old partner has no more access.

## The overlap costs money and saves more

For four to eight weeks you pay two partners. Many clients want to cut this time, and I understand why: the old partner has lost their trust, and every day with it feels like wasted money.

Without an overlap the new team learns your org from the code. It finds triggers whose purpose nobody knows and flows that fire each other. The first change then takes weeks, and the first release brings bugs into production that the old partner would have explained in five minutes.

So put the handover into the contract, ideally at the start of the project. A handover clause covers at least:

- Release of the repository with history, pipeline configuration and documentation
- A list of open branches, stories and sandboxes at the cut-off date
- Handover workshops with scope, duration and day rate
- Cut-off date, removal of access and rotation of credentials
- Usage rights to the partner's code and components

If none of this is in the contract, you negotiate it after the notice, and then the old partner has little reason to meet you halfway.

## Common traps in a partner switch

These mistakes make a partner switch expensive:

- **The new partner gets no assessment.** It then estimates from a presentation and finds the surprises during the project. The result is change requests in the first three months.
- **Switching in the middle of a release.** A half-finished release with work from two partners is something nobody understands later. Start the handover after a stable release.
- **Handing over code, not decisions.** The new partner sees what was built but not why. A [decision log](../salesforce-architecture-decision-log/) answers that question without anyone having to ask.
- **Not reassigning ownership.** When several partners work on the org, it must be clear for every object who is accountable for it after the switch. An [object ownership matrix](../salesforce-object-ownership-matrix/) does that.
- **Repeating the same mistakes.** If the old partner had to go because of poor quality, the new one needs rules that prevent it: pull requests, test coverage, a quality gate before every release. Otherwise you switch again in two years.

## Who runs the switch on the client side?

Someone on the client side should run the switch, someone who understands the org technically and owes nothing to either partner. Both partners have their own commercial interests: the old one wants its work to look good, the new one tends to find too much to rebuild rather than too little. That is understandable, which is why the client needs a technical assessment of its own.

If you have an internal Salesforce architect or technical product owner, that is the person. If you have nobody, bring in an independent architect for the time of the switch who runs assessment, selection and handover and then sets the standards for the new partner. That is how I work in [partner governance](../../services/partner-governance/): on the client side, without commissions from partners or tool vendors.

## First step: one deployment without the old partner

Before you talk about notice, test whether you can deploy without the old partner. Take a small change, such as a new field in a sandbox, and have your own people bring it through your repository and your pipeline into a test environment. If that works, the partner is replaceable. If it does not, you know exactly what you still have to take over before giving notice.
