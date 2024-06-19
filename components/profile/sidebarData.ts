import {
    FiUser,
    FiPieChart,
    FiSettings,
    FiMail,
    FiAlertCircle,
  } from "react-icons/fi";

type SidebarType = {
    name: string;
    path: string;
    icon: any;
  };
  
  const sidebarData: SidebarType[] = [
    {
      name: "Profile",
      path: "",
      icon: FiUser,
    },
    {
      name: "Admin Dashboard",
      path: "dashboard",
      icon: FiPieChart,
    },
    {
      name: "Settings",
      path: "settings",
      icon: FiSettings,
    },
    {
      name: "Contact_me",
      path: "contact-me",
      icon: FiMail,
    },
  ];

  export default sidebarData