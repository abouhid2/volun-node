import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from '../../entities/car.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events/:eventId/cars')
@UseGuards(AuthGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  findAll(@Param('eventId') eventId: string): Promise<Car[]> {
    return this.carsService.findAllByEvent(+eventId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('eventId') eventId: string,
    @Body() createCarDto: CreateCarDto,
  ): Promise<Car> {
    createCarDto.event_id = +eventId;
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(+id);
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string): Promise<Car> {
    return this.carsService.duplicate(+id);
  }

  @Post(':id/clean_seats')
  @HttpCode(HttpStatus.NO_CONTENT)
  cleanSeats(@Param('id') id: string): Promise<void> {
    return this.carsService.cleanSeats(+id);
  }

  @Post(':id/clean_donations')
  @HttpCode(HttpStatus.NO_CONTENT)
  cleanDonations(@Param('id') id: string): Promise<void> {
    return this.carsService.cleanDonations(+id);
  }
} 