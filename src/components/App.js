import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import Recorder from './Recorder';
import Player from './Player';
import Mynavbar from './Navbar';
import '../style/styles.css';
// import YouTube from 'react-youtube';
class App extends React.Component {
    state = {
        videos: [],
        vidId : "",
        // selectedVideo: null
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
    render() {
        return (
            <>
            <Mynavbar />
            <Router>
                <Switch>

                    <Route path="/play/:vidId">
                        <Player/>
                        <h2>Video Will Play here.</h2>
                    </Route>

                    <Route path="/record">
                        <Recorder />
                        <h2>This is the Recorder Page</h2>
                    </Route>

                    <Route path="/">
                        <div style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                                    {/* <Player video={this.state.selectedVideo}/> */}
                                    
                                    {/* {console.log(this.state.vidId)} */}
                                    {/* <YouTube videoId={this.state.selectedVideo} /> */}
                                    <VideoList setVidId={this.setVidId} videos={this.state.videos}/>
                        </div>
                    </Route>
                    
                </Switch>
            </Router>
            </>
        )
    }
}

export default App;