---
title: "Multilingual Agentforce agents for export dealers"
description: "Which languages Agentforce supports for text and voice, what translation and tokens cost, and how to set up knowledge for dealers in export markets."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: multilingual-agentforce-agents-export-dealers
translationKey: multilingual-dealer-agents
topic: ai
categories: [ai, manufacturing-cloud]
tags: [agentforce, multilingual, knowledge, flex credits, dealer service, manufacturing]
takeaways:
  - "Salesforce lists 56 languages for Agentforce Service Agent, 25 in beta. Agentforce Voice has seven GA languages, Polish and Czech in beta."
  - "The Translation meter costs 4,000 Flex Credits per million characters, about $20; Real-Time Translations first uses 250,000 free characters per user."
  - "Token counts differ by model and language, and prompts are metered in 2,000-token units, so a longer answer can cost two units instead of one."
  - "The standard knowledge retriever filters articles by the session's fixed language, so an Italian session finds only Italian articles."
  - "I would maintain knowledge in one or two languages, keep safety and warranty content per country and test every allowed language before go-live."
faq:
  - q: "Which languages does Agentforce support?"
    a: "The help page for Agentforce Service Agent lists 56 languages. 31 have no beta label, among them German, French, Italian, Spanish, Polish, Czech and Turkish. 25 are in beta, including Russian, Ukrainian, Slovak and Arabic, and for those Salesforce leaves quality assurance to you. Salesforce tested the list for standard actions and information retrieval, not for your terminology."
  - q: "Does Agentforce Voice speak French or Polish?"
    a: "Yes. The Agentforce Voice considerations in Salesforce Help list French for France and Canada as generally available, next to English, German, Italian, Japanese, Portuguese and Spanish. Polish and Czech are beta. A voice agent speaks only its default language, so one hotline number per language is the usual design."
  - q: "What does translation cost in Agentforce?"
    a: "The Flex Credits rate card lists Translation at 4,000 credits per million characters translated, about $20 at list price. Salesforce documents the meter for features such as Real-Time Translations, which first uses 250,000 free characters per user and month. That an agent answering in the dealer's language draws on it, I found on no Salesforce page."
  - q: "Do I need knowledge articles in every dealer language?"
    a: "Not necessarily. The standard retriever filters articles by session language, so either you maintain articles per language or you build a custom retriever without the language filter. Salesforce's own Help site keeps its knowledge in English and translates questions and answers."
  - q: "Why are prompts in German or Polish more expensive than in English?"
    a: "They are not automatically. Token counts depend on the model and the language, and Salesforce meters prompts in units of 2,000 input and output tokens. When a prompt crosses that line, it counts as two prompts. Measure with your model and real dealer questions. Actions are billed per call, whatever the language."
draft: false
---

Multilingual Agentforce agents can serve dealers in most export markets today. Salesforce lists 56 languages for Agentforce Service Agent, 25 of them in beta, and seven generally available languages for Agentforce Voice. Translation itself is cheap at 4,000 Flex Credits per million characters. The decisions that matter sit elsewhere: prompts can cross a token threshold, and by default the knowledge retriever only finds articles in the dealer's session language. I would maintain knowledge in one or two languages, keep safety and warranty content per country and test every language before go-live.

## Which languages does Agentforce support for text and voice?

