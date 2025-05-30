import { IsArray, IsOptional } from 'class-validator';

export class UpdateDonationSettingDto {
  @IsOptional()
  @IsArray()
  types?: string[];

  @IsOptional()
  @IsArray()
  units?: string[];
} 