---
title: "Audit trail for AI agents in Salesforce: which logs?"
description: "Which Salesforce logs show what an agent or external AI tool did with a record, which need extra licences, and how long each one keeps its data."
pubDate: 2026-10-27
lang: en
slug: audit-trail-ai-agents-salesforce
translationKey: audit-trail-ai-agents
topic: security
categories: [architecture, ai]
tags: [audit trail, event monitoring, agentforce, hosted mcp, works council, manufacturing]
takeaways:
  - "An audit trail for AI agents in Salesforce consists of several logs: Trust Layer audit data, Session Tracing, API event logs, Setup Audit Trail, field history and the AI vendor's own logs."
  - "The Trust Layer audit trail and Session Tracing live in Data 360 and store prompts, responses and action inputs; the Salesforce pages I read name no retention period for them."
  - "Hosted MCP calls appear in the standard API logs with the named user; without paid Event Monitoring those files are kept for one day only."
  - "Paid Event Monitoring keeps logs 30 days by default and up to one year, but never before the contract start, so the retention decision belongs before go-live."
  - "Per-person logs of agent and AI tool use are also monitoring data, so retention, readers and evaluations should be settled with data protection and the works council in one round."
faq:
  - q: "Where does Salesforce store the audit trail of an Agentforce agent?"
    a: "In Data 360. According to Salesforce Help, the generative AI audit data with feedback is stored there, including the masked prompt, the LLM response and the unmasked response shown to the user. Data collection has to be switched on in Einstein setup."
  - q: "How long does Salesforce keep API and event logs?"
    a: "Without the add-on, Enterprise, Unlimited and Performance Edition orgs get a few event types, including API Total Usage and Login, with one day of retention. With Shield or the Event Monitoring add-on, logs are kept 30 days by default and up to one year."
  - q: "Can I see what Claude read in Salesforce through hosted MCP?"
    a: "Yes, on the Salesforce side. Hosted MCP calls appear in the standard API logs under the named user and can be filtered with API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP. What the model did with the data afterwards is outside Salesforce's logs."
  - q: "How long is the Setup Audit Trail kept?"
    a: "Salesforce's object reference says the Setup Audit Trail covers changes made in Setup for at least the last 180 days. For a longer history of agent configuration I would keep agent definitions in version control."
  - q: "Does the EU AI Act require six months of agent logs?"
    a: "Article 26 requires deployers of high-risk AI systems to keep the automatically generated logs under their control for at least six months, unless other law says otherwise. Many service agents will not be high-risk, but I use six months as a benchmark. This is not legal advice."
draft: false
---

An audit trail for AI agents in Salesforce is assembled from at least five logs, and none of them answers every question on its own. The Trust Layer audit trail and Session Tracing record agent conversations in Data 360. Calls from external AI tools through hosted MCP land in the API logs, which the free Event Monitoring tier keeps for one day. Setup Audit Trail covers configuration changes for at least 180 days, field history 18 to 24 months. I would decide per log, before go-live, who may read it, how long it stays and who pays for the retention.

## Which questions do auditors, data protection and the works council ask?

At a machine builder they come up around warranty, dealer and service processes:

- **Internal or customer audit:** who changed the agent's instructions or the warranty rule before the disputed decision?
- **The data protection officer:** which personal data of dealer staff, end customers and technicians ends up in prompts and logs, and when is it deleted?
- **The works council:** can these logs be used to evaluate individual service employees?
- **The IT lead:** which records did an external AI tool read last week, and under which user?

Each question points to a different log, licence and retention period:

| Log | What it answers | Prerequisite | Retention |
|---|---|---|---|
| Trust Layer audit trail | Prompt, response, toxicity scores, feedback | Data 360, data collection switched on | Not stated on the pages I read |
| Session Tracing | Subagent, action, input, output, errors per step | Data 360, tracing switched on | Not stated; export API (beta) reads the last 72 hours |
| API event logs | Which user read which objects through hosted MCP or another API client | Free tier or Event Monitoring | 1 day free; 30 days to 1 year paid |
| Unique Query events | Which SOQL queries, filters and reports ran | Not in the free tier | As Event Monitoring |
| Setup Audit Trail | Who changed what in Setup | Standard | At least 180 days |
| Field history | Which field value changed, when, by whom | Standard; Field Audit Trail as add-on | 18 to 24 months; archive until deleted |
| Claude Enterprise audit logs | Logins, file uploads, conversations created or deleted | Enterprise plan | Export covers 180 days |

## What do the agent logs inside Salesforce record?

**The Trust Layer audit trail.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.generative_ai_audit_trail.htm&language=en_US&type=5), it holds the masked prompt text when masking is on, the LLM response and "the full unmasked response that was served to the user". It is stored in Data 360 once data collection is switched on, and the page names no retention period. What the Trust Layer masks for agents is covered in [what the Einstein Trust Layer protects](../einstein-trust-layer-what-it-protects/).