The [considerations page for Agentforce Service Agent](https://help.salesforce.com/s/articleView?language=en_US&id=sf.service_agent_considerations.htm&type=5) lists 56 languages. 25 carry a beta label, among them Russian, Ukrainian, Slovak, Serbian, Lithuanian and Arabic. The other 31 have none, including German, French for France and Canada, Italian, Spanish, Polish, Czech and Turkish.

The label matters. Salesforce's [guide to multi-language support](https://www.salesforce.com/blog/multi-language-guide/) says that for beta languages customers "are responsible for quality assurance", while GA "means Salesforce has verified the quality of responses across Agentforce". The help page names the scope: standard actions and information retrieval. For an exporter: Czech is not marked beta, Slovak next door is a beta case you test yourself, and your part names you test in both.

Voice has a shorter list. The [Agentforce Voice considerations](https://help.salesforce.com/s/articleView?id=ai.agentforce_voice_considerations.htm&language=en_US&type=5) name seven generally available languages: English, French for France and Canada, German, Italian, Japanese, Brazilian Portuguese and Spanish. Polish, Czech, Dutch and a dozen others are beta. A voice agent is monolingual: it listens and answers only in its default language, and the allowed languages of text agents do not apply. The hotline design is in [breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/).

```hinweis tipp
For French, German and Italian dealers a voice line works with GA languages. Polish or Czech lines are beta: test retrieval and part names carefully before production.
```

## Where does the agent's language come from?

The guide, written for the earlier Agentforce Builder, describes three settings. The **End User Language** comes from the channel, in Enhanced Chat from a pre-chat field that can be filled from the browser locale. The **default language** is the fallback. **Secondary languages**, now called allowed languages in [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.agent_language_support.htm&language=en_US&type=5), complete the allowlist. An Adaptive Language Mode in beta can also answer outside that list, but not in voice.

At session start the resolved language is stored as the Localization Context, which "doesn't change or get updated throughout the entirety of the agent session". The reply follows each message: the agent "responds in the same language as each of the user's questions", if that language is on the allowlist.

Two consequences for a dealer portal. First, the session language filters knowledge. As I read the guide, a Polish dealer whose browser runs in English gets answers in Polish built from English articles. Second, custom actions that call external services do not simply inherit the language; they need explicit setup in Apex or Flow. If your ERP keeps part descriptions per language, the action has to request the right one.

## What does runtime translation cost?

The [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) of 3 November 2026 lists three language meters, here converted at the [list price of $500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/). The Translation meter also runs in a sandbox.

```kennzahlen
4,000 credits | Translation per million characters, about $20
6,000 credits | Text to Speech per million characters, about $30
150 credits | Speech to Text per hour of transcription, about $0.75
source: Salesforce Flex Credits rate card of 3 November 2026,
  list price from the Agentforce pricing page
```

A chat of 2,500 translated characters costs 10 credits, $0.05. Three actions cost 60. The speech meters are not the price of a voice hotline: Agentforce Voice bills voice actions at 30 credits or, where contracted, voice minutes, which take precedence.

Less clear is when it runs. The [help article on billable usage types](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) meters translation "by the number of characters processed" and refers to each feature's documentation. The pricing page says credits are "fungible across Actions, Prompts, Translations, and Voice Actions". Salesforce documents it for features such as Real-Time Translations and knowledge translation. That an agent answering in the dealer's language draws on it, I found on no Salesforce page; the model usually writes the answer in that language directly. Watch [Digital Wallet](../flex-credits-agentforce-cost-per-action/) in the pilot.

For human reps, [Real-Time Translations](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_translate_2.htm&type=5) translates enhanced chat and messaging. It needs the Agentforce for Service SKU plus a permission set license and takes custom terminology for up to 10 languages. According to the [considerations page](https://help.salesforce.com/s/articleView?id=service.real_time_translations_considerations.htm&language=en_US&type=5), each user gets 250,000 characters a month with the Agentforce add-on license; only usage above that draws on Flex Credits.

## Prompts in other languages can cross a token step

A token is the unit a language model reads and writes, often part of a word. OpenAI's [help center](https://help.openai.com/en/articles/4936856-understanding-and-counting-tokens) gives the rule of thumb "1 token is approximately 4 characters" and notes that "other languages can have different relationships between characters, words, and tokens".

In Flex Credits the effect comes in steps. The help article counts prompts "in chunks of 2,000 tokens, rounded up", input and output together: "a prompt with a total of 6,500 input and output tokens will be metered as 4 prompts." Actions are metered per call, whatever the language. A grounded answer of 1,750 tokens in English fits one unit. Token counts depend on the model and the language. If input and output together need a quarter more tokens in another language, an assumed figure, the interaction needs about 2,190 tokens and two units, 8 credits instead of 4 on a Standard model. Measure that with your model before you budget it. The method is in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/), the basics in the masterclass chapter [costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).

Quality is the second reason to test. The guide warns that "most major LLMs are predominantly trained using English". I would write the instructions once and test them in every allowed language.

## Knowledge per language or translated on the fly?

By default knowledge follows the session's fixed localization context: according to the guide, "the retriever filters out articles if the language context doesn't match the Knowledge Article Language". An Italian session finds only Italian articles. With German and English only, the agent has nothing to ground on, unless you use what the guide suggests: "a custom retriever without the language filter". Uploaded files carry no localization context, and "their output will be in the original language, regardless of the user's input language". As I read it, a German PDF manual can surface German text to a French dealer.

Salesforce uses a pivot on its own Help site. [Jim Roth, President of Salesforce Customer Success](https://www.salesforce.com/blog/agentforce-language-capabilities/), describes it: the question is translated into English, Data Cloud searches the English knowledge base, Agentforce translates the answer back. Seven languages cover 94 percent of their global case volume, "instead of translating hundreds of thousands of documents".

Articles per language cost effort the rate card does not show. [Salesforce Knowledge](https://help.salesforce.com/s/articleView?language=en_US&id=sf.knowledge_setup_multilingual.htm&type=5) supports a default assignee and reviewer per language, export to a localization vendor and, per the [Lightning Knowledge Guide](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/lightning_knowledge_guide.pdf), an "Out of Date" flag when the primary article changes. Languages cannot be removed once added. With twelve dealer languages, each change to a German article creates up to twelve translation tasks. Manuals in a Data 360 index are processed again per language at 150 credits per MB in the base tier; if AI-assisted Intelligent Processing is enabled for the library, a separate, higher meter applies, and every retrieval also consumes Data 360 query credits. See [Data 360 costs for AI agents](../data-360-costs-for-ai-agents/).

My split for a machine builder:

- **Per language and market:** safety instructions and warranty terms that differ by country. The language filter does not separate France from Canada, so these articles also need market and product filters.
- **Top languages only:** troubleshooting articles and FAQs.
- **Pivot through one language:** manuals and spare part catalogs, without their safety chapters.
- **No translated knowledge:** order status and delivery dates, which the agent reads from the ERP. Status texts and date formats still need localized labels.

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

The extra prompt units assume one of two prompts per conversation crosses the 2,000-token line. A test conversation counts three actions at 16 sandbox credits and two prompts at 4. The full method is in [Agentforce costs for manufacturers](../flex-credits-agentforce-cost-per-action/).

If a translation meter runs and every foreign-language interaction crosses a token step, language adds up to $112 a month to $1,200 for actions. Indexing manuals in all 13 languages costs six and a half times the two-language index, and each version needs maintenance. The budget question is the number of maintained languages, not the price per character.

## List dealer languages by volume

1. **List dealer languages by volume** from the last three months of cases and emails.
2. **Check each language** on the help page: no label, beta or missing. Check voice separately.
3. **Set default and secondary languages** and decide how the portal sets the session language.
4. **Decide the knowledge split** and whether you need a custom retriever.
5. **Write the terminology list** with part names and fault codes.
6. **Test every allowed language** with real dealer questions.

In a country rollout, language becomes a column in the table from [rolling out Manufacturing Cloud globally](../manufacturing-cloud-global-rollout/). Language set and retriever design are part of my [Salesforce architecture](../../services/salesforce-architecture/) work.
