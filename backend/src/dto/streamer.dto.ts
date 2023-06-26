import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Platforms } from '../utils/constants';

export class CreateStreamerDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Platforms, { each: true })
  platform: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
