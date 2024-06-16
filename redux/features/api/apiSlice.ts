import { userLoggedIn, userLoggedOut } from '@/redux/auth/authSlice';
import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError, BaseQueryFn } from '@reduxjs/toolkit/query/react';



const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1/",

});


const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
    console.log("refreshResult", refreshResult)
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
      console.log("refreshResult data", result)
    } else {
      api.dispatch(userLoggedOut());

    }
  }
  return result;
};


const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
          console.log("me-user", user)
          dispatch(userLoggedIn({ token: user.data.accessToken, user: user.data.user }))
        } catch (error: any) {

          console.error(error.message)
        }
      }
    })
  }),

  // <====Reauth===>

});




export default apiSlice;
export const { useRefreshTokenQuery, useLogedUserQuery } = apiSlice