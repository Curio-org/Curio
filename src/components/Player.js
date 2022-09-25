import React from 'react';
import VideoList from './VideoList';
// import YouTube from 'react-youtube';
// import VideoDetail from './VideoDetail';


const Player = ({ video }) => {
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
    <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
    
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

// class Player extends React.Component {
//   render() {
//     const opts = {
//       height: '390',
//       width: '640',
//       playerVars: {
//         // https://developers.google.com/youtube/player_parameters
//         autoplay: 1,
//       },
//     };

//     return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />;
//   }

//   _onReady(event) {
//     // access to player in all event handlers via event.target
//     event.target.pauseVideo();
//   }
// }

export default Player;