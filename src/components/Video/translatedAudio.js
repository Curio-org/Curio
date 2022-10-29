import React, {useState} from 'react'
import axios from 'axios'
import { Button } from 'rsuite';
// import { useParams } from 'react-router-dom';

const TranslatedAudio = () => {
    const [audio , setAudio] = useState();

    function dataURIToBlob(dataURI) {
        dataURI = dataURI.replace(/^data:/, '');
    
        // const type = dataURI.match(/audio\/[^;]+/);
        const type = "audio/wav";
        const base64 = dataURI.replace(/^[^,]+,/, '');
        const arrayBuffer = new ArrayBuffer(base64.length);
        const typedArray = new Uint8Array(arrayBuffer);
    
        for (let i = 0; i < base64.length; i++) {
            typedArray[i] = base64.charCodeAt(i);
        }
    
        return new Blob([arrayBuffer], {type});
    }


    const gts = async () => {
        const API_ENDPOINT = `https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v1/be-curio?file=avc`;
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT,
        })
        console.log('Response: ', response)
        const myAudio = dataURIToBlob(response.data);
        setAudio(myAudio);
        console.log(audio);
    }


    // function sA () {
    //     console.log();
    // }



    // let response = axios.get(`https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v2/be-curio?file=avc`)

  return (
    <>
      <Button onClick={gts}>Set Audio</Button>
      <audio src={audio} controls></audio>
    </>
  )
}

export default TranslatedAudio