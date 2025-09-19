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

export type TQueryDataWithQueryMeta<T> = T & { queryMeta: IQueryMeta };
