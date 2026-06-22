import { describe, it, expect } from 'vitest';
import { transformToMountable, buildSrcdoc } from '../src/components/svelte-srcdoc';

describe('transformToMountable', () => {
  it('drops the default export and appends a mount call', () => {
    const out = transformToMountable("import * as $ from 'svelte/internal/client';\nfunction App(){}\nexport default App;");
    expect(out).not.toContain('export default');
    expect(out).toContain("import { mount } from 'svelte'");
    expect(out).toContain("mount(App, { target: document.getElementById('app') })");
  });
});

describe('buildSrcdoc', () => {
  it('embeds an esm.sh import map and the module code', () => {
    const doc = buildSrcdoc("/*code*/");
    expect(doc).toContain('importmap');
    expect(doc).toContain('https://esm.sh/svelte@5/internal/client');
    expect(doc).toContain('<div id="app">');
    expect(doc).toContain('/*code*/');
  });
  it('neutralizes nested </script> in the module code', () => {
    expect(buildSrcdoc("a='</script>'")).not.toContain("'</script>'");
  });
});
