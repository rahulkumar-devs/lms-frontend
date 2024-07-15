"use client";
import { useUserAnalyticApiQuery } from "@/redux/analytics/analyticApi";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
type Props = {};

const UserAnalysis = (props: Props) => {
  const { data: newData } = useUserAnalyticApiQuery({});

  const analyticData: any = [];
  console.log("newData",newData);
  // console.log(analyticData);

  newData &&
    newData.data.last12Months.forEach((item: any) => {
      analyticData.push({ name: item.month, count: item.count });
    });

  return (
    <div className="min-h-screen p-5 ">
      <div className="mt-12 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">User Analytics</h1>
        <p className="text-lg text-gray-600">Last 12 months analytics data</p>
      </div>
      <div className="w-full h-[50vh] flex items-center justify-center mt-10">
        <ResponsiveContainer width="90%" height="100%">
          <AreaChart
            data={analyticData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalysis;
