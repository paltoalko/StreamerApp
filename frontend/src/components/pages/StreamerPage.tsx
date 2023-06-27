import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import { getStreamerById, deleteStreamer } from 'services/apiService';
import { StreamerResponse } from 'utils/types';
import Logo from 'utils/Logo';
import image from '../../assets/img/streamer_1.png';
import styles from '../../assets/styles/StreamerPage.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

interface StreamerPageParams extends Record<string, string> {
  id: string;
}

const StreamerPage: React.FC = () => {
  const params = useParams<StreamerPageParams>();
  const navigate = useNavigate();

  const [streamer, setStreamer] = useState<StreamerResponse | null>(null);

  useEffect(() => {
    const fetchStreamer = async () => {
      try {
        const response = await getStreamerById(params.id);
        setStreamer(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStreamer();
  }, [params.id]);

  const handleReturnClick = () => {
    navigate('/');
  };

  const handleDeleteClick = async () => {
    try {
      await deleteStreamer(params.id);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={styles.container}>
      <Logo />
      {streamer && (
        <Box>
          <Box className={styles.pageTop}>
            <Box className={styles.streamerAvatar}>
              <Avatar
                alt="streamer-with-headphones-portrait"
                src={image}
                variant="square"
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
            <Box sx={{ maxWidth: '50%' }}>
              <Typography
                fontSize="5vmax"
                my={4}
                fontWeight={600}
                color="secondary"
              >
                {streamer.data?.fullname} {/* Add null check here */}
              </Typography>
              <Typography fontSize="3vmax" fontWeight={300}>
                Description
              </Typography>
              <Divider />
              <Typography variant="body1" p="1em" fontWeight={200}>
                {streamer.data?.description} {/* Add null check here */}
              </Typography>
              <Typography fontSize="3vmax" fontWeight={300}>
                Platform
              </Typography>
              <Divider />
              <Typography variant="body1" p="1em" fontWeight={200}>
                {streamer.data?.platform} {/* Add null check here */}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.voteBox}>
            <Box
              sx={{
                backgroundColor: '#2F7D32',
                borderRadius: 5,
                display: 'flex',
                gap: '1em',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
              }}
              p={2}
              my={4}
            >
              <ThumbUpIcon sx={{ color: 'white' }} />
              <Typography
                fontSize={24}
                align="center"
                color="white"
                fontWeight={600}
              >
                {streamer?.data.upvotes}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#D32F30',
                borderRadius: 5,
                display: 'flex',
                gap: '1em',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
              }}
              p={2}
              my={4}
            >
              <ThumbDownAltIcon sx={{ color: 'white' }} />
              <Typography
                fontSize={24}
                align="center"
                color="white"
                fontWeight={600}
              >
                {streamer?.data.downvotes}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Box className={styles.actionButtons}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReturnClick}
          className={styles.returnButton}
        >
          Return
        </Button>
        <IconButton onClick={handleDeleteClick} aria-label="Delete Streamer">
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default StreamerPage;
