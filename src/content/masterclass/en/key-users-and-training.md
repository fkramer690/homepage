---
title: "Key users and training in a Salesforce rollout"
description: "How key users, training on real cases and acceptance testing bring knowledge and ability to sales, service and field teams, with selection and time needed."
lang: en
slug: key-users-and-training
course: change-management
translationKey: cm-03
chapter: 3
pubDate: 2026-10-29
short: "Key users and training"
summary: "Knowledge and ability: how to choose and free up key users, train on real cases and involve technicians before the rollout."
takeaways:
  - "Training teaches knowledge; only daily work shows ability. For that every team needs a key user whom colleagues already ask for advice."
  - "Choose key users by standing in the team and knowledge of the process, not by who happens to have time."
  - "As a planning assumption, a key user needs almost eight working days around go-live, which the manager commits to in writing beforehand."
  - "Training uses real cases from the team's own work, shortly before go-live, run by key users with the project team."
  - "In field service, three to five experienced technicians per region take on this role and test the app on real jobs first."
articles: [change-key-users, salesforce-uat-business-testing, change-technician-adoption]
faq:
  - q: "What is a key user in a Salesforce rollout?"
    a: "A business user who knows the new system before everyone else, takes part in workshops and tests, and is the first point of contact for questions in their team after go-live. They also carry feedback from daily work back into the project."
  - q: "How many key users does a manufacturer need?"
    a: "One per team, site or country, two for critical areas. If the only key user of a country is out in the week after go-live, support for the whole country is out."
  - q: "Does a key user replace support?"
    a: "No. They answer questions about usage but do not change configuration or fix interface errors. Bugs still go through the ticket system so they are counted and prioritised."
draft: false
---

Knowledge and ability, the middle stages of the ADKAR model, reach the team in a Salesforce rollout mainly through key users. Training explains where a function is. Whether someone can use it in the customer meeting, on the phone or in front of the machine only shows in daily work, and there the colleague at the next desk helps more than a hotline. I choose key users by their standing in the team, plan their time with their manager beforehand and have them train on real cases. In field service, a small group of experienced technicians takes on this role.

## What do key users do in a rollout?

Key users are business users who know the new system before everyone else. At manufacturers they have a second job: sales, inside sales and service work a little differently at every site, and the project team does not know these differences. Key users know them and say early where the planned process will not work in their own team. In ADKAR terms they carry knowledge and ability into the team, and the focus shifts with the phase:

```schritte
Before the build | workshops · key users with product owner
  Knowledge starts with the key user: they explain their team's routines with all special cases and co-write acceptance criteria.
Before go-live | acceptance testing · key users
  They test with cases from their team and pass the knowledge on to colleagues in short sessions.
First weeks | daily work · key users on site
  Ability grows at the desk: they answer questions on the spot and report problems to the project in batches.
Operations | ongoing · key users and admin
  Reinforcement: they onboard newcomers and translate every release for their team.
```

In acceptance testing key users are the best testers, because they know which cases really occur in their team. How acceptance testing with business teams is set up is in [Salesforce UAT: who tests before the release?](../../../blog/salesforce-uat-business-acceptance-testing/).

## Choose key users by their standing in the team

Often the key user is whoever happens to have room in their calendar. That is the worst choice. Each of my criteria has a reason in the ADKAR model:

| Criterion | How you recognise it | Stage it supports |
|---|---|---|
| Standing | The team already turns to this person for advice, whatever the system | Desire: the team accepts advice from a respected colleague |
| Process knowledge | They know the daily reality of quote, order or service job in the team, exceptions included | Knowledge: they translate the system into the team's own cases |
| Critical eye | They ask questions instead of cheering and so find weaknesses early | Desire: once they are convinced, people believe them |
| Staying | No job change in sight for the coming months | Reinforcement: the knowledge stays in the team |

A simple way to the candidates: ask in every team whom people ask today when they get stuck in the system. The names that come up more than once are your candidates. The limits of the role, tasks in operations and how the network holds together are in [Key users in Salesforce rollouts: what they do](../../../blog/salesforce-key-user-network/).

## How much time must the business free up?

Without freed-up time, key user is just a label. The scope sets the need. For planning I count four half-day workshops, one week of acceptance testing at half capacity and the first two weeks after go-live at a third. That is just under eight working days, plus preparation and short sessions for colleagues. In operations a few hours a month remain, mostly around releases.

```hinweis tipp
Put in writing with the manager in which weeks and for how many hours the key user works for the project, and who does their job in the meantime. That paper belongs in the sponsor plan from chapter 2.
```

Recognition that others can see costs nothing and works. The project work belongs in the annual review. That decides whether someone volunteers again for the next project.

## Training shortly before go-live, with cases from the team's own work

Training two months before go-live is forgotten by the time the system arrives. Training with invented sample data shows the function but not the team's own case. So I plan training by three rules:

1. **Shortly before go-live.** A few days to two weeks before, so the knowledge lasts until the first real case.
2. **On real cases.** Inside sales creates a quote for a customer they know, with the products they sell. That needs realistic data in the training environment.
3. **By key users with the project team.** Key users explain in the team's language; the project team answers the deeper questions.

After that the first week decides. During that time key users should be reachable on site, and the project team should not have started the next topic yet. For hints inside Salesforce there is In-App Guidance: short prompts that explain new fields or steps the first time a user sees them.

## What is different in field service?

Service technicians are rarely in the office, often attend training only once and have little patience with software that does not work at the customer's site. If the app fails twice in the first week, the team considers it useless. With technicians, ability is often what is missing, for example when the app has no data in a basement without signal, and that is solved by a technical change, not by training.

```praxis
In my Field Service projects with maintenance, breakdown jobs and commissioning, the stumbling blocks were in three places: data quality of the assets, acceptance by the technicians and the interfaces to the ERP. All three are easier to get under control in one region than in the whole field service at once.
```

I recommend three to five experienced technicians per region who work along before the rollout. They test forms on real jobs, take the app where there is no signal, train their colleagues and remain contacts afterwards, like key users in inside sales. What matters is that their feedback leads to visible changes. What keeps technicians from the app and how to handle location data openly is in [Field Service app: how technicians adopt it](../../../blog/field-service-app-technician-adoption/), the rollout in waves in the Field Service chapter [AI agents, rollout and KPIs](../../field-service/field-service-ai-agents-rollout/).

## Ask whom each team goes to for advice today

Ask in every affected team whom people go to for advice today, and talk to those people's managers about time and cover. Take the key users into the first workshops, before anything is built, and plan training on real cases into the last two weeks before go-live. What this looks like in a rollout across several countries is in [chapter 4](../change-management-rollout-countries/). The role of leadership behind it is in [chapter 2](../sponsor-and-communication/).
