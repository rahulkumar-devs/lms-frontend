import apiSlice from "../features/api/apiSlice";


const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHomeLayout: builder.query({
            query: (type) => ({
                url: `/get-all-layout/${type}`,
                method: "GET",
                credentials: "include",
                
            }),
            providesTags: ["Layout"]

        }),

        editHomeLayout:builder.mutation({
            query:(data)=>({
               url:"/update-layout" ,
               method:"PUT",
               credentials:"include" as const,
               body:data
            }),
      invalidatesTags: ["Layout"]

        })
    }),
    
})


export const {useGetHomeLayoutQuery,useEditHomeLayoutMutation } = layoutApi;

export default layoutApi;