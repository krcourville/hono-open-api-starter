import { OpenAPIHono } from '@hono/zod-openapi';

import { pingResource } from './ping/ping-resource';
import { errorResource } from './error/error-resource';

export const utilities = new OpenAPIHono();
utilities.route('/utilities', pingResource);
utilities.route('/utilities', errorResource);
