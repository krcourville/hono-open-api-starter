import { prisma } from '@repo/database';
import { notFound } from '@repo/open-api';
import * as HttpResponse from 'stoker/http-status-codes';

import type { AppRouteHandler } from '../../lib/types';
import type {
  CreateRoute,
  GetByIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from './profiles.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const items = await prisma.profile.findMany();
  return c.json({
    items,
  });
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { pets, ...profile } = c.req.valid('json');
  const item = await prisma.profile.create({
    data: {
      ...profile,
      pets: {
        create: pets,
      },
    },
  });
  return c.json({ item }, HttpResponse.CREATED);
};

export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
  const item = await prisma.profile.findUnique({
    where: { id: c.req.param('id') },
    include: {
      pets: true,
    },
  });

  if (!item) {
    throw notFound('profile', c.req.param('id'));
  }
  return c.json({ item }, HttpResponse.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const item = await prisma.profile.update({
    where: { id: c.req.param('id') },
    data: c.req.valid('json'),
  });
  if (!item) {
    throw notFound('profile', c.req.param('id'));
  }
  return c.json({ item }, HttpResponse.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const item = await prisma.profile.delete({
    where: { id: c.req.param('id') },
  });
  if (!item) {
    throw notFound('profile', c.req.param('id'));
  }
  return c.json({ item }, HttpResponse.GONE);
};
