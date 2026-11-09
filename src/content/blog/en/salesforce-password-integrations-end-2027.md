---
title: "Salesforce password integrations end in 2027: check now"
metaTitle: "Salesforce username-password flow ends February 20, 2027"
description: "Salesforce retires the OAuth username-password flow on February 20, 2027 and SOAP login() in Summer '27. How to find affected integrations and migrate them."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: salesforce-password-integrations-end-2027
translationKey: salesforce-password-integrations-2027
topic: security
categories: [devops]
contactBrief: integration
tags: [integration, security, oauth, release management, partner governance]
takeaways:
  - "From February 20, 2027, logins through the OAuth username-password flow for connected apps fail."
  - "SOAP login() needs the Use Any API Auth permission from December 1, 2026 and is retired in Summer '27. A higher API version is no way out."
  - "The replacements are client credentials or JWT bearer for server-to-server integrations and the web server flow with PKCE for user-facing apps."
  - "Token requests fail with invalid_grant, but the impact often goes unnoticed. The search starts in Login History and middleware logs."
  - "Every integration needs a named owner on the client side, its own integration user per system and credentials in the client's own vault."
faq:
  - q: "When does the Salesforce OAuth username-password flow stop working?"
    a: "Salesforce enforces the retirement on February 20, 2027 for all orgs. Integrations that request a token with grant_type=password will fail from then on with the error invalid_grant."
  - q: "What replaces the OAuth username-password flow?"
    a: "For server-to-server integrations the client credentials flow with a run-as user, or the JWT bearer flow with a certificate. Apps that act for individual users should use the web server flow with PKCE."
  - q: "How do I find integrations that still use the password flow?"
    a: "Filter Login History by the login subtype OAuth Username-Password or run the SOQL query Salesforce publishes for it, search integration code and middleware configuration for grant_type=password, and ask every vendor of managed packages and connectors to confirm in writing."
  - q: "Does moving to External Client Apps solve the problem?"
    a: "No. External Client Apps do not support the username-password flow at all. The external system itself has to switch to a supported flow such as client credentials or JWT bearer."
---

Salesforce integrations that request a token with username and password (`grant_type=password`) have an end date. On February 20, 2027, Salesforce retires the OAuth 2.0 username-password flow for connected apps, and those integrations will stop working. At the same time the SOAP API login gets stricter in several steps. For enterprise organizations with ERP connections, middleware, data loaders, backup tools and reporting extracts, this is a project with a fixed deadline, and the hardest part is finding every affected integration before it fails.

## What exactly changes, and when?

Three changes overlap, and they are easy to mix up:

1. **From December 1, 2026: SOAP login() needs a permission.** According to Salesforce's developer guide to the Winter '27 release, users who authenticate with the SOAP API login() call need the user permission "Use Any API Auth". Without it, the login is refused.
2. **February 20, 2027: the OAuth username-password flow ends.** Integrations that request an access token with `grant_type=password` fail from this date on with the error `invalid_grant`. Depending on network settings, the password value also contains the security token. Salesforce published this as a [release update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) and has already moved the date once, from Winter '27 to February 2027.
3. **Summer '27: SOAP login() is retired.** The SOAP login() call is available only in API version 64.0 and earlier, and these versions stop working with your org's Summer '27 upgrade. Raising the API version is therefore no way out; the login has to move to OAuth. In addition, SOAP, REST and Bulk API versions 31.0 to 40.0 receive no more updates from Summer '27 and fail from Summer '28.

Salesforce lists the details in its [developer guide to Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release). Normal data operations through the SOAP API, such as query, create or update, continue to work. What changes is how integrations log in.

![Timeline of the Salesforce login changes for integrations: from December 1, 2026 SOAP login() needs the user permission Use Any API Auth, on February 20, 2027 the OAuth username-password flow for connected apps ends, in Summer '27 SOAP login() in API versions 31.0 to 64.0 is retired and API versions 31.0 to 40.0 get no more updates, and in Summer '28 SOAP, REST and Bulk API versions 31.0 to 40.0 fail. Query, create and update keep working; what changes is how integrations log in.](../../../assets/blog/password-flow-timeline-en.png)

## Enterprise organizations are hit harder

A small org has a handful of integrations, and the admin knows them. An enterprise org has grown over years. Typical sources of password-based logins are:

- **ERP and order integrations** that were set up years ago by a partner who is no longer involved. If you run a B2B store on SAP, its data flows belong on the list too, see [B2B Commerce and SAP: which data flows where?](../b2b-commerce-sap-data-flows/).
- **Middleware and integration platforms** where a technical user's password sits in a configuration screen.
- **Data loaders and scheduled scripts** that run on a server under someone's desk.
- **Backup, archiving and reporting tools** that pull data every night.
- **Managed packages and connectors** from vendors who decide themselves which flow they use.

