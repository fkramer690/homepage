// Keeps the repository root tidy: only project files belong there. Images, drawings and
// other loose output fail the build, so a preview export or render cannot be committed to
// the root by accident. Where things go: "Where files go" in README.md.
import { readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url).pathname;
const ALLOWED = new Set([
  '.astro', '.claude', '.DS_Store', '.git', '.github', '.gitignore', '.vscode',
  'CLAUDE.md', 'README.md', 'astro.config.mjs', 'dist', 'docs', 'node_modules',
  'package-lock.json', 'package.json', 'previews', 'public', 'scripts', 'seo', 'src', 'tsconfig.json',
]);
const stray = readdirSync(root).filter((name) => !ALLOWED.has(name));
if (stray.length) {
  console.error(`Loose files in the repository root:\n  ${stray.join('\n  ')}\nMove them to their place (README.md, "Where files go"); card drawing previews go to previews/ via npm run cards:export. A new top-level project file must be added to scripts/check-root.mjs.`);
  process.exit(1);
}
console.log('Repository root: OK');
