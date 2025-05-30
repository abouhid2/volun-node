import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from '../../entities/participant.entity';
import { CreateParticipantDto, UpdateParticipantDto } from './dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
  ) {}

  async findAllByEvent(eventId: number): Promise<Participant[]> {
    return this.participantsRepository.find({
      where: { event_id: eventId },
      relations: ['user', 'event', 'car'],
    });
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantsRepository.findOne({
      where: { id },
      relations: ['user', 'event', 'car'],
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const participant = this.participantsRepository.create(createParticipantDto);
    return this.participantsRepository.save(participant);
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    const participant = await this.findOne(id);
    
    Object.assign(participant, updateParticipantDto);
    
    return this.participantsRepository.save(participant);
  }

  async remove(id: number): Promise<void> {
    const participant = await this.findOne(id);
    await this.participantsRepository.softRemove(participant);
  }

  async duplicate(id: number): Promise<Participant> {
    const participant = await this.findOne(id);
    
    const duplicatedParticipant = this.participantsRepository.create({
      user_id: participant.user_id,
      event_id: participant.event_id,
      status: participant.status,
      name: participant.name,
      car_id: participant.car_id,
    });
    
    return this.participantsRepository.save(duplicatedParticipant);
  }
} 