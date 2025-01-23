/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair -- only in env.ts should we access process.env */
/* eslint-disable node/no-process-env -- only in env.ts should we access process.env */
/* eslint-disable no-console -- logger depends on configuration, so using console here */

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import process from 'node:process';
import { z } from 'zod';

import { APP_PORT } from './constants';

const environment = process.env.ENVIRONMENT ?? 'pilot';
expand(
  config({
    path: [`.env.${environment}`, '.env', `.env.local`],
  }),
);

const EnvSchema = z.object({
  PORT: z.string().transform(Number).default(APP_PORT.toString()),
});

export type env = z.infer<typeof EnvSchema>;

const { data, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

console.info('✅ Valid env:');

export const env = data;
