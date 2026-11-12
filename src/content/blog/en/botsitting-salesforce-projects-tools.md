---
title: "Botsitting in Salesforce projects: drop Miro and Figma"
description: "Botsitting costs 6.4 hours a week, says Glean. Why I drop Miro, Lucidchart and Figma in Salesforce projects and let Claude build the result directly."
pubDate: 2026-11-12
lang: en
slug: botsitting-salesforce-projects-tools
translationKey: botsitting-salesforce-tools
topic: ai
categories: [ai, devops]
contactBrief: architecture
tags: [Botsitting, Claude, MCP, Miro, Figma, Lightning Web Components]
takeaways:
  - "Botsitting is the work of making AI output usable. According to the Work AI Index 2026 it costs employees 6.4 hours a week."
  - "People who use several AI tools are 35 % more likely to be frequent botsitters, says Glean. Every intermediate tool adds another handoff."
  - "The MCP servers of Miro, Lucid and Figma pass on the artefact. They usually do not include the decisions and reasons from the workshop."
  - "A Claude artifact can be shared, clicked through and linked to the Jira ticket. Claude then builds the Lightning Web Component from its HTML and CSS."
  - "Review still happens, but on the result: the business reviews the artifact, the architect reviews the solution design, and nobody reviews an interim version."
faq:
  - q: "What does botsitting mean?"
    a: "Botsitting is the hidden work needed to make AI output usable: supplying missing context, checking output, fixing errors and rerunning prompts. The term comes from the Work AI Index 2026 by the Work AI Institute, a research unit of Glean."
  - q: "What is the difference between botsitting and botshitting?"
    a: "Botsitting is the effort of checking and correcting AI output. Botshitting means passing on output you have not checked and could not explain if asked. According to Glean, 69 % of AI users admit to at least one such behaviour."
  - q: "Do I need Figma to design Lightning Web Components?"
    a: "No. Claude creates a clickable prototype in HTML and CSS following the Salesforce Lightning Design System and then builds the Lightning Web Component from it. A Figma mock-up in between adds a handoff and nothing to the result."
  - q: "How do I share Claude results with the business?"
    a: "As an artifact from Claude Code: a page with its own link that you can share and attach to the Jira ticket. It is clickable and can serve as a dashboard, which a screenshot or a PDF cannot."
draft: false
---

Botsitting is the work people do to make AI output usable: supplying context, checking results, correcting errors. Salesforce projects create far too much of it when teams record workshop results in Miro first, the architecture in Lucidchart and the user interface in Figma, and an AI continues from there. All three tools now have an MCP server and AI features of their own. Context still gets lost at every handoff. That is why I recommend dropping these intermediate tools. Claude builds the result directly: as a shareable artifact, as a diagram in the repository or as a Lightning Web Component. Nobody needs the intermediate versions; the result is what counts.

## What does botsitting mean?

