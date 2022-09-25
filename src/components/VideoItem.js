import React from 'react';
import '../style/video.css';

const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <div >
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div>
                <div>{video.snippet.title}</div>
                {/* <button onClick={this.location.replace('/play')} type="submit">Click Me</button> */}
            </div>
        </div>
    )
};
export default VideoItem;