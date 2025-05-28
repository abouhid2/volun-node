import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ParticipantStatus } from './create-participant.dto';

export class UpdateParticipantDto {
  @IsOptional()
  @IsEnum(ParticipantStatus)
  status?: ParticipantStatus;
  
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  car_id?: number;
} 