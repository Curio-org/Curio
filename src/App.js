import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import HeaderCurio from './components/Header/Header';
import SearchBar from './components/Header/Searchbar';
import youtube from './apis/youtube';
import VideoList from './components/Video/VideoList';
import RecordView from './components/Recorder/Recorder';
import Player from './components/Video/Player';
import './style/styles.css';
import './App.css'
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
            <div className='gradient__bg'>
            <HeaderCurio/>

            <Router>
                <Switch>


                    <Route path="/play/:vidId">
                        <Player/>
                        <h2>Video Will Play here.</h2>
                    </Route>

                    <Route path="/record/:vidId">
                        <Player getAudio={this.getAudio} setAudio={this.setAudio}/>
                        <RecordView getAudio={this.getAudio} setAudio={this.setAudio}/>
                    </Route>

                    <Route path="/">
                        <div style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                            <VideoList setVidId={this.setVidId} setRecId={this.setRecId} videos={this.state.videos}/>
                        </div>
                    </Route>
                    
                </Switch>
            </Router>
            </div>
            </>
        )
    }
}

export default App;