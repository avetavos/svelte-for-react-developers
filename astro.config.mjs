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
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/svelte-for-react-developers/enhance.js' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/svelte-for-react-developers/manifest.webmanifest' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/svelte-for-react-developers/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/svelte-for-react-developers/icon-192.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#FF3E00' } },
        { tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: "Svelte for React Developers" } },
        { tag: 'script', content: "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/svelte-for-react-developers/sw.js',{scope:'/svelte-for-react-developers/'}).catch(function(){})})}" },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/svelte-for-react-developers' }],
      sidebar: [
        { label: 'Introduction & Setup', collapsed: true, items: [{ autogenerate: { directory: 'intro' } }] },
        { label: 'React → Svelte: Same vs Different', collapsed: true, items: [{ autogenerate: { directory: 'mental-model' } }] },
        { label: 'Components & Templating', collapsed: true, items: [{ autogenerate: { directory: 'components' } }] },
        { label: 'Reactivity & Lifecycle (Runes)', collapsed: true, items: [{ autogenerate: { directory: 'reactivity' } }] },
        { label: 'Handling Data & Stores', collapsed: true, items: [{ autogenerate: { directory: 'data' } }] },
        { label: 'Routing with SvelteKit', collapsed: true, items: [{ autogenerate: { directory: 'routing' } }] },
        { label: 'Tooling, Testing & Deployment', collapsed: true, items: [{ autogenerate: { directory: 'tooling' } }] },
      ],
      }), preact()],
});