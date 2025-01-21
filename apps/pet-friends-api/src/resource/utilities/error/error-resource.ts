import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi';

// Schema

const ErrorResponseSchema = z.object({
  message: z.string(),
});

// Route

const route = createRoute({
  description: 'Test unhandled error functionality',
  method: 'post',
  path: '/unhandled-error',
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
errorResource.openapi(route, () => {
  throw new Error('Unhandled error');
});
