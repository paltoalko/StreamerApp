import React from 'react';
import { Box, Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const Logo: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1em',
      }}
    >
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
  );
};

export default Logo;
