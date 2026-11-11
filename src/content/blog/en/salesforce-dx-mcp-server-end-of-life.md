---
title: "Salesforce DX MCP Server end of life: what to change"
metaTitle: "Salesforce DX MCP Server end of life: what replaces it"
description: "Salesforce stopped supporting the local DX MCP Server on November 2, 2026. What still works, why @latest must go, and how partners move to Salesforce skills."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: salesforce-dx-mcp-server-end-of-life
translationKey: salesforce-dx-mcp-server-end-of-life
topic: devops
categories: [devops, ai]
tags: [mcp, salesforce dx, claude code, agentforce vibes, partner governance, devops]
takeaways:
  - "Since November 2, 2026 the server is no longer maintained and both repositories are archived. Version 0.30.15 stays installable."
  - "Salesforce's setup guide configures the server with @latest. Remove @latest, pin 0.30.15, but only as a temporary exception, and set a date to remove the entry."
  - "With ALLOW_ALL_ORGS, an AI agent reaches every logged-in org, including production. With DEFAULT_TARGET_ORG it works in whichever org is currently the default."
  - "Salesforce points to skills (sf-skills). The Claude Code plugin packages them; Hosted MCP covers data and actions, but it is not a drop-in replacement."
  - "The plugin's Metadata API context tools are part of a beta service that an admin must activate, and their calls count against the API quota."
faq:
  - q: "What happened to the Salesforce DX MCP Server on 2 November 2026?"
    a: "The local server @salesforce/mcp reached end of life. According to GitHub issue 46 it is no longer maintained or supported, no further releases will ship, and both repositories are archived. npm marks the package as deprecated; the last version is 0.30.15 from July."
  - q: "Do existing DX MCP configurations stop working after 2 November?"
    a: "No, they keep working for now. Salesforce says the package stays installable, so existing and pinned setups with 0.30.15 keep working. But there will be no fixes, including security fixes, so continued use should be a temporary exception with a removal date."
  - q: "What is the official replacement for the Salesforce DX MCP Server?"
    a: "Salesforce's end-of-life notice says Salesforce tooling is now delivered as skills and points to the sf-skills library. The Claude Code plugin for Salesforce development packages skills and further tools. Hosted MCP Servers cover reading data and running actions from external AI clients, but they do not replace local deploy and test tools."
  - q: "Does the end of life affect Agentforce Vibes?"
    a: "Salesforce's Vibes documentation says the DX MCP Server ships with Agentforce Vibes and is enabled by default in Code Builder; when I checked, it did not mention the end of life. Ask your partner and your Salesforce contact which setup Vibes has used since 2 November."
draft: false
---

Salesforce stopped maintaining and supporting the local Salesforce DX MCP Server on 2 November 2026. Version 0.30.15 stays installable, but no further releases will ship, both repositories are archived, and Salesforce points to skills instead. If your implementation partners use Claude Code, Cursor, Copilot or Agentforce Vibes with your orgs, some of those partners probably still run the server. Have them list every place where it is configured, remove the setting that always loads the latest version, and move the relevant work to the Salesforce CLI with skills. The org access it runs with is more important than the tool itself.

## What exactly ended on 2 November 2026?

