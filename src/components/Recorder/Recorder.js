import { ReactMediaRecorder } from "react-media-recorder";
import React, { useState } from "react";
import { Button } from 'rsuite';
import { Input} from 'rsuite';
import './Recorder.css'
import UploadAudio from './UploadAudio';

const RecordView = (props) => {

    const [audios, setAudios] = useState([]);
    const [merged, setMerged] = useState()
    const [duration, setDuration] = useState(0);
    const [recFrom, setFrom] = useState(0);
    const merge = (audios) => {
        var buffers = [];

        var index = 0;

        function readAsArrayBuffer() {
            if (!audios[index]) {
                return concatenateBuffers();
            }
            var reader = new FileReader();
            reader.onload = function (event) {
                buffers.push(event.target.result);
                index++;
                readAsArrayBuffer();
            };
            // console.log(audios);
            reader.readAsArrayBuffer(audios[index].blob);
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
                    buffer = buffer.slice(0, reusableByteLength - 1)
                }
                tmp.set(new Uint16Array(buffer), lastOffset);
                lastOffset += reusableByteLength;
            });

            var blob = new Blob([tmp.buffer], {
                type: 'audio/wav'
            });

            setMerged(blob);
            console.log(blob);
        }
    }

    const startRec = () => {
        console.log('audio started')
    }
    
    const stopRec = (url, blob) => {
        console.log('audio stopped')
        let audios1 = audios
        audios1.push({
            src: url,
            blob,
        })
        console.log(audios1);
        setAudios(audios1)
        merge(audios1)
    }

    return (
    <>
        <div>
            {merged && audios.length > 1 && <span className="merged"><h2 className='gradient__text'>Merged Audio</h2></span>}
            {merged && audios.length > 1 && <span className="merged_audio"><audio id='mergedAudio' src={URL.createObjectURL(merged)} controls></audio></span>}<br/>
            {merged && audios.length > 1 && <UploadAudio audio={merged} vidId={props.vidId}/>}<br />
        </div>

        <div className='record_grad'>
            <ReactMediaRecorder
                audio
                askPermissionOnMount
                onStart={startRec}
                onStop={stopRec}
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p className='recorder_status' ><h1 className="gradient__text">The recorder is Currently {status}</h1></p>
                        
                        <div className="duration">
                            <div className='duration_input'>
                                <button style={{backgroundColor:'#31b425', border:'none'}}>
                                    From
                                </button>
                                <Input type='number' id="duration_from" style={{borderRadius:0}} min={recFrom} max={recFrom} />
                                <button>
                                    To
                                </button>
                                <Input type='number' id="duration_to" style={{borderRadius:0}} min={recFrom}  onChange={()=>{setDuration(document.getElementById('duration_to').value - document.getElementById('duration_from').value);
                                                                                                                            setFrom(document.getElementById('duration_to').value);}}/>
                            </div>
                        </div>

                        <div>
                            <span className="record_start"><Button  onClick={()=>{  startRecording();
                                                                                    if(duration !== 0){
                                                                                        
                                                                                        console.log(duration);
                                                                                        setTimeout(stopRecording, duration * 1000)
                                                                                    }
                                                                                }}>
                            Start Recording
                            </Button></span>
                            <span className="record_stop"><Button  onClick={stopRecording}>Stop Recording</Button></span>
                        </div>
                    
                    </div>
                )}
            />
            <p className='recorder_status' style={{padding:20}}><h2 className="recorded_audios">Recorded Audios</h2></p>
            <div className='recordedAudios'>
                {audios.map(audio => {
                    return (
                        <div>
                            <audio className='aa' controls src={audio.src}></audio>
                        </div>
                    )
                })}
            </div>
        </div>
    </>
    )
}

export default RecordView;