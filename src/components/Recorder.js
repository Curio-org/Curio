import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import { Button } from 'rsuite';

const RecordView = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

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
  console.log("deed", mediaBlobUrl);
  
  return (
    <div>
        <h4>
          {status}
        </h4>
 
        {" "}
        <audio src={mediaBlobUrl} controls loop />

      <div>
        <Button onClick={stopTimer}>
          Clear
        </Button>
        <div>
        <h3>
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </h3>
        </div>

        <div>
            <h3>
              Press the Start to record
            </h3>
            <br />

              <Button onClick={() => { if (!isActive) { startRecording(); } else { pauseRecording(); } setIsActive(!isActive); }} >
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button onClick={() => { pauseRecording(); stopRecording(); setIsActive(!isActive);}}>
                Stop
              </Button>

        </div>
        <b></b>
      </div>
    </div>
  );
};
export default RecordView;
