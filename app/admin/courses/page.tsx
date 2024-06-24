"use client";

import DashboardHeader from "@/components/admin/DashboardHeader";
import { columns } from "@/components/admin/allCourses/Columns";
import { DataTable } from "@/components/admin/allCourses/Data-table";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAllCoursesQuery } from "@/redux/course/courseApi";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};




   



const Course = (props: Props) => {
  const { data, isLoading, isError, error } = useGetAllCoursesQuery({});



  if (isError) {
    return <div>Error loading courses: {data?.message || "Unknown error"}</div>;
  }
  return (
    <>
      <div className="relative">
        <Heading title="create-course min-h-screen" description="" keywords="" />
        <div className="flex min-h-screen">
          <div className="md:lg:w-[16%] md:w-1/5 w-full  top-0 left-0 fixed justify-between md:static flex items-center dark:bg-black ">
            <AdminSidebar />
            <div className="absolute top-0 right-0 md:hidden block">
              <DashboardHeader />
            </div>
          </div>
          <div className="md:w-[85%] w-full ">
            <div className="container mx-auto py-10 mt-10">
              {
    
              
              isLoading ? <div>Loading...</div>: <DataTable columns={columns} data={data?.data} />
              }
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
