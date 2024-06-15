import { userLoggedIn, userLoggedOut } from '@/redux/auth/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/", // Replace with your base URL
  }),
  endpoints: (builder) => ({

    refreshToken: builder.query({
      query: (data) => ({
        url: "/refresh-token",
        method: "GET",
        credentials: 'include' as const
      })
    }),

    logedUser: builder.query({
      query: (data) => ({
        url: "/me",
        method: "GET",
        credentials: 'include' as const

      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const user = await queryFulfilled;
          dispatch(userLoggedIn({ token: user.data.accessToken, user: user.data }))
        } catch (error: any) {
       
          console.error(error.message)
        }
      }
    })
  }),
});





export default apiSlice;
export const { useRefreshTokenQuery,useLogedUserQuery } = apiSlice