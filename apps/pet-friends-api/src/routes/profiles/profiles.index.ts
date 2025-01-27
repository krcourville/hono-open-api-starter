import { createRouter } from '@repo/open-api';

import * as handlers from './profiles.handlers';
import * as routes from './profiles.routes';

export const profilesRouter = createRouter().openapi(
  routes.list,
  handlers.list,
);
