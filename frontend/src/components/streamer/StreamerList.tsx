import React from 'react';
import { Typography, Box, Paper, IconButton, Button } from '@mui/material';
import styles from '../../assets/styles/StreamerList.module.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

interface Streamer {
  _id: string;
  fullname: string;
  upvotes: number;
  downvotes: number;
}

interface StreamerListProps {
  streamers: Streamer[];
}

const ListItem: React.FC<{ streamer: Streamer }> = ({ streamer }) => {
  const handleClick = () => console.log('click');
  return (
    <Paper
      className={styles.listItemPaper}
      elevation={5}
      sx={{ p: 1.5, m: 1, width: '100%' }}
    >
      <Box className={styles.listItemBox}>
        <Typography fontWeight={400}>{streamer.fullname}</Typography>
        <Box className={styles.button}>
          <Box className={styles.button}>
            <IconButton>
              <ThumbUpIcon color="success" />
            </IconButton>
            <Typography>{streamer.upvotes}</Typography>
          </Box>

          <Box className={styles.button}>
            <IconButton>
              <ThumbDownAltIcon color="error" />
            </IconButton>
            <Typography>{streamer.downvotes}</Typography>
          </Box>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClick}
            size="small"
          >
            more info
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

const StreamerList: React.FC<StreamerListProps> = ({ streamers }) => {
  console.log(streamers);

  return (
    <Box className={styles.list}>
      {streamers.length > 0 ? (
        streamers.map((streamer: Streamer) => (
          <ListItem key={streamer._id} streamer={streamer} />
        ))
      ) : (
        <div>No streamers available.</div>
      )}
    </Box>
  );
};

export default StreamerList;
