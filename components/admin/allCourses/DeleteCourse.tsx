"use client"
import React, { useEffect } from "react";
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

import { MdDelete } from "react-icons/md";
import { useDeleteCourseMutation } from "@/redux/course/courseApi";
import toast from "react-hot-toast";

type Props = {
  courseId: string;
  courseTitle: string;
};

const DeleteCourse = ({ courseId, courseTitle }: Props) => {
  const [deleteCourse,{isLoading,error,isSuccess,data}]=useDeleteCourseMutation()

  const handleDeleteCourse = async()=>{
    deleteCourse({courseId:courseId})

  }


  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Role changed successfully!";
      toast.success(message);
     
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, error]);


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <MdDelete/>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>
              Do you really want to delete course !
            </DialogDescription>
          </DialogHeader>
          <DialogTitle>Course ID</DialogTitle>
          <p className=" text-sm">{courseId}</p>
    
          <DialogTitle>Course Title</DialogTitle>
          <p className=" text-sm">{courseTitle}</p>

          <DialogFooter>
            <Button type="submit" variant={"destructive"} onClick={handleDeleteCourse} disabled={isLoading}>
            {
              isLoading ?"Deleting course...":"  Delete course"
            }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteCourse;
