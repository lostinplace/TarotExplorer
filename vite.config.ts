import { defineConfig } from 'vite';

import vitePluginYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
  base: '/sr-tarot-trainer/',
  plugins: [
    vitePluginYaml(),
  ],
  css: {
    postcss: {
      plugins: [
        (await import('@tailwindcss/postcss')).default,
      ],
    },
  },
});
