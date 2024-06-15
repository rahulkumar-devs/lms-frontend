"use client";

import Header from "@/components/Header";
import Protected from "@/hooks/useProtected";
import { RootState } from "@/redux/store";
import Heading from "@/utils/Heading";
import React, { FC } from "react";
import { useSelector } from "react-redux";

type ProfileProps = {};

const ProfilePage: FC<ProfileProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  // console.log(user.user.name)
  return (
    <Protected>
      <Heading title={`${user.user.name}- profile`} description="" keywords="" />
      <Header />
    </Protected>
  );
};

export default ProfilePage;
