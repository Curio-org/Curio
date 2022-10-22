import 'react-dropzone-uploader/dist/styles.css'
import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'rsuite'

const UploadAudio = (props) => {

  const [tub, setTub] = useState();
  const stub = () => {
    setTub(props.audio)
  }
  console.log(tub)
  const API_ENDPOINT = "https://chfxvqkfj7.execute-api.ap-south-1.amazonaws.com/default/"
  
  const handleSubmit = async (tub) => {
    console.log(tub);

    // * GET request: presigned URL
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT
    })
    console.log('Response: ', response)

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body:tub
    })
    console.log('Result: ', result)

  }

  return (
    <>
      <Button onClick={() => {stub(); handleSubmit(tub) }}>STUB</Button>
    </>
  )
}

  export default UploadAudio;