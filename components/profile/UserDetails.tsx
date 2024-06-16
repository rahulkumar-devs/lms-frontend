import React, { FC } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import UpdateNameAndAvatar from "./profileComponents/UpdateNameAndAvatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import loadAvatar from "@/assets/loadAvatar.png";

const UserDetails: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log("user details", user);
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="bg-white dark:bg-gray-900 dark-text-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center relative ">
          <UpdateNameAndAvatar
            name={user?.name}
            avatar={user?.avatar || loadAvatar}
            className="w-full mb-4"
          />
          <Image src={user?.avatar || loadAvatar} alt="user avatar" width={200} height={200} className="mb-4"  />
          <Input defaultValue={user?.name} disabled className="border-none w-full" />
        </div>
        {/* change email */}
        <div className="flex flex-col items-center relative ">
        <Input defaultValue={user?.email} disabled className="border-none w-full" type="email" />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
