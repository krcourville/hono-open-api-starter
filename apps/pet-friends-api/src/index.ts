import { createServer } from 'node:http';

import { serve } from '@hono/node-server';

import { app } from './server';

app.get('/', (c) => {
  return c.text('Pet Friends API 1.0.0.  See /doc for more information.');
});

const port: string = process.env.PORT || '4000';

const server = serve(
  {
    fetch: app.fetch,
    port: Number(port),
    createServer,
  },
  (info) => {
    // eslint-disable-next-line no-console -- TODO: implement logger
    console.log(`Server is running on port http://localhost:${info.port} .`);
  },
);

process.on('SIGINT', () => {
  // eslint-disable-next-line no-console -- TODO: implement logger
  console.log('Server is shutting down...');
  server.close();
});

server.on('close', () => {
  // eslint-disable-next-line no-console -- TODO: implement logger
  console.log('Server shut down');
});
