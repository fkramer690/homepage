---
title: "Partners coding with AI: what belongs in the contract"
description: "Your Salesforce partner codes with AI agents? Nine checklist items for the SOW: tools, data, production access, review, IP and liability. An architect's view."
pubDate: 2026-10-27
lang: en
slug: partners-using-ai-coding-contract-rules
translationKey: partners-ai-coding-sow-rules
topic: governance
categories: [architecture, ai]
contactBrief: partner-governance
tags: [partner governance, ai coding, statement of work, data protection, code review, manufacturing]
takeaways:
  - "When a Salesforce partner codes with AI agents, the SOW should cover disclosed tools and model routes, allowed data, no production access for agents, review of every line, rights and liability."
  - "Anthropic does not train on code sent to Claude Code under commercial terms, but on Free, Pro and Max plans training depends on a user setting. Private developer accounts do not belong in a client project."
  - "Under German law, code generated entirely by AI is public domain according to CMS, so a clause that transfers all rights to the client can transfer less than it promises."
  - "A model provider's copyright indemnity protects its own customer, which is the partner, not the manufacturer who receives the code."
  - "Veracode measured a 56 percent security pass rate for raw AI-generated code in 2026 and 30 percent for Java, which is why review and pipeline gates belong in the contract."
faq:
  - q: "Can I forbid my Salesforce partner to use AI coding tools?"
    a: "You can, but I would not. A ban is hard to check and costs you speed. Make the partner disclose tools and model routes, limit which data reaches the model and require the same review for every line."
  - q: "Who owns code that an AI agent wrote for my project?"
    a: "According to CMS, code generated entirely by AI is public domain under German law because only a human can be an author. Human contributions can be protected. Have a lawyer word the rights clause; this article is not legal advice."
  - q: "Which data may a partner's coding agent see?"
    a: "Code and metadata, yes. Production data, personal data, dealer prices and customer master data from service cases, no. Agents should work in scratch orgs or developer sandboxes with anonymised data."
  - q: "Does the model provider's indemnity protect me as the client?"
    a: "Usually not directly. Anthropic, for example, announced in 2023 that it defends its own customers under its Commercial Terms. In a partner project that customer is the partner, so your protection has to come from the partner contract."
draft: false
---

If your Salesforce implementation partner codes with AI agents, the contract needs AI coding rules that a classic SOW does not cover: which tools and model routes are used, which data may reach the model, no production access for agents, the same review for every line, and who holds the rights to code a machine wrote. I would not ban AI coding. I would make the partner disclose how it works and make that checkable. For a manufacturer the sensitive part is what an agent can read: service cases, dealer prices and SAP credentials.

```hinweis achtung
I am an architect, not a lawyer. The points below describe what I check from the technical side and want to see in writing. They are not legal advice. Your legal department or a lawyer turns them into clauses that fit your framework agreement.
```

## Why does AI coding by partners need its own clauses?

A classic SOW covers deliverables, acceptance, rights and confidentiality. It quietly assumes that the partner's people wrote the code on the partner's machines. With a coding agent, three things change.

