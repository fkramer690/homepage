---
title: "Salesforce Integration User: Cut Back the Rights"
description: "Technical users with admin rights are a risk. How to move integrations to the Salesforce Integration User licence and narrow permission sets."
pubDate: 2026-11-03
lang: en
slug: salesforce-integration-users-cleanup
translationKey: salesforce-integration-users-cleanup
topic: data
categories: [architecture]
contactBrief: integration
tags: [Salesforce Integration User, technical users, permissions, interfaces, security, permission sets]
takeaways:
  - "Many ERP and middleware interfaces log in with a user that has the System Administrator profile. That is rarely needed."
  - "According to Salesforce, Enterprise, Unlimited and Performance Edition include five Integration User licences at no extra cost, limited to API access."
  - "The licence alone does not make a user narrow. Which objects and fields it sees is set by permission sets."
  - "One user per integration, with an owner, login IP ranges and only the rights that a month of operation has confirmed."
faq:
  - q: "What is the Salesforce Integration User?"
    a: "A user with the Salesforce Integration licence and the Minimum Access - API Only Integrations profile. It can only log in through the API, not through the user interface. It gets its object rights through permission sets."
  - q: "How many Integration User licences are free?"
    a: "According to Salesforce, Enterprise, Unlimited and Performance Edition automatically get five Salesforce Integration licences at no extra cost, and Developer Edition gets one. More licences are available through your account executive."
  - q: "Does an interface need admin rights?"
    a: "Almost never. Salesforce recommends testing with minimal rights and adding only what is needed. Vendors often ask for the administrator during setup, but the interface itself rarely needs it."
  - q: "Can one integration share another integration's user?"
    a: "Better not. A shared user gets the sum of all rights, and the log no longer shows which interface made a change. Salesforce recommends one user per integration."
draft: false
---

In many Salesforce orgs, technical users for interfaces have more rights than any person in the company: the System Administrator profile, Modify All Data, often a password that never expires. To clean this up, you move each integration to its own Salesforce Integration User with API access and narrow permission sets. This article shows what the licence does, how to take stock and how to switch over without an outage.

## Why do integration users have too many rights?

Most integration users are created under time pressure. A vendor or partner needs access for the setup, and the quickest way is a user with the System Administrator profile. The interface runs, and nobody touches the user again.

Three patterns are common at manufacturers:

- **Admin for everything.** The ERP interface for customers and orders has the same rights as the administrator, even though it writes five objects.
- **One user for several systems.** ERP, marketing tool and middleware log in with the same user. It gets the sum of all rights, and the log no longer shows which interface made a change.
- **Password and security token.** Login still runs with username and password. This kind of login ends in 2027, as described in [Salesforce password integrations end in 2027](../salesforce-password-integrations-end-2027/).

The risk is obvious. If the credentials leak, for example at a vendor, the attacker gets the administrator's rights. How quickly that can happen is shown by the incident I describe in [Connected Apps and AI tools: lessons from Salesloft Drift](../connected-apps-oauth-ai-integrations/).

## The Integration User licence limits the user to the API

Salesforce offers a dedicated licence for technical users. According to the [Salesforce Admin blog](https://admin.salesforce.com/blog/2023/best-practices-for-configuring-your-integration-user), Enterprise, Unlimited and Performance Edition automatically get five Salesforce Integration licences at no extra cost, and Developer Edition gets one. More are available through your account executive.

This also saves money. An integration user with a full Sales or Service Cloud licence takes up a licence that a person could otherwise use. With more than five interfaces, ask for more Integration licences. Using one user for several interfaces saves a licence, but costs the separation of rights and traceability in the log. Which licences users actually need is covered in [Salesforce licences: does everyone need a full licence?](../salesforce-licences-full-licence-needed/)

The licence comes with the Minimum Access - API Only Integrations profile. According to the [Salesforce Developers blog](https://developer.salesforce.com/blogs/2024/02/invoke-rest-apis-with-the-salesforce-integration-user-and-oauth-client-credentials), it enables API access and at the same time restricts the user to API access only. Neither setting can be changed. Logging in through the user interface is therefore ruled out.

```hinweis achtung
The licence does not make the user narrow by itself. According to Salesforce, the associated Salesforce API Integration permission set licence allows the same user and object permissions as the System Administrator profile. What the user may really do is decided by your permission sets.
```

Salesforce therefore recommends keeping the profile itself empty. It only controls defaults, login hours and IP ranges. All object and field rights come through permission sets, bundled in one permission set group per integration. That matches the setup I describe for human users in [permission concept with permission sets](../salesforce-permission-concept-permission-sets/).

## The inventory starts with the users

For the inventory, go through all active users that do not belong to a person. For each one, record:

| Check | Where you see it | Warning sign |
|---|---|---|
| Profile | User details | System Administrator or a copied admin profile |
| System permissions | Profile and assigned permission sets | Modify All Data, View All Data |
| Login type | User's login history | Login with username and password |
| Users | Login history, Connected Apps OAuth Usage | several applications with the same user |
| IP ranges | Profile | no login IP ranges set |
| Ownership | not documented anywhere | nobody can say what the user is for |

The result is a list with one line per user: which interface uses it, who owns it on the client side and which objects the interface reads or writes. For the ERP interface, this usually follows from the data flows, as described in [Manufacturing Cloud and SAP: data flows](../manufacturing-cloud-sap-integration-data-flows/).

Users nobody claims are the most delicate. Check in the login history whether and from where they last logged in before you lock them.

## The rights follow from what the interface does

For each interface, build a permission set from the list of objects and fields it actually needs. Keep reading and writing clearly apart: an interface that takes orders from Salesforce into the ERP needs read access to orders and write access only to the status field.

According to the Admin blog, an interface usually does not need the System Administrator profile, even if the vendor asks for it. Salesforce recommends testing with minimal rights and adding only what is needed. Then monitor the integration for a month to make sure it has all the rights it needs.

Two settings come on top. Login IP ranges in the profile limit login to the addresses the vendor publishes or names on request. And login moves to OAuth, for example the client credentials flow with a run-as user, instead of password and security token.

## How do you switch without an outage?

Switching an interface in live operation is the delicate part. A parallel path is safer:

1. **Create the new user.** With Integration licence, empty profile, permission set group and IP ranges.
2. **Test in the sandbox.** With the same data flows as in production, including error cases.
3. **Switch in a maintenance window.** The interface gets the new credentials, the old user stays active but unused.
4. **Monitor.** Check middleware error logs and login history for a month.
5. **Deactivate the old user.** Only once no more logins arrive.

Deactivating the old user only at the end gives you a way back if a right is missing. Also avoid scheduling the switch in the weeks of a Salesforce release, so errors can be clearly attributed. How I plan interfaces with clients is described under [Salesforce integration](../../services/salesforce-integration/).

## Switch the three integration users with the most rights first

From the inventory, take the three integration users with an admin profile or the right to modify all data, and name an owner on the client side for each. Ask each vendor in writing for the list of objects its interface reads and writes, and for the IP addresses it logs in from. With that, you build the first permission set and test it in the sandbox.
