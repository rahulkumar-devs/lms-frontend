"use client";
import React, { FC, useState } from "react";
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
import { MdModeEdit } from "react-icons/md";
import { cn } from "@/lib/utils";

type Props = {
  email: string;
  className: string;
};

const UpdateEmail: FC<Props> = ({ email, className }) => {
  const [changeEmail, setChangeEmail] = useState<string>(email);

  const handleUpdateUserDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className={cn(" w-full py-10", className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            aria-label="Edit Profile"
            className="absolute top-o right-0"
          >
            <MdModeEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Email</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUserDetails}>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4"></div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => setChangeEmail(e.target.value)}
                  value={changeEmail}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateEmail;
