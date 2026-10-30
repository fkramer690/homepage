// Content blocks for blog articles and masterclass chapters (rules: "Content blocks"
// in docs/blog-guidelines.md, preview in docs/content-blocks.md).
// A block is a fenced code block whose language is the block name, e.g.
//   ```hinweis achtung
//   Text …
//   ```
// Articles stay free of HTML: src/lib/content-blocks-plugin.mjs turns the block into
// markup at build time, scripts/check-blog.mjs validates it with `validateBlock`.
// The diagram block (`ablauf`) is rendered to SVG once with
// `node scripts/render-diagrams.mjs` and stored in src/assets/diagrams/.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { iconHtml } from './icons.mjs';

export const blockNames = ['hinweis', 'praxis', 'kennzahlen', 'zeitleiste', 'ablauf', 'pro-contra', 'vertiefung', 'schritte', 'stufen', 'vergleich', 'hebel', 'eintrag', 'saeulen', 'partnerfluss', 'tabelle', 'staerken-grenzen', 'pipeline', 'saeulenwechsel', 'basis-addons', 'level', 'prozess', 'kette', 'steuerzentrale', 'eisberg'];

const labels = {
  de: {
    tipp: 'Tipp', achtung: 'Achtung', offen: 'Schriftlich bestätigen lassen', praxis: 'Aus meiner Praxis', entry: 'Eintrag',
    quelle: 'Quelle', next: 'nächster Termin', risiko: 'Größtes Risiko', legend: { sf: 'Salesforce', erp: 'ERP', ext: 'angrenzender Prozess' },
    diagram: 'Ablaufdiagramm', grenzen: 'Grenzen', besser: 'Dafür besser', aus: 'aus', gesetzt: 'gesetzt', addon: 'Add-on', level: 'Level', tor: 'Tor',
    ctrl: 'Steuerzentrale', sichtbar: 'Sichtbar', darunter: 'Darunter: die echten Kosten',
  },
  en: {
    tipp: 'Tip', achtung: 'Warning', offen: 'Get it confirmed in writing', praxis: 'From my practice', entry: 'Entry',
    quelle: 'Source', next: 'next date', risiko: 'Biggest risk', legend: { sf: 'Salesforce', erp: 'ERP', ext: 'adjacent process' },
    diagram: 'Flow diagram', grenzen: 'Limits', besser: 'Better suited', aus: 'from', gesetzt: 'given', addon: 'add-on', level: 'Level', tor: 'Gate',
    ctrl: 'Control centre', sichtbar: 'Visible', darunter: 'Below: the real costs',
  },
};
const variants = ['tipp', 'achtung', 'offen'];
const monthsDe = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ---------- parsing ----------

// Finds all content blocks in a Markdown body: [{ name, arg, content, start, end }].
export function findBlocks(body) {
  const out = [];
  const re = /^```([a-z-]+)[ \t]*([^\n]*)\n([\s\S]*?)\n```[ \t]*$/gm;
  for (const m of body.matchAll(re)) {
    if (!blockNames.includes(m[1])) continue;
    out.push({ name: m[1], arg: m[2].trim(), content: m[3], start: m.index, end: m.index + m[0].length });
  }
  return out;
}

const lines = (s) => s.split('\n').map((l) => l.replace(/\s+$/, ''));
const paragraphs = (s) => s.trim().split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
const keyLine = (l, keys) => {
  const m = l.match(/^([a-zäöü]+):\s*(.*)$/i);
  return m && keys.includes(m[1].toLowerCase()) ? { key: m[1].toLowerCase(), value: m[2].trim() } : null;
};

export function parseStats(content) {
  const items = [];
  let source = '';
  let inSource = false;
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    const k = keyLine(l.trim(), ['quelle', 'source']);
    if (k) { source = k.value; inSource = true; continue; }
    if (inSource && /^\s/.test(l)) { source += ` ${l.trim()}`; continue; }
    inSource = false;
    const [value, ...rest] = l.split('|');
    items.push({ value: value.trim(), text: rest.join('|').trim() });
  }
  return { items, source };
}

export function parseTimeline(content) {
  return lines(content).filter((l) => l.trim()).map((l) => {
    const [date, ...rest] = l.split('|');
    return { date: date.trim(), text: rest.join('|').trim() };
  });
}

export function parseProContra(content) {
  const cols = [];
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    const k = keyLine(l.trim(), ['pro', 'contra']);
    if (k) { cols.push({ kind: k.key, title: k.value, items: [] }); continue; }
    const item = l.trim().match(/^[-*]\s+(.*)$/);
    if (item && cols.length) cols[cols.length - 1].items.push(item[1]);
    else if (cols.length && cols[cols.length - 1].items.length) cols[cols.length - 1].items[cols[cols.length - 1].items.length - 1] += ` ${l.trim()}`;
  }
  return cols;
}

export function parseDeep(content) {
  const ls = lines(content);
  let title = '';
  let i = 0;
  while (i < ls.length && !ls[i].trim()) i++;
  const k = ls[i] ? keyLine(ls[i].trim(), ['titel', 'title']) : null;
  if (k) {
    title = k.value;
    i++;
    while (i < ls.length && /^\s+\S/.test(ls[i])) title += ` ${ls[i++].trim()}`;
  }
  return { title, body: ls.slice(i).join('\n').trim() };
}

export function parseSteps(content) {
  const steps = [];
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    if (/^\S/.test(l)) {
      const [title, ...meta] = l.split('|');
      steps.push({ title: title.trim(), meta: meta.join('|').trim(), text: '' });
    } else if (steps.length) {
      steps[steps.length - 1].text = `${steps[steps.length - 1].text} ${l.trim()}`.trim();
    }
  }
  return steps;
}

// Stages: "Letter | Name | Subtitle | Question", a trailing * marks a stage the cases
// below refer to; optional cases "fall: Title | situation | consequence".
// Variant `treppe` (staircase): a fifth field holds the risk, shown in its own row,
// and optional bands "band: 1-2 | Text" (a trailing * makes the band cyan).
export function parseStages(content) {
  const stages = [];
  const cases = [];
  const bands = [];
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['fall', 'case']);
    if (k) {
      const [title, situation, consequence] = k.value.split('|').map((x) => x.trim());
      cases.push({ title, situation, consequence });
      continue;
    }
    const b = keyLine(l, ['band']);
    if (b) {
      const mark = /\*$/.test(b.value);
      const [range, text] = b.value.replace(/\s*\*$/, '').split('|').map((x) => x.trim());
      const m = /^(\d+)\s*-\s*(\d+)$/.exec(range ?? '');
      bands.push({ from: m ? +m[1] : 0, to: m ? +m[2] : 0, text, mark });
      continue;
    }
    const mark = /\*$/.test(l);
    const [letter, name, sub, text, risk] = l.replace(/\s*\*$/, '').split('|').map((x) => x.trim());
    stages.push({ letter, name, sub, text, risk, mark });
  }
  return { stages, cases, bands };
}

// Log entry: "Field | value" rows (trailing * marks one), optional "fazit:" / "note:" line.
export function parseEntry(content) {
  const rows = [];
  let note = '';
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['fazit', 'note']);
    if (k) { note = k.value; continue; }
    const mark = /\*$/.test(l);
    const [field, value] = l.replace(/\s*\*$/, '').split('|').map((x) => x.trim());
    rows.push({ field, value, mark });
  }
  return { rows, note };
}

// Pillars: optional "dach: Title" (EN "roof:"), then "icon | Name | Subtitle | Text" per
// pillar (icon = file name in src/icons/), optional "basis: Title" (EN "base:").
export function parsePillars(content) {
  const out = { roof: '', base: '', pillars: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['dach', 'roof', 'basis', 'base']);
    if (k) { out[['dach', 'roof'].includes(k.key) ? 'roof' : 'base'] = k.value; continue; }
    const [icon, name, sub, text] = l.split('|').map((x) => x.trim());
    out.pillars.push({ icon, name, sub, text });
  }
  return out;
}

// Comparison: "ohne: Title" / "without: Title" and "mit: Title" / "with: Title", each with "- points".
export function parseCompare(content) {
  const cols = [];
  for (const l of lines(content)) {
    if (!l.trim()) continue;
    const k = keyLine(l.trim(), ['ohne', 'without', 'mit', 'with']);
    if (k) { cols.push({ kind: ['ohne', 'without'].includes(k.key) ? 'without' : 'with', title: k.value, items: [] }); continue; }
    const item = l.trim().match(/^[-*]\s+(.*)$/);
    if (item && cols.length) cols[cols.length - 1].items.push(item[1]);
  }
  return cols;
}

