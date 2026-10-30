---
title: "Community MCP servers for Salesforce: what to check"
description: "A partner wants a community or gateway MCP server for Salesforce. What to check before approval, and when Salesforce Hosted MCP is the safer route."
pubDate: 2026-10-27
lang: en
slug: community-mcp-servers-salesforce-risks
translationKey: community-mcp-servers-risks
topic: security
categories: [devops, ai]
contactBrief: partner-governance
tags: [mcp, community mcp server, security, claude code, partner governance, manufacturing]
takeaways:
  - "A community MCP server is third-party code that runs with a Salesforce login, so it needs the same approval as an integration, not the approval of a browser plugin."
  - "Before approval, check six things: identity, credentials, maintainer and pinned version, tool list, other tools in the same client and the target org."
  - "The precedents are real: a fake postmark-mcp package copied every email to its author from version 1.0.16, and mcp-remote had a CVSS 9.6 flaw with over 437,000 downloads."
  - "For a person working with Claude, ChatGPT or Cursor on an Enterprise Edition org, Salesforce Hosted MCP is the safer route: named user, OAuth with PKCE, off by default."
  - "Nightly or machine-to-machine jobs belong in a classic integration or the Agent API, not in a community MCP server with a stored password."
faq:
  - q: "Are community MCP servers for Salesforce unsafe?"
    a: "Not by definition, but nobody audits them for you. Anthropic states it does not security-audit or manage any MCP server, and the Salesforce security guidance covers only hosted servers. The client has to check identity, credentials, maintainer, version and tools before approving one."
  - q: "What is tool poisoning in MCP?"
    a: "Tool poisoning means hidden instructions in a tool's description, which the model reads and the user usually does not see. A related risk is a tool that changes its description after installation, so an approved server behaves differently after an update."
  - q: "When is Salesforce Hosted MCP the better choice?"
    a: "When a person works interactively with an AI client on an Enterprise Edition org or above. Every call runs as that named user, login uses OAuth with PKCE, and the servers stay off until an admin enables them. Salesforce says the servers are intended for customers with Flex Credits and usage may be billed."
  - q: "Can a community MCP server use a Salesforce username and password?"
    a: "Technically yes, but I would reject it. According to Salesforce Time, Salesforce enforces the retirement of the OAuth username-password flow on 20 February 2027, and a password in a configuration file on a laptop is the weakest credential you can have."
  - q: "How can we block unapproved MCP servers in Claude Code?"
    a: "Claude Code supports managed settings with allowedMcpServers and allowManagedMcpServersOnly, or a managed-mcp.json file with a fixed server set. Stdio servers on the allowlist must match the exact command and arguments."
draft: false
---

A community MCP server for Salesforce is third-party code that runs with a Salesforce login, so I would approve it like an integration, not like a browser plugin. Before saying yes, check whose identity it uses, where its credentials sit, who maintains it and whether the version is pinned, which tools it exposes, what else runs in the same AI client and which org it reaches. For a person working with Claude, ChatGPT or Cursor on an Enterprise Edition org, Salesforce Hosted MCP is the safer route. Nightly jobs belong in a classic integration.

## Why is a community MCP server a different risk?

MCP (Model Context Protocol) lets an AI client call tools in other systems; the basics are in [MCP for IT leads](../mcp-salesforce-explained-for-it-leads/). A community server is one that neither Salesforce nor your AI vendor operates: an npm package, a GitHub project or a commercial gateway that connects several systems through one OAuth app.

