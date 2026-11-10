---
title: "Salesforce Licenses: Does Everyone Need a Full One?"
metaTitle: "Salesforce License Cost: Does Everyone Need a Full One?"
description: "Not every user needs a full Salesforce license. Which license types exist, what they cost, and how a license forecast can save six figures a year."
pubDate: 2026-10-26
updatedDate: 2026-11-09
lang: en
slug: salesforce-licences-full-licence-needed
translationKey: salesforce-licence-types
topic: governance
categories: [architecture]
contactBrief: licences
tags: [licenses, make-or-buy, business case, platform, experience cloud]
takeaways:
  - "Users who only read, approve or work in one narrow custom process can often use a Platform license."
  - "Sales Cloud Core costs $195 per user per month and Platform Starter costs $25, so for 100 users the difference is $204,000 a year."
  - "Platform licenses exclude opportunities, leads and forecasts, allow only a limited number of custom objects, and do not cover customer service work on cases."
  - "Dealers and customers do not need internal licenses. Self-service portal licenses start at $4 per login or $10 per member."
  - "A license forecast groups users by what they actually do in the system, and it should be prepared before the negotiation, not after it."
faq:
  - q: "What does a Salesforce license cost?"
    a: "At list price (October 2026, billed annually), Sales Cloud Core costs $195 per user per month, Platform Plus $100, Platform Starter $25 and Field Service Technician $175. Portal licenses for customers start at $4 per login or $10 per member. Your license cost depends mostly on how many users really need a full license."
  - q: "What types of Salesforce licenses are there?"
    a: "For internal users there are full licenses such as Sales Cloud and Service Cloud, cheaper Platform licenses for custom apps, and special licenses such as Field Service Technician. External users get portal licenses, and interfaces get integration licenses without a user interface."
  - q: "What can't a Salesforce Platform Starter user do?"
    a: "Platform users work with accounts, contacts, reports and custom objects, and can see cases, assets and work orders, but not leads, opportunities, quotes or forecasts, and they may not work as customer service agents. Platform Starter allows 10 custom objects, Platform Plus 110."
  - q: "Do integrations need a full Salesforce license?"
    a: "Usually not. Enterprise, Unlimited and Performance Edition currently come with five free Salesforce Integration licenses that only allow API access. You can buy more."
  - q: "When is the best time to negotiate Salesforce licenses?"
    a: "Salesforce's fiscal year ends on 31 January. That can affect commercial timing, but terms are account-specific. Add roadmap products early only if ramp dates and expected usage make the total contract value better."
  - q: "Where do I buy Salesforce licenses?"
    a: "Usually directly from Salesforce through the account executive responsible for your company; smaller editions can also be bought online. Salesforce provides the price and the contract. Which licenses each role needs should be worked out on the customer's side, with input from the implementation partner."
draft: false
---

No, not every Salesforce user needs a full license. Full licenses such as Sales Cloud or Service Cloud are often offered to everyone by default, including users who only read data, approve records or work in one narrow process. There are cheaper Salesforce licenses for these groups, and across a large user base the difference easily reaches six figures per year. The only question is whether someone checks what users actually do in the system before the contract is signed.

## What Salesforce licenses are there?

Salesforce sells most licenses per user. A user's license sets the upper limit of objects and features; permission set licenses, permissions and contract terms determine the rest. For manufacturing companies, the following types matter, with list prices per user per month, billed annually (October 2026):

| License | For whom | List price |
|---|---|---|
| Sales Cloud Core | Sales with leads, opportunities, forecasts | $195 |
| Platform Plus | Internal users of custom apps, up to 110 custom objects | $100 |
| Platform Starter | Internal users of custom apps, up to 10 custom objects | $25 |
| Field Service Technician | Field technicians | $175 |
| Service Portal Member | Customers in a self-service portal (requires a Service Cloud edition) | $10 per member |
| Service Portal Login | Customers who rarely log in (requires a Service Cloud edition) | $4 per login |
| Partner Relationship Management | Dealers and partners in a portal | $25 per member |

The prices come from the Salesforce pages for [Sales Cloud](https://www.salesforce.com/products/sales-cloud-pricing/), [Platform](https://www.salesforce.com/eu/editions-pricing/app-cloud/), [Field Service](https://www.salesforce.com/service/field-service-management/pricing/), [self-service portals](https://www.salesforce.com/products/customer-self-service-pricing/) and [partner portals](https://www.salesforce.com/products/experience-cloud/pricing/partner-relationship-management/). List prices are a starting point, not the total cost of a solution: Field Service, for example, also needs at least one Service Cloud and one Dispatcher license. Since 5 November 2026 the US Field Service page also lists Field Service+ editions, see [Field Service licenses by role](../field-service-licences-by-role/).

Then there are interfaces. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.integration_user.htm&type=5), orgs on Enterprise, Unlimited and Performance Edition currently get five free Salesforce Integration licenses. They allow API access only and do not include a user interface. A typical SAP interface should therefore be checked for an Integration license before anyone assigns a full license, because a technical user with a full license usually has more rights than the integration needs. Check required objects, APIs and package entitlements first.

