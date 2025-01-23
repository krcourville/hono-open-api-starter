import { notFound } from '@repo/open-api';
import { z } from 'zod';

import type { AppRouteHandler } from '../../lib/types';
import type { ErrorRoute, PingRoute } from './utilities.routes';

export const ping: AppRouteHandler<PingRoute> = async (c) => {
  return c.json({
    time: new Date().toISOString(),
  });
};

const TestSchema = z.object({
  name: z.string(),
  age: z.number(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
});

export const error: AppRouteHandler<ErrorRoute> = async (c) => {
  switch (c.req.query('type')) {
    case 'not-found':
      throw notFound('user', '123');
    case 'unprocessable-entity':
      TestSchema.parse({ address: { string: '123 main St' } });
      throw new Error('This will not happen');
    default:
      throw new Error('Unhandled error');
  }
};
