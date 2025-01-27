import { prisma } from '@repo/database';

import type { AppRouteHandler } from '../../lib/types';
import type { ListRoute } from './profiles.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const items = await prisma.profile.findMany();
  return c.json({
    items,
  });
};
