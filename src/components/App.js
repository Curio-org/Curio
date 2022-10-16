import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import HeaderCurio from './Header';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import RecordView from './Recorder';
import Player from './Player';
import UploadAudio from './UploadAudio';
import '../style/styles.css';
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

            <Router>
                <Switch>

                    <Route path="/">
                        <div style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                            <VideoList setVidId={this.setVidId} setRecId={this.setRecId} videos={this.state.videos}/>
                        </div>
                    </Route>

                    <Route path="/play/:vidId">
                        <Player/>
                        <h2>Video Will Play here.</h2>
                    </Route>

                    <Route path="/record/:vidId">
                        <Player getAudio={this.getAudio} setAudio={this.setAudio}/>
                        <RecordView getAudio={this.getAudio} setAudio={this.setAudio}/>
                        <UploadAudio />
                    </Route>

                    
                </Switch>
            </Router>
            </>
        )
    }
}

export default App;