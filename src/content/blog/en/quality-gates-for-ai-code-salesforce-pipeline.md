---
title: "Quality gates for AI code in the Salesforce pipeline"
description: "Which automatic gates AI-generated Salesforce code must pass: Code Analyzer, validation deploy, Apex tests, ApexGuru, a merge block and what sfdx-hardis covers."
pubDate: 2026-10-27
lang: en
slug: quality-gates-for-ai-code-salesforce-pipeline
translationKey: quality-gates-ai-code-pipeline
topic: devops
categories: [devops, ai]
tags: [quality gates, ai coding, code analyzer, sfdx-hardis, devops, manufacturing]
takeaways:
  - "AI-generated Salesforce code should pass blocking gates on every pull request: Code Analyzer with a severity threshold, a validation deploy with Apex tests, org-specific rules and a merge block nobody bypasses."
  - "Code Analyzer only fails a pipeline when a violation meets the --severity-threshold; without that flag the build stays green whatever the report says. I would block at High and report the rest."
  - "A validation deploy always runs Apex tests without deploying and returns a job ID; a quick deploy with that ID skips the tests and works for 10 days."
  - "ApexGuru is available only in Production and Full Copy orgs and rates findings with runtime data, so I treat it as advisory in the pipeline, not as a merge blocker."
  - "sfdx-hardis covers the check deploy and code quality jobs as open source; rules for AI-specific risks such as API version bumps you add yourself."
faq:
  - q: "Which quality gates does AI-generated Salesforce code need?"
    a: "At least Salesforce Code Analyzer with a severity threshold, a validation deploy with Apex tests against an integration sandbox, a few org-specific rules such as an API version check, and branch protection that blocks the merge until all of them are green."
  - q: "Do the checks a coding agent runs itself replace the pipeline?"
    a: "No. Salesforce's skills for Claude Code run Code Analyzer and Apex tests before they finish, but they run on the partner's machine with the partner's configuration. The gate that counts runs in a pipeline the client owns, with the same thresholds for every partner."
  - q: "Should ApexGuru block a merge?"
    a: "I would not make it blocking. ApexGuru is available only in Production and Full Copy sandboxes and rates findings with runtime data, which a pipeline against an integration sandbox may not have. Use it as a report on pull requests and a regular scan of the main branch."
  - q: "Does sfdx-hardis include quality gates?"
    a: "Yes. Every pull request runs a check deploy job that simulates the deployment, runs Apex tests and checks coverage, and a code quality job with MegaLinter and PMD. ApexGuru and org-specific rules are not part of the documented jobs and need extra steps."
draft: false
---

AI-generated Salesforce code should pass the same quality gates as human code, but every gate must block, run in your pipeline and apply to every partner alike. In practice that means Salesforce Code Analyzer with a severity threshold on each pull request, a validation deploy with Apex tests against an integration sandbox, a few rules for patterns agents get wrong, and branch protection nobody bypasses. ApexGuru adds performance hints where your org supports it. sfdx-hardis covers most of this as open source. What a rule cannot decide stays with a human reviewer.

## Why do AI coding agents need harder quality gates?

The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) found that AI adoption improves delivery throughput but still has a negative relationship with delivery stability. Its explanation: "Without robust control systems, like strong automated testing, mature version control practices, and fast feedback loops, an increase in change volume leads to instability." In a Salesforce programme, the pipeline is that control system.

Salesforce's own skills for Claude Code already check a lot on the developer's machine. According to the [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills), they reject queries inside loops, force a sharing keyword on every class, run Code Analyzer and `sf apex run test` and ensure 75 percent coverage before they finish. The same post still tells developers to "run Salesforce Code Analyzer manually as an extra safety check". Checks on a partner's laptop are evidence for the partner; you cannot see which configuration ran. The gate that counts runs in a pipeline you own, with the same thresholds for every partner.

Tests that prove nothing, wrong fields and business rules need a person; that split is the topic of [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/).

## Which quality gates should AI-generated code pass?

I would run five gates, in this order, so the cheap ones fail first.

### 1. Code Analyzer with a severity threshold

[Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) v5 bundles eight engines, among them PMD for Apex, ESLint for JavaScript in Lightning Web Components and a Flow Scanner that reports security issues in flows. In CI you call `sf code-analyzer run` or the official GitHub Action in version 2; version 1 still uses the retired Code Analyzer v4 ([CI/CD integration](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html)). The flag that turns a report into a gate is `--severity-threshold`: a violation that meets or exceeds it makes the command fail with a non-zero exit code ([command reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html)). Without it, the pipeline stays green whatever the report says.

My recommendation: block at High from day one and report the rest. Blocking everything on an org with ten years of Apex produces hundreds of legacy findings, and partners start suppressing rules instead of fixing them.

### 2. Rules for what agents get wrong

The default rule selector is `Recommended`, and it does not know your org. Two additions earn their place with AI-generated code:

- **Custom rules.** The Regex engine accepts your own rules in `code-analyzer.yml`, each with a pattern, file extensions, a description and a severity ([Regex engine](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-regex.html)). Candidates: `WITH SYSTEM_MODE` without a written reason, or hard-coded endpoints where your SAP integration should use a Named Credential.
- **An API version check.** Since API version 67.0, Apex runs in user mode by default and classes without a sharing declaration run in the current user's sharing context ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)). The change applies per class version, so the risk sits in the bump. A short script that compares the `apiVersion` in changed `-meta.xml` files with the target branch, and fails unless the bump was requested, costs an afternoon. Why the bump matters is explained in [API 67.0 and user mode](../api-67-apex-user-mode-fewer-records/).

