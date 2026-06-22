import { useState } from 'preact/hooks';

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button class="tsgo__copy" onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1200); }}>
      {done ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function ReactSvelte(
  { react, svelte, reactTitle = 'React', svelteTitle = 'Svelte' }:
  { react: string; svelte: string; reactTitle?: string; svelteTitle?: string },
) {
  return (
    <div class="tsgo">
      <div class="tsgo__col">
        <header>{reactTitle}<CopyBtn text={react} /></header>
        <pre><code>{react}</code></pre>
      </div>
      <div class="tsgo__col">
        <header>{svelteTitle}<CopyBtn text={svelte} /></header>
        <pre><code>{svelte}</code></pre>
      </div>
    </div>
  );
}
