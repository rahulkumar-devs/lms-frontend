"use client";

import DashboardHeader from "@/components/admin/DashboardHeader";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { columns } from "@/components/admin/team/Column";
import { DataTable } from "@/components/admin/team/Data-table";
import { useGetAllUsersQuery } from "@/redux/auth/userApi";
import Heading from "@/utils/Heading";
import React from "react";
import ChangeRole from "@/components/admin/team/ChangeRole"

type Props = {};

const Users = (props: Props) => {
  const { data, isLoading, isSuccess } = useGetAllUsersQuery({});
  // console.log(data)
  return (
    <>
      <div className="relative">
        <Heading
          title="Manage Teams"
          description=""
          keywords=""
        />
        <div className="flex min-h-screen">
          <div className="md:lg:w-[16%] md:w-1/5 w-full  top-0 left-0 fixed justify-between md:static flex items-center dark:bg-black ">
            <AdminSidebar />
            <div className="absolute top-0 right-0 md:hidden block">
              <DashboardHeader />
            </div>
          </div>
          <div className="md:w-[85%] w-full ">
            <div className="container mx-auto py-10 mt-10">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                isSuccess ? <>
                <ChangeRole/>
                <DataTable columns={columns} data={data?.data} /> 
                </>:"Failed to Fetch User Data"
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

export default Users;
