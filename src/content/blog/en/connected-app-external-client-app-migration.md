---
title: "Migrate Connected Apps to External Client Apps"
metaTitle: "Connected App to External Client App migration plan"
description: "Salesforce ends support for connected apps in Summer '27. How to sort your ERP and middleware interfaces: migrate, rebuild or wait for the vendor."
pubDate: 2026-11-16
lang: en
slug: connected-app-external-client-app-migration
translationKey: connected-app-external-client-app-migration
topic: security
categories: [architecture, devops]
contactBrief: integration
tags: [External Client Apps, Connected Apps, OAuth, Interfaces, Release Updates, Manufacturing]
takeaways:
  - "Connected apps keep running after Summer '27, but Salesforce stops bug fixes, security updates and support for them."
  - "Earlier hard dates matter more: device flow from November 30, 2026, username-password flow on February 20, 2027."
  - "The App Manager button keeps consumer key and secret. Check policies and IP allowlists anyway; not everything carries over."
  - "The button cannot detect the username-password flow. Move those interfaces to a supported flow first."
  - "Local external client apps are not copied into refreshed sandboxes, so the pipeline has to deploy them."
faq:
  - q: "Do connected apps stop working in Summer '27?"
    a: "No. According to Salesforce, existing connected apps keep working. Salesforce ends support: no bug fixes, no security updates, no updates to authorization flows and no technical support."
  - q: "Does the middleware need new credentials after the migration?"
    a: "Usually not, if you use the Migrate to External Client App button. According to Salesforce Help, it keeps the consumer key and secret and valid refresh tokens. Policies such as the refresh token IP allowlist still need checking."
  - q: "Can I migrate a connected app that came with an AppExchange package?"
    a: "Not in your org. The vendor provides the migration as a package upgrade; ask in writing for the version, the date and whether tokens and sessions are kept."
  - q: "Can I still create a new connected app?"
    a: "Since Spring '26, creating new connected apps is restricted. For now, Salesforce Support can enable it on request, but Salesforce recommends external client apps for every new integration."
draft: false
---

Salesforce ends support for connected apps in Summer '27. Existing apps keep running, but they get no more bug fixes, security updates or updates to authorization flows. Migrating connected apps to external client apps therefore starts with an inventory now: interfaces on the device flow or the username-password flow have earlier, hard deadlines, while eligible local apps can move by Summer '27. For most of your own interfaces, the Migrate to External Client App button in App Manager is enough, because it keeps the consumer key and secret. Apps with single sign-on and apps from a vendor's package need a different path.

## Do you have to migrate every connected app?

A connected app is the entry in Salesforce through which an external system logs in via OAuth: the ERP connector, the middleware, the document tool, the e-commerce platform, the single sign-on for the dealer portal. Not every app takes the same path. I sort them by origin and by what they use, because that decides who does the work:

```tabelle
title: Which path each connected app takes
columns: App in your org | Path | Who does the work
Eligible local app of your own with client credentials or JWT bearer | Migration button in App Manager * | Your admin, tested in the sandbox
Own interface with username and password | Change the flow first, then the button | Middleware team and your admin
User provisioning, Apex handler, Triple DES in SAML or standard notifications | Remove or change the blocker, then the button; user provisioning has no counterpart in external client apps | Your admin and the system owner
Single sign-on or Canvas | No button: new external client app with new credentials | Your admin and the system owner
Dynamic client registration | Not yet supported in external client apps: plan a redesign with the vendor | System owner and vendor
App from a vendor's managed package | Vendor ships the migration in a new package version | Vendor; you ask for version and date
Device flow client, such as a terminal on the shop floor | Separate local external client app by November 30, 2026 | Your admin
App without users or tokens | Delete instead of migrating | Your admin, after checking with the owner
```

Worked example: a manufacturer has nine connected apps. Four are its own interfaces to SAP and the middleware with JWT bearer, two come from vendor packages, one still logs in with a username and password, one is the single sign-on app through which Salesforce logs dealers into an external spare parts catalog, and one has had no tokens for a year. The button covers four apps right away and the password interface after the flow change. Two depend on the vendor, one has to be rebuilt and one is deleted.

## Which dates can stop an interface?

