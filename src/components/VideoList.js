import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos , setVidId , setRecId}) => {
    const renderedVideos =  videos.map((video, index) => {
        return <div key={index}>
                <VideoItem video={video} setVidId={setVidId} setRecId={setRecId}/>
        </div>
    });

    return <div>{renderedVideos}</div>;
};
export default VideoList;