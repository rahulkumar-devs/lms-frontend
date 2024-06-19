"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useState, useEffect, useRef } from "react";
import { ModeToggle } from "@/utils/Theme-switcher";
import { CgMenuLeftAlt, CgMenuLeft } from "react-icons/cg";
import MyAccount from "./My-account";
import AuthDialog from "./AuthDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocialAuthMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export const navItemsData = [
  { name: "Home", path: "/" },
  { name: "Course", path: "/course" },
  { name: "About", path: "/about" },
  { name: "Policy", path: "/policy" },
  { name: "FAQ", path: "/faq" },
];

type Props = {};

const Header: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: RootState) => state.auth);



  const [socialAuth, { data }] = useSocialAuthMutation();

  const authSession = useSession();

  // console.log(user)
 
  let profilePic = user ? user?.avatar :"/";


  useEffect(() => {
    if (!user && authSession.data) {
      socialAuth({
        name: authSession.data.user?.name,
        email: authSession.data.user?.email,
        avatar: authSession.data.user?.image,
      });
    }
  }, [user, authSession, socialAuth]);

  const [isLoggedIn, setLoggedIn] = useState(!!user);

  useEffect(() => {
    setLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
            ELearning
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 md:gap-2.5">
          <ModeToggle />
          {isLoggedIn ? <MyAccount profilePic={profilePic} /> : <AuthDialog />}

          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <CgMenuLeftAlt className="text-xl" />
          </button>
        </div>
        <div
          ref={menuRef}
          className={`${
            open ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col absolute right-0 top-0 w-[70%] md:w-full h-screen md:h-full md:static p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <button className="dark:text-white text-black flex justify-end md:hidden">
              <CgMenuLeft onClick={() => setOpen(false)} className="text-xl" />
            </button>
            <div className="md:hidden my-4">
              <Link href="/" className="flex items-center space-x-3">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  ELearning
                </span>
              </Link>
            </div>

            {navItemsData.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link href={item.path}>
                    <span
                      className={`block py-2 px-3 rounded md:p-0 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-500"
                          : "text-gray-900 dark:text-white"
                      } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
            <div className="md:hidden my-4">
              <small className="text-[10px]">
                All copyright @ 2024 reserved to ELearning
              </small>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
