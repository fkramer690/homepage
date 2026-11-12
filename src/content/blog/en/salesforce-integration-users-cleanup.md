---
title: "Salesforce Integration User: Remove Admin Access"
description: "Technical users with admin access are a risk. How to move integrations to the Salesforce Integration User licence with least-privilege permission sets."
pubDate: 2026-11-06
lang: en
slug: salesforce-integration-users-cleanup
translationKey: salesforce-integration-users-cleanup
topic: data
categories: [architecture]
contactBrief: integration
tags: [Salesforce Integration User, technical users, permissions, interfaces, security, permission sets]
takeaways:
  - "Integration users with the System Administrator profile can change every record. Treat every request for admin access as an exception that must be justified."
  - "According to Salesforce, Enterprise, Unlimited and Performance Edition include five Integration User licences at no extra cost, limited to API access."
  - "The licence does not restrict a user's permissions. Permission sets and sharing decide which data the integration can reach."
  - "Some permission types, such as Apex class access, are not available in permission sets tied to the integration licence. Check this before the switch."
  - "Use a tested cutover, lock the old user right away and keep reactivation as a documented emergency step."
faq:
  - q: "What is the Salesforce Integration User?"
    a: "A user with the Salesforce Integration licence and the Minimum Access - API Only Integrations profile. It can only log in through the API, not through the user interface. It receives its object and field access through permission sets."
  - q: "How many Integration User licences are free?"
    a: "According to Salesforce, Enterprise, Unlimited and Performance Edition automatically include five Salesforce Integration licences at no extra cost. More are available through your account executive."
  - q: "Does an interface need admin rights?"
    a: "Usually not. Salesforce recommends testing with minimal access and adding only what is needed. Treat a vendor's request for the administrator profile as an exception that the vendor must justify and that you must test."
  - q: "Can one integration share another integration's user?"
    a: "It is better not to do so. A shared user accumulates the sum of all permissions, and the record fields Created By and Last Modified By no longer show which interface made a change. Salesforce recommends one user per integration."
draft: false
---
Technical users used for interfaces can end up with more access than any person in the company: the System Administrator profile, Modify All Data and password-based login. To clean this up, move each integration whose needs fit the licence to its own Salesforce Integration User with API-only access and least-privilege permission sets. This article shows what the licence does and where its limits are, how to take stock of identities, apps and logins, and how to switch without an outage or leaving the old admin user active.

## Why do integration users have too much access?

The risk usually starts with the setup: a vendor or partner needs access quickly, the fastest way is a user with the System Administrator profile, and once the interface works, nobody revisits the user. In a review, look for three patterns:

```tabelle
title: Three patterns to look for in a review
columns: Pattern | What it looks like | What it costs you
Admin for everything | The ERP interface for customers and orders has the System Administrator profile | It can change every record, although it writes a handful of objects *
One user for several systems | ERP, marketing tool and middleware log in with the same user | Sum of all permissions, audit fields no longer show which interface made a change
Password logins | Username and password, often with a security token | OAuth username-password and SOAP login() are being retired during 2027
note: Each pattern on its own is reason enough to include the user in the switch.
```

The timeline for retiring login methods is described in [Salesforce password integrations end in 2027](/en/blog/salesforce-password-integrations-end-2027/). The risk of the first pattern is obvious: if the credentials leak, for example at a vendor, the attacker has the administrator's access. How quickly that can happen is shown by the incident I describe in [Connected Apps and AI tools: lessons from Salesloft Drift](/en/blog/connected-apps-oauth-ai-integrations/).

## The Integration User licence limits the user to the API

Salesforce offers a dedicated licence for system-to-system integrations. According to the [Salesforce Admin blog](https://admin.salesforce.com/blog/2023/best-practices-for-configuring-your-integration-user), Enterprise, Unlimited and Performance Edition automatically include five Salesforce Integration licences at no extra cost. More are available through your account executive.

It can also free up full licences. An integration user with a Sales or Service Cloud licence consumes a licence that a person could use, so moving the integration to the dedicated licence can avoid the need to buy another one. Which licences users actually need is covered in [Salesforce licences: does everyone need a full licence?](/en/blog/salesforce-licences-full-licence-needed/)

The licence comes with the Minimum Access - API Only Integrations profile. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=User-Permission-for-API-Integration-User&language=en_US&type=1), this profile enables API access and restricts the user to it, and API-only access cannot be turned off. Logging in through the user interface is therefore ruled out.

```hinweis achtung
The licence does not restrict the user's permissions by itself. The associated Salesforce API Integration permission set licence makes many administrative permissions available; which permissions the user receives depends on your permission sets. And some permission types are not available in permission sets tied to it, for example Apex class access, custom permissions and named credential access. Salesforce's workaround is a second permission set without that licence. Check these limitations for every integration before the switch.
```

