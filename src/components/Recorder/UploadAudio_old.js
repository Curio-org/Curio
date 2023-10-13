import React, { useState } from "react";
import AWS from "aws-sdk";
import { Button } from "rsuite";

const S3_BUCKET = "be-bucket-public";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: "AKIA27OR2MLKGPC5F2GN",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadAudio = (props) => {
  let smth = props.audio.size.toString();
  console.log(smth);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = () => {
    setSelectedFile(props.audio);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: smth,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h2>Your Audio Upload Progress is {progress}%</h2>
      </div>
      {/* <input type="file" onChange={handleFileInput}/> */}
      <Button
        onClick={() => {
          uploadFile(selectedFile);
          handleFileInput();
        }}
      >
        Upload The Recorded Audio
      </Button>
    </div>
  );
};

export default UploadAudio;
