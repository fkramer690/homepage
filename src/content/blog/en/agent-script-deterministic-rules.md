---
title: "Agent Script: why business rules don't belong in the LLM"
description: "Credit limits, warranty eligibility and price approvals belong in Agent Script logic, not in the LLM. How hybrid reasoning works and what to check in a design."
pubDate: 2026-10-27
lang: en
slug: agent-script-deterministic-rules
translationKey: agent-script-deterministic-rules
topic: ai
categories: [ai]
tags: [agent script, agentforce, ai agents, manufacturing, warranty, architecture]
takeaways:
  - "Credit limit checks, warranty eligibility and price approvals belong in Agent Script logic or in the Flow, Apex or ERP call behind it; the LLM only understands the request and explains the result."
  - "The new Agentforce, generally available since February 2026, uses hybrid reasoning: logic instructions execute as code without an LLM call, prompt instructions trigger one."
  - "An action with an available when condition disappears from the LLM's tool list while the condition is false, so the model cannot place an order for a dealer who is over the credit limit."
  - "Gate variables must be set by code, never by the LLM; otherwise the gate brings back exactly the variability it was meant to remove."
  - "before_reasoning runs on every parse, so an ERP lookup placed there without a guard runs several times per user turn."
faq:
  - q: "What is hybrid reasoning in Agentforce?"
    a: "Hybrid reasoning means an agent combines deterministic logic with LLM reasoning. In Agent Script, logic instructions run as code without an LLM call, while prompt instructions are interpreted by the model. The Atlas Reasoning Engine decides at each step which path applies."
  - q: "What does available when do in Agent Script?"
    a: "It is a condition on an action. When it evaluates to false, the platform removes the action from the LLM's tool list, so the model cannot select or call it. Salesforce Architects calls this a hard platform-level gate."
  - q: "Can I still use agents built in the legacy Agentforce builder?"
    a: "Yes. According to Salesforce, development on the legacy builder is frozen, new agents can only be created in the new builder since July 2026, and no end date has been published. Moving an agent means rebuilding it; activating the rebuilt agent deactivates the original."
  - q: "Should the agent calculate the credit limit itself?"
    a: "No. The credit limit and the exposure are maintained in the ERP. The agent should read the result through an API action and use it as a gate. Recalculating the rule in Salesforce creates a second version of it that drifts apart from the ERP."
draft: false
---

Credit limit checks, warranty eligibility and price approvals belong in Agent Script logic, not in the judgement of the language model. Since February 2026 the new Agentforce with hybrid reasoning is generally available: logic instructions execute as code, and the LLM is only called where you write prompt instructions. Use that split deliberately. A rule the model interprets can take a different path on the same input, and "the agent decided" does not hold up in an audit or a dispute with a dealer. Let the rule decide, and let the LLM understand the request and explain the result.

## What is hybrid reasoning in Agent Script?

Hybrid reasoning means one agent combines deterministic logic with LLM reasoning. Salesforce Architects describes the earlier Agentforce model plainly: the LLM made every decision at runtime, "with no guaranteed path through the workflow", so identical inputs could take different routes. The [architecture guide on hybrid reasoning](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) sets one rule against that: "if you can express a decision as code, it should be written as logic."

Agent Script is the declarative language that implements this. It has two kinds of instructions. Logic instructions, such as conditions and action calls, run as code with no LLM involved. Prompt instructions are natural language for the model, and each one triggers an LLM call. A compiler turns the script into an Agent Graph, and the Atlas Reasoning Engine executes it as a state machine. According to the same guide, the new Agentforce has been generally available since February 2026.

