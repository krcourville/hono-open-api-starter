import { createServer } from 'node:http';

import { serve } from '@hono/node-server';
import { getLogger } from '@repo/logging/logger';

import { app } from './pet-friends-api';

const logger = getLogger('pet-friends-api');

const port: string = process.env.PORT || '4000';
const server = serve(
  {
    fetch: app.fetch,
    port: Number(port),
    createServer,
  },
  (info) => {
    logger.info(`Server is running on port http://localhost:${info.port} .`);
  },
);

process.on('SIGINT', () => {
  logger.info('Server is shutting down...');
  server.close();
});

server.on('close', () => {
  logger.info('Server shut down');
});
