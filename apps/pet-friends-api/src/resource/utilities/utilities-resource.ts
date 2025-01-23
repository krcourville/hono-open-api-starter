import { OpenAPIHono } from '@hono/zod-openapi';

import { errorResource } from './error/error-resource';
import { pingResource } from './ping/ping-resource';

export const utilities = new OpenAPIHono();
utilities.route('/utilities', pingResource);
utilities.route('/utilities', errorResource);
