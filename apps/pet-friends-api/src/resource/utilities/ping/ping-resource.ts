import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi';

// GET /ping

// schema

const PingQuerySchema = z.object({
  message: z.string().min(1).max(100).optional().openapi({
    description: 'Optional message to echo back.',
    example: 'Hello, World!',
  }),
});

const PingResponseSchema = z.object({
  time: z.string().datetime(),
});

export type PingResponse = z.infer<typeof PingResponseSchema>;

// route

const pingRoute = createRoute({
  description: 'Test basic web server functionality',
  method: 'get',
  path: '/ping',
  request: {
    query: PingQuerySchema,
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

// implementation
export const pingResource = new OpenAPIHono();
pingResource.openapi(pingRoute, (c) => {
  const message = c.req.query('message') ?? 'Hello, World!';
  return c.json({
    time: new Date().toISOString(),
    message,
  });
});
