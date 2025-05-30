import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDonationSettingDto {
  @IsOptional()
  @IsArray()
  types?: string[];

  @IsOptional()
  @IsArray()
  units?: string[];

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  event_id?: number;
} 