The details are in the Salesforce article on [missing permissions with the API Integration licence](https://help.salesforce.com/s/articleView?id=001453686&language=en_US&type=1). Keep the profile at minimum access; it controls defaults, login hours and IP ranges. Object and field access is granted through a dedicated permission set, or a permission set group where several reusable sets are combined. Record access still follows sharing. The app's OAuth scopes and policies add a separate layer: they limit how the application authenticates and which APIs it may use, not which records it can access. That matches the setup I describe for human users in [permission concept with permission sets](/en/blog/salesforce-permission-concept-permission-sets/).

## Take stock of users, apps and login methods

The inventory covers more than user records. Go through all active users that are not assigned to a person, and also check human users whose credentials an interface still uses. For each one, record:

```tabelle
title: Inventory of integration users
columns: Check | Where you see it | Warning sign
Profile and permissions | User details, assigned permission sets | System Administrator, Modify All Data, View All Data *
Login method | Login history of the user | Username and password, SOAP login() *
Calling application | Login history, External Client Apps and Connected Apps | Several applications with the same user
IP ranges | Profile | No login IP ranges, although the caller has fixed addresses
Credentials | Middleware, secret store | Secret or private key in a configuration file, no rotation
Ownership | Usually nowhere | Nobody can say what the user is for
note: Use one line per integration, not per user: a shared user then appears several times, which is a finding in itself.
```

For the ERP interface, the objects usually follow from the data flows, as described in [Manufacturing Cloud and SAP: data flows](/en/blog/manufacturing-cloud-sap-integration-data-flows/).

Unclaimed users require the greatest care. Before you lock them, check the login history, the job schedules and the middleware configuration, because a quarterly or year-end interface may not have logged in for weeks. If the dependency stays unclear, freeze the user for a fixed period with a named contact for escalation.

## The permissions follow from what the interface does

For each interface, build the permission set from three sources: the documented data flows, the vendor's list of objects and fields, and what the interface actually does in sandbox tests. Keep read and write access separate: an interface that transfers orders from Salesforce to the ERP needs read access to orders and write access only to the status field.

According to the Admin blog, an interface usually does not need the System Administrator profile, even if the vendor asks for it. Salesforce recommends testing with minimal access and adding only what is needed. Run the tests through a full business cycle: month-end, scheduled jobs and error paths often need access that a normal week does not reveal.

Login and credentials also need attention. For new integrations, use an External Client App: according to [Salesforce's OAuth documentation](https://developer.salesforce.com/docs/platform/api-rest/guide/intro-oauth-and-connected-apps.html), creating connected apps has been restricted since Spring '26, while existing ones continue to work. For headless integrations, the client credentials flow with a run-as user or the JWT bearer flow replace password logins. Store client secrets and JWT private keys in a secret store, with an owner, an expiry date, a rotation date and a way to revoke them in an emergency. Login IP ranges in the profile help when the calling platform has stable outbound addresses; with cloud middleware, the ranges can be large or can change, so agree on who reports changes.

## How do you switch without an outage?

Switching an interface in live operation is the delicate part. A tested cutover with a short rollback path is safer:

```schritte
Prepare | sandbox · integration
  New user, permission sets, app, secret. Test with real data flows and error cases.
Switch | maintenance window · integration
  New credentials in the middleware, old ones removed.
Lock old user | same day · admin
  Freeze the old user; reactivation only as a documented emergency step.
Monitor | business cycle · operations
  Error logs plus records sent, backlog and reconciliation with the ERP.
Deactivate | after the cycle · admin
  Old user off, licence freed.
```

Freezing the old user on the day of the switch closes the privileged path. If a permission is missing, you add it to the new permission set; reactivating the old user remains an exception with a deadline. Check business figures, not only technical logs: the number of orders transferred, open errors and the reconciliation between both systems. Keep the switch away from the weekend of a Salesforce release, so errors can be traced more easily; the dates are listed in [Salesforce release schedule and what IT checks](/en/blog/salesforce-release-schedule-what-it-checks/). How I plan interfaces with clients is described under [Salesforce integration](/en/services/salesforce-integration/).

## Switch the riskiest integration users first

From the inventory, prioritise every integration user with an admin profile or Modify All Data, plus those with password logins, unprotected credentials or no owner, and assign a client-side owner to each. Ask each vendor in writing for the objects its interface reads and writes, the login method and the source IP addresses it uses. Check whether the integration needs a permission type that permission sets tied to the integration licence do not offer, then build the first permission set and test it in the sandbox through a full business cycle.
