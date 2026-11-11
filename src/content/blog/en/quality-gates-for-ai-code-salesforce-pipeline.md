---
title: "Quality gates for AI code in the Salesforce pipeline"
description: "Which automatic checks AI-generated Salesforce code must pass before it reaches production, which of them block a merge and who should own them."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: quality-gates-for-ai-code-salesforce-pipeline
translationKey: quality-gates-ai-code-pipeline
topic: devops
categories: [devops, ai]
tags: [quality gates, ai coding, code analyzer, sfdx-hardis, devops, manufacturing]
takeaways:
  - "Checks a coding agent runs on a partner's machine do not replace the pipeline the client owns."
  - "Code analysis blocks changes only after you set the severity level at which the build turns red. I would block at High and report the rest."
  - "A dry-run deployment against an integration sandbox catches invented fields and missing dependencies before anyone spends time on a review."
  - "ApexGuru is activated in Production or Full Copy and draws runtime data from there. In the pipeline I treat it as a report, not as a merge blocker."
  - "sfdx-hardis covers test deployment and code quality as open source under AGPL-3.0. You add a check for unrequested API version changes yourself."
faq:
  - q: "Which quality gates does AI-generated Salesforce code need?"
    a: "At least Salesforce Code Analyzer with a fixed rule set and severity threshold, a dry-run deployment with Apex tests against an integration sandbox, a few org-specific rules such as an API version check, and branch protection that blocks the merge until all of them are green. Before the release, a separate validation against production follows."
  - q: "Do the checks a coding agent runs itself replace the pipeline?"
    a: "No. Salesforce's skills for Claude Code run Code Analyzer and Apex tests before they finish, but they run on the developer's machine. Even with the repository's configuration, the client cannot audit whether the checks were run or changed. The gate that matters runs in a client-owned pipeline, with the same thresholds for every partner."
  - q: "Should ApexGuru block a merge?"
    a: "I would not make it blocking. ApexGuru has to be activated in a Production or Full Copy org and prioritizes findings with runtime data from there. After activation, Code Analyzer can show its insights in developer sandboxes, scratch orgs and CI/CD as well. Use it as a report on pull requests and a regular scan of the main branch."
  - q: "Does sfdx-hardis include quality gates?"
    a: "Yes. Pull requests to a major branch such as integration trigger one job that simulates the deployment, runs Apex tests and checks coverage, and another code quality job with MegaLinter and PMD. Whether these jobs block the merge depends on the required checks in your Git platform. ApexGuru and org-specific rules need extra steps."
draft: false
---

AI-generated Salesforce code should pass the same quality gates as code a person wrote, with three conditions: the gates can stop a change, they run in a pipeline you own, and they apply to every partner alike. In practice that means four blocking checks on every pull request, the change proposal a developer submits before code enters the main branch: code analysis with a hard threshold, a few rules for mistakes agents typically make, a dry-run deployment into a sandbox and a protected merge. ApexGuru adds performance hints as a report. What a rule cannot decide stays with a human reviewer.

## Worked example: the spare part that is suddenly out of stock

Assume a machine builder with SAP S/4, Service Cloud, Field Service for 150 technicians and a dealer portal. Two partners, one onshore and one nearshore, started using coding agents this year. All numbers are assumptions. Pull requests rise from about 60 to 110 a month; on the client side, one architect and one release manager still review them.

A nearshore developer asks an agent to fix a rounding error in the spare-parts availability check that technicians use in the mobile app. The agent fixes it, adds a test and, in passing, moves the class from API 66.0 to 68.0. Starting with 67.0, the code can access only the records the logged-in technician may see. If technicians have no access to central warehouse stock, those parts drop out of the result. The test does not run as a technician, so it passes. Code analysis is green, the test deployment is green, coverage is 91 percent.

