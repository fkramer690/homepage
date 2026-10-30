---
title: "Salesforce integration with ERP, middleware and telephony"
description: "Salesforce connected to SAP and other ERP systems, middleware and telephony such as Genesys or Microsoft Teams, with an integration architecture you own."
lang: en
slug: salesforce-integration
translationKey: service-integration
contactBrief: integration
order: 4
lead: "Salesforce is never the only system. Orders, prices, stock and invoices live in the ERP, and service runs on phone and email. I design the integration architecture on the client side and work with selected partners who have built integrations in large international programmes."
situations:
  - "Salesforce needs data from SAP or another ERP, such as customers, products, prices, orders or invoices, and it is unclear which system leads for which data."
  - "Point-to-point interfaces have grown over the years, and every change in one system breaks something in another."
  - "The contact centre uses a telephony platform that is not connected to Service Cloud, so agents copy data between screens."
  - "Integrations still log in with a username and password, and nobody has planned the move to modern authentication."
deliverables:
  - "Integration architecture: systems, data flows, leading system per object and integration patterns"
  - "Decision on middleware or direct integration, depending on size and number of systems"
  - "Interface specifications that implementation partners can build from"
  - "Concept for telephony integration with Service Cloud, for example Genesys, Mirage or Microsoft Teams"
  - "Security review of integration users, permissions and authentication"
  - "Selection and steering of specialised integration partners"
results:
  - "A clear leading system for every type of data"
  - "Interfaces that can be changed without breaking other systems"
  - "Agents who see customer data when the phone rings"
  - "Integration users with minimal permissions and modern authentication"
phases:
  - title: "System map"
    icon: "analyse"
    text: "I record which systems exist, which data they hold, which interfaces already run and where they cause problems."
  - title: "Integration architecture"
    icon: "integration"
    text: "We define the leading system for each object, the integration patterns and whether a middleware is needed. The approach depends on the size of the company and the number of systems."
  - title: "Specification and partners"
    icon: "contract"
    text: "I write the interface specifications and bring in a suitable integration partner if the client does not have one, then review the design before it is built."
  - title: "Delivery and testing"
    icon: "check"
    text: "During delivery I check that interfaces follow the architecture, that error handling and monitoring exist and that end-to-end tests cover the real processes."
faq:
  - q: "Which systems does Salesforce usually connect to at manufacturers?"
    a: "Almost always an ERP, very often SAP, sometimes other systems such as proALPHA. On top of that come telephony and email for service, product and pricing data, document generation and often a data platform. Salesforce is never the only system."
  - q: "Do we need a middleware for Salesforce integration?"
    a: "It depends on the size of the company and the number of systems. With a few stable interfaces, direct integration can be enough. With many systems, several teams and frequent changes, a middleware makes interfaces easier to change, monitor and reuse."
  - q: "How is telephony connected to Service Cloud?"
    a: "Through a CTI integration that brings calls into Service Cloud, so agents see the customer and the open cases when the phone rings. I have worked with the CTI providers Genesys and Mirage, and Microsoft Teams is becoming more relevant as a telephony platform. Phone and email remain the core channels in most service organisations."
blogTags: [integration, oauth, security, sicherheit, service cloud]
---

Salesforce integration means connecting Salesforce to the systems the company already runs, so that data is entered once and processes work across system boundaries. At manufacturers that is almost always an ERP, very often SAP, sometimes systems such as proALPHA. In service it also means telephony and email, because these are still the core channels. I design the integration architecture on the client side and decide with the client which partner builds it.

## Which system leads for which data?

Most integration problems start with an unclear answer to this question. If both Salesforce and the ERP can change a customer address or a price, the two systems will disagree sooner or later. So the first step is a system map with a leading system for each type of data:

- **Customers and contacts:** often Salesforce for prospects and contacts, the ERP for customers with orders and invoices.
- **Products and prices:** usually the ERP, with Salesforce reading what sales needs.
- **Orders and invoices:** created or confirmed in the ERP and visible in Salesforce.
- **Cases and service history:** Salesforce, with links to orders and installed products from the ERP.

```tabelle
title: System map: which system leads for which data
columns: | Salesforce | ERP
Customers and contacts | Prospects and contacts * | Customers with orders and invoices *
Products and prices | Reads what sales needs | Usually the leading system *
Orders and invoices | Visible to sales and service | Created or confirmed here *
Cases and service history | Cases and service history * | Orders and installed products to link to
mark: leads
note: Typical split. The details differ in every company, so the map belongs to the architecture.
```
The details differ in every company, which is why this map is part of the [Salesforce architecture](../salesforce-architecture/) and not a decision left to the individual interface.

## Do you need a middleware?

The approach depends on the size of the company and the number of systems. With a few stable interfaces, a direct integration can be the simplest solution. With many systems, several teams and frequent changes, a middleware such as MuleSoft or another integration platform pays off.

```pro-contra
pro: What a middleware gives you
- Interfaces become reusable.
- Errors are visible in one place.
- Interfaces are easier to change and monitor.
contra: When it does not pay off
- There are only a few systems.
- The interfaces are stable and rarely change.
```

For the build I work with selected partners who have integration experience from large international programmes. That gives the client a partner that fits the size of the task, while the architecture and the specifications stay on the client side.

## How does telephony fit into Service Cloud?

In most service organisations, phone and email are still the main channels. A CTI integration brings calls into Service Cloud, so agents see the customer, the installed products and the open cases when the phone rings.

```ablauf
ext: Call, Telephony platform
sf: Service Cloud, Customer, Installed products, Open cases
Call --> Telephony platform
Telephony platform --CTI integration--> Service Cloud
Service Cloud --> Customer
Service Cloud --> Installed products
Service Cloud --> Open cases
```

I have worked with the CTI providers Genesys and Mirage, and Microsoft Teams is becoming more relevant as a telephony platform, because many companies already use it internally.

## What about security?

Every integration has a technical user, and those users often have more permissions than they need. Authentication is changing as well: integrations that log in with username and password need to move to modern methods, as described in [Salesforce password integrations end in 2027](../../blog/salesforce-password-integrations-end-2027/). I review integration users, their permissions and their authentication as part of the architecture. The dates for how integrations log in:

```zeitleiste
2026-12-01 | SOAP login() requires the Use Any API Auth permission
2027-02-20 | OAuth username-password flow for connected apps ends
Summer '27 | SOAP login() in API versions 31.0 to 64.0 is retired
Summer '28 | SOAP, REST and Bulk API in versions 31.0 to 40.0 stop working
```
