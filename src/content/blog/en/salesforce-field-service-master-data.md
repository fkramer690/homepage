---
title: "Salesforce Field Service: What Data Does Scheduling Need?"
description: "The six data areas that decide scheduling quality in Salesforce Field Service, what is technically required, where the data comes from and who maintains it."
pubDate: 2026-10-26
lang: en
slug: salesforce-field-service-master-data
translationKey: field-service-master-data
topic: field-service
categories: [field-service]
series: { id: field-service, part: 2 }
tags: [Field Service, Data model, Master data, Manufacturing]
takeaways:
  - "Six data areas determine how well Field Service schedules: territories, skills, work types, assets, visiting hours and absences."
  - "A technician without a recorded skill is not eligible for jobs that require it. A technician with an incorrect skill may be scheduled incorrectly."
  - "Customer opening hours are only considered when the visiting hours work rule is active. Without it, Field Service books visits when nobody can open the door."
  - "Before go-live, decide for each kind of data which system leads and who maintains it. Most of it already sits in the ERP, in HR or with dispatchers."
  - "The failed visits of the last few months show which data has to be cleaned up first."
faq:
  - q: "What master data does Salesforce Field Service need?"
    a: "Technically, scheduling requires service territories with operating hours, technicians as service resources, a scheduling policy and appointments with a geocoded address, an earliest start and a due date. How well it schedules after that depends on skills, work types, assets, customer visiting hours and absences."
  - q: "How many technicians belong in one service territory?"
    a: "Salesforce recommends up to 50 service resources per service territory. Larger territories with many technicians and dispatchers make optimization and dispatching harder."
  - q: "How does Field Service handle technician skills?"
    a: "Skills are assigned to a technician with a level from 0 to 99.99. Work types and work orders specify the required skills. The Match Skills work rule makes sure only matching technicians get scheduled."
  - q: "Where does the data for Field Service come from?"
    a: "Assets usually come from the ERP, skills and absences from HR and training systems, territories and work types from service management. What matters is having a system of record and an owner for each kind of data."
draft: false
---

Salesforce Field Service schedules with the data it knows and nothing else. Six data areas determine how good the plan is: service territories with operating hours, technicians with their skills, work types, the assets at the customer site, customer visiting hours and absences. Technically, the engine needs less: territories, resources, a scheduling policy and appointments with an address, an earliest start and a due date. But if one of the six areas is missing or out of date, the engine sends the wrong technician or sends them at the wrong time. Most of this data already exists, spread across the ERP, HR and the dispatchers' heads.

Whether Field Service is worthwhile for your field service operation is the topic of the first part of this series: [Salesforce Field Service: is it worth it?](../salesforce-field-service-worth-it/). This part covers the next question: what has to be in place before scheduling starts?

## Missing data leads to failed visits

```praxis
In service projects I have seen the same pattern again and again. Technicians were on site and could not do their job. Sometimes the spare parts were not there. Sometimes the machine was not accessible. Sometimes the wrong technician arrived at the equipment, or the right technician was not able to do the work. Sometimes the cause was on the customer side; sometimes it was how technicians had been scheduled.
```

Every one of these failed visits costs a trip, a technician day and usually a second appointment. Not every failed visit is caused by bad data. But many can be traced back to a piece of information that was missing when the visit was planned. Possible causes:

- **Spare parts missing:** nobody knew exactly which machine was installed at the customer site and which part it needed, or the part was not in the van. Parts and stock are covered separately in this series.
- **Machine not accessible:** the times when the customer granted access were not recorded anywhere, or the visit was never confirmed with the customer.
- **Wrong technician:** technician skills had not been maintained or were out of date.
- **Technician unable to work:** absences, missing safety briefings or work permits were unknown to the planners. No data can prevent short-notice illness.

Scheduling software does not change this by itself. It makes the gaps visible faster, because it automatically takes decisions an experienced dispatcher used to take from memory.

## What data does Salesforce Field Service need?

