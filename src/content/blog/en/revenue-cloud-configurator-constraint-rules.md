---
title: "Revenue Cloud configurator: when constraint rules pay off"
description: "When the Revenue Cloud configurator with constraint rules and CML is enough for technical products, and when manufacturers should keep an external configurator."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-configurator-constraint-rules
translationKey: revenue-cloud-configurator-constraint-rules
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Revenue Cloud, product configurator, constraint rules, CML, SAP variant configuration]
takeaways:
  - "There are two rule engines: condition-action configuration rules and the Constraint Rules Engine; the transaction processing type selects one."
  - "Constraint rules pay off with interdependent attributes and large option sets. The engine filters invalid combinations in real time."
  - "Constraint models are written in CML. Maintaining them requires someone at the manufacturer who can model them."
  - "Salesforce targets less than 100 milliseconds and fewer than 1,000 backtracks per model run, so every model needs performance tests."
  - "The engine is not available in the EU Operating Zone and does not support product variants. Check both before moving rules from spreadsheets."
faq:
  - q: "What is CML in Salesforce Revenue Cloud?"
    a: "CML, the Constraint Modeling Language, is a domain-specific language for constraint models. It describes types, attributes, relationships and constraints of a product. Visual Builder generates CML, and the CML Editor lets you write it directly."
  - q: "What is the difference between configuration rules and constraint rules?"
    a: "Configuration rules on the Business Rules Engine are explicit condition-action rules for validation, inclusion, exclusion, defaults, visibility, quantities and attribute changes. Constraint rules describe valid relationships between options declaratively, and the engine evaluates all combinations, which scales better for interdependent attributes."
  - q: "Can I keep my existing configurator with Revenue Cloud?"
    a: "Yes. According to Trailhead, a third-party configurator connects to Salesforce through APIs. Salesforce can remain the system for catalog, pricing and quoting, but the split depends on the integration pattern you choose. You then maintain each rule in one place and integrate the result."
  - q: "Do I need a developer for the constraint rules engine?"
    a: "For simple rules Visual Builder is enough. Larger models with table constraints, proxy variables and performance tuning need someone who thinks like a developer, plus test cases and version control."
draft: false
---

The Revenue Cloud configurator with the constraint rules engine is enough for technical products when the rules can be written as relationships between attributes and components, and when someone at the manufacturer maintains them after go-live. It pays off most with interdependent attributes, where if-then rules break with every product change. An external configurator should stay when the rules live in SAP variant configuration or PLM and are checked there anyway, or when engineers configure from drawings. Check availability first: the Constraint Rules Engine needs Revenue Cloud Growth or Advanced and is not available in Government Cloud or in orgs in the EU Operating Zone.

## What can the Revenue Cloud configurator do?

The Product Configurator is the interface in which sales teams pick options for a bundle and set attribute values. It adds the configured product to the quote or order, and configurations can be saved and reused, according to the [Trailhead unit on the configurator](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/get-started-with-product-configurator). Trailhead describes three approaches that scale with product complexity: basic validation rules, selection rules and constraint-based modeling. (Salesforce Help now calls the product Revenue Management, Trailhead Agentforce Revenue Management, and the licenses are still Revenue Cloud Growth and Advanced; the [product names article](../revenue-cloud-product-names-rlm-rca/) sorts this out.)

Behind it are two rule engines, each switched on in Revenue Settings. The transaction processing type determines which one evaluates a transaction, with AdvancedConfigurator as the rule engine for constraint rules. Plan this as a choice and migration per product line, not as two stacked layers:

- **Configuration rules on the Business Rules Engine.** According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/use-product-configurator-with-business-rules-engine) and [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.product_configurator_configuration_rule_details.htm&language=en_US&type=5), these are condition-action rules: validate, include or require, exclude, auto-add and remove, hide or disable, set defaults, quantities and attribute values. They apply at transaction, bundle or product level and are built with clicks.
- **The Constraint Rules Engine.** Salesforce calls it the solution "for complicated, high-volume configurations". It uses constraint models and, per [Trailhead](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/explore-product-configurator-with-constraint-rules-engine), evaluates all possible combinations of product selections and filters out invalid ones in real time.

