---
title: "Sandbox customer data: what AI coding agents may read"
description: "Should a full copy sandbox with dealer prices and service cases be masked before a partner's AI agent reads it? Environment rules, Data Mask and test realism."
pubDate: 2026-10-27
lang: en
slug: sandbox-customer-data-ai-coding-agents
translationKey: sandbox-data-ai-coding-agents
topic: security
categories: [devops, ai]
tags: [sandbox, data masking, ai coding, claude code, data protection, manufacturing]
takeaways:
  - "Whatever a coding agent reads from a sandbox becomes part of a prompt; Claude Code also keeps session transcripts locally in plaintext for 30 days by default."
  - "A full copy sandbox holds all production data and files, so I treat it like production: humans for UAT, SAP tests and load tests, no logins for coding agents."
  - "Agents work in scratch orgs and developer sandboxes with a seed data set; a partial copy masked with Salesforce Data Mask serves integration tests."
  - "Masking costs test realism: random prices break discount logic, and rare cases such as an asset moved between dealers only exist if someone writes them into the seed data."
  - "The Einstein Trust Layer in Agentforce Vibes can mask personal and card data, but a dealer net price is neither, and Claude Code does not pass through it at all."
faq:
  - q: "Can an AI coding agent work in a full copy sandbox?"
    a: "Technically yes, but I would not allow it. A full copy contains all production data, and every record the agent queries goes into the prompt and the local session transcript. Use scratch orgs or developer sandboxes with seeded test data instead."
  - q: "Does Salesforce Data Mask protect dealer prices?"
    a: "It can replace number fields with random values in a range you set, so prices can be masked. That breaks the relationship between list price, discount and net price, so pricing logic needs a synthetic price list designed for testing."
  - q: "Which field types can Data Mask not mask?"
    a: "According to the Trailhead module on Data Mask, checkbox, lookup and picklist fields are not supported. Relationships therefore stay intact, and the records they point to have to be masked themselves."
  - q: "How do I get realistic test data into a scratch org?"
    a: "Scratch orgs are empty by default. Salesforce recommends the data tree export and import commands for small sets of fewer than 3,000 records and the data bulk commands for more. The edge cases have to come from your service and sales teams."
  - q: "What does Data Mask & Seed cost?"
    a: "Salesforce's product page lists no price. Ask your account executive for a quote and compare it with the effort of building and maintaining your own seed data set."
draft: false
---

Sandbox customer data should be masked, or kept out of reach, before a partner's AI coding agent connects to a Salesforce sandbox, because whatever the agent reads ends up in a prompt. A full copy sandbox holds the same dealer prices, contracts and service cases as production. My rule: agents work in scratch orgs and developer sandboxes with seeded test data, a masked partial copy serves integration tests, and the full copy stays with humans. The price is test realism: masking breaks price logic and rare data constellations, so someone has to build a seed data set on purpose.

## Why does a full copy sandbox leak once a coding agent is connected?

A coding agent such as Claude Code, Cursor or Agentforce Vibes reads code, and it can also query the org it is logged into. Asked why warranty claims from one dealer fail validation, the agent runs a SOQL query and gets back twenty claims with fault descriptions, dealer names and net prices. Those records are now part of the conversation with the model.

