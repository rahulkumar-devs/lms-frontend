"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import Spinner from "@/utils/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdModeEdit } from "react-icons/md";
import {
  useChangeEmailMutation,
  useVerifyEmailMutation,
} from "@/redux/auth/userApi";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UpdateEmailDialog: FC = () => {
  const [changeEmailText, setChangeEmailText] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"update" | "verify">("update");

  const { activationCode, activationToken } = useSelector(
    (state: RootState) => state.auth
  );

  const [changeEmail, { isLoading: isUpdating, isSuccess, error, data }] =
    useChangeEmailMutation();
    // console.log(activationCode, activationToken)

  const [
    verifyEmail,
    {
      isLoading: isVerifying,
      error: verificationError,
      data: verificationData,
      isSuccess: isVerificationSuccess,
    },
  ] = useVerifyEmailMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Update your details!";
      toast.success(message);
      setStep("verify");
    }
    if (error && "data" in error) {
      const errorMessage = (error as any).data.message;
      toast.error(errorMessage);
    }
  }, [isSuccess, data, error]);

  useEffect(() => {
    if (isVerificationSuccess) {
      const message = verificationData?.message || "Email Updated";
      toast.success(message);
    }
    if (verificationError && "data" in verificationError) {
      const errorMessage = (verificationError as any).data.message;
      toast.error(errorMessage);
    }
  }, [isVerificationSuccess, verificationData, verificationError]);

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeEmail({ email: changeEmailText });
  };

  const handleVerifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyEmail({ emailToken: activationToken, emailCode: activationCode });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger
          variant="outline"
          className="absolute right-0 top-0 p-1.5 "
          aria-label="Edit Email"
          
        >
      <Button
            variant="outline"
            aria-label="Edit Profile"
            className="absolute top-o right-0"
          >
            <MdModeEdit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Your Email</DialogTitle>
          </DialogHeader>
          {step === "update" ? (
            <form onSubmit={handleUpdateSubmit}>
              <Label htmlFor="email">New Email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setChangeEmailText(e.target.value)}
                value={changeEmailText}
                required
              />
              <Button type="submit" disabled={isUpdating} className="mt-4">
                {isUpdating ? (
                  <div className="flex items-center gap-1 justify-between">
                    <Spinner />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Email"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifySubmit}>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                required
              />
              <div className="flex justify-between mt-4">
                <Button onClick={() => setStep("update")} className="mr-2">
                  Back
                </Button>
                <Button type="submit" disabled={isVerifying}>
                  {isVerifying ? (
                    <div className="flex items-center gap-1 justify-between">
                      <Spinner />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateEmailDialog;
