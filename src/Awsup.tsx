import React, { Component, ChangeEvent } from "react";
import axios from "axios";

class Awsup extends Component {
  state = {
    selectedFile: null as File | null,
    fileUploadedSuccessfully: false,
  };

  onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      this.setState({ selectedFile: file });
    }
  };

  onFileUpload = () => {
    const { selectedFile } = this.state;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("demo file", selectedFile, selectedFile.name);

      axios
        .post(
          "https://vcor7lap28.execute-api.ap-south-1.amazonaws.com/prod/audio-upload",
          formData,
        )
        .then(() => {
          this.setState({ selectedFile: null, fileUploadedSuccessfully: true });
        });
    }
  };

  fileData = () => {
    const { selectedFile, fileUploadedSuccessfully } = this.state;

    if (selectedFile) {
      return (
        <div>
          <h2>File Details</h2>
          <p>File Name : {selectedFile.name}</p>
          <p>File Type : {selectedFile.type}</p>
          <p>
            Last Modified :{" "}
            {selectedFile.lastModified
              ? new Date(selectedFile.lastModified).toDateString()
              : "N/A"}
          </p>
        </div>
      );
    } else if (fileUploadedSuccessfully) {
      return (
        <div>
          <h4>Your File Has Been Uploaded Successfully.</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose A File And Press Upload Button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <div>
          <h2>Audio Uploader</h2>
          <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload</button>
          </div>
          {this.fileData()}
        </div>
      </>
    );
  }
}

export default Awsup;
