---
title: "Vibe coding in Salesforce: prototype or production?"
description: "Where vibe coding in Salesforce helps manufacturers, from dealer-portal mock-ups to service cockpits, and why production code needs review, tests and CI."
pubDate: 2026-10-27
lang: en
slug: vibe-coding-salesforce-prototype-vs-production
translationKey: vibe-coding-prototype-not-production
topic: devops
category: devops
tags: [vibe coding, agentforce vibes, ai coding, prototyping, devops, manufacturing]
takeaways:
  - "Vibe coding in Salesforce is fine for workshop prototypes such as a dealer-portal mock-up or a service cockpit LWC, built in a Developer Edition or scratch org with dummy data and then thrown away."
  - "Code that goes into an org with dealer, warranty or service data needs agentic engineering: the AI writes, a person reviews, and tests and pipeline gates decide whether it deploys."
  - "Rebuild instead of promoting: the prototype becomes the specification with screens and acceptance criteria, and the production build starts from the client's repository with an approved plan."
  - "According to Salesforce's FAQ, a Developer Edition org gets 110 Agentforce Vibes requests or 1.5 million tokens for one month after first use, without refresh; a scratch org lives 7 days by default, 30 at most."
  - "Veracode found in 2026 that raw models write compilable code almost every time, yet only 56 percent passed its security tests; a mock-up that runs proves the idea, not the code."
faq:
  - q: "What is vibe coding in Salesforce?"
    a: "Vibe coding means describing a feature to an AI coding agent such as Agentforce Vibes or Claude Code and accepting the result without reading the code. In Salesforce that produces working LWCs, Apex and metadata quickly, which is useful for prototypes and risky for production."
  - q: "Can a vibe-coded prototype be deployed to production?"
    a: "I would not deploy it as it is. Prototypes are usually built as an administrator with dummy data, without a sharing model, bulk tests or source control. Use the prototype as the specification and rebuild the feature through plan, review and the pipeline."
  - q: "Which org should we use for vibe coding prototypes?"
    a: "A Developer Edition or a scratch org without real customer data and without connections to SAP or other production systems. Salesforce lets admins disable Agentforce Vibes for a production org in Setup under Agentforce Vibes Extensions."
  - q: "What is the difference between vibe coding and agentic engineering?"
    a: "Martin Fowler separates the two: in vibe coding nobody reads the generated code; in agentic engineering an LLM writes the code, but developers review it and care about its structure. Production Salesforce work needs the second."
draft: false
---

Vibe coding in Salesforce pays off where the code is meant to be thrown away: a clickable dealer-portal mock-up for a requirements workshop, a service cockpit LWC that shows the head of service what the screen could look like, a script that fills a test org with spare parts. Build it in a Developer Edition or scratch org with dummy data. For anything that reaches an org with dealer, warranty or service data, switch to agentic engineering: an approved plan, human review, tests and pipeline gates. The prototype becomes the specification, and the production build starts again from your repository.

## What does vibe coding mean, and where does it end?

