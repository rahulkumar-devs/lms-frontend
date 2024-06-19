"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, useEffect } from "react";
import {
  courseContentSchema,
  CourseContent as courseContent,
} from "./courseDataSchema";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  AiOutlineDelete,
  AiOutlinePlayCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

type Props = {
  courseContentData: courseContent[];
  setCourseContentData: (courseContentData: any) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: any;
};

const CourseContent = ({
  courseContentData,
  setActive,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
  active,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: courseContent) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the field first");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent: courseContent = {
        videoUrl: "",
        videoSection: newVideoSection,
        title: "",
        description: "",
        links: [
          {
            title: "",
            url: "",
          },
        ],
        suggestion: "",
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const handleNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      return toast.error("Please fill all the field first");
    } else {
      const newSection: courseContent = {
        videoUrl: "",
        videoSection: ` Untitled Section ${active}`,
        title: "",
        description: "",
        links: [
          {
            title: "",
            url: "",
          },
        ],
        suggestion: "",
      };

      setCourseContentData([...courseContentData, newSection]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill the field before going to next step");
    } else {
     
      setActive(active + 1);
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-2.5 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <>
                  <div className="flex items-center w-full gap-1.5">
                    <input
                      type="text"
                      className={`text-[25px] ${
                        item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-min"
                      } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                      value={item.videoSection}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].videoSection = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                    <BsPencil className="cursor-pointer dark:text-white text-black" />
                  </div>
                  <br />
                </>
              )}
              <div className="flex w-full items-center justify-between">
                {isCollapsed[index] && item.title ? (
                  <p className="font-Poppins dark:text-white text-black">
                    {index + 1}.{item.title}
                  </p>
                ) : null}

                <div className="flex items-center ml-auto ">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updateData = [...courseContentData];
                        updateData.splice(index, 1);
                        setCourseContentData(updateData);
                      }
                    }}
                  />

                  <MdOutlineKeyboardArrowDown
                    className="dark:text-white text-black cursor-pointer text-[25px]"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <Label id="title" className=" my-1.5">
                      Video title
                    </Label>
                    <Input
                      placeholder="Project plan"
                      type="text"
                      name="title"
                      className=" mt-2"
                      value={item.title}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].title = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="my-3 ">
                    <Label id="title" className=" my-1.5">
                      Video Url
                    </Label>
                    <Input
                      placeholder="video url"
                      type="text"
                      name="description"
                      className=" mt-2"
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].videoUrl = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="my-3 ">
                    <Label id="title" className="">
                      Video Description
                    </Label>
                    <Textarea
                      rows={8}
                      cols={30}
                      placeholder="Project plan"
                      name="description"
                      className=" mt-6"
                      value={item.description}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].description = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                    <br />
                  </div>
                  {item.links.map(
                    (
                      link: { title: string; url: string },
                      linkIndex: number
                    ) => {
                      return (
                        <div className="" key={linkIndex}>
                          <div className=" mb-3 block">
                            <div className=" w-full flex items-center justify-between">
                              <Label>Link {linkIndex + 1}</Label>
                              <AiOutlineDelete
                                className={`${
                                  linkIndex === 0
                                    ? " cursor-no-drop"
                                    : " cursor-pointer"
                                } text-block dark:text-white text-[25px]`}
                                onClick={() =>
                                  linkIndex === 0
                                    ? null
                                    : handleRemoveLink(index, linkIndex)
                                }
                              />
                            </div>
                            <Input
                              type="text"
                              placeholder="Source code .. (link title)"
                              value={link.title}
                              className=" mt-4"
                              onChange={(e) => {
                                const updateData = [...courseContentData];
                                updateData[index].links[linkIndex].title =
                                  e.target.value;
                                setCourseContentData(updateData);
                              }}
                            />
                            <Input
                              type="text"
                              placeholder="Source code .. (link URL)"
                              value={link.url}
                              className=" mt-4"
                              onChange={(e) => {
                                const updateData = [...courseContentData];
                                updateData[index].links[linkIndex].url =
                                  e.target.value;
                                setCourseContentData(updateData);
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                  <br />
                  {/* add link btn */}
                  <div className=" inline-block mb-4">
                    <p
                      className=" flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className=" mr-2" /> Add Link
                    </p>
                  </div>
                </>
              )}
              <br />
              {/*  */}
              {index === courseContentData.length - 1 && (
                <p
                  className=" flex items-center text-[18px] dark:text-white text-dark cursor-pointer"
                  onClick={(e) => newContentHandler(item)}
                >
                  <AiOutlinePlayCircle className=" mr-2" />
                  Add New Content
                </p>
              )}
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => handleNewSection()}
        >
          <AiOutlinePlusCircle className=" mr-2" />
          Add new Section
        </div>
      </form>
      <br />
      <div className=" flex items-center justify-between w-full mt-5">
        <Button onClick={prevButton}>Prev</Button>
        <Button onClick={handleOptions}>Next</Button>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
