import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@esri/calcite-components', 'monaco-editor'],
    },
  },
});
