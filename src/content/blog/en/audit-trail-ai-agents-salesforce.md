---
title: "Audit trail for AI agents in Salesforce: which logs?"
description: "Which Salesforce logs show what an agent or external AI tool did with a record, which need extra licenses, and how long each one keeps its data."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: audit-trail-ai-agents-salesforce
translationKey: audit-trail-ai-agents
topic: security
categories: [architecture, ai]
tags: [audit trail, event monitoring, agentforce, hosted mcp, works council, manufacturing]
takeaways:
  - "The audit trail is made up of Trust Layer audit data, Session Tracing, API event logs, Setup Audit Trail, field history and the AI vendor's own logs."
  - "Trust Layer audit data stores prompts and responses, while Session Tracing stores the action steps. Both are in Data 360 and have no stated retention period."
  - "Hosted MCP calls appear in the API logs with the named user, but without paid Event Monitoring they are available for only one day."
  - "Paid Event Monitoring keeps logs for up to one year, but it cannot retrieve logs from before the contract start, so decide before go-live."
  - "Per-person agent logs are also monitoring data, so agree retention and read access with the data protection team and the works council together."
faq:
  - q: "Where does Salesforce store the audit trail of an Agentforce agent?"
    a: "In Data 360. According to Salesforce Help, the generative AI audit data with feedback is stored there, including the masked prompt, the LLM response and the unmasked response shown to the user. Data collection has to be enabled in Einstein Setup."
  - q: "How long does Salesforce keep API and event logs?"
    a: "Without the add-on, Enterprise, Unlimited and Performance Edition orgs get a few event types, including API Total Usage and Login, with one day of retention. With Shield or the Event Monitoring add-on, logs are kept up to one year; the FAQ says 30 days by default, while the REST API guide says one year. Check the setting in your org."
  - q: "Can I see what Claude read in Salesforce through hosted MCP?"
    a: "Partly. Hosted MCP calls appear in the standard API logs under the named user, with operation and affected objects, and can be filtered with API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP. A complete list of the records returned to the AI client is not in the standard logs, and what the model did with the data afterwards is outside Salesforce."
  - q: "How long is the Setup Audit Trail kept?"
    a: "Salesforce's object reference says the Setup Audit Trail covers changes made in Setup for at least the last 180 days. For a longer history of agent configuration I would keep agent definitions in version control."
  - q: "Does the EU AI Act require six months of agent logs?"
    a: "Article 26 requires deployers of high-risk AI systems to keep the automatically generated logs under their control for at least six months, unless other law says otherwise. Whether an agent is high-risk depends on its purpose, not the product. For other agents I use six months as a benchmark. This is not legal advice."
draft: false
---

An audit trail for AI agents in Salesforce is assembled from at least five logs, and none of them answers every question on its own. The Trust Layer audit trail and Session Tracing record agent conversations in Data 360. Calls from external AI tools through hosted MCP land in the API logs, which Salesforce keeps for one day in the event types available at no extra cost. Setup Audit Trail covers configuration changes for at least 180 days, while field history covers 18 to 24 months. I would decide per log, before go-live, who may read it, how long it stays and who pays for the retention.

## Which questions do auditors, the data protection officer and the works council ask?

At a machine builder, these questions arise in warranty, dealer and service processes:

- **Internal or customer audit:** who changed the agent's instructions or the warranty rule before the disputed decision?
- **The data protection officer:** which personal data of dealer staff, end customers and technicians ends up in prompts and logs, and when is it deleted?
- **The works council:** can these logs be used to evaluate individual service employees?
- **The IT lead:** which records did an external AI tool read last week, and under which user?

Each question points to a different log, license and retention period:

