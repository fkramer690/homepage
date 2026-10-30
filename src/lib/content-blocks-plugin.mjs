// Turns content blocks (```hinweis, ```praxis, … see src/lib/content-blocks.mjs and
// "Content blocks" in docs/blog-guidelines.md) into their markup at build time.
// Styles: "Content blocks" in src/styles/global.css.
import { defineMdastPlugin } from 'satteri';
import { existsSync, readFileSync } from 'node:fs';
import { blockNames, renderBlock } from './content-blocks.mjs';
import { isExternal } from './external-links.mjs';

const diagramDir = new URL('../assets/diagrams/', import.meta.url);
const readDiagram = (hash) => {
  const file = new URL(`${hash}.svg`, diagramDir);
  return existsSync(file) ? readFileSync(file, 'utf8').replace(/<\?xml[^>]*>\s*/, '') : undefined;
};

export function contentBlocks({ site }) {
  return defineMdastPlugin({
    name: 'content-blocks',
    code(node, ctx) {
      if (!node.lang || !blockNames.includes(node.lang)) return;
      const lang = /\/content\/[^/]+\/de\//.test(ctx.fileURL?.pathname ?? '') ? 'de' : 'en';
      const html = renderBlock(
        { name: node.lang, arg: (node.meta ?? '').trim(), content: node.value },
        { lang, readDiagram, isExternal: (href) => /^https?:/i.test(href) && isExternal(href, site) },
      );
      ctx.replaceNode(node, { type: 'html', value: html });
    },
  });
}
