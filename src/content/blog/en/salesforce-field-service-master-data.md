---
title: "Salesforce Field Service: What Data Does Scheduling Need?"
description: "The six kinds of master data Salesforce Field Service needs before the first job, where they come from and who maintains them in field service."
pubDate: 2026-10-26
lang: en
slug: salesforce-field-service-master-data
translationKey: field-service-master-data
topic: field-service
categories: [field-service]
series: { id: field-service, part: 2 }
tags: [Field Service, Data model, Master data, Manufacturing]
takeaways:
  - "Field Service needs six kinds of data: territories with operating hours, skills, work types, assets, customer visiting hours and absences."
  - "A technician without a recorded skill is no candidate for jobs that require it. One with a wrong skill gets scheduled wrongly."
  - "Customer opening hours only count when the visiting hours work rule is active. Without it, Field Service books visits when nobody can open the door."
  - "Before go-live, decide for each kind of data which system leads and who maintains it. Most of it already sits in the ERP, in HR or with dispatchers."
  - "The failed visits of the last few months show which data has to be clean first."
faq:
  - q: "What master data does Salesforce Field Service need?"
    a: "At least service territories with operating hours, technicians as service resources with their skills, work types with duration and required skills, the assets at the customer site, customer visiting hours and the technicians' absences."
  - q: "How many technicians belong in one service territory?"
    a: "Salesforce recommends up to 50 service resources per service territory. Larger territories with many technicians and dispatchers make optimization and dispatching harder."
  - q: "How does Field Service handle technician skills?"
    a: "Skills are assigned to a technician with a level from 0 to 99.99. Work types and work orders carry the required skills. The Match Skills work rule makes sure only matching technicians get scheduled."
  - q: "Where does the data for Field Service come from?"
    a: "Assets usually come from the ERP, skills and absences from HR and training systems, territories and work types from service management. What matters is a leading system and an owner for each kind of data."
draft: false
---

Salesforce Field Service schedules with the master data it knows and nothing else. Before the scheduling engine assigns the first job, it needs six kinds of data: service territories with operating hours, technicians with their skills, work types with duration and requirements, the assets at the customer site, customer visiting hours and the technicians' absences. If one of them is missing or out of date, the engine sends the wrong technician or sends them at the wrong time. Most of this data already exists in the company, spread across the ERP, HR and the dispatchers' heads.

Whether Field Service is worth it for your field service operation at all is the topic of the first part of this series: [Salesforce Field Service: is it worth it?](../salesforce-field-service-worth-it/). This part covers the next question: what has to be in place before scheduling starts?

## Missing data leads to failed visits

```praxis
In service projects I have seen the same pattern again and again. Technicians were on site and could not do their job. Sometimes the spare parts were not there. Sometimes the machine was not accessible. Sometimes the wrong technician stood in front of the equipment, or the right one was not able to work. Partly the customer caused it, partly the way technicians were planned.
```

Every one of these failed visits costs a trip, a technician day and usually a second appointment. And almost every one goes back to a piece of information that was missing when the visit was planned:

- **Spare parts missing:** nobody knew exactly which machine stood at the customer site and which part it needed.
- **Machine not accessible:** the times when the customer grants access were not recorded anywhere.
- **Wrong technician:** technician skills were not maintained, or not up to date.
- **Technician not able to work:** absences or restrictions were unknown to the planners.

Scheduling software does not change this by itself. It makes the gaps visible faster, because it automatically takes decisions an experienced dispatcher used to take from memory.

## What data does Salesforce Field Service need?

Salesforce describes the objects in the [Field Service core data model](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm). For scheduling, these six areas matter most.

### Service territories and operating hours

A service territory is the area in which work is scheduled, usually geographic. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_basics/field_service_basics_enable), territories and operating hours are the foundation: without them the scheduling engine has no boundaries to work within.

