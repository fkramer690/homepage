---
title: "Salesforce project rescue when partner collaboration fails"
headline: "Getting a Salesforce project back on track"
description: "Is your Salesforce project going off track? I work with you and the partner to establish where it stands, then bring it back on track with management backing."
lang: en
slug: salesforce-project-rescue
translationKey: service-project-rescue
contactBrief: project-rescue
order: 8
lead: "When quality or the timeline no longer work in the collaboration with the implementation partner, each side usually blames the other. On the client side I work with you and the partner to establish where the project really stands, then report directly to the CIO, head of IT or head of CRM on what needs to happen now."
situations:
  - "Milestones slip, releases put defects into the production org, and client and partner blame each other."
  - "Trust in the implementation partner has suffered, and you want a second opinion before you decide."
  - "Shortly before go-live a flood of change requests arrives, because the business is only now testing the system in depth."
  - "Tickets sit in testing for a long time, and new requirements are added in the middle of a sprint."
  - "Decisions remain open, refinement sessions are cancelled, and the partner's team waits."
deliverables:
  - "I talk to your business teams, your project leads and the implementation partner."
  - "I document where the project stands: what works well, what could be better and where the main problems are."
  - "I analyse the backlog, sprints and tickets, for example how long tickets sit in testing before the business accepts them."
  - "I agree with you on which information is recorded when, where and by whom."
  - "I report directly to the CIO, head of IT or head of CRM and prepare the decisions that management has to make."
  - "I stay involved in the implementation until the project is stable again."
results:
  - "An assessment that shows what works well, what needs to improve and where the main problems are"
  - "A recommendation on how far the project needs to go back, with the reasons"
  - "A list of next steps and open blockers with owners"
  - "Rules for documentation and communication between your team and the partner"
  - "Metrics you can use to track the project yourself"
phases:
  - title: "Talking to both sides"
    icon: "interview"
    text: "I talk to you and to the implementation partner. The truth usually lies somewhere in the middle, and rarely is one side alone responsible for the status quo."
  - title: "Status quo and main problems"
    icon: "analyse"
    text: "I document what works well, what could be better and where the main problems are. The evidence comes from the backlog, tickets and metrics such as waiting time in testing."
  - title: "Decision with management"
    icon: "steer"
    text: "I show management how far the project needs to go back and what that requires: decisions, time from the business teams and backing for uncomfortable steps."
  - title: "Back on track"
    icon: "target"
    text: "Documentation and communication become binding, and everyone sees the next steps and blockers. I stay involved until the project is stable again."
duration: "How long it takes depends on the size of the project and the changes it needs. It should not take more than six months. If it does, the project needs more attention from management."
notFit:
  - "Management is not prepared to back uncomfortable decisions and see them through."
  - "Your key people remain tied up in day-to-day work and get no time for the project."
alternatives: "If the assessment shows that mainly the collaboration with the partner is the problem and the rest of the project holds up, a partner switch with a clean handover can be enough. If you have an independent, experienced internal Salesforce architect with a clear mandate from management, they can run the assessment themselves."
progress:
  - measure: "Waiting time in testing"
    how: "How long tickets sit in testing until the business accepts them."
  - measure: "Requirements added to a running sprint"
    how: "How often new requirements are added to a sprint in progress without being planned in refinement."
  - measure: "Open decisions"
    how: "How many decisions are open and how long they have been waiting."
  - measure: "Prepared backlog"
    how: "How many stories are described, prioritised and ready for the next sprints."
faq:
  - q: "What is Salesforce project rescue?"
    a: "A Salesforce project that has gone off track on quality or timeline is reassessed by an independent architect on the client side and brought back on track. The architect reports directly to the CIO, head of IT or head of CRM. That includes talks with client and partner, a sober assessment, decisions by management and clear rules for documentation and communication."
  - q: "Is a complete restart worth it?"
    a: "Rarely. Often more than half is solid, and going back one or two steps is enough. I have not yet seen a complete restart or a project abandoning Salesforce after more than six months of implementation. Management often does not want one either, because a lot of money is already in the project."
  - q: "How can I tell early that my project needs help?"
    a: "Look at three places: how long tickets sit in testing without being accepted, how well the backlog is described and prioritised, and whether new requirements simply slip into running sprints. Metrics from the ticket system and DORA metrics make these trends visible early."
  - q: "Do we have to switch the implementation partner?"
    a: "Not necessarily. Usually the assessment shows contributions from both sides, and often it is enough to reset the collaboration. If a switch is the right step after all, I support it so that the project keeps moving."
  - q: "What does a project rescue cost?"
    a: "My usual terms apply: EUR 1,200 net per day remote and at least two days a week. First, we clarify in a call where the project is stuck and whether you are ready to make hard decisions. Without backing from management I would be a toothless tiger."
