import { userLoggedIn, userLoggedOut } from '@/redux/auth/authSlice';
import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError, BaseQueryFn } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1/",
  credentials: 'include' as const, 
  
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: '/refresh-token', method: 'GET' }, api, extraOptions);
    const getMe = await baseQuery({ url: '/me', method: 'GET' }, api, extraOptions);

    if (refreshResult.data || getMe.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
    }
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User','Course','Layout'],
  
  endpoints: (builder) => ({
    refreshToken: builder.query({ 
      query: () => ({
        url: "/refresh-token",
        method: "GET",
        credentials: 'include',
        
      }),
      providesTags: ['User'],
    }),
    logedUser: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const user = await queryFulfilled;
          dispatch(userLoggedIn({ token: user.data.accessToken, user: user.data.user }));
        } catch (error: any) {
          console.error(error.message);
        }
      },
      providesTags: ['User'],
    }),
  }),
});

export default apiSlice;
export const { useRefreshTokenQuery, useLogedUserQuery } = apiSlice;
