import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { DonationSettingsService } from './donation-settings.service';
import { DonationSetting } from '../../entities/donation-setting.entity';
import { CreateDonationSettingDto } from './dto/create-donation-setting.dto';
import { UpdateDonationSettingDto } from './dto/update-donation-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('events/:eventId/donation-settings')
export class DonationSettingsController {
  constructor(private readonly donationSettingsService: DonationSettingsService) {}

  @Get()
  async findAllByEvent(@Param('eventId') eventId: string): Promise<DonationSetting[]> {
    return this.donationSettingsService.findAllByEvent(+eventId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DonationSetting> {
    return this.donationSettingsService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('eventId') eventId: string,
    @Body() createDonationSettingDto: CreateDonationSettingDto,
  ): Promise<DonationSetting> {
    const dto = { ...createDonationSettingDto, event_id: +eventId };
    return this.donationSettingsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDonationSettingDto: UpdateDonationSettingDto,
  ): Promise<DonationSetting> {
    return this.donationSettingsService.update(+id, updateDonationSettingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.donationSettingsService.remove(+id);
  }
} 