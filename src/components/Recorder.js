import React from 'react';
// import {useState} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { Button , InputNumber , InputGroup} from 'rsuite';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export default class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isRecording: false,
        blobURL: '',
        isBlocked: false,
        isRecordingStp: false,
        rStart : 0
      }

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.setDuration = this.setDuration.bind(this);
   }

  componentDidMount(){
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
     );

     navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }
 
  start(){
    if (this.state.isBlocked) {
      alert('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
    let duration = document.querySelector('input').value;
    setTimeout(this.stop , duration * 1000)
  }

  stop() {
    Mp3Recorder
      .stop()
      .getMp3()

      .then(([buffer , blob])=>{
        const blobURL = URL.createObjectURL(blob);

        let dataArray = [];
        dataArray.push(blobURL);
        console.log(dataArray);

        this.setState({ blobURL, isRecording: false });
        this.setState({ isRecordingStp: true });
        }).catch((e) => console.log(e));

  };
  reset() {
      document.getElementsByTagName('audio')[0].src = '';
      this.setState({ isRecordingStp: false });
  };

  setDuration() {
      const rStart = document.getElementById('start-recording').value;
      console.log(rStart);
      this.setState({rStart : Number(rStart)});
  }


  render() {

    return(
      <>
       <form>

         <div>
            <h2>Enter Duration In Seconds</h2> <br />
            <InputGroup>
              <InputNumber id = "start-recording" min={0} max={60}  onChange={this.setDuration.handleChange} value={this.setDuration.duration} />
              <InputGroup.Addon>To</InputGroup.Addon>
              <InputNumber min={this.state.rStart} max={60} />
            </InputGroup>
        </div>
        <Button onClick = {this.setDuration}>Set Duration</Button>
        <br />
        <br />
        <Button id = "record" onClick={this.start} disabled={this.state.isRecording} type="button">
               Start Recording
        </Button>

        <br />
        
        <h3> {this.isRecording ? <span>🛑🎙️  Not Recording</span> : <span>🎙️ Click <b>Record</b> to Start Recording</span>} </h3> 
       </form>

        <audio src={this.state.blobURL} controls  type="audio" />
     </>
    );
  }
}