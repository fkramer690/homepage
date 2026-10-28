---
title: "Building a Salesforce pipeline: from pull request to prod"
description: "How a Salesforce pipeline works: pull requests, validation, Apex test levels, delta deployments, deployment steps, deletions and a JWT login without passwords."
lang: en
slug: building-the-pipeline
course: devops
translationKey: devops-05
chapter: 5
pubDate: 2026-10-28
short: "Building the pipeline"
summary: "The building blocks of a Salesforce pipeline, from pull requests, test levels and delta deployments to a login without passwords."
takeaways:
  - "Every change goes through a pull request that triggers a validation deployment against the target org; merging requires a green validation and an approved review."
  - "RunLocalTests is the default for production; Salesforce still labels RunRelevantTests as beta and says it does not belong in production pipelines yet."
  - "Quick deploy reuses a successful validation for up to ten days without running the tests again, which shortens the production release window."
  - "Steps before and after a deployment belong in the pipeline under version control, for example as sfdx-hardis deployment actions, not in a spreadsheet of manual tasks."
  - "The pipeline logs in with the JWT bearer flow and a certificate; certificate and keys belong to the client and are replaced when a partner leaves."
articles: [sfdx-hardis-introduction, pull-request-reviews-enterprise, salesforce-password-integrations-2027, sfdx-hardis-training]
faq:
  - q: "Which Apex test level should a production pipeline use?"
    a: "RunLocalTests. It is the default for production deployments that contain Apex and runs all tests except those from installed packages. RunSpecifiedTests saves time but requires 75 percent coverage for each deployed class and trigger individually. RunRelevantTests is still beta."
  - q: "What is a quick deploy in Salesforce?"
    a: "A quick deploy reuses a successful validation without running the Apex tests again. According to the Metadata API Developer Guide, the validation must be at most ten days old, and tests and coverage must have passed."
  - q: "Why should the pipeline not log in with a username and password?"
    a: "The OAuth username-password flow for connected apps ends on 20 February 2027. For CI, Salesforce describes the JWT bearer flow with a certificate, so no technical user's password sits in a pipeline variable any more."
  - q: "Do I need a commercial tool for steps before and after a deployment?"
    a: "No. sfdx-hardis ships deployment actions as open source, and Gearset and Copado have their own versions. What matters is that the steps live in the client's repository or tool, not in a spreadsheet."
draft: false
---

A Salesforce pipeline takes every change to production along the same route: feature branch, pull request, validation deployment against the target org with Apex tests, review, merge, deployment. `RunLocalTests` is the right test level for production, and after the merge a quick deploy reuses the validation that already passed. Delta deployments keep runs short. Steps before and after a deployment live in the pipeline, and deletions run through destructive manifests. The pipeline logs in with JWT and a certificate, never with a password, and reports results to the pull request and the team channel. sfdx-hardis provides these blocks as open source; Gearset, Copado and Flosum as commercial platforms.

## How does a pull request move through the pipeline?

A pipeline is a fixed sequence of automated steps that takes a change from the repository into an org. Which environments and branches exist is covered in [chapter 3](../environments-and-branching/), which tool to pick in [chapter 4](../devops-tools-compared/). This chapter is about the route itself. For one change it looks like this:

