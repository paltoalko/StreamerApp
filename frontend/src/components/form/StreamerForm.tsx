import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
  Alert,
} from '@mui/material';
import styles from '../../assets/styles/StreamerForm.module.css';
import { Platforms } from '../../utils/constants';
import { submitStreamerForm } from 'utils/submitStreamer';

interface StreamerFormProps {
  fetchStreamers: () => Promise<void>;
}

const StreamerForm: React.FC<StreamerFormProps> = ({ fetchStreamers }) => {
  const initialFormData = {
    streamerName: '',
    platform: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<{ name?: string; value: unknown }>
      | SelectChangeEvent<unknown>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const obj = {
      fullname: formData.streamerName,
      platform: formData.platform,
      description: formData.description,
    };
    try {
      await submitStreamerForm(obj);
      setSuccessMessage(true);
    } catch (error) {
      setErrorMessage(true);
    }
    fetchStreamers();
    setLoading(false);
    setFormData(initialFormData);
  };

  return (
    <Box className={styles.formBox}>
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage(false)}>
          Streamer submitted succesfully!
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage(false)}>
          There was an error while submitting new streamer.
        </Alert>
      )}
      <Paper elevation={5} sx={{ p: 3, m: 1, width: '100%' }}>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          marginBottom={'1.5em'}
          textTransform="uppercase"
        >
          Submit New Streamer
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Streamer Name"
              name="streamerName"
              value={formData.streamerName}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              className={styles.textField}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <FormControl
              variant="outlined"
              color="secondary"
              className={styles.textField}
            >
              <InputLabel id="platform-label" shrink={true}>
                Streaming Platform
              </InputLabel>
              <Select
                labelId="platform-label"
                label="Streaming Platform"
                color="secondary"
                required
                name="platform"
                value={formData.platform}
                onChange={(e) => handleChange(e)}
              >
                {Platforms.map((platform) => (
                  <MenuItem key={platform} value={platform}>
                    {platform}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              variant="outlined"
              className={styles.textField}
              color="secondary"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              rows={4}
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
            >
              Submit
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default StreamerForm;
