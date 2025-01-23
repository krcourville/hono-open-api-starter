import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { notFound } from '@repo/open-api/errors';

// Schema

const ErrorQuerySchema = z.object({
  type: z.enum(['unhandled', 'not-found']).default('unhandled').openapi({
    description: 'The type of error to simulate.',
  }),
});

const ErrorResponseSchema = z.object({
  message: z.string(),
});

// Route

const route = createRoute({
  description: 'Test unhandled error functionality',
  method: 'post',
  path: '/error',
  request: {
    query: ErrorQuerySchema,
  },
  responses: {
    500: {
      description: 'Unhandled error',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

// Implementation

export const errorResource = new OpenAPIHono();
errorResource.openapi(route, (c) => {
  switch (c.req.query('type')) {
    case 'not-found':
      throw notFound('user', '123');
    default:
      throw new Error('Unhandled error');
  }
});
