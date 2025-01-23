import { serve } from '@hono/node-server';
import { getLogger } from '@repo/logging/logger';
import { createServer } from 'node:http';

import { app } from './src/app';
import { APP_ID } from './src/lib/constants';
import { env } from './src/lib/env';

const logger = getLogger(APP_ID);

const port = env.PORT;
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

process.on('uncaughtException', (err) => {
  // log the exception
  logger.error(err, 'uncaught exception detected');
  // shutdown the server gracefully
  server.close(() => {
    process.exit(1); // then exit
  });

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => {
    process.abort(); // exit immediately and generate a core dump file
  }, 1000).unref();
  process.exit(1);
});
