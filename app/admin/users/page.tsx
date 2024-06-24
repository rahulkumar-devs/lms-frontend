"use client"

import DashboardHeader from "@/components/admin/DashboardHeader";
import { columns } from "@/components/admin/allUsers/Columns";
import { DataTable } from "@/components/admin/allUsers/Data-table";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { useGetAllUsersQuery } from "@/redux/auth/userApi";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const Users = (props: Props) => {

  const {data,isLoading} = useGetAllUsersQuery({});
  console.log(data)
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

export default Users;