// Table: "titel:" (EN "title:"), "spalten: Corner | Column | Column" (EN "columns:"; a
// trailing * marks a whole column, "Name ~ short name" gives phones a shorter label),
// then "Row label | cell | cell" per row (a trailing * marks a cell), optional
// "marke: Word" (EN "mark:") as a tag in every marked cell and "fazit:" (EN "note:").
export function parseTable(content) {
  const out = { title: '', cols: [], rows: [], mark: '', note: '' };
  const cell = (c) => ({ text: c.trim().replace(/\s*\*$/, ''), mark: /\*$/.test(c.trim()) });
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['titel', 'title', 'spalten', 'columns', 'marke', 'mark', 'fazit', 'note']);
    if (k?.key === 'titel' || k?.key === 'title') { out.title = k.value; continue; }
    if (k?.key === 'marke' || k?.key === 'mark') { out.mark = k.value; continue; }
    if (k?.key === 'fazit' || k?.key === 'note') { out.note = k.value; continue; }
    if (k) {
      out.cols = k.value.split('|').map((c) => {
        const { text, mark } = cell(c);
        const [name, short] = text.split('~').map((x) => x.trim());
        return { name, short: short || name, mark };
      });
      continue;
    }
    const [label, ...cells] = l.split('|');
    out.rows.push({ label: label.trim(), cells: cells.map(cell) });
  }
  return out;
}

// Strengths and limits: "titel:" (EN "title:"), "+ Title | text" per strength (a trailing
// * highlights one), "- Title | text" per limit, optional "besser: Text" (EN "better:").
export function parseStrengths(content) {
  const out = { title: '', strengths: [], limits: [], better: '' };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = keyLine(l, ['titel', 'title', 'besser', 'better']);
    if (k) { out[['titel', 'title'].includes(k.key) ? 'title' : 'better'] = k.value; continue; }
    const m = l.match(/^([+-])\s+(.*)$/);
    if (!m) { out.unknown = l; continue; }
    const [title, text] = m[2].replace(/\s*\*$/, '').split('|').map((x) => x.trim());
    out[m[1] === '+' ? 'strengths' : 'limits'].push({ title, text, mark: /\*$/.test(m[2]) });
  }
  return out;
}

// Partner flow: "ohne: Title | caption" and "mit: Title | caption" (EN "without:", "with:").
export function parsePartnerFlow(content) {
  const out = {};
  for (const l of lines(content)) {
    const k = keyLine(l.trim(), ['ohne', 'without', 'mit', 'with']);
    if (!k) continue;
    const [title, caption = ''] = k.value.split('|').map((x) => x.trim());
    out[['ohne', 'without'].includes(k.key) ? 'without' : 'with'] = { title, caption };
  }
  return out;
}

// The four animated explainers (pipeline, saeulenwechsel, basis-addons, level) share
// "titel:" (EN "title:") and "fazit:" (EN "note:"); fazit may appear more than once.
const explainerKey = (l, extra) => keyLine(l, ['titel', 'title', 'fazit', 'note', ...extra]);
const isTitle = (k) => k === 'titel' || k === 'title';
const isNote = (k) => k === 'fazit' || k === 'note';

// Pipeline: "Stage | text" per stage (a trailing * puts the green check on the gate stage;
// the last stage is the target and always highlighted), "schranke:" (EN "gate:") and
// "hotfix:" for the two legend lines.
export function parsePipeline(content) {
  const out = { title: '', stages: [], gate: '', hotfix: '', notes: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = explainerKey(l, ['schranke', 'gate', 'hotfix']);
    if (k) {
      if (isTitle(k.key)) out.title = k.value;
      else if (isNote(k.key)) out.notes.push(k.value);
      else out[k.key === 'hotfix' ? 'hotfix' : 'gate'] = k.value;
      continue;
    }
    const [title, text] = l.replace(/\s*\*$/, '').split('|').map((x) => x.trim());
    out.stages.push({ title, text, mark: /\*$/.test(l) });
  }
  return out;
}

// Pillar shift: "bisher:" (EN "before:") heads the old pillars "alt: Name | term, term"
// (EN "old:"); "titel:" heads the new pillars "Name | Item < Source | Item < Source"
// (a * after the name highlights one pillar). A source made of old terms reads "aus Secure",
// anything else ("Framework 2026") stands as it is.
export function parseShift(content) {
  const out = { before: '', title: '', old: [], pillars: [], notes: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = explainerKey(l, ['bisher', 'before', 'alt', 'old']);
    if (k && isTitle(k.key)) { out.title = k.value; continue; }
    if (k && isNote(k.key)) { out.notes.push(k.value); continue; }
    if (k?.key === 'bisher' || k?.key === 'before') { out.before = k.value; continue; }
    if (k) {
      const [name, terms = ''] = k.value.split('|').map((x) => x.trim());
      out.old.push({ name, terms: terms.split(',').map((x) => x.trim()).filter(Boolean) });
      continue;
    }
    const [head, ...items] = l.split('|').map((x) => x.trim());
    out.pillars.push({ name: head.replace(/\s*\*$/, ''), mark: /\*$/.test(head), items: items.map((it) => {
      const [text, source = ''] = it.split('<').map((x) => x.trim());
      return { text, source };
    }) });
  }
  const terms = new Map(out.old.flatMap((o) => o.terms.map((t) => [t.toLowerCase(), t])));
  for (const p of out.pillars) for (const it of p.items) {
    const parts = it.source.split(',').map((x) => x.trim().toLowerCase()).filter(Boolean);
    it.keys = parts.length && parts.every((x) => terms.has(x)) ? parts : [];
  }
  return out;
}

// Base and add-ons: "basis: Part, Part | text" (EN "base:") for what is set anyway, then
// "+ Name | text" per add-on.
export function parseAddons(content) {
  const out = { title: '', base: null, addons: [], notes: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = explainerKey(l, ['basis', 'base']);
    if (k && isTitle(k.key)) { out.title = k.value; continue; }
    if (k && isNote(k.key)) { out.notes.push(k.value); continue; }
    if (k) {
      const [parts, text] = k.value.split('|').map((x) => x.trim());
      out.base = { parts: parts.split(',').map((x) => x.trim()).filter(Boolean), text };
      continue;
    }
    const m = l.match(/^\+\s+(.*)$/);
    if (!m) { out.unknown = l; continue; }
    const [name, text] = m[1].split('|').map((x) => x.trim());
    out.addons.push({ name, text });
  }
  return out;
}

// Levels: "Name | meta" per level with indented lines as its checklist, "abschluss:"
// (EN "done:") for the badge line under every level. The last level is the highlight.
export function parseLevels(content) {
  const out = { title: '', levels: [], done: '', notes: [] };
  for (const raw of lines(content)) {
    if (!raw.trim()) continue;
    const l = raw.trim();
    const k = /^\S/.test(raw) ? explainerKey(l, ['abschluss', 'done']) : null;
    if (k && isTitle(k.key)) { out.title = k.value; continue; }
    if (k && isNote(k.key)) { out.notes.push(k.value); continue; }
    if (k) { out.done = k.value; continue; }
    if (/^\S/.test(raw)) {
      const [name, meta = ''] = l.split('|').map((x) => x.trim());
      out.levels.push({ name, meta, items: [] });
    } else if (out.levels.length) out.levels[out.levels.length - 1].items.push(l);
  }
  return out;
}

// Process in lanes: "spuren: A | B | C" (EN "lanes:", two or three lanes), then in order
// "phase: Name", steps "Lane | Title | text" (the lane by its name), "tor: text"
// (EN "gate:") for a decision across all lanes and "zurueck: text" (EN "loop:") for a
// way back, attached to the step or gate before it. Optional "ticket: Jira" adds a
// status column: a step's fourth field ("Lane | Title | text | status") or a gate's
// second ("tor: text | status") stands there on the same row.
// "start: 7 | 3" lets a process split into several blocks (one per phase) go on counting:
// its first step is 07, its first gate Tor 3.
export function parseProcess(content) {
  const out = { title: '', lanes: [], ticket: '', start: [1, 1], items: [], notes: [], unknown: '' };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = explainerKey(l, ['spuren', 'lanes', 'ticket', 'start', 'phase', 'tor', 'gate', 'zurueck', 'loop']);
    if (k && isTitle(k.key)) out.title = k.value;
    else if (k && isNote(k.key)) out.notes.push(k.value);
    else if (k?.key === 'spuren' || k?.key === 'lanes') out.lanes = k.value.split('|').map((x) => x.trim()).filter(Boolean);
    else if (k?.key === 'ticket') out.ticket = k.value;
    else if (k?.key === 'start') out.start = k.value.split('|').map((x) => Number.parseInt(x, 10)).concat([1, 1]).slice(0, 2);
    else if (k?.key === 'phase') out.items.push({ kind: 'phase', text: k.value });
    else if (k?.key === 'tor' || k?.key === 'gate') {
      const [text, status = ''] = k.value.split('|').map((x) => x.trim());
      out.items.push({ kind: 'gate', text, status, loops: [] });
    }
    else if (k) { const last = out.items[out.items.length - 1]; if (last?.loops) last.loops.push(k.value); else out.unknown ||= l; }
    else {
      const [lane, title, text = '', status = ''] = l.split('|').map((x) => x.trim());
      out.items.push({ kind: 'step', lane, title, text, status, loops: [] });
    }
  }
  return out;
}

