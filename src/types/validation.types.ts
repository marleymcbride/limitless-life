/**
 * Validation & Error Types
 *
 * Type-safe error handling and validation utilities.
 */

/**
 * Custom error classes
 */
export class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string, id?: string) {
    super(
      `${resource}${id ? ` with id ${id}` : ''} not found`,
      'NOT_FOUND',
      404
    );
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string, details?: unknown) {
    super(message, 'CONFLICT', 409, details);
    this.name = 'ConflictError';
  }
}

/**
 * Validation result type
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

/**
 * Field error
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Error response shape
 */
export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
  fieldErrors?: FieldError[];
}

/**
 * Result type for operations that can fail
 */
export type Result<T, E extends Error = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Create a successful result
 */
export function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

/**
 * Create a failed result
 */
export function err<E extends Error>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Unwrap a result or throw an error
 */
export function unwrapResult<T>(result: Result<T>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

/**
 * Type guard for success
 */
export function isSuccess<T>(result: Result<T>): result is { success: true; data: T } {
  return result.success;
}

/**
 * Type guard for failure
 */
export function isFailure<T, E extends Error>(result: Result<T, E>): result is { success: false; error: E } {
  return !result.success;
}

/**
 * Async result type
 */
export type AsyncResult<T, E extends Error = Error> = Promise<Result<T, E>>;