## Where do companies pay too much?

I have worked in pre-sales with Salesforce and have seen quotes from both sides. One pattern I saw often: the quote counts the employees who are supposed to use Salesforce and gives all of them the same full license. Three groups fall through the cracks:

- **Readers.** Management, controlling or product management look at reports and dashboards but never edit an opportunity.
- **Approvers.** Someone who only approves discounts, quotes or orders spends a few minutes a week in the system.
- **Users of one narrow process.** A team that only uses a custom app, for example for complaints or internal requests, needs neither sales nor service features.

What they have in common: they do not use the main activities, or they only take on related work at the edges.

```praxis
In a field service project for one client, we created travel requests as a custom object based on service appointments and made them available to the technicians. The colleagues who handled the travel requests did not need a Field Service license for this work. They worked at a fraction of the cost of a full license.
```

An example with list prices: Take 100 users who read accounts and contacts and approve records in a custom app that uses no excluded CRM objects. The difference is $170 per user per month, and more than $600,000 over a three-year contract.

```kennzahlen
$195 | Sales Cloud Core per user and month
$25 | Platform Starter per user and month
$204,000 | Difference per year for 100 users who only read and approve
source: Salesforce pricing pages for Sales Cloud and Platform, list prices October 2026
```

With external users the mistake costs even more. Dealers or customers who use internal licenses because a portal was supposed to come "later" cost many times more than a portal license. Buyers who order in a B2B store need their own license type, covered in [B2B Commerce buyer licenses: who needs which one?](../b2b-commerce-buyer-licences/).

## No opportunities, few custom objects: the limits of a Platform license

Platform licenses have hard limits, and the order form makes them binding:

- **No leads, opportunities, quotes or forecasts.** Platform users work with accounts, contacts, reports and custom objects. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.users_license_types_communities_lightning_platform_details.htm&type=5) they can also access cases, assets and work orders, but they may not work as customer service agents.
- **Few custom objects.** Platform Starter allows 10, Platform Plus 110.
- **No rebuilding.** A custom data model does not override the restrictions in your order form and product terms. According to [Salesforce Ben](https://www.salesforceben.com/salesforce-platform-licenses/), customers must pay for standard features if they copy them with custom development. A custom "opportunity light" for Platform users is therefore not a way to save money.

Special licenses have similar limits. According to the pricing page, Field Service Dispatcher and Technician licenses may not be used for a contact center or case management. A technician who also handles customer requests therefore needs Field Service Plus.

That is why the license question belongs in the architecture discussion. Whether an approval process can run on Platform licenses depends on which objects it touches. If you build the process around opportunities, you have already made the license decision.

## How I build a license forecast

A license forecast answers which license types a company needs and how many, today and in the coming years. This is how I approach it:

```schritte
Group users by activity
  Not by department. An inside sales team that enters orders is a different group from a key account manager.
Record the objects per group
  Which objects does each group read and edit? That gives you the smallest license that fits.
Estimate growth
  Such as new countries, new business units or a portal planned in two years.
Put it next to the quote
  Where the quote differs, there is either a reason or a negotiation point.
```

In existing orgs the login history and recently edited records help. A user with a full license who logs in once a month is a reason to take a closer look, but not proof of anything: what matters is what they do during that login.

For infrequent users, there is also a usage-based option: Salesforce sells [Platform logins](https://www.salesforce.com/platform/enterprise-app-development/pricing/) with roughly the same rights as Platform Starter. For approvers who log in a few times a year, compare this option with named licenses.

Timing matters too. Salesforce's [fiscal year](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Fourth-Quarter-Fiscal-2026-Results/default.aspx) ends on 31 January. That can affect commercial timing, but discounts and bundle terms are account-specific. I would add roadmap products early only if ramp dates, reduction rights and expected usage improve the total contract value; otherwise they become shelfware. What the Main Services Agreement says about notice, reductions and re-pricing is covered in [Salesforce renewal negotiation](../salesforce-renewal-negotiation/).

## When is the full license still right?

Saving at all costs is wrong too. A full license is right when a user works on leads, opportunities or forecasts, or handles cases as a service agent, even occasionally. It is also right when a group will clearly need more within a year. Changing licenses in the middle of a contract costs negotiation time, and a process built around a license that is too small costs maintenance.

The same trade-off applies to industry clouds. Whether Manufacturing Cloud pays off compared to Sales Cloud, for example, is a separate make-or-buy question, which I describe under [make-or-buy and license forecasts](../../services/make-or-buy-licences/). AI features can add user-based or consumption-based charges, and in that case the business value comes first, as described in [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

## Check who worked on opportunities or cases in the last year

If a renewal or a new quote is coming up, start with three questions: how many users with a full license worked on opportunities or cases in the last twelve months? Which external users work on internal licenses today? Which interfaces use a user account with a full license?

The answers show how much room there is in the quote. For a first indication, a report on opportunities and cases grouped by "Last Modified By" helps when compared with the login history. It only shows the last editor, so readers, approvers and seasonal users require interviews with the process owners before any license is changed.
