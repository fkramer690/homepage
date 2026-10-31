---
title: "Connected apps and AI tools: lessons from Salesloft Drift"
description: "What the Salesloft Drift breach teaches about connected apps, OAuth tokens and AI integrations in Salesforce, and which controls manufacturers need now."
pubDate: 2026-10-27
lang: en
slug: connected-apps-oauth-ai-integrations
translationKey: oauth-connected-apps-ai-lessons
topic: security
categories: [architecture, ai]
tags: [connected apps, oauth, security, ai integrations, external client apps, manufacturing]
takeaways:
  - "In August 2025 attackers used stolen OAuth tokens of the Drift AI app to export data from Salesforce orgs without exploiting a Salesforce vulnerability."
  - "Every SaaS tool with a refresh token is part of your security perimeter; user rights, scopes, token policy and IP restrictions decide the damage."
  - "Since September 2025 Salesforce blocks uninstalled connected apps for most users, and new External Client Apps enforce refresh token rotation."
  - "Admins cannot verify most OAuth controls inside a vendor's app, so AI vendors should confirm them in writing."
  - "Search service cases for passwords and remote access details, because the Drift attacker mined exported records for credentials."
faq:
  - q: "Was the Salesloft Drift breach a Salesforce vulnerability?"
    a: "No. Google Threat Intelligence and Salesforce both state that it did not stem from a vulnerability in the core Salesforce platform. The attacker used valid OAuth tokens stolen from the Drift application, so Salesforce saw normal API access by an authorised app."
  - q: "What is the difference between a connected app and an External Client App?"
    a: "Both let external systems log in to Salesforce through OAuth. External Client Apps are closed by default, keep admin policies separate from developer settings and are fully metadata compliant. Since Spring '26 Salesforce restricts creating new connected apps and recommends External Client Apps."
  - q: "How do I see which apps have access to our Salesforce org?"
    a: "Setup shows Connected Apps OAuth Usage with every app that holds tokens, how many users rely on it and whether it is installed. From there you can revoke tokens per app or block an app, which ends its active sessions immediately."
  - q: "Do we need Event Monitoring to investigate an incident like Drift?"
    a: "Without the add-on, Enterprise and Unlimited Edition orgs get a limited set of event types with one day of retention. The Drift activity started on 8 August 2025 and was disclosed on 20 August, so a useful look back needs paid Event Monitoring with 30 days or more."
  - q: "Which refresh token policy should an AI integration have?"
    a: "The default for connected apps is valid until revoked. For AI tools that run on the vendor's servers I would set expiry after non-use, limit the integration user's login IP ranges to the vendor's published ranges and require refresh token rotation, which new External Client Apps enforce."
draft: false
---

The Salesloft Drift breach showed that a connected app can be an unmonitored way into your org, and AI integrations add more of them every quarter. In August 2025 attackers used stolen OAuth tokens of an AI chat app to export data from customer orgs without breaking into Salesforce itself. Every tool that holds a refresh token for your org is part of your security perimeter. A manufacturer needs an owner, narrow scopes, a dedicated low-privilege user and a token policy for each app, plus logs that reach back far enough to investigate.

## What happened in the Salesloft Drift breach?

