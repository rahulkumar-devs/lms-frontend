"use client";
import { useCourseAnalyticApiQuery } from "@/redux/analytics/analyticApi";
import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {};

const CourseAnalysis = (props: Props) => {
  const { data: newData } = useCourseAnalyticApiQuery({});

  const analyticData: any = [];

  newData &&
    newData.data.last12Months.forEach((item: any) => {
      analyticData.push({ name: item.month, count: item.count });
    });

  return (
    <div className="min-h-screen p-5">
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold text-indigo-600 py-2">Course Analytics</h1>
        <p className="text-lg text-gray-600">Last 12 months analytics data</p>
      </div>
      <div className="w-full h-[50vh] flex items-center justify-center mt-10">
        <ResponsiveContainer width="95%" height="100%">
          <BarChart
            data={analyticData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseAnalysis;
