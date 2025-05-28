import { IsOptional, IsString, IsNumber, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDonationDto {
  @IsOptional()
  @IsString()
  donation_type?: string;
  
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