The READMEs in the issue repository [forcedotcom/mcp](https://raw.githubusercontent.com/forcedotcom/mcp/main/README.md) and the source repository [salesforcecli/mcp](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) show the same banner: "End of Life: November 2nd, 2026". They point to [GitHub issue 46](https://github.com/forcedotcom/mcp/issues/46) for details: after that date the server "is no longer maintained or supported, and no further releases will be shipped". Both repositories are archived as read-only, and the package stays installable, so existing and pinned setups with 0.30.15 keep working. For what comes next, the issue says Salesforce tooling is now delivered as skills and points to sf-skills.

On 2 November 2026 the npm registry marked the package as deprecated with the note "The Salesforce DX MCP Server has been deprecated" and a link to issue 46. No new version followed: 0.30.15 from 9 July 2026 is the last one (checked on 9 November 2026).

What I had checked earlier, on 27 October 2026:

- The [npm registry](https://registry.npmjs.org/@salesforce/mcp) lists 0.30.15 from 9 July 2026 as the latest version. No version carries a deprecation flag yet. Since April 2025 Salesforce has published 121 versions including pre-releases, roughly one every four days.
- The Salesforce DX developer guide still describes the server [without any end-of-life notice](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_mcp_server.htm). Its sample configuration always loads the latest version ("so you always get the latest version"), so new versions install automatically.
- The [Agentforce Vibes documentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-mcp-servers.html) says the DX MCP Server ships with Vibes and is "installed and enabled by default in Code Builder".

Before the date, the end of life was announced only in the README banner; none of the three documentation pages above mentioned it. That combination is the risk. A server that updates itself, configured on machines you do not control, has lost its support while the setup guides still describe it. No new versions will arrive, which also means no fixes, and an @latest entry hides the fact that nobody has decided which version should run.

Compare that with the [retirement policy for Hosted MCP Servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/end-of-life.html): each version is supported for at least three years, with at least one year's notice before support ends. For the local server I found no comparable commitment.

```zeitleiste
2025-04 | First versions of the DX MCP Server on npm
2026-04-29 | Hosted MCP Servers generally available
2026-07-09 | Version 0.30.15, the latest so far
2026-08-19 | Claude Code plugin announced
2026-11-02 | End of life of the local DX MCP Server, per README
```

## A developer tool with org access is an IT lead's problem

MCP (Model Context Protocol) is the open standard through which an AI tool calls functions in another system. The DX MCP Server gives a coding agent more than 60 such functions for your Salesforce orgs. It runs on the developer's laptop and uses the orgs that developer has already logged into with the Salesforce CLI. Which orgs the agent may touch is set by one start setting. The [README](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) lists the values:

- **Allow all orgs** opens every org authorised on the machine, and Salesforce adds "Use this value with caution."
- **Default target org** is resolved again for every tool call. If the developer switches the default org, the agent works in the new one without warning.
- **Explicit usernames or aliases** restrict the server to named orgs. This is the only setting I accept for agents, preferably with usernames, because an alias can be repointed to another org.

The tools controlled by that setting are not harmless. One tool deploys to an org, another assigns permission sets, including on behalf of other users, and another reads data. Telemetry is on by default. A partner developer who supports your production org on Monday and builds in a sandbox on Tuesday may have both orgs on the same laptop.

For a manufacturer, the production org holds dealer price agreements, warranty claims, the installed base and service contracts. You would not give an integration user broad rights without a review. An AI agent with a developer's login deserves the same scrutiny, and the end of life is a good occasion to apply it. How MCP fits into your architecture overall is the topic of [MCP in Salesforce, explained for IT leads](../mcp-salesforce-explained-for-it-leads/).

## What replaces the Salesforce DX MCP Server?

Salesforce's end-of-life notice points in one direction: skills. Alongside skills, Salesforce published three building blocks in 2026. The [plugin announcement](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) of 19 August 2026 does not mention the DX MCP Server, and Hosted MCP is not a drop-in replacement for local deploy and test tools. How the old tasks map to them is my own reading:

```tabelle
title: What takes over which task (my reading)
columns: Task | With the local DX MCP Server | Option now
Deploy, retrieve, run tests | MCP tools on the laptop | Salesforce CLI plus skills from sf-skills *
Metadata knowledge, Apex and SOQL support | MCP tools on the laptop | Claude Code plugin for Salesforce development *
Read records for context | Query tool on the laptop | Hosted MCP server for reading records *
```

**sf-skills** is an open library of more than 100 skills. The [sf-skills README](https://raw.githubusercontent.com/forcedotcom/sf-skills/main/README.md) shows a one-line installation command for Codex, Cursor and Claude Code; in Agentforce Vibes the skills are installed and updated automatically. The README warns that skills "may be renamed, restructured, or removed between releases" and do not carry the stability guarantees of GA APIs. So I would treat them like any other dependency: pin a version and review changes.

**The Claude Code plugin** bundles about 40 of these skills plus three MCP servers: one for API context, one for metadata knowledge and one for language support in the editor. The first two run on Salesforce infrastructure. According to the [Metadata API guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_salesforce_api_mcp_intro.htm), the Metadata API context tools on the API Context server are part of a beta service under the Beta Services Terms, require Hosted MCP to be set up in the org first, and have calls that count against your API quota. Your admin has to enable this, which means your legal and IT teams should know they are approving a beta service.

**Hosted MCP Servers** have been [generally available since 29 April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) for Enterprise Edition and above. According to the [security best practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) they are off by default, every call runs with the rights of the user who authorised the connection, and there are no service accounts. I cover who may read what through them in [Hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/), and why the calls will become a cost item in [MCP calls as a budget risk](../flex-credits-agentforce-cost-per-action/).

## Worked example: three partners, one deadline

Assume a machine builder with Service Cloud, Field Service and SAP S/4. Three partners work on the same orgs: one for service and field service, one for the SAP integration, one for the dealer portal. All numbers below are assumptions to show the method.

The IT lead asks each partner for a written answer to one question: where is the DX MCP Server configured? The answers show 14 developers, nine of whom have the server in a configuration file. Two run it with access to all orgs on the machine. One of those two also has the production org authorised on his laptop because he handles hotfixes. The service partner has checked a shared configuration file into the client repository that always loads the latest version, so every new developer gets it automatically. The portal agency works in Agentforce Vibes and had not looked at its MCP settings at all.

None of this is negligence. It is what happens when a tool spreads through partner teams without anyone on the client side taking ownership of it. The fixes are short: the shared file is pinned to 0.30.15 and configured with explicit sandbox aliases, the hotfix developer separates his production login from agent work, and the portal agency checks which MCP settings Vibes enables. Then the service partner tests the plugin and skills in a development sandbox for two weeks, the client's admin activates the hosted servers there and only there, and the old entry is deleted from the repository.

The decision I would expect to take longest is who approves hosted servers in production. I would leave production out until there is a concrete need.

## What should you ask your partners now?

1. **Inventory.** Ask every partner which machines, repositories and tools run the DX MCP Server. Each tool keeps the setting in its own file; the box below shows where to look.
2. **Remove or pin.** Stop new installations and remove every entry that loads the latest version. Where the server cannot be removed immediately, pin the fixed version 0.30.15 as a temporary exception for named sandboxes, with an owner and a removal date. A pinned version keeps the setup stable, but it gets no fixes.
3. **Lock the orgs.** Named sandboxes only, no access to all orgs, no production. Deployments to production go through the pipeline, as described in [partners coding with AI: what belongs in the contract](../partners-using-ai-coding-contract-rules/).
4. **Activate hosted servers deliberately.** Activate them in a sandbox first, with the read-only server before any server that writes and with an External Client App restricted to a permission set.
5. **Update the repository.** The shared MCP configuration and the [AI rules file](../ai-rules-file-salesforce-repository/) belong in your repository and should be changed through a reviewed pull request, like any other code. Claude Code also supports organisation-managed MCP configuration with allowlists, if you license it centrally.

```vertiefung For developers
title: Where the DX MCP Server is configured and how to pin it
- **Package:** `@salesforce/mcp`; pin `@salesforce/mcp@0.30.15` instead of `@salesforce/mcp` or `@salesforce/mcp@latest`.
- **Org access:** start flag `--orgs` with explicit aliases, never `ALLOW_ALL_ORGS` or `DEFAULT_TARGET_ORG` for agents.
- **Claude Code:** `claude mcp list`; [project-scoped servers](https://code.claude.com/docs/en/mcp) in `.mcp.json` in the repository, local and user-scoped ones in `~/.claude.json`.
- **Other tools:** VS Code uses `.vscode/mcp.json`; Cursor and Cline use their own files.
- **Replacements:** `npx skills add forcedotcom/sf-skills`, the plugin `salesforce-development` with the servers `salesforce-api-context`, `salesforce-metadata-experts` and `salesforce-lsp`, the hosted server `sobject-reads`.
```

This is ordinary dependency and access management applied to AI tools, and it belongs in [DevOps and release management](../../services/devops-release-management/) on the client side. The other interfaces are covered in [chapter 3 of the masterclass](../../masterclass/ai-salesforce/mcp-and-interfaces/).