**Session Tracing.** With [Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) Salesforce said that Agentforce "captures all agent activity in a native, extensible session-tracing data model", built on OpenTelemetry and announced for general availability in August 2025. The [interaction step object](https://developer.salesforce.com/docs/data/data-cloud-dmo-mapping/guide/c360dm-si-aiagentinteractionstepdmo-dmo.html) holds step type, action name, input and output text, error message, user and timestamps. That log explains why an agent rejected a warranty claim: which action ran with which serial number and what it returned.

**Agent Platform Tracing.** A [developer blog post from May 2026](https://developer.salesforce.com/blogs/2026/05/agent-platform-tracing-debug-agentforce-with-trace-trees-soql-and-slack) describes spans for LLM calls, Flows and Apex in Data 360, linked to Session Tracing by the same trace ID, and warns: "There's no backfill of historical data."

For a SIEM (the security team's central log system), the [Session Trace OTel API](https://developer.salesforce.com/docs/ai/agentforce/guide/otel-api.md) is in beta and returns sessions started within the previous 72 hours, one session per query; native push is "planned".

These logs are a store of personal data in their own right: the input of a "check warranty" action contains serial numbers, dealer names and sometimes the end customer. None of the pages I opened says what storing it costs in Data 360 consumption.

## How do you trace an external AI tool through the API logs?

When Claude, ChatGPT or Cursor reads Salesforce data through hosted MCP, the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) say that agent actions appear "in standard Salesforce API logs with full user attribution". You isolate them with `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP`. The logs show operations, objects and timestamps per user; the permission model is in [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/).

The catch is retention. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/event_monitoring/event_monitoring_intro), Enterprise, Unlimited and Performance Edition orgs get a handful of event types for free, among them Login, Logout and API Total Usage, with one day of retention. In my reading, an org without the add-on that does not download these files every day has no MCP history at all.

With Shield or the Event Monitoring add-on, the [Event Monitoring FAQ](https://help.salesforce.com/s/articleView?id=000396295&language=en_US&type=1) says logs are kept 30 days by default and up to one year. Paid logs "cannot be retrieved retroactively for periods before the contract start date". The Salesloft Drift attackers were active from 8 August until at least 18 August 2025, [according to The Hacker News](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html), so a question asked on day ten needs logs from day one. The token side of that incident is in [connected apps and OAuth lessons](../connected-apps-oauth-ai-integrations/).

The paid tier adds event types such as [Unique Query](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_unique_query_event_elf.htm), which captures the SOQL queries, filter IDs and report IDs that were processed. That is the event that shows whether an AI client asked for one dealer's price agreement or for all of them.

Salesforce's logs end where the data leaves Salesforce. For Claude, [Anthropic's audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs) exist for Enterprise organisations only. They record sign-ins, file uploads and conversations created, deleted or renamed, without chat content, and an export covers the past 180 days. I would ask every other AI vendor the same: which events, how long, which export.

## Which logs show who changed the agent?

For configuration, the [Setup Audit Trail](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) represents changes made in Setup "for at least the last 180 days". An audit of last year's warranty decision will not find the change there. I would keep agent definitions in version control and deploy them through a pipeline, as in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/), because a repository history does not expire.

For data, field history tracking covers up to 20 fields per object for 18 to 24 months, according to the [Field Audit Trail guide](https://developer.salesforce.com/docs/platform/field-history-retention/guide/field-audit-trail.html). Field Audit Trail, available with Shield or its own licence, raises that to 200 fields per object and archives the history in a big object until you delete it. If an agent writes under its own user, field history on warranty status and approved amount shows which changes came from the agent.

## How long should logs be kept?

[Article 26 of the EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26) requires deployers of high-risk AI systems to keep the automatically generated logs under their control for "at least six months", unless other law says otherwise. As I read the rules, a dealer service agent is usually not high-risk; the classification is in [EU AI Act deadlines for Agentforce](../eu-ai-act-deadlines-agentforce/). This is my reading, not legal advice.

I still use six months as the benchmark, and the table shows the gaps: one day for free API logs, 30 days by default for paid ones and no stated period for the Data 360 logs. Longer is not automatically better, though. Logs per named user show who asked what and when, which in Germany makes them a works council topic, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## A typical scenario: three questions in one quarter

Assume a machine builder with 90 dealers, an Agentforce service agent in the dealer portal that answers warranty status questions and opens claims, and 25 service back office users working with Claude Enterprise through hosted MCP. Event Monitoring has not been bought. All numbers are assumptions.

**Week 3, data protection.** The DPO asks where the names of dealer staff end up: in the audit trail, which stores the response unmasked, and in the step inputs and outputs of Session Tracing. With no documented retention, the company sets six months and a deletion job. IT also starts a daily download of the API logs into the SIEM.

**Week 7, works council.** The agreement allows monthly reports aggregated by department; analysis per person only after a security incident, with the works council informed.

**Week 11, a dealer complaint.** A dealer says a competitor knew his net prices. Who read his price agreement through MCP in the past 40 days? Without the daily download only yesterday's file would exist. With it, the filter on `SALESFORCE_HOSTED_MCP` returns three users from dealer management, and the investigation moves on.

## What should you settle before go-live?

1. **Switch on audit data collection and tracing** before the first productive conversation. There is no backfill.
2. **Write a log inventory**: question answered, owner, readers, retention, deletion.
3. **Decide on API logs**: a daily export into your SIEM or paid Event Monitoring. The price was not on any page I opened; ask your account executive.
4. **Track the fields agents write**, such as warranty status and approved amount.
5. **Version agent definitions** outside Setup.
6. **Settle the works agreement and the DPO's deletion concept together**, because both are about the same logs.

A log inventory with owners is part of my work on [Salesforce architecture](../../services/salesforce-architecture/).

Agents make decisions in your org, so the logs that explain those decisions need an owner and a retention period before the first auditor asks. If you want to go through your log inventory before an agent goes live, [send me a message](#contact).
