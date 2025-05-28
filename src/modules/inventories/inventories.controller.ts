import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { Inventory } from '../../entities/inventory.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inventories')
@UseGuards(JwtAuthGuard)
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Get()
  findAll(): Promise<Inventory[]> {
    return this.inventoriesService.findAll();
  }

  @Get('entity/:entityId')
  findByEntityId(@Param('entityId') entityId: string): Promise<Inventory[]> {
    return this.inventoriesService.findByEntityId(+entityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inventory> {
    return this.inventoriesService.findOne(+id);
  }

  @Post()
  create(@Body() inventoryData: Partial<Inventory>): Promise<Inventory> {
    return this.inventoriesService.create(inventoryData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() inventoryData: Partial<Inventory>): Promise<Inventory> {
    return this.inventoriesService.update(+id, inventoryData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.inventoriesService.remove(+id);
  }
} 