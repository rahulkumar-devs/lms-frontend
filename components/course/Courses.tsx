"use client";
import React, { useState } from "react";
import CourseCard from "../CourseCard";
import { useGetAllProtectedCoursesQuery } from "@/redux/course/courseApi";

type Props = {};

const Courses = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of items per page

  const { data: fetchData, isLoading } = useGetAllProtectedCoursesQuery({
    page: currentPage,
    limit: limit,
  });

  const newCourseData: any[] = [];

  fetchData &&
    fetchData?.data?.courseData.forEach((item: any) => {
      newCourseData.push({
        demoVideo: item.demoVideo,
        thumbnail: item.thumbnail,
        title: item.name,
        description: item.description,
        courseId: item?._id,
      });
    });

  const totalPages = fetchData?.data?.totalPages || 1;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {newCourseData.map((course, index) => (
              <div
                key={index}
                className="transform transition duration-500 hover:scale-105"
              >
                <CourseCard
                  courseImage={course.thumbnail}
                  courseTitle={course.title}
                  courseDescription={course.description}
                  courseId={course.courseId}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-gray-300 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
