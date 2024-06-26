
"use client"

import { configureStore } from '@reduxjs/toolkit';
import apiSlice from "./features/api/apiSlice"
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './auth/authSlice';
// import courseApi from './course/courseApi';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,

  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: process.env.NODE_ENV !== 'production',
    serializableCheck: process.env.NODE_ENV !== 'production',
  }).concat(apiSlice.middleware)
})




const initializeApp = async () => {
  try {
    // Force refetch to ensure it always runs
    // const refreshResult = await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));

   
      await apiSlice.endpoints.logedUser.initiate({}, { forceRefetch: true });
    
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

initializeApp();





setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store