"use client";
import { useState, useEffect } from "react";
import { useGetCourseDetailsQuery } from "@/redux/course/courseApi";
import Heading from "@/utils/Heading";
import React from "react";
import Header from "../Header";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Rating from "@/utils/Rating";


import CoursePlayer from "@/utils/CoursePlayer";
import Link from "next/link";
import { Button } from "../ui/button";
import CourseContentlist from "./CourseContentlist"

type Props = {
  courseId: string;
};

const CourseDetails = ({ courseId }: Props) => {
  const { data: fetchedData, isLoading } = useGetCourseDetailsQuery(courseId);
  const [courseDetailsData, setCourseDetailsData] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (fetchedData?.data) {
      setCourseDetailsData(fetchedData?.data);
    }
  }, [fetchedData]);

  if (isLoading) {
    return <Loader />;
  }

  console.log(fetchedData?.data);

  const discountPercentage =
    ((fetchedData?.data?.estimatedPrice - fetchedData?.data?.price) /
      fetchedData?.data?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.some((item: any) => item?.courseId === courseId);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Heading
        title={`Course ${courseId}`}
        description={fetchedData?.data?.description || "E-learning free course"}
        keywords={fetchedData?.data?.tags || ""}
      />
      <Header />
      <div className="container mx-auto py-10">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-[90%] lg:w-[85%] mx-auto py-5">
            <div className="w-full flex flex-col-reverse lg:flex-row gap-2">
              <div className="w-full lg:w-[65%] lg:pr-5">
                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  {fetchedData?.data?.name}
                </h1>
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center">
                    <Rating rating={fetchedData?.data?.ratings || 0} />
                    <h5 className="ml-2 text-black dark:text-white">
                      {fetchedData?.data?.reviews.length} Reviews
                    </h5>
                  </div>
                  <h5 className="text-black dark:text-white">
                    {fetchedData?.data?.purchased} Students
                  </h5>
                </div>
                <br />
                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  What you will learn from this Course?
                </h1>
                <div className="flex flex-col py-2">
                  {fetchedData &&
                    fetchedData?.data?.benefits?.length > 0 &&
                    fetchedData.data.benefits.map(
                      (item: any, index: number) => (
                        <div key={index} className="flex items-start py-2">
                          <IoCheckmarkDoneOutline
                            size={20}
                            className="text-black dark:text-white mt-1"
                          />
                          <p className="ml-2 text-black dark:text-white">
                            {item.title}
                          </p>
                        </div>
                      )
                    )}
                  <br />
                  <br />
                </div>
                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  What are the Prerequisits for starting Course?
                </h1>
                <div className="flex flex-col py-2">
                  {fetchedData &&
                    fetchedData?.data?.prerequisites?.length > 0 &&
                    fetchedData.data.prerequisites.map(
                      (item: any, index: number) => (
                        <div key={index} className="flex items-start py-2">
                          <IoCheckmarkDoneOutline
                            size={20}
                            className="text-black dark:text-white mt-1"
                          />
                          <p className="ml-2 text-black dark:text-white">
                            {item.title}
                          </p>
                        </div>
                      )
                    )}
                  <br />
                  <br />
                  <div>
                    <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                      Course Overview
                    </h1>
                    {/* COurse Contentlist */}
                    <CourseContentlist data={fetchedData?.data?.courseData}/>
                  </div>
                  <br />
                  <br />
                  {/* courseDescription */}
                  <div className=" w-full">
                    <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                      {" "}
                      Course Details
                    </h1>
                    <p className=" text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                      {fetchedData?.data?.description}
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className=" w-full">
                    <div className=" lg:flex items-center">
                      <Rating rating={fetchedData?.data?.ratings || 0} />
                      <div className=" mb-2 lg:mb-[unset]" />
                      <h5 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                        {Number.isInteger(fetchedData?.data?.ratings)
                          ? fetchedData?.data?.ratings.toFixed(1)
                          : fetchedData?.data?.ratings.toFixed(1)}
                        Course Rating {fetchedData?.data?.ratings}
                      </h5>
                    </div>
                    <br />
                    {(
                      fetchedData?.data?.reviews &&
                      [...fetchedData?.data?.reviews].reverse()
                    ).map((item: any, index: number) => {
                      return (
                        <div key={index}>
                          <div className=" flex">
                            <div className=" w-[50px] h-[50px]">
                              <div className="  w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                                <h1 className=" uppercase text-[10px] text-black dark:text-white">
                                  {item?.user?.name.slice(0, 2)}
                                </h1>
                              </div>
                            </div>
                            <div className=" hidden lg:block pl-2">
                              <div className=" flex items-center">
                                <h5 className=" text-[18px] pr-2 text-black dark:text-white">
                                  {item?.user?.name || ""}
                                </h5>
                                <Rating rating={item?.rating || 0} />
                              </div>
                              <p className=" text-black dark:text-white">
                                {" "}
                                {item.comment}
                              </p>
                              <small className=" text-gray-800 dark:text-gray-50">
                                {item?.createAt || ""}
                              </small>
                            </div>
                            <div className=" pl-2 flex lg:hidden items-center">
                              <h5 className=" text-[18px] pr-2 text-black dark:text-white">
                                {item?.user?.name}
                              </h5>
                              <Rating rating={item?.rating} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="w-full lg:w-[35%] relative">
                <div className=" sticky top-[100px] right-0 z-50 w-full">
                  <CoursePlayer
                    videoUrl={fetchedData?.data?.demoVideo}
                    thumbnail={fetchedData?.data?.thumbnail || ""}
                    title={fetchedData?.data?.name || ""}
                  />
                  <div className=" w-full lg:w-[35%] relative">
                    <div className=" sticky flex items-center  justify-start top-[100px] left-0 z-50 w-full">
                      <h1 className=" pt-5 text-[25px] text-black dark:text-white flex items-center justify-start">
                        {fetchedData?.data?.price === 0
                          ? "Free"
                          : fetchedData?.data?.price + "$"}
                      </h1>
                      <h5 className=" pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                        {fetchedData?.data?.estimatedPrice}$
                      </h5>
                      <h4 className=" pl-5 pt-4 flex items-center  text-[22px] text-black dark:text-white">
                        {discountPercentagePrice} <span>
                        %Off
                       </span> 
                      </h4>
                    </div>
                    <div className=" flex items-center">
                      {isPurchased ? (
                        <Link href={`/course-access/${fetchedData?.data?._id}`}>
                          Enter to Course
                        </Link>
                      ) : (
                        <Button
                          className=" my-3 font-Poppins cursor-pointer bg-[crimson]"
                        //   onClick={handleOrder}
                        >
                          Buy now {fetchedData?.data?.price}$
                        </Button>
                      )}
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>

            {/*  */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
