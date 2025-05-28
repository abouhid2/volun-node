import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  event_id: number;
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id?: number;
} 