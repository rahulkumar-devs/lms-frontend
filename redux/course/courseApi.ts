import apiSlice from "../features/api/apiSlice";

const courseApi =  apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadCourse: builder.mutation({
      query: (data) => ({
        url: "/upload-course",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error("Registration error:", error);
        }
      },
    }),
  }),
});

export const {useUploadCourseMutation} = courseApi

export default courseApi;