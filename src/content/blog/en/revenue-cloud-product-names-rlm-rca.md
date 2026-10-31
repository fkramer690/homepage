---
title: "Revenue Cloud, RLM, RCA: which product name applies?"
description: "Revenue Cloud, Revenue Lifecycle Management, Revenue Cloud Advanced, Agentforce Revenue Management: what each name means and which belongs in an order form."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-product-names-rlm-rca
translationKey: revenue-cloud-product-names
topic: revenue
categories: [revenue-cloud]
tags: [revenue cloud, revenue lifecycle management, cpq, licences, naming]
takeaways:
  - "The Winter '27 Developer Guide says Revenue Management, Trailhead says Agentforce Revenue Management, older guides Revenue Lifecycle Management."
  - "Revenue Cloud from 2020 was a suite around the CPQ and Billing packages. Today's Revenue Cloud is a different product on core platform objects."
  - "In an order form or tender, name the edition, the add-ons and the SKUs from the Salesforce quote, never just Revenue Cloud."
  - "When searching Help, Trailhead or partner blogs, search under all names, because each source uses a different one."
faq:
  - q: "Is Revenue Lifecycle Management the same as Revenue Cloud?"
    a: "Yes, for today's product. Salesforce states on its CPQ page that Revenue Lifecycle Management (RLM) was an earlier product name. The product is now sold as Revenue Cloud, with the editions Growth and Advanced."
  - q: "What does RCA mean in Salesforce?"
    a: "RCA stands for Revenue Cloud Advanced, the larger of the two Revenue Cloud editions. Salesforce calls it the successor to Salesforce CPQ."
  - q: "Is Agentforce Revenue Management a separate product?"
    a: "No. Salesforce used it as the name of the product suite that contains Revenue Cloud Advanced and Revenue Cloud Billing. Trailhead and the CPQ end-of-sale page still use it, while the product and pricing pages say Revenue Cloud."
  - q: "Is Salesforce CPQ part of Revenue Cloud?"
    a: "Not of today's Revenue Cloud. CPQ is a managed package with the SBQQ namespace and is no longer sold to new customers. In the Revenue Cloud bundle of 2020 it was one of the components."
draft: false
---

In October 2026 Salesforce sells its quote-to-cash product as Revenue Cloud, with the editions Revenue Cloud Growth and Revenue Cloud Advanced (RCA) and the add-on Revenue Cloud Billing. That is what the product and pricing pages on salesforce.com show. The documentation still mixes names: the Winter '27 Developer Guide is called Revenue Management, Trailhead says Agentforce Revenue Management, and older guides say Revenue Lifecycle Management (RLM). All of these mean the same product. In an order form I would therefore name the edition, the add-ons and the SKUs from the Salesforce quote, and when searching documentation I would search under every name.

## How did the names come about?

The history explains most of the confusion. In short:

