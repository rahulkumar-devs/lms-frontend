import { useState } from "react";
import { Button } from "../ui/button";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

interface ICourseData {
  data: any;
  activeVideo?: number;
  setActiveVideo?: (index: number) => void;
  isDemo?: boolean;
}

const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = (duration % 60).toFixed(0);
  return `${minutes}m ${seconds}s`;
};

const CourseContentlist = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}: ICourseData) => {
  const [visibleSection, setVisibleSection] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = Array.from(
    new Set<string>(data?.map((item: any) => item.videoSection))
  );

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSection = new Set(visibleSection);
    if (newVisibleSection.has(section)) {
      newVisibleSection.delete(section);
    } else {
      newVisibleSection.add(section);
    }
    setVisibleSection(newVisibleSection);
  };

  return (
    <div className={`mt-[15px] w-full ${isDemo && "ml-[-30px] sticky top-24 left-0 z-30"}`}>
      {videoSections.map((section: string, secIndex: number) => {
        const sectionVideo: any[] = data.filter((item: any) => item.videoSection === section);
        const isSectionVisible = visibleSection.has(section);
        const sectionVideoCount: number = sectionVideo.length;
        const sectionVideoLength: number = sectionVideo.reduce((totalLength: number, item: any) => totalLength + item.videoLength, 0);

        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionCountHours: number = sectionVideoLength / 60;

        return (
          <div className={` ${!isDemo && "border-b border-[#ffffff8e] pb-2"}`} key={section}>
            <div className="w-full flex justify-between items-center">
              <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
              <Button onClick={() => toggleSection(section)}>
                {isSectionVisible ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}{" "}
              </Button>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons - {formatDuration(sectionVideoLength)}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideo.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  return (
                    <div
                      className={`w-full ${videoIndex === activeVideo ? "bg-slate-800" : ""} cursor-pointer transition-all p-2`}
                      key={item?._id}
                      onClick={() => !isDemo && setActiveVideo && setActiveVideo(videoIndex)}
                    >
                      <div className="flex items-center">
                        <MdOutlineOndemandVideo size={25} className="mr-2" color="#1cdada" />
                        <h1 className="text-[18px] inline-block break-words text-black dark:text-white">{item?.title}</h1>
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">
                        {formatDuration(item.videoLength)}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentlist;
