---
title: "Salesforce permission concept with permission sets"
description: "Profiles or permission sets? How a Salesforce permission concept is built and how it stays clean when several partners build on the same org."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-permission-concept-permission-sets
translationKey: permission-concept-permission-sets
topic: security
categories: [architecture, devops]
tags: [permission concept, permission sets, security, partner governance]
takeaways:
  - "In June 2026, Salesforce canceled its plan to retire permissions on profiles. New permissions should still go into permission sets."
  - "The concept has two layers: what a user may do, and which records they see through sharing. Permissions such as View All Data bypass sharing."
  - "I recommend as few lean base profiles as possible, permission sets per function and permission set groups per job function, owned by the client."
  - "With several partners, each stream delivers permission sets for its features, while the mapping to job functions stays with the client and goes through review."
faq:
  - q: "What is the difference between a profile and a permission set?"
    a: "Every user has exactly one profile and can also be assigned several permission sets and permission set groups that match their license. Both can grant object, field and system permissions; settings such as login hours, IP ranges, default app, default record types and page layout assignments only exist on the profile."
  - q: "Is Salesforce retiring permissions on profiles?"
    a: "No. Salesforce had announced the end of permissions on profiles for Spring '26 and canceled the retirement in June 2026. The recommendation remains the same: use profiles for baseline settings and grant new permissions through permission sets and permission set groups."
  - q: "What is a permission set group?"
    a: "A permission set group bundles several permission sets for one job function, for example inside sales. A muting permission set in the group removes individual permissions without changing the sets themselves. It only affects permissions from that group: if the user is granted the same permission through their profile, a directly assigned permission set or another group, it stays in place."
  - q: "Who should own the permission concept?"
    a: "The client. Partners deliver the permission sets for their features, but who gets which job function and which permissions it bundles is decided by the client. The technical check happens in the pull request review, and the owner of the role matrix approves it on the business side."
  - q: "How do I check which permissions a user really has in Salesforce?"
    a: "Use the access summary on the user record. It shows whether a permission comes from the profile, a permission set or a group. Compare it regularly with the role matrix, especially for system permissions such as Modify All Data and for integration users."
draft: false
---

A Salesforce permission concept defines what every user may do and which records they see. Today I build it with as few lean base profiles as possible, permission sets per function and permission set groups per job function. Profiles only hold settings that exist nowhere else, such as login hours, IP ranges, default app, default record types and page layout assignments. When several partners work on the org, each stream delivers the permission sets for its features, and the client decides which job function gets which sets. That keeps the concept readable, even after the third change of partner.

## Which two layers does a permission concept have?

Many concepts mix two questions that should be planned separately:

| Layer | Question | Tools in Salesforce |
|---|---|---|
| Permissions | What may the user do? Which objects, fields, apps and functions? | Profile, permission set, permission set group |
| Visibility | Which records do they see? | Among others org-wide defaults, role hierarchy, sharing rules, teams, territories, and sharing sets and share groups for portal users |

A field service technician, for example, may edit work orders (permissions) but only sees the work orders of their region (visibility). A dealer in the portal may create warranty claims but only sees the assets of their own customers. If you mix both layers in one document, you will not be able to tell later why a user sees something they should not. They are not fully independent, though: permissions such as "View All" on an object or "View All Data" bypass sharing. Effective access comes from both layers together.

## Profiles or permission sets?

Every user has exactly one profile and can have several permission sets. For a long time almost all permissions lived on the profile. I know the result from many orgs that have grown over time: every combination of country, department and special case gets a new profile, until there are thirty of them that differ in small details.

In 2023 Salesforce announced it would retire permissions on profiles in Spring '26 ([Salesforce Admins blog](https://admin.salesforce.com/blog/2023/permissions-updates-learn-moar-spring-23)). In June 2026 Salesforce announced in a knowledge article that it had canceled the retirement ([Salesforce Ben](https://www.salesforceben.com/salesforce-backtracks-on-permission-retirement-in-profiles/)). So profiles keep their permissions. The direction is still clear: new features are being added to permission sets and permission set groups, not to profiles. That is why I treat profiles like change sets: they still work, but nobody should build anything new on them.

```hinweis tipp
Before creating any new profile, check whether a permission set is enough. In most cases it is. A new profile is really only needed for a different user license or for settings that only exist on the profile: different login rules, default app, default record types or page layouts.
```

## Base profile, permission sets and groups per job function

I build it in three layers:

