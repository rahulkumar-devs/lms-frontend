"use client";

import React, { useState } from "react";
import {
  Benefits,
  CourseContent,
  CourseData,
  CourseInfoData,
  Prerequisites,
  courseDataSchema,

} from "./courseDataSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";

type Props = {};

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState<number>(0);
  const [benefits, setBenefits] = useState<Benefits>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<Prerequisites>([
    { title: "" },
  ]);

  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [courseContentData, setCourseContentData] = useState<CourseContent[]>([
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
  const [courseData, setCourseData] = useState<Partial<CourseData>>({});

  const form = useForm<z.infer<typeof courseDataSchema>>({
    resolver: zodResolver(courseDataSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof courseDataSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
      </div>
      <div className=" w-[20%] mt-[100px] h-screen fixed z-[-1] top-10 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
