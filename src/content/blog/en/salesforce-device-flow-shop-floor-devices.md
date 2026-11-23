---
title: "Salesforce Device Flow Restriction for Shop Floor Devices"
metaTitle: "Salesforce Device Flow Restriction: Find Affected Apps"
description: "From November 30, 2026, Salesforce blocks device flow logins through connected apps. How to find the affected apps, the devices behind them and the right fix."
pubDate: 2026-11-23
lang: en
slug: salesforce-device-flow-shop-floor-devices
translationKey: salesforce-device-flow
topic: security
categories: [architecture, devops]
contactBrief: integration
tags: [Device flow, OAuth, External Client Apps, Connected Apps, Shop floor, Interfaces]
takeaways:
  - "From November 30, 2026, only local external client apps with the callback https://localhost and no other OAuth flow may use the device flow."
  - "Login History shows which apps used the device flow, going back up to six months. It does not show which or how many devices sit behind them."
  - "An app that also serves other clients must be split. Decide which client keeps the existing consumer key, because only the moved clients need new credentials."
  - "Every device flow token belongs to the Salesforce user who approved the code, so a shared terminal acts with that person's permissions."
faq:
  - q: "What is the OAuth 2.0 device flow in Salesforce?"
    a: "The device flow lets a device with limited input or display, such as a terminal or a command-line tool, log in to Salesforce. The device shows a code, a person enters it in a browser on another device and approves access, and the device then receives a token for that person's user."
  - q: "What changes for the device flow on November 30, 2026?"
    a: "According to Salesforce, only local external client apps with the callback URL https://localhost and no other OAuth flow enabled may use the device flow from November 30, 2026. Device flow logins through connected apps and packaged external client apps then fail, and there is no opt-out."
  - q: "How do I find out whether my org uses the device flow?"
    a: "In Setup, open Login History, add the Login Subtype column and look for OAuth Device. Login History covers up to six months, so an empty result is not proof; also check the warning banners in App Manager and External Client App Manager and ask the owners of rarely used devices."
  - q: "Does every device need a new consumer key?"
    a: "No. If the existing connected app is eligible for the automated migration, Salesforce keeps its consumer key and secret. Only clients you move to a new external client app need new credentials."
draft: false
---

The Salesforce device flow is the OAuth login for devices without a proper keyboard or browser. From November 30, 2026, Salesforce only allows this flow through local external client apps with the callback URL `https://localhost` and no other OAuth flow enabled. Device flow logins through connected apps and packaged external client apps then fail. Login History shows in ten minutes which apps used the flow, going back up to six months; an empty result is a first indication, not proof. Then assign the devices behind each app and migrate, reconfigure, replace or retire it.

## What is the Salesforce device flow?

The [Salesforce Help page on the OAuth 2.0 device flow](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_device_flow.htm&type=5&language=en_US) describes it for apps on devices with limited input or display, such as smart TVs, appliances and other IoT devices, and adds that command-line apps can use it too. The login runs in four steps:

```schritte
Request | device · seconds
  The device asks Salesforce for a device code and a user code.
Show | device · seconds
  The device displays the user code and the verification URL.
Confirm | person · within 10 minutes
  Someone opens the URL on a phone or PC, logs in and enters the code.
Poll | device · until approved
  The device asks at intervals until Salesforce returns the token.
```

According to the same page, device code and user code are valid for ten minutes. A refresh token, which lets the device get new access tokens without a person, is only issued if the app includes the refresh token scope. For a terminal on the shop floor, that decides how often someone has to repeat the device flow: without a usable refresh token, a person has to confirm a new code whenever the access token can no longer be used.

## What changes on November 30, 2026

