---
title: "Community MCP servers for Salesforce: what to check"
description: "A partner wants a community or gateway MCP server for Salesforce. What to check before approval, and when Salesforce Hosted MCP is the safer route."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: community-mcp-servers-salesforce-risks
translationKey: community-mcp-servers-risks
topic: security
categories: [devops, ai]
contactBrief: partner-governance
tags: [mcp, community mcp server, security, claude code, partner governance, manufacturing]
takeaways:
  - "Before approval, check six things: identity, credentials, maintainer and pinned version, tool list, the other tools in the same client, and the target org."
  - "A fake postmark-mcp package added an outside address as a hidden BCC recipient for outgoing emails starting with version 1.0.16; mcp-remote had a CVSS 9.6 flaw."
  - "For a person using Claude, ChatGPT or Cursor, Salesforce Hosted MCP is safer if its app access and tools are restricted: named user, OAuth with PKCE."
  - "Nightly or machine-to-machine jobs belong in a classic integration, not in a community MCP server with a stored password."
faq:
  - q: "Are community MCP servers for Salesforce unsafe?"
    a: "Not by definition, but nobody security-audits them for you. Anthropic reviews connectors against listing criteria for its directory but states it does not security-audit or manage any MCP server, and Salesforce's hosted MCP security guide is not a certification of third-party servers. Your team has to check identity, credentials, maintainer, version and tools before approving one."
  - q: "What is tool poisoning in MCP?"
    a: "Tool poisoning means malicious instructions in a tool's description, which is passed to the model and, depending on the client, may not be shown prominently to the user. A related risk is a tool that changes its description after installation, so an approved server behaves differently after an update."
  - q: "When is Salesforce Hosted MCP the better choice?"
    a: "When a person works interactively with an AI client on an Enterprise Edition org or above. Every call is executed as that named user, login uses OAuth with PKCE, and the servers stay off until an admin enables them. Restrict the External Client App to pre-authorized users and enable only the tools you need. Salesforce says the servers are intended for customers with Flex Credits and usage may be billed."
  - q: "Can a community MCP server use a Salesforce username and password?"
    a: "Technically yes, but I would reject it. Salesforce retires the OAuth username-password flow on February 20, 2027, and retires SOAP API login() with username, password and security token separately in Summer '27. Whatever the deadline, a password in a configuration file on a laptop is the weakest credential you can have."
  - q: "How can we block unapproved MCP servers in Claude Code?"
    a: "Claude Code supports managed settings with allowedMcpServers and allowManagedMcpServersOnly, or a managed-mcp.json file with a fixed server set. Stdio servers on the allowlist must match the exact command and arguments."
draft: false
---

A community MCP server for Salesforce is third-party code or a third-party service with access to your Salesforce org, so I would approve it like an integration, not like a browser plugin. Before saying yes, check whose identity it uses, where its credentials are stored, who maintains it and whether the version is pinned, which tools it exposes, what else is active in the same AI client and which org it reaches. For a person working with Claude, ChatGPT or Cursor on an Enterprise Edition org, Salesforce Hosted MCP is the safer route, provided app access and tools are restricted. Nightly jobs belong in a classic integration.

## Why is a community MCP server a different risk?

MCP (Model Context Protocol) lets an AI client call tools in other systems; the basics are covered in [MCP for IT leads](/en/blog/mcp-salesforce-explained-for-it-leads/). A community server is one that neither Salesforce nor your AI vendor operates. The operating model changes the risk:

| Type | Main risk |
|---|---|
| Local npm or GitHub server on a laptop | Code runs with the developer's rights, local secrets, supply chain |
| Self-hosted remote server | Your own operation, patching, network and identity controls |
| Commercial SaaS gateway | Token custody, data leaving your perimeter, tenant separation, subprocessors |
| Salesforce Hosted MCP | Your configuration: app policy, enabled tools, user permissions |

