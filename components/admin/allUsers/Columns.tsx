"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconType } from "react-icons/lib";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
// import DeleteCourse from "./DeleteCourse";
import { ArrowUpDown } from "lucide-react";
import { MdEdit } from "react-icons/md";
import ChangeRole from "./ChangeRole";

export interface ICourseColumn {
  _id: string;
  name: string;
  email: string;
  role: string;
  courses: [];
}

export const columns: ColumnDef<ICourseColumn>[] = [
  {
    id: "Select",

    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: " Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => (
      <div className="">
        <ChangeRole
          userId={row.original._id}
          userName={row.original.name}
          userRole={row.original.role}
        />
      </div>
    ),
  },

  {
    accessorKey: "courses",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          purchased Courses
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" flex items-center justify-center ">
        {row.original.courses.length}
      </div>
    ),
  },

  {
    accessorKey: "delete",
    enableHiding: true,
    cell: ({ row }) => (
      <>
        {/* <DeleteCourse
          courseId={row.original._id}
          courseTitle={row.original.name}
        /> */}
      </>
    ),
  },
  {
    accessorKey: "edit",
    header: "Edit",
    enableHiding: true,
    cell: ({ row }) => (
      <>
        <MdEdit />
      </>
    ),
  },
];
