// ---------------------------------------------------------
// STRING KEY OF
// Extracts only string keys from a type
// ---------------------------------------------------------
export type TStringKeyOf<T> = Extract<keyof T, string>;

// ---------------------------------------------------------
// SORT OPTIONS
// Generic type for building sort dropdowns or API params
// ---------------------------------------------------------
export type TSortOptions<K extends Record<string, any>> = {
  label: string;
  value: TStringKeyOf<K>;
}[];

// ---------------------------------------------------------
// GENERIC API RESPONSE
// Standard structure returned from API endpoints
// ---------------------------------------------------------
export interface IApiResponse<T = any> {
  success: boolean;
  status: string;
  message?: string;
  data?: T;
}

// ---------------------------------------------------------
// QUERY META
// Metadata for paginated queries
// ---------------------------------------------------------
export interface IQueryMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ---------------------------------------------------------
// QUERY DATA WITH META
// Combines resource data with pagination metadata
// ---------------------------------------------------------
export type TQueryDataWithQueryMeta<T extends Record<string, any>> = T & {
  queryMeta: IQueryMeta;
};

// ---------------------------------------------------------
// MAKE SOME REQUIRED
// Utility to make selected keys required while keeping others optional
// ---------------------------------------------------------
export type TMakeSomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Partial<Omit<T, K>>;
