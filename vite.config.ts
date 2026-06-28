import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// User page (humbertovirtudes.github.io) is served from the domain root.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
