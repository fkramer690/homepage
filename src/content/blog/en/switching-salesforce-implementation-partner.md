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
  - "If Jira, Confluence, pipeline and Miro sit with the client and the current state and open stories are well kept, about 80 percent of the work is done."
  - "I recommend a hard cut on a fixed date. After that, the old partner only finishes its open tickets and answers questions, but gets no new work."
faq:
  - q: "How long does it take to switch Salesforce partners?"
    a: "It depends mostly on the project phase. After go-live a switch is much faster than in the middle of an implementation. It also matters how well the current state and the open stories are documented and whether Jira, Confluence, pipeline and Miro sit with the client. In the middle of implementing a large org it can take a few months, and selecting the new partner alone usually takes four to eight weeks."
  - q: "Does the code in my Salesforce org belong to me or to the partner?"
    a: "The metadata sits technically in your org, but the Git repository, the pipeline and the DevOps tool licences often sit with the partner. Usage rights to code, partner components and packages are a matter of your contract. Before giving notice, clarify what you may keep using and pass on to the new partner."
  - q: "Can the old partner refuse the handover?"
    a: "Whether it may is a contractual and legal question to clarify with procurement and legal. In practice it gets difficult when scope, price and deadlines of the handover are not in the contract. That is why a handover clause belongs in every partner contract."
  - q: "Hard cut or a gradual phase-out of the old partner?"
    a: "I recommend a hard cut: from a fixed date the new partner is accountable for the org. After that, the old partner only finishes its open tickets and is available for questions, but gets no new work. A gradual phase-out in which both partners take on new work blurs accountability."
  - q: "Should the new partner run the org assessment?"
    a: "Better not alone. A new partner has an interest in finding a lot to rebuild. Have the assessment run from the client side and give the result to the new partner."
draft: false
---

You switch Salesforce partners without stopping the programme when you secure everything that sits under the old partner's control before you give termination notice: repository, pipeline, access, open work and the knowledge behind decisions. Then you have the org assessed from the client side, choose the new partner based on that assessment and switch with a hard cut on a fixed date. As an architect on the client side I have accompanied four partner switches in enterprise projects. What decided how they went was mainly the project phase, the documentation and who owned the tools.

## Why manufacturers switch their Salesforce partner

```praxis
In the four partner switches I accompanied, the reasons were similar: the quality was never there, or it dropped because the partner's consultants left the project or the company. Or sales had sold something the team had never done before, and the project needed more time and more budget.
```

Manufacturers add a pattern of their own: the org has grown over years, and several partners have built on it. One introduced sales, a second customer service, a third the SAP interface. When one of them leaves, the handover also covers shared objects, triggers and flows the other partners depend on.

The reason is rarely a single mistake. Usually missed dates pile up, releases bring defects into production, and the team has to look up who built something before it can answer a question. Once you are there, the only question left is how to switch without disrupting day-to-day business.

## What you must own before giving notice

Before termination notice, the old partner is usually most willing to cooperate. Afterwards every open point runs through contract, budget and priorities. So check beforehand what sits with you and what does not.

```tabelle
title: Handover checklist for a partner switch
columns: Area | What you check | Where it often gets stuck
Repository | Is the Git repository in your account, with admin access for you? * | Repository in the partner's account
Pipeline | Do pipeline, DevOps tool and CI runners run under your licence and account? * | DevOps tool licensed to the partner
Access | Which users, integration users, connected apps, certificates and named credentials depend on the partner's people? | Interfaces run on personal accounts
Open work | Which branches, pull requests, stories and sandboxes are in progress? | Half-finished work only exists in sandboxes
Knowledge | Are Jira, Confluence, Miro and the decision log in your accounts, and are current state and open stories kept up to date? | Tickets and documentation in the partner's account
Contracts | Who holds AppExchange packages and third-party licences, which handover duty exists? | No handover service in the contract
note: The marked items cost the most time after the notice.
```

My experience from four switches: if Jira, Confluence, pipeline and Miro sit with the client and the current state and the open stories, especially for the next sprints, are well kept, about 80 percent of the effort is already done. The more of it sits with the partner, the longer the switch takes.

The repository matters most. The metadata sits in your org, but who changed what and when only exists in the Git repository. Why it was changed sits in tickets, pull requests and the decision log. If repository and tickets live in the partner's account, you lose exactly the knowledge the new partner needs to get up to speed. Whether you may keep using the partner's code and components is a matter of your contract; clarify that before you take over the repository. Why repository and DevOps tools belong with the client in the first place is covered in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

