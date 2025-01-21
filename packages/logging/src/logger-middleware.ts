import type { Context, Next } from 'hono';

import { getLogger } from './logger';

interface LoggerMiddlewareOptions {
  name: string;
}

export function loggerMiddleware({ name }: LoggerMiddlewareOptions) {
  return async (c: Context, next: Next) => {
    const logger = getLogger(name);

    const { method, url } = c.req;
    const start = Date.now();

    await next();

    const duration = Date.now() - start;
    const { status } = c.res;
    logger.debug({ method, url, duration, status }, 'Response');
  };
}
