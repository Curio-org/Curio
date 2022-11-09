import React from 'react';
import { Button } from 'rsuite';
import './video.css';

const VideoItem = ({video , setVidId , setRecId }) => {
    return (
        <div className='video_item'>
            <img  src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div>
                <div className='title'><h4>{video.snippet.title}</h4></div>
                <div className='channel_name'><p>{video.snippet.channelTitle}</p></div>
                <span className='watch'><Button onClick={() => {setVidId(video.id.videoId)}}>Watch</Button></span>
                <span className='translate'><Button onClick={() => {setRecId(video.id.videoId)}}>Translate</Button></span>
            </div>
        </div>
    )
};
export default VideoItem;