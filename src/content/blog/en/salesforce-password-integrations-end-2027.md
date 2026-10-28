---
title: "Salesforce password integrations end in 2027: check now"
description: "The OAuth username-password flow stops working on 20 February 2027 and SOAP login gets stricter. What enterprise teams should check and how to migrate."
pubDate: 2026-10-23
lang: en
slug: salesforce-password-integrations-end-2027
translationKey: salesforce-password-integrations-2027
topic: security
categories: [devops]
contactBrief: integration
tags: [integration, security, oauth, release management, partner governance]
takeaways:
  - "Salesforce retires the OAuth 2.0 username-password flow for connected apps on 20 February 2027; integrations that log in with username, password and security token will then fail."
  - "SOAP API login() calls need the Use Any API Auth permission from 1 December 2026, and SOAP login() in API versions 31.0 to 64.0 is retired in Summer '27."
  - "The replacements are the client credentials flow for server-to-server integrations, the JWT bearer flow for certificate-based trust and the web server flow with PKCE for user-facing apps."
  - "Failures are often silent: a nightly sync simply stops updating records, so the inventory has to start from Login History, middleware logs and vendor confirmations."
  - "Every integration needs a named owner on the client side, a dedicated integration user and credentials stored in the client's own vault."
faq:
  - q: "When does the Salesforce OAuth username-password flow stop working?"
    a: "Salesforce enforces the retirement on 20 February 2027 for all orgs. Integrations that request a token with grant_type=password, username, password and security token will fail from then on."
  - q: "What replaces the OAuth username-password flow?"
    a: "For server-to-server integrations the client credentials flow with a run-as user, or the JWT bearer flow with a certificate. Apps that act for individual users should use the web server flow with PKCE."
  - q: "How do I find integrations that still use the password flow?"
    a: "Filter Login History by the login subtype OAuth Username-Password, search integration code and middleware configuration for grant_type=password, and ask every vendor of managed packages and connectors to confirm in writing."
  - q: "Does moving to External Client Apps solve the problem?"
    a: "No. External Client Apps do not support the username-password flow at all. The external system itself has to switch to a supported flow such as client credentials or JWT bearer."
---

Salesforce integrations that log in with a username, password and security token have an end date. On 20 February 2027, Salesforce retires the OAuth 2.0 username-password flow for connected apps, and those integrations will stop working. At the same time the SOAP API login gets stricter in several steps. For enterprise organisations with ERP connections, middleware, data loaders, backup tools and reporting extracts, this is a project with a fixed deadline, and the hardest part is finding every affected integration before it fails quietly.

## What exactly changes, and when?

Three changes overlap, and they are easy to mix up:

1. **From 1 December 2026: SOAP login() needs a permission.** According to Salesforce's developer guide to the Winter '27 release, users who authenticate with the SOAP API login() call need the user permission "Use Any API Auth". Without it, the login is refused.
2. **20 February 2027: the OAuth username-password flow ends.** Integrations that request an access token with `grant_type=password` plus username, password and security token fail from this date on. Salesforce published this as a [release update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) and has already moved the date once, from Winter '27 to February 2027.
3. **Summer '27: SOAP login() in older API versions is retired.** The SOAP login() call in API versions 31.0 to 64.0 stops working. In addition, SOAP, REST and Bulk API versions 31.0 to 40.0 receive no more updates from Summer '27 and fail from Summer '28.

Salesforce lists the details in its [developer guide to Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release). Normal data operations through the SOAP API, such as query, create or update, continue to work. What changes is how integrations log in.

![Timeline of the Salesforce login changes for integrations: from 1 December 2026 SOAP login() needs the user permission Use Any API Auth, on 20 February 2027 the OAuth username-password flow for connected apps ends, in Summer '27 SOAP login() in API versions 31.0 to 64.0 is retired and API versions 31.0 to 40.0 get no more updates, and in Summer '28 SOAP, REST and Bulk API versions 31.0 to 40.0 fail. Query, create and update keep working; what changes is how integrations log in.](../../../assets/blog/password-flow-timeline-en.png)

## Why does this matter more in enterprise organisations?

A small org has a handful of integrations, and the admin knows them. An enterprise org has grown over years. Typical sources of password-based logins are:

- **ERP and order integrations** that were set up years ago by a partner who is no longer involved. If you run a B2B store on SAP, its data flows belong on the list too, see [B2B Commerce and SAP: which data flows where?](../b2b-commerce-sap-data-flows/).
- **Middleware and integration platforms** where a technical user's password sits in a configuration screen.
- **Data loaders and scheduled scripts** that run on a server under someone's desk.
- **Backup, archiving and reporting tools** that pull data every night.
- **Managed packages and connectors** from vendors who decide themselves which flow they use.

