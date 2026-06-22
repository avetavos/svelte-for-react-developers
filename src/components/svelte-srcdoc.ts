const IMPORT_MAP = {
  imports: {
    svelte: 'https://esm.sh/svelte@5',
    'svelte/': 'https://esm.sh/svelte@5/',
    'svelte/internal/client': 'https://esm.sh/svelte@5/internal/client',
    'svelte/internal/disclose-version': 'https://esm.sh/svelte@5/internal/disclose-version',
  },
};

export function transformToMountable(compiledJs: string): string {
  const body = compiledJs.replace(/export\s+default\s+App\s*;?/, '');
  return `import { mount } from 'svelte';\n${body}\nmount(App, { target: document.getElementById('app') });`;
}

export function buildSrcdoc(moduleCode: string): string {
  const safe = moduleCode.replace(/<\/script/gi, '<\\/script');
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    `<script type="importmap">${JSON.stringify(IMPORT_MAP)}</script>` +
    '<style>body{font-family:system-ui,sans-serif;margin:1rem}</style></head>' +
    '<body><div id="app"></div>' +
    `<script type="module">${safe}</script>` +
    '</body></html>'
  );
}
