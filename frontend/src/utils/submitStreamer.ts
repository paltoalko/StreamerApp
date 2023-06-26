import { postStreamer } from 'services/apiService';

export const submitStreamerForm = async (formData) => {
  try {
    const response = await postStreamer(formData);
    console.log('Streamer data submitted successfully:', response);
  } catch (error) {
    console.error('Failed to submit streamer data:', error.message);
  }
};
