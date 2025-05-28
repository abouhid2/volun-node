import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Picture } from '../../entities/picture.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('pictures')
@UseGuards(JwtAuthGuard)
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get()
  findAll(): Promise<Picture[]> {
    return this.picturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Picture> {
    return this.picturesService.findOne(+id);
  }

  @Post()
  create(@Body() pictureData: Partial<Picture>): Promise<Picture> {
    return this.picturesService.create(pictureData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pictureData: Partial<Picture>): Promise<Picture> {
    return this.picturesService.update(+id, pictureData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.picturesService.remove(+id);
  }

  @Get('imageable/:type/:id')
  findByImageable(@Param('type') type: string, @Param('id') id: string): Promise<Picture[]> {
    return this.picturesService.findByImageable(type, +id);
  }
} 