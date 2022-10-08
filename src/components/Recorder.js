import { ReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import { Button } from 'rsuite';

const RecordView = (props) => {
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    var [audios, setAudios] = useState([]);
    const [merged, setMerged] = useState()

    const AudioList = () => {
        return <div></div>
    }

    function stopTimer() {
    }

    const updateAudios = () => {
    }

    const merge = () => {
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
            console.log(blob)
        }
    }

    const startRec = () => {
        console.log('audio started')
    }

    const stopRec = (url, blob) => {
        console.log('audio stopped')
        setAudios([...audios, {
            src: url,
            blob,
        }])
    }

    return (
        <div>

            <ReactMediaRecorder
                audio
                askPermissionOnMount
                onStart={startRec}
                onStop={stopRec}
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                    </div>
                )}
            />
            <div>
                <h2>Recorded Audios</h2>
                {audios.map(audio => {
                    return (
                        <div>
                            <audio controls src={audio.src}></audio>
                        </div>
                    )
                })}
                <button type='button' onClick={merge}>Merge Audios</button>
                {merged && <audio src={URL.createObjectURL(merged)} controls></audio>}
            </div>
        </div>
    )
}

export default RecordView