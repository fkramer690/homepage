---
title: "AI rules file for Salesforce repos: who owns it?"
description: "Why your Salesforce repository needs an AI rules file (CLAUDE.md, AGENTS.md, .vibes/rules), who on the client side owns it and what settings and CI enforce."
pubDate: 2026-10-27
lang: en
slug: ai-rules-file-salesforce-repository
translationKey: ai-rules-file-salesforce-repo
topic: devops
category: devops
tags: [ai coding, devops, partner governance, claude code, agentforce vibes, manufacturing]
takeaways:
  - "Your Salesforce repository needs an AI rules file as soon as anyone codes with an agent: CLAUDE.md for Claude Code, AGENTS.md for Codex and Copilot, .vibes/rules/ for Agentforce Vibes."
  - "The file belongs in the client's repository and is owned by a named person on the client side; partners propose changes through pull requests instead of bringing their own template as the standard."
  - "Anthropic says Claude treats CLAUDE.md as context, not enforced configuration; rules that must hold every time belong in deny rules, hooks, pipeline gates and branch protection."
  - "Claude Code reads AGENTS.md only when there is no CLAUDE.md or CLAUDE.local.md, so a two-line CLAUDE.md that imports @AGENTS.md keeps one shared file working across tools."
  - "Protect the rules files with CODEOWNERS: Copilot code review reads instructions from the pull request's head branch, so editing the file changes the review of that very change."
faq:
  - q: "Do I need a separate AI rules file for every coding tool?"
    a: "Mostly not. One AGENTS.md serves Codex and Copilot, and Claude Code through a short CLAUDE.md that imports it. Agentforce Vibes reads .vibes/rules/ and its docs do not mention AGENTS.md, so keep a short Vibes rule and update it in the same pull request."
  - q: "Who should own the AI rules file in a partner project?"
    a: "A named person on the client side, usually the lead architect or the internal tech lead, plus a deputy. Partners propose changes through pull requests, and a CODEOWNERS entry with branch protection makes the owner's approval mandatory."
  - q: "Does a rules file stop an agent from deploying to production?"
    a: "No. The model may decide a guideline does not apply. Keep production credentials off developer machines, deploy only through the pipeline, add deny rules for production aliases and disable Agentforce Vibes for production orgs in Setup."
  - q: "How long should an AI rules file be?"
    a: "Anthropic targets under 200 lines per CLAUDE.md, and OpenAI says a short, accurate AGENTS.md beats a long file of vague rules. Add a line when a review finding repeats, and delete lines that the pipeline already enforces."
draft: false
---

An AI rules file is the Markdown file a coding agent reads at the start of every session: `CLAUDE.md` for Claude Code, `AGENTS.md` for Codex and Copilot, `.vibes/rules/` for Agentforce Vibes. Your Salesforce repository needs one as soon as anyone, internal or partner, codes with an agent, because otherwise every tool and every partner follows its own conventions. The file belongs to the client and has a named owner on your side, usually the lead architect. It guides the agent. Whatever must happen every time goes into settings, hooks and the pipeline.

## What is an AI rules file, and which tool reads which file?

A rules file holds standing project instructions in plain Markdown: commands, conventions, pitfalls and what "done" means. The agent loads it into its context when a session starts, so it does not have to rediscover your project each time. Every major tool has one, under different names:

| Tool | File in the repository | Detail that matters |
|---|---|---|
| Claude Code | `CLAUDE.md`, path-scoped rules in `.claude/rules/` | reads `AGENTS.md` only if there is no `CLAUDE.md` |
| OpenAI Codex | `AGENTS.md` | a file closer to the current directory wins |
| GitHub Copilot | `.github/copilot-instructions.md`, `AGENTS.md` or one root `CLAUDE.md` | the nearest `AGENTS.md` takes precedence |
| Agentforce Vibes | `.vibes/rules/` | each rule applies "Always" or by file pattern |

