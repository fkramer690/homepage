---
title: "Multilingual Agentforce agents for export dealers"
description: "Which languages Agentforce supports for text and voice, what translation costs, why other languages use more tokens and how to set up knowledge for dealers."
pubDate: 2026-10-27
lang: en
slug: multilingual-agentforce-agents-export-dealers
translationKey: multilingual-dealer-agents
topic: ai
categories: [ai, manufacturing-cloud]
tags: [agentforce, multilingual, knowledge, flex credits, dealer service, manufacturing]
takeaways:
  - "Salesforce lists 56 languages for Agentforce Service Agent, 25 of them in beta. Agentforce Voice names seven languages and mentions others."
  - "The Translation meter costs 4,000 Flex Credits per million characters, about $20, so translating one dealer chat costs around five cents."
  - "Other languages often need more tokens than English, and prompts are metered in 2,000-token units, so the same answer can cost two units."
  - "By default the knowledge retriever filters articles by the session language, so an Italian dealer finds only Italian articles."
  - "I would maintain knowledge in one or two languages, keep safety and warranty content per country and test every allowed language before go-live."
faq:
  - q: "Which languages does Agentforce support?"
    a: "The help page for Agentforce Service Agent lists 56 languages. 31 have no beta label, among them German, French, Italian, Spanish, Polish, Czech and Turkish. 25 are in beta, including Russian, Ukrainian, Slovak and Arabic, and for those Salesforce leaves quality assurance to you."
  - q: "Does Agentforce Voice speak French or Polish?"
    a: "The Agentforce Voice product page lists English, French, Spanish, Italian, German, Portuguese and Japanese. The Dreamforce 2026 announcement calls the French variant Canadian French, so confirm French for France before you plan. Polish is not named, but the page adds \"many others\"."
  - q: "What does translation cost in Agentforce?"
    a: "The Flex Credits rate card lists Translation at 4,000 credits per million characters translated, about $20 at list price. Salesforce does not say on its pricing pages which agent features draw on this meter, so ask your account executive."
  - q: "Do I need knowledge articles in every dealer language?"
    a: "Not necessarily. The standard retriever filters articles by session language, so either you maintain articles per language or you build a custom retriever without the language filter. Salesforce's own Help site keeps its knowledge in English and translates questions and answers."
  - q: "Why are prompts in German or Polish more expensive than in English?"
    a: "The same text often splits into more tokens in other languages, and Salesforce meters prompts in units of 2,000 input and output tokens. When a prompt crosses that line, it counts as two prompts. Actions are billed per call, whatever the language."
draft: false
---

Multilingual Agentforce agents can serve dealers in most export markets today. Salesforce lists 56 languages for Agentforce Service Agent, 25 of them in beta, and names seven for Agentforce Voice. Translation itself is cheap at 4,000 Flex Credits per million characters. The decisions that matter sit elsewhere: prompts in other languages need more tokens, and by default the knowledge retriever only finds articles in the dealer's session language. I would maintain knowledge in one or two languages, keep safety and warranty content per country and test every language before go-live.

## Which languages does Agentforce support for text and voice?

