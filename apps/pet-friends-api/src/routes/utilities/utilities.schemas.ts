import { z } from 'zod';

export const PingResponseSchema = z.object({
  time: z.string().datetime(),
});
export type PingResponse = z.infer<typeof PingResponseSchema>;

export const ErrorQuerySchema = z.object({
  type: z
    .enum(['unhandled', 'not-found', 'unprocessable-entity'])
    .default('unhandled')
    .openapi({
      description: 'The type of error to simulate.',
    }),
});
export type ErrorQuery = z.infer<typeof ErrorQuerySchema>;
