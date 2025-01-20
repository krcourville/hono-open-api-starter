import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export -- vite requires default export
export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/pet-friends-api',
});
