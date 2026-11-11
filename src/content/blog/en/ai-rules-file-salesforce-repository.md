---
title: "AI rules file for Salesforce repos: who owns it?"
description: "Why your Salesforce repository needs an AI rules file (CLAUDE.md, AGENTS.md, .vibes/rules), who on the client side owns it and what settings and CI enforce."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: ai-rules-file-salesforce-repository
translationKey: ai-rules-file-salesforce-repo
topic: devops
categories: [devops, ai]
tags: [ai coding, devops, partner governance, claude code, agentforce vibes, manufacturing]
takeaways:
  - "Once internal or partner developers start coding with agents, a shared repository needs a rules file: CLAUDE.md, AGENTS.md or rules in .vibes/rules/."
  - "The file lives in the client's repository and has a named owner there; partners propose changes through pull requests."
  - "Anthropic says Claude treats CLAUDE.md as context. Rules that must always hold belong in deny rules, hooks, pipeline gates and branch protection."
  - "Claude Code reads AGENTS.md only if there is no CLAUDE.md; a one-line CLAUDE.md that imports it keeps one shared file for all tools."
  - "Protect the rules files with CODEOWNERS, because Copilot code review reads instructions from the pull request's head branch."
faq:
  - q: "Do I need a separate AI rules file for every coding tool?"
    a: "Mostly not. One AGENTS.md serves Codex and Copilot, and Claude Code through a short CLAUDE.md that imports it. Agentforce Vibes reads .vibes/rules/ and its docs do not mention AGENTS.md, so keep a short Vibes rule and update it in the same pull request."
  - q: "Who should own the AI rules file in a partner project?"
    a: "A named person on the client side, usually the lead architect or the internal tech lead, plus a deputy. Partners propose changes through pull requests, and a CODEOWNERS entry with branch protection makes the owner's approval mandatory."
  - q: "Does a rules file stop an agent from deploying to production?"
    a: "No. The model may decide a guideline does not apply. Keep production credentials off developer machines, deploy only through the pipeline, add deny rules for production aliases and disable Agentforce Vibes for production orgs in Setup."
  - q: "How long should an AI rules file be?"
    a: "Anthropic recommends keeping each CLAUDE.md under 200 lines, and OpenAI says a short, accurate AGENTS.md beats a long file of vague rules. Add a line when a review finding repeats, and delete lines that the pipeline already enforces."
draft: false
---

An AI rules file is the Markdown file a coding agent loads as standing instructions, usually at the start of a session: CLAUDE.md for Claude Code, AGENTS.md for Codex and Copilot, rule files in .vibes/rules/ for Agentforce Vibes. In my view, a shared Salesforce repository needs one as soon as internal or partner developers start coding with agents, because otherwise every tool and every partner follows its own conventions. The file belongs to the client and has a named owner on your side, usually the lead architect. It guides the agent. Whatever must happen every time goes into settings, hooks and the pipeline.

## What is an AI rules file, and which tool reads which file?

A rules file holds standing project instructions in plain Markdown: commands, conventions, pitfalls and what "done" means. The agent loads it into its context when a session starts and loads path rules when it touches matching files, so it does not have to rediscover your project each time. The four tools covered here use different names:

```tabelle
title: Which tool reads which file
columns: Tool | File in the repository | Detail that matters
Claude Code | CLAUDE.md, plus path rules in .claude/rules/ | Reads AGENTS.md only if there is no CLAUDE.md *
OpenAI Codex | AGENTS.md | A file closer to the current folder wins
GitHub Copilot | .github/copilot-instructions.md, AGENTS.md; CLAUDE.md in the coding agent, code review and CLI | Copilot Chat in VS Code ignores CLAUDE.md *
Agentforce Vibes | Rule files in .vibes/rules/ | Each rule applies always or by file pattern *
```

