import { useState } from 'preact/hooks';

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button class="tsgo__copy" onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1200); }}>
      {done ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function ReactFlutter(
  { react, flutter, reactTitle = 'React', flutterTitle = 'Flutter' }:
  { react: string; flutter: string; reactTitle?: string; flutterTitle?: string },
) {
  return (
    <div class="tsgo">
      <div class="tsgo__col">
        <header>{reactTitle}<CopyBtn text={react} /></header>
        <pre><code>{react}</code></pre>
      </div>
      <div class="tsgo__col">
        <header>{flutterTitle}<CopyBtn text={flutter} /></header>
        <pre><code>{flutter}</code></pre>
      </div>
    </div>
  );
}
