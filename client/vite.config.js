// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  /** ─────────────  DEV-SERVER PROXY  ─────────────
   *  Any request that starts with /auth/… will be
   *  proxied to http://localhost:4000 (Express).
   *  All other routes keep using http://localhost:8000
   *  from your existing VITE_API_URL.
   */
  server: {
    proxy: {
      '^/auth/.*': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});