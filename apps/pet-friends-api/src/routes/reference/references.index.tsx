import { Hono } from 'hono';

import { pingApp } from './pages/contexts/ping';
import { homeApp } from './pages/home';

export const referenceApp = new Hono();

const apps = [homeApp, pingApp] as const;

apps.forEach((app) => {
  referenceApp.route('/reference', app);
});
