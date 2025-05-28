import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../../entities/car.entity';
import { Participant } from '../../entities/participant.entity';
import { Donation } from '../../entities/donation.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { FirebaseModule } from '../../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, Participant, Donation]),
    FirebaseModule,
    AuthModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {} 