import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Streamer, StreamerSchema } from './model/streamer.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DB_CONNECTION_URL),
    MongooseModule.forFeature([
      { name: Streamer.name, schema: StreamerSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
