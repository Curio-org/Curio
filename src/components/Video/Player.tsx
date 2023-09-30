import React from 'react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import TranslatedAudio from './translatedAudio';
import './video.css';

const Player = (props: any) => {
  const { vidId } = useParams<{ vidId: string }>();

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const _onReady = (event: any) => {
    event.target.pauseVideo();
  };

  const stateChange = (e: any) => {
    let yt = e.target as any;
    let mAudio = document.getElementById('translatedAudio') as HTMLAudioElement | null;

    if (mAudio && yt.getCurrentTime) {
      mAudio.currentTime = yt.getCurrentTime() as number;
    }
  };

  const playvid = (e: any) => {
    let yt = e.target as any;
    let mAudio = document.getElementById('translatedAudio') as HTMLAudioElement | null;

    if (mAudio && yt.getCurrentTime) {
      mAudio.load();
      mAudio.currentTime = yt.getCurrentTime() as number;
      mAudio.play();
    }
  };

  const stopvid = () => {
    let mAudio = document.getElementById('translatedAudio') as HTMLAudioElement | null;

    if (mAudio) {
      mAudio.pause();
    }
  };

  const playbackchange = (e: any) => {
    let yt = e.target as any;
    let mAudio = document.getElementById('translatedAudio') as HTMLAudioElement | null;

    if (mAudio && yt.getPlaybackRate) {
      mAudio.playbackRate = yt.getPlaybackRate() as number;
    }
  };

  return (
    <>
      <div className="youtube">
        <YouTube
          onPlaybackRateChange={playbackchange}
          videoId={vidId}
          onPlay={playvid}
          onPause={stopvid}
          onEnd={stopvid}
          opts={opts}
          onStateChange={stateChange}
          onReady={_onReady}
        />
        <TranslatedAudio />
      </div>
    </>
  );
};

export default Player;
