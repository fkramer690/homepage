---
title: "Enhanced Chat in portals: inline mode, branding, languages"
description: "How to embed Salesforce Enhanced Chat v2 in a dealer portal: floating or inline, branding without code and three language layers for twelve dealer languages."
pubDate: 2026-10-31
lang: en
slug: enhanced-chat-portal-inline-mode-languages
translationKey: enhanced-chat-portal
topic: service
categories: [ai, architecture]
tags: [Enhanced Chat, Experience Cloud, dealer portal, multilingual, Agentforce, Service Cloud]
series: { id: enhanced-chat, part: 8 }
takeaways:
  - "Inline mode exists only in Enhanced Chat v2. The chat then fills a container on the page instead of floating above it as a button."
  - "Inline fits when the chat is part of a task in the portal, for example on the page of a machine. For general questions from any page the floating button remains the better choice."
  - "Colours, fonts, logo, avatars and window size are set in the Embedded Service Deployment without code. Anything beyond that runs through Custom Lightning Types."
  - "Languages in the chat have three layers: the interface, the AI agent and the people in service. Each one is set up and tested on its own."
  - "Real-Time Translations accepts custom terminology for at most ten languages. With twelve dealer languages you have to decide which two run without a glossary."
faq:
  - q: "What is inline mode in Enhanced Chat v2?"
    a: "In inline mode Enhanced Chat v2 shows the chat window directly inside a div element of your page instead of as a floating button. You set displayMode to inline in the code snippet and point targetElement at the container. Version 1 does not have this mode."
  - q: "How do I add Enhanced Chat to an Experience Cloud site?"
    a: "Drag the Embedded Messaging component into the site template or add the deployment's code snippet, publish both the deployment and the site, and add the site's domain to the CORS allowlist. Without the CORS entry the chat does not load, and no clear error message appears."
  - q: "Which language does Enhanced Chat show?"
    a: "The interface follows the language setting in the code snippet (settings.language). On LWR sites, v2 takes the site's language with the useHostSiteLanguage setting. The AI agent's language is set separately through a pre-chat field and the Omni-Channel flow."
  - q: "Do I need a translation app for multilingual chat?"
    a: "Not for the AI agent, which answers in the session language. For people in service, Salesforce offers Real-Time Translations, which needs the Agentforce for Service SKU and its own permission set licence."
draft: true
---

For a dealer portal I would embed Salesforce Enhanced Chat v2 inline where the chat belongs to a task, such as the page of a machine or a service case, and keep the floating button everywhere else. Inline mode exists only in v2. Branding is set in the Embedded Service Deployment without code. Languages take the real effort: the interface, the AI agent and the service reps each have their own language setting. Twelve dealer languages work if you set up all three layers and test every language before go-live.

## Floating or inline: which Enhanced Chat mode fits where?

