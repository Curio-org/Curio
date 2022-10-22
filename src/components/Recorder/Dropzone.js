import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import React, { useState } from 'react'

const DropUpload = (props) => {

  const [tub, setTub] = useState();
  const stub = () => {
    setTub(props.audio)
  }
  console.log(tub)
  const API_ENDPOINT = "https://chfxvqkfj7.execute-api.ap-south-1.amazonaws.com/default/"
  
  const handleSubmit = async (tub) => {
    // const f = files[0]
    // console.log(f["file"]);

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


  // const handleChangeStatus = (event) => {
  //   setTbu(event.target.value);
  //   // console.log(event.target.value);
  // }
  // console.log(tbu);

  // const handleChangeStatus = ({ meta, remove }, status) => {
  //   console.log(status , meta);
  // }

  return (
    <>
      {/* <div id="toast">Upload</div> */}
      {/* <input type='file' onChange={handleChangeStatus} />
      <button onClick={handleSubmit}>Upload</button> <br /> */}
      <button onClick={stub}>STUB</button>
      <button onClick={handleSubmit}>Upload</button>
      {/* <Dropzone
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
      /> */}
    </>
  )
}

  export default DropUpload;