The [Salesforce article on the device flow restrictions](https://help.salesforce.com/s/articleView?id=005461280&type=1), published on October 7, 2026, names four conditions an app must meet from November 30, 2026. When you enable the device flow in an external client app, Salesforce sets the callback to `https://localhost` and disables the other OAuth flows of that app.

```tabelle
title: Conditions for the device flow from November 30, 2026
columns: Condition | Allowed | No longer allowed
App type | External client app * | Connected app
Distribution state | Local * | Packaged, for example from an AppExchange package
Callback URL | https://localhost * | Any other callback
Other OAuth flows | None * | Device flow plus web server, JWT bearer or others in the same app
note: Source: Salesforce knowledge article 005461280 and the release update in Setup.
```

Only device flow authentication is blocked. A connected app that also uses another supported flow keeps working for that flow. The device flow change is one of several dated changes in the [Salesforce roadmap for connected apps and external client apps](https://help.salesforce.com/s/articleView?id=005461287&type=1):

```zeitleiste
2026-08 | Salesforce shows warning banners in Setup and restricts some configuration changes
2026-11-04 | Refresh tokens unused for 30 days expire (production)
2026-11-30 | Device flow only through local external client apps
2027-02-20 | Username-password flow for connected apps, user-agent and hybrid flows retired
Summer '27 | End of support for connected apps
```

The 30-day rule is a separate control, and it can hit a compliant device flow app too. According to the [Salesforce article on the refresh token idle limit](https://help.salesforce.com/s/articleView?id=005461275&type=1), a refresh token that has not been used for 30 days expires together with its access token. A terminal switched on only at stocktaking may therefore need a person with a code again, even if its app meets the new device flow rules. If a device fails to authenticate around these dates, distinguish the device flow restriction from the 30-day rule before you change the app configuration.

## Get a first indication in ten minutes

Salesforce names two places. In Setup, open Login History, add the Login Subtype column and filter for OAuth Device. The Application column shows which app each login went through. According to Salesforce, Login History holds up to six months, so an app used once a year may not appear. The second place is the warning banner that Salesforce shows since August 2026 for non-compliant apps in App Manager and in External Client App Manager.

Each source proves something different, and none of them counts devices:

```tabelle
title: What each source tells you about device flow usage
columns: Source | What it proves | What it does not prove
Login History, subtype OAuth Device | Device flow logins of up to six months, per app and user | How many devices, or apps used less often
Warning banner in App Manager | The app is not compliant today | Whether anyone still needs it
App owner and vendor | Purpose, users, planned fix | Whether the device flow is really used
Plant IT or device management inventory | Physical devices, sites, remote access | Which login method each device uses
note: Start with Login History and the banners, then assign the devices with the owners.
```

Once you know an app, the owners tell you which devices sit behind it. In a manufacturing company, I would ask about terminals and kiosk PCs in production and the warehouse, wallboards showing the service queue, handheld scanners with their own app and command-line tools of the Salesforce team. Many of these devices log in some other way, for example through a browser or middleware, so the list only helps to ask the right people once Login History has named an app.

Worked example: Login History shows 40 device flow logins in six months through two apps. One is the app of a wallboard supplier, installed from a managed package. The other is a connected app that the plant IT built for warehouse terminals, with the web server flow also enabled for a web tool; the plant IT counts 12 terminals behind it. The package app goes to the vendor, because a packaged app may no longer use the device flow at all: ask in writing for the new login design, whether a local app has to be created in your org, how credentials reach the devices and when they have to be confirmed again. The plant IT app is split, as described in the next section. The configuration in Salesforce can be small; inventory, testing, approvals and reaching the terminals through remote management, plant access and maintenance windows decide the elapsed time.

## Which client keeps the consumer key?

For your own connected apps, Salesforce recommends a local external client app: through the automated migration in App Manager where the app is eligible, otherwise by adjusting an existing external client app or creating a new one. According to the [Salesforce Help article on the migration](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_to_external_client_app_migration.htm&language=en_US&type=5), the migration keeps consumer key and secret, and the article lists configurations that block it, such as Canvas or a custom Apex handler. If App Manager shows no migration option, that is the result of the eligibility check, not an operating error.

Because enabling the device flow switches off the other flows, an app that serves devices and another client must be split. You choose which side keeps the existing consumer key:

```vergleich
without: New app for the devices
- The web tool keeps the migrated app and its key.
- Every terminal needs the new consumer key.
- The rollout runs through plants, shifts and maintenance windows.
with: Migrated app stays with the devices
- The terminals keep their consumer key.
- The device flow is switched on in the migrated app.
- Only the web tool gets a new app with new credentials.
```

The second path is usually cheaper when the devices are hard to reach and the web tool is maintained by your own team. Check policies and IP allowlists after any migration instead of assuming an identical configuration. Test in a sandbox, with this catalogue:

- the automated migration keeps the credentials in the test org, and the production plan needs no credential change on the clients that keep the app,
- existing refresh tokens of the devices remain valid, or you know who logs the devices in again,
- no other client loses access when the other flows are switched off,
- the business process works end to end, not only the token request,
- existing tokens of the client you move are identified, and you know when they are revoked and that the old client can no longer use the retained app,
- a fallback is written down: who decides, and which configuration is restored if the production org behaves differently from the sandbox.

```vertiefung For developers
title: Device flow requests and the Login History query
- Login History query from the Salesforce article: SELECT Application FROM LoginHistory WHERE LoginSubType = 'OAuth Device'
- The device requests codes with a POST to /services/oauth2/token and response_type=device_code plus the client ID; it then polls the same endpoint with grant_type=device and the device code, no more often than the returned interval allows.
- The refresh token comes only with the refresh_token scope in the app. Do not assume a fixed format or length for device code and user code.
```

## Whose identity does the terminal use?

The device flow does not log in "the terminal". A person approves the code with their own Salesforce login, and the token then belongs to that user. On a shared terminal in the warehouse, every booking runs as this user, so a deactivation or a change to the user's permissions, role or sharing can change or end the device's access. Before you keep the device flow for a device, record these points for each device app:

```eintrag Device app in the interface list
App and owner | Which app, who is responsible on both sides
Process and devices | What the devices do, how many, at which sites
Identity | Which Salesforce user approves the code, personal or technical *
Rollout | Remote or on site, maintenance window, vendor commitment
Test and fallback | Test evidence, who decides on going back
note: If the process has to run without any person authorizing the device, the device flow is the wrong pattern.
```

For server-to-server integrations without a person, the [Salesforce article on the username-password retirement](https://help.salesforce.com/s/articleView?id=005461279&type=1) recommends the client credentials flow; how I clean up these technical users is described in [cleaning up Salesforce integration users](/en/blog/salesforce-integration-users-cleanup/). The same middleware and plant teams face the next deadline less than three months later, when the [password integrations end in February 2027](/en/blog/salesforce-password-integrations-end-2027/).

## What happens to devices you missed

From November 30, 2026, every device flow login through a non-compliant app fails. The Salesforce article does not say whether tokens issued before that date stay valid, so expect the error at the latest with the next login, possibly days later, after a weekend shutdown or a reboot. What users see depends on the client: a login prompt, an empty dashboard, queued transactions or a failed synchronization. With several shifts, this often happens when nobody from Salesforce administration is available.

Tell the service desk and the plant IT what the symptoms can look like and where the list of device apps is kept. A ticket "terminal 4 cannot log in" then goes to the right person instead of starting a search for network problems. Device apps belong in the regular check of [release updates before enforcement](/en/blog/salesforce-release-updates-testing/), because the next OAuth change will touch them again. If you want a second opinion on your interface list, my approach is on the page for [Salesforce integration](/en/services/salesforce-integration/).

## First step: filter Login History for OAuth Device in production

Open Login History in your production org today, add the Login Subtype column and filter for OAuth Device. If the list is empty, check the banners in App Manager and External Client App Manager, ask plant IT about devices used only once or twice a year and document the result. If it shows apps, enter each one in the interface list with owner, devices, identity and path (migrate, reconfigure, replace or retire), and test the first one in a sandbox before November 30.
