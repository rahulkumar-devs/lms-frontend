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
      query: ({page,limit}) => ({
        url: `/all-courses?page=${page}&limit=${limit}`,
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
      providesTags: ["Course"]

    }),

    deleteCourse: builder.mutation({
      query: ({ courseId }: { courseId: string }) => ({
        url: `/delete-course/${courseId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Course"]
    }),

    updateCourse:builder.mutation({
      query: ({data,courseId}) => ({
        url: `/update-course/${courseId}`,
        method: "PUT",
        credentials: "include",
        body:data,
        // headers: { 'Content-Type': 'multipart/form-data' }
      }),
      invalidatesTags: ["Course"]
    })
  }),
});

export const { useUploadCourseMutation, useGetAllCoursesQuery ,useDeleteCourseMutation,useUpdateCourseMutation} = courseApi;

export default courseApi;
