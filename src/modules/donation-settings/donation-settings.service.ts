import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonationSetting } from '../../entities/donation-setting.entity';
import { CreateDonationSettingDto } from './dto/create-donation-setting.dto';
import { UpdateDonationSettingDto } from './dto/update-donation-setting.dto';
import { DEFAULT_DONATION_TYPES, DEFAULT_DONATION_UNITS } from './donation-settings.constants';

@Injectable()
export class DonationSettingsService {
  constructor(
    @InjectRepository(DonationSetting)
    private readonly donationSettingsRepository: Repository<DonationSetting>,
  ) {}

  getDefaultTypes(): string[] {
    return DEFAULT_DONATION_TYPES;
  }

  getDefaultUnits(): string[] {
    return DEFAULT_DONATION_UNITS;
  }

  async findAllByEvent(eventId: number): Promise<any> {
    const settings = await this.donationSettingsRepository.find({
      where: { event_id: eventId },
      relations: ['event'],
    });

    // If settings exist, use their types and units
    // Otherwise fallback to default types and units
    const types = settings.length > 0 ? settings[0].types : this.getDefaultTypes();
    const units = settings.length > 0 ? settings[0].units : this.getDefaultUnits();

    return {
      donation_settings: settings,
      types: types,
      units: units
    };
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
    const donationSetting = this.donationSettingsRepository.create({
      ...createDonationSettingDto,
      types: createDonationSettingDto.types || this.getDefaultTypes(),
      units: createDonationSettingDto.units || this.getDefaultUnits(),
    });
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