1. **As few base profiles as possible.** Usually, I use one per user license for internal users, portal users and integration users, and add another only when default app, page layouts or login rules really differ. The profile holds baseline settings, not business permissions. Salesforce provides the "Minimum Access - Salesforce" profile as a starting point, and "Minimum Access - API Only Integrations" for integrations.
2. **Permission sets per function.** One set for "create quotes", one for "dispatch work orders", one for "review warranty claims". A set describes a capability, not a person.
3. **Permission set groups per job function.** The group "inside sales" bundles the sets this job function needs. Country does not belong in the group; it belongs in the visibility layer. If a job function explicitly must not have a permission from one of the sets, a muting permission set removes it within that group. That only affects permissions from the group itself, not the same permission from the profile or a directly assigned set. I deliberately say job function here, because "role" in Salesforce means the role hierarchy for visibility.

Users are then assigned a base profile and one or two groups. The assignment can be automated with user access policies, if your edition offers them, for example based on the department or country field on the user record. It must also be clear who may change these fields, and the policy must remove access when someone changes jobs. When an employee moves from sales to service, you swap a group instead of replacing a profile with a hundred differences.

I plan visibility separately. For manufacturers with subsidiaries in many countries, it usually starts with a simple question: can the sales team in France see the customers in Germany? If the answer is no, the org-wide default for accounts is private and the role hierarchy reflects countries and regions in separate branches. Keep in mind that the role hierarchy opens access upward: anyone above both country branches can see both. So it follows the need for visibility, not the org chart. Exceptions, such as a key account manager for a customer group across several countries, are handled with sharing rules or account teams. Dealers and service partners in the portal see their records, depending on their license, through external org-wide defaults, sharing sets, share groups or partner roles. These decisions belong in the concept early, because changing them later takes a lot of testing.

Integration users get their own rule: one user per interface, with the Salesforce Integration license and the "Minimum Access - API Only Integrations" profile, plus one permission set with exactly the objects, fields and permissions that interface needs. An integration user with "Modify All Data" poses a high risk, because this permission bypasses sharing for the whole org and often nobody knows anymore what the user is allowed to do. How to clean up existing integration users is covered in [cleaning up integration users](/en/blog/salesforce-integration-users-cleanup/).

## How does the concept stay clean when several partners build?

With several partners, the mess rarely comes from bad intent. Each partner quickly needs a permission for their feature, and the fastest way is to extend an existing profile. After a year nobody can say which permission belongs to which feature.

I consider these rules the minimum:

- **Every stream delivers its own permission sets.** The set carries the capability in its name, such as `FS_Dispatcher` or `SALES_Quote`; stream and owner go into the description. Which stream owns which object is defined in the [object ownership matrix](/en/blog/salesforce-object-ownership-matrix/).
- **Profiles and groups belong to the client.** Partners may propose changes, but the client decides which job function gets which set. A pull request that changes a profile or a group needs approval from a named reviewer on the client side.
- **Permissions go through review.** Permission sets are metadata in the repository and show up in the pull request like code. The reviewer checks whether a new permission is really needed, especially "View All", "Modify All" and system permissions. I cover this in more detail in [why pull request reviews are a must](/en/blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).
- **A role matrix owned by the client.** A table with job functions in the rows and permission sets in the columns. It is the approved target state; the groups in Salesforce are the technical implementation. A regular comparison against effective access in Salesforce shows where directly assigned sets or old profile permissions differ from the target state.

```vertiefung For admins
title: How do I migrate from many profiles to permission sets?
Salesforce offers the free User Access and Permissions Assistant, which analyzes existing profiles and can move permissions into permission sets. Settings such as default app, page layouts and login rules stay on the profile.
- First define job functions and capabilities in the role matrix, otherwise thirty profiles just become thirty permission sets.
- Put permissions that every user with a license needs into a baseline permission set, move the differences into permission sets per function and bundle them into groups.
- Switch users step by step, country by country, and only delete custom profiles once nobody uses them.
```

## Take stock of profiles and system permissions

Start with an inventory: how many profiles exist, how many users are assigned to each one, and which integration users have system permissions such as "Modify All Data"? Then write down the role matrix before you rebuild anything in Salesforce. From now on, new features are only granted through permission sets. The migration of the old profiles can then follow job function by job function. For the first number, a user report grouped by profile is enough. Each integration user then gets its own permission set with access to exactly the objects its interface reads or writes. I describe how I set this up on the client side in [Salesforce architecture on the client side](/en/services/salesforce-architecture/).
