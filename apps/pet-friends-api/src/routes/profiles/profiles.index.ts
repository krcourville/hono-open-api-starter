import { createRouter } from '@repo/open-api';

import * as handlers from './profiles.handlers';
import * as routes from './profiles.routes';

export const profilesRouter = createRouter()
  .openapi(
    routes.create,
    handlers.create,
  )
  .openapi(
    routes.getById,
    handlers.getById,
  )
  .openapi(
    routes.list,
    handlers.list,
  )
  .openapi(
    routes.update,
    handlers.update,
  )
  .openapi(
    routes.remove,
    handlers.remove,
  );