| When | Name | What it means | Source |
|---|---|---|---|
| December 2015 | SteelBrick | Quote-to-cash startup with CPQ and billing, bought by Salesforce for $360 million | [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/) |
| After the acquisition | Salesforce CPQ, Salesforce Billing | Managed packages with the namespaces SBQQ and blng | [CPQ](https://developer.salesforce.com/docs/revenue/cpq-developer-guide/guide/cpq-api-get-started.html) and [Billing](https://developer.salesforce.com/docs/atlas.en-us.254.0.blng_dev.meta/blng_dev/apex_blng_apex_reference_overview.htm) developer docs |
| End of 2020 | Revenue Cloud (first) | Suite around CPQ, Billing and further components | [Salesforce blog, December 2020](https://www.salesforce.com/uk/blog/2020/12/rev-up-the-b2b-journey-with-revenue-cloud.html) |
| Spring '24 | Revenue Lifecycle Management | New product on core platform objects | [Developer Guide, API 60.0](https://developer.salesforce.com/docs/atlas.en-us.248.0.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/rlm_get_started.htm) |
| Later | Revenue Cloud Advanced, Agentforce Revenue Management | Edition name, and the name of the suite it belongs to | [CPQ end-of-sale page](https://www.salesforce.com/sales/cpq/end-of-life/) |
| Winter '27 | Revenue Management | Title of the Developer Guide | [Developer Guide, API 68.0](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) |
| October 2026 | Revenue Cloud | Heading of the product and pricing pages | [Product page](https://www.salesforce.com/uk/products/revenue-cycle-management) |

One remark on the table: the Spring '24 Developer Guide is the oldest version I found, titled Revenue Lifecycle Management Developer Guide. The two packages still carry their names and namespaces today, which is why "CPQ" in a conversation almost always means the SBQQ package.

## Why do Salesforce sources use different names?

Because they were updated at different times. As of late October 2026:

- **salesforce.com** shows "Revenue Cloud" as the heading of the [product page](https://www.salesforce.com/uk/products/revenue-cycle-management), last modified on 22 October 2026, and of the [pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/). The editions are Revenue Cloud Growth and Revenue Cloud Advanced.
- **The Developer Guide** for Winter '27 is titled Revenue Management Developer Guide and says: "Revenue Cloud is now Revenue Management. You may see references to Revenue Cloud in our application and documentation."
- **Trailhead** calls the basic module [Agentforce Revenue Management Foundations](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). The Winter '27 release highlights, on the other hand, list the features under "Revenue Cloud".
- **The CPQ end-of-sale page** describes Revenue Cloud Advanced as part of the Agentforce Revenue Management suite and says that Revenue Lifecycle Management was an earlier product name.

Search engines add to this. In late October 2026 several salesforce.com pages still appear in search results with the title "Agentforce Revenue Management (formerly Revenue Cloud)", while the pages themselves now say Revenue Cloud. Partner blogs report that the Agentforce name came with Dreamforce 2025 and that Salesforce quietly went back to Revenue Cloud around September 2026. I have not found a formal announcement from Salesforce for either step, so I treat this as reported, not as official.

The same pattern runs through the portfolio: the Agentforce name now appears on many Salesforce products, Trailhead for example also speaks of Agentforce Manufacturing. The [chapter on terms and the AI map](../../masterclass/ai-salesforce/terms-and-map/) in my AI masterclass sorts these names.

## Which Revenue Cloud does a partner mean?

This is the question that matters most in practice. "Revenue Cloud" has meant two different things:

- **Revenue Cloud from 2020** was a suite around the Salesforce CPQ and Billing packages. Data lives in package objects with the SBQQ and blng namespaces. Price rules, product rules and the quote calculator plugin belong to this world.
- **Revenue Cloud today** is the product formerly called Revenue Lifecycle Management. It runs on core platform objects, with product classifications and attributes, pricing procedures and a constraint-based configurator.

A partner who says "we have done 30 Revenue Cloud projects" may mean CPQ projects from 2020 to 2023. That experience is valuable for a CPQ migration, but it says little about the new data model. I ask three questions:

1. Which data model did the references use, CPQ objects with the SBQQ namespace or core objects?
2. How many projects since Spring '24 ran on Revenue Lifecycle Management or Revenue Cloud Advanced?
3. Who in the proposed team built pricing procedures and configurator rules in the new product?

```hinweis achtung
The reverse applies to existing CPQ customers: if a proposal says "Revenue Cloud", check whether it describes a new implementation on the new data model. There is no version upgrade from CPQ. Salesforce itself writes that Revenue Cloud Advanced is not simply CPQ with a new name, and names three to six months from discovery to go-live for a typical migration.
```

The status of the old packages is a topic of its own: CPQ is no longer sold to new customers, but existing customers can renew and get support. The [chapter on moving from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/) covers what that means.

## Name edition, add-ons and SKUs in the order form

Marketing names change faster than contracts run. A three-year order form signed today will outlive at least one more name. My rules:

- **Order form:** take the exact product names and SKUs from the Salesforce quote, including the edition (Growth or Advanced) and every add-on, such as Revenue Cloud Billing, Dynamic Revenue Orchestration, Invoice Management or Contract Lifecycle Management. "Revenue Cloud" on its own is not enough.
- **Tender:** describe the product by name and by data model, for example "Revenue Cloud Advanced (also Revenue Lifecycle Management or Revenue Management), native on the Salesforce platform, not the Salesforce CPQ managed package". That rules out a misunderstanding about the 2020 bundle.
- **Licence forecast:** list Revenue Cloud as its own line next to Sales Cloud, because it is bought on top of a Sales Cloud subscription. How I build such a forecast is described in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).
- **Project glossary:** pick one name for the project and stick to it. I would use Revenue Cloud, because that is what salesforce.com shows today.

## First step: search under all names

Each source has its own name, so searches miss half of the material when they use only one:

- **Developer Guide and Help:** search for "Revenue Management". The URLs of the Developer Guide still contain "revenue_lifecycle_management", which helps when filtering by address.
- **Trailhead:** search for "Agentforce Revenue Management" and "Revenue Cloud".
- **Partner blogs and forums:** add "RLM" and "RCA", the abbreviations used most there.
- **Watch out for other vendors:** Certinia, a vendor built on the Salesforce platform, runs its own product area called Revenue Management with its own [release notes](https://help.certinia.com/main/2026.1/Content/RevenueManagement/Release/WhatsNew/WhatsNew.htm). Results from help.certinia.com describe a different product.

What the product covers, under whatever name, is in [Revenue Cloud for manufacturers: when is it worth it?](../revenue-cloud-worth-it-manufacturers/), and what it costs is in [Revenue Cloud pricing: Growth, Advanced and add-ons](../revenue-cloud-editions-pricing/). The [overview chapter of the Revenue Cloud masterclass](../../masterclass/revenue-cloud/revenue-cloud-overview/) brings these topics together.
