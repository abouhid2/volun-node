import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../../entities/car.entity';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Participant } from '../../entities/participant.entity';
import { Donation } from '../../entities/donation.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
    @InjectRepository(Donation)
    private readonly donationsRepository: Repository<Donation>,
  ) {}

  async findAllByEvent(eventId: number): Promise<Car[]> {
    return this.carsRepository.find({
      where: { event_id: eventId, deleted_at: null },
      relations: ['event', 'participants', 'donations'],
    });
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carsRepository.findOne({
      where: { id, deleted_at: null },
      relations: ['event', 'participants', 'donations'],
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carsRepository.create(createCarDto);
    return this.carsRepository.save(car);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id);
    
    Object.assign(car, updateCarDto);
    
    return this.carsRepository.save(car);
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id);
    car.deleted_at = new Date();
    await this.carsRepository.save(car);
  }

  async duplicate(id: number): Promise<Car> {
    const car = await this.findOne(id);
    
    const duplicatedCar = this.carsRepository.create({
      event_id: car.event_id,
      seats: car.seats,
      driver_name: car.driver_name,
    });
    
    return this.carsRepository.save(duplicatedCar);
  }

  async cleanSeats(id: number): Promise<void> {
    const car = await this.findOne(id);
    
    // Find all participants in this car
    const participants = await this.participantsRepository.find({
      where: { car_id: car.id, deleted_at: null },
    });
    
    // Remove car_id from all participants
    for (const participant of participants) {
      participant.car_id = null;
      await this.participantsRepository.save(participant);
    }
  }

  async cleanDonations(id: number): Promise<void> {
    const car = await this.findOne(id);
    
    // Find all donations in this car
    const donations = await this.donationsRepository.find({
      where: { car_id: car.id, deleted_at: null },
    });
    
    // Remove car_id from all donations
    for (const donation of donations) {
      donation.car_id = null;
      await this.donationsRepository.save(donation);
    }
  }
} 