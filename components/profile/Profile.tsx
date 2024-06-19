"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UserDetails from "./UserDetails";
import { useSearchParams } from "next/navigation";
import useRoleProtected from "@/hooks/useRoleProtected";

const Profile = () => {

  const [activeTab, setActiveTab] = useState("UserDetails");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Profile":
        return <UserDetails />;
      case "Dashboard":
        return " Dashboard";
      case "Settings":
        return " <Settings />";
      case "Contact_me":
        return " <Contact_me />";
      default:
        return <UserDetails />;
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab}/>

      {/* Main Content */}
      <div className="md:flex-1  px-4 min-h-[calc(100vh-100px)]">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Profile;
