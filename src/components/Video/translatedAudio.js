import React, {useState} from 'react'
import axios from 'axios'
import { Button } from 'rsuite';
// import { useParams } from 'react-router-dom';

const TranslatedAudio = () => {
    const [audio , setAudio] = useState();


    const gts = async () => {
        const API_ENDPOINT = `https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v1/be-curio?file=avc`;
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT,
        })
        console.log('Response: ', response)
        setAudio(response.data)
        console.log(audio);
        return response
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