```vergleich
without: Without a check for version changes
- * Code analysis, tests and coverage are green.
- Technicians see "not in stock" for parts in the central warehouse.
- Dispatchers place emergency orders for parts the company already has.
with: With a check for version changes
- * The pipeline stops the pull request before anyone reviews it.
- Someone decides whether technicians may see central stock, then sharing or a documented system mode follows.
- The missing records show up before the release.
quote: A green pipeline only checks what someone built into it as a check beforehand.
```

That check is a short script, about an afternoon of work. On the other side is pipeline time: at 25 minutes per test deployment, 110 pull requests mean at least 46 hours a month, more with every new commit or rerun. You pay for that in CI minutes, and longer queues also slow feedback for developers. Why the version change matters is explained in [API 67.0 and user mode](../api-67-apex-user-mode-fewer-records/).

## The partner's own checks are not enough

The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) found that AI adoption increases delivery throughput but still has a negative relationship with delivery stability. Its explanation: "Without robust control systems, like strong automated testing, mature version control practices, and fast feedback loops, an increase in change volume leads to instability." In a Salesforce program, the pipeline is that control system.

Salesforce's own skills for Claude Code already check a lot on the developer's machine. According to the [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills), they reject database queries inside loops, run Code Analyzer and the Apex tests and ensure 75 percent coverage before they finish. The same post still tells developers to "run Salesforce Code Analyzer manually as an extra safety check".

For you as the client, a check on a partner's laptop is only the partner's assurance. Skills can be installed per project with the repository's configuration, but you still cannot audit whether the check was run, whether it was changed or whether its result controlled the merge. The check that matters runs in a pipeline you own, with the same thresholds for every partner. Meaningless tests, incorrect fields and business rules still need a person; that split is the topic of [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/).

## Which quality gates should AI-generated code pass?

I would run four blocking checks and one report, in this order, so the cheap ones fail first.

```tabelle
title: The checks on every pull request
columns: Check | What it stops | Blocks the merge? | Who owns it
Code analysis | Known security and performance flaws | Yes, from severity High * | Client sets rules and threshold
Rules for agents | Unrequested version changes, hard-coded addresses | Yes * | Client architect
Test deployment | Invented fields, missing dependencies, failing tests | Yes * | Pipeline, integration sandbox
ApexGuru | Slow code under real load | No, report only | Release manager per release
Merge block | Merging a red or outdated build, even by an admin | Yes * | Repository admin on the client side
note: Assumed setup for a program with several partners. Thresholds and owners belong in the partner contract.
```

**Code analysis.** [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) checks Apex, Lightning components and flows for known security and performance problems. By default it only writes a report and selects only rules tagged Recommended. I would pin the engines and rules in a configuration file the client approves, configure the pipeline to block from severity High on day one and report everything below. Suppressions need an owner too, otherwise a partner can shrink the scope without touching the threshold. Blocking every finding in an org with ten years of Apex produces hundreds of old findings, and partners start switching rules off instead of fixing them.

```hinweis achtung
A report does not block anything. Unless the pipeline is configured with the severity level at which it should fail, it stays green regardless of what the analysis finds.
```

**Rules for agents.** The standard rules do not know your org. Two additions earn their place with AI-generated code: your own rules for patterns you never want, such as hard-coded addresses where your SAP interface should use a stored connection, and the version check from the example above. Do not expect the analysis to judge test quality: a test with one meaningless assertion still passes.

**Test deployment.** Before anything is merged, the pipeline runs a dry-run deployment into an integration sandbox, a test copy of your org with the full field set, and runs all your own tests. Nothing is deployed; the run only shows whether the change would deploy there. That is where an invented field or a missing dependency fails, before a person reviews. For production deployments with local tests, Salesforce requires 75 percent overall coverage and all tests passing ([Apex testing best practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)); with specified tests each deployed class and trigger needs 75 percent. The sandbox run does not replace the release check: within 10 days, a deployment validated against production can be released without running the tests again ([command reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html)), and that job ID only works for the org it was validated against.

