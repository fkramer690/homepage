---
title: "Manufacturing Cloud Customer Portal: What to Show"
description: "What customers should see and do in a Manufacturing Cloud portal, which license covers it and who owns master data when customers maintain it themselves."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: manufacturing-cloud-customer-portal
translationKey: manufacturing-cloud-customer-portal
topic: service
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Experience Cloud, Customer Portal, Sales Agreements, Manufacturing]
series: { id: manufacturing-cloud, part: 7 }
takeaways:
  - "Salesforce Help names sales agreements only for the partner license. The exact license scope belongs in the quote, in writing."
  - "Margin and cost sit on the same object as the sales agreement. Customers therefore get a reduced view."
  - "When customers maintain the billing address themselves, Salesforce becomes the entry system for that field, with rules for the sync to the ERP."
faq:
  - q: "Which license do customers need for a Manufacturing Cloud portal?"
    a: "Salesforce offers Customer Community Plus for Manufacturing for customers and Partner Community for Manufacturing for dealers and suppliers. In my project, customers had Customer Community Plus for Manufacturing. Get written confirmation in the quote of what exactly a license covers."
  - q: "Can customers see their sales agreements in the portal?"
    a: "Yes. In my project, customers saw their sales agreements in a reduced list view, with less detail than internal staff. The data stayed on the standard sales agreement object, and a Lightning web component showed it in the portal. Internal fields such as margin and cost stay hidden."
  - q: "Can customers change their master data in the portal?"
    a: "For selected fields, yes, for example the billing address. The change is saved in Salesforce first and then synced to the ERP. A list maintained jointly by IT and the business should define which fields customers may change."
draft: false
---

A customer portal on Manufacturing Cloud pays off when customers can see their framework agreements, orders and open cases there and place orders or requests themselves. In a global Manufacturing Cloud rollout I worked on, customers saw their sales agreements, orders, master data and cases in the portal. They could request new products and prices and place orders. Three decisions determine whether such a portal works: which license customers get, how much of the sales agreement they see, and which system owns master data when customers change it themselves.

## What can customers do in the portal?

In the project, the portal had two kinds of features. Customers could see:

- **Their sales agreements**, meaning agreed quantities and terms.
- **Their orders.**
- **Their master data**, such as addresses.
- **Their cases**, meaning requests and complaints to service.

And customers could act:

- **Request new products and prices.** The request goes into the quoting process I describe in [part 2: from quote to sales agreement](../quote-to-sales-agreement-product-configurator/).
- **Place orders.** Simple order entry works in the portal. If customers should search a large catalog with their own prices, cart and checkout, that is usually a B2B store; when a portal is enough is covered in [chapter 1 of the B2B Commerce masterclass](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/).
- **Maintain certain master data themselves**, such as the billing address.

For the manufacturer the benefit is simple: questions like "How much of my framework agreement have I called off?" or "Where is my order?" are answered by the customer without an email to inside sales. For that to hold, the numbers in the portal have to be right. Where the actuals in a sales agreement come from is covered in [part 3: sales agreements, spotting customers behind on volume](../sales-agreements-volume-shortfall-erp/).

## Which license do customers need in the portal?

Salesforce offers two portal licenses for Manufacturing Cloud. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mfg_experience_cloud_licenses.htm&language=en_US&type=5):

| License | For whom | What Help names |
|---|---|---|
| Partner Community for Manufacturing | Partners, dealers, suppliers | Sales agreements, account forecasts, leads, opportunities, quotes, campaigns, warranty and rebate claims, visits |
| Customer Community Plus for Manufacturing | Customers | Cases, knowledge articles, orders, assets and warranties |