**Data leaves through a new channel.** Everything the agent reads goes to a model provider as a prompt. Whether that provider trains on it depends on the contract type, not on the tool. Anthropic states that it [does not train on code or prompts sent to Claude Code under commercial terms](https://code.claude.com/docs/en/data-usage) (Team, Enterprise, API), while on the consumer plans Free, Pro and Max training depends on a user setting. Commercial accounts have a standard retention of 30 days. On top of that, Claude Code keeps session transcripts locally in plaintext for 30 days by default. A developer laptop therefore holds a copy of whatever the agent read.

**Code volume grows faster than review capacity.** Veracode's 2026 report measured the [security pass rate of AI-generated code](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/). The tests ran against raw models, without tooling or human review. The review step is the control, so it belongs in the contract.

```kennzahlen
56 % | Average security pass rate for AI-generated code
30 % | Pass rate for Java, the closest relative of Apex
source: Veracode, GenAI Code Security Report 2026
```

**Rights get blurry.** According to [CMS](https://cms.law/de/deu/legal-updates/ki-generierter-softwarecode-in-der-due-diligence), code generated entirely by AI is public domain under German law, because only a human can be an author, and a provider's terms cannot change that. And the provider's promises go to its own customer. When Anthropic introduced its [copyright indemnity](https://www.anthropic.com/news/expanded-legal-protections-api-improvements) in December 2023, it promised to defend "our customers". In a partner project, that customer is the partner, not you.

## Which AI coding rules belong in the partner contract?

I use these nine items as a checklist for SOWs and framework agreements. Not every programme needs all of them in the same depth.

1. **Disclosure of tools and model routes.** The partner names each coding tool, the model provider, the route (direct API, cloud provider or a Salesforce tool such as Agentforce Vibes) and the contract type. Changes are announced before use. The route decides where data is processed: Anthropic's first-party API offers only ["us" or "global" as inference region](https://platform.claude.com/docs/en/manage-claude/data-residency), while on Amazon Bedrock the region follows the endpoint. OpenAI has offered [European data residency for API projects](https://openai.com/index/introducing-data-residency-in-europe/) since February 2025.
2. **Commercial accounts only.** No private Pro or Max accounts in a client project. If you provide the licences yourself, you also set the policy, as described in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/). Who pays for the tokens is a separate negotiation, covered in [AI coding costs in a Salesforce project](../ai-coding-costs-salesforce-project/).
3. **Data classes for the agent context.** Code and metadata may reach the model. Production data, personal data, dealer price lists, conditions and customer data from service cases may not. Agents work in scratch orgs or developer sandboxes with anonymised data. A full copy sandbox counts as production data.
4. **No production access for agents.** Deployments to production run through the pipeline with a human approval. Salesforce lets you [disable Agentforce Vibes for a production org](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) in Setup, and the [Salesforce DX MCP Server](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html) only reaches orgs that were explicitly allowlisted when it starts. That server reaches end of life on 2 November 2026, see [the DX MCP Server end of life](../salesforce-dx-mcp-server-end-of-life/). Credentials such as the SAP integration user stay outside the agent's reach; Anthropic's [secure deployment guide](https://code.claude.com/docs/en/agent-sdk/secure-deployment) describes a proxy that injects them so the agent never sees them.
5. **The same review for every line.** Each pull request has a named human owner, the AI share is noted in the description, and the pipeline gates apply unchanged. Salesforce's own Vibes documentation puts it plainly: ["Permission modes protect your filesystem. Code review protects your application."](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html) How reviews work is in [why pull request reviews are a must](../why-pull-request-reviews-are-a-must-in-enterprise-projects/); what to look for in AI code is in [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/).
6. **Rules file in your repository.** Conventions for agents, such as API version, sharing and test standards, live in an AI rules file in your repository and apply to every partner. More in [an AI rules file for the Salesforce repository](../ai-rules-file-salesforce-repository/).
7. **Rights and licences.** The rights clause covers human and AI-generated parts, and the partner documents where AI was used, which CMS recommends for later due diligence. Ask how public code matches are handled: GitHub Copilot can [block suggestions that match public code](https://github.blog/news-insights/product-news/code-referencing-now-generally-available-in-github-copilot-and-with-microsoft-azure-ai/) or show them with licence information.
8. **Liability stays where it was.** The partner is responsible for its deliverables whatever tool produced them. Warranty, acceptance criteria and defect handling apply as before, with no exclusion for "generated by AI". CMS warns that provider indemnities often come with broad exclusions, so they do not replace the partner's.
9. **Evidence and exit.** You may ask for the tool list, the account list and relevant settings at the start and once a year. At the end of the engagement the partner confirms that local transcripts and caches with your code are deleted.

## A typical scenario: two partners, one questionnaire

Assume a machine builder with Sales Cloud, Service Cloud and Field Service on one org, SAP as ERP and two partners. Partner A builds the dealer portal and the service processes with six developers, partner B the SAP integration with three. All details here are assumptions to show the method.

Before extending the SOWs, IT sends both partners a one-page questionnaire: tools, model routes, account types, sandboxes with real data, who holds which credentials. The answers in this scenario:

- Partner A uses a coding agent on a company account, but two developers occasionally switch to private accounts when the company quota runs out.
- Partner A's agent works in a full copy sandbox that contains real service cases with customer names and machine serial numbers.
- Partner B has the password of the SAP integration user in a local file inside the project folder the agent can read.
- Partner B allows suggestions that match public code and has never looked at the licence notes.

None of these four findings would show up in a code review, because the code itself is fine. The fix is a two-page annex to the framework agreement with the nine items above, plus a few weeks to move partner A to a developer sandbox with anonymised data and partner B's credentials into the client's vault. For new SOWs, the annex applies automatically.

## What changes when several partners work on one org?

Agents make changes cheap, including changes to objects another stream owns. An agent that "fixes" a validation rule on Account while working on a dealer portal story has no idea that the service stream depends on it. That makes the [object ownership matrix](../salesforce-object-ownership-matrix/) more important. A CODEOWNERS file in the repository requests the owning stream as reviewer automatically when a pull request touches its objects.

The annex should be identical for all partners. If each partner brings its own AI rules, the strictest or the loudest one quietly becomes your standard, and comparing partners gets harder. For the rules not to wear off after a few months, the contract is not enough: they need the pipeline, review and a fixed slot for new cases, described in [Reinforcement: making standards stick with partners](../partner-standards-reinforcement/). Setting these rules on the client side is part of my work in [partner governance](../../services/partner-governance/).

## Where should you start?

```schritte
Send the questionnaire
  To every partner, including small ones that only deliver a single integration.
Classify your data
  Into what an agent may see and what it may not, with your data protection officer.
Draft the annex
  With your legal department, attached to the framework agreement so it applies to every SOW.
Enforce it technically
  Vibes disabled for production, deployments only through the pipeline, CODEOWNERS for shared objects.
Review it once a year
  Tools, plans and terms change faster than contracts.
```

AI coding by partners is fine when the contract says which tools, which data and which review apply, and when you can check it. If you want a second opinion on your partner contracts from the technical side, [send me a message](#contact).
