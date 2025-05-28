import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryTransaction } from '../../entities/inventory-transaction.entity';

@Injectable()
export class InventoryTransactionsService {
  constructor(
    @InjectRepository(InventoryTransaction)
    private transactionRepository: Repository<InventoryTransaction>,
  ) {}

  async findAll(): Promise<InventoryTransaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: number): Promise<InventoryTransaction> {
    return this.transactionRepository.findOneBy({ id });
  }

  async findByInventoryId(inventoryId: number): Promise<InventoryTransaction[]> {
    return this.transactionRepository.find({
      where: { inventory_id: inventoryId },
    });
  }

  async findByEventId(eventId: number): Promise<InventoryTransaction[]> {
    return this.transactionRepository.find({
      where: { event_id: eventId },
    });
  }

  async findByUserId(userId: number): Promise<InventoryTransaction[]> {
    return this.transactionRepository.find({
      where: { user_id: userId },
    });
  }

  async create(transactionData: Partial<InventoryTransaction>): Promise<InventoryTransaction> {
    const transaction = this.transactionRepository.create(transactionData);
    return this.transactionRepository.save(transaction);
  }

  async update(id: number, transactionData: Partial<InventoryTransaction>): Promise<InventoryTransaction> {
    await this.transactionRepository.update(id, transactionData);
    return this.transactionRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
} 