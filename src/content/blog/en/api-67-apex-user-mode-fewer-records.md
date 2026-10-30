---
title: "API 67.0 user mode: why Apex sees fewer records"
description: "From API 67.0, Apex runs in user mode and with sharing by default. Why a version bump hides records, why AI-written code is exposed and how to plan the move."
pubDate: 2026-10-27
lang: en
slug: api-67-apex-user-mode-fewer-records
translationKey: api-67-user-mode-apex
topic: release
categories: [devops]
tags: [apex, api 67.0, user mode, ai coding, release management, manufacturing]
takeaways:
  - "From API version 67.0, Apex database operations run in user mode and classes without a sharing declaration run with sharing; code saved at 66.0 or earlier keeps the old behaviour until its version is raised."
  - "Records hidden by sharing disappear from query results without an error, while a missing field permission makes a user-mode query fail with a QueryException."
  - "WITH SECURITY_ENFORCED no longer compiles at 67.0; its replacement WITH USER_MODE also checks polymorphic fields and the WHERE clause, so replaced queries need a test."
  - "AI coding agents learned pre-2026 Apex, may raise API versions as a side effect and write tests without System.runAs(), so a version bump needs its own pull request and tests as real users."
  - "At 67.0, without sharing alone no longer bypasses sharing for a query without access mode; deliberate system access needs without sharing, WITH SYSTEM_MODE and a written reason."
faq:
  - q: "Does API 67.0 change my existing Apex code automatically?"
    a: "No. The change is versioned: it applies to classes and triggers saved at API version 67.0 or later. Existing code keeps running in system mode until someone raises its version, which is why every bump needs a test plan."
  - q: "Do Apex triggers run in user mode from API 67.0?"
    a: "Salesforce says triggers keep running without sharing and cannot declare a sharing mode. The handler classes they call are affected if they lack a declaration, and the current Apex Developer Guide recommends an explicit access mode on every database operation in triggers and handlers."
  - q: "What replaces WITH SECURITY_ENFORCED in API 67.0?"
    a: "WITH USER_MODE. At 67.0 a query with WITH SECURITY_ENFORCED fails to compile. WITH USER_MODE also enforces sharing and checks polymorphic fields and the WHERE clause, so test every replaced query with a restricted user."
  - q: "How do I see whether a query returns fewer records because of sharing?"
    a: "Run the logic in a test with System.runAs() as a restricted user, for example a technician, a dealer or the integration user, and compare the result with an unrestricted run. Sharing filters records without an error, so only that comparison shows the gap."
  - q: "Should we stay on API 66.0 to avoid the change?"
    a: "Only for a while. Salesforce recommends the latest API version and as few versions as possible in one codebase, and Winter '27 already warns about code at 9.0 to 19.0. Plan the move in batches instead of freezing versions."
draft: false
---

Apex code can see fewer records after you raise its API version to 67.0, because from that version database operations run in user mode and classes without a sharing declaration run with sharing. The change applies per class, so nothing happens until someone bumps a class. Then queries return only what the running user may see, without an error. AI coding agents make that bump more likely and test it less. I would treat every move to API 67.0 as a planned change, tested as the people who actually run the code: technicians, dealers and the SAP integration user.

## What changes in Apex with API version 67.0?

Summer '26 reached production orgs between 15 May and 13 June 2026, depending on the instance, and brought API version 67.0 ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release)). The [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm) lists three versioned behaviour changes for Apex:

- **User mode by default.** SOQL, SOSL, DML and Database methods enforce the running user's object permissions and field-level security. Up to 66.0, system mode was the default and the code had to enforce these checks itself.
- **With sharing by default.** A class without a sharing declaration runs in the current user's sharing context. Up to 66.0, such a class ran without sharing if it was an entry point, or took the mode of its caller. Aura controllers and `@AuraEnabled` methods called from Lightning web components already ran with sharing.
- **WITH SECURITY_ENFORCED is gone.** A query that uses it no longer compiles, and the deployment fails with "WITH SECURITY_ENFORCED is no longer supported, use WITH USER_MODE instead". The Developers Blog adds that `WITH USER_MODE` also checks polymorphic fields and the WHERE clause, so the replacement can be stricter than the original.

The word "versioned" carries the risk. Each class and trigger stores its own API version in its metadata, and the new behaviour applies only to code saved at 67.0 or later. A class at 62.0 keeps running in system mode until somebody raises the version. One side effect is easy to miss: according to the [sharing documentation](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_classes_keywords_sharing.htm), an older class without a declaration runs with sharing as soon as any class in its inheritance chain is saved at 67.0. Bumping a base class can change classes nobody touched.

```vertiefung For developers
title: Do triggers run in user mode from API 67.0?
Triggers are the deliberate exception, described in different words. The [Summer '26 architect highlights](https://www.salesforce.com/blog/summer-26-release-architect-highlights/) say triggers "always run in system mode and always will", while the handler classes they call are affected if they lack a declaration. The current guide says the trigger runs without sharing, but in its 67.0 example a query in the trigger body without an access mode runs in user mode.

Both give the same advice, and I follow it: set the access mode explicitly in triggers and handlers, and keep the logic in the handlers.
```

## Why does Apex see fewer records after the bump?

Two mechanisms are at work, and they show up very differently.

**Sharing filters silently.** Once a class runs with sharing, a query returns only the records the running user can see through org-wide defaults, roles, sharing rules and teams. No exception, no log entry. A method that counted all open service cases for a machine now counts those in the rep's territory and carries on with the smaller number.

