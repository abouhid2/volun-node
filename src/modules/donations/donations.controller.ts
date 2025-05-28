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
    @Body() body: { donation: CreateDonationDto, add_to_inventory?: boolean },
    @Req() req: any,
  ): Promise<Donation | any> {
    body.donation.event_id = +eventId;
    body.donation.user_id = req.user?.id || 1;
    
    // Check if we should add to inventory after creation
    if (body.add_to_inventory) {
      return this.donationsService.createAndAddToInventory(body.donation);
    }
    
    return this.donationsService.create(body.donation);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: { donation: UpdateDonationDto },
  ): Promise<Donation> {
    return this.donationsService.update(+id, body.donation);
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