1. A developer or admin builds in their developer sandbox and commits to a feature branch, one user story per branch.
2. They open a pull request against the integration branch.
3. The pipeline works out the changed metadata, runs static analysis and starts a validation deployment against the org behind the target branch, with Apex tests.
4. The results appear as a comment on the pull request. According to its [documentation](https://sfdx-hardis.cloudity.com/salesforce-devops-home/), sfdx-hardis posts the deployment simulation results on every pull request.
5. A person reviews architecture, data model and side effects. Why I consider that review mandatory is in [why pull request reviews are a must](../../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).
6. Merging requires a green validation and an approval. Your Git platform's branch protection enforces this, not the discipline of the teams.
7. After the merge, the pipeline deploys to the org, as a quick deploy where possible, and runs the steps before and after the deployment.
8. The team and the ticket learn the result.

```praxis
In one programme I supported, every pull request went across my desk at first. Once the process ran smoothly, I handed it over to an internal colleague.
```

The same pattern repeats from integration to UAT and from UAT to production. Gearset Pipelines works the same way at its core: according to the [Gearset docs](https://docs.gearset.com/en/articles/6166062-promoting-your-first-features-in-gearset-pipelines), Gearset checks each pull request for merge conflicts and validates its metadata against the target org, and "Promote changes" then starts a job that merges and deploys. The difference is that you operate it through a web interface.

## Validation and quick deploy

A validation deployment goes through every check of the target org, Apex tests included, but saves nothing. In the Salesforce CLI it is [`sf project deploy validate`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html), which returns a job ID. With that ID, `sf project deploy quick --job-id` deploys the validated components without running the tests again, as the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-develop-any-org.html) describes.

The conditions are in the [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deployRecentValidation.htm): the validation is at most ten days old, the Apex tests in the target org have passed, and coverage is sufficient. With all local tests, that means 75 percent overall coverage and some coverage for every trigger; with `RunSpecifiedTests`, 75 percent for each deployed class and trigger individually. Gearset's [quick deploy article](https://docs.gearset.com/en/articles/6952110-quick-deploy) adds two practical conditions: no other deployment has run since the validation, and the org has not changed.

According to its [command reference](https://sfdx-hardis.cloudity.com/hardis/project/deploy/sources/dx/), sfdx-hardis tries a quick deploy automatically after the merge, and `SFDX_HARDIS_QUICK_DEPLOY=false` turns it off. For production I recommend running the validation during the day and starting only the quick deploy in the release window. The long test phase then falls outside the time when field service and service teams are waiting for the system.

## Which Apex test level fits which environment?

The test level decides which Apex tests a deployment runs. The [CLI reference for `project deploy start`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html) lists five values:

| Test level | What runs | Where I use it |
|---|---|---|
| `NoTestRun` | no tests; development environments only, where it is the default | syncing back into developer sandboxes |
| `RunSpecifiedTests` | only the named test classes; 75 % per deployed class and trigger | fast validation in feature pull requests, if the mapping of tests is maintained |
| `RunLocalTests` | all tests except those from installed packages; default for production deployments with Apex | validation against UAT, staging and production |
| `RunAllTestsInOrg` | also the tests of installed packages | rarely useful |
| `RunRelevantTests` (beta) | only tests relevant to the deployed files | try it in an integration sandbox |

`RunRelevantTests` arrived with Spring '26. The [Metadata API Developer Guide for Winter '27](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_run_relevant_tests.htm) still marks the feature as beta, with 75 percent coverage per class and trigger. The Salesforce blog says plainly that it should not yet be integrated into production pipelines. I would stick to that.

```vertiefung For developers
title: How does RunRelevantTests pick the tests?
According to the [Salesforce blog](https://www.salesforce.com/blog/faster-deployment-test-runs/), the platform selects tests from the compile-time dependency graph and can therefore miss dependencies that only exist at runtime, for example through dependency injection.

Two annotations cover that: `@IsTest(testFor=...)` ties a test class to specific classes, and `@IsTest(critical=true)` makes it run in every deployment.
```

sfdx-hardis also offers `RunRepositoryTests`, which detects and runs all test classes in the repository. That helps when the org holds old tests that nobody manages in the repository. Why 75 percent coverage is only the floor is covered in [chapter 6](../quality-tests-reviews/).

## Delta deployments: deploy only what changed

A delta deployment deploys only the metadata that changed between two Git states, instead of the whole repository. In a mature org with thousands of metadata files, that is the difference between a run you wait for and one that finishes while you do something else.

sfdx-hardis uses the open-source plugin sfdx-git-delta for this and turns it on with `useDeltaDeployment: true` in `config/.sfdx-hardis.yml`. According to the [documentation](https://sfdx-hardis.cloudity.com/salesforce-devops-config-delta-deployment/), delta applies only between minor and major branches, for example from a feature or hotfix branch into `integration` or `preprod`; between major branches, for example from UAT to production, the deployment stays complete. I think that is the right split. A delta occasionally misses a dependency, and the full deployment between the main stages catches it before it reaches production. Gearset Pipelines validates the metadata of each pull request, so it also works with just the change.

## Steps before and after the deployment

Almost every release has steps that are not metadata: activating a flow, loading reference data, scheduling a batch job, freezing users before the release. In many programmes they sit in a spreadsheet that someone works through by hand at 10 pm. Once they are part of the pipeline, they run the same way in every environment and are traceable in the repository.

In sfdx-hardis they are called [deployment actions](https://sfdx-hardis.cloudity.com/hardis/project/action/create/). The key rules from the documentation:

- **Types:** shell command, data import with SFDMU, Apex script, publish a community, manual instruction, schedule a batch or run it immediately, remove items from `package.xml`, activate User Access Policies.
- **Scope:** the whole project (`config/.sfdx-hardis.yml`), one target branch or a single pull request, each as a file in the repository.
- **Timing:** before or after the deployment. The default context is `process-deployment-only`, so actions run in the real deployment, not in the validation.
- **Safety:** according to the [command reference](https://sfdx-hardis.cloudity.com/hardis/project/deploy/sources/dx/), post-deployment actions never run when the metadata deployment failed, and by default they run only once per target org.
- **Evidence:** the results appear in a dedicated "Deployment Actions" comment on the pull request.

The commercial tools solve the same problem with their own interface. According to its [documentation](https://docs.gearset.com/en/articles/9859659-pre-and-post-deployment-steps-in-gearset-pipelines), Gearset attaches manual steps before and after the deployment, plus automatic steps after it, to the pull request, including activating flows, agents and bots. What I like is that a pull request cannot move forward until its pre-deployment steps are done. The feature is tied to the Automation Starter, Teams and Enterprise Add-on tiers. Copado's [documentation](https://docs.copado.com/article/7y7p18g4ef-deployment-steps) lists its own deployment steps attached to the user story, including Apex steps. How they look in your edition is best checked in a demo with your own org. How to move reference and configuration data cleanly is covered in [chapter 7](../data-and-configuration/).

## Destructive changes: deleting with a plan

Deleting is a deployment of its own in Salesforce. According to the [Salesforce documentation](https://developer.salesforce.com/docs/platform/salesforce-migration-guide/guide/daas-destructive-changes.html), a `destructiveChanges.xml` manifest lists the components to delete. `destructiveChangesPre.xml` deletes before the deployment, `destructiveChangesPost.xml` after it. The classic example: a custom object still referenced by an Apex class can only be deleted once the class has been changed; both go into one deployment, with the deletion in the post manifest. The CLI offers `--pre-destructive-changes` and `--post-destructive-changes` for this.

Two details from the same page every release manager should know. With `purgeOnDelete`, deleted components skip the Recycle Bin. And roll-up summary fields deleted through the Metadata API never go to the Recycle Bin.

sfdx-hardis runs a `manifest/destructiveChanges.xml` in a separate step and deletes flows through the Tooling API. According to its [branch actions documentation](https://docs.flosum.com/devops/code/branch-actions), Flosum supports destructive changes before or after the deployment per branch. In Copado's Advanced edition, according to its [documentation](https://docs.essentials.copado.com/en/articles/8596017-deploying-destructive-changes-using-copado-essentials), a deployment can be set to "Destructive" or "Standard Destructive"; with Git repositories, Copado also removes the metadata from the branch.

My rule: deleting a field also deletes its data. Think of a field on the asset that holds the SAP equipment number of installed machines. Deletions of fields and objects therefore get their own pull request, approved by the architect and the business owner. And I recommend deleting in two releases: first remove all references and watch, then delete in the next release.

## How does the pipeline log in without a password?

The pipeline needs a login for every org, and it must not be a password. The [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-auth-jwt-flow.html) describes the JWT bearer flow for this: the pipeline signs a token with a private key, and Salesforce checks it against the certificate of an external client app. For a Dev Hub that creates scratch orgs or sandboxes, the guide says you need a connected app instead. The command is `sf org login jwt` with client ID, key file and username.

```hinweis achtung
The OAuth username-password flow ends on 20 February 2027. If your pipeline still logs in with username, password and security token, the details are in [Salesforce password integrations end in 2027](../../../blog/salesforce-password-integrations-end-2027/).
```

sfdx-hardis sets this up with [`hardis:project:configure:auth`](https://sfdx-hardis.cloudity.com/hardis/project/configure/auth/): the command creates an external client app with the JWT bearer flow and a certificate, per branch. The certificate is stored encrypted in the repository or, if you prefer, in a password manager; client ID and decryption key are variables on the Git platform. With commercial platforms you authorise the orgs inside the vendor's platform. Ask which flow sits behind it and how the connection is removed when you cancel.

For the ownership question from [chapter 2](../release-process-ownership-roles/), this means:

- a dedicated technical user per org for the pipeline, with only the permissions a deployment needs,
- certificates, keys and pipeline variables in the client's vault and on the client's Git platform,
- new certificates as soon as a partner leaves the programme.

## Notifications: who learns what?

A pipeline whose result nobody sees is just a log. Three audiences need different information:

- **The author** needs details in the pull request: which component, which test, which error.
- **The team** needs a channel for failed runs and successful deployments. According to its [documentation](https://sfdx-hardis.cloudity.com/salesforce-devops-home/), sfdx-hardis notifies Slack, Microsoft Teams, Google Chat and email, and updates tickets when a change reaches an org. According to [Gearset](https://docs.gearset.com/en/articles/10264886-setting-up-notifications-in-pipelines), Gearset Pipelines reports validations, deployments and merge conflicts to Slack and Microsoft Teams.
- **The business** needs only the production releases, in its own language. How to tie this to the release calendar is covered in [chapter 8](../release-planning-salesforce-releases/).

A channel that announces every successful validation gets muted after two weeks.

## A typical scenario, as an assumption

A maker of industrial equipment uses Field Service and an SAP interface. All details are assumptions. A user story adds a warranty end date field to the asset, changes a flow and needs a new work type as a reference record.

- The pull request into the integration branch validates as a delta with `RunSpecifiedTests`, because the team maps its test classes properly.
- A post-deployment action loads the work type with SFDMU, scoped to this pull request only.
- An old warranty field is not deleted along the way. Its references go now; the deletion follows in the next release with its own approval.
- Against UAT and production the pipeline validates in full with `RunLocalTests`. The production validation runs in the morning, the quick deploy follows in the evening.
- The pipeline logs in with JWT, and the service team gets a message in its Teams channel.

None of this needs an expensive tool, but someone has to set it up and look after it. I have used sfdx-hardis in client projects for about two years; how it is built is explained in the [sfdx-hardis introduction](../../../blog/sfdx-hardis-open-source-salesforce-devops/), and if you want to build the route once yourself, the [free sfdx-hardis training](../../../blog/sfdx-hardis-free-devops-training/) covers exactly these steps as labs. I help with the setup as part of [DevOps and release management](../../../services/devops-release-management/), and all chapters are on the [overview page](../).

A good pipeline makes every release equally boring, whichever partner built the change. If you would like your pipeline reviewed or set up from scratch, [send me a message](#contact).