Andrej Karpathy coined the term in February 2025: you "fully give in to the vibes" and "forget that the code even exists". Simon Willison [narrowed it down](https://feeds.simonwillison.net/2025/May/1/not-vibe-coding/) to "generating code with AI without caring about the code that is produced" and stressed that this differs from using AI tools to build production code responsibly. In May 2026 Martin Fowler gave the responsible version its own name. In his [bliki entry](https://martinfowler.com/bliki/VibeCoding.html), programmers who let an LLM write the code but still review it "aren't forgetting the code exists", and he calls that agentic engineering.

So the line runs along one question: does anyone read the code? The Agentforce Vibes session can be vibe coding in a Developer Edition and agentic engineering in a scratch org built from your repository. The terms and the four layers of AI in a Salesforce programme are covered in [chapter 1 of the AI masterclass](../../ai-masterclass/terms-and-map/); here the question is what the line means for your projects.

## Where does vibe coding help a manufacturer?

Fowler names disposable software and prototypes as fitting uses: "Experienced programmers may also find it handy for rapid development of disposable software or prototypes." In a manufacturing programme I see four candidates:

- **Dealer-portal mock-ups.** A page where a dealer orders spare parts for a machine by serial number, shown to a few dealers in a workshop before anyone writes a user story. What the real portal involves is in [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).
- **A service cockpit LWC.** One screen with open cases, installed base, next maintenance date and the assigned field technician, so the head of service can point at what is missing. Agentforce Vibes 2.0 offers [live previews for Lightning Web Components](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0), which makes this quick.
- **Test data scripts.** Spare parts, assets and service contracts in plausible quantities for a demo.
- **Throwaway analyses.** A one-off script that counts which asset fields are actually filled.

The value lies in the conversation: business teams correct a working screen faster than a specification document.

The environments cost little. Salesforce's [April 2026 announcement](https://developer.salesforce.com/blogs/2026/04/new-developer-edition-agentforce-vibes-claude-mcp) put Agentforce Vibes, a browser-based VS Code and hosted MCP servers into every Developer Edition at no cost. The [Vibes FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html) limits that to 110 requests or 1.5 million tokens per org, for one month after first use, without refresh. Teams with a Dev Hub can use scratch orgs instead: according to the [Salesforce DX guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs.html) they are "source-driven and disposable", live 7 days by default and 30 days at most, and start without data. Vibes is enabled in them by default when the Dev Hub has it enabled.

## Rules for the prototype org

A prototype is only as harmless as the org it runs in. Fowler calls security perhaps the most serious risk: vibe-coded applications "can often expose sensitive information or worse, credentials". For a Salesforce prototype I set five rules:

1. **No real data.** No dealer names, no customer machines, no prices from the price list. Generated dummy data is enough for a mock-up.
2. **No connections.** No Named Credential to SAP or proALPHA, no integration user, no copy of production secrets. The SAP response is a static JSON file.
3. **No coding agent in production.** Salesforce lets admins [disable Agentforce Vibes per org](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes) in Setup under Agentforce Vibes Extensions. I would do that in production on day one.
4. **An owner and an end date.** Scratch orgs expire by design. A Developer Edition stays as long as someone logs in, so somebody has to retire it or at least record what is in it.
5. **A visible label.** "Prototype, not for production" in the component title, so a screenshot in a steering committee deck does not become a commitment.

These rules belong in the contract with your partner as well, as described in [rules for partners who code with AI](../partners-using-ai-coding-contract-rules/).

## Why should a vibe-coded prototype not go to production?

A prototype shows that a screen makes sense, not whether the code holds up under your data, your users and your sharing model. Veracode's [2026 GenAI Code Security Report](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) found that raw models write compilable code at a rate of about 100 percent, while only 56 percent passed the security tests. Co-founder Chris Wysopal puts it this way: "scan it, fix it, and never ship it blind." Code that runs is the easy part.

In Salesforce, a typical workshop prototype carries the same gaps every time:

- It was built and clicked through as a system administrator, so it never met the sharing model that keeps one dealer away from another dealer's orders.
- It reads records one at a time, because the demo had twelve.
- Stock levels and delivery dates are hard-coded where the production version must call SAP.
- It has no tests, or tests written only to reach coverage.
- Its metadata lives in a Developer Edition, outside your repository and outside any review.

Fowler adds maintainability: unreviewed code grows into code that is hard to change, for people and for LLMs alike. In my judgement, closing these gaps one by one inside the prototype takes longer than building the feature properly. Which defects to look for in AI code is the topic of [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/).

## The path from prototype to production

I treat the prototype as a specification. What survives the workshop are screens, decisions and acceptance criteria. The production build then follows agentic engineering:

1. **Freeze the result.** Screenshots or a short recording, the field list, the open questions and acceptance criteria written with the business, for example "a dealer sees only orders for machines sold through that dealer".
2. **Start in your repository.** The developer works in a scratch org or developer sandbox created from the client's repository, with a rules file that names your Named Credentials, API version and test rules. Why that file belongs to you is explained in [the AI rules file of your repository](../ai-rules-file-salesforce-repository/).
3. **Plan before code.** Agentforce Vibes' [Plan Mode](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-workflow-patterns.html) produces goals, non-goals, an approach and numbered tasks, and "No files change until you click Approve Plan." The developer checks the plan against the acceptance criteria, sharing and permissions first.
4. **Configure security by hand.** The same Salesforce guide recommends building permission sets, profiles, sharing rules and org-wide defaults manually in Setup and reviewing every generated security change before accepting it.
5. **Review and gates.** Pull request, human review, Code Analyzer, validation deploy with Apex tests. The gates are described in [quality gates for AI code](../quality-gates-for-ai-code-salesforce-pipeline/).

One exception I accept: the HTML template and CSS of a mock-up LWC can be carried over if they pass the same review. Apex and data access are always rebuilt.

## A typical scenario: two-day workshop at a machine builder

Assume a machine builder with Service Cloud, SAP S/4 and 400 dealers, planning a dealer portal and a new service cockpit. All numbers are assumptions. In a two-day requirements workshop, one developer builds both mock-ups with Agentforce Vibes in a fresh Developer Edition. The portal page takes about three hours, the cockpit about two, together roughly 40 of the 110 requests. Dealers and the head of service correct the screens live: the cockpit gets a column for the warranty end date, the portal loses a filter nobody used.

After the workshop the architect reads the prototype code once, as a reference. The order query ignores the dealer relationship, because the developer was logged in as administrator. Delivery dates come from a hard-coded list. The cockpit runs one query per case.

The production build therefore starts from the repository: three user stories, each with an approved plan, a `runAs` test as a dealer user and an SAP call through the existing MuleSoft API. Assume that takes two sprints for a partner team of three. Without the workshop, my estimate is that the first sprint would have gone into finding out what the screens should show. The prototype paid for itself in requirements and contributed no line of Apex. What the AI tools for such a team cost is covered in [AI coding costs in a Salesforce project](../ai-coding-costs-salesforce-project/).

## Where should you start?

1. **Allow vibe coding explicitly**, in Developer Editions and scratch orgs with dummy data, so nobody does it quietly in a shared sandbox.
2. **Disable Agentforce Vibes in production** and keep production deployments in the pipeline.
3. **Define the hand-over:** screens, acceptance criteria and open questions leave the workshop; prototype Apex does not.
4. **Make plans visible.** Ask your partner to attach the approved plan to the pull request.
5. **Own the pipeline.** Setting it up for programmes with several partners is the core of my [DevOps and release management](../../services/devops-release-management/) work.

Use vibe coding to get better requirements out of the workshop and agentic engineering to get code into your org. If you want to set up that hand-over for your programme, [send me a message](#contact).
