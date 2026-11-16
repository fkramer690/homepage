---
title: "API 67.0 user mode: why Apex sees fewer records"
description: "From API 67.0, Apex runs in user mode and classes with sharing by default. Why a version bump hides records, why AI-written code is exposed and how to plan."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: api-67-apex-user-mode-fewer-records
translationKey: api-67-user-mode-apex
topic: release
categories: [devops]
tags: [apex, api 67.0, user mode, ai coding, release management, manufacturing]
takeaways:
  - "Code saved at 66.0 or earlier mostly keeps the old behavior until its version is raised; the risk lies in the version bump."
  - "Records hidden by sharing disappear from query results without an error, while a missing field permission makes a user-mode query fail with a QueryException."
  - "WITH SECURITY_ENFORCED no longer compiles at 67.0. WITH USER_MODE also checks polymorphic fields and the WHERE clause, so every replaced query needs a test."
  - "Coding agents can change API versions as a side effect and may test without System.runAs(). A version bump needs its own pull request."
  - "Full legacy system access at 67.0 requires without sharing plus WITH SYSTEM_MODE and a written reason; for field access alone, keep with sharing."
faq:
  - q: "Does API 67.0 change my existing Apex code automatically?"
    a: "No. The change is versioned: it applies to classes and triggers saved at API version 67.0 or later. Existing code without an explicit access mode keeps the old defaults until someone raises its version, with one exception: a class without a sharing declaration runs with sharing once a class in its inheritance chain is saved at 67.0. Every bump needs a test plan."
  - q: "Do Apex triggers run in user mode from API 67.0?"
    a: "Salesforce says triggers keep running without sharing and cannot declare a sharing mode. The handler classes they call are affected if they lack a declaration, and the current Apex Developer Guide recommends an explicit access mode on every database operation in triggers and handlers."
  - q: "What replaces WITH SECURITY_ENFORCED in API 67.0?"
    a: "WITH USER_MODE. At 67.0 a query with WITH SECURITY_ENFORCED fails to compile. WITH USER_MODE also enforces sharing and checks polymorphic fields and the WHERE clause, so test every replaced query with a restricted user."
  - q: "How do I see whether a query returns fewer records because of sharing?"
    a: "Run the logic in a test with System.runAs() as a restricted user, for example a technician, a dealer or the integration user, and assert exactly which records that persona must and must not see. Sharing filters records without an error, so the test has to know the expected count. Comparing with an unrestricted run helps to find the cause."
  - q: "Should we stay on API 66.0 to avoid the change?"
    a: "Only for a while. Salesforce recommends the latest API version and as few versions as possible in one codebase, and Winter '27 already warns about code at 9.0 to 19.0. Since Winter '27 the latest version is 68.0, which keeps the 67.0 defaults, so a move today normally targets 68.0. Plan it in batches instead of freezing versions."
draft: false
---

Apex code can see fewer records after you raise its API version to 67.0, because from that version database operations run in user mode and classes without a sharing declaration run with sharing. The change applies per class, so in most cases nothing happens until someone bumps a class. Then queries return only what the running user may see, without an error. AI coding agents make that bump more likely and test it less. I would treat every move past API 67.0, today usually straight to 68.0, as a planned change, tested as the people who actually run the code: technicians, dealers and the SAP integration user.

## What changes in Apex with API version 67.0?

Summer '26 reached production orgs between May 15 and June 13, 2026, depending on the instance, and brought API version 67.0 ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release)). The [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm) lists three versioned behavior changes for Apex:

- **User mode by default.** SOQL, SOSL, DML and Database methods enforce the running user's object permissions and field-level security. Up to 66.0, system mode was the default and the code had to enforce these checks itself.
- **With sharing by default.** A class without a sharing declaration runs in the current user's sharing context. Up to 66.0, such a class ran without sharing if it was an entry point, or took the mode of its caller. Aura controllers and @AuraEnabled methods called from Lightning web components already ran with sharing.
- **WITH SECURITY_ENFORCED is gone.** A query that uses it no longer compiles, and the deployment fails with "WITH SECURITY_ENFORCED is no longer supported, use WITH USER_MODE instead". The Developers Blog adds that WITH USER_MODE also checks polymorphic fields and the WHERE clause, so the replacement can be stricter than the original.

