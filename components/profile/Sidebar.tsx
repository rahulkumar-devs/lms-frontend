"use client"

import { useState } from "react";
import Link from "next/link";
import sidebarData from "./sidebarData";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ul
        className={`inset-0 z-10  flex flex-row md:flex-col bg-gray-800 md:p-4 space-x-4 md:space-x-0 md:space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 transform md:h-[calc(100vh-80px)] md:overflow-y-auto md:border-2 md:w-[calc(100vw-70vw)] 
          lg:w-[calc(100vw-85vw)] hide-scrollbar
          transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:bg-transparent md:text-sm md:font-medium md:text-gray-500 md:dark:text-gray-400 overflow-x-auto`}
      >
        {sidebarData &&
          sidebarData.map((item) => (

            <li key={item.path}>
              <Link href={`?profile=${item.path}`} passHref>
                <span
                  className=" flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg w-full dark:bg-blue-600 md:hover:bg-blue-800 md:dark:hover:bg-blue-700 md:hover:text-gray-200 transition-all duration-300 ease-in-out"
                  aria-current="page"
                  onClick={() => setIsOpen(false)} // Close sidebar on link click
                >
                  <item.icon className="w-4 h-4 mr-2 text-white" />
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Sidebar;
