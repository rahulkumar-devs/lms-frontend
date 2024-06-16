import apiSlice from "../features/api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

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
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userRegistration({ token: data.activationToken }));
                } catch (error) {
                    console.error("Registration error:", error);
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activationToken, activateCode }) => ({
                url: "/activate-account",
                method: "POST",
                body: { activationToken, activateCode },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/login",
                method: "POST",
                body: { email, password },
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userLoggedIn({ token: data.accessToken, user: data.user }));
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
        }),
        socialAuth: builder.mutation({
            query: ({ name, email, avatar }) => ({
                url: "/social-auth",
                method: "POST",
                body: { name, email, avatar },
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userLoggedIn({ token: data.accessToken, user: data.user }));
                } catch (error) {
                    console.error("Social auth error:", error);
                }
            },
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.error("Logout error:", error);
                }
            },
        }),

        updateProfile: builder.mutation({
            query: ({ name, avatar }) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('avatar', avatar); // Assuming avatar is a File object
             
        
                return {
                  url: '/update-userinfo',
                  method: 'PUT',
                  body: formData,
                  credentials: 'include' as const,
                }
            }
        })
    }),
});

export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation,
    useLogOutUserMutation,
    useUpdateProfileMutation
} = registrationApi;

export default registrationApi;
