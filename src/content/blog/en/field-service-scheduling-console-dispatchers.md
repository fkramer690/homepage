---
title: "Field Service Scheduling Console: move dispatchers now?"
description: "Should dispatchers move from the Classic Dispatch Console to the new Field Service Scheduling Console? Requirements, what carries over, gaps and a test plan."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-scheduling-console-dispatchers
translationKey: field-service-scheduling-console
topic: field-service
categories: [field-service]
tags: [Field Service, Scheduling Console, Dispatching, Enhanced Scheduling, Agentforce]
takeaways:
  - "The Field Service Scheduling Console puts the Gantt, the appointment list and the map on one screen and opens as a tab in the Field Service app."
  - "The Scheduling Console is available only with Enhanced Scheduling and Optimization. Orgs on the older engine have to switch the engine first."
  - "Candidate search shows readable recommendations instead of grades. Why? explains a suggestion with AI and needs the Einstein Field Service User permission set."
  - "Customizations and settings carry over according to Trailhead. Custom actions and list filters still need a test before you switch."
  - "I let two dispatchers test the new console in one territory. The others stay on the classic console until the gaps that matter to them are closed."
faq:
  - q: "What is the Field Service Scheduling Console?"
    a: "It is the new dispatcher workspace in Salesforce Field Service. It shows the Gantt, the service appointment list and a map on one screen, built on Lightning Web Components, and suggests candidates with AI explanations."
  - q: "What do I need for the Scheduling Console?"
    a: "Enhanced Scheduling and Optimization. Admins set up the console through Salesforce Go and give dispatchers access with the permission set that Salesforce Go creates. The AI explanation behind Why? is an Agentforce feature on top: it needs the Einstein Field Service User permission set and the license behind it."
  - q: "Do customizations of the old dispatcher console still work?"
    a: "According to Trailhead, customizations applied to the Classic Dispatch Console continue to work in the Scheduling Console, and the Gantt state and user settings carry over. I would still test every custom action, Visualforce page and appointment list in a sandbox, because tabs and navigation that point to the old label can break."
  - q: "Is the Classic Dispatch Console being retired?"
    a: "As of November 2026 I have found no announced retirement date. With Summer '26 Salesforce renamed the old tab to Classic Dispatch Console, and both consoles can be used side by side. The new console is clearly meant to replace the old one, so plan the move instead of waiting for a date."
  - q: "Why can I no longer find the classic dispatcher console?"
    a: "Since Summer '26 (managed package version 262) its tab is called Classic Dispatch Console. Search for that name in the App Launcher or add the tab to the navigation of the Field Service app again."
  - q: "Do my list views carry over to the Scheduling Console?"
    a: "The appointment list is a standard Salesforce list view on service appointments, so standard list views on service appointments appear in it. Custom lists from the Classic Dispatch Console are a different thing and do not show up just because of that. Filters from field sets also work differently: a Trailblazer Community answer says the new console does not support them yet, so rebuild and test your lists in a sandbox."
draft: false
---

Dispatchers should move to the Field Service Scheduling Console step by step: first a small group in one territory, then the rest once the functions they use daily are there. The Scheduling Console puts the Gantt, the appointment list and the map on one screen, explains proposed slots with AI and, according to Trailhead, keeps the customizations of the Classic Dispatch Console. It only runs with Enhanced Scheduling and Optimization, and according to Salesforce the two consoles are not fully at parity yet. As of November 2026 I see no retirement date for the old console. That leaves room for a controlled move, but no reason to postpone the preparation.

## What is the Scheduling Console?

The Scheduling Console is the new dispatcher workspace in Salesforce Field Service. According to the Trailhead unit [Get to know the Scheduling Console](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-basics/get-to-know-the-scheduling-console), it opens as a tab in the Field Service app, where dispatchers also reach accounts and service resources. It is built on Lightning Web Components and uses server-side filtering and lazy loading for large data volumes. The list and the global search still have limits, such as 50 results per search, which dispatchers should know.

The screen has three parts:

- **Gantt.** Service resources as rows, their appointments as blocks. Dispatchers filter resources by name, type or skill, move appointments, assign absences and widen the view to several days.
- **Service appointment list.** Open and scheduled appointments in a standard Salesforce list view with custom columns and filters. Appointments are dragged from the list onto the Gantt.
- **Map.** Resources and appointments for the selected day, with layers for planned routes, traffic and geocoded appointment locations, kept in sync with the Gantt and the list. Actual routes depend on location tracking being switched on.

