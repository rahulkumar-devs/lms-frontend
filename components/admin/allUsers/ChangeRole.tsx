"use client"

import React, { useState } from "react";
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
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

type Props = {
  userId: string;
  userName: string;
  userRole: string;
};

const ChangeRole = ({ userId, userName, userRole }: Props) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleChange = (value: string) => {
    if (value.toLowerCase() === userRole.toLowerCase()) {
      toast.error(`already ${userRole}`);
      return;
    } else {
      setSelectedRole(value);
    }
  };

  const handleRoleSubmit = () => {
    if (selectedRole) {
      // Handle role change logic here
      console.log(
        `Changing role of user ${userName} (${userId}) to ${selectedRole}`
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{userRole.toLocaleUpperCase()}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
          <DialogDescription>Select a new role for the user.</DialogDescription>
        </DialogHeader>

        <div>
          <p className="text-sm">
            <strong>User ID:</strong> {userId}
          </p>
          <p className="text-sm">
            <strong>User Name:</strong> {userName}
          </p>
        </div>

        <Select onValueChange={handleRoleChange} defaultValue={selectedRole||""}>
          <SelectTrigger className="w-[180px] mt-4">
            <SelectValue placeholder={selectedRole} />
          </SelectTrigger>
          <SelectContent>
            {["admin", "member", "user"].map((role) => (
              <SelectItem key={role} value={role} disabled={role === userRole}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleRoleSubmit}
            variant="outline"
            disabled={!selectedRole}
          >
            Change Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
