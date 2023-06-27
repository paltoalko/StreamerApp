import { postStreamer } from 'services/apiService';

export const submitStreamerForm = async (formData) => {
  try {
    const response = await postStreamer(formData);
    return response.data;
  } catch (error) {
    console.error('Failed to submit streamer data:', error);
    throw new Error('Failed to submit streamer data');
  }
};
