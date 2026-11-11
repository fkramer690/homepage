---
title: "Enhanced Chat user verification for dealer portals"
description: "How dealers chat signed in through user verification, why their history then stays and who issues the token when you roll out Salesforce Enhanced Chat v2."
pubDate: 2026-10-31
lang: en
slug: enhanced-chat-user-verification-dealers
translationKey: enhanced-chat-user-verification
topic: security
categories: [ai, architecture]
contactBrief: integration
tags: [Enhanced Chat, User Verification, Dealer portal, Experience Cloud, JWT, Agentforce]
series: { id: enhanced-chat, part: 4 }
takeaways:
  - "User verification in Enhanced Chat signs a dealer in with a signed JSON Web Token (JWT) that your portal issues at login and Salesforce checks with your public key."
  - "Verified dealers keep their chat history across logout, login and devices; for anonymous web visitors it disappears after six hours at most."
  - "On a channel with user verification the chat button only appears once a valid token has arrived. For the public website without login I therefore plan a separate, anonymous channel."
  - "I derive the dealer account that the agent and flows filter by from the signed token, never from a hidden pre-chat field set in the browser."
  - "Your system issues the token, not Salesforce. Keys, lifetime and renewal belong in the estimate and with IT security from day one."
faq:
  - q: "What is user verification in Salesforce Enhanced Chat?"
    a: "A sign-in of the chat user through a signed JSON Web Token. Salesforce checks the token against a stored public key and uses the sub claim to find the user's conversation history."
  - q: "How long does chat history last without sign-in?"
    a: "On the web as long as the setting Authorization Token Expiration Time for Unverified Users allows, six hours at most. After that the history is gone from the chat window."
  - q: "Which signature does the token need?"
    a: "Salesforce requires RS256 or RS512 with an RSA key of at least 2,048 bits. You upload the public key as a JSON Web Key to a keyset in Setup."
  - q: "Does user verification work for WhatsApp or SMS?"
    a: "No. Salesforce describes user verification only for Enhanced Web Chat and Enhanced In-App Chat, not for WhatsApp, SMS, Facebook Messenger, Apple Messages, LINE or Bring Your Own Channel."
  - q: "Do I have to set up user verification again for Enhanced Chat v2?"
    a: "According to Salesforce's comparison table, user verification works the same in v1 and v2. It sits on the messaging channel, so the new v2 deployment uses the same setting."
draft: true
---

If your dealers are signed in to your portal, they should be signed in to Enhanced Chat as well. Salesforce calls this user verification: your portal issues a signed JSON Web Token at login, the chat passes it to Salesforce, and Salesforce checks it with your public key. From then on the dealer keeps their chat history across devices and logins, and both the agent and your flows know for certain which account they work for. The public website stays anonymous. I decide this split at the start, because it determines how many channels you build and who supplies the token.

This is part 4 of the series on Enhanced Chat v2, formerly Messaging for In-App and Web. Part 3 covers the data model with Messaging End User and Conversation, part 5 the routing to the agent.

## What is user verification in Enhanced Chat?

User verification is the sign-in of the chat user through a JSON Web Token, JWT for short. A JWT is a small signed record with three parts: header, payload and signature. The signature proves that nobody changed the payload. It is not encrypted, anyone can read it. So prices or customer data do not belong in it.

For the chat one field in the payload matters most, the `sub` (subject) claim. It identifies the user. According to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.user_verification_terms.htm), Enhanced Chat uses this value to find the user's history and stores it in the Messaging Platform Key field on the Messaging End User record. The value in `sub` is therefore the permanent key to a dealer's history. If it changes, for example because the portal switches user IDs, the dealer no longer sees their old conversations.

The technical requirements are short. The token must be signed with RS256 or RS512, and the RSA key needs at least 2,048 bits. You upload the public part of the key as a JSON Web Key to a keyset in Setup. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/messaging-optimization-for-in-app-and-web/verify-end-user-share-msg-history) you configure three things: the keyset on the User Verification setup page, verification and token lifetime on the messaging channel, and the call that hands the token from your website to Salesforce.

User verification applies only to Enhanced Web Chat and Enhanced In-App Chat. WhatsApp, SMS and the other messaging channels do not support it. In Enhanced Chat v2 it works as in v1, according to the [comparison table](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5).

## What changes for a dealer who is signed in?

The difference shows in the second conversation. An anonymous visitor who asks about a spare parts delivery and comes back the next day starts from scratch. A signed-in dealer sees yesterday's question and the answer, even after moving from the office PC to the tablet in the workshop.

