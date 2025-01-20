import { serve } from '@hono/node-server';


import { Hono } from 'hono';

import fs from "node:fs";

export const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello World');
});

serve(app);
