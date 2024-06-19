
"use client"

import { configureStore } from '@reduxjs/toolkit';
import apiSlice from "./features/api/apiSlice"
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './auth/authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})



const initializeApp = async () => {
  try {
    // Force refetch to ensure it always runs
    const refreshResult = await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
    
    if (refreshResult.data) {
      await store.dispatch(apiSlice.endpoints.logedUser.initiate({}, { forceRefetch: true }));
    }
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

initializeApp();





setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store