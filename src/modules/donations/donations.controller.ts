import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto, UpdateDonationDto } from './dto';
import { Donation } from '../../entities/donation.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events/:eventId/donations')
@UseGuards(AuthGuard)
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  findAll(@Param('eventId') eventId: string): Promise<Donation[]> {
    return this.donationsService.findAllByEvent(+eventId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('eventId') eventId: string,
    @Body() createDonationDto: CreateDonationDto,
    @Req() req: any,
  ): Promise<Donation> {
    createDonationDto.event_id = +eventId;
    createDonationDto.user_id = req.user?.id || 1;
    return this.donationsService.create(createDonationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {
    return this.donationsService.update(+id, updateDonationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.donationsService.remove(+id);
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string): Promise<Donation> {
    return this.donationsService.duplicate(+id);
  }

  @Post(':id/add_to_inventory')
  @HttpCode(HttpStatus.NO_CONTENT)
  addToInventory(@Param('id') id: string): Promise<void> {
    return this.donationsService.addToInventory(+id);
  }
} 