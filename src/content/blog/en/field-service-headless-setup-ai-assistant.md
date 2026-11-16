---
title: "Field Service setup by AI assistant: what to check"
description: "Salesforce shows an AI assistant setting up Field Service headlessly. What it configures, what it cannot know and what to check before you approve the plan."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-headless-setup-ai-assistant
translationKey: field-service-headless-setup-ai
topic: field-service
categories: [field-service, ai]
tags: [field service, headless 360, AI assistant, setup, master data, DevOps]
takeaways:
  - "The assistant creates territories, operating hours, work types, skill requirements and scheduling policies, plus branding and forms for the app."
  - "From the website it cannot reliably know technicians' skills, customer visiting hours or depots; that needs an authoritative source you provide."
  - "Much of what it builds is configuration data. My recommendation: run it in a sandbox, if supported, and move the result through Git."
  - "The service manager and the dispatch lead review territories, work types and policies section by section before anyone approves the plan."
faq:
  - q: "What is a headless setup of Salesforce Field Service?"
    a: "It means configuring Field Service through a conversation with an AI assistant instead of through the Setup menus. According to Trailhead, the assistant uses headless skills in three tiers: orchestration, configuration and feature, and builds the org only after you approve its implementation plan."
  - q: "Which AI assistants can set up Field Service?"
    a: "The Trailhead unit names Gemini, Claude and Slackbot as examples, without a complete support matrix. You need a supported assistant and access to the headless skills."
  - q: "Can I run the headless setup directly in production?"
    a: "I would not. The setup also loads sample service appointments, and most of the things it creates are records that a metadata deployment does not include. A sandbox plus the normal pipeline keeps production and repository in step."
  - q: "Does the AI assistant replace the Field Service partner?"
    a: "No. It automates recommendations, the implementation plan and parts of the configuration. Designing territories, defining work types with realistic durations, connecting HR and ERP data, testing mobile data capture and agreeing on it with the works council remain project work."
draft: false
---

In a headless Field Service setup, an AI assistant such as Gemini, Claude or Slackbot reads your company website, asks follow-up questions about territories, skills and scheduling priorities and proposes an implementation plan. Once you approve it, the assistant configures territories, operating hours, work types, skill requirements, scheduling policies and the technicians' mobile app. The assistant starts from what is public and what you tell it, so check every section with your service manager and dispatch lead before approving. Trailhead does not specify availability, licensing or sandbox support; where possible, I would run it in a sandbox and move the result through Git and the pipeline.

## What does "headless setup" of Field Service mean?

