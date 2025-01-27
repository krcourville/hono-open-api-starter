import { createRoute, z } from '@hono/zod-openapi';
import { ProfileSchema } from '@repo/database';
import { itemListSchema, itemSchema, MessageResponseSchema } from '@repo/open-api';
import * as HttpStatus from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';
import { createErrorSchema } from 'stoker/openapi/schemas';

const basePath = '/profiles';
const tags = ['Profiles'];

const ItemSchema = itemSchema(ProfileSchema);
const ItemListSchema = itemListSchema(ProfileSchema);

// Create
const ProfileCreateSchema = ProfileSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const create = createRoute({
  tags,
  description: 'Create a profile',
  method: 'post',
  path: `${basePath}`,
  request: {
    body: jsonContent(ProfileCreateSchema, 'Profile to create'),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(ItemSchema, 'Successful response'),
    [HttpStatus.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(ProfileCreateSchema), 'Validation error'),
  },
});

export type CreateRoute = typeof create;

// GetById

export const getById = createRoute({
  tags,
  description: 'Retrieve a profile by id',
  method: 'get',
  path: `${basePath}/{id}`,
  request: {
    params: z.object({
      id: z.string().cuid(),
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(ItemSchema, 'Successful response'),
    [HttpStatus.NOT_FOUND]: jsonContent(MessageResponseSchema, 'Profile not found'),
  },
});

export type GetByIdRoute = typeof getById;

// List
export const list = createRoute({
  tags,
  description: 'List all profiles',
  method: 'get',
  path: basePath,
  responses: {
    [HttpStatus.OK]: jsonContent(ItemListSchema, 'Successful response'),
  },
});

export type ListRoute = typeof list;

// Update
const UpdateRequestSchema = ProfileCreateSchema.partial();
export const update = createRoute({
  tags,
  description: 'Update a profile',
  method: 'put',
  path: `${basePath}/{id}`,
  request: {
    params: z.object({
      id: z.string().cuid(),
    }),
    body: jsonContent(UpdateRequestSchema, 'Profile to update'),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(ItemSchema, 'Successful response'),
    [HttpStatus.NOT_FOUND]: jsonContent(MessageResponseSchema, 'Profile not found'),
    [HttpStatus.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(UpdateRequestSchema), 'Validation error'),
  },
});

export type UpdateRoute = typeof update;

// Delete
export const remove = createRoute({
  tags,
  description: 'Delete a profile',
  method: 'delete',
  path: `${basePath}/{id}`,
  request: {
    params: z.object({
      id: z.string().cuid(),
    }),
  },
  responses: {
    [HttpStatus.GONE]: jsonContent(ItemSchema, 'Profile deleted'),
    [HttpStatus.NOT_FOUND]: jsonContent(MessageResponseSchema, 'Profile not found'),
  },
});

export type RemoveRoute = typeof remove;
