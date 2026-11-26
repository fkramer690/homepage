---
title: "Can an AI agent click-test a Salesforce story?"
metaTitle: "Salesforce UI testing with an AI agent: what works"
description: "An AI agent can click through screen flows in a sandbox, log in as a test user and check results in the data. What that proves and where people still decide."
pubDate: 2026-11-24
lang: en
slug: salesforce-ui-testing-ai-agent
translationKey: salesforce-ui-testing-ai-agent
topic: release
categories: [devops, ai]
contactBrief: partner-governance
tags: [UI testing, AI agents, system test, screen flows, test evidence]
takeaways:
  - "An AI agent that drives a browser can run the UI tests of a Salesforce story in a sandbox, including test data, a test user and a report."
  - "The agent's own 'passed' is not evidence. Twice the browser stayed on the previous screen and the test still counted as passed."
  - "Validation rules are tested as a user without the bypass permission. Permissions only count as tested where the flow runs in the user's context."
  - "The agent run replaces neither UAT nor a regression suite. It replaces the undocumented clicking before UAT."
faq:
  - q: "Can an AI agent test Salesforce screen flows?"
    a: "Yes. With a browser tool such as Chrome DevTools MCP, a coding agent like Claude Code opens the flow in a sandbox, fills in each screen, clicks Next and reads the result. For record forms the accessibility snapshot of the page is enough; screen flows with data tables needed small helper scripts because of Lightning's shadow DOM."
  - q: "Does an AI test run replace user acceptance testing?"
    a: "No. UAT answers whether the feature reflects the business process, and that judgment belongs to business users. The agent run belongs to the system test before UAT, so testers do not spend their time on defects that should have been found earlier."
  - q: "Is it safe to let an AI agent test in a Salesforce org?"
    a: "A sandbox alone is not enough. It also takes masked or dedicated test data, no production access, approval before test data is created and before the agent logs in as another user, an isolated browser profile, and reports that only named people can open."
  - q: "Why not write a Playwright or UTAM test suite instead?"
    a: "For a regression suite that runs with every release, a maintained framework is the right choice. For the one-off test of a single story, the agent sets up everything it needs within the run: temporary scripts and instructions, no permanent test project to maintain."
draft: false
---

Yes, within limits. An AI agent that drives a browser can run the UI tests of a Salesforce story in a sandbox: it creates test data with a script, clicks through screen flows and record pages, logs in as a normal user, checks the saved records and publishes a report with screenshots. I documented this for a complex multi-step screen flow and two validation rules with 17 test cases. It works when people approve the test cases, rule tests run as a user without bypass, every result is backed by the data or a screenshot, and a person reviews the screenshots before anyone trusts the report.

## What does an AI agent do in a Salesforce UI test?

