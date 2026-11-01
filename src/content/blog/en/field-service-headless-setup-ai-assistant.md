---
title: "Field Service setup by AI assistant: what to check"
description: "Salesforce lets an AI assistant set up Field Service headlessly. What it configures, what it cannot know and what to check before you approve the plan."
pubDate: 2026-10-28
lang: en
slug: field-service-headless-setup-ai-assistant
translationKey: field-service-headless-setup-ai
topic: field-service
categories: [field-service, ai]
tags: [field service, headless 360, AI assistant, setup, master data, DevOps]
takeaways:
  - "The assistant creates territories, operating hours, work types, skill requirements and scheduling policies, plus branding and forms for the app."
  - "It does not know which technician has which skill, when customers allow visits or which depot serves which region. That comes from HR, ERP and dispatch."
  - "Most of what it builds is configuration data. It works in a sandbox, and the result reaches production through Git and the pipeline."
  - "The service manager and the dispatch lead review territories, work types and policies section by section before anyone approves the plan."
faq:
  - q: "What is a headless setup of Salesforce Field Service?"
    a: "Configuring Field Service through a conversation with an AI assistant instead of the Setup menus. According to Trailhead, the assistant uses headless skills in three tiers, orchestration, configuration and feature, and builds the org only after you approve its implementation plan."
  - q: "Which AI assistants can set up Field Service?"
    a: "The Trailhead unit names Gemini, Claude and Slackbot. You need a supported assistant and access to the headless skills."
  - q: "Can I run the headless setup directly in production?"
    a: "I would not. The setup also loads sample service appointments, and most of what it creates are records that a metadata deployment does not carry. A sandbox plus the normal pipeline keeps production and repository in step."
  - q: "Does the AI assistant replace the Field Service partner?"
    a: "It replaces typing in Setup screens. Cutting territories, defining work types with realistic durations, connecting HR and ERP data and agreeing mobile data capture with the works council remain project work."
draft: false
---

In a headless Field Service setup, an AI assistant such as Gemini, Claude or Slackbot reads your company website, asks follow-up questions about territories, skills and scheduling priorities and proposes an implementation plan. Once you approve it, the assistant configures territories, operating hours, work types, skill requirements, scheduling policies and the technicians' mobile app. That gives you a first draft in hours. The assistant only knows what is public and what you tell it, so check every section with your service manager and dispatch lead before approving. And run it in a sandbox, then move the result through Git and the pipeline like any other change.

## What does "headless setup" of Field Service mean?

