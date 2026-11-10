---
title: "Revenue Cloud, RLM, RCA: which product name applies?"
metaTitle: "Salesforce Revenue Cloud, RLM, RCA: which name applies?"
description: "Revenue Management, Revenue Cloud, RLM, RCA or CPQ? What each Salesforce name means today and which one belongs in an order form, tender or SOW."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-product-names-rlm-rca
translationKey: revenue-cloud-product-names
topic: revenue
categories: [revenue-cloud]
tags: [revenue cloud, revenue lifecycle management, cpq, licenses, naming]
takeaways:
  - "Salesforce Help and the developer docs call the native product Revenue Management, while salesforce.com and the licenses still say Revenue Cloud."
  - "The 2020 Revenue Cloud was a suite built around the CPQ and Billing packages. Today's Revenue Cloud is a different product on core platform objects."
  - "Salesforce CPQ is the separate SBQQ managed package. There is no upgrade path from CPQ to Revenue Management, only a new implementation."
  - "In an order form or tender, name the data model, the license edition and the exact line items from the Salesforce quote, never just Revenue Cloud."
faq:
  - q: "Is Revenue Lifecycle Management the same as Revenue Cloud?"
    a: "For today's native product, yes. Salesforce Help says Revenue Management was originally called Revenue Lifecycle Management and is also called Revenue Cloud. But Help also lists Revenue Cloud as an old name of Salesforce CPQ, so check which product a document refers to."
  - q: "What does RCA mean in Salesforce?"
    a: "RCA stands for Revenue Cloud Advanced, the more comprehensive of the Revenue Cloud licenses alongside Growth and Billing. Salesforce positions it as the successor to Salesforce CPQ. Help also uses RCA as another name for the product as a whole."
  - q: "Is Agentforce Revenue Management a separate product?"
    a: "No. Salesforce used it as the name of the product suite that contains Revenue Cloud Advanced and Revenue Cloud Billing. Trailhead and the CPQ end-of-sale page still use it, while the product and pricing pages say Revenue Cloud."
  - q: "Is Salesforce CPQ part of Revenue Cloud?"
    a: "It is not part of today's Revenue Cloud. CPQ is a managed package with the SBQQ namespace and is no longer sold to new customers. In the 2020 Revenue Cloud bundle, it was one of the components."
draft: false
---

Salesforce uses two names for its native quote-to-cash product at the same time. Salesforce Help and the developer docs call it Revenue Management (formerly Revenue Cloud). The product pages, pricing pages and licenses still use Revenue Cloud: Revenue Cloud Growth, Revenue Cloud Advanced (RCA) and Revenue Cloud Billing. Revenue Lifecycle Management (RLM) was its original name in Spring '24, and Trailhead uses Agentforce Revenue Management. Salesforce CPQ is a different product, the older SBQQ managed package. In an order form I would therefore name the data model, the edition and the exact line items from the Salesforce quote.

## How did the names come about?

The history explains most of the confusion. In short:

