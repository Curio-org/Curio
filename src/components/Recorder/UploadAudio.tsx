import "react-dropzone-uploader/dist/styles.css";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "rsuite";
import { useParams } from "react-router-dom";
import "./Recorder.css";

interface UploadAudioProps {
  audio: Blob;
}

const UploadAudio: React.FC<UploadAudioProps> = ({ audio }) => {
  const { vidId } = useParams<{ vidId: string }>();

  const [file, setFile] = useState<Blob | null>(null);

  const sFile = () => {
    setFile(audio);
  };

  const UPKEY = process.env.REACT_APP_UP;

  console.log(file);
  const API_ENDPOINT = `${UPKEY}${vidId}`;

  const handleSubmit = async () => {
    console.log(file);

    // * GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT,
    });
    console.log("Response: ", response);

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: file,
    });
    console.log("Result: ", result);
  };

  return (
    <>
      <span className="upload_button">
        <Button
          onClick={() => {
            sFile();
            handleSubmit();
          }}
        >
          Upload Audio
        </Button>
      </span>
    </>
  );
};

export default UploadAudio;
