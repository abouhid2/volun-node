import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum ParticipantStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
}

export class CreateParticipantDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id?: number;
  
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  event_id: number;
  
  @IsNotEmpty()
  @IsEnum(ParticipantStatus)
  status: ParticipantStatus;
  
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  car_id?: number;
} 