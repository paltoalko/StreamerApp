import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import styles from '../../assets/styles/StreamerList.module.css';
import { upvoteStreamer, downvoteStreamer } from 'services/apiService';
import { Streamer } from 'utils/types';

interface ListItemProps {
  streamer: Streamer;
  fetchStreamers: () => Promise<void>;
}

const ListItem: React.FC<ListItemProps> = ({ streamer, fetchStreamers }) => {
  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const vote = e.currentTarget.id === 'downvote' ? 'down' : 'up';
    try {
      if (vote === 'up') {
        await upvoteStreamer(streamer._id);
      } else if (vote === 'down') {
        await downvoteStreamer(streamer._id);
      }
      fetchStreamers();
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    // Replace '/streamers/:id' with the correct URL for the streamer page
    navigate(`/streamers/${streamer._id}`);
  };

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
            <IconButton onClick={handleVote} id="upvote">
              <ThumbUpIcon color="success" />
            </IconButton>
            <Typography>{streamer.upvotes}</Typography>
          </Box>

          <Box className={styles.button}>
            <IconButton id="downvote" onClick={handleVote}>
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

interface StreamerListProps {
  streamers: Streamer[];
  fetchStreamers: () => Promise<void>;
}

const StreamerList: React.FC<StreamerListProps> = ({
  streamers,
  fetchStreamers,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStreamers();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className={styles.list}>
      {isLoading ? (
        <Box
          sx={{
            m: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {streamers.length > 0 ? (
            streamers.map((streamer: Streamer) => (
              <ListItem
                key={streamer._id}
                streamer={streamer}
                fetchStreamers={fetchStreamers}
              />
            ))
          ) : (
            <Box
              sx={{
                m: 5,
              }}
            >
              <Typography>
                No streamers available. Submit new streamer.{' '}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default StreamerList;
