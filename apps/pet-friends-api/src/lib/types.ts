import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';

/**
 * Define services here that should be
 * made available to all routes.
 */
export interface AppBindings {
  // Example:
  // Variables: {
  //   myService: MyService;
  // }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
