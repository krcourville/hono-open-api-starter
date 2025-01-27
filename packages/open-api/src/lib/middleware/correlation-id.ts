import type { Context, Env, Next } from 'hono';

import { addLoggerContextProvider } from '@repo/logging';
import { getContext } from 'hono/context-storage';

export type AppBindsWithCorrelationId = Env & {
  Variables: {
    correlationId: string;
  };
};

/**
 * Defines a middleware that handles correlation id using the header
 * X-Correlation-Id.  If the header is not present, a new correlation id
 * is generated and added to the request context.
 */
export function correlationId<TBindings extends AppBindsWithCorrelationId>() {
  addLoggerContextProvider(() => {
    try {
      const correlationId = getContext<TBindings>().var.correlationId;
      return { correlationId };
    }
    catch {
      return {
        correlationId: undefined,
      };
    }
  });

  return async (c: Context<TBindings>, next: Next) => {
    const correlationId = c.req.header('x-correlation-id') ?? crypto.randomUUID();
    c.set('correlationId', correlationId);
    c.header('x-correlation-id', correlationId);
    await next();
  };
}
