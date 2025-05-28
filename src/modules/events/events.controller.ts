import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from '../../entities/event.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events')
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.eventsService.remove(+id);
    return;
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { event: CreateEventDto }, @Req() req: any): Promise<Event> {
    const userId = req.user?.id || 1;
    return this.eventsService.create(body.event, userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() body: { event: UpdateEventDto }): Promise<Event> {
    return this.eventsService.update(+id, body.event);
  }

  @Post(':id/duplicate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string, @Req() req: any): Promise<Event> {
    const userId = req.user?.id || 1;
    return this.eventsService.duplicate(+id, userId);
  }

  @Post(':id/recurrent')
  @UseGuards(AuthGuard)
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