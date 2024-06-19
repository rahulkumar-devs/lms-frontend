"use client";

import { ModeToggle } from "@/utils/Theme-switcher";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsBellFill,BsBadge3dFill } from "react-icons/bs";

type Props = {};

const DashboardHeader = (props: Props) => {
  const hasNotifications = true; // This would be based on your actual notifications logic

  return (
    <div className="flex items-center gap-4 justify-end">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
            <BsBellFill className="h-6 w-6 text-gray-700" />
            {hasNotifications && (
              <BsBadge3dFill className="absolute top-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full shadow-md animate-ping" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-lg p-4 animate-fade-in">
          <DropdownMenuLabel className="font-semibold text-gray-800">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 border-t border-gray-200" />
          <DropdownMenuItem className="flex flex-col gap-1 p-2 hover:bg-gray-50 rounded-md transition-colors">
            <p className="text-sm font-medium text-gray-900">New Question Received</p>
            <Button variant="link" className="text-sm text-blue-500">Mark as Read</Button>
            <p className="text-xs text-gray-600 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rerum natus provident?</p>
          </DropdownMenuItem>
          {/* Add more DropdownMenuItem as needed */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
