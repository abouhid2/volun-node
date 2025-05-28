import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto, UpdateParticipantDto, ParticipantStatus } from './dto';
import { Participant } from '../../entities/participant.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events/:eventId/participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  findAll(@Param('eventId') eventId: string): Promise<Participant[]> {
    return this.participantsService.findAllByEvent(+eventId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('eventId') eventId: string,
    @Body() body: any,
  ): Promise<Participant> {
    // Handle both nested (Rails-style) and direct parameters
    let participantData: CreateParticipantDto;
    
    if (body.participant) {
      // Rails-style nested parameters
      participantData = body.participant as CreateParticipantDto;
    } else {
      // Direct parameters
      participantData = body as CreateParticipantDto;
      // Set default status if not provided (mimicking Rails behavior)
      if (!participantData.status) {
        participantData.status = ParticipantStatus.CONFIRMED;
      }
    }
    
    participantData.event_id = +eventId;
    return this.participantsService.create(participantData);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: any,
  ): Promise<Participant> {
    // Handle both nested and direct parameters
    if (body.participant) {
      // Rails-style nested parameters
      return this.participantsService.update(+id, body.participant);
    } else if (Object.keys(body).length === 0) {
      // Reset car_id if no parameters provided (mimicking Rails behavior)
      return this.participantsService.update(+id, { car_id: null });
    } else {
      // Direct parameters
      return this.participantsService.update(+id, body);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.participantsService.remove(+id);
  }

  @Post(':id/duplicate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.duplicate(+id);
  }
} 