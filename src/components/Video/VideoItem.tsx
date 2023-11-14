import React, { useState, useRef } from "react";
import { Button } from "rsuite";
import "./video.css";
import LoadingBar from 'react-top-loading-bar';

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

const VideoItem: React.FC<VideoItemProps> = ({ video, setPlayId, setRecId }) => {
  const loadingBarRef = useRef<any>(null);

  const startLoadingBar = () => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
  };

  const completeLoadingBar = () => {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
  };

  const handleWatchClick = () => {
    startLoadingBar();
    setPlayId(video.id.videoId);
    completeLoadingBar();
  };

  const handleTranslateClick = () => {
    startLoadingBar();
    setRecId(video.id.videoId);
    completeLoadingBar();
  };

  return (
    <div className="video_item">
      <LoadingBar
        color='#f11946'
        height={3}
        ref={loadingBarRef}
      />
      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} />
      <div>
        <div className="title">
          <h4>{video.snippet.title}</h4>
        </div>
        <div className="channel_name">
          <p>{video.snippet.channelTitle}</p>
        </div>
        <span className="watch">
          <Button onClick={handleWatchClick}>Watch</Button>
        </span>
        <span className="translate">
          <Button onClick={handleTranslateClick}>Translate</Button>
        </span>
      </div>
    </div>
  );
};

export default VideoItem;