For existing agents this is not optional for long. Salesforce wrote in [July 2026](https://www.salesforce.com/blog/upgrade-to-agent-script/) that development on the legacy builder is frozen and that new agents can only be created in the new builder. There is no end date yet, but every new agent you commission is an Agent Script agent.

## Why do credit limits, warranty and price approvals not belong in the LLM?

Because these are decisions with a right answer. A dealer is over the credit limit or not. A machine is under warranty or not. A discount needs approval or not. I see four reasons to keep them out of the model.

**Audit and disputes.** A dealer whose warranty claim was rejected will ask why. The guide calls non-deterministic execution an audit gap, and I agree. A rule in code gives the same answer on Tuesday as on Monday and can be traced. Agent versions are also stored as metadata: the [AiAuthoringBundle](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle) keeps versioned folders, so you can show which rule version was active.

**The rule already lives somewhere.** In manufacturing, the credit limit and the exposure sit in SAP or proALPHA. Warranty terms sit in Manufacturing Cloud or in the ERP. Price conditions sit in the ERP or in CPQ, a choice covered in [customer prices: SAP conditions or Salesforce Pricing?](../customer-prices-sap-conditions-or-salesforce-pricing/). An agent should read the result of that system, not rebuild the rule in a prompt. Two places with the same rule drift apart, and the prompt version is the one nobody tests.

**Cost and latency.** The guide states that "every unnecessary LLM call adds latency, cost, and variability" and that a simple conversation used to need at least three LLM cycles. Each calculation you move into logic is one less place where the model can go wrong.

**Untrusted input.** Dealer portals, warranty forms and emails are written by people outside your company. If a rule depends on the model's reading of free text, that text can push the model. I cover this in [prompt injection through dealer portals](../prompt-injection-dealer-portals-agentforce/).

## Which Agent Script building blocks enforce a rule?

Four building blocks matter for a decision maker. Your partner should be able to show you where each rule sits.

- **Conditionals in the reasoning block.** According to the [Agent Script docs](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-conditionals.html), `if` and `else` are evaluated before the prompt reaches the LLM, and only the matching instruction is sent. The model never sees the branch that does not apply.
- **available when.** A condition on an action. When it is false, the action is [completely hidden from the LLM](https://developer.salesforce.com/sample-apps/agent-script-recipes/action-configuration/available-when-filtering) and cannot be called. That is the gate for "create order" or "approve claim".
- **before_reasoning and after_reasoning.** `before_reasoning` runs deterministically at the start of every parse, for authentication, entitlement checks and loading context. `after_reasoning` runs after the model, for checks and transitions. A parse happens on first entry, after every tool call and on every user turn.
- **Escalation.** `@utils.escalate` [hands the conversation to a human service rep](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html) through Omni-Channel.

A simplified sketch of a credit gate for spare part orders:

```
before_reasoning:
    if @variables.credit_checked == False:
        run @actions.get_credit_status
            with dealer_id=@variables.dealer_id
            set @variables.credit_ok=@outputs.credit_ok
        set @variables.credit_checked = True

reasoning:
    instructions: ->
        if @variables.credit_ok == False:
            | Explain that credit management must release the order first.
    actions:
        create_order: @actions.create_spare_parts_order
            available when @variables.credit_ok == True
```

Three details in the guide are worth asking your partner about. First, gate variables must be set by code; if the LLM sets them, "you've reintroduced the variability the gate was designed to prevent." Second, the guard in the sketch matters: without it the ERP lookup in `before_reasoning` runs on every parse, so several times per turn. Every run is an ERP call, and the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) bills actions at 20 credits without saying whether script-triggered calls count differently. Third, an action marked `is_displayable` ends the reasoning loop as soon as its output is shown, and `after_reasoning` is skipped. A check placed there then never runs.

## A typical scenario: a dealer agent for spare parts and warranty

Assume a machine builder with SAP, Sales Cloud, Service Cloud and a dealer portal. The numbers are assumptions to show the method. The agent handles 800 spare part orders and 150 warranty pre-checks a month, and it touches three rules.

**Credit limit.** SAP credit management decides. A MuleSoft API returns a flag per dealer, as described in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/). The agent reads it once per session and gates the order action. Assume 4 percent of dealers are blocked at any time: for them the model explains that credit management has to release the order and offers to forward the request. It never sees an order button.

**Warranty eligibility.** Assume the rule is 24 months from installation or 5,000 operating hours, whichever comes first. The model's job is to collect the serial number and the fault description from free text. A Flow or Apex action then reads the asset warranty and returns eligible, not eligible or data missing, plus a reason. The model words the answer. If the installation date is missing, the result is "data missing" and the case goes to a person, not to a guess. How Manufacturing Cloud models the warranty is in [warranty claims from dealers](../warranty-claims-dealers-salesforce/), and the Winter '27 agent for this check in [the warranty claims adjudication agent](../warranty-claims-adjudication-agent/).

**Price approval.** Assume dealers may get up to 8 percent extra discount on spare parts without approval. Above that, the agent does not negotiate. A Flow starts the approval for the sales manager, and the model tells the dealer that the request is with sales. The threshold sits in one place, maintained by sales, not in a sentence in the prompt.

What remains for the model is the part it is good at: understanding "the hydraulic pump on our machine from 2023 leaks again" and turning it into a serial number lookup and a fault category.

## What stays with the LLM?

More than it sounds. The model recognises intent, fills required inputs from free text, summarises a case for a technician, explains a rejection politely in the dealer's language and decides when a conversation needs a human. Gartner recommends using agents [when decisions are needed](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) and automation for routine workflows. I read that the same way: the judgement about what the dealer wants belongs to the model, the rule that follows belongs to code.

Agent Script is also not always the right place for the rule itself. If the rule has many variants, such as warranty terms per product family and part, it belongs in the data model or in the Business Rules Engine, which the [Manufacturing Cloud page](https://www.salesforce.com/manufacturing/cloud/) lists for claims, rebates and quoting. The script then calls it. If the ERP owns the rule, the script calls the ERP. Agent Script decides when a rule is checked and what happens with the result.

## How do you split rules and language in your next agent?

Before your partner starts building, I would go through these steps:

1. **List every decision** the agent touches and mark the ones with a right answer.
2. **Name the system that owns each rule**: ERP, Manufacturing Cloud, Business Rules Engine or Flow.
3. **Define the gates**: which action is available under which condition, and which code sets the variable.
4. **Define "data missing"** as its own result that goes to a person.
5. **Test the rules like code**, with cases on both sides of every threshold, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).

This is the part of an agent design I review on the client side as part of [Salesforce architecture](../../services/salesforce-architecture/), because it decides whether the agent can be audited later. Whether your process is ready for an agent at all is covered in [Agentforce for manufacturers: start now or wait](../agentforce-yes-or-no-manufacturers/).

Put the rules in logic and the language in the model, and your agent will give the same answer to the same dealer twice. If you want a second opinion on where the rules in your agent design sit, [send me a message](#contact).
