import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCarDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  seats?: number;
  
  @IsOptional()
  @IsString()
  driver_name?: string;
} 