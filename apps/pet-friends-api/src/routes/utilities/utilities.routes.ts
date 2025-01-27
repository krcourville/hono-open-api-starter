import { createRoute } from '@hono/zod-openapi';
import { ErrorResponseSchema } from '@repo/open-api';
import * as HttpResponse from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

import { ErrorQuerySchema, PingResponseSchema } from './utilities.schemas';

const basePath = '/api-utilities';
const tags = ['Utilities'];

export const ping = createRoute({
  tags,
  description: 'Utility endpoint to verify ping functionality',
  method: 'get',
  path: `${basePath}/ping`,
  responses: {
    [HttpResponse.OK]: jsonContent(PingResponseSchema, 'Successful response'),
  },
});
export type PingRoute = typeof ping;

export const error = createRoute({
  tags,
  description: 'Utility endpoint to verify error handling',
  method: 'post',
  path: `${basePath}/error`,
  request: {
    query: ErrorQuerySchema,
  },
  responses: {
    [HttpResponse.INTERNAL_SERVER_ERROR]: jsonContent(
      ErrorResponseSchema,
      'Internal server error',
    ),
    [HttpResponse.NOT_FOUND]: jsonContent(ErrorResponseSchema, 'Not found'),
    [HttpResponse.UNPROCESSABLE_ENTITY]: jsonContent(
      ErrorResponseSchema,
      'Unprocessable entity',
    ),
  },
});
export type ErrorRoute = typeof error;
