import React, {useState} from 'react'
import axios from 'axios'
import { Button } from 'rsuite';
import { useParams } from 'react-router-dom';

const TranslatedAudio = () => {
    const [audio , setAudio] = useState();
    const { vidId } = useParams();

    // function convertURIToBinary(dataURI) {
    //   let BASE64_MARKER = ';base64,';
    //   let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    //   let base64 = dataURI.substring(base64Index);
    //   let raw = window.atob(base64);
    //   let rawLength = raw.length;
    //   let arr = new Uint8Array(new ArrayBuffer(rawLength));
    
    //   for (let i = 0; i < rawLength; i++) {
    //     arr[i] = raw.charCodeAt(i);
    //   }
    //   return arr;
    // }



    const gts = async () => {
        const API_ENDPOINT = `https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v1/be-curio?file=${vidId}`;
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT,
            responseType: 'blob'
        })
        console.log('Response: ', response)

        // const myAudio = dataURIToBlob(response.data);
        // var blobUrl = URL.createObjectURL(myAudio);

        // let binary = convertURIToBinary(response.data);
        // let blob = new Blob([binary], {
        //   type: 'audio/wav'
        // });
        // let blobUrl = URL.createObjectURL(blob);

        let blobUrl = URL.createObjectURL(response.data);

        setAudio(blobUrl);
        console.log(audio);
    }

  return (
    <>
      <Button onClick={gts}>Get Translated Audio</Button>
      <audio controls src={audio} />
    </>
  )
}

export default TranslatedAudio