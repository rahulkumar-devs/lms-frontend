
"use client"

import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type ProtectedProps = {
  allowedRoles: string;
  children: ReactNode;
  redirectPath?: string;
};

const RoleProtected: FC<ProtectedProps> = ({ allowedRoles, children, redirectPath = "/" }) => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  // console.log(user)
  const isAllowed = user?.role.includes(allowedRoles);
  // console.log(isAllowed)


  useEffect(() => {
    if (!isAllowed) {
      // Log error or dispatch actions if needed
      console.error("Unauthorized access attempted.");

      // Redirect to the specified path
      router.push(redirectPath);
    }
  }, [isAllowed, router, redirectPath]);

  // Optionally return a loading indicator while redirecting
  if (!isAllowed) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default RoleProtected;
