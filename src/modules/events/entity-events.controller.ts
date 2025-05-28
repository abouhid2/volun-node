import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from '../../entities/event.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('entities/:entityId/events')
export class EntityEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAllByEntity(@Param('entityId') entityId: string): Promise<Event[]> {
    return this.eventsService.findAllByEntity(+entityId);
  }

  @Get(':id')
  findOne(@Param('entityId') entityId: string, @Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('entityId') entityId: string,
    @Body() body: { event: CreateEventDto },
    @Req() req: any,
  ): Promise<Event> {
    const userId = req.user?.id || 1;
    body.event.entity_id = +entityId;
    return this.eventsService.create(body.event, userId);
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('entityId') entityId: string,
    @Param('id') id: string, 
    @Body() body: { event: UpdateEventDto }
  ): Promise<Event> {
    return this.eventsService.update(+id, body.event);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('entityId') entityId: string,
    @Param('id') id: string
  ): Promise<void> {
    await this.eventsService.remove(+id);
    return;
  }

  @Post(':id/duplicate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  duplicate(
    @Param('entityId') entityId: string,
    @Param('id') id: string, 
    @Req() req: any
  ): Promise<Event> {
    const userId = req.user?.id || 1;
    return this.eventsService.duplicate(+id, userId);
  }
} 