---
title: "MCP and Salesforce explained for IT leads"
description: "What MCP means in Salesforce and the four decisions an IT lead has to make: which servers, which users, which data and which AI clients and agents to allow."
pubDate: 2026-10-27
lang: en
slug: mcp-salesforce-explained-for-it-leads
translationKey: mcp-explained-salesforce-it-leads
topic: data
categories: [ai]
tags: [mcp, salesforce integration, claude, security, it governance, manufacturing]
takeaways:
  - "MCP (Model Context Protocol) is an open protocol through which AI applications such as Claude, ChatGPT, Cursor or Agentforce call tools in other systems, Salesforce included."
  - "The MCP specification states that the protocol cannot enforce its own security principles; the controls sit in the AI application, in the server and in Salesforce permissions."
  - "Salesforce Hosted MCP Servers are off by default, run every call as the named user and offer no service accounts, so your sharing model becomes the boundary."
  - "An IT lead decides four things: which MCP servers are enabled, which users may connect, which data the tools reach and which AI clients and agents are approved."
  - "A safe start is the read-only sobject-reads server in a sandbox, one approved AI client and small custom servers per role instead of one server with every tool."
faq:
  - q: "What is MCP in Salesforce?"
    a: "MCP is an open protocol through which AI applications call tools in other systems. In Salesforce it is used in three directions: external AI tools reach Salesforce through Hosted MCP Servers, Agentforce calls external tools as an MCP client, and coding agents work on sandboxes through local servers."
  - q: "Can Claude or ChatGPT change Salesforce data through MCP?"
    a: "Yes, if an admin enables a server with write tools such as SObject Mutations and the user has edit rights. Starting with the SObject Reads server rules out changes. Salesforce in Claude asks the user to approve each change by default."
  - q: "Can employees connect their own AI tool to Salesforce via MCP?"
    a: "Not without IT. Every client needs an External Client App that an admin creates, and Salesforce does not support dynamic client registration for Hosted MCP Servers."
  - q: "Does Salesforce log what an AI tool did through MCP?"
    a: "Yes. Every tool call is attributed to the named user in the audit trail, and API logs can be filtered by API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP. The question the user typed stays in the AI application, so its logs matter too."
  - q: "Can a nightly agent without a user work through Hosted MCP?"
    a: "No. Hosted MCP has no service accounts and no machine-to-machine flows. Unattended agents need the Agent API with client credentials and a run-as user, or a classic integration."
draft: false
---

MCP in Salesforce means that AI tools such as Claude, ChatGPT or Cursor, and Agentforce itself, call Salesforce functions or external tools through one shared open protocol. The protocol carries the calls but enforces almost nothing. What an AI client may do in your org follows from four decisions an IT lead makes: which MCP servers are switched on, which users may connect, which data the tools reach and which AI clients and agents are approved. I would start read-only, with one approved client and small servers per role.

## What is MCP, explained without the developer detail?

