"use client";

import CourseAnalysis from "@/components/admin/analytics/CourseAnalysis";
import DashboardHeader from "@/components/admin/DashboardHeader";

import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import Heading from "@/utils/Heading";
import React, { useState } from "react";



const Page = () => {
  
  return (
     <>
  
    <div className="relative">
      <Heading title="create-course " description="" keywords="" />
      <div className="flex h-auto">
        <div className="md:lg:w-[16%] md:w-1/5 w-full  top-0 left-0 fixed justify-between md:static flex items-center dark:bg-black ">
          <AdminSidebar />
          <div className="absolute top-0 right-0 md:hidden block">
            <DashboardHeader />
          </div>
        </div>
        <div className="md:w-[85%] w-full p-4 mt-10 md:px-5  md:mt-1">
         <CourseAnalysis/>
          <div className="absolute top-0 right-0 md:block hidden p-5">
            <DashboardHeader />
          </div>
        </div>
      </div>
    </div>
   
    </>
  );
};

export default Page;