The [Constraint Builder](https://help.salesforce.com/s/articleView?id=ind.product_configurator_constraint_builder.htm&language=en_US&type=5) has limits a manufacturer must check early: "Constraint models don't support product variants", in the catalog sense of the term; datetime attributes and decimal quantities are not supported; each product can belong to only one active constraint model; and constraints may run for at most 10 seconds.

The configurator works on the catalog: classifications, attributes and bundles. If the catalog is modeled badly, no rule engine fixes it. I describe how I model it in [Revenue Cloud product catalog: modeling machine variants](../revenue-cloud-product-catalog-variants/).

## When do constraint rules pay off?

Trailhead compares the two approaches in a table, which I summarize:

| | Rule-based | Constraint-based |
|---|---|---|
| Logic | Explicit if-then rules | Declarative relationships between options |
| Scaling | Hard as complexity grows | Built for complex catalogs |
| Maintenance | Manual update with every product change | Invalid combinations are removed dynamically |
| Best for | Simple to moderate products with fixed logic | Interdependent attributes, large option sets |

For a machine builder, the line is fairly clear. A pump with five options and three exclusions works fine with configuration rules, and many dependencies can still be expressed with their actions. A machine where frame size, drive power, voltage, control and safety category depend on each other can quickly require dozens of if-then rules that contradict each other after the next product change. That is where the constraint engine pays off.

The Developer Guide shows a suitable example with a generator set: a table constraint lists the valid combinations of voltage and duty rating, and an invalid pair produces the message "Selected Voltage is not compatible with the required Duty Rating". Application engineers in manufacturing often keep exactly such compatibility tables in spreadsheets.

## What is CML, and who writes it?

Constraint models are written in CML, the Constraint Modeling Language. The [CML User Guide](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/CML_User_Guide.pdf) describes it as a domain-specific language with types (similar to classes), variables with value ranges, relationships with cardinality that represent the bundle structure, and constraints. The constraint types in the [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.264.0.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/cml_constraints.htm) include logical constraints, table constraints, require, exclude, message, preference, hide or disable, recommendation and action rules.

There are two editors. Visual Builder is a no-code interface for simple rules and generates CML in the background. The CML Editor is a script editor for complex logic. Visual Builder covers the standard patterns; the CML Editor supports more expressions, and some of them can then no longer be edited visually. One restriction from the CML guide: in Visual Builder, only the hide rule is available for attribute values.

My view: CML is code, even if part of it is assembled with clicks. A model for a machine family with a few hundred lines needs the same treatment as Apex: version control, review and tests. The person who maintains it needs to think in types, value ranges and cardinalities. In most manufacturing companies that is neither the classic admin nor the application engineer who knows the rules. Plan for both, working together.

A useful detail: table constraints can import their rows from a standard or custom Salesforce object, according to the Developer Guide. A compatibility table maintained in SAP or PLM can thus be loaded into a custom object through the integration instead of being typed into CML by hand. That keeps the rule master outside Salesforce and the evaluation in Salesforce; check the documented runtime and table limits before you load large tables.

## Test target: under 100 milliseconds per model run

The CML guide sets clear targets per model:

```kennzahlen
< 100 ms | execution time per model, ideally
< 1,000 | backtracks
0 | violations for a configuration that is expected to be valid
source: Salesforce CML User Guide, optimal runtime values
```

```vertiefung For developers
title: How do you reach and measure these targets?
The guide recommends small value ranges, the smallest required cardinality and as few decimal places as possible, because each of these multiplies the combinations the engine tries.

For analysis, debug logs at level FINE show a section RLM_CONFIGURATOR_STATS with execution time, violations and backtracking.
```

I add two kinds of tests for every product family:

1. **Regression cases.** A list of valid configurations that must work and invalid ones that must be rejected, with the expected message. The team runs them after every model change, ideally automated in the pipeline.
2. **Performance cases.** The largest realistic configuration and typical change sequences, measured against the 100-millisecond target and far from the 10-second limit.

Whoever changes a model without these cases discovers errors in front of the customer. How tests and reviews fit into the release process is covered in the DevOps chapter on [quality, tests and reviews](../../masterclass/devops-release-management/quality-tests-reviews/). Anyone coming from Salesforce CPQ has to rebuild product rules in this model; the differences are in [Salesforce CPQ vs Revenue Cloud](../salesforce-cpq-vs-revenue-cloud-differences/).

## When should you keep an external configurator?

According to Trailhead, a third-party configurator connects to Salesforce through APIs and supports custom interfaces and workflows. Salesforce can keep pricing, product data and quoting, depending on the integration pattern. The integration can be built either way, so the deciding question is where the rules should live.

I look first at where they are today, then at change frequency, owners and runtime needs:

- **In spreadsheets and in the heads of application engineers.** This is the best case for Revenue Cloud. The rules have to be written down anyway, and CML gives them a home with tests.
- **In SAP variant configuration.** If SAP checks the configuration again when the order arrives, rebuilding the rules in CML creates two rule sets. They drift apart with the first change that is maintained in only one place. Here I either keep SAP as the master and call SAP, or I move the master to Salesforce and let SAP accept the result. Both work. Two masters of the same rule do not. A runtime copy is fine if synchronization and versioning are explicit. The same argument applies to agents: business rules belong in one deterministic place, as in [Agent Script: why business rules don't belong in the LLM](../agent-script-deterministic-rules/).
- **In PLM or in an engineering configurator** that produces drawings or bills of materials. Then the external configurator stays, and Salesforce receives the configured product with its price-relevant attributes.

There is a side effect for AI quoting. An agent can only respect rules it can call. If the rules live outside Salesforce, I keep configured machines with the sales desk, as described in [AI Partner Sales Assistant: dealer quotes with AI](../ai-partner-sales-assistant-dealer-quotes/).

## Worked example: three product lines, one stays in SAP

A machine builder has three product lines. Application engineers maintain two of them in spreadsheets with around 150 compatibility rules. The third uses SAP variant configuration with dependencies that production checks for every order.

My recommendation in that case, assuming the org is not in the EU Operating Zone and the 150 rules can be normalized into attributes and tables of valid combinations: the two spreadsheet lines go into constraint models, with table constraints filled from a custom object, regression cases per line and a named owner in product management. The SAP line keeps its configurator for now. Salesforce receives the configured result through an interface, prices it and creates the quote. After a year the manufacturer can decide whether the third line follows, based on real maintenance effort instead of assumptions.

## Inventory the rules and pick a pilot family

1. **Inventory the rules**: how many, where they live, who changes them and how often.
2. **Pick one product family** as a pilot, ideally one whose rules sit in spreadsheets.
3. **Write the test cases first**, valid and invalid configurations with expected messages.
4. **Decide the master** per product line: Revenue Cloud, SAP or an external configurator, never two for the same rule.
5. **Name the owner** who maintains the model after go-live.

The full chapter is in the masterclass section [catalog, configurator, pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/), and I cover how manufacturers carry configured products into a sales agreement in [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/). Defining the rule master between SAP and Salesforce is part of my [Salesforce architecture](../../services/salesforce-architecture/) work.
