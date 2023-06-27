export interface Streamer {
  _id: string;
  fullname: string;
  platform: string;
  description: string;
  upvotes: number;
  downvotes: number;
  __v: number;
}

export interface StreamerResponse {
  message: string;
  data: Streamer;
  statusCode: number;
}