Salesforce now calls the product Agentforce Field Service and Operations, but its documentation still uses Field Service as shorthand. In April 2026 the company [introduced Headless 360](https://www.salesforce.com/news/?p=93116): platform capabilities are exposed as an API, an MCP tool or a CLI command, so that people and AI agents can work with Salesforce without opening the browser interface. MCP, the Model Context Protocol, is the open standard through which an AI tool calls functions in another system. Where it sits in a Salesforce architecture is covered in the masterclass chapter on [MCP and Salesforce interfaces](/en/masterclass/ai-salesforce/mcp-and-interfaces/).

The [Trailhead unit on setting up Field Service headlessly](https://trailhead.salesforce.com/content/learn/modules/headless-360-use-cases-in-action/set-up-field-service-headlessly) applies this to Field Service. It names three tiers of headless skills:

- **Orchestration** starts the process. These skills collect grounding data from your company website and turn it into setup recommendations.
- **Configuration** runs after you approve the plan and handles the core infrastructure.
- **Feature** carries out the build in two areas. Foundational setup creates service territories, operating hours, work types, skill requirements and scheduling policies. Mobile app configuration sets up custom branding, pre-work briefs and data capture flows such as voice to form.

The unit does not name editions, licenses, permissions or enablement steps, and the regular Field Service setup documentation does not list the headless setup yet (as of 9 November 2026). Treat it as a capability Salesforce demonstrates and confirm availability for your org. In Slack the proposed territories, work types and policies appear as live list views next to the assistant's answers. According to Trailhead, nothing is final until you approve it, and the configuration you approve is what is built. Technicians then find branding, pre-loaded sample service appointments, pre-work briefs, work plans and data capture forms in the app. How Salesforce brings its platform into Claude and Slack more broadly is described in [AIforce: Salesforce in Claude and Slack](/en/blog/aiforce-salesforce-in-claude-and-slack/).

## The assistant knows your website, not your dispatching

It starts from your website URL. A machine builder's website shows product lines, locations and perhaps a service promise. It does not show the knowledge that makes scheduling work. In [the master data Field Service needs](/en/blog/salesforce-field-service-master-data/) I list six kinds of data and their leading systems:

| Data | Leading system | Can the assistant know it? |
|---|---|---|
| Territories and operating hours | Salesforce | It proposes them from the locations on the website |
| Technicians and skills | HR or training system | Not from the website; it can create the skill names |
| Work types with duration | Salesforce, durations from ERP history | It guesses from product pages |
| Assets at customer sites | ERP | Not from the website; needs an authoritative source |
| Customer visiting hours | Salesforce | Not from the website |
| Absences | Time tracking | Not from the website |

So the assistant is good at building the structure, but weak on the details. Territories are the typical example. A proposal derived from the website will typically follow sales office locations. Salesforce's [guidelines for service territories](https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5) suggest up to 50 service resources per territory. In a machine builder's service organization I would also test the territory design against depots, home bases and real travel patterns. Your service manager knows those; the website does not.

The same applies to scheduling policies. Salesforce ships four standard policies, as described in [how much scheduling should be automatic](/en/blog/salesforce-field-service-scheduling-automation/). Which one fits and how the weights are set depend on what your dispatchers change today and why.

## What should you check before approving the plan?

I would review the plan in workshops with the service manager and the dispatch lead, section by section:

| Plan section | What to check | Who checks |
|---|---|---|
| Territories | Number, cut along depots and travel, technicians per territory | Service manager |
| Operating hours | Service windows per territory, Saturdays, on-call duty; technician shifts separately | Service manager, works council for working time rules |
| Work types | Durations from last year's service orders, required skills | Service planning |
| Skills and requirements | Levels match your training scale, data source is HR | HR and service |
| Scheduling policies | Start from a standard policy, weights explained | Dispatch lead |
| Mobile app | Which values a form captures as fields, voice input, location | Service, data protection |
| Access and governance | Identity and permissions of the assistant, target org, allowed skills, audit logs | Platform owner, security |

Two points deserve extra attention. First, data capture forms. Before forms are built at scale, decide which values become fields on the asset or work order, as I argue in [Field Service mobile: guided work and voice](/en/blog/salesforce-field-service-mobile-guided-voice/). In Germany, involve data protection and the works council early, especially if voice input or the resulting records could be used to monitor technicians. Second, sample data. The setup loads sample service appointments for technicians, which belong in a sandbox and nowhere else.

## An AI-built configuration still goes through Git

The reason is that much of what the assistant creates consists of records. Territories, operating hours, work types, skill requirements and scheduling policies with their work rules are data in Salesforce. A metadata deployment does not include them, as the DevOps masterclass chapter on [data and configuration](/en/masterclass/devops-release-management/data-and-configuration/) shows. The data capture forms, on the other hand, are flows and therefore metadata.

That leads to a clear route:

```schritte
Set up in a sandbox
  Run the headless setup in a sandbox, once Salesforce confirms it is supported there.
Retrieve metadata
  Retrieve flows and other metadata into a branch.
Export the data
  Inventory every created and changed component and record, then export the configuration records into a data workspace in the repository, for example for SFDMU.
Review and deploy
  Review both in a pull request and deploy through the pipeline in a sequence tested for dependencies.
```

Approval in a chat is not a review. The Trailhead example does not show a separate approver, so build an independent review and deployment gate into your own process, just as with the Setup agent. I described why that matters in [Setup with Agentforce: allow admin AI in production?](/en/blog/setup-with-agentforce-admin-changes/). The assistant is a fast way to build a configuration and a poor way to deploy it.

## Worked example: 14 territories cut to 6

Assume a machine builder with 45 technicians in Germany, Austria and Switzerland. The website lists 14 sales and service locations. All numbers are assumptions.

**The proposal.** In a two-hour session the assistant proposes 14 territories, one per location, 22 work types derived from the product pages and a scheduling policy based on Customer First.

**The cut.** The service manager reduces the territories to 6 based on the three depots and travel times, with 6 to 10 technicians in each territory. Four locations are pure sales offices without technicians. Work types shrink to 9, with durations taken from last year's service orders in the ERP. Skills come from the training matrix through an interface; nobody types them in.

**The deferral.** The mobile forms wait until the data model for inspection protocols is agreed and the works council has seen the voice input.

**The effort.** In this example, the effort is two hours of chat, three workshop days for review and two days to bring flows and records into the repository and pipeline. In this scenario the assistant reduces the configuration effort, not the time for business decisions.

## First step: prepare what the website does not show

The website gives the assistant locations and products, but no skills, depots or response times. How the headless setup fits next to agents and rollout waves is covered in the [Field Service masterclass chapter on AI agents and rollout](/en/masterclass/field-service/field-service-ai-agents-rollout/).

1. **Prepare what the website lacks**: depot list with technicians, training matrix, work type list with durations, response times from contracts.
2. **Choose a sandbox** without production data for the headless setup, and confirm with Salesforce that it is supported there.
3. **Review the plan** with service manager and dispatch lead before you approve it.
4. **Bring the result into Git**: flows as metadata, configuration records as a data workspace.
5. **Decide who may connect an assistant to which org.** Production stays reserved for the pipeline, as in my [DevOps and release management](/en/services/devops-release-management/) work.
