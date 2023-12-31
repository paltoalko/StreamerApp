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

export const getStreamers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/streamers`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve streamers.');
  }
};

export const upvoteStreamer = async (streamerId: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/streamers/${streamerId}/vote`,
      {
        vote: 'up',
      },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('Failed to upvote streamer');
    }
  }
};

export const downvoteStreamer = async (streamerId: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/streamers/${streamerId}/vote`,
      {
        vote: 'down',
      },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('Failed to downvote streamer');
    }
  }
};

export const getStreamerById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/streamers/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('Failed to retrieve streamer');
    }
  }
};

export const deleteStreamer = async (streamerId: string) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/streamers/${streamerId}`,
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('Failed to delete streamer');
    }
  }
};
