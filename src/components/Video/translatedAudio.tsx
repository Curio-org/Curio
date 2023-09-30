import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'rsuite';
import { useParams } from 'react-router-dom';

const TranslatedAudio = () => {
  const [audio, setAudio] = useState<string | undefined>(undefined); // Specify the type of audio state
  const { vidId } = useParams<{ vidId: string }>(); // Define the type for vidId

  const GETKEY = process.env.REACT_APP_DOWN;

  const gts = async () => {
    const API_ENDPOINT = `${GETKEY}/${vidId}`; // Correct the URL format
    try {
      const response = await axios.get(API_ENDPOINT, {
        responseType: 'blob',
      });
      console.log('Response: ', response);

      const blobUrl = URL.createObjectURL(response.data);

      setAudio(blobUrl);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <>
      <Button onClick={gts}>Get Translated Audio</Button>
      {audio && <audio id='translatedAudio' src={audio} controls />}
    </>
  );
};

export default TranslatedAudio;
