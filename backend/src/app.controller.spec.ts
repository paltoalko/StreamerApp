import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateStreamerDto } from './dto/streamer.dto';
import { ResponseDto } from './dto/response.dto';
import { Streamer } from './model/streamer.schema';

const mockStreamer: Partial<Streamer> = {
  fullname: 'Streamer Name',
  platform: 'Twitch',
  description: 'Streamer description',
  upvotes: 0,
  downvotes: 0,
};

const mockUpdatedStreamer: Partial<Streamer> = {
  fullname: 'Updated Streamer',
  platform: 'YouTube',
  description: 'Updated description',
  upvotes: 0,
  downvotes: 0,
};

const mockDeletedStreamer: Partial<Streamer> = {
  fullname: 'Deleted Streamer',
  platform: 'Twitch',
  description: 'Deleted description',
  upvotes: 0,
  downvotes: 0,
};

class MockStreamerModel {
  constructor(private data: Partial<Streamer>) {}

  static create(data: Partial<Streamer>): MockStreamerModel {
    return new MockStreamerModel(data);
  }

  static find(): MockStreamerModel[] {
    return [
      new MockStreamerModel(mockStreamersData[0]),
      new MockStreamerModel(mockStreamersData[1]),
    ];
  }

  static findById(): MockStreamerModel {
    return new MockStreamerModel(mockStreamer);
  }

  static findByIdAndUpdate(): MockStreamerModel {
    return new MockStreamerModel(mockUpdatedStreamer);
  }

  static findByIdAndDelete(): MockStreamerModel {
    return new MockStreamerModel(mockDeletedStreamer);
  }
}

const mockCreatedStreamerData: Partial<Streamer> = {
  fullname: 'Streamer Name',
  platform: 'Twitch',
  description: 'This is a description of the streamer.',
};

const mockStreamersData: Partial<Streamer>[] = [
  {
    fullname: 'Streamer 1',
    platform: 'Twitch',
    description: 'Streamer 1 description',
  },
  {
    fullname: 'Streamer 2',
    platform: 'YouTube',
    description: 'Streamer 2 description',
  },
];

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getModelToken('Streamer'),
          useValue: new MockStreamerModel(mockCreatedStreamerData),
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('createStreamer', () => {
    it('should create a new streamer and return the response', async () => {
      // Mock data
      const createStreamerDto: CreateStreamerDto = {
        fullname: 'Streamer Name',
        platform: 'Twitch',
        description: 'This is a description of the streamer.',
      };

      const createdStreamer = {
        // Mock the created streamer data
        id: '1',
        fullname: 'Streamer Name',
        platform: 'Twitch',
        description: 'This is a description of the streamer.',
        upvotes: 0,
        downvotes: 0,
      };

      // Mock the service method
      jest
        .spyOn(appService, 'createStreamer')
        .mockResolvedValue(createdStreamer);

      // Execute the controller method
      const response: ResponseDto = await appController.createStreamer(
        createStreamerDto,
      );

      // Assertions
      expect(response.message).toBe('Streamer created successfully');
      expect(response.data).toEqual(createdStreamer);
      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('deleteStreamer', () => {
    it('should delete a streamer and return the response', async () => {
      // Mock data
      const id = 'streamer-id';

      // Mock the service method
      jest.spyOn(appService, 'deleteStreamer').mockResolvedValue();

      // Execute the controller method
      const response: ResponseDto = await appController.deleteStreamer(id);

      // Assertions
      expect(response.message).toBe('Deleted streamer successfully');
      expect(response.data).toBeUndefined(); // Expect data to be undefined
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('should handle not found error when deleting a non-existing streamer', async () => {
      // Mock data
      const id = 'non-existing-id';

      // Mock the service method to throw NotFoundException
      jest
        .spyOn(appService, 'deleteStreamer')
        .mockRejectedValue(new NotFoundException('Streamer not found'));

      // Assertions
      await expect(appController.deleteStreamer(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