Do not expect PMD to judge test quality. The rule `ApexUnitTestClassShouldHaveAsserts` only checks for "at least one assertion" ([PMD best practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html)), so `System.assertNotEquals(null, result)` passes it.

### 3. Validation deploy with Apex tests

`sf project deploy validate` checks whether a deployment would succeed without deploying anything. It always runs Apex tests, defaults to `RunLocalTests` and returns a job ID. If validation succeeds, `sf project deploy quick` deploys with that ID within 10 days and skips the tests ([command reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html)). For production, Salesforce requires 75 percent coverage, all tests passing and some coverage for every trigger ([Apex testing best practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)).

Run it against an integration sandbox with the full field set, including the fields your SAP interface maintains. That is where an invented field or a missing dependency fails, before anyone reviews. `RunRelevantTests`, where Salesforce picks the tests, is still beta; I would keep `RunLocalTests` for everything heading to UAT and production.

### 4. ApexGuru as an advisory gate

ApexGuru finds performance antipatterns such as SOQL in loops, unbounded queries and expensive schema lookups, and in Code Analyzer it scans against a connected org. Salesforce says ApexGuru "is available only in Production and Full Copy Sandbox orgs" and rates severity with runtime data from there ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server)). A pipeline against an integration sandbox may lack that data, so I treat ApexGuru as a report, not a merge blocker.

### 5. A merge block nobody bypasses

Gates only work if a red pipeline stops the merge. On GitHub, required status checks must pass before anyone can change a protected branch, and code owners can be required to approve changes to their paths. Administrators can bypass both unless "Do not allow bypassing the above settings" is on ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). With partner admins on the repository, I would switch it on and make a person on the client side the code owner for sharing, permission sets and integration classes.

## What does sfdx-hardis cover out of the box?

[sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/) runs two control jobs on every pull request, according to its [documentation on reviewing pull requests](https://github.com/hardisgroupcom/sfdx-hardis/blob/main/docs/salesforce-devops-validate-merge-request.md):

- **Check deploy job.** It simulates the deployment in the target org, runs the Apex tests, checks coverage and posts the result as a pull request comment, with a visual diff of changed flows. After the merge, the deployment reuses that validation as a quick deploy.
- **Code quality job.** It runs MegaLinter, which checks Apex with PMD and comments the result of each linter on the pull request. The [documented configuration](https://github.com/hardisgroupcom/sfdx-hardis/blob/main/docs/salesforce-devops-solve-megalinter-errors.md) sets the Apex error threshold with the note "only the release manager can update this value", and `// NOPMD` is meant "only for false positives, never to publish faster".

The default test level is `RunLocalTests` ([smart deployment](https://github.com/hardisgroupcom/sfdx-hardis/blob/main/docs/salesforce-devops-smart-deployment.md)). A beta [Coding Agent Auto-Fix](https://github.com/hardisgroupcom/sfdx-hardis/blob/main/docs/salesforce-deployment-agent-autofix.md) lets a coding agent such as Claude Code, Codex, Gemini or Copilot propose a fix for a failed deployment in a separate pull request, and the documentation says all proposed changes "must be carefully reviewed by an expert". That fix has to pass the same gates.

ApexGuru and org-specific rules such as the API version check are not part of the documented jobs; add them as extra steps. How the rest of the pipeline fits together is in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

## A typical scenario: two partners and a spare-parts lookup

Assume a machine builder with SAP S/4, Service Cloud, Field Service for 150 technicians and a dealer portal. Two partners, one onshore and one nearshore, started using coding agents this year. All numbers are assumptions. Pull requests rise from about 60 to 110 a month; on the client side, one architect and one release manager still review them.

A nearshore developer asks an agent to fix a rounding error in a spare-parts availability class that technicians call from the mobile app. The agent fixes it, adds a test and raises the class from API version 61.0 to 67.0 on the side. Under 67.0 its queries run in user mode, with the technician's own access rights. If the sharing model hides central warehouse stock from technicians, those records drop out of the result. The test creates its own data and runs without `System.runAs()`, so it passes. Code Analyzer is green, the validation deploy is green, coverage is 91 percent.

The API version check stops the pull request. The partner either reverts the version or adds a `runAs` test with a restricted technician user, which shows the missing records. Without that gate, technicians would see "not in stock" for parts sitting in the central warehouse, and dispatchers would place emergency orders for nothing. Against that, assume 25 minutes per validation: 110 runs are about 46 hours of pipeline time a month, paid in CI minutes, not in anyone's calendar.

## Where should you start?

1. **Own the pipeline.** Repository, pipeline and thresholds sit with you, as described in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).
2. **Turn on Code Analyzer with `--severity-threshold`** at High and publish the full report on every pull request.
3. **Validate every pull request** against an integration sandbox with `RunLocalTests`, and use quick deploy for releases.
4. **Add the API version check** and the rule that a bump needs a `runAs` test. Write the same rule into the [AI rules file of your repository](../ai-rules-file-salesforce-repository/), so agents know it before the gate stops them.
5. **Protect the branches** without admin bypass, with client-side code owners for sharing and integrations.
6. **Run ApexGuru** on the main branch against an org where it has runtime data, and review the findings per release.
7. **Count gate failures per partner and category** every month. A rising category shows which rule is missing from the rules file or the contract.

Setting up these gates for programmes with several partners is the core of my [DevOps and release management](../../services/devops-release-management/) work.

Quality gates make AI-generated code exactly as safe as the rules they enforce, and those rules belong in your pipeline, not in a partner's prompt. If you want a second opinion on your gates, [send me a message](#contact).
