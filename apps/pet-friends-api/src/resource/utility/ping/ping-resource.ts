import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi';

export const pingResource = new OpenAPIHono();

const PingParamsSchema = z.object({
  message: z
    .string()
    .optional()
    .openapi({
      description: 'An optional message to echo',
      param: {
        name: 'message',
        in: 'query',
      },
    }),
});

const PingResponseSchema = z
  .object({
    time: z.string().datetime(),
  })
  .openapi('PingResponse');

export type PingResponse = z.infer<typeof PingResponseSchema>;

const pingRoute = createRoute({
  description: 'Test basic web server functionality',
  method: 'get',
  path: '/ping',
  request: {
    params: PingParamsSchema,
  },
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: PingResponseSchema,
        },
      },
    },
  },
});

pingResource.openapi(pingRoute, (c) => {
  const message = c.req.query('message') ?? 'Hello, World!';
  return c.json({
    time: new Date().toISOString(),
    message,
  });
});
