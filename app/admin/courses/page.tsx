"use client";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { columns } from "@/components/admin/allCourses/Columns";
import { DataTable } from "@/components/admin/allCourses/Data-table";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAllCoursesQuery } from "@/redux/course/courseApi";
import Heading from "@/utils/Heading";
import React, { useState } from "react";

type Props = {};

const Course = (props: Props) => {
  const limit = 10; // Adjust per page limit as needed
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetAllCoursesQuery({ page, limit:limit });

  if (isError) {
    return <div>Error loading courses: {data?.message || "Unknown error"}</div>;
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="relative">
        <Heading title="create-course min-h-screen" description="" keywords="" />
        <div className="flex min-h-screen">
          <div className="md:lg:w-[16%] md:w-1/5 w-full top-0 left-0 fixed justify-between md:static flex items-center dark:bg-black ">
            <AdminSidebar />
            <div className="absolute top-0 right-0 md:hidden block">
              <DashboardHeader />
            </div>
          </div>
          <div className="md:w-[85%] w-full ">
            <div className="container mx-auto py-10 mt-10">
              {!isLoading && (
                <DataTable
                  columns={columns}
                  data={data?.data}
                  currentPage={page}
                  totalPages={Math.ceil(data?.total / limit)}
                  nextPage={handleNextPage}
                  previousPage={handlePreviousPage}
                />
              )}
            </div>

            <div className="absolute top-0 right-0 md:block hidden p-5">
              <DashboardHeader />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