Sources: [Claude Code memory docs](https://code.claude.com/docs/en/memory), [OpenAI Codex best practices](https://developers.openai.com/codex/learn/best-practices), [GitHub Docs](https://docs.github.com/en/copilot/reference/custom-instructions-support), [Agentforce Vibes rules](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html).

For a team with several tools, two details decide whether one file is enough. According to the [GitHub changelog of 28 August 2025](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions), the Copilot coding agent reads AGENTS.md alongside GitHub's own formats, plus CLAUDE.md and GEMINI.md. Claude Code reads AGENTS.md from version 2.1.277, but only if no CLAUDE.md or CLAUDE.local.md exists in the working directory or above. The Vibes documentation does not mention AGENTS.md at all, so Vibes needs its own short rule in .vibes/rules/.

```hinweis achtung
A developer who creates a personal CLAUDE.local.md stops Claude from reading the shared AGENTS.md without anyone noticing. Anthropic's remedy is a short CLAUDE.md that imports the shared file.
```

## The rules file belongs to the client

Partners like to bring their own template. That is quick at the start and expensive later, for the reasons in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/): whoever writes the rules sets the standard. For rules files I see three specific reasons.

**The file records decisions only you can make.** Which API version new Apex classes use, which Named Credential is the only route to SAP, which of the two warranty date fields is maintained. The API version line is not a formality: from API 67.0, Apex database operations run in user mode by default, and classes without a sharing declaration run `with sharing`, according to the [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm). These are two separate controls. Whether an old class may be moved to 67.0 or later is an architecture decision for your org, not a partner's habit.

**The file outlives the partner.** When an engagement ends, the conventions stay in your repository.

**The file keeps partners comparable.** One file, one definition of done for every team. With two partners and two templates on one org, the louder template quietly becomes your standard.

Ownership means a named person on the client side approves every change, typically the lead architect or the internal tech lead, with a deputy. Partners propose, they do not merge. I would write that into the annex described in [what belongs in the contract when partners code with AI](../partners-using-ai-coding-contract-rules/).

## What goes into the rules file, and what must be enforced elsewhere?

Anthropic's documentation is clear about the limit: Claude treats CLAUDE.md files "as context, not enforced configuration". The [Claude Code best practices](https://code.claude.com/docs/en/best-practices) add: "If something has to happen every time, make it a hook, a deny rule, or a managed setting. CLAUDE.md is for guidelines, and Claude is allowed to decide a guideline doesn't apply." OpenAI makes the length point: "A short, accurate AGENTS.md is more useful than a long file full of vague rules."

So the file holds what the agent cannot see in the code. Anthropic's list: the exact commands to confirm work, places where the code is misleading, decisions not documented anywhere in the repository, and "anything you've had to correct twice already". The memory docs recommend keeping each file under 200 lines. For a machine builder's repository, the sections could look like this:

```eintrag AGENTS.md
Owner | Lead architect; changes only via pull request
Orgs | Scratch orgs or the development sandbox, never UAT or production
Commands | The exact commands for one test class, static analysis and a validation deploy
Apex | New classes on the approved API version, currently 68.0 (Winter '27), with an explicit sharing declaration; no version change on existing classes unless the task says so *
SAP | Calls only through the stored connection to S/4, never addresses in code
Data model | Which warranty date field the SAP interface maintains and which one is a read-only migration leftover
note: The worked example below is about 90 lines. "Done" means real tests and the test output in the pull request.
```

Everything that must hold without exception goes somewhere the model cannot argue with:

```tabelle
title: Where the hard rules belong
columns: Rule | Where it belongs | Why there
No direct reads of login files, no deploy commands against production | Deny rules in the committed Claude settings | Block the agent's direct attempts in every permission mode, not a security boundary *
No "done" while tests are red | A hook that runs when the agent wants to stop | Sends the agent back to work
Code analysis, tests, validation deploy | Pipeline as merge gate | Runs whichever tool wrote the code *
No agent in production | No production credentials on developer machines; Vibes off per production org | A text file cannot remove access that exists
Changes to sharing, data model, rules files | Branch protection with code owners | A person on your side approves *
```

