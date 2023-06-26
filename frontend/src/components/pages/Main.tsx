import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import styles from '../../assets/styles/Main.module.css';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StreamerForm from 'components/form/StreamerForm';
import StreamerList from 'components/streamer/StreamerList';
import { getStreamers } from 'services/apiService';
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
      <Box className={styles.logo}>
        <WhatshotIcon sx={{ fontSize: '42px' }} color="secondary" />

        <Typography
          color="primary"
          fontSize={42}
          fontWeight={300}
          lineHeight={1}
          fontStyle="italic"
        >
          STREAMER
        </Typography>
        <Typography
          color="secondary"
          fontSize={30}
          fontStyle="italic"
          fontWeight={700}
          lineHeight={1}
        >
          APP
        </Typography>
      </Box>
      <StreamerForm fetchStreamers={fetchStreamers} />
      <StreamerList streamers={streamers} />
    </Box>
  );
};

export default Main;
