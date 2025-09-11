// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IApiResponse<T = any> {
  success: boolean;
  status: string;
  message?: string;
  data?: T;
}

export interface IQueryMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
