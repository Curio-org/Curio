import React from 'react';
import { Button } from 'rsuite';
import { saveAs } from 'file-saver';


var audioBufferUtils = require("audio-buffer-utils")
var encodeWAV = require('audiobuffer-to-wav')

// let audio = new Audio();
var context = new AudioContext()
var audioBuffer = []
const Recorder = () => {

  var status  = true

  function listen() {
    initDevice()
  }

  function pauseRecording(){
    if (status){
      context.suspend()
      status = false
    }
    else{
      context.resume()
      status = true
    }
    
  }

  function initDevice(){
  const handleSuccess = function(stream) {
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    
    source.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = function(e) {
      audioBuffer =  audioBufferUtils.concat(audioBuffer,e.inputBuffer)
    };
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  };
  function saveAudio(){
    context.suspend()
    var wav = encodeWAV(audioBuffer)
    var blob = new Blob([ new DataView(wav) ], {
      type: 'audio/wav'
    })

    let finalAudio = new Audio()
    var url = window.URL.createObjectURL(blob)        
    finalAudio.src = url
    finalAudio.play()
    saveAs(blob,"test.wav")

  }

  return (
        <div >
        <br />
        <br />
        <br />
          <Button id="listen" onClick={listen}>Listen</Button><br /><br />
          <Button id="stop" onClick={pauseRecording}>play/pause</Button><br /><br />
          <Button id="stop" onClick={saveAudio}>Save</Button><br /><br />
        </div>
  );
}

export default Recorder;