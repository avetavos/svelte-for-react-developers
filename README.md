# Flutter for React Developers

A bilingual, interactive course that teaches Flutter to developers who already know React, using a comparison-first approach. Every concept is introduced from the React perspective first (component → widget, props, `useState` → `setState`, `useEffect` → `initState`/`dispose`, JSX → widget tree), then mapped to the Flutter equivalent — with the key differences called out.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Runnable Flutter | "Open in DartPad" — each example is a complete Flutter app shown in the lesson with a button that copies the code and opens [DartPad](https://dartpad.dev) (the official online Flutter editor) to run it |
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

> There is **no runner build step** — Flutter runs on the external DartPad service via the "Open in DartPad" button (no backend, no embedded compiler).

## Content Structure

```
src/content/docs/
  en/              # English content — served at /en/...
    intro/
    mental-model/
    widgets/
    state-lifecycle/
    data/
    navigation/
    tooling/
    index.mdx      # EN landing page (splash template)
  th/              # Thai content — served at /th/...
    (same module directories)
    index.mdx      # TH landing page (splash template)
```

### The 7 Modules

| Directory | Module | Topics |
| --------- | ------ | ------ |
| `intro` | Introduction & Setup | Why Flutter, Dart for JS/TS devs, the toolchain, first app |
| `mental-model` | React → Flutter: Same vs Different | Everything-is-a-widget, declarative UI, no JSX, composition |
| `widgets` | Widgets & UI | StatelessWidget, props/constructors, layout (Row/Column), styling/Theme |
| `state-lifecycle` | State & Lifecycle | setState vs useState, build vs render, initState/dispose vs useEffect, keys |
| `data` | Handling Data | Futures, http, JSON models, FutureBuilder/StreamBuilder, Provider, forms |
| `navigation` | Navigation & Routing | Navigator, named routes, go_router, passing data, tabs & drawer |
| `tooling` | Tooling, Testing & Deployment | pub/pubspec, flutter CLI, widget tests, DevTools, build & CI |

### Lesson File IDs

Content IDs follow the `<module>/<slug>` convention, e.g. `widgets/stateless-widget`. The Starlight sidebar uses `autogenerate: { directory }` per locale root.

### Lesson Template

1. **Intro** — React-analogy framing
2. **Concept** — prose explanation
3. **ReactFlutter** — `<ReactFlutter react={...} flutter={...} />` side-by-side React ↔ Flutter code
4. **DartPad** — `<DartPad code={...} />` complete runnable Flutter app + "Open in DartPad" button
5. **Diff** — `<Diff>` callout for key React → Flutter differences
6. **Quiz** — `<Quiz questions={...} />`
7. **ProgressTracker** — `<ProgressTracker id="module/slug" />` (always last)

Code is hoisted into `export const` template literals and passed by reference.

> **⚠️ Authoring gotchas:**
> - **Frontmatter `title`/`description` are single-quoted** when they contain a colon or backtick (YAML safety); use double quotes if the value contains an apostrophe.
> - **In `export const` code literals, escape `$`→`\$` and `${`→`\${`** — Dart uses `$var`/`${expr}` string interpolation, and JS template literals use `${}`; a raw `${` breaks the MDX build. Double-escape `\\n`/`\\t` too.
> - **Never put a bare `{name}` in prose** (even inside a `<Diff>`): MDX treats `{...}` as a JS expression. Keep any `{...}`/`${...}` examples inside backtick code spans — and to show code that itself contains backticks, wrap it in a double-backtick span.

## How Runnable Code Works

Flutter can't be compiled in the browser without the Dart SDK, and DartPad no longer supports embedding arbitrary code via postMessage (only via a per-snippet GitHub gist). So this course uses **link mode**: the `<DartPad>` component (`src/components/DartPad.tsx`) shows the complete Flutter program and an **"Open in DartPad ↗ (copies code)"** button — it copies the snippet to the clipboard and opens [dartpad.dev](https://dartpad.dev), where you paste and Run to see the real widget render.

## Deployment

Fully static (`output: 'static'`). Build output → `dist/`. Deploy to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

### GitHub Pages (configured)

Deploys via `.github/workflows/deploy.yml` (build with `withastro/action` on Node 22, publish with `actions/deploy-pages`).

One-time setup:

1. Create a GitHub repo and push (`main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Confirm the base path in `astro.config.mjs`:
   - **Project site** (`https://USER.github.io/REPO/`): `site: 'https://USER.github.io'`, `base: '/REPO'` (currently `avetavos` / `flutter-for-react-developers`).
   - **User/org site** or **custom domain**: set `site` and **remove `base`** (served at root).

If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