// Chain: "Link | example" per line (three to seven links), shown top to bottom with a
// line between the links, e.g. from a sentence in a workshop to the release note.
export function parseChain(content) {
  const out = { title: '', links: [], notes: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = explainerKey(l, []);
    if (k && isTitle(k.key)) { out.title = k.value; continue; }
    if (k && isNote(k.key)) { out.notes.push(k.value); continue; }
    const [name, text = ''] = l.split('|').map((x) => x.trim());
    out.links.push({ name, text });
  }
  return out;
}

// Control centre: two sides "seite: Name | control centre | Stage, Stage, Stage" (EN "side:"),
// each followed by two "- Role | Name | detail | link label" boxes below it and an optional
// "fazit:" (EN "note:") as the caption of that side.
export function parseControl(content) {
  const out = { title: '', sides: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = explainerKey(l, ['seite', 'side']);
    const side = out.sides[out.sides.length - 1];
    if (k && isTitle(k.key)) { out.title = k.value; continue; }
    if (k && isNote(k.key)) { if (side) side.note = k.value; else out.unknown = l; continue; }
    if (k) {
      const [name, ctrl = '', stages = ''] = k.value.split('|').map((x) => x.trim());
      out.sides.push({ name, ctrl, stages: stages.split(',').map((x) => x.trim()).filter(Boolean), boxes: [], note: '' });
      continue;
    }
    const m = l.match(/^-\s+(.*)$/);
    if (!m || !side) { out.unknown = l; continue; }
    const [role, name, detail = '', link = ''] = m[1].split('|').map((x) => x.trim());
    side.boxes.push({ role, name, detail, link });
  }
  return out;
}

// Iceberg: "sichtbar: Title | text" (EN "visible:") above the waterline, two to five
// "- Title | text | tag" below it, each wider than the one before; a trailing * marks the
// biggest item (anthracite). "fazit:" (EN "note:") for the dashed note.
export function parseIceberg(content) {
  const out = { title: '', tip: null, items: [], notes: [] };
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const k = explainerKey(l, ['sichtbar', 'visible']);
    if (k && isTitle(k.key)) { out.title = k.value; continue; }
    if (k && isNote(k.key)) { out.notes.push(k.value); continue; }
    if (k) { const [title, text = ''] = k.value.split('|').map((x) => x.trim()); out.tip = { title, text }; continue; }
    const m = l.match(/^-\s+(.*?)(\s\*)?$/);
    if (!m) { out.unknown = l; continue; }
    const [title, text = '', tag = ''] = m[1].split('|').map((x) => x.trim());
    out.items.push({ title, text, tag, mark: Boolean(m[2]) });
  }
  return out;
}

// Diagram: "sf: A, B" / "erp: C" / "ext: D" assign nodes to systems; edges are
// "A --> B", "A --Label--> B" (solid) and "A ..> B", "A ..Label..> B" (dashed).
export function parseFlow(content) {
  const groups = { sf: [], erp: [], ext: [] };
  const edges = [];
  for (const raw of lines(content)) {
    const l = raw.trim();
    if (!l) continue;
    const g = keyLine(l, ['sf', 'erp', 'ext']);
    if (g) { groups[g.key].push(...g.value.split(',').map((s) => s.trim()).filter(Boolean)); continue; }
    const m = l.match(/^(.+?)\s+(--|\.\.)(?:(.+?)(?:--|\.\.))?>\s+(.+)$/);
    if (m) edges.push({ from: m[1].trim(), dashed: m[2] === '..', label: (m[3] ?? '').trim(), to: m[4].trim() });
    else edges.push({ error: l });
  }
  const nodes = [...new Set([...groups.sf, ...groups.erp, ...groups.ext, ...edges.flatMap((e) => (e.error ? [] : [e.from, e.to]))])];
  return { groups, edges, nodes };
}

// ---------- validation (used by scripts/check-blog.mjs) ----------

