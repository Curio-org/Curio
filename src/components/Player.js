import React, { Component } from 'react';
import VideoPlayer from 'react-video-player-extended';

class Player extends Component {
  state = {
    isPlaying: false,
    volume: 0.7
  };

  handlePlay = () => {
    this.setState({isPlaying: true});
  };

  handlePause = () => {
    this.setState({isPlaying: false});
  };

  handleVolume = value => {
    this.setState({volume: value});
  };

  render () {
    const {isPlaying, volume} = this.state;

    return <VideoPlayer
      url="https://media.w3.org/2010/05/bunny/trailer.mp4"
      isPlaying={isPlaying}
      volume={volume}
      onPlay={this.handlePlay}
      onPause={this.handlePause}
      onVolume={this.handleVolume}
     />
  }
}

export default Player;