Sources: [Claude Code memory docs](https://code.claude.com/docs/en/memory), [OpenAI Codex best practices](https://developers.openai.com/codex/learn/best-practices), [GitHub Docs](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), [Agentforce Vibes rules](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html).

For a team with several tools, two details decide whether one file is enough. According to the [GitHub changelog of 28 August 2025](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions), the Copilot coding agent reads `AGENTS.md` next to GitHub's own formats, plus `CLAUDE.md` and `GEMINI.md`. Claude Code reads `AGENTS.md` from version 2.1.277, but only if no `CLAUDE.md` or `CLAUDE.local.md` exists in the working directory or above. A developer who creates a personal `CLAUDE.local.md` therefore stops Claude from reading the shared `AGENTS.md` without noticing. Anthropic's remedy is a `CLAUDE.md` that imports the shared file with `@AGENTS.md`. The Vibes documentation does not mention `AGENTS.md` at all, so Vibes needs its own short rule in `.vibes/rules/`.

## Why does the rules file belong to the client?

Partners like to bring their own template. That is quick at the start and expensive later, for the reasons in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/): whoever writes the rules sets the standard. For rules files I see three specific reasons.

**The file records decisions only you can make.** Which API version new Apex classes use, which Named Credential is the only route to SAP, which of two warranty date fields is the maintained one. The API version line is no formality: from API 67.0, Apex runs in user context by default and classes without a sharing declaration run in the current user's context, according to the [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm). Whether an old class may move to 67.0 is an architecture decision for your org, not a partner's habit.

**The file outlives the partner.** When an engagement ends, the conventions stay in your repository.

**The file keeps partners comparable.** One file, one definition of done for every team. With two partners and two templates on one org, the louder template quietly becomes your standard.

Ownership means a named person on the client side approves every change, typically the lead architect or the internal tech lead, with a deputy. Partners propose, they do not merge. I would write that into the annex described in [what belongs in the contract when partners code with AI](../partners-using-ai-coding-contract-rules/).

## What goes into the rules file, and what must be enforced elsewhere?

Anthropic's documentation is plain about the limit: Claude treats `CLAUDE.md` files "as context, not enforced configuration". The [Claude Code best practices](https://code.claude.com/docs/en/best-practices) add: "If something has to happen every time, make it a hook, a deny rule, or a managed setting. `CLAUDE.md` is for guidelines, and Claude is allowed to decide a guideline doesn't apply." OpenAI makes the length point: "A short, accurate `AGENTS.md` is more useful than a long file full of vague rules."

So the file holds what the agent cannot see in the code. Anthropic's list: the exact commands to confirm work, places where the code is misleading, decisions written down nowhere in the repository, and "anything you've had to correct twice already". The memory docs target under 200 lines per file. An example for a machine builder's repository, with field and alias names as placeholders:

```markdown
# AGENTS.md (owner: lead architect; changes only via pull request)

## Orgs
- Work against scratch orgs or the alias mb-dev; never mb-uat or mb-prod

## Commands
- One test class: sf apex run test -n <TestClass> -o mb-dev -r human -w 10
- Static analysis: sf code-analyzer run --target force-app
- Validate: sf project deploy validate -o mb-int --test-level RunLocalTests

## Apex
- New classes: API 67.0, explicit sharing declaration, WITH USER_MODE
- Do not raise the API version of existing classes unless the task says so
- SAP calls only via Named Credential SAP_S4, never endpoints in code

## Data model pitfalls
- Warranty end: use Asset.Warranty_End__c (maintained by the SAP interface);
  Asset.Legacy_Warranty_Date__c is a migration leftover, read only
- Dealer portal code never uses without sharing

## Done means
- Positive, negative and bulk tests with real asserts
- Test command and its output in the pull request; AI-generated parts marked
```

Everything that must hold without exception goes somewhere the model cannot argue with:

| Rule | Where it belongs | Why there |
|---|---|---|
| No reading of sf CLI login files, no commands against production aliases | deny rules in `.claude/settings.json`, committed | deny rules hold in every permission mode, including auto and `bypassPermissions` |
| No "done" while tests or Code Analyzer are red | `Stop` hook | exit code 2 sends Claude back to work |
| Code Analyzer, Apex tests, validation deploy | pipeline as merge gate | runs whichever tool wrote the code |
| No agent in production | no production credentials on developer machines; Vibes disabled per production org | the rules file cannot remove access that exists |
| Changes to sharing, data model, rules files | branch protection with CODEOWNERS | a person on your side approves |

