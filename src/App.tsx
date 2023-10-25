import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AxiosError } from "axios";
import HeaderCurio from "./components/Header/Header";
import SearchBar from "./components/UnderHeader/Searchbar";
import APIError from "./components/UnderHeader/APIError";
import youtube from "./apis/youtube";
import VideoList from "./components/Video/VideoList";
import RecordView from "./components/Recorder/Recorder";
import Player from "./components/Video/Player";
import Footer from "./components/Footer/Footer";
import "./style/styles.css";
import "./App.css";
import UnderHeader from "./components/UnderHeader/UnderHeader";

const App: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [vidId, setVidId] = useState<string>("");
  const [showUnderHeader, setShowUnderHeader] = useState<boolean>(true);
  const [apiResponse, setApiResponse] = useState<string>("");
  const [audioProps, setAudioProps] = useState<any>({
    playback: 1,
    playing: false,
    time: 0,
    maxTime: 0,
  });

  const getAudio = () => {
    return audioProps;
  };

  const setAudio = (prop: any) => {
    setAudioProps(prop);
  };

  const handleSubmit = async (termFromSearchBar: string) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: termFromSearchBar,
        },
      });

      if (response.data.items.length === 0) {
        setShowUnderHeader(true);
      } else {
        setShowUnderHeader(false);
      }

      setVideos(response.data.items);
      setApiResponse("");
    } catch (error: any) {
      if (error && error instanceof AxiosError) {
        setApiResponse(error?.response?.data.error.message);
        console.log(error?.response?.data.error.message);
      }
    }
  };

  const setRecId = (vidId: string) => {
    setVidId(vidId);
    window.location.href = `/record/${vidId}`;
  };

  const setPlayId = (vidId: string) => {
    setVidId(vidId);
    window.location.href = `/play/${vidId}`;
  };

  return (
    <div className="gradient__bg">
      <HeaderCurio />
      <Router>
        <Switch>
          <Route path="/play/:vidId">
            <Player getAudio={getAudio} setAudio={setAudio} />
          </Route>

          <Route path="/record/:vidId">
            <Player getAudio={getAudio} setAudio={setAudio} />
            <RecordView getAudio={getAudio} setAudio={setAudio} vidId={vidId} />
          </Route>

          <Route path="/">
            <div style={{ marginTop: "1em" }}>
              <SearchBar handleFormSubmit={handleSubmit} />
              {apiResponse !== "" ? (
                <APIError apiResponse={apiResponse} />
              ) : null}
              {showUnderHeader ? <UnderHeader /> : null}
              <VideoList
                setPlayId={setPlayId}
                setRecId={setRecId}
                videos={videos}
              />
            </div>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
