import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import { AxiosError } from 'axios';
import HeaderCurio from './components/Header/Header';
import SearchBar from './components/UnderHeader/Searchbar';
import APIError from './components/UnderHeader/APIError';
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
        },
        showUnderHeader: true,
        apiResponse: ''
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
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: termFromSearchBar
                }
            })

            this.setState({
              videos: response.data.items,
              apiResponse: ''
            });
            console.log("this is resp",response);
        } catch (error) {
            if (error && error instanceof AxiosError) {
                this.setState({
                    apiResponse: error?.response?.data.error.message
                })
                console.log(error?.response?.data.error.message);
            }
        }
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
                        <RecordView getAudio={this.getAudio} setAudio={this.setAudio} vidId={this.state.vidId}/>
                    </Route>

                    <Route path="/">
                        <div style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                            {this.state.apiResponse !== '' ? (
                            <APIError apiResponse={this.state.apiResponse} />) : null}
                            {this.state.showUnderHeader ? <UnderHeader /> : null}
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