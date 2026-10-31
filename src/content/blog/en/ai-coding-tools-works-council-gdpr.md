---
title: "AI coding tools in Germany: works council and GDPR"
description: "Rolling out Claude Code, Copilot or Codex at a German site: when the works council must agree, what the works agreement covers and where your code is processed."
pubDate: 2026-10-27
lang: en
slug: ai-coding-tools-works-council-gdpr
translationKey: ai-coding-works-council-gdpr
topic: governance
categories: [architecture, ai]
tags: [ai coding, works council, gdpr, data residency, claude code, github copilot]
takeaways:
  - "Without works council consent or a conciliation ruling, a coding agent on company accounts cannot go live at a German site, according to CMS."
  - "Claude Code shows admins accepted lines of code per person and GitHub provides Copilot metrics per user, which is exactly what the works agreement covers."
  - "EU inference is available through Amazon Bedrock in an EU region, Copilot with EU data residency or OpenAI; Anthropic's API offers only \"us\" or \"global\"."
  - "Private AI accounts may avoid co-determination, but then consumer terms govern training, retention and offboarding."
  - "Plan the works council and data protection before the pilot, and keep the tool rollout separate from later changes to team size or roles."
faq:
  - q: "Does a German works council have to approve Claude Code or GitHub Copilot?"
    a: "As a rule, yes, when the company provides the accounts. According to CMS, the objective possibility of monitoring performance or behaviour is enough; no intent is required. Both tools produce usage data per person. This article is not legal advice."
  - q: "Can Claude Code process data in the EU?"
    a: "Not through Anthropic's API, which offers only \"us\" or \"global\" inference. Through Amazon Bedrock in an EU region, Claude Code uses EU inference profiles. Claude models are also available in GitHub Copilot with EU data residency enabled."
  - q: "Do I need a data processing agreement with Anthropic?"
    a: "According to Anthropic, its DPA with Standard Contractual Clauses is automatically part of the Commercial Terms, so it covers Team, Enterprise and API. Claude on Amazon Bedrock falls under AWS terms. Whether that meets your requirements is your data protection officer's call."
  - q: "Can developers simply use private AI accounts?"
    a: "I advise against it. In a first-instance interim ruling in 2024, the Hamburg Labour Court saw no co-determination right for private ChatGPT accounts, because the employer receives no usage data. Your code then runs under consumer terms, with Claude for example with training depending on a user setting."
  - q: "Does this apply to sites outside Germany?"
    a: "The works council rules are German law and apply to your German sites and their employees. GDPR applies across the EU. Some groups with German plants or engineering centres may choose to use the German process as the group standard for AI tools."
draft: false
---

If you roll out Claude Code, GitHub Copilot or Codex to Salesforce developers employed at a German site, you will as a rule need the works council's consent under section 87(1) no. 6 of the Works Constitution Act (BetrVG), because these tools produce usage data per person. Data protection adds two questions: which data may enter the agent's context, and where inference runs. Anthropic's API has no EU region; Amazon Bedrock, Copilot and OpenAI do. Plan both before the pilot, because without the works council's consent or a ruling of the conciliation committee, the tool cannot go live, where a works council exists.

One note first: I am a Salesforce architect, not a lawyer. What follows is my technical view of the questions your works council and data protection officer will ask, not legal advice. The works agreement and the transfer assessment belong with your legal department or an employment lawyer.

## Why does a German works council have to approve an AI coding tool?

A works council (Betriebsrat) is the elected employee body at a German site. Section 87(1) no. 6 BetrVG gives it a co-determination right over technical systems that are capable of monitoring employees' behaviour or performance. According to a [CMS analysis from July 2026](https://cms.law/de/deu/legal-updates/ki-transformation-und-betriebsrat-mitbestimmung-richtig-gestalten), AI systems trigger this right "as a rule". Under Federal Labour Court case law, the objective possibility of monitoring is enough, even without any intent. CMS is clear about the consequence: without the works council's consent or a ruling of the conciliation committee (Einigungsstelle), the employer may not introduce the system. Whether current federal government plans will change this, CMS leaves open.

