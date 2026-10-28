---
title: "Digital Wallet: Agentforce cost control across plants"
description: "Several plants share one org's Flex Credit pool: who owns the budget, how Digital Wallet tags support chargeback and who pays for unused credits and overage."
pubDate: 2026-10-27
lang: en
slug: digital-wallet-agentforce-cost-control
translationKey: digital-wallet-chargeback
topic: governance
categories: [ai, architecture]
contactBrief: licences
tags: [agentforce, digital wallet, flex credits, chargeback, cost control, manufacturing]
takeaways:
  - "Flex Credits belong to the org and the contract: the edition pools are listed per org per year, and overage is billed to the contract holder monthly in arrears."
  - "Digital Wallet breaks consumption down by agent, action and channel and supports custom tags for categories such as department and cost center, which is the basis for chargeback."
  - "Digital Wallet sends threshold alerts but, in the documentation I opened, does not stop an agent when a plant's budget is used up, so budgets per plant are bookkeeping, not technical caps."
  - "If a subsidiary buys its own credits into the shared org, Digital Wallet merges them into one card and draws from the contract that expires first, so separate contracts do not separate budgets."
  - "Unused credits expire at the order end date; agree before go-live who carries that loss, otherwise it lands silently in the central IT budget."
faq:
  - q: "Can Digital Wallet charge Agentforce costs back to cost centers?"
    a: "It provides the data. Custom tags group consumption by categories such as department or cost center, and reports run on Data 360. The internal invoice itself is created in your controlling or ERP, based on the monthly statement."
  - q: "Can I give each plant its own Flex Credit limit?"
    a: "Not as a hard cap in the documentation I opened. Digital Wallet alerts at thresholds, org-wide or per card, but the pool stays one pool. Plant budgets are agreed internally and checked against tagged consumption."
  - q: "What do I need to use Digital Wallet?"
    a: "A Digital Wallet-enabled product, a Data 360 license (a Customer Data Platform license is not enough) and the View Consumption permission. Salesforce Help lists Enterprise and Unlimited Editions and says it is not available in sandboxes."
  - q: "Can Flex Credits be shared across several Salesforce orgs?"
    a: "The pricing pages list the edition pools per org, and none of the Salesforce pages I opened describes pooling across orgs. Ask your account executive and get the answer into the order form."
  - q: "Which number counts for the internal invoice, Digital Wallet or the Salesforce invoice?"
    a: "The monthly statement. Salesforce says consumption data in Digital Wallet is updated multiple times a day and that the monthly statement is the definitive source of truth for consumption details."
draft: false
---

Agentforce cost control across plants starts with one decision: who owns the Flex Credit pool. The pool belongs to the org and the contract, so one party in the group signs, pays the overage and loses unused credits at the order end date. Digital Wallet supplies the data for chargeback: consumption by agent, action and channel, plus custom tags for cost centers. It does not stop a plant that has used its share. I recommend a central budget owner, tags per company and cost center from the first day, and written rules for unused credits and overage before go-live.

## Who owns the Flex Credit pool when plants share one org?

The commercial unit is the org. The [EU pricing page for Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) lists the included pools as "500K Flex Credits/org/year" for Core, and the [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) gives the price of extra credits, half a cent per credit:

```kennzahlen
500,000 | Flex Credits per org per year in Core
1 million | Flex Credits per org per year in Advanced
2.75 million | Flex Credits per org per year in Max
$500 | per 100,000 extra credits
source: Salesforce EU pricing page for Sales Cloud and Agentforce pricing page
```

Every plant, subsidiary and service region working in that org draws from the same pool. How large the pools are and when Max pays off is covered in [the editions Core, Advanced and Max](../salesforce-editions-core-advanced-max/).

Three contract terms decide where the money goes:

- **Overage goes to the contract.** The pricing page says there is no overage penalty and the contracted rate is "billed monthly in arrears". The invoice reaches whoever signed, usually the parent company.
- **Unused credits expire.** The [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) says credits must be used before the order end date and "no rollover will be permitted".
- **One pricing model per org.** Flex Credits and the $2 per conversation model are not supported in the same org. A US subsidiary cannot pick conversation pricing while the German plants use credits.

So the question for a manufacturing group is organisational. I would make one person in group IT or the Salesforce CoE the budget owner: they sign, they watch the pool, they run the chargeback. Plants and subsidiaries get budgets, not credits.

## What does Digital Wallet show for chargeback?

[Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) is Salesforce's consumption console. It is free with a Digital Wallet-enabled product and tracks Flex Credits, Data Services Credits, AI Requests and licences, among others. For chargeback four functions matter:

