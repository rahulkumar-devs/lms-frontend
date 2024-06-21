"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, useEffect } from "react";

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
import { ICourseContentSchema } from "./courseTypes";

type Props = {
  courseContentData: ICourseContentSchema[];
  setCourseContentData: (ICourseContentSchema: any) => void;
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

  const [activeSection, setActiveSection] = useState(1);
  const [unableVideoSec, setUnableVideoSec] = useState(false);
  const [dragVideo, setDragVideo] = useState<boolean>(false);
  // Separate state for displayVideo
  const [displayVideos, setDisplayVideos] = useState<string[]>(Array(courseContentData.length).fill(""));

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          const updateData = [...courseContentData];
          updateData[index].contentVideo = file;
          setCourseContentData(updateData);

          const updatedDisplayVideos = [...displayVideos];
          updatedDisplayVideos[index] = reader.result as string;
          setDisplayVideos(updatedDisplayVideos);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragVideo(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragVideo(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, index: number) => {
    e.preventDefault();
    setDragVideo(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          const updateData = [...courseContentData];
          updateData[index].contentVideo = file;
          setCourseContentData(updateData);

          const updatedDisplayVideos = [...displayVideos];
          updatedDisplayVideos[index] = reader.result as string;
          setDisplayVideos(updatedDisplayVideos);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  const newContentHandler = (item: ICourseContentSchema) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.contentVideo === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      let newVideoSection = `Untitled Section ${active}`;
  
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection + 1; // Increment the section name or ID
        }
      }
  
      const newContent: ICourseContentSchema = {
        contentVideo: null,
        videoSection: newVideoSection, // Assigning a unique section
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
      setDisplayVideos([...displayVideos, ""]); 
    }
  };
  


  const handleNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].contentVideo === null ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      return toast.error("Please fill all the field first");
    } else {
      const newSection: ICourseContentSchema = {
        contentVideo: "",
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
      setDisplayVideos([...displayVideos, ""]); 
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].contentVideo === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill the field before going to next step");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

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
                      disabled={unableVideoSec}
                    />
                    <BsPencil
                      className="cursor-pointer dark:text-white text-black"
                      onClick={() => setUnableVideoSec(!unableVideoSec)}
                    />
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
                    <Label
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      id="contentVideoLabel"
                      htmlFor={`contentVideo-${index}`}
                      className={`w-full min-h-[10vh] cursor-pointer dark:border-white border-[#00000026] p-3 mt-3 border flex items-center justify-center ${
                        dragVideo ? "bg-blue-500" : "bg-transparent"
                      }`}
                    >
                      {displayVideos[index] ? (
                        <video controls className="w-full">
                          <source  src={displayVideos[index]} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <span>
                          Drag and drop your{" "}
                          <span className="text-red-600 font-bold">
                            Content video
                          </span>{" "}
                          here or click to browse
                        </span>
                      )}
                    </Label>
                    <Input
                      id={`contentVideo-${index}`}
                      type="file"
                      accept="video/*"
                      name="contentVideo"
                      className="mt-2 hidden"
                      onChange={(e) => handleFileChange(index, e)}
                    />
                  </div>
                  <div className="my-3 ">
                    <Label id="title" className="">
                      Video Description
                    </Label>
                    <Textarea
                      rows={8}
                      cols={30}
                      placeholder="Project plans"
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
