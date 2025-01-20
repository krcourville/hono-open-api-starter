import fs from 'node:fs';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';


export const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello World');
});

serve(app);
