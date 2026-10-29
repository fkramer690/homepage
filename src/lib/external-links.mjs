// Opens every external link in Markdown content (blog articles, service pages)
// in a new tab and adds the same arrow and screen-reader hint as ExternalMark.astro.
// Rule: all external links open in a new tab; scripts/check-links.mjs enforces it.
import { defineHastPlugin } from 'satteri';
import { iconHast } from './icons.mjs';

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
          iconHast('external', 'ext-mark'),
          { type: 'element', tagName: 'span', properties: { className: ['visually-hidden'] }, children: [{ type: 'text', value: ` ${labels[lang]}` }] },
        ]);
      },
    },
  });
}