Help also says that Customer Community Plus for Manufacturing does not share leads, opportunities, campaigns or quotes with external users. It does not explicitly name sales agreements for this license. The [permission set license for sales agreements in Experience Cloud](https://help.salesforce.com/s/articleView?id=ind.mfg_experience_cloud_psl.htm&language=en_US&type=5) is documented for partner users.

In my project, customers had Customer Community Plus for Manufacturing and saw their sales agreements in a reduced list view. Technically, the data stayed on the standard sales agreement object, and a Lightning web component built for the portal showed it. That is a different route from the one Help describes for partners, who work with sales agreements directly on standard pages with their own permission set license. Help describes the standard access per license, not what a custom component can display. Which route fits your contract is something I would not decide alone.

```hinweis offen
If customers should see sales agreements in the portal, put that into the quote as a requirement, name the route (standard pages or a custom component), and get written confirmation from Salesforce that the chosen license covers it.
```

What portal licenses cost and how they differ from internal licenses is covered in [Salesforce licenses: does everyone need a full one?](../salesforce-licences-full-licence-needed/). How the portal fits into the dealer channel next to rebates and partner visits is in [chapter 3 of the Manufacturing Cloud masterclass](../../masterclass/manufacturing-cloud/dealer-and-partner-channel/).

## Customers see less of the sales agreement than sales does

Less than internal staff. In the project, customers saw their sales agreements in a slimmed-down list view, not at the level of detail sales works with.

There is a technical reason for that. According to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_salesagreement.htm), the sales agreement holds fields such as planned and actual margin percentage and planned and actual cost. Those values belong to the agreement, but a customer must not see them. The same goes for internal forecasts and the account manager's notes.

So before building, I write a list of which sales agreement fields go outside. Hiding a field in the component is not enough: sharing and field-level security for the portal users have to protect it too, and a custom component has to respect them, which I test with several customer accounts. A useful question is what the customer needs for their own planning:

- **What they committed to:** products, quantities, term, prices.
- **What they have taken so far:** actual quantities per period.
- **What is still open:** the difference.

Everything else stays internal. The list is also a good document for acceptance testing, because the business can check it without knowing Salesforce.

One side effect is worth a thought: when customers see for themselves that they are behind on their commitment, the conversation about the open volume sometimes starts on their side. Sales should know that before the portal goes live, so the customer's call does not catch them off guard.

## Who owns master data when customers maintain it themselves?

```praxis
In the project, customers could maintain certain information themselves, such as the billing address. That data was saved in Salesforce first and then synced to the ERP.
```

That sounds like a detail, but it shifts the roles of the systems. At manufacturers, the ERP usually leads for customer master data, because orders and invoices are created there. When a customer maintains a field in the portal, Salesforce becomes the entry system for that field. The ERP can still stay the system of record and accept the change only after its own checks. That leads to rules I settle before building:

1. **A list of fields customers may change.** Billing address yes, payment terms no. IT and the business maintain the list together.
2. **One direction per field.** A field the customer changes in the portal must not be changed in the ERP at the same time and written back, or the systems overwrite each other.
3. **Visible errors.** If the ERP rejects a change, for example because an address is incomplete, someone has to see it. Otherwise the portal shows an address that never reached the ERP, and the next invoice goes to the old one.
4. **Status for the customer.** Some changes need a check before they count, for example a new bill-to party or a different legal entity. The customer should see whether a change is pending, accepted or rejected.

How I decide the leading system for customers, products, prices and orders is described under [integration with ERP, middleware and telephony](../../services/salesforce-integration/).

## Portal orders close the loop through the ERP

An order in the portal is the last step for the customer and the first one for the manufacturer. It has to reach the ERP, be confirmed there and flow back into the sales agreement as an actual quantity. Planning the portal means planning the whole loop.

```ablauf
ext: Customer
sf: Portal order, Sales agreement, Portal view
erp: ERP order, Confirmation
Customer --> Portal order
Portal order --> ERP order
ERP order --> Confirmation
Confirmation ..Actual quantity..> Sales agreement
Sales agreement --> Portal view
```

Requests for new products or prices take a different route. They go to sales and run through configuration, quote and approval. What matters most to the customer is seeing the status of the request instead of having to chase it.

Cases are the most familiar part of the portal. Here Manufacturing Cloud helps with links to orders and assets, which Help lists for the customer license. How warranty claims run through dealers is covered in [part 6](../warranty-claims-dealers-salesforce/).

## Check the feature list against the license

Before the portal is built, settle these points:

1. **What do customers see and do?** A list of features: what customers only see (sales agreements, orders, cases) and what they do themselves (request, order, maintain master data).
2. **Which license covers it?** Confirmed in writing, especially for sales agreements.
3. **Which fields go outside?** For the sales agreement and the master data, without margin and cost.
4. **Which data flows back to the ERP?** One direction and one error handling per field.

I send the feature list from point 1 to Salesforce and have them confirm, line by line, which portal license covers it. Whatever stays open does not go into the first release.
