import axios from 'axios';
import {
  deleteStreamer,
  downvoteStreamer,
  getStreamerById,
  getStreamers,
  postStreamer,
  upvoteStreamer,
} from 'services/apiService';

jest.mock('axios');

const API_BASE_URL = 'http://localhost:3000/streamers';

describe('apiService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('postStreamer should make a POST request and return the response data', async () => {
    const mockStreamerData = { fullname: 'Test Streamer', platform: 'Twitch' };
    const mockResponseData = { id: '1', ...mockStreamerData };

    jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockResponseData });

    const response = await postStreamer(mockStreamerData);

    expect(axios.post).toHaveBeenCalledWith(API_BASE_URL, mockStreamerData);
    expect(response).toEqual(mockResponseData);
  });

  test('postStreamer should throw an error if the request fails', async () => {
    const mockStreamerData = { fullname: 'Test Streamer', platform: 'Twitch' };
    const mockError = new Error('Failed to post streamer data');

    jest.spyOn(axios, 'post').mockRejectedValueOnce(mockError);

    await expect(postStreamer(mockStreamerData)).rejects.toThrow(
      'Failed to post streamer data',
    );

    expect(axios.post).toHaveBeenCalledWith(API_BASE_URL, mockStreamerData);
  });

  test('getStreamers should make a GET request and return the response data', async () => {
    const mockResponseData = [
      { id: '1', fullname: 'Streamer 1' },
      { id: '2', fullname: 'Streamer 2' },
    ];

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockResponseData });

    const response = await getStreamers();

    expect(axios.get).toHaveBeenCalledWith(API_BASE_URL);
    expect(response).toEqual(mockResponseData);
  });

  test('getStreamers should throw an error if the request fails', async () => {
    const mockError = new Error('Failed to retrieve streamers');

    jest.spyOn(axios, 'get').mockRejectedValueOnce(mockError);

    await expect(getStreamers()).rejects.toThrow(
      'Failed to retrieve streamers',
    );

    expect(axios.get).toHaveBeenCalledWith(API_BASE_URL);
  });

  test('upvoteStreamer should make a PUT request and return the response data', async () => {
    const streamerId = '1';
    const mockResponseData = { id: '1', upvotes: 10 };

    jest.spyOn(axios, 'put').mockResolvedValueOnce({ data: mockResponseData });

    const response = await upvoteStreamer(streamerId);

    expect(axios.put).toHaveBeenCalledWith(`${API_BASE_URL}/1/vote`, {
      vote: 'up',
    });
    expect(response).toEqual(mockResponseData);
  });

  test('upvoteStreamer should throw an error if the request fails', async () => {
    const streamerId = '1';
    const mockError = new Error('Failed to upvote streamer');

    jest.spyOn(axios, 'put').mockRejectedValueOnce(mockError);

    await expect(upvoteStreamer(streamerId)).rejects.toThrow(
      'Failed to upvote streamer',
    );

    expect(axios.put).toHaveBeenCalledWith(`${API_BASE_URL}/1/vote`, {
      vote: 'up',
    });
  });

  test('downvoteStreamer should make a PUT request and return the response data', async () => {
    const streamerId = '1';
    const mockResponseData = { id: '1', downvotes: 5 };

    jest.spyOn(axios, 'put').mockResolvedValueOnce({ data: mockResponseData });

    const response = await downvoteStreamer(streamerId);

    expect(axios.put).toHaveBeenCalledWith(`${API_BASE_URL}/1/vote`, {
      vote: 'down',
    });
    expect(response).toEqual(mockResponseData);
  });

  test('downvoteStreamer should throw an error if the request fails', async () => {
    const streamerId = '1';
    const mockError = new Error('Failed to downvote streamer');

    jest.spyOn(axios, 'put').mockRejectedValueOnce(mockError);

    await expect(downvoteStreamer(streamerId)).rejects.toThrow(
      'Failed to downvote streamer',
    );

    expect(axios.put).toHaveBeenCalledWith(`${API_BASE_URL}/1/vote`, {
      vote: 'down',
    });
  });

  test('getStreamerById should make a GET request with the provided id and return the response data', async () => {
    const streamerId = '1';
    const mockResponseData = { id: '1', fullname: 'Test Streamer' };

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockResponseData });

    const response = await getStreamerById(streamerId);

    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/1`);
    expect(response).toEqual(mockResponseData);
  });

  test('getStreamerById should throw an error if the request fails', async () => {
    const streamerId = '1';
    const mockError = new Error('Failed to retrieve streamer');

    jest.spyOn(axios, 'get').mockRejectedValueOnce(mockError);

    await expect(getStreamerById(streamerId)).rejects.toThrow(
      'Failed to retrieve streamer',
    );

    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/1`);
  });

  test('deleteStreamer should make a DELETE request with the provided id and return the response data', async () => {
    const streamerId = '1';
    const mockResponseData = { message: 'Streamer deleted successfully' };

    jest
      .spyOn(axios, 'delete')
      .mockResolvedValueOnce({ data: mockResponseData });

    const response = await deleteStreamer(streamerId);

    expect(axios.delete).toHaveBeenCalledWith(`${API_BASE_URL}/1`);
    expect(response).toEqual(mockResponseData);
  });

  test('deleteStreamer should throw an error if the request fails', async () => {
    const streamerId = '1';
    const mockError = new Error('Failed to delete streamer');

    jest.spyOn(axios, 'delete').mockRejectedValueOnce(mockError);

    await expect(deleteStreamer(streamerId)).rejects.toThrow(
      'Failed to delete streamer',
    );

    expect(axios.delete).toHaveBeenCalledWith(`${API_BASE_URL}/1`);
  });
});