Salesforce sells Field Service today as Field Service and Operations. In April 2026 it [introduced Headless 360](https://www.salesforce.com/news/?p=93116): platform capabilities are exposed as an API, an MCP tool or a CLI command, so that people and AI agents can work with Salesforce without opening the browser interface. MCP, the Model Context Protocol, is the open standard through which an AI tool calls functions in another system. Where it sits in a Salesforce architecture is covered in the masterclass chapter on [MCP and Salesforce interfaces](../../masterclass/ai-salesforce/mcp-and-interfaces/).

The [Trailhead unit on setting up Field Service headlessly](https://trailhead.salesforce.com/content/learn/modules/headless-360-use-cases-in-action/set-up-field-service-headlessly) applies this to Field Service. It names three tiers of headless skills:

- **Orchestration** starts the process. These skills collect grounding data from your company website and turn it into setup recommendations.
- **Configuration** runs after you approve the plan and handles the core infrastructure.
- **Feature** carries out the build in two areas. Foundational setup creates service territories, operating hours, work types, skill requirements and scheduling policies. Mobile app configuration sets up custom branding, pre-work briefs and data capture flows such as voice to form.

In Slack the proposed territories, work types and policies appear as live list views next to the assistant's answers. According to Trailhead, nothing is final until you approve it, and the configuration you approved is what gets built. Technicians then find branding, pre-loaded sample service appointments, pre-work briefs, work plans and data capture forms in the app. How Salesforce brings its platform into Claude and Slack more broadly is described in [AIforce: Salesforce in Claude and Slack](../aiforce-salesforce-in-claude-and-slack/).

## The assistant knows your website, not your dispatching

It starts from your website URL. A machine builder's website shows product lines, locations and perhaps a service promise. It does not show the knowledge that makes scheduling work. In [the master data Field Service needs](../salesforce-field-service-master-data/) I list six kinds of data and their leading systems:

| Data | Leading system | Can the assistant know it? |
|---|---|---|
| Territories and operating hours | Salesforce | It proposes them from the locations on the website |
| Technicians and skills | HR or training system | No, it can only create the skill names |
| Work types with duration | Salesforce, durations from ERP history | It guesses from product pages |
| Assets at customer sites | ERP | No |
| Customer visiting hours | Salesforce | No |
| Absences | Time tracking | No |

So the assistant builds the frame well and the content poorly. Territories are the typical example. A proposal derived from the website follows sales offices. Salesforce's [guidelines for service territories](https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5) recommend up to 50 technicians per territory, and the right cut follows depots, travel times and where technicians live. Your service manager knows that, the website does not.

The same applies to scheduling policies. Salesforce ships four standard policies, as described in [how much scheduling should be automatic](../salesforce-field-service-scheduling-automation/). Which one fits and how the weights are set depends on what your dispatchers change today and why.

## What should you check before approving the plan?

I would review the plan in one workshop with the service manager and the dispatch lead, section by section:

| Plan section | What to check | Who checks |
|---|---|---|
| Territories | Number, cut along depots and travel, technicians per territory | Service manager |
| Operating hours | Regular hours per territory, Saturdays, on-call duty | Service manager, works council |
| Work types | Durations from last year's service orders, required skills | Service planning |
| Skills and requirements | Levels match your training scale, data source is HR | HR and service |
| Scheduling policies | Start from a standard policy, weights explained | Dispatch lead |
| Mobile app | Which values a form captures as fields, voice input, location | Service, data protection |

Two points deserve extra attention. First, data capture forms. Before forms are built at scale, decide which values become fields on the asset or work order, as I argue in [Field Service mobile: guided work and voice](../salesforce-field-service-mobile-guided-voice/). Voice to form processes what technicians say, which in Germany touches the works council. Second, sample data. The setup loads sample service appointments for technicians, which belong in a sandbox and nowhere else.

## An AI-built configuration still goes through Git

Because most of what the assistant creates are records. Territories, operating hours, work types, skill requirements and scheduling policies with their work rules are data in Salesforce. A metadata deployment does not carry them, as the DevOps masterclass chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/) shows. The data capture forms, on the other hand, are flows and therefore metadata.

That leads to a clear route:

```schritte
Set up in a sandbox
  Run the headless setup in a sandbox.
Retrieve metadata
  Retrieve flows and other metadata into a branch.
Export the data
  Export the configuration records with an external ID per record into a data workspace in the repository, for example for SFDMU.
Review and deploy
  Review both in a pull request and deploy through the pipeline: metadata first, then data.
```

Approval in a chat is no review. The person who asked the assistant also approves its plan, just as with the Setup agent. I described why that matters in [Setup with Agentforce: allow admin AI in production?](../setup-with-agentforce-admin-changes/) The assistant is a fast way to build a configuration and a poor way to deploy it.

## Worked example: 14 territories cut to 6

Assume a machine builder with 45 technicians in Germany, Austria and Switzerland. The website lists 14 sales and service locations. All numbers are assumptions.

**The proposal.** In a two-hour session the assistant proposes 14 territories, one per location, 22 work types derived from the product pages and a scheduling policy based on Customer First.

**The cut.** The service manager reduces the territories to 6, along the three depots and the travel times, with 6 to 10 technicians each. Four locations are pure sales offices without technicians. Work types shrink to 9, with durations taken from last year's service orders in the ERP. Skills come from the training matrix through an interface, nobody types them in.

**The deferral.** The mobile forms wait until the data model for inspection protocols is agreed and the works council has seen the voice input.

**The effort.** Two hours of chat, three workshop days to review, two days to bring flows and records into the repository and pipeline. The assistant saved the typing in Setup screens. The decisions took as long as before.

## First step: prepare what the website does not show

The website gives the assistant locations and products, but no skills, depots or response times. Where the headless setup fits next to agents and rollout waves is part of the [Field Service masterclass chapter on AI agents and rollout](../../masterclass/field-service/field-service-ai-agents-rollout/).

1. **Prepare what the website lacks**: depot list with technicians, training matrix, work type list with durations, response times from contracts.
2. **Choose a sandbox** without production data for the headless setup.
3. **Review the plan** with service manager and dispatch lead before you approve it.
4. **Bring the result into Git**: flows as metadata, configuration records as a data workspace.
5. **Decide who may connect an assistant to which org.** Production stays reserved for the pipeline, as in my [DevOps and release management](../../services/devops-release-management/) work.