export function validateBlock(block) {
  const errs = [];
  const { name, arg, content } = block;
  const between = (n, min, max, what) => { if (n < min || n > max) errs.push(`${name}: ${n} ${what}, needs ${min} to ${max}`); };
  if (name === 'hinweis') {
    if (!variants.includes(arg)) errs.push(`hinweis: variant must be one of ${variants.join(', ')} (\`\`\`hinweis tipp)`);
    between(paragraphs(content).length, 1, 2, 'paragraphs');
  } else if (name === 'praxis') {
    between(paragraphs(content).length, 1, 2, 'paragraphs');
  } else if (name === 'kennzahlen') {
    const { items, source } = parseStats(content);
    between(items.length, 2, 4, 'figures');
    if (items.some((i) => !i.value || !i.text)) errs.push('kennzahlen: every line needs "value | description"');
    if (!source) errs.push('kennzahlen: add a "quelle:" (DE) or "source:" (EN) line');
  } else if (name === 'zeitleiste') {
    const items = parseTimeline(content);
    between(items.length, 3, 7, 'entries');
    for (const i of items) {
      if (!i.text) errs.push(`zeitleiste: "${i.date}" needs "date | text"`);
      if (!/^\d{4}-\d{2}(-\d{2})?$/.test(i.date) && !/^(Spring|Summer|Winter) '\d\d$/.test(i.date)) errs.push(`zeitleiste: date "${i.date}" must be YYYY-MM-DD, YYYY-MM or a release name like Summer '27`);
    }
  } else if (name === 'ablauf') {
    const { groups, edges, nodes } = parseFlow(content);
    for (const e of edges) if (e.error) errs.push(`ablauf: cannot read "${e.error}", use "A --> B", "A --Label--> B" or "A ..> B"`);
    between(nodes.length, 3, 8, 'nodes');
    const grouped = new Set([...groups.sf, ...groups.erp, ...groups.ext]);
    for (const n of nodes) if (!grouped.has(n)) errs.push(`ablauf: node "${n}" is in no group (sf:, erp: or ext:)`);
  } else if (name === 'pro-contra') {
    const cols = parseProContra(content);
    if (cols.length !== 2 || cols[0].kind !== 'pro' || cols[1].kind !== 'contra') errs.push('pro-contra: needs a "pro: Title" column followed by a "contra: Title" column');
    for (const c of cols) between(c.items.length, 2, 5, `points in "${c.title}"`);
  } else if (name === 'hebel') {
    const levers = parseSteps(content);
    between(levers.length, 2, 3, 'levers');
    if (levers.some((l) => !l.title || !l.meta || !l.text)) errs.push('hebel: every lever needs "Title | effect" and an indented description line');
  } else if (name === 'vertiefung') {
    const { title, body } = parseDeep(content);
    if (!arg) errs.push('vertiefung: add a label after the name (```vertiefung Für Entwickler)');
    if (!title) errs.push('vertiefung: first line must be "titel:" (DE) or "title:" (EN)');
    if (!body) errs.push('vertiefung: text missing');
  } else if (name === 'schritte') {
    const steps = parseSteps(content);
    between(steps.length, 3, 6, 'steps');
    if (steps.some((s) => !s.text)) errs.push('schritte: every step needs an indented description line');
  } else if (name === 'stufen') {
    const { stages, cases, bands } = parseStages(content);
    if (arg && arg !== 'treppe') errs.push('stufen: the only variant is treppe (```stufen treppe)');
    between(stages.length, 3, 7, 'stages');
    if (arg === 'treppe') {
      if (stages.some((x) => !x.letter || !x.name || !x.sub || !x.text || !x.risk)) errs.push('stufen treppe: every stage needs "Number | Name | Subtitle | Description | Risk"');
      between(bands.length, 0, 3, 'bands');
      if (bands.some((x) => !x.text || x.from < 1 || x.to < x.from || x.to > stages.length)) errs.push('stufen treppe: every band needs "band: 1-2 | Text" within the stages');
    } else {
      if (stages.some((x) => !x.letter || !x.name || !x.sub || !x.text)) errs.push('stufen: every stage needs "Letter | Name | Subtitle | Question"');
      if (bands.length) errs.push('stufen: bands only work in the variant treppe');
    }
    between(cases.length, 0, 3, 'cases');
    if (cases.some((c) => !c.title || !c.situation || !c.consequence)) errs.push('stufen: every case needs "fall: Title | situation | consequence"');
  } else if (name === 'saeulen') {
    const { pillars } = parsePillars(content);
    between(pillars.length, 3, 5, 'pillars');
    if (pillars.some((x) => !x.icon || !x.name || !x.sub || !x.text)) errs.push('saeulen: every pillar needs "icon | Name | Subtitle | Text"');
    for (const x of pillars) if (x.icon && !existsSync(new URL(`../icons/${x.icon}.svg`, import.meta.url))) errs.push(`saeulen: icon "${x.icon}" is not in src/icons/`);
  } else if (name === 'eintrag') {
    const { rows } = parseEntry(content);
    if (!arg) errs.push('eintrag: add a title after the name (```eintrag Entscheidungslog)');
    between(rows.length, 2, 6, 'rows');
    if (rows.some((r) => !r.field || !r.value)) errs.push('eintrag: every row needs "Field | value"');
    if (rows.filter((r) => r.mark).length > 1) errs.push('eintrag: mark at most one row with *');
  } else if (name === 'partnerfluss') {
    const { without, with: withArch } = parsePartnerFlow(content);
    if (!['architekt', 'architect', 'review'].includes(arg)) errs.push('partnerfluss: variant must be architekt (EN architect) or review (```partnerfluss review)');
    if (!without?.title || !without?.caption) errs.push('partnerfluss: needs "ohne: Title | caption" (EN "without:")');
    if (!withArch?.title || !withArch?.caption) errs.push('partnerfluss: needs "mit: Title | caption" (EN "with:")');
  } else if (name === 'vergleich') {
    const cols = parseCompare(content);
    if (cols.length !== 2 || cols[0].kind !== 'without' || cols[1].kind !== 'with') errs.push('vergleich: needs an "ohne: Title" column followed by a "mit: Title" column');
    for (const c of cols) between(c.items.length, 2, 5, `points in "${c.title}"`);
  } else if (name === 'hebel') {
    const levers = parseSteps(content);
    between(levers.length, 2, 3, 'levers');
    if (levers.some((l) => !l.title || !l.meta || !l.text)) errs.push('hebel: every lever needs "Title | effect" and an indented description line');
  } else if (name === 'tabelle') {
    const { title, cols, rows } = parseTable(content);
    if (arg && arg !== 'matrix') errs.push('tabelle: the only variant is matrix (```tabelle matrix)');
    if (!title) errs.push('tabelle: add a "titel:" (DE) or "title:" (EN) line');
    between(cols.length - 1, 2, 4, 'columns');
    between(rows.length, 2, 8, 'rows');
    for (const r of rows) if (r.cells.length !== cols.length - 1 || !r.label || r.cells.some((c) => !c.text)) errs.push(`tabelle: row "${r.label}" needs a label and one filled cell per column`);
    if (arg === 'matrix' && rows.some((r) => !r.cells.some((c) => c.mark))) errs.push('tabelle matrix: mark the responsible cell of every row with *');
  } else if (name === 'staerken-grenzen') {
    const { title, strengths, limits, unknown } = parseStrengths(content);
    if (!title) errs.push('staerken-grenzen: add a "titel:" (DE) or "title:" (EN) line');
    if (unknown) errs.push(`staerken-grenzen: cannot read "${unknown}", use "+ Title | text" or "- Title | text"`);
    between(strengths.length, 2, 4, 'strengths');
    between(limits.length, 2, 6, 'limits');
    if ([...strengths, ...limits].some((x) => !x.title || !x.text)) errs.push('staerken-grenzen: every line needs "Title | text"');
    if (strengths.filter((x) => x.mark).length > 1 || limits.some((x) => x.mark)) errs.push('staerken-grenzen: mark at most one strength with *');
  } else if (name === 'pipeline') {
    const { title, stages, gate, hotfix } = parsePipeline(content);
    if (!title) errs.push('pipeline: add a "titel:" (DE) or "title:" (EN) line');
    between(stages.length, 3, 6, 'stages');
    if (stages.some((x) => !x.title || !x.text)) errs.push('pipeline: every stage needs "Stage | text"');
    if (stages.filter((x) => x.mark).length > 1) errs.push('pipeline: mark at most one stage (the gate) with *');
    if (!gate || !hotfix) errs.push('pipeline: needs a "schranke:" (EN "gate:") and a "hotfix:" line');
  } else if (name === 'saeulenwechsel') {
    const { before, title, old, pillars } = parseShift(content);
    if (!before || !title) errs.push('saeulenwechsel: needs a "bisher:" (EN "before:") and a "titel:" (EN "title:") line');
    between(old.length, 2, 4, 'old pillars');
    between(pillars.length, 3, 6, 'new pillars');
    if (old.some((o) => !o.name || !o.terms.length)) errs.push('saeulenwechsel: every old pillar needs "alt: Name | term, term"');
    for (const p of pillars) {
      if (!p.name || p.items.length < 1 || p.items.length > 5) errs.push(`saeulenwechsel: pillar "${p.name}" needs a name and 1 to 5 items`);
      if (p.items.some((it) => !it.text || !it.source)) errs.push(`saeulenwechsel: every item of "${p.name}" needs "Item < Source"`);
    }
    if (pillars.filter((p) => p.mark).length > 1) errs.push('saeulenwechsel: mark at most one pillar with *');
  } else if (name === 'basis-addons') {
    const { title, base, addons, unknown } = parseAddons(content);
    if (!title) errs.push('basis-addons: add a "titel:" (DE) or "title:" (EN) line');
    if (!base?.parts.length || !base?.text) errs.push('basis-addons: needs "basis: Part, Part | text" (EN "base:")');
    if (unknown) errs.push(`basis-addons: cannot read "${unknown}", use "+ Name | text"`);
    between(addons.length, 2, 4, 'add-ons');
    if (addons.some((a) => !a.name || !a.text)) errs.push('basis-addons: every add-on needs "+ Name | text"');
  } else if (name === 'level') {
    const { title, levels, done } = parseLevels(content);
    if (!title) errs.push('level: add a "titel:" (DE) or "title:" (EN) line');
    if (!done) errs.push('level: add an "abschluss:" (EN "done:") line for the badge');
    between(levels.length, 2, 4, 'levels');
    for (const x of levels) if (!x.name || !x.meta || x.items.length < 2 || x.items.length > 5) errs.push(`level: "${x.name}" needs "Name | meta" and 2 to 5 indented lines`);
  } else if (name === 'prozess') {
    const { title, lanes, ticket, start, items, unknown } = parseProcess(content);
    const steps = items.filter((x) => x.kind === 'step');
    if (!title) errs.push('prozess: add a "titel:" (DE) or "title:" (EN) line');
    between(lanes.length, 2, 3, 'lanes ("spuren: A | B | C", EN "lanes:")');
    between(steps.length, 2, 16, 'steps');
    between(items.filter((x) => x.kind === 'gate').length, 0, 6, 'gates');
    between(items.filter((x) => x.kind === 'phase').length, 0, 4, 'phases');
    if (unknown) errs.push(`prozess: "${unknown}" has no step or gate before it`);
    for (const x of steps) {
      if (!x.title || !x.text) errs.push(`prozess: step "${x.title || x.lane}" needs "Lane | Title | text"`);
      if (!lanes.includes(x.lane)) errs.push(`prozess: lane "${x.lane}" is not in the "spuren:" line`);
    }
    if (items[0]?.kind === 'gate') errs.push('prozess: start with a phase or a step, not a gate');
    if (!ticket && items.some((x) => x.status)) errs.push('prozess: a status needs a "ticket:" line naming the status column');
    if (start.some((n) => !Number.isInteger(n) || n < 1)) errs.push('prozess: "start:" needs "step | gate" as whole numbers, e.g. "start: 7 | 3"');
  } else if (name === 'kette') {
    const { title, links } = parseChain(content);
    if (!title) errs.push('kette: add a "titel:" (DE) or "title:" (EN) line');
    between(links.length, 3, 7, 'links');
    if (links.some((x) => !x.name || !x.text)) errs.push('kette: every link needs "Link | example"');
  } else if (name === 'steuerzentrale') {
    const { title, sides, unknown } = parseControl(content);
    if (!title) errs.push('steuerzentrale: add a "titel:" (DE) or "title:" (EN) line');
    if (unknown) errs.push(`steuerzentrale: cannot read "${unknown}"`);
    between(sides.length, 2, 2, 'sides ("seite:" / "side:")');
    for (const x of sides) {
      if (!x.name || !x.ctrl) errs.push('steuerzentrale: every side needs "Name | control centre | Stage, Stage"');
      if (x.stages.length < 2 || x.stages.length > 4) errs.push(`steuerzentrale: "${x.name}" needs 2 to 4 stages`);
      if (x.boxes.length !== 2) errs.push(`steuerzentrale: "${x.name}" needs exactly two "- Role | Name | detail | link" boxes`);
      if (x.boxes.some((b) => !b.role || !b.name || !b.link)) errs.push(`steuerzentrale: every box of "${x.name}" needs role, name and link label`);
    }
  } else if (name === 'eisberg') {
    const { title, tip, items, unknown } = parseIceberg(content);
    if (!title) errs.push('eisberg: add a "titel:" (DE) or "title:" (EN) line');
    if (!tip?.title) errs.push('eisberg: add a "sichtbar:" (DE) or "visible:" (EN) line');
    if (unknown) errs.push(`eisberg: cannot read "${unknown}"`);
    between(items.length, 2, 5, 'items below the waterline');
    if (items.some((x) => !x.title || !x.text)) errs.push('eisberg: every item needs "- Title | text | tag"');
    if (items.filter((x) => x.mark).length > 1) errs.push('eisberg: mark at most one item with *');
  }
  return errs;
}

// Prose of a block, for word counts and the wording checks in check-blog.
export function blockProse(block) {
  return block.content
    .replace(/^\s*(quelle|source|titel|title|pro|contra|sf|erp|ext|fall|case|band|ohne|without|mit|with|fazit|note|dach|roof|basis|base|spalten|columns|marke|mark|besser|better|schranke|gate|hotfix|bisher|before|alt|old|abschluss|done|spuren|lanes|ticket|start|phase|tor|zurueck|loop|seite|side|sichtbar|visible):\s*/gim, '')
    .replace(/\s\*(?=\s*(\||$))/gm, '')
    .replace(/(--|\.\.)>?/g, ' ')
    .replace(/\s<\s/g, ' ')
    .replace(/\|/g, ' ');
}

// Hash of a diagram block; the SVG lives in src/assets/diagrams/<hash>.svg.
export const flowHash = (content) => createHash('sha1').update(content.trim()).digest('hex').slice(0, 12);

// Mermaid source of a diagram block (rendered by scripts/render-diagrams.mjs).
// `direction` is LR (left to right) or TB (top to bottom); scripts/render-diagrams.mjs
// switches to TB when a left-to-right layout would be too wide to read.
export function flowToMermaid(content, direction = 'LR') {
  const { groups, edges, nodes } = parseFlow(content);
  const id = new Map(nodes.map((n, i) => [n, `n${i}`]));
  const esc = (s) => s.replace(/"/g, "'");
  const out = [
    '%%{init: {"theme": "base", "themeVariables": {"fontFamily": "Sora, system-ui, sans-serif", "fontSize": "14px", "lineColor": "#5a5a5e", "primaryTextColor": "#232325", "edgeLabelBackground": "#ffffff"}, "htmlLabels": false, "flowchart": {"curve": "basis", "nodeSpacing": 30, "rankSpacing": 40, "padding": 14, "htmlLabels": false, "wrappingWidth": 400}}}%%',
    `flowchart ${direction}`,
  ];
  for (const n of nodes) {
    const shape = [`["`, `"]`];
    out.push(`  ${id.get(n)}${shape[0]}${esc(n)}${shape[1]}`);
  }
  for (const e of edges) {
    if (e.error) continue;
    // Edge labels are set in the mono font later (scripts/render-diagrams.mjs), which runs
    // wider than Sora; the no-break spaces make Mermaid reserve room for that.
    const text = e.label && `${'\u00a0'.repeat(3)}${esc(e.label)}${'\u00a0'.repeat(3)}`;
    const arrow = e.dashed ? (e.label ? `-. "${text}" .->` : '-.->') : (e.label ? `-- "${text}" -->` : '-->');
    out.push(`  ${id.get(e.from)} ${arrow} ${id.get(e.to)}`);
  }
  out.push('  classDef sf fill:#eaf6fc,stroke:#1ba1e2,stroke-width:2px,color:#232325');
  out.push('  classDef erp fill:#232325,stroke:#232325,color:#ffffff');
  out.push('  classDef ext fill:#ffffff,stroke:#5a5a5e,stroke-dasharray:4 3,color:#232325');
  for (const g of ['sf', 'erp', 'ext']) if (groups[g].length) out.push(`  class ${groups[g].map((n) => id.get(n)).join(',')} ${g}`);
  return out.join('\n');
}

// ---------- rendering (used by src/lib/content-blocks-plugin.mjs) ----------

const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline Markdown inside blocks: **bold**, `code` and [links](url).
export function inline(s, { lang, isExternal }) {
  const ext = lang === 'de' ? '(öffnet in einem neuen Tab)' : '(opens in a new tab)';
  return escHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
      const url = href.replace(/&amp;/g, '&');
      if (isExternal(url)) {
        return `<a href="${escHtml(url)}" target="_blank" rel="noopener">${text}${iconHtml('external', 'ext-mark')}<span class="visually-hidden"> ${ext}</span></a>`;
      }
      return `<a href="${escHtml(url)}">${text}</a>`;
    });
}

