import { ErrorObject } from '../types/common.js';

export const isErrorObject = (error: unknown): error is ErrorObject =>
  Boolean(
    error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string',
  );
