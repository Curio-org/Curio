import React from 'react'
import axios from 'axios'
// import { useParams } from 'react-router-dom';

const TranslatedAudio = () => {

    const API_ENDPOINT = `https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v2/be-curio?file=avc`;
    const response = axios({
        method: 'GET',
        url: API_ENDPOINT,
      })
    // let response = axios.get(`https://mn80j9wred.execute-api.ap-south-1.amazonaws.com/v2/be-curio?file=avc`)
    console.log('Response: ', response)

  return (
    <div>
        <audio src={response} controls></audio>
    </div>
  )
}

export default TranslatedAudio