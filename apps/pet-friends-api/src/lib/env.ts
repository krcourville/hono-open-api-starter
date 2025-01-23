/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair -- only in env.ts should we access process.env */

import { getEnv } from '@repo/app-config';
import { z } from 'zod';

import { APP_ID, APP_PORT } from './constants';

const EnvSchema = z.object({
  PORT: z.string().transform(Number).default(APP_PORT.toString()),
});

export type env = z.infer<typeof EnvSchema>;

export const env = getEnv(EnvSchema, APP_ID);
