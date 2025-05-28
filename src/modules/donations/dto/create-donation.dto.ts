import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  event_id: number;
  
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  user_id: number;
  
  @IsNotEmpty()
  @IsString()
  donation_type: string;
  
  @IsOptional()
  @IsDecimal()
  quantity?: number;
  
  @IsOptional()
  @IsString()
  unit?: string;
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  car_id?: number;
} 