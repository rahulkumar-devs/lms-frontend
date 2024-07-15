import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

type Props = {
  videoUrl: string;
  title: string;
  thumbnail?:string
};

const CoursePlayer = ({ videoUrl, title,thumbnail }: Props) => {
  return (
    <div>
      <MediaPlayer playsInline
          title={title || ""}
          src={videoUrl || ""}
        >
          <MediaProvider />
          <DefaultVideoLayout
            thumbnails={thumbnail || ""}
            icons={defaultLayoutIcons}
          />
        </MediaPlayer>
    </div>
  );
};

export default CoursePlayer;
 
