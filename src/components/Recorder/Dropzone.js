import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import React from 'react'

const DropUpload = () => {

  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status , meta);
  }

  return (
    <>
      <div id="toast">Upload</div>
      <Dropzone
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