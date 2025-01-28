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

    const { url } = c.req;
    const start = Date.now();

    await next();

    const duration = Date.now() - start;
    const { status } = c.res;
    let query: Record<string, unknown> | undefined = c.req.query();
    if (Object.keys(query).length === 0) {
      query = undefined;
    }
    logger.debug({ url, duration, status, query }, 'RESPONSE');
  };
}
