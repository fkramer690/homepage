---
title: "Field Service Scheduling Console: move dispatchers now?"
description: "Should dispatchers move from the Classic Dispatch Console to the new Field Service Scheduling Console? Requirements, what carries over, gaps and a test plan."
pubDate: 2026-10-28
lang: en
slug: field-service-scheduling-console-dispatchers
translationKey: field-service-scheduling-console
topic: field-service
categories: [field-service]
tags: [Field Service, Scheduling Console, Dispatching, Enhanced Scheduling, Agentforce]
takeaways:
  - "The Field Service Scheduling Console puts the Gantt, the appointment list and the map on one screen and opens as a tab in the Field Service app."
  - "The Scheduling Console is available only with Enhanced Scheduling and Optimization. Orgs on the older engine have to switch the engine first."
  - "Candidate search shows readable recommendations instead of numeric grades, and Why? gives an AI-generated explanation for a suggested slot."
  - "According to Trailhead, customisations of the Classic Dispatch Console, the Gantt state and user settings carry over. A Salesforce team member wrote in May 2026 that both consoles are not yet fully at parity."
  - "My recommendation: two dispatchers test the Scheduling Console for one territory while the others stay on the Classic Dispatch Console, until the gaps that matter to you are closed."
faq:
  - q: "What is the Field Service Scheduling Console?"
    a: "It is the new dispatcher workspace in Salesforce Field Service. It shows the Gantt, the service appointment list and a map on one screen, built on Lightning Web Components, and suggests candidates with AI explanations."
  - q: "What do I need for the Scheduling Console?"
    a: "Enhanced Scheduling and Optimization. When Agentforce Field Service is enabled through Salesforce Go, the console is switched on automatically. Dispatchers still need access through the permission set that Salesforce Go creates."
  - q: "Do customisations of the old dispatcher console still work?"
    a: "According to Trailhead, customisations applied to the Classic Dispatch Console continue to work in the Scheduling Console, and the Gantt state and user settings carry over. I would still test custom actions and Visualforce pages in a sandbox."
  - q: "Is the Classic Dispatch Console being retired?"
    a: "As of October 2026 I have found no announced retirement date. With Summer '26 Salesforce renamed the old tab to Classic Dispatch Console, and both consoles can be used side by side."
draft: false
---

Dispatchers should move to the Field Service Scheduling Console step by step: first a small group in one territory, then the rest once the functions they use daily are there. The Scheduling Console puts the Gantt, the appointment list and the map on one screen, explains proposed slots with AI and keeps the customisations of the Classic Dispatch Console. It only runs with Enhanced Scheduling and Optimization, and according to Salesforce the two consoles are not fully at parity yet. As of October 2026 I see no retirement date for the old console, so there is no reason to switch everybody on one day.

## What is the Scheduling Console?

The Scheduling Console is the new dispatcher workspace in Salesforce Field Service. According to the Trailhead unit [Get to know the Scheduling Console](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-basics/get-to-know-the-scheduling-console), it opens as a tab in the Field Service app, where dispatchers also reach accounts and service resources. It is built on Lightning Web Components and uses server-side filtering and lazy loading, so it stays responsive with large data volumes.

The screen has three parts:

- **Gantt.** Service resources as rows, their appointments as blocks. Dispatchers filter resources by name, type or skill, move appointments, assign absences and widen the view to several days.
- **Service appointment list.** Open and scheduled appointments in a standard Salesforce list view with custom columns and filters. Appointments are dragged from the list onto the Gantt.
- **Map.** Resources and appointments in real time, with layers for planned routes, traffic and exact appointment locations, kept in sync with the Gantt and the list.

