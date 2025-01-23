/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair -- only in env.ts should we access process.env */
/* eslint-disable node/no-process-env -- only in env.ts should we access process.env */
/* eslint-disable no-console -- logger depends on configuration, so using console here */

import type { z } from 'zod';

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import process from 'node:process';

const environment = process.env.ENVIRONMENT ?? 'pilot';
expand(
  config({
    path: [`.env.${environment}`, '.env', `.env.local`],
  }),
);

/**
 * Resolves and returns configuration based on the current environment,
 * and given a schema.
 */
export function getEnv<T extends z.ZodTypeAny>(schema: T, packageName: string) {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    console.error(`❌ Invalid env for ${packageName}:`);
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
  }

  return data;
}
