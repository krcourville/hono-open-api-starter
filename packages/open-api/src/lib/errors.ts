import type { ContentfulStatusCode } from 'hono/utils/http-status';

import * as HttpStatus from 'stoker/http-status-codes';

interface ApiErrorDetails {
  /**
   * System specific details that should not be shared with the user.
   */
  system?: Record<string, unknown>;

  /**
   * User specific details that should be shared with the user.
   */
  user?: Record<string, unknown>;
}

interface ApiErrorInput {
  /**
   * The error message.
   */
  message: string;

  /**
   * The HTTP status code to return.
   */
  statusCode: ContentfulStatusCode;

  /**
   * Additional details to help troubleshoot the error.
   */
  details?: ApiErrorDetails;
}

/**
 * An api error that can be used to return a consistent error response.
 */
export class ApiError extends Error {
  public details: ApiErrorDetails | undefined;
  public statusCode: ContentfulStatusCode;

  constructor(input: ApiErrorInput) {
    super(input.message);
    this.details = input.details;
    this.statusCode = input.statusCode;
    this.name = this.constructor.name;
  }
}

/**
 * Utility function to create a not found error.
 *
 * @param entity - name of the entity that was not found
 * @param id - id of the entity that was not found
 * @param details - additional details to help troubleshoot the error
 */
export function notFound(
  entity: string,
  id: string,
  details?: ApiErrorDetails,
): ApiError {
  return new ApiError({
    message: 'The requested resource was not found.',
    statusCode: HttpStatus.NOT_FOUND,
    details: {
      user: {
        entity,
        id,
        ...details?.user,
      },
      system: details?.system,
    },
  });
}
