import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto, UpdateDonationDto } from './dto';
import { Donation } from '../../entities/donation.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events/:eventId/donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  findAll(@Param('eventId') eventId: string): Promise<Donation[]> {
    return this.donationsService.findAllByEvent(+eventId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('eventId') eventId: string,
    @Body() body: CreateDonationDto | { donation: CreateDonationDto, add_to_inventory?: boolean },
    @Req() req: any,
  ): Promise<Donation | any> {
    // Handle both formats: direct DTO or nested in 'donation' property
    let donationData: CreateDonationDto;
    let addToInventory = false;
    
    if ('donation' in body) {
      donationData = body.donation;
      addToInventory = body.add_to_inventory || false;
    } else {
      donationData = body as CreateDonationDto;
    }
    
    // Set event_id and user_id
    donationData.event_id = +eventId;
    donationData.user_id = req.user?.id || 1;
    
    // Check if we should add to inventory after creation
    if (addToInventory) {
      return this.donationsService.createAndAddToInventory(donationData);
    }
    
    return this.donationsService.create(donationData);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: { donation: UpdateDonationDto } | UpdateDonationDto,
  ): Promise<Donation> {
    let updateData: UpdateDonationDto;
    
    if ('donation' in body) {
      updateData = body.donation;
    } else {
      updateData = body as UpdateDonationDto;
    }
    
    return this.donationsService.update(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.donationsService.remove(+id);
  }

  @Post(':id/duplicate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param('id') id: string): Promise<Donation> {
    return this.donationsService.duplicate(+id);
  }

  @Post(':id/add_to_inventory')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  addToInventory(@Param('id') id: string): Promise<void> {
    return this.donationsService.addToInventory(+id);
  }
} 