import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from '../../entities/picture.entity';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PicturesService],
  controllers: [PicturesController],
  exports: [PicturesService],
})
export class PicturesModule {} 