import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto, UpdateEntityDto } from './dto';
import { Entity } from '../../entities/entity.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  findAll(): Promise<Entity[]> {
    return this.entitiesService.findAll();
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Entity> {
    return this.entitiesService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEntityDto: CreateEntityDto, @Req() req: any): Promise<Entity> {
    const userId = req.user?.id;
    return this.entitiesService.create(createEntityDto, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto): Promise<Entity> {
    return this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.entitiesService.remove(+id);
  }

  @Post(':id/duplicate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string, @Req() req: any): Promise<Entity> {
    const userId = req.user?.id;
    return this.entitiesService.duplicate(+id, userId);
  }
} 