With coding agents you do not have to look hard for the monitoring capability. The vendors ship it as a dashboard:

- **Claude Code** [usage analytics](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics) show Owners on Team plans, and Owners and Admins on Enterprise plans, each member's email and lines of code accepted in the current month, exportable as CSV. The GitHub integration (beta) adds pull requests merged and opened per user.
- **GitHub Copilot** provides [usage metrics](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/copilot-usage-metrics/copilot-metrics) through APIs at enterprise, organisation, repository and user level, including acceptance rate, lines of code and pull request figures.

That is performance data in the literal sense, and a ranking of developers takes two clicks.

People like to quote one exception. On 16 January 2024 the Hamburg Labour Court (24 BVGa 1/24), in a first-instance ruling in interim proceedings, found no co-determination right for ChatGPT used through employees' private accounts, because the employer had no data on who used it, when or for what. In its [note on the decision](https://cms.law/de/deu/legal-updates/kein-mitbestimmungsrecht-des-betriebsrats-bei-chatgpt-co), CMS points out that the assessment changes once the employer provides accounts or licences. For a Salesforce team on company licences, the ruling does not help.

Good news for planning: according to CMS, an AI tool added without changing the organisation or responsibilities is not an operational change under section 111 BetrVG, so no social plan is needed. Tie the tool to smaller teams or new roles and that changes. CMS recommends separating the two and documenting it, which matters if you move to [AI-native delivery with smaller teams](../ai-native-delivery-smaller-salesforce-teams/) at the same time.

## What belongs in the works agreement for coding agents?

CMS recommends framework works agreements that set the procedure for new IT and AI applications, and notes that this does not work for more fundamental AI transformations that lead to job cuts. Many manufacturers already have an IT framework agreement, so each tool needs an annex that says for each data source who sees it and why:

| Data source | What it shows | My proposal for the annex |
|---|---|---|
| Claude Code analytics | lines accepted per person and month | access for named admins only, no individual performance assessment |
| GitHub contribution metrics (beta) | pull requests per person with and without Claude Code | keep off while team figures are enough |
| Copilot metrics | usage down to user level | report on team level only |
| Local session transcripts | everything the agent read and wrote | fix a retention period |
| Audit and cost data | who spent which budget when | limit purpose to billing and security |

