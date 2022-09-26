import React from 'react';
import '../style/video.css';

const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <div >
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div>
                <div><b><h3>{video.snippet.title}</h3></b></div>
            </div>
        </div>
    )
};
export default VideoItem;