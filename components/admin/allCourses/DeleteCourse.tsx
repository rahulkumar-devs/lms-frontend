import React from "react";
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

type Props = {
  courseId: string;
  courseTitle: string;
};

const DeleteCourse = ({ courseId, courseTitle }: Props) => {
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
            <Button type="submit" variant={"destructive"}>
              Delete course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteCourse;