Technicians become service territory members. The [guidelines for service territories](https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5) say each technician has exactly one primary territory, plus optional secondary territories for backup and relocation territories for temporary assignments elsewhere. Salesforce recommends up to 50 technicians per territory. The territory member record also holds the home base, for example the technician's home address when they start the day from there. Without it, the engine calculates travel from the wrong place.

### Technicians and skills

Every technician is a service resource. Their qualifications are skills, assigned with a level. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=fs_required_skills.htm&language=en_US&type=5) the level ranges from 0 to 99.99, and the company decides what each level means. A scale your service management already knows works best, for example the training levels you already use for your products.

The difference between recording and enforcing matters here. Only the [Match Skills](https://help.salesforce.com/s/articleView?id=pfs_optimization_theory_work_rules_match_skills.htm&language=en_US&type=5) work rule makes sure that only technicians with matching skills are scheduled. A technician with no skills at all is then no candidate for any job with a skill requirement. That is intended, and it also shows how hard a data gap hits.

### Work types

A work type is the template for a kind of job, such as annual maintenance, breakdown repair or commissioning. It sets the estimated duration and the required skills. Work orders inherit the skills of their work type. With ten well-maintained work types, nobody has to enter by hand on every work order who may take it. How a case becomes a work order with the right work type is covered in [from case to technician](../field-service-case-to-work-order/).

### Assets and locations

Assets are the machines at the customer site. Work orders can be linked to an asset, and assets can form a hierarchy, a machine with its assemblies. The technician then sees the asset's history, and the back office sees which part fits which machine.

Locations are places such as warehouses, vehicles or customer sites. A service van is a mobile location with its own stock. How parts, warehouses and the ERP work together is a topic of its own and gets its own part in this series.

### Customer visiting hours

Customers have their own times when a technician can reach the machine. In Field Service you record them as operating hours on the account. According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.pfs_optimization_theory_work_rules_visiting_hours.htm&type=5), each new work order takes them over as visiting hours.

```hinweis achtung
Scheduling only respects visiting hours when the visiting hours work rule is active in the scheduling policy. A dispatcher can override them, but then sees a rule violation.
```

Opening hours do not solve every access problem. When a machine has to be shut down for maintenance, the visit needs to be agreed with the customer. How to handle that in scheduling belongs in the next part of the series.

### Absences

Resource absences block time in a technician's calendar. Salesforce knows the types vacation, meeting, training and medical. According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_create_absences.htm&type=5), optimization does not assign technicians to appointments that conflict with their absences. That only works when vacations and training actually arrive in Salesforce and do not live only in the time tracking system.

## Where does the data come from, and who maintains it?

Hardly any of this data is created in Field Service. So before go-live I set a leading system and an owner for each kind. As a starting point I suggest this split and adapt it to the company:

| Data | Leading system | Owner |
|---|---|---|
| Service territories and operating hours | Salesforce | Service management |
| Technicians and skills | HR or training system | HR with service management |
| Work types | Salesforce | Service management |
| Assets at customer sites | ERP | Order management or commissioning |
| Customer visiting hours | Salesforce | Inside service |
| Absences | Time tracking | HR |

The interfaces follow from this table. Maintaining assets and skills by hand in Salesforce works for a pilot and breaks in daily operation. How to decide which system leads between ERP and Salesforce is described on the page [Salesforce integration](../../services/salesforce-integration/).

Skills and absences are data about employees. Agree early with data protection and, where there is one, the works council which of them may go into Salesforce. The same applies to the new app features I describe in [Field Service Mobile: guided flows and voice](../salesforce-field-service-mobile-guided-voice/).

## First step: analyse the failed visits of the last three months

Take the failed visits of the last three months in one region. Assign each one a cause: parts, access, skills, availability or something else. The cause with the most failed visits shows which data you need clean first. If there is no list of failed visits, that is a result too: then the metric that Field Service will later have to be measured against is missing.

Then check each of the six kinds of data: does it exist, where does it live, who maintains it? Once those questions are answered, it makes sense to set up scheduling itself. That is the topic of the next part of this series.
