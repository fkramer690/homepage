---
title: "Salesforce Field Service: AI agents, rollout, KPIs"
description: "Which Salesforce Field Service AI agents work today and what they cost, how to roll out in waves, what an AI setup may do and which KPIs count after go-live."
lang: en
slug: field-service-ai-agents-rollout
course: field-service
translationKey: fsl-05
chapter: 5
pubDate: 2026-10-28
short: "AI agents, rollout, operations"
summary: "Which Field Service agents work today, how to roll out in waves, what an AI assistant may set up and which KPIs count afterwards."
takeaways:
  - "For a machine builder, proactive maintenance booking and the drafted job report are the first Field Service agents worth running, because both are frequent and follow known rules."
  - "Customer-facing agents cost 20 Flex Credits per action, voice actions 30; employee functions cost $125 per user and month as an add-on or come with Agentforce 1 Field Service at $650."
  - "Troubleshooting and spare parts agents depend on data the machine builder owns: manuals tagged with the asset's product key and an as-built parts list per serial number."
  - "An AI assistant can configure Field Service headlessly after you approve its plan; run it in a sandbox and move the result through Git and the pipeline like any other change."
  - "Roll out in waves by region or country, bring the works council in before the first wave and measure six KPIs against a baseline from the old system."
articles: [field-service-ai-agents-today, breakdown-hotline-voice-agent, field-service-ai-troubleshooting-manuals, spare-parts-serial-number-ai, field-service-headless-setup-ai, field-service-rollout, field-service-kpis-after-go-live]
faq:
  - q: "Which AI agent should a machine builder start with in Field Service?"
    a: "Proactive maintenance booking from maintenance plans. It runs often, the rules are known and a booking costs cents in Flex Credits. The drafted job report follows once parts, working time and fault codes are structured fields on the work order."
  - q: "Can a voice agent book a technician for a machine-down call?"
    a: "Salesforce lists autonomous scheduling with Agentforce Voice in the Winter '27 highlights. I would let it book only when the machine still runs, the entitlement covers the visit and the fault class is known. Machine-down calls with a committed response time go to a dispatcher with a filled case."
  - q: "Can an AI assistant set up Field Service directly in production?"
    a: "I would not do that. Most of what it creates are configuration records that a metadata deployment does not carry, and the setup loads sample service appointments. Run it in a sandbox, review the plan with service and dispatch, then deploy through the pipeline."
  - q: "Which KPIs show whether Field Service works after go-live?"
    a: "Jobs per technician and day, travel share, first-time fix rate, response times met, arrivals within the promised window and the share of engine proposals dispatchers change. Measure them for three months in the old system first, with the same definitions."
  - q: "Does the works council have to be involved in a Field Service rollout?"
    a: "In Germany usually yes. Section 87 of the Works Constitution Act gives it co-determination on technical systems that can monitor behaviour or performance, and location tracking, timesheets and voice input touch that. Bring it in before the first wave, not after the app is on the devices."
draft: false
---

AI agents in Salesforce Field Service work today for a handful of jobs: booking appointments, scheduling maintenance from maintenance plans, briefing technicians and drafting the job report. For a machine builder I would start with maintenance booking and the job report, because both are frequent and follow known rules. Breakdown calls, troubleshooting and spare parts need triage rules, tagged manuals and as-built data first. An AI assistant can build a first configuration, which still goes through Git. The rollout runs in waves by region or country, with the works council involved before the first wave. Success shows in six KPIs measured against a baseline from the old system.

## Which Field Service agents work today, and what do they cost?

Salesforce sells Field Service today as [Field Service and Operations](https://www.salesforce.com/service/field-service-management/pricing/). Its agents serve three groups. Customers book, reschedule and cancel appointments through an agent and get proactive maintenance offers based on maintenance plan dates. Dispatchers get an assistant that fills gaps after cancellations. Technicians get a Pre-Work Brief before the job, a drafted Post-Work Summary afterwards and step-by-step troubleshooting on site. Salesforce announced these functions in [April 2025](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/). Status per function is in [AI agents in Field Service: what works today?](../../../blog/field-service-ai-agents-what-works-today/).

The price follows the line between customers and employees:

| Agent use | Price model | List price, October 2026 |
|---|---|---|
| Customer-facing, for example the Scheduling Agent | Flex Credits per action | 20 credits per action, 30 per voice action |
| Employee functions for dispatchers and technicians | Agentforce for Field Service and Operations add-on | $125 per user and month |
| Everything for employees plus credits | Agentforce 1 Field Service | $650 per user and month, 1 million Flex Credits and 2.5 million Data Cloud credits per org and year |

The credit rates come from the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) of 31 August 2026. At the [list price of $500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) an action costs $0.10. A booking agent therefore costs cents per booking, while the employee add-on for 60 technicians comes to $90,000 a year. When the bundle beats single add-ons is covered in [chapter 1](../field-service-business-case-licences/), and how to estimate credits per process in the AI masterclass chapter [AI costs: tokens, Flex Credits, budget](../../ai-salesforce/costs-and-tokens/).

