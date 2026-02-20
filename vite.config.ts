import { defineConfig } from 'vite';

export default defineConfig({
  base: '/sr-tarot-trainer/',
  css: {
    postcss: {
      plugins: [
        (await import('@tailwindcss/postcss')).default,
      ],
    },
  },
});
