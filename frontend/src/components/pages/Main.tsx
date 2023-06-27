import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import styles from '../../assets/styles/Main.module.css';
import StreamerForm from 'components/form/StreamerForm';
import StreamerList from 'components/streamer/StreamerList';
import { getStreamers } from 'services/apiService';
import Logo from 'utils/Logo';
const Main: React.FC<object> = () => {
  const [streamers, setStreamers] = useState([]);

  const fetchStreamers = async () => {
    try {
      const res = await getStreamers();
      setStreamers(res.data);
    } catch (error) {
      console.error('Error fetching streamers:', error);
    }
  };

  useEffect(() => {
    fetchStreamers();
  }, []);
  return (
    <Box className={styles.main}>
      <Logo />
      <StreamerForm fetchStreamers={fetchStreamers} />
      <StreamerList streamers={streamers} fetchStreamers={fetchStreamers} />
    </Box>
  );
};

export default Main;