Two details from the [Claude Code data usage page](https://code.claude.com/docs/en/data-usage) belong in every annex. Claude Code stores session transcripts locally in plaintext for 30 days by default, adjustable with `cleanupPeriodDays`. Commercial accounts have 30-day retention; zero data retention on Enterprise is enabled per organisation by the account team. According to Anthropic, organisations with zero data retention also lose the GitHub contribution metrics, which can make the works council conversation easier.

You do not need per-person data to see whether the tool pays off. Measure cycle time, defect escape and rework per story per team, as described in [measuring AI productivity in Salesforce projects](../measuring-ai-productivity-salesforce-projects/). That commitment is the core of most negotiations.

## What does GDPR require from AI coding tools?

Your data protection officer should settle three points before the first licence is assigned.

**Contract basis.** According to [Anthropic](https://support.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa), its DPA with Standard Contractual Clauses is automatically part of the Commercial Terms. Claude on Bedrock falls under AWS terms, Copilot and Codex under GitHub and OpenAI contracts.

**Training and account type.** Anthropic [does not train on code and prompts](https://code.claude.com/docs/en/data-usage) sent to Claude Code under commercial terms. On Free, Pro and Max, training depends on a user setting, and retention can then be five years. That is why I consider private accounts the worst way around the works council: you swap a solvable co-determination topic for an unsolved data protection one.

**Data in context.** Personal data does not belong in a coding agent's context. For a manufacturer that means no service cases with customer names, no dealer contacts and no technician assignment data from the full copy sandbox. Agents work in scratch orgs and developer sandboxes with anonymised data. The data classes in detail are in [partners coding with AI: what belongs in the contract](../partners-using-ai-coding-contract-rules/).

## EU inference is available through Bedrock, Copilot and OpenAI

GDPR does not require data to stay in the EU; Standard Contractual Clauses cover transfers. Some data protection officers in manufacturing still want EU processing for code with dealer conditions or warranty rules. The options:

- **Anthropic API and Claude plans:** according to the [data residency documentation](https://platform.claude.com/docs/en/manage-claude/data-residency), inference is "us" or "global" only, workspace storage "us" only. US-only inference costs 1.1 times the standard rate. There is no EU option.
- **Claude Code on Amazon Bedrock:** in an `eu-*` region, Claude Code automatically prefers the `eu.` inference profiles, according to [Anthropic](https://code.claude.com/docs/en/amazon-bedrock). Telemetry, error reports and feedback reports to Anthropic are off by default on Bedrock, per the [data usage page](https://code.claude.com/docs/en/data-usage).
- **GitHub Copilot:** with the [data residency policy](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency), inference and data stay in the EU for all generally available features. The policy is off by default and costs 10 percent more AI credits. Claude Opus 5.5 and Sonnet 5.5 are on the EU model list.
- **OpenAI:** API projects with [European data residency](https://openai.com/index/introducing-data-residency-in-europe/) have existed since February 2025, with zero data retention; according to the launch post, existing projects cannot be switched, so check the current docs. Eligible ChatGPT Enterprise customers have had in-region inference since January 2026, according to an update to the same post. The Codex app and CLI are covered according to [OpenAI](https://help.openai.com/en/articles/9903489), Codex Web is not.

The full comparison of the tools by contract, cost and governance is in [Agentforce Vibes, Claude Code, Codex or Copilot?](../agentforce-vibes-claude-code-copilot/). Agentforce agents in HR processes face separate EU AI Act deadlines, see [EU AI Act deadlines for Agentforce](../eu-ai-act-deadlines-agentforce/).

## Worked example: approval before the pilot

Assume a machine builder with its main plant in Germany, a works council, SAP, Sales Cloud, Service Cloud and Field Service, five internal Salesforce developers, two admins and a nearshore partner. All details are assumptions. IT wants Copilot for everyone and Claude Code for two developers who want to use the Salesforce plugin.

```schritte
Inventory | week 1 · IT
  Assume three developers already use private Pro accounts. That is the Hamburg constellation, but code with discount logic is running under consumer terms. IT stops it and announces company accounts.
Works council | week 2 · IT
  IT presents the table above for each tool. The main concern is the per-person lines statistic.
Annex to the IT framework agreement | weeks 3 to 6
  Copilot metrics on team level only, GitHub contribution metrics off, no performance assessment from tool data, local transcripts deleted after 14 days. Data protection decides in parallel: EU residency on in Copilot, Claude Code through Bedrock in an EU region.
Pilot | from week 7
  Copilot and Claude Code start under the rules in the annex, and the partner's developers also work on client licences.
```

The support page lists usage analytics only for Team, Enterprise and Console, so Bedrock is not covered. Cost data then sits in the client's AWS account, and the annex says who sees it.

Six weeks sounds long. A pilot stopped after four weeks costs more.

## Inventory: who uses which AI tool on which account

1. **Take inventory:** who uses which AI tool today, on which account?
2. **Inform the works council early**, with a list of the data each tool produces and who sees it.
3. **Write one annex per tool** to the framework agreement, with the commitment to measure benefit at team level.
4. **Settle data protection:** contract basis, account type, data classes and region.
5. **Enforce it technically:** restrict dashboards, set `cleanupPeriodDays`, enable the EU policy in Copilot.

With this preparation, approval by the works council and data protection takes weeks rather than months, in my judgement. Getting teams and partners to adopt new rules in daily work is part of my [change management](../../services/change-management-salesforce/) work; the framework for roles and review is in [chapter 9 of the masterclass](../../masterclass/ai-salesforce/teamwork-and-delivery/).
