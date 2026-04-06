import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/v1': {
        target: 'https://openrouter.ai/api',
        changeOrigin: true,
      },
    },
  },
});
