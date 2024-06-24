import apiSlice from "../features/api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
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
          await queryFulfilled;
        } catch (error) {
          console.error("Upload course error:", error);
        }
      },

    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/all-courses",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.error("Fetch all courses error:", error);
        }
      },
      providesTags:["Course"]

    }),
  }),
});

export const { useUploadCourseMutation, useGetAllCoursesQuery } = courseApi;

export default courseApi;
