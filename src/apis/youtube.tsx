import axios from "axios";
const KEY = process.env.REACT_APP_YT; // mention your youtube API key here

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 50,
    key: KEY,
  },
});
