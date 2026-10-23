---
title: "Salesforce architecture and solution design"
description: "Target architecture, data model and cloud selection for Salesforce programmes with several clouds, portals and integrations, designed on the client side."
lang: en
slug: salesforce-architecture
translationKey: service-architecture
order: 1
lead: "Large Salesforce programmes rarely fail because of one wrong click. They fail because nobody decided early which clouds, which data model and which integrations the company really needs. I design the target architecture on the client side and document every decision, so it still holds when partners change."
situations:
  - "A new Salesforce programme is starting, and the company needs a target picture before it signs with an implementation partner."
  - "Several clouds, portals and integrations have grown over the years, and nobody has the overall picture anymore."
  - "Partners propose additional clouds or industry products, and the company cannot judge whether they pay off."
  - "The data model has grown project by project, and reports, automation and AI use cases suffer from it."
deliverables:
  - "Target architecture: clouds, portals, integrations and their responsibilities"
  - "Data model for the core objects and their relationships to ERP and other systems"
  - "Decision log with options, reasons and consequences for every architecture decision"
  - "Assessment of add-ons such as Field Service, Experience Cloud or Manufacturing Cloud against the ROI case"
  - "Solution design for complex requirements, ready for implementation partners"
  - "Architecture reviews of partner designs before they are built"
results:
  - "A target picture that business, IT and partners share"
  - "Clouds and add-ons chosen because they pay off, not because they were offered"
  - "Decisions that remain traceable when people or partners change"
  - "A data model that supports reporting, automation and AI use cases"
phases:
  - title: "Understanding the business"
    text: "I start with the processes, the users and the existing systems: how does the company sell, deliver and serve its customers today, and where does it want to go."
  - title: "Target picture"
    text: "Together with business and IT I design the target architecture and the data model. Options and trade-offs go into the decision log, so the reasons stay visible."
  - title: "Detailed solution design"
    text: "For the critical areas I write solution designs that implementation partners can build from, including integrations, security and data migration."
  - title: "Architecture during delivery"
    text: "During implementation I review partner designs, keep the decision log current and step in when the build drifts away from the target picture."
faq:
  - q: "What does a Salesforce architect on the client side do?"
    a: "They design the target architecture in the interest of the company, not of a vendor or partner: which clouds and products are needed, how the data model looks, how Salesforce connects to the other systems, and which decisions are documented for the long term. During delivery they review what partners build against that picture."
  - q: "Which Salesforce clouds does a manufacturer need?"
    a: "Sales Cloud and Service Cloud are part of almost every enterprise project. Field Service pays off most with many short jobs where route and appointment optimisation improves the numbers, less with a few long projects. Experience Cloud fits customer-facing processes and self-service. Manufacturing Cloud only makes sense with a clear fit that is calculated in the ROI case."
  - q: "What is a decision log and why does it matter?"
    a: "A decision log records every architecture decision with its options, the reasons for the choice and its consequences. Two years later, when someone asks why a process was built a certain way, the answer is there, even if the people who made the decision have moved on."
blogTags: [architecture, architektur, data 360, data governance, agentforce, field service]
---

Salesforce architecture on the client side means designing the overall picture in the interest of the company: which clouds and products it needs, how the data model looks, how Salesforce works with ERP and other systems, and how decisions are documented. I have done this for global manufacturers, including the first worldwide Manufacturing Cloud rollout with CPQ, a product configurator and a customer portal. My role is independent from vendors and partners, which matters most when a partner proposes the next product.

## Which clouds does the company really need?

Sales Cloud and Service Cloud are a given in almost every enterprise project. The interesting questions start with the add-ons:

- **Field Service** depends on the type of work, the locations and the duration of the jobs. The biggest benefit comes with many short jobs, where route and appointment optimisation clearly improves the numbers. With a few long projects, the benefit is much smaller. I wrote about the current mobile features in [Field Service mobile with guided flows and voice](../../blog/salesforce-field-service-mobile-guided-voice/).
- **Experience Cloud** fits customer-facing processes. Self-service portals save internal capacity, because customers find answers and submit requests themselves.
- **Manufacturing Cloud** only makes sense when its features match how the company actually sells. The fit has to be calculated in the ROI case, which I describe on the [make-or-buy and licences](../make-or-buy-licences/) page.

![Which clouds the company really needs: Sales Cloud and Service Cloud are a given in almost every enterprise project. The interesting questions start with the add-ons. Field Service fits with many short jobs, where route and appointment optimisation clearly improves the numbers, and brings a much smaller benefit with a few long projects. Experience Cloud fits customer-facing processes, and self-service portals save internal capacity. Manufacturing Cloud only fits when its features match how the company actually sells, which is calculated in the ROI case.](../../../assets/blog/which-clouds-en.png)

## Why does the data model decide so much?

Every report, every automation and every AI use case depends on the data model. If accounts, products and contracts are modelled differently in each project, the problems show up years later in reports nobody trusts and in agents that give wrong answers. That is why I treat the data model as part of the architecture, including its relationships to ERP. My view on AI is the same: business value and data quality come first, as described in [Agentforce: business value and data quality first](../../blog/agentforce-business-value-data-quality-first/).

## What do I deliver?

The scope ranges from the target picture to the decision log to the data model. Each architecture decision gets a short entry with the options, the reasons and the consequences. That sounds like paperwork, but it is what lets a company change partners or people without losing the reasoning behind its system. Integration architecture is part of it, because Salesforce is never the only system; more on that under [integration with ERP, middleware and telephony](../salesforce-integration/).

During implementation I stay on board as the architect. I review partner designs before they are built and keep the decision log current. When the build drifts away from the target picture, for example because a partner takes a shortcut that will be expensive later, I raise it early.

If you are planning a new Salesforce programme or want an independent view on an existing architecture, [send me a message](#contact) or read more [about me](../../#about).
