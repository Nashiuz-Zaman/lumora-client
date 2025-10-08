export type TStringKeyOf<T> = Extract<keyof T, string>;

export type TSortOptions<K extends Record<string, any>> = {
  label: string;
  value: TStringKeyOf<K>;
}[];

// Generic API response
export interface IApiResponse<T = any> {
  success: boolean;
  status: string;
  message?: string;
  data?: T;
}

// Query Meta for any resource
export interface IQueryMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Generic for Querydata along with resource
export type TQueryDataWithQueryMeta<T extends Record<string, any>> = T & {
  queryMeta: IQueryMeta;
};
