// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IApiResponse<T = any> {
  success: boolean;
  status: string;
  message: string;
  data: T;
}
