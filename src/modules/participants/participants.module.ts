import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../../entities/participant.entity';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { FirebaseModule } from '../../firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participant]),
    FirebaseModule,
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {} 