| When | Name | What it means | Source |
|---|---|---|---|
| December 2015 | SteelBrick | Quote-to-cash startup with CPQ and billing; Salesforce announced the acquisition in December 2015 and closed it in February 2016 | [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/) |
| After the acquisition | Salesforce CPQ, Salesforce Billing | Managed packages with the namespaces SBQQ and blng | [CPQ](https://developer.salesforce.com/docs/revenue/cpq-developer-guide/guide/cpq-api-get-started.html) and [Billing](https://developer.salesforce.com/docs/atlas.en-us.254.0.blng_dev.meta/blng_dev/apex_blng_apex_reference_overview.htm) developer docs |
| End of 2020 | Revenue Cloud (first) | Suite around CPQ, Billing and further components | [Salesforce blog, December 2020](https://www.salesforce.com/uk/blog/2020/12/rev-up-the-b2b-journey-with-revenue-cloud.html) |
| Spring '24 | Revenue Lifecycle Management | New product on core platform objects | [Developer Guide, API 60.0](https://developer.salesforce.com/docs/atlas.en-us.248.0.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/rlm_get_started.htm) |
| Later | Revenue Cloud Advanced, Agentforce Revenue Management | Edition name, and the name of the suite it belongs to | [CPQ end-of-sale page](https://www.salesforce.com/sales/cpq/end-of-life/) |
| Winter '27 | Revenue Management | Title of the Developer Guide | [Developer Guide, API 68.0](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) |
| October 2026 | Revenue Cloud | Heading of the product and pricing pages | [Product page](https://www.salesforce.com/uk/products/revenue-cycle-management) |

A note on the table: the Spring '24 Developer Guide is the oldest version I found, and it is titled Revenue Lifecycle Management Developer Guide. The two packages still carry their names and namespaces today, which is why "CPQ" in a conversation almost always means the SBQQ package.

## Revenue Cloud Advanced vs Revenue Cloud vs CPQ at a glance

Revenue Cloud Advanced is the larger edition of today's Revenue Cloud, next to Revenue Cloud Growth, so the two names describe one product. The real comparison is with Salesforce CPQ, the older managed package that Salesforce names Revenue Cloud Advanced as the successor to.

| | Salesforce CPQ | Revenue Cloud Growth | Revenue Cloud Advanced |
|---|---|---|---|
| What it is | Managed package from SteelBrick | Smaller edition of today's Revenue Cloud | Larger edition of today's Revenue Cloud |
| Data model | Package objects with the SBQQ namespace | Core platform objects | Core platform objects |
| Scope | Configure, price, quote; billing is the separate blng package | Quoting and configurator, order capture, subscriptions | Everything in Growth plus contracts and orders, consumption and invoicing, AI and analytics |
| New customers | No longer sold | €150 per user and month | €200 per user and month |

Prices are list prices from the pricing page in October 2026, on top of Sales Cloud. Moving from CPQ to either edition means a new implementation, because there is no upgrade path. The differences in data model, configurator, pricing and renewals are covered in [Salesforce CPQ vs Revenue Cloud: the real differences](../salesforce-cpq-vs-revenue-cloud-differences/). Prices and add-ons are covered in [Revenue Cloud pricing](../revenue-cloud-editions-pricing/).

## Why do Salesforce sources use different names?

Because they were updated at different times. As of late October 2026:

- **salesforce.com** shows "Revenue Cloud" as the heading on the [product page](https://www.salesforce.com/uk/products/revenue-cycle-management), last modified on 22 October 2026, and on the [pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/). The editions are Revenue Cloud Growth and Revenue Cloud Advanced.
- **The Developer Guide** for Winter '27 is titled Revenue Management Developer Guide and says: "Revenue Cloud is now Revenue Management. You may see references to Revenue Cloud in our application and documentation."
- **Salesforce Help** has a [page on which product you have](https://help.salesforce.com/s/articleView?id=ind.rev_which_product.htm&language=en_US&type=5). It names Revenue Management as the current product, lists Revenue Cloud, Revenue Cloud Advanced and Revenue Lifecycle Management as other names, and lists Revenue Cloud and SteelBrick as other names of Salesforce CPQ.
- **Trailhead** calls the basic module [Agentforce Revenue Management Foundations](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). The Winter '27 release highlights, on the other hand, list the features under "Revenue Cloud".
- **The CPQ end-of-sale page** describes Revenue Cloud Advanced as part of the Agentforce Revenue Management suite and says that Revenue Lifecycle Management was an earlier product name.

Search engines add to the confusion. In late October 2026 several salesforce.com pages still appear in search results with the title "Agentforce Revenue Management (formerly Revenue Cloud)", while the pages themselves now say Revenue Cloud. Salesforce has not published one naming timeline that reconciles marketing, documentation and Trailhead.

The same pattern runs through the portfolio: the Agentforce name now appears on many Salesforce products, and Trailhead, for example, also uses Agentforce Manufacturing. The [chapter on terms and the AI map](../../masterclass/ai-salesforce/terms-and-map/) in my AI masterclass organizes these names.

## Which Revenue Cloud does a partner mean?

This is the question that matters most in practice. "Revenue Cloud" has meant two different things:

- **Revenue Cloud from 2020** was a suite around the Salesforce CPQ and Billing packages. Data lives in package objects with the SBQQ and blng namespaces. Price rules, product rules and the quote calculator plugin belong to that architecture.
- **Revenue Cloud today** is the product formerly called Revenue Lifecycle Management. It runs on core platform objects, with product classifications and attributes, pricing procedures and a constraint-based configurator.

A partner who says "we have done 30 Revenue Cloud projects" may mean CPQ projects from 2020 to 2023. That experience is valuable for a CPQ migration, but it says little about the new data model. I ask three questions:

1. Which data model did the references use, CPQ objects with the SBQQ namespace or core objects?
2. How many projects since Spring '24 have run on Revenue Lifecycle Management or Revenue Cloud Advanced?
3. Who in the proposed team has built pricing procedures and configurator rules in the new product?

```hinweis achtung
The reverse applies to existing CPQ customers: if a proposal says "Revenue Cloud", check whether it describes a new implementation on the new data model. There is no version upgrade from CPQ. Salesforce itself writes that Revenue Cloud Advanced is not simply CPQ with a new name, and gives three to six months from discovery to go-live for a typical migration, depending heavily on complexity.
```

The status of the old packages is a topic of its own: CPQ is no longer sold to new customers, but existing customers can renew and get support. The [chapter on moving from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/) covers what that means.

## Name the edition, add-ons and line items in the order form

Marketing names change faster than contracts expire. A three-year order form signed today will outlive at least one more name. My rules:

- **Order form:** take the exact line-item names and product codes from the Salesforce quote, including the edition (Growth or Advanced) and every add-on, such as Revenue Cloud Billing, Dynamic Revenue Orchestration, Invoice Management or Contract Lifecycle Management. "Revenue Cloud" on its own is not enough.
- **Tender:** describe the product by name and by data model, for example "Revenue Cloud Advanced (also Revenue Lifecycle Management or Revenue Management), native on the Salesforce platform, not the Salesforce CPQ managed package". That rules out a misunderstanding about the 2020 bundle.
- **License forecast:** list Revenue Cloud as its own line next to Sales Cloud, because it is purchased in addition to a Sales Cloud subscription. How I build such a forecast is described in [Salesforce licenses: does everyone need a full one?](../salesforce-licences-full-licence-needed/).
- **Project glossary:** pick one name for the project and stick to it. I would use Revenue Cloud, because that is what the licenses and salesforce.com show today.

An example of the difference: "Implementation of Salesforce Revenue Cloud" is too vague. Better: "Implementation on the native Salesforce Revenue Management platform with the Revenue Cloud Advanced and Revenue Cloud Billing line items from the Salesforce quote [number, date]. Salesforce CPQ managed package functionality is out of scope unless explicitly listed."

## Search under all names

Each source has its own name, so you miss half of the material if you search for only one:

- **Developer Guide and Help:** search for "Revenue Management". The URLs of the Developer Guide still contain "revenue_lifecycle_management", which helps when filtering by address.
- **Trailhead:** search for "Agentforce Revenue Management" and "Revenue Cloud".
- **Partner blogs and forums:** add "RLM" and "RCA", the abbreviations used most there.
- **Watch out for other vendors:** Certinia, a vendor built on the Salesforce platform, runs its own product area called Revenue Management with its own [release notes](https://help.certinia.com/main/2026.1/Content/RevenueManagement/Release/WhatsNew/WhatsNew.htm). Results from help.certinia.com describe a different product.

What the product covers, under whatever name, is covered in [Revenue Cloud for manufacturers: when is it worth it?](../revenue-cloud-worth-it-manufacturers/), and what it costs is covered in [Revenue Cloud pricing: Growth, Advanced and add-ons](../revenue-cloud-editions-pricing/). The [overview chapter of the Revenue Cloud masterclass](../../masterclass/revenue-cloud/revenue-cloud-overview/) brings these topics together.