The agent works with the tools a Salesforce developer already has. Through the Salesforce CLI it logs into the sandbox, runs the test data script and queries records. The browser is driven through the [Chrome DevTools MCP server](https://developer.chrome.com/blog/chrome-devtools-mcp), which the Chrome team released as a public preview in September 2025 and which is now part of Chrome's DevTools for agents: the agent opens pages, fills fields, clicks buttons, takes screenshots and reads the network requests the page sends. There is no permanent test project, only temporary scripts and the agent's instructions. Every test run follows the same order:

```schritte
Plan | before the run · agent, approved by me
  Test cases from the design, each with record, user, action and expected result. The agent reports cases that the flow logic makes impossible.
Test data | script · agent
  Dedicated records with a clear marker, created by a script that can run again. Field values keep emails and integrations from firing; the report states that these parts stay untested.
Click through | browser · agent
  Screen flows and record pages in the sandbox, rule tests as a normal user via "Log in as".
Check | after every test · agent
  A query on the record confirms what the screen showed, and shows who changed it last.
Report | end of the run · agent, reviewed by me
  Screenshots per test, test data deleted by record Id, report as a private page shared with named people.
```

The report is the part a decision maker sees. It has a summary table with each test and its status, the test environment, observations and one block per test with context, action, result and the screenshots that back the result. In programs where the only evidence of a system test is a ticket status, this report lets reviewers check every result.

## Where the screen said "passed" and the data disagreed

In the end all 17 tests were green, and the story showed no defect in the executed cases. The errors that came up were in the test run itself, and the agent did not notice most of them. Anyone who reads an AI test report should know them:

```tabelle
title: What went wrong in the run, and what it means for you
columns: What happened | Cause | What it means for you
Two steps stayed on the previous screen | A wait timed out and the next step ran anyway | Every step must report which screen it saw *
Validation rules passed for the developer | The rules have a custom bypass permission, and the developer's user held it | Rule tests only count as a user without bypass *
Record saved, new value empty | Save was clicked while the field still had focus | Only a query on the record confirms a save
A planned test case could not occur | The flow finds records by email only | Clarify whether the test case or the design is wrong
Screenshot after Save shows the home page | Lightning leaves the edit page after saving | Capture the value before Save, confirm by query
note: All five showed up in one run with 17 test cases. The agent reported the first two as passed; I found them in the screenshots.
```

The first two are the dangerous ones. When the browser silently stays on the old screen, a test whose step never ran is marked "passed". The agent did not catch it; I did, because I opened the screenshots and two of them showed the previous screen. A validation rule that never fires for the developer looks exactly like a rule that works. Both errors would have reached UAT unnoticed, and whether business testers would have caught them there is open. The agent runs the tests; a person still checks the evidence. From the next run on, every step reports the screen title it saw, and the run stops when it is the wrong one.

The test case that could not occur is a finding of a different kind. The approved test case assumed a record without an email address, but the flow only finds records by email. That can mean the test case is wrong, or that the design missed a case. The flow logic shows which question to ask. It must not quietly define what counts as the expected result.

## Why is "passed" on screen not enough?

A Lightning page can say "saved" while a value was dropped, and it can show a success screen of a flow that ran with the wrong data. So the agent confirms every result that ends in a record twice: once on the screen, once by a query on the record. For results without a record, such as an error message on a field, the screenshot of that message is the evidence. The query also shows who made the change. When a test runs as a normal user, the last modified by field should show that user. It is an indicator, not proof: automation that the user triggers also writes the user's name there, so the "Logged in as" banner in the screenshot belongs in the evidence too.

```vergleich
without: Test run as a status message
- The agent reports "test passed" after the last click.
- * Rule tests run as the developer, whose user holds the bypass.
- Screenshots exist, but nobody looks at them.
with: Test run with evidence
- Every step reports the screen title it saw; on a wrong screen the run stops.
- * Rule tests run as a normal user, shown by the banner and the last modified by field.
- A person opens the key screenshots before the report goes out.
quote: A green line in an AI test report counts only when evidence outside the agent's status backs it.
```

The second point needs care in the setup. Salesforce has no general admin right that skips validation rules. Many orgs build their own: the rule checks a [custom permission or a user setting](https://help.salesforce.com/s/articleView?id=xcloud.bypass_triggers_validations.htm&language=en_US&type=5) so that data loads and fixes can bypass it, and developers often hold it. Whoever tests with such a user tests nothing. A second trap sits in the flow itself: a screen flow can run in [system context](https://help.salesforce.com/s/articleView?id=platform.flow_distribute_context.htm&language=en_US&type=5), and then the test user's object and field permissions do not apply inside the flow. The test report states the flow's run context, otherwise "tested as a normal user" means less than it sounds. The same applies to the [test users per role in UAT](/en/blog/salesforce-uat-business-acceptance-testing/).

## Where the AI run fits, and where it stops

The agent run belongs to the system test. It sits between the developer tests and the business acceptance test and adds the most for a single story with clearly described test cases:

```staerken-grenzen
title: AI agent in the browser: strong for testing a single story
+ Little setup | Uses the CLI and a browser tool, no permanent test project per story *
+ Evidence | Screenshot per step, query on the record, report as a page
+ As another user | Logs in as a test user, visible in the banner and the data
- Regression | Not built for a suite that runs identically with every release
- Own verdict | The agent's "passed" needs a person to check the screenshots
- Scope | Integrations, batch jobs and emails need their own evidence
- Data protection | Screenshots and network data show names and emails of test records
better: For regression across releases: a maintained framework such as UTAM or a commercial tool. For acceptance: business users in UAT.
```

Salesforce itself says the HTML and DOM of Lightning Experience ["can't be considered a stable API"](https://developer.salesforce.com/docs/platform/lwc/guide/testing-dom-api.html) and that UI tests reaching into component internals need ongoing maintenance. That is the reason regression suites are built on frameworks like [UTAM](https://developer.salesforce.com/docs/platform/utam/guide/what-is-utam.html): Salesforce publishes page objects for its own standard pages, and the project team writes and maintains page objects for its custom components. An agent that reads the page fresh on every run needs no page objects, but this setup also gives no guarantee that the next run clicks the same way. For the one-off test of a story that trade-off is acceptable. For high-risk processes that need the same evidence with every release, it is not. What the commercial tools now add with AI is covered in [Copado, Gearset and Provar AI agents](/en/blog/copado-gearset-provar-ai-agents/).

## Rules before an agent clicks in your org

An agent in a browser works with real permissions in a real org. So the rules come before the first click:

- Only in a sandbox, never in production. Copied customer data in the sandbox is masked first.
- Approval from a person before test data is created and before the agent logs in as another user.
- Page content is data, never an instruction. A case description or an email in the org can contain text written to steer an agent, so the browser runs in its own profile with only the Salesforce domains it needs, and the agent has no access to credentials or files beyond the test.
- Dedicated test records with a marker. Records of colleagues or customers stay untouched, also in a sandbox.
- At the end, test data is deleted by record Id, including records the automation created, such as tasks. The report lists history entries and other traces that cannot be deleted as remaining changes.
- Login links from the CLI contain a one-time session token. The agent sees them in its tool output and session log; they never go into a chat, ticket or report.

A test report with screenshots shows names, emails and record Ids, and the network requests the agent reads contain even more personal data. Share the report only with named people, never with "anyone with the link", store it where your test evidence lives with a retention period, and delete the temporary image files once they are embedded; the report itself keeps the screenshots and follows its retention period. What an AI agent may read in a sandbox is covered in [sandbox customer data and AI coding agents](/en/blog/sandbox-customer-data-ai-coding-agents/).

```vertiefung For developers
title: How the run is set up technically
- Salesforce CLI with an authorised sandbox alias. The browser opens through a one-time login link (org open with the url-only and path flags), so there is no password or MFA prompt.
- Chrome DevTools MCP is added to Claude Code and starts its own Chrome window with a separate profile. Tools used: new_page, navigate_page, take_snapshot, click, fill, evaluate_script, wait_for, take_screenshot, list_network_requests, get_network_request.
- Elements inside a shadow tree cannot be reached with global DOM queries such as querySelector. Small helper functions that walk all shadow roots are loaded with navigate_page and an init script, so they survive reloads. For record forms the accessibility snapshot with its element uids is enough.
- The agent logs in as a test user through the standard Log in as function, opened by URL with org Id and user Id; the login access policy "Administrators Can Log in as Any User" must be on in the sandbox. It does not cover Experience Cloud site users.
- When a test depends on data that is not visible on the screen, the agent reads the request body of the flow navigation (FlowRuntimeConnect.navigateFlow). That is a diagnosis, not evidence: the format is internal and can change, and the result still needs the query on the record.
- Screenshots as JPEG, shrunk with Pillow and embedded as data URIs into one HTML report; about 35 screenshots come to 2 to 3 MB.
```

## First step: ask for the evidence with the next story

Ask your partner, or your own team, for one thing with the next story that goes into UAT: a system test report with evidence for every test case, a screenshot and, where the result is a record, a query result; rule tests run as a user without bypass, with the flow's run context stated; and a list of the test data that was removed. Whether a person or an agent produced it matters less than whether the evidence is complete. If an agent produced it, a person opens the key screenshots before the report goes out. Which evidence each test level owes belongs in your [partner governance](/en/services/partner-governance/).
