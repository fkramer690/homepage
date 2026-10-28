---
title: "AI code best practices for Salesforce programmes"
description: "Which rules, checks and access limits AI-generated Salesforce code needs, from the rules file and API 67.0 to the quality gates in your pipeline."
lang: en
slug: ai-code-best-practices
translationKey: masterclass-08
chapter: 8
short: "AI code best practices"
summary: "How to keep AI-generated Salesforce code under control with a rules file, pipeline checks and clear org boundaries."
takeaways:
  - "A rules file in the repository is a request to the model; only deny rules, hooks and pipeline checks, which run whatever the model decides, are binding."
  - "Veracode measured a 56 percent security pass rate for unreviewed AI code in 2026, and only 30 percent for Java; there is no Apex data, and Java is its closest relative."
  - "From API 67.0, Apex classes run in user mode and with sharing by default; the risk lies in raising a class's API version, which coding agents like to do in passing."
  - "75 percent test coverage is the minimum for a deployment; bulk tests, tests as restricted users and real asserts belong in the definition of done."
  - "Coding agents work only against scratch orgs and developer sandboxes; code reaches production only through the pipeline with human approval."
articles: [reviewing-ai-generated-salesforce-code, api-67-user-mode-apex, quality-gates-ai-code-pipeline, ai-rules-file-salesforce-repo, vibe-coding-prototype-not-production]
faq:
  - q: "As the client, do I need to be able to read AI-generated code myself?"
    a: "No. You should own the repository, the rules file and the pipeline, though, and decide which checks every pull request must pass. Code Analyzer, tests and a reviewer you name do the reading."
  - q: "Is a good rules file enough to make the agent write clean Apex?"
    a: "No. Anthropic itself says the model may decide that a guideline in CLAUDE.md does not apply. Anything that has to happen every time belongs in deny rules, hooks and the pipeline."
  - q: "Does the API 67.0 change affect existing Apex code?"
    a: "Only once someone raises a class's API version to 67.0 or higher. Code on 66.0 and earlier behaves as before. That is why the rules file should forbid raising versions without a task and without a test as a restricted user."
draft: false
---

For AI-generated Salesforce code, every major tool vendor recommends the same pattern in 2026: a short rules file in the repository, a plan before the code, and checks that do not depend on the model's goodwill. Salesforce adds typical defects that a machine can mostly find: queries in loops, missing field and object permissions, tests without real asserts, invented field names. And API 67.0 changes the permission defaults per class. As the client you do not need to read code. You should own the rules file, the pipeline and org access, and no agent touches production.

## What does the evidence say about AI-generated code?

The studies measure very different things, and none of them measures Apex. Four findings are enough for a decision:

