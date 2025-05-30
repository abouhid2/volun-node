import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  event_id?: number;
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  seats?: number;
  
  @IsOptional()
  @IsString()
  driver_name?: string;
} 