The common problem: nobody has a complete list. Integrations were built by different partners, documented in different places, and often run with a technical user that several systems share. When the flow is switched off, the failure is rarely loud. A nightly job stops updating records, a report shows yesterday's numbers, and someone notices days later when sales or service work with outdated data.

That is why I see this mainly as a governance task, not a technical one. The technical migration per integration is manageable. The risk lies in what nobody knows about.

## How do you find every affected integration?

Start the inventory now, not in January. These sources complement each other:

1. **Login History.** Create a view filtered on the login subtype "OAuth Username-Password". It shows which users and connected apps still use the flow. Keep in mind that Login History only covers about six months. An integration that runs quarterly may not appear.
2. **Middleware and code.** Search integration configurations, scripts and repositories for `grant_type=password`, "password grant" or "ROPC". This is where a Git repository with all integration code pays off.
3. **Vendors.** Ask every vendor of a managed package, connector or SaaS tool connected to Salesforce, in writing, which OAuth flow they use and when they will switch.
4. **Sandbox test.** In a full or partial copy sandbox, turn off the setting "Allow OAuth Username-Password Flows" and run the integrations. What fails there would fail in production in February.
5. **SOAP logins.** Check which integration users log in via SOAP and which API versions they use, so the December and Summer '27 steps don't catch you off guard.

The result should be one list: integration, purpose, owner on the client side, technical user, flow, API version, vendor or partner, migration date. That list is worth keeping after the migration, as part of the [architecture documentation](../../services/salesforce-integration/).

## Which flow replaces the password login?

Salesforce offers several OAuth flows. For most enterprise integrations the choice comes down to three:

- **Client credentials flow.** The standard choice for server-to-server integrations such as middleware, ETL and backup tools. The integration authenticates with a client ID and secret and acts as a defined run-as user. No interactive login, no user password.
- **JWT bearer flow.** For integrations where a certificate is preferred over a shared secret, for example critical ERP connections. The integration signs a token with its private key, and Salesforce verifies it with the uploaded certificate. CI/CD pipelines that deploy to Salesforce typically use this flow too.
- **Web server flow with PKCE.** For applications where real users log in and act in their own name.

Salesforce recommends External Client Apps for new integrations instead of classic connected apps.

```hinweis achtung
Simply moving a connected app to an External Client App does not solve the problem, because External Client Apps don't support the username-password flow at all. The external system itself has to change the way it requests tokens.
```

Salesforce Time has a good [step-by-step summary](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) of the migration.

## What about MFA?

Multi-factor authentication is the other security topic on many lists right now. Salesforce requires MFA for all users who log in through the user interface, and admins and users with elevated permissions need phishing-resistant methods such as security keys. In October there was confusion about reported delays. Salesforce clarified that there are no indefinite postponements and that individual customers with extensions will be brought into compliance over the coming months, as [Salesforce Ben reported](https://www.salesforceben.com/salesforce-confirms-new-mfa-updates-what-you-should-expect/).

MFA and the OAuth retirement point in the same direction: no more shared passwords. Integration users should never log in interactively, and human users should never share accounts with integrations.

## Who should own the migration?

The client. Integrations connect the client's systems, and the credentials belong in the client's vault, not in a partner's configuration. In practice that means:

- **A named owner per integration** on the client side, even if a partner does the technical work.
- **One dedicated integration user per integration**, with only the permissions it needs. Shared technical users make it impossible to tell which system does what.
- **Secrets and certificates in the client's vault**, rotated when a partner leaves. I explain the broader principle in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).
- **Changes through the normal release process**, with the new connected app or External Client App configuration in the repository and deployed through the pipeline.

## What should the plan look like?

A realistic order for the coming months:

```schritte
Inventory | by end of November 2026
  List complete, owners named, vendors asked.
SOAP permission | December 2026
  Check the SOAP login permission for all integration users before 1 December takes effect.
Migrate | December to January
  Move integrations to client credentials or JWT bearer, starting with the most critical ones. Test in a sandbox with the password flow disabled.
Switch off yourself | early February 2027
  Turn off the password flow in production yourself, a few days before Salesforce does, with the team on standby.
SOAP versions | spring 2027
  Move remaining SOAP logins away from API versions below 65.0 before Summer '27.
```

The deadline is fixed and the work is predictable, as long as it starts with a complete list. If you want help with the inventory or a second opinion on your integration architecture, [send me a message](#contact).
