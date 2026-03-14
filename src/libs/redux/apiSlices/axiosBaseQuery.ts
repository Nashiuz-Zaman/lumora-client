import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { withRetry } from "@/utils/withRetry";

interface IAxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
}

const RETRYABLE_STATUS_CODES = [408, 429, 502, 503, 504];

export const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<IAxiosBaseQueryArgs, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    // We define the actual execution logic as a separate async function
    const executeRequest = async () => {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
      });
      return result.data;
    };

    const checkErrorType = (error: any) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // 1. If there's no status (Network Error/Timeout), retry
        if (!status) return true;

        // 2. Only retry if the status is in our "Safe" list
        return RETRYABLE_STATUS_CODES.includes(status);
      }
      return false;
    };

    try {
      const responseData = await withRetry(
        executeRequest,
        3,
        1200,
        checkErrorType,
      );

      return { data: responseData };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
