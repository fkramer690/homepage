// "Working with recruiters": content of /partner/recruiter/ (DE) and /en/partners/recruiters/ (EN),
// plus the teaser on the partner page.

export interface RecruiterSection {
  title: string;
  intro?: string;
  items: { t: string; d: string }[];
}

export const recruiterPaths = { de: 'partner/recruiter/', en: 'partners/recruiters/' } as const;

export const recruiters = {
  de: {
    title: 'Freiberuflicher Salesforce Architect: Zusammenarbeit mit Recruitern',
    metaTitle: 'Freiberuflicher Salesforce Architect für Recruiter',
    description:
      'Wie Fabian Kramer als freiberuflicher Salesforce Architect mit Recruitern arbeitet: Profil, Antwortzeit, Einreichung nur mit Freigabe, keine Doppeleinreichungen.',
    eyebrow: 'Partner · Recruiter',
    back: 'Alle Partner',
    lead: 'Ich bin freiberuflicher Salesforce Enterprise Architect mit eigener GmbH in Köln. Viele meiner Projekte kommen über Personaldienstleister zustande, die besten über Recruiter, mit denen ich schon einmal gearbeitet habe. Damit das so bleibt, steht hier, was Sie von mir bekommen, was ich von Ihnen brauche und wo meine Grenzen sind. Wenn beide Seiten das vorher wissen, sparen wir uns die Telefonate, die zu nichts führen.',
    sections: [
      {
        title: 'Wofür Sie mich anfragen können',
        items: [
          { t: 'Architektenrollen mit Verantwortung', d: 'Enterprise, Solution oder Lead Architect in Salesforce-Programmen, am liebsten auf Kundenseite zwischen Fachbereich, IT und mehreren Implementierungspartnern. Dort bringe ich am meisten.' },
          { t: 'Fertigung, Service und After-Sales', d: 'Sales und Service Cloud, Field Service, Experience Cloud, Manufacturing Cloud, CPQ und B2B Commerce. Mein Schwerpunkt ist die Fertigungsindustrie.' },
          { t: 'Partnersteuerung, DevOps und Integration', d: 'Governance über mehrere Partner, Release-Prozesse mit sfdx-hardis auf GitLab, Azure DevOps, GitHub oder Bitbucket, Integration mit SAP und Middleware.' },
          { t: 'Die Eckdaten für Ihr Kundengespräch', d: '8 Jahre Salesforce, mehr als 20 Enterprise-Projekte, 25 Salesforce-Zertifikate, davon 8 Architect. Programme mit bis zu 8 Teams und 32 Entwicklern. Projektsprachen Deutsch und Englisch.' },
        ],
      },
      {
        title: 'Wofür eher nicht',
        intro: 'Ein klares Nein spart Ihnen mehr Zeit als ein vages Vielleicht.',
        items: [
          { t: 'Reine Admin- oder Entwicklerrollen', d: 'Wenn die Rolle keine Architekturentscheidung enthält, gibt es bessere und günstigere Kandidaten. Das sage ich Ihnen offen, und wenn ich jemanden kenne, der passt, auch das.' },
          { t: 'Architekt nur auf dem Papier', d: 'Rollen, in denen ein Implementierungspartner die Architektur längst festgelegt hat und nur noch jemand unterschreiben soll. Das schadet am Ende dem Kunden und meinem Namen.' },
        ],
      },
      {
        title: 'Was Sie von mir bekommen',
        items: [
          { t: 'Antwort innerhalb eines Werktags', d: 'Auch wenn die Antwort Nein ist. Sie sollen bei Ihrem Kunden nicht auf mich warten müssen.' },
          { t: 'Eine ehrliche Einschätzung vor der Einreichung', d: 'Ich sage Ihnen, welche Anforderungen ich erfülle und welche nicht. Dann reichen Sie mich mit Argumenten ein, nicht mit Hoffnung.' },
          { t: 'Ein Profil, das zur Anfrage passt', d: 'Aktuelles Profil auf Deutsch oder Englisch, auf die Anfrage zugeschnitten. Nichts darin, was im Kundengespräch nicht hält.' },
          { t: 'Verfügbarkeit, die stimmt', d: 'Startdatum und Auslastung so, wie ich sie wirklich halten kann. Wenn sich daran etwas ändert, erfahren Sie es zuerst.' },
          { t: 'Loyalität im Projekt', d: 'Wenn der Kunde mich über Sie gefunden hat, laufen Verlängerungen über Sie. Ich wechsle nicht hinter Ihrem Rücken in einen Direktvertrag.' },
        ],
      },
      {
        title: 'Was ich von Ihnen brauche',
        items: [
          { t: 'Den Endkunden', d: 'Ohne Endkunden kann ich Doppeleinreichungen nicht ausschließen. Den Namen behandle ich vertraulich. Wenn Sie ihn noch nicht nennen dürfen, reichen für die erste Einschätzung Branche und Größe.' },
          { t: 'Rolle, Projektphase und Entscheidungsrahmen', d: 'Neueinführung, Rettung oder Betrieb? Wie viele Partner liefern, wer entscheidet? Ein Jobtitel allein sagt wenig darüber, ob ich passe.' },
          { t: 'Laufzeit, Auslastung, Start und Vor-Ort-Anteil', d: 'An diesen Rahmendaten scheitern die meisten Anfragen. Deshalb gehören sie in die erste Nachricht.' },
          { t: 'Den Budgetrahmen', d: 'Nennen Sie ihn gleich. Dann wissen wir beide nach einer Mail, ob es sich lohnt weiterzureden.' },
          { t: 'Rückmeldung nach der Einreichung', d: 'Auch bei einer Absage. Ich will wissen, woran es lag, damit das nächste Profil besser passt.' },
        ],
      },
      {
        title: 'Einreichung und Exklusivität',
        items: [
          { t: 'Keine Einreichung ohne meine Freigabe', d: 'Mein Profil geht nur mit meiner schriftlichen Zustimmung für genau diese Anfrage an einen Kunden. Eine kurze Mail reicht.' },
          { t: 'Pro Anfrage genau ein Recruiter', d: 'Wer mir die Anfrage zuerst mit Endkunden nennt und meine Freigabe hat, vertritt mich. Kommt dieselbe Stelle danach über andere, sage ich offen, dass ich schon vertreten bin.' },
          { t: 'Warum das auch für Sie zählt', d: 'Bei einer Doppeleinreichung sieht der Kunde zwei Preise für dieselbe Person und sortiert meist beide aus. Exklusivität schützt Ihre Marge und meine Chance.' },
        ],
      },
      {
        title: 'Konditionen',
        items: [
          { t: 'Satz pro Anfrage', d: 'Stunden- oder Tagessatz nenne ich pro Anfrage, abhängig von Rolle, Laufzeit und Vor-Ort-Anteil. Eine Preisliste für alle Fälle gibt es nicht.' },
          { t: 'Vertrag mit der GmbH', d: 'Sie schließen den Vertrag mit der FK Solution Design GmbH. Abgerechnet wird monatlich nach Aufwand mit Tätigkeitsnachweis.' },
        ],
      },
      {
        title: 'So läuft eine Anfrage ab',
        items: [
          { t: 'Anfrage mit Rahmendaten', d: 'Per Mail oder über das Formular unten, mit Endkunde, Rolle, Laufzeit, Auslastung, Start und Budget.' },
          { t: 'Antwort innerhalb eines Werktags', d: 'Passt oder passt nicht, dazu Satz und Verfügbarkeit.' },
          { t: 'Freigabe und Profil', d: 'Schriftliche Freigabe für genau diese Anfrage und ein Profil, das auf sie zugeschnitten ist.' },
          { t: 'Gespräch mit dem Kunden', d: 'Ich bereite mich auf das Projekt vor, nicht nur auf meinen Lebenslauf.' },
          { t: 'Vertrag und Start', d: 'Danach bleiben Sie mein Ansprechpartner für alles Vertragliche, auch bei der Verlängerung.' },
        ],
      },
    ] as RecruiterSection[],
    ctaTitle: 'Eine Anfrage, die passt?',
    ctaText: 'Schicken Sie mir die Rahmendaten. Sie bekommen innerhalb eines Werktags eine Antwort, auch wenn sie Nein lautet.',
    formSubject: 'Recruiter-Anfrage',
    teaser: {
      label: 'Für Recruiter',
      title: 'Recruiter und Personaldienstleister',
      text: 'Viele meiner Projekte kommen über Recruiter zustande. Gute Zusammenarbeit hängt dabei an denselben Dingen wie bei jedem anderen Partner: klare Absprachen und Verlässlichkeit. Sie bekommen schnelle Antworten, ein ehrliches Profil und keine Doppeleinreichungen. Ich bekomme Anfragen, die zu meinem Schwerpunkt passen, und offene Karten beim Endkunden.',
      link: 'So arbeite ich mit Recruitern',
    },
  },
  en: {
    title: 'Freelance Salesforce Architect: working with recruiters',
    metaTitle: 'Freelance Salesforce Architect for recruiters',
    description:
      'How Fabian Kramer works with recruiters as a freelance Salesforce architect: profile, response time, submissions only with approval, no double submissions.',
    eyebrow: 'Partners · Recruiters',
    back: 'All partners',
    lead: 'I am a freelance Salesforce Enterprise Architect with my own limited company in Cologne. Many of my projects come through staffing agencies, the best ones through recruiters I have worked with before. To keep it that way, this page says what you get from me, what I need from you and where my limits are. If both sides know this up front, we skip the calls that lead nowhere.',
    sections: [
      {
        title: 'What to contact me for',
        items: [
          { t: 'Architect roles with real responsibility', d: 'Enterprise, solution or lead architect in Salesforce programmes, ideally on the client side between business, IT and several implementation partners. That is where I add the most.' },
          { t: 'Manufacturing, service and after-sales', d: 'Sales and Service Cloud, Field Service, Experience Cloud, Manufacturing Cloud, CPQ and B2B Commerce. My focus is the manufacturing industry.' },
          { t: 'Partner governance, DevOps and integration', d: 'Governance across several partners, release processes with sfdx-hardis on GitLab, Azure DevOps, GitHub or Bitbucket, integration with SAP and middleware.' },
          { t: 'The key facts for your client call', d: '8 years of Salesforce, more than 20 enterprise projects, 25 Salesforce certifications, 8 of them Architect. Programmes with up to 8 teams and 32 developers. Project languages German and English.' },
        ],
      },
      {
        title: 'What not to contact me for',
        intro: 'A clear no saves you more time than a vague maybe.',
        items: [
          { t: 'Pure admin or developer roles', d: 'If the role contains no architecture decisions, there are better and cheaper candidates. I will tell you so, and if I know someone who fits, I will tell you that too.' },
          { t: 'Architect on paper only', d: 'Roles where an implementation partner has already fixed the architecture and someone is only needed to sign it off. In the end that hurts the client and my name.' },
        ],
      },
      {
        title: 'What you get from me',
        items: [
          { t: 'An answer within one working day', d: 'Even if the answer is no. You should never have to keep your client waiting for me.' },
          { t: 'An honest assessment before you submit', d: 'I tell you which requirements I meet and which I do not. Then you submit me with arguments, not with hope.' },
          { t: 'A profile that fits the request', d: 'Current profile in German or English, tailored to the request. Nothing in it that will not hold up in the client interview.' },
          { t: 'Availability you can rely on', d: 'Start date and utilisation as I can actually deliver them. If anything changes, you hear it first.' },
          { t: 'Loyalty in the project', d: 'If the client found me through you, extensions go through you. I do not switch to a direct contract behind your back.' },
        ],
      },
      {
        title: 'What I need from you',
        items: [
          { t: 'The end client', d: 'Without the end client I cannot rule out double submissions. I treat the name confidentially. If you cannot name it yet, industry and size are enough for a first assessment.' },
          { t: 'Role, project phase and decision scope', d: 'New implementation, rescue or run? How many partners deliver, who decides? A job title alone says little about whether I fit.' },
          { t: 'Duration, utilisation, start and on-site share', d: 'Most requests fail on these basics. That is why they belong in the first message.' },
          { t: 'The budget range', d: 'Name it straight away. Then we both know after one email whether it is worth talking further.' },
          { t: 'Feedback after the submission', d: 'Also after a rejection. I want to know why, so the next profile fits better.' },
        ],
      },
      {
        title: 'Submissions and exclusivity',
        items: [
          { t: 'No submission without my approval', d: 'My profile goes to a client only with my written consent for exactly this request. A short email is enough.' },
          { t: 'One recruiter per request', d: 'Whoever brings me the request first, names the end client and has my approval represents me. If the same role reaches me through others later, I tell them openly that I am already represented.' },
          { t: 'Why this matters to you as well', d: 'With a double submission the client sees two prices for the same person and usually drops both. Exclusivity protects your margin and my chance.' },
        ],
      },
      {
        title: 'Terms',
        items: [
          { t: 'Rate per request', d: 'I quote an hourly or daily rate per request, depending on role, duration and on-site share. There is no one-size-fits-all price list.' },
          { t: 'Contract with the company', d: 'You sign the contract with FK Solution Design GmbH. Invoicing is monthly by effort with a timesheet.' },
        ],
      },
      {
        title: 'How a request works',
        items: [
          { t: 'Request with the basics', d: 'By email or through the form below, with end client, role, duration, utilisation, start and budget.' },
          { t: 'Answer within one working day', d: 'Fits or does not fit, plus rate and availability.' },
          { t: 'Approval and profile', d: 'Written approval for exactly this request and a profile tailored to it.' },
          { t: 'Interview with the client', d: 'I prepare for the project, not just for my CV.' },
          { t: 'Contract and start', d: 'After that you remain my contact for everything contractual, including the extension.' },
        ],
      },
    ] as RecruiterSection[],
    ctaTitle: 'A request that fits?',
    ctaText: 'Send me the basics. You get an answer within one working day, even if it is no.',
    formSubject: 'Recruiter request',
    teaser: {
      label: 'For recruiters',
      title: 'Recruiters and staffing agencies',
      text: 'Many of my projects come through recruiters. Working well together depends on the same things as with any other partner: clear agreements and reliability. You get fast answers, an honest profile and no double submissions. I get requests that match my focus and an open view of the end client.',
      link: 'How I work with recruiters',
    },
  },
};
