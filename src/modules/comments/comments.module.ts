import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { FirebaseModule } from '../../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    FirebaseModule,
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {} 