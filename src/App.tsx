import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import HeaderCurio from './components/Header/Header';
import SearchBar from './components/UnderHeader/Searchbar';
import youtube from './apis/youtube';
import VideoList from './components/Video/VideoList';
import RecordView from './components/Recorder/Recorder';
import Player from './components/Video/Player';
import Footer from './components/Footer/Footer';
import './style/styles.css';
import './App.css'
import UnderHeader from './components/UnderHeader/UnderHeader';
// import Awsup from './Awsup'

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

    setAudio = (prop: any) => {
        this.setState(
            {
                audioProps: prop
            }
        )
    }

    handleSubmit = async (termFromSearchBar: string) => {
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
    setVidId = (vidId: string) => {
        this.setState({vidId : vidId})
        window.location.href = `/play/${vidId}`
    }
    setRecId = (vidId: string) => {
        this.setState({vidId : vidId})
        window.location.href = `/record/${vidId}`
    }


    render() {
        return (
            <>
            <div className='gradient__bg'>
            <HeaderCurio/>
            {/* <Awsup /> */}
            <Router>
                <Switch>


                    <Route path="/play/:vidId">
                        <Player/>
                    </Route>

                    <Route path="/record/:vidId">
                        <Player getAudio={this.getAudio} setAudio={this.setAudio}/>
                        <RecordView getAudio={this.getAudio} setAudio={this.setAudio} vidId={this.vidId}/>
                    </Route>

                    <Route path="/">
                        <div style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                            <UnderHeader />
                            <VideoList setVidId={this.setVidId} setRecId={this.setRecId} videos={this.state.videos}/>
                        </div>
                    </Route>
                    
                </Switch>
            </Router>
            <Footer />
            </div>
            </>
        )
    }
}

export default App;