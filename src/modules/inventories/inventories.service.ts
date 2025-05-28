import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../entities/inventory.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }

  async findOne(id: number): Promise<Inventory> {
    return this.inventoryRepository.findOneBy({ id });
  }

  async findByEntityId(entityId: number): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { entity_id: entityId },
    });
  }

  async create(inventoryData: Partial<Inventory>): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(inventoryData);
    return this.inventoryRepository.save(inventory);
  }

  async update(id: number, inventoryData: Partial<Inventory>): Promise<Inventory> {
    await this.inventoryRepository.update(id, inventoryData);
    return this.inventoryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
} 