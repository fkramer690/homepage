---
title: "Agentforce A2A: which agent owns the dealer conversation?"
description: "Agentforce, SAP Joule and Copilot Studio all ship agents. Which one should own the dealer conversation, and what agent-to-agent calls deliver in October 2026."
pubDate: 2026-10-27
lang: en
slug: agentforce-a2a-multi-agent-sap-microsoft
translationKey: agentforce-a2a-multi-agent
topic: ai
categories: [architecture, ai]
tags: [agentforce, a2a, multi-agent, mulesoft, sap, architecture]
takeaways:
  - "The agent that owns a conversation should belong to the system where the person logs in and where the case lives; for dealers and service customers on a Salesforce portal, that is Agentforce."
  - "Inside one Salesforce org, multi-agent orchestration with connected subagents is generally available since Winter '27; across vendors, the documented path is MuleSoft's A2A Bridge."
  - "MuleSoft's A2A Bridge for Agentforce supports no async tasks and no push notifications and keeps task state in gateway memory; the Agent API itself times out after 120 seconds."
  - "SAP's reference architecture exposes Joule agents to third parties over A2A through Agent Gateway, but says bidirectional communication with third-party agents is not yet supported."
  - "Data reads with one right answer belong in an API or MCP tool; delegate to another agent only when that agent owns logic you do not want to rebuild."
faq:
  - q: "What is A2A (Agent2Agent)?"
    a: "A2A is an open protocol through which agents from different vendors find each other via an agent card, hand over tasks and return results. MCP connects an agent to tools and data; A2A connects an agent to another agent that does its own reasoning."
  - q: "Does Agentforce support A2A natively?"
    a: "Salesforce said at Dreamforce 2026 that Agentforce can act as a specialized subagent in any A2A-compliant architecture, without naming a status. The documented path today is MuleSoft's A2A Bridge, which translates A2A requests into Agent API calls."
  - q: "Can Microsoft Copilot Studio call an Agentforce agent?"
    a: "Copilot Studio can add an external agent over A2A and delegate tasks to it. An Agentforce agent becomes A2A-callable through MuleSoft's A2A Bridge, where Agentforce is listed as available. Microsoft's page does not label the A2A feature as preview or GA, so test it in a sandbox first."
  - q: "Can Agentforce talk to SAP Joule agents?"
    a: "SAP documents external A2A clients calling Joule agents through Agent Gateway, with some components not yet GA. I have found no documented native A2A client in Agentforce. For order or credit data, an API action to SAP is the simpler and more predictable route."
  - q: "Should a dealer talk to several agents?"
    a: "No. Give each audience one agent that owns the conversation and fetches what it needs from other systems. Several front doors confuse dealers, and long chains of agents multiply latency, cost and failure points."
draft: false
---

Agentforce A2A, agent-to-agent calls between vendors, is now real enough that the architecture question shifts to ownership: which agent owns the dealer or service conversation? My answer is the agent of the system where the person logs in and the case lives. Dealers on a Salesforce portal talk to Agentforce, which reads SAP through APIs. Inside one org, multi-agent orchestration is generally available since Winter '27. Across vendors, MuleSoft's A2A Bridge works today with clear limits: synchronous only, no push notifications, task state in gateway memory. Native A2A in Agentforce was announced at Dreamforce 2026 without a status.

## Why does every vendor now ship its own agent?

A machine builder with Salesforce, SAP and Microsoft 365 gets three agent pitches at once. Salesforce sells Agentforce for service, the dealer portal and sales. SAP's head of AI described Joule as "an agent orchestrator working across enterprise workflows" in an [April 2025 post](https://news.sap.com/?p=233102), in which SAP also calls itself a founding contributor to the A2A protocol. Microsoft documents how a Copilot Studio agent [connects to another agent over A2A](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent) and can "delegate tasks to another agent, not just call APIs". Each pitch puts its own agent at the front.

A dealer's question ignores these boundaries. "Is the seal kit for machine 4711 in stock, and has my warranty claim for that machine been approved?" touches availability in SAP and the claim and asset in Salesforce. If every system's agent wants to answer, the dealer gets three front doors or a chain of agents asking each other. Both are worse than one agent that owns the conversation and fetches what it needs.

A2A (Agent2Agent) is an open protocol through which agents from different vendors discover each other through an "agent card", hand over tasks and return results. The difference to MCP matters for the design: MCP connects an agent to tools and data, A2A connects it to another agent that reasons on its own. What MCP means for IT is in [MCP explained for IT leads](../mcp-salesforce-explained-for-it-leads/).

## What does agent-to-agent interoperability deliver today?

As of 27 October 2026, the status differs by path, and I would plan with the documented one only:

