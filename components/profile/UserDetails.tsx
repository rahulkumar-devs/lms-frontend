"use client";
import React, { FC } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import UpdateNameAndAvatar from "./profileComponents/UpdateNameAndAvatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import loadAvatar from "@/assets/loadAvatar.png";
import { Label } from "../ui/label";
import UpdateEmailDialog from "./profileComponents/UpdateEmailDialog";
import UpdatePasswordDialog from "./profileComponents/UpdatePasswordDialog";

const UserDetails: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg p-6 my-2.5 w-full max-w-md">
        <div className="flex flex-col gap-4 items-center relative">
          <p className="text-2xl text-center w-full font-extrabold text-blue-600 dark:text-blue-400">
            Profile Info
          </p><div className="absolute top-0 right-0 ">
          <UpdateNameAndAvatar
            name={user?.name}
            avatar={user?.avatar || loadAvatar}
            className="w-full mb-4"
          />
            </div>
          <Image
            src={user?.avatar || loadAvatar}
            alt="user avatar"
            width={150}
            height={150}
            className="mb-4 rounded-full border-4 border-blue-600"
          />
          <div className="w-full">
            <Label
              id="username"
              className="block text-gray-700 dark:text-gray-300 my-2 "
            >
              Name
            </Label>
            <Input
              defaultValue={user?.name || ""}
              disabled
              className="border-gray-300 dark:border-gray-700 w-full px-3 py-2 rounded-md"
              id="username"
            />
          </div>
        </div>
        <div className="flex flex-col relative mt-4 w-full">
         <div className="absolute z-50 top-4 right-0">
         <UpdateEmailDialog />
         </div>
          <Label
            id="email"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Email
          </Label>
          <Input
            defaultValue={user?.email}
            disabled
            className="border-gray-300 dark:border-gray-700 w-full px-3 py-2 rounded-md"
            type="email"
            id="email"
          />
        </div>
        <div className="flex flex-col relative mt-4 w-full">
          
          <UpdatePasswordDialog />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