The word "versioned" is where the risk lies. Each class and trigger stores its own API version in its metadata, and the new behavior applies only to code saved at 67.0 or later. A class at 62.0 without an explicit access mode keeps running in system mode until somebody raises the version. One side effect is easy to miss: according to the [sharing documentation](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_classes_keywords_sharing.htm), an older class without a declaration runs with sharing as soon as any class in its inheritance chain is saved at 67.0. Bumping a base class can change classes nobody touched.

```vertiefung For developers
title: Do triggers run in user mode from API 67.0?
Triggers are the deliberate exception, although the sources describe it in different ways. The [Summer '26 architect highlights](https://www.salesforce.com/blog/summer-26-release-architect-highlights/) say triggers "always run in system mode and always will", while the handler classes they call are affected if they lack a declaration. The current guide says the trigger runs without sharing, but in its 67.0 example a query in the trigger body without an access mode runs in user mode.

Both give the same advice, and I follow it: set the access mode explicitly in triggers and handlers, and keep the logic in the handlers.
```

## Why does Apex see fewer records after the bump?

Two kinds of effects are at work, and they show up very differently.

**Record access filters silently.** Once a class runs with sharing, a query returns only the records the running user can see through org-wide defaults, roles, sharing rules and teams, and restriction rules can narrow it further. No exception and no warning tells you which records were left out. A method that counted all open service cases for a machine now counts those in the rep's territory and carries on with the smaller number.

**Permissions fail loudly.** In user mode, a query that selects a field the user cannot read fails. The [access mode documentation](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/apexref/apex_classes_enforce_usermode.htm) describes getInaccessibleFields() on the QueryException, which lists every field concerned, and getDmlFieldNames() for DML. That hurts in UAT, but someone notices.

```hinweis achtung
A database operation in user mode "always respects the user's sharing rules", says the same page. At 67.0, declaring the class without sharing is therefore not enough for a query without an access mode. Deliberately preserving the full old behavior requires both the class keyword and WITH SYSTEM_MODE. If code only needs to bypass field and object permissions, WITH SYSTEM_MODE in a class with sharing is the narrower choice, because in system mode the class keyword still decides record access.
```

For a manufacturer, who runs the code matters more than the code itself:

- **Integration users.** An Apex REST service that SAP or proALPHA calls to update order status runs as the integration user, whose permission set was often designed for system mode.
- **Dealers in the portal.** Controllers behind an Experience Cloud dealer portal mostly ran with sharing already, because @AuraEnabled methods did. The new part is field-level security: a field the dealer profile cannot read, selected but never shown, now breaks the component. More on portals in [the Manufacturing Cloud customer portal](/en/blog/manufacturing-cloud-customer-portal/).
- **Technicians and service reps.** Field Service technicians and service reps often see only their territory or their accounts. Logic that decides on goodwill, warranty or spare parts based on counts across all records gives different answers.

## Why is AI-generated Apex especially exposed?

**The models learned the old patterns.** Most public Apex predates Summer '26 and uses WITH SECURITY_ENFORCED or quietly relies on system mode. The first fails to compile at 67.0, which is the good case. The second compiles and fails only against real data. Salesforce's [guide on securing Apex for Lightning web components](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security) now builds on WITH USER_MODE and Security.stripInaccessible().

**Agents pick the version.** An agent writes an API version into every -meta.xml file it creates and may normalize metadata while changing a class. Salesforce itself recommends the latest API version and as few versions as possible in one codebase, ideally one. In my judgment, an agent following that advice blindly can bump classes as a side effect of unrelated user stories.

**Generated tests often miss visibility.** Unless the repository rules require restricted-user tests, an agent asked for 75 percent coverage tends to write tests that create their own records and run as a user who sees everything. The architect highlights state that tests passing at 66.0 do not guarantee the behavior at 67.0 and recommend testing as restricted users. Without System.runAs() and a realistic profile, the missing records never show up.

