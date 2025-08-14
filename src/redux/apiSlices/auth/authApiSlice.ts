import { baseApiSlice } from '../baseApiSlice';

export const authApiSlice = baseApiSlice.injectEndpoints({
   endpoints: builder => ({
      localLogin: builder.mutation({
         query: data => {
            return {
               url: `/auth/login/local`,
               method: 'POST',
               data,
            };
         },
      }),

      socialLogin: builder.mutation({
         query: data => ({
            url: '/auth/login/social',
            method: 'POST',
            data,
         }),
      }),
      getCurrentUser: builder.query({
         query: () => ({
            url: '/auth/me',
            method: 'GET',
         }),
      }),
   }),

   overrideExisting: 'throw',
});

export const {
   useLocalLoginMutation,
   useSocialLoginMutation,
   useGetCurrentUserQuery,
} = authApiSlice;
