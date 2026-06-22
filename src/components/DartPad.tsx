export default function DartPad({ code }: { code: string }) {
  return (
    <div class="dp">
      <div class="dp__bar">
        <span class="dp__label">Flutter / Dart</span>
        <a class="dp__open" href="https://dartpad.dev/" target="_blank" rel="noopener"
           onClick={() => navigator.clipboard.writeText(code)}>Open in DartPad ↗ (copies code)</a>
      </div>
      <pre class="dp__code"><code>{code}</code></pre>
    </div>
  );
}
