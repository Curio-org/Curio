![image](src/components/assets/images/Curiologo.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ae6ec098-3afe-409d-8301-60dacd6a9dc6/deploy-status)](https://curiocic.netlify.app/)

## How Curio solves the problem?

Curio, a web application which is serving as an open platform where anyone can come and translate their favourite YouTube videos in their desired languages to help bridge the gap of language and communication between mentors & learners. The web application in its initial stage of development contains the function of translation and view which will further be extended to machine dub as a future development.

## Tech stack Curio is using

- Frontend
  For the Frontend we are using ReactJs & NodeJs in order to bring functionality to it and for styling purposes we have used CSS3 along with some SASS. We are also making use of a number of react compatible modules to optimise things i.e. React Router DOM, RSuite, Semantic UI React etc.
- API
  We are taking use of Youtube V3 api to get the video data & search results based on the query & along with that we have also made a couple of APIs in order to connect the frontend to the backend usin AXIOS.
- Backend
  We have powered our backend with AWS thus we are using Amazon S3 buckets to store the recorded audios and to further retrieve them according to the respective video.

## Innovation & one perspective to use it

The idea is to link the students who are studying different languages to provide a platform where they can come and test their language skills by audio dubbing videos in the languages they are learning. The dub made by them will have to pass through a VALIDATION where they will get a review of their dub and can access their skills by the same.

## How will Curio validate things?

We will compare the transcript of the dubbed audio and the converted transcript of the original audio in the dubbed language using google translator. If the matching percentage of the dub satisfies the minimum percentage criteria (we will decide the criteria using some algorithm) then we will accept it, otherwise the dubbing will be rejected.

# Getting Started with Curio

## Pre-Requisites

- Make Sure You have `nodeJs` installed on your system & if not install it from [here](https://nodejs.org/en/download)
- Check the version of `node` on your system by running :

```bash
node --version
```

- Check the version of `npm` on your system by running :

```bash
npm --version
```

It should log the version of npm installed on your machine which means you're good to go.

## Set up Locally

- Clone the repository locally using:

```bash
  git clone https://github.com/arjxn-py/Curio.git
```

- Now Go to the project directory & run:

```bash
  npm i --legacy-peer-deps
```

- One installation command runs successfully, run:

```bash
  npm start
```

It will automatically open up the application in the browser locally at [http://localhost:3000](http://localhost:3000)

Congratulations, you've now successfully installed **Curio** locally.

**Note:** Replace your Youtube V3 API Key with `process.env.REACT_APP_YT;` [here](https://github.com/arjxn-py/Curio/blob/84743a39d782d09414932e15a76d8c81646a9101/src/apis/youtube.js#L2)

[How to generate a Youtube API Key?](https://medium.com/swlh/how-to-get-youtubes-api-key-7c28b59b1154)

<table ><tbody ><tr></tr><tr><td><details ><summary><sub><b>Component tree for contributors:</b></sub>

```node
.
├── App
└── components/
```
</summary>

```node
    └── comments/
        ├── AddComment
        ├── Comment
        ├── Comments
        └── CommentsHeader
```

```node
    └── Footer/
        ├── Footer
        └── Twilio
```

```node
    └── Header/
        └── Header
```

```node
    └── Recorder/
        ├── Recorder
        └── UploadAudio
```

```node
    └── UnderHeader/
        ├── APIError
        ├── Feature
        ├── SearchBar
        └── UnderHeader
```

```node
    └── Video/
        ├── Player
        ├── VideoItem
        ├── VideoList
        └── translatedAudio
```

</details></td></tr></tbody>
</table>

### See Live Demo Here

See the website [Curio](https://curiocic.netlify.app/)

### See a Sample Translated Video Here

Watch [Translated Video](https://curiocic.netlify.app/play/r0G86-0-4O4)

`Steps to play translated Video:`

- `Go on our watch page and click on the 'Get Translated Audio' button.`
- `Then play the youtube video with the translated audio.`
