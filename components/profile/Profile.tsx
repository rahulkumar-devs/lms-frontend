"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UserDetails from "./UserDetails";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  const searchParams = useSearchParams();
  const navigateQuery = searchParams?.get("profile") ?? "";

  return (
    <div className="w-full flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 min-h-[calc(100vh-80px)]">
        {navigateQuery === "/" && <UserDetails />}
        {!navigateQuery && <UserDetails />}
      </div>
    </div>
  );
};

export default Profile;