```hinweis achtung
Before giving notice, check whether interfaces to SAP or other systems run on a user, a certificate or a connected app tied to one of the partner's people. If the user is deactivated when the person leaves or the certificate expires, the interface fails. Move such connections to your own integration users first and rotate any credentials the partner knows.
```

How to clean up integration users and connected apps is covered in [cleaning up Salesforce integration users](../salesforce-integration-users-cleanup/).

## How does a Salesforce partner switch work?

A switch has four phases. How long they take depends mostly on the project phase: after go-live it is much faster than in the middle of an implementation. The durations below are guide values for a large org in the middle of an implementation.

```schritte
Secure | 2 to 4 weeks · client
  Bring repository, pipeline, access and open work under your own control, before the notice.
Assess | 2 to 4 weeks · client
  Org assessment from the client side: what exists, what is probably used, what is risky.
Select | 4 to 8 weeks · client
  Have new partners bid on the basis of the assessment, with the same questions for all.
Hand over | cut-off date · new partner
  Hard cut after a stable release. The old partner only finishes its open tickets and answers questions.
```

**Secure.** Put the repository into your own account or have it transferred there, with all branches and the history. Have it scanned for passwords, keys and customer data first, and rotate any credentials you find. Get the pipeline configuration and check whether a deployment works without the partner. Only when it does is the partner replaceable. In this phase, also find out how long granting permissions takes in your organisation: after the selection the new partner needs access, sometimes reaching into Active Directory.

**Assess.** An org assessment shows what the org contains: how many Apex classes, flows and permission sets there are, where rules are broken and how high test coverage is. Whether something is used, the tools only indicate; the business confirms it. I run deterministic tools first and then give the results to a language model that describes the purpose and business process of each component, as a proposal someone checks. With AI the assessment is faster today. How long it takes depends on the size of the org and on whether the partner ran one stream or several. How that works and what it costs is in [AI org assessment before a partner switch](../ai-org-assessment-technical-debt/).

**Select.** Give all candidates the same assessment and the same questions. A partner that recommends a rebuild after a two-hour presentation without having read the assessment is selling you a project. For time and material, a tender is done faster than for fixed outcomes. What to look for in the selection is covered in [how to choose a Salesforce implementation partner](../how-to-choose-a-salesforce-implementation-partner/).

**Hand over.** You can phase the old partner out gradually or switch with a hard cut on a fixed date. I favour the hard cut after a stable release: from the cut-off date the new partner is accountable for the org and takes on all new stories. The old partner only finishes its open tickets and is available for questions. Have it deliver these tickets as pull requests that the new partner reviews and deploys, so that from the cut-off date there is only one way into production. The new partner takes the first release through the pipeline alone, with acceptance testing and a rollback plan. Once the open tickets are done and the agreed period for questions is over, you remove the old partner's access.

## A hard cut with a short overlap

Many clients want to be rid of the old partner as fast as possible, and I understand why: it has lost their trust, and every day with it feels like wasted money. Still, none of the four switches I accompanied ran without any overlap. Each time the old partner finished its open tickets and answered questions, but got no new work.

This short overlap pays off. Without it the new partner has to infer a lot from code and metadata, especially when the documentation has gaps. It finds triggers whose purpose nobody knows and flows that fire each other. The first change then takes weeks instead of days, and the first release brings bugs into production that the old partner would have explained in five minutes.

So put the handover into the contract, ideally at the start of the project. A handover clause covers at least:

- Handover of the repository with history, pipeline configuration and documentation
- A list of open branches, stories and sandboxes at the cut-off date
- Completion of open tickets and answers to follow-up questions after the cut-off date, with scope, duration and day rate
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

Someone on the client side should run the switch, someone who understands the org technically and owes nothing to either partner. Both partners have their own commercial interests: the old one wants its work to look good, the new one tends to find too much to rebuild rather than too little. That is understandable. The client therefore needs a technical assessment of its own.

If you have an internal Salesforce architect or technical product owner, that is the person. If you have nobody, bring in an independent architect for the time of the switch who supports assessment, selection and handover and then sets the standards for the new partner. That is how I work in [partner governance](../../services/partner-governance/): on the client side, without commissions from partners or tool vendors.

## First step: one deployment without the old partner

Before you talk about notice, test whether you can deploy without the old partner. Take a small change, such as a new field in a sandbox, and have your own people bring it through your repository and your pipeline into a test environment. If that succeeds, the partner is replaceable. If it does not, you know exactly what you still have to take over before giving notice.
