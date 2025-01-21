import type { Env, ErrorHandler } from 'hono';
import { getLogger } from '@repo/logging/logger';

interface ErrorHandlerMiddlewareOptions {
  /**
   * The logger name to use for logging errors.
   */
  loggerName: string;
}

/**
 * A middleware that logs errors and ensures
 * API response is always in a consistent format.
 */
export function errorHandler(
  options: ErrorHandlerMiddlewareOptions,
): ErrorHandler<Env> {
  return (err, c) => {
    const logger = getLogger(options.loggerName);
    logger.error(err, 'Unhandled error');

    return c.json(
      {
        message:
          'An unexpected error occurred. Contact API owner for assistance.',
      },
      500,
    );
  };
}
