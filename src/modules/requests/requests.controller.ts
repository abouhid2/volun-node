import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Patch } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Request } from '../../entities/request.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('requests')
@UseGuards(JwtAuthGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  findAll(): Promise<Request[]> {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Request> {
    return this.requestsService.findOne(+id);
  }

  @Get('entity/:entityId')
  findByEntityId(@Param('entityId') entityId: string): Promise<Request[]> {
    return this.requestsService.findByEntityId(+entityId);
  }

  @Get('status/:fulfilled')
  findByStatus(@Param('fulfilled') fulfilled: string): Promise<Request[]> {
    return this.requestsService.findByStatus(fulfilled === 'true');
  }

  @Post()
  create(@Body() requestData: Partial<Request>): Promise<Request> {
    return this.requestsService.create(requestData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() requestData: Partial<Request>): Promise<Request> {
    return this.requestsService.update(+id, requestData);
  }

  @Patch(':id/fulfill')
  markAsFulfilled(@Param('id') id: string): Promise<Request> {
    return this.requestsService.markAsFulfilled(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestsService.remove(+id);
  }
} 