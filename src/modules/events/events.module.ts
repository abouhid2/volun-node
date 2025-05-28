import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../entities/event.entity';
import { EventsController, EntityEventsController } from './events.controller';
import { EventsService } from './events.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    AuthModule,
  ],
  controllers: [EventsController, EntityEventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {} 