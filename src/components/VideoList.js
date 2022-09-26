import React from 'react';
import { Button } from 'rsuite';
import VideoItem from './VideoItem';

const VideoList = ({videos , setVidId}) => {
    const renderedVideos =  videos.map((video) => {
        const print = () =>{
            console.log(video.id.videoId);
        }
        return <>
        <VideoItem key={video.id.videoId} video={video} setVidId={setVidId} />
        <Button onClick={print}> Watch </Button>
        <Button> Record </Button>
        </>
        // console.log(video.id);
    });

    return <div>{renderedVideos}</div>;
};
export default VideoList;