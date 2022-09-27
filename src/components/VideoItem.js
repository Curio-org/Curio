import React from 'react';
import { Button } from 'rsuite';
import '../style/video.css';

const VideoItem = ({video , setVidId}) => {
    return (
        <div>
            <img  src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div>
                <div><b><h3>{video.snippet.title}</h3></b></div>
                <Button onClick={setVidId}>Watch Video</Button>
            </div>
        </div>
    )
};
export default VideoItem;