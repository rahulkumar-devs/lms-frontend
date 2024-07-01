"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import sidebarData from "./sidebarData";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SidebarProps = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

const Sidebar = ({ setActiveTab, activeTab }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  console.log(user)

  return (
    <div className="relative">
      <ul
        className={`inset-0 z-10 flex flex-row md:flex-col bg-gray-800 md:p-4 space-x-4 md:space-x-0 md:space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 transform md:h-[calc(100vh-80px)] md:overflow-y-auto md:border-2 md:w-[calc(100vw-70vw)] 
          lg:w-[calc(100vw-85vw)] hide-scrollbar py-2 px-1.5 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:bg-transparent md:text-sm md:font-medium md:text-gray-500 md:dark:text-gray-400 overflow-x-auto`}
      >
        {sidebarData.map((item) => {
          if (user?.role !== "admin" && item.path === "dashboard")
            return null;

          return (
            <li key={item.path} className="flex-shrink-0">
              <span
                className={`flex items-center px-4 py-3 rounded-lg w-full transition-all duration-300 ease-in-out cursor-pointer ${
                  item.name === activeTab
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "text-gray-500 hover:bg-blue-800 dark:hover:bg-blue-700 hover:text-gray-200"
                }`}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsOpen(false);
                  if (item.name === "Admin Dashboard") {
                    router.push("/admin");
                  }
                }}
              >
                <item.icon className="w-4 h-4 mr-2  md:block hidden text-black dark:text-white" />
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