The [considerations page for Agentforce Service Agent](https://help.salesforce.com/s/articleView?language=en_US&id=sf.service_agent_considerations.htm&type=5) lists 56 languages. 25 carry a beta label, among them Russian, Ukrainian, Slovak, Serbian, Lithuanian and Arabic. The other 31 have none, including German, French for France and Canada, Italian, Spanish, Polish, Czech and Turkish.

The label matters. Salesforce's [guide to multi-language support](https://www.salesforce.com/blog/multi-language-guide/) says that for beta languages customers "are responsible for quality assurance", while GA "means Salesforce has verified the quality of responses across Agentforce". For an exporter: dealers in Czechia are covered, dealers next door in Slovakia are a beta case you test yourself.

Voice has a shorter list. The [Agentforce Voice product page](https://www.salesforce.com/agentforce/voice/) names English, French, Spanish, Italian, German, Portuguese and Japanese, "and many others" without saying which. The [Dreamforce 2026 announcements](https://www.salesforce.com/blog/dreamforce-2026-announcements/) call the French variant "Canadian French", and a [help article](https://help.salesforce.com/s/articleView?language=en_US&id=ai.agentforce_voice.htm&type=5) still says "supported only in English". The hotline design is in [breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/).

```hinweis offen
Get French for France confirmed before you plan a voice line for French dealers, and do the same for Polish or Czech, which the product page does not name.
```

## The agent's language comes from the channel

The guide, written for the earlier Agentforce Builder, describes three settings. The **End User Language** comes from the channel, in Enhanced Chat from a pre-chat field that can be filled from the browser locale. The **default language** is the fallback. **Secondary languages** complete the allowlist.

At session start the resolved language is stored as the Localization Context, which "doesn't change or get updated throughout the entirety of the agent session". The reply follows each message: the agent "responds in the same language as each of the user's questions", if that language is on the allowlist.

Two consequences for a dealer portal. First, the session language filters knowledge. As I read the guide, a Polish dealer whose browser runs in English gets answers in Polish built from English articles. Second, custom actions that call external services do not simply inherit the language; they need explicit setup in Apex or Flow. If your ERP keeps part descriptions per language, the action has to request the right one.

## What does runtime translation cost?

The [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) of 31 August 2026 lists three language meters, here converted at the [list price of $500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/). The Translation meter also runs in a sandbox.

```kennzahlen
4,000 credits | Translation per million characters, about $20
6,000 credits | Text to Speech per million characters, about $30
150 credits | Speech to Text per hour of transcription, about $0.75
source: Salesforce Flex Credits rate card of 31 August 2026,
  list price from the Agentforce pricing page
```

A chat of 2,500 translated characters costs 10 credits, $0.05. Three actions cost 60.

Less clear is when it runs. The [help article on billable usage types](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) meters translation "by the number of characters processed" and refers to each feature's documentation. The pricing page says credits are "fungible across Actions, Prompts, Translations, and Voice Actions". I found no Salesforce page naming the agent features that use it. Ask your account executive and watch [Digital Wallet](../digital-wallet-agentforce-cost-control/).

For human reps, [Real-Time Translations](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_translate_2.htm&type=5) translates enhanced chat and messaging. It needs the Agentforce for Service SKU plus a permission set license and takes custom terminology for up to 10 languages. The help pages I read do not say how its usage is billed.

## Prompts in other languages use more tokens

A token is the unit a language model reads and writes, often part of a word. OpenAI's [help center](https://help.openai.com/en/articles/4936856-understanding-and-counting-tokens) gives the rule of thumb "1 token is approximately 4 characters" and notes that "other languages can have different relationships between characters, words, and tokens".

In Flex Credits the effect comes in steps. The help article counts prompts "in chunks of 2,000 tokens, rounded up", input and output together: "a prompt with a total of 6,500 input and output tokens will be metered as 4 prompts." Actions are metered per call, whatever the language. A grounded answer of 1,750 tokens in English fits one unit. If the same answer needs a quarter more tokens in another language, an assumed figure, it needs about 2,190 tokens and two units, 8 credits instead of 4 on a Standard model. The method is in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/), the basics in the masterclass chapter [costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).

Quality is the second reason to test. The guide warns that "most major LLMs are predominantly trained using English". I would write the instructions once and test them in every allowed language.

## Knowledge per language or translated on the fly?

By default knowledge follows the session language: according to the guide, "the retriever filters out articles if the language context doesn't match the Knowledge Article Language". An Italian dealer finds only Italian articles. With German and English only, the agent has nothing to ground on, unless you use what the guide suggests: "a custom retriever without the language filter". Uploaded files carry no localization context, and "their output will be in the original language, regardless of the user's input language". As I read it, a German PDF manual can surface German text to a French dealer.

Salesforce uses a pivot on its own Help site. [Jim Roth, President of Salesforce Customer Success](https://www.salesforce.com/blog/agentforce-language-capabilities/), describes it: the question is translated into English, Data Cloud searches the English knowledge base, Agentforce translates the answer back. Seven languages cover 94 percent of their global case volume, "instead of translating hundreds of thousands of documents".

Articles per language cost effort the rate card does not show. [Salesforce Knowledge](https://help.salesforce.com/s/articleView?language=en_US&id=sf.knowledge_setup_multilingual.htm&type=5) supports a default assignee and reviewer per language, export to a localization vendor and, per the [Lightning Knowledge Guide](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/lightning_knowledge_guide.pdf), an "Out of Date" flag when the primary article changes. Languages cannot be removed once added. With twelve dealer languages, each change to a German article creates up to twelve translation tasks. Manuals in a Data 360 index are processed again per language at 150 credits per MB in the base tier, see [Data 360 costs for AI agents](../data-360-costs-for-ai-agents/).

My split for a machine builder:

- **Per language:** safety instructions and warranty terms that differ by country.
- **Top languages only:** troubleshooting articles and FAQs.
- **Pivot through one language:** manuals and spare part catalogues.
- **No translation:** order status and delivery dates, which the agent reads from the ERP.

Machine translation renames parts, and the guide does not promise that its keep-tag workaround protects a term. Part names belong in a terminology list and in the test cases.

## Worked example: dealers in 20 countries

Assume a machine builder with dealers in 20 countries and 13 languages. Knowledge is maintained in German and English; manuals take 150 MB per language. Assume 4,000 dealer conversations a month, 1,600 of them in the eleven other languages. All volumes are assumptions; the multipliers come from the rate card.

| Item | Credits | USD |
|---|---|---|
| Actions, 4,000 × 3 × 20, monthly | 240,000 | 1,200 |
| Extra prompt units, 1,600 × 4, monthly | 6,400 | 32 |
| Translation, 1,600 × 2,500 characters, monthly | 16,000 | 80 |
| Manuals indexed in 2 languages, once | 45,000 | 225 |
| Manuals indexed in 13 languages, once | 292,500 | 1,463 |
| Sandbox tests, 13 × 40 conversations, once | 29,120 | 146 |

The extra prompt units assume one of two prompts per conversation crosses the 2,000-token line. A test conversation counts three actions at 16 sandbox credits and two prompts at 4. The full method is in [Agentforce dealer service agent: cost per month](../dealer-service-agent-cost-calculation/).

Language adds about $112 a month to $1,200 for actions. Indexing manuals in all 13 languages costs six and a half times the two-language index, and each version needs maintenance. The budget question is the number of maintained languages, not the price per character.

## List dealer languages by volume

1. **List dealer languages by volume** from the last three months of cases and emails.
2. **Check each language** on the help page: no label, beta or missing. Check voice separately.
3. **Set default and secondary languages** and decide how the portal sets the session language.
4. **Decide the knowledge split** and whether you need a custom retriever.
5. **Write the terminology list** with part names and fault codes.
6. **Test every allowed language** with real dealer questions.

In a country rollout, language becomes a column in the table from [rolling out Manufacturing Cloud globally](../manufacturing-cloud-global-rollout/). Language set and retriever design are part of my [Salesforce architecture](../../services/salesforce-architecture/) work.
