import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto, UpdateEntityDto } from './dto';
import { Entity } from '../../entities/entity.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('entities')
@UseGuards(AuthGuard)
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
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEntityDto: CreateEntityDto, @Req() req: any): Promise<Entity> {
    // In a real-world application, we would get the user ID from the authenticated user
    // For now, we'll just use a placeholder
    const userId = req.user?.id || 1;
    return this.entitiesService.create(createEntityDto, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto): Promise<Entity> {
    return this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.entitiesService.remove(+id);
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string, @Req() req: any): Promise<Entity> {
    // In a real-world application, we would get the user ID from the authenticated user
    const userId = req.user?.id || 1;
    return this.entitiesService.duplicate(+id, userId);
  }
} 