import { createSlice } from "@reduxjs/toolkit";


type InitialProps = {
    token: string;
    user: any | null,
    activationToken: string;
    activationCode: string;
}


const initialState: InitialProps = {
    token: "",
    user: null,
    activationToken: "",
    activationCode: ""

}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token;

        },
        userLoggedIn: (state, action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user
        },

        userLoggedOut: (state) => {
            state.token = "";
            state.user = null
        },
        userActivation: (state, action) => {
            
            state.activationToken = action.payload.activationToken;
            state.activationCode = action.payload.activationCode
        }
    }
})

export const { userRegistration, userLoggedIn, userLoggedOut,userActivation } = authSlice.actions;

export default authSlice.reducer