Drift is an AI chat agent from Salesloft that companies connected to Salesforce through a connected app. According to [Google Threat Intelligence](https://cloud.google.com/blog/topics/threat-intelligence/data-theft-salesforce-instances-via-salesloft-drift), a group tracked as UNC6395 used stolen OAuth access and refresh tokens of the Drift app in August 2025. The attacker queried Cases, Accounts, Users and Opportunities in customer orgs, exported the results and deleted the query jobs; the logs survived.

GTIG assesses that the main goal was harvesting credentials: AWS access keys, passwords and Snowflake tokens found in the exported records. [The Hacker News](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html) reports that GTIG knew of more than 700 potentially affected organisations, while Salesforce spoke of a "small number of customers".

```zeitleiste
2025-08-08 | Attackers start using stolen Drift tokens
2025-08-18 | Access continues at least until this day, per GTIG
2025-08-20 | Salesloft and Salesforce revoke all active Drift tokens
2025-08-28 | Salesforce disables all Salesloft integrations
2025-09-07 | Integrations re-enabled, except Drift
```

Salesforce also removed the app from AppExchange, according to its [security response](https://help.salesforce.com/s/articleView?id=005134951&language=en_US&type=1). GTIG's update of 28 August added that Drift Email tokens had been used against Google Workspace too, and that customers should treat every token stored in Drift as compromised.

GTIG and Salesforce both state that the issue did not stem from a vulnerability in the core Salesforce platform. That is accurate and no comfort: Salesforce saw an authorised app calling the API with valid tokens, which at first glance looks like a normal sync.

## Why does this matter for AI integrations in particular?

Drift was one AI tool. Most companies are adding more: meeting recorders that write call notes into opportunities, email assistants, chatbots that create leads and cases. Each runs on the vendor's servers and holds a refresh token for your org, by default until someone revokes it. Four questions decide the damage when such a token is stolen:

- **Which user does the token act as?** If the vendor asked for an admin during setup, the token reads what an admin reads.
- **Which scopes were granted?** GTIG explicitly warns against overly permissive scopes such as `full`.
- **How long is the token valid?** "Valid until revoked" is the connected app default, according to the [OAuth policy documentation](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_oauth.htm&language=en_US&type=5).
- **From where may it be used?** The attacker came from cloud hosts and Tor exit nodes, which login IP ranges limited to the vendor's addresses would refuse.

Drift was not the last case. In November 2025 Salesforce [revoked the OAuth tokens](https://help.salesforce.com/s/articleView?id=005229029&language=en_US&type=1) of Gainsight-published applications after unusual activity from VPN and Tor addresses, again without a platform vulnerability. Attackers do not need a hole in Salesforce when an OAuth app hands them a key.

For a manufacturer the exported objects carry specific weight. Opportunities and accounts hold dealer conditions and project prices. The User query in GTIG's report pulled names, titles, emails and mobile numbers of active users, a ready-made phishing list. And in a machine builder's service cases I would expect exactly what GTIG told customers to search for: login URLs, VPN details and passwords, pasted in by technicians who needed remote access to a machine in a customer's plant. That hurts the customer first.

## Salesforce has tightened OAuth access since 2025

The steps in detail:

- **Early September 2025: uninstalled connected apps blocked.** Apps that users authorised without an admin installing them are no longer accessible to most users, according to the [Salesforce Admins blog](https://admin.salesforce.com/blog/2025/get-ready-for-changes-to-connected-app-usage-restrictions). Users with "Approve Uninstalled Connected Apps" or "Use Any API Client" can bypass this, so those permissions should be rare.
- **Spring '26: no new connected apps.** Creation is restricted by default, except through package installation, and re-enabling needs a Support request, according to the [Spring '26 architect highlights](https://www.salesforce.com/blog/spring-26-release-architect-highlights/).
- **External Client Apps as the replacement.** An ECA is closed by default and works in an org only after an admin installs it. Admin policies cannot be packaged, so a vendor cannot ship a relaxed token policy into your org, and ECAs are fully metadata compliant, according to the [developer blog](https://developer.salesforce.com/blogs/2025/01/secure-your-org-with-external-client-apps). Their policies can sit in your repository and pass review.
- **Refresh token rotation on new ECAs**, on by default and locked. Salesforce says it "materially reduces the blast radius of a stolen refresh token" ([Help article](https://help.salesforce.com/s/articleView?id=005390912&language=en_US&type=1)).
- **Required controls for partner apps.** Apps used by more than two customer production orgs had to enable PKCE, refresh token rotation, a 30-day idle expiry and a refresh token IP allowlist by 11 May 2026, where each applies to the app's OAuth flow, according to the [partner FAQ](https://help.salesforce.com/s/articleView?id=005387798&language=en_US&type=1).

```hinweis offen
One line in that FAQ matters for buyers: admins cannot directly verify most of these controls. You depend on what the vendor tells you, so get it in writing.
```

ECAs also do not support the username-password flow. What that means for older ERP and middleware connections is covered in [the end of password integrations in 2027](../salesforce-password-integrations-end-2027/).

## Which controls must a manufacturer have now?

What I would require for every connected app and ECA in production, starting with the AI tools:

1. **An inventory with owners.** Connected Apps OAuth Usage in Setup lists each app, its users and whether it is installed. Every entry gets a business owner and a purpose. Apps nobody claims get blocked, which ends their sessions immediately, so announce it first.
2. **Install and pre-authorise.** Set "Admin approved users are pre-authorized" and grant access through one permission set per app.
3. **One dedicated integration user per server-side app.** The Salesforce Integration user licence with the "Minimum Access - API Only Integrations" profile allows API access only, according to the [Help documentation](https://help.salesforce.com/s/articleView?language=en_US&id=platform.integration_user.htm&type=5). The profile itself is configurable; I would grant the app's rights through permission sets on top of it. A website chatbot needs to create leads and cases, not read opportunities.
4. **API Enabled only through permission sets**, as GTIG recommends, so a standard user cannot authorise an API client by accident.
5. **No `full` scope.** If a vendor insists, ask why in writing.
6. **A token policy.** Replace "valid until revoked" with expiry after non-use. For IP limits, the connected app setting "Enforce IP restrictions" is already the default and only applies the IP ranges configured in the org, such as those on the user's profile, according to the [OAuth policy documentation](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_oauth.htm&language=en_US&type=5). The real control is the vendor's published IP ranges as login IP ranges on the integration user's profile, or the refresh token IP allowlist of an External Client App.
7. **Logs that reach back.** Without the add-on, Enterprise and Unlimited Edition orgs get limited event types with one day of retention, according to the [Event Monitoring FAQ](https://help.salesforce.com/s/articleView?id=000396295&language=en_US&type=1). Paid logs keep 30 days by default, up to one year, and only start at the contract date. Drift ran for at least ten days before disclosure.
8. **No secrets in records.** Search cases, comments and emails for passwords, VPN terms and AWS keys, as GTIG lists, and give the service team a vault for remote access credentials.
9. **A vendor questionnaire and a revocation drill.** Ask each vendor where your tokens are stored and whether rotation and IP allowlists are active. Internally, decide who revokes an app's tokens at night and which process stops when they do.

Most of this is configuration. Event Monitoring has a price tag and deserves a conscious decision.

## Worked example: nine apps at a machine builder

Assume a machine builder with Sales Cloud, Service Cloud, SAP and 80 dealers. All numbers are assumptions. Connected Apps OAuth Usage lists nine apps, among them the SAP middleware, a backup tool, an AI meeting recorder used by 25 sales reps, an AI chatbot for spare part requests on the website and one app nobody recognises.

The chatbot is the Drift pattern. Its integration user was cloned from a system administrator during the proof of concept, the scope is `full`, the refresh token is valid until revoked and IP restrictions are relaxed. It needs to create leads and cases. It could read every dealer price agreement.

The meeting recorder runs per user, each rep with their own rights, much like the named user model in [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/). The difference: the vendor stores 25 refresh tokens on its own servers.

The fixes take an assumed two weeks. The chatbot gets its own integration user with create rights on leads and cases only, `full` is removed and the vendor's IP ranges go onto its profile as login IP ranges. The meeting recorder is installed, limited to a permission set, with tokens expiring after 30 days unused. The unknown app is blocked. A search of service cases finds, assumed, 340 records with passwords or remote access details, which are cleaned up and rotated with the affected customers.

None of this stops a vendor from losing your tokens. It decides what a stolen token can do: from an unknown address nothing, and from an allowed one it could create leads, not read dealer prices.

## First step: mark every app that sends Salesforce data to a model

Start with the AI tools, because they are the newest and least reviewed: mark every app that sends Salesforce data to a model and check user, scopes and token policy for those first. Their second risk is [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/). An inventory of interfaces with named owners is part of my [Salesforce integration work](../../services/salesforce-integration/).
