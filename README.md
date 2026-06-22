# Svelte for React Developers

A bilingual, interactive course that teaches **Svelte 5 (runes)** to developers who already know React, using a comparison-first approach. Every concept is introduced from the React perspective first (component → `.svelte` file, props → `$props`, `useState` → `$state`, `useMemo` → `$derived`, `useEffect` → `$effect`, JSX → Svelte template, Context/Redux → stores), then mapped to the Svelte equivalent — with the key differences called out.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Runnable Svelte | **In-browser compile + mount** — the `<SveltePlayground>` island compiles `.svelte` source with the real Svelte 5 compiler (loaded from esm.sh) and mounts the live component in a sandboxed iframe; editable. "Open in Svelte Playground" fallback. |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| Styling | Starlight default + custom CSS (`src/styles/custom.css`) |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

Run all commands from the project root.

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

> There is **no runner build step** — Svelte is compiled in the reader's browser via the Svelte compiler loaded from esm.sh; no backend, no committed runtime.

## Content Structure

```
src/content/docs/
  en/              # English content — served at /en/...
    intro/
    mental-model/
    components/
    reactivity/
    data/
    routing/
    tooling/
    index.mdx      # EN landing page (splash template)
  th/              # Thai content — served at /th/...
    (same module directories)
    index.mdx      # TH landing page (splash template)
```

### The 7 Modules

| Directory | Module | Topics |
| --------- | ------ | ------ |
| `intro` | Introduction & Setup | Why Svelte, the compiler model, toolchain, `.svelte` anatomy |
| `mental-model` | React → Svelte: Same vs Different | Single-file components, compiler vs runtime, reactivity, scoped styles |
| `components` | Components & Templating | Props, `{#if}`/`{#each}`, events, snippets, bindings vs JSX |
| `reactivity` | Reactivity & Lifecycle (Runes) | `$state`/`$derived`/`$effect` vs hooks, `$props`/`$bindable`, lifecycle |
| `data` | Handling Data & Stores | Stores, module state, fetching, `{#await}` vs Context/Redux/react-query |
| `routing` | Routing with SvelteKit | File-based routing, load functions, layouts, form actions vs react-router/Next |
| `tooling` | Tooling, Testing & Deployment | Vite, svelte-check, Vitest + testing-library, adapters & deploy |

### Lesson File IDs

Content IDs follow the `<module>/<slug>` convention, e.g. `reactivity/state-rune`. The Starlight sidebar uses `autogenerate: { directory }` per locale root.

### Lesson Template

1. **Intro** — React-analogy framing
2. **Concept** — prose explanation
3. **ReactSvelte** — `<ReactSvelte react={...} svelte={...} />` side-by-side React ↔ Svelte code
4. **SveltePlayground** — `<SveltePlayground code={...} />` a complete single-file Svelte 5 component, compiled & rendered live
5. **Diff** — `<Diff>` callout for key React → Svelte differences
6. **Quiz** — `<Quiz questions={...} />`
7. **ProgressTracker** — `<ProgressTracker id="module/slug" />` (always last)

Code is hoisted into `export const` template literals and passed by reference.

> **⚠️ Authoring gotchas (Svelte uses `$` and `{}` heavily — MDX is sensitive to both):**
> - **In `export const` code literals, escape `$`→`\$` and `${`→`\${`** — Svelte runes (`$state`/`$derived`/`$effect`/`$props`) and store reads (`$count`) must be `\$state`, `\$count`; a raw `${` breaks the build. Write the closing script tag as `<\/script>`.
> - **Never put a bare `{...}` in prose** — Svelte template tokens like `{#if}`/`{#each}`/`{#await}`/`{@render}` in headings or paragraphs are parsed as JSX and break MDX. Keep them inside backtick code spans or `export const` strings. (Quiz strings, `<Diff title="…">` attributes, and frontmatter are safe — MDX doesn't parse those.)
> - **Frontmatter `title`/`description`**: single-quote values with a colon/backtick (double-quote if they contain an apostrophe); never use a `\` escape inside a YAML scalar (e.g. `\$app` → `$app`).

## How the Live Runner Works

`<SveltePlayground>` (`src/components/SveltePlayground.tsx`) lazy-loads the Svelte 5 compiler from esm.sh, compiles your `.svelte` source client-side (`generate: 'client', runes: true`), and runs the compiled module inside a sandboxed iframe whose import map maps `svelte` and `svelte/*` (runtime, stores, etc.) to esm.sh — then `mount()`s the component (`src/components/svelte-srcdoc.ts` builds the iframe document). Editing the textarea recompiles live (debounced); compile errors show inline. Each snippet is one complete single-file component (no cross-component imports). The "Open in Svelte Playground" button copies the code and opens svelte.dev/playground.

## Deployment

Fully static (`output: 'static'`). Build output → `dist/`. Deploy to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

### GitHub Pages (configured)

Deploys via `.github/workflows/deploy.yml` (build with `withastro/action` on Node 22, publish with `actions/deploy-pages`).

One-time setup:

1. Create a GitHub repo and push (`main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Confirm the base path in `astro.config.mjs`:
   - **Project site** (`https://USER.github.io/REPO/`): `site: 'https://USER.github.io'`, `base: '/REPO'` (currently `avetavos` / `svelte-for-react-developers`).
   - **User/org site** or **custom domain**: set `site` and **remove `base`** (served at root).

If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
