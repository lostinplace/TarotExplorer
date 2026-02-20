import { defineConfig } from 'vite';

import vitePluginYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig(async ({ command }) => ({
  base: command === 'build' ? '/TarotExplorer/' : '/',
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
}));
