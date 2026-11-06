---
title: "Quality gates for AI code in the Salesforce pipeline"
description: "Which automatic checks AI-generated Salesforce code must pass before it reaches production, which of them block a merge and who should own them."
pubDate: 2026-10-27
updatedDate: 2026-11-05
lang: en
slug: quality-gates-for-ai-code-salesforce-pipeline
translationKey: quality-gates-ai-code-pipeline
topic: devops
categories: [devops, ai]
tags: [quality gates, ai coding, code analyzer, sfdx-hardis, devops, manufacturing]
takeaways:
  - "Checks a coding agent runs on a partner's machine do not replace the pipeline the client owns."
  - "Code analysis only stops anything once you set a severity level at which the build turns red. I would block at High and report the rest."
  - "A test deployment against an integration sandbox catches invented fields and missing dependencies before anyone spends time on a review."
  - "ApexGuru works only in Production and Full Copy orgs. In the pipeline I treat it as a report, not as a merge blocker."
  - "sfdx-hardis covers test deployment and code quality as open source. A check for unrequested API version changes you add yourself."
faq:
  - q: "Which quality gates does AI-generated Salesforce code need?"
    a: "At least Salesforce Code Analyzer with a severity threshold, a validation deploy with Apex tests against an integration sandbox, a few org-specific rules such as an API version check, and branch protection that blocks the merge until all of them are green."
  - q: "Do the checks a coding agent runs itself replace the pipeline?"
    a: "No. Salesforce's skills for Claude Code run Code Analyzer and Apex tests before they finish, but they run on the partner's machine with the partner's configuration. The gate that counts runs in a pipeline the client owns, with the same thresholds for every partner."
  - q: "Should ApexGuru block a merge?"
    a: "I would not make it blocking. ApexGuru is available only in Production and Full Copy sandboxes and rates findings with runtime data, which a pipeline against an integration sandbox may not have. Use it as a report on pull requests and a regular scan of the main branch."
  - q: "Does sfdx-hardis include quality gates?"
    a: "Yes. Every pull request runs a job that simulates the deployment, runs Apex tests and checks coverage, and a code quality job with MegaLinter and PMD. ApexGuru and org-specific rules are not part of the documented jobs and need extra steps."
draft: false
---

AI-generated Salesforce code should pass the same quality gates as code a person wrote, with three conditions: every check must be able to stop a change, it runs in a pipeline you own, and it applies to every partner alike. In practice that means five checks on every pull request, the change proposal a developer submits before code enters the main branch: code analysis with a hard threshold, a few rules for mistakes agents typically make, a test deployment into a sandbox, performance hints from ApexGuru and a merge block nobody can bypass. What a rule cannot decide stays with a human reviewer.

## Worked example: the spare part that is suddenly out of stock

Assume a machine builder with SAP S/4, Service Cloud, Field Service for 150 technicians and a dealer portal. Two partners, one onshore and one nearshore, started using coding agents this year. All numbers are assumptions. Pull requests rise from about 60 to 110 a month; on the client side, one architect and one release manager still review them.

A nearshore developer asks an agent to fix a rounding error in the spare-parts availability check that technicians use in the mobile app. The agent fixes it, adds a test and, on the side, moves the code to a newer Salesforce API version. Under that version the code sees only the records the logged-in technician may see. If technicians have no access to central warehouse stock, those parts drop out of the result. The test does not run as a technician, so it passes. Code analysis is green, the test deployment is green, coverage is 91 percent.

```vergleich
without: Without a check for version changes
- Code analysis, tests and coverage are green.
- Technicians see "not in stock" for parts in the central warehouse.
- Dispatchers place emergency orders for parts the company already has.
with: With a check for version changes
- The pipeline stops the pull request before anyone reviews it.
- The partner reverts the version or adds a test as a technician.
- The missing records show up before the release.
```

That check is a short script, about an afternoon of work. Against it stands pipeline time: at 25 minutes per test deployment, 110 runs are about 46 hours a month, paid in CI minutes, not in anyone's calendar. Why the version change matters is explained in [API 67.0 and user mode](../api-67-apex-user-mode-fewer-records/).

## The partner's own checks are not enough

The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) found that AI adoption increases delivery throughput but still has a negative relationship with delivery stability. Its explanation: "Without robust control systems, like strong automated testing, mature version control practices, and fast feedback loops, an increase in change volume leads to instability." In a Salesforce programme, the pipeline is that control system.

Salesforce's own skills for Claude Code already check a lot on the developer's machine. According to the [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills), they reject database queries inside loops, run Code Analyzer and the Apex tests and ensure 75 percent coverage before they finish. The same post still tells developers to "run Salesforce Code Analyzer manually as an extra safety check".

For you as the client, a check on a partner's laptop is the partner's word. You cannot see which configuration ran or which rules were switched off. The check that counts runs in a pipeline you own, with the same thresholds for every partner. Tests that prove nothing, wrong fields and business rules still need a person; that split is the topic of [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/).

## Which quality gates should AI-generated code pass?

I would run five checks, in this order, so the cheap ones fail first.

