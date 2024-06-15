import { FC, ReactNode } from "react";
import { redirect } from "next/navigation";
import useUserAuth from "./userAuth";

type ProtectedProps = {
  children: ReactNode;
};

const useProtected: FC<ProtectedProps> = ({ children }) => {
  const isAuthenticated = useUserAuth();
  return isAuthenticated ? children : redirect("/");
};

export default useProtected;
