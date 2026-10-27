---
title: "Salesforce DX MCP Server end of life: what to change"
description: "The local Salesforce DX MCP Server reaches end of life on 2 November 2026. What IT leads should ask partners: inventory, pinning, skills, plugin, Hosted MCP."
pubDate: 2026-10-27
lang: en
slug: salesforce-dx-mcp-server-end-of-life
translationKey: salesforce-dx-mcp-server-end-of-life
topic: devops
categories: [devops, ai]
tags: [mcp, salesforce dx, claude code, agentforce vibes, partner governance, devops]
takeaways:
  - "The official README of the local Salesforce DX MCP Server (@salesforce/mcp) states that it reaches end of life on 2 November 2026; on 27 October npm still served 0.30.15 without a deprecation flag."
  - "Salesforce's own setup guide configures the server with @latest and says it then updates automatically, so every partner machine should pin 0.30.15 until the old entry is removed."
  - "The server works with every org a developer has logged into through the Salesforce CLI; ALLOW_ALL_ORGS or DEFAULT_TARGET_ORG can let an AI agent reach production without anyone noticing."
  - "Salesforce offers the open sf-skills library, a Claude Code plugin and Hosted MCP servers, but does not call them successors in the sources I could open; treating them as such is my reading."
  - "Two of the plugin's MCP servers run on Salesforce infrastructure and must be activated in your org by a client-side admin; one of them is a beta service whose calls count against the org's API quota."
faq:
  - q: "What happens to the Salesforce DX MCP Server on 2 November 2026?"
    a: "According to the README in both Salesforce repositories, the local server @salesforce/mcp reaches end of life on that date. The details are in GitHub issue 46, which I could not open, so what exactly happens to the repository and the npm package afterwards is unconfirmed."
  - q: "Will existing DX MCP configurations stop working on 2 November?"
    a: "Nobody outside Salesforce can say that yet. On 27 October 2026 the npm registry still served version 0.30.15 without a deprecation flag. I would pin that version now so that nothing changes by surprise, and plan to remove the entry within a few months."
  - q: "Is the Salesforce Claude Code plugin the official replacement?"
    a: "The plugin announcement of 19 August 2026 does not mention the DX MCP Server or its end of life. The plugin, the sf-skills library and Hosted MCP cover most of the same work, but calling them successors is my reading, not a Salesforce statement."
  - q: "Does the end of life affect Agentforce Vibes?"
    a: "Salesforce's Vibes documentation says the DX MCP Server ships with Agentforce Vibes and is enabled by default in Code Builder, and it did not mention the end of life when I read it. Ask your partner and your Salesforce contact which setup Vibes will use after 2 November."
draft: false
---

The local Salesforce DX MCP Server (`@salesforce/mcp`) reaches end of life on 2 November 2026, according to the official README. If your implementation partners use Claude Code, Cursor, Copilot or Agentforce Vibes on your orgs, some of them probably run it. Before the date, have them list every place it is configured, pin version 0.30.15 instead of `@latest`, and move the work to the Salesforce CLI with skills, the Claude Code plugin and Hosted MCP. The bigger question for you is not the tool but the org access it runs with.

## What exactly ends on 2 November 2026?

