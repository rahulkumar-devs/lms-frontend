"use client";

import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiFillPlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { useChangeUserRoleMutation } from "@/redux/auth/userApi";
import { Input } from "@/components/ui/input";

const ChangeRole = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [changeUserRole, { isLoading, data, isSuccess, error }] = useChangeUserRoleMutation();

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleRoleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedRole && email) {
      console.log(`Changing role of user ${email} to ${selectedRole}`);
      await changeUserRole({ role: selectedRole, email });
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Role changed successfully!";
      toast.success(message);
      setEmail("");
      setSelectedRole("")
      setOpen(false)
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, error,setSelectedRole,setEmail]);

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="flex items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-blue-600 py-3 px-6 font-dm text-base font-medium text-white dark:bg-gradient-to-br dark:from-green-700 dark:to-blue-900 dark:shadow-green-800"
        >
          <AiFillPlusCircle className="mr-2" />
          <span className="">Add Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Change Role
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Select a new role for the user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRoleSubmit}>
          <Input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full my-4 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <Select onValueChange={handleRoleChange} defaultValue={selectedRole || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter className="mt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Changing..." : "Change Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
