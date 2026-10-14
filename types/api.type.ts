export interface ApiResponse<T = undefined> {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: T;
  error?: unknown;
  errors?: unknown;
}

export type ParamsMap = Record<string, string>;
export type PathParams = Record<string, unknown>;
export type QueryParams = Record<string, unknown>;
export type CompleteUrlOptions = {
  pathParams?: PathParams;
  queryParams?: QueryParams;
};
