import apiSlice from "../features/api/apiSlice";
import { userActivation } from "./authSlice";


const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        changeEmail: builder.mutation({
            query: ({ email }) => ({
                url: "/change-email",
                method: "POST",
                body: { email },
                credentials: "include" as const,

            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(userActivation({ activationToken: data.data.emailToken, activationCode: data.data.emailCode }))
                } catch (error) {
                    console.error("Registration error:", error);
                }
            },
            invalidatesTags: ["User"],

        }),
        verifyEmail: builder.mutation({
            query: ({ emailToken, emailCode }) => ({
                url: "/email-verification",
                method: "PUT",
                body: { emailToken, emailCode },
                credentials: "include" as const,

            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                } catch (error) {
                    console.error("Registration error:", error);
                }
            },
            invalidatesTags: ["User"],

        }),

        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "/update-password",
                method: "PUT",
                body: { oldPassword, newPassword },
                credentials: "include" as const,

            }),
            invalidatesTags: ["User"],

        }),
        getAllUsers: builder.query({
            query: ({ }) => ({
                url: "/users",
                method: "GET",

                credentials: "include" as const,

            }),
            providesTags: ["User"],

        }),

        changeUserRole: builder.mutation({
            query: ({role,email} ) => ({
                url: "/role-permission",
                method: "PUT",
                body:{role,email},
                credentials: "include" as const,
            }),
            invalidatesTags: ["User"],
        })


    })
})

export const { useChangeEmailMutation, useVerifyEmailMutation, useUpdatePasswordMutation, useGetAllUsersQuery,useChangeUserRoleMutation } = userApi