The committed deny rules for Claude Code look like this:

```json
{
  "permissions": {
    "deny": [
      "Read(~/.sf/**)",
      "Read(~/.sfdx/**)",
      "Bash(sf * -o mb-prod*)",
      "Bash(sf * --target-org mb-prod*)"
    ]
  }
}
```

Deny rules have limits too. Anthropic's [permissions docs](https://code.claude.com/docs/en/permissions) say a Bash rule matches the command text the agent writes and "isn't a security boundary around the program": the same command wrapped in `bash -c` is not caught. The real boundary is that production credentials never reach a developer laptop and only the pipeline deploys to production. Salesforce lets you [disable Agentforce Vibes for a production org](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) under Setup, Agentforce Vibes Extensions. If you provide the Claude licences yourself, managed settings apply, which according to Anthropic no personal settings file can override.

## A typical scenario: three tools, two partners, one file

Assume a machine builder with Service Cloud, Field Service, a dealer portal on Experience Cloud and SAP S/4 as ERP. Partner A builds the portal and service processes with six nearshore developers and Claude Code. Partner B builds the SAP integration with three developers and Copilot. Two internal developers use Agentforce Vibes. All figures are assumptions to show the method.

The repository holds partner A's `CLAUDE.md` from an earlier project, about 300 lines, which sets API 62.0 for all classes. Partner B's `copilot-instructions.md` says nothing about API versions and allows direct HTTP callouts "for quick tests". Vibes runs with its built-in rules only. The internal architect writes the same review comment about sharing declarations several times per sprint.

The client then sets this up:

- One `AGENTS.md` of about 90 lines, owned by the internal architect, built from the old coding standard and the review findings of the last sprints.
- A two-line `CLAUDE.md` that imports `@AGENTS.md`, and a Vibes rule with file pattern `**/*.cls` that repeats the Apex section.
- Committed deny rules for the production alias, and Code Analyzer, tests and a validation deploy as merge gates in the client's pipeline.
- CODEOWNERS for all rules and settings files.

Partner A's template becomes a proposal pull request; a handful of lines survive. Assume two days for the first version and half an hour per sprint afterwards. The reviewer still reviews, but stops repeating the same comments.

## Who maintains the file, and how does it change?

Rules files are part of your controls. GitHub's documentation notes that Copilot code review reads custom instructions from the pull request's head branch. A pull request that edits `copilot-instructions.md` therefore changes the instructions its own AI review runs with. In the same way, a committed deny rule can be deleted in a pull request like any other line.

That is why I would put every rules and settings file under [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners): `AGENTS.md`, `CLAUDE.md`, `.claude/`, `.vibes/` and `.github/copilot-instructions.md`. With "Require review from Code Owners" in the branch protection, the owner's approval becomes mandatory. GitHub requires code owners to have write permission, which only works if the repository sits in your organisation. The same logic applies to shared objects, as described in the [object ownership matrix](../salesforce-object-ownership-matrix/).

The file grows from evidence, not from wish lists. OpenAI recommends adding rules after repeated mistakes, Anthropic after the second correction. In practice, the input is the review findings counted by category, as described in [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/). Lines move out again once a pipeline gate covers them. After each Salesforce release, the owner checks the API version line first.

## Where should you start?

1. **Take stock.** Search the repository for `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md` and `.vibes/rules/`, and ask every partner which tools it uses.
2. **Name the owner** and a deputy on your side.
3. **Write the first version** in under 200 lines from your coding standard and the last review findings.
4. **Add the pointers**: a `CLAUDE.md` with `@AGENTS.md` and one Vibes rule.
5. **Move the hard rules out**: deny rules, a `Stop` hook and the gates from [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/), with Vibes disabled in production.
6. **Protect the files** with CODEOWNERS and branch protection.

Setting this up is part of my work in [DevOps and release management](../../services/devops-release-management/) and in [partner governance](../../services/partner-governance/). An AI rules file costs a few days and gives every agent in your repository the same rules, as long as you own the file and enforce the hard rules elsewhere. If you want a second opinion on your rules file or your partner setup, [send me a message](#contact).