Two kinds of data need to be kept apart. Some data elements are technically required: according to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling.htm&language=en_US&type=5), every scheduling policy needs the resource availability work rule and the earliest start permitted and due date work rule, and appointments need an address the engine can geocode for travel times. On top of that, six data areas determine how good the plan is. The objects behind them are described in the [Field Service core data model](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm). As a starting point for the system of record and data owner, I suggest using the split below and adapting it to the company:

| Data area | What scheduling uses it for | If it is missing or wrong | Leading system | Owner |
|---|---|---|---|---|
| Service territories and operating hours | Where and when work is planned, start address for travel | Travel from the wrong place, no boundaries for the engine | Salesforce | Service management |
| Technicians and skills | Who may take a job | Wrong technician on site | HR or training system | HR with service management |
| Work types | Duration and required skills per kind of job | Skills entered by hand on every work order | Salesforce | Service management |
| Assets at customer sites | Which machine, which history, which part | Incomplete history, higher risk of the wrong part | ERP | Order management or commissioning |
| Customer visiting hours | When the machine can be reached | Visit when nobody opens the door | Salesforce | Inside service |
| Absences | When a technician is not available | Jobs for technicians on leave or in training | Time tracking | HR |

Four details from Salesforce Help decide whether this works in practice:

- **Territories.** According to the [guidelines for service territories](https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5), each technician has exactly one primary territory plus optional secondary ones, and Salesforce recommends up to 50 technicians per territory.
- **Skills.** The level ranges from 0 to 99.99 according to [Salesforce Help](https://help.salesforce.com/s/articleView?id=fs_required_skills.htm&language=en_US&type=5), and the company decides what it means. Only the [Match Skills](https://help.salesforce.com/s/articleView?id=pfs_optimization_theory_work_rules_match_skills.htm&language=en_US&type=5) work rule enforces them; a technician without skills is then not eligible for any job that requires one.
- **Visiting hours.** They are recorded as operating hours on the account and copied to each new work order according to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.pfs_optimization_theory_work_rules_visiting_hours.htm&type=5). They are only considered when the visiting hours work rule is active.
- **Absences.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_create_absences.htm&type=5), optimization does not assign technicians to appointments that conflict with them, but only if leave and training actually arrive in Salesforce.

How a case becomes a work order with the right work type is covered in [from case to technician](../field-service-case-to-work-order/). Parts and van stock are covered in [their own part](../salesforce-field-service-spare-parts-erp/) in this series.

## What do you need to decide before scheduling starts?

The table above is a proposal. The decisions behind it belong to service management and IT together, and nobody else will make them:

- **An owner for each data area.** Someone has to be accountable when skills are out of date or an asset is missing. Without a name in the table, data quality becomes nobody's job after go-live.
- **Interface or manual maintenance.** Maintaining assets and skills by hand in Salesforce works for a pilot but breaks down in day-to-day operation. Every interface costs money to build and run; every manual list costs time and creates errors. Decide for each area, based on volume and rate of change. The page [Salesforce integration](../../services/salesforce-integration/) describes how to decide which system is the system of record.
- **Which cause of failed visits to fix first.** Not all six areas can be clean on day one. The failed visits in your own region show where money is being lost.
- **Employee data.** Skills and absences are data about employees. Agree early with the data protection team and, where applicable, the works council on which of these data points may go into Salesforce. The same applies to the app features in [Field Service Mobile: guided flows and voice](../salesforce-field-service-mobile-guided-voice/).

Three warning signs that the data architecture will not hold up: dispatchers keep a private list of who can do what, skills are only updated when a visit has already failed, and nobody can say which system is authoritative when Salesforce and the ERP disagree about an asset.

## Analyze the failed visits of the last three months

Take the failed visits of the last three months in one region. Assign each one a cause: parts, access, skills, availability or something else. The cause with the most failed visits shows which data you need to clean up first. If there is no list of failed visits, that is a result too: then the metric you will later use to measure Field Service is missing.

Then check each of the six data areas: does it exist, where does it live, who maintains it? Once those questions are answered, it makes sense to set up scheduling itself. That is the topic of the next part of this series.
