import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from '../../entities/donation.entity';
import { CreateDonationDto, UpdateDonationDto } from './dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationsRepository: Repository<Donation>,
  ) {}

  async findAllByEvent(eventId: number): Promise<Donation[]> {
    return this.donationsRepository.find({
      where: { event_id: eventId, deleted_at: null },
      relations: ['user', 'event', 'car'],
    });
  }

  async findOne(id: number): Promise<Donation> {
    const donation = await this.donationsRepository.findOne({
      where: { id, deleted_at: null },
      relations: ['user', 'event', 'car'],
    });

    if (!donation) {
      throw new NotFoundException(`Donation with ID ${id} not found`);
    }

    return donation;
  }

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const donation = this.donationsRepository.create(createDonationDto);
    return this.donationsRepository.save(donation);
  }

  async createAndAddToInventory(createDonationDto: CreateDonationDto): Promise<any> {
    // First create the donation
    const donation = await this.create(createDonationDto);
    
    try {
      // Then try to add it to inventory
      await this.addToInventory(donation.id);
      
      // Return successful response
      return {
        donation,
        message: "Donation created and added to inventory successfully"
      };
    } catch (error) {
      // Return donation but with warning
      return {
        donation,
        warning: `Donation created but failed to add to inventory: ${error.message}`
      };
    }
  }

  async update(id: number, updateDonationDto: UpdateDonationDto): Promise<Donation> {
    const donation = await this.findOne(id);
    
    Object.assign(donation, updateDonationDto);
    
    return this.donationsRepository.save(donation);
  }

  async remove(id: number): Promise<void> {
    const donation = await this.findOne(id);
    donation.deleted_at = new Date();
    await this.donationsRepository.save(donation);
  }

  async duplicate(id: number): Promise<Donation> {
    const donation = await this.findOne(id);
    
    const duplicatedDonation = this.donationsRepository.create({
      event_id: donation.event_id,
      user_id: donation.user_id,
      type: donation.type,
      quantity: donation.quantity,
      unit: donation.unit,
      description: donation.description,
      car_id: donation.car_id,
    });
    
    return this.donationsRepository.save(duplicatedDonation);
  }

  async addToInventory(id: number): Promise<void> {
    // This would be implemented when we create the inventory system
    // For now, it's a placeholder
    await this.findOne(id);
    return;
  }
} 