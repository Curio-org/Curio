import React, {Component} from 'react';
import axios from 'axios';

class Awsup extends Component {
    state = {
        selectedFile : null,
        fileUploadedSuccessfully: false
    }

    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]})
    }

    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "demo file",
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        // will have to call API here
        axios.post("https://vcor7lap28.execute-api.ap-south-1.amazonaws.com/prod/audio-upload", formData).then(()=>{
            this.setState({selectedFile : null})
            this.setState({fileUploadedSuccessfully: true})
        })

    }

    fileData = () => {
        if(this.state.selectedFile){
            return(
            <div>
                <h2>File Details</h2>
                <p>File Name : {this.state.selectedFile.name}</p>
                <p>File Type : {this.state.selectedFile.type}</p>
                <p>Last Modified : {" "}
                    {this.state.selectedFile.lastModifiedDate.toDateString()}
                </p>
            </div>
            );
        } else if (this.state.fileUploadedSuccessfully){
            return(
                <div>
                    <h4>Your File Has Been Uploaded Successfully.</h4>
                </div>
            );
        } else {
            return(
                <div>
                <br />
                    <h4>Choose A File And Press Upload Button</h4>
                </div>
            );
        }
    }

    render(){
        return(
        <>
            <div>
                <h2>Audio Uploader</h2>
                <div>
                    <input type='file' onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>Upload</button>
                </div>
                {this.fileData()}
            </div>
        </>
        )
    }

}

export default Awsup;