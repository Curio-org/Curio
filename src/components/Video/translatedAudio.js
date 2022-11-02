import React, {useState} from 'react'
import axios from 'axios'
import { Button } from 'rsuite';
import { useParams } from 'react-router-dom';

const TranslatedAudio = () => {
    const [audio , setAudio] = useState();
    const { vidId } = useParams();

    const gts = async () => {
        const API_ENDPOINT = `https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v1/be-curio?file=${vidId}`;
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT,
            responseType: 'blob'
        })
        console.log('Response: ', response)

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