import { OpenAPIHono } from '@hono/zod-openapi';

import { pingResource } from './ping/ping-resource';

export const utilityResource = new OpenAPIHono();

utilityResource.route('/utility', pingResource);
