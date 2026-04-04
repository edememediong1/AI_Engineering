import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/v1beta': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
      },
    },
  },
});
