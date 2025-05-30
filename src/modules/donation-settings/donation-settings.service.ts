import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonationSetting } from '../../entities/donation-setting.entity';
import { CreateDonationSettingDto } from './dto/create-donation-setting.dto';
import { UpdateDonationSettingDto } from './dto/update-donation-setting.dto';

@Injectable()
export class DonationSettingsService {
  constructor(
    @InjectRepository(DonationSetting)
    private readonly donationSettingsRepository: Repository<DonationSetting>,
  ) {}

  async findAllByEvent(eventId: number): Promise<DonationSetting[]> {
    return this.donationSettingsRepository.find({
      where: { event_id: eventId },
      relations: ['event'],
    });
  }

  async findOne(id: number): Promise<DonationSetting> {
    const donationSetting = await this.donationSettingsRepository.findOne({
      where: { id },
      relations: ['event'],
    });

    if (!donationSetting) {
      throw new NotFoundException(`Donation Setting with ID ${id} not found`);
    }

    return donationSetting;
  }

  async create(createDonationSettingDto: CreateDonationSettingDto): Promise<DonationSetting> {
    const donationSetting = this.donationSettingsRepository.create(createDonationSettingDto);
    return this.donationSettingsRepository.save(donationSetting);
  }

  async update(id: number, updateDonationSettingDto: UpdateDonationSettingDto): Promise<DonationSetting> {
    const donationSetting = await this.findOne(id);
    
    Object.assign(donationSetting, updateDonationSettingDto);
    
    return this.donationSettingsRepository.save(donationSetting);
  }

  async remove(id: number): Promise<void> {
    const donationSetting = await this.findOne(id);
    await this.donationSettingsRepository.remove(donationSetting);
  }
} 