My order for a machine builder: maintenance booking first, because maintenance plans already create the work orders and the agent only agrees a date. Its weak spot is the shutdown window at the customer, so without a maintained window it proposes dates and hands over to a dispatcher. The drafted job report comes second, and only once parts, working time and fault codes stay structured fields. Warranty, invoicing and the ERP cannot read prose. Where Field Service sits among other agent use cases in a manufacturing company is the subject of [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/).

## How should a voice agent handle the breakdown hotline?

Two announcements matter for a German-language hotline:

| Feature | What it does | Status, October 2026 |
|---|---|---|
| Agentforce Voice in German | German is one of six new languages | GA according to the [Dreamforce 2026 announcements](https://www.salesforce.com/blog/dreamforce-2026-announcements/) |
| Autonomous scheduling with Agentforce Voice | Voice agents check availability and find a technician in the right territory while the customer is on the call | No status label in the [Winter '27 highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center), check availability in your org |

A breakdown call is harder than a booking call: four facts decide the next step, which machine, whether it is down, what the contract promises and whether anyone is at risk. I would let the voice agent own intake and triage first. It identifies caller and machine through phone number, contact and installed assets, asks a closed question about the machine state and checks the entitlement. It books a technician itself only when the machine still runs, the entitlement covers the visit and the fault class is known. A stopped press with a four-hour commitment goes to a dispatcher, who can pull a technician off another job.

```hinweis tipp
These gates belong in deterministic logic, not in the prompt. I would start outside business hours with triage only and switch on booking for the clear cases after four weeks of comparison with the on-call engineer.
```

The rule table, the Agent Script patterns and what a call costs in voice actions or voice minutes are in [Breakdown hotline with Agentforce Voice: triage first](../../../blog/breakdown-hotline-agentforce-voice/).

## Why do troubleshooting and spare parts agents need your data first?

Both agents depend on documents and parts lists that only the machine builder can fix.

### Manuals with the asset's keys

According to the April 2025 announcement, the troubleshooting agent reads product manuals, similar repairs and sensor data and guides the technician step by step. It finds text that matches the question. It cannot tell variant A from variant B unless the document carries that as data. So every manual, service bulletin and knowledge article needs the product key the asset already carries, plus a serial number range where a bulletin covers some units only. The index holds one valid version per variant and build state. The attributes and when a Data Library is enough are in [Field Service AI troubleshooting: fix the manuals first](../../../blog/field-service-ai-troubleshooting-manuals/).

### Spare parts by serial number

An agent can name the right spare part for a serial number only when one of your systems already answers that by rule. The data comes from three places: the as-built parts list from PLM, material, availability and price from the ERP, and the installed base with its service history from Salesforce assets.

```ablauf
sf: Salesforce assets, Spare parts agent
erp: Material and price
ext: PLM parts list
PLM parts list --as-built--> Spare parts agent
Material and price --availability--> Spare parts agent
Salesforce assets --service history--> Spare parts agent
```

The agent understands the question, narrows it to an assembly and presents the result. It never picks a part number on its own. Whether to copy parts lists into Salesforce or call PLM live, and what dealers may see, is in [Spare parts by serial number: can an AI agent do it?](../../../blog/spare-parts-by-serial-number-ai/). The asset hierarchy behind it is covered in [chapter 4](../field-service-assets-maintenance-parts/).

## What may an AI assistant set up?

Salesforce now offers a headless setup of Field Service. According to the [Trailhead unit](https://trailhead.salesforce.com/content/learn/modules/headless-360-use-cases-in-action/set-up-field-service-headlessly), an AI assistant such as Gemini, Claude or Slackbot reads your company website, asks follow-up questions and proposes an implementation plan. Headless skills in three tiers, orchestration, configuration and feature, then build territories, operating hours, work types, skill requirements and scheduling policies, plus mobile branding, pre-work briefs and data capture forms. Nothing is final until you approve the plan.

The assistant builds the frame well and the content poorly. It knows your public website. It does not know which technician holds which skill, which customer allows visits when or which depot serves which region. A territory proposal derived from the website follows sales offices, while the right cut follows depots and travel times. How the assistant reaches Salesforce through MCP and APIs is explained in [MCP and Salesforce interfaces](../../ai-salesforce/mcp-and-interfaces/).

Two rules I would not bend:

| Rule | Why |
|---|---|
| Review the plan section by section with the service manager and the dispatch lead before anyone approves it. | The assistant knows your website, not skills, visiting hours and warehouses. |
| Run it in a sandbox. | Most of what the assistant creates are configuration records, which a metadata deployment does not carry, as the DevOps chapter on [data and configuration](../../devops-release-management/data-and-configuration/) shows, and the setup loads sample service appointments. Flows go into a branch, records into a data workspace, and both reach production through the pipeline. |

The review table per plan section is in [Field Service setup by AI assistant: what to check](../../../blog/field-service-headless-setup-ai-assistant/).

## Why roll out Field Service in waves?

I recommend rolling out Field Service in waves, region by region or country by country. Each wave brings its own master data, dispatchers, technicians and partners, and the first wave tests everything the later ones rely on. If skills or visiting hours are missing, it hits one territory and not the whole field service.

The works council belongs in the planning of the first wave. In Germany, [section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html) gives it co-determination on technical systems that can monitor behaviour or performance. Field Service touches that with timesheets, with location tracking in the mobile app and with voice input. According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_resource_tracking.htm&type=5), location tracking can be set by interval and accuracy, and single technicians can be excluded. Those settings are what you negotiate, per country if needed. The wave content and the settings table are in [Rolling out Salesforce Field Service: why in waves?](../../../blog/salesforce-field-service-rollout/). The release pipeline that carries each wave's configuration should be in place before wave one; the DevOps chapter [rollout roadmap and metrics](../../devops-release-management/rollout-roadmap/) shows how to get there.

Agents fit into the same waves. I would switch on an agent in a region that has been live for a few months, so its effect can be told apart from the effect of Field Service itself.

## Which KPIs count after go-live?

Field Service has to move the numbers from the business case. I track six per region and month: jobs per technician and day, travel share, first-time fix rate, response times met, arrivals within the promised window and the share of engine proposals dispatchers change before release. The last one is the most useful in the first months, because it shows whether data and scheduling policy fit.

Salesforce offers two ready-made views. According to the [Salesforce blog of September 2025](https://www.salesforce.com/blog/how-to-transform-field-service-operations-with-agentic-analytics/), Operations Home shows 12 KPIs, among them first-time fix rate, utilization, job duration and asset downtime, and Field Service Intelligence has five dashboards with more than 30 KPIs. The blog names Tableau Next, Data Cloud and Agentforce as the basis, and [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.ifs_intro.htm&language=en_US&type=5) describes Field Service Intelligence as including Data 360, CRM Analytics and Agentforce Service. For the first wave, standard reports on service appointments and work orders cover the business case numbers.

```hinweis offen
The pricing page shows Operations Home and Field Service Intelligence with "Available for Purchase" entries and includes Tableau Next only in Agentforce 1 Field Service, so ask your account team in writing which line items you need.
```

Before any dashboard, write down how each KPI is defined. First-time fix needs a time window, a scope such as same asset, a rule on fault codes and a list of planned follow-ups that do not count. Then measure a baseline for three months in the old system with the same definitions. The KPI table and the five definition decisions are in [Field Service KPIs after go-live: what to measure](../../../blog/field-service-kpis-after-go-live/).

## Who owns Field Service after go-live?

Scheduling policies, territories, work types and operating hours are records that someone adjusts every month. The mobile app gets its own versions next to the three platform releases, as described in [chapter 3](../field-service-mobile-app-documents/). And agents need their prompts, actions and test cases maintained. I would name owners before the first wave:

| Role | Owns |
|---|---|
| Head of service | KPI definitions and the monthly review per region, 30 minutes with six numbers and one decision. |
| Dispatch lead | Scheduling policies, territories and the reasons why proposals get changed, as in [chapter 2](../field-service-scheduling-dispatch/). |
| Release manager | Platform releases, app versions and configuration records through the pipeline. |
| Product owner for agents | Triage rules, booking gates and the test set of real calls and faults. |
| IT | Interfaces to ERP and PLM, monitoring and backup, as covered in the DevOps chapter on [operations, monitoring and backup](../../devops-release-management/operations-monitoring-backup/). |

## A typical scenario, as an assumption: three waves over nine months

A typical scenario, as an assumption: a component maker with 90 technicians in three regions, SAP as ERP, and Field Service planned in three waves over nine months. All numbers are assumptions to show the order of decisions.

```schritte
Before wave one
  Six KPI definitions agreed, three months of baseline from SAP service orders and timesheets, works council agreement on location tracking with coarse accuracy and a fixed interval.
Region one with 30 technicians | Months 1 to 3
  No agents. Dispatchers change 40 percent of proposals in month one, mostly because customer access times are missing. The team adds them before wave two.
Region two | Months 4 to 6
  Region one gets the maintenance booking agent. Assume 250 planned visits a month at five actions each: 25,000 credits, about $125 a month at list price. Shutdown windows exist for two thirds of the customers, the rest stay with the dispatcher.
Region three in another country | Months 7 to 9
  Separate check of local co-determination rules before dates are fixed. Region one gets a voice agent on the hotline at night, triage only.
```

Troubleshooting waits until manuals carry the asset's product key, the spare parts agent until PLM delivers as-built lists through an API. A monthly KPI review decides where the next agent goes.

## What should you decide before the first wave?

| Decision | What it covers |
|---|---|
| First agent | With a measurable target such as the share of maintenance visits booked without a dispatcher. |
| Add-on or Agentforce 1 Field Service | A licence question I handle in [make-or-buy and licence planning](../../../services/make-or-buy-licences/). |
| Wave order | With works council timing per country. |
| KPI definitions and baseline | Before go-live. |
| Owners | Plus the rule that AI-built configuration reaches production only through the pipeline, as in my [DevOps and release management](../../../services/devops-release-management/) work. |

This chapter closes the masterclass; assets and parts are in [chapter 4](../field-service-assets-maintenance-parts/), all chapters on the [overview page](../).

Field Service pays off when agents start where the data is clean, waves start with the works council and the numbers are defined before go-live.
