import type { Env, ErrorHandler } from 'hono';

import { getLogger } from '@repo/logging';
import { ZodError } from 'zod';

import { ApiError } from './errors';

interface ErrorHandlerMiddlewareOptions {
  /**
   * The logger name to use for logging errors.
   */
  loggerName: string;
}

/**
 * A hono error handler that logs errors and ensures
 * API response is always in a consistent format.
 *
 * NOTE: ApiError instances are logged at the debug level.
 */
export function errorHandler<TBindings extends Env>(
  options: ErrorHandlerMiddlewareOptions,
): ErrorHandler<TBindings> {
  return (err, c) => {
    const logger = getLogger(options.loggerName);

    if (err instanceof ApiError) {
      logger.debug(
        { err, user: err.details?.user, system: err.details?.system },
        'API error',
      );
      return c.json(
        {
          message: 'Requested resource was not found',
          details: err.details?.user,
        },
        err.statusCode,
      );
    }

    if (err instanceof ZodError) {
      const errors = err.issues;
      logger.debug(errors, 'ZodError');
      return c.json(
        {
          message: 'Validation failed',
          details: {
            success: false,
            error: {
              issues: errors,
            },
          },
        },
        422,
      );
    }

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
