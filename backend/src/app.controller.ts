import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStreamerDto } from './dto/streamer.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('streamers')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createStreamer(
    @Body() createStreamerDto: CreateStreamerDto,
  ): Promise<ResponseDto> {
    const newStreamer = await this.appService.createStreamer(createStreamerDto);
    return {
      message: 'Streamer created successfully',
      data: newStreamer,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  async getAllStreamers(): Promise<ResponseDto> {
    const streamers = await this.appService.getAllStreamers();
    return {
      message: 'Retrieved all streamers successfully',
      data: streamers,
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  async getStreamerById(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const streamer = await this.appService.getStreamerById(id);
      return {
        message: 'Retrieved streamer successfully',
        data: streamer,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          message: 'Streamer not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      throw error;
    }
  }

  @Put(':id/vote')
  async voteStreamer(
    @Param('id') id: string,
    @Body() vote: 'up' | 'down',
  ): Promise<ResponseDto> {
    try {
      let updatedStreamer;
      if (vote === 'up') {
        updatedStreamer = await this.appService.upvoteStreamer(id);
        return {
          message: 'Upvoted streamer successfully',
          data: updatedStreamer,
          statusCode: HttpStatus.OK,
        };
      } else if (vote === 'down') {
        updatedStreamer = await this.appService.downvoteStreamer(id);
        return {
          message: 'Downvoted streamer successfully',
          data: updatedStreamer,
          statusCode: HttpStatus.OK,
        };
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          message: 'Streamer not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteStreamer(@Param('id') id: string): Promise<ResponseDto> {
    try {
      await this.appService.deleteStreamer(id);
      return {
        message: 'Deleted streamer successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Streamer not found');
      }
      throw error;
    }
  }
}