The old console now has a new name. According to a [Salesforce knowledge article](https://help.salesforce.com/s/articleView?id=005389875&language=en_US&type=1), the managed package tab was renamed to Classic Dispatch Console with version 262 (Summer '26), to separate it from the new Scheduling Console.

```hinweis achtung
If Visualforce pages, custom tabs or navigation rules point to the old label, they can break. The article describes a workaround with a custom Visualforce tab.
```

## The new console explains its proposals

The biggest change for dispatchers is candidate search. According to the Trailhead unit [Dispatch smarter with the Scheduling Console](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console), the console shows readable recommendations instead of numeric grades. A **Why?** next to a candidate gives an AI-generated explanation of why that slot was suggested. According to the Trailhead unit [Work with the service appointment list](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-basics/work-with-the-service-appointment-list), these explanations are an Agentforce feature that an admin turns on by assigning the Einstein Field Service User permission set. Check that license before you promise Why? to your dispatchers.

That matters more than it sounds. In the Classic Dispatch Console a dispatcher sees a grade and has to guess which service objective drove it. An experienced dispatcher who overrides proposals because they do not trust the grade is exactly the pattern I describe in [how much Field Service scheduling should be automatic](../salesforce-field-service-scheduling-automation/). An explanation in plain words makes it easier to see whether the engine is wrong or whether data is missing.

Trailhead names further changes:

- **Drag and drop** from the list to the Gantt, also across two monitors.
- **Global search** for appointments across territories, date ranges and list filters, with results in a temporary list of up to 50 records.
- **Hover details** on appointments, resources and absences, without opening the record.
- **Live updates** when the list is synced with the Gantt's territories, so no manual refresh.

For Winter '27, Salesforce lists [Scheduling Console Enhancements](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center): appointments that span several visits or days appear as one connected job and move with a single drag. For machine builders with commissioning or overhauls over several days, that is the most useful addition so far.

## The Scheduling Console needs the enhanced engine

The first requirement is the engine. The Scheduling Console is available only with Enhanced Scheduling and Optimization. Orgs that went live on the older engine have to switch first, and that switch has its own homework: scheduling recipes disappear and empty fields are treated differently by several work rules. The details are in [Enhanced Scheduling and Optimization: switch now?](../field-service-enhanced-scheduling-optimization-switch/).

The second requirement is setup. According to Trailhead, the console is switched on when Agentforce Field Service is enabled through Salesforce Go. Dispatchers still need access: in Salesforce Go an admin gives dispatchers Scheduling Console access and assigns the permission set that the system creates. That makes it easy to start with a small group, because only the users with the permission set see the new console.

## What carries over, and what is still missing?

Trailhead calls the move low risk: customizations applied to the Classic Dispatch Console continue to work in the Scheduling Console, and the Gantt state and user settings carry over. I would still test every custom action, every Visualforce page and every appointment list in a sandbox, because custom code and old filters are where surprises show up first.

Both consoles are not identical yet. In a [Trailblazer Community thread](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000pMqC00AK) from May 2026, a customer reported after the Summer '26 upgrade that color palettes were missing and that the new console offered views from one day to one week, while the classic Gantt also had views such as Utilization and Long-Term. A Salesforce team member answered that both consoles are not 100 percent at parity yet and that these features are not forgotten, without a date. Since then Salesforce has closed part of that gap: the Winter '27 release note [Navigate Long-Term Schedules Effortlessly in the Scheduling Console](https://help.salesforce.com/s/articleView?language=en_US&id=release-notes.rn_fieldservice_264_long_views.htm&release=264&type=5) adds long-term views. Check in your own org which of the gaps from May 2026 still apply before you plan the move.

For a manufacturer this is the important point. Dispatchers who plan annual maintenance weeks ahead or watch utilization across a whole territory work in exactly those long views, so test them with your own data volumes. Dispatchers who mostly handle breakdowns for today and tomorrow barely miss them. Which group you have decides how fast the move can go.

## Worked example: two dispatchers test first

The figures are assumed. A component maker with four dispatchers and three service territories already runs Enhanced Scheduling and Optimization. All numbers are assumptions to show the method.

```schritte
Inventory | 1 week · admin and dispatchers
  The admin lists every customization of the Classic Dispatch Console: custom actions, Visualforce pages, filters, color rules. Each dispatcher writes down which Gantt views they use every day.
Pilot | 6 weeks · two dispatchers
  Two dispatchers get the permission set and plan one territory in the Scheduling Console. The other two stay on the Classic Dispatch Console for the remaining territories.
Weekly check | weekly · pilot dispatchers
  The pilot dispatchers note what they could not do in the new console and had to do in the old one, how long typical tasks took, and how often they used Why? to understand a proposal.
Decision
  The criteria are set before the pilot starts: every critical task works, no blocking gap remains, and only a small share of cases, for example under 5 percent, needs the Classic Dispatch Console. Then the other two dispatchers follow. If a view the maintenance planner needs is still missing, that planner keeps the Classic Dispatch Console for that task.
```

The note on Why? is worth collecting. If dispatchers use it often and then change the proposal anyway, that is a signal to check for missing data, a policy that does not fit, knowledge the dispatcher has that the system lacks, or an explanation that is not clear enough. That is useful input long before any AI agent schedules on its own. Which agents work for dispatchers today is covered in [AI agents in Field Service: what works today?](../field-service-ai-agents-what-works-today/), and the wider picture in the AI masterclass chapter on [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).

## First step: check which engine you run

Check the engine first. If it is still the older one, the console question waits until the switch to Enhanced Scheduling and Optimization. If it already is the enhanced engine, give two dispatchers the permission set and let them plan one territory for a few weeks. Engine, console and policy owner are the three decisions of the masterclass chapter on [scheduling and dispatch](../../masterclass/field-service/field-service-scheduling-dispatch/).
