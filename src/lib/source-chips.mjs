// Blog articles: every external link in the body becomes a numbered source chip.
// The link text stays as plain text, the chip ([3]) jumps to entry 3 of the
// collapsed source list that is appended at the end of the body (before the FAQ).
// The same URL keeps its first number. The list links are external, so
// external-links.mjs (which runs after this plugin) opens them in a new tab.
// Links inside content blocks are rendered by content-blocks.mjs and stay links.
import { defineHastPlugin } from 'satteri';
import { isExternal } from './external-links.mjs';

const labels = {
  de: { title: 'Quellen', chip: 'Quelle' },
  en: { title: 'Sources', chip: 'Source' },
};

const text = (value) => ({ type: 'text', value });
const el = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });
const host = (href) => new URL(href).hostname.replace(/^www\./, '');

export function sourceChips({ site }) {
  return ({ fileURL }) => {
    const path = fileURL?.pathname ?? '';
    if (!/\/content\/blog\/(de|en)\//.test(path)) return null;
    const t = labels[/\/content\/blog\/de\//.test(path) ? 'de' : 'en'];
    const sources = [];
    const numbers = new Map();
    return defineHastPlugin({
      name: 'source-chips',
      element: {
        filter: ['a'],
        visit(node, ctx) {
          const href = node.properties?.href;
          if (typeof href !== 'string' || !isExternal(href, site)) return;
          const label = ctx.textContent(node).trim();
          if (!numbers.has(href)) {
            numbers.set(href, sources.length + 1);
            sources.push({ href, label, host: host(href) });
          }
          const n = numbers.get(href);
          ctx.replaceNode(node, [
            text(label),
            el('a', { className: ['cite'], href: `#quelle-${n}`, dataSource: host(href), ariaLabel: `${t.chip} ${n}: ${host(href)}` }, [text(String(n))]),
          ]);
        },
      },
      after(root, ctx) {
        if (!sources.length) return;
        ctx.appendChild(root, [
          el('details', { className: ['post-sources'], id: 'quellen' }, [
            el('summary', {}, [
              el('span', { className: ['src-title'] }, [text(t.title)]),
              el('span', { className: ['src-count', 'mono'] }, [text(String(sources.length))]),
            ]),
            el('ol', { className: ['src-list'] }, sources.map((s, i) =>
              el('li', { id: `quelle-${i + 1}` }, [
                el('span', { className: ['src-n', 'mono'] }, [text(String(i + 1))]),
                el('span', {}, [
                  el('a', { href: s.href }, [text(s.label)]),
                  el('span', { className: ['src-host'] }, [text(s.host)]),
                ]),
              ]),
            )),
          ]),
        ]);
      },
    });
  };
}
