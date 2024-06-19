"use client";

import DashboardHeader from "@/components/admin/DashboardHeader";
import CreateCourse from "@/components/admin/createCourse/CreateCourse";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import Heading from "@/utils/Heading";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="relative">
      <Heading title="create-course " description="" keywords="" />
      <div className="flex h-[200vh]">
        <div className="md:lg:w-[16%] md:w-1/5 w-full  top-0 left-0 fixed justify-between md:static flex items-center dark:bg-black ">
          <AdminSidebar />
          <div className="absolute top-0 right-0 md:hidden block">
            <DashboardHeader />
          </div>
        </div>
        <div className="md:w-[85%] w-full p-4 mt-10 md:px-5  md:mt-1">
          <CreateCourse />
          <div className="absolute top-0 right-0 md:block hidden p-5">
            <DashboardHeader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
