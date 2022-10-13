import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import HeaderCurio from './Header';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import RecordView from './Recorder';
import Player from './Player';
import UploadImageToS3WithNativeSdk from './S3';
// import Mynavbar from './Navbar';
import '../style/styles.css';
// import YouTube from 'react-youtube';
class App extends React.Component {
    state = {
        videos: [],
        vidId : "",
        audioProps: {
            playback: 1,
            playing: false,
            time: 0,
            maxTime: 0,
        }
        // selectedVideo: null
    }

    getAudio = () => {
        return this.state.audioProps
    }

    setAudio = (prop) => {
        this.setState(
            {
                audioProps: prop
            }
        )
    }

    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
        })
        console.log("this is resp",response);
    };
    setVidId = (vidId) => {
        // this.setState({selectedVideo: vidId})
        this.setState({vidId : vidId})
        window.location.href = `/play/${vidId}`
    }
    setRecId = (vidId) => {
        this.setState({vidId : vidId})
        window.location.href = `/record/${vidId}`
    }


    render() {
        return (
            <>
            <HeaderCurio/>
            {/* <Mynavbar /> */}
            <Router>
                <Switch>

                    <Route path="/play/:vidId">
                        <Player/>
                        <h2>Video Will Play here.</h2>
                    </Route>

                    <Route path="/record/:vidId">
                        <Player getAudio={this.getAudio} setAudio={this.setAudio}/>
                        <RecordView getAudio={this.getAudio} setAudio={this.setAudio}/>
                        <h2>This is the Recorder Page</h2>
                        <UploadImageToS3WithNativeSdk />
                    </Route>

                    <Route path="/">
                        <div style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                                    {/* <Player video={this.state.selectedVideo}/> */}
                                    
                                    {/* {console.log(this.state.vidId)} */}
                                    {/* <YouTube videoId={this.state.selectedVideo} /> */}
                                    <VideoList setVidId={this.setVidId} setRecId={this.setRecId} videos={this.state.videos}/>
                        </div>
                    </Route>
                    
                </Switch>
            </Router>
            </>
        )
    }
}

export default App;