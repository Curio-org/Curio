import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import { Button } from 'rsuite';


const RecordView = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  var [audios , setAudios] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 650);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setAudios([]);
  }

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true
  });
  // console.log("Audio", mediaBlobUrl);

  const updateAudios = () => {
    if(mediaBlobUrl === undefined) return

    setAudios(audios => [...audios , mediaBlobUrl]);
    console.log(audios);
  }


  const AudioList = () => {
    const renderedAudios = audios.map((audio , index)=> {
      return <audio src= {audios[index]} controls></audio>
    });
    return <div>{renderedAudios}</div>
  }

  const merge = () => {
    ConcatenateBlobs(audios,'audio/wav',showonscreen())
  }


  function ConcatenateBlobs (blobs, type, callback) {
    var buffers = [];

    var index = 0;

    function readAsArrayBuffer() {
        if (!blobs[index]) {
            return concatenateBuffers();
        }
        var reader = new FileReader();
        reader.onload = function(event) {
            buffers.push(event.target.result);
            index++;
            readAsArrayBuffer();
        };
        reader.readAsArrayBuffer(blobs[index]);
    }

    readAsArrayBuffer();

    function concatenateBuffers() {
        var byteLength = 0;
        buffers.forEach(function(buffer) {
            byteLength += buffer.byteLength;
        });
        
        var tmp = new Uint16Array(byteLength);
        var lastOffset = 0;
        buffers.forEach(function(buffer) {
            // BYTES_PER_ELEMENT == 2 for Uint16Array
            var reusableByteLength = buffer.byteLength;
            if (reusableByteLength % 2 !== 0) {
                buffer = buffer.slice(0, reusableByteLength - 1)
            }
            tmp.set(new Uint16Array(buffer), lastOffset);
            lastOffset += reusableByteLength;
        });

        var blob = new Blob([tmp.buffer], {
            type: type
        });

        callback(blob);
    }
}

if(typeof modules !== 'undefined') {
    module.export = ConcatenateBlobs;
}

if(typeof window !== 'undefined') {
    window.ConcatenateBlobs = ConcatenateBlobs;
}

  ///////////////////////////////////////////////////////////////
  // var ConcatenateBlobs = require('concatenateblobs');

  // ConcatenateBlobs = (audios , 'audio/wav' , showonscreen(result)) => {

  // }

  // const mergeAudio = () => {
  //   ConcatenateBlobs(audios, "audio/wav", showonscreen);
  // }


  function showonscreen(bb) {
    console.log(bb);
    // var myurl = URL.createObjectURL(bb);
    // var par = document.querySelector('.paragraph');
    // par.src = myurl;
  }

  // function ConcatenateBlobs(blobs, type, callback) {
  //   var buffers = [];
  
  //   var index = 2;
  
  //   function readAsArrayBuffer() {
  //     if (!blobs[index]) {
  //       return concatenateBuffers();
  //     }
  //     var reader = new FileReader();
  //     reader.onload = function(event) {
  //       buffers.push(event.target.result);
  //       index++;
  //       readAsArrayBuffer();
  //     };
  //     reader.readAsArrayBuffer(blobs[index]);
  //   }
  
  //   readAsArrayBuffer();
  
  
  //   function audioLengthTo32Bit(n) {
  //     n = Math.floor(n);
  //     var b1 = n & 255;
  //     var b2 = (n >> 8) & 255;
  //     var b3 = (n >> 16) & 255;
  //     var b4 = (n >> 24) & 255;
     
  //     return [b1, b2, b3, b4];
  //   }
  //   function concatenateBuffers() {
  //     var byteLength = 0;
  //     buffers.forEach(function(buffer) {
  //       byteLength += buffer.byteLength;
  //     });
  
  //     var tmp = new Uint8Array(byteLength);
  //     var lastOffset = 0;
  //     var newData;
  //     buffers.forEach(function(buffer) {
  //       if (type==='audio/wav' && lastOffset >  0) newData = new Uint8Array(buffer, 44);
  //       else newData = new Uint8Array(buffer);
  //       tmp.set(newData, lastOffset);
  //       lastOffset += newData.length;
  //     });
  //     if (type==='audio/wav') {
  //       tmp.set(audioLengthTo32Bit(lastOffset - 8), 4);
  //       tmp.set(audioLengthTo32Bit(lastOffset - 44), 40); // update audio length in the header
  //     }
  //     var blob = new Blob([tmp.buffer], {
  //       type: type
  //     });
  //     callback(blob);        
      
  //   }
  // }

  return (
    <div>
        <h4>
          {status}
        </h4>
        {/* <audio src={mediaBlobUrl} controls loop /> */}
        <AudioList />
      <div>
        <Button onClick={stopTimer}>
          Clear
        </Button>

        <h3>
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </h3>


        <div>
            <h3>
              Press the Start to record
            </h3>
            <br />

              <Button onClick={() => { if (!isActive) { startRecording(); } else { pauseRecording(); } setIsActive(!isActive); }} >
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button onClick={() => { pauseRecording(); stopRecording(); setIsActive(!isActive); updateAudios();}}>
                Stop
              </Button>
              <br />
              <Button onClick={() => {merge()}}>Merge</Button>
              {/* <Button onClick={() => {mergeAudio()}}>Merge</Button> */}
        </div>
        <b></b>
      </div>
    </div>
  );
};
export default RecordView;