| Log | What it answers | Prerequisite | Retention |
|---|---|---|---|
| Trust Layer audit trail | Prompt, response, toxicity scores, feedback | Data 360, data collection switched on | Not stated on the pages I read |
| Session Tracing | Subagent, action, input, output, errors per step | Data 360, tracing switched on | Not stated; export API (beta) reads the last 72 hours |
| API event logs | Which user called which objects through hosted MCP or another API client | Included event types or Event Monitoring | 1 day included; up to 1 year paid |
| Unique Query events | Which SOQL queries, filters and reports ran | Event Monitoring or Shield | As Event Monitoring |
| Setup Audit Trail | Who changed what in Setup | Standard | At least 180 days |
| Field history | Which field value changed, when, by whom | Standard; Field Audit Trail as add-on | 18 to 24 months; archive until deleted |
| Claude Enterprise audit logs | Logins, file uploads, conversations created or deleted | Enterprise plan | Export covers 180 days |

## What do the agent logs inside Salesforce record?

**The Trust Layer audit trail.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.generative_ai_audit_trail.htm&language=en_US&type=5), it stores the masked prompt text when masking is on, the LLM response and "the full unmasked response that was served to the user". It is stored in Data 360 once data collection is switched on, and the page does not name a retention period. What the Trust Layer masks for agents is covered in [what the Einstein Trust Layer protects](../einstein-trust-layer-what-it-protects/).

**Session Tracing.** With [Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) Salesforce said that Agentforce "captures all agent activity in a native, extensible session-tracing data model", built on OpenTelemetry and announced for general availability in August 2025. The [interaction step object](https://developer.salesforce.com/docs/data/data-cloud-dmo-mapping/guide/c360dm-si-aiagentinteractionstepdmo-dmo.html) holds step type, action name, input and output text, error message, user and timestamps. That log helps reconstruct why an agent rejected a warranty claim: which action ran with which serial number and what it returned. It does not prove the full business rationale, because a flow or Apex action can read more data than the step shows.

**Agent Platform Tracing.** A [developer blog post from May 2026](https://developer.salesforce.com/blogs/2026/05/agent-platform-tracing-debug-agentforce-with-trace-trees-soql-and-slack) describes spans for LLM calls, Flows and Apex in Data 360, linked to Session Tracing by the same trace ID, and warns: "There's no backfill of historical data."

```vertiefung For developers
title: How do agent traces reach the SIEM?
To feed a SIEM (the security team's central log system), you can use the [Session Trace OTel API](https://developer.salesforce.com/docs/ai/agentforce/guide/otel-api.md), which is in beta and returns sessions started within the previous 72 hours, one session per query; native push is "planned".
```

These logs are a store of personal data in their own right: the input of a "check warranty" action contains serial numbers, dealer names and sometimes the end customer. Ask Salesforce how much Data 360 consumption this data creates under your contract, especially storage beyond your allocation.

## How do you trace an external AI tool through the API logs?

When Claude, ChatGPT or Cursor reads Salesforce data through hosted MCP, the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) say that agent actions appear "in standard Salesforce API logs with full user attribution". You isolate them with `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP`. The logs show operations, affected objects and timestamps per user, but not a complete list of the records returned to the AI client; the permission model is in [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/).

Retention is where it gets difficult. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/event_monitoring/event_monitoring_intro), Enterprise, Unlimited and Performance Edition orgs get a handful of event types for free, among them Login, Logout and API Total Usage, with one day of retention. As I read it, an org without the add-on that does not download these files regularly has no MCP history at all.

With Shield or the Event Monitoring add-on, the [Event Monitoring FAQ](https://help.salesforce.com/s/articleView?id=000396295&language=en_US&type=1) says logs are kept 30 days by default and up to one year, while the [REST API guide](https://developer.salesforce.com/docs/platform/api-rest/guide/using-resources-event-log-files.html) states one year as the default. Check the effective setting in your org. The Salesloft Drift attackers were active from 8 August until at least 18 August 2025, [according to The Hacker News](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html), so a question asked on day ten needs logs from day one. For the token aspect of that incident, see [connected apps and OAuth lessons](../connected-apps-oauth-ai-integrations/).

```hinweis achtung
Paid logs "cannot be retrieved retroactively for periods before the contract start date". Event Monitoring bought after an incident will not show that incident.
```

The paid tier adds event types such as [Unique Query](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_unique_query_event_elf.htm), which captures the processed SOQL queries, filter IDs and report IDs. That event can show whether an AI client's query targeted one dealer's price agreement or all of them, though not which records came back.

Salesforce's logs end where the data leaves Salesforce. For Claude, [Anthropic's audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs) exist for Enterprise organizations only. They record sign-ins, file uploads and conversations created, deleted or renamed, without chat content, and an export covers the past 180 days. Chat content itself is a separate question for Anthropic's compliance tools. I would ask every other AI vendor the same questions: which events are logged, how long they are kept and which export is available.

