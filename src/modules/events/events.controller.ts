import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from '../../entities/event.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEventDto: CreateEventDto, @Req() req: any): Promise<Event> {
    const userId = req.user?.id || 1;
    return this.eventsService.create(createEventDto, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(+id);
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string, @Req() req: any): Promise<Event> {
    const userId = req.user?.id || 1;
    return this.eventsService.duplicate(+id, userId);
  }

  @Post(':id/recurrent')
  @HttpCode(HttpStatus.CREATED)
  createRecurrent(
    @Param('id') id: string,
    @Body() body: { dates: string[] },
    @Req() req: any,
  ): Promise<Event[]> {
    const userId = req.user?.id || 1;
    const dates = body.dates.map(date => new Date(date));
    return this.eventsService.createRecurrent(+id, dates, userId);
  }
}

@Controller('entities/:entityId/events')
@UseGuards(AuthGuard)
export class EntityEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAllByEntity(@Param('entityId') entityId: string): Promise<Event[]> {
    return this.eventsService.findAllByEntity(+entityId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('entityId') entityId: string,
    @Body() createEventDto: CreateEventDto,
    @Req() req: any,
  ): Promise<Event> {
    const userId = req.user?.id || 1;
    createEventDto.entity_id = +entityId;
    return this.eventsService.create(createEventDto, userId);
  }
} 