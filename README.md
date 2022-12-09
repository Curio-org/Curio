# Team Name Curio
## Working on theme : Audio Dubbing for youtube Videos

## Team Members

- Abhishek Bhardwaj
- Arjun Verma
- Deepanshu Mishra


## How will we solve the problem?
We aim to build a website which will serve as an open platform where people can come and translate their favourite YouTube videos in their respective languages to help bridge the gap of language and communication between learners.


## What will be our final demo?
Our final demo will be a live/recorded demonstration of our website where we will record the translation of a video upload it on a global server and then play it in sync with the desired YouTube video.

## Tech stack we are using
- Frontend
For the Frontend we are using ReactJs & NodeJs in order to bring functionality to it  and for styling purposes we have used CSS3 along with some SASS. We are also making use of a number of react compatible modules to optimise things i.e. React Router DOM, RSuite, Semantic UI React etc.

- API
We are taking use of Youtube V3 api to get the video data & search results based on the query & along with that we have also made a couple of APIs in order to connect the frontend to the backend usin AXIOS.

- Backend
We have powered our backend with AWS thus we are using Amazon S3 buckets to store the recorded audios and to further retrieve them according to the respective video.

## Innovation & one prespective to use it
The idea is to link the students who are studying different languages to provide a platform where they can come and test their language skills by audio dubbing videos in the languages they are learning. The dub made by them will have to pass through a VALIDATION where they will get a review of their dub and can access their skills by the same.

## How will we validate things?
We will compare the transcript of the dubbed audio and the converted transcript of the original audio in the dubbed language using google translator. If the matching percentage of the dub satisfies the minimum percentage criteria (we will decide the criteria using some algorithm) then we will accept it, otherwise the dubbing will be rejected.


# Getting Started with Curio

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### See Live Demo Here

See the website [Curio](https://curiocic.netlify.app/) 

### See Video Demo Here
See the [Video Demo](https://youtu.be/7BrTDM-Y_oU)

### See a Sample Translated Video Here 
Watch [Translated Video](https://curiocic.netlify.app/play/r0G86-0-4O4)

`Steps to play translated Video:`

- `Go on our watch page and click on the 'Get Translated Audio' button.` 
- `Then play the youtube video with the translated audio.`




# Answers for MVP & Mid Stage remarks

- Yes multiple people can translate, we will further take language name as user input to differentiate between those translated audios.
- We were working on that button at the time of mid MVP submission. Now all the buttons are working and explained in the demo.
- We are not checking at the time of recording that whether the video was previously recorded or not. We will be manually selecting the audio to save with the video.

# Future work after the hackathon

- We will save multiple audios for a single video and give option to the user to decide which audio he/she wants to play.
- For re recording we will generate a mail using `Twilio API` which will be directed towards us. Then we will decide maually whether to re-record that audio or not.



