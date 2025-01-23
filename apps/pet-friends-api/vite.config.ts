import { defineConfig } from 'vite';

// eslint-disable-next-line no-restricted-exports -- default is required for vite
export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/pet-friends-api',
});
