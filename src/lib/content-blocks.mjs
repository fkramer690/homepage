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
import { iconHtml } from './icons.mjs';

export const blockNames = ['hinweis', 'praxis', 'kennzahlen', 'zeitleiste', 'ablauf', 'pro-contra', 'vertiefung', 'schritte'];

const labels = {
  de: {
    tipp: 'Tipp', achtung: 'Achtung', offen: 'Schriftlich bestätigen lassen', praxis: 'Aus meiner Praxis',
    quelle: 'Quelle', next: 'nächster Termin', legend: { sf: 'Salesforce', erp: 'ERP', ext: 'angrenzender Prozess' },
    diagram: 'Ablaufdiagramm',
  },
  en: {
    tipp: 'Tip', achtung: 'Warning', offen: 'Get it confirmed in writing', praxis: 'From my practice',
    quelle: 'Source', next: 'next date', legend: { sf: 'Salesforce', erp: 'ERP', ext: 'adjacent process' },
    diagram: 'Flow diagram',
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
  } else if (name === 'vertiefung') {
    const { title, body } = parseDeep(content);
    if (!arg) errs.push('vertiefung: add a label after the name (```vertiefung Für Entwickler)');
    if (!title) errs.push('vertiefung: first line must be "titel:" (DE) or "title:" (EN)');
    if (!body) errs.push('vertiefung: text missing');
  } else if (name === 'schritte') {
    const steps = parseSteps(content);
    between(steps.length, 3, 6, 'steps');
    if (steps.some((s) => !s.text)) errs.push('schritte: every step needs an indented description line');
  }
  return errs;
}

// Prose of a block, for word counts and the wording checks in check-blog.
export function blockProse(block) {
  return block.content
    .replace(/^\s*(quelle|source|titel|title|pro|contra|sf|erp|ext):\s*/gim, '')
    .replace(/(--|\.\.)>?/g, ' ')
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
    '%%{init: {"theme": "base", "themeVariables": {"fontFamily": "Sora, system-ui, sans-serif", "fontSize": "15px", "lineColor": "#5a5a5e", "primaryTextColor": "#232325", "edgeLabelBackground": "#ffffff"}, "htmlLabels": false, "flowchart": {"curve": "basis", "nodeSpacing": 40, "rankSpacing": 56, "padding": 22, "htmlLabels": false}}}%%',
    `flowchart ${direction}`,
  ];
  for (const n of nodes) {
    const shape = [`["`, `"]`];
    out.push(`  ${id.get(n)}${shape[0]}${esc(n)}${shape[1]}`);
  }
  for (const e of edges) {
    if (e.error) continue;
    const arrow = e.dashed ? (e.label ? `-. "${esc(e.label)}" .->` : '-.->') : (e.label ? `-- "${esc(e.label)}" -->` : '-->');
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
    const { groups } = parseFlow(content);
    const legend = ['sf', 'erp', 'ext'].filter((g) => groups[g].length).map((g) => `<span><i class="cb-lg-${g}"></i>${escHtml(t.legend[g])}</span>`).join('');
    const summary = parseFlow(content).edges.filter((e) => !e.error).map((e) => `${e.from} → ${e.to}${e.label ? ` (${e.label})` : ''}`).join('; ');
    return `<figure class="cb cb-flow"><div class="cb-flow-svg" role="img" aria-label="${escHtml(`${t.diagram}: ${summary}`)}">${svg}</div><figcaption class="cb-legend">${legend}</figcaption></figure>`;
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
  return '';
}
