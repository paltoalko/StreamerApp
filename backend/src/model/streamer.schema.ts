import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type StreamerDocument = Streamer & Document;

@Schema()
export class Streamer {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  upvotes: number;

  @Prop({ default: 0 })
  downvotes: number;
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);