```tabelle
title: Enhanced Web Chat: anonymous or signed in
columns: | Anonymous | Signed in *
History in the chat window | disappears after the token lifetime, 6 hours at most | stays, also after logout and new login *
Devices | only the current browser | web and app, if the user is verified there *
Who is this? | unknown, only what the visitor types | sub claim, checked by signature *
Chat button | visible at once | only after a valid token
Salesforce token | lifetime up to 6 hours | default 60 minutes, renewable
note: Sources: Trailhead "Verify End Users and Share Messaging History", Developer Guide "User Verification", as of 31 October 2026.
```

For service in machinery, the history is more than a convenience. Dealers often work on a case for days: a question about the serial number, a photo of the type plate, the part order, the delivery date. With history, the service rep or the Agentforce agent reads what has already been settled instead of asking the same questions again.

## How does sign-in work technically?

The browser flow is described in the [Developer Guide](https://developer.salesforce.com/docs/service/messaging-web/guide/user-verification.html). Four steps are enough for planning.

```schritte
Portal login | Identity provider
  The dealer signs in, your system issues a JWT with their ID in sub.
Hand over token | Website
  The page hands over the token with setIdentityToken, in every tab and after every reload.
Check token | Salesforce
  Salesforce checks the signature against the keyset, shows the chat button and opens the session with its history.
Renew or sign out | Website
  When the token expires, a new one arrives within 30 seconds. On logout the page calls clearSession.
```

Teams easily miss two details. The token lives only in browser memory, so every reload and every new tab needs a new call. And when the dealer types again after both tokens have expired, the `onEmbeddedMessagingIdentityTokenExpired` event fires. If no new token arrives within 30 seconds, the chat clears the session itself. Your portal therefore needs a way to fetch a fresh token without making the dealer sign in again.

## Who issues the token?

Your system, not Salesforce. The sources I read describe how the chat checks a token, not where it comes from. If your dealer portal is an Experience Cloud site, you still need a small service that signs the token, for example in Apex with a certificate or in the identity provider your dealers sign in with. If the portal runs outside Salesforce, its backend takes this on.

That leads to questions I settle before building:

- **Which value goes into `sub`?** I use an ID that never changes, such as the user ID in the identity provider. The email address is a poor choice, because dealers change it.
- **Where does the private key live?** In IT security's vault, never in a repository. The keyset in Salesforce only holds the public part.
- **How does key rotation work?** The `kid` field in the token header tells Salesforce which key applies. A keyset can hold several keys, so the old and the new key can be valid side by side for a while.
- **How long is the token valid?** Short enough that a stolen token is of little use, long enough that the portal does not renew all the time.

```hinweis achtung
Real production tokens never go into an online decoding tool. Salesforce warns against this explicitly; for tests, use tokens from a sandbox.
```

## Isn't a hidden pre-chat field with the dealer number enough?

For context yes, for permissions no. Hidden pre-chat sets values such as dealer or order number via JavaScript in the browser. Anything set in the browser can be changed by a user with the developer tools. If an agent decides on that basis which orders to show, a curious dealer with someone else's number sees another dealer's orders.

So I separate two things. Who the dealer is comes from the signed token: the flow maps the value in `sub` to the contact and account, and the agent's actions filter by that account in logic. What they are looking at may come from the browser: page, serial number, search term. I described the principle for the [Agent API in your own dealer apps](../agentforce-agent-api-dealer-apps/), and it also protects against [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/). Part 6 of the series shows how page and search reach the agent.

## One channel for everyone, or separate for website and portal?

According to the Developer Guide, on a verified channel the chat button only appears once the page has handed over a valid token. A visitor to the public website without login has none. Since verification sits on the messaging channel, I plan two channels with one deployment each: an anonymous one for the website, where prospects and end customers ask questions, and a verified one in the dealer portal. That has a side effect I like: you can route the two channels separately. Anonymous requests go to the agent with general knowledge and to sales, signed-in dealers to the agent with access to orders and spare parts and to dealer service.

The price is two configurations for branding, pre-chat and routing. If you are moving to Enhanced Chat v2 anyway, that is the right moment to set up both properly. This decision belongs in the [Salesforce architecture](../../services/salesforce-architecture/) of the service process, not in the configuration of individual pages. How the portal itself is structured is covered in the article on the [customer portal in Manufacturing Cloud](../manufacturing-cloud-customer-portal/).

```praxis
PLACEHOLDER, Fabian to add: How did chat sign-in work in your Enhanced Chat project? Were there verified users, who issued the token, one or two deployments, what was the stumbling block?
```

## Where should you start?

First write down which visitors sign in and which do not. Then agree with IT security who signs the token, which value goes into `sub` and how the key is rotated. Only then is the setup in Salesforce worth doing, and it is the smaller part of the work. A signed-in dealer with history is worth as much in service as the identity behind it is reliable.
