// Opens every external link in Markdown content (blog articles, service pages)
// in a new tab and adds the same arrow and screen-reader hint as ExternalMark.astro.
// Rule: all external links open in a new tab; scripts/check-links.mjs enforces it.
import { defineHastPlugin } from 'satteri';

const labels = { en: '(opens in a new tab)', de: '(öffnet in einem neuen Tab)' };

export function isExternal(href, site) {
  return /^https?:\/\//i.test(href) && new URL(href).origin !== new URL(site).origin;
}

export function externalLinks({ site }) {
  return defineHastPlugin({
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href !== 'string' || !isExternal(href, site)) return;
        const lang = /\/content\/[^/]+\/de\//.test(ctx.fileURL?.pathname ?? '') ? 'de' : 'en';
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', ['noopener']);
        ctx.appendChild(node, [
          {
            type: 'element',
            tagName: 'svg',
            properties: { className: ['ext-mark'], width: 12, height: 12, viewBox: '0 0 12 12', ariaHidden: 'true' },
            children: [{ type: 'element', tagName: 'path', properties: { d: 'M4 2h6v6M10 2 2.5 9.5', fill: 'none', stroke: 'currentColor', strokeWidth: '1.6' }, children: [] }],
          },
          { type: 'element', tagName: 'span', properties: { className: ['visually-hidden'] }, children: [{ type: 'text', value: ` ${labels[lang]}` }] },
        ]);
      },
    },
  });
}
