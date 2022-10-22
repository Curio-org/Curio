import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import React from 'react'

const DropUpload = () => {

  const API_ENDPOINT = "https://chfxvqkfj7.execute-api.ap-south-1.amazonaws.com/default/"
  const handleSubmit =async (files) => {
    const f = files[0]
    console.log(f["file"]);
    // * GET request: presigned URL
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT
    })
    console.log('Response: ', response)
    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body:f["file"]
    })
    console.log('Result: ', result)

  }

  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status , meta);
  }

  return (
    <>
      <div id="toast">Upload</div>
      <Dropzone
        onSubmit={handleSubmit}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    </>
  )
}

  export default DropUpload;