The README of the issue repository [forcedotcom/mcp](https://raw.githubusercontent.com/forcedotcom/mcp/main/README.md) and of the source repository [salesforcecli/mcp](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) carries the same banner: "End of Life: November 2nd, 2026". It points to GitHub issue 46 for details. I could not open that issue, so I cannot tell you whether the repositories become read-only, whether the package will be marked deprecated or whether security fixes stop on the day.

What I could check on 27 October 2026:

- The [npm registry](https://registry.npmjs.org/@salesforce/mcp) lists 0.30.15 from 9 July 2026 as the latest version. No version carries a deprecation flag yet. Since April 2025 Salesforce has published 121 versions including pre-releases, roughly one every four days.
- The Salesforce DX developer guide still describes the server [without any end-of-life notice](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_mcp_server.htm). It configures the package with `@latest` "so you always get the latest version" and says new versions install automatically.
- The [Agentforce Vibes documentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-mcp-servers.html) says the DX MCP Server ships with Vibes and is "installed and enabled by default in Code Builder".

That combination is what I would plan around. A server that updates itself, configured on machines you do not control, reaches the end of support while the DX developer guide and the Vibes documentation do not mention it. Whatever Salesforce publishes to npm after the date lands on those machines without anyone deciding it.

Compare that with the [retirement policy for Hosted MCP Servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/end-of-life.html): each version is supported for at least three years, with at least one year's notice before support ends. For the local server I found no comparable commitment.

## Why is a developer tool an IT lead's problem?

MCP (Model Context Protocol) is the open standard through which an AI tool calls functions in another system. The DX MCP Server gives a coding agent more than 60 such functions for your Salesforce orgs. It runs on the developer's laptop and uses the orgs that developer has already logged into with the Salesforce CLI. Which orgs the agent may touch is set by one flag, `--orgs`, when the server starts. The [README](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) lists the values:

- `ALLOW_ALL_ORGS` opens every org authorised on the machine, and Salesforce adds "Use this value with caution."
- `DEFAULT_TARGET_ORG` is resolved again on every tool call. If the developer switches the default org, the agent works in the new one without a warning.
- Explicit usernames or aliases fix the server to named orgs. This is the only setting I accept for agents.

The tools behind that flag are not harmless. `deploy_metadata` deploys to an org, `assign_permission_set` assigns permission sets, also on behalf of other users, `run_soql_query` reads data. Telemetry is on by default. A partner developer who supports your production org on Monday and builds in a sandbox on Tuesday may have both orgs on the same laptop.

For a manufacturer the production org holds dealer price agreements, warranty claims, installed base and service contracts. You would not give an integration user broad rights without a review. An AI agent with a developer's login deserves the same scrutiny, and the end of life is a good occasion to apply it. How MCP fits into your architecture overall is the topic of [MCP in Salesforce, explained for IT leads](../mcp-salesforce-explained-for-it-leads/).

## What replaces the Salesforce DX MCP Server?

Salesforce published three building blocks in 2026. None of the pages I opened calls them successors to the DX MCP Server. The [plugin announcement](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) of 19 August 2026 does not mention it at all. Mapping the old tasks to them is my reading:

| Task today | With the local DX MCP Server | Option after 2 November |
|---|---|---|
| Deploy, retrieve, run tests | MCP tools on the laptop | Salesforce CLI plus skills from [forcedotcom/sf-skills](https://raw.githubusercontent.com/forcedotcom/sf-skills/main/README.md) |
| Metadata knowledge, Apex and SOQL support | MCP tools on the laptop | Claude Code plugin `salesforce-development` |
| Read records for context | `run_soql_query` | Hosted MCP server `sobject-reads` |

**sf-skills** is an open library of more than 100 skills. Codex, Cursor and Claude Code install it with `npx skills add forcedotcom/sf-skills`; in Agentforce Vibes the skills are installed and updated automatically. The README warns that skills "may be renamed, restructured, or removed between releases" and do not carry the stability guarantees of GA APIs. So I would treat them like any other dependency: pin a version and review changes.

**The Claude Code plugin** bundles about 40 of these skills plus three MCP servers: `salesforce-api-context`, `salesforce-metadata-experts` and `salesforce-lsp`. The first two run on Salesforce infrastructure. According to the [Metadata API guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_salesforce_api_mcp_intro.htm), the API Context server is a beta service under the Beta Services Terms, needs Hosted MCP set up in the org first, and its calls count against your API quota. Your admin has to switch this on, which means your legal and IT teams should know they are approving a beta service.

**Hosted MCP Servers** have been [generally available since 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition and above. According to the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) they are off by default, every call runs with the rights of the user who authorised the connection, and there are no service accounts. Who may read what through them is covered in [Hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/), and why the calls will become a cost line in [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

## A typical scenario: three partners, one deadline

Assume a machine builder with Service Cloud, Field Service and SAP S/4. Three partners work on the same orgs: one for service and field service, one for the SAP integration, one for the dealer portal. All numbers below are assumptions to show the method.

The IT lead asks each partner for a written answer to one question: where is `@salesforce/mcp` configured? The answers show 14 developers, nine of them with the server in a configuration file. Two run it with `ALLOW_ALL_ORGS`. One of those two also has the production org authorised on his laptop because he handles hotfixes. The service partner has checked a shared `.mcp.json` with `@salesforce/mcp@latest` into the client repository, so every new developer gets it automatically. The portal agency works in Agentforce Vibes and had not looked at its MCP settings at all.

None of this is negligence. It is what happens when a tool spreads through partner teams without anyone on the client side owning it. The fixes are short: the shared file is pinned to 0.30.15 and gets explicit sandbox aliases, the hotfix developer separates his production login from agent work, and the portal agency checks what Vibes enables. Then the service partner tests the plugin and skills in a development sandbox for two weeks, the client's admin activates the hosted servers there and only there, and the old entry is deleted from the repository.

The decision I would expect to take longest is who approves hosted servers in production. I would leave production out until there is a concrete need.

## What should you ask your partners before 2 November?

1. **Inventory.** Ask every partner which machines, repositories and tools run `@salesforce/mcp`. For Claude Code, `claude mcp list` shows the configured servers; [project-scoped servers](https://code.claude.com/docs/en/mcp) live in `.mcp.json` in the repository, local and user-scoped ones in `~/.claude.json`. VS Code uses `.vscode/mcp.json`, Cursor and Cline their own files.
2. **Pin.** Replace `@salesforce/mcp` and `@salesforce/mcp@latest` with `@salesforce/mcp@0.30.15` and set a removal date. A pinned version keeps the bridge stable; it will not get fixes.
3. **Lock the orgs.** Explicit sandbox aliases only, no `ALLOW_ALL_ORGS`, no production. Deployments to production go through the pipeline, as described in [partners coding with AI: what belongs in the contract](../partners-using-ai-coding-contract-rules/).
4. **Activate hosted servers deliberately.** In a sandbox first, `sobject-reads` before anything that writes, with an External Client App restricted to a permission set.
5. **Update the repository.** The shared MCP configuration and the [AI rules file](../ai-rules-file-salesforce-repository/) belong in your repository and change through a reviewed pull request, like any other code. Claude Code also supports organisation-managed MCP configuration with allowlists, if you license it centrally.

This is ordinary dependency and access management applied to AI tools, and it belongs in [DevOps and release management](../../services/devops-release-management/) on the client side. The other interfaces are covered in [chapter 3 of the masterclass](../../ai-masterclass/mcp-and-interfaces/).

Use the deadline to find out which AI tools reach your orgs and with whose logins, and the server swap itself becomes a small task. If you want help running the inventory with your partners, [send me a message](#contact).
