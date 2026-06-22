// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/svelte-for-react-developers',
  output: 'static',
  integrations: [starlight({
      title: 'Svelte for React Developers',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/svelte-for-react-developers' }],
      sidebar: [
        { label: 'Introduction & Setup', items: [{ autogenerate: { directory: 'intro' } }] },
        { label: 'React → Svelte: Same vs Different', items: [{ autogenerate: { directory: 'mental-model' } }] },
        { label: 'Components & Templating', items: [{ autogenerate: { directory: 'components' } }] },
        { label: 'Reactivity & Lifecycle (Runes)', items: [{ autogenerate: { directory: 'reactivity' } }] },
        { label: 'Handling Data & Stores', items: [{ autogenerate: { directory: 'data' } }] },
        { label: 'Routing with SvelteKit', items: [{ autogenerate: { directory: 'routing' } }] },
        { label: 'Tooling, Testing & Deployment', items: [{ autogenerate: { directory: 'tooling' } }] },
      ],
      }), preact()],
});