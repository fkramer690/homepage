// Search of the blog overview (src/components/BlogIndex.astro), shared by the browser
// script and the build. Two stages:
//   1. While typing: title, description, tags and topics of every card (already in the
//      HTML), ranked.
//   2. "Search" button or Enter: additionally the full article text. Its word index is
//      split into small files by the first letter of the word (src/pages/blog/suche/,
//      EN src/pages/en/blog/search/), so a search loads only the letters of its words.
// Rules for both: lower case, hyphens and punctuation separate words ("AI-driven" is
// "ai driven"), a search word matches the start of a word ("entwicklung" finds
// "Entwicklungsstandards"), words of up to three letters match whole words only ("ki"
// does not find "Kinder"), and English and German terms find each other (SYNONYMS).
// Articles that contain every word come first; if none does, the articles with the
// most words are shown instead.

/** Words of a text, lower case, split at everything that is not a letter or digit. */
export const tokenize = (text: string): string[] => text.toLowerCase().normalize('NFC').match(/[\p{L}\p{N}]+/gu) ?? [];

// English and German terms that mean the same in this blog. Each search word also
// looks for the other words of its group.
const SYNONYMS: string[][] = [
  ['ai', 'ki'],
  ['development', 'entwicklung'],
  ['developer', 'entwickler'],
  ['driven', 'getrieben', 'gesteuert'],
  ['assisted', 'gestützt', 'unterstützt'],
  ['coding', 'programmierung'],
  ['license', 'lizenz'],
  ['data', 'daten'],
  ['cost', 'kosten'],
  ['price', 'preis'],
  ['pricing', 'preismodell'],
  ['contract', 'vertrag'],
  ['architecture', 'architektur'],
  ['architect', 'architekt'],
  ['manufacturer', 'hersteller'],
  ['manufacturing', 'fertigung', 'produktion'],
  ['requirement', 'anforderung'],
  ['security', 'sicherheit'],
  ['quality', 'qualität'],
  ['permission', 'berechtigung'],
  ['decision', 'entscheidung'],
  ['project', 'projekt'],
  ['customer', 'kunde'],
  ['spare', 'ersatzteil'],
  ['maintenance', 'wartung'],
  ['training', 'schulung'],
];
const synonymsOf = new Map<string, string[]>();
for (const group of SYNONYMS) for (const word of group) synonymsOf.set(word, group);

/** One search word with its alternatives (itself first). */
export type Term = { word: string; forms: string[] };

/** The search words of a query; one-letter words are ignored. */
export function parseQuery(query: string): Term[] {
  const words = [...new Set(tokenize(query).filter((w) => w.length > 1))];
  return words.map((word) => ({ word, forms: [...new Set([word, ...(synonymsOf.get(word) ?? [])])] }));
}

/** Does the word of a text match one form of a search word? */
export function matches(token: string, form: string): boolean {
  if (form.length <= 3) return token === form || token === `${form}s`;
  return token.startsWith(form);
}

/** Index file of a word: its first letter (umlauts as their base letter), digits and others in "0". */
export function shardOf(word: string): string {
  const first = word.normalize('NFD')[0] ?? '';
  return /[a-z]/.test(first) ? first : '0';
}

// Weights: a word in the title counts most, one in the running text least.
export const WEIGHT = { title: 8, tags: 5, desc: 3, body: 1 };

/** Plain text of an article body: Markdown, link targets and content block syntax removed. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/^```.*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(?:[a-z-]+):\s+/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>|`~]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Word index of the article bodies, split by shardOf: word → [article, count, article, count, …]. */
export function bodyIndex(bodies: string[]): Record<string, Record<string, number[]>> {
  const shards: Record<string, Record<string, number[]>> = {};
  bodies.forEach((body, article) => {
    const counts = new Map<string, number>();
    for (const token of tokenize(body)) if (token.length > 1) counts.set(token, (counts.get(token) ?? 0) + 1);
    for (const [token, n] of counts) ((shards[shardOf(token)] ??= {})[token] ??= []).push(article, n);
  });
  return shards;
}

/** Short passage of a text where most search words occur close together, or '' if none is found. */
export function snippet(text: string, terms: Term[], length = 220): string {
  const pattern = markPattern(terms);
  if (!pattern) return '';
  // Every hit with the number of the search word it belongs to.
  const hits: { at: number; term: number }[] = [];
  for (const m of text.matchAll(pattern)) {
    const word = m[1].toLowerCase();
    const term = terms.findIndex((t) => t.forms.some((form) => matches(word, form)));
    if (term >= 0) hits.push({ at: m.index!, term });
  }
  if (!hits.length) return '';
  // The window that starts a little before a hit and holds the most different words.
  let at = hits[0].at;
  let most = 0;
  for (const hit of hits) {
    const words = new Set(hits.filter((h) => h.at >= hit.at && h.at < hit.at + length * 0.6).map((h) => h.term)).size;
    if (words > most) { most = words; at = hit.at; }
  }
  let start = Math.max(0, at - Math.round(length / 4));
  if (start > 0) start = text.indexOf(' ', start) + 1;
  let end = Math.min(text.length, start + length);
  if (end < text.length) end = text.lastIndexOf(' ', end);
  return `${start > 0 ? '… ' : ''}${text.slice(start, end).trim()}${end < text.length ? ' …' : ''}`;
}

/** Pattern that marks every form of the search words in a text (for <mark>). */
export function markPattern(terms: Term[]): RegExp | null {
  const forms = terms.flatMap((t) => t.forms).sort((a, b) => b.length - a.length);
  if (!forms.length) return null;
  const alt = forms.map((f) => `${f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${f.length <= 3 ? 's?(?![\\p{L}\\p{N}])' : '[\\p{L}\\p{N}]*'}`).join('|');
  return new RegExp(`(?<![\\p{L}\\p{N}])(${alt})`, 'giu');
}
