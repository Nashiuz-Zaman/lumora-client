import { IApiResponse, TQueryDataWithQueryMeta } from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { IPayment } from "@/types/payment";

export const paymentApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<
      IApiResponse<TQueryDataWithQueryMeta<{ payments: IPayment[] }>>,
      Record<string, any>
    >({
      query: (params) => ({
        url: `/payments`,
        method: "GET",
        params: {
          limitFields: "orderId,name,email,amount,status",
          ...params,
        },
      }),
    }),
  }),

  overrideExisting: "throw",
});

// ----------
// Exports
// ----------
export const { useGetPaymentsQuery } = paymentApiSlice;
