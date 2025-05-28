import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity } from '../../entities/entity.entity';
import { CreateEntityDto, UpdateEntityDto } from './dto';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    private readonly entitiesRepository: Repository<Entity>,
  ) {}

  async findAll(): Promise<Entity[]> {
    return this.entitiesRepository.find({
      where: { deleted_at: null },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Entity> {
    const entity = await this.entitiesRepository.findOne({
      where: { id, deleted_at: null },
      relations: ['user'],
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return entity;
  }

  async create(createEntityDto: CreateEntityDto, userId: number): Promise<Entity> {
    const entity = this.entitiesRepository.create({
      ...createEntityDto,
      user_id: userId,
    });

    return this.entitiesRepository.save(entity);
  }

  async update(id: number, updateEntityDto: UpdateEntityDto): Promise<Entity> {
    const entity = await this.findOne(id);
    
    Object.assign(entity, updateEntityDto);
    
    return this.entitiesRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.deleted_at = new Date();
    await this.entitiesRepository.save(entity);
  }

  async duplicate(id: number, userId: number): Promise<Entity> {
    const entity = await this.findOne(id);
    
    const duplicatedEntity = this.entitiesRepository.create({
      name: `${entity.name} (copy)`,
      description: entity.description,
      logo_url: entity.logo_url,
      website: entity.website,
      address: entity.address,
      phone: entity.phone,
      email: entity.email,
      user_id: userId,
    });
    
    return this.entitiesRepository.save(duplicatedEntity);
  }
} 