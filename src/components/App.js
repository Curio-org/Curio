import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Recorder from './Recorder';
import Player from './Player';
import Mynavbar from './Navbar';
import '../style/styles.css';
class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
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
    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    render() {
        return (
            <>
            <Mynavbar />
            <Router>
                <Switch>
                    <Route path="/play">
                        <Player />
                        <h2>Video Will Play here.</h2>
                    </Route>
                    <Route path="/record">
                        <Recorder />
                        <h2>This is the Recorder Page</h2>
                    </Route>
                    <Route path="/">
                        <div className='ui container' style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                            <div className='ui grid'>
                                <div className="ui row">
                                    <div className="eleven wide column">
                                        <VideoDetail video={this.state.selectedVideo}/>
                                    </div>
                                    <div className="five wide column">
                                        <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>
            </>
        )
    }
}

export default App;