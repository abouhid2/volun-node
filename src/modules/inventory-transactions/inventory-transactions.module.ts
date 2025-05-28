import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryTransaction } from '../../entities/inventory-transaction.entity';
import { InventoryTransactionsService } from './inventory-transactions.service';
import { InventoryTransactionsController } from './inventory-transactions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryTransaction])],
  providers: [InventoryTransactionsService],
  controllers: [InventoryTransactionsController],
  exports: [InventoryTransactionsService],
})
export class InventoryTransactionsModule {} 