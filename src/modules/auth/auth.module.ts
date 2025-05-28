import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { FirebaseModule } from '../../firebase/firebase.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule), 
    FirebaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {} 