```vertiefung For developers
title: Deny rules and hook for Claude Code
- **Deny rules** in the committed `.claude/settings.json`: `Read(~/.sf/**)`, `Read(~/.sfdx/**)`, `Bash(sf * -o mb-prod*)` and `Bash(sf * --target-org mb-prod*)`. They apply in every permission mode, including auto and `bypassPermissions`.
- **Stop hook:** a script that runs the tests and Code Analyzer and exits with code 2 if either is red; Claude then keeps working. The merge gate remains the pipeline.
- **Pointer file:** a `CLAUDE.md` with the single line `@AGENTS.md`, and a Vibes rule with the file pattern `**/*.cls`.
- **Commands for the rules file:** `sf apex run test -n MyClassTest -o mb-dev`, `sf code-analyzer run --target force-app`, `sf project deploy start --dry-run -o mb-int --test-level RunLocalTests` (Salesforce reserves `sf project deploy validate` for production orgs).
```

Deny rules have limits too. Anthropic's [permissions docs](https://code.claude.com/docs/en/permissions) say a Bash rule matches the command text the agent writes and "isn't a security boundary around the program": the same command wrapped in another shell call is not caught. The real boundary is that production credentials never reach a developer laptop and only the pipeline deploys to production. Salesforce lets you [disable Agentforce Vibes for a production org](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) under Setup, Agentforce Vibes Extensions. If you provide the Claude licenses yourself and deploy managed settings centrally, Anthropic says no personal settings file can override them.

## Worked example: three tools, two partners, one file

Assume a machine builder with Service Cloud, Field Service, a dealer portal on Experience Cloud and SAP S/4 as ERP. Partner A builds the portal and service processes with six nearshore developers and Claude Code. Partner B builds the SAP integration with three developers and Copilot. Two internal developers use Agentforce Vibes. All figures are assumptions to show the method.

The repository holds Partner A's CLAUDE.md from an earlier project, a file of about 300 lines that sets API 62.0 for all classes. Partner B's copilot-instructions.md says nothing about API versions and allows direct HTTP callouts "for quick tests". Vibes runs with its built-in rules only. The internal architect writes the same review comment about sharing declarations several times per sprint.

The client then sets this up:

- One AGENTS.md of about 90 lines, owned by the internal architect and built from the old coding standard and the review findings from recent sprints.
- A one-line CLAUDE.md that imports AGENTS.md, and a Vibes rule for Apex files that repeats the Apex section.
- Committed deny rules for the production alias, and Code Analyzer, tests and a validation deploy as merge gates in the client's pipeline.
- CODEOWNERS for all rules and settings files.

Partner A's template becomes a proposal pull request; a handful of lines survive. Assume two days for the first version and half an hour per sprint afterwards. The reviewer still checks the code, but stops repeating the same comments.

## Changes go through pull requests with CODEOWNERS

Rules files are part of your controls. GitHub's documentation notes that Copilot code review reads custom instructions from the pull request's head branch. A pull request that edits copilot-instructions.md therefore changes the instructions used by its own AI review. In the same way, a committed deny rule can be deleted in a pull request like any other line.

That is why I would put every rules and settings file under [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners): AGENTS.md, CLAUDE.md, .claude/, .vibes/ and the whole .github/ folder, because GitHub says the CODEOWNERS file itself needs an owner. With "Require review from Code Owners" in the branch protection, the owner's approval becomes mandatory, as long as nobody has unchecked bypass rights. GitHub requires code owners to have write permission; if you want to control access, rulesets and bypass rights yourself, the repository should sit in your organization. The same logic applies to shared objects, as described in the [object ownership matrix](../salesforce-object-ownership-matrix/).

The file grows from evidence, not from wish lists. OpenAI recommends adding rules after repeated mistakes, and Anthropic recommends adding them after the second correction. In practice, the input comes from review findings counted by category, as described in [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/). Lines are removed again once a pipeline gate covers them. After each Salesforce release, the owner checks the API version line first.

## Take stock of the rules files in your repository

```schritte
Take stock
  Search the repository for CLAUDE.md, AGENTS.md, .github/copilot-instructions.md and .vibes/rules/, and ask every partner which tools it uses.
Name the owner
  One person and a deputy on your side.
Write the first version
  Under 200 lines, from your coding standard and the last review findings.
Add the pointers
  A short CLAUDE.md that points to AGENTS.md, and one Vibes rule.
Move the hard rules out
  Deny rules, a hook that keeps the agent from stopping while tests are red, and the gates from [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/), with Vibes disabled in production.
Protect the files
  With CODEOWNERS and branch protection.
```

Setting this up is part of my work in [DevOps and release management](../../services/devops-release-management/) and in [partner governance](../../services/partner-governance/). For the first version I plan a few days.
