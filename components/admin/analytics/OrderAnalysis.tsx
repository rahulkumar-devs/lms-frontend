"use client";
import { useOrderAnalyticApiQuery } from "@/redux/analytics/analyticApi";
import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
type Props = {};

const OrderAnalysis = (props: Props) => {
  const { data: newData } = useOrderAnalyticApiQuery({});

  const analyticData: any = [];

  newData &&
    newData.data.last12Months.forEach((item: any) => {
      analyticData.push({ name: item.month, uv: item.count });
    });
  return (
    <div className="min-h-screen p-5">
    <div className="mt-8 text-center">
      <h1 className="text-3xl font-bold text-indigo-600 py-2">Order Analytics</h1>
      <p className="text-lg text-gray-600">Last 12 months analytics data</p>
    </div>
    <div className="w-full h-[50vh] flex items-center justify-center mt-10">
    <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyticData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
};

export default OrderAnalysis;
