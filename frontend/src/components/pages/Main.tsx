import React from 'react';
// import { v4 as uuid } from 'uuid';
import { Typography, Box } from '@mui/material';
import styles from '../../assets/styles/Main.module.css';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StreamerForm from 'components/form/StreamerForm';
const Main: React.FC<object> = () => {
  return (
    <Box>
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
      <StreamerForm />
    </Box>
  );
};

export default Main;