Salesforce has been tightening OAuth access since 2025, and the remaining dates fall between November 2026 and mid 2027. The [roadmap for connected apps and external client apps](https://help.salesforce.com/s/articleView?id=005461287&type=1) lists them:

```zeitleiste
Spring '26 | New connected apps only after Salesforce Support enables creation
2026-11-04 | Refresh tokens unused for 30 days expire (production, rolling start)
2026-11-30 | Device flow only through local external client apps
2027-02-20 | Username-password, user-agent and hybrid flows retired
Summer '27 | End of support for connected apps
```

The device flow and the three retired flows are hard dates: after them, logins through these flows fail. For the device flow, the [Salesforce article on the device flow restrictions](https://help.salesforce.com/s/articleView?id=005461280&type=1) requires a local external client app with a callback Salesforce allows for it and no other OAuth flow enabled. The article of October 2026 names only https://localhost; check the current Winter '27 release notes for the permitted values before you build the app.

Summer '27 is different. According to the [Salesforce article on connected app end of support](https://help.salesforce.com/s/articleView?id=005228017&type=1), existing connected apps keep working, but Salesforce stops providing bug fixes, security updates and technical support. For an interface that moves orders, prices or service jobs, I would not accept that risk and treat Summer '27 as the deadline. Salesforce offers the migration as the release update Migrate All Connected Apps to External Client Apps; the [Salesforce Admin blog on Winter '27](https://admin.salesforce.com/blog/2026/jens-top-winter-27-release-features-for-admins) describes it. I would start with the interfaces that are easiest to migrate and learn from them before the critical ones follow.

## External client apps are closed by default

An external client app does the same job as a connected app: it lets an external system access Salesforce via OAuth. The differences matter for governance. According to the [Salesforce comparison of both app types](https://help.salesforce.com/s/articleView?id=xcloud.connected_apps_and_external_client_apps_features.htm&language=en_US&type=5), an external client app only works in an org where it was created or installed, so it needs no separate API access control. Developer settings and admin policies are kept apart: the developer defines flows and scopes, the admin decides on permitted users, IP relaxation and token lifetime in the org. User provisioning is not available in external client apps.

External client apps support fewer flows: client credentials, JWT bearer, web server, device and code and credentials. The username-password flow is missing, and so are the user-agent and hybrid flows. For the replacement, the [Salesforce article on the username-password retirement](https://help.salesforce.com/s/articleView?id=005461279&type=1) recommends the web server flow with PKCE where a person logs in, and the client credentials flow for server-to-server integrations. JWT bearer remains an option when your middleware handles certificates and key rotation. Details are in [Salesforce password integrations end in 2027](/en/blog/salesforce-password-integrations-end-2027/).

## What the migration button keeps and what it does not

According to the [Salesforce Help article on the migration](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_to_external_client_app_migration.htm&language=en_US&type=5), the button in App Manager creates a local external client app from an eligible connected app. The middleware keeps sending the same consumer key and secret.

```staerken-grenzen
title: Migrate to External Client App: strong for your own interfaces
+ Credentials | Consumer key and secret stay the same, the client needs no new credentials *
+ Sessions | Valid refresh tokens remain valid for flows that use them, such as the web server flow
+ Original | The connected app stays as a read-only version
- Detection | The username-password flow is not detected, the interface fails afterwards
- Policies | Refresh token IP allowlist values were not carried over in July 2026 (known issue)
- Tools | Only through the button in Setup, no API or CLI
- Sandbox | The new app is local and is not copied when a sandbox is refreshed
better: For apps that are not eligible: a new external client app with new credentials and a planned switch.
```

The policy limit comes from a [Salesforce knowledge article on the refresh token IP allowlist](https://help.salesforce.com/s/articleView?id=005387022&type=1): Salesforce documented it in July 2026 and announced a fix. Check whether your release contains it; until then, compare the values and recreate them by hand. Salesforce also warns against deleting the read-only original, because both apps share the same consumer. Before every migration, check which flow the interface actually uses. The login history of the integration user shows it. The button does not.

```hinweis achtung
An interface that still logs in with a username and password stops working after the migration, because external client apps do not support the flow. Move it to a supported flow first, and only then press the button.
```

## Questions for vendors and partners before the migration

In a manufacturer's org, the connected apps rarely belong to one team: the ERP connector comes from the middleware partner, the document tool and the configurator from AppExchange vendors, the dealer portal login from another partner. On the client side, I would ask every one of them the same questions in writing and keep the answers in the inventory:

- Which flow does your interface use in production, and which integration user does it run as?
- For package apps: in which package version do you ship an external client app, and when?
- Who holds the consumer secret or the certificate, and who rotates it?
- Which policies does your interface rely on: IP ranges, permitted users, scopes, token lifetime?
- How do you prove after the switch that the interface works: which smoke test, which reconciliation with the ERP?

One owner on the client side decides the pattern for all of them, for example one external client app per system and owner, separated wherever flow, scopes or rotation differ, and one dedicated consumer per environment. Without that decision, each partner builds its own variant. How I steer several partners in one org is described under [partner governance](/en/services/partner-governance/).

## Sandboxes and the pipeline need a plan

The sandbox detail is the one I would plan for most carefully. According to the Salesforce comparison, connected apps are copied when a sandbox is refreshed, while local external client apps are explicitly not. Verify the behavior for your apps in one refresh. After the migration, every refreshed sandbox lacks the app, and the integration test with SAP fails until someone sets it up again. This affects every sandbox that integrations run against, for example UAT and the full copy before go-live; the setup with several partners is described in [Salesforce sandbox strategy with several partners](/en/blog/salesforce-sandbox-strategy-multiple-partners/).

That is why the external client app belongs in the repository and the pipeline. According to the [Salesforce guide on deploying external client apps](https://help.salesforce.com/s/articleView?id=xcloud.meta_configure_packageable_external_client_apps.htm&language=en_US&type=5), a deployed app can either reference the consumer of the source org or get its own consumer. The first option makes every sandbox depend on the source org: if the app is deleted there, the OAuth flow fails in the other orgs. For ERP interfaces, I prefer a separate consumer per environment, so a sandbox never uses production credentials. The pipeline generates or deploys the OAuth settings per environment, the integration owner receives the resulting client ID and secret through the secret store, and rotation is tested once before go-live.

```vertiefung For developers
title: Which metadata belongs in the repository?
- Version the app definition (ExternalClientApplication) and the flows and scopes (ExtlClntAppOauthSettings).
- Keep consumer key, callback URLs and certificate (ExtlClntAppGlobalOauthSettings) out of source control; set values per environment.
- Policies are generated with default values on deployment. Decide per policy whether the pipeline deploys an approved baseline or the admin maintains it locally.
- An external client app cannot be created through Setup in a scratch org. Retrieve it from a long-lived org and deploy or install it there.
```

How the release process with metadata and pipeline is set up is covered on the page for [DevOps and release management](/en/services/devops-release-management/).

## How do you migrate an ERP interface without an outage?

The button itself takes a minute. The work lies before and after it. I plan each interface like a small release with a go/no-go decision:

```schritte
Inventory | admin
  Every app from App Manager, plus users and tokens from Connected Apps OAuth Usage and flows from the login history.
Change the flow | before February 2027 · middleware team
  Move password logins to a supported flow in its own release, before the app migration.
Test in the sandbox | admin and business
  Migrate, compare policies and IP allowlist, run the real token flow from the middleware runtime.
Production | maintenance window · admin
  Go/no-go on the sandbox result, then the button; error logs and ERP reconciliation.
Close old paths | after a full cycle · admin
  Block the username-password and user-agent flows in the OAuth settings of the org.
```

Flow change and app migration are two releases, so an error can be traced to one of them. How long the sandbox test runs depends on the interface: at least one complete nightly batch, a retry after a technical error, a change or cancellation and the confirmation back from the ERP, reconciled record by record. Keep the switch away from the weekend of a Salesforce release, so errors can be traced to a cause; the dates are in [Salesforce release schedule and what IT checks](/en/blog/salesforce-release-schedule-what-it-checks/). The [Salesforce article on inbound governance](https://www.salesforce.com/blog/architecting-inbound-governance-external-client-apps/) recommends pre-authorizing only admin-approved users and blocking the username-password and user-agent flows in the OAuth settings, because existing connected apps and package apps can still use them.

For each interface, I also check the user behind it. A migration is a good moment to replace an integration user with administrator rights with a dedicated user on the Salesforce Integration license, as described in [Salesforce Integration User: removing admin rights](/en/blog/salesforce-integration-users-cleanup/). The app type controls how the system logs in; the user decides which records it can see. How I plan interfaces with clients is described under [Salesforce integration](/en/services/salesforce-integration/).

## First step: list every connected app with flow and owner

Copy every connected app from App Manager into a list with six columns: origin (own or package), flow, owner, last use from Connected Apps OAuth Usage, blocker for the button and path (button, flow change, rebuild, vendor or delete). Send the device flow apps to your admin with the November 30 deadline, the password interfaces to the middleware team with the February 20, 2027 deadline and the package apps to the vendors with a written request for the date. Then migrate your own server-to-server interface with the fewest dependencies first, in a sandbox, and add the external client app to the pipeline before the next sandbox refresh.
