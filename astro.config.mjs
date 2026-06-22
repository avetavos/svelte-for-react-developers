// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/flutter-for-react-developers',
  output: 'static',
  integrations: [starlight({
      title: 'Flutter for React Developers',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/flutter-for-react-developers' }],
      sidebar: [
        { label: 'Introduction & Setup', items: [{ autogenerate: { directory: 'intro' } }] },
        { label: 'React → Flutter: Same vs Different', items: [{ autogenerate: { directory: 'mental-model' } }] },
        { label: 'Widgets & UI', items: [{ autogenerate: { directory: 'widgets' } }] },
        { label: 'State & Lifecycle', items: [{ autogenerate: { directory: 'state-lifecycle' } }] },
        { label: 'Handling Data', items: [{ autogenerate: { directory: 'data' } }] },
        { label: 'Navigation & Routing', items: [{ autogenerate: { directory: 'navigation' } }] },
        { label: 'Tooling, Testing & Deployment', items: [{ autogenerate: { directory: 'tooling' } }] },
      ],
      }), preact()],
});