"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import SignInUser from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";
import Verification from "./Routes/Verification";
import ForgotPassword from "./Routes/ForgotPassword";
import { Button } from "./ui/button";

const MemoizedSignIn = React.memo(SignInUser);
const MemoizedSignUp = React.memo(SignUp);
const MemoizedVerification = React.memo(Verification);
const MemoizedForgotPassword = React.memo(ForgotPassword);

const AuthDialog = () => {
  const [currentComponent, setCurrentComponent] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the component is mounted on the client
  }, []);

  const renderComponent = useCallback(() => {
    switch (currentComponent) {
      case "sign-in":
        return <MemoizedSignIn switchComponent={setCurrentComponent} />;
      case "sign-up":
        return <MemoizedSignUp switchComponent={setCurrentComponent} />;
      case "verification":
        return (
          <MemoizedVerification
            switchComponent={setCurrentComponent}
            whichElement={"auth-verification"}
          />
        );
      case "forgot-password":
        return <MemoizedForgotPassword switchComponent={setCurrentComponent} />;
      default:
        return null;
    }
  }, [currentComponent]);

  const handleClose = () => {
    setCurrentComponent("");
  };

  const handleOpenChange = (isOpen:any) => {
    if (!isOpen) {
      handleClose();
    }
  };

  if (!isClient) {
    return null; // Avoid rendering on the server side
  }

  return (
    <Dialog open={currentComponent !== ""} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => setCurrentComponent("sign-in")}>Signin</Button>
      </DialogTrigger>
      {currentComponent && (
        <DialogContent className="sm:max-w-[425px]">
          {renderComponent()}
          <DialogClose asChild>
            <button className="mt-4" onClick={handleClose}>
              Close
            </button>
          </DialogClose>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AuthDialog;