- **Breakdowns** down to agent, action and channel.
- **Custom tags.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.wallet_about.htm&type=5), they track consumption by categories "such as department and cost center". Viewing, managing and assigning tags are separate permissions.
- **Reports on Data 360.** Usage lands in data lake objects such as TenantEnrichedUsageEvent; you can build your own reports on the consumption tags.
- **Threshold alerts.** The [Trailhead module on cost management](https://trailhead.salesforce.com/content/learn/modules/agentforce-model-switching-and-monetization/manage-costs-and-optimize-consumption) describes a flow template with org-wide or card-specific rules, sent to admin emails, system notifications or Slack.

The limits matter as much as the functions. Salesforce Help says you need a Data 360 license, "not a Customer Data Platform (CDP) license", and lists Digital Wallet as not available in sandboxes. Sandbox consumption still costs credits; the Flex Credits card in production has a filter for the environment type. The [Trailhead quick look](https://trailhead.salesforce.com/content/learn/modules/salesforce-digital-wallet-quick-look/get-to-know-salesforce-digital-wallet) says data is updated multiple times a day and that "your monthly statement is the definitive source of truth". The internal invoice therefore follows the monthly statement, not a dashboard screenshot.

```hinweis achtung
What I did not find: an automatic stop. The pages I opened describe alerts only. [Salesforce Ben noted in May 2025](https://www.salesforceben.com/understanding-common-agentforce-pain-points-and-how-salesforce-addresses-them/) that there was no kill switch to freeze agents at a threshold, and I found nothing newer that says otherwise. A plant budget is therefore a number in controlling. If you need a hard stop, you deactivate the agent yourself.
```

## A typical scenario: three regions in one org

Assume a machine builder with two plants in Germany, a US sales and service subsidiary and a service region in Asia Pacific (APAC), all in one org on Advanced Edition. A dealer service agent answers order status and spare parts questions for all regions, and a scheduling agent supports field service in Germany and the US. All numbers are assumptions.

| Item per year | Credits | At $5 per 1,000 credits |
|---|---|---|
| Included in Advanced Edition | 1,000,000 | paid with the seats |
| Pre-purchased | 3,000,000 | $15,000 |
| Germany: service and sales | 1,800,000 | $9,000 |
| US subsidiary | 1,400,000 | $7,000 |
| Asia Pacific service region | 600,000 | $3,000 |
| Group IT: sandbox tests | 300,000 | $1,500 |
| **Planned consumption** | **4,100,000** | **$20,500** |

The plan exceeds the pool by 100,000 credits, so $500 overage arrives in arrears. Salesforce receives $15,500. The regions are charged $20,500, because I would charge at the list rate of $5 per 1,000 credits. The $5,000 difference is the list value of the included pool and goes back to the central licence budget that pays for the Advanced seats. The alternative, passing on only the cash cost, gives about $3.78 per 1,000 credits, and that rate changes every time the pool or the edition changes. Plants plan better with a fixed rate.

Now assume the Asia Pacific go-live slips by four months and the region uses 200,000 credits instead of 600,000. Total consumption drops to 3,700,000, and 300,000 credits, $1,500, expire at the order end date. Without a rule, that loss sits in the central budget and nobody notices. With a rule, the region whose plan set the purchase volume carries it.

## How should you split Agentforce costs across plants and subsidiaries?

There are four models, and they fit different phases:

1. **Central overhead.** Group IT pays everything. Right for the pilot, when volumes are small and every plant should try the agent.
2. **Showback.** Tagged consumption is reported per company every month, without an invoice. I would run this for the first six months, so plants see their numbers before they pay for them.
3. **Chargeback at a fixed rate.** Consumption per tag times the agreed rate, invoiced monthly from the statement. Your controlling decides whether that is an intercompany invoice or an internal cost allocation; that is a question for your tax advisers, not for me.
4. **Reserved volumes.** Each region commits a yearly volume and pays it even if it uses less. This fits groups where subsidiaries run their own P&L and the purchase volume follows their plans.

The hard part is tagging a shared agent. One dealer service agent for all regions saves building and testing it three times, but its consumption must still be split. Salesforce documents the tag configuration in Help; before go-live I would test in production, with a small pilot volume, whether each event of the shared agent gets the right company tag, because Digital Wallet does not run in sandboxes. If the tagging cannot separate regions, you have two choices: one agent per region with its own maintenance, or a split key such as conversations per region from Service Cloud. I prefer the split key while volumes are small. More on the numbers to track per agent in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/).

## What happens with unused credits and overage?

Unused credits are lost at the order end date, and overage is billed at the contracted rate. Both follow the contract, not the plant, which leads to three rules I would write down:

- **Buy along the go-live plan.** Pre-purchase for regions that are live, Pre-Commit or PayGo for regions that are still planning. The EU pricing page names all three models. A slipped go-live then costs less.
- **Do not split contracts inside one org.** If the US subsidiary buys its own credits for the same org, the [Trailhead quick look](https://trailhead.salesforce.com/content/learn/modules/salesforce-digital-wallet-quick-look/get-to-know-salesforce-digital-wallet) explains that Digital Wallet combines the entitlements into one card and "always draws from the contract that will expire first". If the US contract ends in March and the group contract in December, everyone consumes the US credits first.
- **Separate orgs need separate answers.** A subsidiary in its own org gets its own edition pool, because the pools are listed per org. None of the Salesforce pages I opened describes pooling credits across orgs. Ask your account executive and have the answer written into the order form.

One meter has no price yet: the rate card lists Headless Platform Interactions with the rate "TBA". What they cover and why they matter for budgets is in [MCP calls as a budget risk](../mcp-api-calls-salesforce-budget-risk/). Give that meter its own tag and its own owner from the start.

## Where should you start?

1. Name one budget owner for the pool and write it into the programme charter.
2. Agree the tag design: company, cost center, environment.
3. Check the Data 360 license and the View Consumption and tag permissions for the controllers who need them.
4. Set up the threshold alert flow at 50, 80 and 95 percent and send it to the budget owner, not only to admins.
5. Run showback for six months against the monthly statement.
6. Write the rules for unused credits, overage and reserved volumes before the first regional go-live.

How to estimate the consumption itself is in [Flex Credits cost per action](../flex-credits-agentforce-cost-per-action/), and licence planning across several companies is part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/).

Digital Wallet gives you the numbers per agent and cost center, but the ownership and the rules for leftovers have to come from you. If you want to set up Agentforce cost control for several plants or subsidiaries, [send me a message](#contact).
