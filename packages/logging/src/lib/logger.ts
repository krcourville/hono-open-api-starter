/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair -- only in env.ts should we access process.env */
/* eslint-disable node/no-process-env -- logger is a lower level service, as a result, it will not depend on app-config */
/* eslint-disable no-console -- need to be able to log to console for any problems in logger */

import process from 'node:process';
import { pino } from 'pino';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// avoiding zod for now, to reduce dependencies.
const useDevLogger
  = process.env.DEV_LOGGER === 'true' || process.env.DEV_LOGGER === '1';

const logLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();

const devLoggerTransport = useDevLogger
  ? {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    }
  : undefined;

const root = pino({
  level: logLevel,
  ...devLoggerTransport,
});

/**
 * Returns a named logger.
 */
export function getLogger(name: string): pino.Logger {
  return root.child({
    name,
  });
}

/**
 * Returns the configured log level based on the environment variable LOG_LEVEL
 * with a default of 'info' if the environment variable is not set or is invalid.
 */
export function getLogLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL?.toLowerCase();

  switch (envLevel) {
    case 'debug':
      return 'debug';
    case 'info':
      return 'info';
    case 'warn':
      return 'warn';
    case 'error':
      return 'error';
    default:
      console.warn(`Invalid log level: ${envLevel}. Using 'info' as default.`);
      return 'info';
  }
}