- **Inside one Salesforce org: generally available.** The [Winter '27 developer guide](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) says "Multi-Agent Orchestration is generally available". An orchestrator agent hands off to specialists in the same org, declared in Agent Script as `connected_subagent`.
- **Agentforce as an A2A server through MuleSoft: available, with limits.** The [A2A Bridge](https://docs.mulesoft.com/general/exp-services-create-a2a-bridge) runs as a policy chain on an Omni Gateway in front of the agent, translates A2A requests into Agent API calls and derives an agent card. Agentforce is listed as available, with streaming and human-in-the-loop. Salesforce had listed MuleSoft A2A support as generally available in July 2025 in the [Agentforce 3 press release](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement).
- **Native A2A in Agentforce: announced.** The [Dreamforce 2026 recap](https://www.salesforce.com/blog/dreamforce-2026-announcements/) says Agentforce can "act as a specialized subagent in any A2A-compliant architecture" and promises to "orchestrate third-party agents from AWS, Azure, Google, and more". That section names no status, and I have found no Salesforce documentation of a native A2A endpoint.
- **SAP Joule: inbound only.** SAP's [reference architecture for inbound A2A](https://architecture.learning.sap.com/docs/ref-arch/fe0d1d), updated 26 October 2026, exposes Joule agents to third-party clients through Agent Gateway using A2A 0.3.0, with trust via SAP Cloud Identity Services. Its disclaimer says some components are not yet GA and bidirectional communication with third-party agents through Agent Gateway "is not yet supported".
- **Microsoft Copilot Studio: client side documented.** The Copilot Studio page does not label the A2A feature as preview or GA. On MuleSoft's bridge list, Copilot Studio as a source agent is "planned", so a Copilot agent cannot yet be made A2A-callable through MuleSoft.

The limits of the A2A Bridge decide which tasks fit. For Agentforce it supports no async tasks, so tasks that exceed the gateway timeout fail. It offers no push notifications and no task subscription, and task state lives in gateway memory, lost on a restart. The [Agent API](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-considerations.html) behind it has a 120-second timeout and does not support agents of type "Agentforce (Default)". So cross-vendor A2A today fits a question that gets an answer within seconds. A warranty review that waits days for a technician's report does not fit.

## Which agent should own the dealer or service conversation?

The owner is the agent of the system where the person authenticates and where the result is recorded. Four questions decide it:

1. **Who knows the person?** A dealer logged into an Experience Cloud portal is a contact on an account that carries the SAP sold-to number. Every visibility rule starts there.
2. **Where does the result live?** Cases, warranty claims and work orders sit in Salesforce, so the owner writes the outcome there.
3. **Which channel?** Portal chat, the service hotline and email-to-case are Salesforce channels. Teams is Microsoft's.
4. **Who takes over from the agent?** The escalation queue of the service team runs in Salesforce Omni-Channel.

For a manufacturer this gives a clear split. Dealers and service customers talk to Agentforce, and SAP data comes in through an API action, as described in [Agentforce and SAP: order status through MuleSoft](../agentforce-sap-order-status-mulesoft/). Sales reps who work in Teams and Outlook can have Copilot as their front door, with an Agentforce agent behind it for CRM questions. Clerks in credit management or billing work in SAP, and Joule is theirs.

I would write this down per audience, the same way an object has one owner. The owner should never be the vendor whose demo was best on the day.

## When is a second agent worth the hop?

A data read with one right answer belongs in an API or an MCP tool. An agent asking another agent for an order status is an API call with two language models in between, and each of them can misread the question. Delegate to another agent only when it owns judgement and rules you do not want to rebuild, for example an SAP-side process that already runs with SAP's own checks.

Every hop raises four questions before go-live:

- **As whom does the specialist run?** The A2A Bridge authenticates to the Salesforce org with client ID and secret. In the documented [client credentials setup](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html) with `bypassUser` set to true, the API uses the user associated with the agent, not the person who asked in Teams. That user's sharing decides what the specialist can read. Gates belong in code on the receiving side, as in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).
- **How long may it take?** Within 120 seconds, or it fails.
- **Who pays?** Salesforce states that Agent API usage counts toward credit consumption, and the calling platform bills its own usage. One dealer question then runs on two meters.
- **Where is the trace?** A failure across two vendors means two logs and two support contracts. Cross-vendor cases belong in the test set described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).

## A typical scenario: dealer portal, Teams and a Joule agent

Assume a machine builder with 250 dealers, SAP S/4HANA, Microsoft 365 and an Agentforce agent on the dealer portal answering warranty and order questions. All numbers are assumptions. In one quarter three requests reach IT.

**Sales wants the dealer agent in Teams.** Area sales managers ask, for example, how many warranty claims a dealer has open. A Copilot Studio agent calls an Agentforce specialist through the MuleSoft A2A Bridge. The answer comes back in seconds, which fits the synchronous limits. One detail to check first: the bridge accepts JWT, Basic Authentication or Client ID enforcement, and Copilot Studio offers API key or OAuth 2.0, so both sides must agree on one scheme. Because the specialist runs as the agent user, I would restrict it to read-only questions every sales rep may see anyway, and keep claim details in Salesforce.

**The SAP team proposes a Joule agent for credit checks.** The portal agent would ask Joule whether a dealer may order despite a credit block. I would decline. A credit block is a yes or no in SAP, an API returns it deterministically, and the bidirectional Joule path is not yet supported.

**Service wants an agent to run the warranty review.** The review waits two to five days for the technician's report. With no async tasks for Agentforce in the bridge and a 120-second timeout, this stays a Salesforce process with case, work order and approval, not an A2A task.

One of three requests goes through A2A. For a first year, I consider that ratio healthy.

## Where should you start?

1. **Name one owner agent per audience** and channel: dealers, service customers, sales reps, back office.
2. **List the questions that cross systems** and mark each as a data read (API or MCP) or delegated judgement (agent).
3. **Use multi-agent orchestration inside the org first.** It is GA and keeps identity, logs and billing in one place.
4. **Check identity, timeout, cost and logging** for every cross-vendor hop before building it.
5. **Pilot one read-only A2A hop** if MuleSoft already runs in your company, and ask SAP and Microsoft for the GA status of their side in writing.

Which integration pattern fits which system is part of [Salesforce integration](../../services/salesforce-integration/), and the masterclass chapter [MCP and interfaces](../../ai-masterclass/mcp-and-interfaces/) maps the protocols.

One agent per audience owns the conversation, and A2A is for the few hops where another agent owns real logic. If you are sorting out which agent should talk to your dealers, [send me a message](#contact).
