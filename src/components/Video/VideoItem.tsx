import React, { useRef } from "react";
import { Button } from "rsuite";
import LoadingBar from "react-top-loading-bar";
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
  const loadingBarRef = useRef<any>(null);

  const handleWatch = (videoId: string) => {
    loadingBarRef.current.continuousStart();
    setTimeout(() => {
      setPlayId(videoId);
      loadingBarRef.current.complete();
    },1500); 
  };

  const handleTranslate = (videoId: string) => {
    
    loadingBarRef.current.continuousStart();
    setTimeout(() => {
      setRecId(videoId);
      loadingBarRef.current.complete();
    }, 1000);
  };

  return (
    <div className="video_item">
      <LoadingBar color="#f11946" height={3} ref={loadingBarRef} />
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
          <Button onClick={() => handleWatch(video.id.videoId)}>Watch</Button>
        </span>
        <span className="translate">
          <Button onClick={() => handleTranslate(video.id.videoId)}>Translate</Button>
        </span>
      </div>
    </div>
  );
};

export default VideoItem;
