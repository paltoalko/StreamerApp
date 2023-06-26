import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend API URL

export const postStreamer = async (streamerData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/streamers`,
      streamerData,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to post streamer data');
  }
};
