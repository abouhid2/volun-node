import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../entities/event.entity';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['entity', 'user'],
    });
  }

  async findAllByEntity(entityId: number): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { entity_id: entityId },
      relations: ['entity', 'user'],
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['entity', 'user'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async create(createEventDto: CreateEventDto, userId: number): Promise<Event> {
    const event = this.eventsRepository.create({
      ...createEventDto,
      user_id: userId,
    });

    return this.eventsRepository.save(event);
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    
    Object.assign(event, updateEventDto);
    
    return this.eventsRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventsRepository.softRemove(event);
    return;
  }

  async duplicate(id: number, userId: number): Promise<Event> {
    const event = await this.findOne(id);
    
    const duplicatedEvent = this.eventsRepository.create({
      title: `${event.title} (copy)`,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      entity_id: event.entity_id,
      user_id: userId,
    });
    
    return this.eventsRepository.save(duplicatedEvent);
  }

  async createRecurrent(id: number, dates: Date[], userId: number): Promise<Event[]> {
    const event = await this.findOne(id);
    const events: Event[] = [];
    
    for (const date of dates) {
      const newEvent = this.eventsRepository.create({
        title: event.title,
        description: event.description,
        date: date,
        time: event.time,
        location: event.location,
        entity_id: event.entity_id,
        user_id: userId,
      });
      
      events.push(await this.eventsRepository.save(newEvent));
    }
    
    return events;
  }
} 