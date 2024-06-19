"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";

type Props = {};

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState<number>(0);
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  return (
    <div className=" w-full min-h-screen flex">
      <div className=" w-[80%]">
        {active === 0 && (
          <CourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisits={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
      <div className=" w-[20%] mt-[100px] h-screen fixed z-[-1] top-10 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;