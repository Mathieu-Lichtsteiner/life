export type ApiResult<T> =
  | { state: 'loading' }
  | { state: 'error'; error: Error }
  | { state: 'success'; data: T };