```tabelle
title: The five checks on every pull request
columns: Check | What it stops | Blocks the merge? | Who owns it
Code analysis | Known security and performance flaws | Yes, from severity High * | Client sets the threshold
Rules for agents | Unrequested version changes, hard-coded addresses | Yes * | Client architect
Test deployment | Invented fields, missing dependencies, failing tests | Yes * | Pipeline, integration sandbox
ApexGuru | Slow code under real load | No, report only | Release manager per release
Merge block | Merging a red build, even by an admin | Yes * | Code owner on the client side
note: Assumed setup for a programme with several partners. Thresholds and owners belong in the partner contract.
```

**Code analysis.** [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) checks Apex, Lightning components and flows for known security and performance problems. By default it only writes a report. I would let it block from severity High on day one and report everything below. Blocking everything on an org with ten years of Apex produces hundreds of old findings, and partners start switching rules off instead of fixing them.

```hinweis achtung
A report stops nothing. Unless the pipeline is told at which severity to fail, it stays green whatever the analysis finds.
```

**Rules for agents.** The standard rules do not know your org. Two additions earn their place with AI-generated code: your own rules for patterns you never want, such as hard-coded addresses where your SAP interface should use a stored connection, and the version check from the example above. Do not expect the analysis to judge test quality: a test with one meaningless assertion passes it.

**Test deployment.** Before anything is merged, the pipeline deploys the change into an integration sandbox, a test copy of your org with the full field set, and runs all your own tests. Nothing is installed; the run only shows whether the release would work. That is where an invented field or a missing dependency fails, before a person reviews. For production, Salesforce requires 75 percent test coverage and all tests passing ([Apex testing best practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)). A successful run can later be released without running the tests again, within 10 days ([command reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html)).

**ApexGuru.** ApexGuru finds slow patterns such as queries without limits. Salesforce says it "is available only in Production and Full Copy Sandbox orgs" and rates findings with runtime data from there ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server)). A pipeline against an integration sandbox may lack that data, so I treat it as a report per release.

**Merge block.** Checks only work if a red pipeline stops the merge. On GitHub, administrators can bypass branch protection unless a separate setting forbids it ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). With partner admins on the repository, I would switch that setting on and make a person on the client side the code owner for sharing, permissions and integration code.

```vertiefung For developers
title: Commands and settings behind the five checks
- **Code analysis:** `sf code-analyzer run --severity-threshold 2` (2 is High) or the official GitHub Action in version 2; version 1 still uses the retired Code Analyzer v4 ([CI/CD integration](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html), [command reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html)).
- **Own rules:** Regex rules in `code-analyzer.yml` with pattern, file extensions and severity ([Regex engine](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-regex.html)), for example `WITH SYSTEM_MODE` without a written reason. PMD's `ApexUnitTestClassShouldHaveAsserts` only checks for "at least one assertion" ([PMD best practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html)).
- **Version check:** compare `apiVersion` in changed `-meta.xml` files with the target branch and fail unless the bump was requested. From 67.0 Apex runs in user mode by default ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)); a bump needs a `System.runAs()` test with a restricted user.
- **Test deployment:** `sf project deploy validate` with `RunLocalTests`, release with `sf project deploy quick` and the job ID. `RunRelevantTests` is still beta.
- **Merge block:** required status checks, code owners and "Do not allow bypassing the above settings" on the protected branch.
```

## sfdx-hardis covers most of it as open source

[sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/) runs two control jobs on every pull request, according to its [documentation on pull request results](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/). One simulates the deployment in the target org, runs the tests, checks coverage and posts the result as a comment on the pull request. The other checks code quality and comments its findings as well. In the documented configuration only the release manager may change the error threshold, and exceptions are meant "only for false positives, never to publish faster" ([MegaLinter errors](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/)).

ApexGuru and org-specific rules such as the version check are not part of the documented jobs; add them as extra steps. sfdx-hardis also lists an automatic fix by a coding agent for failed deployments, still in beta ([overview](https://sfdx-hardis.cloudity.com/salesforce-devops-home/)). I would accept such fixes only if they pass the same checks and a person reviews them. How the rest of the pipeline fits together is in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

## Write the checks into every partner contract

Setting up these checks for programmes with several partners is the core of my [DevOps and release management](../../services/devops-release-management/) work. The order matters, because a partner can switch off any threshold as long as the pipeline belongs to them.

1. **Own the pipeline.** Repository, pipeline and thresholds sit with you, as described in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).
2. **Let code analysis block from High** and publish the full report on every pull request.
3. **Test-deploy every pull request** into an integration sandbox with all your own tests.
4. **Stop unrequested version changes** and require a test as a restricted user for every requested one. Put the same rule into the [AI rules file of your repository](../ai-rules-file-salesforce-repository/), so agents know it before the pipeline stops them.
5. **Protect the main branch** without an admin exception, with code owners on your side for sharing and integrations.
6. **Run ApexGuru** per release against an org where it has runtime data.
7. **Count failed checks per partner and category** every month. A rising category shows which rule is missing from the rules file or the contract.
