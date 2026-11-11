// Service pages open their reading column with the first paragraph of the body (the
// intro that answers "what is this service"), followed by situations, deliverables and
// results from the frontmatter, then the rest of the body (docs/service-pages.md).
// This plugin takes that first paragraph out of the rendered body and hands its text to
// src/components/ServicePage.astro as `remarkPluginFrontmatter.serviceIntro`.
import { defineMdastPlugin } from 'satteri';

export function serviceIntro() {
  return defineMdastPlugin({
    name: 'service-intro',
    before(root, ctx) {
      if (!/\/content\/services\//.test(ctx.fileURL?.pathname ?? '')) return;
      const first = root.children[0];
      if (first?.type !== 'paragraph' || first.children.some((c) => c.type !== 'text')) {
        throw new Error(`${ctx.fileURL.pathname}: a service page body must start with a plain-text intro paragraph`);
      }
      ctx.data.astro.frontmatter.serviceIntro = ctx.textContent(first);
      ctx.removeNode(first);
    },
  });
}
