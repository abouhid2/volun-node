import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InventoryTransactionsService } from './inventory-transactions.service';
import { InventoryTransaction } from '../../entities/inventory-transaction.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inventory-transactions')
@UseGuards(JwtAuthGuard)
export class InventoryTransactionsController {
  constructor(private readonly transactionsService: InventoryTransactionsService) {}

  @Get()
  findAll(): Promise<InventoryTransaction[]> {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InventoryTransaction> {
    return this.transactionsService.findOne(+id);
  }

  @Get('inventory/:inventoryId')
  findByInventoryId(@Param('inventoryId') inventoryId: string): Promise<InventoryTransaction[]> {
    return this.transactionsService.findByInventoryId(+inventoryId);
  }

  @Get('event/:eventId')
  findByEventId(@Param('eventId') eventId: string): Promise<InventoryTransaction[]> {
    return this.transactionsService.findByEventId(+eventId);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<InventoryTransaction[]> {
    return this.transactionsService.findByUserId(+userId);
  }

  @Post()
  create(@Body() transactionData: Partial<InventoryTransaction>): Promise<InventoryTransaction> {
    return this.transactionsService.create(transactionData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transactionData: Partial<InventoryTransaction>): Promise<InventoryTransaction> {
    return this.transactionsService.update(+id, transactionData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.transactionsService.remove(+id);
  }
} 