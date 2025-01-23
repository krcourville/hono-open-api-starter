import { createRouter } from '../../lib/create-app';
import * as handlers from './utilities.handlers';
import * as routes from './utilities.routes';

export const utilitiesRouter = createRouter()
  .openapi(routes.ping, handlers.ping)
  .openapi(routes.error, handlers.error);
