import React from 'react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';


// const Player = ({ video }) => {
//   if (!video) {
//     return <div>
//        <h3>Enter Keyword</h3>
//        <br></br>
//        <p style={{fontSize:'25px'}}>
//         Search Results :
//        </p>
//     </div>;
//   }
  
//   const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
//   console.log(typeof video);
//   return (
//     <div>
//       <div className="ui embed">
//         <iframe src={videoSrc} allowFullScreen title="Video player" />
//       </div>
//       <div >
//         <h4 className="ui header">{video.snippet.title}</h4>
//         <p>{video.snippet.description}</p>
//       </div>
//     </div>
//   );
// };

// class Player extends React.Component  {
//   render() {
//     const {vidId} = useParams();
//     const opts = {
//       height: '390',
//       width: '640',
//       playerVars: {
//         // https://developers.google.com/youtube/player_parameters
//         autoplay: 1,
//       },
//     };

//           return <YouTube videoId={vidId} opts={opts} onReady={this._onReady} />;
//   }

//   _onReady(event) {
//     // access to player in all event handlers via event.target
//     event.target.pauseVideo();
//   }
// }


const Player = () => {
  const {vidId} = useParams();
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

       const _onReady = (event) => {
    // access to player in all event handlers via event.target
      event.target.pauseVideo();
  }

      return <YouTube videoId={vidId} opts={opts} onReady={_onReady} />;


}
export default Player;