const paras = (s, o) => paragraphs(s).map((p) => (/^[-*]\s/.test(p) ? `<ul>${p.split(/\s(?=[-*]\s)/).map((li) => `<li>${inline(li.replace(/^[-*]\s+/, ''), o)}</li>`).join('')}</ul>` : `<p>${inline(p, o)}</p>`)).join('');
const label = (text) => `<p class="cb-label">${escHtml(text)}</p>`;

function formatDate(d, lang) {
  let m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return lang === 'de' ? `${m[3]}.${m[2]}.${m[1]}` : `${+m[3]} ${monthsEn[+m[2] - 1]} ${m[1]}`;
  m = d.match(/^(\d{4})-(\d{2})$/);
  if (m) return lang === 'de' ? `${monthsDe[+m[2] - 1]} ${m[1]}` : `${monthsEn[+m[2] - 1]} ${m[1]}`;
  return d;
}
function sortKey(d) {
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(d)) return d.length === 7 ? `${d}-01` : d;
  const m = d.match(/^(Spring|Summer|Winter) '(\d\d)$/);
  if (!m) return d;
  const year = 2000 + +m[2];
  return m[1] === 'Spring' ? `${year}-02-15` : m[1] === 'Summer' ? `${year}-06-15` : `${year - 1}-10-15`;
}

const icon = { check: iconHtml('tick'), cross: iconHtml('cross') };

// Dashed closing line of the animated explainers; **Label:** turns cyan.
const explainerNotes = (notes, o) => (notes.length ? `<p class="cx-foot">${notes.map((n) => `<span>${inline(n, o)}</span>`).join(' ')}</p>` : '');

// ---------- partner flow drawing (```partnerfluss) ----------
// Two animated panels: without a central owner every partner delivers on its own,
// crossing path into the org; with one, everything runs through the architect (or the
// review) and arrives as one checked stream. Labels in IBM Plex Mono, checked by
// scripts/check-graphics.mjs (class pf-drawing). Animation under "Partner flow" in
// global.css; prefers-reduced-motion shows the still picture.
const pfText = {
  de: {
    partners: ['Partner A', 'Partner B', 'Partner C', 'Interne IT'], org: ['Salesforce', 'Org'],
    hub: { architekt: ['Architekt', 'Review · Standards'], review: ['Review', 'Tests · Standards'] },
    without: 'Drei Partner und die interne IT liefern auf eigenen, sich kreuzenden Wegen in die Salesforce-Org. An den Kreuzungen entstehen Konflikte.',
    with: { architekt: 'Alle Partner und die interne IT liefern über den Architekten. Von dort geht ein geprüfter Strom in die Salesforce-Org.', review: 'Alle Partner und die interne IT liefern über ein Review. Von dort geht ein geprüfter Strom in die Salesforce-Org.' },
  },
  en: {
    partners: ['Partner A', 'Partner B', 'Partner C', 'Internal IT'], org: ['Salesforce', 'org'],
    hub: { architekt: ['Architect', 'Review · standards'], review: ['Review', 'Tests · standards'] },
    without: 'Three partners and the internal IT deliver into the Salesforce org on their own, crossing paths. Conflicts arise where they cross.',
    with: { architekt: 'All partners and the internal IT deliver through the architect. From there one checked stream reaches the Salesforce org.', review: 'All partners and the internal IT deliver through a review. From there one checked stream reaches the Salesforce org.' },
  },
};

