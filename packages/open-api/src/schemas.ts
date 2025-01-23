import { z } from 'zod';

/**
 * A simple response schema that contains a message.
 */
export const MessageResponseSchema = z.object({
  message: z.string(),
});

/**
 * A type that represents a response that contains a message.
 */
export type MessageResponse = z.infer<typeof MessageResponseSchema>;

export const ErrorResponseSchema = MessageResponseSchema.and(
  z.object({
    details: z.record(z.string(), z.unknown()),
  }),
);

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
