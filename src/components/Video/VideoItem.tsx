import React from "react";
import { Button } from "rsuite";
import "./video.css";

interface VideoItemProps {
  video: {
    id: {
      videoId: string;
    };
    snippet: {
      thumbnails: {
        medium: {
          url: string;
        };
      };
      title: string;
      channelTitle: string;
      description: string;
    };
  };
  setPlayId: (videoId: string) => void;
  setRecId: (videoId: string) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  setPlayId,
  setRecId,
}) => {
  return (
    <div className="video_item">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />
      <div>
        <div className="title">
          <h4>{video.snippet.title}</h4>
        </div>
        <div className="channel_name">
          <p>{video.snippet.channelTitle}</p>
        </div>
        <span className="watch">
          <Button onClick={() => setPlayId(video.id.videoId)}>Watch</Button>
        </span>
        <span className="translate">
          <Button onClick={() => setRecId(video.id.videoId)}>Translate</Button>
        </span>
      </div>
    </div>
  );
};

export default VideoItem;