**Guardrails solve half the problem.** Salesforce's open-source development skills, which are also available as a plugin for Claude Code, "force the sharing keyword on all classes" ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills)). An explicit declaration beats the default, but an agent that adds with sharing to an SAP integration service has made a business decision nobody reviewed. The typical defects of AI code are covered in [reviewing AI-generated Salesforce code](/en/blog/reviewing-ai-generated-salesforce-code/); the point here is that the version number belongs on the review list.

## Worked example: consolidating API versions at a machine builder

Assume a machine builder with Service Cloud, a dealer portal and SAP S/4, connected through Apex REST services. All numbers are assumptions. After the Winter '27 compiler warnings for very old API versions, described in [what Winter '27 changes for your pipeline](/en/blog/salesforce-winter-27-what-changes-for-your-pipeline/), IT decides to move 220 Apex classes, saved between 38.0 and 62.0, to the current version 68.0. The partner's coding agent raises the versions, replaces WITH SECURITY_ENFORCED with WITH USER_MODE in 15 queries and fixes every compile error. All tests pass, coverage stays at 84 percent.

UAT finds three problems:

1. **The SAP order status update fails.** The REST service now queries in user mode, and the integration user cannot read two fields added last year. The interface monitor shows QueryException errors within the first hour. The fix is two lines in a permission set.
2. **The dealer page for open warranty claims stays empty.** Its query selects an internal cost field that dealers may not read. The fix is to remove the field from the query.
3. **The goodwill rule makes the wrong decision.** A trigger handler without a declaration counts warranty claims per machine over the past twelve months; more than two claims means no automatic goodwill. At 67.0 the handler runs in the service rep's sharing context. Claims filed by a dealer in another region are invisible to the rep, so the handler counts one claim instead of three and approves goodwill. No error appears anywhere. A tester from the warranty team noticed it only because they compared the results with a report.

Two of the three problems surface on their own. The third would have gone live and cost money, one credit note at a time.

## Plan the move past API 67.0 as a small project

I would run it as a small project with its own release plan:

1. **Take inventory.** List classes and triggers by API version, and flag those without a sharing declaration, those using WITH SECURITY_ENFORCED and those called by integration users, the portal or trigger handlers.
2. **Forbid bumps on the side.** A version change gets its own pull request. A pipeline check that compares API versions in changed metadata files catches accidental version changes, as described in [quality gates for AI code](/en/blog/quality-gates-for-ai-code-salesforce-pipeline/), and the rule belongs in the [AI rules file of your repository](/en/blog/ai-rules-file-salesforce-repository/) so agents know it in advance.
3. **Declare intent in code.** Every touched class gets an explicit sharing keyword, and every SOQL, SOSL, DML and Database operation gets an explicit access mode. System access needs a written reason in the class. See the box below.

4. **Test as real users.** For each domain, write at least one test with System.runAs() as a technician, a dealer and the integration user, asserting record counts rather than only that values are not null.
5. **Check integration permission sets first.** For every access gap, decide before the bump whether the integration user gets more field access or only the affected operation runs in system mode, so the gap is not discovered in production. Do not widen the permission set by reflex.

```vertiefung For developers
title: What a declared system access looks like in code
- A comment above the class says what it reads and why: "Reads every pending order for the SAP sync, independent of the running user. Reason: integration path, approved by the client architect."
- The class is declared `public without sharing class SapOrderSyncSelector`, because the sync must see every pending order regardless of sharing.
- Its query ends with `WITH SYSTEM_MODE`: `SELECT Id, OrderNumber, Status FROM Order WHERE Sync_Status__c = 'Pending' WITH SYSTEM_MODE`.
```
6. **Bump in batches by domain.** Integrations, dealer portal, service logic: each batch goes through UAT with someone from the business who knows what the numbers should be.

The first stage, the interfaces, is the quickest way to see whether integration users are missing field access. Planning such a move across several partners is part of my [DevOps and release management](/en/services/devops-release-management/) work.
