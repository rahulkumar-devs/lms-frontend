import React, { useEffect, useState } from "react";
import CourseInfo from "../createCourse/CourseInfo";
import CourseOptions from "../createCourse/CourseOptions";
import CourseData from "../createCourse/CourseData";
import CourseContent from "../createCourse/CourseContent";
import CoursePreview from "../createCourse/CoursePreview";
import CourseSuccess from "../createCourse/CourseSuccess";
import {
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/course/courseApi";
import {
  ICourseData,
  ICourseContentSchema,
  IBenefit,
  IPrerequisites,
} from "../createCourse/courseTypes";
import { CourseInfoData } from "../createCourse/courseDataSchema";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const EditCourse = ({ id }: Props) => {
  const { data: getCourseData, isLoading: getCourseLoading } =
    useGetAllCoursesQuery({});
  const [active, setActive] = useState<number>(0);
  const [benefits, setBenefits] = useState<IBenefit[]>([]);
  const [prerequisites, setPrerequisites] = useState<IPrerequisites[]>([]);
  const [updateData, setUpdateData] = useState<any>();
  const[isEditCourse,setIsEditCourse] = useState<boolean>(false);
  const [courseContentData, setCourseContentData] = useState<
    ICourseContentSchema[]
  >([]);
  const [courseData, setCourseData] = useState<Partial<ICourseData>>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    thumbnail: null,
    demoVideo: null,
  });
  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoVideo: null,
    thumbnail: null,
  });

  // update Api
  const [
    updateCourse,
    { isLoading, error, isSuccess, data: courseFetchedData },
  ] = useUpdateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      const message =
        courseFetchedData?.message || "Course updated successfully!";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, courseFetchedData, error]);

 // Fetch data based on ID
 useEffect(() => {
  if (!getCourseData || getCourseLoading) return;

  const foundCourse = getCourseData.data.find(
    (course: any) => course._id === id
  );
  if (foundCourse) {
    setCourseInfo({
      name: foundCourse.name ?? "",
      description: foundCourse.description ?? "",
      price: foundCourse.price ?? "",
      estimatedPrice: foundCourse.estimatedPrice ?? "",
      tags: foundCourse.tags ?? "",
      level: foundCourse.level ?? "",
      demoVideo: foundCourse.demoVideo ?? null,
      thumbnail: foundCourse.thumbnail ?? null,
    });

    setBenefits(foundCourse.benefits ?? []);
    setPrerequisites(foundCourse.prerequisites ?? []);
    setCourseContentData(
      foundCourse.courseData
        ? foundCourse.courseData.map((item: ICourseContentSchema) => ({
            ...item,
            links: item.links.map((link) => ({ ...link })),
          }))
        : []
    );

    setUpdateData(
      {name: foundCourse.name ?? "",
        description: foundCourse.description ?? "",
        price: foundCourse.price ?? "",
        estimatedPrice: foundCourse.estimatedPrice ?? "",
        tags: foundCourse.tags ?? "",
        level: foundCourse.level ?? "",
        thumbnail: foundCourse.thumbnail ?? null,
        demoVideo: foundCourse.demoVideo ?? null,
        prerequisites: foundCourse.prerequisites ?? [],
        benefits: foundCourse.benefits ?? [],
        courseContent: foundCourse.courseData ?? []}
    )

    setCourseData({
      name: foundCourse.name ?? "",
      description: foundCourse.description ?? "",
      price: foundCourse.price ?? "",
      estimatedPrice: foundCourse.estimatedPrice ?? "",
      tags: foundCourse.tags ?? "",
      level: foundCourse.level ?? "",
      thumbnail: foundCourse.thumbnail ?? null,
      demoVideo: foundCourse.demoVideo ?? null,
      prerequisites: foundCourse.prerequisites ?? [],
      benefits: foundCourse.benefits ?? [],
      courseContent: foundCourse.courseData ?? [],
    });
  }
}, [getCourseData, getCourseLoading, id]);

const handleSubmit = () => {
  const formattedBenefits = benefits.map((benefit) => ({
    title: benefit.title,
  }));

  const formattedPrerequisites = prerequisites.map((prerequisite) => ({
    title: prerequisite.title,
  }));

  const formattedCourseContent = courseContentData.map((content) => ({
    contentVideo: content.contentVideo,
    videoSection: content.videoSection,
    title: content.title,
    description: content.description,
    links: content.links.map((link) => ({
      title: link.title,
      url: link.url,
    })),
    suggestion: content.suggestion?? "", // Provide a default value if undefined
  }));

  const data: ICourseData = {
    name: courseInfo.name,
    description: courseInfo.description,
    price: courseInfo.price,
    estimatedPrice: courseInfo.estimatedPrice,
    tags: courseInfo.tags,
    thumbnail: courseInfo.thumbnail,
    level: courseInfo.level,
    demoVideo: courseInfo.demoVideo,
    prerequisites: formattedPrerequisites,
    benefits: formattedBenefits,
    courseContent: formattedCourseContent,
  };

  setCourseData(data); // Update the courseData state with the new values

  setActive(3); // Move to the next step
};


const handleCourseUpdate = async () => {
  const formData = new FormData();

  // Append text fields
  formData.append("name", courseData.name || "");
  formData.append("description", courseData.description || "");
  formData.append("price", courseData.price || "");
  formData.append("estimatedPrice", courseData.estimatedPrice || "");
  formData.append("tags", courseData.tags || "");
  formData.append("level", courseData.level || "");

  // Append files
  if (courseData.thumbnail) {
    formData.append("thumbnail", courseData.thumbnail);
  }
  if (courseData.demoVideo) {
    formData.append("demoVideo", courseData.demoVideo);
  }

  // Append arrays as JSON strings
  formData.append("prerequisites", JSON.stringify(courseData.prerequisites || []));
  formData.append("benefits", JSON.stringify(courseData.benefits || []));


  // Append course content data
  if (courseData.courseContent) {
    formData.append("courseContent", JSON.stringify(courseData.courseContent));
    courseData.courseContent.forEach((content, index) => {
      if (content.contentVideo instanceof File) {
        formData.append(`contentVideo_${index}`, content.contentVideo);
      }
    });
  }



  try {
    const response = await updateCourse({ data: formData, courseId: id });
    // console.log("API Response:", response);
  } catch (error) {
    console.error("API Error:", error);
  }
};


  // debug
  console.log("courseData ===>", courseData);

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
            handleCourseCreate={handleCourseUpdate}
            isLoading={isLoading}
            isSuccess={false}
            setIsEditCourse={setIsEditCourse}
            isEditCourse={true}

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

export default EditCourse;
