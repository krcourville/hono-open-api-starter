import { createRoute } from '@hono/zod-openapi';
import { createRouter } from '@repo/open-api';
import * as HttpStatus from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';
import { createMessageObjectSchema } from 'stoker/openapi/schemas';

import { APP_NAME } from '../lib/constants';

export const indexRouter = createRouter().openapi(
  createRoute({
    description: `Root path for ${APP_NAME} API.`,
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HttpStatus.OK]: jsonContent(
        createMessageObjectSchema(APP_NAME),
        `${APP_NAME} `,
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: `${APP_NAME}: See /docs for API documentation or /openapi for the OpenAPI specification.`,
      },
      HttpStatus.OK,
    );
  },
);
