---
title: "Salesforce permission concept with permission sets"
description: "Profiles or permission sets? How a Salesforce permission concept is built and how it stays clean when several partners build on the same org."
pubDate: 2026-10-29
lang: en
slug: salesforce-permission-concept-permission-sets
translationKey: permission-concept-permission-sets
topic: security
categories: [architecture, devops]
tags: [permission concept, permission sets, security, partner governance]
takeaways:
  - "A Salesforce permission concept has two layers: what a user may do (objects, fields, functions) and which records they see (sharing)."
  - "Profiles keep their permissions for now, but Salesforce only develops permission sets and permission set groups further. New permissions belong there."
  - "I recommend one lean base profile per licence type, permission sets per function and permission set groups per role, owned by the client."
  - "With several partners, each stream delivers permission sets for its features, while the mapping to roles stays with the client and goes through review."
faq:
  - q: "What is the difference between a profile and a permission set?"
    a: "Every user has exactly one profile but any number of permission sets. Both can grant object, field and system permissions; settings such as login hours and IP ranges only exist on the profile."
  - q: "Is Salesforce retiring permissions on profiles?"
    a: "Salesforce had announced the end of permissions on profiles for Spring '26 and later did not enforce that date. The recommendation stays the same: grant new permissions through permission sets and permission set groups."
  - q: "What is a permission set group?"
    a: "A permission set group bundles several permission sets into one role, for example inside sales Germany. A muting permission set in the group removes single permissions again without changing the sets themselves."
  - q: "Who should own the permission concept?"
    a: "The client. Partners deliver the permission sets for their features, but who gets which role and which permissions a role bundles is decided by the client and checked in the pull request review."
draft: false
---

A Salesforce permission concept defines what every user may do and which records they see. Today I build it with one lean base profile per licence type, permission sets per function and permission set groups per role. Profiles only carry what exists nowhere else, such as login hours and IP ranges. When several partners work on the org, each stream delivers the permission sets for its features, and the client decides which role gets which sets. That keeps the concept readable, even after the third change of partner.

## Which two layers does a permission concept have?

Many concepts mix two questions that Salesforce answers separately:

| Layer | Question | Tools in Salesforce |
|---|---|---|
| Permissions | What may the user do? Which objects, fields, apps and functions? | Profile, permission set, permission set group |
| Visibility | Which records do they see? | Org-wide defaults, role hierarchy, sharing rules, teams |

A field service technician, for example, may edit work orders (permissions) but only sees the work orders of their region (visibility). A dealer in the portal may create warranty claims but only sees the assets of their own customers. If you mix both layers in one document, you will not find out later why a user sees something they should not.

## Profiles or permission sets?

Every user has exactly one profile and any number of permission sets. For a long time almost all permissions lived on the profile. I know the result from many grown orgs: every combination of country, department and special case gets a new profile, until there are thirty of them that differ in small details.

In 2023 Salesforce announced it would retire permissions on profiles with Spring '26 ([Salesforce Admins blog](https://admin.salesforce.com/blog/2023/permissions-updates-learn-moar-spring-23)). Salesforce later did not enforce that date ([Salesforce Ben](https://www.salesforceben.com/salesforce-permissions-profiles-the-latest-retirement-updates/)). So profiles keep working. The direction is still clear: new features arrive for permission sets and permission set groups, not for profiles. That is why I treat profiles like change sets: they still work, but nobody should build anything new on them.

```hinweis tipp
Before creating any new profile, check whether a permission set is enough. In most cases it is. A new profile is really only needed for a new licence type or different login rules.
```

## What does a concept built on permission sets look like?

I build it in three layers:

1. **One base profile per licence type.** One profile for internal users, one for portal users, one for integration users. It contains only what every user of that type needs, plus login settings. Salesforce provides the "Minimum Access - Salesforce" profile as a starting point.
2. **Permission sets per function.** One set for "create quotes", one for "dispatch work orders", one for "review warranty claims". A set describes a capability, not a person.
3. **Permission set groups per role.** The role "inside sales Germany" bundles the sets this role needs. If a role explicitly must not have a permission from one of the sets, a muting permission set removes it within that group.

Users then get a base profile and one or two groups. The assignment can be automated with user access policies, for example based on department or country on the user record. When an employee moves from sales to service, you swap a group instead of a profile with a hundred differences.

I plan visibility separately. For manufacturers with subsidiaries in many countries it usually starts with a simple question: may sales in France see the customers in Germany? If the answer is no, the org-wide default for accounts is private and the role hierarchy reflects countries and regions. Exceptions, such as a key account manager for a group customer across several countries, are handled with sharing rules or account teams. This decision belongs in the concept early, because changing it later takes a lot of testing.

Integration users get their own rule: one user per interface, one permission set with exactly the objects and fields that interface reads or writes. An integration user with "Modify All Data" is the biggest risk in many orgs, because nobody knows any more what it is allowed to do.

## How does the concept stay clean when several partners build?

With several partners the mess rarely comes from bad intent. Each partner quickly needs a permission for their feature, and the fastest way is to extend an existing profile. After a year nobody can say which permission belongs to which feature.

I consider these rules the minimum:

- **Every stream delivers its own permission sets.** The set carries the stream in its name, such as `FS_Dispatcher` or `SALES_Quote`. Which stream owns which object is defined in the [object ownership matrix](../salesforce-object-ownership-matrix/).
- **Partners do not change profiles or groups.** The client decides which role gets which set. A pull request that changes a profile or a group needs approval from the client side.
- **Permissions go through review.** Permission sets are metadata in the repository and show up in the pull request like code. The reviewer checks whether a new permission is really needed, especially "View All", "Modify All" and system permissions. More on that in [why pull request reviews are a must](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).
- **A role matrix owned by the client.** A table with roles in the rows and permission sets in the columns. It is the business truth; the groups in Salesforce are the technical implementation.

```vertiefung For admins
title: How do I migrate from many profiles to permission sets?
Salesforce offers the free User Access and Permissions Assistant, which analyses existing profiles and can move permissions into permission sets.
- First collect the permissions that all profiles of one licence type share and put them into the base profile.
- Then move the differences into permission sets per function and bundle them into groups.
- Switch users step by step, country by country, and only delete the old profiles once nobody uses them.
```

## Where do you start?

Start with an inventory: how many profiles exist, how many users hang on each one, and which integration users have system permissions such as "Modify All Data"? Then write down the role matrix before you rebuild anything in Salesforce. From now on new features only get permission sets. The migration of the old profiles can follow role by role.

A good permission concept is a table the client owns plus a rule that every new permission goes through a review. Read more about [Salesforce architecture on the client side](../../services/salesforce-architecture/).
