import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from '../../entities/comment.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('events/:eventId/comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(@Param('eventId') eventId: string): Promise<Comment[]> {
    return this.commentsService.findAllByEvent(+eventId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('eventId') eventId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ): Promise<Comment> {
    createCommentDto.event_id = +eventId;
    createCommentDto.user_id = req.user?.id || null;
    return this.commentsService.create(createCommentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(+id);
  }
} 