## Setup Audit Trail and field history show who changed the agent

For configuration, the [Setup Audit Trail](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) covers changes made in Setup "for at least the last 180 days". It is an indication of Setup activity, not a full version history of agent instructions, and an audit of last year's warranty decision will not find the change there. I would keep agent definitions in version control and deploy them through a pipeline, as in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/), because a repository history does not expire. That only holds if nobody changes the agent directly in production.

For data, field history tracking covers up to 20 fields per object for 18 to 24 months, according to the [Field Audit Trail guide](https://developer.salesforce.com/docs/platform/field-history-retention/guide/field-audit-trail.html). Field Audit Trail, available with Shield or its own license, raises that to 200 fields per object and archives the history in a big object until you delete it. If an agent writes under its own user account, field history on warranty status and approved amount shows which changes came from the agent. Field history does not show which person triggered the conversation; for that, you link it to the session record or a correlation ID.

## How long should logs be kept?

[Article 26 of the EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26) requires deployers of high-risk AI systems to keep the automatically generated logs under their control for "at least six months", unless other law says otherwise. As I read the rules, classification depends on the intended purpose, not the product: an agent answering warranty status questions is usually not high-risk, one that evaluates employees may be. I discuss the classification in [EU AI Act deadlines for Agentforce](../eu-ai-act-deadlines-agentforce/). This is my reading, not legal advice.

I still use six months as the benchmark, and the table shows the gaps: one day for the included API logs, a default between 30 days and a year for paid ones depending on the source, and no stated period for the Data 360 logs. Longer is not automatically better, though. Logs tied to named users show who asked what and when, which in Germany makes them a works council topic. See [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/).

## Worked example: three requests in one quarter

Assume a machine builder with 90 dealers, an Agentforce service agent in the dealer portal that answers warranty status questions and opens claims, and 25 service back office users working with Claude Enterprise through hosted MCP. The company has not bought Event Monitoring. All numbers are assumptions.

**Week 3, data protection.** The DPO asks where the names of dealer staff end up: in the audit trail, which stores the response unmasked, and in the step inputs and outputs of Session Tracing. Because Salesforce documents no retention period, the company sets six months as its target and first clarifies with Salesforce how deletion can be enforced in Data 360. IT also starts a daily export of the API logs into the SIEM that rechecks the last three days, because Salesforce can deliver or replace daily files up to three days later.

**Week 7, works council.** The agreement allows monthly reports aggregated by department; person-level analysis is allowed only after a security incident, with the works council informed.

**Week 11, a dealer complaint.** A dealer says a competitor knew his net prices. Who read his price agreement through MCP in the past 40 days? Without the export, only yesterday's file would still be available. With the export, filtering on `SALESFORCE_HOSTED_MCP` returns three users from dealer management who accessed the price agreement object, and the investigation moves on to those users.

## Switch on audit data and tracing before the first conversation

1. **Switch on audit data collection and tracing** before the first productive conversation. There is no backfill.
2. **Write a log inventory**: question answered, owner, readers, retention, deletion.
3. **Decide on API logs**: a regular export into your SIEM or paid Event Monitoring. Salesforce says these files are not a system of record and can contain gaps or duplicates. I did not find the price on any page I opened; ask your account executive.
4. **Track the fields agents write**, such as warranty status and approved amount.
5. **Version agent definitions** outside Setup.
6. **Settle the works agreement and the DPO's deletion concept together**, because both are about the same logs.

For the inventory, a table with one row per log and the columns from point 2 is enough to begin with. A log inventory with owners is part of my work on [Salesforce architecture](../../services/salesforce-architecture/).
