import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Streamer, StreamerDocument } from './model/streamer.schema';
import { CreateStreamerDto } from './dto/streamer.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Streamer.name) private streamerModel: Model<StreamerDocument>,
  ) {}

  async createStreamer(
    createStreamerDto: CreateStreamerDto,
  ): Promise<Streamer> {
    const newStreamer = new this.streamerModel(createStreamerDto);
    const savedStreamer = await newStreamer.save();
    return savedStreamer;
  }

  async getAllStreamers(): Promise<Streamer[]> {
    const streamers = await this.streamerModel.find().exec();
    return streamers;
  }

  async getStreamerById(id: string): Promise<Streamer> {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) {
      throw new NotFoundException('Invalid streamer ID');
    }

    const streamer = await this.streamerModel.findById(objectId).exec();
    if (!streamer) {
      throw new NotFoundException('Streamer not found');
    }

    return streamer;
  }

  async upvoteStreamer(id: string): Promise<Streamer | null> {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) {
      throw new NotFoundException('Invalid streamer ID');
    }

    const streamer = await this.streamerModel
      .findByIdAndUpdate(objectId, { $inc: { upvotes: 1 } }, { new: true })
      .exec();

    if (!streamer) {
      throw new NotFoundException('Streamer not found');
    }

    return streamer;
  }

  async downvoteStreamer(id: string): Promise<Streamer | null> {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) {
      throw new NotFoundException('Invalid streamer ID');
    }

    const streamer = await this.streamerModel
      .findByIdAndUpdate(objectId, { $inc: { downvotes: 1 } }, { new: true })
      .exec();

    if (!streamer) {
      throw new NotFoundException('Streamer not found');
    }

    return streamer;
  }

  async deleteStreamer(id: string): Promise<void> {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) {
      throw new NotFoundException('Invalid streamer ID');
    }

    const result = await this.streamerModel.findByIdAndDelete(objectId).exec();
    if (!result) {
      throw new NotFoundException('Streamer not found');
    }
  }
}
