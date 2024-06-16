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
import { MdModeEdit } from "react-icons/md";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUpdateProfileMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import Spinner from "@/utils/Spinner";

type UpdateNameAndAvatarProps = {
  name: string;
  avatar: string;
  className?: string;
};

const UpdateNameAndAvatar: FC<UpdateNameAndAvatarProps> = ({
  name,
  avatar,
  className,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<any>(avatar || "/");
  const [myAvatar, setMyAvatar] = useState<any>(null);
  const [changeName, setChangeName] = useState<string>(name);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setSelectedAvatar(blobUrl);
    setMyAvatar(file);

    }
  };

  const [updateProfile, { data, isLoading, error, isSuccess }] =
    useUpdateProfileMutation();


  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || " update your details !";
      toast.success(message);
      
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, error]);

  const handleUpdateUserDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile({ name:changeName, avatar: myAvatar });
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
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUserDetails}>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <Image
                  src={selectedAvatar || "/default-avatar.png"}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => setChangeName(e.target.value)}
                  value={changeName}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avatar" className="text-right">
                  Avatar
                </Label>
                <Input
                  id="avatar"
                  className="col-span-3"
                  type="file"
                  name="avatar"
                  accept=".jpeg,.png,.jpg"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className=" flex items-center gap-1 justify-between">
                      <Spinner />
                      <span>Updating ..</span>
                    </div>
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateNameAndAvatar;