The old console now has a new name. According to a [Salesforce knowledge article](https://help.salesforce.com/s/articleView?id=005389875&language=en_US&type=1), the managed package tab was renamed to Classic Dispatch Console with version 262 (Summer '26), to separate it from the new Scheduling Console.

```hinweis achtung
If Visualforce pages, custom tabs or navigation rules point to the old label, they can break. The article describes a workaround with a custom Visualforce tab.
```

## What does the new console do better?

The biggest change for dispatchers is candidate search. According to the Trailhead unit [Dispatch smarter with the Scheduling Console](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console), the console shows readable recommendations instead of numeric grades. A **Why?** next to a candidate gives an AI-generated explanation of why that slot was suggested.

That matters more than it sounds. In the Classic Dispatch Console a dispatcher sees a grade and has to guess which service objective drove it. An experienced dispatcher who overrides proposals because they do not trust the grade is exactly the pattern I describe in [how much Field Service scheduling should be automatic](../salesforce-field-service-scheduling-automation/). An explanation in plain words makes it easier to see whether the engine is wrong or whether data is missing.

Trailhead names further changes:

- **Drag and drop** from the list to the Gantt, also across two monitors.
- **Global search** for appointments across territories, date ranges and list filters, with results in a temporary list of up to 50 records.
- **Hover details** on appointments, resources and absences, without opening the record.
- **Live updates** when the list is synced with the Gantt's territories, so no manual refresh.

For Winter '27, Salesforce lists [Scheduling Console Enhancements](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center): appointments that span several visits or days appear as one connected job and move with a single drag. For machine builders with commissioning or overhauls over several days, that is the most useful addition so far.

## What do you need for the Scheduling Console?

The first requirement is the engine. The Scheduling Console is available only with Enhanced Scheduling and Optimization. Orgs that went live on the older engine have to switch first, and that switch has its own homework: scheduling recipes disappear and empty fields are treated differently by several work rules. The details are in [Enhanced Scheduling and Optimization: switch now?](../field-service-enhanced-scheduling-optimization-switch/).

The second requirement is setup. According to Trailhead, the console is switched on automatically when Agentforce Field Service is enabled through Salesforce Go. Dispatchers still need access: in Salesforce Go an admin gives dispatchers Scheduling Console access and assigns the permission set that the system creates. That makes it easy to start with a small group, because only the users with the permission set see the new console.

## What carries over, and what is still missing?

Trailhead calls the move low risk: customisations applied to the Classic Dispatch Console continue to work in the Scheduling Console, and the Gantt state and user settings carry over. I would still test every custom action and every Visualforce page in a sandbox, because custom code is where surprises show up first.

Both consoles are not identical yet. In a [Trailblazer Community thread](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000pMqC00AK) from May 2026, a customer reported after the Summer '26 upgrade that colour palettes were missing and that the new console offered views from one day to one week, while the classic Gantt also had views such as Utilization and Long-Term. A Salesforce team member answered that both consoles are not 100 percent at parity yet and that these features are not forgotten, without a date.

For a manufacturer this is the important point. Dispatchers who plan annual maintenance weeks ahead or watch utilization across a whole territory work in exactly those long views. Dispatchers who mostly handle breakdowns for today and tomorrow barely miss them. Which group you have decides how fast the move can go.

## A typical scenario, as an assumption: two dispatchers test first

A typical scenario, as an assumption: a component maker with four dispatchers and three service territories already runs Enhanced Scheduling and Optimization. All numbers are assumptions to show the method.

```schritte
Inventory | 1 week · admin and dispatchers
  The admin lists every customisation of the Classic Dispatch Console: custom actions, Visualforce pages, filters, colour rules. Each dispatcher writes down which Gantt views they use every day.
Pilot | 6 weeks · two dispatchers
  Two dispatchers get the permission set and plan one territory in the Scheduling Console. The other two stay on the Classic Dispatch Console for the remaining territories.
Weekly check | weekly · pilot dispatchers
  The pilot dispatchers note what they could not do in the new console and had to do in the old one, and how often they used Why? to understand a proposal.
Decision
  If nothing on the list blocks daily work, the other two dispatchers follow. If long-range views are still missing, the planner for preventive maintenance keeps the Classic Dispatch Console for that task.
```

The note on Why? is worth collecting. If dispatchers use it often and then change the proposal anyway, the explanation points to missing data or a policy that does not fit, which is useful input long before any AI agent schedules on its own. Which agents work for dispatchers today is covered in [AI agents in Field Service: what works today?](../field-service-ai-agents-what-works-today/), and the wider picture in the AI masterclass chapter on [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).

## Where should you start?

Check the engine first. If it is still the older one, the console question waits until the switch to Enhanced Scheduling and Optimization. If it already is the enhanced engine, give two dispatchers the permission set and let them plan one territory for a few weeks. Engine, console and policy owner are the three decisions of the masterclass chapter on [scheduling and dispatch](../../masterclass/field-service/field-service-scheduling-dispatch/).

Move dispatchers to the Scheduling Console when the views they use every day are there, and not because a new screen is available. If you want an independent view on how your dispatch team should work with it, [send me a message](#contact).
