import React from 'react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';


const Player = () => {
  const {vidId} = useParams();
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };

       const _onReady = (event) => {
      event.target.pauseVideo();
  }

      return <YouTube videoId={vidId} opts={opts} onReady={_onReady} />;


}
export default Player;