Nobody reviews these servers for you. Anthropic writes in its [Claude Code security page](https://code.claude.com/docs/en/security) that it "does not security-audit or manage any MCP server" and encourages "either writing your own MCP servers or using MCP servers from providers that you trust". The [Hosted MCP security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) from Salesforce cover only its own servers.

Two incidents outside Salesforce show what can go wrong:

- **A fake package.** The Hacker News [reported in September 2025](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html) that the npm package `postmark-mcp` copied the name of the official Postmark library. According to Koi Security, which found it, version 1.0.16 quietly sent a BCC of every email to the author's server. It had 1,643 downloads before it was removed.
- **A flaw in a bridge.** The `mcp-remote` package, which connects local clients to remote servers, had a vulnerability rated CVSS 9.6, found by JFrog and [reported by The Hacker News](https://thehackernews.com/2025/07/critical-mcp-remote-vulnerability.html). A malicious server could run commands on the developer's machine. Versions 0.0.5 to 0.1.15 were affected, the package had more than 437,000 downloads, and 0.1.16 fixed it.

I found no published incident with a Salesforce community server. The risk is the same, though, because a developer laptop with a Salesforce login is exactly what such a package reaches.

The tool descriptions add a quieter risk. Simon Willison, citing Invariant Labs, describes [tool poisoning](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/), where "malicious instructions are tucked away in the tool descriptions themselves", and quotes Elena Cross: "MCP tools can mutate their own definitions after installation." A server you reviewed in March can behave differently after an update in May.

## Which checks belong before approval?

I would ask the partner or developer for written answers to six questions before anyone installs the server.

| Check | Question | Red flag |
|---|---|---|
| Identity | Which Salesforce user does the server act as? | One shared integration user for many people, or an admin |
| Credentials | How does it log in, and where is the secret stored? | Username, password and security token in a `.env` file |
| Maintainer and version | Who maintains it, and which exact version is installed? | One maintainer, no security policy, `@latest` |
| Tools | Which tools does it offer, and which of them write or delete? | Free SOQL, Apex execution, delete tools |
| Combination | What else runs in the same client? | Web access or email tools next to CRM data |
| Target org | Sandbox or production, with which data? | Production login on a developer laptop |

**Identity.** Hosted MCP runs every call as the named user, so the audit trail shows a person. A server or gateway that logs in once with a technical user turns this around: your logs show "integration user read 4,000 cases", and nobody can say on whose behalf.

**Credentials.** A server that logs in with username, password and security token has two problems. The secret sits on a laptop, and according to [Salesforce Time](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) Salesforce enforces the retirement of the OAuth username-password flow on 20 February 2027. More on that deadline in [password-based integrations end in 2027](../salesforce-password-integrations-end-2027/). A gateway that stores refresh tokens for your org is a third party holding long-lived access, the pattern behind the Salesloft Drift breach covered in [connected apps and OAuth lessons](../connected-apps-oauth-ai-integrations/).

**Maintainer and version.** Pin an exact version and review the change before every update. The postmark case shows why: the harmful code came with one specific version.

**Tools.** Get the full tool list with descriptions. A server that offers one read tool for open cases is a different decision from one that runs arbitrary SOQL or anonymous Apex.

**Combination.** Willison's [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) is private data, untrusted content and a way to send data out. He writes that MCP "encourages users to mix and match tools from different sources". At a machine builder, case descriptions from the dealer portal or warranty forms are untrusted content, see [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

**Target org.** Coding agents work in sandboxes. Production changes go through the pipeline, which belongs in the contract, see [partners using AI coding: contract rules](../partners-using-ai-coding-contract-rules/).

```vertiefung For developers
title: How does Claude Code help with pinning and new servers?
In Claude Code, an allowlist entry for a local server must match the [exact command and arguments](https://code.claude.com/docs/en/managed-mcp), so an entry with `pkg@1.4.2` blocks any other version. That is my reading of the matching rule, and it turns pinning into something you can enforce.

Claude Code asks for trust verification when a new MCP server appears, but its security page notes this is disabled in non-interactive runs with `-p`, so a server added to a CI job gets no prompt.
```

## When is Salesforce Hosted MCP the safer route?

Salesforce Hosted MCP Servers are [generally available since 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for every Enterprise Edition org and above. For a person who works interactively with Claude, ChatGPT or Cursor, they answer most rows of the table: no third-party code on the laptop, every call under the named user, OAuth with PKCE, servers off until an admin enables them, MCP traffic filterable in the API logs, and an `mcp_api` scope that gives "access to MCP, but not our existing REST APIs". What each user may read is covered in [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/).

Hosted MCP has limits that drive people to community servers:

- **No machine-to-machine access.** The security guide says: "There are no service accounts, no machine-to-machine flows". A nightly agent cannot use it.
- **Edition and cost.** The [overview](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) says the servers are "intended only for customers with Flex Credits and you may be billed for server usage". Why that becomes a budget line is in [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

Neither limit makes a community server the answer. A nightly job is an integration with its own user and the client credentials or JWT flow. When Agentforce is the client, [Trailhead](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce) describes registering third-party servers in Agentforce Registry, selecting tools and limiting calls through Agentforce Gateway. That governs the agent's side; the server behind it still needs the six checks.

## A typical scenario: three requests from the partner team

Assume a machine builder with Sales Cloud, Service Cloud, a dealer portal and SAP, Enterprise Edition with Flex Credits, and an implementation partner with six developers. All numbers are assumptions.

**Request 1.** A developer wants a community Salesforce server from npm in Claude Code, logged in with the integration user's password, to analyse duplicate assets in the full-copy sandbox. Decision: no to the password and the shared user. He gets `sobject-reads` through Hosted MCP in that sandbox under his own sandbox user.

**Request 2.** The service back office wants a commercial gateway that connects ChatGPT to Salesforce and SAP through one OAuth app. Decision: deferred. The gateway would hold refresh tokens for the org, and all 25 users would appear as one technical user. The Salesforce part runs through Hosted MCP, and the SAP part waits for the contract review of the gateway vendor.

**Request 3.** The partner proposes a community server for a nightly agent that compares dealer stock with SAP. Decision: no MCP. This is an integration with a run-as user and client credentials, built like the order status in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/).

All three needs get met, and no community server reaches the org.

## Where should you start?

1. **Inventory.** Ask every partner which MCP servers are configured in their clients for your orgs, including versions. The DX MCP server deadline is a good occasion, see [the end of the Salesforce DX MCP Server](../salesforce-dx-mcp-server-end-of-life/).
2. **Put the rule in writing.** Hosted or Salesforce-operated servers by default; community servers only after the six checks, in sandboxes, with a pinned version.
3. **Enforce it where you can.** If you license Claude Code centrally, [managed settings](https://code.claude.com/docs/en/managed-mcp) with `allowedMcpServers` and `allowManagedMcpServersOnly` block every server that is not on your list.
4. **Review on every update.** A new version is a new approval.

Steering partners on tools like this is part of my [partner governance](../../services/partner-governance/) work, and the interface overview is in [chapter 3 of the masterclass](../../masterclass/ai-salesforce/mcp-and-interfaces/).

A community MCP server earns approval only when you can name its user, its secret, its maintainer and its version.
