import { createRoute, z } from '@hono/zod-openapi';
import { PetSchema, ProfileSchema } from '@repo/database';
import {
  itemListSchema,
  itemSchema,
  MessageResponseSchema,
} from '@repo/open-api';
import * as HttpStatus from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';
import { createErrorSchema } from 'stoker/openapi/schemas';

const basePath = '/profiles';
const tags = ['Profiles'];

const ItemResponseSchema = itemSchema(ProfileSchema);
const ItemRequestSchema = ProfileSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
const ItemListSchema = itemListSchema(ProfileSchema);

// Create
const ItemCreateSchema = ItemRequestSchema.and(
  z.object({
    pets: z.array(
      PetSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        profileId: true,
      }),
    ),
  }),
);

export const create = createRoute({
  operationId: 'createProfile',
  tags,
  description: 'Create a profile',
  method: 'post',
  path: `${basePath}`,
  request: {
    body: jsonContent(ItemCreateSchema, 'Profile to create'),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(
      ItemResponseSchema,
      'Successful response',
    ),
    [HttpStatus.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(ItemCreateSchema),
      'Validation error',
    ),
  },
});

export type CreateRoute = typeof create;

// GetById

const GetByIdQuerySchema = ItemResponseSchema.and(
  z.object({
    pets: PetSchema.array().optional(),
  }),
);

export const getById = createRoute({
  operationId: 'getProfileById',
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
    [HttpStatus.OK]: jsonContent(GetByIdQuerySchema, 'Successful response'),
    [HttpStatus.NOT_FOUND]: jsonContent(
      MessageResponseSchema,
      'Profile not found',
    ),
  },
});

export type GetByIdRoute = typeof getById;

// List
export const list = createRoute({
  operationId: 'listProfiles',
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
const ItemUpdateSchema = ItemRequestSchema.partial();
export const update = createRoute({
  operationId: 'updateProfile',
  tags,
  description: 'Update a profile',
  method: 'put',
  path: `${basePath}/{id}`,
  request: {
    params: z
      .object({
        id: z.string().cuid(),
      })
      .openapi({
        description: 'The id of the profile to update',
      }),
    body: jsonContent(ItemUpdateSchema, 'Profile to update'),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(ItemResponseSchema, 'Successful response'),
    [HttpStatus.NOT_FOUND]: jsonContent(
      MessageResponseSchema,
      'Profile not found',
    ),
    [HttpStatus.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(ItemUpdateSchema),
      'Validation error',
    ),
  },
});

export type UpdateRoute = typeof update;

// Delete
export const remove = createRoute({
  operationId: 'deleteProfile',
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
    [HttpStatus.GONE]: jsonContent(ItemResponseSchema, 'Profile deleted'),
    [HttpStatus.NOT_FOUND]: jsonContent(
      MessageResponseSchema,
      'Profile not found',
    ),
  },
});

export type RemoveRoute = typeof remove;