function partnerFlowSvg(kind, arg, lang) {
  const t = pfText[lang];
  const variant = arg === 'review' ? 'review' : 'architekt';
  const txt = (x, y, s, size = 13, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle"${extra}>${escHtml(s)}</text>`;
  const nodes = t.partners.map((p, i) => `<rect class="pf-node" x="6" y="${20 + 68 * i}" width="96" height="36" rx="6" />${txt(54, 42 + 68 * i, p)}`).join('');
  const org = (cls) => `<rect class="${cls}" x="286" y="116" width="88" height="60" rx="8" />${txt(330, 142, t.org[0], 13, ' font-weight="600"')}${txt(330, 160, t.org[1], 13, ' font-weight="600"')}`;
  if (kind === 'without') {
    const paths = ['M102 38 L215 210 L286 162', 'M102 106 L185 50 L286 130', 'M102 174 L240 92 L286 150', 'M102 242 L200 150 L286 140']
      .map((d, i) => `<path class="pf-path pf-march pf-m${i + 1}" d="${d}" />`).join('');
    const warns = [[166, 136], [185, 164], [238, 93]]
      .map(([x, y], i) => `<g class="pf-warn pf-w${i + 1}"><circle cx="${x}" cy="${y}" r="8" /><path d="M${x} ${y - 4} v4.5 M${x} ${y + 3.2} v0.3" /></g>`).join('');
    const dots = ['pf-cA', 'pf-cC', 'pf-cD'].map((c) => `<circle class="pf-dot pf-dot-grey ${c}" cx="0" cy="0" r="4" />`).join('');
    return `<svg class="pf-drawing" viewBox="0 0 380 290" role="img" aria-label="${escHtml(t.without)}">${paths}${nodes}${org('pf-org pf-org-warn')}${warns}${dots}</svg>`;
  }
  const [hub, sub] = t.hub[variant];
  const lines = [[38, 134], [106, 140], [174, 152], [242, 158]].map(([y1, y2]) => `<path class="pf-path-on" d="M102 ${y1} L150 ${y2}" />`).join('');
  const dots = ['pf-pA', 'pf-pB', 'pf-pC', 'pf-pD', 'pf-out'].map((c) => `<circle class="pf-dot ${c}" cx="0" cy="0" r="${c === 'pf-out' ? 5 : 4}" />`).join('');
  return `<svg class="pf-drawing" viewBox="0 0 380 290" role="img" aria-label="${escHtml(t.with[variant])}">${lines}<path class="pf-main" d="M234 146 H286" />${nodes}<rect class="pf-hub-ping" x="150" y="122" width="84" height="48" rx="24" /><rect class="pf-hub" x="150" y="122" width="84" height="48" rx="24" />${txt(192, 150, hub, 13, ' font-weight="600" class="pf-hub-label"')}${txt(192, 210, sub, 11, ' class="pf-sub"')}${org('pf-org pf-org-ok')}<g class="pf-ok"><circle cx="366" cy="116" r="10" /><path d="M361 116 l3.5 3.5 l7 -7" /></g>${dots}</svg>`;
}

// HTML of one block. `readDiagram(hash)` returns the stored SVG or undefined.
export function renderBlock(block, { lang, isExternal, readDiagram, today = new Date().toISOString().slice(0, 10) }) {
  const t = labels[lang];
  const o = { lang, isExternal };
  const { name, arg, content } = block;
  if (name === 'hinweis') {
    return `<aside class="cb cb-card cb-note cb-note-${arg}">${label(t[arg] ?? arg)}${paras(content, o)}</aside>`;
  }
  if (name === 'praxis') {
    return `<aside class="cb cb-practice">${label(t.praxis)}${paras(content, o)}</aside>`;
  }
  if (name === 'kennzahlen') {
    const { items, source } = parseStats(content);
    return `<figure class="cb cb-stats"><div class="cb-stats-grid">${items.map((i) => `<div class="cb-card cb-stat"><p class="cb-stat-value">${inline(i.value, o)}</p><p class="cb-stat-text">${inline(i.text, o)}</p></div>`).join('')}</div><figcaption>${escHtml(t.quelle)}: ${inline(source, o)}</figcaption></figure>`;
  }
  if (name === 'zeitleiste') {
    const items = parseTimeline(content).map((i) => ({ ...i, key: sortKey(i.date) })).sort((a, b) => a.key.localeCompare(b.key));
    const next = items.find((i) => i.key >= today);
    return `<ol class="cb cb-timeline">${items.map((i) => `<li${i === next ? ' class="cb-now"' : ''}><time datetime="${escHtml(/^\d{4}-/.test(i.date) ? i.date : i.key)}">${escHtml(formatDate(i.date, lang))}${i === next ? ` · ${t.next}` : ''}</time><span>${inline(i.text, o)}</span></li>`).join('')}</ol>`;
  }
  if (name === 'ablauf') {
    const svg = readDiagram(flowHash(content));
    if (!svg) throw new Error(`Diagram ${flowHash(content)} is not rendered yet, run: node scripts/render-diagrams.mjs`);
    // A left-to-right diagram comes with a top-to-bottom twin for phones (see global.css).
    const tb = readDiagram(`${flowHash(content)}-tb`);
    const drawing = tb ? `<div class="cb-flow-lr">${svg}</div><div class="cb-flow-tb">${tb}</div>` : svg;
    const { groups } = parseFlow(content);
    const legend = ['sf', 'erp', 'ext'].filter((g) => groups[g].length).map((g) => `<span><i class="cb-lg-${g}"></i>${escHtml(t.legend[g])}</span>`).join('');
    const summary = parseFlow(content).edges.filter((e) => !e.error).map((e) => `${e.from} → ${e.to}${e.label ? ` (${e.label})` : ''}`).join('; ');
    return `<figure class="cb cb-flow"><div class="cb-flow-svg" role="img" aria-label="${escHtml(`${t.diagram}: ${summary}`)}">${drawing}</div><figcaption class="cb-legend">${legend}</figcaption></figure>`;
  }
  if (name === 'pro-contra') {
    return `<div class="cb cb-procon">${parseProContra(content).map((c) => `<div class="cb-card cb-${c.kind}"><p class="cb-procon-title">${inline(c.title, o)}</p><ul>${c.items.map((i) => `<li>${c.kind === 'pro' ? icon.check : icon.cross}<span>${inline(i, o)}</span></li>`).join('')}</ul></div>`).join('')}</div>`;
  }
  if (name === 'vertiefung') {
    const { title, body } = parseDeep(content);
    return `<details class="cb cb-deep"><summary>${label(arg)}<span class="cb-deep-title">${inline(title, o)}</span></summary><div class="cb-deep-body">${paras(body, o)}</div></details>`;
  }
  if (name === 'schritte') {
    return `<ol class="cb cb-steps">${parseSteps(content).map((s, i) => `<li><span class="cb-step-no">${String(i + 1).padStart(2, '0')}</span><div><p class="cb-step-title">${inline(s.title, o)}</p>${s.meta ? `<p class="cb-step-meta">${inline(s.meta, o)}</p>` : ''}<p class="cb-step-text">${inline(s.text, o)}</p></div></li>`).join('')}</ol>`;
  }
  if (name === 'stufen' && arg === 'treppe') {
    const { stages, cases, bands } = parseStages(content);
    const n = stages.length;
    const tiles = stages.map((x, i) => `<li class="cb-stair${x.mark ? ' cb-stage-mark' : ''}" style="--i:${i}"><span class="cb-stage-letter">${escHtml(x.letter)}</span><span class="cb-stage-name">${inline(x.name, o)}</span><span class="cb-stage-text">${inline(x.text, o)}</span><span class="cb-stage-sub">${inline(x.sub, o)}</span></li><li class="cb-stair-risk" style="--i:${i}"><span class="cb-stair-risk-label">${escHtml(t.risiko)}</span>${inline(x.risk, o)}</li>`).join('');
    const bandRow = bands.length ? `<div class="cb-bands">${bands.map((b) => `<p class="cb-band${b.mark ? ' cb-band-mark' : ''}" style="grid-column:${b.from} / ${b.to + 1}">${inline(b.text, o)}</p>`).join('')}</div>` : '';
    const list = cases.length ? `<div class="cb-cases">${cases.map((c) => `<div class="cb-case"><p class="cb-case-title">${inline(c.title, o)}</p><p>${inline(c.situation, o)}</p><p class="cb-case-then">${inline(c.consequence, o)}</p></div>`).join('')}</div>` : '';
    return `<div class="cb cb-stage-block cb-stairs-block" style="--n:${n}"><ol class="cb-stairs">${tiles}</ol>${bandRow}${list}</div>`;
  }
  if (name === 'stufen') {
    const { stages, cases } = parseStages(content);
    const tiles = `<ol class="cb-stages" style="--n:${stages.length}">${stages.map((x) => `<li${x.mark ? ' class="cb-stage-mark"' : ''}><span class="cb-stage-head"><span class="cb-stage-letter">${escHtml(x.letter)}</span><span class="cb-stage-name">${inline(x.name, o)}</span></span><span class="cb-stage-body"><span class="cb-stage-sub">${inline(x.sub, o)}</span><span class="cb-stage-text">${inline(x.text, o)}</span></span></li>`).join('')}</ol>`;
    const list = cases.length ? `<div class="cb-cases">${cases.map((c) => `<div class="cb-case"><p class="cb-case-title">${inline(c.title, o)}</p><p>${inline(c.situation, o)}</p><p class="cb-case-then">${inline(c.consequence, o)}</p></div>`).join('')}</div>` : '';
    return `<div class="cb cb-stage-block">${tiles}${list}</div>`;
  }
  if (name === 'saeulen') {
    const { roof, base, pillars } = parsePillars(content);
    const cols = pillars.map((x, i) => `<li style="--i:${i}"><span class="cb-pillar-head">${iconHtml(x.icon, 'cb-pillar-icon')}<span class="cb-pillar-no">${String(i + 1).padStart(2, '0')}</span></span><span class="cb-pillar-name">${inline(x.name, o)}</span><span class="cb-pillar-sub">${inline(x.sub, o)}</span><span class="cb-pillar-text">${inline(x.text, o)}</span></li>`).join('');
    return `<div class="cb cb-pillars${roof ? ' cb-pillars-roofed' : ''}" style="--n:${pillars.length}">${roof ? `<p class="cb-pillar-roof">${inline(roof, o)}</p>` : ''}<ol>${cols}</ol>${base ? `<p class="cb-pillar-base">${inline(base, o)}</p>` : ''}</div>`;
  }
  if (name === 'hebel') {
    return `<div class="cb cb-levers">${parseSteps(content).map((s, i) => `<div class="cb-lever"><p class="cb-lever-no">${lang === 'de' ? 'Hebel' : 'Lever'} ${String(i + 1).padStart(2, '0')}</p><p class="cb-lever-title">${inline(s.title, o)}</p><p class="cb-lever-text">${inline(s.text, o)}</p>${s.meta ? `<p class="cb-lever-effect">${inline(s.meta, o)}</p>` : ''}</div>`).join('')}</div>`;
  }
  if (name === 'eintrag') {
    const { rows, note } = parseEntry(content);
    return `<div class="cb cb-entry"><p class="cb-entry-head"><span>${inline(arg, o)}</span><span>${t.entry}</span></p><dl>${rows.map((r) => `<div${r.mark ? ' class="cb-entry-mark"' : ''}><dt>${inline(r.field, o)}</dt><dd>${inline(r.value, o)}</dd></div>`).join('')}</dl>${note ? `<p class="cb-entry-note">${inline(note, o)}</p>` : ''}</div>`;
  }
  if (name === 'partnerfluss') {
    const { without, with: withArch } = parsePartnerFlow(content);
    return `<figure class="cb cb-partnerflow"><div class="cb-pf-col cb-pf-without"><p class="cb-pf-title">${inline(without.title, o)}</p>${partnerFlowSvg('without', arg, lang)}<p class="cb-pf-caption">${inline(without.caption, o)}</p></div><div class="cb-pf-col cb-pf-with"><p class="cb-pf-title">${inline(withArch.title, o)}</p>${partnerFlowSvg('with', arg, lang)}<p class="cb-pf-caption">${inline(withArch.caption, o)}</p></div></figure>`;
  }
  if (name === 'tabelle') {
    const { title, cols, rows, mark, note } = parseTable(content);
    const matrix = arg === 'matrix';
    const head = `<div class="cb-tb-row cb-tb-head" role="row"><span role="columnheader">${inline(cols[0].name, o)}</span>${cols.slice(1).map((c) => `<span role="columnheader"${c.mark ? ' class="cb-tb-hl"' : ''}>${inline(c.name, o)}</span>`).join('')}</div>`;
    const cellHtml = (c, col) => {
      const cls = ['cb-tb-cell', c.mark && 'cb-tb-mark', col.mark && 'cb-tb-hl', matrix && !c.mark && 'cb-tb-quiet'].filter(Boolean).join(' ');
      const body = matrix && c.mark ? `<b class="cb-tb-tag cb-tb-tag-solid">${inline(c.text, o)}</b>` : `${c.mark && mark ? `<b class="cb-tb-tag">${escHtml(mark)}</b>` : ''}${inline(c.text, o)}`;
      return `<span role="cell" class="${cls}" data-col="${escHtml(col.short)}">${body}</span>`;
    };
    const body = rows.map((r) => `<div class="cb-tb-row" role="row"><span role="rowheader" class="cb-tb-label">${inline(r.label, o)}</span>${r.cells.map((c, i) => cellHtml(c, cols[i + 1])).join('')}</div>`).join('');
    return `<figure class="cb cb-table${matrix ? ' cb-table-matrix' : ''}" style="--cols:${cols.length - 1}">${label(title)}<div class="cb-tb" role="table" aria-label="${escHtml(title)}">${head}${body}</div>${note ? `<figcaption class="cb-tb-note">${inline(note, o)}</figcaption>` : ''}</figure>`;
  }
  if (name === 'staerken-grenzen') {
    const { title, strengths, limits, better } = parseStrengths(content);
    const tiles = strengths.map((x) => `<li${x.mark ? ' class="cb-sg-mark"' : ''}>${icon.check}<span class="cb-sg-title">${inline(x.title, o)}</span><span class="cb-sg-text">${inline(x.text, o)}</span></li>`).join('');
    const crosses = limits.map((x) => `<li>${icon.cross}<span><strong>${inline(x.title, o)}:</strong> ${inline(x.text, o)}</span></li>`).join('');
    return `<figure class="cb cb-strengths" style="--n:${strengths.length}">${label(title)}<ul class="cb-sg-tiles">${tiles}</ul><div class="cb-sg-limits"><p class="cb-sg-head">${escHtml(t.grenzen)}</p><ul>${crosses}</ul></div>${better ? `<p class="cb-sg-better"><span>${escHtml(t.besser)}</span>${inline(better, o)}</p>` : ''}</figure>`;
  }
  if (name === 'vergleich') {
    return `<div class="cb cb-compare">${parseCompare(content).map((c) => `<div class="cb-compare-col cb-compare-${c.kind}"><p class="cb-compare-title">${inline(c.title, o)}</p><ul>${c.items.map((i) => `<li>${c.kind === 'with' ? icon.check : icon.cross}<span>${inline(i, o)}</span></li>`).join('')}</ul></div>`).join('')}</div>`;
  }
  if (name === 'pipeline') {
    const { title, stages, gate, hotfix, notes } = parsePipeline(content);
    const cards = stages.map((x, i) => `<li class="cx-card${i === stages.length - 1 ? ' cx-hi' : ''}"><span class="cx-no">${String(i + 1).padStart(2, '0')}</span><span class="cx-t">${inline(x.title, o)}</span><span class="cx-d">${inline(x.text, o)}</span>${x.mark ? `<span class="cx-check">${iconHtml('tick')}</span>` : ''}</li>`).join('');
    return `<figure class="cb cb-explain cb-pipeline" style="--n:${stages.length}"><span class="cx-eye">${inline(title, o)}</span><ol class="cx-pp-row">${cards}</ol><ul class="cx-pp-legend"><li class="cx-gate"><i></i><span>${inline(gate, o)}</span></li><li class="cx-hot"><i></i><span>${inline(hotfix, o)}</span></li></ul>${explainerNotes(notes, o)}</figure>`;
  }
  if (name === 'saeulenwechsel') {
    const { before, title, old, pillars, notes } = parseShift(content);
    const used = new Set(pillars.flatMap((p) => p.items.flatMap((it) => it.keys)));
    const oldHtml = old.map((x) => `<li><span class="cx-t">${inline(x.name, o)}</span> ${x.terms.map((term) => `<span class="cx-term" data-term="${escHtml(term.toLowerCase())}"${used.has(term.toLowerCase()) ? '' : ' data-rest'}>${escHtml(term)}</span>`).join('<span class="cx-comma">, </span>')}</li>`).join('');
    const item = (it) => `<li data-terms="${escHtml(it.keys.join(' '))}">${inline(it.text, o)}<span class="cx-src">${it.keys.length ? `${t.aus} ` : ''}${inline(it.source, o)}</span></li>`;
    const cards = pillars.map((x, i) => `<li class="cx-card${x.mark ? ' cx-hi' : ''}"><span class="cx-no">${String(i + 1).padStart(2, '0')}</span><span class="cx-t">${inline(x.name, o)}</span><ul class="cx-items">${x.items.map(item).join('')}</ul></li>`).join('');
    return `<figure class="cb cb-explain cb-shift" style="--n:${pillars.length}"><span class="cx-eye">${inline(before, o)}</span><ul class="cx-old">${oldHtml}</ul><span class="cx-eye">${inline(title, o)}</span><ol class="cx-new">${cards}</ol>${explainerNotes(notes, o)}</figure>`;
  }
  if (name === 'basis-addons') {
    const { title, base, addons, notes } = parseAddons(content);
    const adds = addons.map((a) => `<li class="cx-card cx-add"><span><span class="cx-no">${escHtml(t.addon)}</span><span class="cx-t">${inline(a.name, o)}</span></span><span class="cx-d">${inline(a.text, o)}</span></li>`).join('');
    return `<figure class="cb cb-explain cb-addons"><span class="cx-eye">${inline(title, o)}</span><div class="cx-ad"><div class="cx-card cx-hi cx-base"><span class="cx-no">${escHtml(t.gesetzt)}</span><span class="cx-t">${base.parts.map((x) => inline(x, o)).join('<br>')}</span><span class="cx-d">${inline(base.text, o)}</span></div><ul class="cx-adds">${adds}</ul></div>${explainerNotes(notes, o)}</figure>`;
  }
  if (name === 'level') {
    const { title, levels, done, notes } = parseLevels(content);
    const cards = levels.map((x, i) => `<li class="cx-card${i === levels.length - 1 ? ' cx-hi' : ''}"><span class="cx-no">${escHtml(t.level)} ${i + 1}</span><span class="cx-t">${inline(x.name, o)}</span><span class="cx-meta">${inline(x.meta, o)}</span><ul class="cx-ticks">${x.items.map((it) => `<li>${iconHtml('tick', 'cx-tick')}<span>${inline(it, o)}</span></li>`).join('')}</ul><span class="cx-badge">${iconHtml('badge')}${inline(done, o)}</span></li>`).join('');
    return `<figure class="cb cb-explain cb-levels" style="--n:${levels.length}"><span class="cx-eye">${inline(title, o)}</span><span class="cx-rail"><span></span></span><ol class="cx-lv-row">${cards}</ol>${explainerNotes(notes, o)}</figure>`;
  }
  if (name === 'prozess') {
    // Steps sit in the column of their lane; a link in the gap above each item runs from
    // the lane of the previous step to its own (CSS under "Process in lanes" in global.css).
    const { title, lanes, ticket, start, items, notes } = parseProcess(content);
    let no = start[0] - 1;
    let gate = start[1] - 1;
    let from = 0;
    const loops = (x) => x.loops.map((lp) => `<span class="cx-loop">${inline(lp, o)}</span>`).join('');
    // "In UAT · Pipeline": the part after the dot names who sets the status, on its own line.
    // The status stands in its own column on the item's row and, for phones, inside the item.
    const statusHtml = (st) => st.split(' · ').map((part, j) => `<span${j ? ' class="cx-who"' : ''}>${inline(part, o)}</span>`).join('');
    const status = (x, i) => (ticket && x.status ? `<li class="cx-status" style="--row:${i + 1}" aria-hidden="true">${statusHtml(x.status)}</li>` : '');
    const statusIn = (x) => (ticket && x.status ? `<span class="cx-status-in">${inline(ticket, o)}: ${inline(x.status, o)}</span>` : '');
    // Every item gets its own row (--row), so two steps in different lanes never share one.
    const rows = items.map((x, i) => {
      const at = from || 1;
      const pos = `--row:${i + 1};--from:${at}`;
      const first = from ? '' : ' cx-start';
      if (x.kind === 'phase') return `<li class="cx-phase${first}" style="${pos}"><span>${inline(x.text, o)}</span></li>`;
      if (x.kind === 'gate') return `<li class="cx-pgate${first}" style="${pos}"><span class="cx-no">${escHtml(t.tor)} ${++gate}</span><span class="cx-t">${inline(x.text, o)}</span>${statusIn(x)}${loops(x)}</li>${status(x, i)}`;
      const lane = lanes.indexOf(x.lane) + 1;
      const row = `<li class="cx-pstep cx-lane-${lane}${first}" style="--row:${i + 1};--lane:${lane};--from:${from || lane}"><span class="cx-no">${String(++no).padStart(2, '0')}<span class="cx-plane"> · ${inline(x.lane, o)}</span></span><span class="cx-t">${inline(x.title, o)}</span><span class="cx-d">${inline(x.text, o)}</span>${statusIn(x)}${loops(x)}</li>${status(x, i)}`;
      from = lane;
      return row;
    }).join('');
    const heads = `<ol class="cx-lanes" aria-hidden="true">${lanes.map((x, i) => `<li class="cx-lane-${i + 1}"><i></i>${inline(x, o)}</li>`).join('')}${ticket ? `<li class="cx-lane-ticket">${inline(ticket, o)}</li>` : ''}</ol>`;
    const note = notes.length ? `<figcaption class="cx-note">${notes.map((n) => inline(n, o)).join(' ')}</figcaption>` : '';
    return `<figure class="cb cb-process${ticket ? ' cb-process-ticket' : ''}" style="--lanes:${lanes.length}">${label(title)}<div class="cx-frame">${heads}<ol class="cx-flow">${rows}</ol></div>${note}</figure>`;
  }
  if (name === 'kette') {
    const { title, links, notes } = parseChain(content);
    const rows = links.map((x, i) => `<li class="cx-link"><span class="cx-link-name"><span class="cx-no">${String(i + 1).padStart(2, '0')}</span>${inline(x.name, o)}</span><span class="cx-link-text">${inline(x.text, o)}</span></li>`).join('');
    const note = notes.length ? `<figcaption class="cx-note">${notes.map((n) => inline(n, o)).join(' ')}</figcaption>` : '';
    return `<figure class="cb cb-chain">${label(title)}<ol class="cx-links">${rows}</ol>${note}</figure>`;
  }
  if (name === 'steuerzentrale') {
    const { title, sides } = parseControl(content);
    const box = (b) => `<div class="cz-box"><span class="cz-role">${inline(b.role, o)}</span><strong>${inline(b.name, o)}</strong>${b.detail ? `<small>${inline(b.detail, o)}</small>` : ''}</div>`;
    const col = (x) => `<div class="cz-col"><p class="cz-name">${inline(x.name, o)}</p><div class="cz-ctrl"><span class="cz-role">${escHtml(t.ctrl)}</span><strong>${inline(x.ctrl, o)}</strong><ol class="cz-stages" style="--n:${x.stages.length}">${x.stages.map((st) => `<li>${inline(st, o)}</li>`).join('')}</ol></div><div class="cz-links" aria-hidden="true">${x.boxes.map((b) => `<span><i></i><b>${inline(b.link, o)}</b></span>`).join('')}</div><div class="cz-boxes">${x.boxes.map(box).join('')}</div>${x.note ? `<p class="cz-cap">${inline(x.note, o)}</p>` : ''}</div>`;
    return `<figure class="cb cb-control">${label(title)}<div class="cz-grid">${sides.map(col).join('')}</div></figure>`;
  }
  if (name === 'eisberg') {
    const { title, tip, items, notes } = parseIceberg(content);
    const step = items.length > 1 ? 42 / (items.length - 1) : 0;
    const rows = items.map((x, i) => `<li class="${x.mark ? 'cz-big' : ''}" style="--w:${Math.round(58 + i * step)}%;--i:${i}"><strong>${inline(x.title, o)}</strong><small>${inline(x.text, o)}</small>${x.tag ? `<b>${inline(x.tag, o)}</b>` : ''}</li>`).join('');
    const note = notes.length ? `<figcaption class="cx-note">${notes.map((n) => inline(n, o)).join(' ')}</figcaption>` : '';
    return `<figure class="cb cb-iceberg" style="--n:${items.length}">${label(title)}<div class="cz-sea"><div class="cz-tip"><span class="cz-role">${escHtml(t.sichtbar)}</span><strong>${inline(tip.title, o)}</strong>${tip.text ? `<small>${inline(tip.text, o)}</small>` : ''}</div><div class="cz-under"><span class="cz-water">${escHtml(t.darunter)}</span><ol class="cz-ice">${rows}</ol></div></div>${note}</figure>`;
  }
  return '';
}
