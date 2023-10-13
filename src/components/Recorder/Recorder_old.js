import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import { Button } from "rsuite";

const RecordView = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  var [audios, setAudios] = useState([]);

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
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });
  // console.log("Audio", mediaBlobUrl);

  const updateAudios = () => {
    if (mediaBlobUrl === undefined) return;

    setAudios((audios) => [...audios, mediaBlobUrl]);
    console.log(audios);
  };

  const AudioList = () => {
    const renderedAudios = audios.map((audio, index) => {
      return <audio src={audios[index]} controls></audio>;
    });
    return <div>{renderedAudios}</div>;
  };

  const merge = () => {
    ConcatenateBlobs(audios, "audio/wav", showonscreen());
  };

  function ConcatenateBlobs(blobs, type, callback) {
    var buffers = [];

    var index = 0;

    function readAsArrayBuffer() {
      if (!blobs[index]) {
        return concatenateBuffers();
      }
      var reader = new FileReader();
      reader.onload = function (event) {
        buffers.push(event.target.result);
        index++;
        readAsArrayBuffer();
      };
      reader.readAsArrayBuffer(blobs[index]);
    }

    readAsArrayBuffer();

    function concatenateBuffers() {
      var byteLength = 0;
      buffers.forEach(function (buffer) {
        byteLength += buffer.byteLength;
      });

      var tmp = new Uint16Array(byteLength);
      var lastOffset = 0;
      buffers.forEach(function (buffer) {
        // BYTES_PER_ELEMENT == 2 for Uint16Array
        var reusableByteLength = buffer.byteLength;
        if (reusableByteLength % 2 !== 0) {
          buffer = buffer.slice(0, reusableByteLength - 1);
        }
        tmp.set(new Uint16Array(buffer), lastOffset);
        lastOffset += reusableByteLength;
      });

      var blob = new Blob([tmp.buffer], {
        type: type,
      });

      callback(blob);
    }
  }

  if (typeof modules !== "undefined") {
    module.export = ConcatenateBlobs;
  }

  if (typeof window !== "undefined") {
    window.ConcatenateBlobs = ConcatenateBlobs;
  }

  function showonscreen(bb) {
    console.log(bb);
  }
  return (
    <div>
      <h4>{status}</h4>
      {/* <audio src={mediaBlobUrl} controls loop /> */}
      <AudioList />
      <div>
        <Button onClick={stopTimer}>Clear</Button>

        <h3>
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </h3>

        <div>
          <h3>Press the Start to record</h3>
          <br />

          <Button
            onClick={() => {
              if (!isActive) {
                startRecording();
              } else {
                pauseRecording();
              }
              setIsActive(!isActive);
            }}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={() => {
              pauseRecording();
              stopRecording();
              setIsActive(!isActive);
              updateAudios();
            }}
          >
            Stop
          </Button>
          <br />
          <Button
            onClick={() => {
              merge();
            }}
          >
            Merge
          </Button>
          {/* <Button onClick={() => {mergeAudio()}}>Merge</Button> */}
        </div>
        <b></b>
      </div>
    </div>
  );
};
export default RecordView;
