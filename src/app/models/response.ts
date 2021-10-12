export interface ResponseAPI<T> {
  body?: T;
  error?: Error;
}

export interface Error {
  code: string,
  message: string
}