The common problem: nobody has a complete list. Integrations were built by different partners, documented in different places, and often run with a technical user that several systems share. When the flow is switched off, the token request fails with a clear error, but often nobody looks at it. A nightly job stops updating records, a report shows yesterday's numbers, and someone notices days later when sales or service work with outdated data.

That is why I see this mainly as a governance task, not a technical one. The technical migration per integration is manageable. The risk lies in what nobody knows about.

## How do you find every affected integration?

Start the inventory now, not in January. These sources complement each other:

1. **Login History.** Create a view filtered on the login subtype "OAuth Username-Password", or use the query from the [Salesforce knowledge article](https://help.salesforce.com/s/articleView?id=005461279&language=en_US&type=1): `SELECT Application FROM LoginHistory WHERE LoginSubType = 'OAuth Username-Password'`. It shows which users and connected apps still use the flow. A hit proves use; no hit proves nothing. Keep in mind that Login History only covers about six months. An integration that runs quarterly may not appear.
2. **Middleware and code.** Search integration configurations, scripts and repositories for `grant_type=password`, "password grant" or "ROPC". This is where a Git repository with all integration code pays off.
3. **Vendors.** Ask every vendor of a managed package, connector or SaaS tool connected to Salesforce, in writing, which OAuth flow they use and when they will switch.
4. **Sandbox test.** In a full or partial copy sandbox, turn off the setting "Allow OAuth Username-Password Flows" and run the integrations. The test only counts if the external systems, app configuration, users and scheduled jobs really point to that sandbox. What fails there would fail in production in February.
5. **SOAP logins.** Check which integration users log in via SOAP and which API versions they use, so the December and Summer '27 steps don't catch you off guard.

The result should be one list: integration, purpose, owner on the client side, technical user, flow, API version, vendor or partner, migration date. That list is worth keeping after the migration, as part of the [architecture documentation](../../services/salesforce-integration/).

## Which flow replaces the password login?

Salesforce offers several OAuth flows. For most enterprise integrations the choice comes down to three:

- **Client credentials flow.** The replacement Salesforce recommends for server-to-server integrations such as middleware, ETL and backup tools. The integration authenticates with a client ID and secret and acts as a defined run-as user. No interactive login, no user password. The token request goes to the My Domain URL, not to login.salesforce.com.
- **JWT bearer flow.** For integrations where a certificate is preferred over a shared secret, for example critical ERP connections. The integration signs a token with its private key, and Salesforce verifies it with the uploaded certificate. CI/CD pipelines that deploy to Salesforce typically use this flow too.
- **Web server flow with PKCE.** For applications where real users log in and act in their own name.

Salesforce recommends External Client Apps for new integrations instead of classic connected apps. An existing connected app does not have to be replaced because of this change; what has to change is the flow. Integrations of a vendor or managed package switch only with the vendor's own release.

```hinweis achtung
Simply moving a connected app to an External Client App does not solve the problem, because External Client Apps don't support the username-password flow at all. The external system itself has to change the way it requests tokens.
```

Salesforce Time has a good [step-by-step summary](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) of the migration.

## What about MFA?

The retirement is separate from Salesforce's MFA requirements, which apply to logins through the user interface; admins and users with elevated permissions need phishing-resistant methods such as security keys. MFA and the OAuth retirement point in the same direction: no more shared passwords. Integration users should never log in interactively, and human users should never share accounts with integrations.

## The client owns the migration

Integrations connect the client's systems, and the credentials belong in the client's vault, not in a partner's configuration. In practice that means:

- **A named owner per integration** on the client side, even if a partner does the technical work.
- **Its own integration user per system or trust boundary**, with only the permissions it needs. Separate users are worth it where owners, permissions, criticality or secret rotation differ. Shared technical users make it impossible to tell which system does what.
- **Secrets and certificates in the client's vault**, rotated when a partner leaves. I explain the broader principle in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).
- **Changes through the normal release process**, with the new connected app or External Client App configuration in the repository and deployed through the pipeline.

## First step: inventory by the end of November 2026

Salesforce enforces the OAuth change on February 20, 2027. Discovery should be done before December, so that December and January remain for vendor updates, migration and tests. A realistic order:

```schritte
Inventory | by end of November 2026
  List complete, owners named, vendors asked.
SOAP permission | by November 30, 2026
  Find every user that still logs in through SOAP login() and assign Use Any API Auth where needed before enforcement starts on December 1.
Migrate | December to January
  Move integrations to client credentials or JWT bearer, starting with the most critical ones. Test in a sandbox with the password flow disabled.
Switch off yourself | early February 2027
  Turn off the password flow in production yourself, a few days before Salesforce does, with the team on standby.
Replace SOAP login() | before your Summer '27 upgrade
  Move authentication from SOAP login() to OAuth. Raising the API version does not help, because login() no longer exists from version 65.0. Separately, upgrade data API calls on versions 31.0 to 40.0 before Summer '28.
```
