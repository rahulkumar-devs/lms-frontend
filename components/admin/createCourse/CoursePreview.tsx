"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ICourseData } from "./courseTypes";
import { Button } from "@/components/ui/button";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: Partial<ICourseData>;
  handleCourseCreate: any;
};

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}: Props) => {

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    setActive(active + 1);
  };

  const [videoUrls, setVideoUrls] = useState({
    videoThumbnail: "",
    demoVideoUrl: "",
    contentVideoUrls: [] as string[],
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleFiles = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          resolve(reader.result as string);
        }
      };
      reader.onerror = () => reject("Failed to read file");
      reader.readAsDataURL(file);
    });
  }, []);

  const getAllFilesData = useCallback(async () => {
    if (courseData.thumbnail) {
      const thumbnailUrl = await handleFiles(courseData.thumbnail);
      setVideoUrls((prev) => ({ ...prev, videoThumbnail: thumbnailUrl }));
    }
    if (courseData.demoVideo) {
      const demoVideoUrl = await handleFiles(courseData.demoVideo);
      setVideoUrls((prev) => ({ ...prev, demoVideoUrl: demoVideoUrl }));
    }
    if (courseData.courseContent && courseData.courseContent.length > 0) {
      const contentVideoUrls = await Promise.all(
        courseData.courseContent.map((item) => handleFiles(item.contentVideo))
      );
      setVideoUrls((prev) => ({
        ...prev,
        contentVideoUrls: contentVideoUrls,
      }));
    }
  }, [courseData, handleFiles]);

  useEffect(() => {
    getAllFilesData();
  }, [courseData, getAllFilesData]);

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <p className="text-2xl font-bold">Course Preview</p>
        <p className="text-lg">{courseData.name}</p>

        <div className="w-full mt-10">
          {videoUrls.demoVideoUrl && (
            <video
              controls
              className="w-full"
              poster={videoUrls.videoThumbnail || ""}
            >
              <source src={videoUrls.demoVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <section className="mt-5">
          <p className="text-xl font-bold">Description</p>
          <p>{courseData.description}</p>
        </section>

        <section className="mt-5">
          <p className="text-xl font-bold">Benefits</p>
          <ul className="list-disc list-inside">
            {courseData.benefits?.map((benefit, index) => (
              <li key={index}>{benefit.title}</li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <p className="text-xl font-bold">Prerequisites</p>
          <ul className="list-disc list-inside">
            {courseData.prerequisites?.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </section>

        <div className="flex items-center justify-around mt-5">
          <div>
            <p className="font-semibold">Estimated Price</p>
            <p>{courseData.estimatedPrice}</p>
          </div>
          <div>
            <p className="font-semibold">Price</p>
            <p>{courseData.price}</p>
          </div>
        </div>

        <section className="mt-5">
          <p className="text-xl font-bold">Course Content</p>
          {courseData.courseContent?.map((item, index) => (
            <div key={index} className="mt-3 border p-3 rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-blue-500">{expandedIndex === index ? 'Collapse' : 'Expand'}</p>
              </div>
              {expandedIndex === index && (
                <>
                  <p>{item.description}</p>
                  <p className="font-semibold mt-2">Suggestions:</p>
                  <p>{item.suggestion}</p>
                  <p className="font-semibold mt-2">Links:</p>
                  <ul className="list-disc list-inside">
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {videoUrls.contentVideoUrls[index] && (
                    <div className="mt-3">
                      <video controls className="w-full">
                        <source src={videoUrls.contentVideoUrls[index]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </section>

        <div className="flex items-center justify-between w-full mt-5">
          <Button onClick={prevButton}>Prev</Button>
          <Button onClick={handleOptions}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
