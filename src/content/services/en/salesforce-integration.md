---
title: "SAP to Salesforce integration, ERP interfaces and telephony"
description: "SAP to Salesforce integration, links to other ERP systems, middleware and telephony such as Genesys or Teams Phone, with an integration architecture you own."
lang: en
slug: salesforce-integration
translationKey: service-integration
contactBrief: integration
order: 5
lead: "Salesforce is never the only system. Orders, prices, stock and invoices live in the ERP, at manufacturers usually in SAP, and service runs on phone and email. I design the integration architecture on the client side and work with selected partners who have built integrations in large international programs."
situations:
  - "Salesforce needs data from SAP or another ERP, such as customers, products, prices, orders or invoices, and it is unclear which system leads for which data."
  - "Point-to-point interfaces have grown over the years, and every change in one system causes errors in another."
  - "The contact center uses a telephony platform that is not connected to Service Cloud, so agents copy data between screens."
  - "Integrations still log in with a username and password, and nobody has planned the move to modern authentication."
deliverables:
  - "I map which systems exist, which data they hold and where existing interfaces cause problems."
  - "Together with you I decide whether a middleware is needed or a direct integration is enough."
  - "I bring in a specialized integration partner if you do not have one, and review its design before anything is built."
  - "During implementation I check error handling, monitoring and end-to-end tests against the real processes."
results:
  - "A system map with the leading system for each type of data"
  - "Interface specifications that implementation partners can build from"
  - "A concept for telephony integration with Service Cloud, for example with Genesys, Mirage or Microsoft Teams"
  - "Integration users with minimal permissions and modern authentication"
phases:
  - title: "System map"
    icon: "analyse"
    text: "I record which systems exist, which data they hold, which interfaces already run and where they cause problems."
  - title: "Integration architecture"
    icon: "integration"
    text: "We define the leading system for each object and the integration patterns, and we decide whether a middleware is needed. The approach depends on the size of the company and the number of systems."
  - title: "Specification and partners"
    icon: "contract"
    text: "I write the interface specifications and bring in a suitable integration partner if the client does not have one, then review the design before it is built."
  - title: "Delivery and testing"
    icon: "check"
    text: "During delivery I check that interfaces follow the architecture, that error handling and monitoring exist and that end-to-end tests cover the real processes."
duration: "System map and integration architecture 4 to 8 weeks, specification 1 to 3 weeks per interface. Build and test with the partner 3 to 9 months, depending on the number of interfaces."
notFit:
  - "The project needs only a single standard connection with a ready-made connector."
  - "You are only looking for someone to code the interface."
alternatives: "An integration partner alone is enough when the system map is already clear. An internal integration architect from the ERP team fits when they know Salesforce constraints such as API limits."
progress:
  - measure: "Stuck messages"
    how: "How many messages between Salesforce and the ERP do not arrive and who notices."
  - measure: "Time to fix"
    how: "How long an error in an integration stays open."
  - measure: "Data maintained twice"
    how: "Which data is still maintained by hand in two systems."
  - measure: "Permissions of integration users"
    how: "How many integration users have more permissions than their integration needs."
reference: cti
faq:
  - q: "Which systems does Salesforce usually connect to at manufacturers?"
    a: "Almost always an ERP, very often SAP, sometimes other systems such as proALPHA. In addition, there are telephony and email for service, product and pricing data, document generation and often a data platform. Salesforce is never the only system."
  - q: "Do we need a middleware for Salesforce integration?"
    a: "It depends on the size of the company and the number of systems. With a few stable interfaces, direct integration can be enough. With many systems, several teams and frequent changes, a middleware makes interfaces easier to change, monitor and reuse."
  - q: "How is telephony connected to Service Cloud?"
    a: "Through a CTI integration that connects incoming calls to Service Cloud, so agents see the customer and the open cases when the phone rings. I have worked with the CTI providers Genesys and Mirage, and Microsoft Teams is becoming more relevant as a telephony platform. Phone and email remain the core channels in most service organizations."
  - q: "Do you replace our implementation partner?"
    a: "No. Your partners keep building, and I steer them on the client side according to shared rules. If you want to replace a partner, I help you do it without losing knowledge and without delaying the program."
  - q: "How do you avoid becoming a bottleneck?"
    a: "I keep my work transparent. Decisions, standards and review criteria are documented where your team and your partners can see them, so nobody has to wait for me and the work does not depend on me."
  - q: "Do you work on site or remotely?"
    a: "Both. I work on site with your teams and remotely, depending on what the current phase of the program requires."
blogTags: [integration, oauth, security, sicherheit, service cloud]
readMore: [manufacturing-cloud-erp-integration, revenue-cloud-sap-system-boundaries, commerce-sap-data-flows, customer-prices-sap-or-salesforce-pricing, field-service-spare-parts, agentforce-sap-order-status, legacy-erp-without-api-agents, salesforce-password-integrations-2027]
masterclass: manufacturing-cloud
---

At manufacturers, Salesforce integration almost always means Salesforce SAP integration: Salesforce is connected to the ERP so that data is entered once and processes work across system boundaries. Sometimes the ERP is another system such as proALPHA. In service it also means telephony and email, because these are still the core channels. I design the integration architecture on the client side and decide with the client which partner builds it.

## Which system leads for which data?

Most integration problems start with an unclear answer to this question. If both Salesforce and the ERP can change a customer address or a price, the data in the two systems will contradict each other sooner or later. So the first step is a system map with a leading system for each type of data. A typical split looks like this:

```tabelle
title: System map: which system leads for which data
columns: | Salesforce | ERP
Customers and contacts | Prospects and contacts * | Customers with orders and invoices *
Products and prices | Reads what sales needs | Usually the leading system *
Orders and invoices | Visible to sales and service | Created or confirmed here *
Cases and service history | Cases and service history * | Orders and installed products to link to
mark: leads
note: Only the leading system changes the data, the other one reads it or links to it.
```
The details differ in every company, which is why this map is part of the [Salesforce architecture](../salesforce-architecture/) and not a decision left to the individual interface. Which data usually stays in SAP at machine builders, from spare part prices to customer orders, is described on the page [Salesforce for machinery manufacturers](../../salesforce-for-machinery-manufacturers/).

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

For the build I work with selected partners who have integration experience from large international programs. That gives the client a partner that fits the size of the task, while the architecture and the specifications stay on the client side.

## When the phone rings, the agent sees the customer in Service Cloud

In most service organizations, phone and email are still the main channels. A CTI integration connects incoming calls to Service Cloud, so agents see the customer, the installed products and the open cases when the phone rings.

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

## Integration users need fewer permissions and a new way to log in

Every integration has a technical user, and those users often have more permissions than they need. Authentication is changing as well: integrations that log in with username and password need to move to modern methods, as described in [Salesforce password integrations end in 2027](../../blog/salesforce-password-integrations-end-2027/). I review integration users, their permissions and their authentication as part of the architecture. The key dates for how integrations log in:

```zeitleiste
2026-12-01 | SOAP login() requires the Use Any API Auth permission
2027-02-20 | OAuth username-password flow for connected apps ends
Summer '27 | SOAP login() in API versions 31.0 to 64.0 is retired
Summer '28 | SOAP, REST and Bulk API in versions 31.0 to 40.0 stop working
```
