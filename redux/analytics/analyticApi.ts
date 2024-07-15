import apiSlice from "../features/api/apiSlice";



const analyticApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        courseAnalyticApi: builder.query({
            query: () => ({
                url: "/get-courses-analytics",
                method: "GET",
                credentials: "include" as const,

            })
        }),
        userAnalyticApi: builder.query({
            query: () => ({
                url: "/get-users-analytics",
                method: "GET",
                credentials: "include" as const,

            })
        }),
        orderAnalyticApi: builder.query({
            query: () => ({
                url: "/get-orders-analytics",
                method: "GET",
                credentials: "include" as const,

            })
        }),
    })
})

export const { useCourseAnalyticApiQuery, useOrderAnalyticApiQuery, useUserAnalyticApiQuery } = analyticApi;

export default analyticApi;