Botsitting is the effort employees put into AI tools so that their output becomes usable. The word plays on babysitting. It was made popular by the [Work AI Index 2026](https://glean.com/work-ai-institute/work-ai-index) by the Work AI Institute, a research unit of the AI vendor Glean, published in June 2026. The survey covered 6,000 full-time knowledge workers in the US, the UK and Australia. [The AI Daily Brief](https://aidailybrief.beehiiv.com/p/bositting-the-work-draining-ai-gains) called it the work draining AI gains.

```kennzahlen
6.4 hrs | botsitting per week, against about 11 hours saved through AI
37 % | of AI time goes into botsitting, more than into producing work (36 %)
2.3 hrs | a week only for feeding the AI missing context
+35 % | more likely to be a frequent botsitter when using several AI tools
source: Glean, Work AI Index 2026, survey of 6,000 knowledge workers, December 2025 to January 2026
```

Glean separates botsitting into two kinds. Checking important output and adding domain knowledge is productive. Typing the same context into several tools, or running the same prompt in a second tool because the first answer was unusable, is not. According to the [Glean blog](https://www.glean.com/blog/work-ai-index-hidden-work), 60 % of respondents rerun a prompt in a second tool. Glean describes the worker as the integration layer that carries context, data and intent from one system to the next.

The study comes from a vendor that sells a platform for company knowledge, and its comparisons between tools are correlations only. The direction still matches what I see in Salesforce projects.

## Every handoff between tools costs context

Anthropic describes the same pattern for AI agents. In [Building agents: When to fold subagents into your main agent loop](https://claude.com/de/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop), published in October 2026, the Applied AI team reports that in several enterprise deployments a single agent with skills performed better than architectures with many subagents, often at lower cost and latency. For one customer it ran about twice as fast. The reason: at every handoff someone has to decide which context is included, and details get lost. The article calls it a game of telephone in which fidelity degrades with each handoff. An agent that sees all earlier steps in the same context can connect them. Summaries returned by subagents contain less context.

I see the same pattern with tools. A Miro board, a Lucidchart diagram and a Figma mock-up are handoff points. Each contains only what someone put into it. This example shows how a business exception disappears along the way:

```kette
title: Example: an approval rule on its way through four tools
Sentence in the workshop | “Orders above 50,000 euros need the head of sales to approve, except call-offs from frame agreements.”
Miro note | “Approval above 50,000 euros”
Lucidchart | Diamond “Amount above 50,000?” with an arrow to the head of sales
Figma | Button “Submit for approval”
Jira story | Approval above 50,000 euros, the exception is missing
note: The exception was only said in the meeting. Claude, given the notes and the org metadata, writes it straight into the story.
```

The error shows up in user acceptance testing, when a call-off from a frame agreement waits for an approval nobody intended. By then the fix is a change request, and the discussion starts again.

## Why MCP servers do not solve the problem

The tool vendors have responded. Miro released a beta [MCP server](https://miro.com/it/newsroom/miro-launches-mcp-server-to-connect-visual-collaboration-with-ai-coding) for coding agents such as Claude Code in February 2026. The [Lucid MCP server](https://community.lucid.co/community-news-and-announcements-9/new-capabilities-for-the-lucid-mcp-server-generate-mermaid-diagrams-timelines-and-more-14121) now generates Mermaid, BPMN and UML diagrams as well as data models. Figma offers an MCP server for Dev Mode and, since February 2026, turns code back into editable designs with [Code to Canvas](https://news.designrush.com/figma-code-to-canvas-ux-to-code-workflow), built together with Anthropic. The Model Context Protocol (MCP) is an open standard through which AI agents access other applications.

That helps when the artefact has to exist anyway. But the MCP server only passes on the artefact. A diagram shows which systems are connected. It does not show why the SAP interface has to be asynchronous, which department head asked for the mandatory field or which option the participants rejected in the workshop. Those reasons are in the notes, the ticket and the repository. When Claude reads those sources directly, the diagram is no longer needed as an intermediate step.

IT leadership has a second point to consider. Every additional tool usually means a licence, a permission concept, a data protection review and one more interface an agent is allowed to use. What that means for approvals is covered in [Connected Apps and OAuth for AI integrations](/en/blog/connected-apps-oauth-ai-integrations/) and in [Community MCP servers: risks for Salesforce](/en/blog/community-mcp-servers-salesforce-risks/).

## What Claude delivers in place of the intermediate tools

```praxis
I have implemented the whole chain from workshop to deployment with AI, following the [AI-native delivery process](/en/blog/ai-native-salesforce-delivery-process/). It showed me how much quality is lost at every point where a result is moved into another tool and then handed back to the AI.
```

Since then I no longer ask for intermediate versions in Miro or Figma. The AI does the hands-on work, so an output format that Claude creates itself is good enough. Most often I use artifacts from Claude Code: pages with their own link that I can share and attach to the Jira ticket. They are clickable, and we use some of them as full dashboards. That is far more interactive than a screenshot or a PDF.

```tabelle
title: What I use in place of the intermediate tool
columns: Task | Before | With Claude *
Workshop and process capture | Miro board, written up afterwards | Minutes, process diagram and draft stories as an artifact on the Jira ticket
Architecture and integration | Lucidchart diagram in Confluence | Solution design with a Mermaid diagram in the repository
Data model | ERD in Lucidchart, reconciled by hand | ERD generated from the org's object metadata
User interface | Figma mock-up, then implementation | Clickable prototype in HTML and CSS, then Lightning Web Component
Project status | Slides or PDF | Interactive dashboard as an artifact
```

The difference is largest for user interfaces. Claude creates HTML and CSS following the Salesforce Lightning Design System (SLDS) and then builds the Lightning Web Component from it. In my experience nothing gets lost in that step. Salesforce itself shows in the [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2025/10/vibe-code-lightning-web-components-with-salesforce-dx-mcp) how a Figma link turns into a Lightning Web Component in Agentforce Vibes. Figma is only the input for the AI there. If there is no Figma mock-up, the business describes the screen in the workshop and Claude builds the prototype directly. I compare which coding agent fits the job in [Agentforce Vibes, Claude Code, Codex or Copilot](/en/blog/agentforce-vibes-claude-code-copilot/).

## Which objections do I hear, and how do I answer them?

**“The business thinks in pictures.”** True, and Claude delivers the pictures as well: process diagram, data model, clickable prototype. A visualisation is an output format. It does not need a tool of its own.

**“Salesforce provides Lucidchart templates itself.”** Salesforce provides its reference diagrams and shape libraries for Lucidchart, as the [Salesforce Ben guide to architecture diagrams](https://www.salesforceben.com/ultimate-guide-to-salesforce-architecture-diagrams/) describes. The notation is good and worth adopting. The question is where the work happens, and for me the answer is the repository.

**“Our design team works in Figma.”** For internal Salesforce screens, SLDS is the design system. Claude follows it and needs no mock-up as a template. Every tool that can be cut should be cut.

**“Good enough means unchecked.”** This is the most serious objection, and the Glean study supports it. It calls the flip side of botsitting botshitting: passing on output you have not checked and could not explain. Of all groups, Claude users admitted to it most often, at 92 %, compared with 71 % for ChatGPT and 34 % for Microsoft Copilot. Fewer tools do not justify weaker review. Review happens on the result: the architect reviews the solution design, the developer reviews the pull request, and the business clicks through the prototype. How I review AI code is described in [Reviewing AI-generated Salesforce code](/en/blog/reviewing-ai-generated-salesforce-code/). The time previously spent on handoffs is now available for that review.

```vergleich
without: Intermediate versions in four tools
- The context is spread over board, diagram, mock-up and ticket.
- * Every handoff needs someone to explain what was meant.
- Every tool needs a licence, permissions and its own MCP access.
with: Claude delivers the result directly
- Notes, org metadata and repository share one context.
- * The result is an artifact, a diagram in the repository or an LWC.
- The business and the architect review a result, not an interim version.
quote: Every tool we can leave out, we leave out.
```

## Leave out the Miro board for your next feature

Take one well-defined feature from the next sprint, for example an approval rule or a new screen for inside sales. Give Claude the workshop notes, the metadata of the objects involved and the repository. Have it create the minutes, the process diagram, the draft stories and a clickable prototype as one artifact, and link that artifact to the Jira ticket. The business reviews the artifact, and the architect reviews the solution design. Afterwards, count how often someone had to explain context again, and compare that with the last feature that was handled in Miro and Figma.
