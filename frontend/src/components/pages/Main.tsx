import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../../assets/styles/Main.module.css';
import StreamerForm from 'components/form/StreamerForm';
import StreamerList from 'components/streamer/StreamerList';
import { getStreamers } from 'services/apiService';
import Logo from 'utils/Logo';
import { Streamer } from 'utils/types';

const Main: React.FC<object> = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [fetchError, setFetchError] = useState(false);

  const fetchStreamers = async () => {
    setFetchError(false);
    try {
      const res = await getStreamers();
      setStreamers(res.data);
      setFetchError(false);
    } catch (error) {
      console.error('Error fetching streamers:', error);
      setFetchError(true);
    }
  };

  useEffect(() => {
    fetchStreamers();
  }, []);

  return (
    <Box className={styles.main}>
      <Logo />
      <StreamerForm fetchStreamers={fetchStreamers} />
      {fetchError ? (
        <Box sx={{ m: 5 }}>
          <Typography fontWeight={300} textAlign="center">
            Error fetching streamers. Please check your connection to the
            database.
          </Typography>
        </Box>
      ) : (
        <StreamerList streamers={streamers} fetchStreamers={fetchStreamers} />
      )}
    </Box>
  );
};

export default Main;