| Study | Setting | Result |
|---|---|---|
| [Veracode, July 2026](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) | raw models without tooling or review, 11 models in this year's comparison | 56 % security pass rate, "virtually unchanged"; Python 63 %, Java last at 30 % |
| [METR, July 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | 16 experienced developers, real issues in their own large repositories | 19 % slower with AI, while believing they were 20 % faster |
| [METR, February 2026](https://metr.org/blog/2026-02-24-uplift-update/) | follow-up | a speed-up is now "likely", but the data is "only very weak evidence" for its size |
| [DORA, September 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) | nearly 5,000 respondents | AI raises throughput but still hurts stability; "it amplifies what's already there" |

I draw two conclusions. A mature client org with years of triggers, flows and SAP integrations looks more like the METR setting than a greenfield task, so measure productivity gains there instead of assuming them; [chapter 9](../teamwork-and-delivery/) covers how. And Veracode's Java figure is a warning sign for Apex to me, because the two languages are close relatives. That is not proven; there simply is no Apex data.

## Which defects does AI typically put into Salesforce code?

Salesforce documents the weak spots itself. The [review checklist for Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html) asks about queries in loops, the 100 SOQL query limit in bulk operations, and asserts that check more than `System.assertNotEquals(null, result)`. Its key sentence: "Permission modes protect your filesystem. Code review protects your application."

| Area | Typical defect | How to catch it |
|---|---|---|
| Governor limits | SOQL or DML in loops, unbounded queries | Code Analyzer, ApexGuru |
| Bulk processing | trigger handles one record instead of a list | bulk test; the [Apex testing guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/api/apex_testing_best_practices.htm) asks for at least 20 records |
| Permissions | no sharing declaration, no `WITH USER_MODE` | Code Analyzer, `runAs` test |
| Tests | coverage without assertions, test data taken from the org | review, assert rule |
| Field names | invented API names instead of the real ones in the org | validation deployment |
| Metadata | new field missing from the permission set | validation deployment, review |
| Configuration | agent changes sharing, profiles, layouts | rule: a human does this in Setup |

The last row is Salesforce's own advice: according to the [Vibes workflow patterns](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-workflow-patterns.html), permission sets, profiles, page layouts and sharing rules should be set up by hand in Setup, and code for encryption, authentication and permission logic deserves a line-by-line review. At a manufacturer, those are exactly the places that make sure dealers see only their own orders and warranty cases.

On coverage: Salesforce requires 75 percent for a deployment, but its testing guide explicitly says not to focus on the percentage. An agent optimises for whatever check you give it. Give it only the 75 percent and you get tests that run through lines and prove nothing. How to have such code reviewed as the client is covered in [reviewing AI-generated Salesforce code](../../../blog/reviewing-ai-generated-salesforce-code/), and why every pull request needs a review in [why pull request reviews are a must](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).

## The API 67.0 trap

With Summer '26, Salesforce changed Apex's default behaviour. According to the [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm), code saved at API 67.0 runs in user context, classes without a sharing declaration run with the current user's sharing, and `WITH SECURITY_ENFORCED` is no longer allowed in SOQL. The [Summer '26 architect blog](https://www.salesforce.com/blog/summer-26-release-architect-highlights/) adds two points: triggers always run in system mode, but the handler classes they call are affected if they lack a declaration. And classes still using the old clause will not compile on 67.0.

```hinweis achtung
The change is tied to each class's own API version. Code on 66.0 behaves as before until someone raises the version. That is where the risk sits: a query silently returns fewer records, with no error.
```

Think of the batch job that writes order status from SAP into Salesforce every night, or the class that calculates warranty periods across all of a dealer's installed assets. Both have quietly seen everything until now.

For AI code this matters twice over, in my view. Models have mostly seen older Apex, so they suggest patterns that no longer compile on 67.0 or behave differently. And agents like to raise API versions in passing when they touch a file anyway. The rules file should therefore fix three things: the target version for new classes, an explicit sharing declaration, and no raising of existing classes without a task and without a test as a restricted user. Where system mode is intended, the code says `WITH SYSTEM_MODE` on purpose, as the [LWC guide on secure Apex](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security) describes. Details are in [API 67.0: why Apex sees fewer records](../../../blog/api-67-apex-user-mode-fewer-records/), and the pipeline impact in [Winter '27: what changes for your pipeline](../../../blog/salesforce-winter-27-what-changes-for-your-pipeline/).

## Rules the agent reads, and rules it cannot get around

Every coding agent reads a project file with standing instructions: `CLAUDE.md` for Claude Code, `AGENTS.md` for Codex, `.vibes/rules/` for Agentforce Vibes. According to [GitHub's docs](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), Copilot reads `.github/copilot-instructions.md`, `AGENTS.md` or a single `CLAUDE.md` in the root. Whether Vibes reads `AGENTS.md` is not covered in the [Vibes rules docs](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html); for mixed teams I would keep one canonical `AGENTS.md` plus a short Vibes rule that points to it.

The vendors agree on length. Anthropic's [Claude Code best practices](https://code.claude.com/docs/en/best-practices) recommend staying under 200 lines and keeping only what the agent cannot work out from the code: test and check commands, misleading places in the code, decisions that are written down nowhere, and "anything you've had to correct twice already". OpenAI's [Codex best practices](https://developers.openai.com/codex/learn/best-practices) say: "A short, accurate AGENTS.md is more useful than a long file full of vague rules." An excerpt for a Salesforce repository:

```markdown
# Orgs
- Work only against scratch orgs and the alias dev-sandbox; never uat or prod

# Apex
- New classes: API 67.0, explicit sharing declaration, WITH USER_MODE
- Do not raise the API version of existing classes unless the task says so
- No SOQL/DML in loops; triggers must be bulk-safe for 200 records
- SAP calls only via Named Credential SAP_S4, never direct endpoints

# Done means
- Positive, negative and bulk tests with real asserts, plus a runAs test
- Report the test command and its output before saying done
```

The most important part is not in that file, though. Anthropic puts it this way: "If something has to happen every time, make it a hook, a deny rule, or a managed setting." The model may decide that a guideline in `CLAUDE.md` does not apply. Deny rules, on the other hand, hold in every permission mode, and a `Stop` hook sends the agent back to work while tests or Code Analyzer are red. For Salesforce that means: no reading of sf CLI credentials, no commands against production aliases, tests as a hook.

The rules file belongs in your repository, not your partner's. Who maintains it and how it grows is covered in [the AI rules file in your Salesforce repository](../../../blog/ai-rules-file-salesforce-repository/); why repository and tools should sit with the client in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/).

## Which quality gates belong in the pipeline?

What is in the rules file may go unchecked. What is in the pipeline is checked on every run. I would require the same gates for AI code as for code written by people, just without exceptions:

| Gate | What it finds | Note |
|---|---|---|
| [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/code-analyzer.html) | security and performance rules via PMD, ESLint, RetireJS, Regex, Flow Scanner | available as CLI and GitHub Action |
| [ApexGuru scan](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server) | SOQL in loops, unbounded queries, over-fetched fields | runtime-based severity only with production or a Full Copy sandbox |
| [Validation deployment](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html) | missing references, invented fields, failing tests | `sf project deploy validate`, default `RunLocalTests`, at least 75 % Apex coverage |
| Human review | logic, sharing model, architecture | pull request that flags the AI-generated parts |

The open [Salesforce Skills](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) already include part of this: they reject queries in loops, enforce sharing declarations and run Code Analyzer before reporting success. Salesforce still recommends checking field names against the schema and running Code Analyzer manually as well. A gate in the developer's tool does not replace the gate in your pipeline. If you do not want a commercial DevOps product, [sfdx-hardis](../../../blog/sfdx-hardis-open-source-salesforce-devops/) is an open-source option. The gates in detail are in [quality gates for AI code in your Salesforce pipeline](../../../blog/quality-gates-for-ai-code-salesforce-pipeline/).

Before the gate, the way of working decides how much fails. Three habits work, in my view:

- **Plan before code.** In Vibes Plan Mode, according to Salesforce, nothing changes "until you click Approve Plan". That pays off for an extension spanning several metadata types. For a bug fix, a test that reproduces the bug is enough. Birgitta Böckeler watched a tool turn [a small bug into four user stories with 16 acceptance criteria](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html).
- **Evidence instead of claims.** The agent delivers the test command and its output, not "all tests pass".
- **Small changes.** DORA lists [working in small batches](https://dora.dev/capabilities/) among the capabilities that carry the benefit of AI. A pull request with 40 changed files does not get reviewed; it gets waved through.

## Why does no agent get access to production?

Simon Willison describes the ["lethal trifecta"](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): access to private data, exposure to untrusted content and a way to communicate externally. A coding agent signed in through the sf CLI to an org with real dealer and customer data, reading tickets and web pages, with network access, has all three. In its [guide to secure deployment](https://code.claude.com/docs/en/agent-sdk/secure-deployment), Anthropic itself gives the example of a README with unusual instructions that the agent might follow.

My minimum rules for every programme:

1. Agents work only against scratch orgs and developer sandboxes without real customer data.
2. Agentforce Vibes is [disabled](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) for production orgs in Setup under "Agentforce Vibes Extensions".
3. Permissions start at "Ask every time" and open up step by step, as the Vibes docs recommend.
4. Deny rules block credentials and production aliases; credentials live outside the agent's environment, and Anthropic describes a proxy for this.
5. Production deployments run only through the pipeline, with approval by a person.

These rules belong in the contract with your partner, not only in their working instructions. They are part of my work in [DevOps and release management](../../../services/devops-release-management/).

## A typical scenario: spare-part availability in the dealer portal

Assume a machine builder with an Experience Cloud dealer portal, Service Cloud and SAP S/4. All figures are assumptions. The partner is to build, with four developers and Claude Code, a component that shows dealers the availability of spare parts for their machines.

In the requirements workshop, a clickable draft comes together in two hours in a Developer Edition org. That is vibe coding at its best, and the draft is thrown away afterwards; where the line runs is covered in [vibe coding in Salesforce: prototype or production](../../../blog/vibe-coding-salesforce-prototype-vs-production/). For the real build:

- The rules file lives in the manufacturer's repository and names the SAP Named Credential, target version 67.0 and the scratch org commands.
- The agent writes a plan first, and a developer approves it.
- The plan includes raising an existing selector class from 62.0 to 67.0, so the rules file requires a `runAs` test. The test as a restricted dealer user shows that other dealers' assets disappear, which is intended, but so does the parts master data, which is not. Caught in the validation deployment instead of in the portal.
- Code Analyzer reports a query inside a loop over 200 order lines, and the pull request goes back.
- The reviewer checks the sharing model, not the formatting.

None of these steps is new. What is new is that without them, far more unreviewed code is produced in the same time. The cost of the AI tools themselves is covered in [chapter 7](../costs-and-tokens/), and all chapters are on the [overview page](../).

On Salesforce, AI code is as good as the rules, gates and org boundaries you set as the client. If you would like your pipeline and partner rules checked for this, [send me a message](#contact).
