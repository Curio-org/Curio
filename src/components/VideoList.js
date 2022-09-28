import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos , setVidId}) => {
    const renderedVideos =  videos.map((video, index) => {
        return <div key={index}>
                <VideoItem video={video} setVidId={setVidId} />
        </div>
    });

    return <div>{renderedVideos}</div>;
};
export default VideoList;