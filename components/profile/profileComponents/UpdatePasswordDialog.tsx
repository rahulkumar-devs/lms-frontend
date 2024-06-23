"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdModeEdit, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useUpdatePasswordMutation } from "@/redux/auth/userApi";
import { toast } from "react-hot-toast";

import Spinner from "@/utils/Spinner";

type Props = {};

const UpdatePasswordDialog: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [updatePassword, { isLoading, data, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Successfully updated your password!";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, error]);

  const handleUpdateUserDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    updatePassword({ oldPassword, newPassword });
  };

  return (
    <div className={cn("w-full py-10")}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            aria-label="update password"
            className="absolute top-0 right-0 border-blue-500 flex justify-between gap-2 items-center "
          >
            <span>Update password</span>
            <MdModeEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Password</DialogTitle>
            <DialogDescription>
              Change your password here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUserDetails}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPass" className="text-right">
                  Old Password
                </Label>
                <div className="col-span-3 relative">
                  <Input
                    id="oldPass"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                  >
                    {showOldPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPass" className="text-right">
                  New Password
                </Label>
                <div className="col-span-3 relative">
                  <Input
                    id="newPass"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPass" className="text-right">
                  Confirm Password
                </Label>
                <div className="col-span-3 relative">
                  <Input
                    id="confirmPass"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-1 justify-between">
                    <Spinner />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdatePasswordDialog;
