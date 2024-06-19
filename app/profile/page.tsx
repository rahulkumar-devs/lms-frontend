"use client";

import Header from "@/components/Header";
import Profile from "@/components/profile/Profile";
import Protected from "@/hooks/useProtected";
import { RootState } from "@/redux/store";
import Heading from "@/utils/Heading";
import React, { FC } from "react";
import { useSelector } from "react-redux";

type ProfileProps = {};

const ProfilePage: FC<ProfileProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userName = user?.name || "Guest";

  // console.log(user.name)
  return (
    <Protected>
           <Heading title={`${userName} - Profile`} description="" keywords="" />
      <Header />
      <Profile/>
    </Protected>
  );
};

export default ProfilePage;