Salesforce describes [four sandbox types](https://www.salesforce.com/platform/what-is-salesforce-sandbox/):

| Sandbox type | Data from production | Data storage | Refresh |
|---|---|---|---|
| Developer | none, metadata only | 200 MB | daily |
| Developer Pro | none, metadata only | 1 GB | daily |
| Partial Copy | sample defined by a sandbox template | 5 GB | every 5 days |
| Full | all data and files | same as production | every 29 days |

From a data protection point of view, a full copy is production with a different login URL.

For Claude Code under commercial terms, Anthropic states that it [does not train on code or prompts](https://code.claude.com/docs/en/data-usage) and keeps them for 30 days by default. Claude Code also stores session transcripts locally in plaintext for 30 days by default, so a partner laptop holds that query result for a month. Deletion at the end of an engagement belongs in the contract, see [partners coding with AI](../partners-using-ai-coding-contract-rules/).

Simon Willison calls private data, untrusted content and a way to communicate externally the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/). A full copy brings two: customer data, and text dealers wrote through the portal or by email. A warranty fault description can carry instructions just like the README in Anthropic's [secure deployment guide](https://code.claude.com/docs/en/agent-sdk/secure-deployment), as described in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/). The laptop with internet access supplies the third.

## Which data in a manufacturer's sandbox is sensitive?

**Personal data.** Contacts at dealers and end customers, technician names, delivery addresses, phone numbers. Salesforce's scratch org guide says plainly: ["Don't add personal data to scratch orgs."](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs.htm) Whether a full copy with personal data may serve development at all is for your data protection officer to decide; this is not legal advice, and the GDPR side is in [AI coding tools: works council and GDPR](../ai-coding-tools-works-council-gdpr/).

**Commercial data.** Dealer net prices, discount matrices, rebate agreements, sales agreement volumes, warranty terms per dealer. GDPR does not cover them, but the partner building your portal may work for a competitor next year.

**Free text.** Case descriptions, emails, Chatter posts, work order notes and warranty fault descriptions. They mix both groups and are the hardest to mask without destroying their meaning.

Salesforce says Agentforce Vibes [routes prompts through the Einstein Trust Layer](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html), which "can identify and mask" personal and payment card data, and caps the context window at 115K tokens while masking is active. A dealer net price is neither, so as I read it the price reaches the model unmasked. Claude Code sends prompts to Anthropic or your cloud provider directly, with no Salesforce masking step in between. More in [the Einstein Trust Layer and what it protects](../einstein-trust-layer-what-it-protects/).

## Which environment may an agent use?

I would give each environment a data level and an agent rule:

| Environment | Data | Coding agent | Used for |
|---|---|---|---|
| Scratch org | empty, plus seed data | yes | building and unit testing a story |
| Developer (Pro) sandbox | metadata, plus seed data | yes | shared development, integration stubs |
| Partial Copy, masked | template sample after the mask ran | read only, once the mask job is checked | integration tests with SAP QA |
| Full | everything | no | UAT, end to end and load tests |

For the masked partial copy Salesforce sells [Data Mask & Seed](https://www.salesforce.com/eu/platform/data-masking/). The product page lists no price.

```vertiefung For admins
title: How does Data Mask work?
According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-data-mask/install-and-configure-salesforce-data-mask), Data Mask is a managed package installed in production; a mask configured there appears in a sandbox when it is created or refreshed, and you run it from the Data Mask tab in the sandbox each time. Per field you choose random characters or numbers between a minimum and maximum, a library replacement such as last name, company name or street, or deletion. You can also mask case comments and delete all emails and Chatter feeds. Checkbox, lookup and picklist fields are not supported.
```

```hinweis achtung
I treat a sandbox as unmasked until the mask job has run after a refresh, and allow agent logins only once the execution log shows it complete.
```

Scratch orgs are empty by default. For small sets Salesforce recommends the [data tree commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_test_data.htm), which suit fewer than 3,000 records. Kept in the repository, such a seed set gives every developer and agent the same start.

## What does masking cost in test realism?

- **Price logic.** Random numbers break the relationship between list price, dealer discount and net price, so a rebate test passes or fails by chance. Pricing needs a synthetic price list: two price lists for one dealer, a zero price for goodwill parts, a second currency.
- **Rare constellations.** The machine with 14 years of service history, the asset that moved between dealers, the SAP customer number mapped to two accounts. A seed set only contains them if someone writes them down, so I would ask service and sales for 20 to 30 such cases.
- **Free text.** Masked case comments make service history summaries hard to test. Synthetic fault descriptions with your real error codes help.
- **Integration keys.** Mask SAP customer and material numbers and tests against SAP QA fail. I would keep them and mask the names around them.
- **Volume.** A partial copy is capped at 5 GB, a developer sandbox at 200 MB. Load tests belong in the full copy, run by humans, as do ApexGuru's runtime ratings, see [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/).
- **Upkeep.** A new field for a dealer surcharge stays unmasked until someone adds it to the mask, so that check belongs in the release checklist.

## A typical scenario: warranty claims and a partner's agent

Assume a machine builder with Service Cloud, Field Service and Manufacturing Cloud on one org, SAP as ERP, about 300 dealers and a full copy refreshed monthly. All numbers here are assumptions. The partner wants Claude Code for a warranty validation story and asks for the full copy, "because the real claims are there".

The client chooses three levels instead:

- **Scratch orgs** with about 1,500 seed records: 30 dealers, 200 assets, 400 claims, two synthetic price lists and 25 edge cases from service.
- **An integration sandbox** as masked partial copy: names from the library, emails and Chatter deleted, net prices randomised, SAP numbers kept.
- **The full copy** for UAT and SAP end to end tests, with no CLI login for the partner's developers.

The assumed effort is 6 to 10 person days for seed set and mask, plus half a day per release for new fields. In return no partner laptop holds a real claim, and a defect that only shows with real price tiers surfaces in UAT instead of a scratch org. I would accept that trade.

## How do you enforce the rule, and where do you start?

The strongest control: no full copy login on any machine where an agent runs. Tool settings come second:

- **Claude Code.** Anthropic's [best practices](https://code.claude.com/docs/en/best-practices) say deny rules "hold in every permission mode", but also that a WebFetch deny does nothing against curl unless the sandbox is on. Deny rules back up the missing login; they do not replace it.
- **Salesforce DX MCP Server.** It reaches only [explicitly allowlisted](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html) orgs. According to its README it reaches [end of life on 2 November 2026](../salesforce-dx-mcp-server-end-of-life/); whatever replaces it needs the same restriction.
- **Agentforce Vibes.** Salesforce describes [disabling Vibes per org](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) under Setup, Agentforce Vibes Extensions, for production. I would do the same for the full copy.
- **Transcripts.** Shorten local retention with `cleanupPeriodDays` and have partners confirm deletion when they leave.

Where I would start:

1. **List every sandbox** with type, last refresh and who holds a CLI login.
2. **Classify the fields** into personal, commercial and free text, with your data protection officer.
3. **Build the seed set** with service and sales, including edge cases, and check it into the repository.
4. **Configure the mask** for the partial copy and add the field check to every release.
5. **Remove agent access** to the full copy and write the levels into the partner annex and the AI rules file; more agent rules are in [chapter 8 of the masterclass](../../masterclass/ai-salesforce/ai-code-best-practices/).

Sandbox levels and pipelines are part of my [DevOps and release management](../../services/devops-release-management/) work.

A full copy sandbox is production data, so a coding agent should only see data you would accept on a partner laptop for a month.
