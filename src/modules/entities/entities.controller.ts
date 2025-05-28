import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto, UpdateEntityDto } from './dto';
import { Entity } from '../../entities/entity.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get()
  findAll(): Promise<Entity[]> {
    return this.entitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Entity> {
    return this.entitiesService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { entity: CreateEntityDto }, @Req() req: any): Promise<Entity> {
    const userId = req.user?.id;
    return this.entitiesService.create(body.entity, userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() body: { entity: UpdateEntityDto }): Promise<Entity> {
    return this.entitiesService.update(+id, body.entity);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.entitiesService.remove(+id);
  }

  @Post(':id/duplicate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string, @Req() req: any): Promise<Entity> {
    const userId = req.user?.id;
    return this.entitiesService.duplicate(+id, userId);
  }
} 