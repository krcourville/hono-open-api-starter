import { hc } from 'hono/client';

import type { AppType } from '../../../app';

export const apiClient = hc<AppType>('http://localhost:4000/');
