import Header from "@/components/Header";
import CourseDetails from "@/components/course/CourseDetails";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = ({ params }: any) => {
  
  return (
    <div className="bg-white dark:bg-gray-900">
      
      <div>
        <CourseDetails courseId={params.id} />
      </div>
    </div>
  );
};

export default page;
