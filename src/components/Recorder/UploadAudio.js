import 'react-dropzone-uploader/dist/styles.css'
import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'rsuite'
import { useParams } from 'react-router-dom';

const UploadAudio = (props) => {
  const { vidId } = useParams();

  const [file, setFile] = useState();

  const sFile = () => {
    setFile(props.audio)
  }
  console.log(file)
  const API_ENDPOINT = `https://chfxvqkfj7.execute-api.ap-south-1.amazonaws.com/translated?vidId=${vidId}`
  
  const handleSubmit = async (file) => {
    console.log(file);

    // * GET request: presigned URL
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT,
    })
    console.log('Response: ', response)

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body:file
    })
    console.log('Result: ', result)

  }

  return (
    <>
      <Button onClick={() => {sFile(); handleSubmit(file)}}>Upload Audio</Button>
    </>
  )
}

  export default UploadAudio;