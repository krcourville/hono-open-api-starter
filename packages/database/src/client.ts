import { getLogger } from '@repo/logging';

import { PrismaClient } from '../generated/client';

const logger = getLogger('prisma');

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
});

prisma.$on('query', (e) => {
  logger.debug(
    {
      query: e.query,
      params: e.params,
      duration: e.duration,
    },
    'sql',
  );
});

prisma.$on('info', (e) => {
  logger.debug(e);
});

prisma.$on('warn', (e) => {
  logger.warn(e);
});

prisma.$on('error', (e) => {
  logger.error(e);
});
