/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair -- only in env.ts should we access process.env */
/* eslint-disable node/no-process-env -- only in env.ts should we access process.env */
/* eslint-disable no-console -- logger depends on configuration, so using console here */

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import process from 'node:process';
import { z } from 'zod';

const environment = process.env.ENVIRONMENT ?? 'pilot';
expand(
  config({
    path: [`.env.${environment}`, '.env', `.env.local`],
  }),
);

const GlobalEnvSchema = z.object({
  ENVIRONMENT: z
    .enum(['pilot', 'prod'])
    .default('pilot')
    .describe('The environment in which the app is running.'),
  DATABASE_URL: z.string().describe('URL to the shared Postgres database.'),
});

export type GlobalEnv = z.infer<typeof GlobalEnvSchema>;

/**
 * Resolves and returns configuration based on the current environment,
 * and given a schema combined with the global schema.
 */
export function getEnv<T extends z.ZodTypeAny>(schema: T, packageName: string) {
  const combinedSchema = GlobalEnvSchema.and(schema);

  const { data, error } = combinedSchema.safeParse(process.env);

  if (error) {
    console.error(`❌ Invalid env for ${packageName}:`);
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
  }

  return data;
}
