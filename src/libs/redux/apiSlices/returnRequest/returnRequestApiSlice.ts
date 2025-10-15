import { IApiResponse, TQueryDataWithQueryMeta } from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { IReturnRequest, TPopulatedReturnRequest } from "@/types/returnRequest";

export const returnRequestApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST: Submit return request
    createReturnRequest: builder.mutation({
      query: (formData) => ({
        url: "/return-requests",
        method: "POST",
        data: formData,
      }),
    }),

    // GET: Fetch return requests (admin use)
    getReturnRequests: builder.query<
      IApiResponse<
        TQueryDataWithQueryMeta<{ returnRequests: IReturnRequest[] }>
      >,
      object
    >({
      query: (params = {}) => ({
        url: "/return-requests",
        method: "GET",
        params,
      }),
    }),

    // GET: Fetch single return request by ID
    getReturnRequest: builder.query<
      IApiResponse<{ returnRequest: Partial<TPopulatedReturnRequest> }>,
      { id: string; limitFields?: string; populate?: string }
    >({
      query: ({ id, limitFields, populate }) => ({
        url: `/return-requests/${id}`,
        method: "GET",
        params: {
          ...(limitFields && { limitFields }),
          ...(populate && { populate }),
        },
      }),
    }),

    // PATCH: Approve return request (optionally with refundAmount)
    approveReturnRequest: builder.mutation<
      IApiResponse,
      { id: string; refundAmount: number }
    >({
      query: ({ id, refundAmount }) => ({
        url: `/return-requests/approve/${id}`,
        method: "PATCH",
        data: refundAmount !== undefined ? { refundAmount } : {},
      }),
    }),

    // PATCH: Reject return request
    rejectReturnRequest: builder.mutation<IApiResponse, { id: string }>({
      query: (id) => ({
        url: `/return-requests/reject/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateReturnRequestMutation,
  useGetReturnRequestsQuery,
  useGetReturnRequestQuery,
  useApproveReturnRequestMutation,
  useRejectReturnRequestMutation,
} = returnRequestApiSlice;
