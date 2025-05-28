import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto, UpdateParticipantDto } from './dto';
import { Participant } from '../../entities/participant.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events/:eventId/participants')
@UseGuards(AuthGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  findAll(@Param('eventId') eventId: string): Promise<Participant[]> {
    return this.participantsService.findAllByEvent(+eventId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('eventId') eventId: string,
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    createParticipantDto.event_id = +eventId;
    return this.participantsService.create(createParticipantDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.participantsService.remove(+id);
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.duplicate(+id);
  }
} 