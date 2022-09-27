import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos , setVidId}) => {
    const renderedVideos =  videos.map((video) => {
        return <>
                <VideoItem key={video.id.videoId} video={video} setVidId={setVidId} />
        </>
    });

    return <div>{renderedVideos}</div>;
};
export default VideoList;