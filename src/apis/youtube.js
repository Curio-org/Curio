import axios from 'axios';
const KEY = 'AIzaSyCPWMPAp1bgYvBDzIqZCh5oCr5nldAP2sI'; // mention your youtube API key here

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})