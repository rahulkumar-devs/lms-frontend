import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function useUserAuth() {
  const { user } = useSelector((state: RootState) => state.auth);
//   console.log(user)

  if (user) {
    return true;
  } else {
    return false;
  }
}
