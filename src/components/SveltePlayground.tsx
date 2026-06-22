import { useState, useEffect, useRef } from 'preact/hooks';
import { transformToMountable, buildSrcdoc } from './svelte-srcdoc';

let compilerPromise: Promise<{ compile: (src: string, opts: object) => { js: { code: string } } }> | null = null;
function loadCompiler() {
  if (!compilerPromise) compilerPromise = import(/* @vite-ignore */ 'https://esm.sh/svelte@5/compiler') as Promise<{ compile: (src: string, opts: object) => { js: { code: string } } }>;
  return compilerPromise;
}

export default function SveltePlayground({ code, height = '260px' }: { code: string; height?: string }) {
  const [src, setSrc] = useState(code);
  const [doc, setDoc] = useState('');
  const [error, setError] = useState('');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      try {
        const { compile } = await loadCompiler();
        const out = compile(src, { generate: 'client', runes: true, name: 'App' });
        setError('');
        setDoc(buildSrcdoc(transformToMountable(out.js.code)));
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    }, 400);
    return () => clearTimeout(timer.current);
  }, [src]);

  return (
    <div class="sp">
      <div class="sp__bar">
        <span class="sp__label">Svelte</span>
        <a class="sp__open" href="https://svelte.dev/playground" target="_blank" rel="noopener"
           onClick={() => navigator.clipboard.writeText(src)}>Open in Svelte Playground ↗ (copies code)</a>
      </div>
      <textarea class="sp__code" spellcheck={false} value={src}
        onInput={(e) => setSrc((e.target as HTMLTextAreaElement).value)} />
      {error
        ? <pre class="sp__err"><code>{error}</code></pre>
        : <iframe class="sp__preview" style={{ height }} sandbox="allow-scripts" srcdoc={doc} title="Svelte preview" />}
    </div>
  );
}
