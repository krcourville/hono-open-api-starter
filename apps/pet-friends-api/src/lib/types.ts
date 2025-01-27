import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';

import type { AppBindsWithCorrelationId } from '../middleware/correlation-id';

/**
 * Define services here that should be
 * made available to all routes.
 */
export interface AppBindings extends AppBindsWithCorrelationId {
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