By default Enhanced Chat appears as a floating button in the bottom right corner that opens a chat window above the page. The [inline mode guide](https://developer.salesforce.com/docs/ai/agentforce/guide/enhanced-chat-inline-mode.html) describes the alternative: the chat renders directly inside a div element on the page and fills that container completely. Your page layout decides the size.

You set it up in the deployment's code snippet with three settings:

- `displayMode = 'inline'` turns the mode on.
- `targetElement` points at the container, for example an element with the class `chat-container`.
- `headerEnabled = false` hides the chat window's header when your page already has a heading.

According to the [settings reference](https://developer.salesforce.com/docs/service/messaging-web/references/m4w-reference/settingsAPI.html), the chat launches automatically in inline mode. With `disableInlineAutoLaunch` it stays hidden until your code calls `launchChat`. Forget that call and dealers see an empty box. Version 2 reports two misconfigurations in the browser console: inline without a custom container embeds the chat across the whole page, and a custom container without inline makes the button float inside that container.

```tabelle
title: Floating button or inline mode in a dealer portal
columns: | Floating | Inline
Available | v1 and v2 | v2 only *
Place | button on every page, window above it | fixed area in the page *
Size | width and height in branding | as large as the container
Start | dealer clicks the button | automatic, or via launchChat
Fits | general questions from anywhere | chat about a machine, order, case *
note: Both modes use the same channel and the same routing. Only the presentation changes.
```

My rule of thumb: when a question is about a record the dealer is looking at, the chat belongs next to that record. A dealer on the page of a serial number wants to ask the agent about exactly that machine, and the inline area makes that obvious. Which serial number and page the agent receives is handled by hidden pre-chat and context events, covered in part 6 of this series.

## How do you add Enhanced Chat to an Experience Cloud site?

The [Trailhead module on Agentforce deployment](https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/deploy-the-messaging-connection-to-a-website) shows the route through Experience Builder: drag the Embedded Messaging component into the site template, publish the site and publish the deployment as well. For your own website, copy the code snippet from Setup under Embedded Service Deployments instead. How a portal for dealers is built in general is in [Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).

```hinweis achtung
Add the site's domain with https:// to the CORS allowlist in Setup, and the *.live-preview domain if the preview causes trouble. According to Trailhead the chat otherwise does not load at all, and no error message explains why.
```

Two more points from the help pages. First, Salesforce warns against running v1 and v2 on the same website, because messages may then be missing in v1. Switch the portal over in one step. Second, every change to the deployment only shows after you publish it, in the test environment too.

One question is open for me: how best to place inline mode in an LWR site built with Experience Builder. The guide only describes the snippet with a container, not the component. That is the first thing I would settle in a proof of concept.

## What can you brand without code?

According to the [help page on deployments](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.miaw_create_deployment_type.htm), you choose colours and fonts and upload logos and avatars without engineering effort. The [v1 to v2 comparison](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5) lists colours, fonts, images and window size as the same in both versions. The settings sit in the Embedded Service Deployment under Branding:

- **Colours** for the button, header, messages from the agent and the dealer, text and links.
- **Fonts** from a predefined list or your own font, plus the font size.
- **Images** for the logo in the header and avatars for service reps and the AI agent.
- **Window size** for floating mode, width and height separately.

For a dealer portal this is almost always enough. I would take the colours from the portal's design system and give the AI agent its own avatar, so dealers can see when a person takes over. Anything beyond colours and images, such as a spare part card with picture and price inside the chat, is no longer branding. That runs through Custom Lightning Types, covered in part 7 of the series.

## How does Enhanced Chat run in twelve languages?

Manufacturers with dealers across Europe reach twelve languages quickly. The chat has three layers for them, each set up independently.

```tabelle
title: Three language layers in Enhanced Chat
columns: Layer | What gets translated | Where you set it
Interface | button, pre-chat fields, system messages | settings.language, custom labels per language *
AI agent | the agent's answers | session language via pre-chat field and flow
Service | messages between dealer and person | Real-Time Translations, Agentforce for Service *
note: Every layer needs its own tests. A correct interface says nothing about the agent's answers.
```

**The interface.** The language sits in the code snippet under `embeddedservice_bootstrap.settings.language`. Your own texts for greeting, pre-chat fields, accessibility and system messages are maintained as [custom labels](https://help.salesforce.com/s/articleView?id=service.miaw_custom_labels.htm&language=en_US&type=5), and according to the help page you repeat that for every language. With twelve languages that is a translation list someone has to own. For Arabic, a [Salesforce knowledge article](https://help.salesforce.com/s/articleView?id=005237057&language=en_US&type=1) describes that right to left rendering only works once the language is enabled in the language settings and set explicitly in the snippet.

On LWR sites v2 offers a shortcut. According to the [guide on the host site language](https://developer.salesforce.com/docs/service/messaging-web/guide/use-host-site-language.html), the chat loads in an iframe set to English by default, so standard components in the chat may appear in English. With `useHostSiteLanguage` the chat takes the site's language. Every language has to exist in the site first, otherwise loading ends with a 404 error.

**The AI agent.** The agent's answer language depends on the session language. The usual approach is to pass the page language as a hidden pre-chat field and write it to the EndUserLanguage field of the messaging session in the Omni-Channel flow. Which languages Agentforce speaks, how the retriever filters knowledge by language and what translation costs is in [Multilingual Agentforce agents for export dealers](../multilingual-agentforce-agents-export-dealers/).

**The people in service.** [Real-Time Translations](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_translate_2.htm&type=5) translates incoming messages into the rep's language and their replies back into the dealer's language. It needs the Agentforce for Service SKU, a permission set licence and the Translate Enhanced Conversations permission. It accepts custom terminology for up to ten languages. With twelve dealer languages at least two run without a glossary, and part names are exactly what machine translation gets wrong. Salesforce also recommends telling dealers that translation is involved, for example in the greeting.

## What I saw in the project

**Placeholder practice example:** an anonymised example from Fabian's Enhanced Chat project follows here once he has confirmed it: where the chat was embedded, floating or inline, how many languages and which layer took the most effort.

## Where should you start?

I would start with a proof of concept in two languages, one main language and one with its own script or reading direction, and only then extend to all twelve.

```schritte
Choose pages | 1 week · portal owners
  Decide where the chat sits inline and where the button stays.
Build deployment | 1 to 2 weeks · partner
  Set up the v2 deployment, branding, CORS and the container in the site.
Test two languages | 2 weeks · service and partner
  Check interface, agent and translation in one main and one special language.
Roll out | per language · service
  Add custom labels, glossary and test cases per language, then switch it on.
```

The durations are an assumption for a portal with few pages. If you want to settle the split between partner and internal IT, see [Salesforce architecture](../../services/salesforce-architecture/). With twelve languages, what decides it in the end is who maintains the interface translations and the glossary over time.
