import React from "react";
import VideoItem from "./VideoItem";

interface VideoListProps {
  videos: Array<any>;
  setPlayId: (videoId: string) => void;
  setRecId: (videoId: string) => void;
}

const VideoList: React.FC<VideoListProps> = ({
  videos,
  setPlayId,
  setRecId,
}) => {
  const renderedVideos = videos.map((video, index) => {
    return (
      <div key={index}>
        <VideoItem video={video} setPlayId={setPlayId} setRecId={setRecId} />
      </div>
    );
  });

  return <div>{renderedVideos}</div>;
};

export default VideoList;
