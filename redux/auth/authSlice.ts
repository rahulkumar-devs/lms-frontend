import { createSlice } from "@reduxjs/toolkit";


type InitialProps ={
    token:string;
    user: any |null
}


const initialState:InitialProps = {
    token: "",
    user: null
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
    }
})

export const { userRegistration, userLoggedIn ,userLoggedOut} = authSlice.actions;

export default authSlice.reducer