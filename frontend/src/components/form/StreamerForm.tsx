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
} from '@mui/material';
import styles from '../../assets/styles/StreamerForm.module.css';
import { Platforms } from '../../utils/constants';

const StreamerForm: React.FC<object> = () => {
  const [formData, setFormData] = useState({
    streamerName: '',
    platform: '',
    description: '',
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Box className={styles.formBox}>
      <Paper elevation={5} sx={{ p: 5, m: 1, width: '80%' }}>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          gutterBottom
          textTransform="uppercase"
        >
          Submit New Streamer
        </Typography>
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
      </Paper>
    </Box>
  );
};

export default StreamerForm;
