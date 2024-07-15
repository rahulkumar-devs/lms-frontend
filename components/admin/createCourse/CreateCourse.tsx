"use client";

import React, { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import { CourseInfoData, courseContentSchema } from "./courseDataSchema";
import CoursePreview from "./CoursePreview";
import {
  ICourseData,
  ILink,
  ICourseContentSchema,
  ICourseInfo,
  IBenefit,
  IPrerequisites,
} from "./courseTypes";
import CourseSuccess from "./CourseSuccess";
import { useUploadCourseMutation } from "@/redux/course/courseApi";
import toast from "react-hot-toast";

type Props = {};

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState<number>(0);
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);
  const [benefits, setBenefits] = useState<IBenefit[]>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<IPrerequisites[]>([
    { title: "" },
  ]);

  // RTK Query uplaod course
  const [uploadCourse, { isLoading, isSuccess, error, data }] =
    useUploadCourseMutation();

  useEffect(() => {
    if (active > 4) {
      return;
    }
  }, [active]);

  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
    name: "",
    description: "",
    categories:"",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoVideo: null,
    thumbnail: null,
  });

  const [courseContentData, setCourseContentData] = useState<
    ICourseContentSchema[]
  >([
    {
      contentVideo: "",
      videoSection: "Untitled Section",
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

  const [courseData, setCourseData] = useState<Partial<ICourseData>>({});

  const handleSubmit = async () => {
    // Format benefits array
    const formateBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format prerequisite array
    const formatePrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formateCourseContentData = courseContentData.map(
      (courseContent: ICourseContentSchema) => ({
        contentVideo: courseContent.contentVideo,
        videoSection: courseContent.videoSection,
        title: courseContent.title,
        description: courseContent.description,
        links: courseContent.links.map(
          (link: { title: string; url: string }) => ({
            title: link.title,
            url: link.url,
          })
        ),
        suggestion: courseContent.suggestion || "", // Provide a default value if undefined
      })
    );

    // Prepare data object
    const data: ICourseData = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories:courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoVideo: courseInfo.demoVideo,

      prerequisites: formatePrerequisites,
      benefits: formateBenefits,
      courseContent: formateCourseContentData,
    };

    setCourseData(data);
  };

  // <============>
  const handleCourseCreate = async (e: any) => {
    
    const formData = new FormData();

    // Append text fields
    formData.append("name", courseData.name || "");
    formData.append("description", courseData.description || "");
    formData.append("categories", courseData.categories || "");
    formData.append("price", courseData.price || "");
    formData.append("estimatedPrice", courseData.estimatedPrice || "");
    formData.append("tags", courseData.tags || "");
    formData.append("level", courseData.level || "");
    // Append files
    if (courseInfo.thumbnail) {
      formData.append("thumbnail", courseInfo.thumbnail);
    }
    if (courseInfo.demoVideo) {
      formData.append("demoVideo", courseInfo.demoVideo);
    }



    if(courseData.prerequisites&& courseData.prerequisites?.length >0){
      formData.append("prerequisites",JSON.stringify(courseData.prerequisites))
    }

    if(courseData.benefits&& courseData.benefits?.length >0){
      formData.append("benefits",JSON.stringify(courseData.benefits))
    }



    // send all videos 
   // Append course content data
   if (courseData.courseContent) {
    formData.append("courseContent", JSON.stringify(courseData.courseContent));
    courseData.courseContent.forEach((content, index) => {
      if (content.contentVideo) {
        formData.append(`contentVideo_${index}`, content.contentVideo);
      }
    });
  }

 


    await uploadCourse(formData);
    
  }
  
  

  
  





  return (
    <div className="w-full min-h-screen flex">
      <div className="w-[80%]">
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
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            isLoading={isLoading}
            isSuccess={isSuccess}

          />
        )}
        {active === 4 && (
          <CourseSuccess active={active} setActive={setActive} />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-10 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
