import React from 'react'
import axios from 'axios'
// import { useParams } from 'react-router-dom';

const TranslatedAudio = async () => {

    const API_ENDPOINT = `https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v1/be-curio?file=avc`;
    const response = await axios({
        method: 'GET',
        url: API_ENDPOINT,
    })
    console.log('Response: ', response)



    // let response = axios.get(`https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v2/be-curio?file=avc`)

  return (
    <audio src={response.data} controls></audio>
  )
}

export default TranslatedAudio