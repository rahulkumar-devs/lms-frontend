import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CourseAnalysis from "../analytics/CourseAnalysis";
import UserAnalysis from "../analytics/UserAnalysis";

const AdminHome = () => {
  return (
    <div className="w-full mt-14">
      <div className="grid lg:grid-cols-4 gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$500.50</div>
            <div className="text-sm text-gray-500">+20.1% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$500.50</div>
            <div className="text-sm text-gray-500">+20.1% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$500.50</div>
            <div className="text-sm text-gray-500">+20.1% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$500.50</div>
            <div className="text-sm text-gray-500">+20.1% from last month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Course Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseAnalysis />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">User Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <UserAnalysis />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