Nobody security-audits these servers for you. Anthropic writes in its [Claude Code security page](https://code.claude.com/docs/en/security) that it reviews connectors against its listing criteria before adding them to its directory, but "does not security-audit or manage any MCP server", and encourages "either writing your own MCP servers or using MCP servers from providers that you trust". The [Hosted MCP security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) from Salesforce apply to its own hosted servers; they are not a certification of third-party servers.

Two incidents outside Salesforce show what can go wrong:

- **A fake package.** The Hacker News [reported in September 2025](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html) that the npm package `postmark-mcp` posed as a legitimate Postmark integration. According to Koi Security, which found it, version 1.0.16 added an external, attacker-controlled address as a hidden BCC recipient for outgoing emails. It had 1,643 downloads before it was removed.
- **A flaw in a bridge.** The `mcp-remote` package, which connects local clients to remote servers, had a vulnerability rated CVSS 9.6, found by JFrog and [reported by The Hacker News](https://thehackernews.com/2025/07/critical-mcp-remote-vulnerability.html). A malicious server could run commands on the developer's machine. Versions 0.0.5 to 0.1.15 were affected, the package had more than 437,000 downloads at disclosure in July 2025, and 0.1.16 fixed this vulnerability.

I found no published incident with a Salesforce community server. The incidents show risk classes that apply to Salesforce setups too, because a developer laptop with a Salesforce login is exactly where such a package is installed.

The tool descriptions add a quieter risk. Simon Willison, citing Invariant Labs, describes [tool poisoning](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/), where "malicious instructions are tucked away in the tool descriptions themselves", and quotes Elena Cross: "MCP tools can mutate their own definitions after installation." A server you reviewed in March can behave differently after an update in May.

## Approval needs six written answers first

I would ask the partner or developer for written answers to six questions before anyone installs the server.

| Check | Question | Red flag |
|---|---|---|
| Identity | Which Salesforce user does each call act as, per target system? | One shared integration user for many people, or an admin |
| Credentials | How does it log in, and where is the secret stored? | Username, password and security token in a `.env` file |
| Maintainer and version | Who maintains it, and which exact version is installed? | One maintainer, no security policy, `@latest` |
| Tools | Which tools does it offer, and which of them write or delete? | Free SOQL, Apex execution, delete tools |
| Combination | What else runs in the same client? | Web access or email tools next to CRM data |
| Target org | Sandbox or production, with which data? | Production login on a developer laptop |

**Identity.** Hosted MCP executes every call as the named user, so the audit trail shows a person. A server or gateway that logs in once with a technical user, instead of using per-user OAuth, reverses this: your logs show "integration user read 4,000 cases", and nobody can say on whose behalf the access occurred.

**Credentials.** A server that logs in with username, password and security token has two problems. The secret is stored on a laptop, and the login method is ending: according to [Salesforce Time](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) Salesforce enforces the retirement of the OAuth username-password flow on February 20, 2027, and SOAP API login(), which many libraries use for username, password and token, is retired separately with Summer '27. More on that deadline in [password-based integrations end in 2027](/en/blog/salesforce-password-integrations-end-2027/). A gateway that stores refresh tokens for your org is a third party that holds long-lived access, which is the pattern behind the Salesloft Drift breach covered in [connected apps and OAuth lessons](/en/blog/connected-apps-oauth-ai-integrations/).

**Maintainer and version.** Pin an exact version and review the change before every update. For a SaaS gateway, you usually cannot pin the server version, so ask instead whether the vendor can change functions or tool descriptions without your approval. The postmark case shows why: the harmful code was shipped with one specific version.

**Tools.** Get the full tool list with descriptions. A server that offers one read tool for open cases requires a different decision than one that runs arbitrary SOQL or anonymous Apex.

**Combination.** Willison's [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) is private data, untrusted content and a way to send data out. Willison writes that MCP "encourages users to mix and match tools from different sources". At a machine builder, case descriptions from the dealer portal or warranty forms are untrusted content, see [prompt injection in dealer portals](/en/blog/prompt-injection-dealer-portals-agentforce/).

For a commercial gateway, the six questions are not enough. Add the vendor checks you would ask of any SaaS that sees CRM data: which data, prompts and tool results leave which region, what is stored and for how long, which subprocessors and models are involved, how tokens are protected and revoked, how tenants are separated, and which audit logs you can see.

**Target org.** Coding agents work in sandboxes. Production changes go through the pipeline, and this requirement belongs in the contract, see [partners using AI coding: contract rules](/en/blog/partners-using-ai-coding-contract-rules/).

```vertiefung For developers
title: How does Claude Code help with pinning and new servers?
In Claude Code, an allowlist entry for a local server must match the [exact command and arguments](https://code.claude.com/docs/en/managed-mcp), so an entry with `pkg@1.4.2` blocks any other version string. That is my reading of the matching rule. It enforces the configured command, not a verified artifact: the `env` block is not compared, dependencies of that version can still be compromised, and it does not cover remote servers. It works as an organizational control only when it comes from managed settings.

Claude Code asks for trust verification when a new MCP server appears, but its security page notes this is disabled in non-interactive runs with `-p`, so a server added to a CI job triggers no prompt.
```

## When is Salesforce Hosted MCP the safer route?

Salesforce Hosted MCP Servers are [generally available since April 29, 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for every Enterprise Edition org and above. For a person who works interactively with Claude, ChatGPT or Cursor, they address most rows of the table: no third-party code on the laptop, every call is made under the named user, OAuth with PKCE, servers remain off until an admin enables them, MCP traffic can be filtered in the API logs, and an `mcp_api` scope grants "access to MCP, but not our existing REST APIs". This holds when the External Client App is restricted to pre-authorized users or permission sets and only the needed servers and tools are enabled; refresh token policy, IP restrictions and revocation belong in the approval too. What each user may read is covered in [hosted MCP servers and data access](/en/blog/salesforce-hosted-mcp-servers-data-access/).

Hosted MCP has limits that drive people to community servers:

- **No machine-to-machine access.** The security guide says: "There are no service accounts, no machine-to-machine flows". A nightly agent cannot use it.
- **Edition and cost.** The [overview](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) says the servers are "intended only for customers with Flex Credits and you may be billed for server usage". Why that becomes a budget line is explained in [MCP calls as a budget risk](/en/blog/flex-credits-agentforce-cost-per-action/).

Neither limit makes a community server the answer. A nightly job is an integration with its own user and the client credentials flow or JWT flow. When Agentforce is the client, [Trailhead](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce) describes registering third-party servers in Agentforce Registry, selecting tools and limiting calls through Agentforce Gateway. That governs the agent's side; the server behind it still needs the six checks.

## Worked example: three requests from the partner team

Assume a machine builder with Sales Cloud, Service Cloud, a dealer portal and SAP, Enterprise Edition with Flex Credits, and an implementation partner with six developers. All numbers are assumptions.

**Request 1.** A developer wants a community Salesforce server from npm in Claude Code, logged in with the integration user's password, to analyze duplicate assets in the full-copy sandbox. Decision: no to the password and the shared user. They receive `sobject-reads` through Hosted MCP in that sandbox under their own sandbox user.

**Request 2.** The service back office wants a commercial gateway that connects ChatGPT to Salesforce and SAP. Decision: deferred. The gateway would hold refresh tokens for the org, and its documentation does not show whether each of the 25 users receives their own token or all calls are made as one technical user. The vendor has to describe the OAuth client, token subject, run-as identity and audit trail per target system. The Salesforce part is handled through Hosted MCP, and the SAP part waits for the contract review of the gateway vendor.

**Request 3.** The partner proposes a community server for a nightly agent that compares dealer stock with SAP. Decision: no MCP. This is an integration with a run-as user and client credentials, implemented in the same pattern as the order status integration in [Agentforce and SAP order status](/en/blog/agentforce-sap-order-status-mulesoft/).

Each request has a governed next step, and no community server is granted access to the org.

## Inventory the MCP servers at every partner

1. **Inventory.** Ask every partner which MCP servers are configured in their clients for your orgs, including versions. The DX MCP server deadline is a good opportunity, see [the end of the Salesforce DX MCP Server](/en/blog/salesforce-dx-mcp-server-end-of-life/).
2. **Put the rule in writing.** Use hosted or Salesforce-operated servers by default; allow community servers only after the six checks, in sandboxes, with a pinned version.
3. **Enforce it where you can.** If you license Claude Code centrally, [managed settings](https://code.claude.com/docs/en/managed-mcp) with `allowedMcpServers` and `allowManagedMcpServersOnly` block every server that is not on your list.
4. **Review on every update.** A new version is a new approval.

For the inventory, a table with partner, server, version, user and target org is enough. Guiding partners on tools like this is part of my [partner governance](/en/services/partner-governance/) work, and the interface overview is in [chapter 3 of the masterclass](/en/masterclass/ai-salesforce/mcp-and-interfaces/).
