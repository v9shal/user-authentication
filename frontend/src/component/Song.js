import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongPlayer = () => {
  const [songData, setSongData] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const fetchSongData = async () => {
      const songId = 12345; // Replace with the actual Deezer song ID
      try {
        const response = await axios.get(`https://api.deezer.com/track/${songId}`);
        setSongData(response.data);
        setAudioUrl(response.data.preview); // Assuming the 'preview' URL is available in the API response
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    };

    fetchSongData();
  }, []);

  return (
    <div>
      {songData && (
        <div>
          <h2>{songData.title}</h2>
          <p>Artist: {songData.artist.name}</p>
          <p>Album: {songData.album.title}</p>
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default SongPlayer;