**ApexGuru.** ApexGuru finds slow patterns such as queries without limits. It has to be activated in a Production or Full Copy org and prioritizes findings with runtime data from there ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server)). After activation, Code Analyzer can show its insights in developer sandboxes, scratch orgs and CI/CD too, according to the [ApexGuru FAQ](https://help.salesforce.com/s/articleView?id=sf.apexguru_faq.htm&language=en_US&type=5). Because the ranking depends on production load, I treat it as a report, not as a gate.

**Merge block.** Checks only work if a red pipeline stops the merge. On GitHub, administrators can bypass branch protection unless a separate setting forbids it ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). Anyone who can change the rules can still remove them, so partners should not be repository or organization admins, and rule changes need an audit trail. With several partners, two pull requests can each be green and still break the main branch together; strict status checks or a merge queue test the combined state. A person on the client side should be the code owner for sharing, permissions and integration code.

```vertiefung For developers
title: Commands and settings behind the five checks
- **Code analysis:** `sf code-analyzer run --severity-threshold 2` (2 is High) with rule selection in `code-analyzer.yml` or the official GitHub Action in version 2; version 1 still uses the retired Code Analyzer v4 ([CI/CD integration](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html), [command reference](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html)).
- **Own rules:** Regex rules in `code-analyzer.yml` with pattern, file extensions and severity ([Regex engine](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-regex.html)), for example `WITH SYSTEM_MODE` without a written reason. PMD's `ApexUnitTestClassShouldHaveAsserts` only checks for "at least one assertion" ([PMD best practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html)).
- **Version check:** compare `apiVersion` in changed `-meta.xml` files with the target branch and fail unless the bump was requested. Starting with 67.0, Apex runs in user mode by default ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)), so the critical jump is from 66.0 or lower to 67.0 or later; that jump needs a decision on access and a `System.runAs()` test with a restricted user.
- **Test deployment:** in the sandbox `sf project deploy start --dry-run --test-level RunLocalTests`; Salesforce says not to use `deploy validate` on sandboxes. Before the release, run `sf project deploy validate` against production, then `sf project deploy quick` with that job ID. `RunRelevantTests` is still beta.
- **Merge block:** required status checks set to strict or a merge queue, code owners and "Do not allow bypassing the above settings" on the protected branch.
```

## sfdx-hardis covers most of it as open source

[sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/), open source under AGPL-3.0, runs two control jobs on pull requests into a major branch such as integration, according to its [documentation on pull request results](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/). One simulates the deployment in the target org, runs the tests, checks coverage and posts the result as a comment on the pull request. The other checks code quality and comments its findings as well. A comment is not a gate yet: the jobs only block the merge once they are required checks on the protected branch. In the documented configuration only the release manager may change the error threshold, and exceptions are meant "only for false positives, never to publish faster" ([MegaLinter errors](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/)).

ApexGuru and org-specific rules such as the version check are not part of the documented jobs; add them as extra steps. sfdx-hardis also lists an automatic coding-agent fix for failed deployments, which is still in beta ([overview](https://sfdx-hardis.cloudity.com/salesforce-devops-home/)). I would accept such fixes only if they pass the same checks and a person reviews them. How the rest of the pipeline fits together is covered in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

## Write the checks into every partner contract

Setting up these checks for programs with several partners is the core of my [DevOps and release management](../../services/devops-release-management/) work. The order matters, because a partner can disable any threshold as long as they own the pipeline.

1. **Own the pipeline.** You own the repository, pipeline and thresholds, as described in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).
2. **Let code analysis block from High** and publish the full report on every pull request.
3. **Dry-run deploy every pull request** into an integration sandbox with all your own tests, and validate against production before each release.
4. **Stop unrequested version changes** and require a test as a restricted user for every requested one. Put the same rule into the [AI rules file of your repository](../ai-rules-file-salesforce-repository/), so agents know the requirement before the pipeline stops them.
5. **Protect the main branch** without an admin exception, with strict checks or a merge queue and code owners on your side for sharing and integrations.
6. **Run ApexGuru** as a report, activated in an org where it has runtime data.
7. **Count failed checks per partner and category** every month. A rise in a category shows which rule is missing from the rules file or the contract.
