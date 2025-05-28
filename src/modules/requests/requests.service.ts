import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from '../../entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async findAll(): Promise<Request[]> {
    return this.requestRepository.find();
  }

  async findOne(id: number): Promise<Request> {
    return this.requestRepository.findOneBy({ id });
  }

  async findByEntityId(entityId: number): Promise<Request[]> {
    return this.requestRepository.find({
      where: { entity_id: entityId },
    });
  }

  async findByStatus(fulfilled: boolean): Promise<Request[]> {
    return this.requestRepository.find({
      where: { fulfilled },
    });
  }

  async create(requestData: Partial<Request>): Promise<Request> {
    const request = this.requestRepository.create(requestData);
    return this.requestRepository.save(request);
  }

  async update(id: number, requestData: Partial<Request>): Promise<Request> {
    await this.requestRepository.update(id, requestData);
    return this.requestRepository.findOneBy({ id });
  }

  async markAsFulfilled(id: number): Promise<Request> {
    await this.requestRepository.update(id, { 
      fulfilled: true,
      fulfilled_at: new Date(),
    });
    return this.requestRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.requestRepository.delete(id);
  }
} 