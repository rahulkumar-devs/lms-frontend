import React, { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaBars,
  FaDatabase,
  FaListUl,
  FaUsers,
  FaFileInvoice,
  FaQuestion,
} from "react-icons/fa";
import { BsCameraVideoFill, BsFillBarChartLineFill } from "react-icons/bs";
import {
  MdAnalytics,
  MdCategory,
  MdContactPage,
  MdManageAccounts,
} from "react-icons/md";
import { CiStreamOn } from "react-icons/ci";
import { RiFileEditFill } from "react-icons/ri";
import { AvatarUI } from "@/components/Avatar";
import DropdownMenu from "./DropdownMenu";
import avatarLoader from "@/assets/loadAvatar.png";
import Image from "next/image";



const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const DataDropdown = [
    { href: "/admin/users", label: "Users", itemIcons: FaUsers },
    { href: "/admin/invoices", label: "Invoices", itemIcons: FaFileInvoice },
  ];

  const ContentDropdown = [
    {
      href: "/admin/create-course",
      label: "Create Course",
      itemIcons: BsCameraVideoFill,
    },
    { href: "/admin/courses", label: "Live Course", itemIcons: CiStreamOn },
  ];

  const CustomizationDropdown = [
    { href: "/admin/hero", label: "Hero", itemIcons: MdContactPage },
    { href: "/admin/faq", label: "FAQ", itemIcons: FaQuestion },
    { href: "/admin/categories", label: "Categories", itemIcons: MdCategory },
  ];

  const ControllerDropdown = [
    {
      href: "/admin/manage-team",
      label: "Manage Team",
      itemIcons: MdManageAccounts,
    },
  ];

  const AnalysisDropdown = [
    {
      href: "admin/course-analysis",
      label: "Course Analysis",
      itemIcons: BsFillBarChartLineFill,
    },
  ];

  return (
    <div ref={sidebarRef}>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="w-6 h-6" />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <div className="flex items-center flex-col p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="w-16 h-16 relative">
                <Image
                  src={avatarLoader || ""}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {"name"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {"email"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {"role"}
                </p>
              </div>
            </div>

            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </button>
            </li>
            <li>
              <DropdownMenu
                buttonName="Data"
                items={DataDropdown}
                btnIcon={FaDatabase}
              />
            </li>
            <li>
              <DropdownMenu
                buttonName="Content"
                items={ContentDropdown}
                btnIcon={FaListUl}
              />
            </li>
            <li>
              <DropdownMenu
                buttonName="Customization"
                items={CustomizationDropdown}
                btnIcon={RiFileEditFill}
              />
            </li>
            <li>
              <DropdownMenu
                buttonName="Controller"
                items={ControllerDropdown}
                btnIcon={MdManageAccounts}
              />
            </li>
            <li>
              <DropdownMenu
                buttonName="Analysis"
                items={AnalysisDropdown}
                btnIcon={MdAnalytics}
              />
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
