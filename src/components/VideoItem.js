import React from 'react';
import '../style/video.css';

const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <div onClick={ () => handleVideoSelect(video)}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div>
                <div>{video.snippet.title}</div>
            </div>
        </div>
    )
};
export default VideoItem;