The Model Context Protocol (MCP) is an open protocol that standardises how AI applications connect to tools and data. The [specification](https://modelcontextprotocol.io/specification/latest) uses JSON-RPC 2.0 messages and names the Language Server Protocol as its model: LSP lets any code editor support any programming language, and MCP lets any AI application use any tool that speaks the protocol.

Three roles matter, according to the [architecture overview](https://modelcontextprotocol.io/docs/learn/architecture):

- **Host:** the AI application the user works in, for example Claude, ChatGPT, Cursor or Agentforce.
- **Client:** a component inside the host that holds the connection to exactly one server.
- **Server:** the program that offers tools, for example a Salesforce Hosted MCP Server.

A server offers tools the AI can execute (a query, a record update, a Flow), resources with context data and prompt templates. The model decides during the conversation which tool it calls. Servers run locally on the user's machine or remotely over HTTP, where the protocol recommends OAuth.

One sentence in the overview is worth reading twice: MCP covers only the exchange of context and does not dictate how the AI application uses the model or the context. Where your CRM data goes once Claude or ChatGPT has read it is a question for your contract with the AI vendor.

## Where does MCP show up in a Salesforce org?

For an IT lead three directions are enough:

1. **External AI to Salesforce.** Claude, ChatGPT or Cursor read and change records through Salesforce Hosted MCP Servers, [generally available since 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition and above. Salesforce in Claude, covered in [AIforce: Salesforce in Claude and Slack](../aiforce-salesforce-in-claude-and-slack/), uses the same path.
2. **Agentforce to external tools.** Agentforce acts as MCP client. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce), external servers are registered in Agentforce Registry, MuleSoft and Salesforce servers in API Catalog, and the admin picks the tools an agent may use. Salesforce [announced the client as a pilot](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce) for July 2025; I found no current status statement, so check availability in your org.
3. **Coding agents to your project.** Your partner's developers connect Claude Code, Cursor or Agentforce Vibes to sandboxes through local servers such as the Salesforce DX MCP Server. What changes there is in [the end of the Salesforce DX MCP Server](../salesforce-dx-mcp-server-end-of-life/).

The full interface overview with Agent API, Models API and the ERP path through MuleSoft is in [chapter 3 of my AI masterclass](../../ai-masterclass/mcp-and-interfaces/).

## What does the protocol leave to you?

The MCP specification is honest about its limits. Under Security and Trust & Safety it says that hosts must obtain explicit user consent before invoking any tool and that tool descriptions should be treated as untrusted unless they come from a trusted server. Then it adds that MCP "cannot enforce these security principles at the protocol level". The [tools section](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) asks for a human in the loop who can deny a tool call.

So the controls sit outside the protocol: in the AI application (does it ask before writing?), in the server (which tools does it offer?) and in Salesforce (which records may this user see?). Salesforce made the last part strict. According to the [Hosted MCP security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html), servers are disabled by default, every tool call runs with the permissions of the user who authorised the connection and appears under that user's name in the audit trail, and there are no service accounts or machine-to-machine flows.

One detail matters for audits. By design, servers receive only the context they need and the full conversation stays with the host, according to the [specification's design principles](https://modelcontextprotocol.io/specification/2026-07-28/architecture). My reading: Salesforce logs which records Claude read, not the question the user typed. To reconstruct why a warranty case was changed, you need the AI application's logs too.

## Four decisions for the IT lead

### 1. Which MCP servers do you allow?

Salesforce lists seven standard servers in its [server reference](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html): four for sObjects (all, reads, mutations, deletes), Data 360, Tableau Next and Headless 360, which is still beta and reaches into Setup. Their tool sets cannot be modified. [Custom servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html) expose your own Flows, invocable Apex, Apex REST and API Catalog endpoints, each under its own URL. Salesforce warns that beyond a few dozen tools an AI client struggles to pick the right one and recommends focused, persona-specific servers.

Community servers from npm or GitHub are the third option. The MCP project's own [security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) warn that local servers run with the same privileges as the client and can execute arbitrary code. Against production I would allow only servers that Salesforce operates.

### 2. Which users may connect?

Because every call runs as the named user, your sharing model becomes the boundary. If service agents can see dealer price agreements because sharing was opened years ago, a chat window shows them in seconds. Salesforce lets you link the External Client App to specific profiles and permission sets, so MCP access can be its own permission set instead of a side effect of a profile. In the pilot I would keep admins and users with View All Data out of MCP entirely.

### 3. Which data may the tools reach?

Start with `sobject-reads`, the read-only server that Salesforce calls "a great place to start". I would run it in a sandbox first. The next level is narrower than any standard server: Named Queries release predefined SOQL instead of free queries, and a Flow "machine history by serial number" returns exactly the fields a service agent needs. The MCP project lists wildcard scopes as a common mistake, and the same logic applies to tools. Order status, stock and prices from SAP or proALPHA stay behind a deterministic API, as described in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/).

### 4. Which AI clients and agents do you approve?

Salesforce names [Claude, ChatGPT, Cursor and Postman](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/setup-overview.html) as clients. Each client is registered as an External Client App with a callback URL specific to that client, created by an admin; dynamic client registration is not supported. So no employee connects a new AI tool without IT, and every External Client App is a decision about a vendor, a contract and a data flow.

For Salesforce in Claude, which is still a beta that Salesforce has to approve for your organisation, [Anthropic's setup guide](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization) gives Claude owners an installation preference per group, each member signs in with their own Salesforce account, and by default Claude asks before each change is written. For Agentforce as client, Trailhead says the Einstein Trust Layer applies and Agentforce Gateway policies can limit how often an agent calls a tool. For external clients reading your data I found no comparable statement; that gap is the topic of [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/).

## A typical scenario: four MCP requests in one month

Assume a machine builder with Sales Cloud, Service Cloud, a dealer portal and SAP. All numbers are assumptions. Within one month IT receives four requests:

- **After-sales:** 20 people in the service back office want to ask Claude about open cases, installed machines and warranty status. Decision: pilot. A custom server with three tools (open cases per account, machine history per serial number as a Flow, warranty status as a Named Query), linked to a dedicated permission set and tested in a sandbox first.
- **Sales operations:** wants ChatGPT to update opportunities after dealer visits. Decision: later. A second AI vendor means a second contract review, and write access waits until the read pilot has run for eight weeks.
- **Implementation partner:** wants a community MCP server with a production login to fix data faster. Decision: no. Partners work in sandboxes, and production changes go through the pipeline. This belongs in the contract, see [partners using AI coding: contract rules](../partners-using-ai-coding-contract-rules/).
- **Spare parts:** wants an Agentforce agent that queries a parts supplier's MCP server for availability. Decision: test. Register the server in Agentforce Registry, release two tools, set a Gateway limit, and check the supplier's terms for what happens to your queries.

One pilot, one deferral, one refusal and one test. That beats four tools connected without anyone deciding.

## Where is MCP the wrong interface?

Hosted MCP Servers are built for a person working with an AI tool. Three cases need a different path:

- **Unattended agents.** A nightly job that pre-sorts warranty claims has no user who could authorise it. The [Agent API](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html) works with client credentials and a run-as user, which I would treat like any integration user.
- **System-to-system integration.** The SAP order sync belongs in middleware.
- **Mass operations.** Checking thousands of records is a report or a batch job. Salesforce says hosted servers are ["intended only for customers with Flex Credits"](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) and usage may be billed; why that becomes a budget line is in [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

Which interface fits which consumer, under which identity, is part of my work on [Salesforce integration](../../services/salesforce-integration/).

MCP makes Salesforce reachable for every AI tool, and your decisions on servers, users, data and clients determine whether that helps your service teams or exposes your data. If you want a second opinion on your first MCP requests, [send me a message](#contact).
