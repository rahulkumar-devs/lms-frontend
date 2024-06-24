"use client";
import Heading from "@/utils/Heading";
import React, { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import DashboardHeader from "@/components/admin/DashboardHeader"
import RoleProtected from "@/components/ProtectedRoute";

type Props = {};

const AdminDashboard = (props: Props) => {
  const [activeComponent, setActiveComponent] = useState<string>("");



  return (
    <>
      <RoleProtected allowedRoles={"admin"}>

      <div className="relative">
        <Heading title="admin " description="" keywords="" />
        <div className="flex h-[200vh]">
          <div className="md:lg:w-[16%] md:w-1/5 w-full  top-0 left-0 fixed justify-between md:static flex items-center dark:bg-black ">
            <AdminSidebar />
        <div className=" md:hidden block ">
        <DashboardHeader/>
        </div>
          </div>
          <div className="md:w-[85%] w-full p-4 mt-10 md:px-5  md:mt-1">
          </div>
        </div>
      </div>
      </RoleProtected>

    </>
  );
};

export default AdminDashboard;