**Permissions fail loudly.** In user mode, a query that selects a field the user cannot read fails. The [access mode documentation](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/apexref/apex_classes_enforce_usermode.htm) describes `getInaccessibleFields()` on the `QueryException`, which lists every field concerned, and `getDmlFieldNames()` for DML. That hurts in UAT, but someone notices.

```hinweis achtung
A database operation in user mode "always respects the user's sharing rules", says the same page. At 67.0, `without sharing` on the class is therefore not enough for a query without an access mode. Keeping the old behaviour deliberately takes both, the class keyword and `WITH SYSTEM_MODE`.
```

For a manufacturer, who runs the code matters more than the code itself:

- **Integration users.** An Apex REST service that SAP or proALPHA calls to update order status runs as the integration user, whose permission set was often built for system mode.
- **Dealers in the portal.** Controllers behind an Experience Cloud dealer portal mostly ran with sharing already, because `@AuraEnabled` methods did. The new part is field-level security: a field the dealer profile cannot read, selected but never shown, now breaks the component. More on portals in [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).
- **Technicians and service reps.** Field Service technicians and service reps often see only their territory or their accounts. Logic that decides on goodwill, warranty or spare parts based on counts across all records gives different answers.

## Why is AI-generated Apex especially exposed?

**The models learned the old patterns.** Most public Apex predates Summer '26 and uses `WITH SECURITY_ENFORCED` or quietly relies on system mode. The first fails to compile at 67.0, which is the good case. The second compiles and fails only against real data. Salesforce's [guide on securing Apex for Lightning web components](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security) now builds on `WITH USER_MODE` and `Security.stripInaccessible()`.

**Agents pick the version.** An agent writes the API version into every `-meta.xml` file it creates and likes to tidy up metadata while it changes a class. Salesforce itself recommends the latest API version and as few versions as possible in one codebase, ideally one. In my judgement an agent following that advice blindly will bump classes as a side effect of unrelated user stories.

**Generated tests do not test visibility.** An agent asked for 75 percent coverage writes tests that create their own records and run as a user who sees everything. The architect highlights state that tests passing at 66.0 do not guarantee the behaviour at 67.0 and recommend testing as restricted users. Without `System.runAs()` and a realistic profile, the missing records never show up.

**Guardrails solve half the problem.** Salesforce's own skills for Claude Code "force the sharing keyword on all classes" ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills)). An explicit declaration beats the default, but an agent that writes `with sharing` on an SAP integration service has made a business decision nobody reviewed. The typical defects of AI code are covered in [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/); the point here is that the version number belongs on the review list.

## A typical scenario: consolidating API versions at a machine builder

Assume a machine builder with Service Cloud, a dealer portal and SAP S/4, connected through Apex REST services. All numbers are assumptions. After the Winter '27 compiler warnings for very old API versions, described in [what Winter '27 changes for your pipeline](../salesforce-winter-27-what-changes-for-your-pipeline/), IT decides to move 220 Apex classes, saved between 38.0 and 62.0, to 67.0. The partner's coding agent raises the versions, replaces `WITH SECURITY_ENFORCED` with `WITH USER_MODE` in 15 queries and fixes every compile error. All tests pass, coverage stays at 84 percent.

UAT finds three problems:

1. **The SAP order status update fails.** The REST service now queries in user mode, and the integration user cannot read two fields added last year. The interface monitor shows `QueryException` errors within the first hour. The fix is two lines in a permission set.
2. **The dealer page for open warranty claims stays empty.** Its query selects an internal cost field that dealers may not read. The fix is to remove the field from the query.
3. **The goodwill rule decides wrongly.** A trigger handler without a declaration counts warranty claims per machine over the past twelve months; more than two claims means no automatic goodwill. At 67.0 the handler runs in the service rep's sharing context. Claims filed by a dealer in another region are invisible to the rep, so the handler counts one claim instead of three and approves goodwill. No error anywhere. A tester from the warranty team only noticed because she compared results with a report.

Two of three problems announce themselves. The third would have gone live and cost money, one credit note at a time.

## How should you plan the move to API 67.0?

I would run it as a small project with its own release plan:

1. **Take inventory.** List classes and triggers by API version, and flag those without a sharing declaration, those using `WITH SECURITY_ENFORCED` and those called by integration users, the portal or trigger handlers.
2. **Forbid bumps on the side.** A version change gets its own pull request. A pipeline check that compares API versions in changed metadata files catches the rest, as described in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/), and the rule belongs in the [AI rules file of your repository](../ai-rules-file-salesforce-repository/) so agents know it upfront.
3. **Declare intent in code.** Every touched class gets an explicit sharing keyword and every query an explicit access mode. System access needs a written reason:

```apex
// Reads every pending order for the SAP sync, independent of the running user.
// Reason: integration path, approved by the client architect.
public without sharing class SapOrderSyncSelector {
    public static List<Order> pendingOrders() {
        return [SELECT Id, OrderNumber, Status FROM Order
                WHERE Sync_Status__c = 'Pending' WITH SYSTEM_MODE];
    }
}
```

4. **Test as real users.** For each domain, at least one test with `System.runAs()` as a technician, a dealer and the integration user, asserting record counts and not just "not null".
5. **Check integration permission sets first.** Give integration users the field access their services need before the bump, so the interface does not find out in production.
6. **Bump in batches by domain.** Integrations, dealer portal, service logic: each batch goes through UAT with someone from the business who knows what the numbers should be.

Planning such a move across several partners is part of my [DevOps and release management](../../services/devops-release-management/) work.

API 67.0 makes Apex safer by default, and the price is that every version bump becomes a change in data access that deserves its own test.
