import type { Context, Next } from 'hono';

import { getLogger } from './logger';

interface LoggerMiddlewareOptions {
  /**
   * The logger name to use for logging requests and responses.
   */
  loggerName: string;
}

/**
 * A middleware that logs all requests and responses at the DEBUG level.
 */
export function loggerMiddleware({
  loggerName: name,
}: LoggerMiddlewareOptions) {
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
