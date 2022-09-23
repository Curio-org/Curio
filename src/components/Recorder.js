import React from 'react';
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
      }

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
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

  getDuration () {
    let duration = document.querySelector('input').value;
    console.log(duration);
  }
  reset() {
      document.getElementsByTagName('audio')[0].src = '';
      this.setState({ isRecordingStp: false });
  };



  render() {

    return(
      <>
       <form>

         <div>
            <h2>Enter Duration In Seconds</h2> <br />
            <InputGroup>
              <InputNumber min={0} max={60} />
              <InputGroup.Addon>To</InputGroup.Addon>
              <InputNumber min={0} max={60} />
            </InputGroup>
            {/* <input id="duration" type="number" min={0} max={60} placeholder='1-60'/> */}
            {/* <Button id = "record" onClick={this.getDuration}  type="button">
              Set Timer
            </Button> */}
        </div>

        <Button id = "record" onClick={this.start} disabled={this.state.isRecording} type="button">
               Record
        </Button>

        <br />
        
        <h3> {this.isRecording ? <span>🛑🎙️  Not Recording</span> : <span>🎙️ Click <b>Record</b> to Start Recording</span>} </h3> 
       </form>

        <audio src={this.state.blobURL} controls  type="audio" />
     </>
    );
  }
}