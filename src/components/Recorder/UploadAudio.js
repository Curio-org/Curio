import 'react-dropzone-uploader/dist/styles.css'
import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'rsuite'
import { useParams } from 'react-router-dom';
import './Recorder.css'

const UploadAudio = (props) => {
  const { vidId } = useParams();

  const [file, setFile] = useState();

  const sFile = () => {
    setFile(props.audio)
  }

  const UPKEY = process.env.REACT_APP_UP;

  console.log(file)
  const API_ENDPOINT = `${UPKEY}${vidId}`
  
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
      <span className='upload_button'><Button onClick={() => {sFile(); handleSubmit(file)}}>Upload Audio</Button></span>
    </>
  )
}

  export default UploadAudio;