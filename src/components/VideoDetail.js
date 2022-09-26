import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
       <h3>Enter Keyword</h3>
       <br></br>
       <p style={{fontSize:'25px'}}>
        Search Results :
       </p>
    </div>;
  }
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);
  return (
    <div>
      <div>
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div>
        <h4>{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;