blogTags: [project rescue, projektrettung, salesforce project rescue, second opinion, zweite meinung]
readMore: [switch-salesforce-partner, choose-salesforce-implementation-partner, salesforce-uat-business-testing, dora-metrics-salesforce-releases, decision-makers-bottleneck-ai, development-standards-definition-of-done, architecture-decision-log]
---

Salesforce project rescue means that I, as an independent architect on the client side, reassess a Salesforce project that has gone off track on quality or timeline and bring it back on track. I talk to you and the implementation partner, document where the project really stands and report directly to the CIO, head of IT or head of CRM. I have done this several times, whenever the collaboration with the implementation partner was no longer working. Sometimes the client only needed a second opinion, because trust in the partner had already eroded.

## How a Salesforce project goes off track

There is rarely a single reason. Usually it is a chain of problems that reinforce each other.

```praxis
In one project, exactly this chain played out. The client did not know its current processes well enough: the wrong people attended the process analysis workshops, because the right contacts had no time. Gaps in how the current processes were captured led to target processes that were not ideal. The client tested them late, because there was no time for testing either. Shortly before go-live, when the business engaged with the system properly for the first time, a flood of change requests arrived.
```

In the partner's team, motivation, efficiency and attention to detail dropped over the same period. From that team's point of view it is understandable: why make an effort if the work will not be tested anyway, or if I have to change it three times afterwards? Why finish my story today if I then have to wait two days for new requirements, because decisions have not been made or refinement sessions are cancelled?

That does not excuse poor quality. It does explain why one side is rarely solely to blame and why pressure on the partner solves nothing as long as the client lacks time. In this project only two things helped: attention from management and internal key people who were given time and authority for the project. If these people stay buried in day-to-day business, a project in this state cannot be delivered.

## How do you see early that your project needs help?

The first warning signs show up in the backlog and the tickets, long before a milestone slips:

- **Tickets sit in testing.** If stories sit in testing for a long time without the business accepting them, the client lacks time for acceptance. I describe how to organise that in [Salesforce UAT with the business](../../blog/salesforce-uat-business-acceptance-testing/).
- **The backlog does not cover the next sprint.** If the stories for the next sprints are not described and prioritised, requirements only take shape during implementation.
- **Requirements are added to a sprint in progress.** If new requirements are simply added, the structure breaks down and planning becomes unreliable.

Metrics from the ticket system and [DORA metrics](../../blog/dora-metrics-salesforce-releases/) for the releases make such trends visible early.

## Restart or a few steps back?

A complete restart is rarely possible. Management often does not want one, partly because a lot of money is already in the project. Often it is not even necessary: if more than half is solid, stepping back one or two steps is enough, for example to one area's current processes. I have not yet seen a complete restart or a move away from Salesforce after more than six months of implementation.

What usually works is unspectacular: documenting more cleanly and communicating more clearly. It has to be clear which information is recorded when, where and by whom, what the next steps are and where blockers remain. Only then do client and partner see clearly enough to decide. If the partner has to go in the end, [switching Salesforce partners without a standstill](../../blog/switching-salesforce-implementation-partner/) describes the process. [Partner governance](../partner-governance/) lowers the risk of ending up here again with the next partner.

## No rescue without backing from management

Before I start, we clarify in a call where the project is stuck and whether you are ready to take this step. A project rescue requires uncomfortable decisions: revisiting processes, freeing up business teams for the project, resetting the collaboration with the partner. If management does not give me the backing to push such decisions through, I am a toothless tiger.
