import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationSetting } from '../../entities/donation-setting.entity';
import { DonationSettingsService } from './donation-settings.service';
import { DonationSettingsController } from './donation-settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DonationSetting])],
  providers: [DonationSettingsService],
  controllers: [DonationSettingsController],
  exports: [DonationSettingsService],
})
export class DonationSettingsModule {} 