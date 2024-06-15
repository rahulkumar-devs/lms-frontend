import apiSlice from "../features/api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {
    email: string;
    password: string;
};

const registrationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(userRegistration({ token: result.data.activationToken }));
                } catch (error: any) {
                    console.log(error);
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activationToken, activateCode }) => ({
                url: "/activate-account",
                method: "POST",
                body: { activationToken, activateCode },
                // credentials: 'include' as const
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/login",
                method: "POST",
                body: {
                    email,
                    password,
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const user = await queryFulfilled;

                    dispatch(
                        userLoggedIn({ token: user.data.accessToken, user: user.data.user })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            },
        }),
        // socialAuth
        socilaAuth: builder.mutation({
            query: ({ name, email, avatar }) => ({
                url: "/social-auth",
                method: "POST",
                body: {
                    name,
                    email,
                    avatar,
                },
                credentials: "include" as const,

            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const user = await queryFulfilled;
                    console.log(user)
                    dispatch(userLoggedIn({ user: user.data.user }));
                } catch (error: any) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocilaAuthMutation  } =
    registrationApi;

export default registrationApi;
