import { createRoute } from '@hono/zod-openapi';
import { ProfileSchema } from '@repo/database';
import { createItemsResponse } from '@repo/open-api';
import * as HttpResponse from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

const basePath = '/profiles';
const tags = ['Profiles'];

const ListResponseSchema = createItemsResponse(ProfileSchema);

export const list = createRoute({
  tags,
  description: 'List all profiles',
  method: 'get',
  path: basePath,
  responses: {
    [HttpResponse.OK]: jsonContent(ListResponseSchema, 'Successful response'),
  },
});

export type ListRoute = typeof list;
