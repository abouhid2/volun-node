import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from '../../entities/picture.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
  ) {}

  async findAll(): Promise<Picture[]> {
    return this.pictureRepository.find();
  }

  async findOne(id: number): Promise<Picture> {
    return this.pictureRepository.findOneBy({ id });
  }

  async create(pictureData: Partial<Picture>): Promise<Picture> {
    const picture = this.pictureRepository.create(pictureData);
    return this.pictureRepository.save(picture);
  }

  async update(id: number, pictureData: Partial<Picture>): Promise<Picture> {
    await this.pictureRepository.update(id, pictureData);
    return this.pictureRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.pictureRepository.softDelete(id);
  }

  async findByImageable(type: string, id: number): Promise<Picture[]> {
    return this.pictureRepository.find({
      where: {
        imageable_type: type,
        imageable_id: id,
      },
    });
  }
} 